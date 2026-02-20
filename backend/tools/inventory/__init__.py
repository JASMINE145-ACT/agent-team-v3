"""
库存查询 Agent - 主入口

支持两种模式：
- 原 pipeline：PlanAgent → TableAgent → SQLAgent（parse → search → format）
- ReAct 模式：思考 → 工具(search_inventory / get_inventory_by_code) → 观察 → 继续，与 quotation_tracker 一致
  通过环境变量 USE_REACT_AGENT=1 或调用 query_react() 启用。
"""

import os
import re
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import Any, Callable, Dict, List, Optional, Tuple
import logging
import time

from backend.tools.inventory.models import Item, QueryIntent
from backend.tools.inventory.config import config

logger = logging.getLogger(__name__)

# 强制开启 ReAct（思考→工具→观察）；设为 "0"/"false" 可恢复原 Pipeline
USE_REACT_AGENT = os.environ.get("USE_REACT_AGENT", "1").strip().lower() not in ("0", "false", "no")

# ReAct 模式下不导入 plan/table/sql/resolver，避免依赖 src（无 src 时也能启动）
if not USE_REACT_AGENT:
    from backend.tools.inventory.agents.plan_agent import InventoryPlanAgent
    from backend.tools.inventory.agents.table_agent import InventoryTableAgent
    from backend.tools.inventory.agents.sql_agent import InventorySQLAgent
    from backend.tools.inventory.services.resolver import ItemResolver


class InventoryAgent:
    """
    库存查询主入口
    
    职责：
    - 编排 PlanAgent → TableAgent → SQLAgent
    - 处理用户自然语言查询
    - 返回格式化库存结果
    - 异常处理和重试机制
    
    使用示例：
        agent = InventoryAgent()
        response = agent.query("查一下 Tee With Cover / dn40 库存")
        # 返回: "#C11 Tee With Cover / dn40 - LESSO 库存有 0"
    """
    
    def __init__(self):
        self._plan_agent = None
        self._table_agent = None
        self._sql_agent = None
        self._resolver = None
        if not USE_REACT_AGENT:
            self._plan_agent = InventoryPlanAgent()
            self._table_agent = InventoryTableAgent()
            self._sql_agent = InventorySQLAgent()
            self._resolver = ItemResolver()
        logger.info("InventoryAgent 初始化完成（ReAct=%s）", USE_REACT_AGENT)

    def _ensure_pipeline(self) -> None:
        """ReAct 模式下若调用 query_items 等，再按需加载 Pipeline 依赖（含 src）。"""
        if self._plan_agent is not None:
            return
        from backend.tools.inventory.agents.plan_agent import InventoryPlanAgent
        from backend.tools.inventory.agents.table_agent import InventoryTableAgent
        from backend.tools.inventory.agents.sql_agent import InventorySQLAgent
        from backend.tools.inventory.services.resolver import ItemResolver
        self._plan_agent = InventoryPlanAgent()
        self._table_agent = InventoryTableAgent()
        self._sql_agent = InventorySQLAgent()
        self._resolver = ItemResolver()

    def query(self, user_input: str, max_retries: int = 1, on_step: Optional[Callable[[str, Any], None]] = None) -> str:
        """
        处理用户库存查询。
        若环境变量 USE_REACT_AGENT=1 则走 ReAct（思考→工具→观察）；否则走原 Plan→Table→SQL 管道。
        on_step: 仅 ReAct 模式生效，回调 (step_type, data) 用于实时展示思考/调用/观察。
        
        Args:
            user_input: 用户自然语言输入
            max_retries: 最大重试次数（仅原管道生效）
            on_step: 可选，ReAct 每步回调
        
        Returns:
            格式化响应文本
        """
        if USE_REACT_AGENT:
            return self.query_react(user_input, on_step=on_step)

        last_error = None
        for attempt in range(max_retries + 1):
            try:
                # Step 1: Plan Agent 解析意图
                intent = self._plan_agent.parse(user_input)
                logger.info(f"查询意图: {intent}")
                
                # Step 2: 多词条来源优先用 LLM 的 keywords_list，否则按「和/与/、」拆分 keywords
                raw_phrases = (
                    [p.strip() for p in intent.keywords_list if p and p.strip()]
                    if intent.keywords_list
                    else self._split_multi_keywords(intent.keywords)
                )
                if not raw_phrases:
                    return self._handle_empty_results()
                # 去掉「帮我」「帮我查」「查询」等前缀和后缀，避免整句当关键词导致 list.do 匹配不到
                phrases = [p for p in (self._normalize_product_phrase(x) for x in raw_phrases) if p]
                if not phrases:
                    return self._handle_empty_results()

                # 与 phrases 对齐的规格数组（LLM 抽取），用于向量候选过滤；长度不一致则不用
                phrase_specs: Optional[List[List[str]]] = None
                if intent.phrase_specs is not None and len(intent.phrase_specs) == len(phrases):
                    phrase_specs = intent.phrase_specs

                # Step 3: 若 Resolver 可用则「phrases → codes → Table 按 code 拉取」；否则降级为关键词查表
                if self._resolver.is_available():
                    phrase_to_codes = self._resolver.resolve_phrases(phrases, phrase_specs=phrase_specs)
                    all_codes = list(dict.fromkeys(c for _, codes in phrase_to_codes for c in codes))
                    items_all = self._table_agent.get_items_by_codes(all_codes)
                    code_to_item = {item.item_no: item for item in items_all}
                    phrase_to_items = {
                        phrase: [code_to_item[c] for c in codes if c in code_to_item]
                        for phrase, codes in phrase_to_codes
                    }
                else:
                    if len(phrases) == 1:
                        items, _ = self._search_items_with_retry(phrases[0])
                        phrase_to_items = {phrases[0]: items[: config.MAX_RESULTS] if len(items) > config.MAX_RESULTS else items}
                    else:
                        phrase_to_items = self._search_phrases_parallel(phrases)

                # Step 4: 分层拼接输出
                if len(phrase_to_items) == 1:
                    phrase, items = next(iter(phrase_to_items.items()))
                    if not items:
                        return self._handle_empty_results()
                    response = self._sql_agent.format_response(items)
                else:
                    sections: List[str] = []
                    sep_line = "—" * 24
                    for phrase in phrases:
                        items = phrase_to_items.get(phrase, [])
                        block = [
                            f"关于「{phrase}」的查询结果",
                            sep_line,
                            self._sql_agent.format_response(items) if items else self._sql_agent.format_response([]),
                        ]
                        sections.append("\n".join(block))
                    response = ("\n\n" + sep_line + "\n\n").join(sections)
                    logger.info(f"多词条分层结果: {len(phrases)} 组")
                
                return response
                
            except Exception as e:
                last_error = e
                logger.warning(f"查询失败（尝试 {attempt + 1}/{max_retries + 1}）: {e}")
                
                if attempt < max_retries:
                    # 重试前等待一小段时间
                    time.sleep(1)
                else:
                    # 所有重试都失败了
                    logger.error(f"查询最终失败: {e}")
                    return self._handle_error(e)
        
        # 理论上不会到达这里
        if last_error:
            return self._handle_error(last_error)
        return "查询出错: 未知错误"
    
    def _search_phrases_parallel(self, phrases: List[str]) -> dict[str, List[Item]]:
        """多词条并行独立查表，返回 phrase -> items（保持 phrases 顺序可依 key 取）。"""
        phrase_to_items: Dict[str, List[Item]] = {}
        max_workers = min(len(phrases), 8)
        with ThreadPoolExecutor(max_workers=max_workers) as executor:
            future_to_phrase = {
                executor.submit(self._search_items_with_retry, phrase): phrase
                for phrase in phrases
            }
            for future in as_completed(future_to_phrase):
                phrase = future_to_phrase[future]
                try:
                    items, _ = future.result()
                    phrase_to_items[phrase] = items[: config.MAX_RESULTS] if len(items) > config.MAX_RESULTS else items
                except Exception as e:
                    logger.warning(f"查询词条失败 [{phrase}]: {e}")
                    phrase_to_items[phrase] = []
        # 保证每个 phrase 都有键（未完成的算空）
        for phrase in phrases:
            if phrase not in phrase_to_items:
                phrase_to_items[phrase] = []
        return phrase_to_items

    @staticmethod
    def _normalize_product_phrase(phrase: str) -> str:
        """去掉句首句尾的客套/动词，只保留产品名规格，便于 list.do 匹配。"""
        s = (phrase or "").strip()
        if not s:
            return s
        # 句首：帮我、帮我查、帮我查询、查一下、查询、查
        for prefix in ("帮我查询", "帮我查", "帮我", "查一下", "查询", "查"):
            if s.lower().startswith(prefix):
                s = s[len(prefix) :].strip()
                break
        # 句尾：的库存、的库存和可售、库存多少、库存、可售
        for suffix in ("的库存和可售", "的库存", "库存多少", "库存", "可售"):
            if s.endswith(suffix):
                s = s[: -len(suffix)].strip()
                break
        return s.strip() or phrase.strip()

    @staticmethod
    def _split_multi_keywords(keywords: str) -> List[str]:
        """
        将「A 和 B」「A与B」「A、B」拆成多个查询词条，便于独立调 table 再拼接。
        若未匹配到分隔符则返回 [keywords]。
        """
        s = (keywords or "").strip()
        if not s:
            return []
        # 只按连词/列举符拆分，不按空格（避免把 "gang box 20/25/60" 拆散）
        parts = re.split(r"\s*和\s*|\s*与\s*|[、,，]", s)
        out = [p.strip() for p in parts if p and p.strip()]
        return out if out else [s]

    def _search_items_with_retry(self, keywords: str) -> tuple[List[Item], int]:
        """
        搜索产品（带重试机制）
        
        Args:
            keywords: 查询关键词
        
        Returns:
            tuple: (items列表, 总匹配数量)
        """
        max_retries = config.API_RETRY_COUNT
        last_error = None
        
        for attempt in range(max_retries + 1):
            try:
                # 尝试搜索
                items = self._table_agent.search_items(keywords)
                
                # 检查是否需要截断
                total_count = len(items)
                if total_count > config.MAX_RESULTS:
                    items = items[:config.MAX_RESULTS]
                
                return items, total_count
                
            except Exception as e:
                last_error = e
                logger.warning(f"搜索失败（尝试 {attempt + 1}/{max_retries + 1}）: {e}")
                
                if attempt < max_retries:
                    time.sleep(1)
                else:
                    # 所有重试都失败了
                    logger.error(f"搜索最终失败: {e}")
                    raise
        
        # 理论上不会到达这里
        if last_error:
            raise last_error
        raise RuntimeError("未知错误")
    
    def _handle_empty_results(self) -> str:
        """处理空结果"""
        return "未找到匹配产品，请尝试：1) 使用完整编号 2) 减少关键词"
    
    def _handle_too_many_results(self, items: List[Item], total_count: int) -> str:
        """处理结果过多的情况"""
        return self._sql_agent.format_response_with_warning(items, total_count)
    
    def _handle_error(self, error: Exception) -> str:
        """处理查询错误"""
        error_msg = str(error)
        
        # 友好的错误提示
        if "timeout" in error_msg.lower():
            return "查询超时，请稍后再试"
        elif "connection" in error_msg.lower():
            return "网络连接失败，请检查网络后重试"
        else:
            return f"查询出错: {error_msg}"
    
    def query_react(self, user_input: str, on_step: Optional[Callable[[str, Any], None]] = None) -> str:
        """
        ReAct 模式：思考 → 工具 → 观察 → 继续，与 quotation_tracker 一致。
        使用 search_inventory / get_inventory_by_code 工具，由 LLM 决定调用顺序与次数。
        on_step: 可选，(step_type, data) 实时回调，便于 CLI 展示。
        """
        from backend.tools.inventory.services.agent_runner import run_inventory_agent
        out = run_inventory_agent(user_input.strip(), on_step=on_step)
        if out.get("error"):
            return out.get("answer", "") or f"查询出错: {out['error']}"
        return out.get("answer", "").strip() or "未返回结果。"

    def query_items(self, user_input: str) -> List[Item]:
        """
        查询并返回原始 Item 列表（供程序调用）
        
        Args:
            user_input: 用户查询文本
        
        Returns:
            Item 对象列表
        """
        self._ensure_pipeline()
        intent = self._plan_agent.parse(user_input)
        items, _ = self._search_items_with_retry(intent.keywords)
        return items


__all__ = ["InventoryAgent", "Item", "QueryIntent"]
