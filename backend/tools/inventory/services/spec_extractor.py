"""
规格提取：LLM 优先，规则兜底。

从用户查询词中抽取产品规格（如 dn20、20/56），供 Resolver 过滤向量候选。
"""
from __future__ import annotations

import json
import logging
import re
from typing import List

from backend.tools.inventory.config import config

logger = logging.getLogger(__name__)

# 规则：数字/数字、dn+数字
SPEC_PATTERN_RATIO = re.compile(r"\d+\s*/\s*\d+")
SPEC_PATTERN_DN = re.compile(r"dn\s*\d+", re.IGNORECASE)


def extract_specs_by_rules(phrase: str) -> List[str]:
    """规则兜底：从 phrase 中正则抽取规格（20/56、dn20 等）。"""
    if not phrase or not phrase.strip():
        return []
    out = []
    out.extend(SPEC_PATTERN_RATIO.findall(phrase))
    for m in SPEC_PATTERN_DN.finditer(phrase):
        out.append(m.group(0).replace(" ", "").lower())
    return list(dict.fromkeys(out))


def extract_specs_by_llm(phrase: str) -> List[str] | None:
    """
    LLM 抽取规格。失败或超时时返回 None，由调用方走规则兜底。
    """
    if not phrase or not phrase.strip():
        return []
    try:
        from openai import OpenAI

        api_key = config.LLM_API_KEY or ""
        base_url = getattr(config, "LLM_BASE_URL", None) or "https://open.bigmodel.cn/api/paas/v4"
        model = config.LLM_MODEL or "glm-4-flash"
        timeout = getattr(config, "LLM_TIMEOUT", 60)
        if not api_key:
            return None

        client = OpenAI(api_key=api_key, base_url=base_url, timeout=timeout)
        prompt = f"""从以下产品查询词中提取规格标识（如 dn20、DN40、20/56、三通、直通等），仅返回规格列表，多个用逗号分隔，若无规格则返回空字符串。
查询词：{phrase}
规格列表："""

        resp = client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": prompt}],
            temperature=0,
            max_tokens=5000,
        )
        content = (resp.choices[0].message.content or "").strip()
        if not content:
            return []

        specs = [s.strip().lower() for s in content.replace("，", ",").split(",") if s.strip()]
        return list(dict.fromkeys(specs))
    except Exception as e:
        logger.debug("LLM 规格提取失败，将用规则兜底: %s", e)
        return None


def extract_specs_from_query(phrase: str) -> List[str]:
    """
    LLM 优先、规则兜底。返回规格列表，供 Resolver 过滤候选。
    LLM 返回空或失败时，用规则结果。
    """
    llm_result = extract_specs_by_llm(phrase)
    rule_result = extract_specs_by_rules(phrase)
    if llm_result:
        return llm_result
    return rule_result
