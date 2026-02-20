"""sessions.list / sessions.patch / sessions.delete"""

import time
from backend.agent.session import get_session_store


def handle_sessions_list(params: dict) -> dict:
    store = get_session_store()
    rows = store.list_sessions()
    limit = int(params.get("limit") or 200)
    # updatedAt 用毫秒级时间戳（前端 formatRelativeTimestamp 期望 epochMs）
    sessions = []
    for row in sorted(rows, key=lambda x: -x[1])[:limit]:
        sid, updated_at, label = row[0], row[1], row[2]
        in_tok = row[3] if len(row) > 3 else 0
        out_tok = row[4] if len(row) > 4 else 0
        sessions.append({
            "key": sid,
            "kind": "direct",
            "label": label or None,
            "updatedAt": int(updated_at * 1000) if updated_at else None,
            "inputTokens": in_tok or None,
            "outputTokens": out_tok or None,
            "totalTokens": (in_tok or 0) + (out_tok or 0) or None,
        })
    persist_dir = getattr(store, "_persist_dir", None)
    return {
        "ts": time.time(),
        "path": str(persist_dir) if persist_dir else "",
        "count": len(sessions),
        "defaults": {"model": None, "contextTokens": None},
        "sessions": sessions,
    }


def handle_sessions_patch(params: dict) -> dict:
    # label 可选写入；version3 SessionStore 无 label 字段，仅返回 ok
    return {"ok": True}


def handle_sessions_delete(params: dict) -> dict:
    key = (params.get("key") or "").strip()
    if not key:
        return {"ok": True}
    store = get_session_store()
    store.delete_session(key)
    return {"ok": True}
