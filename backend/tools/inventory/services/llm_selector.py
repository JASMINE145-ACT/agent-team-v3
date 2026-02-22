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

# 业务知识缓存：同一路径且 mtime 未变时直接返回，避免重复读盘（用户「记住」追加后 mtime 变化会触发重读）
_business_knowledge_cache: dict = {}  # {"path": str, "mtime": float | None, "content": str}

_BUSINESS_KNOWLEDGE = """
【业务知识】
1. 三角阀 ≠ 角阀：询价「三角阀」而候选只有「角阀」时，应判定无匹配（输出 0）。
2. 软管：管材库无软管类产品，询价含「软管」时应返回无匹配。
3. 规格精确匹配优先：dn25 对 dn25，不应选 dn20。
4. PPR 优先于 PVC（同规格下）；但**排水场景**（如止水节、排水配件、dn110 等大口径、或关键词未提 PPR）应优先 **PVC-U排水配件**，不选 PPR 给水/印尼系列。
5. 「直接」「直通」：口语「50直接」「110直接」通常指**排水**用直通(管箍)PVC-U排水配件，优先于 PPR 直通/印尼管件。
6. 长度 vs 管径：「50cm」表示长度（软管），不应与 dn50（管径）混淆。
7. 等径三通 > 异径三通（除非询价明确指定异径）。
8. 联塑品牌优先（同等条件下）。
9. 90°弯头 + 规格（如 110）：优先 **90°直角弯头/90°弯头 PVC-U排水配件** 白色 dn110，不选 90°弯头 PPR 配件/PE 配件。
10. 【规格转换规则（主径×副径 → 英寸）】
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
11. 【电工套管/印尼常用词】
   - PIPA COUNDUIT / conduit / 电线管 / 穿线管：选「PVC电线管(B管)」管材（名称含电线管、B管、M/根），不选给水管件。
   - SOCKET：选「管直通(套筒)」电工套管配件（名称含管直通、套筒），规格与询价一致（如 Φ25）。
   - KLEM：选「管夹」电工套管配件（名称含管夹），规格与询价一致。
   - TDUST 4 cabang / 四通接线盒：选「管四通圆接线盒(带盖)」电工套管配件（名称含管四通圆接线盒），规格如 65x40/4/Φ25。
   - 热熔器 / 热熔机 / 熔接器：选「焊接机」PPR 配件（名称含焊接机），规格范围覆盖询价 dn（如 dn20-63）。
"""


def _load_business_knowledge() -> str:
    """
    从 wanding_business_knowledge.md 加载业务知识，供 LLM 每次选型使用。
    使用路径 + 文件 mtime 缓存，避免同进程内重复读盘；文件被「记住」命令修改后会自动重读。
    """
    global _business_knowledge_cache
    try:
        from backend.tools.inventory.config import config
        path_str = getattr(config, "WANDING_BUSINESS_KNOWLEDGE_PATH", None)
        if not path_str:
            return _BUSINESS_KNOWLEDGE.strip()
        p = Path(path_str)
        mtime: Optional[float] = None
        if p.exists():
            try:
                mtime = p.stat().st_mtime
            except OSError:
                pass
            # 命中缓存：同一路径且 mtime 未变，直接返回，避免重复读取
            if (
                _business_knowledge_cache.get("path") == path_str
                and _business_knowledge_cache.get("mtime") == mtime
            ):
                return _business_knowledge_cache["content"]
            content = p.read_text(encoding="utf-8").strip()
            _business_knowledge_cache = {"path": path_str, "mtime": mtime, "content": content}
            return content
        # 路径已配置但文件不存在：用内置内容初始化文件
        try:
            p.parent.mkdir(parents=True, exist_ok=True)
            p.write_text(_BUSINESS_KNOWLEDGE.strip(), encoding="utf-8")
            content = _BUSINESS_KNOWLEDGE.strip()
            try:
                mtime = p.stat().st_mtime
            except OSError:
                mtime = None
            _business_knowledge_cache = {"path": path_str, "mtime": mtime, "content": content}
            return content
        except Exception as e2:
            logger.debug("初始化业务知识文件失败: %s", e2)
    except Exception as e:
        logger.debug("加载业务知识失败: %s", e)
    return _BUSINESS_KNOWLEDGE.strip()


def invalidate_business_knowledge_cache() -> None:
    """「记住」命令追加内容后调用，使下次选型时重新从 MD 读取，避免使用旧缓存。"""
    global _business_knowledge_cache
    _business_knowledge_cache = {}


def llm_select_best(
    keywords: str,
    candidates: List[dict[str, Any]],
    max_tokens: int | None = None,
) -> Optional[dict[str, Any]]:
    """
    从候选中选 1 个最佳匹配，或（无把握时）列出几个可能选项及理由。
    返回：
    - 有把握选中：{code, matched_name, unit_price}
    - 无匹配：None
    - 无把握：{"_suggestions": True, "options": [{code, matched_name, unit_price, reasoning}, ...]}
    """
    if not candidates:
        return None
    if max_tokens is None:
        try:
            from backend.tools.inventory.config import config
            max_tokens = getattr(config, "LLM_MAX_TOKENS", 8192)
        except Exception:
            max_tokens = 8192

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

请二选一（仅输出一个 JSON）：
1) **有把握**选出一个最匹配的：用 "confident": true，并给出 "index"（序号 1-{len(candidates)}）和 "reasoning"。
2) **没有把握**（多个都可能或都不太像）：用 "confident": false，不要单选，改为 "options" 列出 2～3 个最可能的选项，每项含 "index" 和 "reasoning"（简短说明为何可能匹配）。
若判断全部不匹配，则 "confident": true, "index": 0, "reasoning": "..."。
**重要**：若多个候选规格接近、易混淆，或询价描述不够明确，请优先用 "confident": false 列出选项供人工确认，避免错选。

有把握时输出：{{"confident": true, "index": <序号或0>, "reasoning": "<理由>"}}
没有把握时输出：{{"confident": false, "options": [{{"index": 1, "reasoning": "..."}}, {{"index": 2, "reasoning": "..."}}]}}
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
                {"role": "system", "content": "你是万鼎产品匹配专家。仅输出一个 JSON：有把握时 {\"confident\": true, \"index\": 序号或0, \"reasoning\": \"理由\"}；没有把握时 {\"confident\": false, \"options\": [{\"index\": 序号, \"reasoning\": \"理由\"}, ...]}。不要其他文字。"},
                {"role": "user", "content": prompt},
            ],
            "temperature": 0,
            "max_tokens": max_tokens,
            "timeout": timeout,
        }
        resp = client.chat.completions.create(**api_kwargs)
        raw_content = resp.choices[0].message.content if resp.choices else None
        content = (raw_content or "").strip()
        if not content:
            fr = getattr(resp.choices[0], "finish_reason", None) if resp.choices else None
            logger.warning("LLM 返回空内容，raw=%s finish_reason=%s%s", raw_content, fr, "（输出被截断，可增大 LLM_MAX_TOKENS 后重试）" if fr == "length" else "")
            raise ValueError("LLM 返回空内容")

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
            m = re.search(r'"confident"\s*:\s*false', content)
            if m and '"options"' in content:
                obj = {"confident": False, "options": []}
            else:
                m = re.search(r'"index"\s*:\s*(\d+)', content)
                if m:
                    obj = {"confident": True, "index": int(m.group(1)), "reasoning": ""}
                else:
                    m = re.search(r'"index"\s*:\s*0\b', content)
                    obj = {"confident": True, "index": 0} if m else None
        if obj is None:
            raise ValueError(f"无法解析 JSON: {content[:100]}")

        confident = obj.get("confident", True)
        if confident:
            idx = int(obj.get("index", 0))
            if idx <= 0:
                return None
            if idx > len(candidates):
                return _candidate_to_result(candidates[0])
            return _candidate_to_result(candidates[idx - 1])

        # 无把握：返回若干可能选项 + reasoning
        options = obj.get("options") or []
        if not options:
            return _rule_based_fallback(keywords, candidates)
        seen = set()
        result_options = []
        for opt in options[:5]:
            if not isinstance(opt, dict):
                continue
            idx = int(opt.get("index", 0))
            if idx <= 0 or idx > len(candidates) or idx in seen:
                continue
            seen.add(idx)
            c = candidates[idx - 1]
            result_options.append({
                "code": (c.get("code") or "").strip(),
                "matched_name": (c.get("matched_name") or "")[:200],
                "unit_price": float(c.get("unit_price", 0) or 0),
                "reasoning": (opt.get("reasoning") or "").strip()[:300],
            })
        if not result_options:
            return _rule_based_fallback(keywords, candidates)
        return {"_suggestions": True, "options": result_options}
    except Exception as e:
        logger.warning("LLM 选择失败，使用规则回退: %s", e)
        return _rule_based_fallback(keywords, candidates)


def _candidate_to_result(c: dict[str, Any]) -> dict[str, Any]:
    """单条候选转为 {code, matched_name, unit_price}。"""
    return {
        "code": (c.get("code") or "").strip(),
        "matched_name": (c.get("matched_name") or "")[:200],
        "unit_price": float(c.get("unit_price", 0) or 0),
    }


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
