from datetime import date

from backend.reports.analyzer import analyze_sales_orders


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

