"""报价单（Quotation）工具注册与 handler — 从 JAgentExtension 拆出。"""
import asyncio
import json
import logging
from typing import Callable

from backend.core.extension import ExtensionContext
from backend.core.tool_utils import tool_error, unwrap_tool_result, validate_file_path
from backend.agent.tools import EXTRA_TOOLS

logger = logging.getLogger(__name__)

_QUOTE_WITH_FILE = {"fill_quotation_sheet", "parse_excel_smart", "edit_excel"}
_VALID_CUSTOMER_LEVELS = {"A", "B", "C", "D"}


def _make_quote_handler(name: str, need_file: bool) -> Callable:
    async def handler(args: dict, context: dict) -> str:
        if need_file:
            fp = (args.get("file_path") or "").strip() or (context.get("file_path") or "").strip()
            err = validate_file_path(fp, name)
            if err:
                return err
        from backend.tools.quotation.quote_tools import execute_quote_tool
        out = await asyncio.to_thread(execute_quote_tool, name, args)
        return unwrap_tool_result(out)
    return handler


def _make_quotation_fill_handler() -> Callable:
    async def handler(args: dict, context: dict) -> str:
        fp = (args.get("file_path") or "").strip() or (context.get("file_path") or "").strip()
        err = validate_file_path(fp, "run_quotation_fill")
        if err:
            return err
        customer_level = (args.get("customer_level") or "B").strip().upper() or "B"
        if customer_level not in _VALID_CUSTOMER_LEVELS:
            return tool_error(
                f"[run_quotation_fill] customer_level 无效: {customer_level!r}，"
                f"合法值为 {sorted(_VALID_CUSTOMER_LEVELS)}，请重新调用"
            )
        try:
            from backend.tools.quotation.flow_orchestrator import run_quotation_fill_flow
            result = await asyncio.to_thread(run_quotation_fill_flow, quotation_path=fp, customer_level=customer_level)
            return json.dumps(result, ensure_ascii=False)
        except Exception as e:
            logger.exception("run_quotation_fill 失败")
            return json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)
    return handler


def _make_ask_clarification_handler() -> Callable:
    async def handler(args: dict, context: dict) -> str:
        q = args.get("questions") or []
        r = args.get("reasoning") or ""
        return json.dumps({"needs_clarification": True, "questions": q, "reasoning": r}, ensure_ascii=False)
    return handler


def _make_append_business_knowledge_handler() -> Callable:
    async def handler(args: dict, context: dict) -> str:
        from backend.agent.remember import append_business_knowledge as do_append
        content = (args.get("content") or "").strip()
        return do_append(content)
    return handler


def _make_batch_quick_quote_handler() -> Callable:
    async def handler(args: dict, context: dict) -> str:
        inquiry_text = (args.get("inquiry_text") or "").strip()
        if not inquiry_text:
            return json.dumps({"success": False, "result": "", "error": "请提供询价文字"}, ensure_ascii=False)
        
        customer_level = (args.get("customer_level") or "B").strip().upper() or "B"
        
        try:
            from backend.tools.quotation.batch_quick_quote import batch_quick_quote
            out = await asyncio.to_thread(batch_quick_quote, inquiry_text, customer_level)
            
            # 如果成功，直接返回 Markdown 表格文本（不包裹 JSON）
            if out.get("success"):
                return out["result"]
            else:
                return json.dumps(out, ensure_ascii=False)
        except Exception as e:
            logger.exception("batch_quick_quote 失败")
            return json.dumps({"success": False, "result": "", "error": str(e)}, ensure_ascii=False)
    return handler


def register_quotation_tools(ctx: ExtensionContext) -> None:
    """向 ExtensionContext 注册所有报价单工具。供 JAgentExtension.register() 调用。"""
    from backend.tools.quotation.quote_tools import get_quote_tools_openai_format
    for tool_def in get_quote_tools_openai_format():
        name = tool_def["function"]["name"]
        need_file = name in _QUOTE_WITH_FILE
        ctx.register_tool(tool_def, _make_quote_handler(name, need_file))

    for t in EXTRA_TOOLS:
        n = t["function"]["name"]
        if n == "run_quotation_fill":
            ctx.register_tool(t, _make_quotation_fill_handler())
        elif n == "ask_clarification":
            ctx.register_tool(t, _make_ask_clarification_handler())
        elif n == "append_business_knowledge":
            ctx.register_tool(t, _make_append_business_knowledge_handler())
        elif n == "batch_quick_quote":
            ctx.register_tool(t, _make_batch_quick_quote_handler())
