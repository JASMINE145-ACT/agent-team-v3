import json

import asyncio
import pytest
from types import SimpleNamespace
from backend.core.language_utils import detect_language, contains_chinese
from backend.plugins.jagent.extension import JAgentExtension
from backend.server.gateway.handlers.chat import handle_chat_send
from backend.wecom_bot.handler import handle_wecom_message


def test_detect_language_basic_cases():
    assert detect_language("查一下 DN50 弯头库存") == "zh"
    assert detect_language("please tell me the profit of 8010024812") == "en"
    # 混合或短文本走 auto，交由上层按默认中文处理
    assert detect_language("DN50弯头 please") in ("zh", "auto")


def test_contains_chinese_threshold():
    assert contains_chinese("这是中文内容" * 2)
    assert not contains_chinese("no chinese here at all")


def test_on_before_prompt_injects_english_policy():
    ext = JAgentExtension()
    ctx_en = {"preferred_lang": "en"}
    ctx_zh = {"preferred_lang": "zh"}

    en_input = "please tell me the profit of 8010024812"
    zh_input = "查一下 8010024812 的利润率"

    out_en = ext.on_before_prompt(en_input, ctx_en)
    out_zh = ext.on_before_prompt(zh_input, ctx_zh)

    assert "LANGUAGE POLICY" in out_en
    assert en_input in out_en
    assert out_zh == zh_input


def test_on_after_tool_appends_translation_note_for_english_preference():
    ext = JAgentExtension()
    ctx_en = {"preferred_lang": "en"}
    ctx_zh = {"preferred_lang": "zh"}

    chinese_obs = "编号 8010024812（直通管件）在万鼎价格库中，按你给的价格 7,858.0，对应利润率约 10.00%。"
    english_obs = json.dumps({"success": True, "result": "ok"}, ensure_ascii=False)

    out_en = ext.on_after_tool("get_profit_by_price", {}, chinese_obs, ctx_en)
    out_zh = ext.on_after_tool("get_profit_by_price", {}, chinese_obs, ctx_zh)
    out_en_english = ext.on_after_tool("get_profit_by_price", {}, english_obs, ctx_en)

    assert "Translation note" in out_en
    assert "Translation note" not in out_zh
    assert "Translation note" not in out_en_english


class _DummyAgent:
    def __init__(self):
        self.last_context = None

    async def execute_react(self, user_input: str, context: dict, session_id: str, **_: object) -> dict:
        # 仅记录 context，避免真正调用 LLM
        self.last_context = dict(context)
        return {"answer": "ok", "thinking": None, "trace": []}


def test_websocket_entrypoint_sets_preferred_lang_for_english_message():
    agent = _DummyAgent()
    ws = SimpleNamespace(app=SimpleNamespace(state=SimpleNamespace(agent=agent)))
    params = {
        "sessionKey": "test-session",
        "message": "please give me the inventory",
        "context": {},
    }

    async def _fake_send_res(payload: dict) -> None:
        return None

    async def _fake_send_event(payload: dict) -> None:
        return None

    # 直接在事件循环中运行 handle_chat_send
    asyncio.run(handle_chat_send(ws, "req-1", params, _fake_send_res, _fake_send_event))

    ctx = agent.last_context or {}
    assert ctx.get("preferred_lang") == "en"
    assert ctx.get("detected_lang") == "en"


def test_wecom_entrypoint_sets_preferred_lang_for_english_message():
    agent = _DummyAgent()

    msg = {
        "msg_type": "text",
        "from_user": "user-1",
        "content": "please tell me the inventory status",
    }

    # 直接运行 handle_wecom_message，内部会调用 DummyAgent.execute_react
    result = asyncio.run(handle_wecom_message(agent, msg))
    assert isinstance(result, str)
    ctx = agent.last_context or {}
    assert ctx.get("preferred_lang") == "en"
    assert ctx.get("detected_lang") == "en"


def test_chinese_history_then_english_query_uses_english_policy():
    """跨轮对话：先中文，再英文时应切换到英文策略。"""
    ext = JAgentExtension()

    # 第一次中文提问，按 routes_chat 的逻辑设置上下文
    ctx = {}
    zh_query = "查一下 DN50 弯头库存"
    detected_zh = detect_language(zh_query)
    assert detected_zh == "zh"
    ctx["detected_lang"] = detected_zh
    ctx["preferred_lang"] = "en" if detected_zh == "en" else "zh"
    assert ctx["preferred_lang"] == "zh"

    # 第二次英文提问，复用同一个 ctx（模拟同一 session/context 被前端沿用）
    en_query = "please summarize the above inventory in English"
    detected_en = detect_language(en_query)
    assert detected_en == "en"
    ctx["detected_lang"] = detected_en
    ctx["preferred_lang"] = "en" if detected_en == "en" else "zh"

    # JAgentExtension 应根据最新的 preferred_lang 注入英文 LANGUAGE POLICY
    out_en = ext.on_before_prompt(en_query, ctx)
    assert "LANGUAGE POLICY" in out_en
    assert en_query in out_en
    # 确认已经从最初的中文偏好切换到英文
    assert ctx["preferred_lang"] == "en"


def test_english_query_with_chinese_tool_output_adds_translation_note():
    """英文偏好 + 中文工具输出时应追加 Translation note。"""
    ext = JAgentExtension()

    # 英文问题 -> detect_language 应判定为 en，并驱动 preferred_lang = "en"
    en_query = "please check the inventory of DN50 elbow"
    detected = detect_language(en_query)
    assert detected == "en"
    ctx_en = {"detected_lang": detected, "preferred_lang": "en"}

    chinese_obs = "编号 8010024812（直通管件）在万鼎价格库中，按你给的价格 7,858.0，对应利润率约 10.00%。"

    out_en = ext.on_after_tool("inventory_tool", {}, chinese_obs, ctx_en)
    # 英文偏好 + 中文 observation 时，应有翻译提示
    assert "Translation note" in out_en
    assert chinese_obs in out_en

    # 中文偏好时不应追加翻译提示
    ctx_zh = {"detected_lang": "zh", "preferred_lang": "zh"}
    out_zh = ext.on_after_tool("inventory_tool", {}, chinese_obs, ctx_zh)
    assert out_zh == chinese_obs


# ----- New session (/new, /reset) gateway behavior -----


def test_chat_send_new_with_empty_session_key_returns_new_session_key():
    """chat.send message=/new 且 sessionKey 为空时，不报错并返回 newSessionKey。"""
    res_payloads = []
    event_payloads = []

    async def _send_res(p: dict) -> None:
        res_payloads.append(p)

    async def _send_event(p: dict) -> None:
        if p.get("event") == "chat":
            event_payloads.append(p.get("payload"))

    ws = SimpleNamespace(app=SimpleNamespace(state=SimpleNamespace(agent=_DummyAgent())))
    params = {"sessionKey": "", "message": "/new"}
    asyncio.run(handle_chat_send(ws, "req-new-1", params, _send_res, _send_event))

    assert len(res_payloads) == 1
    assert res_payloads[0].get("ok") is True
    assert "runId" in res_payloads[0]
    assert len(event_payloads) == 1
    payload = event_payloads[0]
    assert payload.get("state") == "final"
    assert payload.get("sessionKey") == ""
    new_key = payload.get("newSessionKey")
    assert new_key and len(new_key) > 0
    # UUID 形
    assert "-" in new_key or len(new_key) >= 32


def test_chat_send_new_with_session_key_returns_same_session_key_in_payload():
    """chat.send message=/new 且带 sessionKey 时，payload 中 sessionKey 为请求中的值。"""
    event_payloads = []

    async def _send_res(_: dict) -> None:
        pass

    async def _send_event(p: dict) -> None:
        if p.get("event") == "chat":
            event_payloads.append(p.get("payload"))

    ws = SimpleNamespace(app=SimpleNamespace(state=SimpleNamespace(agent=_DummyAgent())))
    params = {"sessionKey": "existing-session-123", "message": "/new"}
    asyncio.run(handle_chat_send(ws, "req-new-2", params, _send_res, _send_event))

    assert len(event_payloads) == 1
    assert event_payloads[0].get("sessionKey") == "existing-session-123"
    assert event_payloads[0].get("newSessionKey")
    assert event_payloads[0].get("state") == "final"


def test_chat_send_empty_session_key_with_normal_message_raises():
    """sessionKey 为空且 message 非 /new、/reset 时，应抛出 sessionKey required。"""
    async def _send_res(_: dict) -> None:
        pass

    async def _send_event(_: dict) -> None:
        pass

    ws = SimpleNamespace(app=SimpleNamespace(state=SimpleNamespace(agent=_DummyAgent())))
    params = {"sessionKey": "", "message": "hello"}
    with pytest.raises(ValueError, match="sessionKey required"):
        asyncio.run(handle_chat_send(ws, "req-err", params, _send_res, _send_event))

