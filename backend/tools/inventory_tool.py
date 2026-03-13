"""
统一工具层：库存查询封装。
委托现有 execute_inventory_tool，统一超时与 ToolResult 转换。
"""
from __future__ import annotations

import asyncio
import json
import logging
from typing import Any

from backend.tools.base import BaseTool, ToolResult

logger = logging.getLogger(__name__)

# 默认超时（秒），与现有 handler 侧一致
DEFAULT_TIMEOUT = 25


class InventoryLookupTool(BaseTool):
    name = "inventory_lookup"

    async def run(
        self,
        *,
        tool: str = "get_inventory_by_code",
        code: str = "",
        query: str = "",
        **kwargs: Any,
    ) -> ToolResult:
        """执行库存相关子工具：get_inventory_by_code / search_inventory / match_quotation 等。"""
        tool = (tool or "get_inventory_by_code").strip()
        arguments: dict[str, Any] = dict(kwargs)
        if code:
            arguments["code"] = code
        if query:
            arguments["query"] = query

        try:
            from backend.tools.inventory.services.inventory_agent_tools import execute_inventory_tool

            out = await asyncio.wait_for(
                asyncio.to_thread(execute_inventory_tool, tool, arguments),
                timeout=DEFAULT_TIMEOUT,
            )
        except asyncio.TimeoutError:
            logger.warning("inventory_lookup %s 超时", tool)
            return ToolResult(ok=False, error="库存查询超时", error_code="timeout")
        except Exception as e:
            logger.exception("inventory_lookup %s 失败", tool)
            return ToolResult(ok=False, error=str(e), error_code="internal_error")

        if not isinstance(out, dict):
            return ToolResult(ok=False, error="返回格式异常", error_code="invalid_response")
        success = out.get("success", False)
        result = out.get("result", out.get("error", ""))
        return ToolResult(ok=success, data=result, error=None if success else str(result))
