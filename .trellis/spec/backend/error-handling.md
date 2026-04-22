# Error Handling

> Tool-level error patterns and recovery strategies specific to this codebase.

---

## Neon Database Errors

### `undefinedtable` (42P01)
**Cause**: Table name in `data_libraries.metadata` does not match actual PostgreSQL table name.
**Recovery**: `resolve_library_meta(lib_id)` → `try_repair_library_table_name()` auto-finds correct `dl_{id}_*` table.
**Location**: `backend/tools/admin/repository.py` — `fetch_all_library_rows()`, `fetch_library_data()`

### `undefined_column`
**Cause**: Chinese column name used without double-quote wrapping.
**Prevention**: Always use `_quote_sql_identifier()` for any column/table name containing non-ASCII characters.

### `psycopg2.errors.UndefinedColumn`
**Cause**: Code uses `ORDER BY id` on a table that has no `id` column (万鼎价格库 uses `NO`, 整理产品 uses `Product_number_产品编号`).
**Fix**: Use the correct business key for sorting — see `database-guidelines.md`.

---

## Inventory Tool Errors

### AOL API Failures
- **Network timeout**: Retry once, then return error observation (logged `WARNING`)
- **Invalid credentials**: `AOL_ACCESS_TOKEN` missing → tools return empty results
- **Demo mode**: `INVENTORY_DEMO_MODE=1` returns mock data when AOL unavailable

### Resolver Failures
- **ModuleNotFoundError ("src")**: InventoryAgent not fully deployed → surfaces as `"version3_dependencies_not_available"`
- **Embedding timeout**: `EMBEDDING_TIMEOUT=15s` exceeded → falls back to CONTAINS-only matching

---

## LLM Selector Errors

### 1211 "model not found"
**Cause**: MiniMax model name sent to Zhipu OpenAI-compatible endpoint.
**Rule**: If `INVENTORY_LLM_MODEL` contains "minimax", must use `MINIMAX_BASE_URL` not `bigmodel.cn` URL.

### `finish_reason=length`
**Trigger**: Selector output truncated by `max_tokens` cap.
**Recovery**: Regex salvage of `reasoning_content` for `index` and `reason`. If salvage fails → rule-based fallback (共同 > 历史报价 > 字段匹配) with `llm_error` marker.
**Config**: `LLM_SELECTOR_MAX_TOKENS=3000` (cap also 3000)

---

## Session Errors

| Error | Behavior |
|-------|----------|
| Session not found | Returns `Session.empty()` — creates new session |
| `pending_human_choice` set | `_build_rework_injection()` injected into next LLM prompt |
| `REACT_MAX_STEPS` exceeded | Loop terminates with current results |

---

## Tool Result Contract

All tools return JSON string (serialized from dict):

```json
{"success": true, "result": "<json string of actual result>"}
{"success": false, "error": "<error message>"}
```

**match_quotation** specific shapes:

```json
{"success": true, "result": "{\"single\": true, \"candidates\": [...], \"chosen\": {...}}"}
{"success": true, "result": "{\"needs_selection\": true, \"candidates\": [...], \"options\": [...]}"}
{"success": true, "result": "{\"unmatched\": true, \"keywords\": \"...\"}"}
{"success": false, "error": "历史匹配失败: ..."}
```

---

## Rework Error Recovery

```
User: "错了" / "不对"
→ _detect_rework_intent() → True
→ session.pending_human_choice carries last candidates
→ _build_rework_injection() added to system prompt
→ User confirms correct option
→ record_correction_to_knowledge → appends to wanding_business_knowledge.md
→ Next similar query: LLM prompt includes relevant correction
```

---

## No Dead Loops

- `CoreAgent.REACT_MAX_STEPS` (default 12) hard limit
- `ToolRegistry` logs latency and error rate per tool
- `llm_selector.py` returns `None` (not exception) on failure → propagates as `unmatched`


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
