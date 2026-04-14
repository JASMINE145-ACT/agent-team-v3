"""
LLM selector for quotation candidates.

Goals:
1) Always include business knowledge in prompt.
2) Keep selector output tiny and stable: only {index, reason}.
3) Fail fast to rule-based fallback when LLM output is invalid.
"""

from __future__ import annotations

import json
import logging
import os
import re
from pathlib import Path
from typing import Any, Optional

logger = logging.getLogger(__name__)

# cache format: {"path": str, "mtime": float | None, "content": str}
_business_knowledge_cache: dict[str, Any] = {}

# Module-level singleton for the fast-path OpenAI client (avoids TCP reconnect per call).
_selector_client: Any = None


def _get_selector_client(api_key: str, base_url: str | None) -> Any:
    """Return (and lazily create) the module-level fast-path OpenAI client."""
    global _selector_client
    if _selector_client is None:
        from openai import OpenAI

        _selector_client = OpenAI(api_key=api_key, base_url=base_url or None)
    return _selector_client


def _reset_selector_client() -> None:
    """Reset the singleton — used in tests to force re-creation with new credentials."""
    global _selector_client
    _selector_client = None

_BUSINESS_KNOWLEDGE = """
候选选择业务规则（摘要）：
1. 选择与关键词最贴近的规格、材质、口径、用途。
2. 口径优先：如 dn50、50、1-1/2 需对应转换后再比对。
3. 材质优先：PPR/PVC-U/PE 不能混选，除非关键词未指定且候选强相关。
4. 场景词优先：如 排水/给水/电工套管/管件 等应与候选名称一致。
5. 若都不匹配可返回 index=0。
6. 原因必须简短、可解释，不超过 20 字。
""".strip()

_SYSTEM_SELECTOR = (
    "Output ONLY a single JSON object. No prose. No markdown fences. "
    "Reason must be >=10 Chinese characters (≥10 Chinese characters). "
    "Empty or missing reason is INVALID. "
    "DO NOT force-select when no candidate fits; use index=0. "
    'Schema: {"index": <0..N>, "reason": "<short zh reason 10-20 chars>"}. '
    "Choose exactly one index."
)

_SELECTOR_DEFAULT_CANDIDATE_LIMIT = 8
_SELECTOR_DEFAULT_KNOWLEDGE_CHAR_LIMIT = 1500
_SELECTOR_DEFAULT_MAX_TOKENS = 3000
_SELECTOR_MAX_TOKENS_CAP = 3000
_SELECTOR_REASON_MAX_LEN = 40
_SOURCE_PRIORITY = {"共同": 0, "历史报价": 1, "字段匹配": 2}


def _load_business_knowledge() -> str:
    """Load business knowledge from configured path with mtime cache."""
    global _business_knowledge_cache
    try:
        from backend.tools.inventory.config import config

        path_str = getattr(config, "WANDING_BUSINESS_KNOWLEDGE_PATH", None)
        if not path_str:
            return _BUSINESS_KNOWLEDGE

        p = Path(path_str)
        mtime: Optional[float] = None
        if p.exists():
            try:
                mtime = p.stat().st_mtime
            except OSError:
                mtime = None

            if (
                _business_knowledge_cache.get("path") == path_str
                and _business_knowledge_cache.get("mtime") == mtime
            ):
                return _business_knowledge_cache.get("content", _BUSINESS_KNOWLEDGE)

            content = p.read_text(encoding="utf-8").strip()
            if not content:
                content = _BUSINESS_KNOWLEDGE
            _business_knowledge_cache = {"path": path_str, "mtime": mtime, "content": content}
            return content

        # file not exists: bootstrap with embedded knowledge
        try:
            p.parent.mkdir(parents=True, exist_ok=True)
            p.write_text(_BUSINESS_KNOWLEDGE, encoding="utf-8")
            try:
                mtime = p.stat().st_mtime
            except OSError:
                mtime = None
            _business_knowledge_cache = {"path": path_str, "mtime": mtime, "content": _BUSINESS_KNOWLEDGE}
        except Exception as e:
            logger.debug("bootstrap business knowledge file failed: %s", e)
    except Exception as e:
        logger.debug("load business knowledge failed, use embedded: %s", e)

    return _BUSINESS_KNOWLEDGE


def invalidate_business_knowledge_cache() -> None:
    """Clear business knowledge cache, forcing reload on next call."""
    global _business_knowledge_cache
    _business_knowledge_cache = {}


def _extract_keyword_tokens(keywords: str) -> list[str]:
    raw = (keywords or "").strip().lower()
    if not raw:
        return []
    tokens = re.findall(r"[a-z0-9\-_/\.]+|[\u4e00-\u9fff]{1,8}", raw)
    seen: set[str] = set()
    out: list[str] = []
    for t in tokens:
        t = t.strip()
        if not t:
            continue
        if len(t) == 1 and not t.isdigit():
            continue
        if t in seen:
            continue
        seen.add(t)
        out.append(t)
    return out


def _build_knowledge_hint(keywords: str, knowledge: str, limit: int) -> str:
    """
    Mandatory business-knowledge injection with compacting:
    - Prefer lines hit by keyword tokens.
    - Fill remaining budget with head lines.
    """
    text = (knowledge or "").strip()
    if not text:
        return _BUSINESS_KNOWLEDGE[:limit]

    lines = [ln.strip() for ln in text.splitlines() if ln.strip()]
    if not lines:
        return text[:limit]

    tokens = _extract_keyword_tokens(keywords)

    scored: list[tuple[int, int, str]] = []
    for idx, ln in enumerate(lines):
        low = ln.lower()
        score = 0
        for t in tokens:
            if t in low:
                score += 2
            if len(t) >= 2 and t in low.replace(" ", ""):
                score += 1
        if re.search(r"dn\s*\d+|\d+\s*mm|ppr|pvc|pe", low):
            score += 1
        scored.append((score, idx, ln))

    picked: list[str] = []
    budget = max(200, int(limit or _SELECTOR_DEFAULT_KNOWLEDGE_CHAR_LIMIT))

    # 1) keyword-hit lines first
    for score, _, ln in sorted(scored, key=lambda x: (-x[0], x[1])):
        if score <= 0:
            break
        if ln in picked:
            continue
        if sum(len(x) + 1 for x in picked) + len(ln) > budget:
            continue
        picked.append(ln)
        if len(picked) >= 10:
            break

    # 2) fill with top lines to keep context
    if len(picked) < 4:
        for ln in lines:
            if ln in picked:
                continue
            if sum(len(x) + 1 for x in picked) + len(ln) > budget:
                break
            picked.append(ln)
            if len(picked) >= 8:
                break

    hint = "\n".join(picked).strip()
    if not hint:
        hint = text[:budget]
    return hint[:budget]


def _source_rank(source: str) -> int:
    return _SOURCE_PRIORITY.get((source or "").strip(), 99)


def _build_selector_prompt(
    keywords: str,
    llm_candidates: list[dict[str, Any]],
    knowledge_hint: str,
) -> str:
    """Build the prompt string sent to the LLM selector."""
    lines: list[str] = []
    for i, c in enumerate(llm_candidates, 1):
        code = (c.get("code") or "").strip()
        name = (c.get("matched_name") or "")[:120]
        price = c.get("unit_price", 0)
        source = (c.get("source") or "")[:30]
        lines.append(
            f"{i}. [{code}] {name} | price={price} | src={source} | src_rank={_source_rank(source)}"
        )
    candidates_text = "\n".join(lines)
    return (
        f"keywords: {keywords}\n"
        f"N={len(llm_candidates)}\n"
        f"candidates:\n{candidates_text}\n\n"
        f"business_knowledge(mandatory):\n{knowledge_hint}\n\n"
        f"task: choose exactly one index in 1..{len(llm_candidates)}, or 0 if none matches.\n"
        'output JSON only: {"index": number, "reason": "short text"}'
    )


def _sort_candidates_by_source(candidates: list[dict[str, Any]]) -> list[dict[str, Any]]:
    # Stable sort by source priority while preserving original order within same source.
    return sorted(
        list(candidates),
        key=lambda c: _source_rank(str(c.get("source", ""))),
    )


def _extract_content_from_openai_response(resp: Any) -> tuple[str, str, int]:
    raw_content = resp.choices[0].message.content if resp and resp.choices else None
    content = (raw_content or "").strip()
    finish_reason = getattr(resp.choices[0], "finish_reason", None) if resp and resp.choices else None
    reasoning_content = (
        getattr(resp.choices[0].message, "reasoning_content", None) if resp and resp.choices else None
    )
    reasoning_len = len(reasoning_content or "")

    if not content and reasoning_content:
        m = re.search(r"\{[\s\S]*\}", reasoning_content, re.DOTALL)
        if m:
            candidate = m.group(0).strip()
            if '"index"' in candidate or '"options"' in candidate:
                content = candidate
                logger.info("selector JSON extracted from reasoning_content")
        if not content:
            # reasoning_content may be truncated without balanced braces; salvage index/reason by regex.
            m_idx = re.search(r'"index"\s*:\s*(-?\d+)', reasoning_content)
            m_reason = re.search(r'"(?:reason|reasoning)"\s*:\s*"([^"]*)"', reasoning_content)
            if m_idx:
                content = json.dumps(
                    {
                        "index": int(m_idx.group(1)),
                        "reason": (m_reason.group(1) if m_reason else "").strip(),
                    },
                    ensure_ascii=False,
                )
                logger.info("selector index/reason salvaged from truncated reasoning_content")

    return content, str(finish_reason or ""), reasoning_len


def _fast_path(
    keywords: str,
    candidates: list[dict[str, Any]],
    config: Any,
    selector_model: str,
    knowledge_override: str | None,
) -> Optional[dict[str, Any]]:
    """
    Fast selector path for non-thinking models (e.g. gpt-4o-mini).
    Uses response_format=json_object and max_tokens=120.
    Falls back to _rule_based_fallback on any error.
    """
    if not candidates:
        return None

    candidate_limit = int(
        getattr(config, "LLM_SELECTOR_CANDIDATE_LIMIT", _SELECTOR_DEFAULT_CANDIDATE_LIMIT)
        if config is not None
        else _SELECTOR_DEFAULT_CANDIDATE_LIMIT
    )
    candidate_limit = max(1, min(candidate_limit, 20))

    knowledge_limit = int(
        getattr(config, "LLM_SELECTOR_KNOWLEDGE_CHAR_LIMIT", _SELECTOR_DEFAULT_KNOWLEDGE_CHAR_LIMIT)
        if config is not None
        else _SELECTOR_DEFAULT_KNOWLEDGE_CHAR_LIMIT
    )
    knowledge_limit = max(200, min(knowledge_limit, 4000))
    _full_knowledge: bool = (
        os.environ.get("INVENTORY_LLM_SELECTOR_FULL_KNOWLEDGE", "1").strip().lower()
        in ("1", "true", "yes")
    )

    sorted_candidates = _sort_candidates_by_source(candidates)
    llm_candidates = sorted_candidates[:candidate_limit]

    knowledge = (
        knowledge_override.strip()
        if knowledge_override and knowledge_override.strip()
        else _load_business_knowledge()
    )
    knowledge_hint = (
        knowledge if _full_knowledge else _build_knowledge_hint(keywords, knowledge, knowledge_limit)
    )

    prompt = _build_selector_prompt(keywords, llm_candidates, knowledge_hint)

    api_key = getattr(config, "LLM_SELECTOR_API_KEY", "") if config is not None else ""
    base_url_raw = getattr(config, "LLM_SELECTOR_BASE_URL", "") if config is not None else ""
    base_url = base_url_raw.strip() or None
    timeout = int(getattr(config, "LLM_SELECTOR_TIMEOUT", 15)) if config is not None else 15

    try:
        client = _get_selector_client(api_key, base_url)

        logger.info(
            "llm_select_best (fast): model=%s n_candidates=%d prompt_chars=%d",
            selector_model,
            len(candidates),
            len(prompt),
        )

        resp = client.chat.completions.create(
            model=selector_model,
            messages=[
                {"role": "system", "content": _SYSTEM_SELECTOR},
                {"role": "user", "content": prompt},
            ],
            temperature=0,
            max_tokens=120,
            timeout=timeout,
            response_format={"type": "json_object"},
        )

        raw = resp.choices[0].message.content if resp and resp.choices else ""
        content = (raw or "").strip()
        if not content:
            raise ValueError("fast path: empty content from model")

        obj = json.loads(content)
        idx = int(obj.get("index", 0) or 0)
        reason = str(obj.get("reason") or obj.get("reasoning") or "")[:_SELECTOR_REASON_MAX_LEN]

        if idx <= 0:
            return None
        if idx > len(llm_candidates):
            return _rule_based_fallback(keywords, candidates, reason="llm_index_out_of_range")

        return _candidate_to_result(llm_candidates[idx - 1], reason)

    except Exception as e:
        logger.warning("fast path selector failed, fallback to rules: %s", e)
        return _rule_based_fallback(keywords, candidates, reason="llm_error")


def llm_select_best(
    keywords: str,
    candidates: list[dict[str, Any]],
    max_tokens: int | None = None,
    knowledge_override: str | None = None,
) -> Optional[dict[str, Any]]:
    """Select the best candidate by LLM; return None when LLM decides index=0.

    When LLM_SELECTOR_MODEL is set in config, routes to the fast path
    (_fast_path) which uses a non-thinking model with response_format=json_object
    and max_tokens=120. Otherwise uses the original glm-4.5-air path unchanged.

    Args:
        keywords: Product search keywords.
        candidates: List of candidate dicts with keys: code, matched_name, unit_price, source.
        max_tokens: Override max_tokens for the old path only. Ignored by fast path.
        knowledge_override: Override the business knowledge text (fast path only; legacy path ignores).
    """
    if not candidates:
        return None

    try:
        from backend.tools.inventory.config import config
    except Exception:
        config = None

    selector_model = (getattr(config, "LLM_SELECTOR_MODEL", "") or "").strip() if config is not None else ""
    selector_api_key = (getattr(config, "LLM_SELECTOR_API_KEY", "") or "").strip() if config is not None else ""
    if selector_model and selector_api_key:
        return _fast_path(keywords, candidates, config, selector_model, knowledge_override)
    if selector_model and not selector_api_key:
        logger.warning(
            "LLM_SELECTOR_MODEL is set but LLM_SELECTOR_API_KEY is empty; using legacy selector path"
        )

    if max_tokens is None:
        max_tokens = int(
            getattr(config, "LLM_SELECTOR_MAX_TOKENS", _SELECTOR_DEFAULT_MAX_TOKENS)
            if config is not None
            else _SELECTOR_DEFAULT_MAX_TOKENS
        )

    candidate_limit = int(
        getattr(config, "LLM_SELECTOR_CANDIDATE_LIMIT", _SELECTOR_DEFAULT_CANDIDATE_LIMIT)
        if config is not None
        else _SELECTOR_DEFAULT_CANDIDATE_LIMIT
    )
    candidate_limit = max(1, min(candidate_limit, 20))

    knowledge_limit = int(
        getattr(config, "LLM_SELECTOR_KNOWLEDGE_CHAR_LIMIT", _SELECTOR_DEFAULT_KNOWLEDGE_CHAR_LIMIT)
        if config is not None
        else _SELECTOR_DEFAULT_KNOWLEDGE_CHAR_LIMIT
    )
    knowledge_limit = max(200, min(knowledge_limit, 4000))
    # Whether to inject full knowledge (no compaction). Reads INVENTORY_LLM_SELECTOR_FULL_KNOWLEDGE, default True.
    _full_knowledge: bool = (
        os.environ.get("INVENTORY_LLM_SELECTOR_FULL_KNOWLEDGE", "1").strip().lower() in ("1", "true", "yes")
    )

    sorted_candidates = _sort_candidates_by_source(candidates)
    llm_candidates = sorted_candidates[:candidate_limit]

    lines: list[str] = []
    for i, c in enumerate(llm_candidates, 1):
        code = (c.get("code") or "").strip()
        name = (c.get("matched_name") or "")[:120]
        price = c.get("unit_price", 0)
        source = (c.get("source") or "")[:30]
        lines.append(
            f"{i}. [{code}] {name} | price={price} | src={source} | src_rank={_source_rank(source)}"
        )
    candidates_text = "\n".join(lines)

    # Mandatory: include business knowledge in selector prompt.
    knowledge = _load_business_knowledge()
    # Full injection by default (INVENTORY_LLM_SELECTOR_FULL_KNOWLEDGE=1); compaction only when disabled.
    knowledge_hint = knowledge if _full_knowledge else _build_knowledge_hint(keywords, knowledge, knowledge_limit)

    prompt = _build_selector_prompt(keywords, llm_candidates, knowledge_hint)

    try:
        content = ""
        api_key = getattr(config, "LLM_API_KEY", "") if config is not None else ""
        base_url = (
            getattr(config, "LLM_BASE_URL", "https://open.bigmodel.cn/api/paas/v4")
            if config is not None
            else "https://open.bigmodel.cn/api/paas/v4"
        )
        model = getattr(config, "LLM_MODEL", "glm-4.5-air") if config is not None else "glm-4.5-air"
        timeout = int(getattr(config, "LLM_SELECTOR_TIMEOUT", 40)) if config is not None else 40
        mt = min(max(32, int(max_tokens or _SELECTOR_DEFAULT_MAX_TOKENS)), _SELECTOR_MAX_TOKENS_CAP)

        from openai import OpenAI

        logger.info(
            "llm_select_best: OpenAI-compatible model=%s n_candidates=%d prompt_chars=%d",
            model,
            len(candidates),
            len(prompt),
        )
        client = OpenAI(api_key=api_key, base_url=base_url)

        resp = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": _SYSTEM_SELECTOR},
                {"role": "user", "content": prompt},
            ],
            temperature=0,
            max_tokens=mt,
            timeout=timeout,
        )
        content, finish_reason, reasoning_len = _extract_content_from_openai_response(resp)

        # length 截断时重试一次：提高 max_tokens，并压缩知识（避免 length 再次触发）
        if not content and finish_reason == "length":
            retry_mt = min(_SELECTOR_MAX_TOKENS_CAP, max(mt * 2, 320))
            retry_knowledge_hint = _build_knowledge_hint(keywords, knowledge, min(knowledge_limit, 1000))
            retry_prompt = _build_selector_prompt(keywords, llm_candidates, retry_knowledge_hint)
            logger.warning(
                "selector hit length; retry once with higher max_tokens=%d", retry_mt
            )
            retry_resp = client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": _SYSTEM_SELECTOR},
                    {"role": "user", "content": retry_prompt},
                ],
                temperature=0,
                max_tokens=retry_mt,
                timeout=timeout,
            )
            content, finish_reason, reasoning_len = _extract_content_from_openai_response(retry_resp)

        if not content:
            logger.warning(
                "selector empty content, finish_reason=%s reasoning_content_len=%d",
                finish_reason,
                reasoning_len,
            )
            raise ValueError("selector empty content")

        content = content.strip()
        if content.startswith("```"):
            content = content.strip("`")
            if content.lower().startswith("json"):
                content = content[4:].strip()

        obj: dict[str, Any] | None = None
        parsed: Any = None
        try:
            parsed = json.loads(content)
            if isinstance(parsed, dict):
                obj = parsed
        except json.JSONDecodeError:
            m_json = re.search(r"\{[\s\S]*?\}", content)
            if m_json:
                try:
                    parsed = json.loads(m_json.group(0))
                    if isinstance(parsed, dict):
                        obj = parsed
                except json.JSONDecodeError:
                    obj = None

            if obj is None:
                m_idx = re.search(r'"index"\s*:\s*(-?\d+)', content)
                m_reason = re.search(r'"(?:reason|reasoning)"\s*:\s*"([^\"]*)"', content)
                if m_idx:
                    obj = {
                        "index": int(m_idx.group(1)),
                        "reason": (m_reason.group(1) if m_reason else "").strip(),
                    }

        # backward compatibility: old schema {"options": [{"index":..., "reasoning":...}]}
        if obj is None and isinstance(parsed, dict) and isinstance(parsed.get("options"), list):
            for opt in parsed["options"]:
                if isinstance(opt, dict) and "index" in opt:
                    obj = {
                        "index": int(opt.get("index", 0) or 0),
                        "reason": (opt.get("reason") or opt.get("reasoning") or "").strip(),
                    }
                    break

        if obj is None:
            raise ValueError(f"selector parse failed: {content[:120]}")

        idx = int(obj.get("index", 0) or 0)
        reason = (obj.get("reason") or obj.get("reasoning") or "").strip()[:_SELECTOR_REASON_MAX_LEN]

        if idx <= 0:
            return None
        if idx > len(llm_candidates):
            return _rule_based_fallback(keywords, candidates, reason="llm_index_out_of_range")

        return _candidate_to_result(llm_candidates[idx - 1], reason)
    except Exception as e:
        logger.warning("LLM selector failed, fallback to rules: %s", e)
        return _rule_based_fallback(keywords, candidates, reason="llm_error")


def _candidate_to_result(c: dict[str, Any], reasoning: str = "") -> dict[str, Any]:
    return {
        "code": (c.get("code") or "").strip(),
        "matched_name": (c.get("matched_name") or "")[:200],
        "unit_price": float(c.get("unit_price", 0) or 0),
        "reasoning": reasoning,
    }


def _rule_based_fallback(
    keywords: str,
    candidates: list[dict[str, Any]],
    reason: str = "llm_error",
) -> Optional[dict[str, Any]]:
    if not candidates:
        return None

    kw_tokens = _extract_keyword_tokens(keywords)
    kw_low = (keywords or "").lower()
    m_size_mm = re.search(r"(?:dn\s*)?(\d{2,4})\s*mm", kw_low)
    mm_size = m_size_mm.group(1) if m_size_mm else None
    kw_corrugated = ("双壁波纹管" in kw_low) or ("corrugated" in kw_low)

    best = None
    best_score = -10**9
    for c in candidates:
        name = (c.get("matched_name") or "")
        low = name.lower()
        src = (c.get("source") or "").strip()
        score = 0

        # token overlap
        for t in kw_tokens:
            if t in low:
                score += 3
        # prefer full dn hit
        m_dn = re.search(r"dn\s*(\d+)", (keywords or "").lower())
        if m_dn and f"dn{m_dn.group(1)}" in low.replace(" ", ""):
            score += 5
        # support non-DN size text such as "300mm" against names like "SN8 300"
        if mm_size and re.search(rf"(?<!\d){re.escape(mm_size)}(?!\d)", low):
            score += 4

        # semantic hard preferences (higher than source tie-break)
        if "双壁波纹管" in kw_low:
            if "双壁波纹管" in low:
                score += 12
            else:
                score -= 8
        if "热水" in kw_low or "热给水" in kw_low:
            if "热给水" in low:
                score += 8
            if "冷给水" in low:
                score -= 7
        if "冷水" in kw_low or "冷给水" in kw_low:
            if "冷给水" in low:
                score += 8
            if "热给水" in low:
                score -= 7

        # rating level hints in drainage corrugated pipe domain: 10KN ~= SN8
        if kw_corrugated and "10kn" in kw_low:
            if "sn8" in low:
                score += 8
            if "sn4" in low:
                score -= 4

        # source priority: 共同 > 历史报价 > 字段匹配
        rank = _source_rank(src)
        if rank == 0:
            score += 9
        elif rank == 1:
            score += 6
        elif rank == 2:
            score += 3

        # shorter name slightly preferred for tie-break (usually more canonical)
        score -= int(len(name) / 200)

        if score > best_score:
            best_score = score
            best = c

    c = best or candidates[0]
    return {
        "code": (c.get("code") or "").strip(),
        "matched_name": (c.get("matched_name") or "")[:200],
        "unit_price": float(c.get("unit_price", 0) or 0),
        "reasoning": f"[规则回退] {reason}",
        "_selection_meta": {
            "from_rule_fallback": True,
            "reason": reason,
            "chosen_source": (c.get("source") or "").strip(),
            "source_rank": _source_rank((c.get("source") or "").strip()),
        },
    }
