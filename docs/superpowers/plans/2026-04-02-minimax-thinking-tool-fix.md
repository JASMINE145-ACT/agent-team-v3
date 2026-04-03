# MiniMax Thinking & Tool Return Fix — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix MiniMax M2.7 thinking leakage and tool-result correlation by (1) filtering `<think>` tokens in the streaming path and (2) stripping thinking blocks from conversation history before sending back to MiniMax.

**Architecture:** Two targeted changes in `backend/core/anthropic_react_llm.py`. A pure helper function `_filter_think_tokens` makes the streaming filter independently testable. History sanitisation is a two-line `re.sub` addition in the existing `convert_openai_to_anthropic_messages` assistant branch. No other files change.

**Tech Stack:** Python 3.11, `anthropic` SDK, `unittest`, `pytest`

---

## File Map

| File | Action | What changes |
|------|--------|-------------|
| `backend/core/anthropic_react_llm.py` | Modify | Add `_filter_think_tokens`; update `call_anthropic_messages_stream_sync`; update `convert_openai_to_anthropic_messages` |
| `tests/test_anthropic_react_messages.py` | Modify | Add `TestFilterThinkTokens` class + two new `TestConvertOpenAIToAnthropic` test methods |

---

## Task 1 — Test history sanitisation (Change 2, failing tests first)

**Files:**
- Modify: `tests/test_anthropic_react_messages.py`

- [ ] **Step 1: Add two failing tests to the existing test file**

Open `tests/test_anthropic_react_messages.py`. After the existing `TestAnthropicReactMessages` class, add a new class:

```python
class TestConvertStripsThinking(unittest.TestCase):
    def test_strips_think_block_from_assistant_history(self) -> None:
        """<think>...</think> must not appear in assistant content sent back to MiniMax."""
        msgs = [
            {"role": "user", "content": "查询价格"},
            {
                "role": "assistant",
                "content": "<think>\n根据路由规则，应该调用 match_quotation\n</think>\n价格是 100 元",
            },
        ]
        result = convert_openai_to_anthropic_messages(msgs)
        asst = next(m for m in result if m["role"] == "assistant")
        content = asst["content"] if isinstance(asst["content"], str) else ""
        self.assertNotIn("<think>", content)
        self.assertNotIn("根据路由规则", content)
        self.assertIn("价格是 100 元", content)

    def test_strips_redacted_thinking_from_assistant_history(self) -> None:
        """<redacted_thinking>...</redacted_thinking> must also be stripped."""
        msgs = [
            {"role": "user", "content": "test"},
            {
                "role": "assistant",
                "content": "<redacted_thinking>\nhidden\n</redacted_thinking>\nactual answer",
            },
        ]
        result = convert_openai_to_anthropic_messages(msgs)
        asst = next(m for m in result if m["role"] == "assistant")
        content = asst["content"] if isinstance(asst["content"], str) else ""
        self.assertNotIn("<redacted_thinking>", content)
        self.assertNotIn("hidden", content)
        self.assertIn("actual answer", content)
```

- [ ] **Step 2: Run the tests — verify they FAIL**

```bash
cd "Agent Team version3"
python -m pytest tests/test_anthropic_react_messages.py::TestConvertStripsThinking -v
```

Expected output: **FAILED** — `AssertionError: '<think>' unexpectedly found` (or similar)

---

## Task 2 — Implement history sanitisation (Change 2)

**Files:**
- Modify: `backend/core/anthropic_react_llm.py` lines 61-63 (assistant branch of `convert_openai_to_anthropic_messages`)

- [ ] **Step 1: Add stripping logic immediately after `content = m.get("content") or ""`**

Find this block in `convert_openai_to_anthropic_messages` (around line 61):

```python
        if role == "assistant":
            tool_calls = m.get("tool_calls") or []
            content = m.get("content") or ""
```

Change it to:

```python
        if role == "assistant":
            tool_calls = m.get("tool_calls") or []
            content = m.get("content") or ""
            # Strip thinking wrappers — prevent reasoning from polluting conversation
            # history and being re-emitted by MiniMax as "what the assistant said".
            content = re.sub(r"<think>.*?</think>", "", content, flags=re.DOTALL)
            content = re.sub(r"<redacted_thinking>.*?</redacted_thinking>", "", content, flags=re.DOTALL)
            content = content.strip()
```

(`re` is already imported at the top of the file — no new import needed.)

- [ ] **Step 2: Run the tests — verify they PASS**

```bash
python -m pytest tests/test_anthropic_react_messages.py::TestConvertStripsThinking -v
```

Expected output: **PASSED** (2 tests)

- [ ] **Step 3: Run the full existing test class to ensure no regressions**

```bash
python -m pytest tests/test_anthropic_react_messages.py -v
```

Expected: all tests **PASS**

- [ ] **Step 4: Commit**

```bash
git add backend/core/anthropic_react_llm.py tests/test_anthropic_react_messages.py
git commit -m "fix: strip thinking blocks from assistant history before sending to MiniMax"
```

---

## Task 3 — Test streaming think filter (Change 1, failing tests first)

**Files:**
- Modify: `tests/test_anthropic_react_messages.py`

- [ ] **Step 1: Add `TestFilterThinkTokens` class and import**

At the top of `tests/test_anthropic_react_messages.py`, the existing import is:

```python
from backend.core.anthropic_react_llm import (
    _blocks_to_content_and_tool_calls,
    convert_openai_to_anthropic_messages,
    openai_tools_to_anthropic,
    split_system_and_rest,
)
```

Add `_filter_think_tokens` to the import list:

```python
from backend.core.anthropic_react_llm import (
    _blocks_to_content_and_tool_calls,
    _filter_think_tokens,
    convert_openai_to_anthropic_messages,
    openai_tools_to_anthropic,
    split_system_and_rest,
)
```

Then add the new test class after `TestConvertStripsThinking`:

```python
class TestFilterThinkTokens(unittest.TestCase):
    def _collect(self, chunks):
        """Run _filter_think_tokens over chunks, return emitted text."""
        emitted = []
        _filter_think_tokens(iter(chunks), emitted.append)
        return "".join(emitted)

    def test_passthrough_without_think(self) -> None:
        result = self._collect(["Hello ", "world"])
        self.assertEqual(result, "Hello world")

    def test_removes_inline_think_block(self) -> None:
        result = self._collect(["Hello <think>reasoning</think> world"])
        self.assertEqual(result, "Hello  world")

    def test_think_split_across_chunks(self) -> None:
        # <think> tag boundary falls between chunks
        result = self._collect(["Hello <thi", "nk>reas", "oning</think> world"])
        self.assertEqual(result, "Hello  world")

    def test_text_before_and_after_think(self) -> None:
        result = self._collect(["pre <think>hidden</think> post"])
        self.assertEqual(result, "pre  post")

    def test_empty_chunks_ignored(self) -> None:
        result = self._collect(["Hello ", "", None, "world"])
        self.assertEqual(result, "Hello world")

    def test_unclosed_think_suppresses_remainder(self) -> None:
        # If MiniMax truncates and closing tag never comes, suppress all think content
        result = self._collect(["visible <think>never closed"])
        self.assertEqual(result, "visible ")

    def test_no_think_long_text(self) -> None:
        text = "abcdef" * 50
        result = self._collect([text])
        self.assertEqual(result, text)
```

- [ ] **Step 2: Run tests — verify they FAIL with ImportError**

```bash
python -m pytest tests/test_anthropic_react_messages.py::TestFilterThinkTokens -v
```

Expected: **ERROR** — `ImportError: cannot import name '_filter_think_tokens'`

---

## Task 4 — Implement `_filter_think_tokens` and wire into streaming (Change 1)

**Files:**
- Modify: `backend/core/anthropic_react_llm.py`

- [ ] **Step 1: Add `_filter_think_tokens` as a module-level private function**

Insert the following function **before** `call_anthropic_messages_sync` (i.e., after the existing `_finish_reason_from_stop` function, around line 262):

```python
def _filter_think_tokens(chunks, on_token):
    """Filter <think>...</think> segments from a streaming text iterator.

    Calls on_token only for non-thinking content. Designed for use with
    stream.text_stream from the Anthropic SDK when MiniMax returns thinking
    as plain-text XML tags rather than native thinking blocks.

    Args:
        chunks: Iterable of str chunks (e.g. stream.text_stream).
        on_token: Callable[[str], None] — receives only non-thinking text.
    """
    OPEN = "<think>"
    CLOSE = "</think>"
    buf = ""
    in_think = False

    for chunk in chunks:
        if not chunk:
            continue
        buf += chunk
        while True:
            if not in_think:
                idx = buf.find(OPEN)
                if idx == -1:
                    # Guard: retain (len(OPEN)-1) bytes in case tag spans chunks
                    safe = max(0, len(buf) - (len(OPEN) - 1))
                    if safe > 0:
                        on_token(buf[:safe])
                        buf = buf[safe:]
                    break
                if idx > 0:
                    on_token(buf[:idx])
                buf = buf[idx:]
                in_think = True
            else:
                idx = buf.find(CLOSE)
                if idx == -1:
                    break  # wait for more chunks
                buf = buf[idx + len(CLOSE):]
                in_think = False

    # Flush remainder — only if not inside an unclosed <think>
    if not in_think and buf:
        on_token(buf)
```

- [ ] **Step 2: Replace the streaming loop in `call_anthropic_messages_stream_sync`**

Find the streaming block (around line 329):

```python
    with client.messages.stream(**kwargs) as stream:
        if on_token is not None:
            try:
                for text in stream.text_stream:
                    if text:
                        # Log token fragments for debugging thinking leakage in streaming mode
                        try:
                            with open(_token_log_path, "a", encoding="utf-8") as _f:
                                _f.write(f"[{int(time.time() * 1000)}] {repr(text[:80])}\n")
                        except Exception:
                            pass
                        on_token(text)
            except Exception:
                logger.debug("anthropic text_stream iteration failed; fallback to final_message", exc_info=True)
        final = stream.get_final_message()
```

Replace **only** the inner `for text in stream.text_stream` loop body (keep the outer `with`, `if on_token`, `try/except`, and `final = stream.get_final_message()` unchanged):

```python
    with client.messages.stream(**kwargs) as stream:
        if on_token is not None:
            try:
                _filter_think_tokens(stream.text_stream, on_token)
            except Exception:
                logger.debug("anthropic text_stream iteration failed; fallback to final_message", exc_info=True)
        final = stream.get_final_message()
```

(The per-token debug log file is removed — it was a temporary debugging aid and the filter makes it obsolete. The `_token_log_path` setup block a few lines above can remain; it just won't be written to anymore.)

- [ ] **Step 3: Run the streaming filter tests — verify they PASS**

```bash
python -m pytest tests/test_anthropic_react_messages.py::TestFilterThinkTokens -v
```

Expected: **PASSED** (7 tests)

- [ ] **Step 4: Run the full test file — verify no regressions**

```bash
python -m pytest tests/test_anthropic_react_messages.py -v
```

Expected: all tests **PASS**

- [ ] **Step 5: Commit**

```bash
git add backend/core/anthropic_react_llm.py tests/test_anthropic_react_messages.py
git commit -m "fix: filter <think> tokens from MiniMax streaming and add _filter_think_tokens"
```

---

## Task 5 — Verify with existing integration tests

**Files:** none (read-only verification)

- [ ] **Step 1: Run the non-live integration tests**

```bash
python -m pytest tests/test_integration_agent_react.py -m "not live" -v
```

Expected: all tests **PASS** (structure tests: tool registration, system prompt shape)

- [ ] **Step 2: Run the extract_thinking_block tests**

```bash
python -m pytest tests/test_extract_thinking_block.py -v
```

Expected: all tests **PASS** (agent.py's `_extract_thinking_block` is unchanged)

- [ ] **Step 3: Run the full test suite**

```bash
python -m pytest tests/ -v --ignore=tests/test_core_glm_query.py -m "not live"
```

Expected: all tests **PASS**

- [ ] **Step 4: Final commit if any fixups needed; otherwise done**

```bash
git status  # should be clean
```

---

## Verification Checklist (manual smoke test)

After implementation, test live behaviour with `PRIMARY_LLM_PROTOCOL=anthropic`:

- [ ] Query that triggers tool use (e.g. "查 DN50 直通价格") — model reply correctly
      references tool result, no `根据路由规则` preamble visible
- [ ] 3-turn session — system prompt rules not echoed in any reply
- [ ] Streaming bubble in frontend — no `<think>` or raw reasoning text mid-stream
- [ ] Backend logs — `thinking` in trace, not in `answer` field
