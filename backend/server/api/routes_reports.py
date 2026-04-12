from __future__ import annotations

import asyncio
import json
import logging
import os
import threading
from typing import Any, Dict, List

import psycopg2
from fastapi import APIRouter, Header, HTTPException

from backend.reports.accurate_fetcher import ping_accurate
from backend.reports.formatter import format_report_md
from backend.reports.llm_analyzer import run_llm_analysis
from backend.reports.models import CustomerStat, DayStats, ReportPayload, StatusStat, TaskConfigPatch, get_database_url
from backend.reports.runner import run_report_task
from backend.reports.service import _parse_cron, reload_task

router = APIRouter()
logger = logging.getLogger(__name__)


def _conn():
    return psycopg2.connect(get_database_url())


def _require_reports_token(x_reports_token: str | None = Header(default=None)) -> None:
    expected = (os.getenv("REPORTS_ADMIN_TOKEN") or "").strip()
    if not expected:
        raise HTTPException(status_code=503, detail="reports admin token is not configured")
    if x_reports_token != expected:
        raise HTTPException(status_code=401, detail="unauthorized")


@router.get("/api/reports/accurate/ping")
async def reports_accurate_ping(x_reports_token: str | None = Header(default=None)) -> Dict[str, Any]:
    _require_reports_token(x_reports_token)
    try:
        data = await asyncio.to_thread(ping_accurate)
        return {"success": True, "data": data}
    except Exception as e:
        logger.warning("Accurate ping failed: %s", e)
        raise HTTPException(status_code=500, detail="Accurate ping failed")


@router.post("/api/reports/tasks/{task_key}/run")
async def run_sales_weekly_report(task_key: str, x_reports_token: str | None = Header(default=None)) -> Dict[str, Any]:
    _require_reports_token(x_reports_token)
    def _task_exists_sync() -> bool:
        conn = _conn()
        try:
            with conn.cursor() as cur:
                cur.execute("SELECT 1 FROM report_task_config WHERE task_key=%s", (task_key,))
                return bool(cur.fetchone())
        finally:
            conn.close()

    exists = await asyncio.to_thread(_task_exists_sync)
    if not exists:
        raise HTTPException(status_code=404, detail=f"task not found: {task_key}")
    result = await asyncio.to_thread(run_report_task, task_key, "manual")
    return {"success": True, "data": result}


@router.get("/api/reports/tasks")
async def list_tasks(x_reports_token: str | None = Header(default=None)) -> Dict[str, Any]:
    _require_reports_token(x_reports_token)
    def _list_tasks_sync() -> List[Dict[str, Any]]:
        conn = _conn()
        try:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT task_key, title, enabled, cron_expr, timezone, updated_at
                    FROM report_task_config
                    ORDER BY task_key
                    """
                )
                rows = cur.fetchall()
            return [
                {
                    "task_key": r[0],
                    "title": r[1],
                    "enabled": bool(r[2]),
                    "cron_expr": r[3],
                    "timezone": r[4],
                    "updated_at": r[5].isoformat() if r[5] else None,
                }
                for r in rows
            ]
        finally:
            conn.close()

    items = await asyncio.to_thread(_list_tasks_sync)
    return {"success": True, "data": items}


@router.patch("/api/reports/tasks/{task_key}")
async def update_task(
    task_key: str, patch: TaskConfigPatch, x_reports_token: str | None = Header(default=None)
) -> Dict[str, Any]:
    _require_reports_token(x_reports_token)
    updates: List[str] = []
    values: List[Any] = []
    body = patch.model_dump(exclude_none=True) if hasattr(patch, "model_dump") else patch.dict(exclude_none=True)
    if not body:
        def _exists_sync() -> bool:
            conn = _conn()
            try:
                with conn.cursor() as cur:
                    cur.execute("SELECT 1 FROM report_task_config WHERE task_key=%s", (task_key,))
                    return bool(cur.fetchone())
            finally:
                conn.close()

        exists = await asyncio.to_thread(_exists_sync)
        if not exists:
            raise HTTPException(status_code=404, detail=f"task not found: {task_key}")
        return {"success": True, "data": {"unchanged": True}}
    for key in ("enabled", "cron_expr", "timezone", "title"):
        if key in body:
            updates.append(f"{key}=%s")
            values.append(body[key])
    values.extend([task_key])

    # Validate scheduler fields before persisting config.
    cron_expr = body.get("cron_expr")
    timezone = body.get("timezone")
    if cron_expr is not None or timezone is not None:
        def _load_current_schedule() -> tuple[str, str]:
            conn = _conn()
            try:
                with conn.cursor() as cur:
                    cur.execute(
                        "SELECT cron_expr, timezone FROM report_task_config WHERE task_key=%s",
                        (task_key,),
                    )
                    row = cur.fetchone()
                    if not row:
                        raise HTTPException(status_code=404, detail=f"task not found: {task_key}")
                    return str(row[0]), str(row[1])
            finally:
                conn.close()

        current_cron, current_tz = await asyncio.to_thread(_load_current_schedule)
        try:
            next_cron = current_cron if cron_expr is None else cron_expr
            next_tz = current_tz if timezone is None else timezone
            _parse_cron(next_cron, next_tz)
        except Exception as e:
            raise HTTPException(status_code=422, detail=f"invalid schedule: {e}")

    def _update_sync() -> int:
        conn = _conn()
        try:
            with conn:
                with conn.cursor() as cur:
                    cur.execute(
                        f"UPDATE report_task_config SET {', '.join(updates)}, updated_at=NOW() WHERE task_key=%s",
                        tuple(values),
                    )
                    return cur.rowcount or 0
        finally:
            conn.close()

    rowcount = await asyncio.to_thread(_update_sync)
    if rowcount == 0:
        raise HTTPException(status_code=404, detail=f"task not found: {task_key}")
    await asyncio.to_thread(reload_task)
    return {"success": True}


@router.get("/api/reports/records")
async def list_records(limit: int = 20, x_reports_token: str | None = Header(default=None)) -> Dict[str, Any]:
    _require_reports_token(x_reports_token)
    safe_limit = max(1, min(limit, 200))
    def _list_records_sync() -> List[Dict[str, Any]]:
        conn = _conn()
        try:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, task_key, status, trigger_type, started_at, finished_at,
                           error_message, summary_json, analysis_status
                    FROM report_records
                    ORDER BY id DESC
                    LIMIT %s
                    """,
                    (safe_limit,),
                )
                rows = cur.fetchall()
            return [
                {
                    "id": r[0],
                    "task_key": r[1],
                    "status": r[2],
                    "trigger_type": r[3],
                    "started_at": r[4].isoformat() if r[4] else None,
                    "finished_at": r[5].isoformat() if r[5] else None,
                    "error_message": r[6],
                    "summary_json": r[7],
                    "analysis_status": r[8] if r[8] is not None else "pending",
                }
                for r in rows
            ]
        finally:
            conn.close()

    data = await asyncio.to_thread(_list_records_sync)
    return {"success": True, "data": data}


@router.get("/api/reports/records/{record_id}")
async def get_record_detail(record_id: int, x_reports_token: str | None = Header(default=None)) -> Dict[str, Any]:
    _require_reports_token(x_reports_token)

    def _get_sync() -> Dict[str, Any] | None:
        conn = _conn()
        try:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, task_key, status, trigger_type, started_at, finished_at,
                           error_message, summary_json, report_json, report_md,
                           analysis_md, analysis_status
                    FROM report_records
                    WHERE id=%s
                    """,
                    (record_id,),
                )
                row = cur.fetchone()
            if not row:
                return None
            return {
                "id": row[0],
                "task_key": row[1],
                "status": row[2],
                "trigger_type": row[3],
                "started_at": row[4].isoformat() if row[4] else None,
                "finished_at": row[5].isoformat() if row[5] else None,
                "error_message": row[6],
                "summary_json": row[7],
                "report_json": row[8],
                "report_md": row[9],
                "analysis_md": row[10],
                "analysis_status": row[11] if row[11] is not None else "pending",
            }
        finally:
            conn.close()

    data = await asyncio.to_thread(_get_sync)
    if data is None:
        raise HTTPException(status_code=404, detail=f"record not found: {record_id}")
    return {"success": True, "data": data}


@router.post("/api/reports/records/{record_id}/reformat")
async def reformat_record(record_id: int, x_reports_token: str | None = Header(default=None)) -> Dict[str, Any]:
    _require_reports_token(x_reports_token)

    def _reformat_sync() -> bool:
        conn = _conn()
        try:
            with conn.cursor() as cur:
                cur.execute("SELECT report_json FROM report_records WHERE id=%s", (record_id,))
                row = cur.fetchone()
                if not row or not row[0]:
                    return False
                raw = row[0]
                try:
                    report_json = raw if isinstance(raw, dict) else json.loads(raw)
                    payload = ReportPayload(
                        week_start=str(report_json.get("week_start", "")),
                        week_end=str(report_json.get("week_end", "")),
                        total_sales_amount=float(report_json.get("total_sales_amount", 0)),
                        total_order_count=int(report_json.get("total_order_count", 0)),
                        daily_stats=[DayStats(**item) for item in (report_json.get("daily_stats") or [])],
                        top_customers=[CustomerStat(**item) for item in (report_json.get("top_customers") or [])],
                        status_stats=[StatusStat(**item) for item in (report_json.get("status_stats") or [])],
                    )
                except Exception as e:
                    raise ValueError(f"invalid report_json for record {record_id}: {e}") from e
                report_md = format_report_md(payload)
            with conn:
                with conn.cursor() as cur:
                    cur.execute("UPDATE report_records SET report_md=%s WHERE id=%s", (report_md, record_id))
            return True
        finally:
            conn.close()

    try:
        ok = await asyncio.to_thread(_reformat_sync)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    if not ok:
        raise HTTPException(status_code=404, detail=f"record not found or has no report_json: {record_id}")
    return {"success": True}


@router.post("/api/reports/records/{record_id}/reanalyze")
async def reanalyze_record(
    record_id: int, x_reports_token: str | None = Header(default=None)
) -> Dict[str, Any]:
    """重跑 LLM 分析，不重新抓数据。"""
    _require_reports_token(x_reports_token)

    def _load_for_reanalyze() -> Dict[str, Any] | None:
        conn = _conn()
        try:
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT task_key, report_json FROM report_records WHERE id=%s",
                    (record_id,),
                )
                row = cur.fetchone()
            if not row or not row[1]:
                return None
            return {"task_key": str(row[0]), "report_json": row[1]}
        finally:
            conn.close()

    record = await asyncio.to_thread(_load_for_reanalyze)
    if not record:
        raise HTTPException(
            status_code=404, detail=f"record not found or has no report_json: {record_id}"
        )

    rj = record["report_json"] if isinstance(record["report_json"], dict) else json.loads(record["report_json"])
    try:
        payload = ReportPayload(
            week_start=str(rj.get("week_start", "")),
            week_end=str(rj.get("week_end", "")),
            total_sales_amount=float(rj.get("total_sales_amount", 0)),
            total_order_count=int(rj.get("total_order_count", 0)),
            daily_stats=[DayStats(**item) for item in (rj.get("daily_stats") or [])],
            top_customers=[CustomerStat(**item) for item in (rj.get("top_customers") or [])],
            status_stats=[StatusStat(**item) for item in (rj.get("status_stats") or [])],
        )
    except Exception as exc:
        raise HTTPException(status_code=422, detail=f"invalid report_json: {exc}")

    db_url = get_database_url()
    threading.Thread(
        target=run_llm_analysis,
        args=(db_url, record_id, record["task_key"], payload),
        daemon=True,
    ).start()
    return {"success": True}
