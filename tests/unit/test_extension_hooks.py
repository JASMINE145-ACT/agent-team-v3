"""AgentExtension 钩子：见 docs/superpowers/plans/2026-04-27-agent-core-extraction.md"""
import json
from unittest.mock import MagicMock

import pytest

from backend.core.extension import AgentExtension, ExtensionContext
from backend.plugins.jagent.extension import JAgentExtension


class ConcreteExt(AgentExtension):
    def register(self, ctx: ExtensionContext) -> None:  # type: ignore[override]
        pass


# ---- Task 1 ----
def test_on_before_tool_default_returns_args_unchanged():
    ext = ConcreteExt()
    args = {"keywords": "直接dn50", "customer_level": "B"}
    result = ext.on_before_tool("match_quotation", args, {})
    assert result == args


def test_should_stop_loop_default_returns_false():
    ext = ConcreteExt()
    stop, answer = ext.should_stop_loop("match_quotation", "some obs", {})
    assert stop is False
    assert answer is None


def test_on_tool_complete_default_does_not_raise():
    ext = ConcreteExt()
    ext.on_tool_complete("match_quotation", {}, "raw", "obs", {})


def test_augment_user_content_default_returns_unchanged():
    ext = ConcreteExt()
    result = ext.augment_user_content("hello", "hello", None, {})
    assert result == "hello"


# ---- Task 2 ----
def test_augment_injects_rework_when_rework_intent_and_pending_choice():
    ext = JAgentExtension()
    session = MagicMock()
    session.pending_human_choice = {
        "keywords": "直接dn50",
        "options": [
            {"code": "A001", "matched_name": "直接DN50", "source": "万鼎"},
            {"code": "A002", "matched_name": "直接DN50-L", "source": "万鼎"},
        ],
    }
    ctx: dict = {}
    result = ext.augment_user_content("错了，重新选", "错了，重新选", session, ctx)
    assert "请确认正确选项" in result
    assert "直接dn50" in result


def test_augment_no_rework_when_no_pending_choice():
    ext = JAgentExtension()
    session = MagicMock()
    session.pending_human_choice = None
    ctx: dict = {}
    result = ext.augment_user_content("错了", "错了", session, ctx)
    assert "请确认正确选项" not in result


def test_augment_sets_inventory_intent_in_ctx():
    ext = JAgentExtension()
    ctx: dict = {}
    ext.augment_user_content("这个有库存吗", "这个有库存吗", None, ctx)
    assert ctx.get("_inventory_intent") is True


def test_augment_sets_card_followup_in_ctx():
    ext = JAgentExtension()
    ctx: dict = {}
    ext.augment_user_content("这个的库存", "这个的库存", None, ctx)
    assert ctx.get("_card_followup") is True


# ---- Task 3 ----
def test_on_before_tool_normalizes_match_quotation_args():
    ext = JAgentExtension()
    args = {"keywords": "  直接dn50  ", "customer_level": "b", "show_all_candidates": None}
    result = ext.on_before_tool("match_quotation", args, {})
    assert result["keywords"] == "直接dn50"
    assert result["customer_level"] == "B"
    assert result["show_all_candidates"] is False


def test_on_before_tool_normalizes_batch_keywords():
    ext = JAgentExtension()
    args = {"keywords_list": ["  弯头dn50  ", "", "法兰"], "customer_level": "a"}
    result = ext.on_before_tool("match_quotation_batch", args, {})
    assert result["keywords_list"] == ["弯头dn50", "法兰"]
    assert result["customer_level"] == "A"


def test_on_before_tool_passthrough_for_unknown_tool():
    ext = JAgentExtension()
    args = {"file_id": "abc123"}
    result = ext.on_before_tool("parse_excel_smart", args, {})
    assert result == args


# ---- Task 4 ----
def test_should_stop_loop_stops_for_rendered_match_quotation():
    ext = JAgentExtension()
    obs = "[已渲染到前端] 「直接dn50」查询结果：已选第1条 code=A001…"
    ctx: dict = {"_inventory_intent": False}
    stop, answer = ext.should_stop_loop("match_quotation", obs, ctx)
    assert stop is True
    assert answer == obs


def test_should_stop_loop_does_not_stop_when_inventory_intent():
    ext = JAgentExtension()
    obs = "[已渲染到前端] 「直接dn50」查询结果：已选第1条 code=A001…"
    ctx: dict = {"_inventory_intent": True}
    stop, answer = ext.should_stop_loop("match_quotation", obs, ctx)
    assert stop is False


def test_should_stop_loop_always_stops_for_batch():
    ext = JAgentExtension()
    obs = "[已渲染到前端] 批量查询完成（matched=3, pending=0, unmatched=0）。"
    ctx: dict = {"_inventory_intent": True}
    stop, answer = ext.should_stop_loop("match_quotation_batch", obs, ctx)
    assert stop is True


def test_should_stop_loop_passthrough_for_other_tools():
    ext = JAgentExtension()
    stop, answer = ext.should_stop_loop("get_inventory_by_code", "some result", {})
    assert stop is False
    assert answer is None


# ---- Task 5 ----
def test_on_tool_complete_saves_rework_state_for_needs_human_choice():
    ext = JAgentExtension()
    store = MagicMock()
    ctx: dict = {"session_id": "sess1", "_session_store": store}
    raw_obs = json.dumps({"needs_human_choice": True, "options": [{"code": "A001"}]})
    ext.on_tool_complete("match_quotation", {}, raw_obs, raw_obs, ctx)
    store.set_pending_human_choice.assert_called_once()


def test_on_tool_complete_clears_rework_state_for_single():
    ext = JAgentExtension()
    store = MagicMock()
    ctx: dict = {"session_id": "sess1", "_session_store": store}
    raw_obs = json.dumps({"single": True, "chosen": {"code": "A001"}})
    ext.on_tool_complete("match_quotation", {}, raw_obs, raw_obs, ctx)
    store.clear_pending_human_choice.assert_called_once_with("sess1")


def test_on_tool_complete_appends_tool_memory():
    ext = JAgentExtension()
    store = MagicMock()
    ctx: dict = {"session_id": "sess1", "_session_store": store}
    ext.on_tool_complete(
        "get_inventory_by_code", {"code": "A001"}, "result text", "result text", ctx
    )
    store.append_tool_memory.assert_called_once()


def test_on_tool_complete_appends_card_refs_for_match_quotation():
    ext = JAgentExtension()
    store = MagicMock()
    raw_obs = json.dumps(
        {
            "single": True,
            "chosen": {
                "code": "A001",
                "matched_name": "直接DN50",
                "unit_price": 5.0,
            },
            "match_source": "万鼎",
        }
    )
    ctx: dict = {"session_id": "sess1", "_session_store": store}
    ext.on_tool_complete(
        "match_quotation", {"keywords": "直接dn50"}, raw_obs, raw_obs, ctx
    )
    store.append_card_refs.assert_called_once()
