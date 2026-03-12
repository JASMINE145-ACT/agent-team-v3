import json

from backend.core.tool_utils import (
    tool_conflict,
    tool_error,
    tool_external_error,
    tool_not_found,
    tool_rate_limited,
)


def _load(s: str) -> dict:
    return json.loads(s)


def test_tool_error_basic_structure():
    s = tool_error("msg", error_type="internal_error")
    data = _load(s)
    assert data["error"]["type"] == "internal_error"
    assert data["error"]["message"] == "msg"


def test_tool_error_supports_details():
    s = tool_error("msg", error_type="validation_error", details={"field": "code"})
    data = _load(s)
    assert data["error"]["type"] == "validation_error"
    assert data["error"]["details"]["field"] == "code"


def test_tool_error_shortcuts():
    for fn, expected in [
        (tool_not_found, "not_found"),
        (tool_conflict, "conflict"),
        (tool_external_error, "external_error"),
        (tool_rate_limited, "rate_limited"),
    ]:
        s = fn("msg")
        data = _load(s)
        assert data["error"]["type"] == expected

