"""Tests for tool defer loading — ToolRegistry methods."""
from __future__ import annotations
import json
import asyncio
import pytest
from backend.core.registry import ToolRegistry


def _make_def(name: str, deferred: bool = False) -> dict:
    meta: dict = {"access_mode": "read", "risk_level": "low"}
    if deferred:
        meta["deferred"] = True
    return {
        "type": "function",
        "function": {
            "name": name,
            "description": f"Tool {name} description",
            "parameters": {"type": "object", "properties": {}, "required": []},
            "x_tool_meta": meta,
        },
    }


async def _noop(args: dict, ctx: dict) -> str:
    return json.dumps({"ok": True})


@pytest.fixture
def registry_with_mixed_tools() -> ToolRegistry:
    reg = ToolRegistry()
    reg.register(_make_def("search_inventory"), _noop)                           # P0
    reg.register(_make_def("match_quotation"), _noop)                            # P0
    reg.register(_make_def("modify_inventory", deferred=True), _noop)           # P1
    reg.register(_make_def("run_quotation_fill", deferred=True), _noop)         # P1
    reg.register(_make_def("append_business_knowledge", deferred=True), _noop)  # P1
    return reg


def test_get_p0_definitions_excludes_deferred(registry_with_mixed_tools):
    p0 = registry_with_mixed_tools.get_p0_definitions()
    names = [d["function"]["name"] for d in p0]
    assert "search_inventory" in names
    assert "match_quotation" in names
    assert "modify_inventory" not in names
    assert "run_quotation_fill" not in names


def test_get_deferred_stubs_only_deferred(registry_with_mixed_tools):
    stubs = registry_with_mixed_tools.get_deferred_stubs()
    names = [d["function"]["name"] for d in stubs]
    assert "modify_inventory" in names
    assert "run_quotation_fill" in names
    assert "search_inventory" not in names


def test_deferred_stub_has_empty_parameters(registry_with_mixed_tools):
    stubs = registry_with_mixed_tools.get_deferred_stubs()
    for stub in stubs:
        params = stub["function"]["parameters"]
        assert params["properties"] == {}
        assert params["required"] == []


def test_deferred_stub_description_contains_marker(registry_with_mixed_tools):
    stubs = registry_with_mixed_tools.get_deferred_stubs()
    for stub in stubs:
        assert "延迟加载" in stub["function"]["description"]


def test_get_all_deferred_definitions_returns_full_schema(registry_with_mixed_tools):
    deferred = registry_with_mixed_tools.get_all_deferred_definitions()
    names = [d["function"]["name"] for d in deferred]
    assert "modify_inventory" in names
    assert "run_quotation_fill" in names
    for d in deferred:
        assert "x_tool_meta" in d["function"]
        assert d["function"]["x_tool_meta"].get("deferred") is True


def test_get_definitions_unchanged(registry_with_mixed_tools):
    """get_definitions() backward compat: returns all tools."""
    all_defs = registry_with_mixed_tools.get_definitions()
    names = [d["function"]["name"] for d in all_defs]
    assert len(names) == 5


# ── Task 2 tests ──────────────────────────────────────────────────────────────

def test_extra_tools_p1_are_marked_deferred():
    """batch_quick_quote / run_quotation_fill / append_business_knowledge 应有 deferred: True。"""
    from backend.agent.tools import EXTRA_TOOLS
    p1_names = {"batch_quick_quote", "run_quotation_fill", "append_business_knowledge"}
    for t in EXTRA_TOOLS:
        name = t["function"]["name"]
        if name in p1_names:
            meta = t["function"].get("x_tool_meta", {})
            assert meta.get("deferred") is True, f"{name} 缺少 deferred: True"


def test_ask_clarification_is_not_deferred():
    """ask_clarification 是 P0，不应有 deferred 标记。"""
    from backend.agent.tools import EXTRA_TOOLS
    for t in EXTRA_TOOLS:
        if t["function"]["name"] == "ask_clarification":
            meta = t["function"].get("x_tool_meta", {})
            assert not meta.get("deferred"), "ask_clarification 不应被 defer"
            return
    pytest.fail("ask_clarification not found in EXTRA_TOOLS")


def test_tool_search_def_exists():
    """TOOL_SEARCH_DEF 应存在且不含 deferred 标记。"""
    from backend.agent.tools import TOOL_SEARCH_DEF
    assert TOOL_SEARCH_DEF["function"]["name"] == "tool_search"
    meta = TOOL_SEARCH_DEF["function"].get("x_tool_meta", {})
    assert not meta.get("deferred")


# ── Task 3 tests ──────────────────────────────────────────────────────────────

def test_oos_tools_are_all_deferred():
    from backend.tools.oos.oos_tools import get_oos_tools_openai_format
    tools = get_oos_tools_openai_format()
    assert len(tools) > 0, "OOS 工具列表不应为空"
    for t in tools:
        name = t["function"]["name"]
        meta = t["function"].get("x_tool_meta", {})
        assert meta.get("deferred") is True, f"OOS 工具 {name} 缺少 deferred: True"
