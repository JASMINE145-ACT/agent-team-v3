from __future__ import annotations

"""
会话摘要生成：基于 Session.turns 与已有 summary 生成/更新对话摘要。

使用 SUMMARY_LLM_MODEL（若已配置），失败时回退到规则截断。
"""

import logging
from typing import List, Optional

from openai import OpenAI

from backend.agent.session import Turn
from backend.config import Config

logger = logging.getLogger(__name__)

SUMMARY_MAX_CHARS = 1200
SUMMARY_INPUT_MAX_CHARS = 6_000


def _format_turns_for_summary(turns: List[Turn], max_chars: int) -> str:
    """将若干轮问答格式化为摘要输入文本，并限制总长度。"""
    pieces: List[str] = []
    total = 0
    for t in turns:
        block = f"用户：{(t.query or '').strip()}\n助手：{(t.answer or '').strip()}\n\n"
        if not block.strip():
            continue
        if total + len(block) > max_chars:
            remaining = max_chars - total
            if remaining <= 0:
                break
            block = block[:remaining]
        pieces.append(block)
        total += len(block)
        if total >= max_chars:
            break
    return "".join(pieces).strip()


def summarize_session_turns(
    turns: List[Turn],
    existing_summary: Optional[str] = None,
) -> str:
    """
    为整个会话生成/更新摘要。

    - 优先使用 SUMMARY_LLM_MODEL（或主 LLM 配置）生成约 300–600 字摘要；
    - 若调用失败或未配置，回退为「已有摘要 + 最近若干轮截断」。
    """
    existing_summary = (existing_summary or "").strip()
    if not turns:
        return existing_summary

    # 输入内容：已有摘要（如有） + 全部 turns 的精简文本
    turns_text = _format_turns_for_summary(turns, max_chars=SUMMARY_INPUT_MAX_CHARS)
    if not turns_text:
        return existing_summary

    feed = turns_text
    if existing_summary:
        feed = f"【已有摘要】\n{existing_summary}\n\n【新增对话】\n{turns_text}"

    api_key = Config.SUMMARY_LLM_API_KEY or Config.OPENAI_API_KEY
    base_url = (Config.SUMMARY_LLM_BASE_URL or Config.OPENAI_BASE_URL or "").rstrip("/")
    model = getattr(Config, "SUMMARY_LLM_MODEL", "gpt-4o-mini")

    if api_key and base_url:
        try:
            client = OpenAI(api_key=api_key, base_url=base_url + "/")
            prompt = (
                "你是对话摘要助手。请根据以下会话内容，生成一段 300～600 字的摘要，"
                "重点保留：用户的核心目标、涉及的 Excel/库存/报价/无货等关键操作、已完成的步骤与结论。"
                "不要逐句翻译对话，也不要输出表格，直接给出凝练的自然语言摘要。输出使用中文为主；如对话主要为英文可适当混用英文术语。"
            )
            resp = client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": prompt},
                    {"role": "user", "content": feed[:SUMMARY_INPUT_MAX_CHARS]},
                ],
                max_tokens=512,
                temperature=0.2,
            )
            text = (resp.choices[0].message.content or "").strip()
            if text:
                return text[:SUMMARY_MAX_CHARS] + ("…" if len(text) > SUMMARY_MAX_CHARS else "")
        except Exception as e:  # noqa: BLE001
            logger.debug("summarize_session_turns LLM 调用失败，使用规则截断: %s", e, exc_info=True)

    # 规则回退：已有摘要 + 最近几轮问答的压缩
    tail_turns = turns[-6:]
    tail_text = _format_turns_for_summary(tail_turns, max_chars=SUMMARY_MAX_CHARS)
    if existing_summary and tail_text:
        combined = f"{existing_summary}\n\n【最近进展补充】\n{tail_text}"
    elif tail_text:
        combined = tail_text
    else:
        combined = existing_summary
    combined = combined.strip()
    return combined[:SUMMARY_MAX_CHARS] + ("…" if len(combined) > SUMMARY_MAX_CHARS else "")


__all__ = ["summarize_session_turns"]

