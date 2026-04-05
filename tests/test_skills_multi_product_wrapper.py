"""Tests for multi-product wrapper rules and query keyword title in skills.py."""
import pytest

from backend.plugins.jagent.skills import (
    SKILL_INVENTORY_PRICE_DOC,
    SKILL_INVENTORY_PRICE_RULES,
)


# ── VERBATIM multi-product rule ──────────────────────────────────────────────


def test_rules_has_multi_product_verbatim_intro():
    """RULES variant must allow a brief intro line for multi-product queries."""
    assert "Multi-product query" in SKILL_INVENTORY_PRICE_RULES or \
           "≥ 2 products" in SKILL_INVENTORY_PRICE_RULES


def test_rules_single_product_still_verbatim():
    """RULES variant must preserve silent/verbatim for single-product queries."""
    assert "Single product" in SKILL_INVENTORY_PRICE_RULES or \
           "1 product" in SKILL_INVENTORY_PRICE_RULES


def test_rules_intro_line_character_limit():
    """RULES variant must specify a character limit for the intro line."""
    assert "20" in SKILL_INVENTORY_PRICE_RULES


# ── Context Continuity multi-product rule ───────────────────────────────────


def test_rules_context_continuity_has_multi_product_rule():
    """RULES must have a rule for ≥2 products with partial context results."""
    assert "≥ 2 products" in SKILL_INVENTORY_PRICE_RULES


def test_rules_context_continuity_sees_card_reference():
    """RULES must instruct model to reference existing results with '见上方卡片'."""
    assert "见上方卡片" in SKILL_INVENTORY_PRICE_RULES


def test_rules_context_continuity_no_redundant_query():
    """RULES must say not to call match_quotation again for already-queried products."""
    assert "do NOT call match_quotation again" in SKILL_INVENTORY_PRICE_RULES


# ── DOC variant ──────────────────────────────────────────────────────────────


def test_doc_has_multi_product_wrapper_guidance():
    """DOC variant must mention multi-product wrapper behavior."""
    assert "多产品" in SKILL_INVENTORY_PRICE_DOC or "≥2" in SKILL_INVENTORY_PRICE_DOC


def test_doc_has_card_reference_phrase():
    """DOC variant must reference '见上方卡片' pattern."""
    assert "见上方卡片" in SKILL_INVENTORY_PRICE_DOC


# ── Keywords in formatted_response ──────────────────────────────────────────


def test_build_formatted_response_includes_keywords():
    """_build_formatted_response should include keywords as title when provided."""
    from backend.tools.inventory.services.inventory_agent_tools import _build_formatted_response

    payload = {
        "candidates": [{"code": "1234567890", "matched_name": "测试产品", "source": "共同", "unit_price": 100.0}],
        "chosen_index": 1,
        "chosen": {"code": "1234567890", "matched_name": "测试产品", "unit_price": 100.0},
        "match_source": "共同",
        "selection_reasoning": "",
    }
    result = _build_formatted_response(payload, keywords="三通50")
    assert "查询关键词：三通50" in result


def test_build_formatted_response_no_keywords_header():
    """_build_formatted_response without keywords should not add header line."""
    from backend.tools.inventory.services.inventory_agent_tools import _build_formatted_response

    payload = {
        "candidates": [{"code": "1234567890", "matched_name": "测试产品", "source": "共同", "unit_price": 100.0}],
        "chosen_index": 1,
        "chosen": {"code": "1234567890", "matched_name": "测试产品", "unit_price": 100.0},
        "match_source": "共同",
        "selection_reasoning": "",
    }
    result = _build_formatted_response(payload)
    assert "查询关键词" not in result
