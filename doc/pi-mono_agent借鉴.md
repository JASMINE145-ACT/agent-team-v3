# pi-mono Agent 开发可借鉴点（针对 Agent Team version3）

针对 **version3 单主 Agent + ReAct** 架构，从学习案例 [pi-mono](https://github.com/badlogic/pi-mono) 提炼的、值得落地的设计。pi-mono 是当前较火的 AI agent 工具链：统一 LLM API（pi-ai）、Agent 运行时（pi-agent-core）、Coding Agent CLI（pi-coding-agent）、TUI/Web UI、Slack bot、vLLM pods 等。

---

## 1. 事件驱动 + 统一事件类型（最值得学）

**pi 做法**

- Agent 对外只暴露**事件流**，不暴露内部「步数/轮次」实现细节。
- 事件类型清晰分层：
  - **生命周期**：`agent_start` / `agent_end`、`turn_start` / `turn_end`
  - **消息**：`message_start` / `message_update` / `message_end`
  - **工具**：`tool_execution_start` / `tool_execution_update` / `tool_execution_end`
- UI/CLI/网关只订阅事件，根据 `agent_end` 取最终 `messages`；流式时用 `message_update` 的 `assistantMessageEvent`（含 `text_delta`、`thinking_delta`、`toolcall_delta`）做实时展示。

**version3 现状**

- 已有 `on_token`、`on_tool_start`、`on_tool_calls_ready`、`on_event(loop_start/loop_end/loop_error)`，但事件模型不统一，trace 是「事后」给出一整段，没有「工具执行中可流式更新」的 `tool_execution_update`。

**可借鉴**

- 定义一套与 pi 对齐的**事件枚举**（agent_start/end、turn_start/end、message_start/update/end、tool_execution_start/update/end），在 `execute_react` 内按顺序发射。
- 企业微信/IM 收到 `turn_end` 或 `agent_end` 再发一条完整回复；前端/CLI 用 `message_update` 做流式、用 `tool_execution_*` 做「正在执行工具 N/M」的进度。
- 若有工具支持流式结果（如长读文件），可增加 `on_tool_update(partial_result)`，对应 pi 的 `tool_execution_update`。

---

## 2. 结束条件：完全交给 API 的 finish reason（与 version3 已一致）

**pi 做法**

- 不要求模型输出「Decision: FINISH」或 `<reflect>`。循环是否继续只看：
  - 本步 assistant 的 `stopReason`：`toolUse` → 执行工具、把 tool result 追加进 context，再调一次 LLM；`stop`（或 error/aborted）→ 结束。
- 步数上限在配置里；达限时可由上层选择注入「请直接回答、不再调工具」的提示再跑一轮（与 version3 的 `_MAX_STEPS_HINT` 一致）。

**version3 现状**

- 已升级为「无 Decision 文本、依赖 finish_reason」，与 pi 一致。

**可借鉴**

- 无额外改动；保持「无 tool_calls 即 stop」即可。若未来接入多 provider，可像 pi-ai 一样统一各家的 stop reason 枚举（stop / length / toolUse / error / aborted）。

---

## 3. 上下文：transformContext + convertToLlm 分层

**pi 做法**

- **两段式**处理后再送 LLM：
  1. `transformContext(messages, signal)`：在 **AgentMessage 层面** 做裁剪、压缩、注入外部上下文。例如：超长时 prune 旧消息、或把旧 tool 结果换成摘要。
  2. `convertToLlm(messages)`：把 AgentMessage[] 转成 LLM 能识别的 Message[]（user/assistant/toolResult），并**过滤掉仅 UI 用的消息**（如 notification）。
- 每次**调用 LLM 前**都执行这两步，所以「上下文窗口管理」和「多端自定义消息类型」可以独立扩展。

**version3 现状**

- 只有 `_trim_context`：按总字符数把最旧的 `role:tool` 消息替换成简短摘要，是「单段、写死」的压缩。

**可借鉴**

- 抽象出两个可选钩子（或一个组合钩子）：
  - `transform_context(messages) -> messages`：裁剪/压缩/注入，仍在当前 message 结构上操作。
  - `convert_to_llm(messages) -> list[dict]`：转成 OpenAI 格式并过滤 UI-only（若以后有「仅前端展示」的消息类型）。
- 在每步 LLM 调用前先 `transform_context` 再 `convert_to_llm`，便于以后做：按 token 估算裁剪、按轮次保留最近 N 轮、或接入「会话摘要」式压缩（类似 pi coding-agent 的 compaction）。

---

## 4. Steering（中途打断）与 Follow-up（结束后再跟一条）

**pi 做法**

- **Steering**：在 agent 正在执行多个工具时，用户可发「别做了，改做 X」。pi 在**每次工具执行完后**轮询 `getSteeringMessages()`；若有新消息，则**剩余工具不再执行**，把 steering 消息注入 context，下一轮 LLM 根据「被中断 + 新指令」继续。
- **Follow-up**：当本应结束（无 tool_calls、无 steering）时，再查 `getFollowUpMessages()`；若有（例如用户趁等待时又发了一条），则把这些消息注入，再跑一轮，实现「排队下一条」而不打断当前轮。

**version3 现状**

- 无 steering/follow-up；同一 session 多端并发时可能撞车（doc 里已由 OpenClaw 借鉴提到「按 session 串行」）。

**可借鉴**

- 若支持多端（Web/企业微信）共享 session，可引入**队列**：
  - 第一类：**steering** — 当前轮还在跑时用户又发消息 → 入队，在「每步工具执行完」时检查队列，若有则放弃后续工具、注入该消息并继续 LLM。
  - 第二类：**follow-up** — 当前轮已结束前用户发消息 → 入队，在 `agent_end` 时检查队列，若有则把队首作为下一轮输入再调 `execute_react`（或同一循环内注入并继续）。
- 与「按 session 串行」结合：同一 session 同时只跑一轮，新消息先进队，由 steering/follow-up 策略决定是打断还是下一轮。

---

## 5. 工具层：TypeBox 参数校验 + 错误以 tool result 回馈模型

**pi 做法**

- 工具参数用 **TypeBox** 声明 schema，调用前用 `validateToolArguments(tool, toolCall)` 校验；若失败，**不抛给上层**，而是把错误作为 `toolResult`（`isError: true`）塞回 context，让模型看到「工具调用失败原因」并决定是否重试或换参数。
- 工具执行函数签名统一：`execute(toolCallId, params, signal, onUpdate?)`，其中 `onUpdate` 用于流式上报进度（对应 `tool_execution_update`）。

**version3 现状**

- 有 `before_tool_call` / `after_tool_call` 钩子，工具参数多为手写校验或信任 LLM 输出。

**可借鉴**

- 为每个工具声明**参数 schema**（可用 Pydantic 或 JSON Schema），在执行前校验；失败时把错误信息作为该 tool 的 observation 写回 messages，而不是抛异常导致整轮失败。
- 工具实现支持可选 `on_update(partial)`，便于长耗时工具在 CLI/前端展示进度；对应地增加 `tool_execution_update` 事件。

---

## 6. 统一 LLM 抽象（pi-ai）与多 provider

**pi 做法**

- **pi-ai** 统一多 provider（OpenAI、Anthropic、Google、Azure、Bedrock、OpenRouter、Ollama 等），对外接口一致：`stream(model, context, options)` / `complete(...)`，context 可序列化、可在会话中**跨 provider 切换**（例如前面用 Claude，后面用 GPT，消息格式自动转换）。
- 支持 thinking/reasoning、token/成本统计、abort signal、OAuth 动态 key（`getApiKey(provider)` 在每次 LLM 调用前解析，适合过期 token）。

**version3 现状**

- 直接使用 OpenAI SDK + base_url，换模型/兼容层需改代码。

**可借鉴（中长期）**

- 若需要多模型/多厂商，可引入一层「统一 context + 统一 stream/complete 接口」，把「模型名 + base_url + api_key」封装成类似 pi 的 `Model`；version3 的 `execute_react` 只依赖「发 messages、收 stream、解析 tool_calls」，不依赖 OpenAI 包名。
- 若企业微信或内部网关需**动态 API key**（如按用户刷新 token），可在每步 LLM 前调用 `get_api_key(provider)`，与 pi 的 `getApiKey` 一致。

---

## 7. 低层 API：agentLoop / agentLoopContinue

**pi 做法**

- 除高级 `Agent` 类外，暴露 **agentLoop(prompts, context, config)** 和 **agentLoopContinue(context, config)**，返回事件流；上层可自己消费事件、自己管理 state，适合嵌入到不同运行时（CLI、Slack、RPC）。

**version3 现状**

- 只有 `SingleAgent.execute_react()`，入口单一。

**可借鉴**

- 若后续要做「无状态 HTTP 每请求一个 context」或「RPC 多 session」，可把「循环逻辑 + 事件发射」抽成纯函数或独立类（如 `run_agent_loop(messages, context, config) -> AsyncIterator[Event]`），`execute_react` 只是其中一种调用方式（带 session_store、流式回调等）。这样测试和复用都更容易。

---

## 8. 小结：优先落地顺序建议

| 优先级 | 项 | 收益 | 工作量 |
|--------|----|------|--------|
| 高 | 统一事件类型（agent/turn/message/tool_execution） | 多端行为一致、IM 知道何时发最终回复、进度可展示 | 中 |
| 高 | transformContext + convertToLlm 分层 | 上下文可裁剪/扩展、便于加 compaction | 中 |
| 中 | 工具参数校验 + 错误以 tool result 回馈 | 少整轮崩溃、模型可自我纠错 | 小 |
| 中 | steering / follow-up 队列（与 session 串行结合） | 多端同 session 不撞车、可打断或排队 | 中 |
| 低 | 统一 LLM 抽象 + 多 provider | 换模型/换厂商成本低 | 大 |
| 低 | 低层 agentLoop 抽离 | 嵌入 RPC/无状态服务更干净 | 中 |

以上均可与现有 `doc/ReAct范式对比.md`、`doc/OpenClaw_agent借鉴.md` 一起作为 version3 的演进参考；实现时保持「单主 Agent、无子 Agent 委托」的架构不变。
