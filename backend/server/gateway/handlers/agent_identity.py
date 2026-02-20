"""agent.identity.get / agents.list"""

from .stubs import STUB_RESPONSES


def handle_agent_identity_get(params: dict) -> dict:
    agent_id = (params.get("agentId") or "version3").strip() or "version3"
    return {
        "agentId": agent_id,
        "name": "Jagent",
        "avatar": "🤖",
        "emoji": "🤖",
    }


def handle_agents_list(params: dict) -> dict:
    return STUB_RESPONSES["agents.list"]
