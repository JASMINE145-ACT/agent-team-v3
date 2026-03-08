# backend/prompts — Prompt 提供层

## Purpose

统一 skill_prompt 与 output_format 的获取方式，使 Extension 依赖「提供方接口」而非写死的常量或文件。便于后续切换为云端（DB/API）或本地文件（JSON/YAML）而不改业务代码。

## Public API

- **PromptProvider** (ABC): `get_skill_prompt() -> str`, `get_output_format_prompt() -> str`.
- **LocalPromptProvider**: 从 `backend.plugins.jagent.skills` 读取 `CHAT_SKILL_PROMPT` 与 `OUTPUT_FORMAT`，与原有行为一致.
- 后续可增加 **CloudPromptProvider**（从 DB/API 读取）、**FilePromptProvider**（从 JSON/YAML 读取）等.

## Dependencies

- 仅 **LocalPromptProvider** 依赖 `backend.plugins.jagent.skills`；其他实现可只依赖 DB 客户端或 HTTP 客户端.
- 无 core/agent 依赖，被 plugins 层使用.

## Example usage

```python
from backend.prompts import LocalPromptProvider
from backend.plugins.jagent.extension import JAgentExtension

provider = LocalPromptProvider()
ext = JAgentExtension(prompt_provider=provider)
# get_skill_prompt() / get_output_format_prompt() 将委托给 provider
```

## How it interacts with the agent system

- JAgentExtension 构造时接收可选的 PromptProvider；若提供，则 `get_skill_prompt()` / `get_output_format_prompt()` 调用 provider，否则回退到 skills 常量.
- SingleAgent 默认使用 `LocalPromptProvider()` 传入 JAgentExtension；部署时可替换为 CloudPromptProvider（需实现并注入）以实现云端文案切换.
