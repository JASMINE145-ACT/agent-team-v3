"""Debug-only endpoints for testing the LLM selector. Only active when Config.DEBUG=true."""
import os
from typing import Any

from fastapi import APIRouter
from pydantic import BaseModel

from backend.tools.inventory.services.llm_selector import (
    _build_knowledge_hint,
    _build_selector_prompt,
    _load_business_knowledge,
    _sort_candidates_by_source,
    llm_select_best,
)
from backend.tools.inventory.services.match_and_inventory import match_quotation_union

router = APIRouter(prefix="/api/debug", tags=["debug"])


class MatchSelectRequest(BaseModel):
    keywords: str
    customer_level: str = "B"
    knowledge_override: str | None = None


def _norm_candidates(raw: list[dict[str, Any]]) -> list[dict[str, Any]]:
    out = []
    for i, c in enumerate(raw, 1):
        try:
            price = float(c.get("unit_price") or 0)
        except (TypeError, ValueError):
            price = 0.0
        out.append({
            "index": i,
            "code": str(c.get("code") or ""),
            "matched_name": str(c.get("matched_name") or ""),
            "unit_price": price,
            "source": str(c.get("source") or ""),
        })
    return out


def _build_llm_prompt(
    keywords: str,
    candidates: list[dict],
    knowledge_override: str | None,
) -> str:
    """Reconstruct the exact prompt that would be sent to the LLM (full knowledge, no compaction)."""
    knowledge = (
        knowledge_override.strip()
        if knowledge_override and knowledge_override.strip()
        else _load_business_knowledge()
    )
    sorted_cands = _sort_candidates_by_source(candidates)[:8]
    full_knowledge = os.environ.get("INVENTORY_LLM_SELECTOR_FULL_KNOWLEDGE", "1").strip().lower() in ("1", "true", "yes")
    knowledge_hint = knowledge if full_knowledge else _build_knowledge_hint(keywords, knowledge, 1500)
    return _build_selector_prompt(keywords, sorted_cands, knowledge_hint)


@router.post("/match-select")
async def debug_match_select(req: MatchSelectRequest) -> dict:
    """Run match_quotation_union + llm_select_best and return full diagnostics."""
    import asyncio

    raw_candidates = await asyncio.to_thread(
        match_quotation_union,
        req.keywords,
        req.customer_level,
    )
    normed = _norm_candidates(raw_candidates)

    llm_prompt = _build_llm_prompt(req.keywords, raw_candidates, req.knowledge_override)

    if not raw_candidates:
        return {
            "status": "unmatched",
            "keywords": req.keywords,
            "candidates": [],
            "chosen_index": 0,
            "chosen": None,
            "reason": "no candidates from matcher",
            "match_source": "",
            "llm_prompt": llm_prompt,
        }

    if len(raw_candidates) == 1:
        chosen = normed[0]
        return {
            "status": "single",
            "keywords": req.keywords,
            "candidates": normed,
            "chosen_index": 1,
            "chosen": chosen,
            "reason": "single candidate, no LLM needed",
            "match_source": chosen.get("source", ""),
            "llm_prompt": llm_prompt,
        }

    chosen_raw = await asyncio.to_thread(
        llm_select_best,
        req.keywords,
        raw_candidates,
    )

    if chosen_raw is None:
        return {
            "status": "unmatched",
            "keywords": req.keywords,
            "candidates": normed,
            "chosen_index": 0,
            "chosen": None,
            "reason": "LLM returned index=0 (no match)",
            "match_source": "",
            "llm_prompt": llm_prompt,
        }

    chosen_index = next(
        (n["index"] for n in normed if n["code"] == str(chosen_raw.get("code") or "")),
        0,
    )
    reason = str(chosen_raw.get("llm_reason") or chosen_raw.get("reason") or "")
    status = "llm_error" if chosen_raw.get("fallback") else "needs_selection"

    return {
        "status": status,
        "keywords": req.keywords,
        "candidates": normed,
        "chosen_index": chosen_index,
        "chosen": {
            "index": chosen_index,
            "code": str(chosen_raw.get("code") or ""),
            "matched_name": str(chosen_raw.get("matched_name") or ""),
            "unit_price": float(chosen_raw.get("unit_price") or 0),
            "source": str(chosen_raw.get("source") or ""),
        },
        "reason": reason,
        "match_source": str(chosen_raw.get("source") or ""),
        "llm_prompt": llm_prompt,
    }


@router.get("/knowledge")
async def debug_knowledge() -> dict:
    """Return current business knowledge file content."""
    content = _load_business_knowledge()
    return {"content": content}
