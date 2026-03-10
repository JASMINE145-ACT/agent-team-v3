from __future__ import annotations

"""
WeCom 长连接消息与 CoreAgent 之间的桥接。

StandardWeComMessage 约定字段：
    {
        "msg_id": str,
        "from_user": str,
        "to_user": str,
        "msg_type": "text" | "image" | ...,
        "content": str,      # 文本内容
        "raw": dict,        # 原始消息体（透传方便排查）
    }
"""

import asyncio
import logging
from typing import Any, Dict

from backend.core.agent import CoreAgent


logger = logging.getLogger(__name__)


StandardWeComMessage = Dict[str, Any]


async def handle_wecom_message(agent: CoreAgent, msg: StandardWeComMessage) -> str:
    """
    将 WeCom 标准消息转发给 CoreAgent.execute_react，并返回文本答案。
    仅处理文本消息，其余类型统一给出能力提示。
    """
    msg_type = (msg.get("msg_type") or "").lower()
    if msg_type != "text":
        logger.info("收到非文本 WeCom 消息，msg_type=%s，暂不支持。", msg_type)
        return "暂时只支持文本消息，请直接发送文字问题或报价需求。"

    user_text = (msg.get("content") or "").strip()
    if not user_text:
        return "收到空消息，暂时只支持纯文本内容。"

    from_user = msg.get("from_user") or ""
    session_id = f"wecom:{from_user}" if from_user else "wecom:anonymous"

    logger.info("WeCom[%s] → Agent: %s", session_id, user_text)

    async def _call_agent() -> str:
        try:
            result = await agent.execute_react(
                user_input=user_text,
                context={},  # 后续可注入 file_id/file_path 等上下文
                session_id=session_id,
            )
        except Exception as e:  # noqa: BLE001
            logger.exception("WeCom 消息调用 CoreAgent 失败: %s", e)
            return "系统处理消息时出错，请稍后再试或联系管理员。"

        answer = (result.get("answer") or "").strip() if isinstance(result, dict) else ""
        if not answer:
            logger.warning("WeCom 消息处理结果为空，result=%r", result)
            return "（未能生成有效回复）"
        return answer

    # 为避免单条消息长时间占用长连接，这里增加超时保护（默认 90 秒）
    try:
        answer = await asyncio.wait_for(_call_agent(), timeout=90)
    except asyncio.TimeoutError:
        logger.warning("WeCom 消息处理超时（session_id=%s）", session_id)
        return "处理超时，请稍后重试。"

    logger.info("Agent → WeCom[%s]: %s", session_id, answer)
    return answer


__all__ = ["StandardWeComMessage", "handle_wecom_message"]

