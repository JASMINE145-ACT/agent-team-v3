import json

import pytest

from backend.core.validation import parse_and_validate_args


def _make_definition(parameters: dict | None) -> dict:
    return {
        "type": "function",
        "function": {
            "name": "dummy_tool",
            "description": "dummy",
            "parameters": parameters or {},
        },
    }


def test_parse_and_validate_args_accepts_dict_and_str():
    schema = {
        "type": "object",
        "properties": {
            "code": {"type": "string"},
            "quantity": {"type": "number"},
        },
    }
    definition = _make_definition(schema)

    args_dict, err = parse_and_validate_args(definition, {"code": "A", "quantity": 1})
    assert err is None
    assert args_dict == {"code": "A", "quantity": 1}

    raw = json.dumps({"code": "B", "quantity": 2})
    args_dict2, err2 = parse_and_validate_args(definition, raw)
    assert err2 is None
    assert args_dict2 == {"code": "B", "quantity": 2}


def test_parse_and_validate_args_json_error_returns_validation_error():
    definition = _make_definition({"type": "object", "properties": {"x": {"type": "number"}}})

    args, err = parse_and_validate_args(definition, "{not-json")
    assert args is None
    assert err is not None
    data = json.loads(err)
    assert data["error"]["type"] == "validation_error"
    assert "JSON 解析失败" in data["error"]["message"]


def test_parse_and_validate_args_type_mismatch_produces_error():
    schema = {
        "type": "object",
        "properties": {
            "quantity": {"type": "number"},
        },
    }
    definition = _make_definition(schema)

    args, err = parse_and_validate_args(definition, {"quantity": "not-a-number"})
    assert args is None
    assert err is not None
    data = json.loads(err)
    assert data["error"]["type"] == "validation_error"


def test_parse_and_validate_args_skips_empty_schema():
    definition = _make_definition({})
    args, err = parse_and_validate_args(definition, {"any": "value"})
    assert err is None
    assert args == {"any": "value"}

