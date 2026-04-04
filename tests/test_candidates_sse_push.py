# tests/test_candidates_sse_push.py
"""
Unit tests: verify _execute_match_quotation calls push_event at the right
checkpoints. Tests fail before Task 4 and pass after.
"""
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from unittest.mock import patch, MagicMock


def _make_norm_candidate(code="8020020755", name="直通PVC", source="历史报价"):
    return {"code": code, "matched_name": name, "unit_price": 100.0, "source": source}


def _make_llm_result(code="8020020755", name="直通PVC", reasoning="该产品符合规格要求"):
    return {
        "code": code,
        "matched_name": name,
        "unit_price": 100.0,
        "reasoning": reasoning,
        "_selection_meta": {"from_rule_fallback": False},
    }


class TestCandidatesSSEPush:
    def test_push_event_tool_candidates_called(self):
        """push_event must be called with 'tool_candidates' after match_quotation_union."""
        events = []
        push = lambda event_type, payload: events.append((event_type, payload))

        from backend.tools.inventory.services.inventory_agent_tools import _execute_match_quotation
        candidates_raw = [{"code": "8020020755", "matched_name": "直通PVC", "unit_price": 100.0, "source": "历史报价"}]
        llm_result = _make_llm_result()

        with patch("backend.tools.inventory.services.match_and_inventory.match_quotation_union",
                   return_value=candidates_raw):
            with patch("backend.tools.inventory.services.llm_selector.llm_select_best",
                       return_value=llm_result):
                _execute_match_quotation({"keywords": "直通50"}, push_event=push)

        candidate_events = [e for e in events if e[0] == "tool_candidates"]
        assert len(candidate_events) >= 1, "tool_candidates event must be pushed"

    def test_push_event_tool_candidates_payload(self):
        """tool_candidates payload must contain 'candidates' list and 'match_source'."""
        events = []
        push = lambda event_type, payload: events.append((event_type, payload))

        from backend.tools.inventory.services.inventory_agent_tools import _execute_match_quotation
        candidates_raw = [{"code": "8020020755", "matched_name": "直通PVC", "unit_price": 100.0, "source": "历史报价"}]

        with patch("backend.tools.inventory.services.match_and_inventory.match_quotation_union",
                   return_value=candidates_raw):
            with patch("backend.tools.inventory.services.llm_selector.llm_select_best",
                       return_value=_make_llm_result()):
                _execute_match_quotation({"keywords": "直通50"}, push_event=push)

        payload = next(p for et, p in events if et == "tool_candidates")
        assert "candidates" in payload
        assert isinstance(payload["candidates"], list)
        assert len(payload["candidates"]) == 1
        assert "match_source" in payload

    def test_push_event_tool_selection_done_called(self):
        """push_event must be called with 'tool_selection_done' after llm_select_best succeeds."""
        events = []
        push = lambda event_type, payload: events.append((event_type, payload))

        from backend.tools.inventory.services.inventory_agent_tools import _execute_match_quotation
        candidates_raw = [{"code": "8020020755", "matched_name": "直通PVC", "unit_price": 100.0, "source": "历史报价"}]

        with patch("backend.tools.inventory.services.match_and_inventory.match_quotation_union",
                   return_value=candidates_raw):
            with patch("backend.tools.inventory.services.llm_selector.llm_select_best",
                       return_value=_make_llm_result(reasoning="该产品符合等径规格要求")):
                _execute_match_quotation({"keywords": "直通50"}, push_event=push)

        done_events = [e for e in events if e[0] == "tool_selection_done"]
        assert len(done_events) >= 1, "tool_selection_done event must be pushed"

    def test_push_event_tool_selection_done_payload(self):
        """tool_selection_done payload must contain 'chosen_index' and 'reasoning'."""
        events = []
        push = lambda event_type, payload: events.append((event_type, payload))

        from backend.tools.inventory.services.inventory_agent_tools import _execute_match_quotation
        candidates_raw = [{"code": "8020020755", "matched_name": "直通PVC", "unit_price": 100.0, "source": "历史报价"}]

        with patch("backend.tools.inventory.services.match_and_inventory.match_quotation_union",
                   return_value=candidates_raw):
            with patch("backend.tools.inventory.services.llm_selector.llm_select_best",
                       return_value=_make_llm_result(reasoning="等径规格精确匹配")):
                _execute_match_quotation({"keywords": "直通50"}, push_event=push)

        payload = next(p for et, p in events if et == "tool_selection_done")
        assert "chosen_index" in payload
        assert "reasoning" in payload
        assert payload["reasoning"] == "等径规格精确匹配"

    def test_no_push_event_when_absent(self):
        """When push_event is not provided, _execute_match_quotation must not raise."""
        from backend.tools.inventory.services.inventory_agent_tools import _execute_match_quotation
        candidates_raw = [{"code": "8020020755", "matched_name": "直通PVC", "unit_price": 100.0, "source": "历史报价"}]

        with patch("backend.tools.inventory.services.match_and_inventory.match_quotation_union",
                   return_value=candidates_raw):
            with patch("backend.tools.inventory.services.llm_selector.llm_select_best",
                       return_value=_make_llm_result()):
                result = _execute_match_quotation({"keywords": "直通50"})
        assert result["success"] is True

    def test_tool_candidates_before_selection_done(self):
        """tool_candidates must appear before tool_selection_done in event order."""
        events = []
        push = lambda event_type, payload: events.append((event_type, payload))

        from backend.tools.inventory.services.inventory_agent_tools import _execute_match_quotation
        candidates_raw = [{"code": "8020020755", "matched_name": "直通PVC", "unit_price": 100.0, "source": "历史报价"}]

        with patch("backend.tools.inventory.services.match_and_inventory.match_quotation_union",
                   return_value=candidates_raw):
            with patch("backend.tools.inventory.services.llm_selector.llm_select_best",
                       return_value=_make_llm_result()):
                _execute_match_quotation({"keywords": "直通50"}, push_event=push)

        event_types = [et for et, _ in events]
        assert event_types.index("tool_candidates") < event_types.index("tool_selection_done")
