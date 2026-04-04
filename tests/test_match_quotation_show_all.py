"""
Unit tests: match_quotation with show_all_candidates=True must skip LLM selection.
"""
import json
import unittest
from unittest.mock import patch, MagicMock


FAKE_CANDIDATES = [
    {"code": "1000000001", "matched_name": "等径三通 PPR dn50", "unit_price": 5.0, "source": "字段匹配"},
    {"code": "1000000002", "matched_name": "异径三通 PPR dn50x32", "unit_price": 4.0, "source": "字段匹配"},
    {"code": "1000000003", "matched_name": "正三通 PVC-U dn50", "unit_price": 3.0, "source": "字段匹配"},
]


class TestShowAllCandidates(unittest.TestCase):
    @patch("backend.tools.inventory.services.match_and_inventory.match_quotation_union")
    @patch("backend.tools.inventory.services.llm_selector.llm_select_best")
    def test_show_all_skips_llm_selection(self, mock_llm, mock_union):
        """show_all_candidates=True must return needs_selection without calling llm_select_best."""
        mock_union.return_value = FAKE_CANDIDATES
        mock_llm.return_value = None  # should never be called

        from backend.tools.inventory.services.inventory_agent_tools import _execute_match_quotation
        result = _execute_match_quotation({"keywords": "三通50", "show_all_candidates": True})

        self.assertFalse(mock_llm.called, "llm_select_best must NOT be called when show_all_candidates=True")
        payload = json.loads(result["result"])
        self.assertTrue(payload.get("needs_selection"))
        self.assertEqual(len(payload["candidates"]), 3)

    @patch("backend.tools.inventory.services.match_and_inventory.match_quotation_union")
    @patch("backend.tools.inventory.services.llm_selector.llm_select_best")
    def test_normal_flow_still_calls_llm(self, mock_llm, mock_union):
        """show_all_candidates omitted (default False) must still call llm_select_best."""
        mock_union.return_value = FAKE_CANDIDATES
        mock_llm.return_value = {
            "code": "1000000001", "matched_name": "等径三通 PPR dn50",
            "unit_price": 5.0, "reasoning": "等径优先"
        }

        from backend.tools.inventory.services.inventory_agent_tools import _execute_match_quotation
        result = _execute_match_quotation({"keywords": "三通50"})

        self.assertTrue(mock_llm.called, "llm_select_best MUST be called when show_all_candidates is not set")
        payload = json.loads(result["result"])
        self.assertTrue(payload.get("single"))


if __name__ == "__main__":
    unittest.main(verbosity=2)
