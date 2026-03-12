"""通用工具校验与错误构造辅助."""

import json
from pathlib import Path
from typing import Any, Dict, Optional


def tool_error(msg: str, error_type: str = "internal_error", details: Optional[Dict[str, Any]] = None) -> str:
    """构造统一的错误 observation，包含 error.type，便于 LLM 识别并自我纠错。"""
    payload: Dict[str, Any] = {
        "error": {
            "type": error_type,
            "message": msg,
        }
    }
    if details:
        payload["error"]["details"] = details  # type: ignore[assignment]
    return json.dumps(payload, ensure_ascii=False)


def tool_not_found(msg: str, details: Optional[Dict[str, Any]] = None) -> str:
    return tool_error(msg, error_type="not_found", details=details)


def tool_conflict(msg: str, details: Optional[Dict[str, Any]] = None) -> str:
    return tool_error(msg, error_type="conflict", details=details)


def tool_external_error(msg: str, details: Optional[Dict[str, Any]] = None) -> str:
    return tool_error(msg, error_type="external_error", details=details)


def tool_rate_limited(msg: str, details: Optional[Dict[str, Any]] = None) -> str:
    return tool_error(msg, error_type="rate_limited", details=details)


def validate_file_path(path: str, tool_name: str) -> str | None:
    """文件不存在返回错误字符串，否则返回 None。"""
    if not path:
        return tool_error(
            f"[{tool_name}] 缺少 file_path，请先上传文件或在 context 中提供",
            error_type="validation_error",
            details={"field": "file_path"},
        )
    if not Path(path).exists():
        return tool_not_found(
            f"[{tool_name}] 文件不存在: {path}，请确认路径是否正确",
            details={"field": "file_path", "path": str(path)},
        )
    return None


def unwrap_tool_result(out: dict) -> str:
    """将工具函数的 {'success': bool, 'result': str} 拆包为字符串。
    成功时返回 result 字段；失败时返回 JSON 字符串（供 LLM 理解错误）。
    """
    if out.get("success"):
        return out.get("result", "")
    return json.dumps(out, ensure_ascii=False)
