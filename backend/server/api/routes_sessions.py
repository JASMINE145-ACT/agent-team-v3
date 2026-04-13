"""Session management API — list, create, delete sessions."""
from __future__ import annotations

import logging
import uuid
from typing import Any, Dict

from fastapi import APIRouter, Body, HTTPException

from backend.agent.session import get_session_store

logger = logging.getLogger(__name__)
router = APIRouter()


@router.get("/api/sessions")
async def list_sessions() -> list:
    store = get_session_store()
    rows = store.list_sessions()
    return [
        {
            "session_id": r[0],
            "updated_at": r[1],
            "label": r[2],
        }
        for r in rows
    ]


@router.post("/api/sessions")
async def create_session(body: Dict[str, Any] = Body(default={})) -> Dict[str, Any]:
    label = (body.get("label") or "").strip() or None
    session_id = str(uuid.uuid4())
    store = get_session_store()
    try:
        store.ensure_session(session_id, label=label)
        if label:
            store.set_label(session_id, label)
    except Exception as e:
        logger.warning("create_session ensure failed: %s", e)
    return {"session_id": session_id, "label": label}


@router.delete("/api/sessions/{session_id}")
async def delete_session(session_id: str) -> Dict[str, Any]:
    if not session_id or len(session_id) > 128:
        raise HTTPException(status_code=400, detail="Invalid session_id")
    store = get_session_store()
    store.delete_session(session_id)
    return {"success": True, "session_id": session_id}
