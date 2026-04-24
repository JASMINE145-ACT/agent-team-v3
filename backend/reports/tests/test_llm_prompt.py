from backend.reports.llm_analyzer import build_analysis_prompt
from backend.reports.models import CustomerStat, DayStats, ReportPayload, StatusStat


def _make_payload(week_start="2026-04-14", week_end="2026-04-20"):
    return ReportPayload(
        week_start=week_start,
        week_end=week_end,
        total_sales_amount=1_000_000.0,
        total_order_count=50,
        daily_stats=[DayStats(date="2026-04-14", order_count=10, sales_amount=200_000.0)],
        top_customers=[CustomerStat(customer_name="ACME", sales_amount=400_000.0, order_count=20)],
        status_stats=[StatusStat(status_name="Delivered", count=45, total_amount=950_000.0)],
    )


def test_prompt_contains_prediction_section():
    prompt = build_analysis_prompt(_make_payload(), prev=None)
    assert "下周预测" in prompt
    assert "预测" in prompt
    assert "暂无上周数据，跳过此部分" in prompt
    assert "必须基于已有趋势外推" in prompt
    assert "所有数字必须来自原始 JSON，禁止编造或估算" in prompt


def test_prompt_with_prev_contains_comparison():
    current = _make_payload()
    prev = _make_payload(week_start="2026-04-07", week_end="2026-04-13")
    prompt = build_analysis_prompt(current, prev=prev)
    assert "环比" in prompt
    assert "下周预测" in prompt
    assert "本周 Rp" in prompt
    assert "上周 Rp" in prompt
    assert "所有数字必须来自原始 JSON，禁止编造或估算" in prompt
    assert "明确标注「预测」字样" in prompt
    assert "暂无上周数据，跳过此部分" not in prompt
