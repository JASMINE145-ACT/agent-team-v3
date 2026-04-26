from __future__ import annotations

import json
from unittest.mock import patch

from backend.tools.admin import repository


class _FakeResult:
    def __init__(self, row=None):
        self._row = row

    def mappings(self):
        return self

    def first(self):
        return self._row

    def fetchall(self):
        if isinstance(self._row, list):
            return self._row
        return []


class _FakeConn:
    def __init__(self, columns_payload=None):
        self.columns_payload = columns_payload or []
        self.executed = []
        self.last_params = None

    def execute(self, stmt, params=None):
        sql = str(stmt)
        self.executed.append((sql, params))
        self.last_params = params
        if "SELECT columns FROM data_libraries" in sql:
            return _FakeResult({"columns": self.columns_payload})
        if "FROM information_schema.columns" in sql:
            return _FakeResult([("id",), ("_row_index",), ("material",), ("price_a",)])
        return _FakeResult()


class _FakeBegin:
    def __init__(self, conn):
        self.conn = conn

    def __enter__(self):
        return self.conn

    def __exit__(self, exc_type, exc, tb):
        return False


class _FakeEngine:
    def __init__(self, conn):
        self._conn = conn

    def begin(self):
        return _FakeBegin(self._conn)

    def connect(self):
        return _FakeBegin(self._conn)


def test_introspect_table_columns_excludes_system_columns():
    conn = _FakeConn()
    eng = _FakeEngine(conn)
    with patch.object(repository, "_get_engine", return_value=eng):
        cols = repository.introspect_table_columns("dl_1_demo")
    assert cols == ["material", "price_a"]
    assert conn.last_params == {"tn": "dl_1_demo"}


def test_sync_library_schema_only_merges_new_columns():
    conn = _FakeConn()
    eng = _FakeEngine(conn)
    existing = [{"name": "material", "type": "TEXT", "original_name": "material", "warnings": []}]
    with patch.object(repository, "_get_engine", return_value=eng), patch.object(
        repository, "introspect_table_columns", return_value=["material", "price_a"]
    ):
        merged = repository.sync_library_schema(7, "dl_7_demo", existing)
    assert merged == ["price_a"]
    update_calls = [c for c in conn.executed if "UPDATE data_libraries SET columns" in c[0]]
    assert len(update_calls) == 1
    updated = json.loads(update_calls[0][1]["cols"])
    assert [c["name"] for c in updated] == ["material", "price_a"]


def test_add_library_column_rejects_illegal_name():
    with patch.object(repository, "_get_engine", return_value=object()):
        try:
            repository.add_library_column(1, "dl_1_demo", "bad-name", "TEXT")
            assert False, "expected ValueError"
        except ValueError as e:
            assert "invalid column name" in str(e)


def test_drop_library_column_rejects_id():
    with patch.object(repository, "_get_engine", return_value=object()):
        try:
            repository.drop_library_column(1, "dl_1_demo", "id")
            assert False, "expected ValueError"
        except ValueError as e:
            assert "protected column" in str(e)


def test_add_library_column_rejects_protected_name():
    with patch.object(repository, "_get_engine", return_value=object()):
        try:
            repository.add_library_column(1, "dl_1_demo", "id", "TEXT")
            assert False, "expected ValueError"
        except ValueError as e:
            assert "protected column" in str(e)


def test_rename_library_column_updates_columns_jsonb():
    cols = [{"name": "material", "type": "TEXT", "original_name": "Material", "warnings": []}]
    conn = _FakeConn(columns_payload=cols)
    eng = _FakeEngine(conn)
    with patch.object(repository, "_get_engine", return_value=eng):
        repository.rename_library_column(9, "dl_9_demo", "material", "material_new")
    alter_calls = [c for c in conn.executed if "ALTER TABLE" in c[0] and "RENAME COLUMN" in c[0]]
    assert len(alter_calls) == 1
    update_calls = [c for c in conn.executed if "UPDATE data_libraries SET columns" in c[0]]
    assert len(update_calls) == 1
    updated = json.loads(update_calls[0][1]["cols"])
    assert updated[0]["name"] == "material_new"
    assert updated[0]["original_name"] == "material_new"


def test_rename_library_column_rejects_protected_target():
    with patch.object(repository, "_get_engine", return_value=object()):
        try:
            repository.rename_library_column(1, "dl_1_demo", "material", "_row_index")
            assert False, "expected ValueError"
        except ValueError as e:
            assert "protected column" in str(e)
