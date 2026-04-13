"""LLM 分析层 — Phase 2 异步分析，绝不修改 report_md。"""
from __future__ import annotations

import json
import logging
from typing import Any, Optional

import anthropic
import psycopg2

from backend.config import Config
from backend.reports.models import CustomerStat, DayStats, ReportPayload, StatusStat

logger = logging.getLogger(__name__)

ANALYSIS_MODEL = "claude-haiku-4-5-20251001"


def fetch_prev_week_payload(db_url: str, task_key: str, current_record_id: int) -> Optional[ReportPayload]:
    """返回同 task_key 中排在当前记录之前的最新成功记录的 ReportPayload，无则返回 None。"""
    conn = psycopg2.connect(db_url)
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT report_json FROM report_records
                WHERE task_key = %s
                  AND status = 'success'
                  AND id != %s
                  AND report_json IS NOT NULL
                ORDER BY started_at DESC
                LIMIT 1
                """,
                (task_key, current_record_id),
            )
            row = cur.fetchone()
        if not row or not row[0]:
            return None
        rj = row[0] if isinstance(row[0], dict) else json.loads(row[0])
        return ReportPayload(
            week_start=str(rj.get("week_start", "")),
            week_end=str(rj.get("week_end", "")),
            total_sales_amount=float(rj.get("total_sales_amount", 0)),
            total_order_count=int(rj.get("total_order_count", 0)),
            daily_stats=[DayStats(**item) for item in (rj.get("daily_stats") or [])],
            top_customers=[CustomerStat(**item) for item in (rj.get("top_customers") or [])],
            status_stats=[StatusStat(**item) for item in (rj.get("status_stats") or [])],
        )
    finally:
        conn.close()


def build_analysis_prompt(current: ReportPayload, prev: Optional[ReportPayload]) -> str:
    """构建 LLM 分析 prompt，所有数字来自原始 JSON，防止幻觉。"""
    current_json = json.dumps(current.to_dict(), ensure_ascii=False, indent=2)

    if prev:
        prev_section = (
            f"\n【上周数据（{prev.week_start} ~ {prev.week_end}）】\n"
            + json.dumps(prev.to_dict(), ensure_ascii=False, indent=2)
        )
        compare_instruction = "2. 环比对比：总额、订单数、Top 客户变化（带具体数字和涨跌幅）"
    else:
        prev_section = "\n【上周数据】：暂无上周数据（本次为首次生成），跳过环比。"
        compare_instruction = "2. 环比对比：暂无上周数据，跳过此部分"

    return (
        "你是销售分析师。以下是本周的销售原始数据（JSON 格式，数字绝对准确）。\n"
        "请输出 Markdown 分析报告，包含：\n"
        "1. 本周趋势：最强/最弱日，整体走势，简要原因推测\n"
        f"{compare_instruction}\n\n"
        "严格规则：\n"
        "- 所有数字必须来自原始 JSON，禁止编造或估算\n"
        "- 输出纯 Markdown，不要 JSON 或代码块包裹\n\n"
        f"【本周数据（{current.week_start} ~ {current.week_end}）】\n"
        f"{current_json}"
        f"{prev_section}"
    )


def _message_text(message: Any) -> str:
    block = message.content[0]
    if hasattr(block, "text"):
        return str(block.text)
    return str(block)


def call_llm_for_analysis(prompt: str) -> str:
    """调用 Claude Haiku 生成分析文本。"""
    # 显式超时，避免在 Render 等环境请求挂起导致 analysis_status 永久停留在 running
    client = anthropic.Anthropic(
        api_key=Config.ANTHROPIC_API_KEY,
        base_url=Config.ANTHROPIC_BASE_URL or None,
        timeout=180.0,
    )
    message = client.messages.create(
        model=ANALYSIS_MODEL,
        max_tokens=2048,
        messages=[{"role": "user", "content": prompt}],
    )
    return _message_text(message)


def _set_analysis_status(db_url: str, record_id: int, status: str, analysis_md: str | None = None) -> None:
    conn = psycopg2.connect(db_url)
    try:
        with conn:
            with conn.cursor() as cur:
                if analysis_md is not None:
                    cur.execute(
                        "UPDATE report_records SET analysis_md=%s, analysis_status=%s WHERE id=%s",
                        (analysis_md, status, record_id),
                    )
                else:
                    cur.execute(
                        "UPDATE report_records SET analysis_status=%s WHERE id=%s",
                        (status, record_id),
                    )
    finally:
        conn.close()


def run_llm_analysis(db_url: str, record_id: int, task_key: str, current_payload: ReportPayload) -> None:
    """后台线程入口：执行分析并写回 DB，失败时仅标记 failed，不影响 report_md。"""
    _set_analysis_status(db_url, record_id, "running")

    try:
        prev_payload = fetch_prev_week_payload(db_url, task_key, record_id)
        prompt = build_analysis_prompt(current_payload, prev_payload)
        analysis_md = call_llm_for_analysis(prompt)
        _set_analysis_status(db_url, record_id, "done", analysis_md)
        logger.info("LLM analysis done for record %s", record_id)
    except Exception as exc:
        logger.error("LLM analysis failed for record %s: %s", record_id, exc)
        try:
            _set_analysis_status(db_url, record_id, "failed")
        except Exception as mark_exc:
            logger.error("Could not mark analysis failed for record %s: %s", record_id, mark_exc)
