import asyncio
from unittest.mock import patch

import pytest
from fastapi import HTTPException

from backend.server.api.routes_reports import reports_accurate_ping


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

