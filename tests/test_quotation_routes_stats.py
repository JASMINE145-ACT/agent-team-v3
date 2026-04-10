import asyncio
import sys
from pathlib import Path
from unittest.mock import MagicMock, patch

import pytest
from fastapi import HTTPException

_root = Path(__file__).resolve().parent.parent
if str(_root) not in sys.path:
    sys.path.insert(0, str(_root))

from backend.server.api.routes_quotation import quotation_drafts_stats


@pytest.mark.parametrize(
    ("days_in", "expected_days"),
    [
        (0, 1),
        (7, 7),
        (999, 90),
    ],
)
def test_quotation_drafts_stats_clamps_days(days_in: int, expected_days: int):
    ds = MagicMock()
    ds.get_quotation_draft_stats.return_value = {"pending_count": 0, "today_count": 0}

    with patch("backend.server.api.routes_quotation.get_oos_data_service", return_value=ds):
        out = asyncio.run(quotation_drafts_stats(days=days_in))

    assert out["success"] is True
    ds.get_quotation_draft_stats.assert_called_once_with(days=expected_days)


def test_quotation_drafts_stats_wraps_service_error():
    ds = MagicMock()
    ds.get_quotation_draft_stats.side_effect = RuntimeError("boom")

    with patch("backend.server.api.routes_quotation.get_oos_data_service", return_value=ds):
        with pytest.raises(HTTPException) as exc:
            asyncio.run(quotation_drafts_stats(days=7))

    assert exc.value.status_code == 500
    assert "boom" in str(exc.value.detail)
