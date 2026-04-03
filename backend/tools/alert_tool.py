"""
统一工具层：行情告警占位（claude.md 规划中的 alert.create/list/delete 封装）。

当前 OOS/邮件/企微告警走 `alert_dispatch` 等既有路径；本类供 tool_registry 注册，
避免启动时因缺模块导致 inventory/oos 工具一并无法注册。
"""
from __future__ import annotations

import logging
from typing import Any

from backend.tools.base import BaseTool, ToolResult

logger = logging.getLogger(__name__)


class AlertTool(BaseTool):
    name = "alert"

    async def run(self, **kwargs: Any) -> ToolResult:
        return ToolResult(
            ok=False,
            error="行情告警统一工具层尚未接入；无货/缺货告警请使用既有 OOS 与 alert_dispatch 流程。",
            error_code="not_implemented",
        )
