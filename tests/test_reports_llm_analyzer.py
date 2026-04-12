"""Unit tests for backend/reports/llm_analyzer.py — no DB, no LLM calls."""
from __future__ import annotations

from backend.reports.llm_analyzer import build_analysis_prompt
from backend.reports.models import CustomerStat, DayStats, ReportPayload, StatusStat


def _make_payload(week_start: str, week_end: str, total_amount: float, total_count: int) -> ReportPayload:
    return ReportPayload(
        week_start=week_start,
        week_end=week_end,
        total_sales_amount=total_amount,
        total_order_count=total_count,
        daily_stats=[DayStats(date=week_start, order_count=total_count, sales_amount=total_amount)],
        top_customers=[CustomerStat(customer_name="ACME", sales_amount=total_amount, order_count=total_count)],
        status_stats=[StatusStat(status_name="Approved", count=total_count, total_amount=total_amount)],
    )


def test_prompt_contains_current_week_dates():
    current = _make_payload("2026-04-07", "2026-04-13", 5_000_000, 10)
    prompt = build_analysis_prompt(current, None)
    assert "2026-04-07" in prompt
    assert "2026-04-13" in prompt


def test_prompt_contains_raw_numbers():
    current = _make_payload("2026-04-07", "2026-04-13", 5_000_000.0, 10)
    prompt = build_analysis_prompt(current, None)
    assert "5000000" in prompt
    assert "10" in prompt


def test_prompt_with_prev_week_includes_prev_dates():
    current = _make_payload("2026-04-07", "2026-04-13", 5_000_000, 10)
    prev = _make_payload("2026-03-31", "2026-04-06", 4_000_000, 8)
    prompt = build_analysis_prompt(current, prev)
    assert "2026-03-31" in prompt
    assert "4000000" in prompt


def test_prompt_without_prev_skips_comparison():
    current = _make_payload("2026-04-07", "2026-04-13", 5_000_000, 10)
    prompt = build_analysis_prompt(current, None)
    assert "暂无上周数据" in prompt


def test_prompt_forbids_hallucination_instruction():
    current = _make_payload("2026-04-07", "2026-04-13", 5_000_000, 10)
    prompt = build_analysis_prompt(current, None)
    assert "禁止编造" in prompt
