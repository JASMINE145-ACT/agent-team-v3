# LLM Selector Fast Path Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a fast path to `llm_select_best` that routes to `gpt-4o-mini` (or any non-thinking model) via config switch, while keeping the old `glm-4.5-air` path intact and switchable.

**Architecture:** Single env var `LLM_SELECTOR_MODEL` triggers the fast path. Old path code is untouched inside an `else` branch. A module-level client singleton avoids TCP reconnects on each call.

**Tech Stack:** Python, openai SDK (already a dependency), `InventoryConfig` class pattern.

---

## File Map

| File | Change |
|------|--------|
| `backend/tools/inventory/config.py` | Add 3 class-level attributes for selector-specific API keys |
| `backend/tools/inventory/services/llm_selector.py` | Add `_selector_client` singleton + `_get_selector_client()` + `_fast_path()` + branch in `llm_select_best` + `knowledge_override` param |
| `.env.example` | Document new env vars |
| `tests/test_llm_selector_fast_path.py` | New test file for fast path |

---

## Task 1: Add config keys

**Files:**
- Modify: `backend/tools/inventory/config.py:160-161`

- [ ] **Step 1: Add 3 new class attributes after `LLM_SELECTOR_TIMEOUT`**

Open `backend/tools/inventory/config.py`. Find this block (around line 160):

```python
    LLM_SELECTOR_MAX_TOKENS: int = int(os.environ.get("LLM_SELECTOR_MAX_TOKENS", "3000"))
    LLM_SELECTOR_TIMEOUT: int = int(os.environ.get("LLM_SELECTOR_TIMEOUT", "40"))
```

Add three lines immediately after:

```python
    LLM_SELECTOR_MAX_TOKENS: int = int(os.environ.get("LLM_SELECTOR_MAX_TOKENS", "3000"))
    LLM_SELECTOR_TIMEOUT: int = int(os.environ.get("LLM_SELECTOR_TIMEOUT", "40"))
    # Fast-path selector model (leave empty to keep old glm-4.5-air path)
    LLM_SELECTOR_MODEL: str = os.environ.get("LLM_SELECTOR_MODEL", "").strip()
    LLM_SELECTOR_API_KEY: str = os.environ.get("LLM_SELECTOR_API_KEY", "").strip()
    LLM_SELECTOR_BASE_URL: str = os.environ.get("LLM_SELECTOR_BASE_URL", "").strip()
```

- [ ] **Step 2: Update `.env.example` — add the new keys under the LLM section**

Find the block around line 35 in `.env.example`:
```
# 3) OpenAI — 仅记忆 / 上下文压缩（SUMMARY_LLM_*）
SUMMARY_LLM_MODEL=gpt-4o-mini
SUMMARY_LLM_BASE_URL=https://api.openai.com/v1
SUMMARY_LLM_API_KEY=your-openai-key
```

Add after it:

```
# LLM Selector 专属模型（留空 = 旧路径 glm-4.5-air，填写 = 快速路径，推荐 gpt-4o-mini）
# LLM_SELECTOR_MODEL=gpt-4o-mini
# LLM_SELECTOR_API_KEY=your-openai-key
# LLM_SELECTOR_BASE_URL=https://api.openai.com/v1
# LLM_SELECTOR_TIMEOUT=15
```

- [ ] **Step 3: Verify config loads correctly**

```bash
cd "Agent Team version3"
python -c "
from backend.tools.inventory.config import config
print('LLM_SELECTOR_MODEL:', repr(config.LLM_SELECTOR_MODEL))
print('LLM_SELECTOR_API_KEY:', repr(config.LLM_SELECTOR_API_KEY[:4] if config.LLM_SELECTOR_API_KEY else ''))
print('LLM_SELECTOR_BASE_URL:', repr(config.LLM_SELECTOR_BASE_URL))
print('OK')
"
```

Expected output (when env vars not set):
```
LLM_SELECTOR_MODEL: ''
LLM_SELECTOR_API_KEY: ''
LLM_SELECTOR_BASE_URL: ''
OK
```

- [ ] **Step 4: Commit**

```bash
git add backend/tools/inventory/config.py .env.example
git commit -m "feat: add LLM_SELECTOR_MODEL/API_KEY/BASE_URL config keys for fast path"
```

---

## Task 2: Add fast path to `llm_selector.py`

**Files:**
- Modify: `backend/tools/inventory/services/llm_selector.py`

### Step 2a — Add module-level singleton

- [ ] **Step 1: Add `_selector_client` singleton variable and getter**

Open `backend/tools/inventory/services/llm_selector.py`. Find the existing cache variable at the top (around line 21):

```python
_business_knowledge_cache: dict[str, Any] = {}
```

Add the singleton immediately after:

```python
_business_knowledge_cache: dict[str, Any] = {}

# Module-level singleton for the fast-path OpenAI client (avoids TCP reconnect per call).
_selector_client: Any = None


def _get_selector_client(api_key: str, base_url: str | None) -> "Any":
    """Return (and lazily create) the module-level fast-path OpenAI client."""
    global _selector_client
    if _selector_client is None:
        from openai import OpenAI
        _selector_client = OpenAI(api_key=api_key, base_url=base_url or None)
    return _selector_client


def _reset_selector_client() -> None:
    """Reset the singleton — used in tests to force re-creation with new credentials."""
    global _selector_client
    _selector_client = None
```

### Step 2b — Add `_fast_path()` function

- [ ] **Step 2: Add `_fast_path()` just before `llm_select_best`**

Find the line `def llm_select_best(` (around line 256). Insert the following function immediately above it:

```python
def _fast_path(
    keywords: str,
    candidates: list[dict[str, Any]],
    config: Any,
    selector_model: str,
    knowledge_override: str | None,
) -> Optional[dict[str, Any]]:
    """
    Fast selector path for non-thinking models (e.g. gpt-4o-mini).
    Uses response_format=json_object and max_tokens=120.
    Falls back to _rule_based_fallback on any error.
    """
    if not candidates:
        return None

    candidate_limit = int(
        getattr(config, "LLM_SELECTOR_CANDIDATE_LIMIT", _SELECTOR_DEFAULT_CANDIDATE_LIMIT)
        if config is not None
        else _SELECTOR_DEFAULT_CANDIDATE_LIMIT
    )
    candidate_limit = max(1, min(candidate_limit, 20))

    knowledge_limit = int(
        getattr(config, "LLM_SELECTOR_KNOWLEDGE_CHAR_LIMIT", _SELECTOR_DEFAULT_KNOWLEDGE_CHAR_LIMIT)
        if config is not None
        else _SELECTOR_DEFAULT_KNOWLEDGE_CHAR_LIMIT
    )
    _full_knowledge: bool = (
        os.environ.get("INVENTORY_LLM_SELECTOR_FULL_KNOWLEDGE", "1").strip().lower()
        in ("1", "true", "yes")
    )

    sorted_candidates = _sort_candidates_by_source(candidates)
    llm_candidates = sorted_candidates[:candidate_limit]

    knowledge = (
        knowledge_override.strip()
        if knowledge_override and knowledge_override.strip()
        else _load_business_knowledge()
    )
    knowledge_hint = (
        knowledge
        if _full_knowledge
        else _build_knowledge_hint(keywords, knowledge, knowledge_limit)
    )

    prompt = _build_selector_prompt(keywords, llm_candidates, knowledge_hint)

    api_key = getattr(config, "LLM_SELECTOR_API_KEY", "") if config is not None else ""
    base_url_raw = getattr(config, "LLM_SELECTOR_BASE_URL", "") if config is not None else ""
    base_url = base_url_raw.strip() or None
    timeout = int(getattr(config, "LLM_SELECTOR_TIMEOUT", 15)) if config is not None else 15

    try:
        client = _get_selector_client(api_key, base_url)

        logger.info(
            "llm_select_best (fast): model=%s n_candidates=%d prompt_chars=%d",
            selector_model,
            len(candidates),
            len(prompt),
        )

        resp = client.chat.completions.create(
            model=selector_model,
            messages=[
                {"role": "system", "content": _SYSTEM_SELECTOR},
                {"role": "user", "content": prompt},
            ],
            temperature=0,
            max_tokens=120,
            timeout=timeout,
            response_format={"type": "json_object"},
        )

        raw = resp.choices[0].message.content if resp and resp.choices else ""
        content = (raw or "").strip()
        if not content:
            raise ValueError("fast path: empty content from model")

        obj = json.loads(content)  # json_object mode guarantees valid JSON
        idx = int(obj.get("index", 0) or 0)
        reason = str(obj.get("reason") or obj.get("reasoning") or "")[:_SELECTOR_REASON_MAX_LEN]

        if idx <= 0:
            return None
        if idx > len(llm_candidates):
            return _rule_based_fallback(keywords, candidates, reason="llm_index_out_of_range")

        return _candidate_to_result(llm_candidates[idx - 1], reason)

    except Exception as e:
        logger.warning("fast path selector failed, fallback to rules: %s", e)
        return _rule_based_fallback(keywords, candidates, reason="llm_error")
```

### Step 2c — Add `knowledge_override` param + branching to `llm_select_best`

- [ ] **Step 3: Update the signature of `llm_select_best`**

Find:
```python
def llm_select_best(
    keywords: str,
    candidates: list[dict[str, Any]],
    max_tokens: int | None = None,
) -> Optional[dict[str, Any]]:
    """Select the best candidate by LLM; return None when LLM decides index=0."""
```

Replace with:
```python
def llm_select_best(
    keywords: str,
    candidates: list[dict[str, Any]],
    max_tokens: int | None = None,
    knowledge_override: str | None = None,
) -> Optional[dict[str, Any]]:
    """Select the best candidate by LLM; return None when LLM decides index=0.

    When LLM_SELECTOR_MODEL is set in config, routes to the fast path
    (_fast_path) which uses a non-thinking model with response_format=json_object
    and max_tokens=120. Otherwise uses the original glm-4.5-air path unchanged.

    Args:
        keywords: Product search keywords.
        candidates: List of candidate dicts with keys: code, matched_name, unit_price, source.
        max_tokens: Override max_tokens for the old path only. Ignored by fast path.
        knowledge_override: Override the business knowledge text (used by debug tooling).
    """
```

- [ ] **Step 4: Add the branch at the start of `llm_select_best`, right after the `if not candidates` guard**

Find this block inside `llm_select_best`:
```python
    if not candidates:
        return None

    try:
        from backend.tools.inventory.config import config
    except Exception:
        config = None
```

Replace with:
```python
    if not candidates:
        return None

    try:
        from backend.tools.inventory.config import config
    except Exception:
        config = None

    # Route to fast path when LLM_SELECTOR_MODEL is configured.
    selector_model = (getattr(config, "LLM_SELECTOR_MODEL", "") or "").strip()
    if selector_model:
        return _fast_path(keywords, candidates, config, selector_model, knowledge_override)
```

- [ ] **Step 5: Verify old path still works (smoke test)**

```bash
cd "Agent Team version3"
python -c "
from unittest.mock import MagicMock, patch
import json

CANDIDATES = [
    {'code': 'A001', 'matched_name': 'PPR dn20 等径三通', 'unit_price': 5.0, 'source': '字段匹配'},
    {'code': 'A002', 'matched_name': 'PPR dn20 异径三通', 'unit_price': 4.0, 'source': '字段匹配'},
]
good_resp_json = json.dumps({'index': 1, 'reason': '等径更匹配'}, ensure_ascii=False)

msg = MagicMock(); msg.content = good_resp_json; msg.reasoning_content = None
choice = MagicMock(); choice.message = msg; choice.finish_reason = 'stop'
resp = MagicMock(); resp.choices = [choice]

with patch('openai.OpenAI') as mock_cls:
    mock_client = MagicMock()
    mock_client.chat.completions.create.return_value = resp
    mock_cls.return_value = mock_client
    from backend.tools.inventory.services.llm_selector import llm_select_best
    result = llm_select_best('等径三通 dn20', CANDIDATES)
    print('result:', result)
    assert result is not None and result['code'] == 'A001', f'Unexpected: {result}'
    print('OK: old path still works')
"
```

Expected: `OK: old path still works`

- [ ] **Step 6: Commit**

```bash
git add backend/tools/inventory/services/llm_selector.py
git commit -m "feat: add fast path to llm_select_best (gpt-4o-mini, json_object, singleton client)"
```

---

## Task 3: Tests for fast path

**Files:**
- Create: `tests/test_llm_selector_fast_path.py`

- [ ] **Step 1: Write the test file**

Create `tests/test_llm_selector_fast_path.py` with this content:

```python
"""
Tests for llm_select_best fast path (LLM_SELECTOR_MODEL set).

Fast path contract:
- Triggered when config.LLM_SELECTOR_MODEL is non-empty
- Uses response_format=json_object
- Uses max_tokens=120
- Uses module-level singleton client (not a new instance each call)
- Falls back to rules on any error
- knowledge_override is forwarded to prompt builder

Patching strategy:
  llm_select_best() does `from backend.tools.inventory.config import config` inside
  the function body, so we patch the class attribute directly via patch.object on
  InventoryConfig. This is simpler and more stable than importlib.reload.
"""
import json
import unittest
from unittest.mock import MagicMock, patch

from backend.tools.inventory.config import InventoryConfig
from backend.tools.inventory.services.llm_selector import (
    llm_select_best,
    _reset_selector_client,
    _fast_path,
)

CANDIDATES = [
    {"code": "F001", "matched_name": "PPR dn50 直通", "unit_price": 12.0, "source": "历史报价"},
    {"code": "F002", "matched_name": "PPR dn50 弯头", "unit_price": 8.0, "source": "字段匹配"},
]


def _make_resp(content: str, finish_reason: str = "stop") -> MagicMock:
    msg = MagicMock()
    msg.content = content
    msg.reasoning_content = None
    choice = MagicMock()
    choice.message = msg
    choice.finish_reason = finish_reason
    resp = MagicMock()
    resp.choices = [choice]
    return resp


class TestFastPathTriggered(unittest.TestCase):
    def setUp(self):
        _reset_selector_client()

    @patch("openai.OpenAI")
    def test_fast_path_triggered_when_selector_model_set(self, mock_openai_cls):
        """When LLM_SELECTOR_MODEL is set, fast path runs and uses json_object format."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.return_value = _make_resp(
            json.dumps({"index": 1, "reason": "直通更匹配"}, ensure_ascii=False)
        )
        mock_openai_cls.return_value = mock_client

        with patch.object(InventoryConfig, "LLM_SELECTOR_MODEL", "gpt-4o-mini"), \
             patch.object(InventoryConfig, "LLM_SELECTOR_API_KEY", "sk-test"), \
             patch.object(InventoryConfig, "LLM_SELECTOR_BASE_URL", "https://api.openai.com/v1"):
            result = llm_select_best("直通 dn50", CANDIDATES)

        self.assertIsNotNone(result)
        self.assertEqual(result["code"], "F001")

        call_kwargs = mock_client.chat.completions.create.call_args[1]
        self.assertEqual(
            call_kwargs.get("response_format"),
            {"type": "json_object"},
            "Fast path must use response_format=json_object",
        )

    @patch("openai.OpenAI")
    def test_fast_path_max_tokens_is_120(self, mock_openai_cls):
        """Fast path must use max_tokens=120."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.return_value = _make_resp(
            json.dumps({"index": 1, "reason": "匹配"}, ensure_ascii=False)
        )
        mock_openai_cls.return_value = mock_client

        with patch.object(InventoryConfig, "LLM_SELECTOR_MODEL", "gpt-4o-mini"), \
             patch.object(InventoryConfig, "LLM_SELECTOR_API_KEY", "sk-test"), \
             patch.object(InventoryConfig, "LLM_SELECTOR_BASE_URL", ""):
            llm_select_best("直通 dn50", CANDIDATES)

        call_kwargs = mock_client.chat.completions.create.call_args[1]
        self.assertEqual(call_kwargs.get("max_tokens"), 120, "Fast path must use max_tokens=120")

    @patch("openai.OpenAI")
    def test_fast_path_uses_singleton_client(self, mock_openai_cls):
        """OpenAI() constructor should be called only once across multiple fast path calls."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.return_value = _make_resp(
            json.dumps({"index": 1, "reason": "匹配"}, ensure_ascii=False)
        )
        mock_openai_cls.return_value = mock_client

        with patch.object(InventoryConfig, "LLM_SELECTOR_MODEL", "gpt-4o-mini"), \
             patch.object(InventoryConfig, "LLM_SELECTOR_API_KEY", "sk-test"), \
             patch.object(InventoryConfig, "LLM_SELECTOR_BASE_URL", ""):
            llm_select_best("直通 dn50", CANDIDATES)
            llm_select_best("弯头 dn50", CANDIDATES)

        self.assertEqual(
            mock_openai_cls.call_count,
            1,
            f"OpenAI() called {mock_openai_cls.call_count} times; singleton should make it 1",
        )

    @patch("openai.OpenAI")
    def test_fast_path_falls_back_to_rules_on_error(self, mock_openai_cls):
        """When fast path raises, result comes from _rule_based_fallback."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.side_effect = RuntimeError("network error")
        mock_openai_cls.return_value = mock_client

        with patch.object(InventoryConfig, "LLM_SELECTOR_MODEL", "gpt-4o-mini"), \
             patch.object(InventoryConfig, "LLM_SELECTOR_API_KEY", "sk-test"), \
             patch.object(InventoryConfig, "LLM_SELECTOR_BASE_URL", ""):
            result = llm_select_best("直通 dn50", CANDIDATES)

        self.assertIsNotNone(result)
        meta = result.get("_selection_meta", {})
        self.assertTrue(meta.get("from_rule_fallback"), "Expected rule fallback marker")

    @patch("openai.OpenAI")
    def test_fast_path_index_zero_returns_none(self, mock_openai_cls):
        """When model returns index=0 (no match), result must be None."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.return_value = _make_resp(
            json.dumps({"index": 0, "reason": "无匹配"}, ensure_ascii=False)
        )
        mock_openai_cls.return_value = mock_client

        with patch.object(InventoryConfig, "LLM_SELECTOR_MODEL", "gpt-4o-mini"), \
             patch.object(InventoryConfig, "LLM_SELECTOR_API_KEY", "sk-test"), \
             patch.object(InventoryConfig, "LLM_SELECTOR_BASE_URL", ""):
            result = llm_select_best("不存在的产品", CANDIDATES)

        self.assertIsNone(result, "index=0 must return None")

    @patch("openai.OpenAI")
    def test_old_path_used_when_selector_model_empty(self, mock_openai_cls):
        """When LLM_SELECTOR_MODEL is empty, old path runs (no response_format kwarg)."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.return_value = _make_resp(
            json.dumps({"index": 1, "reason": "匹配"}, ensure_ascii=False)
        )
        mock_openai_cls.return_value = mock_client

        with patch.object(InventoryConfig, "LLM_SELECTOR_MODEL", ""):
            llm_select_best("直通 dn50", CANDIDATES)

        call_kwargs = mock_client.chat.completions.create.call_args[1]
        self.assertNotIn(
            "response_format",
            call_kwargs,
            "Old path must NOT pass response_format",
        )


if __name__ == "__main__":
    unittest.main(verbosity=2)
```

- [ ] **Step 2: Run the new tests (expect some to fail before implementation is complete)**

```bash
cd "Agent Team version3"
python -m pytest tests/test_llm_selector_fast_path.py -v 2>&1 | head -60
```

- [ ] **Step 3: Make sure existing tests still pass**

```bash
cd "Agent Team version3"
python -m pytest tests/test_llm_selector_protocol.py -v
```

Expected: all 6 existing tests pass.

- [ ] **Step 4: Run full selector test suite**

```bash
cd "Agent Team version3"
python -m pytest tests/test_llm_selector_protocol.py tests/test_llm_selector_fast_path.py tests/test_auto_llm_selector.py -v
```

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add tests/test_llm_selector_fast_path.py
git commit -m "test: add fast path tests for llm_select_best"
```

---

## Task 4: Manual smoke test with real keys (optional, do last)

**Only run this task if you have a real OpenAI API key and want to verify end-to-end.**

- [ ] **Step 1: Set env vars temporarily**

```bash
export LLM_SELECTOR_MODEL=gpt-4o-mini
export LLM_SELECTOR_API_KEY=sk-your-real-key
export LLM_SELECTOR_BASE_URL=https://api.openai.com/v1
export LLM_SELECTOR_TIMEOUT=15
```

- [ ] **Step 2: Run smoke test**

```bash
cd "Agent Team version3"
python -c "
from backend.tools.inventory.services.llm_selector import llm_select_best
candidates = [
    {'code': 'A001', 'matched_name': 'PPR dn50 直通', 'unit_price': 12.0, 'source': '历史报价'},
    {'code': 'A002', 'matched_name': 'PVC dn50 直通', 'unit_price': 8.0, 'source': '字段匹配'},
    {'code': 'A003', 'matched_name': 'PE dn50 直通', 'unit_price': 15.0, 'source': '字段匹配'},
]
import time
t = time.time()
result = llm_select_best('PPR直通 dn50', candidates)
print(f'elapsed: {time.time()-t:.2f}s')
print('result:', result)
"
```

Expected: response in < 1s, result points to `A001`.

- [ ] **Step 3: Verify rollback works**

```bash
unset LLM_SELECTOR_MODEL
python -c "
from backend.tools.inventory.config import config
print('LLM_SELECTOR_MODEL:', repr(config.LLM_SELECTOR_MODEL))
assert config.LLM_SELECTOR_MODEL == '', 'Should be empty after unset'
print('Rollback OK: old path will be used')
"
```

---

## Rollback Reference

To switch back to glm-4.5-air at any time — **no code change needed**:

```bash
# .env — comment out or remove these lines:
# LLM_SELECTOR_MODEL=gpt-4o-mini
# LLM_SELECTOR_API_KEY=sk-...
# LLM_SELECTOR_BASE_URL=https://api.openai.com/v1
```

Restart the backend. Done.
