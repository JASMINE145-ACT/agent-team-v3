import asyncio
from unittest.mock import patch

import pytest
from fastapi import HTTPException

from backend.server.api.routes_reports import reanalyze_record, reports_accurate_ping


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
    ):
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
    ), patch("backend.server.api.routes_reports.run_llm_analysis", return_value=None):
        out = asyncio.run(reanalyze_record(1, "t"))
    assert out["success"] is True
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
    ):
        with pytest.raises(HTTPException) as exc:
            asyncio.run(reanalyze_record(1, "t"))
    assert exc.value.status_code == 422

