"""Chat / 统一查询 API（含流式）。"""
import asyncio
import json
import logging
import uuid

from fastapi import APIRouter, Body, Request
from fastapi.responses import StreamingResponse
from typing import Any, Dict

from backend.agent.remember import try_handle_remember
from backend.agent.session import get_session_store
from backend.core.language_utils import detect_language

logger = logging.getLogger(__name__)
router = APIRouter()


def _extract_attachment_image_url(att: Dict[str, Any]) -> str:
    # 优先使用外部 URL / 已有 data URL，避免重复传整图 base64。
    direct = (att.get("url") or att.get("imageUrl") or "").strip()
    if direct:
        return direct
    image_url_field = att.get("image_url")
    if isinstance(image_url_field, str):
        return image_url_field.strip()
    if isinstance(image_url_field, dict):
        return (image_url_field.get("url") or "").strip()
    return ""


def _build_image_parts(
    image_attachments: list[Dict[str, Any]],
    max_size: int,
) -> tuple[list[Dict[str, Any]], str | None]:
    image_parts: list[Dict[str, Any]] = []
    for a in image_attachments:
        image_url = _extract_attachment_image_url(a)
        if image_url:
            if image_url.startswith("data:") and "," in image_url:
                data_part = image_url.split(",", 1)[1].strip()
                if len(data_part) * 3 // 4 > max_size:
                    return [], f"图片超过大小限制（单张不超过 {max_size // (1024*1024)}MB）"
            image_parts.append({"type": "image_url", "image_url": {"url": image_url}})
            continue

        content = (a.get("content") or "").strip()
        if content:
            size_bytes = len(content) * 3 // 4
            if size_bytes > max_size:
                return [], f"图片超过大小限制（单张不超过 {max_size // (1024*1024)}MB）"
            mime = (a.get("mimeType") or "image/png").strip()
            image_parts.append({"type": "image_url", "image_url": {"url": f"data:{mime};base64,{content}"}})
            continue

        file_id = (a.get("file_id") or a.get("fileId") or "").strip()
        if file_id:
            return [], "当前接口暂不支持仅 file_id 直传图片，请改为 image_url 或 base64 content。"
    return image_parts, None


@router.post("/api/query")
@router.post("/api/master/query")
async def query(
    request: Request,
    body: Dict[str, Any] = Body(..., description="query: 用户输入; session_id?: 会话ID; context?: { file_path?, ... }"),
) -> Dict[str, Any]:
    """
    统一查询入口。单 Agent 直接选用工具完成意图。
    Body: { "query": "用户输入", "session_id": "可选", "context": { "file_path": "可选" } }
    """
    query_text = (body.get("query") or body.get("message") or "").strip()
    attachments = body.get("attachments") or []
    logger.info("[/api/query] received: %r  session_id=%r", query_text, body.get("session_id"))
    if not query_text and not attachments:
        return {"success": False, "error": "请提供 query、message 或 attachments。"}
    if query_text.lower() in ("/new", "/reset"):
        old_sid = (body.get("session_id") or "").strip()
        if old_sid:
            try:
                get_session_store().delete_session(old_sid)
            except Exception:
                logger.debug("failed to delete old session on /new", exc_info=True)
        new_sid = str(uuid.uuid4())
        return {
            "success": True,
            "data": {
                "answer": "已开始新会话。请继续发送你的问题。",
                "thinking": None,
                "trace": [],
                "session_id": new_sid,
            },
        }
    remember_reply = try_handle_remember(query_text)
    if remember_reply is not None:
        session_id = (body.get("session_id") or "").strip() or str(uuid.uuid4())
        return {
            "success": True,
            "data": {
                "answer": remember_reply,
                "thinking": None,
                "trace": [],
                "session_id": session_id,
            }
        }
    session_id = (body.get("session_id") or "").strip() or str(uuid.uuid4())
    context = dict(body.get("context") or {})
    # 轻量语言检测，仅用于 Chat 输出语言控制
    detected = detect_language(query_text)
    context["detected_lang"] = detected
    # 英文优先，其余情况默认按中文处理以保持兼容
    context["preferred_lang"] = "en" if detected == "en" else "zh"
    # 图片附件：校验 MAX_IMAGE_SIZE，构建 image_parts，有视觉模型时设 has_image
    image_attachments = [
        a for a in attachments
        if (a or {}).get("type") == "image"
        and (
            (a or {}).get("content")
            or (a or {}).get("url")
            or (a or {}).get("imageUrl")
            or (a or {}).get("image_url")
            or (a or {}).get("file_id")
            or (a or {}).get("fileId")
        )
    ]
    if image_attachments:
        from backend.config import Config
        if not getattr(Config, "VISION_LLM_MODEL", None):
            return {"success": False, "error": "当前未配置视觉模型（VISION_LLM_MODEL），暂不支持图片输入。"}
        max_size = getattr(Config, "MAX_IMAGE_SIZE", 5 * 1024 * 1024)
        image_parts, err = _build_image_parts(image_attachments, max_size)
        if err:
            return {"success": False, "error": err}
        if image_parts:
            context["has_image"] = True
            context["image_parts"] = image_parts
        elif not query_text:
            return {"success": False, "error": "未读取到有效图片内容，请检查图片数据后重试。"}
    agent = request.app.state.agent
    try:
        result = await agent.execute_react(query_text, context=context, session_id=session_id)
    except Exception as e:
        logger.exception("query 执行失败")
        return {"success": False, "error": str(e)}
    if result.get("needs_clarification"):
        return {
            "success": True,
            "data": {
                "answer": result.get("answer", ""),
                "questions": result.get("clarification_questions") or [],
                "session_id": session_id,
                "needs_clarification": True,
            }
        }
    return {
        "success": True,
        "data": {
            "answer": result.get("answer", ""),
            "thinking": result.get("thinking"),
            "trace": result.get("trace"),
            "session_id": session_id,
        }
    }


@router.post("/api/query/stream")
async def query_stream(
    request: Request,
    body: Dict[str, Any] = Body(...),
) -> StreamingResponse:
    """
    流式查询（SSE）。事件格式：
      data: {"type": "token",  "content": "..."}      — LLM 文本 token 实时推送
      data: {"type": "done",   "answer": "...", "thinking": "...", "session_id": "..."}
      data: {"type": "error",  "message": "..."}
    """
    query_text = (body.get("query") or body.get("message") or "").strip()
    attachments_stream = body.get("attachments") or []
    if not query_text and not attachments_stream:
        async def _empty():
            yield f'data: {json.dumps({"type": "error", "message": "请提供 query 或 attachments"}, ensure_ascii=False)}\n\n'
        return StreamingResponse(_empty(), media_type="text/event-stream")
    if query_text and query_text.lower() in ("/new", "/reset"):
        old_sid = (body.get("session_id") or "").strip()
        if old_sid:
            try:
                get_session_store().delete_session(old_sid)
            except Exception:
                logger.debug("failed to delete old session on /new(stream)", exc_info=True)
        new_sid = str(uuid.uuid4())
        async def _reset_stream():
            yield f'data: {json.dumps({"type": "done", "answer": "已开始新会话。请继续发送你的问题。", "thinking": None, "session_id": new_sid}, ensure_ascii=False)}\n\n'
        return StreamingResponse(_reset_stream(), media_type="text/event-stream")

    remember_reply = try_handle_remember(query_text) if query_text else None
    if remember_reply is not None:
        async def _remember_stream():
            yield f'data: {json.dumps({"type": "done", "answer": remember_reply, "thinking": None, "session_id": (body.get("session_id") or "").strip() or str(uuid.uuid4())}, ensure_ascii=False)}\n\n'
        return StreamingResponse(_remember_stream(), media_type="text/event-stream")

    session_id = (body.get("session_id") or "").strip() or str(uuid.uuid4())
    context = dict(body.get("context") or {})
    detected = detect_language(query_text or "")
    context["detected_lang"] = detected
    context["preferred_lang"] = "en" if detected == "en" else "zh"
    image_attachments_stream = []
    if attachments_stream:
        image_attachments_stream = [
            a for a in attachments_stream
            if (a or {}).get("type") == "image"
            and (
                (a or {}).get("content")
                or (a or {}).get("url")
                or (a or {}).get("imageUrl")
                or (a or {}).get("image_url")
                or (a or {}).get("file_id")
                or (a or {}).get("fileId")
            )
        ]
    if image_attachments_stream:
        from backend.config import Config
        if not getattr(Config, "VISION_LLM_MODEL", None):
            async def _vision_not_enabled():
                yield f'data: {json.dumps({"type": "error", "message": "当前未配置视觉模型（VISION_LLM_MODEL），暂不支持图片输入。"}, ensure_ascii=False)}\n\n'
            return StreamingResponse(_vision_not_enabled(), media_type="text/event-stream")
        max_size = getattr(Config, "MAX_IMAGE_SIZE", 5 * 1024 * 1024)
        image_parts_stream, err = _build_image_parts(image_attachments_stream, max_size)
        if err:
            async def _invalid_image_req():
                yield f'data: {json.dumps({"type": "error", "message": err}, ensure_ascii=False)}\n\n'
            return StreamingResponse(_invalid_image_req(), media_type="text/event-stream")
        if image_parts_stream:
            context["has_image"] = True
            context["image_parts"] = image_parts_stream
        elif not query_text:
            async def _invalid_image():
                yield f'data: {json.dumps({"type": "error", "message": "未读取到有效图片内容，请检查图片数据后重试。"}, ensure_ascii=False)}\n\n'
            return StreamingResponse(_invalid_image(), media_type="text/event-stream")
    agent = request.app.state.agent

    async def _gen():
        queue: asyncio.Queue = asyncio.Queue()
        loop = asyncio.get_running_loop()

        def _push(item: dict) -> None:
            loop.call_soon_threadsafe(queue.put_nowait, item)

        def on_token(token: str):
            _push({"type": "token", "content": token})

        def on_event(event_type: str, payload: dict):
            _push({"type": event_type, **payload})

        async def _run():
            try:
                await agent.execute_react(
                    query_text,
                    context=context,
                    session_id=session_id,
                    on_token=on_token,
                    on_event=on_event,
                )
            except Exception as e:
                logger.exception("query_stream 执行失败")
                _push({"type": "loop_error", "session_id": session_id, "error": str(e)})

        task = asyncio.create_task(_run())
        while True:
            item = await queue.get()
            yield f"data: {json.dumps(item, ensure_ascii=False)}\n\n"
            if item["type"] in ("loop_end", "loop_error"):
                break
        await task

    return StreamingResponse(_gen(), media_type="text/event-stream")
