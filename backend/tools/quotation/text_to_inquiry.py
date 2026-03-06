# 文字报价：将用户输入的自由文本解析为询价行列表（product_name, specification, qty），与 extract_inquiry_items 输出结构对齐

from __future__ import annotations

import json
import logging
import re
from typing import Any, List

logger = logging.getLogger(__name__)

TEXT_TO_INQUIRY_SYSTEM = """你是一个报价单解析助手。用户会输入一段文字，描述需要报价的产品清单（可能多行、用分号/逗号/换行分隔，含产品名、规格、数量等）。
请将文字解析为结构化的「询价行」列表，每条包含：
- product_name: 产品名称（必填，字符串）
- specification: 规格型号（可选，无则空字符串）
- qty: 数量（整数，无法识别时填 0）

只输出一个 JSON 数组，不要其他说明。格式示例：
[{"product_name":"电缆","specification":"3*2.5","qty":100},{"product_name":"开关","specification":"","qty":20}]
"""


def _parse_llm_json_array(raw: str) -> List[dict]:
    raw = (raw or "").strip()
    # 允许被 ```json ... ``` 包裹
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
            logger.warning("text_to_inquiry: JSON 解析失败 %s", e)
    return []


def text_to_inquiry_items(
    text: str,
    *,
    api_key: str | None = None,
    base_url: str | None = None,
    model: str | None = None,
) -> List[dict[str, Any]]:
    """
    将用户输入的自由文本解析为询价行列表，与 extract_inquiry_items 的 item 结构对齐。

    Args:
        text: 用户输入的文字（多行或逗号/分号分隔，如「电缆 3*2.5 100米；开关 20个」）
        api_key, base_url, model: 可选 LLM 配置，不传则用 backend.config.Config

    Returns:
        [{"product_name": str, "specification": str, "qty": int}, ...]，qty 缺省为 0
    """
    text = (text or "").strip()
    if not text:
        return []

    try:
        from backend.config import Config
        _api_key = api_key or getattr(Config, "OPENAI_API_KEY", None)
        _base_url = base_url or getattr(Config, "OPENAI_BASE_URL", None) or ""
        _model = model or getattr(Config, "LLM_MODEL", "glm-4-flash")
        _max_tokens = getattr(Config, "LLM_MAX_TOKENS", 5000)
    except Exception:
        _api_key = api_key
        _base_url = base_url or ""
        _model = model or "gpt-4o-mini"
        _max_tokens = 2000

    if not _api_key:
        logger.warning("text_to_inquiry: 无 OPENAI_API_KEY，使用规则解析")
        return _text_to_inquiry_fallback(text)

    try:
        from backend.core.llm_client import get_openai_client
        client = get_openai_client(api_key=_api_key, base_url=_base_url)
        resp = client.chat.completions.create(
            model=_model,
            messages=[
                {"role": "system", "content": TEXT_TO_INQUIRY_SYSTEM},
                {"role": "user", "content": text},
            ],
            max_tokens=min(_max_tokens, 2048),
            temperature=0.1,
        )
        content = (resp.choices[0].message.content or "").strip()
        items = _parse_llm_json_array(content)
    except Exception as e:
        logger.warning("text_to_inquiry: LLM 解析失败 %s，使用规则解析", e)
        return _text_to_inquiry_fallback(text)

    out: List[dict[str, Any]] = []
    for it in items:
        if not isinstance(it, dict):
            continue
        name = (it.get("product_name") or it.get("name") or "").strip()
        if not name:
            continue
        spec = (it.get("specification") or it.get("spec") or "").strip()
        try:
            qty = int(it.get("qty", 0) or 0)
        except (TypeError, ValueError):
            qty = 0
        out.append({"product_name": name, "specification": spec, "qty": max(0, qty)})
    return out


def _text_to_inquiry_fallback(text: str) -> List[dict[str, Any]]:
    """规则解析：按行/分号/逗号拆分，尝试从每段提取数量，其余作为名称/规格。"""
    out: List[dict[str, Any]] = []
    # 统一换行与分号为分隔符，再按逗号拆（保留逗号在段内，仅对明显多段拆分）
    raw = (text or "").replace("；", ";").replace("\r\n", "\n").strip()
    segments = re.split(r"[\n;]+", raw)
    for seg in segments:
        seg = seg.strip()
        if not seg:
            continue
        # 尝试匹配末尾数量：数字+可选单位（个、米、根、支、箱等）
        m = re.search(r"(\d+)\s*(?:个|米|根|支|箱|件|套|台|只)?\s*$", seg)
        qty = 0
        name_spec = seg
        if m:
            qty = int(m.group(1))
            name_spec = seg[: m.start()].strip().rstrip("，, ")
        if not name_spec:
            continue
        # 名称与规格：若含明显规格（如 3*2.5、dn25、20/56），可拆；这里简化为整段作 product_name，规格空
        out.append({"product_name": name_spec, "specification": "", "qty": qty})
    return out
