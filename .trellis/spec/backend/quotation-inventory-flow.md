# Quotation and Inventory Flow

> Core business path (P0).  
> Goal: help agents quickly understand how product matching decisions are made.

---

## 1) Purpose

This flow handles user quotation intents and maps keywords to the best product candidate, then returns structured output for chat/work pipelines.

Primary value:
- correct product selection
- stable fallback when LLM fails
- correction loop for continuous improvement

---

## 2) Entry Points

- API/chat path through `routes_chat` -> `CoreAgent` tool invocation
- Work pipeline path through `/api/work/*` and tool execution
- Main tools:
  - `match_quotation`
  - `match_quotation_batch`
  - inventory lookup utilities in `backend/tools/inventory/services`

---

## 3) Control Flow (Core)

1. Parse user keyword + context from chat/work input.
2. Build candidate set from inventory/price/mapping sources.
3. Apply deterministic pre-ranking in code (`_apply_candidate_pre_filter`).
4. Run selector LLM on pre-ranked candidates (if multiple candidates remain).
5. Return:
   - single chosen result, or
   - needs-selection for user confirmation, or
   - unmatched/no-fit result.
6. If user says "wrong/not this", trigger rework and correction recording.

---

## 4) Deterministic vs LLM Boundary

### Deterministic (code-tier)
- default drainage vs water-supply preference
- JIS/guobiao signal handling
- hot/cold and pressure signals
- source weighting and brand tie-break

### Semantic (LLM-tier)
- ambiguous wording interpretation
- candidate explanation text
- final tie-break when deterministic scores are close

---

## 5) Failure Modes (High Impact)

- LLM selector timeout/error -> rule fallback still returns top pre-ranked candidate.
- Candidate ambiguity too high -> return needs-selection instead of forcing wrong pick.
- Wrong selection discovered by user -> rework path records correction.

---

## 6) SSE Push + Compact Summary Mechanism

Both quotation and inventory tools use a unified SSE push pattern to render results as cards on the frontend, avoiding the LLM from re-describing table content.

### Pattern
- Tool function returns structured JSON with `formatted_response` (Markdown table) + `compact` (short summary)
- `on_after_tool` in `JAgentExtension` intercepts the result, pushes `tool_render` SSE, returns compact to LLM
- **SSE push happens exactly once** — in `on_after_tool`, not in the execute function
- Compact must start with `[已渲染到前端]` marker so the LLM knows frontend has already rendered it

### Double-layer JSON Structure
Tool return (execute function) wraps inner JSON in `result` field:
```json
{
  "success": true,
  "result": "{\"success\": true, \"result\": \"[已渲染到前端]...\", \"data\": {...}, \"formatted_response\": \"...\", \"compact\": \"...\"}",
  "formatted_response": "...",
  "compact": "...",
  "data": {...}
}
```
Handler (`on_after_tool`) parses outer JSON first, then tries to parse `result` as inner JSON.

### Inventory Tools SSE Flow
1. `get_inventory_by_code` / `get_inventory_by_code_batch` return structured JSON (no SSE push inside execute)
2. `on_after_tool` intercepts, pushes `tool_render` SSE, returns compact to LLM
3. LLM sees only `[已渲染到前端] 批量库存查询 N 个编号：found=X, not_found=Y...` and is instructed not to repeat the table

### JSON Serialization Rule
- **Never** put raw domain objects (e.g., `Item`) into JSON-returned `data` fields
- Use summaries (e.g., `item_summary` dict with `item_name`, `qty_warehouse`, `qty_available`) instead
- Raw objects cause `TypeError: Object of type Item is not JSON serializable`

### Files
- `backend/tools/inventory/services/inventory_agent_tools.py` — formatting functions, execute functions
- `backend/plugins/jagent/extension.py` — `on_after_tool` interceptors `_handle_inventory_single_obs`, `_handle_inventory_batch_obs`

---

## 7) Related Specs

- `llm-selector-architecture.md`
- `tools-catalog.md`
- `skills-system.md`
- `../tech-framework-guidelines.md`
- `memory-context.md` (tool_memory / card_refs injection)
- `core-react-loop.md` (ReAct loop + SSE pipeline)
