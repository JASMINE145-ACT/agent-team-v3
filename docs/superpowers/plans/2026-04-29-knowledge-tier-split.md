# Knowledge Tier Split Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把确定性打分规则从 `wanding_business_knowledge.md` 剥离进新函数 `_apply_candidate_pre_filter()`，让代码层和 MD 层各司其职，消除规则重复，防止 md 激增导致 LLM 准确率下滑。

**Architecture:** 新增 `_apply_candidate_pre_filter(keywords, candidates)` 统一执行 7 类确定性打分规则（默认排水、日标优先、冷热水、压强、联塑、来源权重），LLM 选型前和规则回退均调用此函数；`_rule_based_fallback` 简化为直接取 pre_filter 排序第一位；`wanding_business_knowledge.md` 删除所有代码层已覆盖条目。

**Tech Stack:** Python 3.11, pytest, `backend/tools/inventory/services/llm_selector.py`, `backend/tools/data/wanding_business_knowledge.md`

---

## 文件变更地图

| 文件 | 操作 | 职责 |
|------|------|------|
| `backend/tools/inventory/services/llm_selector.py` | **修改** | 新增 `_apply_candidate_pre_filter()`；简化 `_rule_based_fallback`；在 LLM 路径前插入 pre_filter；精简 `_BUSINESS_KNOWLEDGE` |
| `backend/tools/data/wanding_business_knowledge.md` | **修改** | 删除代码层已覆盖的 7 类条目，保留语义判断类规则 |
| `tests/unit/test_candidate_pre_filter.py` | **新建** | 7 类打分规则各自的正反 case 单元测试 |

---

## Task 1：为 `_apply_candidate_pre_filter` 写失败测试

**Files:**
- Create: `tests/unit/test_candidate_pre_filter.py`

- [ ] **Step 1: 创建测试文件**

```python
# tests/unit/test_candidate_pre_filter.py
"""Unit tests for _apply_candidate_pre_filter — one test per scoring rule."""
import pytest
from backend.tools.inventory.services.llm_selector import _apply_candidate_pre_filter


def _c(name: str, source: str = "字段匹配", price: float = 100.0) -> dict:
    return {"code": "8000000001", "matched_name": name, "unit_price": price, "source": source}


# ── Rule: 默认排水 ──────────────────────────────────────────────────────────
def test_default_drainage_demotes_aw_when_no_water_supply_signal():
    candidates = [
        _c("90°弯头印尼(日标)PVC-U管件(AW给水系列)灰色 DN50 联塑", source="共同"),
        _c("90°弯头PVC-U排水配件白色 dn50"),
    ]
    result = _apply_candidate_pre_filter("50弯头", candidates)
    assert "排水配件" in result[0]["matched_name"]


def test_default_drainage_keeps_aw_when_water_supply_signal():
    candidates = [
        _c("90°弯头印尼(日标)PVC-U管件(AW给水系列)灰色 DN50 联塑", source="共同"),
        _c("90°弯头PVC-U排水配件白色 dn50"),
    ]
    result = _apply_candidate_pre_filter("50给水弯头", candidates)
    assert "AW给水系列" in result[0]["matched_name"]


# ── Rule: 日标优先 ──────────────────────────────────────────────────────────
def test_jis_priority_promotes_japanese_standard():
    candidates = [
        _c("90°顺水三通PVC-U排水配件白色 dn110", source="共同"),
        _c("短型顺水三通印尼(日标)PVC-U管件(D排水系列)灰色 DN100 联塑"),
    ]
    result = _apply_candidate_pre_filter("110三通", candidates)
    assert "印尼(日标)" in result[0]["matched_name"]


def test_jis_priority_skipped_when_guobiao_signal():
    candidates = [
        _c("90°顺水三通PVC-U排水配件白色 dn110", source="共同"),
        _c("短型顺水三通印尼(日标)PVC-U管件(D排水系列)灰色 DN100"),
    ]
    result = _apply_candidate_pre_filter("国标110三通", candidates)
    # 国标信号 → 日标不加权，来源=共同(+9)决定排序
    assert "dn110" in result[0]["matched_name"].lower()


# ── Rule: 热/冷水 ───────────────────────────────────────────────────────────
def test_hot_water_promotes_hot_supply():
    candidates = [
        _c("冷给水直管印尼(日标) DN25 联塑", source="历史报价"),
        _c("热给水直管印尼(日标) DN25 联塑"),
    ]
    result = _apply_candidate_pre_filter("PPR热水管DN25", candidates)
    assert "热给水" in result[0]["matched_name"]


def test_cold_water_demotes_hot_supply():
    candidates = [
        _c("热给水直管印尼(日标) DN25 联塑", source="历史报价"),
        _c("冷给水直管印尼(日标) DN25 联塑"),
    ]
    result = _apply_candidate_pre_filter("冷水管DN25", candidates)
    assert "冷给水" in result[0]["matched_name"]


# ── Rule: 压强默认 1.0MPa ───────────────────────────────────────────────────
def test_default_pressure_promotes_1mpa():
    candidates = [
        _c("PVC-U给水管 DN50 1.25MPa"),
        _c("PVC-U给水管 DN50 1.0MPa"),
    ]
    result = _apply_candidate_pre_filter("DN50给水管", candidates)
    assert "1.0MPa" in result[0]["matched_name"] or "1.0mpa" in result[0]["matched_name"].lower()


# ── Rule: 联塑品牌 tie-break ────────────────────────────────────────────────
def test_liansu_brand_tiebreak():
    # 完全相同条件下，联塑排前
    candidates = [
        _c("90°弯头PVC-U排水配件白色 dn50 其他品牌"),
        _c("90°弯头PVC-U排水配件白色 dn50 联塑"),
    ]
    result = _apply_candidate_pre_filter("50弯头排水", candidates)
    assert "联塑" in result[0]["matched_name"]


# ── Rule: 来源权重 ──────────────────────────────────────────────────────────
def test_source_priority_ranking():
    candidates = [
        _c("PVC-U 排水弯头 dn50", source="字段匹配"),
        _c("PVC-U 排水弯头 dn50 联塑", source="历史报价"),
        _c("PVC-U 排水弯头 dn50", source="共同"),
    ]
    result = _apply_candidate_pre_filter("50排水弯头", candidates)
    # 共同(+9) > 历史报价(+6) > 字段匹配(+3)
    assert result[0]["source"] == "共同"
    assert result[1]["source"] == "历史报价"


# ── Meta: _pre_score 字段 ───────────────────────────────────────────────────
def test_pre_score_key_attached_to_all_candidates():
    candidates = [_c("product A"), _c("product B")]
    result = _apply_candidate_pre_filter("keyword", candidates)
    assert all("_pre_score" in c for c in result)


def test_empty_candidates_returns_empty():
    assert _apply_candidate_pre_filter("keyword", []) == []
```

- [ ] **Step 2: 运行测试，确认全部失败**

```bash
cd "d:/Projects/agent-jk/Agent Team version3"
py -m pytest tests/unit/test_candidate_pre_filter.py -v
```

期望：`ImportError` 或 `AttributeError: module has no attribute '_apply_candidate_pre_filter'`

- [ ] **Step 3: 提交测试文件**

```bash
git add tests/unit/test_candidate_pre_filter.py
git commit -m "test(selector): add failing tests for _apply_candidate_pre_filter"
```

---

## Task 2：实现 `_apply_candidate_pre_filter`

**Files:**
- Modify: `backend/tools/inventory/services/llm_selector.py`

在 `_rule_based_fallback` 函数定义（约第 698 行）**之前**插入新函数。

- [ ] **Step 1: 在 `llm_selector.py` 的 `_rule_based_fallback` 定义前插入以下函数**

```python
def _apply_candidate_pre_filter(
    keywords: str,
    candidates: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    """
    Apply deterministic scoring rules to candidates before LLM selection.
    Returns candidates sorted by _pre_score descending.
    Only re-ranks — never filters. LLM can still override edge cases.
    """
    if not candidates:
        return candidates

    import re as _re

    kw_low = (keywords or "").lower()

    # Signal detection
    has_water_supply = (
        "给水" in kw_low
        or "aw给水" in kw_low
        or " aw" in kw_low
        or kw_low.startswith("aw")
    )
    has_guobiao = "国标" in kw_low
    has_hot_water = "热水" in kw_low or "热给水" in kw_low
    has_cold_water = "冷水" in kw_low or "冷给水" in kw_low
    has_pressure = bool(_re.search(r"\d+\.?\d*\s*mpa|pn\s*\d+", kw_low))

    scored: list[dict[str, Any]] = []
    for c in candidates:
        score = 0
        name_raw: str = c.get("matched_name") or ""
        name = name_raw.lower()
        src = (c.get("source") or "").strip()

        # ── 默认排水（-15 / +8）──────────────────────────────────────────
        if not has_water_supply:
            if "aw给水系列" in name or "(aw" in name:
                score -= 15
            if "d排水系列" in name or "排水配件" in name:
                score += 8

        # ── 日标优先（+6）────────────────────────────────────────────────
        if not has_guobiao:
            if "印尼(日标)" in name_raw:
                score += 6

        # ── 热/冷水（±8 / ∓7）───────────────────────────────────────────
        if has_hot_water:
            if "热给水" in name:
                score += 8
            if "冷给水" in name:
                score -= 7
        if has_cold_water:
            if "冷给水" in name:
                score += 8
            if "热给水" in name:
                score -= 7

        # ── 压强默认 1.0MPa（+3 / -2）───────────────────────────────────
        if not has_pressure:
            if "1.0mpa" in name or "1 mpa" in name:
                score += 3
            if "1.25mpa" in name or "1.6mpa" in name:
                score -= 2

        # ── 联塑品牌 tie-break（+2）──────────────────────────────────────
        if "联塑" in name_raw:
            score += 2

        # ── 来源权重（+9 / +6 / +3）─────────────────────────────────────
        rank = _source_rank(src)
        if rank == 0:
            score += 9
        elif rank == 1:
            score += 6
        elif rank == 2:
            score += 3

        entry = dict(c)
        entry["_pre_score"] = score
        scored.append(entry)

    return sorted(scored, key=lambda x: x["_pre_score"], reverse=True)
```

- [ ] **Step 2: 运行测试，确认全部通过**

```bash
py -m pytest tests/unit/test_candidate_pre_filter.py -v
```

期望：11 个测试全部 PASS

- [ ] **Step 3: 提交**

```bash
git add backend/tools/inventory/services/llm_selector.py
git commit -m "feat(selector): add _apply_candidate_pre_filter with 7 deterministic scoring rules"
```

---

## Task 3：简化 `_rule_based_fallback`，接入 LLM 路径

**Files:**
- Modify: `backend/tools/inventory/services/llm_selector.py`

- [ ] **Step 1: 找到 `_rule_based_fallback`（约第 698–779 行），整体替换为以下内容**

```python
def _rule_based_fallback(
    keywords: str,
    candidates: list[dict[str, Any]],
    reason: str = "llm_error",
) -> Optional[dict[str, Any]]:
    if not candidates:
        return None
    sorted_candidates = _apply_candidate_pre_filter(keywords, candidates)
    c = sorted_candidates[0]
    return {
        "code": (c.get("code") or "").strip(),
        "matched_name": (c.get("matched_name") or "")[:200],
        "unit_price": float(c.get("unit_price", 0) or 0),
        "reasoning": f"[规则回退] {reason}",
        "_selection_meta": {
            "from_rule_fallback": True,
            "pre_score": c.get("_pre_score", 0),
        },
    }
```

- [ ] **Step 2: 找到 LLM 快速路径中的 `_sort_candidates_by_source(candidates)`（约第 395 行），替换为 `_apply_candidate_pre_filter`**

找到：
```python
sorted_candidates = _sort_candidates_by_source(candidates)
llm_candidates = sorted_candidates[:candidate_limit]
```

替换为：
```python
sorted_candidates = _apply_candidate_pre_filter(keywords, candidates)
llm_candidates = sorted_candidates[:candidate_limit]
```

- [ ] **Step 3: 运行全量测试，确认无回归**

```bash
py -m pytest tests/ -k "not live" -q --tb=short
```

期望：原有 360 个测试 + 新增 11 个，全部 PASS

- [ ] **Step 4: 提交**

```bash
git add backend/tools/inventory/services/llm_selector.py
git commit -m "refactor(selector): wire _apply_candidate_pre_filter into LLM path and rule fallback"
```

---

## Task 4：精简 `_BUSINESS_KNOWLEDGE` 内嵌摘要

**Files:**
- Modify: `backend/tools/inventory/services/llm_selector.py`

- [ ] **Step 1: 找到 `_BUSINESS_KNOWLEDGE`（约第 80–88 行），替换为以下内容**

```python
_BUSINESS_KNOWLEDGE = """
候选选择业务规则（摘要）：
1. 选择与关键词最贴近的规格、材质、口径、用途。
2. 口径优先：dn50、50、1-1/2 需对应转换后再比对。
3. 材质优先：PPR/PVC-U/PE 不能混选，除非关键词未指定且候选强相关。
4. 来源是 tie-breaker：共同>历史报价>字段匹配，但语义冲突时语义优先。
5. 若都不匹配可返回 index=0。原因须 ≥10 字。
""".strip()
```

（注：默认排水、日标优先、冷热水、压强规则已由 `_apply_candidate_pre_filter` 在传给 LLM 前完成重排，LLM 系统提示无需重复。）

- [ ] **Step 2: 运行测试**

```bash
py -m pytest tests/ -k "not live" -q --tb=short
```

期望：全部 PASS

- [ ] **Step 3: 提交**

```bash
git add backend/tools/inventory/services/llm_selector.py
git commit -m "refactor(selector): trim _BUSINESS_KNOWLEDGE to 5 items, remove rules now in pre_filter"
```

---

## Task 5：瘦身 `wanding_business_knowledge.md`

**Files:**
- Modify: `backend/tools/data/wanding_business_knowledge.md`

- [ ] **Step 1: 将文件内容替换为以下精简版**

```markdown
# 万鼎选型知识库（面向 Agent 选型）

本文件用于指导 `match_quotation` / `match_quotation_batch` 在多候选时的选择。  
目标：减少"选错品类、选错冷热、选错规格、过度依赖来源"的问题。

> **注意**：以下规则仅保留需要语义判断的内容。
> 默认排水、日标优先、冷热水默认、压强默认、来源权重等确定性规则
> 已在代码层 `_apply_candidate_pre_filter()` 中实现，本文件不重复记录。

---

## 1) 选型总原则（硬约束）

按下面顺序决策，前一层不满足时不得进入后一层：

1. **品类语义一致性（最高优先）**
2. **关键规格一致性（必须）**
3. **次级属性比较（压力等级/S 系列/品牌）**
4. **来源加权（仅作 tie-breaker，不是一票否决）**

### 1.1 来源规则

- 来源只在"语义与规格都接近"时生效；
- 当来源优先候选与用户语义冲突时（如用户要"热水管"，候选是"冷给水"），**必须降权或排除**。

### 1.2 典型纠偏（热水管案例）

用户：`PPR热水管3/4寸`  
如果候选中"字段匹配"有 `热给水直管 dn25 (3/4")`，而"历史报价"是 `冷给水直管 dn25 (3/4")`，应优先热给水直管。  
**结论：语义一致性（热/冷）高于来源优先级。**

---

## 2) 弯头角度（强约束）

- 半弯 => 45°弯头（不得与"弯头"泛化混同）
- 全弯 / 直角弯 => 90°弯头
- 未写"半弯"的"弯头"默认按 90°优先

---

## 3) 主径×副径（A*B / A×B / AB）规则

- 形如 `32*20` / `32×20` / `3220`：A 为主径（dn），B 为副径（英寸侧）
- B 与英寸映射：15/16/20 => 1/2"；25 => 3/4"；32 => 1"；40 => 1-1/4"；50 => 1-1/2"
- A 与 dn 映射：20=>dn20，25=>dn25，32=>dn32，40=>dn40
- 示例：`32*20内丝三通` => 优先 `dn32x1/2"`，不选 `dn32x3/4"`
- 若仅单数值（如 `32弯头`）且无副径，不推断副径

---

## 4) 场景型业务规则

1. 三角阀 != 角阀；仅有角阀候选时判无匹配
2. 软管：库内无软管类产品，询价含"软管"返回无匹配
3. 规格精确匹配优先：dn25 不选 dn20
4. 等径三通优先于异径三通（除非用户明确要异径）
5. `50cm` 表示长度，不得误判为 dn50 管径
6. 电工套管场景：
   - conduit / 电线管 => PVC 电线管(B管)
   - socket => 管直通(套筒)
   - klem / 马鞍卡 => 管夹(U型)
   - tdust 4 cabang => 管四通圆接线盒(带盖)
   - 热熔器 => 焊接机

---

## 5) 用户纠正沉淀（高优先级）



## 6) 待处理业务提醒（不参与选型）
```

- [ ] **Step 2: 运行测试，确认无回归**

```bash
py -m pytest tests/ -k "not live" -q --tb=short
```

期望：全部 PASS

- [ ] **Step 3: 验证文件行数**

```bash
python -c "
lines = open('backend/tools/data/wanding_business_knowledge.md', encoding='utf-8').readlines()
print(f'行数: {len(lines)}')
assert len(lines) <= 70, f'超过70行: {len(lines)}'
print('OK')
"
```

期望：行数 ≤ 70

- [ ] **Step 4: 提交**

```bash
git add backend/tools/data/wanding_business_knowledge.md
git commit -m "refactor(knowledge): slim md to ~60 lines, remove all code-tier duplicates"
```

---

## 自检清单

### Spec 覆盖

| Spec 要求 | Task |
|-----------|------|
| 新增 `_apply_candidate_pre_filter` | Task 2 |
| 7 类规则（默认排水/日标/冷热水/压强/联塑/来源） | Task 2 |
| LLM 路径接入 pre_filter | Task 3 |
| `_rule_based_fallback` 简化 < 10 行 | Task 3 |
| `_BUSINESS_KNOWLEDGE` 精简 | Task 4 |
| md ≤ 70 行 | Task 5 |
| 单元测试覆盖全部 7 类规则正反 case | Task 1 |
| 现有 360 测试通过 | Task 3 Step 3 |

### 工作量估算

| Task | 预计时间 |
|------|---------|
| Task 1: 测试 | 20 min |
| Task 2: 实现 pre_filter | 20 min |
| Task 3: 接入两处调用 | 20 min |
| Task 4: 精简 _BUSINESS_KNOWLEDGE | 5 min |
| Task 5: md 瘦身 | 15 min |
| **合计** | **~80 min** |
