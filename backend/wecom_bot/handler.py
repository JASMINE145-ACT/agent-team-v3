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
    ExcelContextEntry,
    ExcelSummaryEntry,
    generate_excel_summary,
    get_excel_context,
    make_file_id,
    parse_excel_full,
    put_excel_context,
    put_excel_summary,
)

logger = logging.getLogger(__name__)

StandardWeComMessage = Dict[str, Any]

# in-memory mapping: WeCom from_user -> current session_id
_WECHAT_SESSIONS: Dict[str, str] = {}
# 最近一次 Excel 绑定的时间戳（秒），用于轻量判断「刚上传 + 立即发需求」场景
_LAST_FILE_BIND_TS: Dict[str, float] = {}


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
        file_id: str | None = None
        try:
            file_id = make_file_id(norm_path)
            ctx["file_id"] = file_id
        except Exception:
            logger.debug("make_file_id failed, keep file_path only", exc_info=True)

        # 若已存在完整 Excel 上下文，则补充精简 meta，方便 Agent 做轻量提示与决策
        try:
            context_entry: ExcelContextEntry | None = get_excel_context(file_id=file_id, file_path=norm_path)
        except Exception:
            logger.debug("get_excel_context failed, keep basic ctx only", exc_info=True)
            context_entry = None
        if context_entry and context_entry.parsed:
            meta = context_entry.parsed.get("meta") or {}
            sheets_count = meta.get("sheets_count")
            total_rows = meta.get("total_rows")
            excel_meta: Dict[str, Any] = {}
            if isinstance(sheets_count, int):
                excel_meta["sheets_count"] = sheets_count
            if isinstance(total_rows, int):
                excel_meta["total_rows"] = total_rows
            if excel_meta:
                ctx["excel_meta"] = excel_meta

        return ctx
    except Exception:
        logger.debug("failed to load wecom session context", exc_info=True)
        return {}


def _bind_session_file_path(
    agent: CoreAgent,
    session_id: str,
    file_path: str,
    file_id: str | None = None,
    excel_meta: Dict[str, Any] | None = None,
) -> None:
    """Store the uploaded file path (and related Excel meta) immediately for next user message."""
    try:
        store = getattr(agent, "_store", None)
        if store is None:
            return
        session = store.load(session_id)
        session.file_path = file_path
        if file_id:
            session.file_id = file_id
        if excel_meta:
            session.excel_meta = excel_meta
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

    use_full_parse = bool(getattr(Config, "WECHAT_EXCEL_FULL_PARSE_ENABLED", True))

    try:
        # 仍保留摘要生成逻辑，保证旧提示与工具兼容
        summary, summary_entry = await asyncio.to_thread(_build_excel_summary_entry, norm_path)
    except Exception as e:  # noqa: BLE001
        logger.exception("failed to build Excel summary for WeCom file: %s", e)
        return "文件已接收，但解析 Excel 摘要失败，请稍后重试。"

    ctx: Dict[str, Any] = {"file_path": norm_path, "file_id": summary_entry.file_id}

    # 可选：在后台构建完整 Excel 上下文，供后续工具 / MCP 使用
    if use_full_parse:
        try:
            parsed = await asyncio.to_thread(parse_excel_full, norm_path)
            put_excel_context(norm_path, parsed=parsed, summary=summary)
            logger.info(
                "WeCom[%s] Excel full context cached: file_id=%s", session_id, summary_entry.file_id
            )
        except Exception:
            logger.warning(
                "WeCom[%s] parse_excel_full/put_excel_context failed, fallback to summary-only",
                session_id,
                exc_info=True,
            )

    # Make follow-up text available immediately, without waiting execute_react.
    excel_meta = {}
    meta = summary.get("meta") or {}
    rows = meta.get("rows_count")
    sheets_count = meta.get("sheets_count")
    total_rows = meta.get("total_rows")
    if isinstance(sheets_count, int):
        excel_meta["sheets_count"] = sheets_count
    if isinstance(total_rows, int):
        excel_meta["total_rows"] = total_rows
    elif isinstance(rows, int):
        excel_meta["total_rows"] = rows
    _bind_session_file_path(agent, session_id, norm_path, summary_entry.file_id, excel_meta or None)
    _LAST_FILE_BIND_TS[from_user or ""] = time.time()

    user_hint = (
        "用户刚刚在企业微信上传了一份 Excel 报价单，请将这份文件绑定到当前会话上下文，"
        "并在之后的需求中可以通过工具按需读取完整表格内容。"
    )

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
        "接下来你可以直接发送需求，例如：“帮我统计每个供应商的总金额”或“按这份表给报价”，"
        "系统会自动基于刚才这份 Excel 进行处理。"
    )


__all__ = ["StandardWeComMessage", "handle_wecom_message", "handle_wecom_file"]
