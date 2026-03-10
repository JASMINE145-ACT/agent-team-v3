"""OOS（无货）工具注册与 handler — 从 JAgentExtension 拆出。"""
import asyncio
import json
import logging
from typing import Callable

from backend.core.extension import ExtensionContext
from backend.core.tool_utils import unwrap_tool_result

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
        fp = (args.get("file_path") or "").strip() or (context.get("file_path") or "").strip()
        out = await asyncio.to_thread(run_fn, fp, context, args.get("prompt"))
        return unwrap_tool_result(out)
    return handler


def _make_register_oos_from_text_handler() -> Callable:
    async def handler(args: dict, context: dict) -> str:
        product_name = (args.get("product_name") or "").strip()
        if not product_name:
            return json.dumps({"success": False, "result": "请提供产品名称（product_name）。"}, ensure_ascii=False)
        specification = (args.get("specification") or "").strip()
        quantity = args.get("quantity")
        if quantity is None:
            quantity = 0
        try:
            quantity = int(quantity) if isinstance(quantity, (int, float)) else 0
        except (TypeError, ValueError):
            quantity = 0
        unit = (args.get("unit") or "").strip()
        record = {"product_name": product_name, "specification": specification, "unit": unit, "quantity": quantity}
        try:
            from backend.tools.oos.services.quotation_agent_tool import persist_out_of_stock_records
            out = await asyncio.to_thread(persist_out_of_stock_records, "用户直接登记", [record], sheet_name="")
            if out.get("success"):
                return out.get("result", f"已登记「{product_name}{' ' + specification if specification else ''}」为无货。")
            return json.dumps(out, ensure_ascii=False)
        except Exception as e:
            logger.exception("register_oos_from_text 失败")
            return json.dumps({"success": False, "result": str(e)}, ensure_ascii=False)
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
