# GLM Vision OCR — Design Spec

**Date:** 2026-04-14  
**Status:** Approved  
**Files affected:**
- `backend/config.py`
- `backend/core/glm_ocr.py`

---

## 1. Problem

`call_zhipu_ocr()` uses the `/files/ocr` endpoint with `tool_type="hand_write"` (handwriting mode).  
For screenshots and digital documents, this mode:

- Drops fraction slashes: `3/4寸` → `34寸`, `1/2寸` → `12寸`
- Misreads table borders as characters
- Has no way to accept domain-specific instructions

The main LLM receives only the OCR text — it never sees the original image. Errors in OCR propagate silently into tool calls (inventory search, price lookup).

---

## 2. Goal

- Replace the OCR step for screenshots with `glm-4.6v` vision model via `chat.completions`
- Domain-aware extraction prompt fixes fraction-slash errors at source
- Keep old `glm-ocr` path intact as silent fallback
- Zero changes to call sites (`routes_chat.py`, `wecom_bot/client.py`)

---

## 3. Design

### 3.1 Switch Mechanism

Same pattern as `llm_selector` fast path:

```
GLM_VISION_MODEL set (non-empty)  →  vision path  (glm-4.6v)
GLM_VISION_MODEL absent / empty   →  old path     (glm-ocr, unchanged)
```

Rollback = remove `GLM_VISION_MODEL` from `.env`. No code change needed.

### 3.2 New Config Keys (`backend/config.py`)

Add after the existing `GLM_OCR_MODEL` line:

```python
# Vision OCR: glm-4.6v via chat.completions (leave empty to keep old glm-ocr path)
GLM_VISION_MODEL: str = os.getenv("GLM_VISION_MODEL", "").strip()
GLM_VISION_API_KEY: str = os.getenv("GLM_VISION_API_KEY", "").strip()   # fallback: ZHIPU_API_KEY
GLM_VISION_BASE_URL: str = os.getenv("GLM_VISION_BASE_URL", "").strip() # fallback: GLM_OCR_BASE_URL
```

Recommended `.env` values:

```
GLM_VISION_MODEL=glm-4.6v
# GLM_VISION_API_KEY=      (leave empty → reuses ZHIPU_API_KEY)
# GLM_VISION_BASE_URL=     (leave empty → reuses GLM_OCR_BASE_URL)
```

### 3.3 Extraction Prompt

The prompt is the primary fix for the fraction-slash problem.

**System prompt** (`_VISION_OCR_SYSTEM`):
```
你是专业文字提取助手。从图片中提取所有文字，严格遵守：
1. 分数寸必须写成分数形式：3/4、1/2、1/4、3/8（禁止写成 34、12、14、38）
2. 管径保留原始写法：DN50、dn50、Φ50
3. 按原始布局输出，表格内容用 | 分隔列
4. 只输出图片中的文字，不添加任何解释或总结
```

**User message**:
```
[{"type": "image_url", "image_url": {"url": "data:{mime};base64,{b64}"}}]
请提取图片中所有文字。
```

Parameters: `temperature=0`, `max_tokens=1500`.

### 3.4 New Function `call_zhipu_vision_ocr()`

Location: `backend/core/glm_ocr.py` (added alongside existing `call_zhipu_ocr`).

```
call_zhipu_vision_ocr(image_bytes, mime, api_key, base_url, model, timeout)
  → str (extracted text) | None (any failure)
```

- Uses `openai.OpenAI` SDK (same SDK already used in project)
- Base URL and API key: `GLM_VISION_API_KEY` / `GLM_VISION_BASE_URL`; fall back to `GLM_OCR_API_KEY` / `GLM_OCR_BASE_URL` if empty
- Any exception → `logger.warning(...)` + `return None` (enables silent fallback)
- Does NOT retry — fallback to `call_zhipu_ocr` is the recovery strategy

### 3.5 Modified `run_ocr_for_attachments()`

```python
for raw, mime in payloads:
    vision_model = (getattr(config, "GLM_VISION_MODEL", "") or "").strip()
    t = None
    if vision_model:
        t = call_zhipu_vision_ocr(raw, mime, vision_api_key, vision_base_url,
                                   vision_model, timeout)
        # t is None → silent fallback below
    if t is None:
        t = call_zhipu_ocr(raw, mime, api_key, base_url, model=ocr_model)
    if t:
        texts.append(t)
```

`vision_api_key` = `GLM_VISION_API_KEY` if set, else `GLM_OCR_API_KEY`  
`vision_base_url` = `GLM_VISION_BASE_URL` if set, else `GLM_OCR_BASE_URL`

### 3.6 Call Flow

```
run_ocr_for_attachments(image_attachments, ...)
       │
       │  for each image:
       ├─ GLM_VISION_MODEL set? ──YES──→ call_zhipu_vision_ocr()
       │                                  · openai.OpenAI chat.completions
       │                                  · image as data-URI base64 in content array
       │                                  · _VISION_OCR_SYSTEM prompt
       │                                  · temperature=0, max_tokens=1500
       │                    ──FAIL/None──→ (fall through)
       │
       └─ call_zhipu_ocr()   ← old path (unchanged), always available as fallback
              │
              └─→ text appended to results
```

---

## 4. What Does NOT Change

- `call_zhipu_ocr()` — not touched
- `routes_chat.py` — zero changes
- `wecom_bot/client.py` — zero changes
- `backend/server/gateway/handlers/chat.py` — zero changes
- Injection format `【以下为上传图片的识别结果】\n{text}` — unchanged
- `MAX_OCR_TEXT_CHARS` truncation — still applies to vision output

---

## 5. Rollback

```bash
# .env — comment out or delete:
# GLM_VISION_MODEL=glm-4.6v
```

Restart backend. Old `glm-ocr` path resumes automatically.

---

## 6. Out of Scope

- Approach A (tool_type fix + regex post-processing) — superseded by this design
- Approach C (direct vision in main LLM ReAct loop) — deferred, larger refactor
- Multi-image batching changes — no change to existing behavior
- Prompt caching for vision calls — deferred
