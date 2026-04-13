"""NeonBackend — SessionBackend implementation using Neon PostgreSQL (psycopg2)."""
from __future__ import annotations

import json
import logging
from typing import Any, Dict, List, Optional

import psycopg2
import psycopg2.pool
from psycopg2.extras import Json

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


class NeonBackend:
    def __init__(self, database_url: str) -> None:
        self._pool = psycopg2.pool.ThreadedConnectionPool(
            minconn=1,
            maxconn=5,
            dsn=database_url,
        )
        self._init_schema()

    def _init_schema(self) -> None:
        conn = self._pool.getconn()
        try:
            with conn.cursor() as cur:
                for stmt in _DDL_STATEMENTS:
                    cur.execute(stmt)
            conn.commit()
        except Exception as e:
            conn.rollback()
            logger.error("NeonBackend schema init 失败: %s", e)
            raise
        finally:
            self._pool.putconn(conn)

    def load_turns(self, session_id: str, limit: int) -> List[Turn]:
        conn = self._pool.getconn()
        try:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT query, agent, answer, ts, from_user, thinking, extra
                    FROM (
                        SELECT query, agent, answer, ts, from_user, thinking, extra
                        FROM turns
                        WHERE session_id = %s
                        ORDER BY ts DESC
                        LIMIT %s
                    ) sub
                    ORDER BY ts ASC
                    """,
                    (session_id, limit),
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
        finally:
            self._pool.putconn(conn)

    def save_turn(self, session_id: str, turn: Turn, from_user: Optional[str] = None) -> None:
        effective_from = from_user or getattr(turn, "from_user", None)
        conn = self._pool.getconn()
        try:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO sessions (session_id, updated_at)
                    VALUES (%s, now())
                    ON CONFLICT (session_id) DO UPDATE SET updated_at = now()
                    """,
                    (session_id,),
                )
                extra_db = turn.extra if turn.extra is not None else None
                cur.execute(
                    """
                    INSERT INTO turns (session_id, from_user, query, agent, answer, ts, thinking, extra)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                    """,
                    (
                        session_id,
                        effective_from,
                        turn.query[:2000],
                        turn.agent or "",
                        turn.answer,
                        turn.ts,
                        turn.thinking,
                        Json(extra_db) if extra_db is not None else None,
                    ),
                )
            conn.commit()
        except Exception as e:
            conn.rollback()
            logger.warning("NeonBackend save_turn 失败 %s: %s", session_id, e)
        finally:
            self._pool.putconn(conn)

    def list_sessions(self) -> List[SessionMeta]:
        conn = self._pool.getconn()
        try:
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT session_id, label, EXTRACT(EPOCH FROM updated_at) FROM sessions ORDER BY updated_at DESC"
                )
                rows = cur.fetchall()
            return [SessionMeta(session_id=r[0], label=r[1], updated_at=float(r[2])) for r in rows]
        except Exception as e:
            logger.warning("NeonBackend list_sessions 失败: %s", e)
            return []
        finally:
            self._pool.putconn(conn)

    def delete_session(self, session_id: str) -> None:
        conn = self._pool.getconn()
        try:
            with conn.cursor() as cur:
                cur.execute("DELETE FROM sessions WHERE session_id = %s", (session_id,))
            conn.commit()
        except Exception as e:
            conn.rollback()
            logger.warning("NeonBackend delete_session 失败 %s: %s", session_id, e)
        finally:
            self._pool.putconn(conn)

    def ensure_session(self, session_id: str, label: Optional[str] = None) -> None:
        conn = self._pool.getconn()
        try:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO sessions (session_id, label)
                    VALUES (%s, %s)
                    ON CONFLICT (session_id) DO NOTHING
                    """,
                    (session_id, label),
                )
            conn.commit()
        except Exception as e:
            conn.rollback()
            logger.warning("NeonBackend ensure_session 失败 %s: %s", session_id, e)
        finally:
            self._pool.putconn(conn)

    def clear_turns(self, session_id: str) -> None:
        conn = self._pool.getconn()
        try:
            with conn.cursor() as cur:
                cur.execute("DELETE FROM turns WHERE session_id = %s", (session_id,))
                cur.execute(
                    "UPDATE sessions SET updated_at = now() WHERE session_id = %s",
                    (session_id,),
                )
            conn.commit()
        except Exception as e:
            conn.rollback()
            logger.warning("NeonBackend clear_turns 失败 %s: %s", session_id, e)
        finally:
            self._pool.putconn(conn)

    def set_label(self, session_id: str, label: str) -> None:
        conn = self._pool.getconn()
        try:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO sessions (session_id, label)
                    VALUES (%s, %s)
                    ON CONFLICT (session_id) DO UPDATE SET label = EXCLUDED.label
                    """,
                    (session_id, label[:80]),
                )
            conn.commit()
        except Exception as e:
            conn.rollback()
            logger.warning("NeonBackend set_label 失败 %s: %s", session_id, e)
        finally:
            self._pool.putconn(conn)

    def read_session_sidecar(self, session_id: str) -> Dict[str, Any]:
        conn = self._pool.getconn()
        try:
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT session_aux FROM sessions WHERE session_id = %s",
                    (session_id,),
                )
                row = cur.fetchone()
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
        finally:
            self._pool.putconn(conn)

    def persist_session_sidecar(self, session_id: str, session: Session) -> None:
        payload: Dict[str, Any] = {}
        for k in _AUX_JSON_KEYS:
            payload[k] = getattr(session, k, None)
        conn = self._pool.getconn()
        try:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO sessions (session_id, session_aux, updated_at)
                    VALUES (%s, %s::jsonb, now())
                    ON CONFLICT (session_id) DO UPDATE SET
                        session_aux = EXCLUDED.session_aux,
                        updated_at = now()
                    """,
                    (session_id, json.dumps(payload, ensure_ascii=False)),
                )
            conn.commit()
        except Exception as e:
            conn.rollback()
            logger.warning("NeonBackend persist_session_sidecar 失败 %s: %s", session_id, e)
        finally:
            self._pool.putconn(conn)
