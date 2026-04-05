"""Tests for handle_wecom_message push_event card collection."""
from unittest.mock import AsyncMock, MagicMock, patch

import pytest

from backend.wecom_bot.handler import StandardWeComMessage, handle_wecom_message


@pytest.fixture
def fake_agent():
    return MagicMock()


def _msg(content: str) -> StandardWeComMessage:
    return {
        "msg_id": "test",
        "from_user": "test-user",
        "to_user": "bot",
        "msg_type": "text",
        "content": content,
        "raw": {},
    }


@pytest.mark.asyncio
async def test_returns_list_no_cards(fake_agent):
    """No tool_render events → list with LLM answer."""
    fake_agent.execute_react = AsyncMock(return_value={"answer": "纯文本回复"})
    with patch("backend.wecom_bot.handler._load_wecom_session_context", return_value={}):
        result = await handle_wecom_message(fake_agent, _msg("你好"))
    assert result == ["纯文本回复"]


@pytest.mark.asyncio
async def test_returns_card_texts_when_tool_render_fires(fake_agent):
    """tool_render events → list of card texts; LLM marker answer ignored."""
    card1, card2 = "卡片1", "卡片2"

    async def _execute(user_input, context, session_id):
        push = context.get("push_event")
        if callable(push):
            push("tool_render", {"formatted_response": card1})
            push("tool_render", {"formatted_response": card2})
        return {"answer": "[已渲染到前端]"}

    fake_agent.execute_react = _execute
    with patch("backend.wecom_bot.handler._load_wecom_session_context", return_value={}):
        result = await handle_wecom_message(fake_agent, _msg("查报价"))
    assert result == [card1, card2]


@pytest.mark.asyncio
async def test_empty_formatted_response_filtered(fake_agent):
    """Cards with empty formatted_response are excluded."""
    async def _execute(user_input, context, session_id):
        push = context.get("push_event")
        if callable(push):
            push("tool_render", {"formatted_response": ""})
            push("tool_render", {"formatted_response": "有效卡片"})
        return {"answer": "[已渲染到前端]"}

    fake_agent.execute_react = _execute
    with patch("backend.wecom_bot.handler._load_wecom_session_context", return_value={}):
        result = await handle_wecom_message(fake_agent, _msg("查报价"))
    assert result == ["有效卡片"]


@pytest.mark.asyncio
async def test_non_tool_render_events_ignored(fake_agent):
    """Events other than tool_render do not contribute to cards."""
    async def _execute(user_input, context, session_id):
        push = context.get("push_event")
        if callable(push):
            push("other_event", {"formatted_response": "不应出现"})
        return {"answer": "正常回复"}

    fake_agent.execute_react = _execute
    with patch("backend.wecom_bot.handler._load_wecom_session_context", return_value={}):
        result = await handle_wecom_message(fake_agent, _msg("test"))
    assert result == ["正常回复"]
