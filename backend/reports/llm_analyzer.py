"""LLM 分析层 — Phase 2 异步分析，绝不修改 report_md。"""
from __future__ import annotations

import json
import logging
from typing import Any, List, Optional

import anthropic
import psycopg2

from backend.config import Config
from backend.reports.models import CustomerStat, DayStats, ReportPayload, StatusStat

logger = logging.getLogger(__name__)

ANALYSIS_MODEL = "claude-haiku-4-5-20251001"


def fetch_prev_week_payload(db_url: str, task_key: str, current_week_start: str) -> Optional[ReportPayload]:
    """Return the most recent successful payload whose week_start is older than current."""
    conn = psycopg2.connect(db_url)
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT report_json FROM report_records
                WHERE task_key = %s
                  AND status = 'success'
                  AND week_start < %s
                  AND report_json IS NOT NULL
                ORDER BY week_start DESC
                LIMIT 1
                """,
                (task_key, current_week_start),
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


def _daily_summary(daily_stats: List[DayStats]) -> str:
    """返回每日汇总的简短摘要字符串。"""
    if not daily_stats:
        return "无数据"
    return "; ".join(
        f"{d.date}: {d.order_count}单/Rp{d.sales_amount:,.0f}"
        for d in daily_stats
    )


def _top_customers_summary(top_customers: List[CustomerStat]) -> str:
    """返回 Top5 客户的摘要字符串。"""
    if not top_customers:
        return "无数据"
    return "; ".join(
        f"{c.customer_name}({c.order_count}单/Rp{c.sales_amount:,.0f})"
        for c in top_customers[:5]
    )


def build_analysis_prompt(current: ReportPayload, prev: Optional[ReportPayload]) -> str:
    """构建 LLM 分析 prompt，所有数字来自原始 JSON，防止幻觉。"""
    current_json = json.dumps(current.to_dict(), ensure_ascii=False, indent=2)

    if prev:
        # ── 结构化对比摘要 ─────────────────────────────
        amount_delta = current.total_sales_amount - prev.total_sales_amount
        amount_pct = (
            (amount_delta / prev.total_sales_amount * 100)
            if prev.total_sales_amount
            else 0
        )
        count_delta = current.total_order_count - prev.total_order_count
        count_pct = (
            (count_delta / prev.total_order_count * 100)
            if prev.total_order_count
            else 0
        )

        prev_section = (
            f"\n【上周数据（{prev.week_start} ~ {prev.week_end}）】\n"
            f"- 销售额：Rp {prev.total_sales_amount:,.0f}\n"
            f"- 订单数：{prev.total_order_count} 张\n"
            f"- 每日明细：{_daily_summary(prev.daily_stats)}\n"
            f"- Top 客户：{_top_customers_summary(prev.top_customers)}\n"
        )
        compare_instruction = (
            "2. 环比对比（必填，基于上方【上周数据】计算）：\n"
            f"   - 销售额：本周 Rp {current.total_sales_amount:,.0f}，上周 Rp {prev.total_sales_amount:,.0f}，"
            f"环比 {'+' if amount_delta >= 0 else ''}{amount_delta:,.0f} ({'+' if amount_pct >= 0 else ''}{amount_pct:.1f}%)\n"
            f"   - 订单数：本周 {current.total_order_count} 张，上周 {prev.total_order_count} 张，"
            f"环比 {'+' if count_delta >= 0 else ''}{count_delta} 张 ({'+' if count_pct >= 0 else ''}{count_pct:.1f}%)\n"
            "   - 趋势分析：指出本周哪几天明显高于/低于上周，推测原因\n"
            "   - Top 客户变化：本周新进/跌出 Top10 的客户名称及金额\n"
        )
    else:
        prev_section = "\n【上周数据】：暂无上周数据，跳过环比对比"
        compare_instruction = "2. 环比对比：暂无上周数据，跳过此部分"

    return (
        "你是销售分析师。以下是本周的销售原始数据（JSON 格式，数字绝对准确）。\n"
        "请输出 Markdown 分析报告，包含：\n"
        "1. 本周趋势：最强/最弱日，整体走势，简要原因推测\n"
        f"{compare_instruction}\n"
        "3. 问题与建议：数据异常或模式异常时给出提示\n"
        "4. 下周预测：基于本周及上周趋势，给出下周销售额的预估区间（低/中/高估），并简要说明推断依据\n\n"
        "严格规则：\n"
        "- 所有数字必须来自原始 JSON，禁止编造或估算\n"
        "- 预测数字必须基于已有趋势外推，并明确标注「预测」字样\n"
        "- 输出纯 Markdown，不要 JSON 或代码块包裹\n\n"
        f"【本周数据（{current.week_start} ~ {current.week_end}）】\n"
        f"{current_json}"
        f"{prev_section}"
    )


def _message_text(message: Any) -> str:
    for block in message.content:
        if hasattr(block, "text"):
            return str(block.text)
    return ""


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
        prev_payload = fetch_prev_week_payload(db_url, task_key, current_payload.week_start)
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
