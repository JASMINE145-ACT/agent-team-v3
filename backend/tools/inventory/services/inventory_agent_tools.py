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
            return {"success": True, "result": json.dumps(payload, ensure_ascii=False)}
        payload = {"needs_selection": True, "keywords": keywords, "candidates": norm, "match_source": "历史报价"}
        return {"success": True, "result": json.dumps(payload, ensure_ascii=False)}
    except Exception as e:
        logger.exception("match_by_quotation_history 失败")
        return {"success": False, "error": str(e), "result": f"历史匹配失败: {e}"}


def _execute_match_quotation(arguments: dict[str, Any]) -> dict[str, Any]:
    """
    询价匹配（只读）：
    - 输入：keywords（中文产品名+规格）、可选 customer_level。
    - 行为：同时查报价历史与万鼎字段匹配，取并集并按 source（历史报价/字段匹配/共同）标记。
    - 返回：{ single | needs_selection | unmatched, candidates[], chosen?, match_source }，用于查 code/价格/档位。
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
    - 行为：按 code 或完整名称在万鼎价格库定位行，对每行计算与给定价格最接近的档位及其利润率，并返回所有档位价格/利润率。
    - 返回：{ success, result(自然语言总结), data: { rows[] } }，rows 每项含 code/name/matched_price_level/matched_price/matched_profit/all_levels[]。
    """
    from backend.tools.inventory.config import config
    from backend.tools.inventory.services.wanding_fuzzy_matcher import (
        get_profit_rows_by_code,
        get_profit_rows_by_name,
    )

    code = (arguments.get("code") or "").strip()
    product_name = (arguments.get("product_name") or "").strip()
    if not code and not product_name:
        return {"success": True, "result": "请提供 code 或 product_name（至少一个）。"}
    try:
        price = float(arguments.get("price"))
    except (TypeError, ValueError):
        return {"success": True, "result": "请提供有效的 price（数字）。"}

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
                f"最接近 {level_display}，对应利润率约 {profit_pct}。"
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
                "description": "询价匹配：同时查报价历史与万鼎字段匹配，结果取并集，每条带 source（历史报价/字段匹配/共同）。",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "keywords": {"type": "string", "description": "产品名+规格，如 直接50mm、直径25PPR"},
                        "customer_level": {"type": "string", "description": "价格档位：A/B/C/D/D_low/E（报单）或 出厂价_含税/出厂价_不含税/采购不含税。用户说「二级代理」用 A、「青山大客户」用 D、「出厂价含税」用 出厂价_含税。默认 B"},
                    },
                    "required": ["keywords"],
                },
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
    if name == "get_profit_by_price":
        return _execute_get_profit_by_price(arguments)
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
