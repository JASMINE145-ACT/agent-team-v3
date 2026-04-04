# match_quotation show_all_candidates Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `show_all_candidates` parameter to `match_quotation` so the agent can bypass LLM auto-selection and return the full candidate list when the user wants to choose manually.

**Architecture:** Two-file change — tool schema + implementation in `inventory_agent_tools.py`, prompt rules in `skills.py` (RULES version). No new files, no interface changes to other tools.

**Tech Stack:** Python, OpenAI function-calling schema, existing `match_quotation` pipeline.

---

## Background & Root Cause

When `match_quotation` returns `match_type: "single"` (LLM selected one candidate), the `candidates` array is included in the payload but the agent has no clean way to re-surface it without re-calling the tool.

When a user says "我想看全部list自己选", the agent currently:
1. Re-calls `match_quotation` (which selects again → same `single` result)
2. Falls back to `match_by_quotation_history` (wrong tool — history only, no wanding matches)
3. Returns an incomplete or incorrect list

**Fix:** Add `show_all_candidates=true` to the tool schema. When set, skip `llm_select_best` entirely and return `needs_selection` with the full candidates list.

---

## Files

- Modify: `backend/tools/inventory/services/inventory_agent_tools.py`
  - Schema: add `show_all_candidates` boolean parameter to `match_quotation`
  - Implementation: `_execute_match_quotation` — when `show_all_candidates=True`, skip LLM selection
- Modify: `backend/plugins/jagent/skills.py`
  - RULES version: add routing rule for `show_all_candidates`
  - RULES version: add output rule requiring "共有N个候选" disclosure on `single` results
  - DOC version: matching updates

---

## Task 1: Tool Schema — add `show_all_candidates` parameter

**Files:**
- Modify: `backend/tools/inventory/services/inventory_agent_tools.py` (around line 944)

- [ ] **Step 1: Add parameter to schema**

In `get_inventory_tools_openai_format()`, update the `match_quotation` properties block:

```python
"properties": {
    "keywords": {
        "type": "string",
        "description": "产品名+规格，如 直接50mm、直径25PPR"
    },
    "customer_level": {
        "type": "string",
        "description": "价格档位：A/B/C/D/D_low/E（报单）或 出厂价_含税/出厂价_不含税/采购不含税。用户说「二级代理」用 A、「青山大客户」用 D、「出厂价含税」用 出厂价_含税。默认 B"
    },
    "show_all_candidates": {
        "type": "boolean",
        "description": "true 时跳过 LLM 选型，直接返回全部候选列表（用户说「全部list/所有候选/我想自己选/列出所有」时传 true）"
    },
},
```

- [ ] **Step 2: Verify schema is correct (visual check)**

Run Python to confirm the schema renders without error:
```bash
cd "Agent Team version3"
python -c "from backend.tools.inventory.services.inventory_agent_tools import get_inventory_tools_openai_format; t = [x for x in get_inventory_tools_openai_format() if x['function']['name']=='match_quotation'][0]; print(list(t['function']['parameters']['properties'].keys()))"
```
Expected output: `['keywords', 'customer_level', 'show_all_candidates']`

---

## Task 2: Tool Implementation — bypass LLM selection when `show_all_candidates=True`

**Files:**
- Modify: `backend/tools/inventory/services/inventory_agent_tools.py` — `_execute_match_quotation` (around line 118)

- [ ] **Step 1: Write failing test**

In `tests/test_match_quotation_show_all.py`:

```python
"""
Unit tests: match_quotation with show_all_candidates=True must skip LLM selection.
"""
import json
import unittest
from unittest.mock import patch, MagicMock


FAKE_CANDIDATES = [
    {"code": "1000000001", "matched_name": "等径三通 PPR dn50", "unit_price": 5.0, "source": "字段匹配"},
    {"code": "1000000002", "matched_name": "异径三通 PPR dn50x32", "unit_price": 4.0, "source": "字段匹配"},
    {"code": "1000000003", "matched_name": "正三通 PVC-U dn50", "unit_price": 3.0, "source": "字段匹配"},
]


class TestShowAllCandidates(unittest.TestCase):
    @patch("backend.tools.inventory.services.inventory_agent_tools.match_quotation_union")
    @patch("backend.tools.inventory.services.inventory_agent_tools.llm_select_best")
    def test_show_all_skips_llm_selection(self, mock_llm, mock_union):
        """show_all_candidates=True must return needs_selection without calling llm_select_best."""
        mock_union.return_value = FAKE_CANDIDATES
        mock_llm.return_value = None  # should never be called

        from backend.tools.inventory.services.inventory_agent_tools import _execute_match_quotation
        result = _execute_match_quotation({"keywords": "三通50", "show_all_candidates": True})

        self.assertFalse(mock_llm.called, "llm_select_best must NOT be called when show_all_candidates=True")
        payload = json.loads(result["result"])
        self.assertTrue(payload.get("needs_selection"))
        self.assertEqual(len(payload["candidates"]), 3)

    @patch("backend.tools.inventory.services.inventory_agent_tools.match_quotation_union")
    @patch("backend.tools.inventory.services.inventory_agent_tools.llm_select_best")
    def test_normal_flow_still_calls_llm(self, mock_llm, mock_union):
        """show_all_candidates omitted (default False) must still call llm_select_best."""
        mock_union.return_value = FAKE_CANDIDATES
        mock_llm.return_value = {
            "code": "1000000001", "matched_name": "等径三通 PPR dn50",
            "unit_price": 5.0, "reasoning": "等径优先"
        }

        from backend.tools.inventory.services.inventory_agent_tools import _execute_match_quotation
        result = _execute_match_quotation({"keywords": "三通50"})

        self.assertTrue(mock_llm.called, "llm_select_best MUST be called when show_all_candidates is not set")
        payload = json.loads(result["result"])
        self.assertTrue(payload.get("single"))


if __name__ == "__main__":
    unittest.main(verbosity=2)
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
cd "Agent Team version3"
python -m pytest tests/test_match_quotation_show_all.py -v
```
Expected: 2 failures (function doesn't have the new parameter yet).

- [ ] **Step 3: Implement in `_execute_match_quotation`**

In `_execute_match_quotation`, read the flag immediately after parsing `keywords` and `customer_level`:

```python
show_all = bool(arguments.get("show_all_candidates", False))
```

Then, just before the `if len(norm) == 1` single-candidate shortcut, add the bypass:

```python
# Fast-path: user wants full list, skip LLM selection entirely
if show_all:
    payload = {
        "needs_selection": True,
        "show_all_candidates": True,
        "keywords": keywords,
        "candidates": norm[:max_show],
        "match_source": match_source_str,
    }
    return {"success": True, "result": json.dumps(payload, ensure_ascii=False)}
```

This goes **after** `norm` is built and `match_source_str` is determined, but **before** the single-candidate shortcut and `llm_select_best` call.

- [ ] **Step 4: Run test — expect PASS**

```bash
cd "Agent Team version3"
python -m pytest tests/test_match_quotation_show_all.py -v
```
Expected: 2 passed.

- [ ] **Step 5: Commit**

```bash
git add tests/test_match_quotation_show_all.py backend/tools/inventory/services/inventory_agent_tools.py
git commit -m "feat: add show_all_candidates param to match_quotation, bypasses LLM selection"
```

---

## Task 3: Skills.py — routing rule + output rule

**Files:**
- Modify: `backend/plugins/jagent/skills.py` — RULES version (`SKILL_INVENTORY_PRICE_RULES`) and DOC version (`SKILL_INVENTORY_PRICE_DOC`)

- [ ] **Step 1: Add routing rule to RULES version**

In `[Routing & Priority Rules]`, after the existing `show_all_candidates`-adjacent rules, add:

```
- IF the user says 「全部list」「所有候选」「我想自己选」「列出所有」「给我看看所有的」,
  THEN call match_quotation(keywords, show_all_candidates=true) to return all candidates without auto-selection.
  DO NOT re-call match_quotation without this flag.
  DO NOT use match_by_quotation_history as a workaround (history-only, misses wanding matches).
  - Example (Correct): 「三通50 我想自己选」→ match_quotation(keywords="三通50", show_all_candidates=true) ✅
  - Example (Incorrect): 「三通50 我想自己选」→ match_quotation(keywords="三通50") [re-call without flag] ❌
  - Example (Incorrect): 「三通50 我想自己选」→ match_by_quotation_history(keywords="三通50") ❌
```

- [ ] **Step 2: Add output rule to RULES version**

In `[Output & Formatting Rules]`, add:

```
- IF match_quotation returns `single: true` with N candidates (N > 1),
  THEN you MUST append to the reply: 「共有 N 个候选，如需查看全部请告知。」
  (Replace N with the actual length of the `candidates` array.)
```

- [ ] **Step 3: Add note to DOC version**

In `SKILL_INVENTORY_PRICE_DOC`, in the `match_quotation` bullet, add:

```
可选参数 `show_all_candidates=true`：跳过 LLM 选型，直接返回所有候选列表（用户说「全部list/所有候选/我想自己选」时使用）。
```

- [ ] **Step 4: Verify no syntax errors**

```bash
cd "Agent Team version3"
python -c "from backend.plugins.jagent.skills import SKILL_INVENTORY_PRICE_RULES, SKILL_INVENTORY_PRICE_DOC; print('OK', len(SKILL_INVENTORY_PRICE_RULES), len(SKILL_INVENTORY_PRICE_DOC))"
```
Expected: `OK <n> <m>` with no import errors.

- [ ] **Step 5: Run existing tests**

```bash
cd "Agent Team version3"
python -m pytest tests/test_match_quotation_show_all.py tests/test_llm_selector_protocol.py tests/test_skills_reasoning_display.py tests/test_anthropic_react_messages.py -v
```
Expected: all passed.

- [ ] **Step 6: Commit**

```bash
git add backend/plugins/jagent/skills.py
git commit -m "feat: skills.py routing + output rules for show_all_candidates"
```

---

## Spec Self-Review

1. **Placeholder scan:** No TBD or TODO items. All code blocks are complete.
2. **Internal consistency:** Schema parameter name `show_all_candidates` matches implementation variable `show_all` and skills.py description. Return payload includes `show_all_candidates: True` flag so agent can confirm the mode.
3. **Scope:** Single focused feature — one new boolean parameter, two prompt rules. No other tools affected.
4. **Ambiguity:** The bypass path triggers on `show_all_candidates=True` only; default `False` preserves all existing behavior.
