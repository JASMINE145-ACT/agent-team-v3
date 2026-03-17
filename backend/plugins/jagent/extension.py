"""JAgentExtension — JAgent 业务插件，注册全部工具 + 技能 prompt。"""
import json
import logging
from typing import Any, Optional

from backend.core.extension import AgentExtension, ExtensionContext
from backend.core.language_utils import contains_chinese

logger = logging.getLogger(__name__)


class JAgentExtension(AgentExtension):
    """业务扩展：聚合三个领域工具注册，技能/输出格式由 PromptProvider 提供。"""

    def __init__(self, prompt_provider: Optional[Any] = None):
        super().__init__()
        self._prompt_provider = prompt_provider

    def get_skill_prompt(self) -> str:
        if self._prompt_provider is not None:
            return self._prompt_provider.get_skill_prompt()
        from backend.config import Config
        from backend.plugins.jagent.skills import (
            CHAT_SKILL_PROMPT_DOC,
            CHAT_SKILL_PROMPT_RULES,
        )

        use_rules = getattr(Config, "USE_DECISION_RULE_SKILLS", False)
        return CHAT_SKILL_PROMPT_RULES if use_rules else CHAT_SKILL_PROMPT_DOC

    def get_output_format_prompt(self) -> str:
        if self._prompt_provider is not None:
            return self._prompt_provider.get_output_format_prompt()
        from backend.plugins.jagent.skills import OUTPUT_FORMAT, OUTPUT_FORMAT_LEGACY
        from backend.config import Config
        # 根据配置开关返回新旧格式
        return OUTPUT_FORMAT if getattr(Config, "USE_CLAUDE_LOOP_PROMPT", True) else OUTPUT_FORMAT_LEGACY

    def on_before_prompt(self, user_input: str, context: dict) -> str:
        """在进入 ReAct 之前按首轮检测结果注入语言策略说明。"""
        preferred = (context or {}).get("preferred_lang") or "zh"
        if preferred != "en":
            return user_input

        policy = (
            "LANGUAGE POLICY: The user's question is in English. "
            "You MUST answer entirely in English. If any tool outputs are in Chinese, "
            "translate or summarize them in English before responding. Use English for "
            "all explanations, descriptions, and table headers.\n\n"
        )
        return policy + (user_input or "")

    def on_after_tool(self, name: str, args: dict, obs: str, context: dict | None = None) -> str:
        """大结果压缩 + 英文场景下为中文 observation 附加翻译提示。"""
        # 保留原有 run_quotation_fill 结果截断逻辑
        if name == "run_quotation_fill" and len(obs) > 3000:
            try:
                data = json.loads(obs)
                items = data.get("items", [])
                if len(items) > 5:
                    data["items"] = items[:5]
                    data["_truncated"] = f"共 {len(items)} 条，已截至前 5 条"
                    obs = json.dumps(data, ensure_ascii=False)
            except Exception:
                logger.warning("on_after_tool 压缩失败，返回原始 obs", exc_info=True)

        preferred = (context or {}).get("preferred_lang") or "zh"
        if preferred == "en" and contains_chinese(obs):
            obs = (
                f"{obs}\n\n"
                "Translation note: The above tool output is in Chinese. When you answer "
                "the user, translate all relevant information into English and respond "
                "fully in English."
            )
        return obs

    def register(self, ctx: ExtensionContext) -> None:
        from backend.tools.oos.handler import register_oos_tools
        from backend.tools.inventory.handler import register_inventory_tools
        from backend.tools.quotation.handler import register_quotation_tools
        register_oos_tools(ctx)
        register_inventory_tools(ctx)
        register_quotation_tools(ctx)
