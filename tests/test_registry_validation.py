import json

import pytest

from backend.core.registry import ToolRegistry


@pytest.mark.asyncio
async def test_registry_execute_uses_validated_args_and_calls_handler_on_success():
    called = {}

    async def handler(args, ctx):  # type: ignore[override]
        called["args"] = args
        called["ctx"] = ctx
        return json.dumps({"ok": True, "args": args}, ensure_ascii=False)

    registry = ToolRegistry()
    definition = {
        "type": "function",
        "function": {
            "name": "echo_tool",
            "description": "echo",
            "parameters": {
                "type": "object",
                "properties": {
                    "x": {"type": "number"},
                },
            },
        },
    }
    registry.register(definition, handler)

    out = await registry.execute("echo_tool", {"x": 1}, {"foo": "bar"})
    data = json.loads(out)
    assert data["ok"] is True
    assert called["args"] == {"x": 1}
    assert called["ctx"] == {"foo": "bar"}


@pytest.mark.asyncio
async def test_registry_execute_returns_validation_error_and_skips_handler_on_failure():
    called = {"count": 0}

    async def handler(args, ctx):  # type: ignore[override]
        called["count"] += 1
        return json.dumps({"ok": True}, ensure_ascii=False)

    registry = ToolRegistry()
    definition = {
        "type": "function",
        "function": {
            "name": "echo_tool",
            "description": "echo",
            "parameters": {
                "type": "object",
                "properties": {
                    "x": {"type": "number"},
                },
            },
        },
    }
    registry.register(definition, handler)

    out = await registry.execute("echo_tool", {"x": "not-a-number"}, {})
    data = json.loads(out)
    assert data["error"]["type"] == "validation_error"
    # 确认 handler 未被调用
    assert called["count"] == 0

