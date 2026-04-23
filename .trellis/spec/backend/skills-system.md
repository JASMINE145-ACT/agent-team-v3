# Skills System

> How agent behavior is controlled via `skills.py` — **the source of truth**, not `agent_runner.py`.

---

## Core Principle

**All agent behavior (tool calling logic, routing, prompts) is defined in `backend/plugins/jagent/skills.py`.**

The `agent_runner.py` `_SYSTEM_PROMPT` is only used for standalone ReAct tool execution. `skills.py` is what gets injected into the LLM's system prompt via `JAgentExtension.get_skill_prompt()`.

**Any agent behavior change → modify `skills.py` → restart backend.**

---

## File Location

```
backend/plugins/jagent/skills.py
```

Contains all `SKILL_*` constants — each skill has two variants:
- `*_DOC`: Documentation-style prompt (full context and examples)
- `*_RULES`: Decision-rules-style prompt (IF/THEN/MUST/DO NOT)

Switch between them via `Config.USE_DECISION_RULE_SKILLS=true` (in `.env`).

---

## Skills Catalog

| Constant | Purpose | When Used |
|---------|---------|-----------|
| `SKILL_INVENTORY_PRICE_DOC/RULES` | 库存/价格/万鼎选型 | User asks 库存/价格/报价/万鼎 |
| `SKILL_OOS_DOC/RULES` | 无货登记 (Out of Stock) | User wants to register OOS |
| `SKILL_QUOTE_DOC/RULES` | 报价单解析 | Excel 报价单上传/解析 |
| `SKILL_FILL_DOC/RULES` | 报价单填充 | Fill Excel with data |
| `SKILL_EXCEL_CHAT_DOC/RULES` | Excel 对话 | User asks about Excel content |
| `SKILL_CLARIFY_DOC/RULES` | 澄清问题 | Ambiguous user input |
| `SKILL_KNOWLEDGE_DOC/RULES` | 业务知识 | Knowledge Q&A |
| `GLOBAL_HARD_CONSTRAINTS` | 跨技能硬约束 | Always injected |

---

## `ask_clarification` Tool Behavior

### Backend handler
`backend/tools/quotation/handler.py` → `_make_ask_clarification_handler()`  
Returns: `{"needs_clarification": true, "questions": [...], "reasoning": "..."}`

### Frontend rendering
`questions` array is rendered as **plain text bubble** in current implementation. No structured interactive options.

### Impact on ambiguous PVC query plan
6 option items must be embedded as plain text in `questions[0]`:
```
questions: [
    "PVC 产品有以下类型，请问您要的是哪种？\n1. PVC-U 排水管（建筑排水用，管身直管，含 D排水系列）\n2. PVC-U 排水管件（排水用弯头/三通/直接等管件）\n3. PVC-U 给水管（AW 给水系列，管身/管件均可）\n4. PVC 电线管/线管（电气安装用，B管/A管）\n5. PVC 阀门（球阀等）\n6. PVC 胶水/辅材（清扫口等）\n请回复序号或类型名称，或说明其他类型。"
]
```
Users reply manually by typing. To support clickable structured options, frontend ClarifyCard component + handler return format change needed (future work).

---

## How Skill Prompts Are Injected

```
CoreAgent.execute_react()
  → JAgentExtension.get_skill_prompt(skill_name)
  → reads from skills.py constant
  → injects into LLM system prompt
```

`JAgentExtension` registers all skills via `AgentExtension.register(ctx)`, which calls `ctx.register_tool(definition, handler)` → `ToolRegistry.register()`.

---

## Skill Prompt Switching Logic

```python
# Config.USE_DECISION_RULE_SKILLS = true → use RULES variants
# Default (false) → use DOC variants

if Config.USE_DECISION_RULE_SKILLS:
    skill_prompt = SKILL_INVENTORY_PRICE_RULES
else:
    skill_prompt = SKILL_INVENTORY_PRICE_DOC
```

---

## Global Hard Constraints (Always Active)

These are injected into **every skill prompt** regardless of which skill is active:

```
GLOBAL HARD CONSTRAINTS (CROSS-SKILL)
- NEVER treat any Excel Qty/数量 as inventory; inventory MUST come only from inventory tools.
- NEVER fabricate product codes, price levels, or inventory quantities when tools return no match.
```

---

## Key Routing Rules (from SKILL_INVENTORY_PRICE_RULES)

### Single Product Price Query
```
User: "直接50 价格"
→ match_quotation(keywords="直接50")
→ STOP (do NOT call get_inventory_by_code)
```

### Chinese Inventory Query (MUST use chain)
```
User: "50三通库存"  (中文 + 库存 intent)
→ match_quotation(keywords="50三通")
→ get_inventory_by_code(code from chosen)
→ STOP (do NOT call search_inventory)
```

### Batch Price Query (≥2 products)
```
User: "直接50 三通50 价格"
→ match_quotation_batch(keywords_list=["直接50", "三通50"])
→ do NOT call match_quotation individually within same scope
→ max 20 items per call
```

### Batch Inventory Query
```
User: (gives multiple codes or whole sheet)
→ get_inventory_by_code_batch(codes)
→ max 50 items per call
```

### English Product Query
```
User: '3" AW pipe price'
→ match_quotation(keywords='3" AW pipe', lang="en")
```

### PVC Product-Type Ambiguity Clarification
```
User: "pvc价格" / "pvc管" / "联塑 pvc" (无品类词)
→ ask_clarification(questions=["PVC 产品有以下类型...\n1. 排水管\n2. 排水管件\n3. 给水管\n4. 电线管/线管\n5. 阀门\n6. 胶水/辅材"], reasoning="...")
→ STOP — DO NOT call match_quotation

User replies "1" or "排水管"
→ match_quotation(keywords="pvc排水管")
```

触发条件：query 含 `pvc`/`pvc管`/`联塑 pvc` 等**且无品类限定词**（排水/给水/线管/管件/阀门/胶水/AW/conduit）。
不触发：`pvc排水管`、`pvc给水管 dn50`（已含品类词）。

**规则位置**：`SKILL_INVENTORY_PRICE_RULES`（非 `SKILL_CLARIFY_RULES`），避免与「库存/价格意图歧义」规则耦合。

---

## Customer Level Mapping

| User Says | Use |
|-----------|-----|
| 二级代理 / A级 | `customer_level=A` |
| 一级代理 / B级 | `customer_level=B` |
| 聚万大客户 / C级 | `customer_level=C` |
| 青山大客户 / D级 | `customer_level=D` (降低利润率 → D_LOW) |
| 大唐大客户 / E级 | `customer_level=E` |
| 出厂价含税 | `customer_level=FACTORY_INC_TAX` |
| 出厂价不含税 | `customer_level=FACTORY_EXC_TAX` |
| 采购不含税 | `customer_level=PURCHASE_EXC_TAX` |

---

## Result Display Rules

### Table Requirements (价格查询)
- 必须包含「产品编号(code)」列
- 上方写「匹配来源：」+ match_source
- 有 source 时表格加「来源」列
- 有 chosen 时标「已选：第 N 条」
- **回复档位时用全名**：出厂价_含税、（二级代理）A级别_报单价格 等

### Keywords Protection (重要)
Chinese pipe fitting names —「直接」「直通」「弯头」「三通」「变径」「大小头」「堵头」「管帽」「活接」「由令」「套管」「法兰」「管卡」— **must be preserved verbatim** in keywords. Do NOT strip them.

```
❌ "直接dn50" → keywords="dn50" (WRONG)
✅ "直接dn50" → keywords="直接dn50" (CORRECT)
```

### When Observation Starts with `[已渲染到前端]`
The result has already been pushed to frontend via SSE as a card:
- Single product: output NO text
- Multiple products (≥2): output one line guide only, do NOT re-query

---

## Modifying Skills

### To change tool routing/behavior:
1. Edit the relevant `SKILL_*_RULES` constant in `skills.py`
2. Restart backend (no hot reload)
3. Test with a query

### To add a new skill:
1. Add new `SKILL_NEW_DOC` and `SKILL_NEW_RULES` constants in `skills.py`
2. Register in `JAgentExtension.get_skill_prompt()` method
3. Update `agent_runner.py` if standalone prompt needs updating

### To change hard constraints:
Edit `GLOBAL_HARD_CONSTRAINTS` in `skills.py` — affects all skills.

---

## `match_quotation` 执行流程（完整链路）

> 入口：`_execute_match_quotation(keywords, customer_level, lang?)`
> 并集实现：`match_and_inventory.match_quotation_union`

### 中文/默认路径（`lang` 未设置或为 `zh`）

```
keywords
  │
  ├─ 并行两路（ThreadPoolExecutor，max_workers=2）
  │
  │  ① 历史报价路（mapping_table_matcher）
  │     └─ match_mapping_top_candidates(keywords, top_k=5)
  │         内部：search_mapping_fuzzy(keywords, df["search_text"])
  │         search_text 由「询价货物名称（中文）+ 规格」拼接
  │
  │  ② 万鼎价格库路（wanding_fuzzy_matcher）
  │     └─ match_wanding_price_candidates → match_fuzzy_candidates
  │         对 Describrition 列做 token / 规格打分
  │
  ├─ _merge_candidates_by_code：按 code 去重，标注 source（共同/历史报价/字段匹配）
  │
  ├─ 对 unit_price=0 的项尝试 get_wanding_price_by_code 补价
  │
  ├─ 按 source 优先级排序：共同 > 历史报价 > 字段匹配（_SOURCE_PRIORITY）
  │
  ├─ 截断：取前 15 条
  │
  ├─ 候选数 = 0 → unmatched
  │
  └─ 候选数 ≥ 1 → 调用 llm_select_best(keywords, candidates)
        ─ LLM 返回 None → unmatched + llm_rejected
        ─ 低置信度 → needs_selection + low_confidence_options
        ─ 正常 → single + chosen + selection_reasoning
```

### 英文路径（`lang="en"`）

```
keywords（全英文）
  │
  └─ match_quotation_english → match_english_candidates
       对 Describrition_English 列做 token 全命中 CONTAINS
       候选 source 标注为「英文字段匹配」
```

**英文询价书写规范（实测结论）**：

| 用户 keywords | 命中？ | 说明 |
|---------------|--------|------|
| `Pipa 3" (AW)` | ❌ | 英文列为 **Pipe**，无印尼语 `Pipa`，token 无法全命中 |
| `Pipe 3" (AW)` | ❌ | 分词含 **`(aw)`**，正文为单词 **AW**，无字面量 `(aw)` |
| `PVC-U AW 3" pipe` | ✅ | 避免括号包裹 AW |
| `3" AW pipe` | ✅ | 可能多候选，需 LLM 选型 |
| `JIS PVC-U AW Pipe DN75 3"` | ✅（易唯一） | 接近完整英文描述 |

> **前提**：Neon `Describrition_English` 列非空。列为空时英文路径无候选，返回 `unmatched`。

### 关键实现文件

| 环节 | 文件 |
|------|------|
| 并集与合并 | `match_and_inventory.match_quotation_union` |
| 历史路 | `mapping_table_matcher.match_mapping_top_candidates` |
| 万鼎路 | `wanding_fuzzy_matcher.match_fuzzy_candidates` |
| 英文路径 | `match_and_inventory.match_quotation_english` |
| LLM 选型 | `llm_selector.llm_select_best` |
| 工具层入口 | `inventory_agent_tools._execute_match_quotation` |

---

## Common Mistakes

| Mistake | Result |
|---------|--------|
| Modifying `agent_runner.py` instead of `skills.py` | Changes don't affect agent behavior |
| Forgetting to restart backend after `skills.py` change | Old prompt still active |
| Stripping Chinese keywords from `keywords` parameter | Wrong/no match results |
| Calling `match_quotation` for each item in a batch | Duplicate cards, selection drift |
| Calling `get_inventory_by_code` after price query without 库存 intent | Unnecessary tool calls |
| 全英文字符串传 `lang` 未设置 → 走中文路径 | token 打分无法匹配英文描述，两路皆空 → unmatched |
| 用户说「pvc」未加品类 → 直接 match_quotation | 误匹配排水管/给水管，需先 ask_clarification |
