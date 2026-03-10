"""Chat / 统一查询 API（含流式）。"""
import asyncio
import json
import logging
import uuid

from fastapi import APIRouter, Body, Request
from fastapi.responses import StreamingResponse
from typing import Any, Dict

from backend.agent.remember import try_handle_remember

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
    logger.info("[/api/query] received: %r  session_id=%r", query_text, body.get("session_id"))
    if not query_text:
        return {"success": False, "error": "请提供 query 或 message。"}
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
    context = body.get("context") or {}
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
    if not query_text:
        async def _empty():
            yield f'data: {json.dumps({"type": "error", "message": "请提供 query"}, ensure_ascii=False)}\n\n'
        return StreamingResponse(_empty(), media_type="text/event-stream")

    remember_reply = try_handle_remember(query_text)
    if remember_reply is not None:
        async def _remember_stream():
            yield f'data: {json.dumps({"type": "done", "answer": remember_reply, "thinking": None, "session_id": (body.get("session_id") or "").strip() or str(uuid.uuid4())}, ensure_ascii=False)}\n\n'
        return StreamingResponse(_remember_stream(), media_type="text/event-stream")

    session_id = (body.get("session_id") or "").strip() or str(uuid.uuid4())
    context = body.get("context") or {}
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
