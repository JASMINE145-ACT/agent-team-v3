"""验证 OOS handler 注册行为。"""


def test_register_oos_tools_registers_at_least_four_tools():
    """register_oos_tools 应注册至少 4 个工具（list/stats/by_file/by_time + EXTRA_TOOLS 中的 oos 工具）。"""
    from unittest.mock import MagicMock
    from backend.tools.oos.handler import register_oos_tools

    ctx = MagicMock()
    register_oos_tools(ctx)

    assert ctx.register_tool.call_count >= 4, (
        f"期望至少 4 次 register_tool 调用，实际 {ctx.register_tool.call_count} 次"
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
