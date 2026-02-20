"""
库存查询 Agent - Plan Agent

职责：解析用户自然语言输入，提取查询关键词和意图
"""

import ast
import re
import logging
from typing import Optional
from pydantic import ValidationError

from backend.tools.inventory.models import QueryIntent
from backend.tools.inventory.lib.agents.llm_config import LLMFactory

logger = logging.getLogger(__name__)


class InventoryPlanAgent:
    """
    库存查询意图解析 Agent
    
    职责：
    - 从用户输入中提取产品关键词或 Item Code
    - 判断匹配策略（模糊匹配 vs 精确匹配）
    - 返回结构化查询意图
    """
    
    # Few-shot 示例（用于 LLM Prompt）。phrase_specs 与 keywords_list 或单条 keywords 一一对应，用于向量候选过滤。
    _FEW_SHOT_EXAMPLES = [
        {
            "input": "查一下 Tee With Cover / dn40 库存",
            "output": {"keywords": "Tee With Cover / dn40", "strategy": "keywords", "confidence": 0.95, "keywords_list": None, "phrase_specs": [["dn40"]]}
        },
        {
            "input": "8030020580 库存多少",
            "output": {"keywords": "8030020580", "strategy": "code", "confidence": 0.95, "keywords_list": None, "phrase_specs": [[]]}
        },
        {
            "input": "C12 dn32 还有多少",
            "output": {"keywords": "C12 dn32", "strategy": "keywords", "confidence": 0.9, "keywords_list": None, "phrase_specs": [["dn32"]]}
        },
        {
            "input": "查 8030020187 的库存",
            "output": {"keywords": "8030020187", "strategy": "code", "confidence": 0.95, "keywords_list": None, "phrase_specs": [[]]}
        },
        {
            "input": "Tee With Cover 的库存情况",
            "output": {"keywords": "Tee With Cover", "strategy": "keywords", "confidence": 0.85, "keywords_list": None, "phrase_specs": [[]]}
        },
        {
            "input": "查询一下 gang box 20/56 的库存",
            "output": {"keywords": "gang box 20/56", "strategy": "keywords", "confidence": 0.9, "keywords_list": None, "phrase_specs": [["20/56"]]}
        },
        # 多词条：phrase_specs 与 keywords_list 逐项对应
        {
            "input": "帮我查 gang box 20/25/60 和 ppr stop valve dn25 的库存和可售",
            "output": {"keywords": "gang box 20/25/60", "strategy": "keywords", "confidence": 0.9, "keywords_list": ["gang box 20/25/60", "ppr stop valve dn25"], "phrase_specs": [["20/25/60"], ["dn25"]]}
        },
        {
            "input": "Tee With Cover dn40 和 C12 dn32 库存多少",
            "output": {"keywords": "Tee With Cover dn40", "strategy": "keywords", "confidence": 0.9, "keywords_list": ["Tee With Cover dn40", "C12 dn32"], "phrase_specs": [["dn40"], ["dn32"]]}
        },
        {
            "input": "8030020580 和 8030020187 的库存",
            "output": {"keywords": "8030020580", "strategy": "code", "confidence": 0.95, "keywords_list": ["8030020580", "8030020187"], "phrase_specs": [[], []]}
        }
    ]
    
    def __init__(self):
        """初始化 Plan Agent 和 LLM"""
        try:
            self.llm = LLMFactory.get_llm("plan_agent", temperature=0.0)
            logger.info("InventoryPlanAgent 初始化完成（LLM 模式）")
        except Exception as e:
            logger.warning(f"LLM 初始化失败，将使用规则模式: {e}")
            self.llm = None
    
    def parse(self, user_input: str) -> QueryIntent:
        """
        解析用户查询意图
        
        Args:
            user_input: 用户自然语言输入
                       例如: "查一下 Tee With Cover / dn40 库存"
                              "8030020580 库存多少"
        
        Returns:
            QueryIntent: 解析后的查询意图
        """
        # 如果 LLM 不可用，使用规则模式
        if self.llm is None:
            return self._parse_with_rules(user_input)
        
        # 使用 LLM 解析
        return self._parse_with_llm(user_input)
    
    def _parse_with_llm(self, user_input: str) -> QueryIntent:
        """
        使用 LLM + Few-shot Prompt 解析用户意图
        
        Args:
            user_input: 用户输入
        
        Returns:
            QueryIntent: 解析后的意图
        """
        # 构建 Few-shot Prompt
        examples_str = "\n".join([
            f'用户: {ex["input"]}\n输出: {ex["output"]}'
            for ex in self._FEW_SHOT_EXAMPLES
        ])
        
        prompt = f"""你是库存查询意图解析器，从用户句中抽取「查询关键词」「查询策略」和「每个词条的规格/关键标识」。

规则：
1. 若用户给出的是纯数字或明确的10位数字物料编码（如 8030020580）→ strategy: "code"，keywords 取该编码，phrase_specs 对应位 []
2. 否则 → strategy: "keywords"，keywords 取产品名/规格相关片段，去掉「查」「库存」「多少」「一下」等停用词
3. 当用户一次问多个产品（用「和」「与」「、」等连接）时，必须输出 keywords_list：字符串数组；phrase_specs 与 keywords_list 逐项对应，每个元素为该词条的规格数组。单条查询时 keywords_list 填 null，phrase_specs 为仅含一个数组的数组
4. phrase_specs：从每个产品词条中抽取的规格/关键标识，用于后续过滤。例如 dn25、dn40、20/56、20/50、77X77 等，可拆成 "20" "56" 或保留 "20/56"。无明确规格则该位 []。必填，与词条一一对应

输出字段：keywords（必填）, strategy, confidence, keywords_list（多词条时必填数组，单条时 null）, phrase_specs（必填，与词条数同长的二维数组）

Few-shot 示例：
{examples_str}

现在请解析以下用户输入（只输出一行 JSON，不要输出 markdown 代码块或其他说明）：
用户: {user_input}
输出:"""

        raw_output = ""
        try:
            # 调用 LLM
            response = self.llm.invoke(prompt)
            # 处理不同类型的响应内容
            content = response.content if hasattr(response, 'content') else str(response)
            raw_output = str(content).strip()

            # 移除可能存在的 markdown 代码块标记
            raw_output = re.sub(r'```json\s*', '', raw_output)
            raw_output = re.sub(r'```\s*', '', raw_output)
            raw_output = raw_output.strip()

            # 使用 Pydantic 解析：先试标准 JSON，再试 LLM 常出的 Python 单引号 dict
            try:
                intent = QueryIntent.model_validate_json(raw_output)
            except (ValidationError, ValueError) as _:
                try:
                    d = ast.literal_eval(raw_output)
                    if isinstance(d, dict):
                        intent = QueryIntent.model_validate(d)
                    else:
                        raise ValueError("LLM 输出不是 dict")
                except (SyntaxError, ValueError, ValidationError, TypeError) as e2:
                    logger.warning(f"LLM 输出非合法 JSON 且无法按 Python 字面量解析: {e2}")
                    raise
            logger.info(f"LLM 解析成功: {intent}")
            return intent

        except (ValidationError, ValueError, SyntaxError, TypeError, Exception) as e:
            logger.warning(f"LLM 解析失败: {e}, 输出: {raw_output}, 降级到规则模式")
            return self._parse_with_rules(user_input)
    
    def _parse_with_rules(self, user_input: str) -> QueryIntent:
        """
        使用规则解析用户意图（LLM 不可用时的降级方案）
        
        Args:
            user_input: 用户输入
        
        Returns:
            QueryIntent: 解析后的意图
        """
        # 移除停用词
        stop_words = ['查', '查询', '库存', '多少', '一下', '的', '还有']
        cleaned = user_input
        for word in stop_words:
            cleaned = cleaned.replace(word, ' ')
        cleaned = cleaned.strip()
        
        # 判断是否是 Item Code（纯数字或10位数字）
        if self._is_item_code(cleaned):
            keywords = re.findall(r'\d+', cleaned)[0] if re.findall(r'\d+', cleaned) else cleaned
            strategy = "code"
            confidence = 0.95
        else:
            keywords = cleaned
            strategy = "keywords"
            confidence = 0.8
        
        intent = QueryIntent(
            keywords=keywords,
            strategy=strategy,
            confidence=confidence,
            phrase_specs=None,
        )
        logger.info(f"规则解析成功: {intent}")
        return intent
    
    def _is_item_code(self, text: str) -> bool:
        """
        判断文本是否是 Item Code
        
        规则：
        - 纯数字字符串
        - 或包含10位数字（典型 ACCURATE Item Code 格式）
        """
        # 移除所有空格
        text_no_spaces = re.sub(r'\s+', '', text)
        
        # 检查是否是纯数字
        if text_no_spaces.isdigit():
            # 典型的 Item Code 是 10 位数字
            return len(text_no_spaces) == 10
        
        # 检查是否包含10位连续数字
        if re.search(r'\d{10}', text_no_spaces):
            return True
        
        return False
    
    def _extract_keywords(self, user_input: str) -> str:
        """
        提取查询关键词
        
        Args:
            user_input: 用户输入
        
        Returns:
            str: 提取的关键词
        """
        # 移除停用词
        stop_words = ['查', '查询', '库存', '多少', '一下', '的', '还有']
        cleaned = user_input
        for word in stop_words:
            cleaned = cleaned.replace(word, ' ')
        cleaned = cleaned.strip()
        
        return cleaned
