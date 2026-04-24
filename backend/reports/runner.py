from __future__ import annotations

import threading
from datetime import datetime, timedelta, timezone
from typing import Any, Dict, Tuple

import psycopg2
from psycopg2.extras import Json

from backend.reports.accurate_fetcher import fetch_sales_invoices
from backend.reports.analyzer import analyze_sales_orders
from backend.reports.formatter import format_report_md
from backend.reports.llm_analyzer import run_llm_analysis
from backend.reports.models import get_database_url

# 与 APScheduler CronTrigger 的 timezone 保持一致
_REPORT_TZ = timezone(timedelta(hours=8))


def _fetch_prev_summary(conn, task_key: str, week_start) -> dict | None:
    """返回最近一条 status='success' 且 week_start 早于当前周的 summary_json，无则返回 None。"""
    with conn.cursor() as cur:
        cur.execute(
            """
            SELECT summary_json FROM report_records
            WHERE task_key = %s
              AND status = 'success'
              AND week_start < %s
              AND summary_json IS NOT NULL
            ORDER BY week_start DESC
            LIMIT 1
            """,
            (task_key, week_start),
        )
        row = cur.fetchone()
    if not row or not row[0]:
        return None
    return row[0] if isinstance(row[0], dict) else None


def resolve_week_range(now: datetime | None = None) -> Tuple[datetime.date, datetime.date]:
    """计算上周周范围（上周一到上周日），以 Asia/Shanghai 时区为准。

    与 APScheduler 的 CronTrigger(timezone='Asia/Shanghai') 配合使用，
    确保 cron 触发时和 datetime 计算用的是同一个时区。
    """
    if now is None:
        now = datetime.now(_REPORT_TZ)
    elif now.tzinfo is None:
        now = now.replace(tzinfo=_REPORT_TZ)
    # 统一转本地 date 对象，避免时区偏移导致 week boundary 差一天
    now_date = now.astimezone(_REPORT_TZ).date()
    this_monday = now_date - timedelta(days=now_date.weekday())
    week_start = this_monday - timedelta(days=7)
    week_end = this_monday - timedelta(days=1)
    return week_start, week_end


def run_report_task(task_key: str = "sales_weekly_basic", trigger_type: str = "manual") -> Dict[str, Any]:
    db_url = get_database_url()
    week_start, week_end = resolve_week_range()
    conn = psycopg2.connect(db_url)
    record_id = None
    try:
        with conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO report_records(task_key, status, trigger_type, started_at)
                    VALUES (%s, 'running', %s, NOW())
                    RETURNING id
                    """,
                    (task_key, trigger_type),
                )
                record_id = cur.fetchone()[0]

        invoices = fetch_sales_invoices(week_start, week_end)
        payload = analyze_sales_orders(week_start, week_end, invoices)
        report_md = format_report_md(payload)
        prev_summary = _fetch_prev_summary(conn, task_key, week_start)
        prev_week: dict | None = None
        if prev_summary:
            prev_amount = float(prev_summary.get("total_sales_amount") or 0)
            prev_count = int(prev_summary.get("total_order_count") or 0)
            amount_pct = (
                (payload.total_sales_amount - prev_amount) / prev_amount * 100
                if prev_amount
                else 0.0
            )
            count_pct = (
                (payload.total_order_count - prev_count) / prev_count * 100
                if prev_count
                else 0.0
            )
            prev_week = {
                "total_sales_amount": prev_amount,
                "total_order_count": prev_count,
                "amount_pct": round(amount_pct, 1),
                "count_pct": round(count_pct, 1),
            }
        summary = {
            "total_order_count": payload.total_order_count,
            "total_sales_amount": payload.total_sales_amount,
            "prev_week": prev_week,
        }

        with conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    UPDATE report_records
                    SET status='success',
                        finished_at=NOW(),
                        summary_json=%s,
                        report_json=%s,
                        report_md=%s,
                        analysis_status='pending',
                        week_start=%s,
                        week_end=%s
                    WHERE id=%s
                    """,
                    (Json(summary), Json(payload.to_dict()), report_md, week_start, week_end, record_id),
                )
        db_url_for_thread = get_database_url()
        threading.Thread(
            target=run_llm_analysis,
            args=(db_url_for_thread, record_id, task_key, payload),
            daemon=True,
        ).start()
        return {"record_id": record_id, "status": "success", "summary": summary}
    except Exception as e:
        if record_id is not None:
            with conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        UPDATE report_records
                        SET status='failed',
                            finished_at=NOW(),
                            error_message=%s
                        WHERE id=%s
                        """,
                        (str(e), record_id),
                    )
        raise
    finally:
        conn.close()

