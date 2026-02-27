import asyncio
import types

import pytest

from backend.agent.session import SessionStore  # noqa: F401 - keeps import order aligned with existing tests
from backend.core.agent import CoreAgent


class _DummyRegistry:
    def __init__(self):
        self.execute_called = False

    def get_definitions(self):
        return [
            {
                "type": "function",
                "function": {"name": "dummy_tool", "parameters": {"type": "object", "properties": {}}},
            }
        ]

    async def execute(self, name: str, args: dict, ctx: dict) -> str:
        self.execute_called = True
        return "ok"


class _DummyCompletions:
    def __init__(self, owner):
        self._owner = owner

    def create(self, **kwargs):
        self._owner.calls += 1
        tool_call = types.SimpleNamespace(
            id="call_1",
            function=types.SimpleNamespace(name="dummy_tool", arguments="{}"),
        )
        msg = types.SimpleNamespace(content="", tool_calls=[tool_call])
        choice = types.SimpleNamespace(message=msg)
        return types.SimpleNamespace(choices=[choice], usage=None)


class _DummyClient:
    def __init__(self):
        self.calls = 0
        self.chat = types.SimpleNamespace(completions=_DummyCompletions(self))


def _make_agent() -> CoreAgent:
    agent = CoreAgent.__new__(CoreAgent)
    agent.client = _DummyClient()
    agent.model = "dummy-model"
    agent._system_prompt = "test-system-prompt"
    agent._extensions = []
    agent._store = None
    agent._registry = _DummyRegistry()
    return agent


def test_execute_react_raises_cancelled_before_llm_call():
    agent = _make_agent()

    async def run():
        await agent.execute_react(user_input="hello", should_cancel=lambda: True)

    with pytest.raises(asyncio.CancelledError):
        asyncio.run(run())

    assert agent.client.calls == 0
    assert agent._registry.execute_called is False


def test_execute_react_raises_cancelled_before_tool_execution():
    agent = _make_agent()

    class _CancelAfter:
        def __init__(self, threshold: int):
            self.threshold = threshold
            self.calls = 0

        def __call__(self) -> bool:
            self.calls += 1
            return self.calls >= self.threshold

    cancel_after = _CancelAfter(threshold=3)

    async def run():
        await agent.execute_react(user_input="hello", max_steps=1, should_cancel=cancel_after)

    with pytest.raises(asyncio.CancelledError):
        asyncio.run(run())

    assert agent.client.calls == 1
    assert agent._registry.execute_called is False
