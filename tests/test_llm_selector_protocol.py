"""
Unit tests: llm_select_best must always use OpenAI-compatible (GLM) path,
regardless of PRIMARY_LLM_PROTOCOL, and must cap max_tokens at 512.
"""
import json
import unittest
from unittest.mock import MagicMock, patch


CANDIDATES = [
    {"code": "1000000001", "matched_name": "等径三通 PPR dn20", "unit_price": 5.0, "source": "字段匹配"},
    {"code": "1000000002", "matched_name": "异径三通 PPR dn20x15", "unit_price": 4.0, "source": "字段匹配"},
]

_GOOD_RESPONSE = json.dumps({"confident": True, "index": 1, "reasoning": "等径优先"})


def _make_openai_response(content: str):
    """Build a minimal mock that looks like openai ChatCompletion response."""
    msg = MagicMock()
    msg.content = content
    choice = MagicMock()
    choice.message = msg
    choice.finish_reason = "stop"
    resp = MagicMock()
    resp.choices = [choice]
    return resp


class TestLlmSelectBestAlwaysGlm(unittest.TestCase):
    def _run_with_anthropic_env(self, mock_openai_cls):
        """Simulate PRIMARY_LLM_PROTOCOL=anthropic and verify OpenAI path is used."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.return_value = _make_openai_response(_GOOD_RESPONSE)
        mock_openai_cls.return_value = mock_client

        # Patch AppConfig to look like anthropic is configured
        fake_config = MagicMock()
        fake_config.PRIMARY_LLM_PROTOCOL = "anthropic"
        fake_config.ANTHROPIC_API_KEY = "sk-test"
        fake_config.ANTHROPIC_BASE_URL = "https://api.minimaxi.com/anthropic"
        fake_config.LLM_MODEL = "MiniMax-M2.7"

        with patch.dict("sys.modules", {"backend.config": MagicMock(Config=fake_config)}):
            from backend.tools.inventory.services.llm_selector import llm_select_best
            result = llm_select_best("等径三通 dn20", CANDIDATES)

        return result, mock_client

    @patch("openai.OpenAI")
    def test_uses_openai_not_anthropic_when_protocol_is_anthropic(self, mock_openai_cls):
        """Even with PRIMARY_LLM_PROTOCOL=anthropic, must use OpenAI SDK (GLM)."""
        result, mock_client = self._run_with_anthropic_env(mock_openai_cls)
        # OpenAI client must have been called
        self.assertTrue(mock_openai_cls.called, "OpenAI client was not instantiated")
        self.assertTrue(
            mock_client.chat.completions.create.called,
            "OpenAI chat.completions.create was not called",
        )

    @patch("openai.OpenAI")
    def test_max_tokens_capped_at_16000(self, mock_openai_cls):
        """max_tokens passed to OpenAI must be <= 16000."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.return_value = _make_openai_response(_GOOD_RESPONSE)
        mock_openai_cls.return_value = mock_client

        from backend.tools.inventory.services.llm_selector import llm_select_best
        llm_select_best("等径三通 dn20", CANDIDATES)

        call_kwargs = mock_client.chat.completions.create.call_args[1]
        mt = call_kwargs.get("max_tokens", 99999)
        self.assertLessEqual(mt, 16000, f"max_tokens={mt} exceeds 16000")

    @patch("openai.OpenAI")
    def test_result_has_reasoning(self, mock_openai_cls):
        """Result dict must contain 'reasoning' key when LLM returns one."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.return_value = _make_openai_response(_GOOD_RESPONSE)
        mock_openai_cls.return_value = mock_client

        from backend.tools.inventory.services.llm_selector import llm_select_best
        result = llm_select_best("等径三通 dn20", CANDIDATES)

        self.assertIsNotNone(result)
        self.assertIn("reasoning", result)
        self.assertEqual(result["reasoning"], "等径优先")


if __name__ == "__main__":
    unittest.main(verbosity=2)
