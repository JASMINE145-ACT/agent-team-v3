# Knowledge Tier Split Design

> **Date:** 2026-04-29  
> **Scope:** `backend/tools/inventory/services/llm_selector.py` · `wanding_business_knowledge.md`  
> **Problem:** Business rules duplicated across code and md; md grows unbounded causing LLM accuracy to degrade.

---

## 1. Boundary Principle

Every rule belongs to exactly one tier. The test:

> *"Can this rule be expressed as `if keyword_signal and product_signal → score_delta`?"*
> - **Yes** → Code Tier (deterministic, no LLM needed)
> - **No** (requires semantic understanding or candidate comparison) → MD Tier

---

## 2. Code Tier — `_apply_candidate_pre_filter`

### 2.1 Interface

```python
def _apply_candidate_pre_filter(
    keywords: str,
    candidates: list[dict],
) -> list[dict]:
    """
    Apply deterministic scoring rules to candidates before LLM sees them.
    Returns candidates sorted by _pre_score descending.
    Does NOT filter — only re-ranks. LLM can still override edge cases.
    Each candidate receives a '_pre_score' key for debugging.
    """
```

### 2.2 Rules (in priority order)

| Rule | Signal detection | Score delta |
|------|-----------------|-------------|
| 默认排水 | `keywords` lacks `给水 / aw` | AW给水系列: **-15** · D排水系列: **+8** |
| 日标优先 | `keywords` lacks `国标` | 印尼(日标)候选: **+6** |
| 热水场景 | `热水 / 热给水` in `keywords` | 热给水: **+8** · 冷给水: **-7** |
| 冷水场景 | `冷水 / 冷给水` in `keywords` | 冷给水: **+8** · 热给水: **-7** |
| 压强默认 | no MPa/PN signal in `keywords` | `1.0mpa / 1mpa`: **+3** · `1.25mpa / 1.6mpa`: **-2** |
| 联塑品牌 | (always, tie-break only) | 名称含「联塑」: **+2** |
| 来源权重 | (always) | 共同: **+9** · 历史报价: **+6** · 字段匹配: **+3** |

### 2.3 Call sites

**LLM 选型路径（选型前调用）：**
```python
sorted_candidates = _apply_candidate_pre_filter(keywords, candidates)
llm_candidates = sorted_candidates[:candidate_limit]
# LLM 看到的第1位已是代码层最优选
```

**规则回退路径（简化为1行）：**
```python
def _rule_based_fallback(keywords, candidates, reason):
    sorted_candidates = _apply_candidate_pre_filter(keywords, candidates)
    return _candidate_to_result(sorted_candidates[0], f"[规则回退] {reason}")
# 删除原有 ~60 行打分逻辑
```

### 2.4 `_BUSINESS_KNOWLEDGE` 内嵌摘要更新

保留 7、8 两条新增规则（LLM fast-path 需要文字说明），删除其余与 pre_filter 重复的条目，最终保持 6 条以内。

---

## 3. MD Tier — `wanding_business_knowledge.md` 瘦身

### 3.1 删除项（已有代码对等实现）

| 章节 | 内容 | 理由 |
|------|------|------|
| 2.1 | 同义词组 | 已在 `SYNONYM_GROUPS` |
| 2.3 | 外语/口语映射 | 已在 `QUERY_TERM_TO_CHINESE` |
| 3.1 | 尺寸→DN 映射 | 已在 `MM_TO_INCH` / `OD_TO_DN_JIS` |
| 4-rules 4,5,9 | 排水优先/50直接/110弯头 | pre_filter 默认排水已覆盖 |
| 4-rules 11,12 | 默认1.0MPa、冷热水默认 | pre_filter 已覆盖 |
| 4-rule 13 | 默认排水、日标优先 | pre_filter 已覆盖 |
| 1.1 来源权重数字 | 共同>历史>字段 三档排序 | pre_filter source 打分已覆盖 |

### 3.2 保留项（LLM 语义判断必需）

| 章节 | 内容 | 保留原因 |
|------|------|---------|
| 第 1 节 | 总原则层级（品类>规格>属性>来源） | LLM 决策框架 |
| 第 1.1 | 来源是 tie-breaker，非一票否决 | LLM 理解来源边界 |
| 第 1.2 | 热水管典型纠偏案例 | 示范性推理例子 |
| 第 2.2 | 弯头角度强约束（半弯≠全弯） | 语义约束 |
| 第 3.2 | 主径×副径场景 | 需要组合推理 |
| 第 4 节（保留部分） | 三角阀≠角阀、软管无货、规格精确、电工套管场景 | 语义判断 |
| 第 5 节 | 用户纠正沉淀 | 动态积累，必须在 md |
| 第 6 节 | 待处理提醒 | 运营记录 |

### 3.3 规模预估

```
改前：~130 行（含大量机械规则重复）
改后：~60  行（仅语义判断规则）
未来增长：主要是第 5 节用户纠正，有上限
```

---

## 4. 文件变更地图

| 文件 | 操作 | 内容 |
|------|------|------|
| `backend/tools/inventory/services/llm_selector.py` | **修改** | 新增 `_apply_candidate_pre_filter()`；简化 `_rule_based_fallback`；在 LLM 路径前插入 pre_filter 调用；精简 `_BUSINESS_KNOWLEDGE` |
| `backend/tools/data/wanding_business_knowledge.md` | **修改** | 删除所有代码层已覆盖条目，保留语义判断类规则 |
| `tests/unit/test_candidate_pre_filter.py` | **新建** | 单元测试：每条打分规则的正反 case |

---

## 5. 不变量

- `_apply_candidate_pre_filter` 只重排，不过滤——LLM 仍可看到全部候选
- `_BUSINESS_KNOWLEDGE`（system prompt）保留文字规则说明，防止 LLM 在 fast-path 无法看到 md 时退化
- md 文件中**不得出现**任何可以表达为 `signal → score_delta` 的规则
- 代码层规则变更后，md 中**不需要**同步更新

---

## 6. 成功标准

- `test_candidate_pre_filter.py` 覆盖全部 7 类规则的正反 case
- `_rule_based_fallback` 代码行数 < 10 行（删除原有打分逻辑）
- `wanding_business_knowledge.md` ≤ 70 行
- 现有 360 个测试全部通过
