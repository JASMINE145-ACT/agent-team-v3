from __future__ import annotations

"""
Bridge between WeCom websocket events and CoreAgent.
"""

import asyncio
import logging
import time
from pathlib import Path
from typing import Any, Dict, Tuple

from backend.config import Config
from backend.core.agent import CoreAgent
from backend.core.language_utils import detect_language
from backend.tools.quotation.excel_summary import (
    ExcelSummaryEntry,
    generate_excel_summary,
    make_file_id,
    put_excel_summary,
)

logger = logging.getLogger(__name__)

StandardWeComMessage = Dict[str, Any]

# in-memory mapping: WeCom from_user -> current session_id
_WECHAT_SESSIONS: Dict[str, str] = {}


def _get_current_session_id(from_user: str) -> str:
    """Return current session id for a WeCom user, creating one if absent."""
    if not from_user:
        return "wecom:anonymous"
    sid = _WECHAT_SESSIONS.get(from_user)
    if sid:
        return sid
    # initial session id
    sid = f"wecom:{from_user}:{int(time.time())}"
    _WECHAT_SESSIONS[from_user] = sid
    return sid


def _new_session_id(from_user: str) -> str:
    """Create a fresh session id for a WeCom user and update mapping."""
    if not from_user:
        sid = f"wecom:anonymous:{int(time.time())}"
        _WECHAT_SESSIONS[""] = sid
        return sid
    sid = f"wecom:{from_user}:{int(time.time())}"
    _WECHAT_SESSIONS[from_user] = sid
    return sid


def _load_wecom_session_context(agent: CoreAgent, session_id: str) -> Dict[str, Any]:
    """Read file context from session store so follow-up messages keep Excel context."""
    try:
        store = getattr(agent, "_store", None)
        if store is None:
            return {}

        session = store.load(session_id)
        fp = (getattr(session, "file_path", None) or "").strip()
        if not fp:
            return {}

        norm_path = str(Path(fp).resolve())
        ctx: Dict[str, Any] = {"file_path": norm_path}
        try:
            ctx["file_id"] = make_file_id(norm_path)
        except Exception:
            logger.debug("make_file_id failed, keep file_path only", exc_info=True)
        return ctx
    except Exception:
        logger.debug("failed to load wecom session context", exc_info=True)
        return {}


def _bind_session_file_path(agent: CoreAgent, session_id: str, file_path: str) -> None:
    """Store the uploaded file path immediately for next user message."""
    try:
        store = getattr(agent, "_store", None)
        if store is None:
            return
        session = store.load(session_id)
        session.file_path = file_path
    except Exception:
        logger.debug("failed to bind session file_path", exc_info=True)


def _build_excel_summary_entry(file_path: str) -> Tuple[Dict[str, Any], ExcelSummaryEntry]:
    summary = generate_excel_summary(file_path)
    entry = put_excel_summary(file_path, summary)
    return summary, entry


async def handle_wecom_message(agent: CoreAgent, msg: StandardWeComMessage) -> str:
    """Forward standard WeCom message to CoreAgent and return text answer."""
    msg_type = (msg.get("msg_type") or "").lower()
    if msg_type != "text":
        logger.info("non-text WeCom message ignored, msg_type=%s", msg_type)
        return "暂时只支持文本消息，请直接发送文字问题。"

    user_text = (msg.get("content") or "").strip()
    if not user_text:
        return "收到空消息，请发送文本内容。"

    from_user = msg.get("from_user") or ""

    # /new 指令：为该 WeCom 用户开启一个全新的会话
    if user_text == "/new":
        new_sid = _new_session_id(from_user)
        logger.info("WeCom user %s requested /new, new session_id=%s", from_user, new_sid)
        return "已为你开启一个新的对话，会从当前这条消息开始理解，不再参考之前的上下文。"

    session_id = _get_current_session_id(from_user)
    context = _load_wecom_session_context(agent, session_id)

    # 轻量语言检测：为企业微信通道设置 preferred_lang
    detected = detect_language(user_text)
    context["detected_lang"] = detected
    context["preferred_lang"] = "en" if detected == "en" else "zh"

    logger.info("WeCom[%s] -> Agent: %s", session_id, user_text)

    async def _call_agent() -> str:
        try:
            result = await agent.execute_react(
                user_input=user_text,
                context=context,
                session_id=session_id,
            )
        except Exception as e:  # noqa: BLE001
            logger.exception("CoreAgent failed on WeCom text message: %s", e)
            return "系统处理消息时出错，请稍后重试。"

        answer = (result.get("answer") or "").strip() if isinstance(result, dict) else ""
        if not answer:
            logger.warning("empty answer from CoreAgent, result=%r", result)
            return "（未能生成有效回复）"
        return answer

    try:
        answer = await asyncio.wait_for(_call_agent(), timeout=90)
    except asyncio.TimeoutError:
        logger.warning("WeCom text timeout, session_id=%s", session_id)
        return "处理超时，请稍后重试。"

    logger.info("Agent -> WeCom[%s]: %s", session_id, answer)
    return answer


async def handle_wecom_file(agent: CoreAgent, from_user: str, file_path: str) -> str:
    """
    Handle WeCom uploaded Excel file for the *current* session of that user.
    """
    session_id = _get_current_session_id(from_user)
    norm_path = str(Path(file_path).resolve())

    logger.info("WeCom[%s] file handling start: %s", session_id, norm_path)

    try:
        summary, entry = await asyncio.to_thread(_build_excel_summary_entry, norm_path)
    except Exception as e:  # noqa: BLE001
        logger.exception("failed to build Excel summary for WeCom file: %s", e)
        return "文件已接收，但解析 Excel 失败，请稍后重试。"

    ctx: Dict[str, Any] = {"file_path": norm_path, "file_id": entry.file_id}

    # Make follow-up text available immediately, without waiting execute_react.
    _bind_session_file_path(agent, session_id, norm_path)

    user_hint = "用户刚刚在企业微信上传了一份 Excel 报价单，请将这份文件绑定到当前会话上下文。"

    async def _bind_with_agent_background() -> None:
        timeout_s = int(getattr(Config, "WECOM_FILE_BIND_TIMEOUT_SECONDS", 20) or 20)
        timeout_s = max(5, min(timeout_s, 60))
        try:
            await asyncio.wait_for(
                agent.execute_react(
                    user_input=user_hint,
                    context=ctx,
                    session_id=session_id,
                ),
                timeout=timeout_s,
            )
        except asyncio.TimeoutError:
            logger.warning("WeCom file context bind timeout, session_id=%s", session_id)
        except Exception:
            logger.warning("WeCom file context bind failed, session_id=%s", session_id, exc_info=True)

    # Fire-and-forget: do not block user confirmation response.
    asyncio.create_task(_bind_with_agent_background())

    meta = summary.get("meta") or {}
    rows = meta.get("rows_count")
    preview = meta.get("preview_count")
    truncated = bool(meta.get("truncated"))

    parts = []
    if isinstance(rows, int):
        parts.append(f"共 {rows} 行数据")
    if isinstance(preview, int):
        parts.append(f"已生成前 {preview} 行摘要")
    if truncated:
        parts.append("其余行会在需要时按需解析")
    detail = "，".join(parts) if parts else "已生成基础摘要"

    return (
        f"已成功接收并解析 Excel 报价单（{Path(norm_path).name}），{detail}。\n"
        "接下来你可以直接回复“帮我选一个”“查一下库存”“按这份表给报价”等问题。"
    )


__all__ = ["StandardWeComMessage", "handle_wecom_message", "handle_wecom_file"]
