# 从报价名称中抽取「报价产品规」用于与第二张图格式对齐（询价规格型号 / 报价产品规 分开）

from __future__ import annotations

import json
import logging
import re
from typing import Any, List, Optional

logger = logging.getLogger(__name__)

# 批量 LLM 行数上限，超过则跳过 LLM 仅用规则
EXTRACT_SPECS_BATCH_MAX_ROWS = 50

# 常见规格模式：DN200、(8")、4M/根、Φ25、PVC-U排水、(管径) 等
_QUOTE_SPEC_PATTERNS = [
    re.compile(r"DN\s*\d+\s*(?:\(\s*\d+\s*[\"']?\s*\))?", re.I),
    re.compile(r"\(\s*\d+\s*[\"']\s*\)"),  # (8") (6")
    re.compile(r"\d+\s*[\"']\s*(?:寸|英寸)?"),
    re.compile(r"\d+\s*[mM]\s*/\s*根"),
    re.compile(r"Φ\s*\d+", re.I),
    re.compile(r"\d+\s*/\s*\d+"),
    re.compile(r"\d+\s*[xX×]\s*\d+"),
    re.compile(r"\d+\s*\*\s*\d+(?:\.\d+)?"),
    # 括号内中文规格：(管径)、(排水)、（带检查口）、(管箍) 等
    re.compile(r"[（(][^）)\s]{1,20}[）)]"),
    # 材质/系列：PVC-U、PVC-UH、PVC-U排水、PPR、PE 等
    re.compile(r"PVC-?U(?:H|排水|给水)?", re.I),
    re.compile(r"PPR(?:\s*给水)?", re.I),
    re.compile(r"PE(?:\s*管)?", re.I),
    # 名称末尾或括号旁单数字规格（如 直通50、(管径) 后的 50）
    re.compile(r"(?<=[通径管\s])\d{2,4}(?=[\s/]|$)", re.I),
    # 末尾 dn/DN+数字（如 白色 dn50）、单独尾数
    re.compile(r"(?:^|[\s])dn\s*\d+(?=[\s/]|$)", re.I),
    re.compile(r"(?:^|[\s])\d{2,4}(?=[\s/]|$)"),
]


def _last_resort_quote_spec(quote_name: str) -> str:
    """规则未命中时，用名称末尾像规格的片段兜底（如最后一截含数字/dn）。"""
    s = (quote_name or "").strip()
    if not s or len(s) < 2:
        return ""
    tokens = [t for t in s.replace("(", " ").replace(")", " ").split() if t]
    if not tokens:
        return ""
    last = tokens[-1]
    if re.search(r"\d", last) or re.search(r"dn|Φ|mm|cm|m/", last, re.I):
        return last[:100]
    if len(tokens) >= 2:
        prev = tokens[-2]
        if re.search(r"\d", prev) or re.search(r"dn|Φ", prev, re.I):
            return f"{prev} {last}"[:100]
    return ""


def extract_spec_from_quote_name(quote_name: str) -> str:
    """
    从报价名称（长描述）中抽取规格部分，用于单独显示「报价产品规」列。
    规则优先；无匹配时用末尾像规格的片段兜底；若需更高稳定性可开 QUOTATION_SPEC_LLM 批量 LLM。
    """
    s = (quote_name or "").strip()
    if not s:
        return ""
    parts: list[str] = []
    seen: set[str] = set()
    for pat in _QUOTE_SPEC_PATTERNS:
        for m in pat.finditer(s):
            p = m.group(0).strip()
            if p and p not in seen:
                seen.add(p)
                parts.append(p)
    if parts:
        return " ".join(parts)
    return _last_resort_quote_spec(quote_name)


def extract_spec_from_quote_name_llm(
    quote_name: str,
    *,
    api_key: Optional[str] = None,
    base_url: Optional[str] = None,
    model: Optional[str] = None,
) -> str:
    """
    可选：用 LLM 从报价名称中抽取规格，提升稳定性。失败时退回规则结果。
    """
    rule_result = extract_spec_from_quote_name(quote_name)
    try:
        from backend.config import Config
        _api_key = api_key or getattr(Config, "OPENAI_API_KEY", None)
        _base_url = base_url or getattr(Config, "OPENAI_BASE_URL", None) or ""
        _model = model or getattr(Config, "LLM_MODEL", "glm-4-flash")
    except Exception:
        return rule_result
    if not _api_key or len((quote_name or "").strip()) < 4:
        return rule_result
    try:
        from backend.core.llm_client import get_openai_client
        client = get_openai_client(api_key=_api_key, base_url=_base_url)
        resp = client.chat.completions.create(
            model=_model,
            messages=[
                {"role": "system", "content": "从「报价名称」中仅提取规格型号（如 DN200、8\"、4M/根、Φ25），只输出规格文本，无则输出空。"},
                {"role": "user", "content": quote_name},
            ],
            max_tokens=80,
            temperature=0,
        )
        content = (resp.choices[0].message.content or "").strip()
        if content:
            return content[:200]
    except Exception as e:
        logger.debug("extract_spec_from_quote_name_llm 失败: %s，使用规则结果", e)
    return rule_result


EXTRACT_SPECS_BATCH_SYSTEM = """你为报价单表格做规格提取。输入是若干行，每行有「询价名称」「当前询价规格」「报价名称」。
对每一行输出两个字段：
- requested_spec：询价规格。若当前询价规格已有且正确则原样返回，否则从询价名称中补全或规范化（如 50、dn、口径等），无则空字符串。
- quoted_spec：仅从「报价名称」中抽取的规格型号（如 PVC-H、PVC-U排水、30°、异径、三级配、DN200、4M/根 等），无则空字符串。

只输出一个 JSON 数组，与输入行一一对应，不要其他说明。每项格式：{"requested_spec":"...","quoted_spec":"..."}
示例：[{"requested_spec":"50","quoted_spec":"PVC-U排水"},{"requested_spec":"dn20","quoted_spec":"30°异径三级配"}]"""


def _parse_batch_specs_json(raw: str) -> List[dict]:
    raw = (raw or "").strip()
    if "```" in raw:
        for part in re.split(r"```\w*\s*", raw):
            part = part.strip()
            if part.startswith("["):
                try:
                    return json.loads(part)
                except json.JSONDecodeError:
                    continue
    if raw.startswith("["):
        try:
            return json.loads(raw)
        except json.JSONDecodeError as e:
            logger.warning("extract_specs_batch_llm JSON 解析失败: %s", e)
    return []


def extract_specs_batch_llm(
    rows: List[dict],
    *,
    api_key: Optional[str] = None,
    base_url: Optional[str] = None,
    model: Optional[str] = None,
) -> List[dict]:
    """
    一次批量 LLM 调用，为每行产出 requested_spec 与 quoted_spec。
    入参 rows 每项至少含 product_name, specification, quote_name。
    返回与 rows 等长的 list，每项 {"requested_spec": str, "quoted_spec": str}；失败或超行数时返回空列表。
    """
    if not rows or len(rows) > EXTRACT_SPECS_BATCH_MAX_ROWS:
        logger.debug(f"Skipping LLM spec extraction: rows={len(rows) if rows else 0}, max={EXTRACT_SPECS_BATCH_MAX_ROWS}")
        return []
    try:
        from backend.config import Config
        if not getattr(Config, "QUOTATION_SPEC_LLM", True):
            logger.info("QUOTATION_SPEC_LLM is False, skipping LLM extraction")
            return []
        _api_key = api_key or getattr(Config, "OPENAI_API_KEY", None)
        _base_url = base_url or getattr(Config, "OPENAI_BASE_URL", None) or ""
        _model = model or getattr(Config, "LLM_MODEL", "glm-4-flash")
        logger.info(f"LLM spec extraction: model={_model}, api_key={'***' if _api_key else 'None'}")
    except Exception:
        return []
    if not _api_key:
        logger.warning("No API key for LLM spec extraction")
        return []
    # 构建紧凑输入：每行一行文本，便于模型按行输出
    lines_text = []
    for i, r in enumerate(rows):
        name = (r.get("product_name") or "").strip() or "-"
        spec = (r.get("specification") or "").strip() or "-"
        quote = (r.get("quote_name") or "").strip() or "-"
        lines_text.append(f"{i + 1}. 询价名称:{name} 当前询价规格:{spec} 报价名称:{quote}")
    user_content = "请为以下每行输出 requested_spec 和 quoted_spec（JSON 数组）：\n" + "\n".join(lines_text)
    try:
        from backend.core.llm_client import get_openai_client
        client = get_openai_client(api_key=_api_key, base_url=_base_url)
        resp = client.chat.completions.create(
            model=_model,
            messages=[
                {"role": "system", "content": EXTRACT_SPECS_BATCH_SYSTEM},
                {"role": "user", "content": user_content},
            ],
            max_tokens=min(2048, 80 * len(rows) + 200),
            temperature=0,
        )
        content = (resp.choices[0].message.content or "").strip()
        logger.info(f"LLM spec extraction response length: {len(content)}")
        parsed = _parse_batch_specs_json(content)
        if len(parsed) != len(rows):
            logger.warning("extract_specs_batch_llm 返回条数 %s 与输入 %s 不一致", len(parsed), len(rows))
            logger.debug(f"LLM response: {content[:500]}")
            return []
        out = []
        for i, p in enumerate(parsed):
            if not isinstance(p, dict):
                out.append({"requested_spec": "", "quoted_spec": ""})
                continue
            req = (p.get("requested_spec") or "").strip()[:500]
            quo = (p.get("quoted_spec") or "").strip()[:500]
            out.append({"requested_spec": req, "quoted_spec": quo})
        return out
    except Exception as e:
        logger.warning("extract_specs_batch_llm 调用失败: %s", e, exc_info=True)
        return []
