"""
询价填充：万鼎匹配 + 按 code 查库存

万鼎匹配：DataBase-style 模糊逻辑（token + 同义词扩展 + 规格等价 + score 排序）。
返回：{code, matched_name, unit_price, available_qty}，未找到 code 时返回 None。
"""

from __future__ import annotations

import logging
import threading
from typing import Any, List, Optional

logger = logging.getLogger(__name__)

_table_agent = None
_table_agent_lock = threading.Lock()


def _get_table_agent():
    global _table_agent
    if _table_agent is None:
        with _table_agent_lock:
            if _table_agent is None:
                from backend.tools.inventory.agents.table_agent import InventoryTableAgent
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
    from backend.tools.inventory.services.wanding_fuzzy_matcher import match_fuzzy

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
    max_score_tiers: Optional[int] = None,
) -> List[dict[str, Any]]:
    """
    DataBase-style 模糊匹配，返回候选列表（含 score）。
    返回 [{code, matched_name, unit_price, score}, ...]。
    若传 max_score_tiers（如 2），则返回前 N 个分数档的全部候选；否则取前 max_candidates 条。
    """
    from backend.tools.inventory.services.wanding_fuzzy_matcher import match_fuzzy_candidates

    return match_fuzzy_candidates(
        keywords,
        customer_level=customer_level,
        price_library_path=price_library_path,
        max_candidates=max_candidates,
        max_score_tiers=max_score_tiers,
    )


def match_price_and_get_inventory(
    keywords: str,
    customer_level: str = "B",
    price_library_path: Optional[str] = None,
) -> Optional[dict[str, Any]]:
    """
    先历史匹配（映射表），无结果再万鼎匹配，再按 code 查库存（run_quotation_fill_flow 使用）。
    返回 {code, matched_name, unit_price, available_qty}，未找到 code 时返回 None。
    """
    r: Optional[dict[str, Any]] = None
    try:
        from backend.tools.inventory.services.mapping_table_matcher import match_mapping_top_candidates
        from backend.tools.inventory.services.llm_selector import llm_select_best
        mapping_candidates = match_mapping_top_candidates(keywords, mapping_path=None, top_k=3)
        if mapping_candidates:
            if len(mapping_candidates) == 1:
                c = mapping_candidates[0]
                r = {"code": c.get("code", ""), "matched_name": c.get("matched_name", ""), "unit_price": float(c.get("unit_price", 0) or 0)}
            else:
                best = llm_select_best(keywords, mapping_candidates)
                if best is not None and not best.get("_suggestions"):
                    r = {"code": best.get("code", ""), "matched_name": best.get("matched_name", ""), "unit_price": best.get("unit_price", 0)}
    except Exception as e:
        logger.debug("历史匹配失败: %s", e)
    if r is None:
        r = match_wanding_price(keywords, customer_level=customer_level, price_library_path=price_library_path)
    if not r:
        return None
    # 历史匹配得到的 r 可能 unit_price=0（映射表无价格），用 code 去万鼎表补全
    if (r.get("unit_price") or 0) == 0 and r.get("code"):
        try:
            from backend.tools.inventory.services.wanding_fuzzy_matcher import get_wanding_price_by_code
            price_row = get_wanding_price_by_code(r["code"], customer_level=customer_level, price_library_path=price_library_path)
            if price_row is not None:
                r["unit_price"] = float(price_row.get("unit_price", 0) or 0)
        except Exception as e:
            logger.debug("按 code 查万鼎价格失败: %s", e)

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
