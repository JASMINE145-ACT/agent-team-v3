# 库存 Agent 工具：与 quotation_tracker 一致的 OpenAI function calling 格式，供 ReAct 循环调用
# search_inventory 内仍走 Resolver（CONTAINS + 向量）→ get_items_by_codes，Resolver 不可用时降级为 list.do 关键词查表
from __future__ import annotations

import json
import logging
import re
import threading
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import Any, Optional

from backend.tools.inventory.config import config

logger = logging.getLogger(__name__)

# 候选来源优先级：共同 > 历史报价 > 字段匹配
_SOURCE_PRIORITY = {"共同": 0, "历史报价": 1, "字段匹配": 2}

# 推送给前端的 chosen 字段白名单（与 extension.py 保持同步）
_KNOWN_CHOSEN_FIELDS: set[str] = {"code", "matched_name", "unit_price", "source"}

# 延迟初始化，避免启动时即依赖 src.api.client / src.cache
_table_agent = None
_table_agent_lock = threading.Lock()
_sql_agent = None
_sql_agent_lock = threading.Lock()
_resolver: Optional[Any] = None
_resolver_failed = False
_resolver_lock = threading.Lock()


def _split_batch_keywords(raw_keywords: str) -> list[str]:
    """
    将用户一次输入中的多产品关键词拆分为列表（保持输入顺序）。
    仅按明确分隔符（换行、分号、顿号/逗号）切分；不按空格切分，避免把单产品词组误拆。
    例：
      "直接50\n三通50\n水龙头4分" → ["直接50", "三通50", "水龙头4分"]
      "直接50 三通50"             → []  （单产品，不切）
    """
    text = str(raw_keywords or "").strip()
    if not text:
        return []
    parts = [p.strip() for p in re.split(r"[\n\r;；,，、]+", text) if p and p.strip()]
    if len(parts) >= 2:
        return parts
    return []


def _build_batch_formatted_response(
    keywords_list: list[str],
    resolved_items: list[dict[str, Any]],
    pending_items: list[dict[str, Any]],
    unmatched_items: list[dict[str, Any]],
) -> str:
    lines: list[str] = []
    lines.append(f"**批量询价结果**（共 {len(keywords_list)} 项）")
    lines.append("")
    lines.append("| 序号 | 查询关键词 | 状态 | 产品编号(code) | 产品名称 | 来源 | 单价（B级代理） |")
    lines.append("|---|---|---|---|---|---|---|")

    resolved_by_idx = {int(x.get("input_index", -1)): x for x in resolved_items}
    pending_by_idx = {int(x.get("input_index", -1)): x for x in pending_items}
    unmatched_by_idx = {int(x.get("input_index", -1)): x for x in unmatched_items}

    for i, kw in enumerate(keywords_list):
        if i in resolved_by_idx:
            r = resolved_by_idx[i]
            chosen = r.get("chosen") or {}
            lines.append(
                f"| {i + 1} | {kw} | matched | {chosen.get('code', '—') or '—'} | "
                f"{chosen.get('matched_name', '—') or '—'} | {r.get('match_source', '—') or '—'} | "
                f"{chosen.get('unit_price', '—')} |"
            )
        elif i in pending_by_idx:
            p = pending_by_idx[i]
            opts = p.get("options") or []
            top = opts[0] if isinstance(opts, list) and opts else {}
            lines.append(
                f"| {i + 1} | {kw} | needs_selection | {top.get('code', '—') or '—'} | "
                f"{top.get('matched_name', '待确认') or '待确认'} | {p.get('match_source', '—') or '—'} | "
                f"{top.get('unit_price', '—')} |"
            )
        else:
            _ = unmatched_by_idx.get(i, {})
            lines.append(f"| {i + 1} | {kw} | unmatched | — | — | — | — |")

    if pending_items:
        lines.append("")
        lines.append("**待确认项**")
        for p in pending_items:
            idx = int(p.get("input_index", -1))
            kw = p.get("keywords", "")
            lines.append(f"- 第 {idx + 1} 项「{kw}」需要确认，当前不自动选型。")
    return "\n".join(lines)


def _build_formatted_response(payload: dict[str, Any], keywords: str = "") -> str:
    """
    为 single 结果预渲染 Markdown 输出，供主 LLM 原文复用，避免弱模型字段解析失败。
    格式：查询关键词标题 → 候选全表 → 已选标注 → 查询结果标准表 → 匹配理由。
    """
    candidates = payload.get("candidates") or []
    chosen_index = payload.get("chosen_index", 0)
    chosen = payload.get("chosen") or {}
    match_source = payload.get("match_source", "")
    reasoning = payload.get("selection_reasoning", "")

    lines: list[str] = []

    # ── 查询关键词标题 ─────────────────────────────────────────────────
    if keywords:
        lines.append(f"**查询关键词：{keywords}**")
        lines.append("")

    # ── 候选全表 ──────────────────────────────────────────────────────
    n = len(candidates)
    lines.append(f"**候选产品**（共 {n} 条）")
    lines.append("")
    lines.append("| # | 产品编号(code) | 产品名称 | 来源 | 单价（B级代理） |")
    lines.append("|---|---|---|---|---|")
    for i, c in enumerate(candidates, 1):
        code = c.get("code") or "—"
        name = c.get("matched_name") or "—"
        source = c.get("source") or "—"
        price = c.get("unit_price", "—")
        lines.append(f"| {i} | {code} | {name} | {source} | {price} |")

    lines.append("")
    if chosen_index:
        lines.append(f"**已选：第 {chosen_index} 条**")
        lines.append("")

    # ── 查询结果标准表 ────────────────────────────────────────────────
    lines.append("**查询结果**")
    lines.append("")
    lines.append(f"匹配来源：{match_source}")
    lines.append("")
    lines.append("| 产品编号(code) | 产品名称 | 来源 | 单价（B级代理） |")
    lines.append("|---|---|---|---|")
    code = chosen.get("code") or "—"
    name = chosen.get("matched_name") or "—"
    price = chosen.get("unit_price", "—")
    source = next(
        (c.get("source") for c in candidates if (c.get("code") or "") == code),
        match_source,
    )
    lines.append(f"| {code} | {name} | {source} | {price} |")

    if reasoning:
        lines.append("")
        lines.append(f"匹配理由：{reasoning}")

    return "\n".join(lines)


def _build_formatted_response_list_only(
    keywords: str,
    candidates: list[dict[str, Any]],
    match_source: str,
    notice: str,
) -> str:
    """
    无 single/已选时的预渲染 Markdown：仅关键词 + 说明 + 来源 + 候选表。
    供 unmatched / needs_selection 路径输出 formatted_response，前端与主模型可卡片化展示，
    避免仅返回 JSON 时主模型改写成大段自由文本。
    """
    lines: list[str] = []
    if keywords:
        lines.append(f"**查询关键词：{keywords}**")
        lines.append("")
    if notice.strip():
        lines.append(notice.strip())
        lines.append("")
    lines.append(f"**匹配来源**：{match_source or '—'}")
    lines.append("")
    n = len(candidates)
    lines.append(f"**候选产品**（共 {n} 条）")
    lines.append("")
    lines.append("| # | 产品编号(code) | 产品名称 | 来源 | 单价（B级代理） |")
    lines.append("|---|---|---|---|---|")
    for i, c in enumerate(candidates, 1):
        code = c.get("code") or "—"
        name = c.get("matched_name") or "—"
        source = c.get("source") or "—"
        price = c.get("unit_price", "—")
        lines.append(f"| {i} | {code} | {name} | {source} | {price} |")
    lines.append("")
    lines.append(
        "**提示**：请从表中选择一条物料编号，或补充更具体的型号/系列；"
        "若需系统代为默认选型，可说明「选第一个」等。"
    )
    return "\n".join(lines)


def _attach_table_code_hint(payload: dict[str, Any]) -> None:
    """
    在 single 结果顶层重复物料编号，降低主模型在 Markdown 表格里用「—」占位而丢失 code 的概率。
    （最终表格由对话 LLM 生成，非后端渲染。）
    """
    if not payload.get("single"):
        return
    ch = payload.get("chosen")
    if not isinstance(ch, dict):
        return
    code = str(ch.get("code", "") or "").strip()
    if code:
        payload["table_product_code"] = code


def _get_table_agent():
    global _table_agent
    if _table_agent is None:
        with _table_agent_lock:
            if _table_agent is None:
                try:
                    from backend.tools.inventory.agents.table_agent import InventoryTableAgent
                    _table_agent = InventoryTableAgent()
                except ModuleNotFoundError as e:
                    if "src" in str(e):
                        logger.warning("No module named 'src': %s", e)
                        raise  # 由 execute_inventory_tool 外层统一转为友好返回
                    raise
                except Exception as e:
                    logger.warning("InventoryTableAgent 初始化失败（需配置 AOL_* 或 src.api.client）: %s", e)
                    raise
    return _table_agent


def _get_sql_agent():
    global _sql_agent
    if _sql_agent is None:
        with _sql_agent_lock:
            if _sql_agent is None:
                from backend.tools.inventory.agents.sql_agent import InventorySQLAgent
                _sql_agent = InventorySQLAgent()
    return _sql_agent


def _execute_match_by_quotation_history(arguments: dict[str, Any]) -> dict[str, Any]:
    """
    历史匹配（只读）：
    - 输入：keywords（询价名称+规格）、可选 customer_level。
    - 行为：用映射表按「名称+规格」取 top3，再按档位到万鼎价格库查价。
    - 返回：未匹配 / single / needs_selection，其中 unit_price 来自万鼎（customer_level 默认 B），不写任何数据库。
    """
    try:
        from backend.tools.inventory.services.mapping_table_matcher import match_mapping_top_candidates
        from backend.tools.inventory.services.wanding_fuzzy_matcher import get_wanding_price_by_code

        keywords = (arguments.get("keywords") or "").strip()
        if not keywords:
            return {"success": True, "result": "请提供 keywords（产品名+规格）。"}
        customer_level = (arguments.get("customer_level") or "B").strip().upper() or "B"

        candidates = match_mapping_top_candidates(keywords, mapping_path=None, top_k=3)
        if not candidates:
            return {"success": True, "result": f"历史匹配未命中：{keywords}"}

        norm = []
        for c in candidates:
            code = str(c.get("code", "")).strip()
            matched_name = str(c.get("matched_name", "")).strip()
            unit_price = 0.0
            price_row = get_wanding_price_by_code(code, customer_level=customer_level)
            if price_row is not None:
                unit_price = float(price_row.get("unit_price", 0) or 0)
            norm.append({"code": code, "matched_name": matched_name, "unit_price": unit_price})

        if len(norm) == 1:
            r = norm[0]
            payload = {"single": True, "candidates": norm, "chosen": r, "chosen_index": 1, "match_source": "历史报价"}
            _attach_table_code_hint(payload)
            return {"success": True, "result": json.dumps(payload, ensure_ascii=False)}
        payload = {"needs_selection": True, "keywords": keywords, "candidates": norm, "match_source": "历史报价"}
        return {"success": True, "result": json.dumps(payload, ensure_ascii=False)}
    except Exception as e:
        logger.exception("match_by_quotation_history 失败")
        return {"success": False, "error": str(e), "result": f"历史匹配失败: {e}"}


def _execute_match_quotation(arguments: dict[str, Any], push_event=None) -> dict[str, Any]:
    """
    询价匹配（只读）：
    - 输入：keywords（中文产品名+规格）、可选 customer_level。
    - 行为：同时查报价历史与万鼎字段匹配，取并集并按 source（历史报价/字段匹配/共同）标记。
    - 返回：{ single | needs_selection | unmatched, candidates[], chosen?, match_source }，用于查 code/价格/档位。
    - needs_selection + low_confidence_options：内置 LLM 无把握时返回精简 options（非整表强选）；unmatched+llm_rejected：LLM 判定 index 0 无匹配。
    """
    try:
        _push_event = push_event if callable(push_event) else (lambda *_: None)
        from backend.tools.inventory.services.match_and_inventory import match_quotation_union

        keywords = (arguments.get("keywords") or "").strip()
        if not keywords:
            return {"success": True, "result": "请提供 keywords（产品名+规格）。"}
        customer_level = (arguments.get("customer_level") or "B").strip().upper() or "B"
        show_all = bool(arguments.get("show_all_candidates", False))
        if not show_all:
            batch_keywords = _split_batch_keywords(keywords)
            min_batch = max(2, int(getattr(config, "MATCH_QUOTATION_BATCH_MIN_ITEMS", 3) or 3))
            if len(batch_keywords) >= min_batch:
                return _execute_match_quotation_batch(
                    {"keywords_list": batch_keywords, "customer_level": customer_level},
                    push_event=push_event,
                    ctx=arguments if isinstance(arguments, dict) else None,
                )

        candidates = match_quotation_union(keywords, customer_level=customer_level)
        if not candidates:
            return {"success": True, "result": json.dumps({"unmatched": True, "keywords": keywords}, ensure_ascii=False)}

        norm = [
            {"code": str(c.get("code", "")), "matched_name": str(c.get("matched_name", "")), "unit_price": float(c.get("unit_price", 0) or 0), "source": c.get("source", "未知")}
            for c in candidates
        ]
        # 强制来源优先级稳定排序：共同 > 历史报价 > 字段匹配
        norm = sorted(
            norm,
            key=lambda c: _SOURCE_PRIORITY.get((c.get("source") or "").strip(), 99),
        )
        max_show = 15
        norm = norm[:max_show]
        # 即使仅 1 条候选也走 llm_select_best：避免并集只命中「异径三通」等时直接当成 single，
        # 使业务规则（如等径优于异径）可通过 index:0 / 低置信度 options 纠正。
        from backend.tools.inventory.services.llm_selector import llm_select_best

        sources_present = [
            src for src in ("共同", "历史报价", "字段匹配")
            if any((c.get("source") or "").strip() == src for c in norm)
        ]
        match_source_str = "、".join(sources_present) if sources_present else "未知"

        # tool_candidates is always pushed when candidates exist.
        # tool_selection_done is only pushed in the single-choice path (confident LLM result).
        # SSE consumers must NOT treat tool_selection_done as a mandatory terminal event.
        _push_event("tool_candidates", {
            "keywords": keywords,
            "candidates": norm,
            "match_source": match_source_str,
        })

        # Fast-path: user wants full list, skip LLM selection entirely
        if show_all:
            payload = {
                "needs_selection": True,
                "show_all_candidates": True,
                "keywords": keywords,
                "candidates": norm[:max_show],
                "match_source": match_source_str,
            }
            payload["formatted_response"] = _build_formatted_response_list_only(
                keywords,
                norm[:max_show],
                match_source_str,
                notice="**说明**：已列出全部候选（未做自动单选）。",
            )
            return {"success": True, "result": json.dumps(payload, ensure_ascii=False)}

        try:
            r = llm_select_best(keywords, norm)
        except Exception as e:
            logger.warning("llm_select_best 调用失败，降级为 needs_selection: %s", e)
            payload = {
                "needs_selection": True,
                "llm_error": True,
                "keywords": keywords,
                "candidates": norm,
                "match_source": match_source_str,
            }
            payload["formatted_response"] = _build_formatted_response_list_only(
                keywords,
                norm,
                match_source_str,
                notice="**说明**：自动选型服务暂不可用，以下为检索到的候选列表。",
            )
            return {"success": True, "result": json.dumps(payload, ensure_ascii=False)}
        if r is None:
            # llm_select_best 返回 None = LLM 判定"无候选真正匹配"（index: 0）
            # → 改为 unmatched：告知用户无匹配，而不是让用户从 15 条里再挑
            payload = {
                "unmatched": True,
                "llm_rejected": True,
                "keywords": keywords,
                "candidates": norm,
                "match_source": match_source_str,
            }
            payload["formatted_response"] = _build_formatted_response_list_only(
                keywords,
                norm,
                match_source_str,
                notice="**说明**：未自动锁定与关键词完全对应的单一物料；下列为相关候选（请从表中选择或补充规格）。",
            )
            return {"success": True, "result": json.dumps(payload, ensure_ascii=False)}

        # LLM 无把握（confident: false）：返回精简 options，避免误当成 single 或丢选项
        if r.get("_suggestions") and r.get("options"):
            options = r.get("options") or []
            by_code = {(c.get("code") or "").strip(): c for c in norm}
            for opt in options:
                if not isinstance(opt, dict):
                    continue
                oc = (opt.get("code") or "").strip()
                src = (by_code.get(oc) or {}).get("source") or match_source_str
                opt["source"] = src
            payload = {
                "needs_selection": True,
                "low_confidence_options": True,
                "keywords": keywords,
                "options": options,
                "candidates": norm,
                "match_source": match_source_str,
            }
            payload["formatted_response"] = _build_formatted_response_list_only(
                keywords,
                norm,
                match_source_str,
                notice="**说明**：系统置信度较低，已列出精简选项与完整候选表；请确认其一或补充描述。",
            )
            return {"success": True, "result": json.dumps(payload, ensure_ascii=False)}

        chosen_code = (r.get("code") or "").strip()
        chosen_index = 0
        for i, c in enumerate(norm):
            if (c.get("code") or "").strip() == chosen_code:
                chosen_index = i + 1
                break

        chosen = {"code": r.get("code", ""), "matched_name": r.get("matched_name", ""), "unit_price": r.get("unit_price", 0)}
        selection_meta = r.get("_selection_meta") or {}
        payload = {
            "single": True,
            "candidates": norm,
            "chosen": chosen,
            "chosen_index": chosen_index,
            "selection_reasoning": r.get("reasoning", ""),
            "match_source": match_source_str,
            "fallback": selection_meta.get("from_rule_fallback", False),
        }
        payload["formatted_response"] = _build_formatted_response(payload, keywords=keywords)
        _push_event("tool_selection_done", {
            "chosen_index": chosen_index,
            "reasoning": r.get("reasoning", ""),
        })
        # tool_render is handled exclusively by extension.py on_after_tool to avoid duplicate SSE pushes.
        _attach_table_code_hint(payload)
        return {"success": True, "result": json.dumps(payload, ensure_ascii=False)}
    except Exception as e:
        logger.exception("match_quotation 失败")
        return {"success": False, "error": str(e), "result": f"询价匹配失败: {e}"}


def _execute_match_wanding_price(arguments: dict[str, Any]) -> dict[str, Any]:
    """
    字段匹配（只读，万鼎价格库）：按产品名+规格在万鼎价格库中匹配，不查映射表。
    返回：未匹配 / single / needs_selection；多候选时由上层根据需要调用 select_wanding_match。
    """
    try:
        from backend.tools.inventory.services.match_and_inventory import match_wanding_price_candidates

        keywords = (arguments.get("keywords") or "").strip()
        if not keywords:
            return {"success": True, "result": "请提供 keywords（产品名+规格）。"}
        customer_level = (arguments.get("customer_level") or "B").strip().upper() or "B"

        candidates = match_wanding_price_candidates(keywords, customer_level=customer_level)
        if not candidates:
            return {"success": True, "result": f"未匹配到产品：{keywords}"}

        norm = [
            {"code": str(c.get("code", "")), "matched_name": str(c.get("matched_name", "")), "unit_price": float(c.get("unit_price", 0) or 0)}
            for c in candidates
        ]
        max_candidates_for_react = 10
        norm_truncated = norm[:max_candidates_for_react]

        if len(norm_truncated) == 1:
            r = norm_truncated[0]
            payload = {"single": True, "candidates": norm_truncated, "chosen": r, "chosen_index": 1, "match_source": "字段匹配"}
            _attach_table_code_hint(payload)
            return {"success": True, "result": json.dumps(payload, ensure_ascii=False)}
        payload = {"needs_selection": True, "keywords": keywords, "candidates": norm_truncated, "match_source": "字段匹配"}
        return {"success": True, "result": json.dumps(payload, ensure_ascii=False)}
    except Exception as e:
        logger.exception("match_wanding_price 失败")
        return {"success": False, "error": str(e), "result": f"匹配失败: {e}"}


def _execute_get_profit_by_price(arguments: dict[str, Any]) -> dict[str, Any]:
    """
    利润率查询（只读，万鼎价格库）：
    - 输入：code（可选）、product_name（可选）、price（必填，成交价/报单价）。
    - 行为：按 code 或完整名称在万鼎价格库定位行，对每行计算与给定价格精确匹配的档位及其利润率，并返回所有档位价格/利润率。
    - 返回：{ success, result(自然语言总结), data: { rows[] } }，rows 每项含 code/name/matched_price_level/matched_price/matched_profit/all_levels[]。
    """
    from backend.tools.inventory.config import config
    from backend.tools.inventory.services.wanding_fuzzy_matcher import (
        get_profit_rows_by_code,
        get_profit_rows_by_name,
        normalize_price,
    )

    code = (arguments.get("code") or "").strip()
    product_name = (arguments.get("product_name") or "").strip()
    if not code and not product_name:
        return {"success": True, "result": "请提供 code 或 product_name（至少一个）。"}

    if "price" not in arguments:
        return {"success": True, "result": "请提供 price（成交价/报单价）。"}

    raw_price = arguments.get("price")
    try:
        price = normalize_price(raw_price)
    except Exception as e:
        # 价格格式不合法或存在歧义，视为校验错误，不继续向下查库
        return {
            "success": True,
            "result": f"价格格式不合法或存在歧义，请检查后重试：{raw_price!r}（{e}）",
            "data": {
                "error_type": "validation_error",
                "field": "price",
                "raw_value": raw_price,
                "message": str(e),
            },
        }

    path = config.PRICE_LIBRARY_PATH
    try:
        rows: list[dict[str, Any]] = []
        if code:
            rows = get_profit_rows_by_code(code, price, path)
        elif product_name:
            rows = get_profit_rows_by_name(product_name, price, path)
    except Exception as e:
        logger.exception("get_profit_by_price 失败")
        return {"success": False, "error": str(e), "result": f"查询利润率失败: {e}"}

    if not rows:
        key_desc = code or product_name
        return {
            "success": True,
            "result": f"未在万鼎价格库中找到与「{key_desc}」匹配的产品。",
            "data": {"rows": []},
        }

    # 组装自然语言 summary
    lines: list[str] = []
    for r in rows:
        code_str = r.get("code") or code or "-"
        name_str = r.get("name") or product_name or "-"
        matched_level = r.get("matched_price_level")
        matched_price = r.get("matched_price")
        matched_profit = r.get("matched_profit")
        if matched_level:
            level_display = f"{matched_level}"
            try:
                from backend.tools.inventory.services.wanding_fuzzy_matcher import PRICE_LEVEL_DISPLAY_NAMES

                level_display = PRICE_LEVEL_DISPLAY_NAMES.get(matched_level, matched_level)
            except Exception:
                pass
            profit_pct = f"{matched_profit:.2%}" if isinstance(matched_profit, (int, float)) else "未知"
            lines.append(
                f"编号 {code_str}（{name_str}）在万鼎价格库中，按你给的价格 {matched_price:g}，"
                f"对应档位 {level_display}，对应利润率约 {profit_pct}。"
            )
        else:
            lines.append(
                f"编号 {code_str}（{name_str}）在万鼎价格库中找到了记录，但无法根据价格 {price:g} 匹配到具体档位。"
            )
    if len(rows) > 1:
        lines.insert(0, f"在万鼎价格库中找到 {len(rows)} 条记录：")

    return {
        "success": True,
        "result": "\n".join(lines),
        "data": {"rows": rows},
    }


BATCH_PROFIT_MAX_ITEMS = 50


# skip_reason 仅三种枚举，不写自然语言
SKIP_REASON_MISSING_CODE = "missing_code"
SKIP_REASON_MISSING_PRICE = "missing_price"
SKIP_REASON_INVALID_PRICE = "invalid_price"


def _execute_get_profit_by_price_batch(arguments: dict[str, Any]) -> dict[str, Any]:
    """
    批量利润率查询（只读，万鼎价格库）：对多组 code+price 一次性查万鼎利润率。
    - 入参：items 为 list[dict]，每项 {"code": str, "price": number}；单次最多 50 条，超出仅处理前 50 条。
    - 返回：{ success, result, data: { rows, stats, items } }。data.items 与输入 1:1，每项含 input_index、code、price、item_status、name；matched 时有 matched_price/matched_profit/matched_price_level；skipped 时有 skip_reason（仅 missing_code|missing_price|invalid_price）。
    """
    from backend.tools.inventory.config import config
    from backend.tools.inventory.services.wanding_fuzzy_matcher import (
        get_profit_rows_by_code,
        normalize_price,
        PRICE_LEVEL_DISPLAY_NAMES,
    )

    raw_items = arguments.get("items")
    if not isinstance(raw_items, list) or not raw_items:
        return {"success": True, "result": "请提供 items（至少一组 code+price）。", "data": {"rows": [], "items": []}}

    items = raw_items[:BATCH_PROFIT_MAX_ITEMS]
    truncated = len(raw_items) > BATCH_PROFIT_MAX_ITEMS
    path = config.PRICE_LIBRARY_PATH

    all_rows: list[dict[str, Any]] = []
    items_with_status: list[dict[str, Any]] = []
    matched_lines: list[str] = []
    price_miss_lines: list[str] = []
    code_not_found_lines: list[str] = []
    skipped_lines: list[str] = []
    processed_items = 0
    matched_items = 0
    price_miss_items = 0
    code_not_found_items = 0

    for idx, it in enumerate(items):
        if not isinstance(it, dict):
            items_with_status.append({
                "input_index": idx,
                "code": "",
                "price": None,
                "item_status": "skipped",
                "name": "",
                "skip_reason": SKIP_REASON_INVALID_PRICE,
            })
            skipped_lines.append(f"第 {idx + 1} 条：条目不是对象，已跳过。")
            continue
        code = (it.get("code") or "").strip()
        if not code:
            items_with_status.append({
                "input_index": idx,
                "code": "",
                "price": None,
                "item_status": "skipped",
                "name": "",
                "skip_reason": SKIP_REASON_MISSING_CODE,
            })
            skipped_lines.append(f"第 {idx + 1} 条：缺少 code，已跳过。")
            continue
        if "price" not in it:
            items_with_status.append({
                "input_index": idx,
                "code": code,
                "price": None,
                "item_status": "skipped",
                "name": "",
                "skip_reason": SKIP_REASON_MISSING_PRICE,
            })
            skipped_lines.append(f"编号 {code}：未提供 price，已跳过。")
            continue
        try:
            price = normalize_price(it.get("price"))
        except Exception as e:
            items_with_status.append({
                "input_index": idx,
                "code": code,
                "price": None,
                "item_status": "skipped",
                "name": "",
                "skip_reason": SKIP_REASON_INVALID_PRICE,
            })
            skipped_lines.append(f"编号 {code}：价格格式不合法（{e}），已跳过。")
            continue
        processed_items += 1
        try:
            rows = get_profit_rows_by_code(code, price, path)
        except Exception as e:
            logger.debug("get_profit_by_price_batch 单条失败 code=%s: %s", code, e)
            items_with_status.append({
                "input_index": idx,
                "code": code,
                "price": price,
                "item_status": "skipped",
                "name": "",
                "skip_reason": SKIP_REASON_INVALID_PRICE,
            })
            skipped_lines.append(f"编号 {code}：查询失败，已跳过。")
            continue
        if not rows:
            code_not_found_items += 1
            items_with_status.append({
                "input_index": idx,
                "code": code,
                "price": price,
                "item_status": "code_not_found",
                "name": "",
            })
            code_not_found_lines.append(f"编号 {code}（报价 {price:g}）：未在万鼎价格库中找到该编号。")
            continue

        for r in rows:
            all_rows.append(r)

        matched_rows = [r for r in rows if r.get("matched_price_level")]
        if matched_rows:
            matched_items += 1
            r0 = matched_rows[0]
            name_str = (r0.get("name") or "").strip() or ""
            items_with_status.append({
                "input_index": idx,
                "code": code,
                "price": price,
                "item_status": "matched",
                "name": name_str,
                "matched_price": r0.get("matched_price"),
                "matched_profit": r0.get("matched_profit"),
                "matched_price_level": r0.get("matched_price_level"),
            })
            for r in matched_rows:
                code_str = r.get("code") or code or "-"
                name_display = (r.get("name") or "").strip() or "-"
                matched_level = r.get("matched_price_level")
                matched_price = r.get("matched_price")
                matched_profit = r.get("matched_profit")
                level_display = (
                    PRICE_LEVEL_DISPLAY_NAMES.get(matched_level, matched_level)
                    if PRICE_LEVEL_DISPLAY_NAMES
                    else matched_level
                )
                profit_pct = f"{matched_profit:.2%}" if isinstance(matched_profit, (int, float)) else "未知"
                matched_lines.append(
                    f"编号 {code_str}（{name_display}）：报价 {price:g} 命中档位 {level_display}"
                    f"（档位价 {matched_price:g}，利润率 {profit_pct}）。"
                )
            continue

        price_miss_items += 1
        name_str = (rows[0].get("name") or "").strip() if rows else ""
        items_with_status.append({
            "input_index": idx,
            "code": code,
            "price": price,
            "item_status": "price_miss",
            "name": name_str,
        })
        for r in rows:
            code_str = r.get("code") or code or "-"
            name_display = (r.get("name") or "").strip() or "-"
            price_miss_lines.append(
                f"编号 {code_str}（{name_display}）：在库中有记录，但报价 {price:g} 未命中任何档位。"
            )

    lines: list[str] = []
    if truncated:
        lines.insert(0, f"（本次仅处理前 {BATCH_PROFIT_MAX_ITEMS} 条，共 {len(raw_items)} 条请求；其余请分批调用。）")
    if processed_items == 0:
        if skipped_lines:
            lines.append("三类统计：命中 0；价格未命中 0；编号未找到 0。")
            lines.append(f"跳过条目：{len(skipped_lines)}。")
            lines.append("")
            lines.append("【跳过明细】")
            lines.extend(skipped_lines)
        else:
            lines.append("未解析到有效的 code+price 条目。")
        return {"success": True, "result": "\n".join(lines), "data": {"rows": [], "items": items_with_status}}

    lines.append("三类统计（按输入条目分类）：")
    lines.append(f"- 命中（编号存在且价格命中档位）：{matched_items}")
    lines.append(f"- 价格未命中（编号存在但价格未命中档位）：{price_miss_items}")
    lines.append(f"- 编号未找到（价格库中无该编号）：{code_not_found_items}")
    lines.append(f"- 已处理条目：{processed_items}")
    if skipped_lines:
        lines.append(f"- 跳过条目：{len(skipped_lines)}")

    if matched_lines:
        lines.append("")
        lines.append("【命中明细】")
        lines.extend(matched_lines)
    if price_miss_lines:
        lines.append("")
        lines.append("【价格未命中明细】")
        lines.extend(price_miss_lines)
    if code_not_found_lines:
        lines.append("")
        lines.append("【编号未找到明细】")
        lines.extend(code_not_found_lines)
    if skipped_lines:
        lines.append("")
        lines.append("【跳过明细】")
        lines.extend(skipped_lines)

    return {
        "success": True,
        "result": "\n".join(lines),
        "data": {
            "rows": all_rows,
            "stats": {
                "matched": matched_items,
                "price_miss": price_miss_items,
                "code_not_found": code_not_found_items,
                "processed": processed_items,
                "skipped": len(skipped_lines),
                "input_count": len(items),
                "truncated": truncated,
                "input_total": len(raw_items),
            },
            "items": items_with_status,
        },
    }


def _execute_get_inventory_by_code_batch(arguments: dict[str, Any]) -> dict[str, Any]:
    """
    批量按 code 查库存（只读，ACCURATE 库存表）：
    - 入参：codes 为 list[str]，每项为 10 位物料编号；单次最多 50 条，超出仅处理前 50 条。
    - 返回：{ success, result, data: { items, stats } }。data.items 与输入 1:1，每项含 input_index、code、item_status、item；
      item_status 为 found | not_found | invalid_code，item 为 table.get_item_by_code 的原始结果（未找到时为 None）。
    """
    from backend.tools.inventory.config import config

    raw_codes = arguments.get("codes")
    if not isinstance(raw_codes, list) or not raw_codes:
        return {
            "success": True,
            "result": "请提供 codes（至少一个物料编号）。",
            "data": {
                "items": [],
                "stats": {
                    "found": 0,
                    "not_found": 0,
                    "invalid": 0,
                    "input_count": 0,
                    "truncated": False,
                    "input_total": 0,
                },
            },
        }

    # 只处理前 N 条，保持与批量利润率逻辑一致
    max_codes = getattr(config, "MAX_CODES_PER_BATCH", 50)
    codes = raw_codes[:max_codes]
    truncated = len(raw_codes) > max_codes

    # 预处理：去重非空 code，用于真正的批量查询
    normalized_codes: list[str] = []
    for raw in codes:
        c = str(raw or "").strip()
        if not c:
            continue
        if c not in normalized_codes:
            normalized_codes.append(c)

    try:
        table = _get_table_agent()
        sql_agent = _get_sql_agent()
    except Exception as e:
        logger.exception("get_inventory_by_code_batch 初始化库存 Agent 失败")
        # 全局失败时仍返回结构化 stats，便于上游处理
        return {
            "success": False,
            "error": str(e),
            "result": f"批量查库存失败: {e}",
            "data": {
                "items": [],
                "stats": {
                    "found": 0,
                    "not_found": 0,
                    "invalid": len(codes),
                    "input_count": len(codes),
                    "truncated": truncated,
                    "input_total": len(raw_codes),
                },
            },
        }

    # 真正的批量查询：一次性按去重后的 codes 拉取所有 Item
    items: list[Any] = []
    if normalized_codes:
        try:
            items = table.get_items_by_codes(normalized_codes)
        except Exception as e:
            logger.exception("get_inventory_by_code_batch 调用 get_items_by_codes 失败: %s", e)
            return {
                "success": False,
                "error": str(e),
                "result": f"批量查库存失败: {e}",
                "data": {
                    "items": [],
                    "stats": {
                        "found": 0,
                        "not_found": 0,
                        "invalid": len(codes),
                        "input_count": len(codes),
                        "truncated": truncated,
                        "input_total": len(raw_codes),
                    },
                },
            }

    # 构建 code -> Item 映射（以 item_no 为主，必要时回退到列表遍历）
    code_to_item: dict[str, Any] = {}
    for it in items or []:
        try:
            key = (it.item_no or "").strip()
        except Exception:
            key = ""
        if key:
            # 仅第一次出现生效，后续重复忽略，避免覆盖
            code_to_item.setdefault(key, it)

    items_with_status: list[dict[str, Any]] = []
    found = 0
    not_found = 0
    invalid = 0
    lines: list[str] = []

    for idx, raw in enumerate(codes):
        code = str(raw or "").strip()
        if not code:
            invalid += 1
            items_with_status.append(
                {
                    "input_index": idx,
                    "code": "",
                    "item_status": "invalid_code",
                    "item": None,
                }
            )
            continue

        item = code_to_item.get(code)
        if item:
            found += 1
            items_with_status.append(
                {
                    "input_index": idx,
                    "code": code,
                    "item_status": "found",
                    "item": item,
                }
            )
        else:
            not_found += 1
            items_with_status.append(
                {
                    "input_index": idx,
                    "code": code,
                    "item_status": "not_found",
                    "item": None,
                }
            )

    if truncated:
        lines.append(f"（本次仅处理前 {max_codes} 条，共 {len(raw_codes)} 个编号；其余请分批调用。）")
    lines.append("库存查询统计（按输入编号分类）：")
    lines.append(f"- 命中（查到库存行）：{found}")
    lines.append(f"- 未找到（库存表中无该编号）：{not_found}")
    lines.append(f"- 编码无效或查询失败：{invalid}")
    lines.append(f"- 已处理编号：{len(codes)}")

    try:
        # 补充一段紧凑的明细表，便于人读
        found_items = [it for it in items_with_status if it.get("item_status") == "found" and it.get("item")]
        if found_items:
            lines.append("")
            lines.append("【命中明细（简表）】")
            formatted = sql_agent.format_response([it["item"] for it in found_items])
            lines.append(formatted)
    except Exception:
        # 明细表渲染失败不影响主结构
        pass

    return {
        "success": True,
        "result": "\n".join(lines),
        "data": {
            "items": items_with_status,
            "stats": {
                "found": found,
                "not_found": not_found,
                "invalid": invalid,
                "input_count": len(codes),
                "truncated": truncated,
                "input_total": len(raw_codes),
            },
        },
    }


_MATCH_QUOTATION_BATCH_MAX_ITEMS = int(
    getattr(config, "MATCH_QUOTATION_BATCH_MAX_ITEMS", 0) or 0
) or 20  # 并行执行后可适当提高上限
_MATCH_QUOTATION_BATCH_MAX_WORKERS = int(
    getattr(config, "MATCH_QUOTATION_BATCH_MAX_WORKERS", 0) or 0
) or 8  # 单次最大并行线程数（受 LLM API 并发限制）


def _execute_match_quotation_batch(arguments: dict[str, Any], push_event=None, ctx: dict[str, Any] | None = None) -> dict[str, Any]:
    """
    批量询价匹配（只读）：对 keywords_list 中每个产品独立调用 match_quotation，
    每个产品结果各自推送 tool_render SSE，最终返回紧凑汇总供 LLM 用。
    - 入参：keywords_list（产品关键词列表，每项为一个独立产品）、可选 customer_level。
    - 每次最多 _MATCH_QUOTATION_BATCH_MAX_ITEMS（默认 15）条；超出时截断并告知剩余。
    - 返回：{ success, result(紧凑汇总), items[{ keywords, status, payload }] }。
    """
    keywords_list = arguments.get("keywords_list") or []
    if not isinstance(keywords_list, list) or not keywords_list:
        return {"success": True, "result": "请提供 keywords_list（至少一个产品关键词）。"}
    customer_level = (arguments.get("customer_level") or "B").strip().upper() or "B"

    # 强制分批：超出上限时只处理前 N 条，并在结果中提示剩余项
    max_items = _MATCH_QUOTATION_BATCH_MAX_ITEMS
    remaining_keywords: list[str] = []
    if len(keywords_list) > max_items:
        remaining_keywords = [str(k).strip() for k in keywords_list[max_items:] if str(k).strip()]
        keywords_list = keywords_list[:max_items]
        logger.warning(
            "match_quotation_batch: 超出单次上限 %d 条，本次处理前 %d 条，剩余 %d 条需再次调用。",
            max_items, max_items, len(remaining_keywords),
        )

    # 并行查询：每个关键词独立调用 _execute_match_quotation（只读、无共享写状态）
    # 函数本身已在 asyncio.to_thread 内运行，此处用 ThreadPoolExecutor 再并行 N 条查询
    def _query_one(idx: int, kw_raw: Any) -> dict[str, Any]:
        kw = (str(kw_raw or "")).strip()
        if not kw:
            return {"keywords": kw, "input_index": idx, "status": "skipped", "payload": {}}
        single_args = {"keywords": kw, "customer_level": customer_level}
        result = _execute_match_quotation(single_args, push_event=None)
        obs_str = result.get("result") or ""
        status = "error" if not result.get("success") else "ok"
        item_entry: dict[str, Any] = {"keywords": kw, "input_index": idx, "status": status}
        try:
            payload = json.loads(obs_str)
        except Exception:
            payload = {}
        if payload.get("single"):
            raw_chosen = payload.get("chosen") or {}
            safe_chosen = {k: raw_chosen.get(k) for k in _KNOWN_CHOSEN_FIELDS if k in raw_chosen}
            item_entry["status"] = "matched"
            item_entry["chosen"] = safe_chosen
            item_entry["chosen_index"] = payload.get("chosen_index")
            item_entry["match_source"] = payload.get("match_source", "")
        elif payload.get("unmatched"):
            item_entry["status"] = "unmatched"
        elif payload.get("needs_selection"):
            item_entry["status"] = "needs_selection"
            item_entry["options"] = payload.get("candidates") or []
            item_entry["match_source"] = payload.get("match_source", "")
        else:
            item_entry["status"] = "unmatched"
        item_entry["payload"] = payload
        return item_entry

    max_workers = min(_MATCH_QUOTATION_BATCH_MAX_WORKERS, len(keywords_list))
    raw_results: list[dict[str, Any]] = [{}] * len(keywords_list)
    with ThreadPoolExecutor(max_workers=max_workers) as pool:
        futures = {
            pool.submit(_query_one, idx, kw_raw): idx
            for idx, kw_raw in enumerate(keywords_list)
        }
        for future in as_completed(futures):
            idx = futures[future]
            try:
                raw_results[idx] = future.result()
            except Exception as exc:
                kw = (str(keywords_list[idx] or "")).strip()
                logger.warning("match_quotation_batch: item %d %r raised: %s", idx, kw, exc)
                raw_results[idx] = {"keywords": kw, "input_index": idx, "status": "error", "payload": {}}

    items_out: list[dict[str, Any]] = []
    resolved_items: list[dict[str, Any]] = []
    pending_items: list[dict[str, Any]] = []
    unmatched_items: list[dict[str, Any]] = []
    for item_entry in raw_results:
        if not item_entry:
            continue
        s = item_entry.get("status")
        if s == "matched":
            resolved_items.append(item_entry)
        elif s == "needs_selection":
            pending_items.append(item_entry)
        elif s != "skipped":
            unmatched_items.append(item_entry)
        items_out.append(item_entry)

    n = len(keywords_list)
    matched_count = sum(1 for it in items_out if it.get("status") == "matched")
    pending_count = sum(1 for it in items_out if it.get("status") == "needs_selection")
    unmatched_count = sum(1 for it in items_out if it.get("status") == "unmatched")
    sorted_resolved = sorted(resolved_items, key=lambda x: int(x.get("input_index", 0)))
    sorted_pending = sorted(pending_items, key=lambda x: int(x.get("input_index", 0)))
    sorted_unmatched = sorted(unmatched_items, key=lambda x: int(x.get("input_index", 0)))
    formatted = _build_batch_formatted_response(keywords_list, sorted_resolved, sorted_pending, sorted_unmatched)
    compact = (
        f"[已渲染到前端] 批量询价 {n} 个产品：matched={matched_count}, "
        f"pending={pending_count}, unmatched={unmatched_count}。已产出汇总卡片，禁止逐项重复查询。"
    )
    if remaining_keywords:
        remaining_hint = (
            f"\n\n⚠️ 本次仅处理了前 {n} 个产品（单次上限 {max_items} 条）。"
            f"还有 {len(remaining_keywords)} 个产品未查询，请再次调用 match_quotation_batch，"
            f"keywords_list={remaining_keywords[:10]}{'…等' if len(remaining_keywords) > 10 else ''}。"
        )
        compact += remaining_hint

    def _strip_payload(items: list[dict]) -> list[dict]:
        """Strip the internal `payload` field to prevent serialization issues."""
        return [{k: v for k, v in it.items() if k != "payload"} for it in items]

    response_payload = {
        "batch_mode": True,
        "keywords_count": n,
        "matched_count": matched_count,
        "pending_count": pending_count,
        "unmatched_count": unmatched_count,
        "resolved_items": _strip_payload(sorted_resolved),
        "pending_items": _strip_payload(sorted_pending),
        "unmatched_items": _strip_payload(sorted_unmatched),
        "formatted_response": formatted,
        "batch_compact": compact,
    }
    try:
        result_json = json.dumps(response_payload, ensure_ascii=False)
    except Exception as e:
        logger.warning("batch json.dumps failed, falling back to compact-only: %s", e)
        result_json = compact
    return {
        "success": True,
        "result": result_json,
        "items": [{k: v for k, v in it.items() if k != "payload"} for it in items_out],
    }



def _execute_select_wanding_match(arguments: dict[str, Any]) -> dict[str, Any]:
    """
    执行 select_wanding_match（只读）：从 match_wanding_price/match_quotation 的候选中用 LLM 选 1 个。
    接收 keywords + candidates，返回选中的 {code, matched_name, unit_price} 或 None，或返回 _needs_human_choice 供 Work 使用。
    """
    try:
        from backend.tools.inventory.services.llm_selector import llm_select_best

        keywords = (arguments.get("keywords") or "").strip()
        candidates = arguments.get("candidates") or []
        if not keywords:
            return {"success": True, "result": "请提供 keywords。"}
        if not isinstance(candidates, list) or not candidates:
            return {"success": True, "result": "请提供 candidates（来自历史匹配或字段匹配的 needs_selection 结果）。"}

        logger.info(
            "select_wanding_match invoked keywords=%r n_candidates=%d",
            keywords[:120] if keywords else "",
            len(candidates),
        )
        r = llm_select_best(keywords, candidates)
        match_source = (arguments.get("match_source") or "").strip() or "未知"
        if r is None:
            return {"success": True, "result": f"LLM 判定无匹配：{keywords}"}
        if r.get("_suggestions") and r.get("options"):
            options = r.get("options", []) or []
            # 为每个选项补充来源，结构与 match_price_and_get_inventory 中保持一致
            for opt in options:
                opt["source"] = match_source
            payload = {
                "_needs_human_choice": True,
                "keywords": keywords,
                "options": options,
                "source": "select_wanding_match",
            }
            return {"success": True, "result": json.dumps(payload, ensure_ascii=False)}
        chosen_code = (r.get("code") or "").strip()
        chosen_index = 0
        for i, c in enumerate(candidates):
            if (c.get("code") or "").strip() == chosen_code:
                chosen_index = i + 1
                break
        chosen = {"code": r.get("code", ""), "matched_name": r.get("matched_name", ""), "unit_price": r.get("unit_price", 0)}
        payload: dict[str, Any] = {
            "single": True,
            "candidates": candidates,
            "chosen": chosen,
            "chosen_index": chosen_index,
            "match_source": match_source,
        }
        # 若为规则兜底结果，增加机器可读标记，便于上游区分高置信度与兜底
        selection_meta = r.get("_selection_meta") or {}
        if selection_meta.get("from_rule_fallback"):
            payload["fallback"] = True
            payload["_selection_meta"] = selection_meta
        _attach_table_code_hint(payload)
        return {"success": True, "result": json.dumps(payload, ensure_ascii=False)}
    except Exception as e:
        logger.exception("select_wanding_match 失败")
        return {"success": False, "error": str(e), "result": f"选择失败: {e}"}


def _get_resolver():
    """Resolver 含 CONTAINS + 向量匹配；依赖 src.cache 时可能不可用，返回 None 则工具内降级为关键词查表。"""
    global _resolver, _resolver_failed
    if _resolver_failed:
        return None
    if _resolver is not None:
        return _resolver
    with _resolver_lock:
        if _resolver is not None:
            return _resolver
        if _resolver_failed:
            return None
        try:
            from backend.tools.inventory.services.resolver import ItemResolver
            r = ItemResolver()
            if not r.is_available():
                _resolver_failed = True
                return None
            _resolver = r
        except Exception as e:
            logger.debug("Resolver 不可用（CONTAINS/向量 将不生效）: %s", e)
            _resolver_failed = True
            return None
    return _resolver


def get_inventory_tools_openai_format() -> list[dict]:
    """OpenAI function calling 格式的工具列表"""
    return [
        {
            "type": "function",
            "function": {
                "name": "search_inventory",
                "description": "按产品名/规格关键词搜索库存，返回可用数量。适配英文关键词（如 Tee dn40）；中文询价优先历史匹配。",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "keywords": {"type": "string", "description": "产品名称或规格关键词"},
                    },
                    "required": ["keywords"],
                },
                "x_tool_meta": {"access_mode": "read", "risk_level": "low"},
            },
        },
        {
            "type": "function",
            "function": {
                "name": "get_profit_by_price",
                "description": "根据万鼎价格库，按 code 或完整产品名称 + 价格查询对应档位的利润率，并返回所有档位的价格/利润率。",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "code": {
                            "type": "string",
                            "description": "10 位物料编号，如 8020020755；与 product_name 至少提供一个，两者同时提供时优先使用 code。",
                        },
                        "product_name": {
                            "type": "string",
                            "description": "完整产品名称（与万鼎价格库中 Describrition 列一致或非常接近）。",
                        },
                        "price": {
                            "type": "number",
                            "description": "报价员给出的成交价/报单价，用于锁定最接近的档位价格并读取对应利润率。",
                        },
                    },
                    "required": ["price"],
                },
                "x_tool_meta": {"access_mode": "read", "risk_level": "low"},
            },
        },
        {
            "type": "function",
            "function": {
                "name": "get_profit_by_price_batch",
                "description": "对多组 code+price 一次性查万鼎利润率；当用户对多产品（如整表或 5 个以上编号）问利润率时优先使用本工具，避免逐条调用 get_profit_by_price。单次最多 50 条，更多请分批调用。",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "items": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "code": {"type": "string", "description": "10 位物料编号"},
                                    "price": {"type": "number", "description": "成交价/报单价"},
                                },
                                "required": ["code", "price"],
                            },
                            "description": "多组 { code, price }，单次最多 50 条",
                        },
                    },
                    "required": ["items"],
                },
                "x_tool_meta": {"access_mode": "read", "risk_level": "low"},
            },
        },
        {
            "type": "function",
            "function": {
                "name": "get_inventory_by_code",
                "description": "按 10 位物料编号（如 8030020580）直接查库存，不走关键词/Resolver。",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "code": {"type": "string", "description": "Item Code，如 8030020580"},
                    },
                    "required": ["code"],
                },
                "x_tool_meta": {"access_mode": "read", "risk_level": "low"},
            },
        },
        {
            "type": "function",
            "function": {
                "name": "get_inventory_by_code_batch",
                "description": "对多个物料编号一次性查库存；当用户对多产品（如整表或 5 个以上编号）问库存时优先使用本工具，避免逐条调用 get_inventory_by_code。单次最多 50 条，更多请分批调用。",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "codes": {
                            "type": "array",
                            "items": {"type": "string", "description": "10 位物料编号"},
                            "description": "多个 10 位物料编号，单次最多 50 条",
                        },
                    },
                    "required": ["codes"],
                },
                "x_tool_meta": {"access_mode": "read", "risk_level": "low"},
            },
        },
        {
            "type": "function",
            "function": {
                "name": "match_quotation_batch",
                "description": "批量询价匹配：用户在**一条消息**里询问 2 个或以上不同产品的价格时使用，每个产品独立匹配并各自展示报价卡片。单产品查询仍用 match_quotation。",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "keywords_list": {
                            "type": "array",
                            "items": {"type": "string"},
                            "description": "产品关键词列表，每项为一个独立产品（如 [\"直接50\", \"三通50\"]）",
                        },
                        "customer_level": {"type": "string", "description": "价格档位，同 match_quotation。默认 B"},
                    },
                    "required": ["keywords_list"],
                },
                "x_tool_meta": {"access_mode": "read", "risk_level": "low"},
            },
        },
        {
            "type": "function",
            "function": {
                "name": "match_quotation",
                "description": "询价匹配：同时查报价历史与万鼎字段匹配，结果取并集，每条带 source（历史报价/字段匹配/共同）。单产品用此工具；2个及以上不同产品用 match_quotation_batch。",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "keywords": {"type": "string", "description": "产品名+规格，如 直接50mm、直径25PPR"},
                        "customer_level": {"type": "string", "description": "价格档位：A/B/C/D/D_low/E（报单）或 出厂价_含税/出厂价_不含税/采购不含税。用户说「二级代理」用 A、「青山大客户」用 D、「出厂价含税」用 出厂价_含税。默认 B"},
                        "show_all_candidates": {"type": "boolean", "description": "true 时跳过 LLM 选型，直接返回全部候选列表（用户说「全部list/所有候选/我想自己选/列出所有」时传 true）"},
                    },
                    "required": ["keywords"],
                },
                "x_tool_meta": {"access_mode": "read", "risk_level": "low"},
            },
        },
        {
            "type": "function",
            "function": {
                "name": "match_by_quotation_history",
                "description": "仅历史匹配：只在报价映射表匹配，不查万鼎。",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "keywords": {"type": "string", "description": "产品名+规格"},
                        "customer_level": {"type": "string", "description": "价格档位：A/B/C/D/D_low/E（报单）或 出厂价_含税/出厂价_不含税/采购不含税。用户说「二级代理」用 A、「青山大客户」用 D、「出厂价含税」用 出厂价_含税。默认 B"},
                    },
                    "required": ["keywords"],
                },
                "x_tool_meta": {"access_mode": "read", "risk_level": "low"},
            },
        },
        {
            "type": "function",
            "function": {
                "name": "match_wanding_price",
                "description": "万鼎字段匹配：按 keywords 在万鼎库匹配，返回 unit_price（customer_level 默认 B，一次一档）。返回 single/needs_selection/未匹配。",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "keywords": {"type": "string", "description": "产品名+规格，如 25三通、进水软管 50cm"},
                        "customer_level": {"type": "string", "description": "价格档位：A/B/C/D/D_low/E 或 出厂价_含税/出厂价_不含税/采购不含税；「二级代理」→A、「青山大客户」→D。默认 B"},
                    },
                    "required": ["keywords"],
                },
                "x_tool_meta": {"access_mode": "read", "risk_level": "low"},
            },
        },
        {
            "type": "function",
            "function": {
                "name": "select_wanding_match",
                "description": "LLM 选型：从 needs_selection 候选中选 1 个；须传入 match_source（上步 observation）。",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "keywords": {"type": "string", "description": "与历史匹配/字段匹配相同的询价关键词"},
                        "candidates": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "code": {"type": "string"},
                                    "matched_name": {"type": "string"},
                                    "unit_price": {"type": "number"},
                                },
                                "required": ["code", "matched_name", "unit_price"],
                            },
                            "description": "历史匹配或字段匹配返回的 candidates 数组",
                        },
                        "match_source": {"type": "string", "description": "上一步 observation 中的 match_source：历史报价 或 字段匹配，用于结果中标明来源"},
                    },
                    "required": ["keywords", "candidates"],
                },
                "x_tool_meta": {"access_mode": "read", "risk_level": "low", "deferred": True},
            },
        },
        {
            "type": "function",
            "function": {
                "name": "modify_inventory",
                "description": "修改库存：锁定可售（lock，占位）或增补/归零（supplement）。需物料编号（code）；建议先 get_inventory_by_code 确认再调用。supplement 时 quantity>0 为增补，quantity=0 为将用户仓/可售归零。需 INVENTORY_MODIFY_ENABLED=1 才真实写 ACCURATE。",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "code": {"type": "string", "description": "物料编号 Item Code，如 8030020580"},
                        "action": {"type": "string", "description": "lock=锁定可售（占位）；supplement=增补库存或归零（quantity=0 时归零）"},
                        "quantity": {"type": "number", "description": "数量：>0 增补，=0 将用户仓/可售归零"},
                        "memo": {"type": "string", "description": "可选备注，如原因/单号"},
                    },
                    "required": ["code", "action", "quantity"],
                },
                "x_tool_meta": {"access_mode": "write", "risk_level": "high", "deferred": True},
            },
        },
    ]


def _execute_inventory_tool_impl(name: str, arguments: dict[str, Any], push_event=None, context: dict[str, Any] | None = None) -> dict[str, Any]:
    """实际执行逻辑（含 get_table_agent / get_resolver），供带超时调用。"""
    # 询价相关工具不依赖 table/sql_agent，可单独执行
    if name == "match_quotation":
        return _execute_match_quotation(arguments, push_event=push_event)
    if name == "match_quotation_batch":
        return _execute_match_quotation_batch(arguments, push_event=push_event, ctx=context)
    if name == "match_by_quotation_history":
        return _execute_match_by_quotation_history(arguments)
    if name == "match_wanding_price":
        return _execute_match_wanding_price(arguments)
    if name == "select_wanding_match":
        return _execute_select_wanding_match(arguments)
    if name == "get_profit_by_price":
        return _execute_get_profit_by_price(arguments)
    if name == "get_profit_by_price_batch":
        return _execute_get_profit_by_price_batch(arguments)
    if name == "get_inventory_by_code_batch":
        return _execute_get_inventory_by_code_batch(arguments)
    if name == "modify_inventory":
        try:
            from backend.tools.inventory.services.inventory_modify_service import modify_inventory as do_modify
            return do_modify(
                code=(arguments.get("code") or "").strip(),
                action=(arguments.get("action") or "").strip().lower(),
                quantity=arguments.get("quantity"),
                memo=(arguments.get("memo") or "").strip(),
            )
        except Exception as e:
            logger.exception("modify_inventory 失败")
            return {"success": False, "error": str(e), "result": f"修改库存失败: {e}"}

    try:
        table = _get_table_agent()
        sql_agent = _get_sql_agent()
    except ModuleNotFoundError as e:
        if "src" in str(e) and getattr(config, "INVENTORY_DEMO_MODE", False):
            if name == "search_inventory":
                kw = (arguments.get("keywords") or "").strip()
                return {"success": True, "result": f"[演示模式] 关键词「{kw}」未连接库存 API，建议用 match_by_quotation_history 或 match_wanding_price 做询价匹配。"}
            if name == "get_inventory_by_code":
                code = (arguments.get("code") or "").strip()
                return {"success": True, "result": f"Item Code: {code}\nItem Name: (演示) 万鼎匹配产品\nQty: 0\nAvailable: 0\n[演示模式] 库存 API 未连接"}
        if "src" in str(e):
            return {
                "success": False,
                "error": str(e),
                "result": "当前环境缺少 src 包（库存表 API 依赖）。请改用「cd Agent Team && python run_inventory_agent.py」启动，或将含 src 的目录（如 data_platform）加入 PYTHONPATH 后重试。",
            }
        return {"success": False, "error": str(e), "result": f"工具不可用: {e}"}
    except Exception as e:
        return {"success": False, "error": str(e), "result": f"工具不可用: {e}"}

    if name == "search_inventory":
        keywords = (arguments.get("keywords") or "").strip()
        if not keywords:
            return {"success": True, "result": "请提供关键词。"}
        try:
            from backend.tools.inventory.services.spec_extractor import extract_specs_from_query
            specs = extract_specs_from_query(keywords)  # LLM 优先，规则兜底
            phrase_specs = [[specs]] if specs else None
            resolver = _get_resolver()
            if resolver is not None:
                phrase_to_codes = resolver.resolve_phrases([keywords], phrase_specs=phrase_specs)
                all_codes = list(dict.fromkeys(c for _, codes in phrase_to_codes for c in codes))
                if all_codes:
                    max_codes = getattr(config, "MAX_CODES_PER_SEARCH", 10)
                    items = table.get_items_by_codes(all_codes[:max_codes])
                    if items:
                        return {"success": True, "result": sql_agent.format_response(items)}
            max_details = getattr(config, "MAX_DETAILS_FOR_AGENT", 10)
            items = table.search_items(keywords, max_results=max_details)
            return {"success": True, "result": sql_agent.format_response(items)}
        except Exception as e:
            logger.exception("search_inventory 失败")
            return {"success": False, "error": str(e), "result": f"查询失败: {e}"}

    if name == "get_inventory_by_code":
        code = (arguments.get("code") or "").strip()
        if not code:
            return {"success": True, "result": "请提供 Item Code。"}
        try:
            item = table.get_item_by_code(code)
            return {"success": True, "result": sql_agent.format_response([item] if item else [])}
        except Exception as e:
            logger.exception("get_inventory_by_code 失败")
            return {"success": False, "error": str(e), "result": f"查询失败: {e}"}

    return {"success": False, "error": f"未知工具: {name}", "result": ""}


def execute_inventory_tool(name: str, arguments: dict[str, Any], push_event=None, context: dict[str, Any] | None = None) -> dict[str, Any]:
    """同步执行库存工具。超时由调用方（execute_tool via asyncio.wait_for）控制。"""
    try:
        return _execute_inventory_tool_impl(name, arguments, push_event=push_event, context=context)
    except Exception as e:
        if "src" in str(e):
            return {
                "success": False,
                "error": str(e),
                "result": "当前环境缺少 src 包（库存表 API 依赖）。请改用「cd Agent Team && python run_inventory_agent.py」启动，或将含 src 的目录加入 PYTHONPATH 后重试。",
            }
        logger.exception("工具执行异常")
        return {"success": False, "error": str(e), "result": f"查询失败: {e}"}
