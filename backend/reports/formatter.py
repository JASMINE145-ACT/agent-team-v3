from __future__ import annotations

from backend.reports.models import ReportPayload


def _rp(amount: float) -> str:
    return f"Rp {amount:,.0f}"


def format_report_md(payload: ReportPayload) -> str:
    lines: list[str] = []

    lines.append(f"# 销售发票周报｜{payload.week_start} ~ {payload.week_end}")
    lines.append("")
    lines.append(f"**本周开票数**：{payload.total_order_count} 张")
    lines.append(f"**本周开票总额**：{_rp(payload.total_sales_amount)}")
    lines.append("")

    if payload.daily_stats:
        lines.append("## 每日开票趋势")
        lines.append("")
        lines.append("| 日期 | 发票数 | 金额 |")
        lines.append("|------|--------|------|")
        for row in payload.daily_stats:
            lines.append(f"| {row.date} | {row.order_count} | {_rp(row.sales_amount)} |")
        lines.append("")

    if payload.top_customers:
        lines.append("## 客户明细（Top 10）")
        lines.append("")
        lines.append("| 排名 | 客户名称 | 发票数 | 金额 |")
        lines.append("|------|----------|--------|------|")
        for idx, row in enumerate(payload.top_customers, 1):
            lines.append(f"| {idx} | {row.customer_name} | {row.order_count} | {_rp(row.sales_amount)} |")
        lines.append("")

    if payload.status_stats:
        lines.append("## 状态汇总")
        lines.append("")
        lines.append("| 状态 | 张数 | 金额 |")
        lines.append("|------|------|------|")
        for row in payload.status_stats:
            lines.append(f"| {row.status_name} | {row.count} | {_rp(row.total_amount)} |")
        lines.append("")

    return "\n".join(lines)
