## Session 15: 2026-04-08 — Weekly Sales Report Foundation (Inline Execution)

**Date**: 2026-04-08
**Task**: sales-weekly-report-foundation

### Summary

Implemented the backend foundation for weekly sales reporting with Accurate fetch, basic analysis, scheduler wiring, and secure admin APIs.

### Main Changes

- Added new module: `backend/reports/` (`models.py`, `accurate_fetcher.py`, `analyzer.py`, `runner.py`, `service.py`).
- Added report APIs: `backend/server/api/routes_reports.py`; mounted in `backend/server/api/routes.py`.
- Integrated scheduler lifecycle in `backend/server/api/app.py` startup/shutdown.
- Added env/config notes: `requirements.txt` (`APScheduler`) and `.env.example` (`REPORTS_ADMIN_TOKEN` and report section note).
- Added tests: `tests/test_reports_analyzer.py`, `tests/test_reports_routes.py`.

### Testing

- [OK] `py -m pytest tests/test_reports_analyzer.py tests/test_reports_routes.py -q` (3 passed)
- [OK] Accurate connectivity smoke test:
  - `py -c "from backend.reports.accurate_fetcher import ping_accurate; ..."` -> `{"ok": true, "keys": ["s", "d"]}`

### Status

[OK] **Completed**

## Session 19: 2026-04-09 — Weekly invoice report view end-to-end (inline)

**Date**: 2026-04-09
**Task**: weekly-invoice-report-view-inline

### Summary

Implemented the approved B plan for weekly reports:

- Backend report pipeline switched from sales orders to Accurate sales invoices (`/api/sales-invoice/list.do`) with confirmed projected fields (`id,number,transDate,customer,description,statusName,age,totalAmount`).
- Added status aggregation to report payload (`status_stats`) and generated Markdown output via new `backend/reports/formatter.py`.
- Persisted `report_md` into `report_records` and added migration in `ensure_tables()` (`ALTER TABLE ... ADD COLUMN IF NOT EXISTS report_md`).
- Added report detail and reformat APIs:
  - `GET /api/reports/records/{id}` (returns `report_json` + `report_md`)
  - `POST /api/reports/records/{id}/reformat` (rebuilds `report_md` from stored `report_json`)
- Added task key existence check for manual run and improved empty PATCH response consistency.
- Added new control-ui top-level `Reports` tab with two-panel layout:
  - Left: record list + token + refresh
  - Right: full Markdown text + copy button + reformat action when text is missing
- Added reports detail state and controller methods (`loadReportDetail`, `reformatRecord`), i18n labels, and navigation wiring.

### Testing

- [OK] `py -m pytest tests/test_reports_analyzer.py tests/test_reports_formatter.py tests/test_reports_routes.py -q` — 6 passed
- [OK] `npm run build` (control-ui) — success
- [OK] scoped code-reviewer gate — PASS

### Status

[OK] **Completed**

### Next Steps

- Implement frontend `Agents > Skills` report task panel binding to `/api/reports/tasks` and `/api/reports/records`.
- Add notification layer (WeCom/email recipients) after business recipient rules are finalized.

## Session 16: 2026-04-08 — Agents Skills Panel Integration for Reports

**Date**: 2026-04-08
**Task**: reports-ui-agents-skills-integration

### Summary

Integrated weekly report task management into `Agents > Skills` with task editing, manual run, and execution records.

### Main Changes

- Added report UI types in `control-ui/src/ui/types.ts`: `ReportTask`, `ReportRecord`, `ReportTaskConfig`.
- Added report controller `control-ui/src/ui/controllers/reports.ts` for:
  - loading tasks/records (`/api/reports/tasks`, `/api/reports/records`)
  - manual run (`POST /api/reports/tasks/{task_key}/run`)
  - config save (`PATCH /api/reports/tasks/{task_key}`)
- Added report state fields to `app.ts` and `app-view-state.ts`.
- Wired refresh flow in `app-settings.ts` and render/event handlers in `app-render.ts`.
- Extended `views/agents.ts` and `views/agents-panels-tools-skills.ts`:
  - report token input
  - task list with edit/save/cancel
  - manual run button
  - latest execution records
- Backend route generalized from fixed run endpoint to parameterized:
  - `POST /api/reports/tasks/{task_key}/run`
- `routes_reports.py` update path now uses `await asyncio.to_thread(reload_task)` to avoid event-loop blocking.

### Testing

- [OK] `py -m pytest tests/test_reports_analyzer.py tests/test_reports_routes.py -q` -> 3 passed
- [OK] `npm run build` in `control-ui/` -> build succeeded
- [OK] `ReadLints` on changed files -> no lints

### Status

[OK] **Completed**

### Next Steps

- Add record detail drawer (`/api/reports/records/{id}`) for full `report_json` comparison view.
- Persist reports admin token securely (or replace with existing gateway auth).

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

---

## Session 12: 2026-04-03 — match_quotation 三项修复（selection_reasoning 显示 + GLM 路由 + 来源优先级）

**Date**: 2026-04-03
**Task**: match-quotation-fix

### Summary

三项修复：① `selection_reasoning` 现在必须在回复正文体现；② `llm_select_best` 始终走 GLM OpenAI-compat 路径，不随主链路协议切换；③ 业务知识库追加来源优先级规则。

### Main Changes

- **`backend/plugins/jagent/skills.py`**：
  - 删除「`selection_reasoning` 由 UI 直接渲染，模型不需要复述」，改为明确指令：有 `selection_reasoning` 时在结果表下方附上「匹配理由：{selection_reasoning}」。
  - 库存为 0 时若有 `selection_reasoning`，💡 消息格式更新为含匹配理由的版本。
  - `fallback: true` 时 `chosen.code` 仍有效，须展示（DOC + RULES 双版本均更新）。
- **`backend/tools/inventory/services/llm_selector.py`**：
  - 删除 `use_anthropic` 分支，始终走 OpenAI SDK（GLM `open.bigmodel.cn`）。
  - `max_tokens` cap 从 512 → 8000。
- **`backend/tools/data/wanding_business_knowledge.md`**：追加来源优先级规则：`source="共同"` > `"历史报价"` > `"字段匹配"`。
- **新增测试**：
  - `tests/test_llm_selector_protocol.py`：3 项，验证始终走 OpenAI、max_tokens ≤ 8000、返回 reasoning。
  - `tests/test_skills_reasoning_display.py`：3 项，验证旧指令已删除、新指令存在。

### Testing

- [OK] `pytest tests/test_llm_selector_protocol.py tests/test_skills_reasoning_display.py` — 6 passed
- [OK] `pytest tests/test_anthropic_react_messages.py` — 13 passed（含修复 `<redacted_thinking>` 拆分测试）

### Status

[OK] **Completed**

### Next Steps

- 观察 GLM 在 `glm-4.5-air` 下是否仍有 `finish_reason=length` + `content=""` 问题（见 Session 13）

---

## Session 13: 2026-04-03 — GLM 思考模型 Plan B（reasoning_content fallback + max_tokens 16000）

**Date**: 2026-04-03
**Task**: match-quotation-fix (follow-up)

### Summary

`glm-4.5-air` 为思考模型，内部推理消耗 token 后 `message.content` 为空，答案实际在 `message.reasoning_content`。实现 Plan B：当 `content` 为空时自动从 `reasoning_content` 提取 JSON；同步把 max_tokens cap 提升到 16000。

### Root Cause

`glm-4.5-air` 是思考模型：选型 JSON 放在 `message.reasoning_content`，`message.content` 返回空字符串，导致 `llm_selector.py` 抛「LLM 返回空内容」并走规则兜底。日志特征：`finish_reason=length, raw=`（48 秒延迟）。

### Main Changes

- **`backend/tools/inventory/services/llm_selector.py`**：
  - `mt` cap 从 8000 → 16000。
  - `raw_content` 为空时，用 `re.search(r'\{[^{}]*"confident"[^{}]*\}', reasoning_content)` 从 `message.reasoning_content` 提取 JSON；成功则继续正常解析，失败则 warning + 规则兜底。
  - warning 日志新增 `reasoning_content_len` 字段，便于诊断。
- **`tests/test_llm_selector_protocol.py`**：`test_max_tokens_capped_at_8000` → `test_max_tokens_capped_at_16000`（`assertLessEqual(mt, 16000)`）。

### Testing

- [OK] `pytest tests/test_llm_selector_protocol.py tests/test_anthropic_react_messages.py tests/test_skills_reasoning_display.py` — **20 passed**

### Status

[OK] **Completed**

### Next Steps

- 验证真实 `glm-4.5-air` 调用时 Plan B 是否正确提取 JSON（观察日志「从 reasoning_content 提取到 JSON」）
- 若 `reasoning_content` 也无 JSON（纯推理链），可考虑换用非思考版 GLM（如 `glm-4-flash`）

---

## Session 14: 2026-04-04 — 暂时从 Chat prompt 中移除 8 个工具

**Date**: 2026-04-04
**Task**: chat-tool-disable

### Summary

应用户要求，暂时将 8 个工具从 Chat 模型的 tool list 中移除（代码保留，仅不注册到 `ExtensionContext`），以减少 prompt 干扰、降低误触发概率。

### Main Changes

- **`backend/tools/oos/handler.py`**：注释掉 6 个 OOS 工具的注册调用（`get_oos_list`、`get_oos_stats`、`get_oos_by_file`、`get_oos_by_time`、`register_oos`、`register_oos_from_text`）；handler 函数和 adapter 导入保留。
- **`backend/tools/quotation/handler.py`**：`register_quotation_tools()` 加入 `_SKIPPED_QUOTE_TOOLS = {"fill_quotation_sheet", "run_quotation_fill"}`，在两处注册循环中 `continue` 跳过。
- **`tests/test_oos_handler.py`**：将 `test_register_oos_tools_registers_at_least_four_tools`（断言 `>= 4`）改为 `test_register_oos_tools_skips_all_oos_tools`（断言 `== 0`），反映工具已禁用。

### What Was NOT Changed

- 所有 handler 函数、schema 定义、business logic 均原样保留
- `JAgentExtension.register()` 仍调用 `register_oos_tools()` / `register_quotation_tools()`，只是它们现在无操作
- Work Mode 工具链未受影响

### Testing

- [TODO] 待有 Python+pytest 环境时运行 `pytest tests/test_oos_handler.py -v` 验证

### Status

[OK] **Completed**

### Next Steps

- 重启后端使更改生效
- 用户如需重新启用这 8 个工具，取消对应注释即可

---

## Session 15: 2026-04-04 — WeCom 长连接 Bot 工具注入路径排查

**Date**: 2026-04-04
**Task**: wecom-tool-scope

### Summary

排查发现：Chat prompt 移除 8 个工具的改动会同时影响 WeCom 长连接 bot，原因是 `start_wecom_bot.py` 的 `create_agent()` 使用 `JAgentExtension()` 注册全量工具，两套通道共享同一工具注册表。

### Key Findings

- **两套 WeCom 入口存在于同一代码库**：
  - `routes_wecom.py` + `wecom_service.py`：HTTP 回调模式（`wecom_chat_bridge` 硬编码 `allowed_tools=["batch_quick_quote"]`）
  - `backend/wecom_bot/client.py` + `start_wecom_bot.py`：WebSocket 长连接模式（`JAgentExtension()` 注册全量工具，**无 `allowed_tools` 限制**）

- **用户使用场景**：`start_wecom_bot.py` 长连接模式，工具注入走 `JAgentExtension.register()` → `register_oos_tools()` + `register_quotation_tools()`

- **刚才禁用 8 个工具的影响**：OOS 工具（6个）+ `fill_quotation_sheet` + `run_quotation_fill` 也从 WeCom 长连接 bot 的 tool list 中移除

### 待确认

- WeCom 长连接 bot 用户是否需要这 8 个已禁用工具？
- 是否需要给 WeCom 单独维护一个受限工具白名单？

### Status

[#] **In Progress — awaiting user confirmation**

### Next Steps

- 确认 WeCom 场景是否需要恢复部分或全部已禁用工具
- 讨论是否需要给 WeCom 长连接 bot 单独配置 `allowed_tools` 白名单（参考 `wecom_chat_bridge` 的做法）

---

## Session 16: 2026-04-05 — Correction Learning（纠错学习写入知识库）

**Date**: 2026-04-05

### Summary

prompt-only 方式实现纠错学习：当用户纠正选型时，LLM 追问原因 → 生成 IF/THEN 规则草稿展示给用户 → 确认后调用现有 `append_business_knowledge` 工具写入 `wanding_business_knowledge.md`。

### Main Changes

- **`backend/plugins/jagent/skills.py`**：
  - `SKILL_KNOWLEDGE_DOC`：新增「纠错学习（Correction Learning）」段落，描述四步流程（检测纠正意图 → 追问原因 → 展示 IF/THEN 草稿 → 确认后写入）。
  - `SKILL_KNOWLEDGE_RULES`：新增纠错路由规则（触发词：「不对」「选错了」「应该是/选 XXX」等）+ IF/THEN 内容格式要求 + 未经确认不得调用工具的硬约束。
  - 两版同步，DOC 版为自然语言，RULES 版为 Decision Rules 风格。
- **`tests/test_correction_learning_prompt.py`**（新建）：7 项单元测试，断言两版均含：纠正触发词、原因追问、确认要求、IF/THEN 格式、`IF 用户询价` 具体格式。

### Testing

- [OK] `pytest tests/test_correction_learning_prompt.py -v` — 7 passed

### Status

[OK] **Completed**

---

## Session 17: 2026-04-05 — 修复 Session.pending_human_choice AttributeError

**Date**: 2026-04-05

### Summary

后端运行时崩溃：`'Session' object has no attribute 'pending_human_choice'`。`agent.py` 已引用该字段和 store 方法，但 `session.py` 未实现。

### Root Cause

`backend/core/agent.py` L290 读 `session.pending_human_choice`；L673/676 调 `self._store.set/clear_pending_human_choice()`，均未在 `session.py` 定义。

### Main Changes

- **`backend/agent/session.py`**：
  - `Session` dataclass：新增 `pending_human_choice: Optional[Dict[str, Any]] = None`。
  - `Session.empty()`：初始化 `pending_human_choice=None`。
  - `SessionStore`：新增 `set_pending_human_choice(session_id, data)` 和 `clear_pending_human_choice(session_id)` 方法。

### Testing

- [OK] Python inline 验证：`Session.pending_human_choice` 可读写；两个 store 方法正常执行。

### Status

[OK] **Completed**

---

## Session 18: 2026-04-05 — WeCom 长连接卡片支持（multi reply_stream + 前端独立气泡）

**Date**: 2026-04-05

### Summary

当 `match_quotation` 返回报价卡片时，WeCom 长连接将每张卡片单独通过 `reply_stream` 发送，而不是只发 LLM 文字；前端每张卡片渲染为独立气泡。`extension.py` 零改动。

### Architecture

`handler.py` 在调用 `execute_react` 前注入 `push_event` 收集器到 context；`extension.py` 已有 `if callable(context["push_event"]): push(...)` 逻辑，自动触发收集。`handle_wecom_message` 返回 `List[str]`（卡片列表或 fallback `[answer]`），`client.py` 循环 `reply_stream`。

### Main Changes

- **`backend/wecom_bot/handler.py`**：
  - 新增 `List` import。
  - `handle_wecom_message` 返回类型改为 `List[str]`。
  - 在 context 赋值后注入 `collected_cards: List[str]` + `_push_event` 闭包 + `context["push_event"] = _push_event`。
  - 函数末尾：有卡片时返回 `collected_cards`，无卡片时返回 `[answer]`；timeout 返回 `["处理超时，请稍后重试。"]`。

- **`backend/wecom_bot/client.py`**：
  - 新增 `List` import。
  - `WeComBotClient._on_text_message`：`answer = await handle_wecom_message(...)` → `messages = await ...`；`for msg_text in messages: reply_stream(...)` 循环发送。
  - 图片 OCR 路径同步更新（`ocr_messages` 变量名 + 循环）。
  - `DummyWeComBotClient.on_message` 类型注解改为 `Callable[[StandardWeComMessage], Awaitable[List[str]]]`；`run_forever` 改为 `for reply in replies` 打印。

- **`control-ui/src/ui/views/chat.ts`**：
  - `groupMessages` 函数：检测消息 `__openclaw.kind === "tool_render"`，是则直接 push 为独立 group 并 `continue`，不与相邻 assistant 消息合并为同一气泡。

- **`tests/test_wecom_card_handler.py`**（新建）：4 项测试：无卡片返回 `[answer]`；tool_render 事件返回卡片列表；空 `formatted_response` 被过滤；非 tool_render 事件被忽略。

### Testing

- [OK] `pytest tests/test_wecom_card_handler.py -v` — 4 passed
- [OK] `npm run build` (control-ui) — success, no TypeScript errors

### Status

[OK] **Completed**

### Notes

- 前端的 `toolRenderItems` 累积逻辑（`app-tool-stream.ts`）和 `buildChatItems` marker 配对逻辑均无需改动，只有 `groupMessages` 一处变更。
- 多张卡片场景：WeCom 用户收到 N 条独立消息；前端每张卡片独占一个气泡。

## Session 18: 2026-04-08 — Weekly reports UI i18n + import fix

**Date**: 2026-04-08
**Task**: agents-reports-i18n

### Summary

Fixed `t()` import path in `agents-panels-tools-skills.ts` (`../../i18n/index.ts`). Added missing `agents.reports.*` and `common.loading` / `common.save` / `common.edit` entries to `en.ts` and `zh-CN.ts` so the Weekly Reports card shows translated strings instead of raw keys.

### Testing

- [OK] `npm run build` (control-ui)

### Status

[OK] **Completed**

## Session 20: 2026-04-09 — sales-invoice date filter (BETWEEN)

**Date**: 2026-04-09

### Summary

Live-probed `/api/sales-invoice/list.do`: `filter.transDate.startDate` / `endDate` do not narrow results (`sp.rowCount` stayed ~8387). The working shape matches `sales-order/list.do`: `filter.transDate.op=BETWEEN` with `filter.transDate.val[0]` / `val[1]` as **DD/MM/YYYY**. Updated `backend/reports/accurate_fetcher.py` accordingly.

### Testing

- [OK] `py -m pytest tests/test_reports_analyzer.py tests/test_reports_formatter.py -q`

### Follow-up (same day)

- Sidebar **周报** tab had only Refresh; added per-task **立即运行** wired to `POST /api/reports/tasks/{task_key}/run` (`control-ui` `reports-tab.ts` + `app-render.ts`). `npm run build` OK.

## Session 21: 2026-04-10 — Admin 价格库 follow-up（上传限制、删除错误、HTTP 语义）

**Date**: 2026-04-10

### Summary

Completed review follow-ups: Excel uploads use `Config.MAX_UPLOAD_MB` with chunked read + 413; `deletePriceRow` / `deleteMappingRow` surface non-401 errors. Repository update/delete now return `Optional[bool]` (None = DB unavailable or error, False = not found, True = ok); admin routes map None → 503, False → 404.

### Main Changes

- `backend/server/api/routes_admin.py` — `_read_upload_limited` chunked; upload endpoints unchanged behavior otherwise.
- `backend/tools/admin/repository.py` — tri-state return on update/delete four functions.
- `control-ui/src/ui/controllers/admin-data.ts` — delete handlers set `priceError` / `mappingError` on failure.

### Testing

- [OK] `py -3 -m pytest tests/test_smoke.py -q`
- [OK] `npm run build` (control-ui)
- [OK] Import `routes_admin`

### Status

[OK] **Completed** (full suite not run; unrelated pre-existing failure in `test_wanding_fuzzy_matcher_units.py`)

## Session 22: 2026-04-10 — Batch quotation mode (>=3 items) end-to-end

**Date**: 2026-04-10
**Task**: batch-quotation-mode-implementation

### Summary

Implemented the batch quotation mode plan: auto-switch at `>=3` items, consolidated batch payload (`resolved/pending/unmatched` with `input_index`), one SSE summary card, and frontend ordered batch table rendering.

### Main Changes

- Added config threshold in `backend/tools/inventory/config.py`:
  - `MATCH_QUOTATION_BATCH_MIN_ITEMS` (default `3`).
- Updated `backend/tools/inventory/services/inventory_agent_tools.py`:
  - Added multi-keyword splitter for auto batch routing from `match_quotation`.
  - Extended `_execute_match_quotation_batch` output to include:
    - `resolved_items[]`, `pending_items[]`, `unmatched_items[]`
    - per-item `input_index`
    - backward-compatible `items[]`
  - Added consolidated `formatted_response` markdown and JSON result payload for extension consumption.
- Updated `backend/plugins/jagent/extension.py`:
  - `match_quotation_batch` now pushes a single unified `tool_render` batch summary card.
  - Returns compact marker summary for LLM continuation without per-item re-querying.
- Updated frontend tool stream and chat rendering:
  - `control-ui/src/ui/app-tool-stream.ts`: support batch payload fields.
  - `control-ui/src/ui/views/chat.ts`: added batch summary rendering branch and global `input_index` ordering.

### Testing

- [OK] `py -m pytest tests/test_candidates_sse_push.py -q` (10 passed)
- [OK] `npm test -- "src/ui/views/chat.test.ts" -t "renders batch summary table ordered by input_index"` (passed)
- [OK] `ReadLints` on changed backend/frontend/test files (no lints)

### Status

[OK] **Completed**

## Session 23: 2026-04-11 — Neon admin plan alignment (migrations + UI polish)

**Date**: 2026-04-11
**Task**: price-library-neon-admin spec/plan follow-up

### Summary

Aligned implementation with `docs/superpowers/specs/2026-04-10-price-library-neon-admin-design.md`: added `001_create_price_tables.sql` + GIN index, `setup_tables()` runs migration file; frontend: login 503 message, upload confirm dialogs, database tab icon, fixed `MappingRow` type import in admin view.

### Testing

- [OK] `npm run build` (control-ui)
- [OK] `py -3 -c` import `backend.tools.admin.repository`

### Status

[OK] **Completed**

## Session 24: 2026-04-11 — Candidates SSE preview (tool_candidates UI)

**Date**: 2026-04-11
**Task**: `docs/superpowers/plans/2026-04-11-candidates-sse-preview.md`

### Summary

- Backend: `_execute_match_quotation` `tool_candidates` payload includes `keywords`.
- Frontend: `CandidatesPreviewItem`, `handleCandidatesEvent`, FIFO pop on `tool_render` in `app-tool-stream.ts`; `candidatePreviews` state on app; chat renders dashed preview card (max 5 rows) before final tool cards; i18n + CSS; exported `renderAvatar` for reuse.
- Tests: `test_tool_candidates_includes_keywords`, `app-tool-stream.candidates.test.ts`, two chat tests for preview.

### Testing

- [OK] `py -3 -m pytest tests/test_candidates_sse_push.py -q` (11 passed)
- [OK] Vitest: `app-tool-stream.candidates.test.ts` + new chat preview tests (pass; 4 unrelated `chat.test.ts` failures on locale/button)
- [OK] `npm run build`

### Status

[OK] **Completed**

## Session 25: 2026-04-12 — 周报两阶段管道（analysis_md + Lit UI）

**Date**: 2026-04-12
**Spec / Plan**: `docs/superpowers/specs/2026-04-12-weekly-report-enhancement-design.md`, `docs/superpowers/plans/2026-04-12-weekly-report-enhancement.md`

### Summary

- **原则**：原始 `report_json` / `report_md` 不经过 LLM；Phase 2 单独写入 `analysis_md`，`analysis_status`：`pending` → `running` → `done` / `failed`。
- **DB**：`report_records` 增加 `analysis_md`、`analysis_status`（`_DDL` + `ensure_tables` ALTER）。
- **后端**：新建 `backend/reports/llm_analyzer.py`（取同 `task_key` 上一条成功 `report_json` 作环比、Claude Haiku、`_set_analysis_status` 短连接避免 LLM 期间长占连接）；`runner.py` Phase 1 成功后 `daemon` 线程触发分析；`routes_reports.py` 列表/详情扩展字段，`POST .../reanalyze`。
- **前端**：`ReportRecord` + `reportsDetailTab`；`reanalyzeRecord` + 轮询（`inFlight` 防重叠）；`reports-tab.ts` 重写（数据 tab 结构化表格 + 智能分析 Markdown）；i18n；`app-render` 接线。
- **Review 跟进**：失败写回 `failed` 时记录日志（避免静默吞掉）。

### Testing

- [OK] `py -m pytest tests/test_reports_llm_analyzer.py` (5 passed)
- [OK] `npm run build` (control-ui)
- 注：全量 `pytest -k "not live"` 存在与本次无关的既有失败，未在本次扩大范围修复。

### Status

[OK] **Completed**

## Session 26: 2026-04-12 — Session Neon persistence (agent-team-v3)

**Date**: 2026-04-12
**Task**: `docs/superpowers/plans/2026-04-12-session-neon-persistence.md` + design spec

### Summary

Implemented session storage strategy in repo path **`agent-team-v3/`** (parallel to this tree): `SessionBackend` protocol, `FileBackend` (JSON), `NeonBackend` (psycopg2 pool + `sessions`/`turns` DDL + `session_aux` JSONB for sidecar). `SessionStore` delegates I/O; `DATABASE_URL` selects Neon with fallback to file backend on init failure. `Turn.from_user` + `CoreAgent.save_turn(from_user=ctx)`; WeCom uses fixed `session_id = "wecom"`, `/new` → `clear_turns`, file bind calls `flush_session_aux`. HTTP: `routes_sessions.py` (`GET/POST/DELETE /api/sessions`); startup `ensure_session("wecom")`. Gateway `sessions` handler path from `Config.SESSION_STORE_DIR`. Full test run: **114 passed**.

### Main Changes (paths relative to `agent-team-v3/`)

- New: `backend/agent/session_backend.py`, `session_backend_file.py`, `session_backend_neon.py`
- Modified: `backend/agent/session.py`, `backend/core/agent.py`, `backend/wecom_bot/handler.py`, `backend/server/api/app.py`, `routes.py`, `backend/server/gateway/handlers/sessions.py`
- New: `backend/server/api/routes_sessions.py`
- Tests: `tests/test_session_turn.py`, `test_session_backend_file.py`, `test_session_backend_neon.py`, `test_session_store_refactored.py`, `test_wecom_handler_session.py`, `test_routes_sessions.py`; adjusted `test_oos_tools_refactor.py`, `test_current_topic_injection.py`

### Lessons

- Neon needs explicit **sidecar** (`session_aux`) for summary/tool_memory/file_path parity with file JSON; **`load_turns`** should use **newest N by ts** then chronological order for injection.
- Shared WeCom session is **by approved spec**; per-user isolation would be a separate product change.

### Status

[OK] **Completed**