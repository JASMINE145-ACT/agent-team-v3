## Session: 2026-04-01 — LLM 四角色策略（MiniMax / GLM-4.5-air / gpt-4o-mini / glm-ocr）

- Updated `backend/config.py`: default `LLM_MODEL` and Zhipu+MiniMax conflict fallback to `glm-4.5-air`; clarified comments for FALLBACK vs SUMMARY.
- `work_executor`: `_work_context_summarizer()` uses `SUMMARY_LLM_*`; primary model default `MiniMax-M2.7`.
- Replaced hardcoded `glm-4-flash` / `gpt-4o` defaults in `text_to_inquiry`, `chat.py` session title, `spec_extract`, `llm_selector`, `spec_extractor`, `oos` config/agent_runner, `inventory/lib/agents/llm_config.py`.
- `.env.example` + `claude.md` + `.cursorrules` + `.trellis/spec/backend/index.md`: documented chat four-model policy and embedding exception; corrected `match_quotation` vs `match_wanding_price` behavior.
- `llm_selector`: info log on selection call; restored `Snapshot` in `session.py` for test imports.
- Tests: updated `test_auto_llm_selector.py`, `test_llm_selector_two_step.py`; `oos/tests/test_glm_model.py` accepts glm-4.5-air.
- Full `pytest tests/`: 109 passed; 5 failures in unrelated files (pre-existing doom-loop mocks, wanding private, alert).

## Session: 2026-04-01 Tool-call Stall + Reasoning Visibility Fix

- Fixed Anthropic-compatible ReAct parsing in `backend/core/anthropic_react_llm.py`:
  - Robust XML `<tool_call>...</tool_call>` extraction from both plain string content and text blocks.
  - Converts parsed XML calls into native tool-call structures so step-2 runs.
  - Strips XML payload from user-visible text to avoid raw tool markup output.
- Added parser regression tests in `tests/test_anthropic_react_messages.py`:
  - XML tool-call in text block is extracted and converted.
  - XML tool-call in raw string content is extracted and converted.
- Fixed missing reasoning-level persistence and display:
  - `backend/server/gateway/handlers/sessions.py`: `sessions.patch` now persists `thinkingLevel` / `reasoningLevel` / `verboseLevel`; `sessions.list` returns all three.
  - `backend/agent/session.py`: turn schema supports optional `thinking`; `save_turn` persists thinking; session list reads persisted label and levels.
  - `backend/core/agent.py`: saves accumulated `thinking_parts` into session turns.
  - `backend/server/gateway/handlers/chat.py`: `chat.history` now returns assistant `thinking` block (when present) plus text block, and includes level fields.
- Added gateway tests in `tests/test_gateway_reasoning_visibility.py`:
  - Confirms saved thinking appears in `chat.history`.
  - Confirms patched levels are persisted and surfaced in `sessions.list` / `chat.history`.
- Validation:
  - `pytest -q tests/test_gateway_reasoning_visibility.py tests/test_anthropic_react_messages.py` -> passed.
  - `pytest -q tests/test_chat_language.py` -> passed.
## Session: 2026-04-01 Unified Reply Format (Disable 4-Phase Output)

- Standardized chat output format to avoid exposing `Plan/Gather/Act/Verify` in user-visible replies.
- Updated defaults:
  - `backend/config.py`: `USE_CLAUDE_LOOP_PROMPT` default switched from `true` to `false`.
  - `backend/plugins/jagent/extension.py`: fallback default for `getattr(Config, "USE_CLAUDE_LOOP_PROMPT", ...)` switched to `False`.
- Added answer post-processing guard in `backend/core/agent.py`:
  - New `_normalize_user_answer()` removes leaked loop-phase headings such as `1. Plan`, `2. Gather Context`, `3. Act`, `4. Verify Results`.
  - Applied before final response persistence and return.
- Added regression tests:
  - `tests/test_answer_format_normalization.py` verifies heading removal while preserving result content.
- Validation:
  - `pytest -q tests/test_answer_format_normalization.py tests/test_gateway_reasoning_visibility.py tests/test_anthropic_react_messages.py tests/test_chat_language.py` -> passed (20 tests).
## Session: 2026-04-01 Fix BigModel 1211 (Model Not Found)

- Root cause: `backend/config.py` had regressed to OpenAI-only routing and no longer honored `PRIMARY_LLM_PROTOCOL=anthropic`.
- In this environment, `.env` sets `LLM_MODEL=MiniMax-M2.7`; without anthropic routing, requests were sent to BigModel OpenAI endpoint and failed with `code=1211`.
- Fixes in `backend/config.py`:
  - Restored protocol switch support: `PRIMARY_LLM_PROTOCOL` with `openai|anthropic`.
  - Added `ANTHROPIC_API_KEY` and `ANTHROPIC_BASE_URL` config fields used by `CoreAgent` anthropic path.
  - Improved OpenAI base/API-key routing fallback order.
  - Added compatibility fallback: if endpoint is Zhipu + model looks MiniMax + protocol is not anthropic, auto-fallback to `OPENAI_MODEL/CHAT_LLM_MODEL`.
  - Added `SESSION_TITLE_MODEL` default to `OPENAI_MODEL` to avoid session-title calls using provider-incompatible model ids.
- Verified effective runtime config:
  - `PRIMARY_LLM_PROTOCOL=anthropic`
  - `LLM_MODEL=MiniMax-M2.7`
  - `ANTHROPIC_BASE_URL=https://api.minimaxi.com/anthropic`
  - `OPENAI_BASE_URL=https://open.bigmodel.cn/api/paas/v4/`
- Regression checks:
  - `pytest -q tests/test_answer_format_normalization.py tests/test_gateway_reasoning_visibility.py tests/test_anthropic_react_messages.py tests/test_chat_language.py` -> passed (20 tests).

## Session: 2026-04-02 — CoreAgent Anthropic Messages 主链路（智谱 1211 完整落地）

**现象**：`PRIMARY_LLM_PROTOCOL=anthropic` + `LLM_MODEL=MiniMax-M2.7` 时，若仍用 OpenAI `chat.completions` 打智谱 `OPENAI_BASE_URL`，智谱返回 **1211 模型不存在**。

**根因**：`app.py` 曾用 `OPENAI_*` 初始化 `CoreAgent`，未把主对话切到 **Anthropic Messages**（MiniMax `…/anthropic`）；`anthropic_react_llm.py` 已有 helper 但未接入 `execute_react`。

**实现要点**（代码已合入）：

- `backend/core/llm_client.py`：`get_openai_client(..., anthropic_messages=False)`；仅 CoreAgent 传 `True` 时返回 **Anthropic SDK**（其它 Work/报价解析等仍用 OpenAI client，避免全局误切）。
- `backend/core/agent_helpers.py`：`call_anthropic_react_streaming_sync` / `call_anthropic_react_non_streaming_sync`，与 OpenAI 侧 `kwargs` 形状对齐。
- `backend/core/agent.py`：
  - `_should_use_anthropic_messages_api(base_url)`：`PRIMARY_LLM_PROTOCOL=anthropic` **且** `base_url` **不含** `bigmodel.cn` 时才走 Anthropic（单测显式传智谱 URL 时仍走 `chat.completions`）。
  - `execute_react` 流式/非流式分支：`call_anthropic_react_*` vs `call_llm_streaming_sync` / `chat.completions`；**`except` 顺序**：超时类须在泛型 `Exception` 之前，保证 fallback 可达。
  - 智谱 URL + `LLM_MODEL` 含 `minimax`：将 `self.model` 改为 `OPENAI_MODEL` / `CHAT_LLM_MODEL` / `glm-4.5-air`，避免 env 仍为 MiniMax 名时打智谱 1211。
- `backend/config.py`：`get_primary_react_llm_credentials()` → `anthropic` 时用 `ANTHROPIC_*`，否则 `OPENAI_*`。
- 启动与兼容入口：`backend/server/api/app.py`、`start_wecom_bot.py`、`backend/agent/agent.py`、`cli_agent.py` 使用 primary credentials（`SingleAgent`/CLI 不再强行绑死智谱 key）。
- `tests/test_integration_agent_react.py`：Live anthropic 用 `get_primary_react_llm_credentials()`，断言 `_use_anthropic` 与 `isinstance(client, Anthropic)`。
- `.env.example`：补充「智谱 + MiniMax 模型名」时运行时会改用 `OPENAI_MODEL` 的说明。

**验证**：`pytest` 覆盖 `test_core_glm_query`、`test_anthropic_react_messages`、`test_answer_format_normalization`、`test_integration_agent_react`（live 可能 skip）。

**运维**：改 `.env` 后需 **重启后端**；主对话应打 **MiniMax Anthropic**（`messages`），而非智谱 + MiniMax 模型 id。

## Session: 2026-04-03 — Reasoning 显示修复 + Selector Reasoning 需求确认

### 现象
前端助手消息不显示 reasoning。用户以为 reasoning 没出来，实际出来了但不是想要的。

### 调试过程（Debug Mode，7 个假设）

使用运行时日志（NDJSON → `debug-d5441f.log`）并行验证：

| 假设 | 结论 | 依据 |
|------|------|------|
| H1: MiniMax ThinkingBlock 在 `anthropic_react_llm` 解析丢失 | **不成立** | `thinking_parts_len=1`，thinking 已被正确提取 |
| H2: `agent.py` `<think>` 标签提取后 `thought` 为空 | **不成立** | `had_think_tag=true`，`thought_len=392~678` |
| H3: `execute_react` 结果 `thinking` 长度为 0 | **不成立** | `thinking_len=1071`，完整保留 |
| H4: `routes_chat.py` 流式 `loop_end` 事件丢 thinking | **不成立** | SSE 路径 `loop_end` 有正确 `thinking` 字段 |
| H5: SSE 终止事件类型/载荷被前端忽略 | **不成立** | SSE 路径本身完整 |
| H6: `gateway chat.send` `execute_react` 返回 `thinking` 为空 | **不成立** | `thinking_len=1071` |
| **H7**: **`gateway chat.send` final 事件未携带 `message/thinking`** | **成立（根因1）** | `includes_thinking=false`，final 事件只发 `state`，无 `message` |

### 根因定位（两条）

**根因 1（后端）**：`backend/server/gateway/handlers/chat.py` 的 `handle_chat_send`，final `chat` 事件只发了 `{"state": "final"}`，**没有 `message` 载荷**，前端自然收不到 thinking。

**根因 2（前端）**：
- `control-ui/src/ui/views/chat.ts`：`reasoningLevel ?? "off"` 把「未设置」当 `off`，只要会话没手动设置 `reasoningLevel` 就永远不展示 reasoning。
- `grouped-render.ts`：若气泡只有 thinking、没有正文文本，代码提前 `return nothing`，连 thinking 也画不出来。

**根因 3（持久化）**：`CoreAgent.execute_react` 的 `save_turn(...)` 原本**没有传 `thinking`**，导致 `chat.history` 刷新后也拿不到 thinking（只有非流的 `/api/query` 路径用 `result["thinking"]`）。

### 已应用修复（代码已合入）

1. **`backend/server/gateway/handlers/chat.py`**：final `chat` 事件补 `message: {"role": "assistant", "content": [{"type": "thinking", "thinking": ...}, {"type": "text", "text": ...}]}`（H7 修复）。
2. **`backend/core/agent.py`**：`save_turn(..., thinking=thinking_for_store)` 把 accumulated `thinking_parts` 写入会话持久化（H3 修复）。
3. **`control-ui/src/ui/views/chat.ts`**：`reasoningLevel !== "off"` 改为 `activeSession?.reasoningLevel !== "off"`（未设置的会话默认展示）。
4. **`control-ui/src/ui/chat/grouped-render.ts`**：空气泡判断加 `!reasoningMarkdown`，允许仅有 thinking 的气泡显示。
5. **调试日志埋点已全部移除**，`py_compile` 验证通过。

### 用户新需求：Selector Reasoning

**现状**：界面里出现的 reasoning 是模型自己的**链式思考**（意图判断、选工具、参数怎么填），来自 MiniMax `ThinkingBlock`。

**用户实际想要**：工具返回的 **LLM selector 为什么选这个产品** 的理由，即：
- `llm_selector.py` 产生的 `reasoning` 字段
- `match_quotation` 返回 JSON 里的 `selection_reasoning`（`inventory_agent_tools.py` L187）
- `select_wanding_match` 候选 items 里的 `reasoning`

**为什么没有出来**：技能 prompt（`skills.py` L383）明确指示「`selection_reasoning` 由 UI 直接渲染，模型不需要在 think 里复述」——所以模型只展示「选了哪个 + 价格」，不会把 selector reasoning 写进正文。

**Option A Plan（回答里显式带出）**：
- `backend/plugins/jagent/skills.py`：把「不需要复述」指令改为「`selection_reasoning` / `reasoning` 存在时，在最终回答正文里用『选型依据：<理由>』格式体现」。
- `backend/core/agent.py` L802 附近：在 tool observation 入消息之前，把 `selection_reasoning` 从 JSON 里提出来，拼成 `【选型依据】<理由>` 追加到 observation 文本后，让模型在下一轮自然把它写进 answer。

**未决定**：是放在 answer 正文里（Option A）还是单独一块 UI（Option B）——用户倾向 Option A，等待确认后实施。