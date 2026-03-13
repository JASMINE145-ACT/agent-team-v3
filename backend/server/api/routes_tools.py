"""工具层观测 API：暴露 tool_registry metrics。"""
from __future__ import annotations

from typing import Any, Dict

from fastapi import APIRouter

from backend.tools.tool_registry import tool_registry

router = APIRouter()


@router.get("/api/tools/metrics")
async def tools_metrics() -> Dict[str, Any]:
    """
    返回当前进程内已注册工具的基础调用统计：
    - calls: 调用次数（近窗口）
    - success_count / success_rate_pct
    - avg_latency_ms / p95_latency_ms
    """
    return {"success": True, "data": tool_registry.get_metrics()}

