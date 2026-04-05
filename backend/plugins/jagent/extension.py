"""JAgentExtension — JAgent 业务插件，注册全部工具 + 技能 prompt。"""
import json
import logging
from typing import Any, Optional

from backend.core.extension import AgentExtension, ExtensionContext
from backend.core.language_utils import contains_chinese

logger = logging.getLogger(__name__)

# 前端据此过滤掉紧凑摘要气泡；需与 control-ui/src/ui/app-tool-stream.ts 保持同步
RENDERED_MARKER = "[已渲染到前端]"

# 只允许推送的 chosen 字段，防止内部实现细节泄漏到 SSE
_KNOWN_CHOSEN_FIELDS: set[str] = {"code", "matched_name", "unit_price", "source"}


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
        return OUTPUT_FORMAT if getattr(Config, "USE_CLAUDE_LOOP_PROMPT", False) else OUTPUT_FORMAT_LEGACY

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
        """拦截 match_quotation 结果：推送 tool_render SSE → 返回紧凑摘要给 LLM。"""
        # ── match_quotation: 推送 SSE + 返回紧凑摘要 ──────────────────────────
        if name == "match_quotation":
            logger.info("[on_after_tool] match_quotation called, obs[:200]=%s", obs[:200])
            try:
                data = json.loads(obs)
                single = data.get("single")
                logger.info(
                    "[on_after_tool] single=%s, formatted_response present=%s, chosen present=%s",
                    single,
                    bool(data.get("formatted_response")),
                    bool(data.get("chosen")),
                )
            except Exception as e:
                logger.warning("[on_after_tool] JSON parse failed: %s", e)
                pass
            else:
                if data.get("single"):
                    push = (context or {}).get("push_event")
                    logger.info("[on_after_tool] single=True, push=%s", callable(push))
                    if callable(push):
                        raw_chosen = data.get("chosen") or {}
                        safe_chosen = {
                            k: raw_chosen.get(k)
                            for k in _KNOWN_CHOSEN_FIELDS
                            if k in raw_chosen
                        }
                        push("tool_render", {
                            "formatted_response": data.get("formatted_response", ""),
                            "chosen": safe_chosen,
                            "chosen_index": data.get("chosen_index"),
                            "match_source": data.get("match_source", ""),
                            "selection_reasoning": data.get("selection_reasoning", ""),
                        })
                        logger.info("[on_after_tool] SSE push called successfully")
                    chosen = data.get("chosen") or {}
                    candidates = data.get("candidates") or []
                    codes_preview = "、".join(c.get("code", "") for c in candidates[:5])
                    keywords = (args.get("keywords") or "").strip()
                    compact = (
                        f"{RENDERED_MARKER} 「{keywords}」查询结果："
                        f"已选第{data.get('chosen_index', 0)}条 "
                        f"code={chosen.get('code', '')}「{chosen.get('matched_name', '')}」"
                        f"B级价={chosen.get('unit_price', '')}元。"
                        f"共{len(candidates)}条候选（{codes_preview}…）。"
                        f"如用户追问可直接回答，无需再次输出表格。"
                    )
                    logger.info("[on_after_tool] returning compact (len=%d)", len(compact))
                    return compact
                else:
                    logger.info("[on_after_tool] single=False/None, returning raw obs unchanged")

        # ── 保留原有 run_quotation_fill 结果截断逻辑 ──────────────────────────
        if name == "run_quotation_fill" and len(obs) > 3000:
            try:
                data = json.loads(obs)
                items = data.get("items", [])
                if len(items) > 5:
                    data["items"] = items[:5]
                    data["_truncated"] = f"共 {len(items)} 条，已截至前 5 条"
                    obs = json.dumps(data, ensure_ascii=False)
            except (json.JSONDecodeError, KeyError, IndexError, TypeError) as e:
                logger.warning("on_after_tool 压缩失败，返回原始 obs: %s", e, exc_info=True)

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
