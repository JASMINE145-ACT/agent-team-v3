"""KnowledgeBackend — Neon PostgreSQL storage for business knowledge documents."""
from __future__ import annotations

import logging
from typing import Optional

import psycopg2
import psycopg2.pool

logger = logging.getLogger(__name__)

_DDL = """
CREATE TABLE IF NOT EXISTS business_knowledge (
    id          SERIAL PRIMARY KEY,
    key         TEXT NOT NULL UNIQUE,
    content     TEXT NOT NULL,
    updated_at  TIMESTAMPTZ DEFAULT now()
)
"""

_UPSERT = """
INSERT INTO business_knowledge (key, content)
VALUES (%s, %s)
ON CONFLICT (key) DO UPDATE
    SET content    = EXCLUDED.content,
        updated_at = now()
"""

_SELECT = "SELECT content FROM business_knowledge WHERE key = %s"


class KnowledgeBackend:
    def __init__(self, database_url: str) -> None:
        self._pool = psycopg2.pool.ThreadedConnectionPool(
            minconn=1,
            maxconn=3,
            dsn=database_url,
        )
        self._init_schema()

    def _init_schema(self) -> None:
        conn = self._pool.getconn()
        try:
            with conn.cursor() as cur:
                cur.execute(_DDL)
            conn.commit()
        except Exception as e:
            conn.rollback()
            logger.error("KnowledgeBackend schema init failed: %s", e)
            raise
        finally:
            self._pool.putconn(conn)

    def get(self, key: str) -> Optional[str]:
        """Return content for key, or None if missing or on error."""
        conn = self._pool.getconn()
        try:
            with conn.cursor() as cur:
                cur.execute(_SELECT, (key,))
                row = cur.fetchone()
            return row[0] if row else None
        except Exception as e:
            logger.warning("KnowledgeBackend.get failed: %s", e)
            return None
        finally:
            self._pool.putconn(conn)

    def put(self, key: str, content: str) -> None:
        """Upsert content for key. Raises on error."""
        conn = self._pool.getconn()
        try:
            with conn.cursor() as cur:
                cur.execute(_UPSERT, (key, content))
            conn.commit()
        except Exception as e:
            conn.rollback()
            logger.error("KnowledgeBackend.put failed: %s", e)
            raise
        finally:
            self._pool.putconn(conn)

    def close(self) -> None:
        """Release the connection pool (idempotent)."""
        try:
            self._pool.closeall()
        except Exception as e:
            logger.warning("KnowledgeBackend.close failed: %s", e)
