"""验证 ApiResponse 行为。"""
from backend.server.api.contracts import ApiResponse


def test_ok_response():
    r = ApiResponse.ok({"key": "value"})
    assert r.success is True
    assert r.data == {"key": "value"}
    assert r.error is None


def test_fail_response():
    r = ApiResponse.fail("something went wrong")
    assert r.success is False
    assert r.error == "something went wrong"
    assert r.data is None


def test_serialization():
    r = ApiResponse.ok([1, 2, 3])
    d = r.model_dump()
    assert d["success"] is True
    assert d["data"] == [1, 2, 3]


from backend.core.tool_utils import unwrap_tool_result


def test_unwrap_success():
    assert unwrap_tool_result({"success": True, "result": "ok"}) == "ok"


def test_unwrap_failure():
    import json as _json
    out = {"success": False, "error": "oops"}
    result = unwrap_tool_result(out)
    assert _json.loads(result)["success"] is False


def test_unwrap_empty_result():
    assert unwrap_tool_result({"success": True}) == ""
