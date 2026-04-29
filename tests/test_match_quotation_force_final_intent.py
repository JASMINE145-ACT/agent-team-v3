import asyncio
import json
import types

from backend.core.agent import CoreAgent
from backend.core.extension import AgentExtension, ExtensionContext


class _Registry:
    def __init__(self) -> None:
        self.calls: list[str] = []

    def get_definitions(self):
        return [
            {
                "type": "function",
                "function": {"name": "match_quotation", "parameters": {"type": "object", "properties": {}}},
            },
            {
                "type": "function",
                "function": {"name": "get_inventory_by_code", "parameters": {"type": "object", "properties": {}}},
            },
        ]

    def get_p0_definitions(self):
        return self.get_definitions()

    def get_deferred_stubs(self):
        return []

    async def execute(self, name: str, args: dict, ctx: dict) -> str:
        self.calls.append(name)
        if name == "match_quotation":
            return json.dumps({"single": True, "chosen": {"code": "8110010127", "matched_name": "水龙头", "unit_price": 4760}})
        if name == "get_inventory_by_code":
            return json.dumps({"success": True, "item": {"code": args.get("code", ""), "qty_warehouse": 12, "qty_available": 9}})
        return json.dumps({"success": True})


class _RenderMarkerExt(AgentExtension):
    def register(self, ctx: ExtensionContext) -> None:
        return None

    def on_after_tool(self, name: str, args: dict, obs: str, context: dict | None = None) -> str:
        if name == "match_quotation":
            return '[已渲染到前端] "mock rendered quotation card"'
        return obs

    def augment_user_content(
        self, user_input: str, user_content: str, session: object | None, context: dict
    ) -> str:
        """与 JAgent 一致：写入 _inventory_intent，使 should_stop 可区分库存/询价。"""
        from backend.plugins.jagent.extension import (
            _detect_card_followup_intent,
            _detect_inventory_intent,
        )

        context["_inventory_intent"] = _detect_inventory_intent(user_input)
        context["_card_followup"] = _detect_card_followup_intent(user_input)
        return user_content

    def should_stop_loop(
        self, name: str, obs: str, context: dict
    ) -> tuple[bool, str | None]:
        if name not in ("match_quotation", "match_quotation_batch"):
            return False, None
        if not isinstance(obs, str):
            return False, None
        lead = obs.lstrip("\ufeff \t\r\n")
        if not lead.startswith("[已渲染到前端]"):
            return False, None
        if name == "match_quotation_batch":
            return True, obs
        if context.get("_inventory_intent"):
            return False, None
        return True, obs


class _SequencedCompletions:
    def __init__(self, owner):
        self._owner = owner

    def create(self, **kwargs):
        self._owner.calls += 1
        step = self._owner.calls
        if step == 1:
            tc = types.SimpleNamespace(
                id="call_match",
                function=types.SimpleNamespace(
                    name="match_quotation",
                    arguments=json.dumps({"keywords": "直接50", "customer_level": "B"}, ensure_ascii=False),
                ),
            )
            msg = types.SimpleNamespace(content="", tool_calls=[tc])
            return types.SimpleNamespace(choices=[types.SimpleNamespace(message=msg, finish_reason="tool_calls")], usage=None)
        if step == 2:
            tc = types.SimpleNamespace(
                id="call_inv",
                function=types.SimpleNamespace(
                    name="get_inventory_by_code",
                    arguments=json.dumps({"code": "8110010127"}, ensure_ascii=False),
                ),
            )
            msg = types.SimpleNamespace(content="", tool_calls=[tc])
            return types.SimpleNamespace(choices=[types.SimpleNamespace(message=msg, finish_reason="tool_calls")], usage=None)
        msg = types.SimpleNamespace(content="done", tool_calls=[])
        return types.SimpleNamespace(choices=[types.SimpleNamespace(message=msg, finish_reason="stop")], usage=None)


class _DummyClient:
    def __init__(self):
        self.calls = 0
        self.chat = types.SimpleNamespace(completions=_SequencedCompletions(self))


def _make_agent() -> CoreAgent:
    agent = CoreAgent.__new__(CoreAgent)
    agent.client = _DummyClient()
    agent.model = "dummy-model"
    agent._system_prompt = "test-system-prompt"
    agent._use_anthropic = False
    agent._fallback_client = None
    agent._fallback_model = None
    agent._extensions = [_RenderMarkerExt()]
    agent._store = None
    agent._registry = _Registry()
    return agent


def test_inventory_intent_does_not_force_final_after_match_quotation():
    agent = _make_agent()

    async def run():
        return await agent.execute_react(user_input="查询 直接50 库存", context={})

    out = asyncio.run(run())
    assert "get_inventory_by_code" in agent._registry.calls
    assert out.get("answer") == "done"


def test_price_intent_keeps_force_final_after_match_quotation():
    agent = _make_agent()

    async def run():
        return await agent.execute_react(user_input="查询 直接50 价格", context={})

    out = asyncio.run(run())
    assert agent._registry.calls == ["match_quotation"]
    assert str(out.get("answer", "")).startswith("[已渲染到前端]")
