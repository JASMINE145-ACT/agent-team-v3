"""
集成测试：仅用 CoreAgent + 最小 Extension（一个 echo 工具），走真实 LLM。

目的：
- 验证当前 .env（如 LLM_MODEL=glm-4.5-air、智谱 Base URL）下 ReAct 能正常完成一轮对话；
- 验证工具注册与一次 tool_call → observation 链路可用。

运行（在 Agent Team version3 根目录）：
  python -m pytest tests/test_core_glm_query.py -v -s
  或
  python tests/test_core_glm_query.py

说明：
- 无 API Key 时自动 skip（不失败）。
- Key/端点不匹配或已失效导致线上返回 401 时 skip（不失败），避免 CI/本地误配时整条用例红。
- 当前主模型为 GLM-4.5-air（智谱）；fallback 为 gpt-4o-mini（OpenAI）。
- CoreAgent 仍会间接依赖 backend.config、backend.agent.session；excel 摘要仅在带 file_path 时触发。
"""
from __future__ import annotations

import asyncio
import json
import sys
import unittest
from pathlib import Path
from typing import Awaitable, Callable

_root = Path(__file__).resolve().parent.parent
if str(_root) not in sys.path:
    sys.path.insert(0, str(_root))


def _mock_session_store():
    from unittest.mock import MagicMock

    from backend.agent.session import SessionStore

    b = MagicMock()
    b.load_turns.return_value = []
    b.list_sessions.return_value = []
    b.read_session_sidecar = MagicMock(return_value={})
    return SessionStore(backend=b)


def _has_llm_credentials() -> bool:
    from backend.config import Config

    key = (getattr(Config, "OPENAI_API_KEY", None) or "").strip()
    return bool(key)


def _run_react_test(async_main: Callable[[], Awaitable[None]]) -> None:
    """执行异步用例；401 鉴权失败时 skip，其它异常照常抛出。"""
    import openai

    try:
        asyncio.run(async_main())
    except openai.AuthenticationError as e:
        raise unittest.SkipTest(
            "LLM 鉴权失败（401）：请核对 OPENAI_API_KEY / MINIMAX_API_KEY 与 "
            "OPENAI_BASE_URL / MINIMAX_BASE_URL（MiniMax 兼容端一般为 …/v1/）。"
        ) from e
    except openai.APIStatusError as e:
        if getattr(e, "status_code", None) == 401:
            raise unittest.SkipTest(
                "LLM 鉴权失败（401）：请核对 OPENAI_API_KEY / MINIMAX_API_KEY 与 "
                "OPENAI_BASE_URL / MINIMAX_BASE_URL。"
            ) from e
        raise


from backend.core.extension import AgentExtension, ExtensionContext


class _MinimalEchoExtension(AgentExtension):
    """最小 AgentExtension：注册一个可校验的 echo 工具（不依赖业务包）。"""

    def register(self, ctx: ExtensionContext) -> None:
        async def _handler(args: dict, ctx2: dict) -> str:
            msg = (args.get("message") or "").strip()
            return json.dumps({"ok": True, "echoed": msg}, ensure_ascii=False)

        definition = {
            "type": "function",
            "function": {
                "name": "core_test_echo",
                "description": "测试用：原样回显 message，用于验证工具链路。",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "message": {
                            "type": "string",
                            "description": "要回显的短文本",
                        }
                    },
                    "required": ["message"],
                },
            },
        }
        ctx.register_tool(definition, _handler)

    def get_skill_prompt(self) -> str:
        return (
            "### core_test_echo\n"
            "当用户要求测试工具或「回显」时，调用 `core_test_echo`，传入 `message`。"
        )


@unittest.skipUnless(_has_llm_credentials(), "需要配置 ZHIPU_API_KEY 或 OPENAI_API_KEY（见 backend.config）")
class TestCoreGLMQuery(unittest.TestCase):
    """使用 Config 中的模型（如 glm-4.5-air）跑通 CoreAgent。"""

    def test_plain_answer_without_tools(self) -> None:
        """无工具：仅验证 LLM 能返回非空 answer。"""

        async def _run() -> None:
            from backend.agent.session import SessionStore
            from backend.config import Config
            from backend.core.agent import CoreAgent

            agent = CoreAgent(
                api_key=Config.OPENAI_API_KEY,
                base_url=Config.OPENAI_BASE_URL,
                model=Config.LLM_MODEL,
                extensions=[],
                session_store=_mock_session_store(),
            )
            out = await agent.execute_react(
                user_input="只回复一个单词：PONG。不要调用任何工具。",
                context={},
                max_steps=4,
                session_id="test:core-plain",
            )
            answer = (out.get("answer") or "").strip()
            self.assertTrue(len(answer) > 0, f"answer 为空: {out!r}")
            self.assertIsNone(out.get("error"))

        _run_react_test(_run)

    def test_echo_tool_once(self) -> None:
        """有工具：模型应调用 core_test_echo，answer 或 trace 中应体现回显结果。"""

        async def _run() -> None:
            from backend.agent.session import SessionStore
            from backend.config import Config
            from backend.core.agent import CoreAgent

            agent = CoreAgent(
                api_key=Config.OPENAI_API_KEY,
                base_url=Config.OPENAI_BASE_URL,
                model=Config.LLM_MODEL,
                extensions=[_MinimalEchoExtension()],
                session_store=_mock_session_store(),
            )
            out = await agent.execute_react(
                user_input='请调用工具 core_test_echo，参数 message 必须为 "test-ok"。',
                context={"allowed_tools": ["core_test_echo"]},
                max_steps=6,
                session_id="test:core-echo",
            )
            answer = (out.get("answer") or "").strip()
            trace = out.get("trace") or []

            tool_calls = [t for t in trace if isinstance(t, dict) and t.get("type") == "tool_call"]
            names = [t.get("name") for t in tool_calls]
            self.assertIn(
                "core_test_echo",
                names,
                f"trace 中未找到 core_test_echo 调用: {names!r} trace={trace!r}",
            )

            # 最终回答或 observation 中应出现 test-ok
            joined = answer + json.dumps(trace, ensure_ascii=False)
            self.assertIn("test-ok", joined, f"未在输出中找到 test-ok: answer={answer!r}")

        _run_react_test(_run)


if __name__ == "__main__":
    unittest.main(verbosity=2)
