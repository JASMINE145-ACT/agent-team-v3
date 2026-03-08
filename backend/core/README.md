# backend/core — Agent 引擎与扩展接口

## Purpose

提供与业务无关的 ReAct 引擎、工具注册表与扩展接口。不依赖具体业务或数据库，仅依赖 LLM 客户端与配置中的 API/路径等。

## Public API

- **CoreAgent** (`agent.py`): ReAct 循环（<think> → tool_call → observation）、消息拼装、步数/取消/流式/fallback。构造时接收 `extensions`、`session_store`；`execute_react()` 为异步入口。
- **ToolRegistry** (`registry.py`): `register(definition, handler)`, `get_definitions()`, `execute(name, args, ctx)`。Extension 通过 ExtensionContext 向其注册工具。
- **AgentExtension** / **ExtensionContext** (`extension.py`): 扩展基类与上下文；子类实现 `register(ctx)`，可选 `get_skill_prompt()`, `get_output_format_prompt()`, `on_before_prompt()`, `on_after_tool()`.
- **get_openai_client** (`llm_client.py`): 返回 OpenAI 兼容客户端，支持 fallback 配置。
- **build_tool_call_id_to_name**, **make_summarizer** (`context_compression.py`): 供 CoreAgent 对历史 tool 结果做摘要与截断。

## Dependencies

- `openai`, `backend.config.Config`, `backend.agent.session.SessionStore`（可选）.
- 无业务包、无 DB 直连。

## Example usage

```python
from backend.core.agent import CoreAgent
from backend.core.registry import ToolRegistry
from backend.core.extension import AgentExtension, ExtensionContext

class MyExtension(AgentExtension):
    def register(self, ctx: ExtensionContext) -> None:
        ctx.register_tool({"type": "function", "function": {"name": "echo", ...}}, echo_handler)
    def get_skill_prompt(self) -> str:
        return "Use echo when..."

agent = CoreAgent(api_key="...", base_url="...", model="...", extensions=[MyExtension()])
result = await agent.execute_react("hello", session_id="...")
```

## How it interacts with the agent system

- **CoreAgent** 在 `__init__` 中遍历 extensions：先 `ext.register(ctx)` 注册工具，再收集 `get_skill_prompt()` / `get_output_format_prompt()` 拼成 system_prompt。
- 每轮 ReAct 中根据 LLM 返回的 tool_calls 调用 `registry.execute(name, args, ctx)`，将 observation 追加到 messages 后继续调用 LLM，直到无 tool_calls 或达 max_steps。
