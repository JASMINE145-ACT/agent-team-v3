from backend.core.agent import _normalize_user_answer


def test_normalize_user_answer_removes_loop_phase_headers() -> None:
    raw = (
        "4. Verify Results\n"
        "matched 15 tee candidates\n\n"
        "### 1. Plan\n"
        "this heading should not be shown\n\n"
        "Preferred match\n"
        "code 8010024360\n"
    )
    out = _normalize_user_answer(raw)
    assert "Verify Results" not in out
    assert "### 1. Plan" not in out
    assert "matched 15 tee candidates" in out
    assert "Preferred match" in out


def test_normalize_user_answer_removes_inline_phase_prefix() -> None:
    raw = "4. Verify Results matched 15 tee candidates"
    out = _normalize_user_answer(raw)
    assert out == "matched 15 tee candidates"
