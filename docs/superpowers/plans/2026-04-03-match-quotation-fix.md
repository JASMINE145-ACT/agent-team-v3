# match_quotation 三项修复 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix three issues introduced when switching to `PRIMARY_LLM_PROTOCOL=anthropic`: (1) `selection_reasoning` not displayed in replies, (2) 💡 inventory message missing reasoning, (3) `match_quotation` slow because selector LLM was upgraded to MiniMax M2.7.

**Architecture:** Two targeted changes in two files. `llm_selector.py`: delete the `use_anthropic` branch so `llm_select_best` always uses the inventory config's GLM (OpenAI-compatible), and cap max_tokens at 512. `skills.py`: replace one wrong instruction line about `selection_reasoning` being "UI-rendered" with an instruction to include it in the reply.

**Tech Stack:** Python 3.11, `openai` SDK, `unittest`/`pytest`

---

## File Map

| File | Action | What changes |
|------|--------|-------------|
| `backend/tools/inventory/services/llm_selector.py` | Modify | Delete `use_anthropic` branch (lines 165–202); fix max_tokens to 512 |
| `backend/plugins/jagent/skills.py` | Modify | Replace line 137 instruction about `selection_reasoning` |
| `tests/test_llm_selector_protocol.py` | Create | Tests for GLM-always + max_tokens≤512 behaviour |
| `tests/test_skills_reasoning_display.py` | Create | Tests for corrected skills instruction |

---

## Task 1 — Test that llm_select_best always uses GLM (failing first)

**Files:**
- Create: `tests/test_llm_selector_protocol.py`

- [ ] **Step 1: Write the failing tests**

Create `tests/test_llm_selector_protocol.py` with this content:

```python
"""
Unit tests: llm_select_best must always use OpenAI-compatible (GLM) path,
regardless of PRIMARY_LLM_PROTOCOL, and must cap max_tokens at 512.
"""
import json
import types
import unittest
from unittest.mock import MagicMock, patch


CANDIDATES = [
    {"code": "1000000001", "matched_name": "等径三通 PPR dn20", "unit_price": 5.0, "source": "字段匹配"},
    {"code": "1000000002", "matched_name": "异径三通 PPR dn20x15", "unit_price": 4.0, "source": "字段匹配"},
]

_GOOD_RESPONSE = json.dumps({"confident": True, "index": 1, "reasoning": "等径优先"})


def _make_openai_response(content: str):
    """Build a minimal mock that looks like openai ChatCompletion response."""
    msg = MagicMock()
    msg.content = content
    choice = MagicMock()
    choice.message = msg
    choice.finish_reason = "stop"
    resp = MagicMock()
    resp.choices = [choice]
    return resp


class TestLlmSelectBestAlwaysGlm(unittest.TestCase):
    def _run_with_anthropic_env(self, mock_openai_cls):
        """Simulate PRIMARY_LLM_PROTOCOL=anthropic and verify OpenAI path is used."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.return_value = _make_openai_response(_GOOD_RESPONSE)
        mock_openai_cls.return_value = mock_client

        # Patch AppConfig to look like anthropic is configured
        fake_config = MagicMock()
        fake_config.PRIMARY_LLM_PROTOCOL = "anthropic"
        fake_config.ANTHROPIC_API_KEY = "sk-test"
        fake_config.ANTHROPIC_BASE_URL = "https://api.minimaxi.com/anthropic"
        fake_config.LLM_MODEL = "MiniMax-M2.7"

        with patch.dict("sys.modules", {"backend.config": MagicMock(Config=fake_config)}):
            from backend.tools.inventory.services.llm_selector import llm_select_best
            result = llm_select_best("等径三通 dn20", CANDIDATES)

        return result, mock_client

    @patch("openai.OpenAI")
    def test_uses_openai_not_anthropic_when_protocol_is_anthropic(self, mock_openai_cls):
        """Even with PRIMARY_LLM_PROTOCOL=anthropic, must use OpenAI SDK (GLM)."""
        result, mock_client = self._run_with_anthropic_env(mock_openai_cls)
        # OpenAI client must have been called
        self.assertTrue(mock_openai_cls.called, "OpenAI client was not instantiated")
        self.assertTrue(
            mock_client.chat.completions.create.called,
            "OpenAI chat.completions.create was not called",
        )

    @patch("openai.OpenAI")
    def test_max_tokens_capped_at_512(self, mock_openai_cls):
        """max_tokens passed to OpenAI must be ≤ 512."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.return_value = _make_openai_response(_GOOD_RESPONSE)
        mock_openai_cls.return_value = mock_client

        from backend.tools.inventory.services.llm_selector import llm_select_best
        llm_select_best("等径三通 dn20", CANDIDATES)

        call_kwargs = mock_client.chat.completions.create.call_args[1]
        mt = call_kwargs.get("max_tokens", 99999)
        self.assertLessEqual(mt, 512, f"max_tokens={mt} exceeds 512")

    @patch("openai.OpenAI")
    def test_result_has_reasoning(self, mock_openai_cls):
        """Result dict must contain 'reasoning' key when LLM returns one."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.return_value = _make_openai_response(_GOOD_RESPONSE)
        mock_openai_cls.return_value = mock_client

        from backend.tools.inventory.services.llm_selector import llm_select_best
        result = llm_select_best("等径三通 dn20", CANDIDATES)

        self.assertIsNotNone(result)
        self.assertIn("reasoning", result)
        self.assertEqual(result["reasoning"], "等径优先")


if __name__ == "__main__":
    unittest.main(verbosity=2)
```

- [ ] **Step 2: Run tests — verify they FAIL**

```bash
cd "Agent Team version3"
python -m pytest tests/test_llm_selector_protocol.py -v
```

Expected: **FAILED** — `test_uses_openai_not_anthropic_when_protocol_is_anthropic` fails because the current code takes the anthropic branch.

---

## Task 2 — Implement: delete anthropic branch, fix max_tokens

**Files:**
- Modify: `backend/tools/inventory/services/llm_selector.py` lines 163–236

- [ ] **Step 1: Replace the branching block with the GLM-only path**

Find this block (lines 163–236 in `llm_selector.py`):

```python
        mt = min(int(max_tokens or 8192), 8192)

        use_anthropic = False
        AppConfig: Any = None
        try:
            from backend.config import Config as AppConfig
            use_anthropic = (
                getattr(AppConfig, "PRIMARY_LLM_PROTOCOL", "") == "anthropic"
                and (getattr(AppConfig, "ANTHROPIC_API_KEY", None) or "").strip()
                and (getattr(AppConfig, "ANTHROPIC_BASE_URL", None) or "").strip()
            )
        except Exception:
            AppConfig = None

        if use_anthropic and AppConfig is not None:
            # 与 CoreAgent 主链路一致：Anthropic Messages（MiniMax 官方兼容网关），避免 OpenAI 兼容层另一套域名/密钥导致 401
            import anthropic as anthropic_sdk
            from backend.core.anthropic_react_llm import call_anthropic_messages_sync

            _ak = AppConfig.ANTHROPIC_API_KEY.strip()
            _bu = AppConfig.ANTHROPIC_BASE_URL.strip().rstrip("/")
            client = anthropic_sdk.Anthropic(api_key=_ak, base_url=_bu)
            model = (getattr(AppConfig, "LLM_MODEL", None) or model).strip()
            logger.info(
                "llm_select_best: Anthropic SDK model=%s n_candidates=%d",
                model,
                len(candidates),
            )
            text, _, _, _ = call_anthropic_messages_sync(
                client,
                model,
                [
                    {"role": "system", "content": _system_selector},
                    {"role": "user", "content": prompt},
                ],
                None,
                temperature=0.0,
                max_tokens=mt,
            )
            content = (text or "").strip()
        else:
            from openai import OpenAI

            api_key = getattr(config, "LLM_API_KEY", "") or ""
            base_url = getattr(config, "LLM_BASE_URL", "https://open.bigmodel.cn/api/paas/v4")
            model = getattr(config, "LLM_MODEL", "glm-4.5-air")
            logger.info(
                "llm_select_best: OpenAI-compatible model=%s n_candidates=%d",
                model,
                len(candidates),
            )
            client = OpenAI(api_key=api_key, base_url=base_url)
            api_kwargs: dict[str, Any] = {
                "model": model,
                "messages": [
                    {"role": "system", "content": _system_selector},
                    {"role": "user", "content": prompt},
                ],
                "temperature": 0,
                "max_tokens": max_tokens,
                "timeout": timeout,
            }
            resp = client.chat.completions.create(**api_kwargs)
            raw_content = resp.choices[0].message.content if resp.choices else None
            content = (raw_content or "").strip()
            if not content:
                fr = getattr(resp.choices[0], "finish_reason", None) if resp.choices else None
                logger.warning(
                    "LLM 返回空内容，raw=%s finish_reason=%s%s",
                    raw_content,
                    fr,
                    "（输出被截断，可增大 LLM_MAX_TOKENS 后重试）" if fr == "length" else "",
                )
                raise ValueError("LLM 返回空内容")
```

Replace with:

```python
        # 选型任务始终使用 inventory config 的 OpenAI 兼容 LLM（GLM）。
        # 主链路协议（anthropic/openai）不影响选型路径，避免切换主链路时意外升级选型模型。
        # 选型输出为小 JSON（30–80 token），max_tokens 512 绰绰有余。
        mt = min(int(max_tokens or 512), 512)

        from openai import OpenAI

        api_key = getattr(config, "LLM_API_KEY", "") or ""
        base_url = getattr(config, "LLM_BASE_URL", "https://open.bigmodel.cn/api/paas/v4")
        model = getattr(config, "LLM_MODEL", "glm-4.5-air")
        logger.info(
            "llm_select_best: OpenAI-compatible model=%s n_candidates=%d",
            model,
            len(candidates),
        )
        client = OpenAI(api_key=api_key, base_url=base_url)
        api_kwargs: dict[str, Any] = {
            "model": model,
            "messages": [
                {"role": "system", "content": _system_selector},
                {"role": "user", "content": prompt},
            ],
            "temperature": 0,
            "max_tokens": mt,
            "timeout": timeout,
        }
        resp = client.chat.completions.create(**api_kwargs)
        raw_content = resp.choices[0].message.content if resp.choices else None
        content = (raw_content or "").strip()
        if not content:
            fr = getattr(resp.choices[0], "finish_reason", None) if resp.choices else None
            logger.warning(
                "LLM 返回空内容，raw=%s finish_reason=%s%s",
                raw_content,
                fr,
                "（输出被截断，可增大 LLM_MAX_TOKENS 后重试）" if fr == "length" else "",
            )
            raise ValueError("LLM 返回空内容")
```

Also remove the now-unused import at the top of the `try` block — `AppConfig: Any = None` line and the `use_anthropic` variable. (The `Any` type is still used elsewhere in the file, leave the import.)

- [ ] **Step 2: Run tests — verify they PASS**

```bash
python -m pytest tests/test_llm_selector_protocol.py -v
```

Expected: **PASSED** (3 tests)

- [ ] **Step 3: Commit**

```bash
git add backend/tools/inventory/services/llm_selector.py tests/test_llm_selector_protocol.py
git commit -m "fix: llm_select_best always uses GLM; cap selector max_tokens at 512"
```

---

## Task 3 — Test skills.py selection_reasoning instruction (failing first)

**Files:**
- Create: `tests/test_skills_reasoning_display.py`

- [ ] **Step 1: Write the failing tests**

Create `tests/test_skills_reasoning_display.py` with this content:

```python
"""
Unit tests: skills.py must instruct the model to include selection_reasoning
in the reply, NOT claim it is rendered by UI.
"""
import unittest


class TestSkillsReasoningDisplay(unittest.TestCase):
    def _get_rules_text(self) -> str:
        from backend.plugins.jagent.skills import SKILL_INVENTORY_PRICE_RULES
        return SKILL_INVENTORY_PRICE_RULES

    def test_old_ui_render_instruction_removed(self):
        """The incorrect 'by UI directly rendered' instruction must be gone."""
        text = self._get_rules_text()
        self.assertNotIn(
            "由 UI 直接渲染",
            text,
            "Old 'UI renders reasoning' instruction should be removed",
        )

    def test_reasoning_include_in_reply_instruction_present(self):
        """New instruction: include selection_reasoning in the reply must be present."""
        text = self._get_rules_text()
        # The new rule should tell the model to include reasoning in the reply
        self.assertIn(
            "selection_reasoning",
            text,
            "skills.py must still reference selection_reasoning",
        )
        # Must say something about including it in the reply
        self.assertTrue(
            "回复" in text or "reply" in text.lower(),
            "New instruction must mention including reasoning in the reply",
        )

    def test_inventory_zero_reasoning_instruction_present(self):
        """When inventory is zero and reasoning exists, 💡 message must include it."""
        text = self._get_rules_text()
        self.assertIn(
            "selection_reasoning",
            text,
        )
        # Check the 💡 guidance is somewhere in the text
        self.assertIn("💡", text)


if __name__ == "__main__":
    unittest.main(verbosity=2)
```

- [ ] **Step 2: Run tests — verify they FAIL**

```bash
python -m pytest tests/test_skills_reasoning_display.py -v
```

Expected: `test_old_ui_render_instruction_removed` **FAILS** (old text still present), `test_inventory_zero_reasoning_instruction_present` may fail (no 💡 guidance yet).

---

## Task 4 — Implement: fix skills.py reasoning display instruction

**Files:**
- Modify: `backend/plugins/jagent/skills.py` line 137

- [ ] **Step 1: Replace the incorrect instruction**

Find this exact line (line 137 in `SKILL_INVENTORY_PRICE_RULES`):

```python
- `match_quotation` / `select_wanding_match` 返回的 `selection_reasoning` / `reasoning` 是工具 JSON 中的 structured 数据（LLM 推理理由），**由 UI 直接渲染**，模型不需要在 think 里复述。
```

Replace with these two lines:

```python
- `match_quotation` / `select_wanding_match` 返回的 `selection_reasoning` / `reasoning` 是选型理由，**必须在回复中体现**：有 `selection_reasoning` 时，在结果表下方或产品行备注中附上（例如「匹配理由：{selection_reasoning}」）；为空时略去。
- 库存为 0 或无数据时，若有 `selection_reasoning`，💡 消息格式为：「💡 该产品当前库存信息暂无数据（匹配理由：{selection_reasoning}），如需确认库存请告知。」；无 `selection_reasoning` 时保持原格式。
```

- [ ] **Step 2: Run tests — verify they PASS**

```bash
python -m pytest tests/test_skills_reasoning_display.py -v
```

Expected: **PASSED** (3 tests)

- [ ] **Step 3: Run full test suite to verify no regressions**

```bash
python -m pytest tests/test_anthropic_react_messages.py tests/test_llm_selector_protocol.py tests/test_skills_reasoning_display.py -v
```

Expected: all **PASS**

- [ ] **Step 4: Commit**

```bash
git add backend/plugins/jagent/skills.py tests/test_skills_reasoning_display.py
git commit -m "fix: include selection_reasoning in agent reply; update skills.py instruction"
```

---

## Task 5 — Verify: run existing integration tests

**Files:** none (read-only verification)

- [ ] **Step 1: Run structure-only integration tests**

```bash
python -m pytest tests/test_integration_agent_react.py -m "not live" -v
```

Expected: **PASS**

- [ ] **Step 2: Run full non-live test suite**

```bash
python -m pytest tests/ -v --ignore=tests/test_core_glm_query.py -m "not live"
```

Expected: all **PASS**

- [ ] **Step 3: Final commit if any fixups needed; otherwise done**

```bash
git status  # should be clean
```

---

## Verification Checklist (manual smoke test)

After implementation, with `PRIMARY_LLM_PROTOCOL=anthropic`:

- [ ] Query triggering `match_quotation` — reply contains the selection reasoning text
- [ ] Product with zero inventory — 💡 message shows `（匹配理由：...）` when reasoning is non-empty
- [ ] Product with zero inventory, no reasoning — 💡 message unchanged (no `（匹配理由：）` suffix)
- [ ] Backend logs show `llm_select_best: OpenAI-compatible model=glm-*`, NOT `Anthropic SDK model=MiniMax*`
- [ ] `match_quotation` noticeably faster than before
