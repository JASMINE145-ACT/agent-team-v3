"""Agent info API — exposes model config and live tool registry."""
from __future__ import annotations

from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Request

from backend.config import Config

router = APIRouter()


def _infer_provider() -> str:
    if Config.PRIMARY_LLM_PROTOCOL == "anthropic":
        return "anthropic"
    base = (Config.OPENAI_BASE_URL or "").lower()
    if "bigmodel.cn" in base:
        return "zhipu"
    if "minimax" in base:
        return "minimax"
    return "openai"


@router.get("/api/agent/info")
async def agent_info(request: Request) -> Dict[str, Any]:
    agent = getattr(request.app.state, "agent", None)

    tool_count = 0
    tools: List[Dict[str, Any]] = []
    if agent is not None:
        try:
            defs = agent._registry.get_definitions()
            tool_count = len(defs)
            tools = [
                {
                    "name": d["function"]["name"],
                    "description": d["function"].get("description", ""),
                    "parameters": d["function"].get("parameters", {}),
                }
                for d in defs
            ]
        except Exception:
            pass

    active_sessions: Optional[int] = None
    try:
        from backend.agent.session import get_session_store

        active_sessions = len(get_session_store().list_sessions())
    except Exception:
        pass

    fallback_model = Config.FALLBACK_LLM_MODEL

    return {
        "agent": {
            "name": "PT Vansting Agent",
            "version": "version3",
        },
        "llm": {
            "primary_model": Config.LLM_MODEL,
            "primary_provider": _infer_provider(),
            "fallback_model": fallback_model,
            "fallback_configured": fallback_model is not None,
            "max_tokens": Config.LLM_MAX_TOKENS,
        },
        "health": {
            "status": "ok",
            "active_sessions": active_sessions,
            "tool_count": tool_count,
        },
        "tools": tools,
    }
