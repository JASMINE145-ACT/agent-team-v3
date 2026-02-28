"""
Work Mode 专用工具：报价单子步骤，仅在工作流执行器中注册，不影响 Chat。
子步骤：extract / match_and_inventory / fill / shortage_report；无货登记复用 register_oos。
"""
from __future__ import annotations

import json
import logging
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from typing import Any, Optional

logger = logging.getLogger(__name__)

WORK_TOOLS_OPENAI_FORMAT = [
    {
        "type": "function",
        "function": {
            "name": "work_quotation_extract",
            "description": "【Work】从报价单 Excel 提取询价行（产品名、规格、数量等）。返回 items 列表供下一步 match 使用。",
            "parameters": {
                "type": "object",
                "properties": {
                    "file_path": {"type": "string", "description": "报价单路径"},
                    "sheet_name": {"type": "string", "description": "工作表名，可选"},
                },
                "required": ["file_path"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "work_quotation_match",
            "description": "【Work】对已提取的询价项执行匹配与库存校验（历史→万鼎→库存），返回 to_fill、shortage、unmatched，供 fill 与 shortage_report 使用。",
            "parameters": {
                "type": "object",
                "properties": {
                    "file_path": {"type": "string", "description": "报价单路径（用于与 extract 对应）"},
                    "customer_level": {"type": "string", "enum": ["FACTORY_INC_TAX", "FACTORY_EXC_TAX", "PURCHASE_EXC_TAX", "A_MARGIN", "A_QUOTE", "B_MARGIN", "B_QUOTE", "C_MARGIN", "C_QUOTE", "D_MARGIN", "D_QUOTE", "D_LOW", "E_MARGIN", "E_QUOTE"], "description": "价格档位：出厂价_含税/不含税、采购不含税、二级代理A/一级代理B/聚万C/青山D/大唐E 各级别（利润率、报单价格、D降低利润率），默认 B_QUOTE"},
                },
                "required": ["file_path"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "work_quotation_fill",
            "description": "【Work】将 to_fill、shortage、unmatched 合并后回填到报价单 Excel。fill_items 来自上一步 work_quotation_match 的合并结果。",
            "parameters": {
                "type": "object",
                "properties": {
                    "file_path": {"type": "string", "description": "报价单路径"},
                    "fill_items": {"type": "array", "description": "回填项列表，每项含 row, code, quote_name, unit_price, qty, specification"},
                    "output_path": {"type": "string", "description": "输出路径，可选，默认原文件_stem_filled.xlsx"},
                    "sheet_name": {"type": "string", "description": "工作表名，可选"},
                },
                "required": ["file_path", "fill_items"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "work_quotation_shortage_report",
            "description": "【Work】根据 shortage 列表生成缺货报告（Markdown + summary）。",
            "parameters": {
                "type": "object",
                "properties": {
                    "shortage_items": {"type": "array", "description": "库存不足项列表，来自 work_quotation_match 的 shortage"},
                },
                "required": ["shortage_items"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "register_oos",
            "description": "【Work】无货登记：从报价单解析无货行并落库。",
            "parameters": {
                "type": "object",
                "properties": {
                    "file_path": {"type": "string", "description": "报价单路径"},
                    "prompt": {"type": "string", "description": "可选"},
                },
                "required": ["file_path"],
            },
        },
    },
]


def _run_work_quotation_extract(file_path: str, sheet_name: Optional[str] = None) -> dict[str, Any]:
    from backend.tools.quotation.quote_tools import extract_inquiry_items
    out = extract_inquiry_items(file_path, sheet_name=sheet_name)
    return out


def _run_work_quotation_match(
    file_path: str,
    customer_level: str = "B",
    price_library_path: Optional[str] = None,
    sheet_name: Optional[str] = None,
) -> dict[str, Any]:
    """与 Chat 一致：共同查询（历史+万鼎并集）+ LLM 选型，见 match_price_and_get_inventory。"""
    from backend.tools.inventory.services.match_and_inventory import match_price_and_get_inventory
    from backend.tools.quotation.quote_tools import extract_inquiry_items

    ext = extract_inquiry_items(file_path, sheet_name=sheet_name)
    if not ext.get("success"):
        return {"success": False, "error": ext.get("error", "提取失败"), "to_fill": [], "shortage": [], "unmatched": [], "items": []}
    items = ext.get("items", [])
    if not items:
        return {"success": True, "to_fill": [], "shortage": [], "unmatched": [], "items": [], "fill_items_merged": []}

    to_fill: list[dict] = []
    shortage: list[dict] = []
    unmatched: list[dict] = []
    pending_choices: list[dict] = []

    def _match_one(it: dict) -> Optional[dict]:
        try:
            return match_price_and_get_inventory(
                it.get("keywords", ""),
                customer_level=customer_level,
                price_library_path=price_library_path,
                allow_suggestions_for_work=True,
            )
        except Exception as e:
            logger.debug("match_price_and_get_inventory 失败: %s", e)
            return None

    with ThreadPoolExecutor(max_workers=5) as pool:
        match_results = list(pool.map(_match_one, items))

    for it, result in zip(items, match_results):
        qty = it.get("qty", 0)
        row = it.get("row")
        product_name = it.get("product_name", "")
        specification = it.get("specification", "")
        keywords = it.get("keywords", "")

        if not result:
            unmatched.append({
                "row": row,
                "product_name": product_name,
                "specification": specification,
                "qty": qty,
            })
            continue
        if result.get("_needs_human_choice"):
            choice_id = f"{file_path}|{row}"
            pending_choices.append({
                "id": choice_id,
                "row": row,
                "keywords": keywords,
                "product_name": product_name,
                "specification": specification,
                "qty": qty,
                "options": result.get("options", []),
            })
            continue
        code = result.get("code", "")
        unit_price = result.get("unit_price", 0)
        quote_name = (result.get("matched_name", "") or "")[:200]
        available_qty = result.get("available_qty", 0.0)
        if available_qty >= qty:
            to_fill.append({
                "row": row,
                "code": code,
                "quote_name": quote_name,
                "unit_price": unit_price,
                "qty": qty,
                "specification": specification,
            })
        else:
            shortfall = max(0, qty - available_qty)
            shortage.append({
                "row": row,
                "product_name": product_name,
                "specification": specification,
                "qty": qty,
                "available_qty": available_qty,
                "shortfall": shortfall,
                "code": code,
                "quote_name": quote_name,
                "unit_price": unit_price,
            })

    fill_items_merged = list(to_fill)
    for s in shortage:
        fill_items_merged.append({
            "row": s.get("row"),
            "code": s.get("code", ""),
            "quote_name": ((s.get("quote_name") or "") + "（库存不足）"),
            "unit_price": s.get("unit_price"),
            "qty": s.get("qty", 0),
            "specification": s.get("specification", ""),
        })
    for u in unmatched:
        fill_items_merged.append({
            "row": u["row"],
            "code": "无货",
            "quote_name": "",
            "unit_price": None,
            "qty": u.get("qty", 0),
            "specification": u.get("specification", ""),
        })

    out: dict[str, Any] = {
        "success": True,
        "to_fill": to_fill,
        "shortage": shortage,
        "unmatched": unmatched,
        "items": items,
        "fill_items_merged": fill_items_merged,
    }
    if pending_choices:
        out["needs_human_choice"] = True
        out["pending_choices"] = pending_choices
    return out


# 人工选择时用此 code 表示「选不出来，按无货」
PENDING_AS_OOS_CODE = "__OOS__"


def merge_work_pending_choices(match_result: dict[str, Any], selections: list[dict]) -> dict[str, Any]:
    """
    将人工选择合并进 work_quotation_match 结果。
    match_result 含 needs_human_choice 与 pending_choices；selections 为 [{ item_id, selected_code }]。
    selected_code 为 __OOS__ 或未提供选择的项：一律按无货（选不出来就无货）。
    返回同结构但无 needs_human_choice，pending 项已并入 to_fill/shortage/unmatched/fill_items_merged。
    """
    import copy
    pending = match_result.get("pending_choices", [])
    if not pending:
        out = copy.deepcopy(match_result)
        out.pop("needs_human_choice", None)
        out["pending_choices"] = []
        return out
    sel_map = {str(s.get("item_id", "")).strip(): str(s.get("selected_code", "")).strip() for s in (selections or []) if s.get("item_id") is not None}
    to_fill = list(match_result.get("to_fill", []))
    shortage = list(match_result.get("shortage", []))
    unmatched = list(match_result.get("unmatched", []))
    fill_items_merged = list(match_result.get("fill_items_merged", []))
    available_qty_fn = None
    try:
        from backend.tools.inventory.agents.table_agent import InventoryTableAgent
        _table = InventoryTableAgent()
        def _avail(c: str):
            it = _table.get_item_by_code(c)
            return float(getattr(it, "qty_available", 0) or 0) if it else 0.0
        available_qty_fn = _avail
    except Exception:
        pass
    for pc in pending:
        cid = pc.get("id", "")
        code = (sel_map.get(cid) or sel_map.get(cid.strip()) or "").strip()
        row = pc.get("row")
        qty = int(pc.get("qty", 0) or 0)
        specification = pc.get("specification", "")
        product_name = pc.get("product_name", "")
        # 选不出来就无货：未选、选 __OOS__、或选的 code 不在 options 里 → 按无货
        if not code or code.upper() == PENDING_AS_OOS_CODE:
            unmatched.append({"row": row, "product_name": product_name, "specification": specification, "qty": qty})
            fill_items_merged.append({
                "row": row,
                "code": "无货",
                "quote_name": "",
                "unit_price": None,
                "qty": qty,
                "specification": specification,
            })
            continue
        options = pc.get("options", [])
        opt = next((o for o in options if (str(o.get("code") or "").strip() == code)), None)
        if not opt:
            unmatched.append({"row": row, "product_name": product_name, "specification": specification, "qty": qty})
            fill_items_merged.append({
                "row": row,
                "code": "无货",
                "quote_name": "",
                "unit_price": None,
                "qty": qty,
                "specification": specification,
            })
            continue
        quote_name = (opt.get("matched_name") or "")[:200]
        unit_price = float(opt.get("unit_price", 0) or 0)
        available_qty = available_qty_fn(code) if available_qty_fn else 0.0
        if available_qty >= qty:
            to_fill.append({"row": row, "code": code, "quote_name": quote_name, "unit_price": unit_price, "qty": qty, "specification": specification})
            fill_items_merged.append({"row": row, "code": code, "quote_name": quote_name, "unit_price": unit_price, "qty": qty, "specification": specification})
        else:
            shortfall = max(0, qty - available_qty)
            shortage.append({
                "row": row,
                "product_name": product_name,
                "specification": specification,
                "qty": qty,
                "available_qty": available_qty,
                "shortfall": shortfall,
                "code": code,
                "quote_name": quote_name,
                "unit_price": unit_price,
            })
            fill_items_merged.append({
                "row": row,
                "code": code,
                "quote_name": quote_name + "（库存不足）",
                "unit_price": unit_price,
                "qty": qty,
                "specification": specification,
            })
    out = copy.deepcopy(match_result)
    out["to_fill"] = to_fill
    out["shortage"] = shortage
    out["unmatched"] = unmatched
    out["fill_items_merged"] = fill_items_merged
    out.pop("needs_human_choice", None)
    out["pending_choices"] = []
    return out


def _run_work_quotation_fill(
    file_path: str,
    fill_items: list[dict],
    output_path: Optional[str] = None,
    sheet_name: Optional[str] = None,
) -> dict[str, Any]:
    from backend.tools.quotation.quote_tools import fill_quotation
    if not output_path:
        p = Path(file_path)
        output_path = str(p.parent / (p.stem + "_filled" + p.suffix))
    return fill_quotation(
        file_path=file_path,
        fill_items=fill_items,
        sheet_name=sheet_name,
        output_path=output_path,
    )


def _run_work_quotation_shortage_report(shortage_items: list[dict]) -> dict[str, Any]:
    from backend.tools.quotation.shortage_report import generate_shortage_report
    return generate_shortage_report(shortage_items)


def execute_work_tool_sync(name: str, arguments: dict[str, Any]) -> str:
    """同步执行 Work 工具，返回 JSON 字符串供 ReAct 观察。"""
    args = arguments or {}
    file_path = (args.get("file_path") or "").strip()
    if name == "work_quotation_extract":
        sheet_name = (args.get("sheet_name") or "").strip() or None
        out = _run_work_quotation_extract(file_path, sheet_name=sheet_name)
        return json.dumps(out, ensure_ascii=False)
    if name == "work_quotation_match":
        customer_level = (args.get("customer_level") or "B").strip().upper() or "B"
        sheet_name = (args.get("sheet_name") or "").strip() or None
        out = _run_work_quotation_match(file_path, customer_level=customer_level, sheet_name=sheet_name)
        # 缺货记录落库，与无货记录同一逻辑，供 OOS 看板「缺货记录」展示
        shortage_list = out.get("shortage") or []
        if shortage_list and out.get("success"):
            try:
                from backend.tools.oos.services.data_service import DataService
                file_name = Path(file_path).name if file_path else "unknown"
                ds = DataService()
                ds.insert_shortage_records(file_name, [{"product_name": s.get("product_name"), "specification": s.get("specification"), "quantity": s.get("qty"), "available_qty": s.get("available_qty"), "shortfall": s.get("shortfall"), "code": s.get("code"), "quote_name": s.get("quote_name"), "unit_price": s.get("unit_price")} for s in shortage_list])
            except Exception as e:
                logger.debug("缺货记录落库跳过: %s", e)
        return json.dumps(out, ensure_ascii=False)
    if name == "work_quotation_fill":
        fill_items = args.get("fill_items") or []
        output_path = (args.get("output_path") or "").strip() or None
        sheet_name = (args.get("sheet_name") or "").strip() or None
        out = _run_work_quotation_fill(file_path, fill_items, output_path=output_path, sheet_name=sheet_name)
        return json.dumps(out, ensure_ascii=False)
    if name == "work_quotation_shortage_report":
        shortage_items = args.get("shortage_items") or []
        out = _run_work_quotation_shortage_report(shortage_items)
        return json.dumps(out, ensure_ascii=False)
    if name == "register_oos":
        from backend.agent.tools import _run_register_oos
        out = _run_register_oos(file_path or "", {}, args.get("prompt"))
        return out.get("result", json.dumps(out, ensure_ascii=False)) if out.get("success") else json.dumps(out, ensure_ascii=False)
    return json.dumps({"error": f"未知 Work 工具: {name}"}, ensure_ascii=False)
