from backend.reports.formatter import format_report_md
from backend.reports.models import CustomerStat, DayStats, ReportPayload, StatusStat


def _sample_payload() -> ReportPayload:
    return ReportPayload(
        week_start="2026-04-07",
        week_end="2026-04-13",
        total_sales_amount=1_500_000.0,
        total_order_count=2,
        daily_stats=[
            DayStats(date="2026-04-07", order_count=1, sales_amount=1_000_000.0),
            DayStats(date="2026-04-08", order_count=1, sales_amount=500_000.0),
        ],
        top_customers=[
            CustomerStat(customer_name="PT. ABC", sales_amount=1_000_000.0, order_count=1),
            CustomerStat(customer_name="PT. XYZ", sales_amount=500_000.0, order_count=1),
        ],
        status_stats=[
            StatusStat(status_name="Belum Lunas", count=1, total_amount=1_000_000.0),
            StatusStat(status_name="Lunas", count=1, total_amount=500_000.0),
        ],
    )


def test_format_contains_header_and_totals():
    md = format_report_md(_sample_payload())
    assert "2026-04-07" in md
    assert "2026-04-13" in md
    assert "1,500,000" in md
    assert "本周开票数" in md


def test_format_contains_customer_and_status_sections():
    md = format_report_md(_sample_payload())
    assert "PT. ABC" in md
    assert "状态汇总" in md
    assert "Belum Lunas" in md
    assert "Lunas" in md


def test_format_omits_status_section_when_empty():
    payload = _sample_payload()
    payload.status_stats = []
    md = format_report_md(payload)
    assert "状态汇总" not in md
