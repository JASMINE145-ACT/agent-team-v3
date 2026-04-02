#!/usr/bin/env python3
"""
两步可见链路：match_wanding_price 多候选不内置 LLM → needs_selection；
再 select_wanding_match → llm_select_best。

match_quotation 多候选已在工具内调 llm_select_best（见 test_auto_llm_selector.py）。

执行：py -3 tests/test_llm_selector_two_step.py
"""
import sys
import json
from unittest.mock import patch

sys.path.insert(0, str(__import__("pathlib").Path(__file__).resolve().parent.parent))
sys.path.insert(0, str(__import__("pathlib").Path(__file__).resolve().parent.parent / "backend"))

print("=" * 70)
print("两步链路：match_wanding_price → select_wanding_match")
print("=" * 70)

from backend.tools.inventory.services.inventory_agent_tools import (  # noqa: E402
    _execute_match_wanding_price,
    _execute_select_wanding_match,
)

_FAKE_CANDS = [
    {"code": "W1", "matched_name": "直接 DN50 PVC-U", "unit_price": 10.0, "score": 0.9},
    {"code": "W2", "matched_name": "直接 DN50 PPR", "unit_price": 12.0, "score": 0.85},
]

# ── Step 1: match_wanding_price — 多候选不调 llm_select_best ─────────
print("\n[Step 1] _execute_match_wanding_price（多候选）")
print("-" * 50)

with patch(
    "backend.tools.inventory.services.match_and_inventory.match_wanding_price_candidates",
    return_value=_FAKE_CANDS,
):
    with patch("backend.tools.inventory.services.llm_selector.llm_select_best") as mock_llm:
        step1_result = _execute_match_wanding_price({"keywords": "直接50", "customer_level": "B"})
        assert mock_llm.call_count == 0, f"match_wanding_price 不应调 llm_select_best，实际 {mock_llm.call_count}"
        parsed = json.loads(step1_result["result"])
        assert parsed.get("needs_selection") is True, parsed
        assert len(parsed.get("candidates", [])) >= 2
        print(f"  needs_selection=True, n_candidates={len(parsed['candidates'])}")
        print("  [OK] Step 1")

# ── Step 2: select_wanding_match ─────────────────────────────────────
print("\n[Step 2] select_wanding_match + llm_select_best")
print("-" * 50)

candidates = parsed["candidates"]
keywords = "直接50"

with patch("backend.tools.inventory.services.llm_selector.llm_select_best") as mock_llm:
    mock_llm.return_value = {
        "code": "W1",
        "matched_name": "直接 DN50 PVC-U",
        "unit_price": 10.0,
        "reasoning": "PVC-U 排水",
    }
    step2_result = _execute_select_wanding_match({
        "keywords": keywords,
        "candidates": candidates,
        "match_source": "字段匹配",
    })
    assert mock_llm.call_count == 1
    parsed2 = json.loads(step2_result["result"])
    assert parsed2.get("single") is True
    assert parsed2.get("chosen", {}).get("code") == "W1"
    print(f"  chosen={parsed2.get('chosen')}")
    print("  [OK] Step 2")

print("\n" + "=" * 70)
print("全部测试 — PASS")
print("=" * 70)
