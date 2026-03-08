# backend/plugins — 业务扩展

## Purpose

承载与具体业务相关的扩展：向 CoreAgent 注册工具、提供技能描述与输出格式。每个 Extension 实现 `AgentExtension`，在服务启动时通过 `ExtensionContext` 向 `ToolRegistry` 注册工具，并可提供 `get_skill_prompt()` / `get_output_format_prompt()` 供 CoreAgent 拼 system_prompt。

## Public API

- **AgentExtension**（来自 `backend.core.extension`）: 子类实现 `register(ctx: ExtensionContext)`；可选覆盖 `get_skill_prompt()`, `get_output_format_prompt()`, `on_before_prompt()`, `on_after_tool()`.
- **JAgentExtension** (`jagent/extension.py`): 当前唯一业务扩展，注册库存/无货/报价单等工具，技能与输出格式可通过 `PromptProvider` 注入（默认 `LocalPromptProvider`）。

## Dependencies

- `backend.core.extension`, `backend.core.registry`（通过 ExtensionContext）.
- `backend.prompts`（可选，用于技能/输出格式来源）.
- `backend.tools.*` 或 `backend.agent.tools`（工具实现）.

## Example usage

```python
from backend.plugins.jagent.extension import JAgentExtension
from backend.prompts import LocalPromptProvider

ext = JAgentExtension(prompt_provider=LocalPromptProvider())
# 传入 CoreAgent(extensions=[ext], ...)
```

## How it interacts with the agent system

- 应用启动时构造 `SingleAgent`（或等价 CoreAgent），传入一个或多个 Extension.
- CoreAgent 在初始化时调用每个 Extension 的 `register(ctx)`，再收集各 Extension 的 skill_prompt / output_format 拼成 system_prompt.
- 运行时 LLM 返回的 tool_call 由 Registry 分发到对应 handler，handler 通常调用 backend/tools 或 backend/agent/tools 中的业务逻辑。
