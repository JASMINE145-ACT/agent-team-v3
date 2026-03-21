"""
询价文字 NLP 解析模块

职责：将用户纯文字输入（如"50三通 100个，25弯头 50个"）解析为结构化询价列表。
使用 LLM 提取产品名、规格、数量，规则兜底。
"""

from __future__ import annotations

import json
import logging
import re
from typing import Any, List, Optional

logger = logging.getLogger(__name__)


def parse_inquiry_text(
    user_text: str,
    max_items: int = 100,
) -> dict[str, Any]:
    """
    将纯文字询价解析为结构化列表。
    
    Args:
        user_text: 用户输入文字，如 "50三通 100个，25弯头 50个"
        max_items: 最多解析条数，默认 100
    
    Returns:
        {
            "success": bool,
            "items": [{"product_name": str, "specification": str, "quantity": int}, ...],
            "error": str | None
        }
    """
    if not user_text or not user_text.strip():
        return {"success": False, "items": [], "error": "请提供询价文字"}
    
    user_text = user_text.strip()
    
    # 先尝试 LLM 提取
    try:
        items = _parse_with_llm(user_text, max_items)
        if items:
            return {"success": True, "items": items, "error": None}
    except Exception as e:
        logger.warning("LLM 解析询价文字失败，回退规则: %s", e)
    
    # LLM 失败回退规则
    try:
        items = _parse_with_rules(user_text, max_items)
        if items:
            return {"success": True, "items": items, "error": None}
    except Exception as e:
        logger.exception("规则解析询价文字失败")
        return {"success": False, "items": [], "error": f"解析失败: {e}"}
    
    return {"success": False, "items": [], "error": "未能识别任何询价项，请按「产品名 规格 数量」格式"}


def _parse_with_llm(user_text: str, max_items: int) -> List[dict]:
    """
    使用 LLM 提取询价项。
    返回 [{"product_name": str, "specification": str, "quantity": int}, ...]
    """
    from backend.config import Config
    from openai import OpenAI
    
    client = OpenAI(
        api_key=Config.OPENAI_API_KEY,
        base_url=Config.OPENAI_BASE_URL,
    )
    
    system_prompt = f"""你是一个询价文字解析助手。用户会输入产品询价文字，你需要提取出产品名称、规格、数量。

输出要求：
1. 返回 JSON 数组，每项包含 product_name（产品名称）、specification（规格型号，如 50、DN25、1/2"）、quantity（数量，整数）
2. 如果用户未提供规格，specification 可为空字符串
3. 如果用户未提供数量，quantity 默认为 0
4. 最多返回 {max_items} 项
5. 只返回 JSON 数组，不要任何其他文字

示例输入：50三通 100个，25弯头 50个
示例输出：
[
  {{"product_name": "三通", "specification": "50", "quantity": 100}},
  {{"product_name": "弯头", "specification": "25", "quantity": 50}}
]"""
    
    response = client.chat.completions.create(
        model=Config.LLM_MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_text}
        ],
        temperature=0.1,
        max_tokens=2000,
    )
    
    content = response.choices[0].message.content.strip()
    
    # 尝试提取 JSON 数组（可能被包裹在 ```json 中）
    json_match = re.search(r'```json\s*(\[.*?\])\s*```', content, re.DOTALL)
    if json_match:
        content = json_match.group(1)
    elif not content.startswith('['):
        # 尝试找到第一个 [ 到最后一个 ]
        start = content.find('[')
        end = content.rfind(']')
        if start != -1 and end != -1:
            content = content[start:end+1]
    
    items = json.loads(content)
    if not isinstance(items, list):
        raise ValueError("LLM 返回的不是数组")
    
    # 标准化格式
    result = []
    for it in items[:max_items]:
        if not isinstance(it, dict):
            continue
        product_name = (it.get("product_name") or "").strip()
        if not product_name:
            continue
        specification = (it.get("specification") or "").strip()
        quantity = it.get("quantity", 0)
        try:
            quantity = int(quantity)
        except (TypeError, ValueError):
            quantity = 0
        result.append({
            "product_name": product_name,
            "specification": specification,
            "quantity": quantity,
        })
    
    return result


def _parse_with_rules(user_text: str, max_items: int) -> List[dict]:
    """
    规则解析询价文字（LLM 失败时的兜底）。
    支持格式：
    - "50三通 100个，25弯头 50个"
    - "DN50三通×100、DN25弯头×50"
    - "三通50 100，弯头25 50"
    """
    # 按逗号、顿号、分号、换行分割
    lines = re.split(r'[,，、;；\n]', user_text)
    
    items = []
    for line in lines:
        line = line.strip()
        if not line:
            continue
        
        # 尝试匹配：规格+产品名+数量 或 产品名+规格+数量
        # 模式1: 50三通 100个 / DN50三通 100 / 50三通×100
        # 模式2: 三通50 100个 / 三通DN50 100
        
        # 先提取数量（最后的数字 + 可选单位）
        quantity = 0
        qty_match = re.search(r'[×xX*]?\s*(\d+)\s*(?:个|只|件|根|条|支|盒|箱)?$', line)
        if qty_match:
            quantity = int(qty_match.group(1))
            line = line[:qty_match.start()].strip()  # 移除数量部分
        
        # 提取规格（DN25、50、1/2"等）
        specification = ""
        spec_match = re.search(r'(DN\s*\d+|[0-9]+(?:\.[0-9]+)?(?:/[0-9]+)?["\']?(?:mm|cm|m)?)', line, re.IGNORECASE)
        if spec_match:
            specification = spec_match.group(1).strip()
            # 移除规格部分，剩余为产品名
            product_name = line[:spec_match.start()].strip() + line[spec_match.end():].strip()
        else:
            product_name = line.strip()
        
        product_name = product_name.strip()
        if not product_name:
            continue
        
        items.append({
            "product_name": product_name,
            "specification": specification,
            "quantity": quantity,
        })
        
        if len(items) >= max_items:
            break
    
    return items
