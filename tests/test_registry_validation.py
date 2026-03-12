import json
import logging

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


@pytest.mark.asyncio
async def test_registry_execute_logs_tool_call(caplog):
    import logging as _logging

    async def handler(args, ctx):  # type: ignore[override]
        return json.dumps({"ok": True}, ensure_ascii=False)

    registry = ToolRegistry()
    definition = {
        "type": "function",
        "function": {
            "name": "echo_tool",
            "description": "echo",
            "parameters": {
                "type": "object",
                "properties": {"x": {"type": "number"}},
            },
            "x_tool_meta": {"access_mode": "read", "risk_level": "low"},
        },
    }
    registry.register(definition, handler)

    caplog.set_level(_logging.INFO)
    await registry.execute("echo_tool", {"x": 1}, {})

    messages = [rec.getMessage() for rec in caplog.records]
    tool_logs = [m for m in messages if m.startswith("tool_call ")]
    assert tool_logs, "expected at least one tool_call log line"
    payload_str = tool_logs[-1].split(" ", 1)[1]
    data = json.loads(payload_str)
    assert data["tool"] == "echo_tool"
    assert data["success"] is True
    assert "latency_ms" in data
    assert data["error_type"] is None
    assert data.get("meta", {}).get("access_mode") == "read"

