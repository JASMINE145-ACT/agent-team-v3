# ReAct 范式对比：version3 vs OpenCode

本文档对比 **Agent Team version3** 与 **OpenCode**（学习案例/opencode）中 Agent 的推理-行动循环（ReAct）实现方式。

---

## 1. version3（本仓库）

### 1.1 设计要点

- **单主 Agent**：不委托子 Agent，所有工具由主 Agent 直接调用。
- **信号驱动终止**：依赖 OpenAI API 的 `finish_reason`（无 `tool_calls` = stop），无需模型写 Decision 文本。
- **四项升级**（相比初版）见 1.4。

### 1.2 输出格式（模型被要求遵守）

| 顺序 | 内容 | 说明 |
|------|------|------|
| 1 | `<think>...</think>` | 目标 / 已知 / 缺失 / 本步行动 |
| 2a | 若调用工具 | 紧接 **tool_call**（OpenAI function call 格式） |
| 2b | 工具结果返回后 | 若目标已完成 → 直接输出最终回答；否则继续下一轮 |
| 3 | 若不调用工具 | 在 `<think>` 后直接给出最终回答 |

### 1.3 实现侧（代码）

| 项目 | 说明 |
|------|------|
| 入口 | `backend/core/single_agent/agent.py` → `SingleAgent.execute_react()` |
| 循环 | `for step in range(max_steps)`，默认 `max_steps=8`，每步一次 LLM 调用 |
| 解析 | 从 content 用正则抽取 `<think>`；**无 `<reflect>/Decision`** |
| 工具 | 调用时构建 assistant 消息（含所有 tool_calls）一次追加，每个 tool result 单独追加 |
| 结束条件 | 本步无 `tool_calls`（API finish_reason=stop）→ 将 content 作为最终答案并结束 |
| 流式 | `execute_react(on_token=...)` 时调用 `_call_llm_streaming_sync`（在 asyncio.to_thread 中），实时推送 token |
| SSE | `POST /api/query/stream`，通过 `asyncio.Queue + call_soon_threadsafe` 桥接 on_token 与 SSE generator |

### 1.4 Lifecycle 事件

`execute_react(on_event=...)` 触发以下事件，SSE 流同步透传：

| 事件 | 触发时机 | payload 关键字段 |
|------|----------|-----------------|
| `loop_start` | 循环刚开始，tools/messages 还未构建 | `session_id`, `query` |
| `loop_end` | 循环正常结束，答案已确定 | `session_id`, `answer`, `thinking`, `trace`, `needs_clarification` |
| `loop_error` | 未捕获异常导致循环中止 | `session_id`, `error` |

**为何需要 lifecycle 事件（对比「只看 token/done」）**：

| 场景 | 无 lifecycle | 有 lifecycle |
|------|-------------|--------------|
| 企业微信/IM | 不知何时发最终回复，只能等 API 返回 | 收到 `loop_end` 再发一条完整消息 |
| 多端同一 session | 只能靠「API 返回」判断结束，流式时结束点不统一 | 订阅 `loop_end`，统一翻转「已完成」状态 |
| 超时 / 用户取消 | 只能靠异常，调用方无法区分原因 | `loop_error` 含 reason，可展示「已取消」 |
| 审计 / 计费 | 边界不清晰，只能按 execute_react 调用次数算 | 以 `loop_start`/`loop_end` 为边界，一轮一次 |
| 消息队列防重 | 需轮询，容易两轮交叉 | 队列层监听 `loop_end` 放行下一条 |

### 1.5 Tool 钩子

`execute_react` 支持两个可选工具钩子，在工具执行前后介入：

```python
before_tool_call(name: str, args: dict) -> Optional[dict]
after_tool_call(name: str, args: dict, obs: str) -> str
```

| 钩子 | 触发时机 | 返回值语义 | 典型用途 |
|------|----------|-----------|---------|
| **before** | 工具执行**前** | `dict` → 继续（可改参数）；`None` → 拦截 | 参数归一化、权限检查、危险操作前置 |
| **after** | 工具执行**后**，写入 messages 前 | 返回新 observation 字符串 | 压缩长 JSON 省 token、路径脱敏 |

**`tool_result_persist` 为何不加**：当前 SessionStore 只存 answer，observation 不进历史，没有「给模型看的版本」vs「存历史的版本」分叉需求，加了反而复杂。

**使用示例（企微权限 + 参数归一化）**：

```python
def wecom_before_tool(name, args):
    # 权限拦截
    if name in ("register_oos", "run_quotation_fill") and not user_is_admin:
        return None
    # customer_level 归一化："b档"/"C级"/"c" → "B"/"C"
    if "customer_level" in args:
        args["customer_level"] = args["customer_level"].upper().rstrip("档级") or "B"
    return args

def wecom_after_tool(name, args, obs):
    # match_wanding_price 长 JSON 压缩为三列摘要
    if name == "match_wanding_price" and "candidates" in obs:
        try:
            d = json.loads(obs)
            if d.get("needs_selection"):
                lines = [f"{c['code']} | {c['matched_name']} | {c['unit_price']}"
                         for c in d["candidates"][:10]]
                return f"needs_selection，共 {len(d['candidates'])} 个候选：\n" + "\n".join(lines)
        except Exception:
            pass
    return obs

result = await agent.execute_react(
    query,
    before_tool_call=wecom_before_tool,
    after_tool_call=wecom_after_tool,
)
```

### 1.6 五项升级（相比初版）

| 编号 | 升级内容 | 收益 |
|------|----------|------|
| **1** | 删除 `<reflect>/Decision`，改由 API finish_reason 驱动终止 | 每轮减少 20-50 token；消除格式错误导致的「多跑 1-2 步」 |
| **2** | 步数耗尽优雅降级：最后一步注入「直接回答」提示并禁用工具 | 避免静默截断，保证返回有意义的最终答案 |
| **3** | 流式输出：`on_token` 回调 + `/api/query/stream` SSE 端点 | 前端/CLI 实时看到 token，体感延迟大幅降低 |
| **4** | Context 压缩：messages 总内容超 40K chars 自动压缩旧 tool 消息 | 防止长会话超出模型 context 窗口 |
| **5** | Tool 钩子：`before_tool_call` + `after_tool_call` | 参数归一化/权限拦截/observation 压缩，无需改工具实现 |

### 1.5 一句话概括

**Think（`<think>`）→ Act（tool_call 或直接回答）→ Observe（工具返回）→ 继续或结束（无 tool_calls 时）**，由 API finish_reason 驱动，最多 8 步，支持流式输出与 context 自动压缩。

---

## 2. OpenCode（学习案例/opencode）

### 2.1 设计要点

- **多 Agent 可选**：支持 primary / subagent，由配置与权限决定可用工具。
- **隐式循环**：不要求模型输出「reflect」或「Decision」，完全由 **provider 的 finish reason** 与「是否有 tool_calls」驱动是否继续。

### 2.2 循环逻辑（无显式 Reflect）

- 模型**不需要**写 Decision。
- 流程：
  1. 调用 `LLM.stream()` 得到流式响应；
  2. 若 **finish reason = tool-calls** → 执行工具，将 tool result 追加进 messages，再调一次 `LLM.stream()`，继续循环；
  3. 若 **finish reason = stop**（或其它非 tool-calls）→ 结束。

### 2.3 实现侧（代码）

| 项目 | 说明 |
|------|------|
| 循环入口 | `packages/opencode/src/session/prompt.ts` → `SessionPrompt.loop()` |
| 循环体 | `while (true)`：取最后 user/assistant；若 `lastAssistant.finish` 且 ∉ {tool-calls, unknown} 则 break |
| 结束判断 | `processor.process()` 返回 `"stop"` / `"continue"` / `"compact"`；`"stop"` 时 break |
| 步数上限 | 达限时注入 `MAX_STEPS` 提示（禁止再调工具、仅文本总结），再跑一轮 LLM 后结束 |
| 思考/推理 | `extractReasoningMiddleware({ tagName: "think" })`；部分模型走原生 reasoning，记成 `ReasoningPart` |
| 消息结构 | assistant 消息由 part 组成（text、reasoning、tool、step-start、step-finish） |
| 工具 | `ToolRegistry` + MCP；在 stream 中处理 tool-call → execute → tool-result |

### 2.4 一句话概括

**由 provider 的 finish reason 驱动**：有 tool-calls 就执行并继续下一轮，否则结束；思考可用 think 标签或原生 reasoning，无显式 Reflect/Decision，全程流式。

---

## 3. 对比总表

| 维度 | version3（本仓） | OpenCode |
|------|------------------|----------|
| **结束条件** | API finish_reason（无 tool_calls）即结束 | provider finish reason ≠ tool-calls 即结束 |
| **思考** | prompt 要求先写 `<think>`，代码正则抽取 | SDK think 标签或原生 reasoning，不强制每轮先 think |
| **Reflect** | ❌ 已删除（初版有，现已移除） | 无 |
| **步数耗尽** | 注入「直接回答」提示 + 禁用工具，优雅降级 | 注入 MAX_STEPS 提示再跑一轮 |
| **流式** | `on_token` 回调 + SSE `/api/query/stream` | 全程原生流式，token 实时推送 |
| **Context 管理** | 超 40K chars 自动压缩旧 tool 消息 | compact 模式（历史摘要） |
| **技术栈** | Python，OpenAI SDK（同步），asyncio.to_thread 桥接流式 | TypeScript/Bun，Vercel AI SDK，原生异步流式 |

---

## 4. 参考路径

- **version3**：`Agent Team version3/backend/core/single_agent/agent.py`（`_build_system_prompt`、`execute_react`、`_call_llm_streaming_sync`、`_trim_context`）。
- **SSE 端点**：`Agent Team version3/backend/api/routes.py`（`query_stream`）。
- **OpenCode**：`学习案例/opencode/packages/opencode/src/session/`（`prompt.ts` 的 loop、`processor.ts` 的 process、`llm.ts` 的 stream）。
