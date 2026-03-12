# Agent Team version3：React 范式实现详解

本文档说明项目中 **ReAct（Reasoning + Acting）** 范式的三个核心环节：**Tool 定义与注册机制**、**主循环（Loop）**、**Memory 处理**。面向希望深刻理解或扩展单 Agent 行为的开发者。

---

## 1. Tool 的定义与注册机制

### 1.1 总体架构

- **ToolRegistry**（`backend/core/registry.py`）：进程内唯一工具注册表，替代 if/elif 分发。
- **AgentExtension**（`backend/core/extension.py`）：业务扩展接口，在启动时向 Registry 注册工具并可选提供技能/输出格式 prompt、钩子。
- **CoreAgent** 在构造时创建 `ToolRegistry`，用 `ExtensionContext` 依次调用各 `ext.register(ctx)`，最终所有工具汇总到 `self._registry`。

```
启动时: app.py startup_event
  → CoreAgent(extensions=[JAgentExtension()])
  → ctx = ExtensionContext(registry, session_store)
  → JAgentExtension.register(ctx)
      → register_oos_tools(ctx)
      → register_inventory_tools(ctx)
      → register_quotation_tools(ctx)
  → tools = registry.get_definitions() 用于 LLM API
```

### 1.2 工具条目的数据结构

每个工具在 Registry 中是一条 **ToolEntry**：

- **definition**：OpenAI function calling 格式的 dict，至少包含：
  - `"type": "function"`
  - `"function": { "name": str, "description": str, "parameters": {...} }`  
  其中 `parameters` 为 JSON Schema，描述参数名、类型、必填等。
- **handler**：`(args: dict, ctx: dict) -> Awaitable[str]`，执行时由 Registry 根据 name 查找并调用，返回字符串 observation（通常为 JSON 字符串）。

定义示例（来自 `backend/agent/work_tools.py` / `backend/tools/inventory/services/inventory_agent_tools.py`）：

```python
{
    "type": "function",
    "function": {
        "name": "search_inventory",
        "description": "按产品名/规格关键词搜索库存，返回可用数量。...",
        "parameters": {
            "type": "object",
            "properties": {
                "keywords": {"type": "string", "description": "..."},
                ...
            },
            "required": ["keywords"]
        }
    }
}
```

### 1.3 注册方式

- **Chat/主 Agent**：通过 **Extension** 注册。  
  - `JAgentExtension.register(ctx)` 内调用各领域 `register_xxx_tools(ctx)`。  
  - 每个领域从自己的 `get_xxx_tools_openai_format()` 取定义列表，对每个 `tool_def` 调用 `ctx.register_tool(tool_def, handler)`。  
  - `ExtensionContext.register_tool(definition, handler)` 内部即 `registry.register(definition, handler)`，以 `definition["function"]["name"]` 为 key 写入 `_tools`。

- **Work 模式**：**不经过 Registry**，使用独立工具列表与执行路径。  
  - 工具定义：`backend/agent/work_tools.py` 中的 `WORK_TOOLS_OPENAI_FORMAT`（固定列表）。  
  - 执行：`work_executor.py` 内 `execute_work_tool_sync(name, args)` 同步执行，不经过 `CoreAgent._registry`。  
  - 因此 Work 的「工具集」与 Chat 的「工具集」是两套：Chat 用 Registry（由 Extension 聚合），Work 用常量列表 + 独立 executor。

### 1.4 执行路径（Chat 主 Agent）

- 单次 **execute_react** 内：  
  - `tools = self._registry.get_definitions()` 得到当前所有已注册工具的 definition 列表，传给 LLM。  
  - LLM 返回 `tool_calls` 后，对每个 call：`obs = await self._registry.execute(name, args, ctx)`。  
- `ToolRegistry.execute(name, args, ctx)`：  
  - 根据 `name` 查 `_tools` 得到 `ToolEntry`，调用 `entry.handler(args, ctx)`。  
  - 若 name 不存在，返回 `{"error": "未知工具: {name}"}` 的 JSON 字符串。  
  - handler 抛异常时，Registry 捕获并返回 `{"error": str(e)}`。

### 1.5 小结表

| 维度           | Chat / 主 Agent                          | Work 模式                          |
|----------------|------------------------------------------|------------------------------------|
| 定义来源       | 各 Extension 的 `register(ctx)`         | `work_tools.WORK_TOOLS_OPENAI_FORMAT` |
| 存储           | `CoreAgent._registry`（ToolRegistry）   | 无注册表，直接列表                 |
| 执行           | `registry.execute(name, args, ctx)`     | `execute_work_tool_sync(name, args)` |
| 上下文         | 每轮传入的 `context` + session           | 无 session，仅 file_paths/customer_level 等 |

---

## 2. Loop（主循环）机制

### 2.1 两处 ReAct 循环

项目中有两套「ReAct 式」循环：

1. **CoreAgent.execute_react**（`backend/core/agent.py`）  
   - 用于：Chat、企微、Gateway 聊天、统一查询 API。  
   - 特点：带 session、可流式、可取消、有上下文压缩与扩展钩子。

2. **Work 流程**（`backend/agent/work_executor.py`）  
   - `_run_work_flow_react`：从「请按顺序处理 N 个文件…」开始，直到 LLM 不再发 tool_calls 或达到 `max_steps`。  
   - `_run_work_flow_resume_react`：用户选完 match 的选项后，从保存的 messages 继续跑完同一轮 ReAct。

下面以 **CoreAgent.execute_react** 为主说明「Loop」的细节；Work 的 loop 结构类似，但无 Extension、无 session、工具集与执行器独立。

### 2.2 execute_react 循环结构

```text
1. 前置
   - 可选：try_handle_remember(user_input) 在路由层处理「记住」指令，命中则直接返回，不进入 execute_react。
   - on_before_prompt：各 Extension 可改写 user_content。
   - 若有 file_path/file_id，拼 Excel 摘要、当前主题/意图注入（SessionStore.build_injection）。
   - messages = [system, (可选)excel_summary, user]，tools = registry.get_definitions()。

2. for step in range(max_steps):
   a. 若 step 为最后一步，追加 _MAX_STEPS_HINT，并可在本步去掉 tools（实现上本步仍带 tools，由 hint 引导模型直接回答）。
   b. 调用 LLM：messages + tools + tool_choice="auto"。
      - 支持流式（on_token）或非流式；超时/网络错误时若配置了 fallback 模型则重试一次。
   c. 解析响应：content（文本）、tool_calls 列表。
   d. 若有 <think> 标签，抽出 thought 写入 trace，不参与后续消息。
   e. 若无 tool_calls：把 content 视为最终回答，break。
   f. 若有 tool_calls：
      - 将 assistant 消息（content + tool_calls）追加到 messages。
      - 对每个 tool_call：解析 arguments → registry.execute(name, args, ctx) → 得到 obs。
      - 可选：on_after_tool 对 obs 做压缩/改写。
      - 每条 observation 以 role="tool" 追加到 messages。
      - 上下文压缩：_trim_context(messages, _CONTEXT_MAX_CHARS, id_to_name, summarizer)，将过长的历史 tool 结果用摘要替换。
   g. 继续下一 step（LLM 看到新的 tool 结果后再决定是否继续调用或直接回答）。

3. 后置
   - 若 last_answer 为 needs_clarification 的 JSON，解析并改写 result。
   - 若有 session_id，save_turn(session_id, query, answer, ...) 写入 SessionStore。
   - 返回 { answer, thinking, trace, needs_clarification, clarification_questions, error }。
```

要点：

- **终止条件**：本步没有 `tool_calls`（模型直接文本回答），或达到 `max_steps`（由 hint 引导最后一步不再调用工具）。
- **上下文控制**：单条 tool 结果超过 `TOOL_RESULT_MAX_CHARS` 会截断；多轮累积超过 `_CONTEXT_MAX_CHARS` 时，对历史 `role="tool"` 消息做摘要压缩（`context_compression._trim_context` + summarizer）。
- **取消**：每步前后和等待 LLM/tool 时调用 `should_cancel()`，为 True 则抛出 `asyncio.CancelledError`。

### 2.3 Work 的 ReAct 循环（简要）

- `_run_work_flow_react`：  
  - 固定 system（文件列表、客户档位、是否登记 OOS）+ 一条 user 指令。  
  - 使用 `WORK_TOOLS_OPENAI_FORMAT` 和 `execute_work_tool_sync`，无 Registry。  
  - 在 `work_quotation_match` 返回 `needs_human_choice` 时，把当前 messages/trace 等存入 `_work_run_state[run_id]`，返回 `status: "awaiting_choices"`，循环暂停。  
- `_run_work_flow_resume_react`：  
  - 用用户提交的 selections 合并到 pending 选项，恢复 messages，从下一 step 继续调用 LLM，直到完成或再次需要人工选择。

---

## 3. Memory 处理

项目中的「记忆」分为三类：**会话轮次记忆（Session）**、**业务知识记忆（记住/知识库）**、**Work 暂停态（run_id 状态）**。前两者与「React 范式」直接相关。

### 3.1 会话记忆（SessionStore）

- **位置**：`backend/agent/session.py`。  
- **用途**：多轮对话时，把「最近几轮 Q&A」注入到下一轮 user 消息中，让模型理解「当前主题」和上下文。  
- **存储**：  
  - 内存：`SessionStore._mem[session_id]`。  
  - 持久化：可选目录 `SESSION_STORE_DIR`（默认 `data/sessions`），每 session 一个 JSON 文件，包含 `session_id`、`turns`、`file_path`、`label` 等。  
- **单条 Turn**：`query`、`agent`、`answer`、`ts`。  
- **容量**：最多保留 `MAX_TURNS`（如 8）轮；每条 answer 写入时截断到 `ANSWER_TRIM`（如 4000）字符。  
- **注入方式**：  
  - `load(session_id)` 得到 `Session`，`build_injection(session)` 生成「最近 INJECT_TURNS 轮」的摘要文本（每轮答截断到 INJECT_ANSWER_TRIM）。  
  - 在 `execute_react` 中，若有 `session_id` 且 store 存在，把该注入拼到 `user_content` 末尾；若用户本句很短（≤15 字），还会追加「当前意图」提示，绑定到上一轮问题。  
- **写入时机**：`execute_react` 结束且得到 `last_answer` 后，调用 `session_store.save_turn(session_id, query, agent, answer, file_path=..., input_tokens=..., output_tokens=...)`。

因此：**Loop 内不直接存「记忆」**，而是每轮开始时从 SessionStore **读取**历史并注入 prompt，每轮结束时 **写回** 本轮 turn。

### 3.2 业务知识记忆（记住 / 知识库）

- **位置**：`backend/agent/remember.py`。  
- **触发**：  
  - **前置短路**：在进入 `execute_react` 前，由路由/Gateway 调用 `try_handle_remember(user_input)`。  
  - 若匹配「你要记住 / 请记住 / 记住：/ 帮我记住 / 记一下」等句式，则解析出「要记的内容」，追加到业务知识 MD 文件，并**直接返回**回复文案，**不再执行 execute_react**。  
- **存储**：  
  - 文件路径由 `WANDING_BUSINESS_KNOWLEDGE_PATH`（如 inventory config）决定。  
  - 追加格式：`\n\n- [用户添加 YYYY-MM-DD HH:MM] {content}\n`。  
  - 写入后调用 `invalidate_business_knowledge_cache()`，供万鼎选型/LLM selector 下次加载时读到新内容。  
- **工具侧**：  
  - 报价/万鼎等工具可调用 `append_business_knowledge(content)`（例如用户说「记录到知识库」「润色后记录」），由工具内部写入同一知识文件并失效缓存。  
  - 这样「记忆」既可由用户直接说「记住 xxx」在入口处处理，也可在 ReAct 过程中由模型调用 `append_business_knowledge` 写入。

所以：**业务知识记忆** 不在 Loop 的消息列表里维护，而是 **外部文件 + 缓存失效**；Loop 只通过「是否命中 remember 句式」决定是否跳过执行，以及通过工具调用间接写知识库。

### 3.3 Work 暂停态（run_id）

- **位置**：`work_executor._work_run_state`（及 pipeline 的 `_work_pipeline_state`）。  
- **用途**：Work 在 `work_quotation_match` 返回 `needs_human_choice` 时暂停，把当前 `messages`、`trace`、`file_paths`、LLM 配置等存到 `run_id`；用户在前端选完后再用 `resume(run_id, selections)` 恢复。  
- **生命周期**：带 TTL（如 `WORK_RUN_ID_TTL_SECONDS`），超时后 resume 会报错；用完即 `pop(run_id)`。  
- 这是 **运行态暂存**，不是「用户可见的长期记忆」，仅用于 ReAct 流程的暂停/恢复。

### 3.4 小结表

| 类型           | 存储位置                     | 何时读/写                         | 在 React 中的角色           |
|----------------|------------------------------|-----------------------------------|-----------------------------|
| 会话轮次       | SessionStore（内存+JSON 文件） | 每轮开始读并注入；每轮结束写 turn | 注入 prompt，不参与 tool 执行 |
| 业务知识       | 业务知识 MD 文件             | 记住指令时写；选型/匹配时读       | 前置短路或工具调用写；Loop 外 |
| Work 暂停态    | _work_run_state[run_id]      | 需要人工选择时写；resume 时读并删 | 仅 Work 流程的暂停/恢复      |

---

## 4. 数据流简图（Chat 单轮）

```text
用户输入
  → try_handle_remember? → 是 → 写知识文件，直接返回
  → 否
  → SessionStore.load(session_id) → build_injection → 拼入 user_content
  → messages = [system, (可选)excel_summary, user_content]
  → tools = registry.get_definitions()

  ┌─────────────────────────────────────────────────────────┐
  │ for step in range(max_steps):                           │
  │   resp = LLM(messages, tools, tool_choice="auto")       │
  │   if no tool_calls: last_answer = content; break         │
  │   for each tool_call:                                    │
  │     obs = registry.execute(name, args, ctx)              │
  │     on_after_tool?(name, args, obs)                      │
  │     messages += assistant_msg + tool results             │
  │   _trim_context(messages) 若超长                         │
  └─────────────────────────────────────────────────────────┘

  → SessionStore.save_turn(session_id, query, answer, ...)
  → return { answer, thinking, trace, ... }
```

---

## 5. 相关文件索引

| 主题         | 文件 |
|--------------|------|
| Tool 注册表   | `backend/core/registry.py` |
| 扩展与上下文 | `backend/core/extension.py` |
| 主 Agent 与 execute_react | `backend/core/agent.py` |
| 上下文压缩   | `backend/core/context_compression.py` |
| 会话存储     | `backend/agent/session.py` |
| 业务知识记忆 | `backend/agent/remember.py` |
| JAgent 工具注册 | `backend/plugins/jagent/extension.py` |
| 各领域 register_*_tools | `backend/tools/oos/handler.py`、`inventory/handler.py`、`quotation/handler.py` |
| Work 工具与循环 | `backend/agent/work_tools.py`、`backend/agent/work_executor.py` |
| Chat 入口与 remember | `backend/server/api/routes_chat.py`、`backend/server/gateway/handlers/chat.py` |
