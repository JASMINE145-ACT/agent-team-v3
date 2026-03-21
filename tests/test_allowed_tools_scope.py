import asyncio
import json
import types

from fastapi import FastAPI

from backend.core.agent import CoreAgent
from backend.server.services.wecom_chat_bridge import handle_wecom_text


class _DummyRegistry:
    def __init__(self):
        self.execute_called = False

    def get_definitions(self):
        return [
            {
                "type": "function",
                "function": {
                    "name": "batch_quick_quote",
                    "parameters": {"type": "object", "properties": {}},
                },
            },
            {
                "type": "function",
                "function": {
                    "name": "search_inventory",
                    "parameters": {"type": "object", "properties": {}},
                },
            },
        ]

    async def execute(self, name: str, args: dict, ctx: dict) -> str:
        self.execute_called = True
        return json.dumps({"ok": True, "name": name, "args": args, "ctx": ctx}, ensure_ascii=False)


class _RecordOnlyCompletions:
    def __init__(self, owner):
        self._owner = owner

    def create(self, **kwargs):
        self._owner.calls += 1
        self._owner.last_kwargs = kwargs
        msg = types.SimpleNamespace(content="done", tool_calls=[])
        choice = types.SimpleNamespace(message=msg, finish_reason="stop")
        return types.SimpleNamespace(choices=[choice], usage=None)


class _DisallowedToolCallCompletions:
    def __init__(self, owner):
        self._owner = owner

    def create(self, **kwargs):
        self._owner.calls += 1
        self._owner.last_kwargs = kwargs
        tool_call = types.SimpleNamespace(
            id="call_disallowed",
            function=types.SimpleNamespace(name="search_inventory", arguments="{}"),
        )
        msg = types.SimpleNamespace(content="", tool_calls=[tool_call])
        choice = types.SimpleNamespace(message=msg, finish_reason="tool_calls")
        return types.SimpleNamespace(choices=[choice], usage=None)


class _DummyClient:
    def __init__(self, completions_cls):
        self.calls = 0
        self.last_kwargs = None
        self.chat = types.SimpleNamespace(completions=completions_cls(self))


class _BridgeDummyAgent:
    def __init__(self):
        self.last_call = None

    async def execute_react(self, user_input: str, context: dict, session_id: str, **_: object) -> dict:
        self.last_call = {
            "user_input": user_input,
            "context": dict(context),
            "session_id": session_id,
        }
        return {"answer": "ok", "trace": []}


def _make_agent(client: _DummyClient) -> CoreAgent:
    agent = CoreAgent.__new__(CoreAgent)
    agent.client = client
    agent.model = "dummy-model"
    agent._system_prompt = "test-system-prompt"
    agent._extensions = []
    agent._store = None
    agent._registry = _DummyRegistry()
    return agent


def _tool_names_from_kwargs(kwargs: dict) -> list[str]:
    tools = kwargs.get("tools") or []
    names = []
    for t in tools:
        func = t.get("function", {}) if isinstance(t, dict) else {}
        name = func.get("name")
        if isinstance(name, str):
            names.append(name)
    return names


def test_wecom_bridge_sets_batch_quick_quote_allowlist():
    app = FastAPI()
    agent = _BridgeDummyAgent()
    app.state.agent = agent

    out = asyncio.run(handle_wecom_text("alice", "hello", app))
    assert out == "ok"
    assert agent.last_call is not None
    assert agent.last_call["session_id"] == "wecom:alice"
    assert agent.last_call["context"] == {
        "channel": "wecom",
        "allowed_tools": ["batch_quick_quote"],
    }


def test_execute_react_exposes_only_allowed_tool():
    agent = _make_agent(_DummyClient(_RecordOnlyCompletions))

    async def run():
        await agent.execute_react(
            user_input="hello",
            context={"allowed_tools": ["batch_quick_quote"]},
            max_steps=2,
        )

    asyncio.run(run())
    names = _tool_names_from_kwargs(agent.client.last_kwargs)
    assert names == ["batch_quick_quote"]


def test_execute_react_blocks_disallowed_tool_with_tool_not_allowed():
    agent = _make_agent(_DummyClient(_DisallowedToolCallCompletions))

    async def run():
        return await agent.execute_react(
            user_input="hello",
            context={"allowed_tools": ["batch_quick_quote"]},
            max_steps=1,
        )

    result = asyncio.run(run())
    assert agent._registry.execute_called is False

    observations = [x for x in result["trace"] if x.get("type") == "observation"]
    assert observations, "expected at least one observation in trace"
    payload = json.loads(observations[-1]["content"])
    assert payload["success"] is False
    assert payload["error"]["type"] == "tool_not_allowed"


def test_execute_react_without_allowlist_exposes_full_tools():
    agent = _make_agent(_DummyClient(_RecordOnlyCompletions))

    async def run():
        await agent.execute_react(
            user_input="hello",
            context={},
            max_steps=2,
        )

    asyncio.run(run())
    names = _tool_names_from_kwargs(agent.client.last_kwargs)
    assert names == ["batch_quick_quote", "search_inventory"]
