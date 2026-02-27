"""
Supabase Postgres 持久化：无货登记 (Out Of Stock) 最小仓储层。

设计目标：
- 不改动现有 SQLite / 本地 DB 行为，仅在成功写入本地 out_of_stock_records 后，
  额外向 Supabase 表 oos_records 插入一条镜像记录。
- 若 DATABASE_URL 未配置或连接失败，静默跳过，不影响主流程。
"""

from __future__ import annotations

import logging
import os
from typing import Optional

from sqlalchemy import create_engine, text
from sqlalchemy.engine import Engine

logger = logging.getLogger(__name__)

_DATABASE_URL = os.getenv("DATABASE_URL")
_engine: Optional[Engine] = None


def _get_engine() -> Optional[Engine]:
    """
    懒加载 SQLAlchemy Engine。

    - 若未配置 DATABASE_URL，则返回 None（不上线 Supabase）。
    - 若初始化失败，记录一次日志并返回 None，后续不再重试创建。
    """
    global _engine
    if not _DATABASE_URL:
        return None
    if _engine is not None:
        return _engine
    try:
        _engine = create_engine(_DATABASE_URL, pool_pre_ping=True)
    except Exception as e:
        logger.warning("初始化 Supabase OOS engine 失败，将跳过远程持久化: %s", e)
        _engine = None
    return _engine


def insert_oos_record(
    *,
    issue_type: str,
    product_name: str,
    product_code: Optional[str],
    customer_name: Optional[str],
    need_qty: Optional[float],
    avail_qty: Optional[float],
    shortfall_qty: Optional[float],
    note: Optional[str],
) -> None:
    """
    向 Supabase 表 oos_records/inventory_issues 写入一条「库存异常」记录（best effort）。

    表结构示例：
        create table oos_records (
            id uuid primary key default gen_random_uuid(),
            issue_type text not null, -- 'oos' 无货 / 'shortage' 缺货
            product_name text,
            product_code text,
            customer_name text,
            need_qty int,
            avail_qty int,
            shortfall_qty int,
            note text,
            created_at timestamp default now()
        );
    """
    engine = _get_engine()
    if engine is None:
        return

    try:
        with engine.begin() as conn:
            conn.execute(
                text(
                    """
                    INSERT INTO oos_records
                    (issue_type, product_name, product_code, customer_name, need_qty, avail_qty, shortfall_qty, note)
                    VALUES (:issue_type, :pn, :pc, :cn, :need_qty, :avail_qty, :shortfall_qty, :note)
                    """
                ),
                {
                    "issue_type": issue_type,
                    "pn": product_name,
                    "pc": product_code,
                    "cn": customer_name,
                    "need_qty": int(need_qty) if need_qty is not None else None,
                    "avail_qty": int(avail_qty) if avail_qty is not None else None,
                    "shortfall_qty": int(shortfall_qty) if shortfall_qty is not None else None,
                    "note": note,
                },
            )
    except Exception as e:
        # 仅记录告警，不影响主流程（SQLite / 本地 DB 仍然成功）
        logger.warning("写入 Supabase oos_records 失败，将忽略该错误: %s", e)

