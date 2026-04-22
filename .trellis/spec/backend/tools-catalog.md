# Tools Catalog

> Complete inventory of all Agent tools with names, purposes, schemas, and return shapes.
> Auto-built from `get_all_tools()` in `backend/agent/tools.py`.

---

## Tool Access Patterns

| Tag | Meaning |
|-----|---------|
| `access_mode: read` | Does not modify data |
| `access_mode: write` | Modifies data |
| `risk_level: low` | Safe to auto-execute |
| `risk_level: medium` | Should confirm before execution |
| `risk_level: high` | Requires explicit user confirmation |
| `deferred: true` | Loaded lazily via `tool_search` |

---

## Inventory Tools (`get_inventory_tools_openai_format`)

### `search_inventory`
**Purpose**: Search inventory by product name/spec keyword, return available quantity.
```
keywords: string  (required) — product name or spec keyword
```
**Return**: `success + result` JSON string with inventory items.

---

### `get_profit_by_price`
**Purpose**: Query Wanding price library for profit margins by code or full product name.
```
code?: string — 10-digit material code (e.g. 8020020755), optional
product_name?: string — full product name matching Describrition column
price: number (required) — quoted/sold price used to determine tier
```
**Return**: `success + result` JSON with all tier prices/margins.

---

### `get_profit_by_price_batch`
**Purpose**: Batch query for multiple code+price pairs. Use when user asks about 5+ products.
```
items: array of { code: string, price: number }  (required, max 50)
```
**Return**: `success + result` JSON array of profit results.

---

### `get_inventory_by_code`
**Purpose**: Direct inventory lookup by 10-digit material code (no keyword/Resolver).
```
code: string (required) — e.g. 8030020580
```
**Return**: `success + result` JSON with inventory quantity.

---

### `get_inventory_by_code_batch`
**Purpose**: Batch inventory lookup for multiple codes. Use for 5+ items.
```
codes: string[]  (required, max 50)
```
**Return**: `success + result` JSON array.

---

### `match_quotation`
**Purpose**: Core lookup — searches both quotation history and Wanding price library simultaneously. Returns merged results with source tags.
```
keywords: string (required) — product name + spec, e.g. "直接50mm"
customer_level?: string — A/B/C/D/D_low/E (agent tier) or 出厂价_含税/出厂价_不含税/采购不含税. Default B
show_all_candidates?: boolean — true = skip LLM selection, list all candidates
lang?: string — 'en' for English-only keywords, omit for Chinese
product_type?: string — 可选 `国标` / `日标`；strict 过滤（传入即仅保留该类型）。非法值会忽略并记录 warning
```
**Return**: `success + result` JSON string with shape:
```json
{
  "single": true,                          // LLM confident
  "candidates": [{code, matched_name, unit_price, source}],
  "chosen": {code, matched_name, unit_price},
  "chosen_index": 1,
  "match_source": "历史报价|字段匹配|共同"
}
{
  "needs_selection": true,                  // LLM uncertain
  "candidates": [...],
  "options": [...]                          // trimmed options
}
{
  "unmatched": true,
  "keywords": "..."
}
```

---

### `match_quotation_batch`
**Purpose**: Batch version — for 2+ different products in one user message.
```
keywords_list: string[]  (required)
customer_level?: string — default B
lang?: string
product_type?: string — 可选 `国标` / `日标`，透传到每个单项查询；非法值忽略并 warning
```
**Return**: `success + result` JSON string with per-product results array.

---

### `match_by_quotation_history`
**Purpose**: History-only matching (no Wanding search). Faster, no LLM.
```
keywords: string (required)
customer_level?: string — default B
```
**Return**: `success + result` JSON with `single` or `needs_selection`.

---

### `match_wanding_price`
**Purpose**: Wanding library field matching only (no history). Returns price at given tier.
```
keywords: string (required)
customer_level?: string — default B
```
**Return**: `success + result` JSON with `single`/`needs_selection`/`unmatched`.

---

### `select_wanding_match`
**Purpose**: LLM selection from `needs_selection` candidates. Requires prior `match_wanding_price` call.
```
keywords: string (required)
candidates: array of {code, matched_name, unit_price}  (required)
match_source: string — "历史报价" or "字段匹配" (from prior observation)
```
**Return**: `success + result` JSON with selected item.

---

### `modify_inventory`
**Purpose**: Lock available inventory (lock, placeholder) or supplement/zero (supplement).
```
code: string (required) — material code
action: string (required) — "lock" or "supplement"
quantity: number (required) — >0 = supplement, =0 = zero out user warehouse
memo?: string — optional note
```
**Requires**: `INVENTORY_MODIFY_ENABLED=1` to actually write.
**Return**: `success + result` JSON.

---

## Quotation Tools (`get_quote_tools_openai_format`)

### `extract_quotation_data`
**Purpose**: Extract quotation rows from Excel file (row 2 to "Total Excluding PPN" marker row −1).
```
file_path: string (required) — absolute path
sheet_name?: string — specific sheet name
```
**Return**: `success + result` (Markdown table) + `rows_count`.

---

## OOS Tools (`get_oos_tools_openai_format`)

### `get_oos_list`
**Purpose**: Get out-of-stock product list with occurrence count and email status.
```
limit?: integer — default 100 (shows first 50)
```

---

### `get_oos_stats`
**Purpose**: OOS statistics summary.
```
(no params)
```

---

### `get_oos_by_file`
**Purpose**: Per-file OOS stats: record count and upload time per quotation file.
```
limit?: integer — default 50
```

---

### `get_oos_by_time`
**Purpose**: Daily OOS new records for last N days.
```
last_n_days?: integer — default 30
```

---

### `register_oos`
**Purpose**: OOS registration from uploaded quotation file. Parse OOS rows and write to DB.
```
file_path: string (required) — must match context.file_path
prompt?: string — optional instructions
```

---

### `register_oos_from_text`
**Purpose**: Direct OOS registration from user text. No file needed.
```
product_name: string (required)
specification?: string
quantity?: number — default 0
unit?: string
```

---

## EXTRA_TOOLS (defined in `backend/agent/tools.py`)

### `run_quotation_fill`
**Purpose**: Full pipeline — extract → Wanding match → inventory check → fill Excel. Only when user explicitly requests "询价填充/填充报价单/完整报价" AND `file_path` exists in context.
```
file_path: string (required) — absolute path to quotation Excel
customer_level?: string — A/B/C/D/D_low/E/出厂价_含税/出厂价_不含税/采购不含税. Default B
```

---

### `ask_clarification`
**Purpose**: Ask user clarifying questions when intent is ambiguous (e.g. "查XX" could be inventory or price). Skip when keywords clearly contain 库存/可售/价格/报价/万鼎/档位.
```
questions: string[] (required)
reasoning: string — why clarification is needed
```

---

### `append_business_knowledge`
**Purpose**: Append one knowledge entry to `wanding_business_knowledge.md` for future selection reference. Call when user says "记录到知识库/记在 knowledge/把这个记下来".
```
content: string (required) — one polished knowledge entry
```

---

### `batch_quick_quote`
**Purpose**: Bulk text input of products+quantities, returns price+inventory in Markdown table. For WeCom quick quote scenarios.
```
inquiry_text: string (required) — e.g. "50三通 100个，25弯头 50个" or "DN50三通×100、DN25弯头×50"
customer_level?: string — default B
```
**Limit**: 100 items max.

---

### `tool_search`
**Purpose**: Find and expand full schema for a deferred-loading tool.
```
query: string (required) — tool name or description, e.g. "run_quotation_fill", "无货"
```

---

## ReAct Loop Tool Execution (`CoreAgent`)

Tools are executed via `CoreAgent.execute_react()` → `ToolRegistry.execute()`.
Result always flows back to the LLM as an `observation` in the next turn.

### Rework Flow
```
User: "错了" / "不对"
→ _detect_rework_intent() → True
→ session.pending_human_choice carries last candidates
→ Agent injects _build_rework_injection() prompt
→ User confirms correct option
→ record_correction_to_knowledge writes to wanding_business_knowledge.md
→ Future similar query: LLM prompt includes relevant correction examples
```

---

## Tool Metadata Conventions

| Convention | Pattern | Example |
|-----------|---------|---------|
| Handler function | `_execute_<tool_name>` | `_execute_match_quotation` |
| Result wrapper | `{"success": True, "result": json.dumps(payload)}` | — |
| Error wrapper | `{"success": False, "error": "<message>"}` | — |
| Deferred tool | `x_tool_meta.deferred: true` + `tool_search` to resolve | OOS, modify_inventory |
