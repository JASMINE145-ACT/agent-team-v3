"""
WeCom 文本消息与现有 Chat Agent 之间的桥接层。

职责：
- 将企业微信 FromUserName 映射为内部 session_id（wecom:<user>）；
- 复用 app.state.agent（CoreAgent 实例）执行 execute_react；
- 返回纯文本答案供 routes_wecom 封装为 XML。
"""

from __future__ import annotations

import logging
from typing import Any

from fastapi import FastAPI


logger = logging.getLogger(__name__)


async def handle_wecom_text(from_user: str, user_text: str, app: FastAPI) -> str:
    """
    将企业微信文本消息转发给当前 v3 Chat Agent，并返回回答文本。
    
    注意: 企业微信为同步回复模式,无法推送实时进度。
    确认消息已在日志中记录,实际回复为处理完成后的结果。
    """
    session_id = f"wecom:{from_user}"
    agent = getattr(app.state, "agent", None)
    if agent is None:
        logger.error("app.state.agent 未初始化，无法处理 WeCom 消息")
        return "系统暂未就绪，请稍后再试。"

    # 记录确认消息到日志 (企业微信同步模式无法先回复确认消息)
    logger.info("[WeCom 确认] 已收到用户 %s 的请求: %s", from_user, user_text[:50])

    try:
        result: dict[str, Any] = await agent.execute_react(
            user_input=user_text,
            context={
                "channel": "wecom",
                "allowed_tools": ["batch_quick_quote"],
            },
            session_id=session_id,
        )
        answer = (result.get("answer") or "").strip()
        if not answer:
            return "（未能生成有效回复）"
        return answer
    except Exception as e:  # pragma: no cover - 防御性错误处理
        logger.exception("handle_wecom_text 执行失败: %s", e)
        return "系统出错，请稍后再试。"

