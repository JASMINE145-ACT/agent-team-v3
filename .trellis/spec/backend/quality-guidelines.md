# Quality Guidelines

> Code quality rules, enforceable patterns, and anti-patterns for this codebase.

---

## Tool Schema Drift Prevention

**CRITICAL**: When changing a tool's parameter schema, update BOTH the handler AND the tool definition simultaneously.

Tool definitions are in:
- Inventory tools: `backend/tools/inventory/services/inventory_agent_tools.py` → `get_inventory_tools_openai_format()`
- OOS tools: `backend/tools/oos/oos_tools.py` → `get_oos_tools_openai_format()`
- Extra tools: `backend/agent/tools.py` → `EXTRA_TOOLS`

Handler implementations are in respective `handler.py` files.

---

## Required Result Shapes

All tools MUST return a JSON string with `success` field:

```python
# ✅ Correct
return {"success": True, "result": json.dumps(payload)}

# ❌ Wrong
return "Here's the price: 12.5"  # raw string

# ✅ Error
return {"success": False, "error": str(e)}
```

---

## Chosen Field Whitelist

Only these fields are allowed in the `chosen` object pushed to frontend:

```python
_KNOWN_CHOSEN_FIELDS: set[str] = {"code", "matched_name", "unit_price", "source"}
```

Adding new fields requires updating `extension.py` whitelist AND frontend type simultaneously.

---

## match_quotation Result Types

| Status | Meaning | Trigger |
|--------|---------|---------|
| `single` | LLM confident, one candidate selected | 1 candidate OR LLM selects with high confidence |
| `needs_selection` | LLM uncertain, needs human choice | Multiple candidates, low confidence |
| `needs_human_choice` | LLM uncertain, trimmed options returned | Same as `needs_selection` |
| `unmatched` | No candidates found | Zero candidates |
| `llm_error` | Selector failed, rule fallback active | `finish_reason=length` + salvage failed |

---

## Session State Rules

Do not modify `session.pending_human_choice` directly. Use:
- `SessionStore.set_pending_human_choice()`
- `SessionStore.clear_pending_human_choice()`

---

## Forbidden Patterns

| ❌ Wrong | ✅ Correct |
|---------|-----------|
| Hardcoded API keys | Env vars only |
| `ORDER BY id` on 万鼎价格库 | `ORDER BY "NO"` |
| `ORDER BY id` on 整理产品 | `ORDER BY "Product_number_产品编号"` |
| `"万鼎价格库..."` (unquoted) | `'"万鼎价格库..."'` (double-quoted) |
| f-string SQL interpolation | `text("... WHERE col = :val")`, `{"val": value}` |
| `print()` for logging | `logger.info()`, `logger.warning()` |
| Sync I/O in async handlers | `asyncio.to_thread()` wrapping |
| Module-level import in handlers | Lazy import inside function OR top-level with try/except |
| Returning raw string as tool result | Always wrap in `{"success": True, "result": json.dumps(...)}` |
| `_engine = None` reassignment without guard | Singleton pattern with `_get_engine()` |

---

## Config Critical Rules

1. **NEVER send MiniMax model name to Zhipu URL** → 1211 error. Use `MINIMAX_BASE_URL` for MiniMax models.
2. **`DATABASE_URL` not set** → all DB functions return empty results gracefully, never crash.
3. **`INVENTORY_MODIFY_ENABLED=0` (default)** → `modify_inventory` only simulates, no actual writes.
4. **`DEBUG=false` (default)** → `/api/debug/*` routes are disabled.
5. **`ENABLE_TOOL_DEFER=false` (default)** → all tools loaded immediately, no lazy schema expansion.

---

## Testing Requirements

New tool handlers MUST have tests covering:
1. Happy path
2. Error path (network failure, invalid args)
3. Empty result path
4. For selector tools: `finish_reason=length` truncation recovery

---

## Scenario: `llm_selector` token budget (2026-04-04)

**Trigger**: Selector often hit `finish_reason=length` causing `llm_error` fallback.

**Contracts**:
- `LLM_SELECTOR_MAX_TOKENS=3000` (both env var and cap)
- If `content` is empty but `reasoning_content` exists → extract JSON block
- If `reasoning_content` is truncated → regex salvage for `index` and `reason`
- Salvage fails → rule-based fallback (共同 > 历史报价 > 字段匹配) with `llm_error` marker

**Wrong**: Treat empty `content` as immediate hard failure.
**Correct**: Attempt `reasoning_content` salvage before rule fallback.

---

## Scenario: `[已渲染到前端]` hard-stop (2026-04-04)

**Trigger**: Query/card desync when LLM generates extra narrative after tool result.

**Contracts**:
- Constant: `_RENDERED_MARKER_PREFIX = "[已渲染到前端]"`
- If observation starts with marker prefix → skip next LLM generation step
- Force finalize current turn answer with marker text

**Wrong**: Depend only on prompt-level silence.
**Correct**: Runtime loop hard-stop once marker observation is detected.


---

## Required Tool Response Shape

All tools MUST return a JSON string (or a dict serialized to JSON string) with `success` field.
Do not return raw strings or unstructured text as tool observations.

**Correct:**
```python
return json.dumps({"success": True, "result": json.dumps(payload)})
```

**Forbidden:**
```python
return "Here's the price: 12.5"  # raw string, no success field
```

---

## match_quotation Contract

After the rework implementation, `match_quotation` MUST:
- Return `single` (dict with `chosen`) when LLM confidently selects one candidate
- Return `needs_human_choice` (dict with `options` list) when LLM is uncertain
- Return `unmatched` when no candidate matches
- Never return `needs_selection` in new code (legacy only)

---

## Session State

Do not modify `session.pending_human_choice` directly — use `SessionStore.set_pending_human_choice()` and `clear_pending_human_choice()`.

---

## Forbidden Patterns

- **No hardcoded prices** — always read from `PRICE_LIBRARY_PATH` or API
- **No sync I/O in async tool handlers** — use `asyncio` throughout
- **No module-level `import` inside tool handlers** — import at module top level or use lazy import with error handling
- **No tool schema drift** — if a tool's parameter schema changes, update both the handler AND the tool definition

---

## Logging

- Use `logging.getLogger(__name__)` — not print statements
- Log levels: `DEBUG` (tool args/result), `INFO` (business events), `WARNING` (recoverable), `ERROR` (unrecoverable)
- Never log full PII or API keys

---

## Testing

New tool handlers MUST have corresponding test cases in `tests/`.
Test at minimum:
1. Happy path
2. Error path (network failure, invalid args)
3. Empty result path

---

## Scenario: `match_quotation` selector budget + truncation recovery (2026-04-04)

### 1. Scope / Trigger
- Trigger: `match_quotation` selection often hit `finish_reason=length`, causing `llm_error` fallback and unstable reasoning output.
- Scope: `backend/tools/inventory/config.py`, `backend/tools/inventory/services/llm_selector.py`.

### 2. Signatures
- Config:
  - `InventoryConfig.LLM_SELECTOR_MAX_TOKENS: int`
- Selector:
  - `llm_select_best(keywords, candidates, ..., max_tokens: int | None = None) -> dict | None`
  - `_extract_content_from_openai_response(resp) -> tuple[str, str, int]`

### 3. Contracts
- Env key:
  - `LLM_SELECTOR_MAX_TOKENS` (optional, default `3000`)
- Runtime behavior:
  - Selector default budget is `3000`, and cap is `3000`.
  - If `content` is empty but `reasoning_content` exists, parser must try:
    1. full JSON extraction
    2. regex salvage for `"index"` and optional `"reason"` from truncated text

### 4. Validation & Error Matrix
- `content` non-empty JSON:
  - parse and select candidate normally.
- `content` empty + `reasoning_content` has full JSON:
  - extract JSON block, continue.
- `content` empty + `reasoning_content` truncated (`finish_reason=length`):
  - salvage `index/reason` by regex; if salvage succeeds, continue.
- salvage fails:
  - fallback to rule-based ranking (`共同` > `历史报价` > `字段匹配`) with `llm_error` marker.

### 5. Good / Base / Bad Cases
- Good:
  - selector returns minimal JSON (`index`, `reason`) within budget; no fallback.
- Base:
  - `reasoning_content` truncated, but regex salvage obtains `index`; still produces `single`.
- Bad:
  - no parsable `index`; selector falls back to rules and emits `llm_error`.

### 6. Tests Required (assertion points)
- `tests/test_llm_selector_protocol.py`
  - assert truncated `reasoning_content` can still pick expected candidate index.
  - assert source-priority fallback order remains stable.
- `tests/test_prompt_constraints.py`
  - assert output policy constraints are unchanged after selector budget adjustment.

### 7. Wrong vs Correct
#### Wrong
- Keep selector max tokens too small (or inconsistent cap), then treat empty `content` as immediate hard failure.

#### Correct
- Use `LLM_SELECTOR_MAX_TOKENS=3000`, cap at `3000`, and attempt truncated `reasoning_content` salvage before rule fallback.

---

## Scenario: hard-stop LLM after `[已渲染到前端]` observation (2026-04-04)

### 1. Scope / Trigger
- Trigger: even with `tool_render` SSE, relying only on prompt-level silence caused unstable outputs; query and card could desync.
- Scope: `backend/core/agent.py` ReAct loop.

### 2. Signatures
- Constant: `_RENDERED_MARKER_PREFIX = "[已渲染到前端]"`
- Loop variable: `force_final_answer: Optional[str]`

### 3. Contracts
- If `match_quotation` tool observation starts with marker prefix, ReAct loop must:
  1. skip next LLM generation step,
  2. finalize current turn answer with marker text.
- This guarantees a deterministic anchor per query for frontend card replacement.

### 4. Validation & Error Matrix
- marker present:
  - force finalize current step; no follow-up LLM narrative generation.
- marker absent:
  - continue normal ReAct loop.

### 5. Good / Base / Bad Cases
- Good:
  - one query produces one marker answer and one card.
- Base:
  - LLM attempts to generate extra narrative is bypassed by loop hard-stop.
- Bad:
  - no hard-stop and no marker in final answer → cards only append at bottom (query/card mismatch).

### 6. Tests Required (assertion points)
- Integration behavior checks:
  - run with `match_quotation` single result and verify no second-step LLM narrative call is needed.
  - final persisted assistant answer starts with marker prefix.

### 7. Wrong vs Correct
#### Wrong
- Depend only on prompt rules to keep model silent.

#### Correct
- Enforce runtime loop hard-stop once marker observation is detected.
