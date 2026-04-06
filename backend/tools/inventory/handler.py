"""库存（Inventory）工具注册与 handler — 从 JAgentExtension 拆出。"""
import asyncio
import json
import logging
from typing import Callable

from backend.core.extension import ExtensionContext
from backend.core.tool_utils import unwrap_tool_result

logger = logging.getLogger(__name__)


def _make_inventory_handler(name: str) -> Callable:
    async def handler(args: dict, context: dict) -> str:
        from backend.tools.inventory.services.inventory_agent_tools import execute_inventory_tool, config as inv_config
        timeout_sec = getattr(inv_config, "TOOL_EXEC_TIMEOUT", 35)
        push_event = context.get("push_event") if isinstance(context, dict) else None
        try:
            out = await asyncio.wait_for(
                asyncio.to_thread(execute_inventory_tool, name, args, push_event, context),
                timeout=timeout_sec,
            )
            return unwrap_tool_result(out)
        except asyncio.TimeoutError:
            return json.dumps({"success": False, "error": f"工具执行超时（{timeout_sec}s）"}, ensure_ascii=False)
    return handler


def register_inventory_tools(ctx: ExtensionContext) -> None:
    """向 ExtensionContext 注册所有库存工具。供 JAgentExtension.register() 调用。"""
    from backend.tools.inventory.services.inventory_agent_tools import get_inventory_tools_openai_format
    for tool_def in get_inventory_tools_openai_format():
        name = tool_def["function"]["name"]
        ctx.register_tool(tool_def, _make_inventory_handler(name))
