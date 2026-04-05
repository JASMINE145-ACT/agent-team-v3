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