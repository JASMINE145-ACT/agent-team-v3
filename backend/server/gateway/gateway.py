"""
OpenClaw Gateway 协议 — WebSocket /ws
帧：req/res + event；握手 connect.challenge → connect → hello-ok
"""
import asyncio
import json
import logging
import uuid
from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from backend.server.gateway.handlers import (
    handle_connect,
    handle_agent_identity_get,
    handle_agents_list,
    handle_sessions_list,
    handle_sessions_patch,
    handle_sessions_delete,
    handle_chat_history,
    handle_chat_send,
    handle_chat_abort,
    handle_stub,
)

logger = logging.getLogger(__name__)
router = APIRouter()

STUB_METHODS = {
    "config.get",
    "skills.status",
    "cron.status",
    "node.list",
    "models.list",
    "health",
    "status",
    "last-heartbeat",
    "system-presence",
    "device.pair.list",
    "exec.approvals.get",
}


async def _send_json(ws: WebSocket, obj: dict) -> None:
    await ws.send_text(json.dumps(obj, ensure_ascii=False))


async def handle_req(ws: WebSocket, frame: dict) -> None:
    req_id = frame.get("id") or str(uuid.uuid4())
    method = (frame.get("method") or "").strip()
    params = frame.get("params") or {}

    def send_res(payload: dict, ok: bool = True, error: dict | None = None):
        res = {"type": "res", "id": req_id, "ok": ok, "payload": payload}
        if error:
            res["error"] = error
        return asyncio.ensure_future(_send_json(ws, res))

    async def send_event(payload: dict) -> None:
        await _send_json(ws, payload)

    try:
        if method == "connect":
            payload = handle_connect(params)
            await _send_json(ws, {"type": "res", "id": req_id, "ok": True, "payload": payload})
            return

        if method == "agent.identity.get":
            payload = handle_agent_identity_get(params)
            await _send_json(ws, {"type": "res", "id": req_id, "ok": True, "payload": payload})
            return

        if method == "agents.list":
            payload = handle_agents_list(params)
            await _send_json(ws, {"type": "res", "id": req_id, "ok": True, "payload": payload})
            return

        if method == "sessions.list":
            payload = handle_sessions_list(params)
            await _send_json(ws, {"type": "res", "id": req_id, "ok": True, "payload": payload})
            return

        if method == "sessions.patch":
            payload = handle_sessions_patch(params)
            await _send_json(ws, {"type": "res", "id": req_id, "ok": True, "payload": payload})
            return

        if method == "sessions.delete":
            payload = handle_sessions_delete(params)
            await _send_json(ws, {"type": "res", "id": req_id, "ok": True, "payload": payload})
            return

        if method == "chat.history":
            payload = handle_chat_history(params)
            await _send_json(ws, {"type": "res", "id": req_id, "ok": True, "payload": payload})
            return

        if method == "chat.send":
            async def send_res(p):
                await _send_json(ws, {"type": "res", "id": req_id, "ok": True, "payload": p})
            await handle_chat_send(ws, req_id, params, send_res, send_event)
            return

        if method == "chat.abort":
            payload = handle_chat_abort(params)
            await _send_json(ws, {"type": "res", "id": req_id, "ok": True, "payload": payload})
            return

        if method in STUB_METHODS:
            payload = handle_stub(method)
            await _send_json(ws, {"type": "res", "id": req_id, "ok": True, "payload": payload})
            return

        await _send_json(ws, {
            "type": "res",
            "id": req_id,
            "ok": False,
            "payload": None,
            "error": {"code": "not_implemented", "message": f"method {method!r} not implemented"},
        })
    except Exception as e:
        logger.exception("handle_req %s: %s", method, e)
        await _send_json(ws, {
            "type": "res",
            "id": req_id,
            "ok": False,
            "payload": None,
            "error": {"code": "internal", "message": str(e)},
        })


@router.websocket("/ws")
async def ws_endpoint(websocket: WebSocket):
    await websocket.accept()
    nonce = str(uuid.uuid4())
    await _send_json(websocket, {"type": "event", "event": "connect.challenge", "payload": {"nonce": nonce}})
    try:
        while True:
            raw = await websocket.receive_text()
            frame = json.loads(raw)
            if frame.get("type") == "req":
                await handle_req(websocket, frame)
    except WebSocketDisconnect:
        pass
    except json.JSONDecodeError as e:
        logger.warning("ws invalid json: %s", e)
    except Exception as e:
        logger.exception("ws endpoint: %s", e)
