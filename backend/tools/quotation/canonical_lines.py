# 报价规范行：match 之后唯一构建「规范行」并在此处产出规格（询价规格 + 报价产品规），
# 供 pending_quotation_draft.lines 与 fill_quotation 入参共用，保证表格与草稿一致。
# 其它模块不再改写 specification / quote_spec。

from __future__ import annotations

import logging
from typing import Any, List, Optional

logger = logging.getLogger(__name__)

# 规范行 schema（与 pending_quotation_draft.lines 每项一致）：
# row, row_index, product_name, specification, qty, code, quote_name, quote_spec,
# unit_price, amount, available_qty, shortfall, is_shortage, match_source
# 约定：specification = 询价规格（来自 item/fi），quote_spec = 报价产品规（规则 + 可选批量 LLM），仅在此模块内赋值。


def _to_float_or_none(value: Any) -> float | None:
    if value is None:
        return None
    if isinstance(value, bool):
        return float(int(value))
    if isinstance(value, (int, float)):
        return float(value)
    s = str(value).strip().replace(",", "")
    if not s:
        return None
    try:
        return float(s)
    except (TypeError, ValueError):
        return None


def _to_float(value: Any, default: float = 0.0) -> float:
    parsed = _to_float_or_none(value)
    return default if parsed is None else parsed


def build_canonical_quotation_lines(
    fill_items_merged: List[dict],
    items: List[dict],
    shortage: Optional[List[dict]] = None,
    *,
    run_spec_llm: bool = True,
) -> List[dict[str, Any]]:
    """
    从 match 输出的 fill_items_merged + items + shortage 构建规范行列表。
    规格（specification / quote_spec）只在此处由规则 + 可选 extract_specs_batch_llm 产出。

    Args:
        fill_items_merged: match 产出的合并填表项（每项含 row, code, quote_name, unit_price, qty, specification）
        items: 询价行（每项含 row, product_name, specification 等）
        shortage: 缺货列表（每项含 row, shortfall, available_qty）
        run_spec_llm: 是否在构建后调用 extract_specs_batch_llm 覆盖 specification/quote_spec（仍受 QUOTATION_SPEC_LLM 配置约束）

    Returns:
        规范行列表，可直接作为 pending_quotation_draft.lines；导出 fill 入参请用 fill_items_from_canonical_lines。
    """
    shortage = shortage or []
    items_by_row = {(it.get("row")): it for it in (items or [])}
    lines: List[dict[str, Any]] = []
    for i, fi in enumerate(fill_items_merged or []):
        row = fi.get("row")
        item = items_by_row.get(row) or {}
        unit_price = _to_float_or_none(fi.get("unit_price"))
        qty = _to_float(fi.get("qty", 0), default=0.0)
        amount = (unit_price * qty) if unit_price is not None else None
        code = fi.get("code") or ""
        is_shortage = 1 if (code == "无货" or "库存不足" in (fi.get("quote_name") or "")) else 0
        shortfall = 0.0
        available_qty = 0.0
        for s in shortage:
            if s.get("row") == row:
                shortfall = _to_float(s.get("shortfall", 0), default=0.0)
                available_qty = _to_float(s.get("available_qty", 0), default=0.0)
                break
        if code == "无货":
            available_qty = 0.0
            shortfall = qty
        elif not is_shortage and shortfall == 0 and available_qty == 0 and code:
            available_qty = qty
        quote_name_str = (fi.get("quote_name") or "").strip()
        spec_inquiry = fi.get("specification") or item.get("specification") or ""
        from backend.tools.quotation.spec_extract import extract_spec_from_quote_name
        quote_spec = extract_spec_from_quote_name(quote_name_str) if quote_name_str else ""
        if not quote_spec:
            quote_spec = spec_inquiry
        lines.append({
            "row_index": i,
            "row": row,
            "product_name": item.get("product_name") or "",
            "specification": spec_inquiry,
            "qty": qty,
            "code": code,
            "quote_name": quote_name_str,
            "quote_spec": quote_spec,
            "unit_price": unit_price,
            "amount": amount,
            "available_qty": available_qty,
            "shortfall": shortfall,
            "is_shortage": is_shortage,
            "match_source": None,
        })
    if run_spec_llm and lines:
        try:
            from backend.tools.quotation.spec_extract import extract_specs_batch_llm
            batch = extract_specs_batch_llm(lines)
            if batch and len(batch) == len(lines):
                for i, res in enumerate(batch):
                    if i >= len(lines):
                        break
                    # 优先采用 LLM 结果（含空字符串）；仅当 LLM 未调用或失败时才用规则
                    if "requested_spec" in res:
                        lines[i]["specification"] = (res.get("requested_spec") or "").strip()[:500]
                    if "quoted_spec" in res:
                        lines[i]["quote_spec"] = (res.get("quoted_spec") or "").strip()[:500]
        except Exception:
            logger.exception("extract_specs_batch_llm failed, keep rule-based specs")
    return lines


def fill_items_from_canonical_lines(canonical_lines: List[dict]) -> List[dict[str, Any]]:
    """
    从规范行导出 fill_quotation 的 fill_items 入参。
    列 J（报价产品规）使用 quote_spec 或 specification，保证 Excel 与草稿一致。

    Returns:
        每项含 row, code, quote_name, unit_price, qty, specification（= line.quote_spec or line.specification）
    """
    out: List[dict[str, Any]] = []
    for line in canonical_lines or []:
        out.append({
            "row": line.get("row"),
            "code": line.get("code") or "",
            "quote_name": line.get("quote_name") or "",
            "unit_price": line.get("unit_price"),
            "qty": line.get("qty", 0),
            "specification": line.get("quote_spec") or line.get("specification") or "",
        })
    return out
