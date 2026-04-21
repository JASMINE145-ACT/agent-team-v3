"""Unit tests for KnowledgeBackend — all DB calls mocked."""
import os

import pytest
from unittest.mock import MagicMock, patch

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _make_kb(_mock_pool):
    """Instantiate KnowledgeBackend bypassing real psycopg2 connection."""
    from backend.agent.knowledge_backend import KnowledgeBackend

    with patch("backend.agent.knowledge_backend.psycopg2") as mock_pg:
        mock_conn = MagicMock()
        mock_pool_inst = MagicMock()
        mock_pg.pool.ThreadedConnectionPool.return_value = mock_pool_inst
        mock_pool_inst.getconn.return_value = mock_conn
        kb = KnowledgeBackend.__new__(KnowledgeBackend)
        kb._pool = mock_pool_inst
        return kb, mock_pool_inst, mock_conn


# ---------------------------------------------------------------------------
# get()
# ---------------------------------------------------------------------------


class TestKnowledgeBackendGet:
    def test_returns_content_when_row_exists(self):
        kb, pool, conn = _make_kb(None)
        cursor = MagicMock()
        conn.cursor.return_value.__enter__ = lambda s: cursor
        conn.cursor.return_value.__exit__ = MagicMock(return_value=False)
        cursor.fetchone.return_value = ("hello knowledge",)

        result = kb.get("wanding_selector")

        assert result == "hello knowledge"
        pool.putconn.assert_called_once_with(conn)

    def test_returns_none_when_no_row(self):
        kb, pool, conn = _make_kb(None)
        cursor = MagicMock()
        conn.cursor.return_value.__enter__ = lambda s: cursor
        conn.cursor.return_value.__exit__ = MagicMock(return_value=False)
        cursor.fetchone.return_value = None

        result = kb.get("wanding_selector")

        assert result is None

    def test_returns_none_on_db_exception(self):
        kb, pool, conn = _make_kb(None)
        conn.cursor.side_effect = Exception("connection lost")

        result = kb.get("wanding_selector")

        assert result is None
        pool.putconn.assert_called_once_with(conn)


# ---------------------------------------------------------------------------
# put()
# ---------------------------------------------------------------------------


class TestKnowledgeBackendPut:
    def test_upserts_successfully(self):
        kb, pool, conn = _make_kb(None)
        cursor = MagicMock()
        conn.cursor.return_value.__enter__ = lambda s: cursor
        conn.cursor.return_value.__exit__ = MagicMock(return_value=False)

        kb.put("wanding_selector", "new content")

        assert cursor.execute.called
        sql_called = cursor.execute.call_args[0][0]
        assert "ON CONFLICT" in sql_called
        conn.commit.assert_called_once()
        pool.putconn.assert_called_once_with(conn)

    def test_raises_on_db_exception(self):
        kb, pool, conn = _make_kb(None)
        conn.cursor.side_effect = Exception("write failed")

        with pytest.raises(Exception, match="write failed"):
            kb.put("wanding_selector", "content")

        pool.putconn.assert_called_once_with(conn)

    def test_close_calls_pool_closeall(self):
        kb, pool, _ = _make_kb(None)
        kb.close()
        pool.closeall.assert_called_once()


class TestShutdownKnowledgeBackend:
    def test_clears_singleton_and_closes(self):
        import backend.tools.inventory.services.llm_selector as sel

        mock_kb = MagicMock()
        sel.set_knowledge_backend(mock_kb)
        sel.shutdown_knowledge_backend()
        assert sel._kb_singleton is None
        mock_kb.close.assert_called_once()


# ---------------------------------------------------------------------------
# Integration tests (require real DATABASE_URL — skipped in CI by default)
# ---------------------------------------------------------------------------

_HAS_DB_URL = bool((os.getenv("DATABASE_URL") or os.getenv("NEON_DATABASE_URL") or "").strip())


@pytest.mark.skipif(
    not _HAS_DB_URL,
    reason="DATABASE_URL / NEON_DATABASE_URL not set — skipping integration tests",
)
class TestKnowledgeBackendIntegration:
    @pytest.fixture(autouse=True)
    def kb(self):
        from backend.agent.knowledge_backend import KnowledgeBackend

        url = (os.getenv("DATABASE_URL") or os.getenv("NEON_DATABASE_URL") or "").strip()
        instance = KnowledgeBackend(url)
        yield instance

    def test_put_then_get_roundtrip(self, kb):
        kb.put("_test_key", "integration test content")
        result = kb.get("_test_key")
        assert result == "integration test content"
        kb.put("_test_key", "")


# ---------------------------------------------------------------------------
# llm_selector integration with KnowledgeBackend
# ---------------------------------------------------------------------------


class TestLlmSelectorKnowledgeInjection:
    def setup_method(self):
        import backend.tools.inventory.services.llm_selector as sel

        sel.set_knowledge_backend(None)
        sel.invalidate_business_knowledge_cache()

    def teardown_method(self):
        import backend.tools.inventory.services.llm_selector as sel

        sel.set_knowledge_backend(None)

    def test_uses_neon_content_when_backend_set(self, tmp_path):
        import backend.tools.inventory.services.llm_selector as sel

        mock_kb = MagicMock()
        mock_kb.get.return_value = "neon knowledge content"
        sel.set_knowledge_backend(mock_kb)

        result = sel._load_business_knowledge()

        assert result == "neon knowledge content"
        mock_kb.get.assert_called_once_with("wanding_selector")

    def test_falls_back_to_file_when_neon_returns_none(self, tmp_path):
        import backend.tools.inventory.services.llm_selector as sel

        knowledge_file = tmp_path / "bk.md"
        knowledge_file.write_text("file fallback content", encoding="utf-8")

        mock_kb = MagicMock()
        mock_kb.get.return_value = None

        with patch.object(sel, "_kb_singleton", mock_kb):
            with patch(
                "backend.tools.inventory.services.llm_selector._get_knowledge_path",
                return_value=knowledge_file,
            ):
                result = sel._load_business_knowledge()

        assert result == "file fallback content"

    def test_falls_back_to_embedded_when_both_fail(self, tmp_path):
        import backend.tools.inventory.services.llm_selector as sel

        mock_kb = MagicMock()
        mock_kb.get.return_value = None
        sel.set_knowledge_backend(mock_kb)

        nonexistent = tmp_path / "missing.md"
        with patch(
            "backend.tools.inventory.services.llm_selector._get_knowledge_path",
            return_value=nonexistent,
        ):
            result = sel._load_business_knowledge()

        assert result == sel._BUSINESS_KNOWLEDGE
