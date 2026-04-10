"""
差额报告 - 需求不满足时整理产品信息与差额，供报价员处理
"""

from __future__ import annotations

from typing import Any


def generate_shortage_report(shortage_items: list[dict[str, Any]]) -> dict[str, Any]:
    """
    生成差额报告

    Args:
        shortage_items: 每项含 product_name, specification, qty, warehouse_qty, available_qty, shortfall, code(可选)

    Returns:
        {"markdown": str, "items": [...], "summary": str}
    """
    if not shortage_items:
        return {"markdown": "", "items": [], "summary": "无差额项"}

    lines = [
        "## 需求差额报告",
        "",
        "以下产品库存不足，请报价员处理：",
        "",
        "| 产品名 | 规格 | 需求数量 | 库存数量 | 可售数量 | 差额 | 产品编号 |",
        "|--------|------|----------|----------|----------|------|----------|",
    ]
    for it in shortage_items:
        name = (it.get("product_name") or "").replace("|", "\\|")
        spec = (it.get("specification") or "").replace("|", "\\|")
        qty = it.get("qty", 0)
        # 兼容历史/混合结构：优先 warehouse_qty，其次 qty_warehouse，最后回退 available_qty（仅用于报表展示）。
        warehouse = it.get("warehouse_qty", it.get("qty_warehouse", it.get("available_qty", 0)))
        avail = it.get("available_qty", 0)
        shortfall = it.get("shortfall", max(0, qty - warehouse))
        code = it.get("code") or ""
        lines.append(f"| {name} | {spec} | {qty} | {warehouse} | {avail} | {shortfall} | {code} |")

    summary = f"共 {len(shortage_items)} 项库存不足"
    return {
        "markdown": "\n".join(lines),
        "items": shortage_items,
        "summary": summary,
    }
