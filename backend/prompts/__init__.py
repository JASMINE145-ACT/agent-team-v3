# Prompt 提供层：统一 skill_prompt / output_format 来源，支持 local 与后续 cloud 切换
from backend.prompts.provider import PromptProvider, LocalPromptProvider

__all__ = ["PromptProvider", "LocalPromptProvider"]
