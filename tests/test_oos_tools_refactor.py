from __future__ import annotations

from typing import Set

from backend.tools.oos.oos_tools import get_oos_tools_openai_format


def _tool_names(tools: list[dict]) -> Set[str]:
    return {t["function"]["name"] for t in tools}


def test_get_oos_tools_openai_format_schemas():
    tools = get_oos_tools_openai_format()

    # 六个无货相关工具名称应固定且唯一
    expected_names = {
        "get_oos_list",
        "get_oos_stats",
        "get_oos_by_file",
        "get_oos_by_time",
        "register_oos",
        "register_oos_from_text",
    }
    names = _tool_names(tools)
    assert names == expected_names

    # 基础 schema 形状与 x_tool_meta 校验
    by_name = {t["function"]["name"]: t for t in tools}
    for name, tool in by_name.items():
        assert tool["type"] == "function"
        fn = tool["function"]
        assert isinstance(fn.get("description"), str) and fn["description"]
        params = fn.get("parameters")
        assert isinstance(params, dict)
        assert params.get("type") == "object"
        assert "properties" in params and isinstance(params["properties"], dict)
        # 所有 OOS 工具都应带有 x_tool_meta
        meta = fn.get("x_tool_meta")
        assert isinstance(meta, dict)
        assert meta.get("access_mode") in {"read", "write"}
        assert meta.get("risk_level") in {"low", "medium", "high"}

    # 关键 required 字段校验（防止回归）
    assert by_name["register_oos"]["function"]["parameters"]["required"] == ["file_path"]
    assert by_name["register_oos_from_text"]["function"]["parameters"]["required"] == ["product_name"]


def test_get_all_tools_includes_inventory_quotation_and_oos():
    from backend.agent import tools as agent_tools

    # 重置缓存，保证组合逻辑走一遍
    agent_tools.reset_for_testing()

    all_tools = agent_tools.get_all_tools()
    all_names = _tool_names(all_tools)

    # OOS 工具集合
    oos_tools = get_oos_tools_openai_format()
    oos_names = _tool_names(oos_tools)

    # 库存与报价工具集合（来自各自 provider）
    inv_tools = agent_tools._get_inventory_tools()
    quote_tools = agent_tools._get_quote_tools()
    inv_names = _tool_names(inv_tools)
    quote_names = _tool_names(quote_tools)

    # get_all_tools 应包含三类工具的并集
    assert oos_names.issubset(all_names)
    assert inv_names.issubset(all_names)
    assert quote_names.issubset(all_names)


def test_jagent_extension_does_not_register_oos_tools_by_design():
    """OOS 工具 schema 仍由 get_oos_tools_openai_format 提供，但当前不在 Chat 工具列表中注册。"""
    from backend.core.extension import ExtensionContext
    from backend.core.registry import ToolRegistry
    from backend.plugins.jagent.extension import JAgentExtension
    from unittest.mock import MagicMock

    from backend.agent.session import SessionStore

    registry = ToolRegistry()
    dummy_session_store = SessionStore(backend=MagicMock())
    ctx = ExtensionContext(registry=registry, session_store=dummy_session_store)

    ext = JAgentExtension()
    ext.register(ctx)

    registered_names = set(registry.names())
    oos_names = _tool_names(get_oos_tools_openai_format())

    assert oos_names.isdisjoint(registered_names)

