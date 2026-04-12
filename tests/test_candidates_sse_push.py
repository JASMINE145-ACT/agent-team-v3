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
    def test_auto_switches_to_batch_when_keywords_count_reaches_threshold(self):
        from backend.tools.inventory.services.inventory_agent_tools import _execute_match_quotation

        with patch(
            "backend.tools.inventory.services.inventory_agent_tools._execute_match_quotation_batch",
            return_value={"success": True, "result": "BATCH_CALLED"},
        ) as mock_batch:
            out = _execute_match_quotation({"keywords": "直接50\n三通50\n弯头50", "customer_level": "B"})
        assert out.get("success") is True
        assert out.get("result") == "BATCH_CALLED"
        assert mock_batch.called

    def test_match_quotation_batch_response_shape_and_ordering(self):
        import json
        from backend.tools.inventory.services.inventory_agent_tools import _execute_match_quotation_batch

        def _fake_single(args, push_event=None):
            kw = args.get("keywords")
            if kw == "A":
                return {
                    "success": True,
                    "result": json.dumps(
                        {
                            "single": True,
                            "chosen": {"code": "C-A", "matched_name": "Name-A", "unit_price": 10, "source": "共同"},
                            "chosen_index": 1,
                            "match_source": "共同",
                        },
                        ensure_ascii=False,
                    ),
                }
            if kw == "B":
                return {
                    "success": True,
                    "result": json.dumps(
                        {
                            "needs_selection": True,
                            "candidates": [{"code": "C-B1", "matched_name": "Name-B1", "unit_price": 20}],
                            "match_source": "历史报价",
                        },
                        ensure_ascii=False,
                    ),
                }
            return {"success": True, "result": json.dumps({"unmatched": True}, ensure_ascii=False)}

        with patch(
            "backend.tools.inventory.services.inventory_agent_tools._execute_match_quotation",
            side_effect=_fake_single,
        ):
            out = _execute_match_quotation_batch({"keywords_list": ["A", "B", "C"], "customer_level": "B"})
        payload = json.loads(out["result"])
        assert payload["batch_mode"] is True
        assert payload["matched_count"] == 1
        assert payload["pending_count"] == 1
        assert payload["unmatched_count"] == 1
        assert payload["resolved_items"][0]["input_index"] == 0
        assert payload["pending_items"][0]["input_index"] == 1
        assert payload["unmatched_items"][0]["input_index"] == 2
        assert "批量询价结果" in payload["formatted_response"]

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

    def test_tool_candidates_includes_keywords(self):
        """tool_candidates payload must include the 'keywords' field from the query."""
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
        assert "keywords" in payload, "tool_candidates must include 'keywords' field"
        assert payload["keywords"] == "直通50"

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

    def test_push_event_tool_render_called_via_extension(self):
        """tool_render is pushed by extension.on_after_tool, not internally by _execute_match_quotation.
        _execute_match_quotation populates formatted_response in the result so extension can use it."""
        import json
        from backend.tools.inventory.services.inventory_agent_tools import _execute_match_quotation
        candidates_raw = [{"code": "8020020755", "matched_name": "直通PVC", "unit_price": 100.0, "source": "历史报价"}]

        with patch("backend.tools.inventory.services.match_and_inventory.match_quotation_union",
                   return_value=candidates_raw):
            with patch("backend.tools.inventory.services.llm_selector.llm_select_best",
                       return_value=_make_llm_result()):
                result = _execute_match_quotation({"keywords": "直通50"})

        # formatted_response must be present in the result for extension to use
        payload = json.loads(result["result"])
        assert payload.get("single") is True
        assert isinstance(payload.get("formatted_response"), str)
        assert len(payload["formatted_response"]) > 0

    def test_push_event_tool_render_payload_schema_via_extension(self):
        """extension.on_after_tool pushes tool_render when single=True; validate it pushes correct fields."""
        import json
        events = []
        push = lambda event_type, payload: events.append((event_type, payload))

        from backend.plugins.jagent.extension import JAgentExtension
        from backend.tools.inventory.services.inventory_agent_tools import _execute_match_quotation
        candidates_raw = [{"code": "8020020755", "matched_name": "直通PVC", "unit_price": 100.0, "source": "历史报价"}]

        with patch("backend.tools.inventory.services.match_and_inventory.match_quotation_union",
                   return_value=candidates_raw):
            with patch("backend.tools.inventory.services.llm_selector.llm_select_best",
                       return_value=_make_llm_result()):
                result = _execute_match_quotation({"keywords": "直通50"})

        obs = result["result"]  # JSON string
        ext = JAgentExtension()
        ext.on_after_tool("match_quotation", {"keywords": "直通50"}, obs, context={"push_event": push})

        payload = next(p for et, p in events if et == "tool_render")
        assert isinstance(payload.get("formatted_response"), str)
        assert isinstance(payload.get("chosen_index"), int)
        assert isinstance(payload.get("match_source"), str)
        assert isinstance(payload.get("chosen"), dict)
