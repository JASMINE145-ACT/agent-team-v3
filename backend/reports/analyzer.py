from __future__ import annotations

from datetime import date
from typing import Any, Dict, List

import pandas as pd

from backend.reports.models import CustomerStat, DayStats, ReportPayload, StatusStat


def _to_float(v: Any) -> float:
    try:
        return float(v or 0)
    except (TypeError, ValueError):
        return 0.0


def _customer_name(v: Any) -> str:
    if isinstance(v, dict):
        name = v.get("name")
        return str(name) if name else "未知客户"
    if isinstance(v, str) and v.strip():
        return v.strip()
    return "未知客户"


def _parse_trans_date(v: Any):
    if not isinstance(v, str) or not v.strip():
        return None
    parsed = pd.to_datetime(v, format="%d/%m/%Y", errors="coerce")
    if pd.isna(parsed):
        parsed = pd.to_datetime(v, errors="coerce")
    if pd.isna(parsed):
        return None
    return parsed.date()


def analyze_sales_orders(week_start: date, week_end: date, orders: List[Dict[str, Any]]) -> ReportPayload:
    if not orders:
        return ReportPayload(
            week_start=week_start.isoformat(),
            week_end=week_end.isoformat(),
            total_sales_amount=0.0,
            total_order_count=0,
            daily_stats=[],
            top_customers=[],
            status_stats=[],
        )

    df = pd.DataFrame(orders)
    if "transDate" not in df.columns:
        df["transDate"] = None
    if "totalAmount" not in df.columns:
        df["totalAmount"] = 0
    if "customer" not in df.columns:
        df["customer"] = None
    if "statusName" not in df.columns:
        df["statusName"] = "未知状态"
    if "id" not in df.columns:
        df["id"] = range(1, len(df) + 1)

    df["date"] = df["transDate"].apply(_parse_trans_date)
    df["amount_num"] = df["totalAmount"].apply(_to_float)
    df["customerName"] = df["customer"].apply(_customer_name)
    df["status"] = df["statusName"].fillna("未知状态")

    day_group = (
        df.groupby("date", dropna=True)
        .agg(sales_amount=("amount_num", "sum"), order_count=("amount_num", "size"))
        .reset_index()
        .sort_values("date")
    )
    daily_stats = [
        DayStats(date=row["date"].isoformat(), order_count=int(row["order_count"]), sales_amount=float(row["sales_amount"]))
        for _, row in day_group.iterrows()
    ]

    customer_group = (
        df.groupby("customerName")
        .agg(sales_amount=("amount_num", "sum"), order_count=("amount_num", "size"))
        .reset_index()
        .sort_values("sales_amount", ascending=False)
        .head(10)
    )
    top_customers = [
        CustomerStat(
            customer_name=str(row["customerName"]),
            sales_amount=float(row["sales_amount"]),
            order_count=int(row["order_count"]),
        )
        for _, row in customer_group.iterrows()
    ]

    status_group = (
        df.groupby("status")
        .agg(total_amount=("amount_num", "sum"), count=("amount_num", "size"))
        .reset_index()
        .sort_values("total_amount", ascending=False)
    )
    status_stats = [
        StatusStat(
            status_name=str(row["status"]),
            count=int(row["count"]),
            total_amount=float(row["total_amount"]),
        )
        for _, row in status_group.iterrows()
    ]

    return ReportPayload(
        week_start=week_start.isoformat(),
        week_end=week_end.isoformat(),
        total_sales_amount=float(df["amount_num"].sum()),
        total_order_count=int(len(df)),
        daily_stats=daily_stats,
        top_customers=top_customers,
        status_stats=status_stats,
    )

