"""Anthropic 兼容层：OpenAI messages / tools 与 Anthropic 互转单测。"""
import unittest

from backend.core.anthropic_react_llm import (
    _blocks_to_content_and_tool_calls,
    convert_openai_to_anthropic_messages,
    openai_tools_to_anthropic,
    split_system_and_rest,
)
from backend.core.thinking_stream_filter import filter_redacted_thinking_stream


class TestAnthropicReactMessages(unittest.TestCase):
    def test_split_system(self) -> None:
        msgs = [
            {"role": "system", "content": "sys"},
            {"role": "user", "content": "hi"},
        ]
        s, rest = split_system_and_rest(msgs)
        self.assertEqual(s, "sys")
        self.assertEqual(len(rest), 1)
        self.assertEqual(rest[0]["role"], "user")

    def test_tools_conversion(self) -> None:
        tools = [
            {
                "type": "function",
                "function": {
                    "name": "echo",
                    "description": "d",
                    "parameters": {"type": "object", "properties": {"x": {"type": "string"}}},
                },
            }
        ]
        out = openai_tools_to_anthropic(tools)
        self.assertEqual(len(out), 1)
        self.assertEqual(out[0]["name"], "echo")
        self.assertIn("input_schema", out[0])

    def test_roundtrip_user_assistant_tool(self) -> None:
        rest = [
            {"role": "user", "content": "q"},
            {
                "role": "assistant",
                "content": "",
                "tool_calls": [
                    {
                        "id": "toolu_1",
                        "type": "function",
                        "function": {"name": "t1", "arguments": '{"a": 1}'},
                    }
                ],
            },
            {"role": "tool", "tool_call_id": "toolu_1", "content": '{"ok":true}'},
        ]
        anth = convert_openai_to_anthropic_messages(rest)
        self.assertEqual(len(anth), 3)
        self.assertEqual(anth[1]["role"], "assistant")
        self.assertIsInstance(anth[1]["content"], list)
        self.assertEqual(anth[2]["role"], "user")
        self.assertIsInstance(anth[2]["content"], list)
        self.assertEqual(anth[2]["content"][0]["type"], "tool_result")

    def test_extract_tool_call_from_text_block_xml(self) -> None:
        content = [
            {
                "type": "text",
                "text": (
                    "我先帮你查价格。\n\n"
                    "<tool_call>\n"
                    "{\n"
                    "  \"name\": \"match_quotation\",\n"
                    "  \"arguments\": {\"keywords\": \"三通 50\"}\n"
                    "}\n"
                    "</tool_call>"
                ),
            }
        ]
        text, tool_calls = _blocks_to_content_and_tool_calls(content)
        self.assertEqual(len(tool_calls), 1)
        self.assertEqual(tool_calls[0].function.name, "match_quotation")
        self.assertEqual(tool_calls[0].function.arguments, '{"keywords": "三通 50"}')
        self.assertIn("我先帮你查价格", text)
        self.assertNotIn("<tool_call>", text)

    def test_extract_tool_call_from_raw_string_xml(self) -> None:
        content = (
            "<tool_call>\n"
            "{\n"
            "  \"name\": \"match_quotation\",\n"
            "  \"arguments\": {\"keywords\": \"直接 50\"}\n"
            "}\n"
            "</tool_call>"
        )
        text, tool_calls = _blocks_to_content_and_tool_calls(content)
        self.assertEqual(len(tool_calls), 1)
        self.assertEqual(tool_calls[0].function.name, "match_quotation")
        self.assertEqual(tool_calls[0].function.arguments, '{"keywords": "直接 50"}')
        self.assertEqual(text, "")


class TestConvertStripsThinking(unittest.TestCase):
    @staticmethod
    def _extract_text(asst_msg: dict) -> str:
        """Extract concatenated text from an Anthropic assistant message."""
        val = asst_msg.get("content", "")
        if isinstance(val, str):
            return val
        # Anthropic format: list of blocks
        return " ".join(
            b.get("text", "") for b in val if isinstance(b, dict) and b.get("type") == "text"
        )

    def test_strips_think_block_from_assistant_history(self) -> None:
        """<redacted_thinking>...</redacted_thinking> must not appear in assistant content sent back to MiniMax."""
        msgs = [
            {"role": "user", "content": "查询价格"},
            {
                "role": "assistant",
                "content": "<redacted_thinking>\n根据路由规则，应该调用 match_quotation\n</redacted_thinking>\n价格是 100 元",
            },
        ]
        result = convert_openai_to_anthropic_messages(msgs)
        asst = next(m for m in result if m["role"] == "assistant")
        text = self._extract_text(asst)
        self.assertNotIn("<redacted_thinking>", text)
        self.assertNotIn("根据路由规则", text)
        self.assertIn("价格是 100 元", text)

    def test_strips_redacted_thinking_from_assistant_history(self) -> None:
        """<redacted_thinking>...</redacted_thinking> must also be stripped."""
        msgs = [
            {"role": "user", "content": "test"},
            {
                "role": "assistant",
                "content": "<redacted_thinking>\nhidden\n</redacted_thinking>\nactual answer",
            },
        ]
        result = convert_openai_to_anthropic_messages(msgs)
        asst = next(m for m in result if m["role"] == "assistant")
        text = self._extract_text(asst)
        self.assertNotIn("<redacted_thinking>", text)
        self.assertNotIn("hidden", text)
        self.assertIn("actual answer", text)


class TestFilterThinkTokens(unittest.TestCase):
    def _collect(self, chunks):
        """Run filter_redacted_thinking_stream over chunks, return emitted text."""
        emitted: list[str] = []
        filter_redacted_thinking_stream(iter(chunks), emitted.append)
        return "".join(emitted)

    def test_passthrough_without_think(self) -> None:
        result = self._collect(["Hello ", "world"])
        self.assertEqual(result, "Hello world")

    def test_removes_inline_think_block(self) -> None:
        result = self._collect(["Hello <redacted_thinking>reasoning</redacted_thinking> world"])
        self.assertEqual(result, "Hello  world")

    def test_think_split_across_chunks(self) -> None:
        result = self._collect(["Hello <redact", "ed_thinking>reas", "oning</redacted_thinking> world"])
        self.assertEqual(result, "Hello  world")

    def test_text_before_and_after_think(self) -> None:
        result = self._collect(["pre <redacted_thinking>hidden</redacted_thinking> post"])
        self.assertEqual(result, "pre  post")

    def test_empty_chunks_ignored(self) -> None:
        result = self._collect(["Hello ", "", "world"])
        self.assertEqual(result, "Hello world")

    def test_unclosed_think_suppresses_remainder(self) -> None:
        result = self._collect(["visible <redacted_thinking>never closed"])
        self.assertEqual(result, "visible ")

    def test_no_think_long_text(self) -> None:
        text = "abcdef" * 50
        result = self._collect([text])
        self.assertEqual(result, text)


if __name__ == "__main__":
    unittest.main(verbosity=2)
