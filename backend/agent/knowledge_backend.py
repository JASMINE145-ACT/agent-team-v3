"""KnowledgeBackend — Neon PostgreSQL storage for business knowledge documents (SQLAlchemy QueuePool)."""
from __future__ import annotations

import logging
from typing import Optional

from sqlalchemy import create_engine, text
from sqlalchemy.engine import Engine
from sqlalchemy.pool import QueuePool

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
VALUES (:key, :content)
ON CONFLICT (key) DO UPDATE
    SET content    = EXCLUDED.content,
        updated_at = now()
"""

_SELECT = "SELECT content FROM business_knowledge WHERE key = :key"


class KnowledgeBackend:
    def __init__(self, database_url: str) -> None:
        if not database_url:
            self._engine: Optional[Engine] = None
            return
        try:
            self._engine = create_engine(
                database_url,
                poolclass=QueuePool,
                pool_size=3,
                max_overflow=0,
                pool_recycle=300,  # 5分钟回收，低于 Neon idle 断连
                pool_pre_ping=True,  # checkout 前验证连接是否活着
                connect_args={"sslmode": "require"},
            )
        except Exception as e:
            logger.warning("KnowledgeBackend engine 初始化失败: %s", e)
            self._engine = None
            return
        self._init_schema()

    def _init_schema(self) -> None:
        if self._engine is None:
            return
        try:
            with self._engine.begin() as conn:
                conn.execute(text(_DDL))
        except Exception as e:
            logger.warning("KnowledgeBackend schema init failed: %s", e)

    def get(self, key: str) -> Optional[str]:
        """Return content for key, or None if missing or on error."""
        if self._engine is None:
            return None
        try:
            with self._engine.connect() as conn:
                row = conn.execute(text(_SELECT), {"key": key}).fetchone()
            return row[0] if row else None
        except Exception as e:
            logger.warning("KnowledgeBackend.get failed: %s", e)
            return None

    def put(self, key: str, content: str) -> None:
        """Upsert content for key. Raises on error."""
        if self._engine is None:
            raise RuntimeError("KnowledgeBackend: no database connection")
        try:
            with self._engine.begin() as conn:
                conn.execute(text(_UPSERT), {"key": key, "content": content})
        except Exception as e:
            logger.error("KnowledgeBackend.put failed: %s", e)
            raise

    def close(self) -> None:
        """Release the engine (idempotent)."""
        if self._engine is not None:
            try:
                self._engine.dispose()
            except Exception as e:
                logger.warning("KnowledgeBackend.close failed: %s", e)
            self._engine = None
