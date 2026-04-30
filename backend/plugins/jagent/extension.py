"""JAgentExtension — JAgent 业务插件，注册全部工具 + 技能 prompt。"""
import json
import logging
import time
from typing import Any, Optional

from backend.core.extension import AgentExtension, ExtensionContext
from backend.core.language_utils import contains_chinese

logger = logging.getLogger(__name__)

# 前端据此过滤掉紧凑摘要气泡；需与 control-ui/src/ui/app-tool-stream.ts 保持同步
RENDERED_MARKER = "[已渲染到前端]"

# 只允许推送的 chosen 字段，防止内部实现细节泄漏到 SSE
_KNOWN_CHOSEN_FIELDS: set[str] = {"code", "matched_name", "unit_price", "source"}

# --- 从 agent.py 迁移：意图与卡片 ref（仅业务扩展层）---
_REWORK_KEYWORDS = [
    "错了",
    "不对",
    "不是这个",
    "不是这个",
    "重新选",
    "换一个",
    "不对，是",
    "不对，应该是",
    "选另一个",
    "换一下",
]
_INVENTORY_INTENT_KEYWORDS = ["库存", "可售", "有多少", "还有吗", "有没有货", "还有多少"]
_FOLLOWUP_CARD_HINT_WORDS = (
    "这个",
    "对应",
    "上面",
    "那个",
    "其",
    "该产品",
    "这些",
    "这批",
    "上一条",
    "刚才",
    "对应库存",
)


def _detect_rework_intent(text: str) -> bool:
    return any(kw in text for kw in _REWORK_KEYWORDS)


def _detect_inventory_intent(text: str) -> bool:
    return any(kw in str(text or "") for kw in _INVENTORY_INTENT_KEYWORDS)


def _detect_card_followup_intent(text: str) -> bool:
    t = str(text or "").strip()
    if not t or len(t) > 50:
        return False
    return any(h in t for h in _FOLLOWUP_CARD_HINT_WORDS)


def _build_rework_injection(pending: dict) -> str:
    keywords = pending.get("keywords", "")
    options = pending.get("options", [])
    if not options:
        return ""
    lines = [f"\n【请确认正确选项】询价「{keywords}」时有多于候选，"]
    lines.append("系统已按规则预选，但您可以推翻并指出正确选项：\n")
    for i, opt in enumerate(options, 1):
        code = opt.get("code", "")
        name = opt.get("matched_name", "")
        source = opt.get("source", "")
        lines.append(f"  {i}. [{code}] {name} (来源: {source})")
    lines.append("\n请直接回复选项序号或产品名称，指出正确选项。")
    return "\n".join(lines)


def _extract_card_refs_from_obs(name: str, args: dict, obs: str) -> list[dict[str, Any]]:
    refs: list[dict[str, Any]] = []
    try:
        data = json.loads(obs)
    except Exception:
        return refs
    ts = int(time.time() * 1000)
    if name == "match_quotation" and isinstance(data, dict) and data.get("single"):
        chosen = data.get("chosen") or {}
        refs.append(
            {
                "keywords": str(args.get("keywords") or "").strip(),
                "code": str(chosen.get("code") or "").strip(),
                "matched_name": str(chosen.get("matched_name") or "").strip(),
                "unit_price": chosen.get("unit_price"),
                "match_source": str(data.get("match_source") or "").strip(),
                "chosen_index": data.get("chosen_index"),
                "source_tool": name,
                "ts": ts,
            }
        )
    elif name == "match_quotation_batch" and isinstance(data, dict):
        resolved_items = data.get("resolved_items") or []
        if isinstance(resolved_items, list):
            for item in resolved_items:
                if not isinstance(item, dict):
                    continue
                chosen = item.get("chosen") or {}
                refs.append(
                    {
                        "keywords": str(item.get("keywords") or "").strip(),
                        "code": str(chosen.get("code") or "").strip(),
                        "matched_name": str(chosen.get("matched_name") or "").strip(),
                        "unit_price": chosen.get("unit_price"),
                        "match_source": str(item.get("match_source") or "").strip(),
                        "chosen_index": item.get("chosen_index"),
                        "source_tool": name,
                        "ts": ts,
                    }
                )
    return refs


def _handle_batch_obs(obs: str, context: dict | None, _logger: Any) -> str:
    """
    处理 match_quotation_batch 的 observation：
    - 若 obs 是 JSON batch payload → 推送 tool_render SSE + 返回紧凑摘要
    - 若 obs 已是紧凑文本（fallback）→ 直接返回
    """
    try:
        data = json.loads(obs)
    except Exception:
        # obs is already the compact text (serialization fallback)
        _logger.info("[on_after_tool] batch obs is plain text (len=%d)", len(obs))
        return obs if obs.startswith(RENDERED_MARKER) else f"{RENDERED_MARKER} 批量查询完成。{obs}"
    if not data.get("batch_mode"):
        # Not a batch response; return raw obs
        return obs
    push = (context or {}).get("push_event")
    if callable(push) and data.get("formatted_response"):
        push("tool_render", {
            "formatted_response": data.get("formatted_response", ""),
            "keywords": "批量询价",
            "chosen": {},
            "chosen_index": None,
            "match_source": "batch",
            "selection_reasoning": "",
            "batch_mode": True,
            "resolved_items": data.get("resolved_items") or [],
            "pending_items": data.get("pending_items") or [],
            "unmatched_items": data.get("unmatched_items") or [],
        })
        _logger.info("[on_after_tool] batch tool_render SSE pushed")
    else:
        _logger.info("[on_after_tool] batch SSE skipped: push=%s fmt=%s", callable(push), bool(data.get("formatted_response")))
    compact = (
        data.get("batch_compact")
        or f"{RENDERED_MARKER} 批量查询完成（matched={data.get('matched_count', 0)}, "
        f"pending={data.get('pending_count', 0)}, unmatched={data.get('unmatched_count', 0)}）。"
    )
    _logger.info("[on_after_tool] batch compact (len=%d): %s", len(compact), compact[:80])
    return compact


def _handle_inventory_single_obs(obs: str, context: dict | None, _logger: Any) -> str:
    """
    处理 get_inventory_by_code 的 observation：
    - 推送 tool_render SSE + 返回紧凑摘要
    obs 格式：{ success, result: "{inner_json}", data: {item, code}, formatted_response, compact }
    """
    try:
        data = json.loads(obs)
    except Exception:
        _logger.info("[on_after_tool] inventory single obs is plain text (len=%d)", len(obs))
        return obs if obs.startswith(RENDERED_MARKER) else f"{RENDERED_MARKER} {obs}"

    # 尝试从内层 result 中提取 data
    inner_result = data
    try:
        result_str = data.get("result", "")
        if isinstance(result_str, str):
            inner_result = json.loads(result_str)
    except Exception:
        pass

    push = (context or {}).get("push_event")
    formatted_response = data.get("formatted_response") or inner_result.get("formatted_response", "")
    if callable(push) and formatted_response:
        push("tool_render", {
            "formatted_response": formatted_response,
            "keywords": inner_result.get("code", "") or data.get("code", ""),
            "chosen": {},
            "chosen_index": None,
            "match_source": "inventory",
            "selection_reasoning": "",
        })
        _logger.info("[on_after_tool] inventory single tool_render SSE pushed")

    compact = (
        data.get("compact")
        or inner_result.get("compact")
        or f"{RENDERED_MARKER} 物料编号 {inner_result.get('code', data.get('code', ''))} "
        f"库存={inner_result.get('qty_warehouse', '—')}，可售={inner_result.get('qty_available', '—')}。"
    )
    _logger.info("[on_after_tool] inventory single compact (len=%d): %s", len(compact), compact[:80])
    return compact


def _handle_inventory_batch_obs(obs: str, context: dict | None, _logger: Any) -> str:
    """
    处理 get_inventory_by_code_batch 的 observation：
    - 推送 tool_render SSE + 返回紧凑摘要
    obs 格式：{ success, result: "{inner_json}", data: {items, stats}, formatted_response, compact }
    """
    try:
        data = json.loads(obs)
    except Exception:
        _logger.info("[on_after_tool] inventory batch obs is plain text (len=%d)", len(obs))
        return obs if obs.startswith(RENDERED_MARKER) else f"{RENDERED_MARKER} 批量库存查询完成。{obs}"

    # 尝试从内层 result 中提取 data
    inner_result = data
    try:
        result_str = data.get("result", "")
        if isinstance(result_str, str):
            inner_result = json.loads(result_str)
    except Exception:
        pass

    push = (context or {}).get("push_event")
    formatted_response = data.get("formatted_response") or inner_result.get("formatted_response", "")
    if callable(push) and formatted_response:
        push("tool_render", {
            "formatted_response": formatted_response,
            "keywords": "批量库存查询",
            "chosen": {},
            "chosen_index": None,
            "match_source": "inventory_batch",
            "selection_reasoning": "",
            "batch_mode": True,
        })
        _logger.info("[on_after_tool] inventory batch tool_render SSE pushed")

    # 从 data.stats 获取统计信息
    stats = inner_result.get("data", {}).get("stats", {}) if isinstance(inner_result, dict) else {}
    compact = (
        data.get("compact")
        or inner_result.get("compact")
        or f"{RENDERED_MARKER} 批量库存查询完成（found={stats.get('found', 0)}, "
        f"not_found={stats.get('not_found', 0)}）。"
    )
    _logger.info("[on_after_tool] inventory batch compact (len=%d): %s", len(compact), compact[:80])
    return compact


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
        """拦截 match_quotation / match_quotation_batch 结果：推送 tool_render SSE → 返回紧凑摘要给 LLM。"""
        # ── match_quotation_batch: 推送统一汇总卡片 + 返回紧凑摘要 ─────────────────────
        if name == "match_quotation_batch":
            return _handle_batch_obs(obs, context, logger)

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
                # match_quotation auto-routed to batch: obs is batch JSON
                if data.get("batch_mode"):
                    return _handle_batch_obs(obs, context, logger)
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
                        keywords = (args.get("keywords") or "").strip()
                        chosen_code = (raw_chosen.get("code") or "").strip()
                        render_key = f"{keywords}|{chosen_code}" if chosen_code else ""
                        pushed_keys = (context or {}).get("_pushed_render_keys")
                        if not isinstance(pushed_keys, set):
                            # compat: migrate legacy _pushed_codes -> _pushed_render_keys
                            legacy_codes = (context or {}).get("_pushed_codes")
                            pushed_keys = set()
                            if isinstance(legacy_codes, set):
                                for c in legacy_codes:
                                    c_str = str(c or "").strip()
                                    if c_str:
                                        pushed_keys.add(f"|{c_str}")
                            (context or {})["_pushed_render_keys"] = pushed_keys
                        if render_key and render_key in pushed_keys:
                            logger.info("[on_after_tool] skip duplicate tool_render key=%s", render_key)
                        else:
                            if render_key:
                                pushed_keys.add(render_key)
                            push("tool_render", {
                                "formatted_response": data.get("formatted_response", ""),
                                "keywords": keywords,
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
                elif data.get("formatted_response"):
                    # needs_selection / unmatched 等：工具侧已生成与 single 同结构的 Markdown，需推送 SSE 才能走卡片
                    push = (context or {}).get("push_event")
                    keywords = (args.get("keywords") or "").strip()
                    logger.info(
                        "[on_after_tool] list/unmatched formatted_response branch push=%s",
                        callable(push),
                    )
                    if callable(push):
                        push("tool_render", {
                            "formatted_response": data.get("formatted_response", ""),
                            "keywords": keywords,
                            "chosen": {},
                            "chosen_index": None,
                            "match_source": data.get("match_source", ""),
                            "selection_reasoning": "",
                        })
                    cand_n = len(data.get("candidates") or [])
                    parts = []
                    if data.get("unmatched"):
                        parts.append("未自动锁定唯一匹配")
                    if data.get("needs_selection"):
                        parts.append("请从候选中选择或补充规格")
                    compact = (
                        f"{RENDERED_MARKER} 「{keywords}」"
                        f"{'；'.join(parts) if parts else '查询结果'}（共{cand_n}条候选）。"
                        f"表格已在前端展示；回复时仅简短引导，勿重复整张表。"
                    )
                    logger.info("[on_after_tool] list-formatted compact (len=%d)", len(compact))
                    return compact
                else:
                    logger.info("[on_after_tool] single=False/None, returning raw obs unchanged")

        # ── get_inventory_by_code: 推送 SSE + 返回紧凑摘要 ────────────────────────
        if name == "get_inventory_by_code":
            return _handle_inventory_single_obs(obs, context, logger)

        # ── get_inventory_by_code_batch: 推送 SSE + 返回紧凑摘要 ──────────────────
        if name == "get_inventory_by_code_batch":
            return _handle_inventory_batch_obs(obs, context, logger)

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

    def augment_user_content(
        self,
        user_input: str,
        user_content: str,
        session: object | None,
        context: dict,
    ) -> str:
        context["_inventory_intent"] = _detect_inventory_intent(user_input)
        context["_card_followup"] = _detect_card_followup_intent(user_input)
        if (
            _detect_rework_intent(user_input)
            and session is not None
            and getattr(session, "pending_human_choice", None)
        ):
            injection = _build_rework_injection(session.pending_human_choice)
            if injection:
                user_content += f"\n\n{injection}"
        return user_content

    def on_before_tool(self, name: str, args: dict, context: dict) -> dict:
        normalized = dict(args)
        if name == "match_quotation":
            normalized["keywords"] = str(normalized.get("keywords") or "").strip()
            normalized["customer_level"] = (
                str(normalized.get("customer_level") or "B").strip().upper() or "B"
            )
            normalized["show_all_candidates"] = bool(normalized.get("show_all_candidates", False))
        elif name == "match_quotation_batch":
            raw_list = normalized.get("keywords_list") or []
            if isinstance(raw_list, list):
                normalized["keywords_list"] = [str(x).strip() for x in raw_list if str(x).strip()]
            else:
                normalized["keywords_list"] = []
            normalized["customer_level"] = (
                str(normalized.get("customer_level") or "B").strip().upper() or "B"
            )
        return normalized

    def should_stop_loop(
        self, name: str, obs: str, context: dict
    ) -> tuple[bool, str | None]:
        if name not in ("match_quotation", "match_quotation_batch"):
            return False, None
        if not isinstance(obs, str):
            return False, None
        lead = obs.lstrip("\ufeff \t\r\n")
        if not lead.startswith(RENDERED_MARKER):
            return False, None
        if name == "match_quotation_batch":
            return True, obs
        inventory_intent = context.get("_inventory_intent", False)
        if inventory_intent:
            return False, None
        return True, obs

    def tool_result_char_limit(
        self, name: str, default_limit: int, excel_limit: int
    ) -> int:
        if name == "parse_excel_smart":
            return excel_limit
        return default_limit

    def record_tool_cycle_metrics(
        self, name: str, args: dict, obs: str, context: dict
    ) -> None:
        if name == "get_profit_by_price_batch":
            items_arg = args.get("items")
            if isinstance(items_arg, list):
                context["_last_profit_batch_items"] = len(items_arg)
            if "三类统计（按输入条目分类）" in obs:
                context["_last_profit_batch_obs"] = obs

    def get_tool_cache_short_circuit_obs(
        self, name: str, args: dict, context: dict
    ) -> str | None:
        if name != "parse_excel_smart":
            return None
        n = int(context.get("_last_profit_batch_items") or 0)
        prev = context.get("_last_profit_batch_obs")
        if n < 20 or not prev:
            return None
        return (
            f"{prev}\n\n"
            "提示：本轮已完成批量利润率查询（>=20 条），请直接基于该结果整理最终答复，"
            "不要再次调用 Excel 解析工具。"
        )

    def on_tool_complete(
        self,
        name: str,
        args: dict,
        raw_obs: str,
        obs: str,
        context: dict,
    ) -> None:
        session_id: str | None = context.get("session_id")
        store = context.get("_session_store")
        if not session_id or not store:
            return

        if name == "match_quotation":
            try:
                parsed = json.loads(raw_obs)
                if isinstance(parsed, dict):
                    if parsed.get("needs_human_choice"):
                        store.set_pending_human_choice(session_id, parsed)
                    elif parsed.get("single"):
                        store.clear_pending_human_choice(session_id)
            except Exception:
                pass

        try:
            record: dict[str, Any] = {
                "tool": name,
                "ts": int(time.time() * 1000),
                "args": args,
            }
            summary_text = ""
            data_obj: Any = None
            try:
                if obs and len(obs) <= 4000:
                    parsed = json.loads(obs)
                    if isinstance(parsed, dict):
                        data_obj = parsed
                        s = parsed.get("summary")
                        if isinstance(s, str):
                            summary_text = s.strip()
                    elif isinstance(parsed, list):
                        data_obj = parsed
            except Exception:
                pass
            if not summary_text and obs:
                text = str(obs).strip()
                if len(text) > 0:
                    summary_text = text[:180] + ("…" if len(text) > 180 else "")
            if summary_text:
                record["summary"] = summary_text
            if data_obj is not None:
                record["data"] = data_obj
            store.append_tool_memory(session_id, record)
        except Exception:
            logger.debug("on_tool_complete: append_tool_memory 失败", exc_info=True)

        try:
            card_refs = _extract_card_refs_from_obs(name, args, raw_obs)
            if card_refs:
                store.append_card_refs(session_id, card_refs, limit=30)
        except Exception:
            logger.debug("on_tool_complete: append_card_refs 失败", exc_info=True)

    def register(self, ctx: ExtensionContext) -> None:
        from backend.tools.oos.handler import register_oos_tools
        from backend.tools.inventory.handler import register_inventory_tools
        from backend.tools.quotation.handler import register_quotation_tools, make_tool_search_handler
        register_oos_tools(ctx)
        register_inventory_tools(ctx)
        register_quotation_tools(ctx)

        # 注册 tool_search（P0，不 defer；在所有工具注册完成后注册，捕获完整 registry）
        from backend.agent.tools import TOOL_SEARCH_DEF
        ctx.register_tool(TOOL_SEARCH_DEF, make_tool_search_handler(ctx.registry))
