# Skill Defer Design

> **Date:** 2026-04-30  
> **Scope:** `backend/core/extension.py` · `backend/core/agent.py` · `backend/plugins/jagent/extension.py` · `backend/plugins/jagent/skills.py`  
> **Problem:** System prompt全量注入 ~5,000 token，无论用户是问候还是批量询价，每步 LLM 调用都带着同等重量的技能描述。

---

## 1. 设计原则

镜像现有 `ENABLE_TOOL_DEFER` 模式，将其从工具 schema 扩展到**技能描述文字**：

```
tool_defer:   stub → tool_search → full schema
skill_defer:  brief → tool_called → full skill description
```

**关键不变量：**
- `OUTPUT_FORMAT` 和 `GLOBAL_HARD_CONSTRAINTS` 每步始终存在，不可裁剪
- 同一 category 只注入一次（不重复追加）
- 无 brief 实现时自动回退现有行为（向后兼容）

---

## 2. 整体数据流

```
初始化：
  brief_parts = [ext.get_skill_prompt_brief() for ext in extensions]
  有 brief → _brief_system_prompt = build_system_prompt(brief, output_fmt)
  无 brief → 回退 _system_prompt（现有行为）

ReAct 第 1 步：
  system_prompt = _brief_system_prompt
    = SKILL_PROMPT_BRIEF (~180t)
    + GLOBAL_HARD_CONSTRAINTS (~120t)
    + OUTPUT_FORMAT (~1,000t)
    ≈ 1,300 token

LLM 调用 match_quotation
  ↓ ctx["_activated_tools"].add("match_quotation")

ReAct 第 2 步：
  extra = ext.get_skill_prompt_for_tools({"match_quotation"})
        = SKILL_INVENTORY_PRICE_DOC (~1,300t)
  system_prompt = _brief_system_prompt + extra
    ≈ 2,600 token

依此类推，新 category 首次出现才追加，同 category 不重复
```

---

## 3. AgentExtension 基类（extension.py）

新增 2 个方法，默认返回空（向后兼容）：

```python
def get_skill_prompt_brief(self) -> str:
    """每步始终注入的轻量路由提示（目标 ~200 token）。
    返回空字符串时 CoreAgent 回退 get_skill_prompt()，行为与现在完全一致。"""
    return ""

def get_skill_prompt_for_tools(self, activated_tools: frozenset[str]) -> str:
    """工具被调用后，按 tool→category 映射返回对应完整技能描述。
    CoreAgent 在每步工具执行后调用；同一 category 只会在首次出现时触发。"""
    return ""
```

---

## 4. JAgentExtension（jagent/extension.py）

### 4.1 Tool → Category 映射

```python
_TOOL_CATEGORY: dict[str, str] = {
    # 库存/询价
    "match_quotation": "inventory",
    "match_quotation_batch": "inventory",
    "select_wanding_match": "inventory",
    "match_wanding_price": "inventory",
    "match_by_quotation_history": "inventory",
    "get_inventory_by_code": "inventory",
    "get_inventory_by_code_batch": "inventory",
    "get_profit_by_price": "inventory",
    "get_profit_by_price_batch": "inventory",
    "modify_inventory": "inventory",
    "search_inventory": "inventory",
    # 报价单/Excel
    "fill_quotation_sheet": "quotation",
    "run_quotation_fill": "quotation",
    "parse_excel_smart": "quotation",
    "edit_excel": "quotation",
    "batch_quick_quote": "quotation",
    # OOS
    "get_oos_list": "oos",
    "get_oos_stats": "oos",
    "get_oos_by_file": "oos",
    "get_oos_by_time": "oos",
    "register_oos": "oos",
    "register_oos_from_text": "oos",
    # 业务知识
    "append_business_knowledge": "knowledge",
}
```

### 4.2 Category → 完整技能描述

```python
_CATEGORY_TO_SKILL: dict[str, str] = {
    "inventory": SKILL_INVENTORY_PRICE_DOC,   # ~1,300 token
    "quotation": SKILL_QUOTE_DOC + "\n\n" + SKILL_FILL_DOC + "\n\n" + SKILL_EXCEL_CHAT_DOC,  # ~340 token
    "oos":       SKILL_OOS_DOC,               # ~180 token
    "knowledge": SKILL_KNOWLEDGE_DOC,         # ~170 token
}
```

### 4.3 方法实现

```python
def get_skill_prompt_brief(self) -> str:
    return SKILL_PROMPT_BRIEF  # 见 5.1

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

---

## 5. Skills 常量（jagent/skills.py）

### 5.1 `SKILL_PROMPT_BRIEF`（新增，~180 token）

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

---

## 6. CoreAgent 变更（agent.py）

### 6.1 初始化（`__init__`）

现有逻辑之后追加：

```python
# Skill defer：收集 brief prompt
brief_parts: list[str] = []
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
    self._brief_system_prompt = self._system_prompt  # 回退
    self._use_skill_defer = False
```

### 6.2 ReAct 循环内

**工具执行后**（紧接 `on_tool_complete` 钩子调用之后）：

```python
# 记录已激活工具
ctx.setdefault("_activated_tools", set()).add(name)

# 重建当前步的 system prompt
if self._use_skill_defer:
    activated = frozenset(ctx["_activated_tools"])
    extra_parts: list[str] = []
    for ext in self._extensions:
        extra = ext.get_skill_prompt_for_tools(activated)
        if extra:
            extra_parts.append(extra)
    ctx["_current_system_prompt"] = (
        self._brief_system_prompt
        + ("\n\n---\n\n" + "\n\n".join(extra_parts) if extra_parts else "")
    )
```

**每次 LLM 调用前**，取 `ctx.get("_current_system_prompt", self._brief_system_prompt)` 作为当前步的 system prompt。

---

## 7. Token 预算

| 场景 | 现在 | 改后 |
|------|------|------|
| 问候 / 闲聊（无工具） | ~5,000 | **~1,300** |
| 第 1 步（意图路由） | ~5,000 | **~1,300** |
| 首次调库存工具后 | ~5,000 | **~2,600** |
| 库存 + 报价单 | ~5,000 | **~3,200** |
| 全类别激活 | ~5,000 | **~3,500** |

---

## 8. 文件变更地图

| 文件 | 操作 | 内容 |
|------|------|------|
| `backend/core/extension.py` | **修改** | 新增 `get_skill_prompt_brief()` 和 `get_skill_prompt_for_tools()` 两个默认空方法 |
| `backend/plugins/jagent/skills.py` | **修改** | 新增 `SKILL_PROMPT_BRIEF` 常量 |
| `backend/plugins/jagent/extension.py` | **修改** | 新增 `_TOOL_CATEGORY` 映射、`_CATEGORY_TO_SKILL` 映射、实现两个新方法 |
| `backend/core/agent.py` | **修改** | 初始化时构建 brief prompt；ReAct 循环内追踪激活工具，每步动态更新 system prompt |
| `tests/unit/test_skill_defer.py` | **新建** | 单元测试：brief/full 切换、category 映射、回退行为 |

---

## 9. 不变量 & 兜底

- `get_skill_prompt_brief()` 返回空 → `_use_skill_defer = False` → 完全回退现有行为
- `GLOBAL_HARD_CONSTRAINTS` 和 `OUTPUT_FORMAT` 在 `build_system_prompt` 中始终存在，不受 defer 影响
- `ask_clarification` / `tool_search` 属于 core 工具，不需要 category 映射，brief 中已有路由提示

---

## 10. 成功标准

- 无工具调用的对话首步 system prompt ≤ 1,500 token
- 库存询价场景完整功能与改前行为一致
- `tests/unit/test_skill_defer.py` 全部通过
- 现有 373 个测试全部通过（无回归）
