"""
询价填充：万鼎匹配 + 按 code 查库存

万鼎匹配：DataBase-style 模糊逻辑（token + 同义词扩展 + 规格等价 + score 排序）。
返回：{code, matched_name, unit_price, available_qty}，未找到 code 时返回 None。
"""

from __future__ import annotations

import logging
import threading
from concurrent.futures import ThreadPoolExecutor, as_completed
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


def _merge_candidates_by_code(
    mapping_candidates: List[dict],
    wanding_candidates: List[dict],
) -> List[dict[str, Any]]:
    """
    报价历史 + 字段匹配 取并集：按 code 去重，同一 code 保留一条，
    优先用万鼎的 unit_price（价格库准确），matched_name 有万鼎则用万鼎（更规范）。
    每条带 source：历史报价 / 字段匹配 / 共同（两者均命中）。
    """
    by_code: dict[str, dict[str, Any]] = {}
    for c in mapping_candidates:
        code = (c.get("code") or "").strip()
        if not code:
            continue
        by_code[code] = {
            "code": code,
            "matched_name": (c.get("matched_name") or "")[:200],
            "unit_price": float(c.get("unit_price", 0) or 0),
            "source": "历史报价",
        }
    for c in wanding_candidates:
        code = (c.get("code") or "").strip()
        if not code:
            continue
        if code in by_code:
            if (c.get("unit_price") or 0) != 0:
                by_code[code]["unit_price"] = float(c.get("unit_price", 0) or 0)
            if c.get("matched_name"):
                by_code[code]["matched_name"] = (c.get("matched_name") or "")[:200]
            by_code[code]["source"] = "共同"
        else:
            by_code[code] = {
                "code": code,
                "matched_name": (c.get("matched_name") or "")[:200],
                "unit_price": float(c.get("unit_price", 0) or 0),
                "source": "字段匹配",
            }
    return list(by_code.values())


def match_quotation_union(
    keywords: str,
    customer_level: str = "B",
    price_library_path: Optional[str] = None,
    mapping_top_k: int = 5,
) -> List[dict[str, Any]]:
    """
    报价历史 + 字段匹配 并行取并集（仅匹配，不查库存、不 LLM 选型）。
    用于 Chat 询价/查 code：一次调用同时查历史与万鼎，返回带 source 的候选列表。
    每条候选含 code, matched_name, unit_price, source（历史报价/字段匹配/共同）。
    """
    from backend.tools.inventory.services.mapping_table_matcher import match_mapping_top_candidates
    from backend.tools.inventory.services.wanding_fuzzy_matcher import get_wanding_price_by_code

    mapping_candidates: List[dict] = []
    wanding_candidates: List[dict] = []

    def _do_mapping():
        try:
            return match_mapping_top_candidates(keywords, mapping_path=None, top_k=mapping_top_k)
        except Exception as e:
            logger.debug("报价历史匹配失败: %s", e)
            return []

    def _do_wanding():
        try:
            return match_wanding_price_candidates(
                keywords,
                customer_level=customer_level,
                price_library_path=price_library_path,
                max_score_tiers=2,
            )
        except Exception as e:
            logger.debug("字段匹配失败: %s", e)
            return []

    with ThreadPoolExecutor(max_workers=2) as pool:
        f_mapping = pool.submit(_do_mapping)
        f_wanding = pool.submit(_do_wanding)
        for fut in as_completed([f_mapping, f_wanding]):
            try:
                if fut is f_mapping:
                    mapping_candidates = fut.result() or []
                else:
                    wanding_candidates = fut.result() or []
            except Exception as e:
                logger.debug("并行查询之一失败: %s", e)

    merged = _merge_candidates_by_code(mapping_candidates, wanding_candidates)
    for c in merged:
        if (c.get("unit_price") or 0) == 0 and c.get("code"):
            try:
                price_row = get_wanding_price_by_code(
                    c["code"],
                    customer_level=customer_level,
                    price_library_path=price_library_path,
                )
                if price_row is not None:
                    c["unit_price"] = float(price_row.get("unit_price", 0) or 0)
            except Exception as e:
                logger.debug("按 code 查万鼎价格失败: %s", e)
    return merged


def match_price_and_get_inventory(
    keywords: str,
    customer_level: str = "B",
    price_library_path: Optional[str] = None,
    allow_suggestions_for_work: bool = False,
) -> Optional[dict[str, Any]]:
    """
    报价历史查询 + 字段匹配（万鼎）同时进行，结果取并集（按 code 去重），再选型/查库存。
    返回 {code, matched_name, unit_price, available_qty}，未找到 code 时返回 None。
    allow_suggestions_for_work: 若 True 且 LLM 返回无把握（_suggestions），则返回
    {_needs_human_choice: True, keywords, options: [...]}，供 Work 人工介入。
    """
    from backend.tools.inventory.services.mapping_table_matcher import match_mapping_top_candidates
    from backend.tools.inventory.services.llm_selector import llm_select_best

    mapping_candidates: List[dict] = []
    wanding_candidates: List[dict] = []

    def _do_mapping():
        try:
            return match_mapping_top_candidates(keywords, mapping_path=None, top_k=5)
        except Exception as e:
            logger.debug("报价历史匹配失败: %s", e)
            return []

    def _do_wanding():
        try:
            return match_wanding_price_candidates(
                keywords,
                customer_level=customer_level,
                price_library_path=price_library_path,
                max_score_tiers=2,
            )
        except Exception as e:
            logger.debug("字段匹配失败: %s", e)
            return []

    with ThreadPoolExecutor(max_workers=2) as pool:
        f_mapping = pool.submit(_do_mapping)
        f_wanding = pool.submit(_do_wanding)
        for fut in as_completed([f_mapping, f_wanding]):
            try:
                if fut is f_mapping:
                    mapping_candidates = fut.result() or []
                else:
                    wanding_candidates = fut.result() or []
            except Exception as e:
                logger.debug("并行查询之一失败: %s", e)

    candidates = _merge_candidates_by_code(mapping_candidates, wanding_candidates)
    r: Optional[dict[str, Any]] = None

    if not candidates:
        return None
    # 候选表：code -> source，用于最终结果和 options 标明来源
    source_by_code = {c.get("code", ""): c.get("source", "共同") for c in candidates}
    if len(candidates) == 1:
        c = candidates[0]
        r = {"code": c.get("code", ""), "matched_name": c.get("matched_name", ""), "unit_price": float(c.get("unit_price", 0) or 0), "match_source": c.get("source", "共同")}
    else:
        best = llm_select_best(keywords, candidates)
        if best is not None:
            if best.get("_suggestions") and allow_suggestions_for_work:
                options = best.get("options", [])
                for opt in options:
                    opt["source"] = source_by_code.get(opt.get("code", ""), "共同")
                return {"_needs_human_choice": True, "keywords": keywords, "options": options}
            if not best.get("_suggestions"):
                r = {"code": best.get("code", ""), "matched_name": best.get("matched_name", ""), "unit_price": best.get("unit_price", 0), "match_source": source_by_code.get(best.get("code", ""), "共同")}
        if r is None:
            c = candidates[0]
            r = {"code": c.get("code", ""), "matched_name": c.get("matched_name", ""), "unit_price": float(c.get("unit_price", 0) or 0), "match_source": c.get("source", "共同")}
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
        "match_source": r.get("match_source", "共同"),
    }
