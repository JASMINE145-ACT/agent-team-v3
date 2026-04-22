# Backend Development Guidelines

> Best practices for backend development in Agent Team version3.

---

## Overview

Agent Team version3 is a **single-agent ReAct system** providing quotation, inventory lookup, OOS registration, and ERP modification tools.
The backend is organized into `core/` (pure infrastructure) and `tools/` (business logic).

---

## Guidelines Index

| Guide | Description | Status |
|-------|-------------|--------|
| [Directory Structure](./directory-structure.md) | Module organization and file layout | ✅ Filled |
| [Error Handling](./error-handling.md) | Tool error categories, result shapes, rework flow | ✅ Filled |
| [Quality Guidelines](./quality-guidelines.md) | Required shapes, forbidden patterns, logging, testing | ✅ Filled |
| [Logging Guidelines](./logging-guidelines.md) | Structured logging, log levels | ✅ Filled |
| [Database Guidelines](./database-guidelines.md) | Session persistence, JSON file storage, Neon table schemas | ✅ Filled |
| [Skills System](./skills-system.md) | skills.py architecture, routing rules, customer level mapping | ✅ Filled |
| [Config Reference](./config-reference.md) | All environment variables grouped by domain | ✅ Filled |
| [Tools Catalog](./tools-catalog.md) | All tools with schemas, return shapes, access patterns | ✅ Filled |
| [API Routes + Gateway](./api-routes.md) | All REST endpoints + WebSocket gateway methods + SSE events | ✅ Filled |

---

## Key Architecture Points

### Single-Agent ReAct Loop
All tools are exposed through a single `CoreAgent` ReAct loop. No multi-agent orchestration in this project.

### Reasoning/Thinking 显示链路（2026-04）

**两条独立 reasoning**：
1. **Model Thinking**：`MiniMax ThinkingBlock`（或 `</think>` XML 标签），在 `CoreAgent` 中经 `_blocks_to_content_and_tool_calls` → `thinking_parts` → `save_turn(thinking=...)` → `chat.history` → 前端渲染。用户看到的是模型意图判断/选工具/参数填写的链式推理。
2. **Selector Reasoning**：`llm_selector` / `match_quotation` 返回的 `selection_reasoning`（`inventory_agent_tools.py` L187），当前技能 prompt（`skills.py` L383）明确指示「由 UI 直接渲染，模型不需要在 think 里复述」，所以模型只展示「选了哪个 + 价格」而不把 selector reasoning 写进正文。若要显式带出，需改技能 prompt + 在 `agent.py` L802 把 `selection_reasoning` 从 JSON 提出来追加到 observation 文本后（Option A Plan）。

**会话持久化**：`CoreAgent.execute_react` 的 `save_turn` 必须显式传 `thinking=...`（H3 修复），否则 `chat.history` 刷新后无 reasoning。

**前端默认行为**：若会话未显式设置 `reasoningLevel`，则 `reasoningLevel ?? "off"` 会被当成 off，不展示 thinking（`chat.ts` L273 修复为 `!== "off"`）。

### PRIMARY_LLM_PROTOCOL 与主对话端点（2026-04）

- **`PRIMARY_LLM_PROTOCOL=openai`（默认）**：`CoreAgent` 使用 OpenAI SDK **`chat.completions`**，凭据/基址来自 `OPENAI_API_KEY`、`OPENAI_BASE_URL`（智谱或 MiniMax `/v1` 等由 `config.py` 解析）。
- **`PRIMARY_LLM_PROTOCOL=anthropic`**：主 ReAct 应走 **Anthropic SDK `messages`**（如 MiniMax `ANTHROPIC_BASE_URL`，例如 `https://api.minimaxi.com/anthropic`），凭据用 `ANTHROPIC_API_KEY`（可与 `MINIMAX_API_KEY` 同源）。应用启动用 **`get_primary_react_llm_credentials()`** 取 `(api_key, base_url)`，勿再写死仅 `OPENAI_*`。
- **`get_openai_client(..., anthropic_messages=True)`**：仅 **CoreAgent** 在确认走 Anthropic 路径时传入；Work 管道、报价解析等调用 **`get_openai_client()` 勿传该参数**，避免拿到 Anthropic client 却调用 `chat.completions`。
- **`_should_use_anthropic_messages_api(base_url)`**：`anthropic` 协议且 **base_url 不含 `bigmodel.cn`** 时才用 Anthropic SDK；显式智谱 URL 的测试/调用仍走 `chat.completions`。
- **智谱 1211**：勿把 **MiniMax 模型名** 发到智谱 OpenAI 兼容层。若 URL 为智谱且 `LLM_MODEL` 像 MiniMax，`CoreAgent` 会将 **`self.model` 改为 `OPENAI_MODEL` / `CHAT_LLM_MODEL` / `glm-4.5-air`**。详见 `.env.example` 注释。

### match_quotation 与选型 LLM（2026-04）
- Single candidate → returns `single` with `chosen` directly（不调选型 LLM）
- Multiple candidates → `_execute_match_quotation` 内部调用 `llm_select_best`；成功则 `single`+`chosen`；失败则 `needs_selection`（或带 `llm_error`）
- No match → `unmatched` / `needs_selection` 等
- Selector token budget uses `LLM_SELECTOR_MAX_TOKENS`（default `3000`）; on `finish_reason=length`, parser first attempts truncated `reasoning_content` recovery (`index/reason`) before rule fallback.

`match_wanding_price` 多候选时仅 `needs_selection`，需另调 `select_wanding_match`（`llm_select_best`）。`skills.py` 仍约束用户在需人工确认时的行为。

### Agent Behavior Control: skills.py is the Source of Truth
**CRITICAL**: Agent behavior (tool calling logic, prompt instructions) is controlled by `backend/plugins/jagent/skills.py` — NOT `agent_runner.py`.
- `JAgentExtension.get_skill_prompt()` returns content from `skills.py` (e.g. `SKILL_INVENTORY_PRICE_DOC/RULES`)
- These prompts are what actually get injected into the LLM's system prompt
- `agent_runner.py`'s `_SYSTEM_PROMPT` is only used for standalone ReAct tool execution
- **Any Agent behavior change MUST be made in `skills.py` and requires backend restart**
- `skills.py` changes are NOT hot-reloaded

### Rework Mechanism
User says "错了"/"不对" → agent detects rework intent → presents candidates → user confirms → `record_correction_to_knowledge` writes to knowledge base.

### Weekly reports: `analysis_status` and process restarts (2026-04)

Phase-2 LLM analysis runs in a **daemon thread** (`run_llm_analysis` from `runner.py` / `reanalyze`). If the process exits while `analysis_status='running'`, no thread completes the update — the row stays `running` forever and the control UI polls until timeout.

**Mitigations in code** (see `backend/reports/models.py`, `app.py` startup, `routes_reports.py`):

- On **application startup**, call `reset_stale_running_analyses()` to set any remaining `running` → `failed` (orphaned work).
- Optional **manual** repair: `POST /api/reports/reset-stale` with `x-reports-token`.
- LLM call uses an explicit **HTTP timeout** on the Anthropic client so analysis does not hang indefinitely without a terminal status.

Frontend polling uses a **soft** `loadReportDetail` mode so the detail view does not toggle full-page loading on every poll.

### Tools via AgentExtension
Business tools register via `AgentExtension.register(ctx)` → `ctx.register_tool(definition, handler)`.
Skills layer (`plugins/jagent/skills.py`) provides `SKILL_KNOWLEDGE_DOC` and `SKILL_KNOWLEDGE_RULES` for LLM guidance.

---

## Language

All documentation is in **English**. Code comments may use Chinese for domain-specific terms.
