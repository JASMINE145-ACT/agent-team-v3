"""JAgentExtension — JAgent 业务插件，注册全部工具 + 技能 prompt。"""
import asyncio
import json
import logging
from typing import Any

from backend.core.extension import AgentExtension, ExtensionContext
from backend.core.tool_utils import tool_error, validate_file_path
from backend.plugins.jagent.skills import ALL_SKILL_PROMPT, OUTPUT_FORMAT

logger = logging.getLogger(__name__)

_QUOTE_WITH_FILE = {"extract_quotation_data", "fill_quotation_sheet", "parse_excel_smart", "edit_excel"}
_VALID_CUSTOMER_LEVELS = {"A", "B", "C", "D"}


class JAgentExtension(AgentExtension):
    def get_skill_prompt(self) -> str:
        return ALL_SKILL_PROMPT

    def get_output_format_prompt(self) -> str:
        return OUTPUT_FORMAT

    def on_after_tool(self, name: str, args: dict, obs: str) -> str:
        """大结果压缩：run_quotation_fill 超过 3000 字时截取前 5 条 items。"""
        if name == "run_quotation_fill" and len(obs) > 3000:
            try:
                data = json.loads(obs)
                items = data.get("items", [])
                if len(items) > 5:
                    data["items"] = items[:5]
                    data["_truncated"] = f"共 {len(items)} 条，已截至前 5 条"
                    return json.dumps(data, ensure_ascii=False)
            except Exception:
                pass
        return obs

    def register(self, ctx: ExtensionContext) -> None:
        self._register_oos_tools(ctx)
        self._register_inventory_tools(ctx)
        self._register_quote_tools(ctx)

    def _register_oos_tools(self, ctx: ExtensionContext) -> None:
        from backend.agent.tools import (
            _run_oos_list,
            _run_oos_stats,
            _run_oos_by_file,
            _run_oos_by_time,
            _run_register_oos,
            EXTRA_TOOLS,
        )

        ctx.register_tool(
            {
                "type": "function",
                "function": {
                    "name": "get_oos_list",
                    "description": "【无货】获取无货产品列表，含被报无货次数与邮件发送状态。",
                    "parameters": {"type": "object", "properties": {"limit": {"type": "integer", "description": "最多返回条数，默认 100"}}, "required": []},
                },
            },
            self._make_oos_handler(_run_oos_list, "limit", 100),
        )
        ctx.register_tool(
            {
                "type": "function",
                "function": {"name": "get_oos_stats", "description": "【无货】获取无货统计。", "parameters": {"type": "object", "properties": {}}},
            },
            self._make_simple_handler(_run_oos_stats),
        )
        ctx.register_tool(
            {
                "type": "function",
                "function": {
                    "name": "get_oos_by_file",
                    "description": "【无货】按文件统计无货。",
                    "parameters": {"type": "object", "properties": {"limit": {"type": "integer", "description": "最多展示文件数，默认 50"}}, "required": []},
                },
            },
            self._make_oos_handler(_run_oos_by_file, "limit", 50),
        )
        ctx.register_tool(
            {
                "type": "function",
                "function": {
                    "name": "get_oos_by_time",
                    "description": "【无货】按时间统计无货。",
                    "parameters": {"type": "object", "properties": {"last_n_days": {"type": "integer", "description": "统计最近几天，默认 30"}}, "required": []},
                },
            },
            self._make_oos_handler(_run_oos_by_time, "last_n_days", 30),
        )
        for t in EXTRA_TOOLS:
            n = t["function"]["name"]
            if n == "register_oos":
                ctx.register_tool(t, self._handler_register_oos(_run_register_oos))
            elif n == "register_oos_from_text":
                ctx.register_tool(t, self._handler_register_oos_from_text())
            elif n == "run_quotation_fill":
                ctx.register_tool(t, self._handler_run_quotation_fill())
            elif n == "ask_clarification":
                ctx.register_tool(t, self._handler_ask_clarification())
            elif n == "append_business_knowledge":
                ctx.register_tool(t, self._handler_append_business_knowledge())

    def _make_oos_handler(self, fn, arg_name, default):
        async def handler(args, context):
            val = args.get(arg_name, default)
            try:
                val = int(val)
            except (TypeError, ValueError):
                val = default
            out = await asyncio.to_thread(fn, val)
            return out.get("result", "") if out.get("success") else json.dumps(out, ensure_ascii=False)
        return handler

    def _make_simple_handler(self, fn):
        async def handler(args, context):
            out = await asyncio.to_thread(fn)
            return out.get("result", "") if out.get("success") else json.dumps(out, ensure_ascii=False)
        return handler

    def _handler_ask_clarification(self):
        async def handler(args: dict, context: dict) -> str:
            q = args.get("questions") or []
            r = args.get("reasoning") or ""
            return json.dumps({"needs_clarification": True, "questions": q, "reasoning": r}, ensure_ascii=False)
        return handler

    def _handler_append_business_knowledge(self):
        async def handler(args: dict, context: dict) -> str:
            from backend.agent.remember import append_business_knowledge as do_append
            content = (args.get("content") or "").strip()
            return do_append(content)
        return handler

    def _handler_run_quotation_fill(self):
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
                result = await asyncio.to_thread(
                    run_quotation_fill_flow,
                    quotation_path=fp,
                    customer_level=customer_level,
                )
                return json.dumps(result, ensure_ascii=False)
            except Exception as e:
                logger.exception("run_quotation_fill 失败")
                return json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)
        return handler

    def _handler_register_oos(self, _run_register_oos):
        async def handler(args: dict, context: dict) -> str:
            fp = (args.get("file_path") or "").strip() or (context.get("file_path") or "").strip()
            out = await asyncio.to_thread(_run_register_oos, fp, context, args.get("prompt"))
            return out.get("result", "") if out.get("success") else json.dumps(out, ensure_ascii=False)
        return handler

    def _handler_register_oos_from_text(self):
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
            record = {
                "product_name": product_name,
                "specification": specification,
                "unit": unit,
                "quantity": quantity,
            }
            try:
                from backend.tools.oos.services.quotation_agent_tool import persist_out_of_stock_records
                out = await asyncio.to_thread(
                    persist_out_of_stock_records,
                    "用户直接登记",
                    [record],
                    sheet_name="",
                )
                if out.get("success"):
                    return out.get("result", "已登记「{}」为无货。".format(product_name + (" " + specification if specification else "")))
                return json.dumps(out, ensure_ascii=False)
            except Exception as e:
                logger.exception("register_oos_from_text 失败: %s", e)
                return json.dumps({"success": False, "result": str(e)}, ensure_ascii=False)
        return handler

    def _register_inventory_tools(self, ctx: ExtensionContext) -> None:
        from backend.tools.inventory.services.inventory_agent_tools import get_inventory_tools_openai_format

        for tool_def in get_inventory_tools_openai_format():
            name = tool_def["function"]["name"]
            ctx.register_tool(tool_def, self._make_inventory_handler(name))

    def _make_inventory_handler(self, name: str):
        async def handler(args: dict, context: dict) -> str:
            from backend.tools.inventory.services.inventory_agent_tools import execute_inventory_tool, config as inv_config
            timeout_sec = getattr(inv_config, "TOOL_EXEC_TIMEOUT", 35)
            try:
                out = await asyncio.wait_for(
                    asyncio.to_thread(execute_inventory_tool, name, args),
                    timeout=timeout_sec,
                )
                return out.get("result", "") if out.get("success") else json.dumps(out, ensure_ascii=False)
            except asyncio.TimeoutError:
                return json.dumps({"success": False, "error": f"工具执行超时（{timeout_sec}s）"}, ensure_ascii=False)
        return handler

    def _register_quote_tools(self, ctx: ExtensionContext) -> None:
        from backend.tools.quotation.quote_tools import get_quote_tools_openai_format
        from backend.core.tool_utils import validate_file_path

        for tool_def in get_quote_tools_openai_format():
            name = tool_def["function"]["name"]
            need_file = name in _QUOTE_WITH_FILE
            ctx.register_tool(tool_def, self._make_quote_handler(name, need_file))

    def _make_quote_handler(self, name: str, need_file: bool):
        from backend.core.tool_utils import validate_file_path

        async def handler(args: dict, context: dict) -> str:
            if need_file:
                fp = (args.get("file_path") or "").strip() or (context.get("file_path") or "").strip()
                err = validate_file_path(fp, name)
                if err:
                    return err
            from backend.tools.quotation.quote_tools import execute_quote_tool
            out = await asyncio.to_thread(execute_quote_tool, name, args)
            if out.get("success"):
                return out.get("result", "") or json.dumps({k: v for k, v in out.items() if k != "success"}, ensure_ascii=False)
            return json.dumps(out, ensure_ascii=False)
        return handler
