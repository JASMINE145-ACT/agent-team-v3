# Database Guidelines

> Database patterns and conventions for Agent Team version3.

---

## Overview

| Item | Value |
|------|-------|
| ORM | SQLAlchemy 2.x (`create_engine`, `text`) |
| Driver | `psycopg2` (PostgreSQL) |
| Connection | `DATABASE_URL` env var — Neon PostgreSQL `sslmode=require` |
| Migration | Raw SQL files in `backend/tools/admin/migrations/` |
| No ORM migration tool | Manual SQL; `setup_tables()` called once at startup |
| `DATABASE_URL` not set | All DB functions return empty results / `None` (graceful degradation) |

---

## Connection Management

```python
# repository.py — singleton engine pattern
_DATABASE_URL: str = os.getenv("DATABASE_URL", "")
_engine: Optional[Engine] = None

def _get_engine() -> Optional[Engine]:
    global _engine
    if not _DATABASE_URL:
        return None          # graceful: no DB = no crash
    if _engine is not None:
        return _engine
    _engine = create_engine(_DATABASE_URL, pool_pre_ping=True)
    return _engine
```

**Key rule**: Every public function checks `engine is None` and returns empty result, never raises.

---

## Neon Production Tables

> These are the **actual tables** in the Neon `neondb` database. Schema verified 2026-04-21.

### 1. 万鼎价格库_管材与国标管件_标准格式

| Column | Type | Nullable | Meaning |
|--------|------|----------|---------|
| `NO` | numeric | YES | Row sequence number — **no `id` column, use this for ORDER BY** |
| `Material` | numeric | YES | **Material code** (NOT product name; stored as numeric code) |
| `Describrition` | text | YES | Product description (Chinese) |
| `Describrition_English` | text | YES | English description |
| `INCLUDE_TAX_出厂价_含税` | text | YES | Factory price incl. tax (display) |
| `EXCLUDE_TAX_出厂价_不含税` | numeric | YES | Factory price excl. tax |
| `采购不含税` | numeric | YES | Purchase price excl. tax |
| `（二级代理）A级别_利润率` | numeric | YES | Level A profit rate |
| `（二级代理）A级别_报单价格` | numeric | YES | Level A quoted price |
| `（一级代理）B级别_利润率` | numeric | YES | Level B profit rate |
| `（一级代理）B级别_报单价格` | numeric | YES | Level B quoted price |
| `（聚万大客户）C级别_利润率` | numeric | YES | Level C profit rate |
| `（聚万大客户）C级别报单价格` | numeric | YES | Level C quoted price |
| `（青山大客户）D级别_利润率` | numeric | YES | Level D profit rate |
| `（青山大客户）D级别_报单价格` | numeric | YES | Level D quoted price |
| `（青山大客户）D级别_降低利润率` | numeric | YES | Level D reduced profit rate |
| `（青山大客户）D级别_报单价格_2` | numeric | YES | Level D quoted price #2 |
| `（大唐大客户）E级别（包运费）_利润率` | numeric | YES | Level E profit rate (shipping incl.) |
| `（大唐大客户）E级别包运费）_报单价格` | numeric | YES | Level E quoted price |
| `col_20` | text | YES | (unused) |
| `相关体积` | numeric | YES | Related volume |
| `%` | numeric | YES | Percentage |
| `EXC_TAX` | numeric | YES | Excl. tax |
| `INC_TAX` | numeric | YES | Incl. tax |

**排序字段**: `NO`（numeric）
**用途**: 价格查询、选型匹配

### 2. 整理产品(2)

| Column | Type | Nullable | Meaning |
|--------|------|----------|---------|
| `Nama_Permintaan_Barang_询价货物名称` | text | YES | Inquiry product name |
| `Spesifikasi_dan_Model_Permintaan_Barang_询价规格型号` | text | YES | Inquiry spec & model |
| `Product_number_产品编号` | numeric | YES | Product number — **no `id` column, use this for ORDER BY** |
| `Nama_Penawaran_Barang_报价名称` | text | YES | Quotation product name |
| `col_5` | text | YES | (unused) |

**排序字段**: `Product_number_产品编号`（numeric）
**用途**: 产品名称映射、规格匹配

### 3. business_knowledge

> 业务知识主存（LLM 选型规则），从本地 MD 迁移至此。本地文件 + 内嵌常量为 fallback。

| Column | Type | Nullable | Meaning |
|--------|------|----------|---------|
| `id` | SERIAL | NO | Primary key |
| `key` | TEXT | NO | 逻辑键名，如 `wanding_selector` |
| `content` | TEXT | NO | 知识内容（IF/THEN 规则等） |
| `source` | TEXT | YES | 来源：`共同` / `历史报价` / `字段匹配` 等 |
| `created_at` | TIMESTAMPTZ | YES | 创建时间 |
| `updated_at` | TIMESTAMPTZ | YES | 更新时间 |

**唯一索引**: `UNIQUE(key)`
**用途**: LLM 选型推理、业务规则持久化、纠错学习

**读取优先级**: Neon (`business_knowledge`) → 本地文件 → 内嵌常量

---

## Identifier Quoting Rules

Chinese/Unicode table names and column names **must be double-quoted** in SQL:

```python
def _quote_sql_identifier(name: str) -> str:
    """Double-quote for use as SQL identifier. Handles Unicode, parentheses, spaces."""
    return '"' + name.replace('"', '""') + '"'

# Usage:
sql = f'SELECT {_quote_sql_identifier("NO")} FROM {_quote_sql_identifier("万鼎价格库_管材与国标管件_标准格式")}'
```

ASCII-safe names (`[A-Za-z_][A-Za-z0-9_]*`) may be used bare. Anything else (Chinese, spaces, parentheses) **must** be quoted.

**Never** do this:
```python
text(f"SELECT NO FROM 万鼎价格库_管材与国标管件_标准格式")  # WRONG
```

---

## Table Name Resolution

`data_libraries` is a **metadata table** that maps logical library names to physical PostgreSQL table names:

```sql
CREATE TABLE data_libraries (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,          -- human-readable display name
    table_name  TEXT NOT NULL,          -- physical PostgreSQL table name (may be slug like dl_1_lib_)
    columns     JSONB,                  -- column definitions [{name, type}]
    row_count   INTEGER,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

The `table_name` field may contain **old slugs** (e.g., `dl_2_lib_`, `dl_3_lib_2`) that differ from the current display name. Use `resolve_library_meta(lib_id)` to repair stale table names automatically.

---

## Query Patterns

### Always use parameterized queries (never f-string interpolation):

```python
# ✅ Correct
conn.execute(text("SELECT * FROM tbl WHERE col ILIKE :q"), {"q": f"%{keyword}%"})

# ❌ Wrong (SQL injection risk)
conn.execute(text(f"SELECT * FROM tbl WHERE col ILIKE '%{keyword}%'"))
```

### Always use `mappings().all()` for dict results:

```python
rows = conn.execute(text("SELECT col1, col2 FROM tbl")).mappings().all()
return [dict(r) for r in rows]
```

### Always handle NULL engine gracefully:

```python
def fetch_all_price_library() -> list[dict]:
    engine = _get_engine()
    if engine is None:
        return []          # never raise
    try:
        with engine.connect() as conn:
            rows = conn.execute(...).mappings().all()
            return [dict(r) for r in rows]
    except Exception as e:
        logger.warning("fetch_all_price_library 失败: %s", e)
        return []
```

---

## Migrations

Migrations are raw `.sql` files in `backend/tools/admin/migrations/`, executed in lexicographic order at startup via `setup_tables()`.

```python
def _run_migration_sql(conn, sql_path: Path) -> None:
    raw = sql_path.read_text(encoding="utf-8")
    stripped = re.sub(r"--[^\n]*", "", raw)          # strip comments
    parts = [p.strip() for p in re.split(r";\s*", stripped) if p.strip()]
    for part in parts:
        conn.execute(text(part + ";"))
```

Naming convention: `001_create_price_tables.sql`, `002_create_data_libraries.sql`, etc.

---

## Naming Conventions

| Object | Convention | Example |
|--------|-----------|---------|
| Table (physical) | `dl_{id}_{slug}` or Unicode quoted | `dl_1_lib_管材` |
| Table (display) | Chinese with parentheses | `万鼎价格库_管材与国标管件_标准格式` |
| Column | ASCII or Unicode quoted | `NO`, `"（二级代理）A级别_报单价格"` |
| Index | `idx_{table}_{column}` | `idx_price_library_description_gin` |

---

## Common Mistakes

1. **Forgetting to quote Chinese column names** → `psycopg2.errors.UndefinedColumn`
2. **Using `ORDER BY id` on a table without `id` column** → `psycopg2.errors.UndefinedColumn`
3. **`DATABASE_URL` contains special chars** (e.g., `#` in password) → parse error. Use URL-encoded values.
4. **Stale `table_name` in `data_libraries`** → query returns 0 rows silently. Use `resolve_library_meta()`.
5. **`pool_pre_ping=True`** is required for Neon serverless (connections may go stale).
6. **Excel null 列不占位** → Excel 第 20 列为 null（空），但 COPY 每行必须有 `len(neon_cols)` 个字段，空列也必须映射到 `col_20`，否则后续列全部错位 1 位。
7. **COPY 格式用 TEXT 而非 CSV** → `FORMAT CSV` 对 `\t` 分隔符处理行为不同（空串被当字面值），改用 `FORMAT TEXT, DELIMITER E'\\t'`。
8. **NULL '' 需显式声明** → COPY 时空串不会自动变 NULL，必须加 `NULL ''` 选项。
9. **Neon `information_schema.columns` 查询返回乱码列名** → 用 `psycopg2` 直接查询时列名显示为乱码，但实际表结构正常；用位置映射（0-based index）代替字符串匹配更可靠。
10. **跳过脏数据** → Excel 的 `Material` 列有 19 行含字符串代码（如 `GPR-PP04C03009`），而 Neon 该列为 `numeric`，上传时需 `try: float(val)` 过滤。
11. **中文列名 psycopg2 参数绑定失效** → `:列名` 风格的 SQLAlchemy 参数绑定不支持中文列名；COPY 绕过此限制。

## Excel → Neon 价格库上传流程

**脚本**: `scripts/upload_price_library_to_neon.py`

**关键步骤**：
1. `openpyxl` 读 Excel，`read_only=True, data_only=True` 避免格式问题
2. `EXCEL_INDEX_TO_NEON_COL` 用 **位置索引**（0-based）映射，不依赖列名字符串匹配
3. Excel 第 20 列为 null → 必须映射到 Neon `col_20`（占位不错位）
4. `ALTER TABLE ADD COLUMN IF NOT EXISTS "Product_Type" TEXT`（如有则跳过）
5. `DELETE FROM table` 清空旧数据
6. `COPY ... FROM STDIN WITH (FORMAT TEXT, DELIMITER E'\\t', NULL '')` 批量导入
7. 跳过 Material 非数字的行（`float(val)` 过滤）
8. 验证：`COUNT(*)`、`Product_Type` 分布、前 3 行采样

**已知限制**：
- 19 行 Material 含字符串代码被跳过（需人工处理）
- Excel 列 `INCLUDE TAX\n出厂价_含税`（index=5）在 Neon 中对应 `INCLUDE_TAX_出厂价_含税`，为空值时 COPY 写空串 → `NULL ''` 转 NULL

## business_knowledge 同步

**表**: `business_knowledge`（key / content / updated_at）

**同步原则**：本地 MD 文件为 source of truth，Neon 为主存储（供运行时直接读）。修改本地 MD 后需手动推送到 Neon。

**推送脚本**：
```python
import psycopg2
from pathlib import Path

content = Path("backend/tools/data/wanding_business_knowledge.md").read_text(encoding="utf-8")
conn = psycopg2.connect(DATABASE_URL)
conn.set_client_encoding("UTF8")
cur = conn.cursor()
cur.execute("""
    INSERT INTO business_knowledge (key, content)
    VALUES ('wanding_selector', %s)
    ON CONFLICT (key) DO UPDATE SET content = EXCLUDED.content, updated_at = now()
""", (content,))
conn.commit()
conn.close()
```

**检查同步状态**（判断本地是否比 Neon 新）：
```python
# 1. Neon: SELECT length(content), updated_at FROM business_knowledge WHERE key = 'wanding_selector'
# 2. 本地: Path("backend/tools/data/wanding_business_knowledge.md").stat().st_mtime
# 若本地 mtime > Neon updated_at，则需推送
```

**已确认**（2026-04-23）：
- Neon `wanding_selector`: 2668 字符，`updated_at: 2026-04-23 23:20:19 UTC`
- 本地 `wanding_business_knowledge.md`: 2668 字符，`mtime: 2026-04-22 01:38:52`（Neon 已同步最新）
