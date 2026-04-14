"""
Unit tests: llm_select_best must always use OpenAI-compatible (GLM) path,
regardless of PRIMARY_LLM_PROTOCOL, and keep max_tokens bounded.
"""
import json
import unittest
from unittest.mock import MagicMock, patch


CANDIDATES = [
    {"code": "1000000001", "matched_name": "等径三通 PPR dn20", "unit_price": 5.0, "source": "字段匹配"},
    {"code": "1000000002", "matched_name": "异径三通 PPR dn20x15", "unit_price": 4.0, "source": "字段匹配"},
]

_GOOD_RESPONSE = json.dumps({"index": 1, "reason": "等径更匹配"}, ensure_ascii=False)


def _make_openai_response(content: str):
    """Build a minimal mock that looks like openai ChatCompletion response."""
    msg = MagicMock()
    msg.content = content
    msg.reasoning_content = None
    choice = MagicMock()
    choice.message = msg
    choice.finish_reason = "stop"
    resp = MagicMock()
    resp.choices = [choice]
    return resp


def _make_openai_response_empty_with_reasoning(reasoning_content: str, finish_reason: str = "length"):
    msg = MagicMock()
    msg.content = ""
    msg.reasoning_content = reasoning_content
    choice = MagicMock()
    choice.message = msg
    choice.finish_reason = finish_reason
    resp = MagicMock()
    resp.choices = [choice]
    return resp


class TestLlmSelectBestAlwaysGlm(unittest.TestCase):
    def _run_with_anthropic_env(self, mock_openai_cls):
        """Simulate PRIMARY_LLM_PROTOCOL=anthropic and verify OpenAI path is used."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.return_value = _make_openai_response(_GOOD_RESPONSE)
        mock_openai_cls.return_value = mock_client

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
        self.assertTrue(mock_openai_cls.called, "OpenAI client was not instantiated")
        self.assertTrue(
            mock_client.chat.completions.create.called,
            "OpenAI chat.completions.create was not called",
        )

    @patch("openai.OpenAI")
    def test_max_tokens_capped_at_16000(self, mock_openai_cls):
        """max_tokens passed to OpenAI must be bounded."""
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
        self.assertTrue(result["reasoning"])

    @patch("openai.OpenAI")
    def test_extracts_json_from_reasoning_content_when_content_empty(self, mock_openai_cls):
        """When content is empty but reasoning_content has JSON, selector should still parse index/reason."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.return_value = _make_openai_response_empty_with_reasoning(
            '...thinking... {"index": 2, "reason": "规格场景更匹配"} ...'
        )
        mock_openai_cls.return_value = mock_client

        from backend.tools.inventory.services.llm_selector import llm_select_best
        result = llm_select_best("等径三通 dn20", CANDIDATES)

        self.assertIsNotNone(result)
        self.assertEqual(result.get("code"), "1000000002")

    @patch("openai.OpenAI")
    def test_salvages_index_from_truncated_reasoning_content(self, mock_openai_cls):
        """When reasoning_content JSON is truncated, selector should salvage index by regex."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.return_value = _make_openai_response_empty_with_reasoning(
            '...thinking... "index": 2, "reason": "规格场景更匹配" ...',
            finish_reason="length",
        )
        mock_openai_cls.return_value = mock_client

        from backend.tools.inventory.services.llm_selector import llm_select_best
        result = llm_select_best("等径三通 dn20", CANDIDATES)

        self.assertIsNotNone(result)
        self.assertEqual(result.get("code"), "1000000002")

    @patch("openai.OpenAI")
    def test_rule_fallback_respects_source_priority(self, mock_openai_cls):
        """Fallback path should prefer source priority: 共同 > 历史报价 > 字段匹配."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.side_effect = RuntimeError("mock llm down")
        mock_openai_cls.return_value = mock_client

        candidates = [
            {"code": "F001", "matched_name": "直通 DN50", "unit_price": 10.0, "source": "字段匹配"},
            {"code": "H001", "matched_name": "直通 DN50", "unit_price": 10.0, "source": "历史报价"},
            {"code": "C001", "matched_name": "直通 DN50", "unit_price": 10.0, "source": "共同"},
        ]

        from backend.tools.inventory.services.llm_selector import llm_select_best
        result = llm_select_best("直通50", candidates)

        self.assertIsNotNone(result)
        self.assertEqual(result.get("code"), "C001")

    @patch("openai.OpenAI")
    def test_rule_fallback_prefers_corrugated_semantics_over_dn_only_match(self, mock_openai_cls):
        """For 双壁波纹管 + 10KN + DN300mm, fallback should pick SN8 corrugated pipe."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.side_effect = RuntimeError("mock llm down")
        mock_openai_cls.return_value = mock_client

        candidates = [
            {
                "code": "8020013762",
                "matched_name": "印尼(日标)PVC-U排水扩直口管(D排水系列)白色 DN300 (12\") 4M/根 联塑",
                "unit_price": 880247.0,
                "source": "共同",
            },
            {
                "code": "8020035096",
                "matched_name": "(IDN)PIPE双壁波纹管(带扩口) SN4 300 6M/根(N1)",
                "unit_price": 843177.0,
                "source": "字段匹配",
            },
            {
                "code": "8020035099",
                "matched_name": "(IDN)PIPE双壁波纹管(带扩口) SN8 300 6M/根(N1)",
                "unit_price": 1002854.0,
                "source": "字段匹配",
            },
        ]

        from backend.tools.inventory.services.llm_selector import llm_select_best
        result = llm_select_best("双壁波纹管10KN DN300mm", candidates)

        self.assertIsNotNone(result)
        self.assertEqual(result.get("code"), "8020035099")


if __name__ == "__main__":
    unittest.main(verbosity=2)
