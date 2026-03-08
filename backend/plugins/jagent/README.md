# backend/plugins/jagent — JAgent 业务扩展

## Purpose

JAgent 是 version3 当前唯一的业务扩展：为 Chat 场景注册库存、无货、报价单、澄清、业务知识等工具，并提供技能描述与输出格式（来源可通过 PromptProvider 切换，默认从 `skills.py` 读取）。

## Public API

- **JAgentExtension(prompt_provider=None)**: 构造时可选传入 `PromptProvider`；未传则从 `backend.plugins.jagent.skills` 读取 `CHAT_SKILL_PROMPT` 与 `OUTPUT_FORMAT`（向后兼容）.
- **get_skill_prompt()**, **get_output_format_prompt()**: 供 CoreAgent 拼 system_prompt；若已注入 provider 则委托给 provider.

## Dependencies

- `backend.core.extension`, `backend.core.tool_utils`.
- `backend.agent.tools`（无货、询价填充、澄清等实现）.
- `backend.tools.inventory`, `backend.tools.quotation`（库存、报价单工具）.
- `backend.prompts`（可选，用于可切换的 prompt 来源）.
- `backend.plugins.jagent.skills`（当未使用 provider 时的默认文案）.

## Example usage

```python
from backend.prompts import LocalPromptProvider
from backend.plugins.jagent.extension import JAgentExtension

ext = JAgentExtension(prompt_provider=LocalPromptProvider())
# SingleAgent 默认即使用 LocalPromptProvider 构造 JAgentExtension
```

## How it interacts with the agent system

- CoreAgent 初始化时调用 `ext.register(ctx)`，JAgent 向 Registry 注册 get_oos_*、库存、报价单、澄清、知识记录等工具.
- CoreAgent 调用 `ext.get_skill_prompt()` / `ext.get_output_format_prompt()` 拼入 system_prompt.
- 用户消息经 WebSocket/HTTP 进入 execute_react；LLM 选工具后由 Registry 执行对应 handler，handler 内部调用 backend/tools 与 backend/agent/tools 中的服务.
