# Config Reference

> All environment variables used in the backend, grouped by domain.

---

## LLM — Primary (CoreAgent / ReAct)

| Variable | Default | Description |
|---------|---------|-------------|
| `PRIMARY_LLM_PROTOCOL` | `openai` | `openai` or `anthropic`. Determines which SDK is used for main ReAct loop |
| `ANTHROPIC_BASE_URL` | — | Required when `PRIMARY_LLM_PROTOCOL=anthropic` (e.g. MiniMax Messages endpoint) |
| `ANTHROPIC_API_KEY` | — | API key for Anthropic protocol |
| `OPENAI_BASE_URL` | `https://open.bigmodel.cn/api/paas/v4` | OpenAI-compatible base URL (Zhipu by default) |
| `OPENAI_API_KEY` | — | API key for OpenAI-compatible endpoint |
| `MINIMAX_BASE_URL` | — | MiniMax OpenAI-compatible `/v1` endpoint |
| `MINIMAX_API_KEY` | — | MiniMax API key |
| `ZHIPU_API_KEY` | — | Zhipu GLM API key |
| `LLM_MODEL` | `glm-4.5-air` | Primary LLM model name |
| `LLM_MAX_TOKENS` | `40000` | Max tokens per response |
| `REACT_MAX_STEPS` | `12` | Max ReAct loop steps per turn |
| `USE_CLAUDE_LOOP_PROMPT` | `true` | Enable prompt constraints for Claude loops |
| `USE_DECISION_RULE_SKILLS` | `true` | Use RULES版 skills (stronger constraints) vs DOC版 |

### Fallback LLM
| Variable | Default | Description |
|---------|---------|-------------|
| `FALLBACK_BASE_URL` | — | Fallback endpoint when primary fails |
| `FALLBACK_API_KEY` | — | Fallback API key |
| `FALLBACK_MODEL` | — | Fallback model name |

---

## LLM — Selector (match_quotation LLM selection)

| Variable | Default | Description |
|---------|---------|-------------|
| `LLM_SELECTOR_MAX_TOKENS` | `3000` | Token budget for `llm_select_best` |
| `LLM_SELECTOR_TIMEOUT` | `40` | Timeout in seconds for selector LLM call |
| `LLM_SELECTOR_MODEL` | — | Fast-path model (e.g. `gpt-4o-mini`). Empty = use default |
| `LLM_SELECTOR_API_KEY` | — | API key for fast-path selector |
| `LLM_SELECTOR_BASE_URL` | — | Base URL for fast-path selector |
| `LLM_SELECTOR_FAST_OUTPUT_TOKENS` | `500` | Max output tokens for fast-path selector |

> **Critical**: If `LLM_SELECTOR_MODEL` contains "minimax", it **must** use `MINIMAX_BASE_URL` (not Zhipu URL), otherwise error 1211 "model not found".

---

## LLM — Summary (context compression)

| Variable | Default | Description |
|---------|---------|-------------|
| `SUMMARY_LLM_MODEL` | `gpt-4o-mini` | Model for compressing conversation history |
| `SUMMARY_LLM_BASE_URL` | — | Leave empty to reuse `OPENAI_BASE_URL` |
| `SUMMARY_LLM_API_KEY` | — | Leave empty to reuse `OPENAI_API_KEY` |

---

## LLM — OCR / Vision

| Variable | Default | Description |
|---------|---------|-------------|
| `GLM_OCR_ENABLED` | `true` | Enable Zhipu OCR for image input |
| `GLM_OCR_API_KEY` | — | Zhipu OCR API key (defaults to `OPENAI_API_KEY`) |
| `GLM_OCR_BASE_URL` | `https://open.bigmodel.cn/api/paas/v4` | Zhipu OCR base URL |
| `GLM_OCR_MODEL` | `glm-ocr` | OCR model |
| `GLM_VISION_MODEL` | — | Vision model (e.g. `glm-4.6v`) for chat.completions |
| `MAX_IMAGE_SIZE_MB` | `5` | Max image size in MB (capped at 8MB) |
| `MAX_OCR_IMAGES_PER_REQUEST` | `3` | Max images per OCR request |

---

## Inventory / Wanding

| Variable | Default | Description |
|---------|---------|-------------|
| `PRICE_LIBRARY_PATH` | auto-detected | Path to Wanding price library Excel |
| `MAPPING_TABLE_PATH` | `data/整理产品(2).xlsx` | Product mapping table path |
| `WANDING_BUSINESS_KNOWLEDGE_PATH` | `data/wanding_business_knowledge.md` | Business knowledge file for selector |
| `ENABLE_WANDING_VECTOR` | `1` | Enable vector similarity fallback in Wanding matching |
| `WANDING_VECTOR_TOP_K` | `3` | Vector top-k for coarse screening |
| `WANDING_VECTOR_MIN_SCORE` | `0.65` | Vector similarity threshold |
| `INVENTORY_LLM_MODEL` | — | Override LLM model for inventory tools |
| `INVENTORY_LLM_BASE_URL` | — | Override base URL for inventory LLM |
| `INVENTORY_LLM_API_KEY` | — | Override API key for inventory LLM |
| `INVENTORY_DEMO_MODE` | `0` | Return mock inventory when AOL unavailable |
| `INVENTORY_MODIFY_ENABLED` | `0` | Enable actual inventory writes (lock/supplement) |
| `MATCH_QUOTATION_BATCH_MIN_ITEMS` | `3` | Min items to trigger batch matching |

---

## Database

| Variable | Default | Description |
|---------|---------|-------------|
| `DATABASE_URL` | — | Neon PostgreSQL connection string (from project root `.env`) |
| `AOL_ACCESS_TOKEN` | — | Required for inventory API calls |
| `AOL_SIGNATURE_SECRET` | — | AOL signature secret |
| `AOL_DATABASE_ID` | — | AOL database ID |
| `QUOTATION_DB_PATH` | `data/out_of_stock.db` | Local SQLite for OOS (fallback when no `DATABASE_URL`) |

---

## File Upload

| Variable | Default | Description |
|---------|---------|-------------|
| `UPLOAD_DIR` | `uploads/` | Uploaded file directory |
| `MAX_UPLOAD_MB` | `200` | Max upload file size |
| `QUOTATION_TEMPLATE_PATH` | auto-detected | Excel template for text-to-quotation |

---

## Session / Memory

| Variable | Default | Description |
|---------|---------|-------------|
| `SESSION_MAX_TURNS` | `20` | Max conversation turns before compaction |
| `SESSION_INJECT_TURNS` | `4` | Recent turns to inject into context |
| `SESSION_INJECT_ANSWER_TRIM` | `2000` | Max chars per injected answer |
| `SESSION_ANSWER_TRIM` | `2000` | Max chars per answer in history |
| `SESSION_STORE_DIR` | `data/sessions/` | Session JSON storage directory |
| `SESSION_TITLE_MODEL` | `glm-4.5-air` | Model for generating session titles |

---

## Batch / Work

| Variable | Default | Description |
|---------|---------|-------------|
| `BATCH_QUOTE_MAX_ITEMS` | `100` | Max items per `batch_quick_quote` |
| `BATCH_QUOTE_TIMEOUT_SEC` | `40` | Timeout for batch quote |
| `WORK_USE_PIPELINE` | `true` | Use pipeline mode for work executor |
| `WORK_RUN_ID_TTL_SECONDS` | `3600` | TTL for work run IDs |
| `WORK_SINGLE_CAND_USE_LLM` | `0` | Use LLM even when single candidate |
| `WORK_MATCH_MAX_WORKERS` | `5` | Max parallel workers for work matching |

---

## OOS (Out of Stock)

| Variable | Default | Description |
|---------|---------|-------------|
| `USE_WUHOU_CONTEXT_MODE` | `false` | `true` = rules first + LLM context; `false` = full table to LLM |
| `WUHOU_CONTEXT_ROWS` | `2` | Rows around OOS row for context mode |
| `TOOL_RESULT_MAX_CHARS` | `20000` | Max chars returned by OOS tools |
| `TOOL_EXEC_TIMEOUT` | `35` | Tool execution timeout in seconds |
| `MAX_TABLE_ROWS_FOR_LLM` | `500` | Max rows sent to LLM (0 = no limit) |
| `MIN_DATA_SECTION_ROWS` | `20` | Min rows to keep when truncating |

---

## Email / Notifications

| Variable | Default | Description |
|---------|---------|-------------|
| `EMAIL_RECIPIENTS` | — | Comma-separated email addresses |
| `EMAIL_SMTP_HOST` | — | SMTP server |
| `EMAIL_SMTP_PORT` | `587` | SMTP port |
| `EMAIL_FROM` | — | From address |
| `EMAIL_USERNAME` | — | SMTP username |
| `EMAIL_PASSWORD` | — | SMTP password |
| `GMAIL_REFRESH_TOKEN` | — | Gmail OAuth refresh token |
| `GMAIL_CLIENT_ID` | — | Gmail OAuth client ID |
| `GMAIL_CLIENT_SECRET` | — | Gmail OAuth client secret |
| `OOS_ALERT_MODE` | `email_only` | `email_only` \| `wecom_only` \| `both` |
| `EMAIL_COOLDOWN_HOURS` | `24` | Hours between repeat alert emails |

---

## WeCom

| Variable | Default | Description |
|---------|---------|-------------|
| `WECOM_TOKEN` | — | WeCom verification token |
| `WECOM_AES_KEY` | — | WeCom AES key |
| `WECOM_CORP_ID` | — | WeCom corp ID |
| `WECOM_AGENT_ID` | — | WeCom agent ID |
| `WECHAT_EXCEL_FULL_PARSE_ENABLED` | `true` | Enable full Excel parsing in WeCom |
| `WECOM_FILE_DOWNLOAD_TIMEOUT` | `60` | File download timeout (seconds) |

---

## LangSmith (Optional)

| Variable | Default | Description |
|---------|---------|-------------|
| `LANGSMITH_TRACING` | `false` | Enable LangSmith tracing |
| `LANGSMITH_API_KEY` | — | LangSmith API key |
| `LANGSMITH_PROJECT` | `agent-jk-v3` | LangSmith project name |

---

## Reports

| Variable | Default | Description |
|---------|---------|-------------|
| `REPORTS_ADMIN_TOKEN` | — | Token for `/api/reports/reset-stale` endpoint |

---

## Admin

| Variable | Default | Description |
|---------|---------|-------------|
| `ADMIN_PASSWORD` | — | Password for `/api/admin/*` endpoints. Unset = admin API disabled |
| `DEBUG` | `false` | Enable debug routes at `/api/debug/*` |

---

## .env Loading Order

```
backend/tools/oos/.env
    ↓
backend/.env
    ↓ (override)
agent-jk root/.env
```

The **project root `.env`** (at `Agent Team version3/.env`) takes highest priority. This is where `DATABASE_URL` must be set.

---

## How Config Is Read

- **Main backend** (`config.py`): `load_dotenv` with override=True, so root `.env` wins
- **Inventory tools** (`tools/inventory/config.py`): Loads `.env` from agent team root + inventory dir
- **OOS tools** (`tools/oos/config.py`): Loads own `.env` only
- **Graceful degradation**: If `DATABASE_URL` is not set, all DB functions return empty results — never crash

---

## Critical Rules

1. **Never hardcode credentials** — always use env vars
2. **`LLM_MODEL` containing "minimax" + Zhipu URL = 1211 error** — must use MiniMax endpoint
3. **`ENABLE_TOOL_DEFER=false` (default)** — all tools are immediately loaded
4. **`DEBUG=false` (default)** — `/api/debug/*` routes are disabled in production
5. **`INVENTORY_MODIFY_ENABLED=0` (default)** — `modify_inventory` only simulates, no actual writes
