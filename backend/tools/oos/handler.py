"""OOS（无货）工具注册与 handler — 从 JAgentExtension 拆出。"""
import asyncio
import json
import logging
from typing import Callable

from backend.core.extension import ExtensionContext
from backend.core.tool_utils import unwrap_tool_result
from backend.tools.tool_registry import tool_registry

logger = logging.getLogger(__name__)

# 工具 schema 定义
_OOS_TOOL_DEFS = [
    {
        "type": "function",
        "function": {
            "name": "get_oos_list",
            "description": "【无货】获取无货产品列表，含被报无货次数与邮件发送状态。",
            "parameters": {"type": "object", "properties": {"limit": {"type": "integer", "description": "最多返回条数，默认 100"}}, "required": []},
        },
    },
    {
        "type": "function",
        "function": {"name": "get_oos_stats", "description": "【无货】获取无货统计。", "parameters": {"type": "object", "properties": {}}},
    },
    {
        "type": "function",
        "function": {
            "name": "get_oos_by_file",
            "description": "【无货】按文件统计无货。",
            "parameters": {"type": "object", "properties": {"limit": {"type": "integer", "description": "最多展示文件数，默认 50"}}, "required": []},
        },
    },
    {
        "type": "function",
        "function": {
            "name": "get_oos_by_time",
            "description": "【无货】按时间统计无货。",
            "parameters": {"type": "object", "properties": {"last_n_days": {"type": "integer", "description": "统计最近几天，默认 30"}}, "required": []},
        },
    },
]


def _make_oos_handler(fn: Callable, arg_name: str, default) -> Callable:
    async def handler(args: dict, context: dict) -> str:
        val = args.get(arg_name, default)
        try:
            val = int(val)
        except (TypeError, ValueError):
            val = default
        out = await asyncio.to_thread(fn, val)
        return unwrap_tool_result(out)
    return handler


def _make_no_arg_handler(fn: Callable) -> Callable:
    async def handler(args: dict, context: dict) -> str:
        out = await asyncio.to_thread(fn)
        return unwrap_tool_result(out)
    return handler


def _make_register_oos_handler(run_fn: Callable) -> Callable:
    async def handler(args: dict, context: dict) -> str:
        # 向统一工具层发起调用，底层仍由 OosRegisterTool 委托 _run_register_oos 完成业务。
        fp = (args.get("file_path") or "").strip() or (context.get("file_path") or "").strip()
        result = await tool_registry.call(
            "oos_register",
            file_path=fp,
            context=context,
            prompt=args.get("prompt"),
        )
        return result.to_llm_string()
    return handler


def _make_register_oos_from_text_handler() -> Callable:
    async def handler(args: dict, context: dict) -> str:
        product_name = (args.get("product_name") or "").strip()
        if not product_name:
            return json.dumps({"success": False, "result": "请提供产品名称（product_name）。"}, ensure_ascii=False)
        specification = (args.get("specification") or "").strip()
        quantity = args.get("quantity") or 0
        try:
            quantity = int(quantity) if isinstance(quantity, (int, float)) else 0
        except (TypeError, ValueError):
            quantity = 0
        unit = (args.get("unit") or "").strip()
        # 同样走 OosRegisterTool，保持与 file_path 版本逻辑一致。
        result = await tool_registry.call(
            "oos_register",
            product_name=product_name,
            specification=specification,
            quantity=quantity,
            unit=unit,
        )
        return result.to_llm_string()
    return handler


def register_oos_tools(ctx: ExtensionContext) -> None:
    """向 ExtensionContext 注册所有 OOS 工具。供 JAgentExtension.register() 调用。"""
    from backend.agent.tools import (
        _run_oos_list,
        _run_oos_stats,
        _run_oos_by_file,
        _run_oos_by_time,
        _run_register_oos,
        EXTRA_TOOLS,
    )

    ctx.register_tool(_OOS_TOOL_DEFS[0], _make_oos_handler(_run_oos_list, "limit", 100))
    ctx.register_tool(_OOS_TOOL_DEFS[1], _make_no_arg_handler(_run_oos_stats))
    ctx.register_tool(_OOS_TOOL_DEFS[2], _make_oos_handler(_run_oos_by_file, "limit", 50))
    ctx.register_tool(_OOS_TOOL_DEFS[3], _make_oos_handler(_run_oos_by_time, "last_n_days", 30))

    for t in EXTRA_TOOLS:
        n = t["function"]["name"]
        if n == "register_oos":
            ctx.register_tool(t, _make_register_oos_handler(_run_register_oos))
        elif n == "register_oos_from_text":
            ctx.register_tool(t, _make_register_oos_from_text_handler())
