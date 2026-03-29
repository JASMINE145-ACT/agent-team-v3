# Quality Guidelines

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
