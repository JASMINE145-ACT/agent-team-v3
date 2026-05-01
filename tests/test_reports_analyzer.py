from datetime import date

from backend.reports.analyzer import analyze_sales_orders
from backend.reports.llm_analyzer import _run_dq_checks
from backend.reports.models import ReportPayload, DayStats


def test_analyze_sales_orders_basic():
    orders = [
        {
            "id": 1,
            "transDate": "01/04/2026",
            "totalAmount": 100,
            "customer": {"name": "客户A"},
            "statusName": "Belum Lunas",
        },
        {
            "id": 2,
            "transDate": "01/04/2026",
            "totalAmount": 50,
            "customer": {"name": "客户A"},
            "statusName": "Belum Lunas",
        },
        {
            "id": 3,
            "transDate": "02/04/2026",
            "totalAmount": 200,
            "customer": {"name": "客户B"},
            "statusName": "Lunas",
        },
    ]
    result = analyze_sales_orders(date(2026, 3, 30), date(2026, 4, 5), orders)
    assert result.total_order_count == 3
    assert result.total_sales_amount == 350.0
    assert result.top_customers[0].customer_name == "客户B"
    assert len(result.daily_stats) == 2
    assert len(result.status_stats) == 2
    assert result.status_stats[0].status_name in ("Belum Lunas", "Lunas")


def test_analyze_sales_orders_filters_outside_week_range():
    orders = [
        {
            "id": 1,
            "transDate": "30/03/2026",
            "totalAmount": 100,
            "customer": {"name": "客户A"},
            "statusName": "Belum Lunas",
        },
        {
            "id": 2,
            "transDate": "07/04/2026",
            "totalAmount": 999,
            "customer": {"name": "客户B"},
            "statusName": "Lunas",
        },
    ]
    result = analyze_sales_orders(date(2026, 3, 30), date(2026, 4, 5), orders)
    assert result.total_order_count == 1
    assert result.total_sales_amount == 100.0
    assert len(result.daily_stats) == 1
    assert result.daily_stats[0].date == "2026-03-30"


def test_dq_checks_detect_negative_amount():
    payload = ReportPayload(
        week_start="2026-04-01",
        week_end="2026-04-07",
        total_sales_amount=-100.0,
        total_order_count=10,
        daily_stats=[DayStats(date="2026-04-01", order_count=10, sales_amount=-100.0)],
        top_customers=[],
        status_stats=[],
    )
    result = _run_dq_checks(payload, [])
    assert result["dq_passed"] is False
    assert "amount_non_negative" in result["failed_rules"]
    assert result["warnings_count"] == 1


def test_dq_checks_detect_aggregation_mismatch():
    payload = ReportPayload(
        week_start="2026-04-01",
        week_end="2026-04-07",
        total_sales_amount=1000.0,
        total_order_count=10,
        daily_stats=[DayStats(date="2026-04-01", order_count=10, sales_amount=500.0)],
        top_customers=[],
        status_stats=[],
    )
    result = _run_dq_checks(payload, [])
    assert result["dq_passed"] is False
    assert "daily_sum_matches_total" in result["failed_rules"]


def test_dq_checks_pass_when_data_valid():
    payload = ReportPayload(
        week_start="2026-04-01",
        week_end="2026-04-07",
        total_sales_amount=1000.0,
        total_order_count=10,
        daily_stats=[DayStats(date="2026-04-01", order_count=10, sales_amount=1000.0)],
        top_customers=[],
        status_stats=[],
    )
    result = _run_dq_checks(payload, [])
    assert result["dq_passed"] is True
    assert result["warnings_count"] == 0
    assert result["failed_rules"] == []

