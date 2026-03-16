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
    # 图片附件：GLM-OCR 识别后注入文本，不设 has_image/image_parts
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
        from backend.core.glm_ocr import run_ocr_for_attachments
        if not getattr(Config, "GLM_OCR_ENABLED", False):
            return {"success": False, "error": "当前未启用图片识别（GLM-OCR），暂不支持图片输入。"}
        max_size = getattr(Config, "MAX_IMAGE_SIZE", 5 * 1024 * 1024)
        api_key = getattr(Config, "GLM_OCR_API_KEY", None) or Config.OPENAI_API_KEY
        base_url = getattr(Config, "GLM_OCR_BASE_URL", "") or ""
        ocr_model = getattr(Config, "GLM_OCR_MODEL", "glm-4v") or "glm-4v"
        if not api_key or not base_url:
            return {"success": False, "error": "未配置视觉识图 API Key 或 Base URL。"}
        ocr_text, ocr_err = await asyncio.to_thread(
            run_ocr_for_attachments, image_attachments, max_size, api_key, base_url, ocr_model
        )
        if ocr_err:
            return {"success": False, "error": ocr_err}
        query_text = (query_text or "").strip()
        query_text = f"{query_text}\n\n【以下为上传图片的识别结果】\n{ocr_text}" if query_text else f"【以下为上传图片的识别结果】\n{ocr_text}"
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
        from backend.core.glm_ocr import run_ocr_for_attachments
        if not getattr(Config, "GLM_OCR_ENABLED", False):
            async def _ocr_not_enabled():
                yield f'data: {json.dumps({"type": "error", "message": "当前未启用图片识别（GLM-OCR），暂不支持图片输入。"}, ensure_ascii=False)}\n\n'
            return StreamingResponse(_ocr_not_enabled(), media_type="text/event-stream")
        max_size = getattr(Config, "MAX_IMAGE_SIZE", 5 * 1024 * 1024)
        api_key = getattr(Config, "GLM_OCR_API_KEY", None) or Config.OPENAI_API_KEY
        base_url = getattr(Config, "GLM_OCR_BASE_URL", "") or ""
        ocr_model = getattr(Config, "GLM_OCR_MODEL", "glm-4v") or "glm-4v"
        if not api_key or not base_url:
            async def _ocr_no_config():
                yield f'data: {json.dumps({"type": "error", "message": "未配置视觉识图 API Key 或 Base URL。"}, ensure_ascii=False)}\n\n'
            return StreamingResponse(_ocr_no_config(), media_type="text/event-stream")
        ocr_text, ocr_err = await asyncio.to_thread(
            run_ocr_for_attachments, image_attachments_stream, max_size, api_key, base_url, ocr_model
        )
        if ocr_err:
            async def _ocr_failed():
                yield f'data: {json.dumps({"type": "error", "message": ocr_err}, ensure_ascii=False)}\n\n'
            return StreamingResponse(_ocr_failed(), media_type="text/event-stream")
        query_text = (query_text or "").strip()
        query_text = f"{query_text}\n\n【以下为上传图片的识别结果】\n{ocr_text}" if query_text else f"【以下为上传图片的识别结果】\n{ocr_text}"
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
