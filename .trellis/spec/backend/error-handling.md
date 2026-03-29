# Error Handling

---

## Tool Error Categories

| Error Type | Handler | Behavior |
|-----------|---------|----------|
| **Version3 Dependency Unavailable** | `version3_tools.py` catch | Returns `"version3_dependencies_not_available"` — tool does not crash |
| **Network Timeout** | `WandAPI` / `AOLClient` | Retry once, then return error observation |
| **Invalid Tool Arguments** | `ToolRegistry.execute()` | Validates JSON Schema before calling handler |
| **LLM API Timeout** | `llm_client.py` | Falls back to alternative model, then error |
| **Session Not Found** | `SessionStore.load()` | Returns `Session.empty()` — creates new session |
| **Human Choice Pending** | `CoreAgent` rework flow | Injects `_build_rework_injection()` into prompt |

---

## Tool Result Structure

All tool results are JSON strings with a consistent structure:

```json
{"success": true, "result": "<json string of actual result>"}
{"success": false, "error": "<error message>"}
```

`match_quotation` result types:
- **single** (confident LLM choice): `{"single": true, "candidates": [...], "chosen": {...}}`
- **needs_human_choice** (LLM uncertain): `{"needs_human_choice": true, "options": [...]}`
- **unmatched** (no match found): `{"unmatched": true, "keywords": "..."}`
- **needs_selection** (legacy fallback): `{"needs_selection": true, "candidates": [...]}`

---

## Rework Error Recovery

When user says "错了" / "不对":
1. `_detect_rework_intent()` catches the correction signal
2. `session.pending_human_choice` carries the last candidates
3. Agent calls `record_correction_to_knowledge` to permanently record the correction
4. LLM re-runs the selection with the updated knowledge base

---

## No Dead Loops

- `CoreAgent` has `REACT_MAX_STEPS` (default 12) as hard limit
- `ToolRegistry` logs latency and error rate per tool
- `llm_selector.py` returns `None` (not an exception) when LLM cannot select → propagates as `unmatched`
