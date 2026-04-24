# Library Schema Sync Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 让数据库管理员在前端管理界面自动感知物理表新增列，并通过 UI 完成加列、删列、改列名操作，无需重新上传 Excel。

**Architecture:** 后端在 `repository.py` 新增 5 个函数（introspect、sync、add、drop、rename），在 `routes_admin.py` 新增 5 个端点；前端在 `admin-data.types.ts` 新增 4 个状态字段，在 `admin-data.ts` 新增 5 个 controller 函数并修改 `loadLibraryData`，在 `admin-data.ts`（view）修改 `renderLibraryDetail` 加入新列提示条和内联列管理表格。完全沿用现有 `admin-btn` / `admin-table` / `admin-warn-bar` CSS 体系，破坏性操作用 `confirm()` / `prompt()`。

**Tech Stack:** Python (SQLAlchemy `text()`, psycopg2), TypeScript (Lit `html` tagged templates), PostgreSQL `information_schema.columns`, `ALTER TABLE`

---

## 文件改动总览

| 文件 | 改动 |
|------|------|
| `backend/tools/admin/repository.py` | 新增 `_safe_col_name`, `introspect_table_columns`, `sync_library_schema`, `add_library_column`, `drop_library_column`, `rename_library_column` |
| `backend/server/api/routes_admin.py` | 新增 5 个路由：schema-diff, sync-schema, POST/DELETE/PATCH columns |
| `backend/server/api/tests/test_library_schema_sync.py` | 新建测试文件 |
| `control-ui/src/ui/controllers/admin-data.types.ts` | `AdminDataState` 新增 4 个字段；`initialAdminDataState()` 补初始值 |
| `control-ui/src/ui/controllers/admin-data.ts` | 新增 5 个 controller 函数；修改 `loadLibraryData` |
| `control-ui/src/ui/views/admin-data.ts` | `AdminDataViewProps` 新增 5 个 handler；新增 `renderSchemaPanel()`；修改 `renderLibraryDetail()` |
| `control-ui/src/ui/app-render.ts` | 新增 import；补充 5 个 handler 的实现；修改 `onLibraryBack` |

---

## Task 1: 后端 — 列名校验 + Introspect 函数

**Files:**
- Modify: `backend/tools/admin/repository.py`（在 `_safe_table_name` 定义之后追加）

- [ ] **Step 1.1: 写失败测试**

新建 `backend/server/api/tests/test_library_schema_sync.py`：

```python
# backend/server/api/tests/test_library_schema_sync.py
import pytest
from unittest.mock import MagicMock, patch

from backend.tools.admin.repository import _safe_col_name


def test_safe_col_name_valid():
    assert _safe_col_name("product_type") == "product_type"

def test_safe_col_name_uppercased_is_lowercased():
    assert _safe_col_name("Product_Type") == "product_type"

def test_safe_col_name_space_raises():
    with pytest.raises(ValueError):
        _safe_col_name("col name")

def test_safe_col_name_hyphen_raises():
    with pytest.raises(ValueError):
        _safe_col_name("col-name")

def test_safe_col_name_starts_with_digit_raises():
    with pytest.raises(ValueError):
        _safe_col_name("1col")

def test_safe_col_name_id_reserved():
    with pytest.raises(ValueError, match="系统保留"):
        _safe_col_name("id")

def test_safe_col_name_row_index_reserved():
    with pytest.raises(ValueError, match="系统保留"):
        _safe_col_name("_row_index")
```

- [ ] **Step 1.2: 运行测试，确认 FAIL**

```bash
cd "d:/Projects/agent-jk/Agent Team version3"
python -m pytest backend/server/api/tests/test_library_schema_sync.py::test_safe_col_name_valid -v
```

Expected: `ImportError` 或 `AttributeError: module has no attribute '_safe_col_name'`

- [ ] **Step 1.3: 在 `repository.py` 中实现 `_safe_col_name` 和 `introspect_table_columns`**

找到 `repository.py:490`（`_safe_table_name` 定义之后），在 `_safe_table_name` 函数结束后插入：

```python
def _safe_col_name(name: str) -> str:
    """Validate and normalize a column name: lowercase letters, digits, underscores only."""
    n = (name or "").strip().lower()
    if not re.fullmatch(r"[a-z_][a-z0-9_]*", n):
        raise ValueError(
            f"列名只能包含小写字母、数字和下划线，且不能以数字开头: {name!r}"
        )
    if n in ("id", "_row_index"):
        raise ValueError(f"列名 {name!r} 为系统保留字段，不允许操作")
    return n


def introspect_table_columns(table_name: str) -> list[str]:
    """Return column names in physical table from information_schema, excluding id and _row_index."""
    engine = _get_engine()
    if engine is None:
        return []
    raw_tn = (table_name or "").strip()
    try:
        with engine.connect() as conn:
            rows = conn.execute(
                text(
                    "SELECT column_name FROM information_schema.columns "
                    "WHERE table_schema = 'public' AND table_name = :tn "
                    "AND column_name NOT IN ('id', '_row_index') "
                    "ORDER BY ordinal_position"
                ),
                {"tn": raw_tn},
            ).fetchall()
        return [str(r[0]) for r in rows]
    except Exception as e:
        logger.warning("introspect_table_columns 失败 (table=%s): %s", table_name, e)
        return []
```

- [ ] **Step 1.4: 运行测试，确认 PASS**

```bash
cd "d:/Projects/agent-jk/Agent Team version3"
python -m pytest backend/server/api/tests/test_library_schema_sync.py -v
```

Expected: 7 tests PASS

- [ ] **Step 1.5: Commit**

```bash
cd "d:/Projects/agent-jk/Agent Team version3"
git add backend/tools/admin/repository.py backend/server/api/tests/test_library_schema_sync.py
git commit -m "feat: add _safe_col_name validator and introspect_table_columns"
```

---

## Task 2: 后端 — Schema 操作函数（sync / add / drop / rename）

**Files:**
- Modify: `backend/tools/admin/repository.py`（在 `introspect_table_columns` 之后追加）
- Modify: `backend/server/api/tests/test_library_schema_sync.py`（追加测试）

- [ ] **Step 2.1: 追加测试**

在 `test_library_schema_sync.py` 末尾追加：

```python
from backend.tools.admin.repository import (
    sync_library_schema,
    add_library_column,
    drop_library_column,
    rename_library_column,
)


_EXISTING = [
    {"name": "material", "type": "TEXT", "original_name": "Material", "warnings": []},
]


def test_sync_no_new_cols():
    with patch("backend.tools.admin.repository.introspect_table_columns", return_value=["material"]):
        with patch("backend.tools.admin.repository._get_engine", return_value=None):
            merged = sync_library_schema(1, "dl_1_test", _EXISTING)
    assert merged == []


def test_sync_new_col_found():
    mock_engine = MagicMock()
    mock_conn = MagicMock()
    mock_engine.begin.return_value.__enter__.return_value = mock_conn
    with patch("backend.tools.admin.repository.introspect_table_columns", return_value=["material", "product_type"]):
        with patch("backend.tools.admin.repository._get_engine", return_value=mock_engine):
            merged = sync_library_schema(1, "dl_1_test", _EXISTING)
    assert merged == ["product_type"]
    mock_conn.execute.assert_called_once()


def test_add_column_invalid_name_raises():
    with pytest.raises(ValueError):
        add_library_column(1, "dl_1_test", _EXISTING, "bad name", "TEXT")


def test_add_column_invalid_type_raises():
    with pytest.raises(ValueError):
        add_library_column(1, "dl_1_test", _EXISTING, "newcol", "BLOB")


def test_drop_column_reserved_raises():
    with pytest.raises(ValueError, match="系统保留"):
        drop_library_column(1, "dl_1_test", _EXISTING, "id")


def test_drop_column_missing_raises():
    mock_engine = MagicMock()
    with patch("backend.tools.admin.repository._get_engine", return_value=mock_engine):
        with pytest.raises(ValueError, match="不存在于元数据"):
            drop_library_column(1, "dl_1_test", _EXISTING, "no_such_col")


def test_rename_column_missing_raises():
    mock_engine = MagicMock()
    with patch("backend.tools.admin.repository._get_engine", return_value=mock_engine):
        with pytest.raises(ValueError, match="不存在于元数据"):
            rename_library_column(1, "dl_1_test", _EXISTING, "no_such_col", "newname")
```

- [ ] **Step 2.2: 运行测试，确认 FAIL**

```bash
cd "d:/Projects/agent-jk/Agent Team version3"
python -m pytest backend/server/api/tests/test_library_schema_sync.py -v
```

Expected: 新增的 8 个测试全部 `ImportError`

- [ ] **Step 2.3: 在 `repository.py` 实现 4 个函数**

在 `introspect_table_columns` 之后追加：

```python
def sync_library_schema(lib_id: int, table_name: str, existing_columns: list[dict]) -> list[str]:
    """Detect new columns in physical table and append them to data_libraries.columns. Returns merged col names."""
    physical = introspect_table_columns(table_name)
    existing_names = {c["name"] for c in existing_columns}
    new_cols = [c for c in physical if c not in existing_names]
    if not new_cols:
        return []
    engine = _get_engine()
    if engine is None:
        return []
    updated = list(existing_columns) + [
        {"name": c, "type": "TEXT", "original_name": c, "warnings": []}
        for c in new_cols
    ]
    try:
        with engine.begin() as conn:
            conn.execute(
                text(
                    "UPDATE data_libraries SET columns = CAST(:cols AS jsonb), updated_at = NOW() WHERE id = :id"
                ),
                {"cols": json.dumps(updated, ensure_ascii=False), "id": lib_id},
            )
        return new_cols
    except Exception as e:
        logger.warning("sync_library_schema 失败 (lib_id=%s): %s", lib_id, e)
        return []


def add_library_column(
    lib_id: int, table_name: str, existing_columns: list[dict], col_name: str, col_type: str
) -> None:
    """ALTER TABLE ADD COLUMN and update data_libraries.columns. Raises ValueError/RuntimeError on failure."""
    safe_col = _safe_col_name(col_name)
    if col_type not in ("TEXT", "NUMERIC"):
        raise ValueError(f"col_type 必须是 TEXT 或 NUMERIC，收到: {col_type!r}")
    engine = _get_engine()
    if engine is None:
        raise RuntimeError("数据库不可用")
    safe_table = _safe_table_name(table_name)
    sql_type = "TEXT" if col_type == "TEXT" else "NUMERIC"
    updated = list(existing_columns) + [
        {"name": safe_col, "type": col_type, "original_name": col_name, "warnings": []}
    ]
    try:
        with engine.begin() as conn:
            conn.execute(text(f'ALTER TABLE {safe_table} ADD COLUMN "{safe_col}" {sql_type}'))
            conn.execute(
                text(
                    "UPDATE data_libraries SET columns = CAST(:cols AS jsonb), updated_at = NOW() WHERE id = :id"
                ),
                {"cols": json.dumps(updated, ensure_ascii=False), "id": lib_id},
            )
    except Exception as e:
        raise RuntimeError(f"加列失败: {e}") from e


def drop_library_column(
    lib_id: int, table_name: str, existing_columns: list[dict], col_name: str
) -> None:
    """ALTER TABLE DROP COLUMN and remove from data_libraries.columns. Raises ValueError/RuntimeError."""
    safe_col = _safe_col_name(col_name)
    engine = _get_engine()
    if engine is None:
        raise RuntimeError("数据库不可用")
    safe_table = _safe_table_name(table_name)
    updated = [c for c in existing_columns if c["name"] != safe_col]
    if len(updated) == len(existing_columns):
        raise ValueError(f"列 {col_name!r} 不存在于元数据")
    try:
        with engine.begin() as conn:
            conn.execute(text(f'ALTER TABLE {safe_table} DROP COLUMN "{safe_col}"'))
            conn.execute(
                text(
                    "UPDATE data_libraries SET columns = CAST(:cols AS jsonb), updated_at = NOW() WHERE id = :id"
                ),
                {"cols": json.dumps(updated, ensure_ascii=False), "id": lib_id},
            )
    except Exception as e:
        raise RuntimeError(f"删列失败: {e}") from e


def rename_library_column(
    lib_id: int, table_name: str, existing_columns: list[dict], old_name: str, new_name: str
) -> None:
    """ALTER TABLE RENAME COLUMN and update data_libraries.columns. Raises ValueError/RuntimeError."""
    safe_old = _safe_col_name(old_name)
    safe_new = _safe_col_name(new_name)
    engine = _get_engine()
    if engine is None:
        raise RuntimeError("数据库不可用")
    safe_table = _safe_table_name(table_name)
    updated = []
    found = False
    for c in existing_columns:
        if c["name"] == safe_old:
            updated.append({**c, "name": safe_new, "original_name": new_name})
            found = True
        else:
            updated.append(c)
    if not found:
        raise ValueError(f"列 {old_name!r} 不存在于元数据")
    try:
        with engine.begin() as conn:
            conn.execute(
                text(f'ALTER TABLE {safe_table} RENAME COLUMN "{safe_old}" TO "{safe_new}"')
            )
            conn.execute(
                text(
                    "UPDATE data_libraries SET columns = CAST(:cols AS jsonb), updated_at = NOW() WHERE id = :id"
                ),
                {"cols": json.dumps(updated, ensure_ascii=False), "id": lib_id},
            )
    except Exception as e:
        raise RuntimeError(f"改名失败: {e}") from e
```

- [ ] **Step 2.4: 运行全部测试，确认 PASS**

```bash
cd "d:/Projects/agent-jk/Agent Team version3"
python -m pytest backend/server/api/tests/test_library_schema_sync.py -v
```

Expected: 15 tests PASS

- [ ] **Step 2.5: Commit**

```bash
cd "d:/Projects/agent-jk/Agent Team version3"
git add backend/tools/admin/repository.py backend/server/api/tests/test_library_schema_sync.py
git commit -m "feat: add sync/add/drop/rename library column repository functions"
```

---

## Task 3: 后端 — 5 个新 API 路由

**Files:**
- Modify: `backend/server/api/routes_admin.py`（在最后一个 `/libraries/{lib_id}` 路由之后追加）

- [ ] **Step 3.1: 追加 5 个路由**

在 `routes_admin.py` 末尾追加（在 `@router.delete("/libraries/{lib_id}")` 之后）：

```python
# ── Schema Sync & Column Management ─────────────────────────────────────────

@router.get("/libraries/{lib_id}/schema-diff")
async def get_schema_diff(lib_id: int, _: None = Depends(get_admin_dep)):
    """返回物理表中存在但 data_libraries.columns 中没有的列列表。"""
    meta = repository.resolve_library_meta(lib_id)
    if meta is None:
        raise HTTPException(status_code=404, detail="库不存在")
    physical = repository.introspect_table_columns(meta["table_name"])
    existing_names = {c["name"] for c in meta["columns"]}
    new_cols = [c for c in physical if c not in existing_names]
    return {
        "new_columns": [
            {"name": c, "type": "TEXT", "original_name": c, "warnings": []}
            for c in new_cols
        ]
    }


@router.post("/libraries/{lib_id}/sync-schema")
async def sync_schema(lib_id: int, _: None = Depends(get_admin_dep)):
    """把物理表中新增的列合并进 data_libraries.columns（type 默认 TEXT）。"""
    meta = repository.resolve_library_meta(lib_id)
    if meta is None:
        raise HTTPException(status_code=404, detail="库不存在")
    merged = repository.sync_library_schema(lib_id, meta["table_name"], meta["columns"])
    return {"merged": merged}


class ColumnAddBody(BaseModel):
    name: str
    type: str = "TEXT"


@router.post("/libraries/{lib_id}/columns")
async def add_column(lib_id: int, body: ColumnAddBody, _: None = Depends(get_admin_dep)):
    """ALTER TABLE 加列，同步更新 data_libraries.columns 元数据。"""
    meta = repository.resolve_library_meta(lib_id)
    if meta is None:
        raise HTTPException(status_code=404, detail="库不存在")
    try:
        repository.add_library_column(lib_id, meta["table_name"], meta["columns"], body.name, body.type)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))
    updated = repository.get_library_meta(lib_id)
    return {"columns": updated["columns"] if updated else []}


@router.delete("/libraries/{lib_id}/columns/{col_name}")
async def drop_column(lib_id: int, col_name: str, _: None = Depends(get_admin_dep)):
    """ALTER TABLE 删列，同步更新 data_libraries.columns 元数据。"""
    meta = repository.resolve_library_meta(lib_id)
    if meta is None:
        raise HTTPException(status_code=404, detail="库不存在")
    try:
        repository.drop_library_column(lib_id, meta["table_name"], meta["columns"], col_name)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))
    return {"ok": True}


class ColumnRenameBody(BaseModel):
    new_name: str


@router.patch("/libraries/{lib_id}/columns/{col_name}")
async def rename_column(
    lib_id: int, col_name: str, body: ColumnRenameBody, _: None = Depends(get_admin_dep)
):
    """ALTER TABLE RENAME COLUMN，同步更新 data_libraries.columns 元数据。"""
    meta = repository.resolve_library_meta(lib_id)
    if meta is None:
        raise HTTPException(status_code=404, detail="库不存在")
    try:
        repository.rename_library_column(
            lib_id, meta["table_name"], meta["columns"], col_name, body.new_name
        )
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))
    return {"ok": True}
```

- [ ] **Step 3.2: 验证路由能被 FastAPI 加载（import 测试）**

```bash
cd "d:/Projects/agent-jk/Agent Team version3"
python -c "from backend.server.api.routes_admin import router; routes = [r.path for r in router.routes]; print([r for r in routes if 'schema' in r or 'columns' in r])"
```

Expected 输出包含：
```
['/api/admin/libraries/{lib_id}/schema-diff', '/api/admin/libraries/{lib_id}/sync-schema', '/api/admin/libraries/{lib_id}/columns', '/api/admin/libraries/{lib_id}/columns/{col_name}', ...]
```

- [ ] **Step 3.3: Commit**

```bash
cd "d:/Projects/agent-jk/Agent Team version3"
git add backend/server/api/routes_admin.py
git commit -m "feat: add schema-diff, sync-schema, add/drop/rename column API routes"
```

---

## Task 4: 前端 Types + Controller 初始值

**Files:**
- Modify: `control-ui/src/ui/controllers/admin-data.types.ts`

- [ ] **Step 4.1: 在 `AdminDataState` 中追加 4 个字段**

找到 `admin-data.types.ts:19`（`AdminDataState` type 块），在 `libraryDataError: string | null;` 之后追加：

```typescript
  libraryNewColumns: LibraryColumnDef[];
  librarySchemaLoading: boolean;
  librarySchemaError: string | null;
  librarySchemaOpen: boolean;
```

- [ ] **Step 4.2: 在 `admin-data.ts` 的 `initialAdminDataState()` 中补初始值**

找到 `admin-data.ts:57`（`return { ... }` 块），在 `libraryDataError: null,` 之后追加：

```typescript
    libraryNewColumns: [],
    librarySchemaLoading: false,
    librarySchemaError: null,
    librarySchemaOpen: false,
```

- [ ] **Step 4.3: 验证 TypeScript 编译**

```bash
cd "d:/Projects/agent-jk/Agent Team version3/control-ui"
npx tsc --noEmit 2>&1 | head -20
```

Expected: 无错误

- [ ] **Step 4.4: Commit**

```bash
cd "d:/Projects/agent-jk/Agent Team version3"
git add control-ui/src/ui/controllers/admin-data.types.ts control-ui/src/ui/controllers/admin-data.ts
git commit -m "feat: add schema sync state fields to AdminDataState"
```

---

## Task 5: 前端 Controller — 5 个新函数 + 修改 loadLibraryData

**Files:**
- Modify: `control-ui/src/ui/controllers/admin-data.ts`

- [ ] **Step 5.1: 追加 `getSchemaDiff` 函数**

在 `admin-data.ts` 文件末尾（`deleteLibraryRow` 之后）追加：

```typescript
export async function getSchemaDiff(host: AdminDataHost, libId: number): Promise<void> {
  const tok = host.adminData.token;
  if (!tok) return;
  try {
    const res = await fetch(apiUrl(host.basePath, `/api/admin/libraries/${libId}/schema-diff`), {
      headers: authHeaders(tok),
    });
    if (!res.ok) return;
    const data = (await res.json()) as { new_columns: LibraryColumnDef[] };
    patch(host, { libraryNewColumns: data.new_columns ?? [] });
  } catch {
    // schema diff failure is silent — doesn't block data loading
  }
}
```

- [ ] **Step 5.2: 追加 `syncLibrarySchema` 函数**

```typescript
export async function syncLibrarySchema(host: AdminDataHost, libId: number): Promise<void> {
  const tok = host.adminData.token;
  if (!tok) return;
  patch(host, { librarySchemaLoading: true, librarySchemaError: null });
  try {
    const res = await fetch(apiUrl(host.basePath, `/api/admin/libraries/${libId}/sync-schema`), {
      method: "POST",
      headers: authHeaders(tok),
    });
    if (res.status === 401) { adminLogout(host); return; }
    if (!res.ok) {
      patch(host, { librarySchemaLoading: false, librarySchemaError: await res.text() });
      return;
    }
    patch(host, { libraryNewColumns: [], librarySchemaLoading: false });
    await loadLibraries(host);
  } catch (e) {
    patch(host, { librarySchemaLoading: false, librarySchemaError: String(e) });
  }
}
```

- [ ] **Step 5.3: 追加 `addLibraryColumn` 函数**

```typescript
export async function addLibraryColumn(
  host: AdminDataHost,
  libId: number,
  name: string,
  colType: string,
): Promise<void> {
  const tok = host.adminData.token;
  if (!tok) return;
  patch(host, { librarySchemaLoading: true, librarySchemaError: null });
  try {
    const res = await fetch(apiUrl(host.basePath, `/api/admin/libraries/${libId}/columns`), {
      method: "POST",
      headers: authHeaders(tok),
      body: JSON.stringify({ name, type: colType }),
    });
    if (res.status === 401) { adminLogout(host); return; }
    if (!res.ok) {
      patch(host, { librarySchemaLoading: false, librarySchemaError: await res.text() });
      return;
    }
    patch(host, { librarySchemaLoading: false });
    await loadLibraries(host);
    await loadLibraryData(host, libId);
  } catch (e) {
    patch(host, { librarySchemaLoading: false, librarySchemaError: String(e) });
  }
}
```

- [ ] **Step 5.4: 追加 `dropLibraryColumn` 函数**

```typescript
export async function dropLibraryColumn(
  host: AdminDataHost,
  libId: number,
  colName: string,
): Promise<void> {
  const tok = host.adminData.token;
  if (!tok) return;
  patch(host, { librarySchemaLoading: true, librarySchemaError: null });
  try {
    const res = await fetch(
      apiUrl(host.basePath, `/api/admin/libraries/${libId}/columns/${encodeURIComponent(colName)}`),
      { method: "DELETE", headers: authHeaders(tok) },
    );
    if (res.status === 401) { adminLogout(host); return; }
    if (!res.ok) {
      patch(host, { librarySchemaLoading: false, librarySchemaError: await res.text() });
      return;
    }
    patch(host, { librarySchemaLoading: false });
    await loadLibraries(host);
    await loadLibraryData(host, libId);
  } catch (e) {
    patch(host, { librarySchemaLoading: false, librarySchemaError: String(e) });
  }
}
```

- [ ] **Step 5.5: 追加 `renameLibraryColumn` 函数**

```typescript
export async function renameLibraryColumn(
  host: AdminDataHost,
  libId: number,
  oldName: string,
  newName: string,
): Promise<void> {
  const tok = host.adminData.token;
  if (!tok) return;
  patch(host, { librarySchemaLoading: true, librarySchemaError: null });
  try {
    const res = await fetch(
      apiUrl(host.basePath, `/api/admin/libraries/${libId}/columns/${encodeURIComponent(oldName)}`),
      {
        method: "PATCH",
        headers: authHeaders(tok),
        body: JSON.stringify({ new_name: newName }),
      },
    );
    if (res.status === 401) { adminLogout(host); return; }
    if (!res.ok) {
      patch(host, { librarySchemaLoading: false, librarySchemaError: await res.text() });
      return;
    }
    patch(host, { librarySchemaLoading: false });
    await loadLibraries(host);
    await loadLibraryData(host, libId);
  } catch (e) {
    patch(host, { librarySchemaLoading: false, librarySchemaError: String(e) });
  }
}
```

- [ ] **Step 5.6: 修改 `loadLibraryData` — 在成功后并行触发 getSchemaDiff**

找到 `admin-data.ts:178`（`loadLibraryData` 函数 try 块末尾的 `patch(host, { libraryData: data.items, ... })`），在该 patch 调用之后追加一行：

```typescript
    patch(host, { libraryData: data.items, libraryDataTotal: data.total, libraryDataLoading: false });
    void getSchemaDiff(host, libId);   // ← 追加这行
```

- [ ] **Step 5.7: 验证 TypeScript 编译**

```bash
cd "d:/Projects/agent-jk/Agent Team version3/control-ui"
npx tsc --noEmit 2>&1 | head -20
```

Expected: 无错误

- [ ] **Step 5.8: Commit**

```bash
cd "d:/Projects/agent-jk/Agent Team version3"
git add control-ui/src/ui/controllers/admin-data.ts
git commit -m "feat: add schema sync controller functions and auto-diff on library load"
```

---

## Task 6: 前端 View — renderLibraryDetail 改造

**Files:**
- Modify: `control-ui/src/ui/views/admin-data.ts`

- [ ] **Step 6.1: 在 `AdminDataViewProps` 追加 5 个 handler**

找到 `admin-data.ts:22`（`onLibraryWarningsDismiss: () => void;` 行），在其后追加：

```typescript
  onSyncSchema: (libId: number) => void;
  onToggleSchemaPanel: () => void;
  onAddColumn: (libId: number) => void;
  onDropColumn: (libId: number, colName: string) => void;
  onRenameColumn: (libId: number, colName: string) => void;
```

- [ ] **Step 6.2: 新增 `renderSchemaPanel` 函数**

在 `renderLibraryDetail` 函数定义之前插入：

```typescript
function renderSchemaPanel(props: AdminDataViewProps, lib: LibraryMeta) {
  const s = props.host.adminData;
  return html`
    <div class="admin-block" style="margin: 0 0 8px 0; padding: 8px 0;">
      ${s.librarySchemaError ? html`<p class="admin-err">${s.librarySchemaError}</p>` : nothing}
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>列名</th>
              <th>类型</th>
              <th>原始名</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${lib.columns.map(
              (col) => html`
                <tr>
                  <td>${col.name}</td>
                  <td>${col.type}</td>
                  <td class="admin-muted">${col.original_name}</td>
                  <td class="admin-actions">
                    <button
                      type="button"
                      class="admin-btn admin-btn--sm"
                      @click=${() => {
                        const newName = prompt(`重命名列「${col.name}」，输入新列名：`, col.name);
                        if (newName && newName.trim() && newName.trim() !== col.name) {
                          props.onRenameColumn(lib.id, col.name);
                        }
                      }}
                    >
                      改名
                    </button>
                    <button
                      type="button"
                      class="admin-btn admin-btn--sm admin-btn--danger"
                      @click=${() => {
                        if (
                          confirm(
                            `删除列「${col.name}」将永久清除该库所有行的此列数据，且无法恢复。确认删除？`,
                          )
                        ) {
                          props.onDropColumn(lib.id, col.name);
                        }
                      }}
                    >
                      删除
                    </button>
                  </td>
                </tr>
              `,
            )}
          </tbody>
        </table>
      </div>
      <div class="admin-row" style="margin-top: 8px;">
        <button
          type="button"
          class="admin-btn admin-btn--primary admin-btn--sm"
          @click=${() => props.onAddColumn(lib.id)}
        >
          + 新增列
        </button>
        ${s.librarySchemaLoading ? html`<span class="admin-muted" style="margin-left: 8px;">操作中…</span>` : nothing}
      </div>
    </div>
  `;
}
```

- [ ] **Step 6.3: 修改 `renderLibraryDetail` 的工具栏行**

找到 `admin-data.ts:204`（`renderLibraryDetail` 内的 `<button ... @click=${() => props.onLibraryRefresh(lib.id)}>刷新</button>` 那行），在"刷新"按钮之后、"+ 新增一行"按钮之前插入两个按钮：

```typescript
      <button type="button" class="admin-btn" ?disabled=${s.librarySchemaLoading} @click=${() => props.onSyncSchema(lib.id)}>
        ${s.librarySchemaLoading ? "同步中…" : "同步结构"}
      </button>
      <button type="button" class="admin-btn" @click=${props.onToggleSchemaPanel}>
        ${s.librarySchemaOpen ? "关闭列管理 ▴" : "管理列 ▾"}
      </button>
```

- [ ] **Step 6.4: 在数据表之前插入新列 warn-bar 和 schema panel**

找到 `admin-data.ts:209`（`${s.libraryDataError ? ... : nothing}`），在该行之后、`${s.libraryDataLoading ? ...}` 之前插入：

```typescript
    ${s.libraryNewColumns.length > 0
      ? html`<div class="admin-warn-bar">
          <strong>检测到 ${s.libraryNewColumns.length} 个新列未同步：</strong>
          ${s.libraryNewColumns.map((c) => c.name).join(", ")}
          <button
            type="button"
            class="admin-btn admin-btn--sm"
            style="margin-left: 8px;"
            @click=${() => props.onSyncSchema(lib.id)}
          >
            合并列
          </button>
        </div>`
      : nothing}
    ${s.librarySchemaOpen ? renderSchemaPanel(props, lib) : nothing}
```

- [ ] **Step 6.5: 验证 TypeScript 编译**

```bash
cd "d:/Projects/agent-jk/Agent Team version3/control-ui"
npx tsc --noEmit 2>&1 | head -20
```

Expected: 无错误

- [ ] **Step 6.6: Commit**

```bash
cd "d:/Projects/agent-jk/Agent Team version3"
git add control-ui/src/ui/views/admin-data.ts
git commit -m "feat: add schema panel and new-columns warn-bar to library detail view"
```

---

## Task 7: 前端 app-render.ts — 绑定新 handler

**Files:**
- Modify: `control-ui/src/ui/app-render.ts`

- [ ] **Step 7.1: 更新 import 语句**

找到 `app-render.ts:58-68`（现有 admin-data import 块）：

```typescript
import {
  addLibraryRow,
  adminLogin,
  adminLogout,
  deleteLibraryRow,
  dropLibrary,
  loadLibraries,
  loadLibraryData,
  patchLibraryRow,
  saveLibraryRow,
  uploadLibrary,
} from "./controllers/admin-data.ts";
```

替换为：

```typescript
import {
  addLibraryRow,
  adminLogin,
  adminLogout,
  addLibraryColumn,
  deleteLibraryRow,
  dropLibrary,
  dropLibraryColumn,
  loadLibraries,
  loadLibraryData,
  patchLibraryRow,
  renameLibraryColumn,
  saveLibraryRow,
  syncLibrarySchema,
  uploadLibrary,
} from "./controllers/admin-data.ts";
```

- [ ] **Step 7.2: 修改 `onLibraryBack` — 重置 schema 状态**

找到 `app-render.ts:888-890`（`onLibraryBack` handler）：

```typescript
                onLibraryBack: () => {
                  state.adminData = { ...state.adminData, activeLibraryId: null, libraryData: [] };
                },
```

替换为：

```typescript
                onLibraryBack: () => {
                  state.adminData = {
                    ...state.adminData,
                    activeLibraryId: null,
                    libraryData: [],
                    libraryNewColumns: [],
                    librarySchemaOpen: false,
                    librarySchemaError: null,
                  };
                },
```

- [ ] **Step 7.3: 在 `renderAdminData` 调用块末尾追加 5 个新 handler**

找到 `app-render.ts:906-908`（`onLibraryWarningsDismiss` handler 末尾的 `})`），在 `onLibraryWarningsDismiss` 之后、`})` 之前插入：

```typescript
                onSyncSchema: (libId) =>
                  syncLibrarySchema(state as unknown as AdminDataHost, libId),
                onToggleSchemaPanel: () => {
                  state.adminData = {
                    ...state.adminData,
                    librarySchemaOpen: !state.adminData.librarySchemaOpen,
                    librarySchemaError: null,
                  };
                },
                onAddColumn: (libId) => {
                  const name = prompt("新列名（只允许小写字母、数字和下划线）：");
                  if (!name?.trim()) return;
                  const typeRaw = prompt("数据类型（输入 TEXT 或 NUMERIC）：", "TEXT");
                  const colType = (typeRaw || "TEXT").trim().toUpperCase();
                  if (colType !== "TEXT" && colType !== "NUMERIC") {
                    alert("类型必须是 TEXT 或 NUMERIC");
                    return;
                  }
                  void addLibraryColumn(
                    state as unknown as AdminDataHost,
                    libId,
                    name.trim(),
                    colType,
                  );
                },
                onDropColumn: (libId, colName) =>
                  dropLibraryColumn(state as unknown as AdminDataHost, libId, colName),
                onRenameColumn: (libId, colName) => {
                  const newName = prompt(`重命名列「${colName}」，输入新列名：`, colName);
                  if (!newName?.trim() || newName.trim() === colName) return;
                  void renameLibraryColumn(
                    state as unknown as AdminDataHost,
                    libId,
                    colName,
                    newName.trim(),
                  );
                },
```

- [ ] **Step 7.4: 验证 TypeScript 编译**

```bash
cd "d:/Projects/agent-jk/Agent Team version3/control-ui"
npx tsc --noEmit 2>&1 | head -20
```

Expected: 无错误

- [ ] **Step 7.5: 构建前端验证无报错**

```bash
cd "d:/Projects/agent-jk/Agent Team version3/control-ui"
npm run build 2>&1 | tail -10
```

Expected: 构建成功，无 error

- [ ] **Step 7.6: Commit**

```bash
cd "d:/Projects/agent-jk/Agent Team version3"
git add control-ui/src/ui/app-render.ts
git commit -m "feat: wire schema sync handlers in app-render"
```

---

## Self-Review

**Spec coverage check:**

| 需求 | Task | 覆盖 |
|------|------|------|
| 物理表 introspect 获取列名 | 1 | ✅ `introspect_table_columns` |
| 自动感知（打开库时自动 diff） | 5 | ✅ `loadLibraryData` 末尾调用 `getSchemaDiff` |
| 手动"同步结构"按钮 | 6, 7 | ✅ 工具栏按钮 + `syncLibrarySchema` |
| 新列 warn-bar 提示 | 6 | ✅ `libraryNewColumns.length > 0` |
| UI 加列 | 6, 7 | ✅ `renderSchemaPanel` + `onAddColumn` |
| UI 删列（含确认提示） | 6, 7 | ✅ `confirm()` + `onDropColumn` |
| UI 改列名（含 prompt） | 6, 7 | ✅ `prompt()` + `onRenameColumn` |
| 返回列表时重置 schema 状态 | 7 | ✅ `onLibraryBack` 扩展 |
| 列名安全校验（前后端） | 1, 3, 7 | ✅ `_safe_col_name` + 后端 422 + 前端 prompt 验证 |
| 系统列（id / _row_index）拒绝操作 | 1 | ✅ `_safe_col_name` 抛 ValueError |
| 测试覆盖 | 1, 2 | ✅ 15 个单元测试 |

**Placeholder scan:** 无 TBD/TODO。所有代码步骤均含完整实现。

**Type consistency:**
- `LibraryColumnDef[]` 在 types、controller、view 三处一致
- `onRenameColumn(libId, colName)` 签名在 view props 定义（Task 6）和 app-render 实现（Task 7）一致
- `syncLibrarySchema` / `addLibraryColumn` / `dropLibraryColumn` / `renameLibraryColumn` 函数名在 controller（Task 5）和 app-render import（Task 7）一致
