"""Unit tests for backend/reports/llm_analyzer.py — no DB, no LLM calls."""
from __future__ import annotations

from unittest.mock import MagicMock, patch

from backend.reports.llm_analyzer import build_analysis_prompt, fetch_prev_week_payload
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
    assert "4,000,000" in prompt


def test_prompt_without_prev_skips_comparison():
    current = _make_payload("2026-04-07", "2026-04-13", 5_000_000, 10)
    prompt = build_analysis_prompt(current, None)
    assert "暂无上周数据" in prompt
    assert "5000000" in prompt


def test_prompt_includes_structured_comparison():
    """有上周数据时，prompt 应包含结构化数字对比（金额/订单数环比）。"""
    current = _make_payload("2026-04-07", "2026-04-13", 5_000_000, 10)
    prev = _make_payload("2026-03-31", "2026-04-06", 4_000_000, 8)
    prompt = build_analysis_prompt(current, prev)
    # 本周数据
    assert "5,000,000" in prompt
    # 上周数据
    assert "4,000,000" in prompt
    # 明确标注上周时间范围
    assert "2026-03-31" in prompt
    assert "2026-04-06" in prompt
    # 包含涨跌幅（结构化指令中应出现 +1,000,000 或类似对比）
    assert "+1,000,000" in prompt or ("4,000,000" in prompt and "5,000,000" in prompt)
    # Top 客户摘要 helper 调用
    assert "ACME" in prompt


def test_prompt_includes_problem_suggestion_section():
    """prompt 应包含第 3 部分：问题与建议。"""
    current = _make_payload("2026-04-07", "2026-04-13", 5_000_000, 10)
    prompt = build_analysis_prompt(current, None)
    assert "问题与建议" in prompt


def test_prompt_forbids_hallucination_instruction():
    current = _make_payload("2026-04-07", "2026-04-13", 5_000_000, 10)
    prompt = build_analysis_prompt(current, None)
    assert "禁止编造" in prompt


def test_prompt_forbids_hallucination_instruction():
    current = _make_payload("2026-04-07", "2026-04-13", 5_000_000, 10)
    prompt = build_analysis_prompt(current, None)
    assert "禁止编造" in prompt


def test_message_text_skips_thinking_block_returns_text():
    from backend.reports.llm_analyzer import _message_text

    thinking = MagicMock(spec=[])
    text_block = MagicMock()
    text_block.text = "分析结果文本"
    msg = MagicMock()
    msg.content = [thinking, text_block]
    assert _message_text(msg) == "分析结果文本"


def test_message_text_plain_text_block():
    from backend.reports.llm_analyzer import _message_text

    text_block = MagicMock()
    text_block.text = "Hello"
    msg = MagicMock()
    msg.content = [text_block]
    assert _message_text(msg) == "Hello"


def test_message_text_empty_content_returns_empty_string():
    from backend.reports.llm_analyzer import _message_text

    msg = MagicMock()
    msg.content = []
    assert _message_text(msg) == ""


def _prev_payload_dict():
    return {
        "week_start": "2026-03-30",
        "week_end": "2026-04-05",
        "total_sales_amount": 800.0,
        "total_order_count": 10,
        "daily_stats": [],
        "top_customers": [],
        "status_stats": [],
    }


def _make_cursor_conn(row):
    mock_cursor = MagicMock()
    mock_cursor.fetchone.return_value = row
    mock_ctx = MagicMock()
    mock_ctx.__enter__ = MagicMock(return_value=mock_cursor)
    mock_ctx.__exit__ = MagicMock(return_value=False)
    mock_conn = MagicMock()
    mock_conn.cursor.return_value = mock_ctx
    return mock_conn, mock_cursor


def test_fetch_prev_week_payload_queries_week_start_column():
    mock_conn, mock_cursor = _make_cursor_conn((_prev_payload_dict(),))
    with patch("psycopg2.connect", return_value=mock_conn):
        _ = fetch_prev_week_payload("postgresql://test", "sales_weekly_basic", "2026-04-06")

    sql = mock_cursor.execute.call_args[0][0]
    assert "week_start < %s" in sql
    assert "id !=" not in sql


def test_fetch_prev_week_payload_reconstructs_report_payload():
    mock_conn, _ = _make_cursor_conn((_prev_payload_dict(),))
    with patch("psycopg2.connect", return_value=mock_conn):
        result = fetch_prev_week_payload("postgresql://test", "sales_weekly_basic", "2026-04-06")

    assert result is not None
    assert result.week_start == "2026-03-30"
    assert result.total_sales_amount == 800.0


def test_fetch_prev_week_payload_returns_none_when_no_row():
    mock_conn, _ = _make_cursor_conn(None)
    with patch("psycopg2.connect", return_value=mock_conn):
        result = fetch_prev_week_payload("postgresql://test", "sales_weekly_basic", "2026-04-06")
    assert result is None
