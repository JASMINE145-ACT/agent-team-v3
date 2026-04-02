from backend.agent.session import SessionStore
from backend.server.gateway.handlers.chat import handle_chat_history
from backend.server.gateway.handlers.sessions import handle_sessions_list, handle_sessions_patch


def test_chat_history_includes_saved_thinking(monkeypatch, tmp_path):
    store = SessionStore(persist_dir=tmp_path)
    monkeypatch.setattr("backend.server.gateway.handlers.chat.get_session_store", lambda: store)

    store.save_turn(
        session_id="s1",
        query="查询三通50价格",
        agent="single",
        answer="已选第1条，单价 13.36 元。",
        thinking="先匹配产品，再返回报价。",
    )

    payload = handle_chat_history({"sessionKey": "s1", "limit": 20})
    assert isinstance(payload.get("messages"), list)
    assert len(payload["messages"]) == 2

    assistant = payload["messages"][1]
    assert assistant["role"] == "assistant"
    assert assistant["content"][0] == {"type": "thinking", "thinking": "先匹配产品，再返回报价。"}
    assert assistant["content"][1]["type"] == "text"
    assert payload.get("thinkingLevel") is None
    assert payload.get("reasoningLevel") is None


def test_sessions_patch_persists_reasoning_and_history_returns_levels(monkeypatch, tmp_path):
    store = SessionStore(persist_dir=tmp_path)
    monkeypatch.setattr("backend.server.gateway.handlers.sessions.get_session_store", lambda: store)
    monkeypatch.setattr("backend.server.gateway.handlers.chat.get_session_store", lambda: store)

    handle_sessions_patch(
        {
            "key": "s2",
            "thinkingLevel": "low",
            "verboseLevel": "full",
            "reasoningLevel": "on",
        }
    )

    sessions_payload = handle_sessions_list({"limit": 20})
    rows = sessions_payload.get("sessions") or []
    row = next((r for r in rows if r.get("key") == "s2"), None)
    assert row is not None
    assert row.get("thinkingLevel") == "low"
    assert row.get("verboseLevel") == "full"
    assert row.get("reasoningLevel") == "on"

    history_payload = handle_chat_history({"sessionKey": "s2", "limit": 20})
    assert history_payload.get("thinkingLevel") == "low"
    assert history_payload.get("reasoningLevel") == "on"
