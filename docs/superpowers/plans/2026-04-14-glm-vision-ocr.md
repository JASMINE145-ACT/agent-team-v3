# GLM Vision OCR Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `glm-ocr` OCR step with `glm-4.6v` vision model for screenshots, fixing fraction-slash errors (3/4寸 → 34寸), with silent fallback to old glm-ocr.

**Architecture:** Config-driven switch — `GLM_VISION_MODEL` set → vision path via `chat.completions` with domain prompt; empty → existing `call_zhipu_ocr` unchanged. `run_ocr_for_attachments()` reads config internally, so all callers stay untouched.

**Tech Stack:** Python, `openai` SDK (already a project dependency), existing `backend/core/glm_ocr.py` patterns.

---

## File Map

| File | Change |
|------|--------|
| `backend/config.py` | Add 3 class attributes: `GLM_VISION_MODEL`, `GLM_VISION_API_KEY`, `GLM_VISION_BASE_URL` |
| `backend/core/glm_ocr.py` | Add `_VISION_OCR_SYSTEM` constant + `call_zhipu_vision_ocr()` function + modify `run_ocr_for_attachments()` loop |
| `.env.example` | Document new env vars |
| `tests/test_vision_ocr.py` | New test file for vision path |

**Not changed:** `routes_chat.py`, `wecom_bot/client.py`, `gateway/handlers/chat.py`, `call_zhipu_ocr()`.

---

## Task 1: Add config keys

**Files:**
- Modify: `backend/config.py:112`

- [ ] **Step 1: Add 3 attributes after `GLM_OCR_MODEL`**

Open `backend/config.py`. Find (around line 112):
```python
    GLM_OCR_MODEL = (os.getenv("GLM_OCR_MODEL") or "").strip() or "glm-ocr"
```

Add immediately after:
```python
    GLM_OCR_MODEL = (os.getenv("GLM_OCR_MODEL") or "").strip() or "glm-ocr"
    # Vision OCR: glm-4.6v via chat.completions (leave empty to keep old glm-ocr path)
    GLM_VISION_MODEL = (os.getenv("GLM_VISION_MODEL") or "").strip()
    GLM_VISION_API_KEY = (os.getenv("GLM_VISION_API_KEY") or "").strip()   # empty → reuse GLM_OCR_API_KEY
    GLM_VISION_BASE_URL = (os.getenv("GLM_VISION_BASE_URL") or "").strip() # empty → reuse GLM_OCR_BASE_URL
```

- [ ] **Step 2: Update `.env.example`**

Find the section near `GLM_OCR_MODEL` in `.env.example` (search for `GLM_OCR_MODEL`). Add after it:

```
# Vision OCR (glm-4.6v) — 留空则继续用 glm-ocr 旧路径
# GLM_VISION_MODEL=glm-4.6v
# GLM_VISION_API_KEY=        (留空复用 ZHIPU_API_KEY)
# GLM_VISION_BASE_URL=       (留空复用 GLM_OCR_BASE_URL)
```

- [ ] **Step 3: Verify config loads**

```bash
cd "Agent Team version3"
python -c "
from backend.config import Config
print('GLM_VISION_MODEL:', repr(Config.GLM_VISION_MODEL))
print('GLM_VISION_API_KEY:', repr(Config.GLM_VISION_API_KEY))
print('GLM_VISION_BASE_URL:', repr(Config.GLM_VISION_BASE_URL))
print('OK')
"
```

Expected (when env vars not set):
```
GLM_VISION_MODEL: ''
GLM_VISION_API_KEY: ''
GLM_VISION_BASE_URL: ''
OK
```

- [ ] **Step 4: Commit**

```bash
git add backend/config.py .env.example
git commit -m "feat: add GLM_VISION_MODEL/API_KEY/BASE_URL config keys for vision OCR"
```

---

## Task 2: Add `call_zhipu_vision_ocr()` + modify `run_ocr_for_attachments()`

**Files:**
- Modify: `backend/core/glm_ocr.py`

### Step 2a — Add system prompt constant and new function

- [ ] **Step 1: Add `_VISION_OCR_SYSTEM` constant**

Open `backend/core/glm_ocr.py`. Find the existing constants near the top (around line 25–48 where `ZHIPU_OCR_MAX_BYTES`, `MAX_OCR_TEXT_CHARS`, `GLM_OCR_TIMEOUT_SECONDS` are defined). Add this constant after `GLM_OCR_TIMEOUT_SECONDS`:

```python
_VISION_OCR_SYSTEM = (
    "你是专业文字提取助手。从图片中提取所有文字，严格遵守：\n"
    "1. 分数寸必须写成分数形式：3/4、1/2、1/4、3/8（禁止写成 34、12、14、38）\n"
    "2. 管径保留原始写法：DN50、dn50、Φ50\n"
    "3. 按原始布局输出，表格内容用 | 分隔列\n"
    "4. 只输出图片中的文字，不添加任何解释或总结"
)
```

- [ ] **Step 2: Add `call_zhipu_vision_ocr()` function**

Find the line `def call_zhipu_ocr(` (around line 51). Insert the following function **immediately before** it:

```python
def call_zhipu_vision_ocr(
    image_bytes: bytes,
    mime: str,
    api_key: str,
    base_url: str,
    model: str,
    timeout: Optional[int] = None,
) -> Optional[str]:
    """
    Call glm-4.6v (or any vision model) via chat.completions to extract text from a screenshot.

    Uses a domain-aware system prompt that explicitly instructs the model to preserve
    fraction notation (3/4, 1/2) instead of dropping the slash.

    Returns extracted text string, or None on any failure (caller should fallback to call_zhipu_ocr).
    """
    if not image_bytes or not api_key or not model:
        return None
    if timeout is None:
        timeout = GLM_OCR_TIMEOUT_SECONDS

    mime_type = (mime or "image/png").strip() or "image/png"
    b64 = base64.b64encode(image_bytes).decode()
    data_uri = f"data:{mime_type};base64,{b64}"

    try:
        from openai import OpenAI

        client = OpenAI(api_key=api_key, base_url=base_url.rstrip("/") + "/" if base_url else None)
        logger.info(
            "GLM Vision OCR: model=%s size=%d bytes mime=%s",
            model,
            len(image_bytes),
            mime_type,
        )
        resp = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": _VISION_OCR_SYSTEM},
                {
                    "role": "user",
                    "content": [
                        {"type": "image_url", "image_url": {"url": data_uri}},
                        {"type": "text", "text": "请提取图片中所有文字。"},
                    ],
                },
            ],
            temperature=0,
            max_tokens=1500,
            timeout=timeout,
        )
        text = (
            resp.choices[0].message.content if resp and resp.choices else ""
        ).strip()
        if not text:
            logger.warning("GLM Vision OCR: empty response from model")
            return None
        return text
    except Exception as e:
        logger.warning("GLM Vision OCR failed, will fallback to glm-ocr: %s", e)
        return None
```

### Step 2b — Modify `run_ocr_for_attachments()` loop

- [ ] **Step 3: Replace the inner loop in `run_ocr_for_attachments()`**

Find this block inside `run_ocr_for_attachments` (around line 304–308):

```python
    texts: List[str] = []
    for raw, mime in payloads:
        t = call_zhipu_ocr(raw, mime, api_key, base_url, model=model)
        if t:
            texts.append(t)
```

Replace with:

```python
    # Read vision config (inside function to avoid circular import at module level).
    try:
        from backend.config import Config as _Cfg
        _vision_model = (getattr(_Cfg, "GLM_VISION_MODEL", "") or "").strip()
        _vision_api_key = (getattr(_Cfg, "GLM_VISION_API_KEY", "") or "").strip() or api_key
        _vision_base_raw = (getattr(_Cfg, "GLM_VISION_BASE_URL", "") or "").strip()
        _vision_base_url = _vision_base_raw or base_url
    except Exception:
        _vision_model = ""
        _vision_api_key = api_key
        _vision_base_url = base_url

    texts: List[str] = []
    for raw, mime in payloads:
        t: Optional[str] = None
        if _vision_model:
            t = call_zhipu_vision_ocr(raw, mime, _vision_api_key, _vision_base_url, _vision_model)
            # t is None → silent fallback to old OCR below
        if t is None:
            t = call_zhipu_ocr(raw, mime, api_key, base_url, model=model)
        if t:
            texts.append(t)
```

- [ ] **Step 4: Smoke-test old path still works**

```bash
cd "Agent Team version3"
python -c "
from unittest.mock import patch, MagicMock
import base64

tiny_b64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
attachments = [{'type': 'image', 'content': tiny_b64, 'mimeType': 'image/png'}]

with patch('backend.core.glm_ocr.call_zhipu_ocr', return_value='PPR dn20 3/4寸'):
    from backend.core.glm_ocr import run_ocr_for_attachments
    text, err = run_ocr_for_attachments(attachments, 5*1024*1024, 'sk-test', 'https://open.bigmodel.cn/api/paas/v4/')
    print('text:', text)
    print('err:', err)
    assert err is None and '3/4寸' in text
    print('OK: old path works')
"
```

Expected: `OK: old path works`

- [ ] **Step 5: Commit**

```bash
git add backend/core/glm_ocr.py
git commit -m "feat: add call_zhipu_vision_ocr() + vision path in run_ocr_for_attachments"
```

---

## Task 3: Tests for vision OCR path

**Files:**
- Create: `tests/test_vision_ocr.py`

- [ ] **Step 1: Write the test file**

Create `tests/test_vision_ocr.py`:

```python
"""
Tests for GLM Vision OCR path (GLM_VISION_MODEL set).

Vision path contract:
- call_zhipu_vision_ocr() uses openai chat.completions with image in content array
- Uses _VISION_OCR_SYSTEM as system prompt (contains fraction-slash rules)
- Returns None on any exception (enables silent fallback)
- run_ocr_for_attachments() uses vision when GLM_VISION_MODEL is set
- run_ocr_for_attachments() falls back to call_zhipu_ocr when vision returns None
- run_ocr_for_attachments() uses old path when GLM_VISION_MODEL is empty

Patching strategy:
  Config is a class with class-level attributes.
  Use monkeypatch.setattr(Config, "ATTR", value) — same pattern as test_vision_config.py.
"""
import base64
from unittest.mock import MagicMock, patch

import pytest

from backend.config import Config
from backend.core.glm_ocr import (
    call_zhipu_vision_ocr,
    run_ocr_for_attachments,
    _VISION_OCR_SYSTEM,
)

# Minimal valid 1×1 PNG (68 bytes) — used across all tests
_TINY_PNG_B64 = (
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
)
_TINY_PNG = base64.b64decode(_TINY_PNG_B64)
_ATTACHMENTS = [{"type": "image", "content": _TINY_PNG_B64, "mimeType": "image/png"}]


def _make_openai_resp(content: str) -> MagicMock:
    msg = MagicMock()
    msg.content = content
    choice = MagicMock()
    choice.message = msg
    resp = MagicMock()
    resp.choices = [choice]
    return resp


# ---------------------------------------------------------------------------
# call_zhipu_vision_ocr unit tests
# ---------------------------------------------------------------------------

class TestCallZhipuVisionOcr:
    @patch("openai.OpenAI")
    def test_returns_text_on_success(self, mock_openai_cls):
        """Returns extracted text when model responds normally."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.return_value = _make_openai_resp("PPR dn20 3/4寸 直通")
        mock_openai_cls.return_value = mock_client

        result = call_zhipu_vision_ocr(
            _TINY_PNG, "image/png", "sk-test", "https://open.bigmodel.cn/api/paas/v4/", "glm-4.6v"
        )

        assert result == "PPR dn20 3/4寸 直通"

    @patch("openai.OpenAI")
    def test_passes_system_prompt_with_fraction_rules(self, mock_openai_cls):
        """The system message must contain the fraction-slash rule."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.return_value = _make_openai_resp("3/4寸")
        mock_openai_cls.return_value = mock_client

        call_zhipu_vision_ocr(
            _TINY_PNG, "image/png", "sk-test", "https://open.bigmodel.cn/api/paas/v4/", "glm-4.6v"
        )

        call_kwargs = mock_client.chat.completions.create.call_args[1]
        messages = call_kwargs["messages"]
        system_msg = next((m for m in messages if m["role"] == "system"), None)
        assert system_msg is not None, "No system message found"
        assert "3/4" in system_msg["content"], "System prompt must mention 3/4 fraction rule"
        assert "1/2" in system_msg["content"], "System prompt must mention 1/2 fraction rule"

    @patch("openai.OpenAI")
    def test_passes_image_as_data_uri_in_content_array(self, mock_openai_cls):
        """User message content must include image_url type with data URI."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.return_value = _make_openai_resp("text")
        mock_openai_cls.return_value = mock_client

        call_zhipu_vision_ocr(
            _TINY_PNG, "image/png", "sk-test", "https://open.bigmodel.cn/api/paas/v4/", "glm-4.6v"
        )

        call_kwargs = mock_client.chat.completions.create.call_args[1]
        messages = call_kwargs["messages"]
        user_msg = next((m for m in messages if m["role"] == "user"), None)
        assert user_msg is not None
        content = user_msg["content"]
        assert isinstance(content, list), "User content must be a list (multimodal)"
        image_parts = [p for p in content if isinstance(p, dict) and p.get("type") == "image_url"]
        assert len(image_parts) == 1, "Must have exactly one image_url part"
        url = image_parts[0]["image_url"]["url"]
        assert url.startswith("data:image/png;base64,"), f"Data URI wrong format: {url[:40]}"

    @patch("openai.OpenAI")
    def test_uses_temperature_zero_and_max_tokens_1500(self, mock_openai_cls):
        """Must use temperature=0 and max_tokens=1500."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.return_value = _make_openai_resp("text")
        mock_openai_cls.return_value = mock_client

        call_zhipu_vision_ocr(
            _TINY_PNG, "image/png", "sk-test", "https://open.bigmodel.cn/api/paas/v4/", "glm-4.6v"
        )

        call_kwargs = mock_client.chat.completions.create.call_args[1]
        assert call_kwargs.get("temperature") == 0
        assert call_kwargs.get("max_tokens") == 1500

    @patch("openai.OpenAI")
    def test_returns_none_on_exception(self, mock_openai_cls):
        """Any exception returns None so caller can fallback."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.side_effect = RuntimeError("network down")
        mock_openai_cls.return_value = mock_client

        result = call_zhipu_vision_ocr(
            _TINY_PNG, "image/png", "sk-test", "https://open.bigmodel.cn/api/paas/v4/", "glm-4.6v"
        )

        assert result is None

    @patch("openai.OpenAI")
    def test_returns_none_on_empty_response(self, mock_openai_cls):
        """Empty model response returns None."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.return_value = _make_openai_resp("")
        mock_openai_cls.return_value = mock_client

        result = call_zhipu_vision_ocr(
            _TINY_PNG, "image/png", "sk-test", "https://open.bigmodel.cn/api/paas/v4/", "glm-4.6v"
        )

        assert result is None

    def test_returns_none_when_api_key_empty(self):
        """No API key → return None without calling OpenAI."""
        result = call_zhipu_vision_ocr(_TINY_PNG, "image/png", "", "https://base/", "glm-4.6v")
        assert result is None


# ---------------------------------------------------------------------------
# run_ocr_for_attachments integration tests (vision path)
# ---------------------------------------------------------------------------

class TestRunOcrForAttachmentsVisionPath:
    def test_uses_vision_when_model_configured(self, monkeypatch):
        """When GLM_VISION_MODEL is set, vision function is called first."""
        monkeypatch.setattr(Config, "GLM_VISION_MODEL", "glm-4.6v")
        monkeypatch.setattr(Config, "GLM_VISION_API_KEY", "sk-vision")
        monkeypatch.setattr(Config, "GLM_VISION_BASE_URL", "https://open.bigmodel.cn/api/paas/v4/")

        with patch("backend.core.glm_ocr.call_zhipu_vision_ocr", return_value="3/4寸 PPR") as mock_vision, \
             patch("backend.core.glm_ocr.call_zhipu_ocr", return_value="34寸 PPR") as mock_old:
            text, err = run_ocr_for_attachments(
                _ATTACHMENTS, 5 * 1024 * 1024, "sk-old", "https://old-base/"
            )

        assert err is None
        assert "3/4寸" in text, "Vision result must be used"
        mock_vision.assert_called_once()
        mock_old.assert_not_called()

    def test_fallback_to_old_ocr_when_vision_returns_none(self, monkeypatch):
        """When vision returns None, old call_zhipu_ocr is called silently."""
        monkeypatch.setattr(Config, "GLM_VISION_MODEL", "glm-4.6v")
        monkeypatch.setattr(Config, "GLM_VISION_API_KEY", "sk-vision")
        monkeypatch.setattr(Config, "GLM_VISION_BASE_URL", "https://open.bigmodel.cn/api/paas/v4/")

        with patch("backend.core.glm_ocr.call_zhipu_vision_ocr", return_value=None) as mock_vision, \
             patch("backend.core.glm_ocr.call_zhipu_ocr", return_value="fallback text") as mock_old:
            text, err = run_ocr_for_attachments(
                _ATTACHMENTS, 5 * 1024 * 1024, "sk-old", "https://old-base/"
            )

        assert err is None
        assert text == "fallback text"
        mock_vision.assert_called_once()
        mock_old.assert_called_once()

    def test_uses_old_path_when_vision_model_empty(self, monkeypatch):
        """When GLM_VISION_MODEL is empty, call_zhipu_vision_ocr is never called."""
        monkeypatch.setattr(Config, "GLM_VISION_MODEL", "")

        with patch("backend.core.glm_ocr.call_zhipu_vision_ocr") as mock_vision, \
             patch("backend.core.glm_ocr.call_zhipu_ocr", return_value="old result") as mock_old:
            text, err = run_ocr_for_attachments(
                _ATTACHMENTS, 5 * 1024 * 1024, "sk-old", "https://old-base/"
            )

        assert err is None
        assert text == "old result"
        mock_vision.assert_not_called()
        mock_old.assert_called_once()

    def test_vision_api_key_falls_back_to_ocr_api_key(self, monkeypatch):
        """When GLM_VISION_API_KEY is empty, the ocr api_key param is used for vision."""
        monkeypatch.setattr(Config, "GLM_VISION_MODEL", "glm-4.6v")
        monkeypatch.setattr(Config, "GLM_VISION_API_KEY", "")   # empty → fallback
        monkeypatch.setattr(Config, "GLM_VISION_BASE_URL", "")  # empty → fallback

        with patch("backend.core.glm_ocr.call_zhipu_vision_ocr", return_value="text") as mock_vision:
            run_ocr_for_attachments(_ATTACHMENTS, 5 * 1024 * 1024, "sk-fallback", "https://fb-base/")

        call_args = mock_vision.call_args
        # api_key is positional arg index 2
        assert call_args[0][2] == "sk-fallback", "Should use ocr api_key as fallback"
        # base_url is positional arg index 3
        assert call_args[0][3] == "https://fb-base/", "Should use ocr base_url as fallback"
```

- [ ] **Step 2: Run tests — expect FAIL (TDD red)**

```bash
cd "Agent Team version3"
python -m pytest tests/test_vision_ocr.py -v 2>&1 | head -40
```

Expected: ImportError or AttributeError on `_VISION_OCR_SYSTEM` / `call_zhipu_vision_ocr` (not yet implemented).

- [ ] **Step 3: Run tests — expect PASS after implementation**

```bash
cd "Agent Team version3"
python -m pytest tests/test_vision_ocr.py -v
```

Expected: all 11 tests pass.

- [ ] **Step 4: Run existing OCR tests to ensure no regression**

```bash
cd "Agent Team version3"
python -m pytest tests/test_vision_config.py -v
```

Expected: all 5 existing tests pass.

- [ ] **Step 5: Commit tests**

```bash
git add tests/test_vision_ocr.py
git commit -m "test: add vision OCR tests for call_zhipu_vision_ocr and run_ocr_for_attachments"
```

---

## Task 4: Manual end-to-end verification (requires real API key)

**Only run if you have a real GLM API key.**

- [ ] **Step 1: Set env var temporarily**

```bash
export GLM_VISION_MODEL=glm-4.6v
# GLM_VISION_API_KEY not needed if ZHIPU_API_KEY already set
```

- [ ] **Step 2: Run smoke test with a screenshot containing "3/4寸"**

```bash
cd "Agent Team version3"
python -c "
import base64, pathlib
from backend.core.glm_ocr import call_zhipu_vision_ocr
from backend.config import Config

# Use any PNG screenshot on disk — replace path below
img = pathlib.Path('tests/fixtures/sample_spec.png')
if not img.exists():
    print('SKIP: no test image at tests/fixtures/sample_spec.png')
    exit(0)

raw = img.read_bytes()
api_key = Config.GLM_VISION_API_KEY or Config.GLM_OCR_API_KEY
base_url = Config.GLM_VISION_BASE_URL or Config.GLM_OCR_BASE_URL

result = call_zhipu_vision_ocr(raw, 'image/png', api_key, base_url, 'glm-4.6v')
print('result:', result)
assert '/' in (result or ''), 'Expected fraction slash in result'
print('OK: fraction slash preserved')
"
```

- [ ] **Step 3: Verify rollback**

```bash
unset GLM_VISION_MODEL
python -c "
from backend.config import Config
print('GLM_VISION_MODEL:', repr(Config.GLM_VISION_MODEL))
assert Config.GLM_VISION_MODEL == '', 'Should be empty'
print('Rollback OK: glm-ocr path will be used')
"
```

---

## Rollback

```bash
# .env — comment out:
# GLM_VISION_MODEL=glm-4.6v
```

Restart backend. `run_ocr_for_attachments` skips vision path automatically.
