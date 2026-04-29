# LLM Selector 架构：规则归编码，判断归 LLM

> 最后更新：2026-04-29  
> 相关文件：`backend/tools/inventory/services/llm_selector.py` · `backend/tools/data/wanding_business_knowledge.md`

---

## 1. 核心原则

**一条规则属于且仅属于一个层级。判断标准：**

> *"这条规则能写成 `if keyword_signal and product_signal → score_delta` 吗？"*
> - **能** → 代码层（`_apply_candidate_pre_filter`）
> - **不能**，需要语义理解或候选比较 → MD 层（`wanding_business_knowledge.md`）

`wanding_business_knowledge.md` **不得出现**任何已在代码层实现的规则。

---

## 2. 整体数据流

```
match_quotation / match_quotation_batch
  ↓
fuzzy_match（字段匹配 + 同义词扩展 + OD→DN 映射）→ 最多 8–15 个候选
  ↓
_apply_candidate_pre_filter(keywords, candidates)
  确定性打分重排，每个候选附 _pre_score
  ↓
LLM selector（读 wanding_business_knowledge.md）
  语义判断，输出 {index, reason}
  ↓
若 LLM 超时/报错 → _rule_based_fallback
  直接取 pre_filter 排序第一位
```

---

## 3. 代码层：`_apply_candidate_pre_filter`

**位置：** `llm_selector.py` L697

**职责：** 确定性打分，只重排不过滤。LLM 看到的候选列表顺序已经是代码层最优解。

### 3.1 信号检测（从 keywords 提取）

| 信号变量 | 检测条件 |
|---------|---------|
| `has_water_supply` | keywords 含 `给水 / aw给水 / 冷给水 / 热给水 / aw`（词边界） |
| `has_guobiao` | keywords 含 `国标` |
| `has_hot_water` | keywords 含 `热水 / 热给水` |
| `has_cold_water` | keywords 含 `冷水 / 冷给水` |
| `has_pressure` | keywords 含 `\d+mpa / pn\d+` |
| `explicit_pressure` | 提取具体数值（如 `1.25`），用于精确压强加权 |
| `has_corrugated` | keywords 含 `双壁波纹管 / corrugated` |
| `has_10kn` | keywords 含 `10kn` |

### 3.2 打分规则（全部 9 类）

| 规则 | 条件 | 候选信号 | 分值 |
|------|------|---------|------|
| **默认排水** | `!has_water_supply` | `aw给水系列 / (aw` in name | **-15** |
| | | `d排水系列 / 排水配件` in name | **+8** |
| **日标优先** | `!has_guobiao` | `印尼(日标)` in name | **+6** |
| **国标过滤** | `has_guobiao` | `印尼(日标)` in name | **-10** |
| | | 无印尼前缀 | **+6** |
| **双壁波纹管** | `has_corrugated` | 含 `双壁波纹管` | **+20** |
| | | 不含 | **-12** |
| **10KN≈SN8** | `has_10kn` | `sn8` in name | **+12** / `sn4` → **-6** |
| **热水** | `has_hot_water` | `热给水` | **+8** / `冷给水` → **-7** |
| **冷水** | `has_cold_water` | `冷给水` | **+8** / `热给水` → **-7** |
| **压强默认1.0MPa** | `!has_pressure` | `1.0mpa` | **+3** / `1.25mpa / 1.6mpa` → **-2** |
| **压强精确匹配** | `explicit_pressure` | 匹配到具体值 | **+10** / 其他mpa → **-4** |
| **联塑品牌** | 始终 | `联塑` in name | **+2** |
| **来源权重** | 始终 | 共同 | **+9** |
| | | 历史报价 | **+6** |
| | | 字段匹配 | **+3** |

### 3.3 调用位置

```python
# LLM 快速路径（约 L394 / L547）
sorted_candidates = _apply_candidate_pre_filter(keywords, candidates)
llm_candidates = sorted_candidates[:candidate_limit]

# 规则回退（约 L816）
sorted_candidates = _apply_candidate_pre_filter(keywords, candidates)
return _candidate_to_result(sorted_candidates[0], f"[规则回退] {reason}")
```

---

## 4. MD 层：`wanding_business_knowledge.md`

**职责：** LLM 语义判断指南，只保留人工无法用简单 if/else 表达的规则。

**当前规模：** ~70 行（上限），未来增长仅来自第 5 节"用户纠正沉淀"。

### 4.1 MD 层保留的内容

| 章节 | 内容 | 保留原因 |
|------|------|---------|
| 第 1 节 | 选型优先级层级（品类>规格>属性>来源） | LLM 决策框架 |
| 第 1.1 | 来源是 tie-breaker，非一票否决 | LLM 理解来源边界 |
| 第 1.2 | 热水管典型纠偏案例 | 示范性推理例子 |
| 第 2 节 | 弯头角度强约束（半弯≠全弯） | 语义约束 |
| 第 3 节 | 主径×副径规则（32*20→dn32x1/2"） | 需要组合推理 |
| 第 4 节 | 三角阀≠角阀、软管无货、规格精确、电工套管场景 | 语义判断 |
| 第 5 节 | 用户纠正沉淀 | 动态积累 |

### 4.2 MD 层禁止出现的内容

以下已在代码层实现，**不得重复写入 md**：

- 默认排水 / AW 降权
- 日标优先 / 国标过滤
- 冷热水默认
- 压强默认 1.0MPa
- 联塑品牌偏好
- 来源权重数字（共同>历史>字段）
- 同义词组（`直接≈直通` 等）
- 尺寸→DN 映射（`2寸=DN50` 等）
- OD→DN 日标外径映射（`OD110=DN100` 等）

---

## 5. `_BUSINESS_KNOWLEDGE` 内嵌摘要

**位置：** `llm_selector.py` L80

作为三级兜底（Neon → 文件 → 内嵌），当文件不可读时 LLM 仍有基础规则。当前保留 5 条，不含与 pre_filter 重复的规则。

---

## 6. 关键文件索引

```
backend/tools/inventory/services/
├── llm_selector.py              # _apply_candidate_pre_filter (L697)
│                                # _rule_based_fallback (L809)
│                                # _BUSINESS_KNOWLEDGE (L80)
├── wanding_fuzzy_matcher.py     # SYNONYM_GROUPS, MM_TO_INCH, OD_TO_DN_JIS
│                                # 字段匹配阶段（LLM 之前）
└── match_and_inventory.py       # 候选聚合，调用 llm_selector

backend/tools/data/
└── wanding_business_knowledge.md   # MD 层，≤70 行

tests/unit/
└── test_candidate_pre_filter.py    # 9 类打分规则单元测试
```

---

## 7. 维护约定

**新增业务规则时的决策路径：**

```
能写成 signal → score_delta？
  ├─ 是 → 加到 _apply_candidate_pre_filter，加对应单元测试，不改 md
  └─ 否 → 加到 wanding_business_knowledge.md 第 4 节或第 5 节，不改代码
```

**绝不允许：**
- 同一条规则同时存在于代码和 md（产生双重标准）
- md 文件超过 100 行（触发强制 review）
