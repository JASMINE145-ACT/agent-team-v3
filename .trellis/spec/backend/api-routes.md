# API Routes Reference

> All REST API endpoints exposed by the FastAPI backend.

---

## Health

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/health` | — | Health check (GET) |
| HEAD | `/health` | — | Health check (HEAD) |
| GET | `/ip` | — | Returns server public IP for WeCom whitelist |
| GET | `/WW_verify_dEJpsEmvXuoZ2UZG.txt` | — | WeCom domain verification |

---

## Chat / Query

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/query` | — | Single chat query (non-streaming) |
| POST | `/api/master/query` | — | Master agent query (alias) |
| POST | `/api/query/stream` | — | Streaming chat query via SSE |

---

## Sessions

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/sessions` | — | List all sessions |
| POST | `/api/sessions` | — | Create new session |
| DELETE | `/api/sessions/{session_id}` | — | Delete session |

---

## Upload / Quotation

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/quotation/upload` | — | Upload quotation Excel file |
| POST | `/api/quotation/from-text` | — | Generate quotation Excel from text input |
| GET | `/api/quotation/download` | — | Download quotation file |

---

## OOS (Out of Stock)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/oos/stats` | — | OOS statistics summary |
| GET | `/api/oos/list` | — | OOS product list |
| GET | `/api/oos/by-file` | — | OOS grouped by file |
| GET | `/api/oos/by-time` | — | OOS grouped by date |
| POST | `/api/oos/delete` | — | Delete OOS records |
| POST | `/api/oos/add` | — | Add OOS record directly |

---

## Shortage

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/shortage/stats` | — | Shortage statistics |
| GET | `/api/shortage/list` | — | Shortage list |
| GET | `/api/shortage/by-file` | — | Shortage by file |
| GET | `/api/shortage/by-time` | — | Shortage by date |
| POST | `/api/shortage/delete` | — | Delete shortage records |
| POST | `/api/shortage/add` | — | Add shortage record |

---

## Admin — Business Knowledge（requires `X-Admin-Token`）

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/admin/business-knowledge` | ADMIN | 列出所有业务知识记录 |
| PUT | `/api/admin/business-knowledge/{key}` | ADMIN | Upsert 单条业务知识 |

---

## Business Knowledge（Legacy）

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/business-knowledge` | — | Get current knowledge file content |
| PUT | `/api/business-knowledge` | — | Update/replace knowledge content |
| GET | `/api/business-knowledge/dependent-files` | — | Files that depend on this knowledge |

> **注意**：`/api/admin/business-knowledge`（ADMIN）是新接入路径；原有 `/api/business-knowledge` 仍保留供 Agent 内部调用。

---

## Quotation Drafts

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/quotation-drafts` | — | Create quotation draft |
| GET | `/api/quotation-drafts` | — | List quotation drafts |
| GET | `/api/quotation-drafts/stats` | — | Quotation draft statistics |
| GET | `/api/quotation-drafts/{draft_id}` | — | Get draft by ID |
| GET | `/api/quotation-drafts/by-no/{draft_no}` | — | Get draft by draft number |

---

## Replenishment Drafts

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/replenishment-drafts` | — | Create replenishment draft |
| GET | `/api/replenishment-drafts` | — | List replenishment drafts |
| GET | `/api/replenishment-drafts/{draft_id}` | — | Get replenishment draft by ID |
| GET | `/api/replenishment-drafts/by-no/{draft_no}` | — | Get by draft number |
| DELETE | `/api/replenishment-drafts/{draft_id}` | — | Delete replenishment draft |

---

## Admin — Price Library (requires `ADMIN_PASSWORD`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/admin/login` | — | Admin login (exchange password for token) |
| GET | `/api/admin/price-library` | — | Paginated price library |
| POST | `/api/admin/price-library` | — | Insert new price row |
| PUT | `/api/admin/price-library/{row_id}` | — | Update price row |
| DELETE | `/api/admin/price-library/{row_id}` | — | Delete price row |
| POST | `/api/admin/price-library/upload` | — | Upload Excel to replace price library |

Query params (`GET /api/admin/price-library`):
- `q` (string, optional): fuzzy search in material/description
- `page` (int, optional): page number
- `page_size` (int, optional): page size
- `product_type` (string, optional): `国标` / `日标` strict filter
  - invalid value behavior: ignored (fallback to unfiltered) and server logs a warning

---

## Admin — Product Mapping (requires `ADMIN_PASSWORD`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/admin/product-mapping` | — | Paginated product mapping |
| POST | `/api/admin/product-mapping` | — | Insert new mapping row |
| PUT | `/api/admin/product-mapping/{row_id}` | — | Update mapping row |
| DELETE | `/api/admin/product-mapping/{row_id}` | — | Delete mapping row |
| POST | `/api/admin/product-mapping/upload` | — | Upload Excel to replace mapping table |

---

## Admin — Custom Libraries (requires `ADMIN_PASSWORD`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/admin/libraries/upload` | — | Upload custom data library |
| GET | `/api/admin/libraries` | — | List all custom libraries |
| PUT | `/api/admin/libraries/{lib_id}` | — | Update library metadata |
| GET | `/api/admin/libraries/{lib_id}/data` | — | Paginated library data |
| POST | `/api/admin/libraries/{lib_id}/data` | — | Insert row into library |
| PUT | `/api/admin/libraries/{lib_id}/data/{row_id}` | — | Update library row |
| DELETE | `/api/admin/libraries/{lib_id}/data/{row_id}` | — | Delete library row |
| DELETE | `/api/admin/libraries/{lib_id}` | — | Drop entire library |

---

## Reports

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/reports/accurate/ping` | `X-Reports-Token` | Ping Accurate API |
| POST | `/api/reports/tasks/{task_key}/run` | `X-Reports-Token` | Trigger report task run |
| GET | `/api/reports/tasks` | — | List report tasks |
| GET | `/api/reports/records` | — | List report records |
| GET | `/api/reports/records/{record_id}` | — | Get single report record |
| POST | `/api/reports/records/{record_id}/reformat` | `X-Reports-Token` | Reformat report |
| POST | `/api/reports/records/{record_id}/reanalyze` | `X-Reports-Token` | Re-run LLM analysis |
| POST | `/api/reports/reset-stale` | `X-Reports-Token` | Reset stale `running` analyses |

---

## Work / Pipeline

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/work/run` | — | Run work pipeline (non-streaming) |
| POST | `/api/work/run-stream` | — | Run work pipeline (streaming) |
| POST | `/api/work/resume` | — | Resume paused work |
| GET | `/api/work/run-logs/{run_id}` | — | Get run logs for a run |

---

## Activity

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/activity` | — | Get activity logs |

---

## Notify

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/agent/notify` | — | Send notification via WeCom |

---

## WeCom

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/wecom/callback` | — | WeCom verification callback (GET) |
| POST | `/api/wecom/callback` | — | WeCom message callback (POST) |

---

## Tools

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/tools/metrics` | — | Tool registry call metrics |

---

## Config

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/config/price-levels` | — | Get configured price levels |

---

## Debug (only when `DEBUG=true`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/debug/match-select` | — | Run match_quotation_union + llm_select_best with full diagnostics |
| GET | `/api/debug/knowledge` | — | Get current business knowledge file content |

---

## Auth Patterns

| Pattern | Used By |
|---------|---------|
| `X-Admin-Token` header | All `/api/admin/*` routes |
| `X-Reports-Token` header | All `/api/reports/*` routes |
| No auth | Most other routes |
| WeCom signature verification | `/api/wecom/callback` |

---

## WebSocket Gateway (`/ws`)

### Connection Flow

```
1. Client: connect to /ws
2. Server → Client: {type:"event",event:"connect.challenge",payload:{challenge:"..."}}
3. Client → Server: {type:"req",id:"uuid",method:"connect",params:{challenge:"...",clientName:"...",...}}
4. Server → Client: {type:"hello-ok",protocol:1,features:{methods,events}}
5. Normal req/res + event frames
```

### Gateway RPC Methods

| Method | Params | Returns | Description |
|--------|--------|---------|-------------|
| `connect` | `{challenge, clientName, clientVersion, platform, mode, url, token?, password?}` | `hello-ok` frame | Authenticate |
| `chat.send` | `{sessionKey, message, idempotencyKey, attachments?, context?, deliver?}` | SSE stream → final res | Send message |
| `chat.history` | `{sessionKey, limit?}` | `{messages, thinkingLevel?}` | Get history |
| `chat.abort` | `{sessionKey, runId?}` | `{}` | Abort run |
| `sessions.list` | `{}` | `[{key, kind, updatedAt, ...}]` | List sessions |
| `sessions.patch` | `{key, updatedAt}` | `{}` | Update session |
| `sessions.delete` | `{key}` | `{}` | Delete session |
| `agents.list` | `{}` | `[{id, name, ...}]` | List agents |
| `agent.identity.get` | `{}` | `{assistantName, assistantAvatar}` | Get identity |

### Gateway Frame Formats

**Request:**
```json
{ "type": "req", "id": "uuid", "method": "chat.send", "params": {...} }
```

**Response:**
```json
{ "type": "res", "id": "uuid", "ok": true, "payload": {...} }
{ "type": "res", "id": "uuid", "ok": false, "error": { "code": "...", "message": "..." } }
```

**Event:**
```json
{ "type": "event", "event": "chat.event", "payload": {...} }
```

### SSE Events from `chat.send` / `/api/query/stream`

| Event | Key Payload | Frontend Action |
|-------|-------------|-----------------|
| `reset` | `{session_id}` | New session |
| `remember` | `{answer}` | Show remembered message |
| `thinking` | `{content}` | Show thinking |
| `delta` | `{content}` | Append token to stream |
| `tool_call` | `{name, input}` | Show tool call card |
| `tool_result` | `{name, output}` | Show result card |
| `tool_render` | `{id, runId, seq, payload}` | Render formatted card (not message) |
| `agent_event` | `{runId, seq, sessionKey, data}` | Agent custom event |
| `final` | `{message, session_id}` | Final assistant message |
| `error` | `{error}` | Show error |
