# Library Schema Sync — Design Spec

## Goal

让前端管理界面自动感知并展示数据库物理表新增的列，同时支持从 UI 对已有库执行加列、删列、改列名操作，无需重新上传 Excel。

---

## Background & Current State

- `data_libraries` 表的 `columns` JSONB 字段在上传时由 Excel 解析结果写入，此后不会自动更新。
- 物理库表（`dl_{id}_{slug}`）可能通过 SQL 迁移新增了列，但 `columns` 元数据落后，导致前端渲染不出该列。
- 前端 `renderLibraryDetail` 完全依赖 `lib.columns` 动态渲染表头和输入框。
- 前端风格：纯函数 Lit 模板、`admin-btn` CSS 类体系、破坏性操作用 `confirm()` / `prompt()`，无 Modal 弹窗。

---

## Architecture

### Source of Truth

物理表（`dl_*`）是列存在性的终极源，`data_libraries.columns` 是缓存/元数据层（存自定义列名、类型标注）。两者之差即为"未同步的列"。

### Flow

```
用户打开库
  → loadLibraryData() 并行调用 getSchemaDiff()
  → 后端查 information_schema.columns 对比 data_libraries.columns
  → 若有新列：前端显示 warn-bar，libraryNewColumns 非空
  → 用户点"合并列" → POST sync-schema → 重载 libraries
```

```
用户点"同步结构"按钮（手动触发）
  → 同上 getSchemaDiff + 展示结果，或直接 sync-schema
```

```
用户点"管理列" → 展开内联列管理区
  → 加列：prompt() 列名 + type → POST /columns
  → 删列：confirm() → DELETE /columns/{col_name}
  → 改名：prompt() 新名 → PATCH /columns/{col_name}
  → 每次操作后重载 libraries（更新 lib.columns）
```

---

## Backend Changes

### Repository (`backend/tools/admin/repository.py`)

**新增 4 个函数：**

```python
def introspect_table_columns(table_name: str) -> list[str]:
    """查 information_schema.columns，返回物理表的列名列表（排除 id、_row_index）。"""

def sync_library_schema(lib_id: int, table_name: str, existing_columns: list[dict]) -> list[str]:
    """
    对比物理表 vs existing_columns，把新列 append 进 data_libraries.columns。
    新列默认 type='TEXT'，original_name=物理列名。
    返回合并进去的新列名列表。
    """

def add_library_column(lib_id: int, table_name: str, col_name: str, col_type: str) -> None:
    """
    1. ALTER TABLE {table_name} ADD COLUMN {col_name} {sql_type} NULL
    2. 更新 data_libraries.columns（append 新列定义）
    col_type 只接受 'TEXT' 或 'NUMERIC'（映射到 TEXT/NUMERIC SQL 类型）。
    """

def drop_library_column(lib_id: int, table_name: str, col_name: str) -> None:
    """
    1. ALTER TABLE {table_name} DROP COLUMN {col_name}
    2. 从 data_libraries.columns 移除该列定义
    不允许删除 id 和 _row_index。
    """

def rename_library_column(lib_id: int, table_name: str, old_name: str, new_name: str) -> None:
    """
    1. ALTER TABLE {table_name} RENAME COLUMN {old_name} TO {new_name}
    2. 更新 data_libraries.columns 中该列的 name 和 original_name
    """
```

所有函数使用 SQLAlchemy `text()` + 参数化，**禁止字符串拼接列名**（须经过 `_safe_col_name()` 白名单校验：只允许字母数字下划线）。

### Routes (`backend/server/api/routes_admin.py`)

**新增 4 个端点（全部需要 admin token）：**

| Method | Path | 说明 |
|--------|------|------|
| `GET` | `/api/admin/libraries/{lib_id}/schema-diff` | 返回 `{new_columns: [{name, type, original_name}]}` |
| `POST` | `/api/admin/libraries/{lib_id}/sync-schema` | 合并新列进 columns，返回 `{merged: [col_name, ...]}` |
| `POST` | `/api/admin/libraries/{lib_id}/columns` | Body: `{name, type}`；加列后返回更新后的完整 `{columns: [...]}` |
| `DELETE` | `/api/admin/libraries/{lib_id}/columns/{col_name}` | 删列后返回 `{ok: true}` |
| `PATCH` | `/api/admin/libraries/{lib_id}/columns/{col_name}` | Body: `{new_name}`；改名后返回 `{ok: true}` |

**错误处理：**
- `col_name` 不符合 `^[a-z_][a-z0-9_]*$` → 422
- `col_name` 不存在于 `data_libraries.columns` → 404
- 试图删除 `id` / `_row_index` → 422
- `ALTER TABLE` 失败（如列名重复）→ 500，错误信息透传

---

## Frontend Changes

### Types (`control-ui/src/ui/controllers/admin-data.types.ts`)

`AdminDataState` 新增：
```typescript
libraryNewColumns: LibraryColumnDef[];   // schema-diff 返回的待合并列
librarySchemaLoading: boolean;           // sync 操作中
librarySchemaError: string | null;       // schema 操作错误
librarySchemaOpen: boolean;              // 内联列管理区是否展开
```

`initialAdminDataState()` 对应初始值为 `[], false, null, false`。

### Controller (`control-ui/src/ui/controllers/admin-data.ts`)

**新增 4 个导出函数：**

```typescript
export async function syncLibrarySchema(host, libId): Promise<void>
  // POST /sync-schema → 成功后重载 libraries（更新 lib.columns）+ 清空 libraryNewColumns

export async function addLibraryColumn(host, libId, name, type): Promise<void>
  // POST /columns → 成功后重载 libraries + loadLibraryData

export async function dropLibraryColumn(host, libId, colName): Promise<void>
  // DELETE /columns/{col_name} → 成功后重载 libraries + loadLibraryData

export async function renameLibraryColumn(host, libId, oldName, newName): Promise<void>
  // PATCH /columns/{col_name} → 成功后重载 libraries + loadLibraryData
```

**修改 `loadLibraryData()`：**
加载数据的同时并行调用 `GET /schema-diff`，结果存入 `libraryNewColumns`。失败静默（不影响数据加载）。

### View (`control-ui/src/ui/views/admin-data.ts`)

**修改 `renderLibraryDetail()`：**

1. **工具栏行**：在"刷新"按钮后增加两个按钮：
   - `"同步结构"` (`admin-btn`）：点击调 `syncLibrarySchema`，loading 时显示"同步中…"
   - `"管理列 ▾/▴"` (`admin-btn`）：切换 `librarySchemaOpen`

2. **新列提示条**（`libraryNewColumns.length > 0` 时显示，放在工具栏下方，使用现有 `admin-warn-bar` 样式）：
   ```
   检测到 N 个新列未同步：col1, col2 —— [合并列]
   ```
   点"合并列"调 `syncLibrarySchema`，合并后条消失。

3. **内联列管理区**（`librarySchemaOpen === true` 时显示，在 warn-bar 下方、数据表上方）：
   用 `admin-table` 渲染列列表：

   | 列名 | 类型 | 原始名 | 操作 |
   |------|------|--------|------|
   | material | TEXT | Material | [改名] [删除] |
   | price_a | NUMERIC | Price A | [改名] [删除] |

   底部一行：`[+ 新增列]` 按钮，点击后 `prompt("新列名：")` + `prompt("类型（TEXT/NUMERIC）：")` → `addLibraryColumn()`

   - [改名]：`prompt("新列名：", oldName)` → `renameLibraryColumn()`
   - [删除]：`confirm("删除列 X 将永久清除所有行的该列数据，确认？")` → `dropLibraryColumn()`

   操作按钮使用 `admin-btn admin-btn--sm`，删除用 `admin-btn--danger`。

4. **`AdminDataViewProps`** 新增 4 个 handler：
   - `onSyncSchema: (libId: number) => void`
   - `onToggleSchemaPanel: () => void`
   - `onAddColumn: (libId: number) => void`
   - `onDropColumn: (libId: number, colName: string) => void`
   - `onRenameColumn: (libId: number, colName: string) => void`

   在 `app-render.ts` 的调用处补充对应实现，调用新 controller 函数。

---

## Data Validation

- `col_name` 正则：`^[a-z_][a-z0-9_]*$`（前后端均校验，后端为准）
- `col_type` 枚举：`TEXT` | `NUMERIC`（前端 prompt 后大写转换，后端二次校验）
- 禁止删除 `id`、`_row_index`（后端强制拒绝，422）

---

## Error Handling

- `librarySchemaError` 字段显示在内联列管理区顶部（用现有 `admin-err` CSS 类）
- 每次 schema 操作成功后清空 `librarySchemaError`
- `ALTER TABLE` 层错误（如列已存在）直接 500，前端显示后端返回的错误文本

---

## Testing

- `test_library_schema_sync.py`：
  - `introspect_table_columns` 返回正确列名（mock DB cursor）
  - `sync_library_schema` 只合并新列，不覆盖已有列
  - `add_library_column` 拒绝非法列名（SQL injection 尝试）
  - `drop_library_column` 拒绝删除 `id`
  - `rename_library_column` 正常更新 columns JSONB

---

## Out of Scope

- 列类型修改（NUMERIC → TEXT）：ALTER TABLE MODIFY COLUMN 在 PostgreSQL 语义复杂，暂不支持
- 列排序调整
- 批量列操作
- 变更历史审计日志
