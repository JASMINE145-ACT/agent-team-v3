#!/usr/bin/env python3
"""测试：match_quotation 多候选时工具内调用 llm_select_best；select_wanding_match 亦调用 llm_select_best。"""
import json
import os
import sys
from unittest.mock import MagicMock, patch

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))

from backend.tools.inventory.services.inventory_agent_tools import (  # noqa: E402
    _execute_match_quotation,
    _execute_select_wanding_match,
)

_FAKE_MULTI = [
    {"code": "A001", "matched_name": "直接 DN50 PVC-U 排水", "unit_price": 12.5, "source": "字段匹配"},
    {"code": "A002", "matched_name": "直接 DN50 PPR", "unit_price": 15.0, "source": "字段匹配"},
]

# ─────────────────────────────────────────────────────────────
# 测试 1：多候选时 match_quotation 调用 llm_select_best 一次并返回 single
# ─────────────────────────────────────────────────────────────
print("=" * 70)
print("测试 1：多候选时 match_quotation 调用 llm_select_best → single")
print("=" * 70)

with patch("backend.tools.inventory.services.match_and_inventory.match_quotation_union", return_value=_FAKE_MULTI):
    with patch("backend.tools.inventory.services.llm_selector.llm_select_best") as mock_llm:
        mock_llm.return_value = {
            "code": "A001",
            "matched_name": "直接 DN50 PVC-U 排水",
            "unit_price": 12.5,
            "reasoning": "test",
        }
        result = _execute_match_quotation({"keywords": "直接50", "customer_level": "B"})
        assert mock_llm.call_count == 1, f"预期 1 次内部选型，实际 {mock_llm.call_count}"
        parsed = json.loads(result["result"])
        assert parsed.get("single") is True, parsed
        assert parsed.get("chosen", {}).get("code") == "A001"
        assert parsed.get("table_product_code") == "A001"
        print(f"  chosen={parsed.get('chosen')}")
        print("  PASS")

# ─────────────────────────────────────────────────────────────
# 测试 1b：match_quotation 低置信度 → needs_selection + options（非空 chosen）
# ─────────────────────────────────────────────────────────────
print("\n" + "=" * 70)
print("测试 1b：match_quotation llm_select_best 返回 _suggestions → needs_selection + options")
print("=" * 70)

_suggestion_opts = [
    {
        "code": "A001",
        "matched_name": "直接 DN50 PVC-U 排水",
        "unit_price": 12.5,
        "reasoning": "排水优先",
    },
    {
        "code": "A002",
        "matched_name": "直接 DN50 PPR",
        "unit_price": 15.0,
        "reasoning": "若给水场景",
    },
]
with patch("backend.tools.inventory.services.match_and_inventory.match_quotation_union", return_value=_FAKE_MULTI):
    with patch("backend.tools.inventory.services.llm_selector.llm_select_best") as mock_llm:
        mock_llm.return_value = {"_suggestions": True, "options": _suggestion_opts}
        result = _execute_match_quotation({"keywords": "直接50", "customer_level": "B"})
        assert mock_llm.call_count == 1
        parsed = json.loads(result["result"])
        assert parsed.get("needs_selection") is True, parsed
        assert parsed.get("low_confidence_options") is True, parsed
        assert len(parsed.get("options") or []) == 2
        assert parsed["options"][0].get("source") == "字段匹配"
        assert "candidates" in parsed and len(parsed["candidates"]) == 2
        assert parsed.get("single") is not True
        print(f"  options[0].source={parsed['options'][0].get('source')}")
        print("  PASS")

# ─────────────────────────────────────────────────────────────
# 测试 2：无匹配时返回 unmatched
# ─────────────────────────────────────────────────────────────
print("\n" + "=" * 70)
print("测试 2：无匹配时返回 unmatched")
print("=" * 70)

with patch("backend.tools.inventory.services.match_and_inventory.match_quotation_union", return_value=[]):
    with patch("backend.tools.inventory.services.llm_selector.llm_select_best") as mock_llm:
        mock_llm.return_value = MagicMock()
        result = _execute_match_quotation({"keywords": "__不存在产品_XYZ123__", "customer_level": "B"})
        parsed = json.loads(result["result"])
        assert parsed.get("unmatched") is True, parsed
        assert mock_llm.call_count == 0
        print("  PASS")

# ─────────────────────────────────────────────────────────────
# 测试 3：select_wanding_match 调用 llm_select_best（第二步）
# ─────────────────────────────────────────────────────────────
print("\n" + "=" * 70)
print("测试 3：select_wanding_match 调用 llm_select_best")
print("=" * 70)

candidates = [
    {"code": "C1", "matched_name": "直接 DN50 PVC-U 排水管件", "unit_price": 12.5},
    {"code": "C2", "matched_name": "直接 DN50 PPR 给水管件", "unit_price": 15.0},
]
with patch("backend.tools.inventory.services.llm_selector.llm_select_best") as mock_llm:
    mock_llm.return_value = {
        "code": "C1",
        "matched_name": "直接 DN50 PVC-U 排水管件",
        "unit_price": 12.5,
        "reasoning": "排水场景优先 PVC-U",
    }
    result = _execute_select_wanding_match(
        {"keywords": "直接50", "candidates": candidates, "match_source": "字段匹配"}
    )
    assert mock_llm.call_count == 1, mock_llm.call_count
    parsed = json.loads(result["result"])
    assert parsed.get("single") is True
    assert parsed.get("chosen", {}).get("code") == "C1"
    assert parsed.get("table_product_code") == "C1"
    print(f"  chosen={parsed.get('chosen')}")
    print("  PASS")

print("\n" + "=" * 70)
print("全部测试完成 — PASS")
print("=" * 70)
