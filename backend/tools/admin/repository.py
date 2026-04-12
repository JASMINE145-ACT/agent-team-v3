"""
price_library / product_mapping 表的 SQLAlchemy CRUD。
DATABASE_URL 未配置时所有操作返回空/失败。
"""

from __future__ import annotations

import logging
import os
import re
from pathlib import Path
from typing import Any, Optional

from sqlalchemy import create_engine, text
from sqlalchemy.engine import Engine

logger = logging.getLogger(__name__)

_DATABASE_URL: str = os.getenv("DATABASE_URL", "")
_engine: Optional[Engine] = None


def _get_engine() -> Optional[Engine]:
    global _engine
    if not _DATABASE_URL:
        return None
    if _engine is not None:
        return _engine
    try:
        _engine = create_engine(_DATABASE_URL, pool_pre_ping=True)
    except Exception as e:
        logger.warning("Admin DB engine 初始化失败: %s", e)
        _engine = None
    return _engine


def _run_migration_sql(conn, sql_path: Path) -> None:
    raw = sql_path.read_text(encoding="utf-8")
    stripped = re.sub(r"--[^\n]*", "", raw)
    parts = [p.strip() for p in re.split(r";\s*", stripped) if p.strip()]
    for part in parts:
        conn.execute(text(part + ";"))


def setup_tables() -> None:
    """建表（若不存在）。启动时调用一次。优先执行 migrations/001_create_price_tables.sql。"""
    engine = _get_engine()
    if engine is None:
        return
    mig = Path(__file__).resolve().parent / "migrations" / "001_create_price_tables.sql"
    try:
        with engine.begin() as conn:
            if mig.is_file():
                _run_migration_sql(conn, mig)
            else:
                conn.execute(
                    text(
                        """
                CREATE TABLE IF NOT EXISTS price_library (
                    id          SERIAL PRIMARY KEY,
                    material    TEXT NOT NULL DEFAULT '',
                    description TEXT NOT NULL DEFAULT '',
                    price_a     NUMERIC,
                    price_b     NUMERIC,
                    price_c     NUMERIC,
                    price_d     NUMERIC,
                    updated_at  TIMESTAMPTZ DEFAULT NOW()
                )
            """
                    )
                )
                conn.execute(
                    text(
                        """
                CREATE TABLE IF NOT EXISTS product_mapping (
                    id              SERIAL PRIMARY KEY,
                    inquiry_name    TEXT NOT NULL DEFAULT '',
                    spec            TEXT DEFAULT '',
                    product_code    TEXT NOT NULL DEFAULT '',
                    quotation_name  TEXT DEFAULT '',
                    updated_at      TIMESTAMPTZ DEFAULT NOW()
                )
            """
                    )
                )
                conn.execute(
                    text(
                        """
                CREATE INDEX IF NOT EXISTS idx_price_library_description_gin
                    ON price_library USING gin (to_tsvector('simple', description))
            """
                    )
                )
        logger.info("Admin tables ready.")
    except Exception as e:
        logger.warning("建表失败: %s", e)


def fetch_price_library(q: str = "", page: int = 1, page_size: int = 100) -> dict:
    """分页查询，返回 {items: [...], total: int}。"""
    engine = _get_engine()
    if engine is None:
        return {"items": [], "total": 0}
    offset = (page - 1) * page_size
    q = (q or "").strip()
    try:
        with engine.connect() as conn:
            if q:
                like = f"%{q}%"
                total = conn.execute(
                    text(
                        "SELECT COUNT(*) FROM price_library WHERE material ILIKE :q OR description ILIKE :q"
                    ),
                    {"q": like},
                ).scalar() or 0
                rows = conn.execute(
                    text(
                        "SELECT id, material, description, price_a, price_b, price_c, price_d "
                        "FROM price_library WHERE material ILIKE :q OR description ILIKE :q "
                        "ORDER BY id LIMIT :limit OFFSET :offset"
                    ),
                    {"q": like, "limit": page_size, "offset": offset},
                ).mappings().all()
            else:
                total = conn.execute(text("SELECT COUNT(*) FROM price_library")).scalar() or 0
                rows = conn.execute(
                    text(
                        "SELECT id, material, description, price_a, price_b, price_c, price_d "
                        "FROM price_library ORDER BY id LIMIT :limit OFFSET :offset"
                    ),
                    {"limit": page_size, "offset": offset},
                ).mappings().all()
            return {"items": [dict(r) for r in rows], "total": int(total)}
    except Exception as e:
        logger.warning("fetch_price_library 失败: %s", e)
        return {"items": [], "total": 0}


def fetch_all_price_library() -> list[dict]:
    """全量拉取（供 Matcher 缓存用）。"""
    engine = _get_engine()
    if engine is None:
        return []
    try:
        with engine.connect() as conn:
            rows = conn.execute(
                text(
                    "SELECT material, description, price_a, price_b, price_c, price_d "
                    "FROM price_library ORDER BY id"
                )
            ).mappings().all()
            return [dict(r) for r in rows]
    except Exception as e:
        logger.warning("fetch_all_price_library 失败: %s", e)
        return []


def insert_price_row(
    material: str,
    description: str,
    price_a: Any,
    price_b: Any,
    price_c: Any,
    price_d: Any,
) -> Optional[int]:
    engine = _get_engine()
    if engine is None:
        return None
    try:
        with engine.begin() as conn:
            result = conn.execute(
                text(
                    "INSERT INTO price_library (material, description, price_a, price_b, price_c, price_d) "
                    "VALUES (:m, :d, :a, :b, :c, :dd) RETURNING id"
                ),
                {"m": material, "d": description, "a": price_a, "b": price_b, "c": price_c, "dd": price_d},
            )
            return result.scalar()
    except Exception as e:
        logger.warning("insert_price_row 失败: %s", e)
        return None


def update_price_row(
    row_id: int,
    material: str,
    description: str,
    price_a: Any,
    price_b: Any,
    price_c: Any,
    price_d: Any,
) -> Optional[bool]:
    """成功 True；无此行 False；无库或执行异常 None。"""
    engine = _get_engine()
    if engine is None:
        return None
    try:
        with engine.begin() as conn:
            result = conn.execute(
                text(
                    "UPDATE price_library SET material=:m, description=:d, price_a=:a, price_b=:b, "
                    "price_c=:c, price_d=:dd, updated_at=NOW() WHERE id=:id"
                ),
                {"m": material, "d": description, "a": price_a, "b": price_b, "c": price_c, "dd": price_d, "id": row_id},
            )
        return result.rowcount > 0
    except Exception as e:
        logger.warning("update_price_row 失败: %s", e)
        return None


def delete_price_row(row_id: int) -> Optional[bool]:
    """删除成功 True；无此行 False；无库或执行异常 None。"""
    engine = _get_engine()
    if engine is None:
        return None
    try:
        with engine.begin() as conn:
            result = conn.execute(text("DELETE FROM price_library WHERE id=:id"), {"id": row_id})
        return result.rowcount > 0
    except Exception as e:
        logger.warning("delete_price_row 失败: %s", e)
        return None


def replace_all_price_library(rows: list[dict]) -> int:
    """全表替换。返回插入行数。"""
    engine = _get_engine()
    if engine is None:
        return 0
    try:
        with engine.begin() as conn:
            conn.execute(text("TRUNCATE TABLE price_library RESTART IDENTITY"))
            count = 0
            for r in rows:
                conn.execute(
                    text(
                        "INSERT INTO price_library (material, description, price_a, price_b, price_c, price_d) "
                        "VALUES (:m, :d, :a, :b, :c, :dd)"
                    ),
                    {
                        "m": r.get("material", ""),
                        "d": r.get("description", ""),
                        "a": r.get("price_a"),
                        "b": r.get("price_b"),
                        "c": r.get("price_c"),
                        "dd": r.get("price_d"),
                    },
                )
                count += 1
        return count
    except Exception as e:
        logger.warning("replace_all_price_library 失败: %s", e)
        return 0


def fetch_product_mapping(q: str = "", page: int = 1, page_size: int = 100) -> dict:
    engine = _get_engine()
    if engine is None:
        return {"items": [], "total": 0}
    offset = (page - 1) * page_size
    q = (q or "").strip()
    try:
        with engine.connect() as conn:
            if q:
                like = f"%{q}%"
                total = conn.execute(
                    text(
                        "SELECT COUNT(*) FROM product_mapping WHERE inquiry_name ILIKE :q "
                        "OR product_code ILIKE :q OR quotation_name ILIKE :q OR spec ILIKE :q"
                    ),
                    {"q": like},
                ).scalar() or 0
                rows = conn.execute(
                    text(
                        "SELECT id, inquiry_name, spec, product_code, quotation_name FROM product_mapping "
                        "WHERE inquiry_name ILIKE :q OR product_code ILIKE :q OR quotation_name ILIKE :q OR spec ILIKE :q "
                        "ORDER BY id LIMIT :limit OFFSET :offset"
                    ),
                    {"q": like, "limit": page_size, "offset": offset},
                ).mappings().all()
            else:
                total = conn.execute(text("SELECT COUNT(*) FROM product_mapping")).scalar() or 0
                rows = conn.execute(
                    text(
                        "SELECT id, inquiry_name, spec, product_code, quotation_name FROM product_mapping "
                        "ORDER BY id LIMIT :limit OFFSET :offset"
                    ),
                    {"limit": page_size, "offset": offset},
                ).mappings().all()
            return {"items": [dict(r) for r in rows], "total": int(total)}
    except Exception as e:
        logger.warning("fetch_product_mapping 失败: %s", e)
        return {"items": [], "total": 0}


def fetch_all_product_mapping() -> list[dict]:
    engine = _get_engine()
    if engine is None:
        return []
    try:
        with engine.connect() as conn:
            rows = conn.execute(
                text(
                    "SELECT inquiry_name, spec, product_code, quotation_name FROM product_mapping ORDER BY id"
                )
            ).mappings().all()
            return [dict(r) for r in rows]
    except Exception as e:
        logger.warning("fetch_all_product_mapping 失败: %s", e)
        return []


def insert_mapping_row(inquiry_name: str, spec: str, product_code: str, quotation_name: str) -> Optional[int]:
    engine = _get_engine()
    if engine is None:
        return None
    try:
        with engine.begin() as conn:
            result = conn.execute(
                text(
                    "INSERT INTO product_mapping (inquiry_name, spec, product_code, quotation_name) "
                    "VALUES (:n, :s, :c, :q) RETURNING id"
                ),
                {"n": inquiry_name, "s": spec, "c": product_code, "q": quotation_name},
            )
            return result.scalar()
    except Exception as e:
        logger.warning("insert_mapping_row 失败: %s", e)
        return None


def update_mapping_row(
    row_id: int, inquiry_name: str, spec: str, product_code: str, quotation_name: str
) -> Optional[bool]:
    """成功 True；无此行 False；无库或执行异常 None。"""
    engine = _get_engine()
    if engine is None:
        return None
    try:
        with engine.begin() as conn:
            result = conn.execute(
                text(
                    "UPDATE product_mapping SET inquiry_name=:n, spec=:s, product_code=:c, "
                    "quotation_name=:q, updated_at=NOW() WHERE id=:id"
                ),
                {"n": inquiry_name, "s": spec, "c": product_code, "q": quotation_name, "id": row_id},
            )
        return result.rowcount > 0
    except Exception as e:
        logger.warning("update_mapping_row 失败: %s", e)
        return None


def delete_mapping_row(row_id: int) -> Optional[bool]:
    """删除成功 True；无此行 False；无库或执行异常 None。"""
    engine = _get_engine()
    if engine is None:
        return None
    try:
        with engine.begin() as conn:
            result = conn.execute(text("DELETE FROM product_mapping WHERE id=:id"), {"id": row_id})
        return result.rowcount > 0
    except Exception as e:
        logger.warning("delete_mapping_row 失败: %s", e)
        return None


def replace_all_product_mapping(rows: list[dict]) -> int:
    engine = _get_engine()
    if engine is None:
        return 0
    try:
        with engine.begin() as conn:
            conn.execute(text("TRUNCATE TABLE product_mapping RESTART IDENTITY"))
            count = 0
            for r in rows:
                conn.execute(
                    text(
                        "INSERT INTO product_mapping (inquiry_name, spec, product_code, quotation_name) "
                        "VALUES (:n, :s, :c, :q)"
                    ),
                    {
                        "n": r.get("inquiry_name", ""),
                        "s": r.get("spec", ""),
                        "c": r.get("product_code", ""),
                        "q": r.get("quotation_name", ""),
                    },
                )
                count += 1
        return count
    except Exception as e:
        logger.warning("replace_all_product_mapping 失败: %s", e)
        return 0
