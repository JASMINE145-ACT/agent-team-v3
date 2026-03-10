"""
WeCom（企业微信）回调入口。

最小可跑通版本：
- GET  /api/wecom/callback  用于企业微信 URL 验证（当前直接回显 echostr）；
- POST /api/wecom/callback 接收文本消息 XML，交给 wecom_service 解析，再调用 wecom_chat_bridge 获取回复文本，最终封装为 XML 返回。

Phase 1 仅支持明文/兼容模式和文本消息，安全模式加解密后续在 wecom_service 中扩展。
"""

from __future__ import annotations

import logging
from typing import Any, Dict

from fastapi import APIRouter, Request, Response

from backend.server.services.wecom_service import (
    build_text_reply,
    parse_incoming_message,
    verify_url,
)
from backend.server.services.wecom_chat_bridge import handle_wecom_text


logger = logging.getLogger(__name__)
router = APIRouter()


@router.get("/api/wecom/callback")
async def wecom_verify(
    msg_signature: str,
    timestamp: str,
    nonce: str,
    echostr: str,
) -> Response:
    """
    企业微信 URL 验证入口。

    Phase 1：直接委托给 verify_url 并返回明文字符串。
    Phase 2：在 verify_url 内部增加签名校验与解密。
    """
    result = verify_url(
        msg_signature=msg_signature,
        timestamp=timestamp,
        nonce=nonce,
        echostr=echostr,
    )
    return Response(content=result, media_type="text/plain; charset=utf-8")


@router.post("/api/wecom/callback")
async def wecom_callback(request: Request) -> Response:
    """
    企业微信消息回调入口（仅文本消息）。

    - 通过 wecom_service 解析 XML → 标准消息 dict；
    - 调用 wecom_chat_bridge.handle_wecom_text 转发给现有 Chat Agent；
    - 将纯文本回复封装为企业微信要求的 XML。
    """
    raw_body = await request.body()
    query_params: Dict[str, Any] = dict(request.query_params)

    try:
        msg = parse_incoming_message(raw_body, query_params)
    except ValueError as e:
        logger.warning("WeCom 回调 XML 解析失败: %s", e)
        # 返回空 200，避免企业微信重试风暴。
        return Response(content="", media_type="text/plain; charset=utf-8")
    except Exception:
        logger.exception("WeCom 回调处理异常")
        return Response(content="", media_type="text/plain; charset=utf-8")

    msg_type = (msg.get("MsgType") or "").strip().lower()
    from_user = (msg.get("FromUserName") or "").strip()
    to_user = (msg.get("ToUserName") or "").strip()

    if not from_user or not to_user:
        logger.warning("WeCom 回调缺少 FromUserName/ToUserName 字段: %r", msg)
        # 直接返回空 200，避免企业微信重试风暴
        return Response(content="", media_type="text/plain; charset=utf-8")

    if msg_type != "text":
        reply_text = "暂时只支持文本消息。"
    else:
        user_text = (msg.get("Content") or "").strip()
        if not user_text:
            reply_text = "收到空消息，暂时只支持文本内容。"
        else:
            reply_text = await handle_wecom_text(from_user=from_user, user_text=user_text, app=request.app)

    reply_xml = build_text_reply(
        to_user=from_user,
        from_user=to_user,
        content=reply_text,
    )
    return Response(content=reply_xml, media_type="application/xml; charset=utf-8")

