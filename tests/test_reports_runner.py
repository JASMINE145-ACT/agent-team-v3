from unittest.mock import MagicMock, patch
from datetime import date


def _make_mock_conn():
    """Return a mock psycopg2 connection whose cursor supports context manager."""
    mock_cursor = MagicMock()
    mock_cursor.fetchone.return_value = (99,)

    mock_ctx = MagicMock()
    mock_ctx.__enter__ = MagicMock(return_value=mock_cursor)
    mock_ctx.__exit__ = MagicMock(return_value=False)

    mock_conn = MagicMock()
    mock_conn.__enter__ = MagicMock(return_value=mock_conn)
    mock_conn.__exit__ = MagicMock(return_value=False)
    mock_conn.cursor.return_value = mock_ctx
    return mock_conn, mock_cursor


def _find_success_update_params(execute_calls, expected_record_id: int):
    """Locate UPDATE report_records ... status='success' args by parameter shape instead of SQL text."""
    for call in execute_calls:
        if len(call.args) < 2:
            continue
        params = call.args[1]
        if not isinstance(params, tuple) or len(params) != 6:
            continue
        # UPDATE success call shape:
        # (summary_json, report_json, report_md, week_start, week_end, record_id)
        summary, report_json, report_md, week_start, week_end, record_id = params
        if record_id != expected_record_id:
            continue
        if not isinstance(summary, dict):
            continue
        if "total_order_count" not in summary or "total_sales_amount" not in summary:
            continue
        if not isinstance(report_json, dict):
            continue
        if not isinstance(report_md, str):
            continue
        if not isinstance(week_start, date) or not isinstance(week_end, date):
            continue
        return params
    return None


def test_run_report_task_writes_week_start_and_week_end():
    from backend.reports.runner import run_report_task

    mock_conn, mock_cursor = _make_mock_conn()

    mock_payload = MagicMock()
    mock_payload.total_order_count = 3
    mock_payload.total_sales_amount = 300.0
    mock_payload.to_dict.return_value = {}

    with (
        patch("psycopg2.connect", return_value=mock_conn),
        patch("backend.reports.runner.get_database_url", return_value="postgresql://test"),
        patch("backend.reports.runner.fetch_sales_invoices", return_value=[]),
        patch("backend.reports.runner.analyze_sales_orders", return_value=mock_payload),
        patch("backend.reports.runner.format_report_md", return_value="# md"),
        patch("backend.reports.runner.Json", side_effect=lambda x: x),
        patch("threading.Thread"),
    ):
        run_report_task()

    success_params = _find_success_update_params(
        mock_cursor.execute.call_args_list, expected_record_id=99
    )
    assert success_params is not None
    # week_start / week_end should be passed to UPDATE params
    assert success_params[3] is not None
    assert success_params[4] is not None


def test_run_report_task_includes_prev_week_summary_with_pct():
    from backend.reports.runner import run_report_task

    mock_conn, mock_cursor = _make_mock_conn()
    # First fetchone: INSERT ... RETURNING id
    # Second fetchone: SELECT summary_json ... LIMIT 1
    mock_cursor.fetchone.side_effect = [
        (99,),
        ({"total_sales_amount": 200.0, "total_order_count": 2},),
    ]

    mock_payload = MagicMock()
    mock_payload.total_order_count = 3
    mock_payload.total_sales_amount = 300.0
    mock_payload.to_dict.return_value = {}

    with (
        patch("psycopg2.connect", return_value=mock_conn),
        patch("backend.reports.runner.get_database_url", return_value="postgresql://test"),
        patch("backend.reports.runner.fetch_sales_invoices", return_value=[]),
        patch("backend.reports.runner.analyze_sales_orders", return_value=mock_payload),
        patch("backend.reports.runner.format_report_md", return_value="# md"),
        patch("backend.reports.runner.Json", side_effect=lambda x: x),
        patch("threading.Thread"),
    ):
        run_report_task()

    params = _find_success_update_params(
        mock_cursor.execute.call_args_list, expected_record_id=99
    )
    assert params is not None
    summary = params[0]
    assert summary["total_order_count"] == 3
    assert summary["total_sales_amount"] == 300.0
    assert summary["prev_week"] == {
        "total_sales_amount": 200.0,
        "total_order_count": 2,
        "amount_pct": 50.0,
        "count_pct": 50.0,
    }
