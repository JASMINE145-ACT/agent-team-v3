"""
单 Agent 工具：合并库存、报价单、无货、询价填充、澄清，由主 Agent 直接调用。
version3 独立运行，不依赖 version2；inventory_agent、quotation_tracker、src、backend.agents.quote/quote_sheet 均已复制到本仓库。
"""
import asyncio
import json
import logging
from pathlib import Path
from typing import Any, Dict, List, Optional

logger = logging.getLogger(__name__)


def _get_inventory_tools():
    from backend.tools.inventory.services.inventory_agent_tools import get_inventory_tools_openai_format
    return get_inventory_tools_openai_format()


def _get_quote_tools():
    from backend.tools.quotation.quote_tools import get_quote_tools_openai_format
    return get_quote_tools_openai_format()


# 无货、询价填充、澄清：在本模块定义
EXTRA_TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "get_oos_list",
            "description": "【无货】获取无货产品列表，含被报无货次数与邮件发送状态。",
            "parameters": {"type": "object", "properties": {"limit": {"type": "integer", "description": "最多返回条数，默认 100，展示前 50 条"}}, "required": []},
        },
    },
    {
        "type": "function",
        "function": {
            "name": "get_oos_stats",
            "description": "【无货】获取无货统计：总记录数、无货产品数、被报无货≥2次产品数、已发邮件产品数、今日新增。",
            "parameters": {"type": "object", "properties": {}},
        },
    },
    {
        "type": "function",
        "function": {
            "name": "get_oos_by_file",
            "description": "【无货】按文件统计无货：每个报价单的记录数及上传时间。",
            "parameters": {"type": "object", "properties": {"limit": {"type": "integer", "description": "最多展示文件数，默认 50"}}, "required": []},
        },
    },
    {
        "type": "function",
        "function": {
            "name": "get_oos_by_time",
            "description": "【无货】按时间统计无货：按日汇总最近 N 天新增记录数。",
            "parameters": {"type": "object", "properties": {"last_n_days": {"type": "integer", "description": "统计最近几天，默认 30"}}, "required": []},
        },
    },
    {
        "type": "function",
        "function": {
            "name": "register_oos",
            "description": "【无货】无货登记：从已上传的报价单中解析无货行并落库。仅当用户明确说「无货登记」且 context 中已有 file_path 时调用；无 file_path 时勿用，应提示先上传。",
            "parameters": {
                "type": "object",
                "properties": {
                    "file_path": {"type": "string", "description": "报价单路径，须与 context.file_path 一致"},
                    "prompt": {"type": "string", "description": "可选，解析/落库说明"},
                },
                "required": ["file_path"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "run_quotation_fill",
            "description": "【询价填充】整单流水线：提取询价项 → 万鼎匹配 → 库存校验 → 回填 Excel。仅当用户明确要求「询价填充/填充报价单/完整报价」且 context 中已有 file_path 时调用。customer_level 可选 A/B/C/D，默认 B。",
            "parameters": {
                "type": "object",
                "properties": {
                    "file_path": {"type": "string", "description": "报价单绝对路径"},
                    "customer_level": {"type": "string", "enum": ["A", "B", "C", "D"], "description": "客户档位，默认 B"},
                },
                "required": ["file_path"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "ask_clarification",
            "description": "【澄清】意图不明确时调用（如「查XX」「帮我查」，无法判断是库存还是价格）。已明确含「库存/可售/价格/报价/万鼎/档位」等词时可跳过。",
            "parameters": {
                "type": "object",
                "properties": {
                    "questions": {"type": "array", "items": {"type": "string"}, "description": "向用户提出的问题"},
                    "reasoning": {"type": "string", "description": "为何需要澄清"},
                },
                "required": ["questions"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "append_business_knowledge",
            "description": "【业务知识】将一条知识追加到业务知识库（wanding_business_knowledge.md），后续万鼎选型与匹配会参考。当用户要求「记录到知识库」「记在 knowledge」「润色后记录」「把这个记下来」等时调用；content 为润色后的完整一条知识（可多句），如规格纠正、选型规则等。",
            "parameters": {
                "type": "object",
                "properties": {
                    "content": {"type": "string", "description": "要追加的一条业务知识，已润色为完整句子或条目"},
                },
                "required": ["content"],
            },
        },
    },
]


# ---------------------------------------------------------------------------
# 前置校验辅助（把错误作为 tool observation 返回，让模型自行纠错）
# ---------------------------------------------------------------------------

_VALID_CUSTOMER_LEVELS = {"A", "B", "C", "D"}

# 需要校验 file_path 存在的报价单工具
_QUOTE_TOOLS_WITH_FILE = {
    "extract_quotation_data",
    "fill_quotation_sheet",
    "parse_excel_smart",
    "edit_excel",
}


def _tool_error(msg: str) -> str:
    """返回标准错误 observation，模型可读并自行纠错。"""
    return json.dumps({"success": False, "error": msg}, ensure_ascii=False)


def _validate_file_path(path: str, tool_name: str) -> Optional[str]:
    """若文件不存在返回错误字符串，否则返回 None。"""
    from pathlib import Path as _Path
    if not path:
        return _tool_error(f"[{tool_name}] 缺少 file_path，请先上传文件或在 context 中提供")
    if not _Path(path).exists():
        return _tool_error(f"[{tool_name}] 文件不存在: {path}，请确认路径是否正确")
    return None



# 工具名分发表（避免 try/except 漏传）
_INVENTORY_TOOLS = {
    "search_inventory",
    "get_inventory_by_code",
    "match_by_quotation_history",
    "match_wanding_price",
    "select_wanding_match",
}
_QUOTE_TOOLS = {
    "extract_quotation_data",
    "fill_quotation_sheet",
    "parse_excel_smart",
    "edit_excel",
}


def _build_all_tools():
    try:
        return _get_inventory_tools() + _get_quote_tools() + EXTRA_TOOLS
    except Exception as e:
        logger.warning("加载工具失败，仅使用 EXTRA_TOOLS: %s", e)
        return EXTRA_TOOLS


ALL_TOOLS = None
def get_all_tools() -> List[dict]:
    global ALL_TOOLS
    if ALL_TOOLS is None:
        ALL_TOOLS = _build_all_tools()
    return ALL_TOOLS


def _run_oos_list(limit: int = 100) -> dict:
    try:
        from backend.tools.oos.services.data_service import DataService
        ds = DataService()
        records = ds.get_all_records(limit=limit * 5)  # 多取一些，便于按产品聚合后仍有足够条数
        if not records:
            return {"success": True, "result": "暂无无货产品记录。"}
        # 按 product_key 聚合：每个产品只保留「被报无货次数」最大的那条（即当前状态）
        by_key: Dict[str, dict] = {}
        for r in records:
            key = r.get("product_key") or ""
            if not key:
                continue
            cnt = r.get("count") or 1
            if key not in by_key or (by_key[key].get("count") or 0) < cnt:
                by_key[key] = r
        product_list = list(by_key.values())[:limit]
        lines = ["## 无货产品列表\n"]
        for i, r in enumerate(product_list[:50]):
            name = r.get("product_name", "")
            spec = r.get("specification", "") or ""
            unit = r.get("unit", "") or ""
            qty = r.get("quantity", "")
            count = r.get("count") or 1
            email_status = r.get("email_status") or "pending"
            email_label = "已发送" if (email_status == "sent" or (r.get("email_sent_count") or 0) > 0) else "未发"
            lines.append(f"  {i+1}. {name} {spec} | 数量: {qty} {unit} | **被报无货 {count} 次** | 邮件: {email_label}")
        if len(product_list) > 50:
            lines.append(f"\n... 共 {len(product_list)} 个无货产品，仅展示前 50 个")
        return {"success": True, "result": "\n".join(lines)}
    except Exception as e:
        logger.exception("get_oos_list 失败")
        return {"success": False, "result": f"查询失败: {e}"}


def _run_oos_stats() -> dict:
    try:
        from backend.tools.oos.services.data_service import DataService
        ds = DataService()
        stats = ds.get_statistics()
        result = (
            f"## 无货产品统计\n"
            f"- 总记录数: {stats.get('total_records', 0)}\n"
            f"- 无货产品数: {stats.get('out_of_stock_count', 0)}\n"
            f"- 被报无货≥2 次的产品数: {stats.get('notified_count', 0)}\n"
            f"- 已发邮件产品数: {stats.get('email_sent_product_count', 0)}\n"
            f"- 今日新增: {stats.get('today_count', 0)}\n"
        )
        return {"success": True, "result": result}
    except Exception as e:
        logger.exception("get_oos_stats 失败")
        return {"success": False, "result": str(e)}


def _run_oos_by_file(limit: int = 50) -> dict:
    try:
        from backend.tools.oos.services.data_service import DataService
        ds = DataService()
        files = ds.get_files_summary()
        if not files:
            return {"success": True, "result": "## 无货按文件统计\n暂无按文件的记录。"}
        lines = ["## 无货按文件统计\n"]
        for i, f in enumerate(files[:limit]):
            name = f.get("file_name", "")
            total = f.get("total_records", 0)
            at = f.get("uploaded_at", "") or ""
            if at and len(at) > 19:
                at = at[:10] + " " + at[11:19]
            lines.append(f"  {i+1}. {name} | 记录数: {total} | 上传: {at}")
        if len(files) > limit:
            lines.append(f"\n... 共 {len(files)} 个文件，仅展示前 {limit} 个")
        return {"success": True, "result": "\n".join(lines)}
    except Exception as e:
        logger.exception("get_oos_by_file 失败")
        return {"success": False, "result": str(e)}


def _run_oos_by_time(last_n_days: int = 30) -> dict:
    try:
        from backend.tools.oos.services.data_service import DataService
        ds = DataService()
        rows = ds.get_records_grouped_by_date(last_n_days=last_n_days)
        if not rows:
            return {"success": True, "result": f"## 无货按时间统计（最近 {last_n_days} 天）\n暂无记录。"}
        lines = [f"## 无货按时间统计（最近 {last_n_days} 天）\n"]
        for i, r in enumerate(rows[:60]):
            lines.append(f"  {r.get('date', '')} | 新增记录: {r.get('count', 0)}")
        if len(rows) > 60:
            lines.append(f"\n... 共 {len(rows)} 天有数据，仅展示前 60 天")
        return {"success": True, "result": "\n".join(lines)}
    except Exception as e:
        logger.exception("get_oos_by_time 失败")
        return {"success": False, "result": str(e)}


def _run_register_oos(file_path: str, context: Optional[Dict] = None, prompt: Optional[str] = None) -> dict:
    try:
        from backend.tools.oos.services.agent_runner import run_quotation_agent
        file_path = (file_path or "").strip()
        if not file_path and context:
            file_path = (context.get("file_path") or "").strip()
        if not file_path:
            return {"success": False, "result": "无货登记需要 file_path，请先上传报价单并在 context 中提供 file_path。"}
        from pathlib import Path
        if not Path(file_path).exists():
            return {"success": False, "result": f"文件不存在: {file_path}"}
        file_name = (context or {}).get("file_name") or Path(file_path).name
        prompt = prompt or (context or {}).get("prompt") or "抓取这份报价单的无货数据，把选中的持久化到数据库。"
        out = run_quotation_agent(file_path=file_path, question=prompt, file_name=file_name)
        if out.get("error"):
            return {"success": False, "result": out.get("answer", "") or out["error"]}
        return {"success": True, "result": out.get("answer", "无货登记完成。")}
    except Exception as e:
        logger.exception("register_oos 失败")
        return {"success": False, "result": str(e)}


async def execute_tool(
    name: str,
    arguments: Dict[str, Any],
    context: Optional[Dict[str, Any]] = None,
) -> str:
    """
    执行任意工具，返回观察文本（供 ReAct 下一轮使用）。
    """
    ctx = context or {}

    # 澄清
    if name == "ask_clarification":
        q = arguments.get("questions") or []
        r = arguments.get("reasoning") or ""
        return json.dumps({"needs_clarification": True, "questions": q, "reasoning": r}, ensure_ascii=False)

    # 业务知识追加（Agent 在用户说「记录到知识库」等时调用）
    if name == "append_business_knowledge":
        from backend.agent.remember import append_business_knowledge as do_append
        content = (arguments.get("content") or "").strip()
        msg = do_append(content)
        return msg

    # 询价填充
    if name == "run_quotation_fill":
        file_path = (arguments.get("file_path") or "").strip() or (ctx.get("file_path") or "").strip()
        err = _validate_file_path(file_path, "run_quotation_fill")
        if err:
            return err
        customer_level = (arguments.get("customer_level") or "B").strip().upper() or "B"
        if customer_level not in _VALID_CUSTOMER_LEVELS:
            return _tool_error(
                f"[run_quotation_fill] customer_level 无效: {customer_level!r}，"
                f"合法值为 {sorted(_VALID_CUSTOMER_LEVELS)}，请重新调用"
            )
        try:
            from backend.tools.quotation.flow_orchestrator import run_quotation_fill_flow
            result = await asyncio.to_thread(
                run_quotation_fill_flow,
                quotation_path=file_path,
                customer_level=customer_level,
            )
            return json.dumps(result, ensure_ascii=False)
        except Exception as e:
            logger.exception("run_quotation_fill 失败")
            return json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)

    # 无货
    if name == "get_oos_list":
        limit = arguments.get("limit")
        if limit is None:
            limit = 100
        try:
            limit = int(limit)
        except (TypeError, ValueError):
            limit = 100
        out = await asyncio.to_thread(_run_oos_list, limit)
        return out.get("result", "") if out.get("success") else json.dumps(out, ensure_ascii=False)

    if name == "get_oos_stats":
        out = await asyncio.to_thread(_run_oos_stats)
        return out.get("result", "") if out.get("success") else json.dumps(out, ensure_ascii=False)

    if name == "get_oos_by_file":
        limit = arguments.get("limit")
        if limit is None:
            limit = 50
        try:
            limit = int(limit)
        except (TypeError, ValueError):
            limit = 50
        out = await asyncio.to_thread(_run_oos_by_file, limit)
        return out.get("result", "") if out.get("success") else json.dumps(out, ensure_ascii=False)

    if name == "get_oos_by_time":
        last_n_days = arguments.get("last_n_days")
        if last_n_days is None:
            last_n_days = 30
        try:
            last_n_days = int(last_n_days)
        except (TypeError, ValueError):
            last_n_days = 30
        out = await asyncio.to_thread(_run_oos_by_time, last_n_days)
        return out.get("result", "") if out.get("success") else json.dumps(out, ensure_ascii=False)

    if name == "register_oos":
        fp = (arguments.get("file_path") or "").strip() or (ctx.get("file_path") or "").strip()
        out = await asyncio.to_thread(_run_register_oos, fp, ctx, arguments.get("prompt"))
        return out.get("result", "") if out.get("success") else json.dumps(out, ensure_ascii=False)

    # 库存工具
    if name in _INVENTORY_TOOLS:
        try:
            from backend.tools.inventory.services.inventory_agent_tools import execute_inventory_tool, config as inv_config
            timeout_sec = getattr(inv_config, "TOOL_EXEC_TIMEOUT", 35)
            out = await asyncio.wait_for(
                asyncio.to_thread(execute_inventory_tool, name, arguments),
                timeout=timeout_sec,
            )
            if out.get("success"):
                return out.get("result", "")
            return json.dumps(out, ensure_ascii=False)
        except asyncio.TimeoutError:
            timeout_sec = 35
            return json.dumps({"success": False, "error": f"工具执行超时（{timeout_sec} 秒），请检查 AOL_* 配置与网络，或稍后重试。"}, ensure_ascii=False)
        except Exception as e:
            logger.exception("execute_inventory_tool 失败: %s", e)
            return json.dumps({"error": str(e)}, ensure_ascii=False)

    # 报价单工具
    if name in _QUOTE_TOOLS:
        if name in _QUOTE_TOOLS_WITH_FILE:
            fp = (arguments.get("file_path") or "").strip() or (ctx.get("file_path") or "").strip()
            err = _validate_file_path(fp, name)
            if err:
                return err
        try:
            from backend.tools.quotation.quote_tools import execute_quote_tool
            out = await asyncio.to_thread(execute_quote_tool, name, arguments)
            if out.get("success"):
                return out.get("result", "") or json.dumps({k: v for k, v in out.items() if k != "success"}, ensure_ascii=False)
            return json.dumps(out, ensure_ascii=False)
        except Exception as e:
            logger.exception("execute_quote_tool 失败: %s", e)
            return json.dumps({"error": str(e)}, ensure_ascii=False)

    return json.dumps({"error": f"未知工具: {name}"}, ensure_ascii=False)
