from __future__ import annotations

import json
import os
from dataclasses import asdict, dataclass
from datetime import datetime
from typing import Any, Dict, List, Optional

import psycopg2
from pydantic import BaseModel, Field


@dataclass
class DayStats:
    date: str
    order_count: int
    sales_amount: float


@dataclass
class CustomerStat:
    customer_name: str
    sales_amount: float
    order_count: int


@dataclass
class StatusStat:
    status_name: str
    count: int
    total_amount: float


@dataclass
class ReportPayload:
    week_start: str
    week_end: str
    total_sales_amount: float
    total_order_count: int
    daily_stats: List[DayStats]
    top_customers: List[CustomerStat]
    status_stats: List[StatusStat]

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


class TaskConfigPatch(BaseModel):
    enabled: Optional[bool] = None
    cron_expr: Optional[str] = None
    timezone: Optional[str] = None
    title: Optional[str] = None


class ReportTaskResponse(BaseModel):
    task_key: str
    title: str
    enabled: bool
    cron_expr: str
    timezone: str
    updated_at: str


class ReportRecordResponse(BaseModel):
    id: int
    task_key: str
    status: str
    trigger_type: str
    started_at: str
    finished_at: Optional[str] = None
    error_message: Optional[str] = None
    summary_json: Optional[Dict[str, Any]] = None


class ReportRecordDetailResponse(ReportRecordResponse):
    report_json: Optional[Dict[str, Any]] = None
    report_md: Optional[str] = None


_DDL = [
    """
    CREATE TABLE IF NOT EXISTS report_task_config (
        task_key TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        enabled BOOLEAN NOT NULL DEFAULT TRUE,
        cron_expr TEXT NOT NULL,
        timezone TEXT NOT NULL DEFAULT 'Asia/Shanghai',
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS report_records (
        id BIGSERIAL PRIMARY KEY,
        task_key TEXT NOT NULL,
        status TEXT NOT NULL,
        trigger_type TEXT NOT NULL,
        started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        finished_at TIMESTAMPTZ NULL,
        error_message TEXT NULL,
        summary_json JSONB NULL,
        report_json JSONB NULL,
        analysis_md TEXT NULL,
        analysis_status TEXT NOT NULL DEFAULT 'pending',
        week_start DATE NULL,
        week_end DATE NULL
    );
    """,
    """
    CREATE INDEX IF NOT EXISTS idx_report_records_task_started
    ON report_records(task_key, started_at DESC);
    """,
    """
    CREATE TABLE IF NOT EXISTS report_analysis_events (
        id BIGSERIAL PRIMARY KEY,
        record_id BIGINT NOT NULL REFERENCES report_records(id) ON DELETE CASCADE,
        event_type TEXT NOT NULL,
        event_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    """,
    """
    CREATE INDEX IF NOT EXISTS idx_report_analysis_events_record_created
    ON report_analysis_events(record_id, created_at DESC, id DESC);
    """,
]


def get_database_url() -> str:
    db_url = (os.getenv("DATABASE_URL") or "").strip()
    if not db_url:
        raise RuntimeError("DATABASE_URL is required for reports module")
    return db_url


def ensure_tables() -> None:
    conn = psycopg2.connect(get_database_url())
    try:
        conn.autocommit = True
        with conn.cursor() as cur:
            for ddl in _DDL:
                cur.execute(ddl)
            cur.execute(
                """
                INSERT INTO report_task_config(task_key, title, enabled, cron_expr, timezone)
                VALUES (%s, %s, %s, %s, %s)
                ON CONFLICT (task_key) DO NOTHING
                """,
                ("sales_weekly_basic", "销售发票周报（基础版）", True, "0 9 * * 1", "Asia/Shanghai"),
            )
            cur.execute("ALTER TABLE report_records ADD COLUMN IF NOT EXISTS report_md TEXT NULL;")
            cur.execute("ALTER TABLE report_records ADD COLUMN IF NOT EXISTS analysis_md TEXT NULL;")
            cur.execute(
                "ALTER TABLE report_records ADD COLUMN IF NOT EXISTS analysis_status TEXT NOT NULL DEFAULT 'pending';"
            )
            cur.execute("ALTER TABLE report_records ADD COLUMN IF NOT EXISTS week_start DATE NULL;")
            cur.execute("ALTER TABLE report_records ADD COLUMN IF NOT EXISTS week_end DATE NULL;")
    finally:
        conn.close()


def reset_stale_running_analyses() -> int:
    """服务启动时调用：把遗留的 analysis_status='running' 重置为 'failed'。
    后台分析线程在上次进程退出时已消亡，若不清理会导致前端永久轮询。
    返回被重置的行数。
    """
    try:
        db_url = get_database_url()
    except RuntimeError:
        return 0
    conn = psycopg2.connect(db_url)
    try:
        with conn:
            with conn.cursor() as cur:
                cur.execute(
                    "UPDATE report_records SET analysis_status='failed' WHERE analysis_status='running'"
                )
                return cur.rowcount or 0
    finally:
        conn.close()


def json_dumps(data: Dict[str, Any]) -> str:
    return json.dumps(data, ensure_ascii=False)


def append_analysis_event(record_id: int, event_type: str, event_payload: Optional[Dict[str, Any]] = None) -> int:
    payload = event_payload or {}
    conn = psycopg2.connect(get_database_url())
    try:
        with conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO report_analysis_events(record_id, event_type, event_payload)
                    VALUES (%s, %s, %s::jsonb)
                    RETURNING id
                    """,
                    (record_id, event_type, json_dumps(payload)),
                )
                row = cur.fetchone()
                return int(row[0]) if row else 0
    finally:
        conn.close()


def list_analysis_events(record_id: int, after_id: int = 0, limit: int = 100) -> List[Dict[str, Any]]:
    safe_limit = max(1, min(limit, 500))
    conn = psycopg2.connect(get_database_url())
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT id, record_id, event_type, event_payload, created_at
                FROM report_analysis_events
                WHERE record_id=%s
                  AND id > %s
                ORDER BY id ASC
                LIMIT %s
                """,
                (record_id, after_id, safe_limit),
            )
            rows = cur.fetchall()
        return [
            {
                "event_id": int(r[0]),
                "record_id": int(r[1]),
                "event_type": str(r[2]),
                "event_payload": r[3] if isinstance(r[3], dict) else {},
                "created_at": r[4].isoformat() if r[4] else None,
            }
            for r in rows
        ]
    finally:
        conn.close()

