import asyncio
from unittest.mock import patch

import pytest
from fastapi import HTTPException

from backend.server.api.routes_reports import (
    get_record_detail,
    get_record_events,
    reanalyze_record,
    reports_accurate_ping,
)


def test_reports_accurate_ping_ok():
    with patch.dict("os.environ", {"REPORTS_ADMIN_TOKEN": "t"}), patch(
        "backend.server.api.routes_reports.ping_accurate", return_value={"s": True}
    ):
        out = asyncio.run(reports_accurate_ping("t"))
    assert out["success"] is True
    assert out["data"]["s"] is True


def test_reports_accurate_ping_error():
    with patch.dict("os.environ", {"REPORTS_ADMIN_TOKEN": "t"}), patch(
        "backend.server.api.routes_reports.ping_accurate", side_effect=RuntimeError("auth failed")
    ):
        with pytest.raises(HTTPException) as exc:
            asyncio.run(reports_accurate_ping("t"))
    assert exc.value.status_code == 500
    assert "Accurate ping failed" in str(exc.value.detail)


def test_reanalyze_record_conflict_when_running():
    class FakeCursor:
        def __init__(self):
            self._row = ("sales_weekly_basic", {"week_start": "2026-04-14"}, "running")

        def __enter__(self):
            return self

        def __exit__(self, *args):
            return None

        def execute(self, *_args, **_kwargs):
            return None

        def fetchone(self):
            return self._row

    class FakeConn:
        def __enter__(self):
            return self

        def __exit__(self, *args):
            return None

        def cursor(self):
            return FakeCursor()

        def close(self):
            return None

    with patch.dict("os.environ", {"REPORTS_ADMIN_TOKEN": "t"}), patch(
        "backend.server.api.routes_reports._conn", return_value=FakeConn()
    ), patch("backend.server.api.routes_reports.append_analysis_event", return_value=1):
        with pytest.raises(HTTPException) as exc:
            asyncio.run(reanalyze_record(1, "t"))
    assert exc.value.status_code == 409


def test_reanalyze_record_allows_null_analysis_status():
    executed_sql: list[str] = []

    class FakeCursor:
        def __init__(self):
            self._row = ("sales_weekly_basic", {"week_start": "2026-04-14", "week_end": "2026-04-20"}, None)
            self.rowcount = 0

        def __enter__(self):
            return self

        def __exit__(self, *args):
            return None

        def execute(self, sql, *_args, **_kwargs):
            executed_sql.append(str(sql))
            if "SET analysis_status='pending'" in str(sql):
                self.rowcount = 1

        def fetchone(self):
            return self._row

    class FakeConn:
        def __enter__(self):
            return self

        def __exit__(self, *args):
            return None

        def cursor(self):
            return FakeCursor()

        def close(self):
            return None

    with patch.dict("os.environ", {"REPORTS_ADMIN_TOKEN": "t", "DATABASE_URL": "postgres://example/db"}), patch(
        "backend.server.api.routes_reports._conn", return_value=FakeConn()
    ), patch("backend.server.api.routes_reports.run_llm_analysis", return_value=None), patch(
        "backend.server.api.routes_reports.append_analysis_event", return_value=101
    ):
        out = asyncio.run(reanalyze_record(1, "t"))
    assert out["success"] is True
    assert out["data"]["record_id"] == 1
    assert out["data"]["current_status"] == "pending"
    assert out["data"]["event_id"] == 101
    assert any("SET analysis_status='pending'" in sql for sql in executed_sql)


def test_reanalyze_record_returns_422_for_malformed_report_json():
    class FakeCursor:
        def __init__(self):
            self._row = ("sales_weekly_basic", "{bad-json", None)

        def __enter__(self):
            return self

        def __exit__(self, *args):
            return None

        def execute(self, *_args, **_kwargs):
            return None

        def fetchone(self):
            return self._row

    class FakeConn:
        def __enter__(self):
            return self

        def __exit__(self, *args):
            return None

        def cursor(self):
            return FakeCursor()

        def close(self):
            return None

    with patch.dict("os.environ", {"REPORTS_ADMIN_TOKEN": "t"}), patch(
        "backend.server.api.routes_reports._conn", return_value=FakeConn()
    ), patch("backend.server.api.routes_reports.append_analysis_event", return_value=1):
        with pytest.raises(HTTPException) as exc:
            asyncio.run(reanalyze_record(1, "t"))
    assert exc.value.status_code == 422


def test_get_record_events_returns_data():
    events = [
        {
            "event_id": 1,
            "record_id": 7,
            "event_type": "reanalyze_enqueued",
            "event_payload": {"current_status": "pending"},
            "created_at": "2026-04-30T12:00:00+00:00",
        }
    ]
    with patch.dict("os.environ", {"REPORTS_ADMIN_TOKEN": "t"}), patch(
        "backend.server.api.routes_reports._conn"
    ) as mock_conn, patch(
        "backend.server.api.routes_reports.list_analysis_events", return_value=events
    ):
        fake_cur = mock_conn.return_value.cursor.return_value.__enter__.return_value
        fake_cur.fetchone.return_value = (1,)
        out = asyncio.run(get_record_events(7, after_id=0, limit=50, x_reports_token="t"))
    assert out["success"] is True
    assert out["data"] == events


def test_get_record_events_404_when_record_missing():
    with patch.dict("os.environ", {"REPORTS_ADMIN_TOKEN": "t"}), patch(
        "backend.server.api.routes_reports._conn"
    ) as mock_conn:
        fake_cur = mock_conn.return_value.cursor.return_value.__enter__.return_value
        fake_cur.fetchone.return_value = None
        with pytest.raises(HTTPException) as exc:
            asyncio.run(get_record_events(999, after_id=0, limit=50, x_reports_token="t"))
    assert exc.value.status_code == 404


def test_get_record_events_clamps_negative_after_id():
    with patch.dict("os.environ", {"REPORTS_ADMIN_TOKEN": "t"}), patch(
        "backend.server.api.routes_reports._conn"
    ) as mock_conn, patch(
        "backend.server.api.routes_reports.list_analysis_events", return_value=[]
    ) as mock_list:
        fake_cur = mock_conn.return_value.cursor.return_value.__enter__.return_value
        fake_cur.fetchone.return_value = (1,)
        out = asyncio.run(get_record_events(7, after_id=-100, limit=50, x_reports_token="t"))
    assert out["success"] is True
    mock_list.assert_called_once_with(7, 0, 50)


def test_record_detail_contains_dq_fields():
    class FakeCursor:
        def __enter__(self):
            return self

        def __exit__(self, *args):
            return None

        def execute(self, *_args, **_kwargs):
            return None

        def fetchone(self):
            return (
                1,
                "sales_weekly_basic",
                "success",
                "manual",
                None,
                None,
                None,
                {"dq_passed": True, "warnings_count": 0, "failed_rules": []},
                {"week_start": "2026-04-01"},
                "report-md",
                "analysis-md",
                "done",
            )

    class FakeConn:
        def cursor(self):
            return FakeCursor()

        def close(self):
            return None

    with patch.dict("os.environ", {"REPORTS_ADMIN_TOKEN": "t"}), patch(
        "backend.server.api.routes_reports._conn", return_value=FakeConn()
    ):
        out = asyncio.run(get_record_detail(1, "t"))
    summary = out["data"]["summary_json"]
    assert summary["dq_passed"] is True
    assert "warnings_count" in summary

