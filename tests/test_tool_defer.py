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


# ── Task 4 tests ──────────────────────────────────────────────────────────────

# ── Task 6 tests ──────────────────────────────────────────────────────────────

def test_tool_search_finds_deferred_by_name(registry_with_mixed_tools):
    from backend.tools.quotation.handler import make_tool_search_handler
    handler = make_tool_search_handler(registry_with_mixed_tools)
    result = asyncio.run(handler({"query": "run_quotation_fill"}, {}))
    data = json.loads(result)
    assert "tools" in data
    names = [t["function"]["name"] for t in data["tools"]]
    assert "run_quotation_fill" in names


def test_tool_search_finds_by_keyword(registry_with_mixed_tools):
    from backend.tools.quotation.handler import make_tool_search_handler
    handler = make_tool_search_handler(registry_with_mixed_tools)
    result = asyncio.run(handler({"query": "modify"}, {}))
    data = json.loads(result)
    assert "tools" in data
    names = [t["function"]["name"] for t in data["tools"]]
    assert "modify_inventory" in names


def test_tool_search_returns_error_for_no_match(registry_with_mixed_tools):
    from backend.tools.quotation.handler import make_tool_search_handler
    handler = make_tool_search_handler(registry_with_mixed_tools)
    result = asyncio.run(handler({"query": "nonexistent_xyz_abc"}, {}))
    data = json.loads(result)
    assert "error" in data


def test_tool_search_does_not_return_p0_tools(registry_with_mixed_tools):
    """tool_search 只返回 deferred 工具，不返回 P0 工具。"""
    from backend.tools.quotation.handler import make_tool_search_handler
    handler = make_tool_search_handler(registry_with_mixed_tools)
    # "search" matches "search_inventory" (P0) - should NOT appear
    result = asyncio.run(handler({"query": "search_inventory"}, {}))
    data = json.loads(result)
    if "tools" in data:
        names = [t["function"]["name"] for t in data["tools"]]
        assert "search_inventory" not in names


# ── Task 7 tests ──────────────────────────────────────────────────────────────

def test_agent_uses_full_definitions_when_defer_disabled(registry_with_mixed_tools):
    """ENABLE_TOOL_DEFER=False 时，工具列表 = get_definitions()（全部 5 个）。"""
    import backend.config as cfg
    original = getattr(cfg.Config, "ENABLE_TOOL_DEFER", False)
    try:
        cfg.Config.ENABLE_TOOL_DEFER = False
        if cfg.Config.ENABLE_TOOL_DEFER:
            tools = registry_with_mixed_tools.get_p0_definitions() + registry_with_mixed_tools.get_deferred_stubs()
        else:
            tools = registry_with_mixed_tools.get_definitions()
        assert len(tools) == 5
    finally:
        cfg.Config.ENABLE_TOOL_DEFER = original


def test_agent_uses_p0_plus_stubs_when_defer_enabled(registry_with_mixed_tools):
    """ENABLE_TOOL_DEFER=True 时，工具列表 = P0(2) + stubs(3)，总数仍 5。"""
    import backend.config as cfg
    original = getattr(cfg.Config, "ENABLE_TOOL_DEFER", False)
    try:
        cfg.Config.ENABLE_TOOL_DEFER = True
        if cfg.Config.ENABLE_TOOL_DEFER:
            tools = registry_with_mixed_tools.get_p0_definitions() + registry_with_mixed_tools.get_deferred_stubs()
        else:
            tools = registry_with_mixed_tools.get_definitions()
        assert len(tools) == 5  # 2 P0 + 3 stubs = 5 total
        names = [d["function"]["name"] for d in tools]
        assert "search_inventory" in names
        assert "modify_inventory" in names  # stub 仍在列表中
        # stubs 的 parameters.properties 为空
        stubs = [d for d in tools if d["function"]["name"] == "modify_inventory"]
        assert stubs[0]["function"]["parameters"]["properties"] == {}
    finally:
        cfg.Config.ENABLE_TOOL_DEFER = original


# ── Task 5 tests ──────────────────────────────────────────────────────────────

def test_quote_tools_are_all_deferred():
    from backend.tools.quotation.quote_tools import get_quote_tools_openai_format
    tools = get_quote_tools_openai_format()
    assert len(tools) > 0
    for t in tools:
        name = t["function"]["name"]
        meta = t["function"].get("x_tool_meta", {})
        assert meta.get("deferred") is True, f"Quote 工具 {name} 缺少 deferred: True"


# ── Task 4 tests ──────────────────────────────────────────────────────────────

def test_inventory_p1_tools_are_deferred():
    from backend.tools.inventory.services.inventory_agent_tools import get_inventory_tools_openai_format
    tools = get_inventory_tools_openai_format()
    p1_names = {"modify_inventory", "select_wanding_match"}
    p0_names = {
        "search_inventory", "get_inventory_by_code", "get_inventory_by_code_batch",
        "match_quotation", "match_quotation_batch",
        "get_profit_by_price", "get_profit_by_price_batch",
    }
    for t in tools:
        name = t["function"]["name"]
        meta = t["function"].get("x_tool_meta", {})
        if name in p1_names:
            assert meta.get("deferred") is True, f"{name} 应有 deferred: True"
        elif name in p0_names:
            assert not meta.get("deferred"), f"{name} 不应被 defer"
