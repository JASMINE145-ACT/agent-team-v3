"""
万鼎多候选选择：用专业知识 LLM 从候选中选 1 个。
供 select_wanding_match 工具调用。
"""

from __future__ import annotations

import json
import logging
import re
from pathlib import Path
from typing import Any, List, Optional

logger = logging.getLogger(__name__)

_BUSINESS_KNOWLEDGE = """
【业务知识】
1. 三角阀 ≠ 角阀：询价「三角阀」而候选只有「角阀」时，应判定无匹配（输出 0）。
2. 软管：管材库无软管类产品，询价含「软管」时应返回无匹配。
3. 规格精确匹配优先：dn25 对 dn25，不应选 dn20。
4. PPR 优先于 PVC（同规格下）。
5. 长度 vs 管径：「50cm」表示长度（软管），不应与 dn50（管径）混淆。
6. 等径三通 > 异径三通（除非询价明确指定异径）。
7. 联塑品牌优先（同等条件下）。
8. 【规格转换规则（主径×副径 → 英寸）】
   - 询价中「A*B」「A×B」「AB」（如 32*20、32×20、3220）表示：主径 A（mm）、副径 B（mm）。内丝/外丝三通、弯头等多用此写法。
   - 副径 B（mm）与英寸对应关系，选型时必须按此选候选名中的英寸：
     · 15、16、20 → 1/2"（候选名中选带 x1/2" 或 1/2" 的，不选 x3/4"、x1"）
     · 25 → 3/4"（选带 x3/4" 或 3/4" 的）
     · 32 → 1"（选带 x1" 或 1\" 的）
     · 40 → 1-1/4" 或 1.25"
     · 50 → 1-1/2" 或 1.5"
   - 主径 A 对应：20→dn20，25→dn25，32→dn32，40→dn40；候选名中的 dn 与主径一致。
   - 示例：「32*20内丝三通」= 主径 dn32、副径 20→1/2"，应选「内螺纹三通…dn32x1/2"」，不选 dn32x3/4"；「25*20」= dn25×1/2"，选 x1/2"。
   - 若关键词仅一个数（如「32弯头」无*20），则只按主径匹配，不推断副径。
"""


def _load_business_knowledge() -> str:
    """从配置文件加载业务知识，若无则用内置。"""
    try:
        from backend.tools.inventory.config import config
        path = getattr(config, "WANDING_BUSINESS_KNOWLEDGE_PATH", None)
        if path:
            p = Path(path)
            if p.exists():
                return p.read_text(encoding="utf-8").strip()
    except Exception as e:
        logger.debug("加载业务知识失败: %s", e)
    return _BUSINESS_KNOWLEDGE.strip()


def llm_select_best(
    keywords: str,
    candidates: List[dict[str, Any]],
    max_tokens: int | None = None,
) -> Optional[dict[str, Any]]:
    """
    从候选中选 1 个最佳匹配。
    返回 {code, matched_name, unit_price} 或 None（LLM 判定无匹配）。
    """
    if not candidates:
        return None

    if max_tokens is None:
        try:
            from backend.tools.inventory.config import config
            max_tokens = getattr(config, "LLM_MAX_TOKENS", 5000)
        except Exception:
            max_tokens = 5000

    knowledge = _load_business_knowledge()

    lines = []
    for i, c in enumerate(candidates, 1):
        code = c.get("code", "")
        name = (c.get("matched_name") or "")[:150]
        price = c.get("unit_price", 0)
        lines.append(f"{i}. [{code}] {name} (unit_price={price})")
    candidates_text = "\n".join(lines)

    prompt = f"""你是万鼎价格库产品匹配专家。用户询价关键词为「{keywords}」，以下是候选产品列表：

{candidates_text}

{knowledge}

请选择最匹配的一项（输出其序号 1-{len(candidates)}），或判断全部不匹配（输出 0）。
仅输出一个 JSON，不要其他文字：
{{"index": <序号或0>, "reasoning": "<简短理由>"}}
"""

    try:
        from backend.tools.inventory.config import config
        from openai import OpenAI

        api_key = getattr(config, "LLM_API_KEY", "") or ""
        base_url = getattr(config, "LLM_BASE_URL", "https://open.bigmodel.cn/api/paas/v4")
        model = getattr(config, "LLM_MODEL", "glm-4-flash")
        timeout = getattr(config, "LLM_TIMEOUT", 60)

        client = OpenAI(api_key=api_key, base_url=base_url)
        api_kwargs: dict[str, Any] = {
            "model": model,
            "messages": [
                {"role": "system", "content": "你是万鼎价格库产品匹配专家。仅输出 JSON：{\"index\": 序号或0, \"reasoning\": \"理由\"}，不要其他内容。"},
                {"role": "user", "content": prompt},
            ],
            "temperature": 0,
            "max_tokens": max_tokens,
            "timeout": timeout,
        }
        # 部分模型 response_format 可能导致空返回，优先不用
        resp = client.chat.completions.create(**api_kwargs)
        raw_content = resp.choices[0].message.content if resp.choices else None
        content = (raw_content or "").strip()
        if not content:
            logger.warning("LLM 返回空内容，raw=%s finish_reason=%s", raw_content, getattr(resp.choices[0], "finish_reason", None) if resp.choices else None)
            raise ValueError("LLM 返回空内容")

        # 解析 JSON（可能被 markdown 包裹或含多余文字）
        content = content.strip()
        for prefix in ("```json", "```"):
            if content.startswith(prefix):
                content = content[len(prefix):].strip()
            if content.endswith("```"):
                content = content[:-3].strip()
        content = content.strip()

        obj = None
        try:
            obj = json.loads(content)
        except json.JSONDecodeError:
            # 尝试从文本中提取 index
            m = re.search(r'"index"\s*:\s*(\d+)', content)
            if m:
                idx = int(m.group(1))
                obj = {"index": idx}
            else:
                m = re.search(r'"index"\s*:\s*0\b', content)
                if m:
                    obj = {"index": 0}
        if obj is None:
            raise ValueError(f"无法解析 JSON: {content[:100]}")
        idx = int(obj.get("index", 0))

        if idx <= 0:
            return None
        if idx > len(candidates):
            return candidates[0]

        c = candidates[idx - 1]
        return {
            "code": (c.get("code") or "").strip(),
            "matched_name": (c.get("matched_name") or "")[:200],
            "unit_price": float(c.get("unit_price", 0) or 0),
        }
    except Exception as e:
        logger.warning("LLM 选择失败，使用规则回退: %s", e)
        return _rule_based_fallback(keywords, candidates)


def _rule_based_fallback(keywords: str, candidates: List[dict[str, Any]]) -> Optional[dict[str, Any]]:
    """LLM 失败时按业务规则选：等径优于异径，PPR 优于 PVC，规格精确匹配。"""
    if not candidates:
        return None
    keywords_lower = (keywords or "").lower()
    best = None
    best_score = -1
    for c in candidates:
        name = (c.get("matched_name") or "").lower()
        score = 0
        if "等径" in name and "异径" not in name:
            score += 3
        if "ppr" in name or "ppr" in keywords_lower:
            if "ppr" in name:
                score += 2
        if "异径" in name:
            score -= 2
        if "pvc" in name and "ppr" not in name:
            score -= 1
        if "正三通" in name and "等径" not in name:
            score -= 1
        if score > best_score:
            best_score = score
            best = c
    c = best or candidates[0]
    return {
        "code": (c.get("code") or "").strip(),
        "matched_name": (c.get("matched_name") or "")[:200],
        "unit_price": float(c.get("unit_price", 0) or 0),
    }
