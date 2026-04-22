# English match_quotation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 当询价 keywords 全为英文时，通过 `lang="en"` 参数路由到 `Describrition_English` CONTAINS 匹配路径，替代原有中文 token 打分逻辑，使英文询价（如 `3" AW pipe`）能正确返回候选并经 LLM 选型。

**Architecture:** 新增独立英文匹配函数 `match_english_candidates`，在 `_execute_match_quotation` 检测 `lang` 参数路由；数据层在 Excel 加载（`_load_one_sheet`）和 DB 加载（`_try_load_from_db`）两处补充 `Describrition_English` 字段；`fetch_all_price_library` 的 SELECT 补加英文列；`skills.py` 路由规则补英文价格查询说明。整个下游（LLM 选型、SSE 推送、返回结构）完全复用，零改动。

**Tech Stack:** Python, pandas, SQLAlchemy (Neon), openpyxl

---

## File Map

| 文件 | 改动类型 | 内容 |
|------|---------|------|
| `backend/tools/admin/repository.py` | 修改 | `fetch_all_price_library` SELECT 加 `Describrition_English` |
| `backend/tools/inventory/services/wanding_fuzzy_matcher.py` | 修改 + 新增 | `_load_one_sheet` 读 `cells[3]`；`_try_load_from_db` 加 `description_english`；末尾新增 `match_english_candidates` |
| `backend/tools/inventory/services/match_and_inventory.py` | 新增函数 | `match_quotation_english`（薄封装） |
| `backend/tools/inventory/services/inventory_agent_tools.py` | 修改 | `_execute_match_quotation` 读 `lang` 参数；工具 schema 加 `lang` 字段 |
| `backend/plugins/jagent/skills.py` | 修改 | RULES + DOC 两处路由规则加英文价格查询说明 |

---

## Task 1: DB 层补 `Describrition_English` 列

**Files:**
- Modify: `backend/tools/admin/repository.py:155-166`

- [ ] **Step 1: 写失败测试**

新建测试文件 `backend/tools/admin/tests/test_fetch_price_library_english.py`：

```python
"""测试 fetch_all_price_library 返回 description_english 字段。"""
import pytest
from unittest.mock import patch, MagicMock


def _make_row(**kw):
    """构造 mapping 行（模拟 sqlalchemy Row）。"""
    return dict(
        material="8010036482",
        description="给水用聚乙烯HDPE管",
        description_english="HDPE pipe for water supply",
        price_a=100.0,
        price_b=90.0,
        price_c=80.0,
        price_d=70.0,
        **kw,
    )


def test_fetch_price_library_returns_description_english():
    """fetch_all_price_library 返回的每行必须含 description_english 字段。"""
    from backend.tools.admin import repository

    fake_rows = [_make_row()]
    mock_mappings = MagicMock()
    mock_mappings.all.return_value = [fake_rows[0]]
    mock_conn = MagicMock()
    mock_conn.execute.return_value.mappings.return_value = mock_mappings
    mock_engine = MagicMock()
    mock_engine.connect.return_value.__enter__ = lambda s: mock_conn
    mock_engine.connect.return_value.__exit__ = MagicMock(return_value=False)

    with patch.object(repository, "_get_engine", return_value=mock_engine):
        rows = repository.fetch_all_price_library()

    assert len(rows) == 1
    assert "description_english" in rows[0], "缺少 description_english 字段"
```

- [ ] **Step 2: 运行测试，确认失败**

```bash
cd "D:/Projects/agent-jk/Agent Team version3"
python -m pytest backend/tools/admin/tests/test_fetch_price_library_english.py -v
```

预期：`FAILED` — `AssertionError: 缺少 description_english 字段`

- [ ] **Step 3: 修改 `fetch_all_price_library`**

打开 `backend/tools/admin/repository.py`，找到第 157-164 行的 SELECT 字符串，在 `price_d` 行之后、`FROM` 之前加英文列：

```python
# 修改后的 SELECT（repository.py:155-166）
rows = conn.execute(
    text(
        "SELECT "
        f"{_quote_sql_identifier('Material')} AS material, "
        f"{_quote_sql_identifier('Describrition')} AS description, "
        f"{_quote_sql_identifier('Describrition_English')} AS description_english, "
        f"{_quote_sql_identifier('（二级代理）A级别_报单价格')} AS price_a, "
        f"{_quote_sql_identifier('（一级代理）B级别_报单价格')} AS price_b, "
        f"{_quote_sql_identifier('（聚万大客户）C级别报单价格')} AS price_c, "
        f"{_quote_sql_identifier('（青山大客户）D级别_报单价格')} AS price_d "
        f"FROM {_quote_sql_identifier('万鼎价格库_管材与国标管件_标准格式')} ORDER BY {_quote_sql_identifier('NO')}"
    )
).mappings().all()
return [dict(r) for r in rows]
```

- [ ] **Step 4: 运行测试，确认通过**

```bash
python -m pytest backend/tools/admin/tests/test_fetch_price_library_english.py -v
```

预期：`PASSED`

- [ ] **Step 5: Commit**

```bash
git add backend/tools/admin/repository.py backend/tools/admin/tests/test_fetch_price_library_english.py
git commit -m "feat: fetch_all_price_library SELECT 加 Describrition_English 列"
```

---

## Task 2: 数据层 — Excel 路径补 `Describrition_English`

**Files:**
- Modify: `backend/tools/inventory/services/wanding_fuzzy_matcher.py:685-702`（`_load_one_sheet`）

- [ ] **Step 1: 写失败测试**

新建 `backend/tools/inventory/tests/test_load_one_sheet_english.py`：

```python
"""测试 _load_one_sheet 读出 Describrition_English 列。"""
from unittest.mock import MagicMock


def _make_ws_row(no, material, desc_cn, desc_en, *prices):
    """构造模拟 worksheet 行（每格有 .value 属性）。"""
    values = [no, material, desc_cn, desc_en] + list(prices)
    cells = []
    for v in values:
        c = MagicMock()
        c.value = v
        cells.append(c)
    return cells


def test_load_one_sheet_includes_english():
    from backend.tools.inventory.services.wanding_fuzzy_matcher import _load_one_sheet

    ws = MagicMock()
    ws.iter_rows.return_value = [
        _make_ws_row(1, "8010036482", "给水用聚乙烯HDPE管", "HDPE pipe for water supply",
                     *([None] * 6), 90.0),  # price_col=10 → index 10
    ]
    rows = _load_one_sheet(ws, price_col=10)
    assert len(rows) == 1
    assert "Describrition_English" in rows[0], "缺少 Describrition_English"
    assert rows[0]["Describrition_English"] == "HDPE pipe for water supply"


def test_load_one_sheet_english_empty_when_missing():
    """cells[3] 为 None 时 Describrition_English 为空字符串，不报错。"""
    from backend.tools.inventory.services.wanding_fuzzy_matcher import _load_one_sheet

    ws = MagicMock()
    ws.iter_rows.return_value = [
        _make_ws_row(1, "8010036482", "给水用聚乙烯HDPE管", None,
                     *([None] * 6), 90.0),
    ]
    rows = _load_one_sheet(ws, price_col=10)
    assert rows[0]["Describrition_English"] == ""
```

- [ ] **Step 2: 运行，确认失败**

```bash
python -m pytest backend/tools/inventory/tests/test_load_one_sheet_english.py -v
```

预期：`FAILED` — `AssertionError: 缺少 Describrition_English`

- [ ] **Step 3: 修改 `_load_one_sheet`**

在 `wanding_fuzzy_matcher.py` 第 685-702 行，修改 `rows.append` 调用：

```python
def _load_one_sheet(ws, price_col: int) -> list[dict]:
    """从已打开的 worksheet 读出一张表的行（Material, Describrition, Describrition_English, unit_price）。需覆盖 E 档列(0-based 18)，故 max_col=20。"""
    rows = []
    for row in ws.iter_rows(max_col=20):
        cells = [getattr(c, "value", None) for c in row]
        if len(cells) > 2 and cells[2]:
            up = 0.0
            if len(cells) > price_col and cells[price_col] is not None:
                try:
                    up = float(cells[price_col])
                except (ValueError, TypeError):
                    pass
            rows.append({
                "Material": str(cells[1] or "").strip(),
                "Describrition": str(cells[2] or "").strip(),
                "Describrition_English": str(cells[3] or "").strip() if len(cells) > 3 else "",
                "unit_price": up,
            })
    return rows
```

- [ ] **Step 4: 运行，确认通过**

```bash
python -m pytest backend/tools/inventory/tests/test_load_one_sheet_english.py -v
```

预期：`2 passed`

- [ ] **Step 5: Commit**

```bash
git add backend/tools/inventory/services/wanding_fuzzy_matcher.py backend/tools/inventory/tests/test_load_one_sheet_english.py
git commit -m "feat: _load_one_sheet 读 cells[3] Describrition_English"
```

---

## Task 3: 数据层 — DB 路径补 `Describrition_English`

**Files:**
- Modify: `backend/tools/inventory/services/wanding_fuzzy_matcher.py:877-882`（`_try_load_from_db`）

- [ ] **Step 1: 写失败测试**

新建 `backend/tools/inventory/tests/test_try_load_from_db_english.py`：

```python
"""测试 _try_load_from_db 构建的 DataFrame 包含 Describrition_English 列。"""
from unittest.mock import patch


def test_db_df_includes_english_column():
    from backend.tools.inventory.services import wanding_fuzzy_matcher as wfm

    fake_rows = [
        {
            "material": "8010036482",
            "description": "给水用聚乙烯HDPE管",
            "description_english": "HDPE pipe for water supply",
            "price_b": 90.0,
        }
    ]

    with patch("backend.tools.admin.cache.get_price_library_rows", return_value=fake_rows):
        df = wfm._try_load_from_db("B_QUOTE")

    assert df is not None
    assert "Describrition_English" in df.columns, "DataFrame 缺少 Describrition_English 列"
    assert df["Describrition_English"].iloc[0] == "HDPE pipe for water supply"


def test_db_df_english_empty_when_null():
    from backend.tools.inventory.services import wanding_fuzzy_matcher as wfm

    fake_rows = [
        {
            "material": "8010036482",
            "description": "给水用聚乙烯HDPE管",
            "description_english": None,
            "price_b": 90.0,
        }
    ]

    with patch("backend.tools.admin.cache.get_price_library_rows", return_value=fake_rows):
        df = wfm._try_load_from_db("B_QUOTE")

    assert df["Describrition_English"].iloc[0] == ""
```

- [ ] **Step 2: 运行，确认失败**

```bash
python -m pytest backend/tools/inventory/tests/test_try_load_from_db_english.py -v
```

预期：`FAILED` — `AssertionError: DataFrame 缺少 Describrition_English 列`

- [ ] **Step 3: 修改 `_try_load_from_db`**

在 `wanding_fuzzy_matcher.py` 第 877-882 行的 `records.append(...)` 里加 `Describrition_English`：

```python
records.append(
    {
        "Material": str(r.get("material") or "").strip(),
        "Describrition": str(r.get("description") or "").strip(),
        "Describrition_English": str(r.get("description_english") or "").strip(),
        "unit_price": up_f,
    }
)
```

- [ ] **Step 4: 运行，确认通过**

```bash
python -m pytest backend/tools/inventory/tests/test_try_load_from_db_english.py -v
```

预期：`2 passed`

- [ ] **Step 5: Commit**

```bash
git add backend/tools/inventory/services/wanding_fuzzy_matcher.py backend/tools/inventory/tests/test_try_load_from_db_english.py
git commit -m "feat: _try_load_from_db DataFrame 补 Describrition_English 列"
```

---

## Task 4: 新增 `match_english_candidates`

**Files:**
- Modify: `backend/tools/inventory/services/wanding_fuzzy_matcher.py`（在文件末尾 `match_fuzzy_candidates` 之后追加）

- [ ] **Step 1: 写失败测试**

新建 `backend/tools/inventory/tests/test_match_english_candidates.py`：

```python
"""测试 match_english_candidates 对 Describrition_English 做 token CONTAINS 匹配。"""
import pandas as pd
import pytest
from unittest.mock import patch


def _make_df(rows: list[dict]) -> pd.DataFrame:
    df = pd.DataFrame(rows)
    return df


def _patch_df(df):
    """patch _get_cached_df 返回指定 DataFrame。"""
    return patch(
        "backend.tools.inventory.services.wanding_fuzzy_matcher._get_cached_df",
        return_value=df,
    )


def test_all_tokens_must_match():
    """query tokens 全部出现在 Describrition_English 才收录。"""
    from backend.tools.inventory.services.wanding_fuzzy_matcher import match_english_candidates

    df = _make_df([
        {"Material": "AAA", "Describrition": "中文A", "Describrition_English": "HDPE pipe 3 inch AW", "unit_price": 100.0},
        {"Material": "BBB", "Describrition": "中文B", "Describrition_English": "PVC pipe 2 inch", "unit_price": 50.0},
    ])
    with _patch_df(df):
        result = match_english_candidates('3" AW pipe')

    assert len(result) == 1
    assert result[0]["code"] == "AAA"


def test_returns_chinese_matched_name():
    """matched_name 应为中文 Describrition，description_english 单独透传。"""
    from backend.tools.inventory.services.wanding_fuzzy_matcher import match_english_candidates

    df = _make_df([
        {"Material": "AAA", "Describrition": "聚乙烯管", "Describrition_English": "HDPE pipe AW", "unit_price": 90.0},
    ])
    with _patch_df(df):
        result = match_english_candidates("HDPE pipe AW")

    assert result[0]["matched_name"] == "聚乙烯管"
    assert result[0]["description_english"] == "HDPE pipe AW"
    assert result[0]["source"] == "英文字段匹配"


def test_empty_english_column_skipped():
    """Describrition_English 为空的行不进入候选。"""
    from backend.tools.inventory.services.wanding_fuzzy_matcher import match_english_candidates

    df = _make_df([
        {"Material": "AAA", "Describrition": "中文A", "Describrition_English": "", "unit_price": 100.0},
    ])
    with _patch_df(df):
        result = match_english_candidates("pipe")

    assert result == []


def test_no_english_column_returns_empty():
    """DataFrame 无 Describrition_English 列时返回空列表，不报错。"""
    from backend.tools.inventory.services.wanding_fuzzy_matcher import match_english_candidates

    df = _make_df([
        {"Material": "AAA", "Describrition": "中文A", "unit_price": 100.0},
    ])
    with _patch_df(df):
        result = match_english_candidates("pipe")

    assert result == []


def test_single_char_tokens_ignored():
    """长度 < 2 的 token（如引号、单字母）被过滤，不参与匹配。"""
    from backend.tools.inventory.services.wanding_fuzzy_matcher import match_english_candidates

    df = _make_df([
        {"Material": "AAA", "Describrition": "中文A", "Describrition_English": "AW pipe", "unit_price": 100.0},
    ])
    with _patch_df(df):
        # `3"` → tokens after split: ["3", "AW", "pipe"] → "3" len<2 filtered → ["AW", "pipe"]
        result = match_english_candidates('3" AW pipe')

    assert len(result) == 1


def test_max_candidates_respected():
    """超过 max_candidates 的行不进入结果。"""
    from backend.tools.inventory.services.wanding_fuzzy_matcher import match_english_candidates

    rows = [
        {"Material": str(i), "Describrition": f"中{i}", "Describrition_English": "pipe AW", "unit_price": float(i)}
        for i in range(30)
    ]
    df = _make_df(rows)
    with _patch_df(df):
        result = match_english_candidates("pipe AW", max_candidates=5)

    assert len(result) == 5
```

- [ ] **Step 2: 运行，确认全部失败**

```bash
python -m pytest backend/tools/inventory/tests/test_match_english_candidates.py -v
```

预期：`6 FAILED` — `ImportError` 或 `AttributeError: module has no attribute match_english_candidates`

- [ ] **Step 3: 实现 `match_english_candidates`**

在 `wanding_fuzzy_matcher.py` 文件末尾（`match_fuzzy_candidates` 函数之后）追加：

```python
def match_english_candidates(
    keywords: str,
    customer_level: str = "B",
    price_library_path: str | None = None,
    max_candidates: int = 20,
) -> list[dict[str, Any]]:
    """
    英文 query → Describrition_English CONTAINS 匹配。
    将 keywords 按空白/标点拆成 token（≥2 字符），每行需全部 token 命中才收录。
    返回 [{code, matched_name, description_english, unit_price, source}, ...]，最多 max_candidates 条。
    matched_name 为中文 Describrition，保持下游结构一致。
    """
    from backend.tools.inventory.config import config

    path = price_library_path or getattr(config, "WANDING_PRICE_LIBRARY_PATH", None)
    df = _get_cached_df(path, customer_level)
    if df.empty or "Describrition_English" not in df.columns:
        return []

    raw_tokens = re.split(r'[\s\"\'\-/\\]+', (keywords or "").strip())
    tokens = [t.lower() for t in raw_tokens if len(t) >= 2]
    if not tokens:
        return []

    results: list[dict[str, Any]] = []
    for row in df.itertuples(index=False):
        en_desc = str(getattr(row, "Describrition_English", "") or "").lower()
        if not en_desc:
            continue
        if all(t in en_desc for t in tokens):
            results.append({
                "code": str(getattr(row, "Material", "")).strip(),
                "matched_name": str(getattr(row, "Describrition", "")).strip(),
                "description_english": str(getattr(row, "Describrition_English", "")).strip(),
                "unit_price": float(getattr(row, "unit_price", 0) or 0),
                "source": "英文字段匹配",
            })
        if len(results) >= max_candidates:
            break
    return results
```

- [ ] **Step 4: 运行，确认全部通过**

```bash
python -m pytest backend/tools/inventory/tests/test_match_english_candidates.py -v
```

预期：`6 passed`

- [ ] **Step 5: Commit**

```bash
git add backend/tools/inventory/services/wanding_fuzzy_matcher.py backend/tools/inventory/tests/test_match_english_candidates.py
git commit -m "feat: 新增 match_english_candidates，英文 token CONTAINS 匹配 Describrition_English"
```

---

## Task 5: 服务层 — 新增 `match_quotation_english`

**Files:**
- Modify: `backend/tools/inventory/services/match_and_inventory.py`（在文件末尾追加）

- [ ] **Step 1: 写失败测试**

新建 `backend/tools/inventory/tests/test_match_quotation_english.py`：

```python
"""测试 match_quotation_english 调用 match_english_candidates 并透传结果。"""
from unittest.mock import patch


def test_delegates_to_match_english_candidates():
    from backend.tools.inventory.services.match_and_inventory import match_quotation_english

    fake_candidates = [
        {"code": "AAA", "matched_name": "聚乙烯管", "description_english": "HDPE pipe AW", "unit_price": 90.0, "source": "英文字段匹配"},
    ]

    with patch(
        "backend.tools.inventory.services.wanding_fuzzy_matcher.match_english_candidates",
        return_value=fake_candidates,
    ) as mock_fn:
        result = match_quotation_english("HDPE pipe AW", customer_level="B")

    mock_fn.assert_called_once_with(
        "HDPE pipe AW",
        customer_level="B",
        price_library_path=None,
    )
    assert result == fake_candidates


def test_returns_empty_when_no_candidates():
    from backend.tools.inventory.services.match_and_inventory import match_quotation_english

    with patch(
        "backend.tools.inventory.services.wanding_fuzzy_matcher.match_english_candidates",
        return_value=[],
    ):
        result = match_quotation_english("no match query")

    assert result == []
```

- [ ] **Step 2: 运行，确认失败**

```bash
python -m pytest backend/tools/inventory/tests/test_match_quotation_english.py -v
```

预期：`FAILED` — `ImportError: cannot import name 'match_quotation_english'`

- [ ] **Step 3: 实现 `match_quotation_english`**

在 `match_and_inventory.py` 文件末尾追加：

```python
def match_quotation_english(
    keywords: str,
    customer_level: str = "B",
    price_library_path: Optional[str] = None,
) -> List[dict[str, Any]]:
    """
    英文询价匹配：仅走 Describrition_English CONTAINS，跳过中文历史路与中文 token 匹配。
    返回格式与 match_quotation_union 一致：[{code, matched_name, unit_price, source}, ...]。
    """
    from backend.tools.inventory.services.wanding_fuzzy_matcher import match_english_candidates

    return match_english_candidates(
        keywords,
        customer_level=customer_level,
        price_library_path=price_library_path,
    )
```

- [ ] **Step 4: 运行，确认通过**

```bash
python -m pytest backend/tools/inventory/tests/test_match_quotation_english.py -v
```

预期：`2 passed`

- [ ] **Step 5: Commit**

```bash
git add backend/tools/inventory/services/match_and_inventory.py backend/tools/inventory/tests/test_match_quotation_english.py
git commit -m "feat: 新增 match_quotation_english 薄封装"
```

---

## Task 6: 工具层 — `_execute_match_quotation` 加 `lang` 路由

**Files:**
- Modify: `backend/tools/inventory/services/inventory_agent_tools.py:281-310`（`_execute_match_quotation`）
- Modify: `backend/tools/inventory/services/inventory_agent_tools.py:1346-1358`（工具 schema）

- [ ] **Step 1: 写失败测试**

新建 `backend/tools/inventory/tests/test_execute_match_quotation_lang.py`：

```python
"""测试 _execute_match_quotation 在 lang=en 时路由到英文匹配路径。"""
import json
from unittest.mock import patch, MagicMock


_ENGLISH_CANDIDATES = [
    {"code": "AAA", "matched_name": "聚乙烯管", "description_english": "HDPE pipe AW", "unit_price": 90.0, "source": "英文字段匹配"},
]

_LLM_BEST = {
    "code": "AAA",
    "matched_name": "聚乙烯管",
    "unit_price": 90.0,
    "_selection_meta": {"index": 0, "confidence": "high"},
}


def test_lang_en_routes_to_english_match():
    from backend.tools.inventory.services.inventory_agent_tools import _execute_match_quotation

    with (
        patch("backend.tools.inventory.services.match_and_inventory.match_quotation_english",
              return_value=_ENGLISH_CANDIDATES) as mock_en,
        patch("backend.tools.inventory.services.match_and_inventory.match_quotation_union",
              return_value=[]) as mock_zh,
        patch("backend.tools.inventory.services.llm_selector.llm_select_best",
              return_value=_LLM_BEST),
    ):
        result = _execute_match_quotation({"keywords": "HDPE pipe AW", "lang": "en"})

    mock_en.assert_called_once()
    mock_zh.assert_not_called()
    payload = json.loads(result["result"])
    assert payload.get("chosen", {}).get("code") == "AAA" or payload.get("single", {}).get("code") == "AAA"


def test_lang_zh_routes_to_chinese_match():
    """lang 未传或为 zh 时走原有 match_quotation_union。"""
    from backend.tools.inventory.services.inventory_agent_tools import _execute_match_quotation

    with (
        patch("backend.tools.inventory.services.match_and_inventory.match_quotation_union",
              return_value=[]) as mock_zh,
        patch("backend.tools.inventory.services.match_and_inventory.match_quotation_english",
              return_value=[]) as mock_en,
    ):
        _execute_match_quotation({"keywords": "三通50"})

    mock_zh.assert_called_once()
    mock_en.assert_not_called()


def test_lang_en_schema_accepts_lang_field():
    """工具 schema 应包含 lang 字段定义。"""
    from backend.tools.inventory.services.inventory_agent_tools import get_tools

    tools = get_tools()
    mq_tool = next(t for t in tools if t["function"]["name"] == "match_quotation")
    props = mq_tool["function"]["parameters"]["properties"]
    assert "lang" in props, "工具 schema 缺少 lang 字段"
```

- [ ] **Step 2: 运行，确认失败**

```bash
python -m pytest backend/tools/inventory/tests/test_execute_match_quotation_lang.py -v
```

预期：`3 FAILED`

- [ ] **Step 3: 修改 `_execute_match_quotation`**

在 `inventory_agent_tools.py` 第 293 行读取 `keywords` 之后、第 308 行 `candidates = match_quotation_union(...)` 之前，插入：

```python
lang = (arguments.get("lang") or "zh").strip().lower()
```

将第 308 行改为：

```python
if lang == "en":
    from backend.tools.inventory.services.match_and_inventory import match_quotation_english
    candidates = match_quotation_english(keywords, customer_level=customer_level)
else:
    candidates = match_quotation_union(keywords, customer_level=customer_level)
```

- [ ] **Step 4: 修改工具 schema**

找到 `inventory_agent_tools.py` 第 1348-1355 行的 `properties` 字典，在 `show_all_candidates` 之后加：

```python
"lang": {
    "type": "string",
    "description": "查询语言路径：'en' 表示英文询价，走 Describrition_English CONTAINS 匹配；默认不传（中文路径）。仅当 keywords 全为英文无汉字时传 'en'。",
},
```

- [ ] **Step 5: 运行，确认全部通过**

```bash
python -m pytest backend/tools/inventory/tests/test_execute_match_quotation_lang.py -v
```

预期：`3 passed`

- [ ] **Step 6: Commit**

```bash
git add backend/tools/inventory/services/inventory_agent_tools.py backend/tools/inventory/tests/test_execute_match_quotation_lang.py
git commit -m "feat: _execute_match_quotation 增加 lang 参数路由英文匹配路径"
```

---

## Task 7: Prompt 层 — `skills.py` 加英文价格查询路由规则

**Files:**
- Modify: `backend/plugins/jagent/skills.py`

- [ ] **Step 1: 找到两处需修改的位置**

在 `skills.py` 中找到以下两处字符串变量：
- `SKILL_INVENTORY_PRICE_RULES`（第 62 行附近，`IF/THEN RULES` 版）：在第 90 行 `- IF the request is an **English product name inventory request**` 之后插入
- `SKILL_INVENTORY_PRICE_DOC`（DOC 版，`- **match_quotation(keywords, customer_level?)**` 描述处）：在说明 `show_all_candidates` 参数之后插入

- [ ] **Step 2: 修改 RULES 版（`SKILL_INVENTORY_PRICE_RULES`）**

在第 90 行（`- IF the request is an **English product name inventory request**...`）之后、第 91 行之前，插入：

```
- IF the user asks for **价格/报价** AND keywords contain **only English letters** (no Chinese characters), THEN call match_quotation(keywords, lang="en") to route to the English description field matching.
  - Example (Correct): `3" AW pipe price` → match_quotation(keywords='3" AW pipe', lang="en") ✅
  - Example (Incorrect): `3" AW pipe price` → match_quotation(keywords='3" AW pipe') ❌（未传 lang="en"，中文路径无法命中）
```

- [ ] **Step 3: 修改 DOC 版（`SKILL_INVENTORY_PRICE_DOC`）**

找到 `match_quotation` 工具说明段落（第 17 行附近）中 `show_all_candidates` 参数描述后，追加：

```
可选参数 `lang="en"`：当 keywords 全为英文（无汉字）时传入，走 Describrition_English 字段匹配路径，适用于用户以英文描述产品时的询价。
```

- [ ] **Step 4: 人工核查 skills.py 修改**

```bash
grep -n 'lang="en"\|lang=.en.' "D:/Projects/agent-jk/Agent Team version3/backend/plugins/jagent/skills.py"
```

预期：至少看到 2 处 `lang="en"` 相关内容（RULES 和 DOC 版各一处）。

- [ ] **Step 5: Commit**

```bash
git add backend/plugins/jagent/skills.py
git commit -m "feat: skills.py 库存路由规则补英文 query → lang='en' 说明"
```

---

## Task 8: 端到端手工验证

_此任务无自动化测试，需启动 backend 手工验证。_

- [ ] **Step 1: 启动 backend**

```bash
cd "D:/Projects/agent-jk/Agent Team version3"
python run_backend.py
```

- [ ] **Step 2: 发送英文询价请求**

向 Chat 发送：`3" AW pipe price`（或通过前端 UI 输入）。

预期：Agent 触发 `match_quotation(keywords='3" AW pipe', lang="en")`，返回候选卡片（来源标注「英文字段匹配」），LLM 完成选型，显示产品名、单价。

- [ ] **Step 3: 验证中文路径不受影响**

向 Chat 发送：`直接50 价格`。

预期：走原有中文路径，不触发 `lang="en"`，结果与改动前一致。

- [ ] **Step 4: 验证无英文数据时的 unmatched 处理**

向 Chat 发送：`zzz nonexistent pipe english`。

预期：`match_english_candidates` 返回 `[]`，Agent 回复「未找到匹配产品，请尝试中文描述或检查规格」。

- [ ] **Step 5: 最终 commit**

```bash
git add .
git commit -m "chore: 英文询价匹配功能完成，端到端验证通过"
```
