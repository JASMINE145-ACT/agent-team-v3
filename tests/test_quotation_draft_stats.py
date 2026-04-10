import sys
from datetime import date, timedelta
from pathlib import Path
from unittest.mock import MagicMock

_root = Path(__file__).resolve().parent.parent
if str(_root) not in sys.path:
    sys.path.insert(0, str(_root))

from backend.tools.oos.services.data_service import DataService


def _mk_query_for_count(count_value: int):
    q = MagicMock()
    q.filter.return_value = q
    q.join.return_value = q
    q.distinct.return_value = q
    q.count.return_value = count_value
    return q


def _mk_query_for_by_time(rows):
    q = MagicMock()
    q.filter.return_value = q
    q.group_by.return_value = q
    q.all.return_value = rows
    return q


def test_get_quotation_draft_stats_structure():
    svc = DataService.__new__(DataService)
    mock_session = MagicMock()
    svc.SessionLocal = MagicMock(return_value=mock_session)

    day = (date.today() - timedelta(days=1)).isoformat()
    time_row = MagicMock()
    time_row.day = day
    time_row.cnt = 4

    mock_session.query.side_effect = [
        _mk_query_for_count(3),  # pending_count
        _mk_query_for_count(2),  # today_count
        _mk_query_for_count(1),  # shortage_count
        _mk_query_for_count(5),  # replenishment_count
        _mk_query_for_by_time([time_row]),  # by_time
    ]

    result = svc.get_quotation_draft_stats(days=7)

    assert result["pending_count"] == 3
    assert result["today_count"] == 2
    assert result["shortage_count"] == 1
    assert result["replenishment_count"] == 5
    assert isinstance(result["by_time"], list)
    assert len(result["by_time"]) == 7
    assert all("date" in row and "count" in row for row in result["by_time"])


def test_get_quotation_draft_stats_fill_missing_days_with_zero():
    svc = DataService.__new__(DataService)
    mock_session = MagicMock()
    svc.SessionLocal = MagicMock(return_value=mock_session)

    day1 = (date.today() - timedelta(days=6)).isoformat()
    day2 = (date.today() - timedelta(days=4)).isoformat()
    r1 = MagicMock()
    r1.day = day1
    r1.cnt = 3
    r2 = MagicMock()
    r2.day = day2
    r2.cnt = 1

    mock_session.query.side_effect = [
        _mk_query_for_count(0),
        _mk_query_for_count(0),
        _mk_query_for_count(0),
        _mk_query_for_count(0),
        _mk_query_for_by_time([r1, r2]),
    ]

    result = svc.get_quotation_draft_stats(days=7)
    got = {x["date"]: x["count"] for x in result["by_time"]}
    assert len(got) == 7
    assert got[day1] == 3
    assert got[day2] == 1
    assert any(v == 0 for v in got.values())
