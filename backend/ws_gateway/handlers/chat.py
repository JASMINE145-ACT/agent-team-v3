"""chat.history / chat.send / chat.abort"""

import asyncio
import logging
import uuid
from typing import Any, Callable

from backend.core.context_system.session_store import get_session_store
from backend.core.single_agent.agent import SingleAgent
from backend.config import Config
from backend.ws_gateway.run_store import register as run_register, unregister as run_unregister, cancel as run_cancel

logger = logging.getLogger(__name__)

_single_agent: SingleAgent | None = None


def _get_agent() -> SingleAgent:
    global _single_agent
    if _single_agent is None:
        _single_agent = SingleAgent(
            api_key=Config.OPENAI_API_KEY,
            base_url=Config.OPENAI_BASE_URL,
            model=Config.LLM_MODEL,
        )
    return _single_agent


def handle_chat_history(params: dict) -> dict:
    session_key = (params.get("sessionKey") or "").strip()
    limit = int(params.get("limit") or 200)
    store = get_session_store()
    session = store.load(session_key)
    messages = []
    turns = session.turns[-(limit // 2) :] if limit else session.turns
    for t in turns:
        ts_ms = int(t.ts * 1000)
        messages.append({
            "role": "user",
            "content": [{"type": "text", "text": t.query}],
            "timestamp": ts_ms,
        })
        messages.append({
            "role": "assistant",
            "content": [{"type": "text", "text": t.answer}],
            "timestamp": ts_ms,
        })
    return {"messages": messages, "thinkingLevel": None}


async def handle_chat_send(
    ws,
    req_id: str,
    params: dict,
    send_res: Callable[[dict], Any],
    send_event: Callable[[dict], Any],
) -> None:
    session_key = (params.get("sessionKey") or "").strip()
    message = (params.get("message") or "").strip()
    attachments = params.get("attachments") or []
    run_id = params.get("idempotencyKey") or str(uuid.uuid4())
    if not session_key:
        raise ValueError("sessionKey required")
    if not message and not attachments:
        raise ValueError("message or attachments required")

    # 构建传给 agent 的上下文（如 file_path 用于报价单等）
    context = dict(params.get("context") or {})
    if params.get("file_path"):
        context["file_path"] = params["file_path"]

    # 若有图片附件，在输入中附加说明（当前未将图片送入模型）
    user_input = message
    if attachments:
        n = len(attachments)
        suffix = f"\n[用户附带了 {n} 张图片，当前版本暂不解析图片内容]"
        user_input = (user_input + suffix) if user_input else suffix.strip()

    cancel_ev = run_register(run_id)
    accumulated: list[str] = [""]
    loop = asyncio.get_event_loop()

    def on_token(token: str):
        if cancel_ev.is_set():
            raise asyncio.CancelledError()
        accumulated[0] += token
        payload = {
            "type": "event",
            "event": "chat",
            "payload": {
                "runId": run_id,
                "sessionKey": session_key,
                "state": "delta",
                "message": {
                    "role": "assistant",
                    "content": [{"type": "text", "text": accumulated[0]}],
                },
            },
        }
        loop.call_soon_threadsafe(lambda: asyncio.ensure_future(send_event(payload)))

    def on_event(event_type: str, payload: dict):
        pass

    # 先返回 res，再异步跑 execute_react 并推 event
    await send_res({"ok": True, "runId": run_id})

    agent = _get_agent()
    state = "final"
    try:
        result = await agent.execute_react(
            user_input=user_input,
            context=context,
            session_id=session_key,
            on_token=on_token,
            on_event=on_event,
        )
        if cancel_ev.is_set():
            state = "aborted"
        else:
            state = "final"
    except asyncio.CancelledError:
        state = "aborted"
    except Exception as e:
        logger.exception("chat.send execute_react 失败")
        await send_event({
            "type": "event",
            "event": "chat",
            "payload": {
                "runId": run_id,
                "sessionKey": session_key,
                "state": "error",
                "errorMessage": str(e),
            },
        })
        run_unregister(run_id)
        return
    finally:
        run_unregister(run_id)

    await send_event({
        "type": "event",
        "event": "chat",
        "payload": {"runId": run_id, "sessionKey": session_key, "state": state},
    })


def handle_chat_abort(params: dict) -> dict:
    run_id = (params.get("runId") or "").strip()
    if run_id:
        run_cancel(run_id)
    return {"ok": True}
