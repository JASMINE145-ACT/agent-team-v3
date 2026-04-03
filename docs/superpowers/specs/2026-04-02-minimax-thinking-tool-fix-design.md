# MiniMax Thinking & Tool Return Fix — Design Spec

**Date:** 2026-04-02  
**Status:** Approved  
**File scope:** `backend/core/anthropic_react_llm.py` (two functions only)

---

## Problem Statement

Three user-reported symptoms when using MiniMax M2.7 via Anthropic gateway
(`ANTHROPIC_BASE_URL=https://api.minimaxi.com/anthropic`):

1. **Tool content returns missed** — Tool executes and returns a result, but the model's
   reply ignores or underutilises it.
2. **System prompt leakage (B)** — The model outputs content that matches the system
   prompt or internal routing rules verbatim.
3. **Response quality degrades (C)** — Responses become worse over a session, as if the
   model has not read the full system prompt (context truncation).

### Unified Root Cause

```
MiniMax response contains thinking content
    ↓ _blocks_to_content_and_tool_calls()
    → thinking wrapped in <think>…</think>, prepended to merged_text
    ↓ call_anthropic_messages_stream_sync — on_token path
    → stream.text_stream emits <think> tokens to frontend       [leakage B, streaming]
    ↓ merged_text (with <think> block) stored in message history
    ↓ convert_openai_to_anthropic_messages — next turn
    → sends "<think>routing rules…</think>actual answer" back to MiniMax as
      "what the assistant previously said"
    → MiniMax re-emits reasoning content                        [symptom B]
    → history bloats, compressing system prompt space           [symptom C]
    → tool_use ↔ tool_result correlation disrupted             [symptom 1]
```

---

## Solution: Approach A — Surgical fix in `anthropic_react_llm.py`

Two targeted changes. No interface modifications. No changes to `agent_helpers.py`
or `agent.py`.

---

## Change 1 — Streaming thinking filter

**Function:** `call_anthropic_messages_stream_sync`

**What:** Replace the raw `stream.text_stream` loop with a stateful buffer that
filters out `<think>…</think>` segments before calling `on_token`. The final
message result path is unchanged.

**Why:** MiniMax may return thinking as plain text blocks containing `<think>` XML
tags (not as native `type:"thinking"` blocks). `stream.text_stream` emits these
verbatim, leaking thinking content to the frontend mid-stream.

**State machine logic:**

```
_text_buf = ""
_in_think = False

for raw_chunk in stream.text_stream:
    _text_buf += raw_chunk
    while True:
        if not _in_think:
            idx = _text_buf.find("<think>")
            if idx == -1:
                # No open tag — emit up to (len(buf) - 6) to guard partial tags
                safe = max(0, len(_text_buf) - len("<think>"))
                if safe > 0:
                    on_token(_text_buf[:safe])
                    _text_buf = _text_buf[safe:]
                break
            if idx > 0:
                on_token(_text_buf[:idx])   # emit text before <think>
            _text_buf = _text_buf[idx:]
            _in_think = True
        else:
            idx = _text_buf.find("</think>")
            if idx == -1:
                break                        # wait for more chunks
            _text_buf = _text_buf[idx + len("</think>"):]
            _in_think = False
```

**Edge cases:**

| Case | Behaviour |
|------|-----------|
| `<think>` tag spans two chunks | Buffer retains `len("<think>")-1` trailing bytes; resolved on next chunk |
| MiniMax returns native `type:"thinking"` block | `stream.text_stream` does not yield thinking tokens; state machine never enters `_in_think`; final message handled by `_blocks_to_content_and_tool_calls` as before |
| Unclosed `<think>` (truncated) | `_in_think` stays True; remaining buffer silently discarded; no user-visible output |
| No `<think>` in stream | State machine is a no-op; `on_token` behaviour identical to current |
| `on_token` raises | Existing `try/except` block preserves fallback to `final_message` |

**What does NOT change:** `stream.get_final_message()` → `_blocks_to_content_and_tool_calls`
→ `_extract_thinking_block` in `agent.py`. The end-to-end final result path is
identical to today.

---

## Change 2 — History assistant message sanitisation

**Function:** `convert_openai_to_anthropic_messages`

**What:** Before building the Anthropic `assistant` content block from a history
message, strip all `<think>…</think>` and `<redacted_thinking>…</redacted_thinking>`
wrappers.

**Why:** Every assistant message stored in history carries the `<think>` block that
`_blocks_to_content_and_tool_calls` prepended. Sending this back to MiniMax causes
it to treat routing rules / reasoning as "what the assistant previously said",
producing leakage (B), history bloat (C), and broken tool correlation (1).

**Code delta (assistant branch only):**

```python
if role == "assistant":
    content = m.get("content") or ""
    # Strip thinking wrappers — prevent reasoning from polluting conversation history
    content = re.sub(r"<think>.*?</think>", "", content, flags=re.DOTALL)
    content = re.sub(r"<redacted_thinking>.*?</redacted_thinking>", "", content, flags=re.DOTALL)
    content = content.strip()
    # tool_calls processing continues unchanged …
```

**Edge cases:**

| Case | Behaviour |
|------|-----------|
| No `<think>` in message | `re.sub` is a no-op; `strip()` only |
| Multiple `<think>` blocks | Both removed (non-greedy `.*?` per block with `DOTALL`) |
| Unclosed `<think>` tag | Pattern requires closing tag; unclosed block not matched; content unchanged |
| `<redacted_thinking>` tag | Second `re.sub` handles it |

---

## Problems Resolved

| Symptom | Resolved by |
|---------|-------------|
| 1 — Tool result ignored by model | Change 2: clean history → MiniMax correctly correlates `tool_use` ↔ `tool_result` |
| B — System prompt / routing rules leak into reply | Change 1 (streaming) + Change 2 (history) |
| C — Response quality degrades / context truncated | Change 2: history no longer bloated by repeated thinking content |

---

## What Is Not Changed

- `_blocks_to_content_and_tool_calls` — thinking wrapping logic unchanged
- `call_anthropic_messages_sync` (non-streaming) — unchanged; thinking stays in
  `text` for `_extract_thinking_block` in `agent.py`
- `agent_helpers.py` — all wrapper function signatures unchanged
- `agent.py` — unchanged
- OpenAI / fallback path — completely unaffected
- All tool schemas, skill prompts, session logic — unchanged

---

## Files Modified

| File | Change |
|------|--------|
| `backend/core/anthropic_react_llm.py` | Change 1 (`call_anthropic_messages_stream_sync`) + Change 2 (`convert_openai_to_anthropic_messages`) |

---

## Test Plan

- [ ] Send a query that triggers tool use; verify the model's reply correctly
      references the tool result
- [ ] Send 3+ turns in a session; verify system prompt rules are not echoed back
      in replies
- [ ] Inspect frontend during streaming; verify no `<think>` or routing-rule text
      appears in the streaming bubble
- [ ] Check backend logs; confirm `thinking` appears in trace, not in answer text
- [ ] Run existing integration tests: `pytest tests/test_integration_agent_react.py`
