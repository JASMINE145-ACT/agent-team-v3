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
        thinking_level = row[5] if len(row) > 5 else None
        verbose_level = row[6] if len(row) > 6 else None
        reasoning_level = row[7] if len(row) > 7 else None
        sessions.append({
            "key": sid,
            "kind": "direct",
            "label": label or None,
            "updatedAt": int(updated_at * 1000) if updated_at else None,
            "inputTokens": in_tok or None,
            "outputTokens": out_tok or None,
            "totalTokens": (in_tok or 0) + (out_tok or 0) or None,
            "thinkingLevel": thinking_level or None,
            "verboseLevel": verbose_level or None,
            "reasoningLevel": reasoning_level or None,
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
    key = (params.get("key") or "").strip()
    label = params.get("label")
    if not key:
        return {"ok": True}
    store = get_session_store()
    if label is not None:
        store.set_label(key, str(label).strip()[:80])

    user_facts_patch = {}
    if "thinkingLevel" in params:
        user_facts_patch["_thinking_level"] = params.get("thinkingLevel")
    if "verboseLevel" in params:
        user_facts_patch["_verbose_level"] = params.get("verboseLevel")
    if "reasoningLevel" in params:
        user_facts_patch["_reasoning_level"] = params.get("reasoningLevel")
    if user_facts_patch:
        store.update_user_facts(key, user_facts_patch)
    return {"ok": True}


def handle_sessions_delete(params: dict) -> dict:
    key = (params.get("key") or "").strip()
    if not key:
        return {"ok": True}
    store = get_session_store()
    store.delete_session(key)
    return {"ok": True}
