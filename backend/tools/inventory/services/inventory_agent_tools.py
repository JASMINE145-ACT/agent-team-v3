# 库存 Agent 工具：与 quotation_tracker 一致的 OpenAI function calling 格式，供 ReAct 循环调用
# search_inventory 内仍走 Resolver（CONTAINS + 向量）→ get_items_by_codes，Resolver 不可用时降级为 list.do 关键词查表
from __future__ import annotations

import json
import logging
from concurrent.futures import ThreadPoolExecutor, TimeoutError as FuturesTimeoutError
from typing import Any, Optional

from backend.tools.inventory.config import config

logger = logging.getLogger(__name__)

# 延迟初始化，避免启动时即依赖 src.api.client / src.cache
_table_agent = None
_sql_agent = None
_resolver: Optional[Any] = None
_resolver_failed = False


def _get_table_agent():
    global _table_agent
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
        from backend.tools.inventory.agents.sql_agent import InventorySQLAgent
        _sql_agent = InventorySQLAgent()
    return _sql_agent


def _execute_match_wanding_price(arguments: dict[str, Any]) -> dict[str, Any]:
    """
    执行 match_wanding_price：万鼎价格库匹配。
    0 候选 → 未匹配；1 候选 → single；>1 候选 → needs_selection + candidates（由 ReAct 调用 select_wanding_match）。
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

        # 归一化：{code, matched_name, unit_price, score?}
        norm = [
            {
                "code": str(c.get("code", "")),
                "matched_name": str(c.get("matched_name", "")),
                "unit_price": float(c.get("unit_price", 0) or 0),
            }
            for c in candidates
        ]

        if len(norm) == 1:
            r = norm[0]
            payload = {"single": True, "code": r["code"], "matched_name": r["matched_name"], "unit_price": r["unit_price"]}
            return {"success": True, "result": json.dumps(payload, ensure_ascii=False)}

        # 多候选：返回 needs_selection，限制候选数避免 observation 过长导致 LLM 无法正确触发 tool_call
        max_candidates_for_react = 10
        norm_truncated = norm[:max_candidates_for_react]
        payload = {"needs_selection": True, "keywords": keywords, "candidates": norm_truncated}
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
            return {"success": True, "result": "请提供 candidates（来自 match_wanding_price 的 needs_selection 结果）。"}

        r = llm_select_best(keywords, candidates)
        if r is None:
            return {"success": True, "result": f"LLM 判定无匹配：{keywords}"}
        lines = [
            f"code: {r.get('code', '')}",
            f"matched_name: {r.get('matched_name', '')}",
            f"unit_price: {r.get('unit_price', 0)}",
        ]
        return {"success": True, "result": "\n".join(lines)}
    except Exception as e:
        logger.exception("select_wanding_match 失败")
        return {"success": False, "error": str(e), "result": f"选择失败: {e}"}


def _get_resolver():
    """Resolver 含 CONTAINS + 向量匹配；依赖 src.cache 时可能不可用，返回 None 则工具内降级为关键词查表。"""
    global _resolver, _resolver_failed
    if _resolver_failed:
        return None
    if _resolver is None:
        try:
            from backend.tools.inventory.services.resolver import ItemResolver
            _resolver = ItemResolver()
            if not _resolver.is_available():
                _resolver = None
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
                "description": "按产品名称或规格关键词搜索库存，返回匹配产品的库存与可售数量。**更适配英文关键词**（如 Tee With Cover dn40、gang box 20/56）；用户输入为**中文**产品名/规格时，优先用 match_wanding_price 查价格或先万鼎匹配再 get_inventory_by_code 查库存。",
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
                "description": "有 Item Code 时用此工具：按 10 位物料编号（如 8030020580）直接查表取库存，不走关键词/Resolver。",
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
                "name": "match_wanding_price",
                "description": "万鼎价格库匹配：用 keywords（产品名+规格）查询报价，customer_level 指定客户档位（A/B/C/D，默认 B）。返回三种情况：1）未匹配；2）single 唯一结果（code、matched_name、unit_price）；3）needs_selection（多个候选），此时在下一轮 <think> 中必须再调用 select_wanding_match(keywords, candidates) 进行选择，candidates 从 observation 的 JSON 中解析。",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "keywords": {"type": "string", "description": "产品名+规格，如 25三通、进水软管 50cm"},
                        "customer_level": {"type": "string", "description": "客户级别 A/B/C/D，对应不同利润价格档位，默认 B"},
                    },
                    "required": ["keywords"],
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "select_wanding_match",
                "description": "当 match_wanding_price 返回 needs_selection 时使用，或用户说「帮我选一个」「你选」「选哪个」且会话中已有候选列表时**必须**调用本工具：根据 keywords 和 candidates，用内嵌专业知识 LLM 从候选中选 1 个最佳匹配。**不可**在回复中自行推荐产品，选型结果必须由本工具返回。参数 keywords 与 match_wanding_price 相同，candidates 从上一轮 observation 或会话中的候选表解析（JSON 数组，每项含 code、matched_name、unit_price）。",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "keywords": {"type": "string", "description": "与 match_wanding_price 相同的询价关键词"},
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
                            "description": "match_wanding_price 返回的 candidates 数组",
                        },
                    },
                    "required": ["keywords", "candidates"],
                },
            },
        },
    ]


def _execute_inventory_tool_impl(name: str, arguments: dict[str, Any]) -> dict[str, Any]:
    """实际执行逻辑（含 get_table_agent / get_resolver），供带超时调用。"""
    # 万鼎工具不依赖 table/sql_agent，可单独执行
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
                return {"success": True, "result": f"[演示模式] 关键词「{kw}」未连接库存 API，建议用 match_wanding_price 做万鼎价格库匹配。"}
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
    """执行库存工具，带整体超时，避免 Resolver/AOL 无响应时卡死。"""
    timeout_sec = getattr(config, "TOOL_EXEC_TIMEOUT", 35)
    try:
        with ThreadPoolExecutor(max_workers=1) as ex:
            future = ex.submit(_execute_inventory_tool_impl, name, arguments)
            return future.result(timeout=timeout_sec)
    except FuturesTimeoutError:
        return {
            "success": False,
            "error": "timeout",
            "result": f"工具执行超时（{timeout_sec} 秒）。请检查 AOL_* 配置与网络，或稍后重试。",
        }
    except Exception as e:
        if "src" in str(e):
            return {
                "success": False,
                "error": str(e),
                "result": "当前环境缺少 src 包（库存表 API 依赖）。请改用「cd Agent Team && python run_inventory_agent.py」启动，或将含 src 的目录加入 PYTHONPATH 后重试。",
            }
        logger.exception("工具执行异常")
        return {"success": False, "error": str(e), "result": f"查询失败: {e}"}
