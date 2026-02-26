"""
上下文压缩：对历史 tool 结果做摘要（LLM + 规则 fallback），供 _trim_context 使用。
"""
import re
import logging
from typing import Callable, Dict, List, Optional

logger = logging.getLogger(__name__)

SUMMARY_MAX_CHARS = 800
# 喂给摘要模型的原文上限，应与单条 tool 结果上限一致（core/agent 的 TOOL_RESULT_MAX_CHARS=8000），避免只摘前 2000 字丢信息
SUMMARY_INPUT_MAX_CHARS = 8_000
LLM_TIMEOUT = 3.0


def build_tool_call_id_to_name(messages: List[dict]) -> Dict[str, str]:
    """从 messages 中收集 tool_call_id -> function.name 的映射。"""
    id_to_name: Dict[str, str] = {}
    for m in messages:
        if m.get("role") != "assistant":
            continue
        for tc in (m.get("tool_calls") or []):
            tid = (tc.get("id") or "").strip()
            fn = tc.get("function") or {}
            name = (fn.get("name") or "").strip()
            if tid:
                id_to_name[tid] = name
    return id_to_name


def _summarize_by_rules(tool_name: str, content: str, max_chars: int = SUMMARY_MAX_CHARS) -> str:
    """规则 fallback：按工具类型抽取关键行，总长不超过 max_chars。"""
    if not content or len(content.strip()) == 0:
        return "[无内容]"
    lines = [s.strip() for s in content.splitlines() if s.strip()]
    if not lines:
        return content[:max_chars] + ("…" if len(content) > max_chars else "")

    key_pattern = re.compile(
        r"(选中|chosen|code|价格|档位|单价|库存|balance|availableToSell|找到|匹配|match_source|物料编号|no\.?)",
        re.IGNORECASE,
    )
    kept: List[str] = []

    tool_lower = (tool_name or "").lower()
    if "match" in tool_lower or "wanding" in tool_lower or "quotation" in tool_lower:
        for line in lines:
            if key_pattern.search(line) or "|" in line or "---" in line:
                kept.append(line)
        if not kept:
            kept = lines[:5]
    elif "inventory" in tool_lower or "search" in tool_lower or "get_inventory" in tool_lower:
        for line in lines:
            if "找到" in line or "code" in line.lower() or "no" in line or "balance" in line.lower() or key_pattern.search(line):
                kept.append(line)
        if not kept:
            kept = lines[:6]
    elif "select_wanding" in tool_lower:
        for line in lines:
            if "选中" in line or "chosen" in line.lower() or "价格" in line or key_pattern.search(line):
                kept.append(line)
        if not kept:
            kept = lines[:4]
    else:
        kept = lines[:3]
        for line in lines[3:]:
            if key_pattern.search(line):
                kept.append(line)

    out = "\n".join(kept)
    if len(out) > max_chars:
        out = out[: max_chars - 1].rsplit("\n", 1)[0] if "\n" in out[:max_chars] else out[:max_chars - 1]
        out = out + "…"
    return out or content[:max_chars]


def summarize_tool_result_sync(
    tool_name: str,
    content: str,
    max_chars: int = SUMMARY_MAX_CHARS,
    api_key: Optional[str] = None,
    base_url: Optional[str] = None,
    model: str = "gpt-4o-mini",
    timeout: float = LLM_TIMEOUT,
) -> str:
    """
    同步摘要：优先用 LLM（gpt-4o-mini），超时或失败则用规则 fallback。
    api_key/base_url 为空时跳过 LLM 直接用规则。
    """
    if not content or len(content.strip()) < 50:
        return content[:max_chars] + ("…" if len(content) > max_chars else "")

    if api_key and base_url:
        try:
            from openai import OpenAI
            client = OpenAI(api_key=api_key, base_url=base_url.rstrip("/") + "/")
            feed = content[:SUMMARY_INPUT_MAX_CHARS]
            if len(content) > SUMMARY_INPUT_MAX_CHARS:
                feed += "\n…（已截断）"
            resp = client.chat.completions.create(
                model=model,
                messages=[
                    {
                        "role": "system",
                        "content": "用1～3句话概括该工具返回结果，必须保留：选中的code/名称、价格/档位、库存数等对后续决策有用的信息；不要保留表格原文，只保留结论和关键数字。输出纯文本，不要markdown。",
                    },
                    {
                        "role": "user",
                        "content": f"工具名：{tool_name or '未知'}\n\n返回内容：\n{feed}",
                    },
                ],
                max_tokens=256,
                temperature=0.1,
                timeout=timeout,
            )
            text = (resp.choices[0].message.content or "").strip()
            if text and len(text) <= max_chars * 2:
                return text[:max_chars] + ("…" if len(text) > max_chars else "")
        except Exception as e:
            logger.debug("摘要 LLM 调用失败，使用规则 fallback: %s", e)

    return _summarize_by_rules(tool_name, content, max_chars)


def make_summarizer(
    api_key: Optional[str],
    base_url: Optional[str],
    model: str,
    max_chars: int = SUMMARY_MAX_CHARS,
    timeout: float = LLM_TIMEOUT,
) -> Callable[[str, str], str]:
    """返回 (tool_name, content) -> summary 的 callable，供 _trim_context 使用。"""
    def fn(tool_name: str, content: str) -> str:
        return summarize_tool_result_sync(
            tool_name, content, max_chars, api_key, base_url, model, timeout
        )
    return fn
