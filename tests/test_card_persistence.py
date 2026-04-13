"""Tests for tool_render card persistence in session turns and history expansion."""
import time
from pathlib import Path
from unittest.mock import MagicMock, patch

import pytest

from backend.agent.session import SessionStore, Turn
from backend.agent.session_backend_file import FileBackend


def _file_store(tmp_path):
    return SessionStore(backend=FileBackend(Path(tmp_path)))


# ── Turn dataclass ───────────────────────────────────────────────────────────


def test_turn_stores_extra():
    """Turn.extra field persists tool_renders list."""
    renders = [{"formatted_response": "**查询关键词：三通50**\n...", "keywords": "三通50"}]
    t = Turn(query="三通50 价格", agent="single", answer="[已渲染]", ts=time.time(), extra={"tool_renders": renders})
    d = t.to_dict()
    assert d["extra"]["tool_renders"] == renders


def test_turn_from_dict_restores_extra():
    """Turn.from_dict round-trips extra field."""
    renders = [{"formatted_response": "卡片内容", "keywords": "直接50"}]
    d = {"query": "q", "agent": "single", "answer": "a", "ts": 0.0, "extra": {"tool_renders": renders}}
    t = Turn.from_dict(d)
    assert t.extra == {"tool_renders": renders}


def test_turn_from_dict_extra_none():
    """Turn.from_dict handles missing extra gracefully."""
    d = {"query": "q", "agent": "single", "answer": "a", "ts": 0.0}
    t = Turn.from_dict(d)
    assert t.extra is None


# ── save_turn with extra ─────────────────────────────────────────────────────


def test_save_turn_stores_extra(tmp_path):
    """save_turn writes extra.tool_renders into the persisted turn."""
    store = _file_store(tmp_path)
    renders = [{"formatted_response": "卡片", "keywords": "三通50"}]
    store.save_turn(
        session_id="sess-1",
        query="三通50 价格",
        agent="single",
        answer="[已渲染]",
        extra={"tool_renders": renders},
    )
    session = store.load("sess-1")
    assert len(session.turns) == 1
    assert session.turns[0].extra == {"tool_renders": renders}


def test_save_turn_no_extra(tmp_path):
    """save_turn without extra leaves extra as None."""
    store = _file_store(tmp_path)
    store.save_turn(session_id="sess-2", query="hello", agent="single", answer="hi")
    session = store.load("sess-2")
    assert session.turns[0].extra is None


# ── chat.history expansion ────────────────────────────────────────────────────


def test_chat_history_expands_tool_renders(tmp_path):
    """handle_chat_history inserts virtual tool_render messages from extra."""
    from backend.server.gateway.handlers.chat import handle_chat_history

    store = _file_store(tmp_path)
    renders = [
        {"formatted_response": "**查询关键词：三通50**\n卡片内容", "keywords": "三通50"},
    ]
    store.save_turn(
        session_id="test-sess",
        query="三通50 价格",
        agent="single",
        answer="以下是报价：",
        extra={"tool_renders": renders},
    )

    with patch("backend.server.gateway.handlers.chat.get_session_store", return_value=store):
        result = handle_chat_history({"sessionKey": "test-sess"})

    messages = result["messages"]
    # Order: user, tool_render virtual msg, assistant
    assert len(messages) == 3
    assert messages[0]["role"] == "user"
    # Virtual tool_render message
    assert messages[1]["role"] == "assistant"
    assert messages[1]["__openclaw"]["kind"] == "tool_render"
    assert "查询关键词：三通50" in messages[1]["content"][0]["text"]
    # Real assistant answer
    assert messages[2]["role"] == "assistant"
    assert messages[2]["content"][-1]["text"] == "以下是报价："


def test_chat_history_no_tool_renders(tmp_path):
    """handle_chat_history without extra emits only user+assistant."""
    from backend.server.gateway.handlers.chat import handle_chat_history

    store = _file_store(tmp_path)
    store.save_turn(session_id="sess-plain", query="你好", agent="single", answer="你好！")

    with patch("backend.server.gateway.handlers.chat.get_session_store", return_value=store):
        result = handle_chat_history({"sessionKey": "sess-plain"})

    assert len(result["messages"]) == 2


def test_chat_history_suppresses_compact_marker_when_tool_renders_present(tmp_path):
    """Pure compact marker answer is suppressed when tool_renders exist (avoids duplicate card pairing)."""
    from backend.server.gateway.handlers.chat import handle_chat_history

    store = _file_store(tmp_path)
    renders = [{"formatted_response": "**查询关键词：三通50**\n卡片内容", "keywords": "三通50"}]
    store.save_turn(
        session_id="sess-marker",
        query="三通50 价格",
        agent="single",
        answer="[已渲染到前端] 「三通50」查询结果：已选第1条 code=xxx",
        extra={"tool_renders": renders},
    )

    with patch("backend.server.gateway.handlers.chat.get_session_store", return_value=store):
        result = handle_chat_history({"sessionKey": "sess-marker"})

    messages = result["messages"]
    # Only user + virtual tool_render; compact marker assistant is suppressed
    assert len(messages) == 2
    assert messages[0]["role"] == "user"
    assert messages[1]["__openclaw"]["kind"] == "tool_render"


def test_chat_history_wrapper_text_preserved_when_tool_renders_present(tmp_path):
    """Meaningful wrapper text alongside tool_renders is kept in history."""
    from backend.server.gateway.handlers.chat import handle_chat_history

    store = _file_store(tmp_path)
    renders = [{"formatted_response": "卡片内容", "keywords": "直接50"}]
    store.save_turn(
        session_id="sess-wrapper",
        query="直接50 三通50 价格",
        agent="single",
        answer="以下是直接50和三通50的报价：",
        extra={"tool_renders": renders},
    )

    with patch("backend.server.gateway.handlers.chat.get_session_store", return_value=store):
        result = handle_chat_history({"sessionKey": "sess-wrapper"})

    messages = result["messages"]
    # user + virtual tool_render + wrapper text
    assert len(messages) == 3
    assert messages[1]["__openclaw"]["kind"] == "tool_render"
    assert "以下是" in messages[2]["content"][-1]["text"]
