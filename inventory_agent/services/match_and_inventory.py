"""
询价填充：万鼎匹配 + 按 code 查库存

万鼎匹配：DataBase-style 模糊逻辑（token + 同义词扩展 + 规格等价 + score 排序）。
返回：{code, matched_name, unit_price, available_qty}，未找到 code 时返回 None。
"""

from __future__ import annotations

import logging
from typing import Any, List, Optional

logger = logging.getLogger(__name__)

_table_agent = None


def _get_table_agent():
    global _table_agent
    if _table_agent is None:
        from inventory_agent.agents.table_agent import InventoryTableAgent
        _table_agent = InventoryTableAgent()
    return _table_agent


def match_wanding_price(
    keywords: str,
    customer_level: str = "B",
    price_library_path: Optional[str] = None,
) -> Optional[dict[str, Any]]:
    """
    万鼎价格库匹配：DataBase-style 模糊逻辑（token + 同义词 + 规格等价 + score）。
    返回 {code, matched_name, unit_price}，未找到时返回 None。
    不查库存，库存需单独调用 get_item_by_code(code) 获取。
    """
    from inventory_agent.services.wanding_fuzzy_matcher import match_fuzzy

    return match_fuzzy(
        keywords,
        customer_level=customer_level,
        price_library_path=price_library_path,
    )


def match_wanding_price_candidates(
    keywords: str,
    customer_level: str = "B",
    price_library_path: Optional[str] = None,
    max_candidates: int = 20,
) -> List[dict[str, Any]]:
    """
    DataBase-style 模糊匹配，返回候选列表（含 score）。
    返回 [{code, matched_name, unit_price, score}, ...]。
    """
    from inventory_agent.services.wanding_fuzzy_matcher import match_fuzzy_candidates

    return match_fuzzy_candidates(
        keywords,
        customer_level=customer_level,
        price_library_path=price_library_path,
        max_candidates=max_candidates,
    )


def match_price_and_get_inventory(
    keywords: str,
    customer_level: str = "B",
    price_library_path: Optional[str] = None,
) -> Optional[dict[str, Any]]:
    """
    万鼎匹配 + 按 code 查库存（flow 内部使用，工具层已拆为 match_wanding_price + get_inventory_by_code）。
    返回 {code, matched_name, unit_price, available_qty}，未找到 code 时返回 None。
    """
    r = match_wanding_price(keywords, customer_level=customer_level, price_library_path=price_library_path)
    if not r:
        return None

    code = r.get("code", "")
    available_qty = 0.0
    try:
        table = _get_table_agent()
        item = table.get_item_by_code(code)
        if item is not None:
            available_qty = getattr(item, "qty_available", 0.0) or 0.0
    except Exception as e:
        logger.debug("库存查询 %s 失败: %s", code, e)

    return {
        "code": code,
        "matched_name": r.get("matched_name", ""),
        "unit_price": r.get("unit_price", 0.0),
        "available_qty": available_qty,
    }
