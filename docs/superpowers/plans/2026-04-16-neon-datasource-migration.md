# Neon 数据源迁移 & 前端精简 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 让万鼎价格库和产品映射表的查询优先读取 Neon 自定义库（`dl_{id}_xxx` 表），删去前端两个旧 tab，Excel 保留为 fallback。

**Architecture:** 三条扩展路径：①`wanding_fuzzy_matcher._try_load_from_db()` 加自定义库分支；②`mapping_table_matcher._try_load_mapping_from_db()` 加自定义库分支；③`parse_generic` 过滤空列头。共享工具 `_find_col()` 按关键词匹配列名。前端删除 price/mapping subtab 及相关 state/props/函数。

**Tech Stack:** Python (pytest, openpyxl, pandas, sqlalchemy), TypeScript (Lit), PostgreSQL (Neon)

---

## File Map

| 文件 | 操作 | 用途 |
|------|------|------|
| `backend/tools/admin/repository.py` | 修改 | 新增 `fetch_all_library_rows(table_name)` |
| `backend/tools/admin/excel_parser.py` | 修改 | `parse_generic` 过滤空列头 |
| `backend/tools/admin/tests/test_generic_parser.py` | 修改 | 加空列头测试 |
| `backend/tools/inventory/config.py` | 修改 | 新增列名关键词常量 |
| `backend/tools/inventory/services/wanding_fuzzy_matcher.py` | 修改 | `_try_load_from_db` 加自定义库分支 |
| `backend/tools/inventory/services/mapping_table_matcher.py` | 修改 | `_try_load_mapping_from_db` 加自定义库分支 |
| `backend/tools/inventory/tests/test_neon_custom_lib.py` | 新建 | `_find_col` 和两个 matcher 扩展的单元测试 |
| `control-ui/src/ui/controllers/admin-data.types.ts` | 修改 | 删除 price/mapping 类型和字段 |
| `control-ui/src/ui/controllers/admin-data.ts` | 修改 | 删除 price/mapping 函数，`initialAdminDataState` 更新 |
| `control-ui/src/ui/views/admin-data.ts` | 修改 | 删除两个 subtab 及 render 函数 |
| `control-ui/src/ui/app-render.ts` | 修改 | 删除 price/mapping props 调用 |

---

### Task 1: `parse_generic` — 过滤空列头

> 修复自定义库导入时末尾空列（如整理产品(2).xlsx 第 5 列为 `None`）被导入为 `col_5` 的问题。

**Files:**
- Modify: `backend/tools/admin/excel_parser.py:203-280`
- Modify: `backend/tools/admin/tests/test_generic_parser.py`

- [ ] **Step 1: 写失败测试**

在 `backend/tools/admin/tests/test_generic_parser.py` 末尾追加：

```python
def test_empty_header_columns_are_filtered() -> None:
    """parse_generic 应过滤列头为 None/空字符串的列，不产生 col_N 列名。"""
    content = _make_xlsx(
        [
            ["名称", "价格", None],   # 第 3 列 None
            ["产品A", 10.0, "ignored"],
            ["产品B", 20.0, "ignored"],
        ]
    )
    result = parse_generic(content, "test.xlsx")
    col_names = [c["name"] for c in result["columns"]]
    assert len(col_names) == 2, f"期望 2 列，实际: {col_names}"
    assert all("col_" not in n for n in col_names), f"不应含 col_N: {col_names}"
    assert len(result["rows"]) == 2
    assert len(result["rows"][0]) == 2
```

- [ ] **Step 2: 运行测试，确认失败**

```bash
cd "D:/Projects/agent-jk/Agent Team version3"
py -m pytest backend/tools/admin/tests/test_generic_parser.py::test_empty_header_columns_are_filtered -v
```

Expected: FAIL（实际返回 3 列，其中含 `col_3`）

- [ ] **Step 3: 在 `parse_generic` 加过滤逻辑**

在 `backend/tools/admin/excel_parser.py` 的 `parse_generic` 函数中，在 `data_rows = ...` 那行（约 line 230）**之后**，加入：

```python
    # 过滤掉原始列头为空/None 的列，避免生成 col_N 占位列
    non_empty_col_indices = [
        i for i, h in enumerate(raw_headers) if h and h.strip()
    ]
    if len(non_empty_col_indices) < len(raw_headers):
        raw_headers = [raw_headers[i] for i in non_empty_col_indices]
        data_rows = [
            [row[i] if i < len(row) else None for i in non_empty_col_indices]
            for row in data_rows
        ]
```

注意：这段代码放在 `data_rows = [r for r in raw_rows if any(...)]` 之后、`ncols = len(raw_headers)` 之前。

- [ ] **Step 4: 运行测试，确认通过**

```bash
py -m pytest backend/tools/admin/tests/test_generic_parser.py -v
```

Expected: 全部 PASS

- [ ] **Step 5: Commit**

```bash
cd "D:/Projects/agent-jk/Agent Team version3"
git add backend/tools/admin/excel_parser.py backend/tools/admin/tests/test_generic_parser.py
git commit -m "fix: filter empty-header columns in parse_generic to prevent col_N artifacts"
```

---

### Task 2: `repository.py` — 新增 `fetch_all_library_rows`

> 为自定义库提供全量拉取接口，供 matcher 内存加载用。

**Files:**
- Modify: `backend/tools/admin/repository.py`

- [ ] **Step 1: 在 `repository.py` 的 `fetch_all_product_mapping` 函数之后追加**

```python
def fetch_all_library_rows(table_name: str) -> list[dict]:
    """全量拉取自定义库表数据（供 Matcher 缓存用）。table_name 必须为 dl_{id}_xxx 格式。"""
    engine = _get_engine()
    if engine is None:
        return []
    try:
        safe_table = _safe_table_name(table_name)
        with engine.connect() as conn:
            rows = conn.execute(
                text(f"SELECT * FROM {safe_table} ORDER BY id")
            ).mappings().all()
            return [dict(r) for r in rows]
    except Exception as e:
        logger.warning("fetch_all_library_rows 失败 (table=%s): %s", table_name, e)
        return []
```

- [ ] **Step 2: 运行已有仓库测试，确认不破坏现有行为**

```bash
cd "D:/Projects/agent-jk/Agent Team version3"
py -m pytest backend/tools/admin/tests/ -v
```

Expected: 全部 PASS

- [ ] **Step 3: Commit**

```bash
git add backend/tools/admin/repository.py
git commit -m "feat: add fetch_all_library_rows to admin repository for custom library full-load"
```

---

### Task 3: `inventory/config.py` — 加列名关键词常量

> 让列匹配关键词可通过环境变量覆盖，适应未来列名变化。

**Files:**
- Modify: `backend/tools/inventory/config.py`

- [ ] **Step 1: 在 `InventoryConfig` 类的最后一行常量之后（`LLM_TIMEOUT` 或 `TOOL_EXEC_TIMEOUT` 附近）追加**

```python
    # ── 自定义库列名关键词（用于 _find_col；均可通过环境变量覆盖）──────────────
    # 万鼎价格库列
    PRICE_LIB_NAME_PATTERNS: tuple = ("万鼎", "价格库")   # 识别库名
    PRICE_LIB_COL_MATERIAL_KW: str = os.environ.get("PRICE_LIB_COL_MATERIAL_KW", "Material")
    PRICE_LIB_COL_DESC_KW: str = os.environ.get("PRICE_LIB_COL_DESC_KW", "Describrition")
    PRICE_LIB_COL_PRICE_A_KW: tuple = ("A级别", "报单价格")
    PRICE_LIB_COL_PRICE_B_KW: tuple = ("B级别", "报单价格")
    PRICE_LIB_COL_PRICE_C_KW: tuple = ("C级别", "报单价格")
    PRICE_LIB_COL_PRICE_D_KW: tuple = ("D级别", "报单价格")
    # 映射表列
    MAPPING_LIB_NAME_PATTERNS: tuple = ("整理产品", "映射")   # 识别库名
    MAPPING_COL_INQUIRY_KW: str = os.environ.get("MAPPING_COL_INQUIRY_KW", "询价货物名称")
    MAPPING_COL_SPEC_KW: str = os.environ.get("MAPPING_COL_SPEC_KW", "询价规格型号")
    MAPPING_COL_CODE_KW: str = os.environ.get("MAPPING_COL_CODE_KW", "产品编号")
    MAPPING_COL_QUOTATION_KW: str = os.environ.get("MAPPING_COL_QUOTATION_KW", "报价名称")
```

- [ ] **Step 2: 验证 config 可正常 import**

```bash
cd "D:/Projects/agent-jk/Agent Team version3"
py -c "from backend.tools.inventory.config import config; print(config.PRICE_LIB_COL_DESC_KW)"
```

Expected: `Describrition`

- [ ] **Step 3: Commit**

```bash
git add backend/tools/inventory/config.py
git commit -m "feat: add column keyword constants to InventoryConfig for custom library matching"
```

---

### Task 4: 新建 `_find_col` 工具函数 + 单元测试

> 从 `data_libraries.columns` JSON 列表中，按关键词找到匹配的列名。

**Files:**
- Create: `backend/tools/inventory/tests/test_neon_custom_lib.py`

- [ ] **Step 1: 新建测试文件**

创建 `backend/tools/inventory/tests/test_neon_custom_lib.py`：

```python
"""
自定义库 Neon 集成：_find_col + wanding/mapping matcher 扩展的单元测试。
不依赖真实 DB 连接——全部 mock repository 函数。
"""

from __future__ import annotations

from unittest.mock import MagicMock, patch


# ── _find_col ──────────────────────────────────────────────────────────────


def _find_col(columns: list[dict], *keywords: str) -> str | None:
    """本地副本供测试用；正式实现会在 wanding_fuzzy_matcher.py 中。"""
    for col in columns:
        name = (col.get("name") or "").lower()
        if all(kw.lower() in name for kw in keywords):
            return col["name"]
    return None


WANDING_COLS = [
    {"name": "NO", "type": "TEXT"},
    {"name": "Material", "type": "TEXT"},
    {"name": "Describrition", "type": "TEXT"},
    {"name": "（二级代理）A级别_报单价格", "type": "NUMERIC"},
    {"name": "（一级代理）B级别_报单价格", "type": "NUMERIC"},
    {"name": "（聚万大客户）C级别报单价格", "type": "NUMERIC"},
    {"name": "（青山大客户）D级别_报单价格", "type": "NUMERIC"},
]

MAPPING_COLS = [
    {"name": "Nama_Permintaan_Barang_询价货物名称", "type": "TEXT"},
    {"name": "Spesifikasi_dan_Model_Permintaan_Barang_询价规格型号", "type": "TEXT"},
    {"name": "Product_number_产品编号", "type": "TEXT"},
    {"name": "Nama_Penawaran_Barang_报价名称", "type": "TEXT"},
]


def test_find_col_material() -> None:
    assert _find_col(WANDING_COLS, "Material") == "Material"


def test_find_col_description() -> None:
    assert _find_col(WANDING_COLS, "Describrition") == "Describrition"


def test_find_col_price_a() -> None:
    assert _find_col(WANDING_COLS, "A级别", "报单价格") == "（二级代理）A级别_报单价格"


def test_find_col_price_b() -> None:
    assert _find_col(WANDING_COLS, "B级别", "报单价格") == "（一级代理）B级别_报单价格"


def test_find_col_price_c() -> None:
    assert _find_col(WANDING_COLS, "C级别", "报单价格") == "（聚万大客户）C级别报单价格"


def test_find_col_price_d() -> None:
    assert _find_col(WANDING_COLS, "D级别", "报单价格") == "（青山大客户）D级别_报单价格"


def test_find_col_not_found() -> None:
    assert _find_col(WANDING_COLS, "不存在的列") is None


def test_find_col_inquiry_name() -> None:
    assert _find_col(MAPPING_COLS, "询价货物名称") == "Nama_Permintaan_Barang_询价货物名称"


def test_find_col_spec() -> None:
    assert _find_col(MAPPING_COLS, "询价规格型号") == "Spesifikasi_dan_Model_Permintaan_Barang_询价规格型号"


def test_find_col_product_code() -> None:
    assert _find_col(MAPPING_COLS, "产品编号") == "Product_number_产品编号"


def test_find_col_quotation_name() -> None:
    assert _find_col(MAPPING_COLS, "报价名称") == "Nama_Penawaran_Barang_报价名称"
```

- [ ] **Step 2: 运行测试，确认全部通过（只有纯逻辑测试，不依赖任何 import）**

```bash
cd "D:/Projects/agent-jk/Agent Team version3"
py -m pytest backend/tools/inventory/tests/test_neon_custom_lib.py -v
```

Expected: 全部 PASS

- [ ] **Step 3: Commit**

```bash
git add backend/tools/inventory/tests/test_neon_custom_lib.py
git commit -m "test: add unit tests for _find_col custom library column matching logic"
```

---

### Task 5: `wanding_fuzzy_matcher.py` — 加自定义库分支

> 当 `price_library` 固定表为空时，查找名含"万鼎"/"价格库"的自定义库，按列名关键词取数据。

**Files:**
- Modify: `backend/tools/inventory/services/wanding_fuzzy_matcher.py`

- [ ] **Step 1: 在文件顶部 `from __future__` 之后，在已有 import 区末尾追加**

找到文件中 `import threading` 或 `from pathlib import Path` 附近，加入：

```python
from typing import Optional as _Optional  # 已有则不加
```

（文件顶部已有 `Optional` import，此步跳过即可。）

- [ ] **Step 2: 在 `_try_load_from_db` 函数内（约 line 759），在 `if not rows: return None` 分支之后、`records = []` 之前，加自定义库分支**

找到函数：

```python
def _try_load_from_db(level: str) -> Optional[pd.DataFrame]:
    """从 Neon admin 缓存行构建 DataFrame；无数据或不可用则返回 None（fallback xlsx）。"""
    try:
        from backend.tools.admin.cache import get_price_library_rows

        rows = get_price_library_rows()
        if not rows:
            return None        # ← 在这一行改为调用自定义库
```

将 `if not rows: return None` 改为：

```python
        if not rows:
            return _try_load_from_custom_library(level)
```

- [ ] **Step 3: 在 `_try_load_from_db` 函数上方（约 line 759 之前）插入 `_try_load_from_custom_library` 和 `_find_col` 函数**

```python
def _find_col(columns: list[dict], *keywords: str) -> str | None:
    """从 columns JSON 找第一个 name（lower）同时包含所有 keyword（lower）的列。"""
    for col in columns:
        name = (col.get("name") or "").lower()
        if all(kw.lower() in name for kw in keywords):
            return col["name"]
    return None


def _try_load_from_custom_library(level: str) -> Optional[pd.DataFrame]:
    """当 price_library 固定表为空时，从名含"万鼎"/"价格库"的自定义库拉数据。"""
    try:
        from backend.tools.admin import repository
        from backend.tools.inventory.config import config

        libs = repository.list_libraries()
        patterns = config.PRICE_LIB_NAME_PATTERNS  # ("万鼎", "价格库")
        matched = [
            lib for lib in libs
            if any(p in (lib.get("name") or "") for p in patterns)
        ]
        if not matched:
            return None
        # 取 id 最大（最新上传）的库
        lib = max(matched, key=lambda x: x["id"])
        table_name = lib.get("table_name") or ""
        columns = lib.get("columns") or []
        if not table_name or not columns:
            return None

        col_material = _find_col(columns, config.PRICE_LIB_COL_MATERIAL_KW)
        col_desc = _find_col(columns, config.PRICE_LIB_COL_DESC_KW)
        level_kw_map = {
            "A": config.PRICE_LIB_COL_PRICE_A_KW,
            "B": config.PRICE_LIB_COL_PRICE_B_KW,
            "C": config.PRICE_LIB_COL_PRICE_C_KW,
            "D": config.PRICE_LIB_COL_PRICE_D_KW,
        }
        normalized = _normalize_price_level(level)
        price_kw = level_kw_map.get(normalized)
        col_price = _find_col(columns, *price_kw) if price_kw else None

        if not col_desc:
            logger.warning("自定义价格库找不到描述列 (keywords=%s)", config.PRICE_LIB_COL_DESC_KW)
            return None

        rows = repository.fetch_all_library_rows(table_name)
        if not rows:
            return None

        records = []
        for r in rows:
            material = str(r.get(col_material) or "" if col_material else "").strip()
            desc = str(r.get(col_desc) or "").strip()
            if not desc:
                continue
            up_f = 0.0
            if col_price:
                try:
                    up_f = float(r.get(col_price) or 0)
                except (TypeError, ValueError):
                    up_f = 0.0
            records.append({"Material": material, "Describrition": desc, "unit_price": up_f})

        if not records:
            return None
        df = pd.DataFrame(records)
        df["norm_text"] = df["Describrition"].apply(_normalize)
        df["spec_tokens"] = df["Describrition"].apply(
            lambda t: frozenset(tok for tok in _split_tokens(t) if re.search(r"\d", tok))
        )
        logger.info(
            "wanding_fuzzy_matcher: loaded %d rows from custom library '%s' (level=%s)",
            len(df), lib.get("name"), level,
        )
        return df
    except Exception as e:
        logger.warning("_try_load_from_custom_library 失败: %s", e)
        return None
```

- [ ] **Step 4: 验证 import 不报错**

```bash
cd "D:/Projects/agent-jk/Agent Team version3"
py -c "from backend.tools.inventory.services.wanding_fuzzy_matcher import _find_col; print('ok')"
```

Expected: `ok`

- [ ] **Step 5: 在 `test_neon_custom_lib.py` 加 wanding matcher 扩展的 mock 测试**

在 `backend/tools/inventory/tests/test_neon_custom_lib.py` 末尾追加：

```python
# ── wanding_fuzzy_matcher 自定义库分支 ────────────────────────────────────


def test_wanding_loads_from_custom_library_when_fixed_table_empty() -> None:
    """price_library 为空时，_try_load_from_custom_library 应成功返回 DataFrame。"""
    from backend.tools.inventory.services.wanding_fuzzy_matcher import _try_load_from_custom_library

    fake_libs = [
        {
            "id": 3,
            "name": "万鼎价格库_管材与国标管件_标准格式",
            "table_name": "dl_3_万鼎价格库",
            "columns": WANDING_COLS,
            "row_count": 2,
        }
    ]
    fake_rows = [
        {
            "NO": "001",
            "Material": "M001",
            "Describrition": "DN25 弯头",
            "（二级代理）A级别_报单价格": 10.0,
            "（一级代理）B级别_报单价格": 12.0,
            "（聚万大客户）C级别报单价格": 14.0,
            "（青山大客户）D级别_报单价格": 16.0,
        },
        {
            "NO": "002",
            "Material": "M002",
            "Describrition": "DN20 管卡",
            "（二级代理）A级别_报单价格": 5.0,
            "（一级代理）B级别_报单价格": 6.0,
            "（聚万大客户）C级别报单价格": 7.0,
            "（青山大客户）D级别_报单价格": 8.0,
        },
    ]

    with (
        patch("backend.tools.admin.repository.list_libraries", return_value=fake_libs),
        patch(
            "backend.tools.admin.repository.fetch_all_library_rows",
            return_value=fake_rows,
        ),
    ):
        df = _try_load_from_custom_library("B")

    assert df is not None
    assert len(df) == 2
    assert list(df.columns) >= ["Material", "Describrition", "unit_price"]
    assert df.iloc[0]["unit_price"] == 12.0   # B级别价格
    assert df.iloc[0]["Describrition"] == "DN25 弯头"


def test_wanding_custom_library_returns_none_when_no_match() -> None:
    """库名不含"万鼎"/"价格库"时返回 None。"""
    from backend.tools.inventory.services.wanding_fuzzy_matcher import _try_load_from_custom_library

    with patch("backend.tools.admin.repository.list_libraries", return_value=[
        {"id": 1, "name": "其他库", "table_name": "dl_1_other", "columns": [], "row_count": 0}
    ]):
        result = _try_load_from_custom_library("B")
    assert result is None
```

- [ ] **Step 6: 运行测试**

```bash
py -m pytest backend/tools/inventory/tests/test_neon_custom_lib.py -v
```

Expected: 全部 PASS

- [ ] **Step 7: 在 `routes_admin.py` 上传成功后使缓存失效**

找到 `backend/server/api/routes_admin.py` 中 `upload_library` 路由末尾的 `return {...}` 之前，追加一行：

```python
    # 上传新自定义库后，使 wanding/mapping 的 df_cache 失效，下次查询重新加载
    try:
        from backend.tools.admin import cache as admin_cache
        admin_cache.invalidate_price_library()
        from backend.tools.inventory.services.mapping_table_matcher import invalidate_mapping_cache
        invalidate_mapping_cache()
    except Exception:
        pass
```

- [ ] **Step 8: Commit**

```bash
git add backend/tools/inventory/services/wanding_fuzzy_matcher.py \
        backend/tools/inventory/tests/test_neon_custom_lib.py \
        backend/server/api/routes_admin.py
git commit -m "feat: extend wanding_fuzzy_matcher to query custom library when price_library is empty"
```

---

### Task 6: `mapping_table_matcher.py` — 加自定义库分支

> 当 `product_mapping` 固定表为空时，查找名含"整理产品"/"映射"的自定义库。

**Files:**
- Modify: `backend/tools/inventory/services/mapping_table_matcher.py`

- [ ] **Step 1: 在文件已有 import 区末尾，确认 `repository` 可用**

确认文件顶部有或加入（如果尚未有）：

```python
# （已有则不改）
from backend.tools.admin import repository as _admin_repo
```

实际上不在顶部加，而是在函数内部按需 import（与已有风格一致）。

- [ ] **Step 2: 在 `_try_load_mapping_from_db` 函数中（约 line 44），将 `return None` 前的最后一行替换**

找到函数结尾：

```python
        if not records:
            return None
        df = pd.DataFrame(records)
        ...
        logger.info("mapping_table_matcher: loaded %d rows from DB", len(df))
        return df
    except Exception as e:
        logger.warning("_try_load_mapping_from_db 失败，将 fallback 读 xlsx: %s", e)
        return None
```

修改为：在 `rows = get_product_mapping_rows()` 之后、原有 `if not rows: return None` 改为：

```python
        if not rows:
            return _try_load_from_mapping_custom_library()
```

- [ ] **Step 3: 在 `_try_load_mapping_from_db` 上方插入辅助函数**

```python
def _find_col_mapping(columns: list[dict], *keywords: str) -> str | None:
    """同 wanding_fuzzy_matcher._find_col，为映射表独立定义避免循环 import。"""
    for col in columns:
        name = (col.get("name") or "").lower()
        if all(kw.lower() in name for kw in keywords):
            return col["name"]
    return None


def _try_load_from_mapping_custom_library() -> Optional[pd.DataFrame]:
    """product_mapping 固定表为空时，从名含"整理产品"/"映射"的自定义库加载。"""
    try:
        from backend.tools.admin import repository
        from backend.tools.inventory.config import config

        libs = repository.list_libraries()
        patterns = config.MAPPING_LIB_NAME_PATTERNS  # ("整理产品", "映射")
        matched = [
            lib for lib in libs
            if any(p in (lib.get("name") or "") for p in patterns)
        ]
        if not matched:
            return None
        lib = max(matched, key=lambda x: x["id"])
        table_name = lib.get("table_name") or ""
        columns = lib.get("columns") or []
        if not table_name or not columns:
            return None

        col_inquiry = _find_col_mapping(columns, config.MAPPING_COL_INQUIRY_KW)
        col_spec = _find_col_mapping(columns, config.MAPPING_COL_SPEC_KW)
        col_code = _find_col_mapping(columns, config.MAPPING_COL_CODE_KW)
        col_quotation = _find_col_mapping(columns, config.MAPPING_COL_QUOTATION_KW)

        if not col_code:
            logger.warning("自定义映射表找不到产品编号列 (keywords=%s)", config.MAPPING_COL_CODE_KW)
            return None

        rows = repository.fetch_all_library_rows(table_name)
        if not rows:
            return None

        records: List[dict] = []
        for r in rows:
            field_name = str(r.get(col_inquiry) or "" if col_inquiry else "").strip()
            spec = str(r.get(col_spec) or "" if col_spec else "").strip()
            code = str(r.get(col_code) or "").strip()
            matched_name = str(r.get(col_quotation) or "" if col_quotation else "").strip()
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
        logger.info(
            "mapping_table_matcher: loaded %d rows from custom library '%s'",
            len(df), lib.get("name"),
        )
        return df
    except Exception as e:
        logger.warning("_try_load_from_mapping_custom_library 失败: %s", e)
        return None
```

- [ ] **Step 4: 在 `test_neon_custom_lib.py` 末尾追加 mapping matcher 测试**

```python
# ── mapping_table_matcher 自定义库分支 ───────────────────────────────────


def test_mapping_loads_from_custom_library_when_fixed_table_empty() -> None:
    """product_mapping 为空时，_try_load_from_mapping_custom_library 应成功返回 DataFrame。"""
    from backend.tools.inventory.services.mapping_table_matcher import (
        _try_load_from_mapping_custom_library,
    )

    fake_libs = [
        {
            "id": 5,
            "name": "整理产品(2)",
            "table_name": "dl_5_整理产品_2_",
            "columns": MAPPING_COLS,
            "row_count": 2,
        }
    ]
    fake_rows = [
        {
            "Nama_Permintaan_Barang_询价货物名称": "弯头",
            "Spesifikasi_dan_Model_Permintaan_Barang_询价规格型号": "DN25",
            "Product_number_产品编号": "P001",
            "Nama_Penawaran_Barang_报价名称": "90度弯头DN25",
        },
        {
            "Nama_Permintaan_Barang_询价货物名称": "管卡",
            "Spesifikasi_dan_Model_Permintaan_Barang_询价规格型号": "DN20",
            "Product_number_产品编号": "P002",
            "Nama_Penawaran_Barang_报价名称": "管卡DN20",
        },
    ]

    with (
        patch("backend.tools.admin.repository.list_libraries", return_value=fake_libs),
        patch(
            "backend.tools.admin.repository.fetch_all_library_rows",
            return_value=fake_rows,
        ),
    ):
        df = _try_load_from_mapping_custom_library()

    assert df is not None
    assert len(df) == 2
    assert "search_text" in df.columns
    assert df.iloc[0]["code"] == "P001"
    assert "弯头" in df.iloc[0]["search_text"]


def test_mapping_custom_library_returns_none_when_no_match() -> None:
    """库名不含"整理产品"/"映射"时返回 None。"""
    from backend.tools.inventory.services.mapping_table_matcher import (
        _try_load_from_mapping_custom_library,
    )

    with patch("backend.tools.admin.repository.list_libraries", return_value=[
        {"id": 1, "name": "其他库", "table_name": "dl_1_other", "columns": [], "row_count": 0}
    ]):
        result = _try_load_from_mapping_custom_library()
    assert result is None
```

- [ ] **Step 5: 运行测试**

```bash
cd "D:/Projects/agent-jk/Agent Team version3"
py -m pytest backend/tools/inventory/tests/test_neon_custom_lib.py -v
```

Expected: 全部 PASS（含新增的 mapping 测试）

- [ ] **Step 6: Commit**

```bash
git add backend/tools/inventory/services/mapping_table_matcher.py \
        backend/tools/inventory/tests/test_neon_custom_lib.py
git commit -m "feat: extend mapping_table_matcher to query custom library when product_mapping is empty"
```

---

### Task 7: 前端 — 删除 price/mapping subtab

> 删除"万鼎价格库"和"产品映射表"两个 tab 及所有相关 state、props、函数。保留 price/mapping 相关 API 路由（作为 fallback 写入路径），只删前端展示和操作入口。

**Files:**
- Modify: `control-ui/src/ui/controllers/admin-data.types.ts`
- Modify: `control-ui/src/ui/controllers/admin-data.ts`
- Modify: `control-ui/src/ui/views/admin-data.ts`
- Modify: `control-ui/src/ui/app-render.ts`

#### Step 7a: 精简 `admin-data.types.ts`

- [ ] **Step 1: 编辑 `admin-data.types.ts`**

将文件改为以下内容（删除 `PriceRow`、`MappingRow` 类型，删除 `AdminDataState` 中 price/mapping 字段，`activeSubTab` 只保留 `"library"`）：

```typescript
export type LibraryColumnDef = {
  name: string;
  type: "TEXT" | "NUMERIC";
  original_name: string;
  warnings: string[];
};

export type LibraryMeta = {
  id: number;
  name: string;
  table_name: string;
  columns: LibraryColumnDef[];
  row_count: number;
  created_at: string;
};

export type LibraryRow = Record<string, unknown> & { id?: number; _row_index?: number };

export type AdminDataState = {
  token: string | null;
  loginError: string | null;
  loginLoading: boolean;
  activeSubTab: "library";
  libraries: LibraryMeta[];
  librariesLoading: boolean;
  librariesError: string | null;
  libraryUploading: boolean;
  libraryUploadWarnings: string[];
  activeLibraryId: number | null;
  libraryData: LibraryRow[];
  libraryDataTotal: number;
  libraryDataPage: number;
  libraryDataQuery: string;
  libraryDataLoading: boolean;
  libraryDataError: string | null;
};

/** 须为带 @state() adminData 的组件实例（如 OpenClawApp），以便 patch 赋值触发重渲染 */
export type AdminDataHost = {
  basePath: string;
  adminData: AdminDataState;
};
```

#### Step 7b: 精简 `controllers/admin-data.ts`

- [ ] **Step 2: 删除 import 中的 `PriceRow` 和 `MappingRow`**

找到文件顶部的 import：
```typescript
import type {
  AdminDataHost,
  AdminDataState,
  LibraryColumnDef,
  LibraryMeta,
  LibraryRow,
  MappingRow,
  PriceRow,
} from "./admin-data.types.ts";
```
改为：
```typescript
import type {
  AdminDataHost,
  AdminDataState,
  LibraryColumnDef,
  LibraryMeta,
  LibraryRow,
} from "./admin-data.types.ts";
```

- [ ] **Step 3: 更新 `initialAdminDataState`**

将 `initialAdminDataState` 函数改为：

```typescript
export function initialAdminDataState(): AdminDataState {
  let token: string | null = null;
  if (typeof sessionStorage !== "undefined") {
    token = sessionStorage.getItem("admin_token");
  }
  return {
    token,
    loginError: null,
    loginLoading: false,
    activeSubTab: "library",
    libraries: [],
    librariesLoading: false,
    librariesError: null,
    libraryUploading: false,
    libraryUploadWarnings: [],
    activeLibraryId: null,
    libraryData: [],
    libraryDataTotal: 0,
    libraryDataPage: 1,
    libraryDataQuery: "",
    libraryDataLoading: false,
    libraryDataError: null,
  };
}
```

- [ ] **Step 4: 删除 price 和 mapping 相关函数**

删除以下函数（从函数头到结束花括号，全部删除）：
- `loadPriceLibrary`（约 line 124）
- `patchPriceItem`（约 line 164）
- `addPriceRow`（约 line 171）
- `savePriceRow`（约 line 187）
- `deletePriceRow`（约 line 221）
- `uploadPriceLibrary`（约 line 243）
- `loadProductMapping`（约 line 270）
- `patchMappingItem`（约 line 309）
- `addMappingRow`（约 line 316）
- `saveMappingRow`（约 line 330）
- `deleteMappingRow`（约 line 362）
- `uploadProductMapping`（约 line 384）

#### Step 7c: 精简 `views/admin-data.ts`

- [ ] **Step 5: 删除 import 中的 `MappingRow` 和 `PriceRow`**

找到：
```typescript
import type {
  AdminDataHost,
  AdminDataState,
  LibraryMeta,
  MappingRow,
  PriceRow,
} from "../controllers/admin-data.types.ts";
```
改为：
```typescript
import type {
  AdminDataHost,
  AdminDataState,
  LibraryMeta,
} from "../controllers/admin-data.types.ts";
```

- [ ] **Step 6: 更新 `AdminDataViewProps` 类型**

将 price/mapping 相关 props 全部删除，保留：

```typescript
export type AdminDataViewProps = {
  host: AdminDataHost;
  onLogin: (password: string) => void;
  onLogout: () => void;
  onLibraryUpload: (file: File, name: string) => void;
  onLibraryView: (id: number) => void;
  onLibraryBack: () => void;
  onLibraryQueryInput: (q: string) => void;
  onLibraryQueryApply: (libId: number) => void;
  onLibraryRefresh: (libId: number) => void;
  onLibraryFieldChange: (index: number, key: string, value: unknown) => void;
  onLibrarySave: (libId: number, index: number) => void;
  onLibraryDeleteRow: (libId: number, rowId: number) => void;
  onLibraryAddRow: (libId: number) => void;
  onLibraryDrop: (libId: number) => void;
  onLibraryWarningsDismiss: () => void;
};
```

- [ ] **Step 7: 更新 `renderAdminData` 函数**

找到 `renderAdminData` 函数中的 subtab 区域，改为直接渲染自定义库：

```typescript
export function renderAdminData(props: AdminDataViewProps) {
  const s = props.host.adminData;

  if (!s.token) {
    return html`<section class="admin-panel">${renderLogin(props)}</section>`;
  }

  return html`
    <section class="admin-panel">
      <div class="admin-toolbar">
        <h2 class="admin-title">数据管理</h2>
        <button class="admin-btn admin-btn--ghost" type="button" @click=${props.onLogout}>退出登录</button>
      </div>
      ${renderCustomLibraries(props)}
    </section>
  `;
}
```

- [ ] **Step 8: 删除 `renderPrice` 和 `renderMapping` 函数**

删除 `function renderPrice(...)` 和 `function renderMapping(...)` 函数体（包含函数头到结束 `}`）。

同时删除 `numOrNull` 函数（仅被 price/mapping 使用）。

#### Step 7d: 精简 `app-render.ts`

- [ ] **Step 9: 删除 price/mapping 相关 import**

找到 `app-render.ts` 顶部的 import from `"./controllers/admin-data.ts"`，删除：
- `deleteMappingRow`
- `deletePriceRow`
- `loadPriceLibrary`
- `loadProductMapping`
- `saveMappingRow`
- `savePriceRow`
- `uploadPriceLibrary`
- `uploadProductMapping`
- `addPriceRow`（如有）
- `addMappingRow`（如有）
- `patchPriceItem`（如有）
- `patchMappingItem`（如有）

- [ ] **Step 10: 更新 `onLogin` 回调**

找到：
```typescript
onLogin: async (password) => {
  const h = state as unknown as AdminDataHost;
  await adminLogin(h, password);
  if (state.adminData.token) {
    await loadPriceLibrary(h);
    await loadProductMapping(h);
  }
},
```
改为：
```typescript
onLogin: async (password) => {
  const h = state as unknown as AdminDataHost;
  await adminLogin(h, password);
  if (state.adminData.token) {
    void loadLibraries(h);
  }
},
```

- [ ] **Step 11: 删除 price/mapping props 传入**

在 `renderAdminData({...})` 调用中，删除所有 price/mapping 相关 props（`onSubTab`, `onPriceQueryInput`, `onPriceQueryApply`, `onPriceRefresh`, `onPriceFieldChange`, `onPriceSave`, `onPriceDelete`, `onPriceUpload`, `onPriceAddRow`, `onMappingQueryInput`, `onMappingQueryApply`, `onMappingRefresh`, `onMappingFieldChange`, `onMappingSave`, `onMappingDelete`, `onMappingUpload`, `onMappingAddRow`）。

同时删除 `onLibraryTab` prop（`renderAdminData` 不再需要手动切 tab）。

保留所有 `onLibrary*` props。

- [ ] **Step 12: 构建前端，确认无 TypeScript 错误**

```bash
cd "D:/Projects/agent-jk/Agent Team version3/control-ui"
npm run build 2>&1 | tail -20
```

Expected: 无 TypeScript 错误，`dist/` 输出正常。若有错误，根据错误信息找到遗漏的引用并删除。

- [ ] **Step 13: Commit**

```bash
cd "D:/Projects/agent-jk/Agent Team version3"
git add control-ui/src/ui/controllers/admin-data.types.ts \
        control-ui/src/ui/controllers/admin-data.ts \
        control-ui/src/ui/views/admin-data.ts \
        control-ui/src/ui/app-render.ts
git commit -m "feat: remove price/mapping subtabs from admin UI, keep only custom library tab"
```

---

### Task 8: 全量回归验证

- [ ] **Step 1: 运行全部相关测试**

```bash
cd "D:/Projects/agent-jk/Agent Team version3"
py -m pytest backend/tools/admin/tests/ backend/tools/inventory/tests/test_neon_custom_lib.py -v
```

Expected: 全部 PASS

- [ ] **Step 2: 启动后端，验证 admin 页面正常**

```bash
py run_backend.py
```

打开浏览器 `http://localhost:8000`，进入管理面板：
- 只看到"自定义库"一个 tab（无"万鼎价格库"和"产品映射表"）
- 自定义库列表正常加载，显示已上传的两个库
- 进入库详情，数据行正常显示

- [ ] **Step 3: Commit（若有任何遗留修复）**

```bash
git add -p
git commit -m "fix: address any remaining issues from neon datasource migration"
```
