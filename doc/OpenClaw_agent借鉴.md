# OpenClaw（龙虾）Agent 方面可借鉴点

针对 **version3 单 Agent + ReAct** 架构，从 [OpenClaw](https://github.com/openclaw/openclaw)（学习案例/openclaw）提炼的可落地的借鉴项。参考文档：docs.openclaw.ai（Agent loop、Compaction、Queue、Plugins、Thinking、Skills）及仓库 `src/agents/`。

---

## 1. Agent 循环的「生命周期」与串行化

**OpenClaw 做法**

- 一次 agent 跑 = 一次「loop」：intake → 组 context → 推理 → 工具执行 → 流式输出 → 持久化。
- 用 **lifecycle 事件**（start / end / error）作为「这一轮是否结束」的权威信号，而不只依赖模型是否还有 tool_calls。
- 入口：Gateway RPC `agent` / `agent.wait`、CLI `agent`；`agent.wait` 等待 lifecycle end/error 再返回。

**当前 version3**

- 用「无 tool_calls 或 FINISH」结束；没有显式 lifecycle。

**可借鉴**

- 在 `execute_react` 里显式发「loop start / loop end / loop error」，CLI 或后续 HTTP/企业微信可据此决定何时发「最终回复」、何时只更新中间状态。

**提升场景（何时值得做）**

| 场景 | 无 lifecycle 时 | 有 lifecycle 后 |
|------|----------------|------------------|
| **企业微信/IM 回调** | 不知道「这一轮何时结束」，只能等 API 返回再发一条消息；若用流式 SSE，不知道何时算「最终回复」可发给用户。 | 收到 `loop end` 再调企业微信发**一条**完整回复，不在流式过程中发半句。 |
| **多端同一 session** | 前端/CLI 显示「思考中」或转圈，只能靠「API 返回」判断结束，流式时结束点不统一。 | 前端/CLI 订阅 `loop end` 或 `loop error`，统一把状态改为「已完成」或「已取消/错误」。 |
| **超时或用户取消** | 只能靠异常或 timeout 返回，调用方难以区分「正常结束」vs「被取消」vs「超时」。 | 发 `loop error`（含 reason），渠道可展示「已取消」或「请求超时」而不是一直转圈。 |
| **按轮次计费/审计** | 一轮的边界不清晰，只能按「一次 execute_react 调用」算，无法和「模型轮次」对齐。 | 以 `loop start` / `loop end` 为边界打日志或计费，一轮一次。 |
| **队列与防重** | 下一条用户消息要等「上一轮跑完」再入队时，只能轮询或等 API 返回，容易误把新消息当成上一轮输入。 | 队列层监听 `loop end`，再放行下一轮，避免同一 session 两轮交叉。 |

**参考**

- [Agent loop](https://docs.openclaw.ai/concepts/agent-loop)

---

## 2. 按 session 串行 + 简单队列（防撞车）

**OpenClaw 做法**

- 同一 session 同时只跑一个 agent run（按 session key 排队）。
- 多 session 可加 global 并发上限（如 `maxConcurrent`），避免一起打满 API。
- Queue 模式：collect / steer / followup 等，控制多条入站消息是合并成一轮还是排队下一轮。

**当前 version3**

- CLI 单会话、HTTP 多请求可能并发同一 session_id。

**可借鉴**

- 若有多端（Web/企业微信/CLI）共享同一 session，对「同一 session_id」做串行队列（如 asyncio.Lock 或小队列），避免两路同时 `execute_react` 写同一 session。

**参考**

- [Command Queue](https://docs.openclaw.ai/concepts/queue)

---

## 3. Compaction（长对话压摘要）+ 重试

**OpenClaw 做法**

- 当 context 快满时，把**旧对话压成一条摘要**写回 session 历史，后面只带「摘要 + 最近几轮」。
- 压完可**自动重试**当次请求，用户无感。
- Compaction 与 pruning 区分：compaction 持久化摘要；pruning 只裁旧 tool result（in-memory）。

**当前 version3**

- `_trim_context` 只把旧 tool 消息改成短摘要，且是 in-memory，不持久。

**可借鉴**

- 若要做「长会话不丢重点」：要么像 OpenClaw 一样把 compaction 结果**持久化**到 session（如 SessionStore 里加 compact_summary）；要么在「总 token 超阈值」时先做一次「仅摘要」的 LLM 调用，再把摘要当 system/context 再跑真正请求。

**参考**

- [Compaction](https://docs.openclaw.ai/concepts/compaction)

---

## 4. Tool 钩子：before_tool_call / after_tool_call

**OpenClaw 做法**

- **before_tool_call**：在真正执行前改参数、做校验、甚至拦截（如权限、敏感操作）。
- **after_tool_call**：统一打日志、计费、或把结果再加工再写回 transcript。
- **tool_result_persist**：写 session 前对 tool 结果做一次同步转换（如脱敏、截断）。

**当前 version3**

- 有 `on_tool_start`、`on_tool_calls_ready` 做进度展示，没有「改参数 / 拦截」的钩子。

**实际作用可以怎么理解**

| 钩子 | 发生时机 | 在你场景里的典型用法 |
|------|----------|----------------------|
| **before_tool_call** | 模型决定要调某个工具 → **还没执行** → 先走这里 | ① **拦截**：企业微信里用户没权限「无货登记」时，直接返回「无权限」，不真的调 register_oos。② **改参**：把用户说的「B档」统一成 `customer_level: "B"`，或把 `file_path` 从相对路径补全成绝对路径。③ **二次确认**：调 run_quotation_fill 前弹一次「确认填充整单？」再放行。 |
| **after_tool_call** | 工具**已经执行完**，结果要写回 messages 之前 | ① **计费/用量**：按工具名或参数打日志、记调用次数。② **结果加工**：把 match_wanding_price 返回的长 JSON 截断或摘要后再塞进 observation，省 token。③ **脱敏**：observation 里把内部路径、IP 等抹掉再给模型看。 |
| **tool_result_persist** | 和 after 类似，但强调「要持久化进 session 的那一版」 | 存进 SessionStore / 历史的那份 observation 做最后一次处理（例如只存摘要、不存整段 JSON），和「当轮给模型看的」可以不一样。 |

**一句话**：before = 「能不能调、按什么参数调」；after / persist = 「调完的结果怎么记、怎么给模型/用户看、怎么存」。

**为什么 version3 不加 tool_result_persist**

OpenClaw 需要它是因为他们的 session 存的是**完整 transcript**（每轮的 observation 都进历史）。version3 的 SessionStore 目前**只存 answer**，observation 本就不进持久化层。如果未来要在 SessionStore 里存 observation 摘要，届时 **after_tool_call 的返回值**本身就是那个「精简版」——不需要再加第三个钩子，一个 after_tool_call 同时服务「当轮给模型看的」和「若要持久化就存这份」两个场景。

**接入点汇总（version3 已实现）**

工具执行流程（加钩子后）：

```
LLM 决定调工具
  ↓
before_tool_call(name, args)
  ├─ 返回 None     → 注入 "已被拦截" observation，跳过真实调用
  └─ 返回 args'    → 用修改后的参数执行 execute_tool(name, args', ctx)
                          ↓
                    after_tool_call(name, args', obs)
                          ↓
                    加工后的 obs → 写入 messages + trace
```

- 两个钩子都是**可选参数**，不传时行为与改动前完全一致，无破坏性。
- `before_tool_call(name, args) -> Optional[dict]`：返回 None 表示拦截；返回 dict 表示用该参数执行（可对 args 做归一化/补全）。
- `after_tool_call(name, args, obs) -> str`：返回的字符串作为当轮 observation 写回 messages 与 trace。

**可借鉴**

- 若要加「工具前校验」或「参数归一化」：增加可选 `before_tool_call(name, args) -> args | None`，返回 None 表示拒绝并给模型一条固定 message；企业微信/敏感环境里可对部分工具做二次确认或脱敏。

**参考**

- `src/agents/pi-tools.before-tool-call.ts`、[Plugins / plugin hooks](https://docs.openclaw.ai/tools/plugin#plugin-hooks)

---

## 5. Tool loop 检测（防同一工具同参死循环）

**OpenClaw 做法**

- 同一 session 内：同一工具 + 同一参数 连续调用 N 次（如 3 次）→ 告警或直接拒绝，并给模型一句「loop detected」类提示，避免 doom_loop。
- `pi-tools.before-tool-call.ts` 里做 loop detection + `shouldEmitLoopWarning`，按 bucket 限频告警。

**当前 version3**

- 没有 loop 检测，模型若一直 `match_wanding_price` 同参数会一直执行。

**可借鉴**

- 在 `execute_tool` 前维护「最近 K 次 (name, args_hash)」；若发现重复超过 2～3 次，要么拒绝并返回固定文案，要么在 system 里追加一句「避免重复相同工具调用」。

**参考**

- `src/agents/pi-tools.before-tool-call.ts`

---

## 6. 思考级别可配置（/think 式）

**OpenClaw 做法**

- 用户/会话可设「思考深度」：off | minimal | low | medium | high（及 xhigh），对应不同推理预算或是否流式出 reasoning。
- 解析优先：消息内联指令 → 会话覆盖 → 全局默认 → 回退（有推理能力则 low，否则 off）。

**当前 version3**

- `<think>` 写死在 prompt，且流式时会把 think 一起打出来。

**可借鉴**

- 若希望「有时要深度想、有时不要」：在 session 或请求里加 `thinking_level`（或从企业微信/CLI 指令解析）；prompt 里按 level 写不同 `<think>` 说明，或高等级时才要求 `<think>`，低等级直接 Act。流式可做成：仅在高等级或 verbose 时把 `<think>` 推到前端，否则只推最终答案。

**参考**

- [思考级别](https://docs.openclaw.ai/tools/thinking)（zh-CN）

---

## 7. Skills 与「技能描述」按需注入

**OpenClaw 做法**

- 技能 = 一段说明（如 SKILL.md）+ 门控（环境/配置），**按需加载**进 system prompt，而不是一个大 prompt 塞满所有技能。
- 位置与优先级：工作区 skills → 托管 ~/.openclaw/skills → 内置；插件也可带 skills。

**当前 version3**

- 技能已拆成 5 个常量 + `_ALL_SKILLS`（`agent.py` 110-163 行），`_build_system_prompt()` 只做组装；按需注入时改为 `_build_system_prompt(active_skills=None)` 并在调用处按 context 传参即可。

**可借鉴**

- 若技能会持续增加（如按业务线、按客户）：把「库存/万鼎/报价单/无货/澄清」拆成多段 skill 文本；根据 session 或 config 决定注入哪几段（如只做报价的会话不注入无货详情），控制 prompt 长度和噪音。

**参考**

- [Skills](https://docs.openclaw.ai/tools/skills)、[Skills 配置](https://docs.openclaw.ai/tools/skills-config)（zh-CN）

---

## 8. 对外渠道只发「最终回复」、不发流式

**OpenClaw 做法**

- 对 WhatsApp/Telegram 等 IM：**不**把 assistant 流式 delta 直接发出去，只在该轮 **lifecycle end** 后发一条最终回复，避免半句半句刷屏。
- 流式仍可在内部（Control UI、CLI）使用。

**当前 version3**

- 企业微信若接现有 API，需要区分「流式 SSE」与「最终一条消息」。

**可借鉴**

- 企业微信回调里：只在你认为「这一轮 agent 已结束」（如收到 loop end 或 无 tool_calls + 有最终 answer）时，调企业微信发**一条**完整回复；中间状态可选：仅打日志或仅对内部管理端展示。

**参考**

- Agent loop 文档；AGENTS.md 中 "Never send streaming/partial replies to external messaging surfaces"。

---

## 总结：按优先级可落地项

| 优先级 | 点 | 可落地做法 |
|--------|----|------------|
| **高** | Tool loop 检测 | 同工具+同参连续 2～3 次则拒绝或警告，并返回固定说明。 |
| **高** | 对外只发最终回复 | 企业微信/IM 只在「轮次结束」后发一条完整 answer。 |
| **中** | Session 串行 | 多端共享 session 时，用锁或队列保证同一 session 单 run。 |
| **中** | before_tool_call 钩子 | 可选：参数校验、归一化、敏感工具拦截。 |
| **低** | Compaction 持久化 | 长会话时把旧对话压成摘要并持久化，再重试当次请求。 |
| **低** | 思考级别 / Skills 按需 | 会话或配置控制 `<think>` 深度；技能描述按需注入以控 prompt 长度。 |

---

## 参考路径（学习案例）

- 学习案例：`学习案例/openclaw/`（或 `瀛︿範妗堜緥/openclaw/`）
- 关键文档：`docs/concepts/agent-loop.md`、`docs/concepts/compaction.md`、`docs/concepts/queue.md`
- 工具钩子与 loop 检测：`src/agents/pi-tools.before-tool-call.ts`、`src/plugins/hooks.ts`
