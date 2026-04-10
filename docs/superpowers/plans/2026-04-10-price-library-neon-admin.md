# 价格库云端管理 (Neon Admin Panel) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将万鼎价格库和产品映射表迁移至 Neon PostgreSQL，并在 control-ui 新增受密码保护的管理页，支持网页逐行编辑和 Excel 批量上传。

**Architecture:** 新建 `backend/tools/admin/` 包（repository / auth / excel_parser / cache），通过 `/api/admin/*` 路由暴露 CRUD + 上传接口；前端新增 `admin-data` Tab（Lit Web Component 风格，与现有 OOS Tab 一致）；Matcher 读取改走内存缓存，缓存来源优先 Neon，降级读本地 xlsx。

**Tech Stack:** FastAPI, SQLAlchemy (psycopg2), openpyxl, pandas, Lit + TypeScript

---

## 文件变更清单

**新建（后端）：**
- `backend/tools/admin/__init__.py`
- `backend/tools/admin/repository.py` — DB 建表 + CRUD
- `backend/tools/admin/auth.py` — token 管理
- `backend/tools/admin/excel_parser.py` — Excel → dict 列表
- `backend/tools/admin/cache.py` — 内存缓存（DB rows）
- `backend/server/api/routes_admin.py` — 所有 /api/admin/* 路由

**修改（后端）：**
- `backend/server/api/app.py` — 注册 admin router，启动时建表
- `backend/tools/inventory/services/wanding_fuzzy_matcher.py` — 加 `invalidate_wanding_cache()` + DB-aware `_get_cached_df()`
- `backend/tools/inventory/services/mapping_table_matcher.py` — 加 `invalidate_mapping_cache()` + DB-aware `load_mapping_df()`
- `backend/.env.example` — 补充 `ADMIN_PASSWORD`

**新建（前端）：**
- `control-ui/src/ui/controllers/admin-data.ts` — API 调用 + 状态
- `control-ui/src/ui/views/admin-data.ts` — UI 渲染

**修改（前端）：**
- `control-ui/src/ui/navigation.ts` — 注册 `admin-data` Tab
- `control-ui/src/ui/app-view-state.ts` — 添加 admin 状态字段
- `control-ui/src/ui/app-render.ts` — 渲染 admin-data Tab

---

## Task 1: 后端 — 数据库层（repository + migration）

**Files:**
- Create: `backend/tools/admin/__init__.py`
- Create: `backend/tools/admin/repository.py`

- [ ] **Step 1: 建 package init**

```python
# backend/tools/admin/__init__.py
```

- [ ] **Step 2: 写 repository.py**

```python
# backend/tools/admin/repository.py
"""
price_library / product_mapping 表的 SQLAlchemy CRUD。
DATABASE_URL 未配置时所有操作静默返回空/None。
"""
from __future__ import annotations

import logging
import os
from typing import Optional

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


def setup_tables() -> None:
    """建表（若不存在）。启动时调用一次。"""
    engine = _get_engine()
    if engine is None:
        return
    try:
        with engine.begin() as conn:
            conn.execute(text("""
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
            """))
            conn.execute(text("""
                CREATE TABLE IF NOT EXISTS product_mapping (
                    id              SERIAL PRIMARY KEY,
                    inquiry_name    TEXT NOT NULL DEFAULT '',
                    spec            TEXT DEFAULT '',
                    product_code    TEXT NOT NULL DEFAULT '',
                    quotation_name  TEXT DEFAULT '',
                    updated_at      TIMESTAMPTZ DEFAULT NOW()
                )
            """))
        logger.info("Admin tables ready.")
    except Exception as e:
        logger.warning("建表失败: %s", e)


# ---- price_library ----

def fetch_price_library(q: str = "", page: int = 1, page_size: int = 100) -> dict:
    """分页查询，返回 {items: [...], total: int}。"""
    engine = _get_engine()
    if engine is None:
        return {"items": [], "total": 0}
    offset = (page - 1) * page_size
    try:
        with engine.connect() as conn:
            where = "WHERE material ILIKE :q OR description ILIKE :q" if q else ""
            params: dict = {"q": f"%{q}%", "limit": page_size, "offset": offset}
            total = conn.execute(
                text(f"SELECT COUNT(*) FROM price_library {where}"),
                params if q else {},
            ).scalar() or 0
            rows = conn.execute(
                text(f"SELECT id, material, description, price_a, price_b, price_c, price_d FROM price_library {where} ORDER BY id LIMIT :limit OFFSET :offset"),
                params if q else {"limit": page_size, "offset": offset},
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
                text("SELECT material, description, price_a, price_b, price_c, price_d FROM price_library ORDER BY id")
            ).mappings().all()
            return [dict(r) for r in rows]
    except Exception as e:
        logger.warning("fetch_all_price_library 失败: %s", e)
        return []


def insert_price_row(material: str, description: str, price_a, price_b, price_c, price_d) -> Optional[int]:
    engine = _get_engine()
    if engine is None:
        return None
    try:
        with engine.begin() as conn:
            result = conn.execute(
                text("INSERT INTO price_library (material, description, price_a, price_b, price_c, price_d) VALUES (:m, :d, :a, :b, :c, :dd) RETURNING id"),
                {"m": material, "d": description, "a": price_a, "b": price_b, "c": price_c, "dd": price_d},
            )
            return result.scalar()
    except Exception as e:
        logger.warning("insert_price_row 失败: %s", e)
        return None


def update_price_row(row_id: int, material: str, description: str, price_a, price_b, price_c, price_d) -> bool:
    engine = _get_engine()
    if engine is None:
        return False
    try:
        with engine.begin() as conn:
            conn.execute(
                text("UPDATE price_library SET material=:m, description=:d, price_a=:a, price_b=:b, price_c=:c, price_d=:dd, updated_at=NOW() WHERE id=:id"),
                {"m": material, "d": description, "a": price_a, "b": price_b, "c": price_c, "dd": price_d, "id": row_id},
            )
        return True
    except Exception as e:
        logger.warning("update_price_row 失败: %s", e)
        return False


def delete_price_row(row_id: int) -> bool:
    engine = _get_engine()
    if engine is None:
        return False
    try:
        with engine.begin() as conn:
            conn.execute(text("DELETE FROM price_library WHERE id=:id"), {"id": row_id})
        return True
    except Exception as e:
        logger.warning("delete_price_row 失败: %s", e)
        return False


def replace_all_price_library(rows: list[dict]) -> int:
    """全表替换（TRUNCATE + INSERT）。rows 为 excel_parser 输出。返回插入行数。"""
    engine = _get_engine()
    if engine is None:
        return 0
    try:
        with engine.begin() as conn:
            conn.execute(text("TRUNCATE TABLE price_library RESTART IDENTITY"))
            count = 0
            for r in rows:
                conn.execute(
                    text("INSERT INTO price_library (material, description, price_a, price_b, price_c, price_d) VALUES (:m, :d, :a, :b, :c, :dd)"),
                    {"m": r.get("material", ""), "d": r.get("description", ""), "a": r.get("price_a"), "b": r.get("price_b"), "c": r.get("price_c"), "dd": r.get("price_d")},
                )
                count += 1
        return count
    except Exception as e:
        logger.warning("replace_all_price_library 失败: %s", e)
        return 0


# ---- product_mapping ----

def fetch_product_mapping(q: str = "", page: int = 1, page_size: int = 100) -> dict:
    engine = _get_engine()
    if engine is None:
        return {"items": [], "total": 0}
    offset = (page - 1) * page_size
    try:
        with engine.connect() as conn:
            where = "WHERE inquiry_name ILIKE :q OR product_code ILIKE :q OR quotation_name ILIKE :q" if q else ""
            params: dict = {"q": f"%{q}%", "limit": page_size, "offset": offset}
            total = conn.execute(
                text(f"SELECT COUNT(*) FROM product_mapping {where}"),
                params if q else {},
            ).scalar() or 0
            rows = conn.execute(
                text(f"SELECT id, inquiry_name, spec, product_code, quotation_name FROM product_mapping {where} ORDER BY id LIMIT :limit OFFSET :offset"),
                params if q else {"limit": page_size, "offset": offset},
            ).mappings().all()
            return {"items": [dict(r) for r in rows], "total": int(total)}
    except Exception as e:
        logger.warning("fetch_product_mapping 失败: %s", e)
        return {"items": [], "total": 0}


def fetch_all_product_mapping() -> list[dict]:
    """全量拉取（供 Matcher 缓存用）。"""
    engine = _get_engine()
    if engine is None:
        return []
    try:
        with engine.connect() as conn:
            rows = conn.execute(
                text("SELECT inquiry_name, spec, product_code, quotation_name FROM product_mapping ORDER BY id")
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
                text("INSERT INTO product_mapping (inquiry_name, spec, product_code, quotation_name) VALUES (:n, :s, :c, :q) RETURNING id"),
                {"n": inquiry_name, "s": spec, "c": product_code, "q": quotation_name},
            )
            return result.scalar()
    except Exception as e:
        logger.warning("insert_mapping_row 失败: %s", e)
        return None


def update_mapping_row(row_id: int, inquiry_name: str, spec: str, product_code: str, quotation_name: str) -> bool:
    engine = _get_engine()
    if engine is None:
        return False
    try:
        with engine.begin() as conn:
            conn.execute(
                text("UPDATE product_mapping SET inquiry_name=:n, spec=:s, product_code=:c, quotation_name=:q, updated_at=NOW() WHERE id=:id"),
                {"n": inquiry_name, "s": spec, "c": product_code, "q": quotation_name, "id": row_id},
            )
        return True
    except Exception as e:
        logger.warning("update_mapping_row 失败: %s", e)
        return False


def delete_mapping_row(row_id: int) -> bool:
    engine = _get_engine()
    if engine is None:
        return False
    try:
        with engine.begin() as conn:
            conn.execute(text("DELETE FROM product_mapping WHERE id=:id"), {"id": row_id})
        return True
    except Exception as e:
        logger.warning("delete_mapping_row 失败: %s", e)
        return False


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
                    text("INSERT INTO product_mapping (inquiry_name, spec, product_code, quotation_name) VALUES (:n, :s, :c, :q)"),
                    {"n": r.get("inquiry_name", ""), "s": r.get("spec", ""), "c": r.get("product_code", ""), "q": r.get("quotation_name", "")},
                )
                count += 1
        return count
    except Exception as e:
        logger.warning("replace_all_product_mapping 失败: %s", e)
        return 0
```

- [ ] **Step 3: 确认 psycopg2 依赖已在 requirements.txt 中**

```bash
cd "Agent Team version3"
grep -i psycopg requirements.txt
```

如果没有，添加：`psycopg2-binary>=2.9` 到 requirements.txt（检查 OOS 模块已有则跳过）。

- [ ] **Step 4: Commit**

```bash
git add backend/tools/admin/
git commit -m "feat(admin): add DB repository for price_library and product_mapping"
```

---

## Task 2: 后端 — 认证模块（auth.py）

**Files:**
- Create: `backend/tools/admin/auth.py`

- [ ] **Step 1: 写 auth.py**

```python
# backend/tools/admin/auth.py
"""
简单 token 认证：固定密码 → 随机 UUID token，内存存储，TTL 4 小时。
ADMIN_PASSWORD 未配置时，所有操作返回 False / None（功能禁用）。
"""
from __future__ import annotations

import os
import secrets
import time
from typing import Optional

_ADMIN_PASSWORD: str = os.getenv("ADMIN_PASSWORD", "")
_TOKEN_TTL = 4 * 3600  # 4 小时（秒）

# token -> expires_at (unix timestamp)
_tokens: dict[str, float] = {}


def is_enabled() -> bool:
    return bool(_ADMIN_PASSWORD)


def verify_password(password: str) -> Optional[str]:
    """密码正确则生成并返回 token，否则返回 None。"""
    if not _ADMIN_PASSWORD:
        return None
    if password != _ADMIN_PASSWORD:
        return None
    token = secrets.token_hex(32)
    _tokens[token] = time.time() + _TOKEN_TTL
    _cleanup_expired()
    return token


def verify_token(token: str) -> bool:
    """token 有效返回 True，否则 False。"""
    if not token:
        return False
    exp = _tokens.get(token)
    if exp is None:
        return False
    if time.time() > exp:
        del _tokens[token]
        return False
    return True


def _cleanup_expired() -> None:
    now = time.time()
    expired = [t for t, exp in _tokens.items() if now > exp]
    for t in expired:
        del _tokens[t]
```

- [ ] **Step 2: Commit**

```bash
git add backend/tools/admin/auth.py
git commit -m "feat(admin): add token auth module"
```

---

## Task 3: 后端 — Excel 解析器（excel_parser.py）

**Files:**
- Create: `backend/tools/admin/excel_parser.py`

- [ ] **Step 1: 写 excel_parser.py**

```python
# backend/tools/admin/excel_parser.py
"""
将上传的 Excel bytes 解析为 dict 列表。
price_library：读「管材」sheet（C 列描述，B 列料号，I/J/K/L 列 A/B/C/D 档价格，0-indexed: 8/10/12/14）。
product_mapping：读第一个 sheet，列 A=询价名称 B=规格 C=产品编号 D=报价名称。
"""
from __future__ import annotations

import io
import logging
from typing import Any

logger = logging.getLogger(__name__)

# 万鼎价格库列索引（0-based）
_COL_MATERIAL = 1      # B 列
_COL_DESC = 2          # C 列
_COL_PRICE_A = 8       # I 列
_COL_PRICE_B = 10      # K 列
_COL_PRICE_C = 12      # M 列
_COL_PRICE_D = 14      # O 列


def _safe_float(v: Any) -> Any:
    if v is None:
        return None
    try:
        return float(v)
    except (ValueError, TypeError):
        return None


def _val(v: Any) -> str:
    if v is None:
        return ""
    return str(v).strip()


def parse_price_library(content: bytes) -> list[dict]:
    """解析万鼎价格库 xlsx bytes，返回 [{material, description, price_a, price_b, price_c, price_d}]。"""
    try:
        import openpyxl
    except ImportError:
        raise RuntimeError("openpyxl 未安装")

    wb = openpyxl.load_workbook(io.BytesIO(content), read_only=True, data_only=True)
    rows: list[dict] = []

    def _load_sheet(ws):
        for i, row in enumerate(ws.iter_rows(max_col=16)):
            if i == 0:
                continue  # 跳过表头
            cells = [None] * 16
            for col_idx, c in enumerate(row):
                if col_idx < 16:
                    cells[col_idx] = getattr(c, "value", None)
            material = _val(cells[_COL_MATERIAL]) if len(cells) > _COL_MATERIAL else ""
            desc = _val(cells[_COL_DESC]) if len(cells) > _COL_DESC else ""
            if not material and not desc:
                continue
            rows.append({
                "material": material,
                "description": desc,
                "price_a": _safe_float(cells[_COL_PRICE_A]) if len(cells) > _COL_PRICE_A else None,
                "price_b": _safe_float(cells[_COL_PRICE_B]) if len(cells) > _COL_PRICE_B else None,
                "price_c": _safe_float(cells[_COL_PRICE_C]) if len(cells) > _COL_PRICE_C else None,
                "price_d": _safe_float(cells[_COL_PRICE_D]) if len(cells) > _COL_PRICE_D else None,
            })

    ws_main = wb["管材"] if "管材" in wb.sheetnames else (wb.active or wb[wb.sheetnames[0]])
    _load_sheet(ws_main)
    if "国标管件" in wb.sheetnames:
        _load_sheet(wb["国标管件"])
    wb.close()
    logger.info("parse_price_library: %d rows", len(rows))
    return rows


def parse_product_mapping(content: bytes) -> list[dict]:
    """解析产品映射表 xlsx bytes，返回 [{inquiry_name, spec, product_code, quotation_name}]。"""
    try:
        import openpyxl
    except ImportError:
        raise RuntimeError("openpyxl 未安装")

    wb = openpyxl.load_workbook(io.BytesIO(content), read_only=True, data_only=True)
    ws = wb.active or wb[wb.sheetnames[0]]
    rows: list[dict] = []
    for i, row in enumerate(ws.iter_rows(max_col=4, min_row=2)):
        cells = [getattr(c, "value", None) for c in row]
        if len(cells) < 3:
            continue
        product_code = _val(cells[2]) if len(cells) > 2 else ""
        if not product_code:
            continue
        rows.append({
            "inquiry_name": _val(cells[0]),
            "spec": _val(cells[1]) if len(cells) > 1 else "",
            "product_code": product_code,
            "quotation_name": _val(cells[3]) if len(cells) > 3 else "",
        })
    wb.close()
    logger.info("parse_product_mapping: %d rows", len(rows))
    return rows
```

- [ ] **Step 2: Commit**

```bash
git add backend/tools/admin/excel_parser.py
git commit -m "feat(admin): add Excel parser for price_library and product_mapping"
```

---

## Task 4: 后端 — 内存缓存层（cache.py）

**Files:**
- Create: `backend/tools/admin/cache.py`

- [ ] **Step 1: 写 cache.py**

```python
# backend/tools/admin/cache.py
"""
内存缓存：从 Neon 加载 price_library / product_mapping 全量行，供 Matcher 使用。
invalidate_*() 清除缓存并通知 Matcher 模块同步清除其 DataFrame 缓存。
"""
from __future__ import annotations

import logging
import threading
from typing import Optional

from backend.tools.admin import repository

logger = logging.getLogger(__name__)

_price_rows: Optional[list[dict]] = None
_mapping_rows: Optional[list[dict]] = None
_price_lock = threading.Lock()
_mapping_lock = threading.Lock()


def get_price_library_rows() -> list[dict]:
    """从缓存返回所有价格库行（DB rows）。空列表说明 DB 不可用或表为空。"""
    global _price_rows
    if _price_rows is not None:
        return _price_rows
    with _price_lock:
        if _price_rows is None:
            _price_rows = repository.fetch_all_price_library()
            logger.info("admin cache: loaded %d price_library rows from DB", len(_price_rows))
    return _price_rows or []


def get_product_mapping_rows() -> list[dict]:
    """从缓存返回所有映射表行（DB rows）。"""
    global _mapping_rows
    if _mapping_rows is not None:
        return _mapping_rows
    with _mapping_lock:
        if _mapping_rows is None:
            _mapping_rows = repository.fetch_all_product_mapping()
            logger.info("admin cache: loaded %d product_mapping rows from DB", len(_mapping_rows))
    return _mapping_rows or []


def invalidate_price_library() -> None:
    """清除价格库缓存（上传/修改后调用）。同时清除 Matcher DataFrame 缓存。"""
    global _price_rows
    with _price_lock:
        _price_rows = None
    try:
        from backend.tools.inventory.services.wanding_fuzzy_matcher import invalidate_wanding_cache
        invalidate_wanding_cache()
    except Exception as e:
        logger.warning("invalidate wanding cache 失败: %s", e)
    logger.info("admin cache: price_library invalidated")


def invalidate_product_mapping() -> None:
    """清除映射表缓存（上传/修改后调用）。同时清除 Matcher DataFrame 缓存。"""
    global _mapping_rows
    with _mapping_lock:
        _mapping_rows = None
    try:
        from backend.tools.inventory.services.mapping_table_matcher import invalidate_mapping_cache
        invalidate_mapping_cache()
    except Exception as e:
        logger.warning("invalidate mapping cache 失败: %s", e)
    logger.info("admin cache: product_mapping invalidated")
```

- [ ] **Step 2: Commit**

```bash
git add backend/tools/admin/cache.py
git commit -m "feat(admin): add in-memory cache layer for DB rows"
```

---

## Task 5: 后端 — Matcher 改造（加 invalidate + DB-aware 加载）

**Files:**
- Modify: `backend/tools/inventory/services/wanding_fuzzy_matcher.py`
- Modify: `backend/tools/inventory/services/mapping_table_matcher.py`

### 5A: wanding_fuzzy_matcher.py

- [ ] **Step 1: 在 wanding_fuzzy_matcher.py 的 `invalidate_wanding_cache()` 函数**

在文件末尾的 `_df_cache` / `_full_df_cache` 附近（约 700 行附近）添加：

```python
def invalidate_wanding_cache() -> None:
    """清除所有万鼎 DataFrame 缓存（admin 上传新数据后调用）。"""
    global _full_df_cache
    with _df_cache_lock:
        _df_cache.clear()
    with _full_df_lock:
        _full_df_cache = None
    logger.info("wanding_fuzzy_matcher: DataFrame caches cleared")
```

- [ ] **Step 2: 修改 `_get_cached_df()` 优先走 DB**

将现有 `_get_cached_df()` 函数（约 705 行）替换为：

```python
def _get_cached_df(path, customer_level: str) -> pd.DataFrame:
    """线程安全地获取 DataFrame。优先从 admin DB 缓存加载，DB 空则读本地 xlsx。"""
    level = _normalize_price_level(customer_level)
    cache_key = f"{path}:{level}"
    if cache_key in _df_cache:
        return _df_cache[cache_key]
    with _df_cache_lock:
        if cache_key not in _df_cache:
            df = _try_load_from_db(level)
            if df is None:
                df = load_wanding_df(path, customer_level=level)
            _df_cache[cache_key] = df
    return _df_cache[cache_key]


def _try_load_from_db(level: str) -> "pd.DataFrame | None":
    """从 admin cache 拉 DB rows 转换为 DataFrame。DB 空/不可用返回 None。"""
    try:
        from backend.tools.admin.cache import get_price_library_rows
        rows = get_price_library_rows()
        if not rows:
            return None
        price_col_key = level  # e.g. "B"
        price_field = f"price_{price_col_key.lower()}"
        records = []
        for r in rows:
            records.append({
                "Material": r.get("material", ""),
                "Describrition": r.get("description", ""),
                "unit_price": float(r.get(price_field) or 0),
            })
        df = pd.DataFrame(records)
        if not df.empty:
            df["norm_text"] = df["Describrition"].apply(_normalize)
            df["spec_tokens"] = df["Describrition"].apply(
                lambda t: frozenset(tok for tok in _split_tokens(t) if re.search(r"\d", tok))
            )
        logger.info("wanding_fuzzy_matcher: loaded %d rows from DB cache (level=%s)", len(df), level)
        return df
    except Exception as e:
        logger.warning("_try_load_from_db 失败，将 fallback 读 xlsx: %s", e)
        return None
```

### 5B: mapping_table_matcher.py

- [ ] **Step 3: 在 mapping_table_matcher.py 添加 `invalidate_mapping_cache()` 和 DB-aware `load_mapping_df()`**

在文件顶部 `_MAPPING_DF_CACHE` 附近添加 invalidate 函数：

```python
def invalidate_mapping_cache() -> None:
    """清除映射表 DataFrame 缓存（admin 上传新数据后调用）。"""
    global _MAPPING_DF_CACHE, _MAPPING_DF_PATH
    with _MAPPING_CACHE_LOCK:
        _MAPPING_DF_CACHE = None
        _MAPPING_DF_PATH = None
    logger.info("mapping_table_matcher: cache cleared")
```

在 `load_mapping_df()` 函数开头（在现有 double-check 逻辑之前）插入 DB 优先检查：

```python
def load_mapping_df(path: str | Path) -> pd.DataFrame:
    global _MAPPING_DF_CACHE, _MAPPING_DF_PATH
    path_str = str(path)
    if _MAPPING_DF_CACHE is not None and _MAPPING_DF_PATH == path_str:
        return _MAPPING_DF_CACHE

    with _MAPPING_CACHE_LOCK:
        if _MAPPING_DF_CACHE is not None and _MAPPING_DF_PATH == path_str:
            return _MAPPING_DF_CACHE

        # 优先从 DB 加载
        db_df = _try_load_mapping_from_db()
        if db_df is not None:
            _MAPPING_DF_CACHE = db_df
            _MAPPING_DF_PATH = path_str
            return _MAPPING_DF_CACHE

        # fallback：读本地 xlsx（以下为原有逻辑，保持不变）
        # ... [原有 openpyxl 读取逻辑不变] ...
```

并在同文件添加辅助函数：

```python
def _try_load_mapping_from_db() -> "pd.DataFrame | None":
    """从 admin cache 拉 DB rows 转换为映射表 DataFrame。DB 空/不可用返回 None。"""
    try:
        from backend.tools.admin.cache import get_product_mapping_rows
        rows = get_product_mapping_rows()
        if not rows:
            return None
        records = []
        for r in rows:
            field_name = r.get("inquiry_name", "")
            spec = r.get("spec", "") or ""
            code = r.get("product_code", "")
            matched_name = r.get("quotation_name", "") or ""
            if not code:
                continue
            search_text = f"{field_name} {spec}".strip() if spec else field_name
            records.append({"search_text": search_text, "code": code, "matched_name": matched_name})
        if not records:
            return None
        df = pd.DataFrame(records)
        df["norm_text"] = df["search_text"].apply(_normalize)
        df["spec_tokens"] = df["search_text"].apply(
            lambda t: frozenset(tok for tok in _split_tokens(t) if re.search(r"\d", tok))
        )
        logger.info("mapping_table_matcher: loaded %d rows from DB cache", len(df))
        return df
    except Exception as e:
        logger.warning("_try_load_mapping_from_db 失败，将 fallback 读 xlsx: %s", e)
        return None
```

- [ ] **Step 4: Commit**

```bash
git add backend/tools/inventory/services/wanding_fuzzy_matcher.py
git add backend/tools/inventory/services/mapping_table_matcher.py
git commit -m "feat(admin): add DB-aware loading and invalidate hooks to matchers"
```

---

## Task 6: 后端 — Admin API 路由（routes_admin.py）

**Files:**
- Create: `backend/server/api/routes_admin.py`

- [ ] **Step 1: 写 routes_admin.py**

```python
# backend/server/api/routes_admin.py
"""
价格库/产品映射表管理 API。
所有路由（/login 除外）需要 X-Admin-Token header。
ADMIN_PASSWORD 未配置时返回 503。
"""
from __future__ import annotations

import logging
from typing import Any, Dict, Optional

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from fastapi.security import APIKeyHeader
from pydantic import BaseModel

from backend.tools.admin import auth, repository
from backend.tools.admin import cache as admin_cache
from backend.tools.admin.excel_parser import parse_price_library, parse_product_mapping

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/admin", tags=["admin"])

_token_header = APIKeyHeader(name="X-Admin-Token", auto_error=False)


def _require_enabled():
    if not auth.is_enabled():
        raise HTTPException(status_code=503, detail="管理功能未启用（ADMIN_PASSWORD 未配置）")


def _require_auth(token: Optional[str] = Depends(_token_header)):
    _require_enabled()
    if not auth.verify_token(token or ""):
        raise HTTPException(status_code=401, detail="无效或已过期的 token，请重新登录")


# ---- Auth ----

class LoginRequest(BaseModel):
    password: str


@router.post("/login")
async def admin_login(body: LoginRequest):
    _require_enabled()
    token = auth.verify_password(body.password)
    if token is None:
        raise HTTPException(status_code=401, detail="密码错误")
    return {"token": token}


# ---- Price Library ----

class PriceRow(BaseModel):
    material: str = ""
    description: str = ""
    price_a: Optional[float] = None
    price_b: Optional[float] = None
    price_c: Optional[float] = None
    price_d: Optional[float] = None


@router.get("/price-library")
async def list_price_library(
    q: str = "",
    page: int = 1,
    page_size: int = 100,
    _: None = Depends(_require_auth),
):
    return repository.fetch_price_library(q=q, page=page, page_size=page_size)


@router.post("/price-library")
async def create_price_row(body: PriceRow, _: None = Depends(_require_auth)):
    row_id = repository.insert_price_row(
        body.material, body.description, body.price_a, body.price_b, body.price_c, body.price_d
    )
    if row_id is None:
        raise HTTPException(status_code=503, detail="DB 不可用")
    admin_cache.invalidate_price_library()
    return {"id": row_id}


@router.put("/price-library/{row_id}")
async def update_price_row(row_id: int, body: PriceRow, _: None = Depends(_require_auth)):
    ok = repository.update_price_row(
        row_id, body.material, body.description, body.price_a, body.price_b, body.price_c, body.price_d
    )
    if not ok:
        raise HTTPException(status_code=503, detail="更新失败")
    admin_cache.invalidate_price_library()
    return {"ok": True}


@router.delete("/price-library/{row_id}")
async def delete_price_row(row_id: int, _: None = Depends(_require_auth)):
    ok = repository.delete_price_row(row_id)
    if not ok:
        raise HTTPException(status_code=503, detail="删除失败")
    admin_cache.invalidate_price_library()
    return {"ok": True}


@router.post("/price-library/upload")
async def upload_price_library(
    file: UploadFile = File(...),
    _: None = Depends(_require_auth),
):
    content = await file.read()
    try:
        rows = parse_price_library(content)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Excel 解析失败: {e}")
    count = repository.replace_all_price_library(rows)
    admin_cache.invalidate_price_library()
    return {"imported": count}


# ---- Product Mapping ----

class MappingRow(BaseModel):
    inquiry_name: str = ""
    spec: str = ""
    product_code: str = ""
    quotation_name: str = ""


@router.get("/product-mapping")
async def list_product_mapping(
    q: str = "",
    page: int = 1,
    page_size: int = 100,
    _: None = Depends(_require_auth),
):
    return repository.fetch_product_mapping(q=q, page=page, page_size=page_size)


@router.post("/product-mapping")
async def create_mapping_row(body: MappingRow, _: None = Depends(_require_auth)):
    row_id = repository.insert_mapping_row(
        body.inquiry_name, body.spec, body.product_code, body.quotation_name
    )
    if row_id is None:
        raise HTTPException(status_code=503, detail="DB 不可用")
    admin_cache.invalidate_product_mapping()
    return {"id": row_id}


@router.put("/product-mapping/{row_id}")
async def update_mapping_row(row_id: int, body: MappingRow, _: None = Depends(_require_auth)):
    ok = repository.update_mapping_row(
        row_id, body.inquiry_name, body.spec, body.product_code, body.quotation_name
    )
    if not ok:
        raise HTTPException(status_code=503, detail="更新失败")
    admin_cache.invalidate_product_mapping()
    return {"ok": True}


@router.delete("/product-mapping/{row_id}")
async def delete_mapping_row(row_id: int, _: None = Depends(_require_auth)):
    ok = repository.delete_mapping_row(row_id)
    if not ok:
        raise HTTPException(status_code=503, detail="删除失败")
    admin_cache.invalidate_product_mapping()
    return {"ok": True}


@router.post("/product-mapping/upload")
async def upload_product_mapping(
    file: UploadFile = File(...),
    _: None = Depends(_require_auth),
):
    content = await file.read()
    try:
        rows = parse_product_mapping(content)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Excel 解析失败: {e}")
    count = repository.replace_all_product_mapping(rows)
    admin_cache.invalidate_product_mapping()
    return {"imported": count}
```

- [ ] **Step 2: Commit**

```bash
git add backend/server/api/routes_admin.py
git commit -m "feat(admin): add admin API routes for price-library and product-mapping"
```

---

## Task 7: 后端 — 注册路由 + 启动建表（app.py）

**Files:**
- Modify: `backend/server/api/app.py`

- [ ] **Step 1: 在 app.py 顶部 import 部分末尾添加**

```python
from backend.server.api.routes_admin import router as admin_router
from backend.tools.admin.repository import setup_tables
```

- [ ] **Step 2: 在 `app.include_router(wecom_router)` 下方添加**

```python
app.include_router(admin_router)
```

- [ ] **Step 3: 在 app.py 的 `startup` 事件或直接在模块级建表**

在 `app = FastAPI(...)` 之后、路由注册之前添加：

```python
@app.on_event("startup")
async def _startup():
    setup_tables()
```

- [ ] **Step 4: 更新 .env.example**

在 `backend/.env.example`（或项目根 `.env.example`）末尾添加：

```env
# 价格库管理页密码（设置后才启用 /api/admin/* 路由，不设则管理功能禁用）
ADMIN_PASSWORD=
```

- [ ] **Step 5: Commit**

```bash
git add backend/server/api/app.py backend/.env.example
git commit -m "feat(admin): register admin router and auto-setup tables on startup"
```

---

## Task 8: 前端 — 类型 + 控制器（admin-data.ts controller）

**Files:**
- Create: `control-ui/src/ui/controllers/admin-data.ts`

- [ ] **Step 1: 写 controller**

```typescript
// control-ui/src/ui/controllers/admin-data.ts

export type PriceRow = {
  id?: number;
  material: string;
  description: string;
  price_a: number | null;
  price_b: number | null;
  price_c: number | null;
  price_d: number | null;
};

export type MappingRow = {
  id?: number;
  inquiry_name: string;
  spec: string;
  product_code: string;
  quotation_name: string;
};

export type AdminDataState = {
  token: string | null;
  loginError: string | null;
  loginLoading: boolean;
  activeSubTab: "price" | "mapping";
  // price library
  priceItems: PriceRow[];
  priceTotal: number;
  pricePage: number;
  pricePageSize: number;
  priceQuery: string;
  priceLoading: boolean;
  priceError: string | null;
  priceUploading: boolean;
  // product mapping
  mappingItems: MappingRow[];
  mappingTotal: number;
  mappingPage: number;
  mappingPageSize: number;
  mappingQuery: string;
  mappingLoading: boolean;
  mappingError: string | null;
  mappingUploading: boolean;
};

export function initialAdminDataState(): AdminDataState {
  const stored = sessionStorage.getItem("admin_token");
  return {
    token: stored,
    loginError: null,
    loginLoading: false,
    activeSubTab: "price",
    priceItems: [], priceTotal: 0, pricePage: 1, pricePageSize: 100,
    priceQuery: "", priceLoading: false, priceError: null, priceUploading: false,
    mappingItems: [], mappingTotal: 0, mappingPage: 1, mappingPageSize: 100,
    mappingQuery: "", mappingLoading: false, mappingError: null, mappingUploading: false,
  };
}

function authHeaders(token: string) {
  return { "X-Admin-Token": token, "Content-Type": "application/json" };
}

export async function adminLogin(state: AdminDataState, basePath: string, password: string): Promise<void> {
  state.loginLoading = true;
  state.loginError = null;
  try {
    const res = await fetch(`${basePath}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      state.loginError = data.detail || "登录失败";
      return;
    }
    const data = await res.json();
    state.token = data.token;
    sessionStorage.setItem("admin_token", data.token);
  } catch (e) {
    state.loginError = String(e);
  } finally {
    state.loginLoading = false;
  }
}

export function adminLogout(state: AdminDataState): void {
  state.token = null;
  sessionStorage.removeItem("admin_token");
}

export async function loadPriceLibrary(state: AdminDataState, basePath: string): Promise<void> {
  if (!state.token) return;
  state.priceLoading = true;
  state.priceError = null;
  try {
    const params = new URLSearchParams({
      q: state.priceQuery,
      page: String(state.pricePage),
      page_size: String(state.pricePageSize),
    });
    const res = await fetch(`${basePath}/api/admin/price-library?${params}`, {
      headers: authHeaders(state.token),
    });
    if (res.status === 401) { adminLogout(state); return; }
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    state.priceItems = data.items;
    state.priceTotal = data.total;
  } catch (e) {
    state.priceError = String(e);
  } finally {
    state.priceLoading = false;
  }
}

export async function savePriceRow(state: AdminDataState, basePath: string, row: PriceRow): Promise<boolean> {
  if (!state.token) return false;
  const isNew = !row.id;
  const url = isNew
    ? `${basePath}/api/admin/price-library`
    : `${basePath}/api/admin/price-library/${row.id}`;
  const res = await fetch(url, {
    method: isNew ? "POST" : "PUT",
    headers: authHeaders(state.token),
    body: JSON.stringify(row),
  });
  if (res.status === 401) { adminLogout(state); return false; }
  return res.ok;
}

export async function deletePriceRow(state: AdminDataState, basePath: string, id: number): Promise<boolean> {
  if (!state.token) return false;
  const res = await fetch(`${basePath}/api/admin/price-library/${id}`, {
    method: "DELETE",
    headers: { "X-Admin-Token": state.token },
  });
  if (res.status === 401) { adminLogout(state); return false; }
  return res.ok;
}

export async function uploadPriceLibrary(state: AdminDataState, basePath: string, file: File): Promise<{ imported: number } | null> {
  if (!state.token) return null;
  state.priceUploading = true;
  try {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(`${basePath}/api/admin/price-library/upload`, {
      method: "POST",
      headers: { "X-Admin-Token": state.token },
      body: form,
    });
    if (res.status === 401) { adminLogout(state); return null; }
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  } catch (e) {
    state.priceError = String(e);
    return null;
  } finally {
    state.priceUploading = false;
  }
}

export async function loadProductMapping(state: AdminDataState, basePath: string): Promise<void> {
  if (!state.token) return;
  state.mappingLoading = true;
  state.mappingError = null;
  try {
    const params = new URLSearchParams({
      q: state.mappingQuery,
      page: String(state.mappingPage),
      page_size: String(state.mappingPageSize),
    });
    const res = await fetch(`${basePath}/api/admin/product-mapping?${params}`, {
      headers: authHeaders(state.token),
    });
    if (res.status === 401) { adminLogout(state); return; }
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    state.mappingItems = data.items;
    state.mappingTotal = data.total;
  } catch (e) {
    state.mappingError = String(e);
  } finally {
    state.mappingLoading = false;
  }
}

export async function saveMappingRow(state: AdminDataState, basePath: string, row: MappingRow): Promise<boolean> {
  if (!state.token) return false;
  const isNew = !row.id;
  const url = isNew
    ? `${basePath}/api/admin/product-mapping`
    : `${basePath}/api/admin/product-mapping/${row.id}`;
  const res = await fetch(url, {
    method: isNew ? "POST" : "PUT",
    headers: authHeaders(state.token),
    body: JSON.stringify(row),
  });
  if (res.status === 401) { adminLogout(state); return false; }
  return res.ok;
}

export async function deleteMappingRow(state: AdminDataState, basePath: string, id: number): Promise<boolean> {
  if (!state.token) return false;
  const res = await fetch(`${basePath}/api/admin/product-mapping/${id}`, {
    method: "DELETE",
    headers: { "X-Admin-Token": state.token },
  });
  if (res.status === 401) { adminLogout(state); return false; }
  return res.ok;
}

export async function uploadProductMapping(state: AdminDataState, basePath: string, file: File): Promise<{ imported: number } | null> {
  if (!state.token) return null;
  state.mappingUploading = true;
  try {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(`${basePath}/api/admin/product-mapping/upload`, {
      method: "POST",
      headers: { "X-Admin-Token": state.token },
      body: form,
    });
    if (res.status === 401) { adminLogout(state); return null; }
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  } catch (e) {
    state.mappingError = String(e);
    return null;
  } finally {
    state.mappingUploading = false;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add control-ui/src/ui/controllers/admin-data.ts
git commit -m "feat(admin-ui): add admin data controller with API calls"
```

---

## Task 9: 前端 — Admin View（views/admin-data.ts）

**Files:**
- Create: `control-ui/src/ui/views/admin-data.ts`

- [ ] **Step 1: 写 admin-data.ts view**

```typescript
// control-ui/src/ui/views/admin-data.ts
import { html, nothing } from "lit";
import type { AdminDataState, PriceRow, MappingRow } from "../controllers/admin-data.ts";

export type AdminDataProps = {
  basePath: string;
  state: AdminDataState;
  onLogin: (password: string) => void;
  onLogout: () => void;
  onSubTabChange: (tab: "price" | "mapping") => void;
  onPriceRefresh: () => void;
  onPriceQueryChange: (q: string) => void;
  onPriceSave: (row: PriceRow) => void;
  onPriceDelete: (id: number) => void;
  onPriceUpload: (file: File) => void;
  onMappingRefresh: () => void;
  onMappingQueryChange: (q: string) => void;
  onMappingSave: (row: MappingRow) => void;
  onMappingDelete: (id: number) => void;
  onMappingUpload: (file: File) => void;
};

function renderLoginView(props: AdminDataProps) {
  let pw = "";
  return html`
    <div style="max-width:320px;margin:80px auto;padding:24px;background:var(--surface-2,#1e1e2e);border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.3)">
      <h2 style="margin:0 0 20px;font-size:1.1rem;color:var(--text-1,#cdd6f4)">数据管理 — 登录</h2>
      <input
        type="password"
        placeholder="管理员密码"
        style="width:100%;box-sizing:border-box;padding:10px 12px;border-radius:8px;border:1px solid var(--border,#45475a);background:var(--surface-1,#181825);color:var(--text-1,#cdd6f4);font-size:0.95rem"
        @input=${(e: Event) => { pw = (e.target as HTMLInputElement).value; }}
        @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter") props.onLogin(pw); }}
      />
      ${props.state.loginError ? html`<p style="color:#f38ba8;font-size:0.85rem;margin:8px 0 0">${props.state.loginError}</p>` : nothing}
      <button
        style="margin-top:14px;width:100%;padding:10px;border-radius:8px;border:none;background:#89b4fa;color:#1e1e2e;font-weight:600;cursor:pointer;font-size:0.95rem"
        @click=${() => props.onLogin(pw)}
        ?disabled=${props.state.loginLoading}
      >${props.state.loginLoading ? "登录中…" : "登录"}</button>
    </div>
  `;
}

function renderUploadButton(label: string, onUpload: (f: File) => void, uploading: boolean) {
  return html`
    <label style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:8px;border:1px solid var(--border,#45475a);cursor:pointer;font-size:0.85rem;color:var(--text-1,#cdd6f4)">
      <input type="file" accept=".xlsx" style="display:none"
        @change=${(e: Event) => {
          const f = (e.target as HTMLInputElement).files?.[0];
          if (f) onUpload(f);
          (e.target as HTMLInputElement).value = "";
        }}
      />
      ${uploading ? "上传中…" : label}
    </label>
  `;
}

function renderPriceTable(props: AdminDataProps) {
  const s = props.state;
  const cols = ["料号", "描述", "A价", "B价", "C价", "D价", "操作"];

  function rowHtml(row: PriceRow) {
    const editing = { ...row };
    return html`
      <tr>
        ${(["material", "description"] as const).map(f => html`
          <td contenteditable="true"
            style="padding:6px 8px;border-bottom:1px solid var(--border,#313244);min-width:80px;outline:none"
            @blur=${(e: Event) => { (editing as any)[f] = (e.target as HTMLElement).innerText.trim(); }}
          >${(row as any)[f]}</td>
        `)}
        ${(["price_a", "price_b", "price_c", "price_d"] as const).map(f => html`
          <td contenteditable="true"
            style="padding:6px 8px;border-bottom:1px solid var(--border,#313244);width:60px;text-align:right;outline:none"
            @blur=${(e: Event) => {
              const v = parseFloat((e.target as HTMLElement).innerText.trim());
              (editing as any)[f] = isNaN(v) ? null : v;
            }}
          >${(row as any)[f] ?? ""}</td>
        `)}
        <td style="padding:6px 8px;border-bottom:1px solid var(--border,#313244);white-space:nowrap">
          <button style="padding:3px 10px;border-radius:6px;border:none;background:#a6e3a1;color:#1e1e2e;cursor:pointer;font-size:0.8rem;margin-right:4px"
            @click=${() => props.onPriceSave(editing)}>保存</button>
          <button style="padding:3px 10px;border-radius:6px;border:none;background:#f38ba8;color:#1e1e2e;cursor:pointer;font-size:0.8rem"
            @click=${() => { if (confirm("确认删除？")) props.onPriceDelete(row.id!); }}>删除</button>
        </td>
      </tr>
    `;
  }

  return html`
    <div>
      <div style="display:flex;gap:10px;align-items:center;margin-bottom:12px;flex-wrap:wrap">
        <input type="search" placeholder="搜索料号/描述" value=${s.priceQuery}
          style="padding:7px 12px;border-radius:8px;border:1px solid var(--border,#45475a);background:var(--surface-1,#181825);color:var(--text-1,#cdd6f4);flex:1;min-width:160px"
          @input=${(e: Event) => props.onPriceQueryChange((e.target as HTMLInputElement).value)}
        />
        <button style="padding:7px 14px;border-radius:8px;border:1px solid var(--border,#45475a);background:transparent;color:var(--text-1,#cdd6f4);cursor:pointer"
          @click=${props.onPriceRefresh}>刷新</button>
        ${renderUploadButton("📥 上传 Excel（全表替换）", props.onPriceUpload, s.priceUploading)}
      </div>
      ${s.priceError ? html`<p style="color:#f38ba8">${s.priceError}</p>` : nothing}
      ${s.priceLoading ? html`<p style="color:var(--text-2,#a6adc8)">加载中…</p>` : nothing}
      <div style="overflow-x:auto">
        <table style="width:100%;border-collapse:collapse;font-size:0.85rem;color:var(--text-1,#cdd6f4)">
          <thead>
            <tr>${cols.map(c => html`<th style="padding:8px;text-align:left;border-bottom:2px solid var(--border,#45475a);white-space:nowrap">${c}</th>`)}</tr>
          </thead>
          <tbody>
            ${s.priceItems.map(rowHtml)}
          </tbody>
        </table>
      </div>
      <p style="font-size:0.8rem;color:var(--text-2,#a6adc8);margin-top:8px">共 ${s.priceTotal} 行</p>
    </div>
  `;
}

function renderMappingTable(props: AdminDataProps) {
  const s = props.state;
  const cols = ["询价名称", "规格", "产品编号", "报价名称", "操作"];

  function rowHtml(row: MappingRow) {
    const editing = { ...row };
    return html`
      <tr>
        ${(["inquiry_name", "spec", "product_code", "quotation_name"] as const).map(f => html`
          <td contenteditable="true"
            style="padding:6px 8px;border-bottom:1px solid var(--border,#313244);min-width:80px;outline:none"
            @blur=${(e: Event) => { (editing as any)[f] = (e.target as HTMLElement).innerText.trim(); }}
          >${(row as any)[f]}</td>
        `)}
        <td style="padding:6px 8px;border-bottom:1px solid var(--border,#313244);white-space:nowrap">
          <button style="padding:3px 10px;border-radius:6px;border:none;background:#a6e3a1;color:#1e1e2e;cursor:pointer;font-size:0.8rem;margin-right:4px"
            @click=${() => props.onMappingSave(editing)}>保存</button>
          <button style="padding:3px 10px;border-radius:6px;border:none;background:#f38ba8;color:#1e1e2e;cursor:pointer;font-size:0.8rem"
            @click=${() => { if (confirm("确认删除？")) props.onMappingDelete(row.id!); }}>删除</button>
        </td>
      </tr>
    `;
  }

  return html`
    <div>
      <div style="display:flex;gap:10px;align-items:center;margin-bottom:12px;flex-wrap:wrap">
        <input type="search" placeholder="搜索询价名称/产品编号" value=${s.mappingQuery}
          style="padding:7px 12px;border-radius:8px;border:1px solid var(--border,#45475a);background:var(--surface-1,#181825);color:var(--text-1,#cdd6f4);flex:1;min-width:160px"
          @input=${(e: Event) => props.onMappingQueryChange((e.target as HTMLInputElement).value)}
        />
        <button style="padding:7px 14px;border-radius:8px;border:1px solid var(--border,#45475a);background:transparent;color:var(--text-1,#cdd6f4);cursor:pointer"
          @click=${props.onMappingRefresh}>刷新</button>
        ${renderUploadButton("📥 上传 Excel（全表替换）", props.onMappingUpload, s.mappingUploading)}
      </div>
      ${s.mappingError ? html`<p style="color:#f38ba8">${s.mappingError}</p>` : nothing}
      ${s.mappingLoading ? html`<p style="color:var(--text-2,#a6adc8)">加载中…</p>` : nothing}
      <div style="overflow-x:auto">
        <table style="width:100%;border-collapse:collapse;font-size:0.85rem;color:var(--text-1,#cdd6f4)">
          <thead>
            <tr>${cols.map(c => html`<th style="padding:8px;text-align:left;border-bottom:2px solid var(--border,#45475a);white-space:nowrap">${c}</th>`)}</tr>
          </thead>
          <tbody>
            ${s.mappingItems.map(rowHtml)}
          </tbody>
        </table>
      </div>
      <p style="font-size:0.8rem;color:var(--text-2,#a6adc8);margin-top:8px">共 ${s.mappingTotal} 行</p>
    </div>
  `;
}

export function renderAdminData(props: AdminDataProps) {
  const s = props.state;
  if (!s.token) return renderLoginView(props);

  return html`
    <div style="padding:16px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
        <h2 style="margin:0;font-size:1rem;color:var(--text-1,#cdd6f4)">数据管理</h2>
        <button style="padding:6px 14px;border-radius:8px;border:1px solid var(--border,#45475a);background:transparent;color:var(--text-2,#a6adc8);cursor:pointer;font-size:0.85rem"
          @click=${props.onLogout}>退出登录</button>
      </div>
      <div style="display:flex;gap:0;margin-bottom:20px;border-bottom:2px solid var(--border,#45475a)">
        ${(["price", "mapping"] as const).map(tab => html`
          <button
            style="padding:8px 20px;border:none;background:transparent;cursor:pointer;font-size:0.9rem;border-bottom:${s.activeSubTab === tab ? "2px solid #89b4fa" : "2px solid transparent"};color:${s.activeSubTab === tab ? "#89b4fa" : "var(--text-2,#a6adc8)"};margin-bottom:-2px"
            @click=${() => props.onSubTabChange(tab)}
          >${tab === "price" ? "万鼎价格库" : "产品映射表"}</button>
        `)}
      </div>
      ${s.activeSubTab === "price" ? renderPriceTable(props) : renderMappingTable(props)}
    </div>
  `;
}
```

- [ ] **Step 2: Commit**

```bash
git add control-ui/src/ui/views/admin-data.ts
git commit -m "feat(admin-ui): add admin data view (login + editable tables)"
```

---

## Task 10: 前端 — 注册 Tab + 连接 app-render

**Files:**
- Modify: `control-ui/src/ui/navigation.ts`
- Modify: `control-ui/src/ui/app-view-state.ts`
- Modify: `control-ui/src/ui/app-render.ts`

### 10A: navigation.ts

- [ ] **Step 1: 在 `TAB_GROUPS` 的 settings 组添加 `"admin-data"`**

```typescript
// 修改 TAB_GROUPS，在 settings 组末尾加入
{ label: "settings", tabs: ["config", "debug", "logs", "admin-data"] },
```

- [ ] **Step 2: 在 `Tab` 类型 union 末尾添加 `| "admin-data"`**

```typescript
export type Tab = ... | "admin-data";
```

- [ ] **Step 3: 在 `TAB_PATHS` 添加**

```typescript
"admin-data": "/admin-data",
```

- [ ] **Step 4: 在 `titleForTab` 和 `subtitleForTab` 的 switch 中添加**（找到 case "logs" 附近）：

```typescript
case "admin-data":
  return "数据管理";
// subtitleForTab:
case "admin-data":
  return "价格库";
```

### 10B: app-view-state.ts

- [ ] **Step 5: 在 `AppViewState` type 末尾添加 admin 状态字段**

```typescript
// admin data
adminData: import("./controllers/admin-data.ts").AdminDataState;
```

- [ ] **Step 6: 在初始化 state 的地方（找到初始化 `AppViewState` 的函数/对象）添加**

```typescript
adminData: (await import("./controllers/admin-data.ts")).initialAdminDataState(),
```

（如果是同步初始化则直接 import 在文件顶部）

### 10C: app-render.ts

- [ ] **Step 7: 在 app-render.ts 顶部 imports 末尾添加**

```typescript
import { renderAdminData } from "./views/admin-data.ts";
import {
  adminLogin, adminLogout, loadPriceLibrary, savePriceRow, deletePriceRow, uploadPriceLibrary,
  loadProductMapping, saveMappingRow, deleteMappingRow, uploadProductMapping,
  initialAdminDataState,
} from "./controllers/admin-data.ts";
```

- [ ] **Step 8: 在 render 函数中（找到最后一个 `state.tab ===` 块附近）添加 admin-data tab 的渲染**

```typescript
${state.tab === "admin-data"
  ? renderAdminData({
      basePath: state.basePath,
      state: state.adminData,
      onLogin: async (pw) => {
        await adminLogin(state.adminData, state.basePath, pw);
        if (state.adminData.token) {
          await loadPriceLibrary(state.adminData, state.basePath);
          await loadProductMapping(state.adminData, state.basePath);
        }
        state.render();
      },
      onLogout: () => { adminLogout(state.adminData); state.render(); },
      onSubTabChange: (tab) => { state.adminData.activeSubTab = tab; state.render(); },
      onPriceRefresh: async () => { await loadPriceLibrary(state.adminData, state.basePath); state.render(); },
      onPriceQueryChange: async (q) => { state.adminData.priceQuery = q; state.adminData.pricePage = 1; await loadPriceLibrary(state.adminData, state.basePath); state.render(); },
      onPriceSave: async (row) => { await savePriceRow(state.adminData, state.basePath, row); await loadPriceLibrary(state.adminData, state.basePath); state.render(); },
      onPriceDelete: async (id) => { await deletePriceRow(state.adminData, state.basePath, id); await loadPriceLibrary(state.adminData, state.basePath); state.render(); },
      onPriceUpload: async (file) => {
        const result = await uploadPriceLibrary(state.adminData, state.basePath, file);
        if (result) alert(`导入成功：${result.imported} 行`);
        await loadPriceLibrary(state.adminData, state.basePath);
        state.render();
      },
      onMappingRefresh: async () => { await loadProductMapping(state.adminData, state.basePath); state.render(); },
      onMappingQueryChange: async (q) => { state.adminData.mappingQuery = q; state.adminData.mappingPage = 1; await loadProductMapping(state.adminData, state.basePath); state.render(); },
      onMappingSave: async (row) => { await saveMappingRow(state.adminData, state.basePath, row); await loadProductMapping(state.adminData, state.basePath); state.render(); },
      onMappingDelete: async (id) => { await deleteMappingRow(state.adminData, state.basePath, id); await loadProductMapping(state.adminData, state.basePath); state.render(); },
      onMappingUpload: async (file) => {
        const result = await uploadProductMapping(state.adminData, state.basePath, file);
        if (result) alert(`导入成功：${result.imported} 行`);
        await loadProductMapping(state.adminData, state.basePath);
        state.render();
      },
    })
  : nothing}
```

- [ ] **Step 9: 如果 tab 切换到 admin-data 时需要自动加载数据，在 tab change handler 中添加**

找到处理 tab 切换的地方，添加：
```typescript
if (newTab === "admin-data" && state.adminData.token) {
  loadPriceLibrary(state.adminData, state.basePath).then(() => state.render());
  loadProductMapping(state.adminData, state.basePath).then(() => state.render());
}
```

- [ ] **Step 10: Commit**

```bash
git add control-ui/src/ui/navigation.ts
git add control-ui/src/ui/app-view-state.ts
git add control-ui/src/ui/app-render.ts
git commit -m "feat(admin-ui): register admin-data tab in navigation and render"
```

---

## Task 11: 构建验证

- [ ] **Step 1: 构建前端**

```bash
cd "Agent Team version3/control-ui"
npm run build
```

预期：无 TypeScript 错误，`dist/` 输出正常。

- [ ] **Step 2: 启动后端验证路由**

```bash
cd "Agent Team version3"
python -c "from backend.server.api.routes_admin import router; print('OK', [r.path for r in router.routes])"
```

预期输出包含 `/api/admin/login`, `/api/admin/price-library`, `/api/admin/product-mapping`。

- [ ] **Step 3: 设置 ADMIN_PASSWORD 并测试 login API**

```bash
# Windows PowerShell
$env:ADMIN_PASSWORD="test123"
$env:DATABASE_URL="your_neon_url"
python run_backend.py
```

另开终端：
```bash
curl -X POST http://localhost:8000/api/admin/login -H "Content-Type: application/json" -d "{\"password\":\"test123\"}"
```

预期：返回 `{"token": "...64位hex字符串..."}`。

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete price library Neon admin panel (backend + frontend)"
```

---

## 备注

- 首次部署：在 Neon 控制台确认 `DATABASE_URL` 配置正确；服务启动会自动建表
- 首次使用：进入"数据管理"Tab → 登录 → 上传现有 xlsx（一键导入全部数据）
- 本地开发不设 `DATABASE_URL` 时：matcher 自动 fallback 读本地 xlsx，功能不受影响
- `ADMIN_PASSWORD` 未配置：`/api/admin/*` 返回 503，前端 Tab 显示灰色提示
