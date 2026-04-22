# 英文询价匹配设计（English match_quotation）

**日期**：2026-04-21  
**范围**：`Agent Team version3/backend/`  
**目标**：当询价关键词为英文时，走 `Describrition_English` CONTAINS + LLM 选型路径，替代现有中文 token 匹配逻辑。

---

## 问题

`search_fuzzy` 的 token 打分逻辑基于中文分词。英文 query（如 `3" AW pipe`）在中文 `Describrition` 列上 score 全为 0，两路（历史报价路 + 字段匹配路）均返回空，最终 `unmatched`。

Neon 表 `万鼎价格库_管材与国标管件_标准格式` 已有 `Describrition_English`（text, nullable）列，Excel 同列为 index 3（0-based）。

---

## 设计

### 触发方式：LLM 在 prompt 中判断语言，传 `lang="en"`

在 `skills.py` 库存技能 prompt 里增加路由规则（见第 5 节），由 Agent LLM 判断 query 语言并决定是否传 `lang="en"`。工具侧按参数路由，不做代码级语言检测。

---

## 4 层改动

### 1. DB 层：`repository.py` — `fetch_all_price_library`

在 SELECT 中加 `Describrition_English`：

```python
# 现有 SELECT（第 157-165 行）末尾加一列：
f"{_quote_sql_identifier('Describrition_English')} AS description_english, "
```

返回的 `dict` 每行多一个 key `description_english`（可为 `None`）。

---

### 2. 数据层：`wanding_fuzzy_matcher.py`

**`_load_one_sheet`**（第 685-702 行）：

```python
# 现在只读 cells[1], cells[2]；改为同时读 cells[3]
rows.append({
    "Material": str(cells[1] or "").strip(),
    "Describrition": str(cells[2] or "").strip(),
    "Describrition_English": str(cells[3] or "").strip() if len(cells) > 3 else "",
    "unit_price": up,
})
```

**`_try_load_from_db`**（第 859-895 行）：

```python
records.append({
    "Material": ...,
    "Describrition": ...,
    "Describrition_English": str(r.get("description_english") or "").strip(),
    "unit_price": up_f,
})
```

`load_wanding_df` 无需额外改动，`_load_one_sheet` 已经带上该列，DataFrame 自然包含。

---

### 3. 匹配函数：`wanding_fuzzy_matcher.py` — 新增 `match_english_candidates`

```python
def match_english_candidates(
    keywords: str,
    customer_level: str = "B",
    price_library_path: str | None = None,
    max_candidates: int = 20,
) -> list[dict]:
    """
    英文 query → Describrition_English CONTAINS 匹配。
    将 keywords 拆成空格分隔 token（≥2 字符），每行需全部 token 命中才收录。
    返回 [{code, matched_name, description_english, unit_price}, ...]，最多 max_candidates 条。
    """
    from backend.tools.inventory.config import config

    path = price_library_path or getattr(config, "WANDING_PRICE_LIBRARY_PATH", None)
    df = _get_cached_df(path, customer_level)
    if df.empty or "Describrition_English" not in df.columns:
        return []

    # 拆 token：去除引号/特殊符号，保留长度≥2的词
    raw_tokens = re.split(r'[\s\"\'\-/\\]+', keywords.strip())
    tokens = [t.lower() for t in raw_tokens if len(t) >= 2]
    if not tokens:
        return []

    results = []
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

**说明**：
- 不改 `search_fuzzy`，英文路径完全独立。
- `matched_name` 仍返回中文描述，保持下游（LLM 选型、前端卡片）结构一致。
- `description_english` 额外透传，供 LLM 选型参考。

---

### 4. 服务层：`match_and_inventory.py` — 新增 `match_quotation_english`

```python
def match_quotation_english(
    keywords: str,
    customer_level: str = "B",
    price_library_path: str | None = None,
) -> list[dict]:
    """
    英文询价并集：仅走 Describrition_English CONTAINS，跳过中文历史路。
    返回格式与 match_quotation_union 一致：[{code, matched_name, unit_price, source}, ...]。
    """
    from backend.tools.inventory.services.wanding_fuzzy_matcher import match_english_candidates

    return match_english_candidates(
        keywords,
        customer_level=customer_level,
        price_library_path=price_library_path,
    )
```

---

### 5. 工具层：`inventory_agent_tools.py` — `_execute_match_quotation` 增加 `lang` 路由

在 `_execute_match_quotation` 读取参数处（第 293 行附近）加：

```python
lang = (arguments.get("lang") or "zh").strip().lower()
```

在 `candidates = match_quotation_union(...)` 之前加分支：

```python
if lang == "en":
    from backend.tools.inventory.services.match_and_inventory import match_quotation_english
    candidates = match_quotation_english(keywords, customer_level=customer_level)
else:
    candidates = match_quotation_union(keywords, customer_level=customer_level)
```

后续 `norm` 整形、LLM 选型、SSE 推送逻辑**完全复用**，无需改动。

---

### 6. Prompt 层：`skills.py` — 库存/价格技能路由规则

在「库存/价格」技能的路由规则块（`IF/THEN` 或 DOC 版说明）里增加：

```
- 如果询价关键词**全部为英文**（无汉字），调用 match_quotation 时传入 lang="en"。
  示例：keywords="3\" AW pipe"  →  match_quotation(keywords="3\" AW pipe", lang="en")
- 中文或中英混合 keywords 不传 lang（默认走中文路径）。
```

---

### 7. 类型过滤扩展：`product_type`（国标/日标）

- `match_quotation` / `match_quotation_batch` 新增可选参数 `product_type`（`国标` / `日标`）。
- 过滤策略为 **strict**：
  - 传入 `product_type` 后，仅保留 `Product_Type` 完全匹配的候选；
  - 若过滤后为空，返回无候选（并记录 warning 日志）；
  - 若数据源缺少 `Product_Type` 列，视为无法满足 strict，直接无候选并告警。
- 参数透传覆盖中文与英文两条路径：
  - 中文：`match_quotation_union -> match_wanding_price_candidates -> match_fuzzy_candidates`
  - 英文：`match_quotation_english -> match_english_candidates`
- `match_quotation_batch` 会把 `product_type` 透传到每个单项查询；自动批量分流时也会保留该参数。

---

## 数据流对比

```
英文 query "3\" AW pipe"
│
├─ _execute_match_quotation(lang="en")
│   └─ match_quotation_english(keywords)
│       └─ match_english_candidates(keywords)
│           ─ tokens: ["3", "AW", "pipe"]
│           ─ 对 df["Describrition_English"] CONTAINS 全 token
│           ─ 返回 ≤20 候选（含 matched_name 中文名、description_english）
│
├─ llm_select_best(keywords, candidates)   ← 已有逻辑，无需改
│
└─ 返回 {single|needs_selection|unmatched, ...}  ← 结构不变
```

---

## 边界情况

| 场景 | 处理 |
|------|------|
| `Describrition_English` 全为 NULL/空 | `match_english_candidates` 返回 `[]` → `unmatched`，Agent 可提示「英文匹配无结果，请尝试中文描述」 |
| DB 路径（Neon）未更新英文列 | `description_english` 字段为空字符串，同上 |
| 历史报价路（mapping_table_matcher） | **暂不改动**，英文路径跳过该路 |
| tokens 全为单字符（如 `"3"` 单独） | `len(t) >= 2` 过滤，需至少一个有效 token 才匹配；若全过滤返回 `[]` |

---

## 改动文件清单

| 文件 | 改动 |
|------|------|
| `backend/tools/admin/repository.py` | `fetch_all_price_library` SELECT 加 `Describrition_English` |
| `backend/tools/inventory/services/wanding_fuzzy_matcher.py` | `_load_one_sheet` 读 `cells[3]`；`_try_load_from_db` 加 `description_english`；新增 `match_english_candidates` |
| `backend/tools/inventory/services/match_and_inventory.py` | 新增 `match_quotation_english` |
| `backend/tools/inventory/services/inventory_agent_tools.py` | `_execute_match_quotation` 读 `lang` 参数并路由 |
| `backend/plugins/jagent/skills.py` | 库存路由规则加英文 query → `lang="en"` 说明 |
