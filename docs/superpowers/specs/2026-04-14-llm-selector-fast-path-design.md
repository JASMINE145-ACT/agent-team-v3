# LLM Selector Fast Path — Design Spec

**Date:** 2026-04-14  
**Status:** Approved  
**Files affected:**
- `backend/tools/inventory/config.py`
- `backend/tools/inventory/services/llm_selector.py`
- `.env.example`

---

## 1. Problem

`llm_select_best` uses `glm-4.5-air`, a thinking (reasoning) model, to select one candidate from a list. The model generates 1000–2000 reasoning tokens internally before producing a ~30-token JSON answer, causing:

- **Typical latency:** 2–5 seconds per call
- **Timeout risk:** default `LLM_SELECTOR_TIMEOUT=40` is frequently hit under load
- **Wasted budget:** `max_tokens=3000` gives the model space for extensive reasoning that isn't needed for this task

The system prompt `_SYSTEM_SELECTOR` is well-designed and is not the root cause.

---

## 2. Goal

- Reduce selector latency to **< 700ms** typical
- Keep the old path (glm-4.5-air) fully intact and switchable via config
- Zero changes to any call site of `llm_select_best`

---

## 3. Design

### 3.1 Switch Mechanism

A single env var controls which path runs:

```
LLM_SELECTOR_MODEL set (non-empty)  →  fast path  (gpt-4o-mini)
LLM_SELECTOR_MODEL absent / empty   →  old path   (glm-4.5-air, unchanged)
```

No additional boolean flag needed. Switching back = comment out `LLM_SELECTOR_MODEL` in `.env`.

### 3.2 New Config Keys (`config.py`)

```python
LLM_SELECTOR_MODEL    = os.getenv("LLM_SELECTOR_MODEL", "")
LLM_SELECTOR_API_KEY  = os.getenv("LLM_SELECTOR_API_KEY", "")
LLM_SELECTOR_BASE_URL = os.getenv("LLM_SELECTOR_BASE_URL", "")
# LLM_SELECTOR_TIMEOUT already exists; old default 40s is preserved for old path
```

For the fast path, recommended `.env` values:
```
LLM_SELECTOR_MODEL=gpt-4o-mini
LLM_SELECTOR_API_KEY=sk-...
LLM_SELECTOR_BASE_URL=https://api.openai.com/v1
LLM_SELECTOR_TIMEOUT=15
```

### 3.3 `llm_selector.py` Changes

#### Module-level client singleton (fast path only)

```python
_selector_client: Any = None

def _get_selector_client(api_key: str, base_url: str | None) -> "OpenAI":
    global _selector_client
    if _selector_client is None:
        from openai import OpenAI
        _selector_client = OpenAI(api_key=api_key, base_url=base_url or None)
    return _selector_client
```

The old path continues creating a new `OpenAI(...)` instance per call (original behavior preserved).

#### `llm_select_best` branching

```python
def llm_select_best(keywords, candidates, max_tokens=None, knowledge_override=None):
    ...
    selector_model = getattr(config, "LLM_SELECTOR_MODEL", "").strip()

    if selector_model:
        return _fast_path(keywords, candidates, config, selector_model, knowledge_override)
    else:
        # old path — original code, not modified
        ...
```

#### `_fast_path()` function

Key differences from the old path:

| Parameter | Old path | Fast path |
|-----------|----------|-----------|
| model | `glm-4.5-air` (thinking) | `gpt-4o-mini` (non-thinking) |
| max_tokens | 3000 | 120 |
| timeout | 40s | 15s (from `LLM_SELECTOR_TIMEOUT`) |
| response_format | not set | `{"type": "json_object"}` |
| client | new instance per call | module-level singleton |
| JSON parsing | multi-layer regex fallback | direct `json.loads()` |
| retry on length | yes | not needed (120 tokens is ample) |

System prompt `_SYSTEM_SELECTOR` is **reused unchanged** in the fast path.

#### Fast path JSON parsing

```python
obj = json.loads(content)   # json_object mode guarantees valid JSON
idx = int(obj.get("index", 0) or 0)
reason = str(obj.get("reason") or obj.get("reasoning") or "")[:_SELECTOR_REASON_MAX_LEN]
```

On any exception, falls through to `_rule_based_fallback` (same as old path).

### 3.4 Call Flow

```
llm_select_best(keywords, candidates)
       │
       ├─ LLM_SELECTOR_MODEL set? ─YES─→ _fast_path()
       │                                   · _get_selector_client() singleton
       │                                   · response_format=json_object
       │                                   · max_tokens=120, timeout=15s
       │                                   · json.loads() parse
       │                                   · exception → _rule_based_fallback()
       │
       └─ NO ──→ original code (unchanged)
                  · new OpenAI() per call
                  · glm-4.5-air, max_tokens=3000
                  · multi-layer regex parsing
                  · retry on length
```

---

## 4. What Does NOT Change

- `_SYSTEM_SELECTOR` — unchanged
- `_rule_based_fallback()` — unchanged, used by both paths
- `_build_knowledge_hint()` / `_load_business_knowledge()` — unchanged
- `_build_selector_prompt()` — unchanged, used by both paths
- `_sort_candidates_by_source()` — unchanged
- All call sites of `llm_select_best` — zero changes needed
- Old path code — not deleted, not modified

---

## 5. Rollback

To revert to old path:
```bash
# .env — comment out or delete these lines:
# LLM_SELECTOR_MODEL=gpt-4o-mini
# LLM_SELECTOR_API_KEY=sk-...
# LLM_SELECTOR_BASE_URL=https://api.openai.com/v1
```
No code deployment needed. Config change only.

---

## 6. Out of Scope

- Two-tier rule-first architecture (Approach C) — deferred
- Async client support — deferred
- Logging/metrics for fast path vs old path comparison — deferred (can add separately)
