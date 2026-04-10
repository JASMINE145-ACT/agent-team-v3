from __future__ import annotations

from datetime import datetime, timedelta
from typing import Any, Dict, Tuple

import psycopg2
from psycopg2.extras import Json

from backend.reports.accurate_fetcher import fetch_sales_invoices
from backend.reports.analyzer import analyze_sales_orders
from backend.reports.formatter import format_report_md
from backend.reports.models import get_database_url


def resolve_week_range(now: datetime | None = None) -> Tuple[datetime.date, datetime.date]:
    now = now or datetime.now()
    this_monday = now.date() - timedelta(days=now.weekday())
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
        summary = {
            "total_order_count": payload.total_order_count,
            "total_sales_amount": payload.total_sales_amount,
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
                        report_md=%s
                    WHERE id=%s
                    """,
                    (Json(summary), Json(payload.to_dict()), report_md, record_id),
                )
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

