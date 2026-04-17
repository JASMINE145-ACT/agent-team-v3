"""
price_library / product_mapping 表的 SQLAlchemy CRUD。
DATABASE_URL 未配置时所有操作返回空/失败。
"""

from __future__ import annotations

import logging
import os
import json
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
    """建表（若不存在）。启动时调用一次，按顺序执行 001/002 migration。"""
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
        # 002: data_libraries
        mig2 = Path(__file__).resolve().parent / "migrations" / "002_create_data_libraries.sql"
        try:
            with engine.begin() as conn:
                if mig2.is_file():
                    _run_migration_sql(conn, mig2)
        except Exception as e:
            logger.warning("002 migration 失败: %s", e)
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


def _is_undefined_table_error(exc: BaseException) -> bool:
    """True when PostgreSQL reports undefined_table (42P01), including wrapped SQLAlchemy/driver errors."""
    cur: Optional[BaseException] = exc
    seen: set[int] = set()
    while cur is not None and id(cur) not in seen:
        seen.add(id(cur))
        pgcode = getattr(cur, "pgcode", None)
        if pgcode == "42P01":
            return True
        nxt = getattr(cur, "orig", None)
        if nxt is None:
            nxt = getattr(cur, "__cause__", None)
        cur = nxt if isinstance(nxt, BaseException) else None
    # Fallback for drivers/locales that omit pgcode on the outer exception
    msg = str(exc).lower()
    if "does not exist" in msg:
        return True
    if "undefinedtable" in msg.replace(" ", ""):
        return True
    return False


def _make_table_slug(name: str) -> str:
    """Derive a stable SQL identifier fragment from display name (ASCII word chars only)."""
    slug = re.sub(r"[^\w]", "_", name, flags=re.ASCII)
    slug = re.sub(r"_+", "_", slug).strip("_").lower()
    # Empty slug must not become "lib_" + "" (would yield dl_{id}_lib_ and confuse metadata vs. older tables).
    if not slug:
        slug = "lib"
    elif slug[0].isdigit():
        slug = "lib_" + slug
    slug = (slug[:32]).rstrip("_") or "lib"
    return slug


def _sql_col(name: str) -> str:
    return '"' + name.replace('"', '""') + '"'


def _safe_table_name(table_name: str) -> str:
    tn = (table_name or "").strip()
    if not re.fullmatch(r"[A-Za-z_][A-Za-z0-9_]*", tn):
        raise ValueError("invalid table name")
    return tn


def list_libraries() -> list[dict]:
    engine = _get_engine()
    if engine is None:
        return []
    try:
        with engine.connect() as conn:
            rows = conn.execute(
                text(
                    "SELECT id, name, table_name, columns, row_count, created_at "
                    "FROM data_libraries ORDER BY id"
                )
            ).mappings().all()
        return [
            {
                **dict(r),
                "columns": r["columns"] if isinstance(r["columns"], list) else json.loads(r["columns"] or "[]"),
                "created_at": str(r["created_at"]),
            }
            for r in rows
        ]
    except Exception as e:
        logger.warning("list_libraries 失败: %s", e)
        return []


def create_library_and_insert(name: str, columns: list[dict], rows: list[list]) -> Optional[int]:
    engine = _get_engine()
    if engine is None:
        return None
    slug = _make_table_slug(name)
    try:
        with engine.begin() as conn:
            lib_id = conn.execute(
                text(
                    "INSERT INTO data_libraries (name, table_name, columns, row_count) "
                    "VALUES (:name, :tn, CAST(:cols AS jsonb), 0) RETURNING id"
                ),
                {"name": name, "tn": "__placeholder__", "cols": json.dumps(columns, ensure_ascii=False)},
            ).scalar()
            if lib_id is None:
                return None

            table_name = _safe_table_name(f"dl_{lib_id}_{slug}")
            conn.execute(
                text("UPDATE data_libraries SET table_name=:tn WHERE id=:id"),
                {"tn": table_name, "id": lib_id},
            )

            col_defs = ", ".join(
                f'{_sql_col(c["name"])} {"NUMERIC" if c["type"] == "NUMERIC" else "TEXT"}'
                for c in columns
            )
            conn.execute(text(f"CREATE TABLE {table_name} (id SERIAL PRIMARY KEY, _row_index INT, {col_defs})"))

            if rows:
                col_names_sql = ", ".join(_sql_col(c["name"]) for c in columns)
                placeholders = ", ".join(f":v{i}" for i in range(len(columns)))
                insert_sql = (
                    f"INSERT INTO {table_name} (_row_index, {col_names_sql}) VALUES (:ridx, {placeholders})"
                )
                for ridx, row in enumerate(rows):
                    params: dict[str, Any] = {"ridx": ridx}
                    for ci, col in enumerate(columns):
                        val = row[ci] if ci < len(row) else None
                        if col["type"] == "NUMERIC":
                            try:
                                params[f"v{ci}"] = (
                                    float(str(val).replace(",", ""))
                                    if val is not None and str(val).strip() != ""
                                    else None
                                )
                            except (ValueError, TypeError):
                                params[f"v{ci}"] = None
                        else:
                            params[f"v{ci}"] = str(val) if val is not None else ""
                    conn.execute(text(insert_sql), params)

            conn.execute(
                text("UPDATE data_libraries SET row_count=:cnt, updated_at=NOW() WHERE id=:id"),
                {"cnt": len(rows), "id": lib_id},
            )
        return int(lib_id)
    except Exception as e:
        logger.warning("create_library_and_insert 失败: %s", e)
        return None


def update_library_display_name(lib_id: int, name: str) -> Optional[bool]:
    """Update only the human-readable name; physical table_name is unchanged."""
    engine = _get_engine()
    if engine is None:
        return None
    nm = (name or "").strip()
    if not nm:
        return False
    try:
        with engine.begin() as conn:
            result = conn.execute(
                text("UPDATE data_libraries SET name=:name, updated_at=NOW() WHERE id=:id"),
                {"name": nm, "id": lib_id},
            )
            return result.rowcount > 0
    except Exception as e:
        logger.warning("update_library_display_name 失败: %s", e)
        return None


def try_repair_library_table_name(lib_id: int, meta: Optional[dict] = None) -> Optional[str]:
    """If metadata points at a missing table but exactly one dl_{id}_* exists, fix data_libraries.table_name."""
    if meta is None:
        meta = get_library_meta(lib_id)
    if meta is None:
        return None
    engine = _get_engine()
    if engine is None:
        return None
    current = (meta.get("table_name") or "").strip()
    prefix = f"dl_{lib_id}_"
    try:
        with engine.begin() as conn:
            exists = conn.execute(
                text(
                    "SELECT EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = :tn)"
                ),
                {"tn": current},
            ).scalar()
            if exists:
                return None
            rows = conn.execute(
                text(
                    "SELECT tablename FROM pg_tables WHERE schemaname = 'public' "
                    "AND tablename LIKE :prefix ORDER BY tablename"
                ),
                {"prefix": prefix + "%"},
            ).fetchall()
            if len(rows) != 1:
                logger.warning(
                    "try_repair_library_table_name: id=%s 无法自动修复（匹配表数量=%s）",
                    lib_id,
                    len(rows),
                )
                return None
            fixed = rows[0][0]
            conn.execute(
                text("UPDATE data_libraries SET table_name=:tn, updated_at=NOW() WHERE id=:id"),
                {"tn": fixed, "id": lib_id},
            )
            logger.info("已修复库 %s 的 table_name: %s -> %s", lib_id, current, fixed)
            return str(fixed)
    except Exception as e:
        logger.warning("try_repair_library_table_name 失败: %s", e)
        return None


def resolve_library_meta(lib_id: int) -> Optional[dict]:
    """Load library row from data_libraries and repair stale table_name when uniquely resolvable."""
    meta = get_library_meta(lib_id)
    if meta is None:
        return None
    fixed = try_repair_library_table_name(lib_id, meta=meta)
    if fixed:
        return get_library_meta(lib_id)
    return meta


def get_library_meta(lib_id: int) -> Optional[dict]:
    engine = _get_engine()
    if engine is None:
        return None
    try:
        with engine.connect() as conn:
            row = conn.execute(
                text("SELECT id, name, table_name, columns, row_count FROM data_libraries WHERE id=:id"),
                {"id": lib_id},
            ).mappings().first()
        if row is None:
            return None
        return {
            **dict(row),
            "columns": row["columns"] if isinstance(row["columns"], list) else json.loads(row["columns"] or "[]"),
        }
    except Exception as e:
        logger.warning("get_library_meta 失败: %s", e)
        return None


def fetch_library_data(
    table_name: str,
    columns: list[dict],
    q: str = "",
    page: int = 1,
    page_size: int = 100,
    *,
    lib_id: Optional[int] = None,
) -> dict:
    engine = _get_engine()
    if engine is None:
        return {"items": [], "total": 0}
    offset = (page - 1) * page_size
    q = (q or "").strip()
    text_cols = [c["name"] for c in columns if c["type"] == "TEXT"]
    tn = (table_name or "").strip()
    for attempt in range(2):
        try:
            safe_table = _safe_table_name(tn)
            with engine.connect() as conn:
                if q and text_cols:
                    conditions = " OR ".join(f'{_sql_col(c)} ILIKE :q' for c in text_cols)
                    where = f"WHERE {conditions}"
                    total = conn.execute(
                        text(f"SELECT COUNT(*) FROM {safe_table} {where}"),
                        {"q": f"%{q}%"},
                    ).scalar() or 0
                    rows = conn.execute(
                        text(f"SELECT * FROM {safe_table} {where} ORDER BY id LIMIT :lim OFFSET :off"),
                        {"q": f"%{q}%", "lim": page_size, "off": offset},
                    ).mappings().all()
                else:
                    total = conn.execute(text(f"SELECT COUNT(*) FROM {safe_table}")).scalar() or 0
                    rows = conn.execute(
                        text(f"SELECT * FROM {safe_table} ORDER BY id LIMIT :lim OFFSET :off"),
                        {"lim": page_size, "off": offset},
                    ).mappings().all()
            return {"items": [dict(r) for r in rows], "total": int(total)}
        except Exception as e:
            missing_rel = _is_undefined_table_error(e)
            if attempt == 0 and lib_id is not None and missing_rel:
                fixed = try_repair_library_table_name(lib_id)
                if fixed:
                    tn = fixed
                    continue
            logger.warning("fetch_library_data 失败: %s", e)
            return {"items": [], "total": 0}
    logger.warning("fetch_library_data 失败: 重试后仍失败")
    return {"items": [], "total": 0}


def insert_library_row(table_name: str, columns: list[dict], data: dict) -> Optional[int]:
    engine = _get_engine()
    if engine is None:
        return None
    try:
        safe_table = _safe_table_name(table_name)
        col_names_sql = ", ".join(_sql_col(c["name"]) for c in columns)
        placeholders = ", ".join(f":v{i}" for i in range(len(columns)))
        params: dict[str, Any] = {}
        for i, col in enumerate(columns):
            val = data.get(col["name"])
            if col["type"] == "NUMERIC":
                try:
                    params[f"v{i}"] = float(val) if val is not None and str(val).strip() != "" else None
                except (ValueError, TypeError):
                    params[f"v{i}"] = None
            else:
                params[f"v{i}"] = str(val) if val is not None else ""
        with engine.begin() as conn:
            max_idx = conn.execute(text(f"SELECT COALESCE(MAX(_row_index),0) FROM {safe_table}")).scalar() or 0
            params["ridx"] = int(max_idx) + 1
            result = conn.execute(
                text(
                    f"INSERT INTO {safe_table} (_row_index, {col_names_sql}) "
                    f"VALUES (:ridx, {placeholders}) RETURNING id"
                ),
                params,
            )
            return result.scalar()
    except Exception as e:
        logger.warning("insert_library_row 失败: %s", e)
        return None


def update_library_row(table_name: str, columns: list[dict], row_id: int, data: dict) -> Optional[bool]:
    engine = _get_engine()
    if engine is None:
        return None
    try:
        safe_table = _safe_table_name(table_name)
        set_clauses = ", ".join(f'{_sql_col(c["name"])}=:v{i}' for i, c in enumerate(columns))
        params: dict[str, Any] = {"id": row_id}
        for i, col in enumerate(columns):
            val = data.get(col["name"])
            if col["type"] == "NUMERIC":
                try:
                    params[f"v{i}"] = float(val) if val is not None and str(val).strip() != "" else None
                except (ValueError, TypeError):
                    params[f"v{i}"] = None
            else:
                params[f"v{i}"] = str(val) if val is not None else ""
        with engine.begin() as conn:
            result = conn.execute(
                text(f"UPDATE {safe_table} SET {set_clauses} WHERE id=:id"),
                params,
            )
            return result.rowcount > 0
    except Exception as e:
        logger.warning("update_library_row 失败: %s", e)
        return None


def delete_library_row(table_name: str, row_id: int) -> Optional[bool]:
    engine = _get_engine()
    if engine is None:
        return None
    try:
        safe_table = _safe_table_name(table_name)
        with engine.begin() as conn:
            result = conn.execute(text(f"DELETE FROM {safe_table} WHERE id=:id"), {"id": row_id})
            return result.rowcount > 0
    except Exception as e:
        logger.warning("delete_library_row 失败: %s", e)
        return None


def drop_library(lib_id: int, table_name: str) -> Optional[bool]:
    engine = _get_engine()
    if engine is None:
        return None
    try:
        safe_table = _safe_table_name(table_name)
        with engine.begin() as conn:
            conn.execute(text(f"DROP TABLE IF EXISTS {safe_table}"))
            result = conn.execute(text("DELETE FROM data_libraries WHERE id=:id"), {"id": lib_id})
        return result.rowcount > 0
    except Exception as e:
        logger.warning("drop_library 失败: %s", e)
        return None
