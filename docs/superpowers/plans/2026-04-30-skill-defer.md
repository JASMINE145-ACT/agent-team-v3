# Skill Defer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 按工具激活情况动态注入技能描述，让无工具调用的场景 system prompt 从 ~5,000 token 降至 ~1,300 token。

**Architecture:** AgentExtension 基类新增 `get_skill_prompt_brief()` 和 `get_skill_prompt_for_tools()`；JAgentExtension 实现 tool→category 映射和轻量路由常量；CoreAgent 初始化时构建 brief prompt，ReAct 循环内每次工具执行后更新 `messages[0]` 追加完整技能描述。整个过程向后兼容——brief 为空时行为与现在完全一致。

**Tech Stack:** Python 3.11, pytest, `backend/core/extension.py`, `backend/core/agent.py`, `backend/plugins/jagent/extension.py`, `backend/plugins/jagent/skills.py`

---

## 文件变更地图

| 文件 | 操作 | 内容 |
|------|------|------|
| `backend/core/extension.py` | 修改 | 新增 2 个默认空方法 |
| `backend/plugins/jagent/skills.py` | 修改 | 新增 `SKILL_PROMPT_BRIEF` 常量 |
| `backend/plugins/jagent/extension.py` | 修改 | 新增映射表和两个方法实现 |
| `backend/core/agent.py` | 修改 | 初始化构建 brief prompt；循环内更新 `messages[0]` |
| `tests/unit/test_skill_defer.py` | 新建 | 所有新行为的单元测试 |

---

## Task 1：写失败测试

**Files:**
- Create: `tests/unit/test_skill_defer.py`

- [ ] **Step 1: 创建测试文件**

```python
# tests/unit/test_skill_defer.py
"""Unit tests for skill defer — tests written before implementation."""
import pytest
from unittest.mock import MagicMock, patch
from backend.core.extension import AgentExtension, ExtensionContext


class MinimalExt(AgentExtension):
    """最小实现，用于测试基类默认行为。"""
    def register(self, ctx: ExtensionContext) -> None:
        pass


class BriefExt(AgentExtension):
    """带 brief 的扩展，用于测试 CoreAgent brief 路径。"""
    def register(self, ctx: ExtensionContext) -> None:
        pass

    def get_skill_prompt_brief(self) -> str:
        return "brief routing hint"

    def get_skill_prompt_for_tools(self, activated_tools: frozenset[str]) -> str:
        if "tool_a" in activated_tools:
            return "full skill A description"
        return ""


# ── 基类默认行为 ─────────────────────────────────────────────────────────────

def test_base_get_skill_prompt_brief_returns_empty():
    ext = MinimalExt()
    assert ext.get_skill_prompt_brief() == ""


def test_base_get_skill_prompt_for_tools_returns_empty():
    ext = MinimalExt()
    assert ext.get_skill_prompt_for_tools(frozenset({"match_quotation"})) == ""


# ── JAgentExtension 映射 ──────────────────────────────────────────────────────

def test_jagent_brief_is_nonempty():
    from backend.plugins.jagent.extension import JAgentExtension
    ext = JAgentExtension()
    brief = ext.get_skill_prompt_brief()
    assert len(brief) > 50
    assert "match_quotation" in brief


def test_jagent_inventory_tool_returns_skill_text():
    from backend.plugins.jagent.extension import JAgentExtension
    ext = JAgentExtension()
    result = ext.get_skill_prompt_for_tools(frozenset({"match_quotation"}))
    assert len(result) > 100
    assert "match_quotation" in result


def test_jagent_batch_tool_same_category_no_duplicate():
    from backend.plugins.jagent.extension import JAgentExtension
    ext = JAgentExtension()
    both = ext.get_skill_prompt_for_tools(
        frozenset({"match_quotation", "match_quotation_batch"})
    )
    single = ext.get_skill_prompt_for_tools(frozenset({"match_quotation"}))
    # 同 category，结果应相同（不重复追加）
    assert both == single


def test_jagent_quotation_tool_returns_skill_text():
    from backend.plugins.jagent.extension import JAgentExtension
    ext = JAgentExtension()
    result = ext.get_skill_prompt_for_tools(frozenset({"fill_quotation_sheet"}))
    assert len(result) > 50


def test_jagent_oos_tool_returns_skill_text():
    from backend.plugins.jagent.extension import JAgentExtension
    ext = JAgentExtension()
    result = ext.get_skill_prompt_for_tools(frozenset({"register_oos"}))
    assert len(result) > 50


def test_jagent_unknown_tool_returns_empty():
    from backend.plugins.jagent.extension import JAgentExtension
    ext = JAgentExtension()
    result = ext.get_skill_prompt_for_tools(frozenset({"ask_clarification"}))
    assert result == ""


def test_jagent_empty_tools_returns_empty():
    from backend.plugins.jagent.extension import JAgentExtension
    ext = JAgentExtension()
    assert ext.get_skill_prompt_for_tools(frozenset()) == ""


# ── CoreAgent brief 路径 ──────────────────────────────────────────────────────

def test_coreagent_uses_brief_when_extension_provides_it():
    from backend.core.agent import CoreAgent
    ext = BriefExt()
    agent = CoreAgent(
        api_key="test",
        base_url="https://example.com",
        model="test-model",
        extensions=[ext],
        session_store=None,
    )
    assert agent._use_skill_defer is True
    assert "brief routing hint" in agent._brief_system_prompt
    # brief prompt 应比 full prompt 短
    assert len(agent._brief_system_prompt) < len(agent._system_prompt)


def test_coreagent_no_brief_falls_back_to_full():
    from backend.core.agent import CoreAgent
    ext = MinimalExt()
    agent = CoreAgent(
        api_key="test",
        base_url="https://example.com",
        model="test-model",
        extensions=[ext],
        session_store=None,
    )
    assert agent._use_skill_defer is False
    assert agent._brief_system_prompt == agent._system_prompt
```

- [ ] **Step 2: 运行测试，确认全部失败**

```bash
cd "d:/Projects/agent-jk/Agent Team version3"
py -m pytest tests/unit/test_skill_defer.py -v
```

期望：`ImportError` 或 `AttributeError`（方法不存在）

- [ ] **Step 3: 提交测试文件**

```bash
git add tests/unit/test_skill_defer.py
git commit -m "test(skill-defer): add failing tests for brief/full skill prompt switching"
```

---

## Task 2：AgentExtension 基类新增 2 个方法

**Files:**
- Modify: `backend/core/extension.py`

- [ ] **Step 1: 在 `get_output_format_prompt` 之后追加两个方法**

在 `backend/core/extension.py` 的 `get_output_format_prompt` 方法（约第 32 行）**之后**插入：

```python
    def get_skill_prompt_brief(self) -> str:
        """每步始终注入的轻量路由提示（目标 ~200 token）。
        返回空字符串时 CoreAgent 回退 get_skill_prompt()，行为与现在完全一致。"""
        return ""

    def get_skill_prompt_for_tools(self, activated_tools: frozenset[str]) -> str:
        """工具被调用后，按 tool→category 映射返回对应完整技能描述。
        CoreAgent 在每次工具执行后调用；同一 category 只在首次出现时触发。
        activated_tools：本轮 ReAct 循环中已执行过的所有工具名集合。"""
        return ""
```

- [ ] **Step 2: 运行基类相关测试，确认通过**

```bash
py -m pytest tests/unit/test_skill_defer.py::test_base_get_skill_prompt_brief_returns_empty tests/unit/test_skill_defer.py::test_base_get_skill_prompt_for_tools_returns_empty -v
```

期望：2 个 PASS

- [ ] **Step 3: 提交**

```bash
git add backend/core/extension.py
git commit -m "feat(core): add get_skill_prompt_brief and get_skill_prompt_for_tools to AgentExtension"
```

---

## Task 3：新增 `SKILL_PROMPT_BRIEF` 常量

**Files:**
- Modify: `backend/plugins/jagent/skills.py`

- [ ] **Step 1: 在 `GLOBAL_HARD_CONSTRAINTS` 定义之前插入新常量**

```python
SKILL_PROMPT_BRIEF = """\
## 技能路由（简版）

1. **库存/询价/价格**
   - 询价/查 code → match_quotation(keywords)
   - 多产品（≥2个）→ match_quotation_batch(keywords_list)
   - 已知编号查库存 → get_inventory_by_code(code)
   - 多编号批量 → get_inventory_by_code_batch(codes)
   - 查利润率 → get_profit_by_price / get_profit_by_price_batch

2. **无货登记** → register_oos / register_oos_from_text / get_oos_list 等

3. **报价单/Excel** → fill_quotation_sheet / parse_excel_smart / run_quotation_fill

4. **业务知识记录** → append_business_knowledge（用户说「记到知识库」时）

5. **意图不明** → ask_clarification（先问清楚再调工具）

禁止：同一产品重复调 match_quotation；泛化词（「pvc」「pvc管」）先澄清品类。\
"""
```

- [ ] **Step 2: 运行测试**

```bash
py -m pytest tests/unit/test_skill_defer.py::test_jagent_brief_is_nonempty -v
```

期望：FAIL（JAgentExtension 还没实现，但 `SKILL_PROMPT_BRIEF` 导入应可通过）

- [ ] **Step 3: 提交**

```bash
git add backend/plugins/jagent/skills.py
git commit -m "feat(jagent): add SKILL_PROMPT_BRIEF constant (~180 token routing hint)"
```

---

## Task 4：JAgentExtension 实现映射和两个方法

**Files:**
- Modify: `backend/plugins/jagent/extension.py`

- [ ] **Step 1: 在 `extension.py` 文件顶部 import 之后，类定义之前插入映射常量**

在 `from backend.plugins.jagent.skills import ...` 这行的 import 中补充 `SKILL_PROMPT_BRIEF`，然后在类定义之前插入：

```python
# 在 skills 导入行添加 SKILL_PROMPT_BRIEF
from backend.plugins.jagent.skills import (
    # ... 现有导入 ...
    SKILL_PROMPT_BRIEF,
    SKILL_INVENTORY_PRICE_DOC,
    SKILL_OOS_DOC,
    SKILL_QUOTE_DOC,
    SKILL_FILL_DOC,
    SKILL_EXCEL_CHAT_DOC,
    SKILL_KNOWLEDGE_DOC,
    SKILL_CLARIFY_DOC,
)

_TOOL_CATEGORY: dict[str, str] = {
    # 库存/询价
    "match_quotation":           "inventory",
    "match_quotation_batch":     "inventory",
    "select_wanding_match":      "inventory",
    "match_wanding_price":       "inventory",
    "match_by_quotation_history":"inventory",
    "get_inventory_by_code":     "inventory",
    "get_inventory_by_code_batch":"inventory",
    "get_profit_by_price":       "inventory",
    "get_profit_by_price_batch": "inventory",
    "modify_inventory":          "inventory",
    "search_inventory":          "inventory",
    # 报价单/Excel
    "fill_quotation_sheet":      "quotation",
    "run_quotation_fill":        "quotation",
    "parse_excel_smart":         "quotation",
    "edit_excel":                "quotation",
    "batch_quick_quote":         "quotation",
    # OOS
    "get_oos_list":              "oos",
    "get_oos_stats":             "oos",
    "get_oos_by_file":           "oos",
    "get_oos_by_time":           "oos",
    "register_oos":              "oos",
    "register_oos_from_text":    "oos",
    # 业务知识
    "append_business_knowledge": "knowledge",
}

_CATEGORY_TO_SKILL: dict[str, str] = {
    "inventory": SKILL_INVENTORY_PRICE_DOC,
    "quotation": "\n\n".join([SKILL_QUOTE_DOC, SKILL_FILL_DOC, SKILL_EXCEL_CHAT_DOC]),
    "oos":       SKILL_OOS_DOC,
    "knowledge": SKILL_KNOWLEDGE_DOC,
}
```

- [ ] **Step 2: 在 `JAgentExtension` 类中，`get_skill_prompt` 方法之后添加两个方法实现**

```python
    def get_skill_prompt_brief(self) -> str:
        return SKILL_PROMPT_BRIEF

    def get_skill_prompt_for_tools(self, activated_tools: frozenset[str]) -> str:
        seen: set[str] = set()
        parts: list[str] = []
        for tool in activated_tools:
            cat = _TOOL_CATEGORY.get(tool)
            if cat and cat not in seen:
                seen.add(cat)
                text = _CATEGORY_TO_SKILL.get(cat, "")
                if text:
                    parts.append(text)
        return "\n\n".join(parts)
```

- [ ] **Step 3: 运行 JAgentExtension 相关测试**

```bash
py -m pytest tests/unit/test_skill_defer.py -k "jagent" -v
```

期望：8 个测试全部 PASS

- [ ] **Step 4: 提交**

```bash
git add backend/plugins/jagent/extension.py
git commit -m "feat(jagent): implement get_skill_prompt_brief and get_skill_prompt_for_tools with tool→category mapping"
```

---

## Task 5：CoreAgent 初始化 — 构建 brief prompt

**Files:**
- Modify: `backend/core/agent.py`（约 L149–161）

- [ ] **Step 1: 在现有初始化代码（`self._system_prompt = ...` 那行）之后追加**

找到约 L161：
```python
self._system_prompt = build_system_prompt("\n\n".join(skill_parts), output_fmt)
```

在该行**之后**插入：

```python
        # Skill defer：收集 brief prompt，构建轻量初始 system prompt
        brief_parts: List[str] = []
        for ext in extensions:
            bp = ext.get_skill_prompt_brief()
            if bp:
                brief_parts.append(bp)

        if brief_parts:
            self._brief_system_prompt = build_system_prompt(
                "\n\n".join(brief_parts), output_fmt
            )
            self._use_skill_defer = True
        else:
            self._brief_system_prompt = self._system_prompt
            self._use_skill_defer = False
```

- [ ] **Step 2: 运行 CoreAgent 相关测试**

```bash
py -m pytest tests/unit/test_skill_defer.py -k "coreagent" -v
```

期望：2 个 PASS

- [ ] **Step 3: 运行全量测试，确认无回归**

```bash
py -m pytest tests/ -k "not live" -q --tb=short
```

期望：全部 PASS

- [ ] **Step 4: 提交**

```bash
git add backend/core/agent.py
git commit -m "feat(core): build _brief_system_prompt at init when extension provides brief"
```

---

## Task 6：CoreAgent ReAct 循环 — 动态更新 system message

**Files:**
- Modify: `backend/core/agent.py`（约 L303–311 和 L679–687）

- [ ] **Step 1: 修改 system_parts 初始化（约 L303）**

找到：
```python
        system_parts: List[str] = [self._system_prompt]
```

替换为：
```python
        system_parts: List[str] = [
            self._brief_system_prompt if self._use_skill_defer else self._system_prompt
        ]
```

- [ ] **Step 2: 在循环开始前存储 excel 附加内容（约 L303–310）**

在 `system_parts` 构建完之后、`messages` 构建之前，插入：

```python
        # 存储初始 system message 内容，供 skill defer 更新时复用
        _initial_sys_content = "\n\n".join(system_parts)
```

- [ ] **Step 3: 在 `on_tool_complete` 钩子调用块（约 L679–687）之后插入 skill defer 更新逻辑**

在 `on_tool_complete` 循环结束（约 L687）之后，`if on_event:` 之前，插入：

```python
                    # Skill defer：工具执行后，按已激活类别更新 system message
                    if self._use_skill_defer:
                        ctx.setdefault("_activated_tools", set()).add(name)
                        activated = frozenset(ctx["_activated_tools"])
                        extra_parts: List[str] = []
                        for _ext in self._extensions:
                            try:
                                extra = _ext.get_skill_prompt_for_tools(activated)
                                if extra:
                                    extra_parts.append(extra)
                            except Exception:
                                logger.warning(
                                    "ext.get_skill_prompt_for_tools 失败，已跳过 name=%s",
                                    name,
                                    exc_info=True,
                                )
                        if extra_parts:
                            messages[0]["content"] = (
                                _initial_sys_content
                                + "\n\n---\n\n"
                                + "\n\n".join(extra_parts)
                            )
```

- [ ] **Step 4: 运行全部测试**

```bash
py -m pytest tests/ -k "not live" -q --tb=short
```

期望：全部 PASS（包含 test_skill_defer.py 的所有测试）

- [ ] **Step 5: 提交**

```bash
git add backend/core/agent.py
git commit -m "feat(core): dynamic system message update after each tool call for skill defer"
```

---

## Task 7：集成验证

**Files:** 无新文件，验证已有行为

- [ ] **Step 1: 验证 token 估算**

```bash
cd "d:/Projects/agent-jk/Agent Team version3"
python -c "
from backend.plugins.jagent.extension import JAgentExtension
from backend.core.agent_helpers import build_system_prompt

ext = JAgentExtension()
brief = ext.get_skill_prompt_brief()
full = ext.get_skill_prompt()

brief_prompt = build_system_prompt(brief, '')
full_prompt = build_system_prompt(full, '')

print(f'Brief system prompt: ~{len(brief_prompt)//4} tokens ({len(brief_prompt)} chars)')
print(f'Full system prompt:  ~{len(full_prompt)//4} tokens ({len(full_prompt)} chars)')
print(f'节省: ~{(len(full_prompt)-len(brief_prompt))//4} tokens ({100*(1-len(brief_prompt)/len(full_prompt)):.0f}%)')

inv = ext.get_skill_prompt_for_tools(frozenset({'match_quotation'}))
with_inv = build_system_prompt(brief, '') + inv
print(f'Brief + 库存技能:    ~{len(with_inv)//4} tokens')
"
```

期望输出示例：
```
Brief system prompt: ~1300 tokens
Full system prompt:  ~5000 tokens
节省: ~3700 tokens (74%)
Brief + 库存技能:    ~2600 tokens
```

- [ ] **Step 2: 跑全量测试最终确认**

```bash
py -m pytest tests/ -k "not live" -q --tb=short
```

期望：全部 PASS，无回归

- [ ] **Step 3: 最终提交**

```bash
git add -A
git commit -m "feat: skill defer complete — dynamic system prompt reduces cold-start tokens by ~74%"
```

---

## 自检

### Spec 覆盖

| Spec 要求 | Task |
|-----------|------|
| `get_skill_prompt_brief()` 基类默认空 | Task 2 |
| `get_skill_prompt_for_tools()` 基类默认空 | Task 2 |
| `SKILL_PROMPT_BRIEF` 常量 ~180 token | Task 3 |
| `_TOOL_CATEGORY` + `_CATEGORY_TO_SKILL` | Task 4 |
| JAgentExtension 实现两个方法 | Task 4 |
| CoreAgent 初始化 brief prompt | Task 5 |
| CoreAgent ReAct 循环动态更新 `messages[0]` | Task 6 |
| 无 brief 时回退现有行为 | Task 5 + 测试覆盖 |
| 成功标准：无工具调用 ≤ 1,500 token | Task 7 |
| 373 测试无回归 | Task 5、6、7 |

### 工作量估算

| Task | 预计时间 |
|------|---------|
| Task 1: 测试 | 20 min |
| Task 2: 基类方法 | 10 min |
| Task 3: SKILL_PROMPT_BRIEF | 10 min |
| Task 4: JAgentExtension | 20 min |
| Task 5: CoreAgent 初始化 | 15 min |
| Task 6: ReAct 循环 | 20 min |
| Task 7: 集成验证 | 10 min |
| **合计** | **~105 min** |
