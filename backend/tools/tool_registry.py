"""
集中式工具注册表：agent 通过 call(name, **kwargs) 调用后端工具，统一记录耗时与成功率。
与 backend.core.registry.ToolRegistry（LLM 面向的工具定义 + handler）互补：
本层封装的是「后端能力」（HTTP/SQL 等），handler 内可调用本 registry.call()。
"""
from __future__ import annotations

import asyncio
import logging
import time
from collections import defaultdict
from typing import Any, Dict, List, Optional

from backend.tools.base import BaseTool, ToolResult

logger = logging.getLogger(__name__)

# 单例 registry，应用启动时通过 register_builtin_tools() 注册
_tools: Dict[str, BaseTool] = {}
# 每次调用的记录，用于简单 analytics（tool -> list of {ok, latency_ms}）
_metrics: Dict[str, List[Dict[str, Any]]] = defaultdict(list)
_metrics_max_per_tool = 1000


class ToolRegistry:
    def register(self, tool: BaseTool) -> None:
        name = (tool.name or "").strip()
        if not name:
            raise ValueError("Tool name must be non-empty")
        _tools[name] = tool
        logger.debug("tool_registry: registered %s", name)

    def get(self, name: str) -> Optional[BaseTool]:
        return _tools.get(name)

    def names(self) -> List[str]:
        return list(_tools.keys())

    async def call(self, name: str, **kwargs: Any) -> ToolResult:
        tool = _tools.get(name)
        if not tool:
            return ToolResult(ok=False, error=f"未知工具: {name}", error_code="not_found", latency_ms=0)

        start = time.perf_counter()
        try:
            result = await tool.run(**kwargs)
            result.latency_ms = int((time.perf_counter() - start) * 1000)
        except asyncio.CancelledError:
            raise
        except Exception as e:
            logger.exception("tool_registry call %s 失败", name)
            result = ToolResult(
                ok=False,
                error=str(e),
                error_code="internal_error",
                latency_ms=int((time.perf_counter() - start) * 1000),
            )

        _record_metric(name, result.ok, result.latency_ms)
        return result

    def get_metrics(self) -> Dict[str, Dict[str, Any]]:
        """按工具名聚合：调用次数、成功次数、平均延迟、p95 延迟（近似）。"""
        out: Dict[str, Dict[str, Any]] = {}
        for tool_name, records in _metrics.items():
            if not records:
                continue
            ok_count = sum(1 for r in records if r.get("ok"))
            latencies = [r["latency_ms"] for r in records]
            latencies.sort()
            n = len(latencies)
            p95_idx = int(n * 0.95) if n else 0
            out[tool_name] = {
                "calls": n,
                "success_count": ok_count,
                "success_rate_pct": round(100.0 * ok_count / n, 2) if n else 0,
                "avg_latency_ms": round(sum(latencies) / n, 2) if n else 0,
                "p95_latency_ms": latencies[p95_idx] if latencies else 0,
            }
        return out


def _record_metric(tool_name: str, ok: bool, latency_ms: int) -> None:
    global _metrics
    lst = _metrics[tool_name]
    lst.append({"ok": ok, "latency_ms": latency_ms})
    if len(lst) > _metrics_max_per_tool:
        _metrics[tool_name] = lst[-_metrics_max_per_tool:]


# 模块级单例，供 handler 与 startup 使用
tool_registry = ToolRegistry()


def register_builtin_tools() -> None:
    """在应用启动时调用，注册所有内建后端工具。各工具独立 try，避免单模块缺失拖垮全部。"""
    _pairs = [
        ("backend.tools.inventory_tool", "InventoryLookupTool"),
        ("backend.tools.oos_register_tool", "OosRegisterTool"),
        ("backend.tools.alert_tool", "AlertTool"),
    ]
    for mod_name, cls_name in _pairs:
        try:
            mod = __import__(mod_name, fromlist=[cls_name])
            cls = getattr(mod, cls_name)
            tool_registry.register(cls())
            logger.info("tool_registry: 已注册 %s.%s", mod_name, cls_name)
        except Exception as e:
            logger.warning("tool_registry: 跳过 %s.%s — %s", mod_name, cls_name, e)
    logger.info("tool_registry: 当前已注册 %s", tool_registry.names())
