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
            "description": "【无货】无货登记（从报价单）：从已上传的报价单中解析无货行并落库。仅当用户明确说「无货登记」且 context 中已有 file_path 时调用；无 file_path 时勿用。",
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
            "name": "register_oos_from_text",
            "description": "【无货】无货登记（直接登记）：用户用文字说出某产品无货时调用，无需上传文件。例如用户说「外螺纹堵头 50 无货」「报一下 XX 无货」「登记 XX 无货」时，从用户句中解析出 product_name、规格、数量后调用本工具直接落库。与 register_oos 二选一：有 file_path 用 register_oos；无文件、用户直接说产品名+无货则用本工具。",
            "parameters": {
                "type": "object",
                "properties": {
                    "product_name": {"type": "string", "description": "产品名称（必填），如 外螺纹堵头、三角阀"},
                    "specification": {"type": "string", "description": "规格，如 50、50cm、DN25；可选"},
                    "quantity": {"type": "number", "description": "数量，默认 0"},
                    "unit": {"type": "string", "description": "单位，如 个、根；可选"},
                },
                "required": ["product_name"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "run_quotation_fill",
            "description": "【询价填充】整单流水线：提取询价项 → 万鼎匹配 → 库存校验 → 回填 Excel。仅当用户明确要求「询价填充/填充报价单/完整报价」且 context 中已有 file_path 时调用。customer_level 可选报单档位 A/B/C/D/D_low/E 或 出厂价_含税/出厂价_不含税/采购不含税，默认 B。",
            "parameters": {
                "type": "object",
                "properties": {
                    "file_path": {"type": "string", "description": "报价单绝对路径"},
                    "customer_level": {"type": "string", "enum": ["A", "B", "C", "D", "D_low", "E", "出厂价_含税", "出厂价_不含税", "采购不含税"], "description": "价格档位：A 二级代理/B 一级代理/C 聚万大客户/D 青山大客户/D_low 青山(降低)/E 大唐(包运费)；或 出厂价_含税/出厂价_不含税/采购不含税。默认 B"},
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


