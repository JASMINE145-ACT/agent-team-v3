# PVC 品类歧义强制澄清 Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 当用户输入泛化 PVC 词（`pvc`/`pvc管`/`联塑 pvc` 等）且未指明品类时，Agent 必须先调用 `ask_clarification` 展示 6 项类型选项，而不是直接走 `match_quotation` 误匹配。

**Architecture:** 仅改 prompt 层（`skills.py`）的两个字符串常量（`SKILL_INVENTORY_PRICE_RULES` 和 `SKILL_INVENTORY_PRICE_DOC`），以及 `.trellis` 规范文档。不触及任何工具函数或 schema。防回归测试放入现有 `tests/test_prompt_constraints.py`（与已有 prompt 断言测试保持一致）。

**Tech Stack:** Python/pytest（字符串断言），无额外依赖

---

## 背景约定

**触发词列表**（PVC 泛化词，无品类限定词时触发）：
- 触发：`pvc`、`pvc管`、`pvc 管`、`pvc接头`、`联塑 pvc`、`pvc 价格`、`pvc多少钱`、`pvc 库存` 等
- 不触发：`pvc排水管`、`pvc给水管`、`pvc线管`、`pvc阀门`、`pvc dn50 排水`（已包含品类词）

**6 项 PVC 类型选项**（固定文本，必须完整写入 questions[0]）：
```
PVC 产品有以下类型，请问您要的是哪种？
1. PVC-U 排水管（建筑排水用，管身直管，含 D排水系列）
2. PVC-U 排水管件（排水用弯头/三通/直接等管件）
3. PVC-U 给水管（AW 给水系列，管身/管件均可）
4. PVC 电线管/线管（电气安装用，B管/A管）
5. PVC 阀门（球阀等）
6. PVC 胶水/辅材（清扫口等）
请回复序号或类型名称，或说明其他类型。
```

**用户选择后的下游行为**：用户回复（如「1」或「排水管」）直接作为下一轮 keywords 追加继续查询——**不需要**改工具 schema，Agent 自行拼接 keywords（如 `pvc排水管 dn50`）即可。

---

## File Map

| 文件 | 改动类型 | 内容 |
|------|---------|------|
| `tests/test_prompt_constraints.py` | 修改（追加 class） | 新增 `TestPvcAmbiguityClarify` — 5 条字符串断言 |
| `backend/plugins/jagent/skills.py` | 修改 | `SKILL_INVENTORY_PRICE_RULES` 加 PVC 澄清规则；`SKILL_INVENTORY_PRICE_DOC` 加同步说明 |
| `.trellis/spec/backend/skills-system.md` | 修改 | 补充 PVC 品类歧义路由规则说明 |

---

## Task 1: 防回归测试（TDD 先写，全部 FAIL）

**Files:**
- Modify: `tests/test_prompt_constraints.py`（在文件末尾追加新 class）

- [ ] **Step 1: 在 `test_prompt_constraints.py` 末尾追加以下 class**

```python
class TestPvcAmbiguityClarify:
    """SKILL_INVENTORY_PRICE_RULES 必须包含 PVC 品类歧义强制澄清规则。"""

    def test_rules_has_pvc_clarification_trigger(self):
        """RULES 必须包含 pvc/pvc管 触发判断。"""
        from backend.plugins.jagent.skills import SKILL_INVENTORY_PRICE_RULES
        assert "pvc" in SKILL_INVENTORY_PRICE_RULES.lower()
        assert "ask_clarification" in SKILL_INVENTORY_PRICE_RULES

    def test_rules_has_all_six_pvc_types(self):
        """RULES 必须包含全部 6 项 PVC 品类选项关键词。"""
        from backend.plugins.jagent.skills import SKILL_INVENTORY_PRICE_RULES
        rules_lower = SKILL_INVENTORY_PRICE_RULES.lower()
        for keyword in ["排水管", "排水管件", "给水管", "电线管", "阀门", "胶水"]:
            assert keyword in rules_lower, f"缺少 PVC 选项关键词: {keyword}"

    def test_rules_has_stop_constraint(self):
        """RULES 必须在 PVC 澄清规则中明确 STOP / 不得继续匹配。"""
        from backend.plugins.jagent.skills import SKILL_INVENTORY_PRICE_RULES
        # 规则必须含"不得"继续匹配或 STOP / DO NOT 相关约束
        assert any(kw in SKILL_INVENTORY_PRICE_RULES for kw in ["STOP", "DO NOT call match_quotation", "禁止", "不得继续"])

    def test_rules_pvc_block_is_in_inventory_price_section(self):
        """PVC 澄清规则必须在 SKILL_INVENTORY_PRICE_RULES 中，而非 SKILL_CLARIFY_RULES。"""
        from backend.plugins.jagent import skills
        # 确认 PVC 触发词在 INVENTORY 段存在
        assert "pvc" in skills.SKILL_INVENTORY_PRICE_RULES.lower()
        # 确认 CLARIFY 段不含（避免规则耦合冲突）
        clarify = getattr(skills, "SKILL_CLARIFY_RULES", "") or ""
        assert "排水管件" not in clarify, "PVC 品类规则不应写入 SKILL_CLARIFY_RULES"

    def test_doc_has_pvc_clarification_mention(self):
        """SKILL_INVENTORY_PRICE_DOC 也必须包含 PVC 品类澄清说明。"""
        from backend.plugins.jagent.skills import SKILL_INVENTORY_PRICE_DOC
        assert "pvc" in SKILL_INVENTORY_PRICE_DOC.lower()
        assert "ask_clarification" in SKILL_INVENTORY_PRICE_DOC or "澄清" in SKILL_INVENTORY_PRICE_DOC
```

- [ ] **Step 2: 运行，确认全部 5 条 FAIL**

```bash
cd "D:/Projects/agent-jk/Agent Team version3"
python -m pytest tests/test_prompt_constraints.py::TestPvcAmbiguityClarify -v
```

预期输出：
```
FAILED tests/test_prompt_constraints.py::TestPvcAmbiguityClarify::test_rules_has_pvc_clarification_trigger
FAILED tests/test_prompt_constraints.py::TestPvcAmbiguityClarify::test_rules_has_all_six_pvc_types
FAILED tests/test_prompt_constraints.py::TestPvcAmbiguityClarify::test_rules_has_stop_constraint
FAILED tests/test_prompt_constraints.py::TestPvcAmbiguityClarify::test_rules_pvc_block_is_in_inventory_price_section
FAILED tests/test_prompt_constraints.py::TestPvcAmbiguityClarify::test_doc_has_pvc_clarification_mention
5 failed
```

- [ ] **Step 3: Commit（红色测试）**

```bash
git add tests/test_prompt_constraints.py
git commit -m "test: 新增 PVC 品类歧义澄清防回归断言（预期 FAIL）"
```

---

## Task 2: 修改 `SKILL_INVENTORY_PRICE_RULES` 加 PVC 澄清规则

**Files:**
- Modify: `backend/plugins/jagent/skills.py`（`SKILL_INVENTORY_PRICE_RULES` 字符串，第 62 行起）

- [ ] **Step 1: 在 `[Routing & Priority Rules]` 段找到插入位置**

打开 `backend/plugins/jagent/skills.py`，定位 `SKILL_INVENTORY_PRICE_RULES` 字符串（第 62 行）。
找到这一行（约第 66 行）：
```
- IF the user explicitly wants **库存/可售** OR **价格/报价/万鼎** (non-profit quote lookup), THEN you MUST route to the inventory/price tools in this section.
```

在该行**之后**、下一条 `- IF the user asks for **价格/报价/万鼎**` 之前，插入以下完整规则块：

```
[PVC Product-Type Ambiguity Rules]
- IF the user query contains a **generic PVC term** — including: pvc、pvc管、pvc 管、pvc接头、pvc 接头、联塑 pvc、pvc价格、pvc多少钱、pvc库存、pvc 库存、pvc 报价 等变体 — AND does NOT contain any product-type qualifier (排水 / 给水 / 线管 / 电线管 / 管件 / 阀门 / 胶水 / AW / DWV / conduit),
  THEN you MUST call ask_clarification BEFORE any matching tool. STOP. DO NOT call match_quotation or any inventory tool in this turn.
  - questions[0] MUST be exactly:
    "PVC 产品有以下类型，请问您要的是哪种？\n1. PVC-U 排水管（建筑排水用，管身直管，含 D排水系列）\n2. PVC-U 排水管件（排水用弯头/三通/直接等管件）\n3. PVC-U 给水管（AW 给水系列，管身/管件均可）\n4. PVC 电线管/线管（电气安装用，B管/A管）\n5. PVC 阀门（球阀等）\n6. PVC 胶水/辅材（清扫口等）\n请回复序号或类型名称，或说明其他类型。"
  - reasoning: "用户只说「pvc」未指明类型，需先确认品类再匹配"
  - Example (Correct): 「pvc价格」 → ask_clarification(questions=[...], reasoning="...") ✅
  - Example (Correct): 「联塑 pvc 库存」 → ask_clarification(...) ✅
  - Example (Incorrect): 「pvc价格」 → match_quotation(keywords="pvc") ❌（未澄清品类直接匹配，将误选）
  - Example (NOT triggered): 「pvc排水管 dn50」 → match_quotation(keywords="pvc排水管 dn50") ✅（已含品类词，不触发）
  - Example (NOT triggered): 「pvc给水管 价格」 → match_quotation(keywords="pvc给水管") ✅（已含品类词，不触发）
- AFTER user replies with a type (e.g. 「1」「排水管」「给水管件」), append the type to original keywords and call match_quotation normally.
  - Example: user said 「pvc」→ clarified → user replies 「1」→ match_quotation(keywords="pvc排水管") ✅

```

- [ ] **Step 2: 运行测试，确认 4 条 PASS，1 条仍 FAIL（DOC 未改）**

```bash
python -m pytest tests/test_prompt_constraints.py::TestPvcAmbiguityClarify -v
```

预期：
```
PASSED ...::test_rules_has_pvc_clarification_trigger
PASSED ...::test_rules_has_all_six_pvc_types
PASSED ...::test_rules_has_stop_constraint
PASSED ...::test_rules_pvc_block_is_in_inventory_price_section
FAILED ...::test_doc_has_pvc_clarification_mention
4 passed, 1 failed
```

- [ ] **Step 3: 确认现有 prompt 断言测试不受影响**

```bash
python -m pytest tests/test_prompt_constraints.py -v
```

预期：除 `test_doc_has_pvc_clarification_mention` 外全部通过。

- [ ] **Step 4: Commit**

```bash
git add backend/plugins/jagent/skills.py
git commit -m "feat: SKILL_INVENTORY_PRICE_RULES 新增 PVC 品类歧义强制澄清规则"
```

---

## Task 3: 同步 `SKILL_INVENTORY_PRICE_DOC`

**Files:**
- Modify: `backend/plugins/jagent/skills.py`（`SKILL_INVENTORY_PRICE_DOC` 字符串，第 10 行起）

- [ ] **Step 1: 找到 DOC 版的「何时用」说明处**

在 `SKILL_INVENTORY_PRICE_DOC` 字符串中，找到这一行（约第 22 行）：
```
- **何时用**：用户已明确「库存/可售」或「价格/报价/万鼎/档位」时选用；只说「查XX」未指明 → 用 ask_clarification 澄清。
```

在该行**末尾**补充（替换该行为以下版本，保留原内容不变，只在行末加一句）：

```
- **何时用**：用户已明确「库存/可售」或「价格/报价/万鼎/档位」时选用；只说「查XX」未指明 → 用 ask_clarification 澄清。**品类歧义**：用户只说「pvc」「pvc管」「联塑 pvc」等泛化词、未指定品类（排水/给水/线管/管件/阀门/胶水）时，必须先调 ask_clarification 展示 6 项类型选项，不得直接 match_quotation；用户回复品类后再继续。
```

- [ ] **Step 2: 运行测试，确认全部 5 条 PASS**

```bash
python -m pytest tests/test_prompt_constraints.py::TestPvcAmbiguityClarify -v
```

预期：
```
PASSED ...::test_rules_has_pvc_clarification_trigger
PASSED ...::test_rules_has_all_six_pvc_types
PASSED ...::test_rules_has_stop_constraint
PASSED ...::test_rules_pvc_block_is_in_inventory_price_section
PASSED ...::test_doc_has_pvc_clarification_mention
5 passed
```

- [ ] **Step 3: 确认完整 prompt 测试套件无回归**

```bash
python -m pytest tests/test_prompt_constraints.py tests/test_skills_multi_product_wrapper.py tests/test_skills_reasoning_display.py -v
```

预期：全部通过。

- [ ] **Step 4: Commit**

```bash
git add backend/plugins/jagent/skills.py
git commit -m "feat: SKILL_INVENTORY_PRICE_DOC 同步 PVC 品类歧义澄清说明"
```

---

## Task 4: 更新 `.trellis/spec/backend/skills-system.md`

**Files:**
- Modify: `.trellis/spec/backend/skills-system.md`

- [ ] **Step 1: 在 `## Key Routing Rules` 段补充 PVC 小节**

找到文件中的 `## Key Routing Rules`（约第 105 行），在 `### English Product Query` 小节**之后**追加：

```markdown
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
```

- [ ] **Step 2: 在 `## Common Mistakes` 段末尾追加一行**

```markdown
| 用户说「pvc」未加品类 → 直接 match_quotation | 误匹配排水管/给水管，需先 ask_clarification |
```

- [ ] **Step 3: 验证文档可读**

```bash
python -c "
text = open('D:/Projects/agent-jk/Agent Team version3/.trellis/spec/backend/skills-system.md', encoding='utf-8').read()
assert 'PVC Product-Type Ambiguity' in text
assert 'ask_clarification' in text
print('trellis doc OK')
"
```

预期：`trellis doc OK`

- [ ] **Step 4: Commit**

```bash
git add ".trellis/spec/backend/skills-system.md"
git commit -m "docs: trellis 补充 PVC 品类歧义澄清路由规则说明"
```

---

## Task 5: 最终验证

- [ ] **Step 1: 跑完整测试套件**

```bash
python -m pytest tests/ -v --tb=short -q
```

预期：全部通过，无新增失败。

- [ ] **Step 2: 重启 backend，手工验证 prompt 已注入**

```bash
python run_backend.py
```

另开终端：
```bash
python -c "
from backend.plugins.jagent.skills import SKILL_INVENTORY_PRICE_RULES
assert 'PVC-U 排水管件' in SKILL_INVENTORY_PRICE_RULES
assert 'ask_clarification' in SKILL_INVENTORY_PRICE_RULES
print('RULES OK')
from backend.plugins.jagent.skills import SKILL_INVENTORY_PRICE_DOC
assert '品类歧义' in SKILL_INVENTORY_PRICE_DOC
print('DOC OK')
"
```

预期：
```
RULES OK
DOC OK
```

- [ ] **Step 3: 发送「pvc 价格」到 Chat**

向运行中的 Chat 发送 `pvc 价格`。

预期：Agent 调用 `ask_clarification`，回复包含「PVC 产品有以下类型」以及 6 项编号选项，**不出现**价格候选卡片。

- [ ] **Step 4: 发送「pvc排水管 dn50 价格」到 Chat**

预期：Agent 直接调用 `match_quotation(keywords="pvc排水管 dn50")`，**不触发**澄清。

- [ ] **Step 5: Commit 收尾**

```bash
git add .
git commit -m "chore: PVC 品类歧义澄清 Phase 1 验证完成"
```

---

## Self-Review

**Spec coverage:**
- `rule-add` → Task 2 ✅
- `doc-sync` → Task 3 ✅
- `tests-add` → Task 1 ✅
- `trellis-update` → Task 4 ✅
- `verify-gates` → Task 5 ✅
- `clarify-card`（前端）→ Phase 2，不在本计划范围 ✅
- `batch-per-item`（per-item product_type）→ Phase 2，不在本计划范围 ✅
- `other-input`（其他类型手动输入）→ Phase 2，不在本计划范围 ✅

**Placeholder scan:** 无 TBD/TODO，所有代码块均为完整实现。

**Type consistency:** 仅字符串改动，无类型/函数名跨 Task 引用风险。
