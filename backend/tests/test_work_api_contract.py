import asyncio
import json

from fastapi.testclient import TestClient

from backend.server.api.app import app


client = TestClient(app)


def _assert_work_payload_shape(payload: dict) -> None:
    # 基本字段存在且类型正确：status/success/answer/trace/error
    assert "status" in payload
    assert payload["status"] in ("awaiting_choices", "done")
    assert isinstance(payload.get("success"), bool)
    assert isinstance(payload.get("answer", ""), str)
    assert isinstance(payload.get("trace", []), list)
    # error 可为 None 或字符串
    err = payload.get("error")
    assert err is None or isinstance(err, str)
    # awaiting_choices 时必须有 run_id + pending_choices
    if payload["status"] == "awaiting_choices":
        assert isinstance(payload.get("run_id"), str)
        assert isinstance(payload.get("pending_choices"), list)


def test_work_run_contract_shape_empty_files():
    """work/run 在 file_paths 为空时的契约：字段形状保持稳定。"""
    resp = client.post("/api/work/run", json={"file_paths": []})
    assert resp.status_code == 200
    data = resp.json()
    _assert_work_payload_shape(data)


def test_work_resume_invalid_run_id_contract_shape():
    """work/resume 在 run_id 无效时也应返回稳定契约形状。"""
    resp = client.post(
        "/api/work/resume",
        json={"run_id": "non-existent", "selections": []},
    )
    # route 在参数合法时总是 200，由内部返回 error 字段描述 run_id 问题
    assert resp.status_code == 200
    data = resp.json()
    _assert_work_payload_shape(data)
    assert data["status"] == "done"
    assert isinstance(data.get("error"), str) and "run_id" in data["error"]


def test_work_run_stream_basic_contract():
    """work/run-stream 的基本契约：返回 SSE，event data 可解析为 JSON。"""
    with client.stream("POST", "/api/work/run-stream", json={"file_paths": []}) as r:
        assert r.status_code == 200
        assert r.headers.get("content-type", "").startswith("text/event-stream")
        # 读取第一行 data: 事件
        line = next((x for x in r.iter_lines() if x), "")
        if isinstance(line, bytes):
            line = line.decode("utf-8", errors="replace")
        assert isinstance(line, str) and line.startswith("data: ")
        payload_raw = line[len("data: ") :].strip()
        # 形如 {"type": "...", ...}
        obj = json.loads(payload_raw)
        assert isinstance(obj, dict)
        assert "type" in obj


def test_pipeline_match_error_stops_later_files(monkeypatch):
    from backend.agent import work_executor

    calls: list[tuple[str, str]] = []

    def fake_execute_work_tool_sync(name: str, args: dict):
        file_path = str(args.get("file_path", ""))
        calls.append((name, file_path))
        if name == "work_quotation_extract":
            return json.dumps({"success": True, "items": [{"row": 2}]}, ensure_ascii=False)
        if name == "work_quotation_match":
            if file_path == "f1.xlsx":
                raise RuntimeError("match boom")
            return json.dumps(
                {
                    "success": True,
                    "to_fill": [],
                    "shortage": [],
                    "unmatched": [],
                    "items": [],
                    "fill_items_merged": [],
                },
                ensure_ascii=False,
            )
        raise AssertionError(f"unexpected tool call: {name}")

    monkeypatch.setattr(work_executor, "execute_work_tool_sync", fake_execute_work_tool_sync)

    result = asyncio.run(
        work_executor._process_files_pipeline(
            file_paths=["f1.xlsx", "f2.xlsx"],
            start_index=0,
            customer_level="B_QUOTE",
            do_register_oos=False,
            trace=[],
        )
    )

    assert result["status"] == "done"
    assert result["success"] is False
    assert "f1.xlsx" in (result.get("error") or "")
    assert not any(fp == "f2.xlsx" for _, fp in calls)

