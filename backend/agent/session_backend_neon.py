"""NeonBackend — SessionBackend implementation using Neon PostgreSQL (SQLAlchemy QueuePool)."""
from __future__ import annotations

import json
import logging
from typing import Any, Dict, List, Optional

from sqlalchemy import create_engine, text
from sqlalchemy.engine import Engine
from sqlalchemy.pool import QueuePool

from backend.agent.session import Session, Turn
from backend.agent.session_backend import SessionMeta

logger = logging.getLogger(__name__)

_AUX_JSON_KEYS = (
    "file_path",
    "file_id",
    "excel_meta",
    "summary",
    "tool_memory",
    "user_facts",
    "pending_human_choice",
    "last_input_tokens",
    "last_output_tokens",
)

_DDL_STATEMENTS = [
    """
CREATE TABLE IF NOT EXISTS sessions (
    session_id  TEXT PRIMARY KEY,
    label       TEXT,
    created_at  TIMESTAMPTZ DEFAULT now(),
    updated_at  TIMESTAMPTZ DEFAULT now()
)
""".strip(),
    """
CREATE TABLE IF NOT EXISTS turns (
    id          BIGSERIAL PRIMARY KEY,
    session_id  TEXT NOT NULL REFERENCES sessions(session_id) ON DELETE CASCADE,
    from_user   TEXT,
    query       TEXT NOT NULL,
    agent       TEXT,
    answer      TEXT NOT NULL,
    ts          DOUBLE PRECISION NOT NULL,
    thinking    TEXT,
    extra       JSONB,
    created_at  TIMESTAMPTZ DEFAULT now()
)
""".strip(),
    "CREATE INDEX IF NOT EXISTS idx_turns_session_id ON turns(session_id, ts DESC)",
    "ALTER TABLE sessions ADD COLUMN IF NOT EXISTS session_aux JSONB DEFAULT '{}'::jsonb",
    "ALTER TABLE turns ADD COLUMN IF NOT EXISTS thinking TEXT",
    "ALTER TABLE turns ADD COLUMN IF NOT EXISTS extra JSONB",
]


_DATABASE_URL: str = ""
_engine: Optional[Engine] = None


def _get_engine(database_url: str) -> Optional[Engine]:
    global _engine
    if not database_url:
        return None
    if _engine is not None:
        return _engine
    try:
        _engine = create_engine(
            database_url,
            poolclass=QueuePool,
            pool_size=5,
            max_overflow=0,
            pool_recycle=300,  # 5分钟回收，低于 Neon 5min idle 断连
            pool_pre_ping=True,  # checkout 前验证连接是否活着
            connect_args={"sslmode": "require"},
        )
    except Exception as e:
        logger.warning("NeonBackend engine 初始化失败: %s", e)
        _engine = None
    return _engine


class NeonBackend:
    def __init__(self, database_url: str) -> None:
        self._engine = _get_engine(database_url)
        self._init_schema()

    def _init_schema(self) -> None:
        if self._engine is None:
            return
        with self._engine.begin() as conn:
            for stmt in _DDL_STATEMENTS:
                conn.execute(text(stmt))

    def load_turns(self, session_id: str, limit: int) -> List[Turn]:
        if self._engine is None:
            return []
        try:
            with self._engine.connect() as conn:
                cur = conn.execute(
                    text(
                        """
                        SELECT query, agent, answer, ts, from_user, thinking, extra
                        FROM (
                            SELECT query, agent, answer, ts, from_user, thinking, extra
                            FROM turns
                            WHERE session_id = :sid
                            ORDER BY ts DESC
                            LIMIT :lim
                        ) sub
                        ORDER BY ts ASC
                        """
                    ),
                    {"sid": session_id, "lim": limit},
                )
                rows = cur.fetchall()
            out: List[Turn] = []
            for r in rows:
                extra_val = r[6]
                if isinstance(extra_val, str):
                    try:
                        extra_val = json.loads(extra_val)
                    except Exception:
                        extra_val = None
                elif extra_val is not None and not isinstance(extra_val, dict):
                    extra_val = None
                out.append(
                    Turn(
                        query=r[0],
                        agent=r[1] or "",
                        answer=r[2],
                        ts=float(r[3]),
                        from_user=r[4],
                        thinking=r[5],
                        extra=extra_val,
                    )
                )
            return out
        except Exception as e:
            logger.warning("NeonBackend load_turns 失败 %s: %s", session_id, e)
            return []

    def save_turn(self, session_id: str, turn: Turn, from_user: Optional[str] = None) -> None:
        if self._engine is None:
            return
        effective_from = from_user or getattr(turn, "from_user", None)
        try:
            with self._engine.begin() as conn:
                extra_db = turn.extra if turn.extra is not None else None
                conn.execute(
                    text(
                        """
                        INSERT INTO sessions (session_id, updated_at)
                        VALUES (:sid, now())
                        ON CONFLICT (session_id) DO UPDATE SET updated_at = now()
                        """
                    ),
                    {"sid": session_id},
                )
                conn.execute(
                    text(
                        """
                        INSERT INTO turns (session_id, from_user, query, agent, answer, ts, thinking, extra)
                        VALUES (:sid, :fu, :q, :ag, :ans, :ts, :th, :extra)
                        """
                    ),
                    {
                        "sid": session_id,
                        "fu": effective_from,
                        "q": turn.query[:2000],
                        "ag": turn.agent or "",
                        "ans": turn.answer,
                        "ts": turn.ts,
                        "th": turn.thinking,
                        "extra": json.dumps(extra_db) if extra_db is not None else None,
                    },
                )
        except Exception as e:
            logger.warning("NeonBackend save_turn 失败 %s: %s", session_id, e)

    def list_sessions(self) -> List[SessionMeta]:
        if self._engine is None:
            return []
        try:
            with self._engine.connect() as conn:
                rows = conn.execute(
                    text(
                        "SELECT session_id, label, EXTRACT(EPOCH FROM updated_at) "
                        "FROM sessions ORDER BY updated_at DESC"
                    )
                ).fetchall()
            return [SessionMeta(session_id=r[0], label=r[1], updated_at=float(r[2])) for r in rows]
        except Exception as e:
            logger.warning("NeonBackend list_sessions 失败: %s", e)
            return []

    def delete_session(self, session_id: str) -> None:
        if self._engine is None:
            return
        try:
            with self._engine.begin() as conn:
                conn.execute(text("DELETE FROM sessions WHERE session_id = :sid"), {"sid": session_id})
        except Exception as e:
            logger.warning("NeonBackend delete_session 失败 %s: %s", session_id, e)

    def ensure_session(self, session_id: str, label: Optional[str] = None) -> None:
        if self._engine is None:
            return
        try:
            with self._engine.begin() as conn:
                conn.execute(
                    text(
                        "INSERT INTO sessions (session_id, label) VALUES (:sid, :lbl) "
                        "ON CONFLICT (session_id) DO NOTHING"
                    ),
                    {"sid": session_id, "lbl": label},
                )
        except Exception as e:
            logger.warning("NeonBackend ensure_session 失败 %s: %s", session_id, e)

    def clear_turns(self, session_id: str) -> None:
        if self._engine is None:
            return
        try:
            with self._engine.begin() as conn:
                conn.execute(text("DELETE FROM turns WHERE session_id = :sid"), {"sid": session_id})
                conn.execute(
                    text("UPDATE sessions SET updated_at = now() WHERE session_id = :sid"),
                    {"sid": session_id},
                )
        except Exception as e:
            logger.warning("NeonBackend clear_turns 失败 %s: %s", session_id, e)

    def set_label(self, session_id: str, label: str) -> None:
        if self._engine is None:
            return
        try:
            with self._engine.begin() as conn:
                conn.execute(
                    text(
                        "INSERT INTO sessions (session_id, label) VALUES (:sid, :lbl) "
                        "ON CONFLICT (session_id) DO UPDATE SET label = EXCLUDED.label"
                    ),
                    {"sid": session_id, "lbl": label[:80]},
                )
        except Exception as e:
            logger.warning("NeonBackend set_label 失败 %s: %s", session_id, e)

    def read_session_sidecar(self, session_id: str) -> Dict[str, Any]:
        if self._engine is None:
            return {}
        try:
            with self._engine.connect() as conn:
                row = conn.execute(
                    text("SELECT session_aux FROM sessions WHERE session_id = :sid"),
                    {"sid": session_id},
                ).fetchone()
            if not row or row[0] is None:
                return {}
            val = row[0]
            if isinstance(val, str):
                d = json.loads(val)
            elif isinstance(val, dict):
                d = val
            else:
                d = {}
            return {k: d[k] for k in _AUX_JSON_KEYS if k in d}
        except Exception as e:
            logger.warning("NeonBackend read_session_sidecar 失败 %s: %s", session_id, e)
            return {}

    def persist_session_sidecar(self, session_id: str, session: Session) -> None:
        if self._engine is None:
            return
        payload: Dict[str, Any] = {}
        for k in _AUX_JSON_KEYS:
            payload[k] = getattr(session, k, None)
        try:
            with self._engine.begin() as conn:
                conn.execute(
                    text(
                        "INSERT INTO sessions (session_id, session_aux, updated_at) "
                        "VALUES (:sid, :aux::jsonb, now()) "
                        "ON CONFLICT (session_id) DO UPDATE SET "
                        "session_aux = EXCLUDED.session_aux, updated_at = now()"
                    ),
                    {"sid": session_id, "aux": json.dumps(payload, ensure_ascii=False)},
                )
        except Exception as e:
            logger.warning("NeonBackend persist_session_sidecar 失败 %s: %s", session_id, e)
