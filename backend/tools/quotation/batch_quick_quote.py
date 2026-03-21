"""
批量快速询价工具

职责：
1. 调用 inquiry_text_parser 解析纯文字
2. 并发调用 match_price_and_get_inventory 匹配万鼎价格+库存
3. 格式化为 Markdown 表格（8列：询价货物名称、询价规格型号、数量、产品编号、报价名称、报价产品规格、单价、总价、库存是否满足）
"""

from __future__ import annotations

import logging
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import Any, Optional

logger = logging.getLogger(__name__)


def batch_quick_quote(
    inquiry_text: str,
    customer_level: str = "B",
    max_items: Optional[int] = None,
    timeout_sec: Optional[int] = None,
) -> dict[str, Any]:
    """
    批量快速询价，返回 Markdown 表格。
    
    Args:
        inquiry_text: 用户输入文字，如 "50三通 100个，25弯头 50个"
        customer_level: 价格档位，默认 B（一级代理）
        max_items: 最多处理条数，默认从 Config 读取
        timeout_sec: 总超时秒数，默认从 Config 读取
    
    Returns:
        {
            "success": bool,
            "result": str (Markdown 表格),
            "data": {
                "items": [...],
                "stats": {"total": int, "matched": int, "unmatched": int, "shortage": int}
            },
            "error": str | None
        }
    """
    from backend.config import Config
    
    if max_items is None:
        max_items = Config.BATCH_QUOTE_MAX_ITEMS
    if timeout_sec is None:
        timeout_sec = Config.BATCH_QUOTE_TIMEOUT_SEC
    
    # 1. 解析文字为结构化询价项
    from backend.tools.quotation.inquiry_text_parser import parse_inquiry_text
    
    parse_result = parse_inquiry_text(inquiry_text, max_items=max_items)
    if not parse_result.get("success"):
        return {
            "success": False,
            "result": "",
            "data": {"items": [], "stats": {"total": 0, "matched": 0, "unmatched": 0, "shortage": 0}},
            "error": parse_result.get("error", "解析失败"),
        }
    
    inquiry_items = parse_result.get("items", [])
    if not inquiry_items:
        return {
            "success": False,
            "result": "",
            "data": {"items": [], "stats": {"total": 0, "matched": 0, "unmatched": 0, "shortage": 0}},
            "error": "未能识别任何询价项，请按「产品名 规格 数量」格式",
        }
    
    # 2. 并发匹配万鼎价格+库存
    matched_items = []
    unmatched_count = 0
    shortage_count = 0
    
    def _match_one(item: dict) -> dict:
        """匹配单个询价项，返回匹配结果"""
        try:
            from backend.tools.inventory.services.match_and_inventory import match_price_and_get_inventory
            
            # 拼接 keywords：product_name + specification
            keywords = f"{item['product_name']} {item['specification']}".strip()
            
            result = match_price_and_get_inventory(
                keywords=keywords,
                customer_level=customer_level,
            )
            
            return {
                "inquiry_item": item,
                "match_result": result,
            }
        except Exception as e:
            logger.debug("match_price_and_get_inventory 失败 (%s): %s", item.get("product_name"), e)
            return {
                "inquiry_item": item,
                "match_result": None,
            }
    
    # 使用线程池并发匹配（最多 10 并发，避免过载）
    with ThreadPoolExecutor(max_workers=10) as pool:
        futures = [pool.submit(_match_one, item) for item in inquiry_items]
        
        for future in as_completed(futures, timeout=timeout_sec):
            try:
                match_data = future.result()
                matched_items.append(match_data)
            except Exception as e:
                logger.warning("并发匹配之一失败: %s", e)
    
    # 3. 格式化为 Markdown 表格
    table_lines = [
        "| 询价货物名称 | 询价规格型号 | 数量 | 产品编号 | 报价名称 | 报价产品规格 | 单价 | 总价 | 库存是否满足 |",
        "|---|---|---|---|---|---|---|---|---|",
    ]
    
    for match_data in matched_items:
        inquiry_item = match_data["inquiry_item"]
        match_result = match_data["match_result"]
        
        # 询价信息
        product_name = inquiry_item.get("product_name", "")
        specification = inquiry_item.get("specification", "")
        quantity = inquiry_item.get("quantity", 0)
        
        if not match_result:
            # 未匹配
            unmatched_count += 1
            table_lines.append(
                f"| {product_name} | {specification} | {quantity} | 无货 | - | - | - | - | 未匹配 |"
            )
            continue
        
        # 匹配成功
        code = match_result.get("code", "")
        matched_name = match_result.get("matched_name", "")
        unit_price = match_result.get("unit_price", 0.0)
        available_qty = match_result.get("available_qty", 0.0)
        
        # 从 matched_name 中提取规格（简单处理，取最后的规格部分）
        # 例如 "PPR三通 DN50" -> "DN50"
        quote_spec = _extract_spec_from_name(matched_name, specification)
        
        # 计算总价
        total_price = unit_price * quantity
        
        # 库存判断
        if available_qty >= quantity:
            stock_status = "✓ 满足"
        else:
            shortage = max(0, quantity - available_qty)
            stock_status = f"✗ 不足(缺{int(shortage)})"
            shortage_count += 1
        
        table_lines.append(
            f"| {product_name} | {specification} | {quantity} | {code} | {matched_name} | {quote_spec} | {unit_price:.2f} | {total_price:.2f} | {stock_status} |"
        )
    
    matched_count = len(matched_items) - unmatched_count
    
    # 4. 拼接统计信息
    stats_lines = [
        f"\n**统计**：",
        f"- 总询价项：{len(inquiry_items)}",
        f"- 已匹配：{matched_count}",
        f"- 未匹配：{unmatched_count}",
        f"- 库存不足：{shortage_count}",
    ]
    
    result_text = "\n".join(table_lines) + "\n" + "\n".join(stats_lines)
    
    return {
        "success": True,
        "result": result_text,
        "data": {
            "items": matched_items,
            "stats": {
                "total": len(inquiry_items),
                "matched": matched_count,
                "unmatched": unmatched_count,
                "shortage": shortage_count,
            },
        },
        "error": None,
    }


def _extract_spec_from_name(matched_name: str, fallback_spec: str) -> str:
    """
    从匹配产品名中提取规格。
    例如："PPR三通 DN50" -> "DN50"
    """
    import re
    
    # 优先从 matched_name 中提取规格模式
    spec_match = re.search(r'(DN\s*\d+|[0-9]+(?:\.[0-9]+)?(?:/[0-9]+)?["\']?(?:mm|cm|m)?)', matched_name, re.IGNORECASE)
    if spec_match:
        return spec_match.group(1).strip()
    
    # 回退到用户输入的规格
    return fallback_spec or "-"
