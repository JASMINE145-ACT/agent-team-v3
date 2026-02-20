"""
API 路由 — version3 单 Agent
"""
import asyncio
import json
import logging
import uuid
from pathlib import Path

from fastapi import APIRouter, Body, File, HTTPException, UploadFile
from fastapi.responses import StreamingResponse
from typing import Any, Dict

from backend.config import Config
from backend.core.single_agent import SingleAgent

logger = logging.getLogger(__name__)
router = APIRouter()

single_agent = SingleAgent(
    api_key=Config.OPENAI_API_KEY,
    base_url=Config.OPENAI_BASE_URL,
    model=Config.LLM_MODEL,
)


@router.get("/health")
async def health_check():
    return {"status": "ok", "service": "agent-jk-backend-v3", "mode": "single_agent"}


@router.post("/api/quotation/upload")
async def quotation_upload(file: UploadFile = File(...)) -> Dict[str, Any]:
    """上传报价单或文档（Excel/PDF），返回 file_path、file_name，供无货登记/询价填充或解析时放入 context。"""
    try:
        Config.UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
        content = await file.read()
        if len(content) > Config.MAX_UPLOAD_MB * 1024 * 1024:
            raise HTTPException(status_code=413, detail=f"文件超过 {Config.MAX_UPLOAD_MB}MB 限制")
        suffix = Path(file.filename or "upload.xlsx").suffix or ".xlsx"
        if suffix.lower() not in (".xlsx", ".xls", ".xlsm", ".pdf"):
            raise HTTPException(status_code=400, detail="仅支持 .xlsx / .xls / .xlsm / .pdf")
        safe_name = f"{uuid.uuid4().hex[:12]}_{(file.filename or 'upload')[:80]}"
        out_path = Config.UPLOAD_DIR / safe_name
        out_path.write_bytes(content)
        return {"file_path": str(out_path.resolve()), "file_name": file.filename or "upload.xlsx"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error("上传失败: %s", e)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/api/query")
@router.post("/api/master/query")
async def query(
    body: Dict[str, Any] = Body(..., description="query: 用户输入; session_id?: 会话ID; context?: { file_path?, ... }"),
) -> Dict[str, Any]:
    """
    统一查询入口。单 Agent 直接选用工具完成意图。
    Body: { "query": "用户输入", "session_id": "可选", "context": { "file_path": "可选" } }
    """
    query_text = (body.get("query") or body.get("message") or "").strip()
    if not query_text:
        return {"status": "error", "answer": "", "message": "请提供 query 或 message。"}
    session_id = (body.get("session_id") or "").strip() or str(uuid.uuid4())
    context = body.get("context") or {}
    try:
        result = await single_agent.execute_react(query_text, context=context, session_id=session_id)
    except Exception as e:
        logger.exception("query 执行失败")
        return {"status": "error", "answer": "", "message": str(e)}
    if result.get("needs_clarification"):
        return {
            "status": "needs_clarification",
            "answer": result.get("answer", ""),
            "questions": result.get("clarification_questions") or [],
            "session_id": session_id,
        }
    return {
        "status": "success",
        "answer": result.get("answer", ""),
        "thinking": result.get("thinking"),
        "trace": result.get("trace"),
        "session_id": session_id,
    }


@router.post("/api/query/stream")
async def query_stream(
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

    session_id = (body.get("session_id") or "").strip() or str(uuid.uuid4())
    context = body.get("context") or {}

    async def _gen():
        queue: asyncio.Queue = asyncio.Queue()
        loop = asyncio.get_running_loop()

        def _push(item: dict) -> None:
            loop.call_soon_threadsafe(queue.put_nowait, item)

        def on_token(token: str):
            _push({"type": "token", "content": token})

        def on_event(event_type: str, payload: dict):
            # lifecycle 事件直接透传到 SSE 流
            # loop_start / loop_end / loop_error 由客户端作为「起止信号」
            _push({"type": event_type, **payload})

        async def _run():
            try:
                await single_agent.execute_react(
                    query_text,
                    context=context,
                    session_id=session_id,
                    on_token=on_token,
                    on_event=on_event,
                )
            except Exception as e:
                logger.exception("query_stream 执行失败")
                # execute_react 内部未捕获的异常：补发 loop_error 保证流能关闭
                _push({"type": "loop_error", "session_id": session_id, "error": str(e)})

        task = asyncio.create_task(_run())
        while True:
            item = await queue.get()
            yield f"data: {json.dumps(item, ensure_ascii=False)}\n\n"
            # loop_end / loop_error 是权威的「本轮结束」信号，关闭 SSE 流
            if item["type"] in ("loop_end", "loop_error"):
                break
        await task

    return StreamingResponse(_gen(), media_type="text/event-stream")
