"""chat.history / chat.send / chat.abort"""

import asyncio
import logging
import time
import uuid
from typing import Any, Callable, Optional

from openai import OpenAI

from backend.agent.session import get_session_store
from backend.agent.remember import try_handle_remember
from backend.config import Config
from backend.core.language_utils import detect_language
from backend.server.gateway.run_store import register as run_register, unregister as run_unregister, cancel as run_cancel

logger = logging.getLogger(__name__)


def _generate_title_via_llm(user_query: str, assistant_answer: str) -> Optional[str]:
    """同步调用 LLM 生成 5–10 字会话标题。失败返回 None。"""
    q = (user_query or "").strip()[:300]
    a = (assistant_answer or "").strip()[:400]
    if not q and not a:
        return None
    try:
        client = OpenAI(
            api_key=Config.OPENAI_API_KEY,
            base_url=Config.OPENAI_BASE_URL,
        )
        prompt = (
            "你是一个助手。根据下面的一轮对话，生成一个简短的会话标题（5-10个字），只输出标题，不要引号或解释。\n"
            f"用户：{q}\n助手：{a}"
        )
        model = getattr(Config, "SESSION_TITLE_MODEL", None) or getattr(Config, "LLM_MODEL", "glm-4-flash")
        resp = client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": prompt}],
            max_tokens=30,
            temperature=0.3,
        )
        text = (resp.choices[0].message.content or "").strip()
        return text[:80] if text else None
    except Exception as e:
        logger.debug("生成会话标题失败: %s", e)
        return None


async def _generate_and_set_session_title(session_id: str, user_query: str, assistant_answer: str) -> None:
    """后台任务：LLM 生成标题并写回 session。"""
    store = get_session_store()
    title = await asyncio.to_thread(_generate_title_via_llm, user_query, assistant_answer)
    if title:
        store.set_label(session_id, title)
        logger.info("会话标题已更新: %s -> %s", session_id[:8], title)


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
    payload: dict[str, Any] = {"messages": messages, "thinkingLevel": None}
    # 可选：附带会话摘要，便于前端展示概要（不改变现有字段语义）
    summary = (session.summary or "").strip() if getattr(session, "summary", None) else ""
    if summary:
        payload["summary"] = summary
    return payload


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

    user_input = message
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
        if not getattr(Config, "GLM_OCR_ENABLED", False):
            err_msg = "当前未启用图片识别（GLM-OCR），暂不支持图片输入。"
            await send_res({"ok": False, "runId": run_id, "error": err_msg})
            await send_event({
                "type": "event",
                "event": "chat",
                "payload": {"runId": run_id, "sessionKey": session_key, "state": "error", "errorMessage": err_msg},
            })
            return
        max_size = getattr(Config, "MAX_IMAGE_SIZE", 5 * 1024 * 1024)
        api_key = getattr(Config, "GLM_OCR_API_KEY", None) or Config.OPENAI_API_KEY
        base_url = getattr(Config, "GLM_OCR_BASE_URL", "") or ""
        ocr_model = getattr(Config, "GLM_OCR_MODEL", "glm-ocr") or "glm-ocr"
        if not api_key or not base_url:
            err_msg = "未配置视觉识图 API Key 或 Base URL（可设置 GLM_OCR_API_KEY、GLM_OCR_BASE_URL 或使用主模型 Key）。"
            await send_res({"ok": False, "runId": run_id, "error": err_msg})
            await send_event({
                "type": "event",
                "event": "chat",
                "payload": {"runId": run_id, "sessionKey": session_key, "state": "error", "errorMessage": err_msg},
            })
            return
        from backend.core.glm_ocr import run_ocr_for_attachments
        ocr_text, ocr_err = await asyncio.to_thread(
            run_ocr_for_attachments, image_attachments, max_size, api_key, base_url, ocr_model
        )
        if ocr_err:
            await send_res({"ok": False, "runId": run_id, "error": ocr_err})
            await send_event({
                "type": "event",
                "event": "chat",
                "payload": {"runId": run_id, "sessionKey": session_key, "state": "error", "errorMessage": ocr_err},
            })
            return
        user_input = (user_input or "").strip()
        user_input = f"{user_input}\n\n【以下为上传图片的识别结果】\n{ocr_text}" if user_input else f"【以下为上传图片的识别结果】\n{ocr_text}"

    # 轻量语言检测：为 Web 控制台 Chat 设置 preferred_lang
    if user_input:
        detected = detect_language(user_input)
        context["detected_lang"] = detected
        context["preferred_lang"] = "en" if detected == "en" else "zh"

    # /new、/reset：创建新会话并返回新 sessionKey，供前端切换，不跑 ReAct
    if message.strip().lower() in ("/new", "/reset"):
        new_sid = str(uuid.uuid4())
        await send_res({"ok": True, "runId": run_id})
        await send_event({
            "type": "event",
            "event": "chat",
            "payload": {
                "runId": run_id,
                "sessionKey": session_key,
                "state": "final",
                "newSessionKey": new_sid,
                "message": {"role": "assistant", "content": [{"type": "text", "text": "已开始新会话，可以继续发送消息。"}]},
            },
        })
        return

    # 业务知识「记住」命令 → 直接写入 MD 并回复，不跑 ReAct
    remember_reply = try_handle_remember(user_input)
    if remember_reply is not None:
        await send_res({"ok": True, "runId": run_id})
        store = get_session_store()
        try:
            store.save_turn(session_key, user_input, "single", remember_reply, file_path=context.get("file_path"))
        except Exception as e:
            logger.debug("记住命令 save_turn 失败: %s", e)
        await send_event({
            "type": "event",
            "event": "chat",
            "payload": {
                "runId": run_id,
                "sessionKey": session_key,
                "state": "final",
                "message": {"role": "assistant", "content": [{"type": "text", "text": remember_reply}]},
            },
        })
        return

    cancel_ev = run_register(run_id)
    accumulated: list[str] = [""]
    loop = asyncio.get_event_loop()
    event_seq = 0

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
        nonlocal event_seq
        event_seq += 1
        evt_payload = payload if isinstance(payload, dict) else {}
        if event_type == "agent":
            stream = evt_payload.get("stream")
            data = evt_payload.get("data")
            if not isinstance(stream, str):
                return
            if not isinstance(data, dict):
                data = {}
            outbound = {
                "type": "event",
                "event": "agent",
                "payload": {
                    "runId": run_id,
                    "sessionKey": session_key,
                    "seq": event_seq,
                    "ts": int(time.time() * 1000),
                    "stream": stream,
                    "data": data,
                },
            }
            loop.call_soon_threadsafe(lambda: asyncio.ensure_future(send_event(outbound)))
            return

    await send_res({"ok": True, "runId": run_id})

    agent = ws.app.state.agent
    state = "final"
    try:
        result = await agent.execute_react(
            user_input=user_input,
            context=context,
            session_id=session_key,
            on_token=on_token,
            on_event=on_event,
            should_cancel=cancel_ev.is_set,
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

    # 首轮对话结束后，用 LLM 生成会话标题并写回（不阻塞响应）
    if state == "final" and accumulated[0]:
        store = get_session_store()
        session = store.load(session_key)
        if len(session.turns) == 1:
            asyncio.create_task(_generate_and_set_session_title(session_key, user_input, accumulated[0]))


def handle_chat_abort(params: dict) -> dict:
    run_id = (params.get("runId") or "").strip()
    if run_id:
        run_cancel(run_id)
    return {"ok": True}
