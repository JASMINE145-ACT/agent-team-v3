"""验证 OOS handler 注册行为。"""


def test_register_oos_tools_skips_all_oos_tools():
    """OOS 工具已暂时从 Chat prompt 中移除，register_oos_tools 不再注册任何工具。"""
    from unittest.mock import MagicMock
    from backend.tools.oos.handler import register_oos_tools

    ctx = MagicMock()
    register_oos_tools(ctx)

    assert ctx.register_tool.call_count == 0, (
        f"期望 0 次 register_tool 调用（已暂时禁用），实际 {ctx.register_tool.call_count} 次"
    )


def test_unwrap_tool_result_success():
    """unwrap_tool_result 成功时返回 result 字段。"""
    from backend.core.tool_utils import unwrap_tool_result
    assert unwrap_tool_result({"success": True, "result": "hello"}) == "hello"


def test_unwrap_tool_result_failure_returns_json():
    """unwrap_tool_result 失败时返回包含 success=false 的 JSON 字符串。"""
    import json
    from backend.core.tool_utils import unwrap_tool_result
    result = unwrap_tool_result({"success": False, "error": "bad"})
    parsed = json.loads(result)
    assert parsed["success"] is False
