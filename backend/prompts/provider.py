"""
Prompt 提供方接口与本地实现。
Extension 依赖本接口获取 skill_prompt / output_format，便于切换 local / cloud。
"""
from abc import ABC, abstractmethod


class PromptProvider(ABC):
    """Prompt 提供方接口：技能文案与输出格式。"""

    @abstractmethod
    def get_skill_prompt(self) -> str:
        """返回当前使用的技能描述（注入 CoreAgent system_prompt）。"""
        pass

    @abstractmethod
    def get_output_format_prompt(self) -> str:
        """返回输出格式说明（注入 CoreAgent system_prompt）。"""
        pass


class LocalPromptProvider(PromptProvider):
    """
    本地提供方：从 plugins/jagent/skills 常量读取，与原有行为一致。
    后续可增加从 JSON/YAML 文件读取的实现，或 CloudPromptProvider 从 DB/API 读取。
    """

    def get_skill_prompt(self) -> str:
        from backend.plugins.jagent.skills import CHAT_SKILL_PROMPT
        return CHAT_SKILL_PROMPT

    def get_output_format_prompt(self) -> str:
        from backend.plugins.jagent.skills import OUTPUT_FORMAT
        return OUTPUT_FORMAT
