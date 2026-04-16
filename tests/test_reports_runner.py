from unittest.mock import MagicMock, patch


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
        patch("threading.Thread"),
    ):
        run_report_task()

    all_sql = [str(c.args[0]) for c in mock_cursor.execute.call_args_list]
    success_update = next((s for s in all_sql if "status='success'" in s), None)
    assert success_update is not None
    assert "week_start" in success_update
    assert "week_end" in success_update
