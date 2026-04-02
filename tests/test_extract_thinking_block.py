"""_extract_thinking_block: redacted_thinking vs think tag compatibility."""
from backend.core.agent_helpers import _extract_thinking_block


def test_redacted_thinking_stripped_from_answer_body() -> None:
    o, c = "<" + "redacted_thinking" + ">", "</" + "redacted_thinking" + ">"
    raw = (
        f"{o}\n### 4. Verify Results\n✅ ok\n{c}\n\n"
        "直接50 查询结果：\n\n| a | b |\n|---|---|"
    )
    body, thought = _extract_thinking_block(raw)
    assert "Verify Results" in thought
    assert "Verify Results" not in body
    assert "直接50" in body


def test_think_tag_still_works() -> None:
    open_t, close_t = "<" + "think" + ">", "</" + "think" + ">"
    raw = f"{open_t}\nline\n{close_t}\n\nanswer only"
    body, thought = _extract_thinking_block(raw)
    assert "line" in thought
    assert body.strip().startswith("answer")


def test_no_tags_returns_empty_thought() -> None:
    raw = "仅正文无标签"
    body, thought = _extract_thinking_block(raw)
    assert thought == ""
    assert body == raw
