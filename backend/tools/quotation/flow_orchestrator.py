"""
报价单询价填充流程编排

extract → Inventory.match_price_and_get_inventory（万鼎 + Resolver fallback + 库存）→ fill / shortage_report
"""

from __future__ import annotations

import logging
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from typing import Any, Optional

from backend.tools.quotation.quote_tools import (
    extract_inquiry_items,
    fill_quotation,
)
from backend.tools.quotation.shortage_report import generate_shortage_report

logger = logging.getLogger(__name__)


def run_quotation_fill_flow(
    quotation_path: str,
    price_library_path: Optional[str | Path] = None,
    output_path: Optional[str] = None,
    sheet_name: Optional[str] = None,
    customer_level: str = "B",
    fill_even_shortage_for_test: bool = False,
) -> dict[str, Any]:
    """
    执行报价单询价填充完整流程。

    Args:
        quotation_path: 原始报价单 Excel 路径
        price_library_path: 万鼎价格库路径，默认从 Config 读取
        output_path: 填充后输出路径，默认原文件_suffix_filled.xlsx
        sheet_name: 报价单工作表名
        customer_level: 客户级别 A/B/C/D（A=第一档利润价格）
    fill_even_shortage_for_test: 测试用，库存不足时仍回填（便于验证完整流程）

    Returns:
        {
            "success": bool,
            "filled_path": str,
            "filled_count": int,
            "shortage_report": {...},
            "unmatched": [...],
            "summary": str,
            "error": str | None,
        }
    """
    if not output_path:
        p = Path(quotation_path)
        output_path = str(p.parent / (p.stem + "_filled" + p.suffix))

    ext = extract_inquiry_items(quotation_path, sheet_name=sheet_name)
    if not ext.get("success"):
        return {
            "success": False,
            "filled_path": "",
            "filled_count": 0,
            "shortage_report": {},
            "unmatched": [],
            "summary": "提取询价项失败",
            "error": ext.get("error", "未知错误"),
            "items": [],
            "to_fill": [],
            "shortage": [],
        }

    items = ext.get("items", [])
    if not items:
        return {
            "success": True,
            "filled_path": output_path,
            "filled_count": 0,
            "shortage_report": {"markdown": "", "items": [], "summary": "无询价项"},
            "unmatched": [],
            "summary": "无询价项可处理",
            "error": None,
            "items": [],
            "to_fill": [],
            "shortage": [],
        }

    to_fill: list[dict] = []
    shortage: list[dict] = []
    unmatched: list[dict] = []

    # 并发匹配：万鼎 + 库存（每项独立网络 I/O，最多 5 并发）
    def _match_one(it):
        try:
            from backend.tools.inventory.services.match_and_inventory import match_price_and_get_inventory
            return match_price_and_get_inventory(
                it.get("keywords", ""),
                customer_level=customer_level,
                price_library_path=str(price_library_path) if price_library_path else None,
            )
        except Exception as e:
            logger.debug("match_price_and_get_inventory 失败: %s", e)
            return None

    with ThreadPoolExecutor(max_workers=5) as pool:
        match_results = list(pool.map(_match_one, items))

    for it, result in zip(items, match_results):
        qty = it.get("qty", 0)
        if not result:
            unmatched.append({
                "row": it.get("row"),
                "product_name": it.get("product_name"),
                "specification": it.get("specification"),
                "qty": qty,
            })
            continue
        code = result.get("code", "")
        unit_price = result.get("unit_price", 0)
        quote_name = result.get("matched_name", "")[:200]
        available_qty = result.get("available_qty", 0.0)
        if available_qty >= qty or fill_even_shortage_for_test:
            to_fill.append({
                "row": it.get("row"),
                "code": code,
                "quote_name": quote_name,
                "unit_price": unit_price,
                "qty": qty,
                "specification": it.get("specification"),
            })
        if available_qty < qty:
            shortfall = max(0, qty - available_qty)
            shortage.append({
                "row": it.get("row"),
                "product_name": it.get("product_name"),
                "specification": it.get("specification"),
                "qty": qty,
                "available_qty": available_qty,
                "shortfall": shortfall,
                "code": code,
                # 库存不足也需要回填编号与报价信息，便于报价员看到匹配结果
                "quote_name": quote_name,
                "unit_price": unit_price,
            })

    # 合并 to_fill、shortage 与 unmatched：
    # - shortage：回填编号，但在报价名称中标记「（库存不足）」
    # - unmatched：写「无货」
    fill_items_merged = list(to_fill)
    for s in shortage:
        fill_items_merged.append({
            "row": s.get("row"),
            "code": s.get("code", ""),
            "quote_name": (s.get("quote_name") or "") + "（库存不足）",
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

    fill_result = {"filled_count": 0, "error": None}
    if fill_items_merged:
        fill_result = fill_quotation(
            file_path=quotation_path,
            fill_items=fill_items_merged,
            sheet_name=sheet_name,
            output_path=output_path,
        )
        if not fill_result.get("success"):
            return {
                "success": False,
                "filled_path": "",
                "filled_count": 0,
                "shortage_report": generate_shortage_report(shortage),
                "unmatched": unmatched,
                "summary": f"回填失败: {fill_result.get('error')}",
                "error": fill_result.get("error"),
                "items": items,
                "to_fill": to_fill,
                "shortage": shortage,
            }

    shortage_report = generate_shortage_report(shortage)
    summary_parts = [f"已回填 {len(to_fill) + len(shortage)} 项"]
    if shortage:
        summary_parts.append(f"库存不足 {len(shortage)} 项")
    if unmatched:
        summary_parts.append(f"未匹配 {len(unmatched)} 项")
    summary = "；".join(summary_parts)

    return {
        "success": True,
        "filled_path": output_path,
        "filled_count": fill_result.get("filled_count", len(to_fill)),
        "shortage_report": shortage_report,
        "unmatched": unmatched,
        "summary": summary,
        "error": None,
        # 结构化明细，供 Master / 评估使用
        "items": items,
        "to_fill": to_fill,
        "shortage": shortage,
    }
