"""JAgentExtension — JAgent 业务插件，注册全部工具 + 技能 prompt。"""
import json
import logging
from typing import Any, Optional

from backend.core.extension import AgentExtension, ExtensionContext

logger = logging.getLogger(__name__)


class JAgentExtension(AgentExtension):
    """业务扩展：聚合三个领域工具注册，技能/输出格式由 PromptProvider 提供。"""

    def __init__(self, prompt_provider: Optional[Any] = None):
        super().__init__()
        self._prompt_provider = prompt_provider

    def get_skill_prompt(self) -> str:
        if self._prompt_provider is not None:
            return self._prompt_provider.get_skill_prompt()
        from backend.plugins.jagent.skills import CHAT_SKILL_PROMPT
        return CHAT_SKILL_PROMPT

    def get_output_format_prompt(self) -> str:
        if self._prompt_provider is not None:
            return self._prompt_provider.get_output_format_prompt()
        from backend.plugins.jagent.skills import OUTPUT_FORMAT
        return OUTPUT_FORMAT

    def on_after_tool(self, name: str, args: dict, obs: str) -> str:
        """大结果压缩：run_quotation_fill 超过 3000 字时截取前 5 条 items。"""
        if name == "run_quotation_fill" and len(obs) > 3000:
            try:
                data = json.loads(obs)
                items = data.get("items", [])
                if len(items) > 5:
                    data["items"] = items[:5]
                    data["_truncated"] = f"共 {len(items)} 条，已截至前 5 条"
                    return json.dumps(data, ensure_ascii=False)
            except Exception:
                logger.warning("on_after_tool 压缩失败，返回原始 obs", exc_info=True)
        return obs

    def register(self, ctx: ExtensionContext) -> None:
        from backend.tools.oos.handler import register_oos_tools
        from backend.tools.inventory.handler import register_inventory_tools
        from backend.tools.quotation.handler import register_quotation_tools
        register_oos_tools(ctx)
        register_inventory_tools(ctx)
        register_quotation_tools(ctx)
