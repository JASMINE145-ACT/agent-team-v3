"""strip_untagged_reasoning_preamble — drop Reasoning: leaks without XML tags."""
from backend.core.agent_helpers import strip_untagged_reasoning_preamble


def test_strips_reasoning_before_price_result_title() -> None:
    raw = """Reasoning:
用户想查价格。
Verify Results
- ok

直接50 价格查询结果

| a | b |
| x | y |
"""
    out = strip_untagged_reasoning_preamble(raw)
    assert "Reasoning" not in out
    assert out.strip().startswith("直接50 价格查询结果")


def test_preserves_when_no_reasoning_prefix() -> None:
    raw = "仅一行\n\n| a |\n|---|"
    assert strip_untagged_reasoning_preamble(raw) == raw


def test_no_false_strip_short_line() -> None:
    raw = "Reasoning:\n这里没有价格查询结果这种东西。\n\nfoo"
    # 没有「…价格查询结果」标题行，应原样返回（避免误删）
    assert strip_untagged_reasoning_preamble(raw) == raw
