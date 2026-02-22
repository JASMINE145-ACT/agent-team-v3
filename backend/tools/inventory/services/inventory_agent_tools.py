# 库存 Agent 工具：与 quotation_tracker 一致的 OpenAI function calling 格式，供 ReAct 循环调用
# search_inventory 内仍走 Resolver（CONTAINS + 向量）→ get_items_by_codes，Resolver 不可用时降级为 list.do 关键词查表
from __future__ import annotations

import json
import logging
import threading
from typing import Any, Optional

from backend.tools.inventory.config import config

logger = logging.getLogger(__name__)

# 延迟初始化，避免启动时即依赖 src.api.client / src.cache
_table_agent = None
_table_agent_lock = threading.Lock()
_sql_agent = None
_sql_agent_lock = threading.Lock()
_resolver: Optional[Any] = None
_resolver_failed = False
_resolver_lock = threading.Lock()


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
    历史匹配：先查映射表（整理产品）按「询价名称+规格」取 top3，再用每个 code 去万鼎价格表查价并填回。
    返回：未匹配 / single / needs_selection，其中 unit_price 来自万鼎（customer_level 默认 B）。
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
            return {"success": True, "result": json.dumps(payload, ensure_ascii=False)}
        payload = {"needs_selection": True, "keywords": keywords, "candidates": norm, "match_source": "历史报价"}
        return {"success": True, "result": json.dumps(payload, ensure_ascii=False)}
    except Exception as e:
        logger.exception("match_by_quotation_history 失败")
        return {"success": False, "error": str(e), "result": f"历史匹配失败: {e}"}


def _execute_match_quotation(arguments: dict[str, Any]) -> dict[str, Any]:
    """
    询价匹配（历史+万鼎并行取并集）：同时查报价历史与字段匹配，返回带匹配来源的候选。
    每条候选含 source：历史报价 / 字段匹配 / 共同。用于「查code/询价/物料编号」时一次得到两类结果。
    """
    try:
        from backend.tools.inventory.services.match_and_inventory import match_quotation_union

        keywords = (arguments.get("keywords") or "").strip()
        if not keywords:
            return {"success": True, "result": "请提供 keywords（产品名+规格）。"}
        customer_level = (arguments.get("customer_level") or "B").strip().upper() or "B"

        candidates = match_quotation_union(keywords, customer_level=customer_level)
        if not candidates:
            return {"success": True, "result": json.dumps({"unmatched": True, "keywords": keywords}, ensure_ascii=False)}

        norm = [
            {"code": str(c.get("code", "")), "matched_name": str(c.get("matched_name", "")), "unit_price": float(c.get("unit_price", 0) or 0), "source": c.get("source", "未知")}
            for c in candidates
        ]
        max_show = 15
        norm = norm[:max_show]
        if len(norm) == 1:
            r = norm[0]
            payload = {"single": True, "candidates": norm, "chosen": r, "chosen_index": 1, "match_source": r.get("source", "共同")}
            return {"success": True, "result": json.dumps(payload, ensure_ascii=False)}
        sources_present = list({c.get("source") for c in norm if c.get("source")})
        payload = {"needs_selection": True, "keywords": keywords, "candidates": norm, "match_source": "、".join(sources_present) if sources_present else "共同"}
        return {"success": True, "result": json.dumps(payload, ensure_ascii=False)}
    except Exception as e:
        logger.exception("match_quotation 失败")
        return {"success": False, "error": str(e), "result": f"询价匹配失败: {e}"}


def _execute_match_wanding_price(arguments: dict[str, Any]) -> dict[str, Any]:
    """
    字段匹配（万鼎价格库）：按产品名+规格在万鼎价格库中匹配，不查映射表。
    返回：未匹配 / single / needs_selection；多候选时由 agent 调用 select_wanding_match。
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
            return {"success": True, "result": json.dumps(payload, ensure_ascii=False)}
        payload = {"needs_selection": True, "keywords": keywords, "candidates": norm_truncated, "match_source": "字段匹配"}
        return {"success": True, "result": json.dumps(payload, ensure_ascii=False)}
    except Exception as e:
        logger.exception("match_wanding_price 失败")
        return {"success": False, "error": str(e), "result": f"匹配失败: {e}"}


def _execute_select_wanding_match(arguments: dict[str, Any]) -> dict[str, Any]:
    """
    执行 select_wanding_match：从 match_wanding_price 的候选中用 LLM 选 1 个。
    接收 keywords + candidates，返回选中的 {code, matched_name, unit_price} 或 None。
    """
    try:
        from backend.tools.inventory.services.llm_selector import llm_select_best

        keywords = (arguments.get("keywords") or "").strip()
        candidates = arguments.get("candidates") or []
        if not keywords:
            return {"success": True, "result": "请提供 keywords。"}
        if not isinstance(candidates, list) or not candidates:
            return {"success": True, "result": "请提供 candidates（来自历史匹配或字段匹配的 needs_selection 结果）。"}

        r = llm_select_best(keywords, candidates)
        match_source = (arguments.get("match_source") or "").strip() or "未知"
        if r is None:
            return {"success": True, "result": f"LLM 判定无匹配：{keywords}"}
        if r.get("_suggestions") and r.get("options"):
            lines = [f"LLM 无把握单选，以下为几个可能选项及理由（请人工确认）：\n"]
            for i, opt in enumerate(r["options"], 1):
                lines.append(f"{i}. code: {opt.get('code', '')} | {opt.get('matched_name', '')} | unit_price: {opt.get('unit_price', 0)}")
                lines.append(f"   reasoning: {opt.get('reasoning', '')}\n")
            return {"success": True, "result": "\n".join(lines)}
        chosen_code = (r.get("code") or "").strip()
        chosen_index = 0
        for i, c in enumerate(candidates):
            if (c.get("code") or "").strip() == chosen_code:
                chosen_index = i + 1
                break
        chosen = {"code": r.get("code", ""), "matched_name": r.get("matched_name", ""), "unit_price": r.get("unit_price", 0)}
        payload = {"single": True, "candidates": candidates, "chosen": chosen, "chosen_index": chosen_index, "match_source": match_source}
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
            },
        },
        {
            "type": "function",
            "function": {
                "name": "match_quotation",
                "description": "询价匹配（推荐）：同时查报价历史与万鼎字段匹配，结果取并集，每条候选带匹配来源（历史报价/字段匹配/共同）。用于用户问「XX的code」「查XX物料编号」「询价XX」时优先调用本工具，可一次得到历史+万鼎结果；仅当用户明确说「用万鼎查」「不要历史」「直接万鼎」时才改用 match_wanding_price。",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "keywords": {"type": "string", "description": "产品名+规格，如 直接50mm、直径25PPR"},
                        "customer_level": {"type": "string", "description": "万鼎查价档位 A/B/C/D，默认 B"},
                    },
                    "required": ["keywords"],
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "match_by_quotation_history",
                "description": "仅历史匹配：只在报价映射表中匹配，不查万鼎。一般用 match_quotation 即可（历史+万鼎并行）；需单独历史结果时用本工具。",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "keywords": {"type": "string", "description": "产品名+规格"},
                        "customer_level": {"type": "string", "description": "万鼎查价档位 A/B/C/D，默认 B"},
                    },
                    "required": ["keywords"],
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "match_wanding_price",
                "description": "字段匹配（万鼎价格库）：按 keywords 在万鼎库中匹配，返回 unit_price（customer_level 默认 B，一次一档）。用户说「用万鼎查」「万鼎数据库」「直接万鼎」「字段查询」「还有什么其他型号」时直接调用本工具，不要先调历史匹配。历史匹配无命中时也可调用。返回未匹配 / single / needs_selection。",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "keywords": {"type": "string", "description": "产品名+规格，如 25三通、进水软管 50cm"},
                        "customer_level": {"type": "string", "description": "客户级别 A/B/C/D，默认 B"},
                    },
                    "required": ["keywords"],
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "select_wanding_match",
                "description": "LLM 选型：从 needs_selection 候选中选最佳匹配，有把握返 1 个，无把握列选项及 reasoning。调用时请传入上一步 observation 中的 match_source（历史报价/字段匹配），以便结果中标明匹配来源。",
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
            },
        },
    ]


def _execute_inventory_tool_impl(name: str, arguments: dict[str, Any]) -> dict[str, Any]:
    """实际执行逻辑（含 get_table_agent / get_resolver），供带超时调用。"""
    # 询价相关工具不依赖 table/sql_agent，可单独执行
    if name == "match_quotation":
        return _execute_match_quotation(arguments)
    if name == "match_by_quotation_history":
        return _execute_match_by_quotation_history(arguments)
    if name == "match_wanding_price":
        return _execute_match_wanding_price(arguments)
    if name == "select_wanding_match":
        return _execute_select_wanding_match(arguments)

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


def execute_inventory_tool(name: str, arguments: dict[str, Any]) -> dict[str, Any]:
    """同步执行库存工具。超时由调用方（execute_tool via asyncio.wait_for）控制。"""
    try:
        return _execute_inventory_tool_impl(name, arguments)
    except Exception as e:
        if "src" in str(e):
            return {
                "success": False,
                "error": str(e),
                "result": "当前环境缺少 src 包（库存表 API 依赖）。请改用「cd Agent Team && python run_inventory_agent.py」启动，或将含 src 的目录加入 PYTHONPATH 后重试。",
            }
        logger.exception("工具执行异常")
        return {"success": False, "error": str(e), "result": f"查询失败: {e}"}
