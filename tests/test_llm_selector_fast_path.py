"""
Tests for llm_select_best fast path (LLM_SELECTOR_MODEL set).

Fast path contract:
- Triggered when config.LLM_SELECTOR_MODEL is non-empty
- Uses response_format=json_object
- Uses max_tokens=120
- Uses module-level singleton client (not a new instance each call)
- Falls back to rules on any error
- knowledge_override is forwarded to prompt builder

Patching strategy:
  llm_select_best() does `from backend.tools.inventory.config import config` inside
  the function body, so we patch the class attribute directly via patch.object on
  InventoryConfig. This is simpler and more stable than importlib.reload.
"""

import json
import unittest
from unittest.mock import MagicMock, patch

from backend.tools.inventory.config import InventoryConfig
from backend.tools.inventory.services.llm_selector import _reset_selector_client, llm_select_best

CANDIDATES = [
    {"code": "F001", "matched_name": "PPR dn50 直通", "unit_price": 12.0, "source": "历史报价"},
    {"code": "F002", "matched_name": "PPR dn50 弯头", "unit_price": 8.0, "source": "字段匹配"},
]


def _make_resp(content: str, finish_reason: str = "stop") -> MagicMock:
    msg = MagicMock()
    msg.content = content
    msg.reasoning_content = None
    choice = MagicMock()
    choice.message = msg
    choice.finish_reason = finish_reason
    resp = MagicMock()
    resp.choices = [choice]
    return resp


class TestFastPathTriggered(unittest.TestCase):
    def setUp(self):
        _reset_selector_client()

    @patch("openai.OpenAI")
    def test_fast_path_triggered_when_selector_model_set(self, mock_openai_cls):
        """When LLM_SELECTOR_MODEL is set, fast path runs and uses json_object format."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.return_value = _make_resp(
            json.dumps({"index": 1, "reason": "直通更匹配"}, ensure_ascii=False)
        )
        mock_openai_cls.return_value = mock_client

        with (
            patch.object(InventoryConfig, "LLM_SELECTOR_MODEL", "gpt-4o-mini"),
            patch.object(InventoryConfig, "LLM_SELECTOR_API_KEY", "sk-test"),
            patch.object(InventoryConfig, "LLM_SELECTOR_BASE_URL", "https://api.openai.com/v1"),
        ):
            result = llm_select_best("直通 dn50", CANDIDATES)

        self.assertIsNotNone(result)
        self.assertEqual(result["code"], "F001")

        call_kwargs = mock_client.chat.completions.create.call_args[1]
        self.assertEqual(
            call_kwargs.get("response_format"),
            {"type": "json_object"},
            "Fast path must use response_format=json_object",
        )

    @patch("openai.OpenAI")
    def test_fast_path_max_tokens_is_120(self, mock_openai_cls):
        """Fast path must use max_tokens=120."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.return_value = _make_resp(
            json.dumps({"index": 1, "reason": "匹配"}, ensure_ascii=False)
        )
        mock_openai_cls.return_value = mock_client

        with (
            patch.object(InventoryConfig, "LLM_SELECTOR_MODEL", "gpt-4o-mini"),
            patch.object(InventoryConfig, "LLM_SELECTOR_API_KEY", "sk-test"),
            patch.object(InventoryConfig, "LLM_SELECTOR_BASE_URL", ""),
        ):
            llm_select_best("直通 dn50", CANDIDATES)

        call_kwargs = mock_client.chat.completions.create.call_args[1]
        self.assertEqual(call_kwargs.get("max_tokens"), 120, "Fast path must use max_tokens=120")

    @patch("openai.OpenAI")
    def test_fast_path_uses_singleton_client(self, mock_openai_cls):
        """OpenAI() constructor should be called only once across multiple fast path calls."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.return_value = _make_resp(
            json.dumps({"index": 1, "reason": "匹配"}, ensure_ascii=False)
        )
        mock_openai_cls.return_value = mock_client

        with (
            patch.object(InventoryConfig, "LLM_SELECTOR_MODEL", "gpt-4o-mini"),
            patch.object(InventoryConfig, "LLM_SELECTOR_API_KEY", "sk-test"),
            patch.object(InventoryConfig, "LLM_SELECTOR_BASE_URL", ""),
        ):
            llm_select_best("直通 dn50", CANDIDATES)
            llm_select_best("弯头 dn50", CANDIDATES)

        self.assertEqual(
            mock_openai_cls.call_count,
            1,
            f"OpenAI() called {mock_openai_cls.call_count} times; singleton should make it 1",
        )

    @patch("openai.OpenAI")
    def test_fast_path_falls_back_to_rules_on_error(self, mock_openai_cls):
        """When fast path raises, result comes from _rule_based_fallback."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.side_effect = RuntimeError("network error")
        mock_openai_cls.return_value = mock_client

        with (
            patch.object(InventoryConfig, "LLM_SELECTOR_MODEL", "gpt-4o-mini"),
            patch.object(InventoryConfig, "LLM_SELECTOR_API_KEY", "sk-test"),
            patch.object(InventoryConfig, "LLM_SELECTOR_BASE_URL", ""),
        ):
            result = llm_select_best("直通 dn50", CANDIDATES)

        self.assertIsNotNone(result)
        meta = result.get("_selection_meta", {})
        self.assertTrue(meta.get("from_rule_fallback"), "Expected rule fallback marker")

    @patch("openai.OpenAI")
    def test_fast_path_index_zero_returns_none(self, mock_openai_cls):
        """When model returns index=0 (no match), result must be None."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.return_value = _make_resp(
            json.dumps({"index": 0, "reason": "无匹配"}, ensure_ascii=False)
        )
        mock_openai_cls.return_value = mock_client

        with (
            patch.object(InventoryConfig, "LLM_SELECTOR_MODEL", "gpt-4o-mini"),
            patch.object(InventoryConfig, "LLM_SELECTOR_API_KEY", "sk-test"),
            patch.object(InventoryConfig, "LLM_SELECTOR_BASE_URL", ""),
        ):
            result = llm_select_best("不存在的产品", CANDIDATES)

        self.assertIsNone(result, "index=0 must return None")

    @patch("openai.OpenAI")
    def test_old_path_used_when_selector_model_set_but_api_key_empty(self, mock_openai_cls):
        """When model is set but LLM_SELECTOR_API_KEY is empty, use legacy path (no response_format)."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.return_value = _make_resp(
            json.dumps({"index": 1, "reason": "匹配"}, ensure_ascii=False)
        )
        mock_openai_cls.return_value = mock_client

        with (
            patch.object(InventoryConfig, "LLM_SELECTOR_MODEL", "gpt-4o-mini"),
            patch.object(InventoryConfig, "LLM_SELECTOR_API_KEY", ""),
        ):
            llm_select_best("直通 dn50", CANDIDATES)

        call_kwargs = mock_client.chat.completions.create.call_args[1]
        self.assertNotIn(
            "response_format",
            call_kwargs,
            "Legacy path must run when fast-path API key is missing",
        )

    @patch("openai.OpenAI")
    def test_old_path_used_when_selector_model_empty(self, mock_openai_cls):
        """When LLM_SELECTOR_MODEL is empty, old path runs (no response_format kwarg)."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.return_value = _make_resp(
            json.dumps({"index": 1, "reason": "匹配"}, ensure_ascii=False)
        )
        mock_openai_cls.return_value = mock_client

        with patch.object(InventoryConfig, "LLM_SELECTOR_MODEL", ""):
            llm_select_best("直通 dn50", CANDIDATES)

        call_kwargs = mock_client.chat.completions.create.call_args[1]
        self.assertNotIn(
            "response_format",
            call_kwargs,
            "Old path must NOT pass response_format",
        )


if __name__ == "__main__":
    unittest.main(verbosity=2)
