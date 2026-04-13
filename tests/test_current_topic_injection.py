"""
测试 context-degradation 方案：user 消息末尾是否追加【当前主题】。
"""
import asyncio
import time
from unittest.mock import MagicMock

from backend.agent.session import Session, SessionStore, Turn
from backend.core.agent import CoreAgent


def test_current_topic_appears_in_user_message():
    """有 session 且存在上一轮时，首轮 LLM 收到的 user content 末尾应包含【当前主题】。"""
    captured = {}

    def fake_create(**kwargs):
        captured["messages"] = kwargs.get("messages")
        # 返回无 tool_calls 的回复，让 ReAct 一轮结束
        resp = MagicMock()
        resp.choices = [MagicMock()]
        resp.choices[0].message = MagicMock()
        resp.choices[0].message.content = "好的，这是 A 档价格。"
        resp.choices[0].message.tool_calls = None
        resp.usage = MagicMock()
        resp.usage.prompt_tokens = 100
        resp.usage.completion_tokens = 20
        return resp

    turn_one = Turn(
        query="外螺纹堵头 dn50 多少钱",
        agent="single",
        answer="B档 10 元。",
        ts=time.time(),
    )
    backend = MagicMock()
    backend.load_turns.return_value = [turn_one]
    backend.read_session_sidecar = MagicMock(return_value={})
    store = SessionStore(backend=backend)
    session = Session(
        session_id="test-sid",
        turns=[turn_one],
        file_path=None,
    )
    store._mem["test-sid"] = session

    client = MagicMock()
    client.chat.completions.create = fake_create

    agent = CoreAgent(
        api_key="test",
        base_url="https://test",
        model="test",
        extensions=[],
        session_store=store,
    )
    agent.client = client

    async def run():
        return await agent.execute_react(
            user_input="那 A 档呢",
            session_id="test-sid",
        )

    result = asyncio.run(run())

    assert "messages" in captured
    messages = captured["messages"]
    user_msgs = [m for m in messages if m.get("role") == "user"]
    assert len(user_msgs) >= 1
    user_content = user_msgs[0].get("content") or ""

    assert "【当前主题】" in user_content
    assert "上一轮问：" in user_content
    assert "外螺纹堵头" in user_content or "dn50" in user_content
    assert "那 A 档呢" in user_content or "A 档" in user_content
    assert "请据此理解意图与所指产品" in user_content

    assert result.get("answer")


def test_card_memory_injected_on_short_followup_query():
    """短追问（含‘对应’）应注入最近卡片结构化摘要。"""
    captured = {}

    def fake_create(**kwargs):
        captured["messages"] = kwargs.get("messages")
        resp = MagicMock()
        resp.choices = [MagicMock()]
        resp.choices[0].message = MagicMock()
        resp.choices[0].message.content = "好的，继续处理。"
        resp.choices[0].message.tool_calls = None
        resp.usage = MagicMock()
        resp.usage.prompt_tokens = 120
        resp.usage.completion_tokens = 16
        return resp

    turn_one = Turn(
        query="PPR 冷水管 1/2寸 查询价格",
        agent="single",
        answer="[已渲染到前端] ...",
        ts=time.time(),
    )
    backend = MagicMock()
    backend.load_turns.return_value = [turn_one]
    backend.read_session_sidecar = MagicMock(return_value={})
    store = SessionStore(backend=backend)
    session = Session(
        session_id="test-card-sid",
        turns=[turn_one],
        file_path=None,
    )
    session.tool_memory = {
        "card_refs": [
            {
                "keywords": "PPR 冷水管 1/2寸，4米/根",
                "code": "8010060771",
                "matched_name": "(IDN)PPR冷给水直管 dn20",
                "unit_price": 17564.0,
                "match_source": "共同",
                "chosen_index": 1,
                "source_tool": "match_quotation",
                "ts": int(time.time() * 1000),
            }
        ]
    }
    store._mem["test-card-sid"] = session

    client = MagicMock()
    client.chat.completions.create = fake_create

    agent = CoreAgent(
        api_key="test",
        base_url="https://test",
        model="test",
        extensions=[],
        session_store=store,
    )
    agent.client = client

    async def run():
        return await agent.execute_react(
            user_input="查询对应库存",
            session_id="test-card-sid",
        )

    result = asyncio.run(run())
    assert result.get("answer")
    messages = captured["messages"]
    user_msgs = [m for m in messages if m.get("role") == "user"]
    assert user_msgs
    user_content = user_msgs[0].get("content") or ""
    assert "[最近卡片摘要]" in user_content
    assert "code=8010060771" in user_content


if __name__ == "__main__":
    test_current_topic_appears_in_user_message()
    print("test_current_topic_appears_in_user_message passed.")
