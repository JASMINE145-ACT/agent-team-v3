"""
轻量级 Run Log 存储：

- 目标：为长流程（首期为 Work 报价流程）提供简单可持久化的运行日志，便于排查问题。
- 实现：按 run_id 写入 NDJSON 文件，每行一条事件，结构化字段，避免直接 dump 整个请求/响应。
"""

from __future__ import annotations

import json
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional, Tuple

from backend.config import Config


@dataclass
class RunLogHandle:
    run_id: str
    kind: str
    path: Path


def _base_dir() -> Path:
    base = Path(getattr(Config, "RUN_LOG_BASE_DIR", Config.base_dir / "data" / "run-logs"))  # type: ignore[attr-defined]
    return base


def _kind_dir(kind: str) -> Path:
    return _base_dir() / kind


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def _write_line(path: Path, payload: Dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False)
        f.write("\n")


def begin_run_log(kind: str, run_id: str, context: Dict[str, Any] | None = None) -> RunLogHandle:
    """
    创建一个新的 Run Log 句柄，并写入一条 meta 行。

    - kind: 业务类型（例如 "work"）
    - run_id: 上层生成的 run id（例如 UUID）
    - context: 额外上下文字段（文件列表、客户档位等），便于后续检索
    """
    log_path = _kind_dir(kind) / f"{run_id}.ndjson"
    meta = {
        "ts": _now_iso(),
        "stream": "meta",
        "message": "run_started",
        "details": context or {},
    }
    _write_line(log_path, meta)
    return RunLogHandle(run_id=run_id, kind=kind, path=log_path)


def append_log(
    handle: RunLogHandle,
    stream: str,
    message: str,
    *,
    stage: Optional[str] = None,
    details: Optional[Dict[str, Any]] = None,
) -> None:
    """
    追加一条日志事件。

    - stream: "info" | "error" | "stage" | "tool" 等
    - message: 简要说明
    - stage: 可选阶段标识（如 "extract" / "match" / "fill"）
    - details: 结构化补充信息（避免直接写入完整 payload）
    """
    payload: Dict[str, Any] = {
        "ts": _now_iso(),
        "stream": stream,
        "message": message,
    }
    if stage is not None:
        payload["stage"] = stage
    if details:
        payload["details"] = details
    _write_line(handle.path, payload)


def finalize_log(handle: RunLogHandle, status: str, error: Optional[str] = None) -> None:
    """
    为运行追加一条 summary 行，记录最终状态。

    - status: "success" | "error" | 其他自定义状态
    - error: 可选错误摘要
    """
    payload: Dict[str, Any] = {
        "ts": _now_iso(),
        "stream": "summary",
        "message": "run_finished",
        "status": status,
    }
    if error:
        payload["error"] = error
    _write_line(handle.path, payload)


def _find_log_path(run_id: str, kind: Optional[str] = None) -> Tuple[str, Path]:
    """
    根据 run_id 查找日志文件路径。

    - 若提供 kind，则只在该 kind 目录下查找。
    - 否则枚举 base_dir 下的一级子目录（不同 kind），找到第一个匹配文件。
    """
    base = _base_dir()
    if kind:
        candidate = base / kind / f"{run_id}.ndjson"
        if candidate.exists():
            return kind, candidate
        raise FileNotFoundError(f"run log not found for kind={kind}, run_id={run_id}")

    if not base.exists():
        raise FileNotFoundError(f"run log base directory does not exist: {base}")

    for sub in base.iterdir():
        if not sub.is_dir():
            continue
        candidate = sub / f"{run_id}.ndjson"
        if candidate.exists():
            return sub.name, candidate

    raise FileNotFoundError(f"run log not found for run_id={run_id}")


def read_run_log(
    run_id: str,
    *,
    kind: Optional[str] = None,
    offset: int = 0,
    limit: int = 1000,
) -> Tuple[str, List[Dict[str, Any]], int]:
    """
    读取指定 run 的日志事件。

    返回 (kind, events, next_offset)：
    - kind: 实际匹配到的 kind（便于调用方展示）。
    - events: 从 offset 行开始的最多 limit 条事件（按文件顺序）。
    - next_offset: 下一次读取时可使用的 offset（= offset + len(events)）。
    """
    if offset < 0:
        offset = 0
    if limit <= 0:
        return kind or "", [], offset

    resolved_kind, path = _find_log_path(run_id, kind=kind)
    events: List[Dict[str, Any]] = []
    current_index = 0

    if not path.exists():
        raise FileNotFoundError(f"run log file missing: {path}")

    with path.open("r", encoding="utf-8") as f:
        for line in f:
            if current_index < offset:
                current_index += 1
                continue
            line = line.strip()
            if not line:
                current_index += 1
                continue
            try:
                obj = json.loads(line)
            except Exception:
                obj = {"raw": line}
            events.append(obj)
            current_index += 1
            if len(events) >= limit:
                break

    next_offset = offset + len(events)
    return resolved_kind, events, next_offset


__all__ = [
    "RunLogHandle",
    "begin_run_log",
    "append_log",
    "finalize_log",
    "read_run_log",
]

