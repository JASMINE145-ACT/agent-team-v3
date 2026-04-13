"""
集成测试：JAgent 全量工具 + CoreAgent ReAct — 结构校验 + 可选真实 LLM（查价场景）。

运行（version3 根目录）：
  py -3 -m pytest tests/test_integration_agent_react.py -v -m "not live"   # 仅本地结构，无 API
  py -3 -m pytest tests/test_integration_agent_react.py -v -m live           # 含真实调用（需 .env）
  py -3 -m pytest tests/test_integration_agent_react.py -v                 # 全部

说明：
- 标记 `live` 的用例会请求 LLM，401/鉴权失败时 skip（不记失败）。
- 验证 Anthropic MiniMax 路径时：需 PRIMARY_LLM_PROTOCOL=anthropic 且 ANTHROPIC_* 有效。
"""
from __future__ import annotations

import asyncio
import os
import sys
import unittest
from pathlib import Path

_root = Path(__file__).resolve().parent.parent
if str(_root) not in sys.path:
    sys.path.insert(0, str(_root))

# pytest 标记：无 pytest 时 unittest 仍可用
try:
    import pytest

    live = pytest.mark.live
except Exception:  # pragma: no cover

    def live(fn):  # type: ignore
        return fn


def _mock_session_store():
    """In-memory SessionStore for tests (no filesystem / DB)."""
    from unittest.mock import MagicMock

    from backend.agent.session import SessionStore

    b = MagicMock()
    b.load_turns.return_value = []
    b.list_sessions.return_value = []
    b.read_session_sidecar = MagicMock(return_value={})
    return SessionStore(backend=b)


def _trace_tool_names(trace: list) -> list[str]:
    names: list[str] = []
    for t in trace or []:
        if isinstance(t, dict) and t.get("type") == "tool_call":
            n = t.get("name")
            if isinstance(n, str) and n:
                names.append(n)
    return names


class TestJAgentToolRegistry(unittest.TestCase):
    """不发起网络：仅校验 JAgent 注册的工具与 system prompt 是否包含业务关键词。"""

    def test_registry_contains_price_and_inventory_tools(self) -> None:
        from backend.agent.session import SessionStore
        from backend.config import Config
        from backend.core.agent import CoreAgent
        from backend.plugins.jagent.extension import JAgentExtension

        agent = CoreAgent(
            api_key=Config.OPENAI_API_KEY or "dummy",
            base_url=Config.OPENAI_BASE_URL or "https://open.bigmodel.cn/api/paas/v4/",
            model=getattr(Config, "LLM_MODEL", "glm-4.5-air"),
            extensions=[JAgentExtension()],
            session_store=_mock_session_store(),
        )
        defs = agent._registry.get_definitions()
        names = {d["function"]["name"] for d in defs if isinstance(d, dict) and "function" in d}
        self.assertIn("match_quotation", names)
        self.assertIn("search_inventory", names)
        self.assertIn("match_wanding_price", names)

    def test_system_prompt_contains_skill_and_output_structure(self) -> None:
        from backend.agent.session import SessionStore
        from backend.config import Config
        from backend.core.agent import CoreAgent
        from backend.plugins.jagent.extension import JAgentExtension

        agent = CoreAgent(
            api_key=Config.OPENAI_API_KEY or "dummy",
            base_url=Config.OPENAI_BASE_URL or "https://open.bigmodel.cn/api/paas/v4/",
            model=getattr(Config, "LLM_MODEL", "glm-4.5-air"),
            extensions=[JAgentExtension()],
            session_store=_mock_session_store(),
        )
        sp = agent._system_prompt
        self.assertIn("工具", sp)
        self.assertTrue(
            "万鼎" in sp or "库存" in sp or "报价" in sp,
            "技能 prompt 应包含业务域关键词之一",
        )
        # Claude Loop / 输出格式由 skills 注入
        self.assertTrue(
            "Plan" in sp or "Gather" in sp or "技能" in sp,
            "应包含 Loop 段落或技能说明",
        )


def _skip_if_no_live_llm() -> None:
    if os.getenv("SKIP_LIVE_LLM", "").strip().lower() in ("1", "true", "yes"):
        raise unittest.SkipTest("SKIP_LIVE_LLM=1")


def _run_live_react(async_main):
    """真实 ReAct：401 类鉴权失败时 skip。"""
    try:
        import anthropic
    except ImportError:
        anthropic = None  # type: ignore
    import openai

    try:
        asyncio.run(async_main())
    except openai.AuthenticationError as e:
        raise unittest.SkipTest(f"LLM 鉴权失败（401 OpenAI 兼容）: {e}") from e
    except openai.APIStatusError as e:
        if getattr(e, "status_code", None) == 401:
            raise unittest.SkipTest(f"LLM 401: {e}") from e
        raise
    except Exception as e:
        if anthropic is not None and isinstance(
            e,
            (
                anthropic.APIStatusError,
                anthropic.AuthenticationError,
                anthropic.PermissionDeniedError,
            ),
        ):
            code = getattr(e, "status_code", None)
            if code == 401 or code == 403 or "401" in str(e):
                raise unittest.SkipTest(f"LLM 鉴权失败（Anthropic）: {e}") from e
        if "401" in str(e):
            raise unittest.SkipTest(f"LLM 401: {e}") from e
        raise


@live
class TestLiveDn50PriceQueryAnthropic(unittest.TestCase):
    """PRIMARY_LLM_PROTOCOL=anthropic 时：真实查询「DN50 价格」，检查 trace 与主链路。"""

    @classmethod
    def setUpClass(cls) -> None:
        from backend.config import Config

        if getattr(Config, "PRIMARY_LLM_PROTOCOL", "") != "anthropic":
            raise unittest.SkipTest("需 PRIMARY_LLM_PROTOCOL=anthropic")
        if not (getattr(Config, "ANTHROPIC_API_KEY", None) or "").strip():
            raise unittest.SkipTest("需 ANTHROPIC_API_KEY")

    def test_live_dn50_price_react_returns_answer_or_tools(self) -> None:
        _skip_if_no_live_llm()

        async def _run() -> None:
            from anthropic import Anthropic

            from backend.agent.session import SessionStore
            from backend.config import Config, get_primary_react_llm_credentials
            from backend.core.agent import CoreAgent
            from backend.plugins.jagent.extension import JAgentExtension

            pk, pb = get_primary_react_llm_credentials()
            agent = CoreAgent(
                api_key=pk or "dummy",
                base_url=pb or "",
                model=Config.LLM_MODEL,
                extensions=[JAgentExtension()],
                session_store=_mock_session_store(),
            )
            self.assertTrue(agent._use_anthropic, "anthropic 主链路应启用 Anthropic Messages（MiniMax …/anthropic）")
            self.assertIsInstance(agent.client, Anthropic, "主模型 client 应为 Anthropic SDK")

            out = await agent.execute_react(
                user_input="查一下 DN50 直通的价格，只要简要结果。",
                context={},
                max_steps=8,
                session_id="test:live-dn50-anthropic",
            )
            answer = (out.get("answer") or "").strip()
            trace = out.get("trace") or []
            err = out.get("error")
            self.assertIsNone(err, f"error 应为 None: {out!r}")
            tool_names = _trace_tool_names(trace)
            # 真实模型可能直接回答或调工具；至少应有最终回答或非空 trace
            self.assertTrue(
                len(answer) > 0 or len(trace) > 0,
                f"应有回答或 trace: answer={answer!r} trace_len={len(trace)}",
            )
            # 若走了工具，应出现业务工具之一（不强制，避免模型偶发纯文本）
            if tool_names:
                allowed = {
                    "search_inventory",
                    "match_quotation",
                    "match_wanding_price",
                    "get_profit_by_price",
                    "get_inventory_by_code",
                    "parse_excel_smart",
                }
                hit = allowed.intersection(set(tool_names))
                self.assertTrue(
                    len(hit) > 0,
                    f"若产生 tool_call，期望为业务工具之一；实际: {tool_names}",
                )

        _run_live_react(_run)


@live
class TestLiveDn50PriceQueryOpenAICompat(unittest.TestCase):
    """PRIMARY_LLM_PROTOCOL=openai（智谱/MiniMax OpenAI 兼容）时：同上场景。"""

    @classmethod
    def setUpClass(cls) -> None:
        from backend.config import Config

        if getattr(Config, "PRIMARY_LLM_PROTOCOL", "openai") == "anthropic":
            raise unittest.SkipTest("本用例针对 openai 主协议；anthropic 请用 TestLiveDn50PriceQueryAnthropic")
        if not (getattr(Config, "OPENAI_API_KEY", None) or "").strip():
            raise unittest.SkipTest("需 OPENAI_API_KEY")

    def test_live_dn50_price_react(self) -> None:
        _skip_if_no_live_llm()

        async def _run() -> None:
            from backend.agent.session import SessionStore
            from backend.config import Config
            from backend.core.agent import CoreAgent
            from backend.plugins.jagent.extension import JAgentExtension

            agent = CoreAgent(
                api_key=Config.OPENAI_API_KEY,
                base_url=Config.OPENAI_BASE_URL,
                model=Config.LLM_MODEL,
                extensions=[JAgentExtension()],
                session_store=_mock_session_store(),
            )
            self.assertIsNotNone(agent.client)
            out = await agent.execute_react(
                user_input="查一下 DN50 直通的价格，只要简要结果。",
                context={},
                max_steps=8,
                session_id="test:live-dn50-openai",
            )
            answer = (out.get("answer") or "").strip()
            trace = out.get("trace") or []
            self.assertIsNone(out.get("error"))
            self.assertTrue(len(answer) > 0 or len(trace) > 0, f"空结果: {out!r}")

        _run_live_react(_run)


if __name__ == "__main__":
    unittest.main(verbosity=2)
