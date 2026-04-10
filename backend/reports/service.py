from __future__ import annotations

import logging
from typing import Optional

from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger

from backend.reports.models import ensure_tables, get_database_url
from backend.reports.runner import run_report_task

logger = logging.getLogger(__name__)

_scheduler: Optional[BackgroundScheduler] = None


def _load_task_config() -> tuple[bool, str, str]:
    import psycopg2

    conn = psycopg2.connect(get_database_url())
    try:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT enabled, cron_expr, timezone FROM report_task_config WHERE task_key=%s",
                ("sales_weekly_basic",),
            )
            row = cur.fetchone()
            if not row:
                return True, "0 9 * * 1", "Asia/Shanghai"
            return bool(row[0]), str(row[1]), str(row[2])
    finally:
        conn.close()


def _parse_cron(expr: str, timezone: str) -> CronTrigger:
    fields = expr.split()
    if len(fields) != 5:
        raise ValueError(f"invalid cron expr: {expr}")
    minute, hour, day, month, day_of_week = fields
    return CronTrigger(
        minute=minute,
        hour=hour,
        day=day,
        month=month,
        day_of_week=day_of_week,
        timezone=timezone,
    )


def start_report_service() -> None:
    global _scheduler
    ensure_tables()
    if _scheduler and _scheduler.running:
        return
    _scheduler = BackgroundScheduler()
    enabled, cron_expr, timezone = _load_task_config()
    if enabled:
        _scheduler.add_job(
            func=lambda: run_report_task(trigger_type="schedule"),
            trigger=_parse_cron(cron_expr, timezone),
            id="sales_weekly_basic",
            replace_existing=True,
        )
    _scheduler.start()
    logger.info("Report scheduler started")


def reload_task() -> None:
    global _scheduler
    if not _scheduler:
        return
    enabled, cron_expr, timezone = _load_task_config()
    if _scheduler.get_job("sales_weekly_basic"):
        _scheduler.remove_job("sales_weekly_basic")
    if enabled:
        _scheduler.add_job(
            func=lambda: run_report_task(trigger_type="schedule"),
            trigger=_parse_cron(cron_expr, timezone),
            id="sales_weekly_basic",
            replace_existing=True,
        )


def stop_report_service() -> None:
    global _scheduler
    if _scheduler and _scheduler.running:
        _scheduler.shutdown(wait=False)
    _scheduler = None

