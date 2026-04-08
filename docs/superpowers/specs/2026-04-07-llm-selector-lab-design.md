# LLM Selector Lab — Design Spec

> **For agentic workers:** Use superpowers:executing-plans or superpowers:subagent-driven-development to implement this plan.

**Goal:** A standalone Streamlit dev tool for testing and debugging the `llm_select_best` pipeline — input product queries, run `match_quotation_union → llm_select_best`, inspect candidates and selection reasoning, and live-edit business knowledge to observe its effect.

**Architecture:** Route 1b — main backend exposes a thin debug endpoint; Streamlit is a separate repo with zero business logic. No shared state between runs (each run is independent).

**Tech Stack:** Python, FastAPI (existing), Streamlit, httpx/requests.

---

## 1. Repository Structure

### Main backend (`Agent Team version3`) — minimal changes

```
backend/
├── tools/inventory/services/
│   └── llm_selector.py          ← add knowledge_override param only
└── server/api/
    └── routes_debug.py          ← new: debug endpoints (only active when DEBUG=true)
```

`app.py` registers `routes_debug.router` when `Config.DEBUG is True`.

### Standalone Streamlit project (`selector-lab/` — separate repo)

```
selector-lab/
├── app.py                       ← Streamlit UI (single file)
├── requirements.txt             ← streamlit, httpx
└── .streamlit/
    └── secrets.toml             ← BACKEND_URL, optional API_KEY
```

---

## 2. Backend Changes

### 2a. `llm_selector.py` — `knowledge_override` parameter

Add optional `knowledge_override: str | None = None` to `llm_select_best`:

```python
def llm_select_best(
    keywords: str,
    candidates: list[dict[str, Any]],
    max_tokens: int | None = None,
    knowledge_override: str | None = None,   # ← NEW
) -> Optional[dict[str, Any]]:
    ...
    # Replace:  knowledge = _load_business_knowledge()
    # With:
    knowledge = knowledge_override.strip() if knowledge_override and knowledge_override.strip() \
                else _load_business_knowledge()
```

All existing call sites pass no `knowledge_override`, so behaviour is unchanged.

Also expose `_build_knowledge_hint` result and the full prompt string as return metadata (via a side-channel dict or a new internal helper) so the debug endpoint can return `llm_prompt`.

### 2b. `routes_debug.py` — two endpoints

**`POST /api/debug/match-select`**

Request body:
```json
{
  "keywords": "pvc水管dn50",
  "customer_level": "B",
  "knowledge_override": null
}
```

Response:
```json
{
  "keywords": "pvc水管dn50",
  "status": "single | needs_selection | unmatched | llm_error",
  "match_source": "共同、历史报价",
  "candidates": [
    {"index": 1, "code": "...", "matched_name": "...", "unit_price": 0.0, "source": "共同"}
  ],
  "chosen_index": 2,
  "chosen": {"code": "...", "matched_name": "...", "unit_price": 0.0, "source": "..."},
  "reason": "规格与口径完全吻合",
  "llm_prompt": "<full prompt string sent to LLM>"
}
```

- `candidates` list is 1-indexed (`index` field starts at 1) to match `chosen_index`.
- `chosen_index` is `0` when status is `unmatched`.
- `llm_prompt` is the exact string passed to the LLM (keywords + candidates text + knowledge hint).

**`GET /api/debug/knowledge`**

Returns current business knowledge file content:
```json
{ "content": "<full text of wanding_business_knowledge.md>" }
```

Used by Streamlit to pre-populate the editor on load and on "Reset to current file".

**Security:** Both endpoints are registered **only when `Config.DEBUG is True`**. No authentication (dev tool).

---

## 3. Streamlit UI (`app.py`)

### Layout

Two-column layout: left sidebar (fixed) for business knowledge editor; right main area for query tabs.

**Left column — Business Knowledge Editor**
- `st.text_area` pre-loaded via `GET /api/debug/knowledge` on app start.
- "重置为当前文件" button re-fetches and overwrites the editor content.
- The edited content is passed as `knowledge_override` in every request. No save/persist.

**Right column — Tabs: Single / Batch**

#### Single tab
- `st.text_input` for one query + customer level selector (A/B/C/D, default B) + "Run" button.
- On run: calls `POST /api/debug/match-select`.
- Results:
  - Status badge + match source line.
  - `st.dataframe` of all candidates; chosen row highlighted in green.
  - "选择理由: {reason}" displayed below table.
  - `st.expander("查看 LLM Prompt")` showing raw `llm_prompt`.

#### Batch tab
- `st.text_area` — one query per line, max 5 (truncated with warning if more).
- Customer level selector (applies to all queries in batch).
- "Run All" button — calls `POST /api/debug/match-select` sequentially for each query.
- Results: one `st.expander` per query.
  - Expander title: `{keywords} → 第{N}条: {name} | {reason[:20]}…`
  - Title prefix: ✅ single, 🔶 needs_selection, ⚠️ unmatched/llm_error.
  - Inside expander: same layout as Single tab result (candidates table + reason + LLM prompt expander).

### Status badges
| status | display |
|--------|---------|
| `single` | ✅ 已选定 |
| `needs_selection` | 🔶 低置信度 |
| `unmatched` | ⚠️ 无匹配 |
| `llm_error` | ❌ LLM 错误 |

---

## 4. Data Flow

```
User edits knowledge  ──────────────────────────────────┐
User enters query(ies) + clicks Run                      │
         │                                               │
         ▼                                               │
POST /api/debug/match-select                             │
  body: { keywords, customer_level, knowledge_override ──┘ }
         │
         ▼
match_quotation_union(keywords, customer_level)
  → raw candidates list
         │
         ▼
Normalize + sort by source priority (共同 > 历史报价 > 字段匹配)
Cap at 15 candidates
         │
         ▼
llm_select_best(keywords, candidates, knowledge_override=...)
  → {index, reason} or None (unmatched)
         │
         ▼
Build response: status, candidates(1-indexed), chosen, reason, llm_prompt
         │
         ▼
Streamlit renders: candidates table (chosen row green) + reason + prompt
```

---

## 5. Error Handling

- Backend `match_quotation_union` raises → return `{"status": "llm_error", "reason": str(e)}`.
- `llm_select_best` raises → return `{"status": "llm_error", "reason": str(e)}`.
- Streamlit: if backend unreachable → `st.error("无法连接后端 {BACKEND_URL}")`.
- Batch: errors in one query do not stop remaining queries; failed items show ❌ in expander title.

---

## 6. Configuration

### Main backend `.env`
```
DEBUG=true    # required to activate debug endpoints
```

### Streamlit `secrets.toml`
```toml
BACKEND_URL = "https://your-backend.onrender.com"
# API_KEY = ""   # reserved, unused for now
```
