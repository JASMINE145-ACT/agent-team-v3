from __future__ import annotations

from fastapi.testclient import TestClient

from backend.server.api.app import app


def _setup_admin_auth(monkeypatch):
    monkeypatch.setattr("backend.server.api.routes_admin.auth.is_enabled", lambda: True)
    monkeypatch.setattr("backend.server.api.routes_admin.auth.verify_token", lambda token: token == "ok")


def test_list_libraries_success(monkeypatch):
    _setup_admin_auth(monkeypatch)
    monkeypatch.setattr(
        "backend.server.api.routes_admin.repository.list_libraries",
        lambda: [{"id": 1, "name": "Demo", "table_name": "dl_1_demo", "columns": [], "row_count": 0}],
    )
    client = TestClient(app)
    resp = client.get("/api/admin/libraries", headers={"X-Admin-Token": "ok"})
    assert resp.status_code == 200
    payload = resp.json()
    assert isinstance(payload.get("items"), list)
    assert payload["items"][0]["name"] == "Demo"


def test_upload_library_returns_warnings(monkeypatch):
    _setup_admin_auth(monkeypatch)
    monkeypatch.setattr(
        "backend.server.api.routes_admin._parse_generic",
        lambda content, filename: {
            "columns": [{"name": "name", "type": "TEXT", "original_name": "Name", "warnings": []}],
            "rows": [["x"]],
            "warnings": ["列头重复，已重命名"],
            "errors": [],
        },
    )
    monkeypatch.setattr(
        "backend.server.api.routes_admin.repository.create_library_and_insert",
        lambda name, columns, rows: 42,
    )
    client = TestClient(app)
    resp = client.post(
        "/api/admin/libraries/upload",
        headers={"X-Admin-Token": "ok"},
        files={"file": ("demo.csv", b"Name\nx\n", "text/csv")},
        data={"name": "My Library"},
    )
    assert resp.status_code == 200
    payload = resp.json()
    assert payload["id"] == 42
    assert payload["name"] == "My Library"
    assert payload["imported"] == 1
    assert payload["warnings"] == ["列头重复，已重命名"]


def test_upload_library_invalidates_caches(monkeypatch):
    _setup_admin_auth(monkeypatch)
    monkeypatch.setattr(
        "backend.server.api.routes_admin._parse_generic",
        lambda content, filename: {
            "columns": [{"name": "name", "type": "TEXT", "original_name": "Name", "warnings": []}],
            "rows": [["x"]],
            "warnings": [],
            "errors": [],
        },
    )
    monkeypatch.setattr(
        "backend.server.api.routes_admin.repository.create_library_and_insert",
        lambda name, columns, rows: 42,
    )
    calls: dict[str, int] = {"price": 0, "mapping": 0, "wanding": 0, "map_matcher": 0}
    monkeypatch.setattr(
        "backend.server.api.routes_admin.admin_cache.invalidate_price_library",
        lambda: calls.__setitem__("price", calls["price"] + 1),
    )
    monkeypatch.setattr(
        "backend.server.api.routes_admin.admin_cache.invalidate_product_mapping",
        lambda: calls.__setitem__("mapping", calls["mapping"] + 1),
    )
    monkeypatch.setattr(
        "backend.server.api.routes_admin.invalidate_wanding_cache",
        lambda: calls.__setitem__("wanding", calls["wanding"] + 1),
    )
    monkeypatch.setattr(
        "backend.server.api.routes_admin.invalidate_mapping_cache",
        lambda: calls.__setitem__("map_matcher", calls["map_matcher"] + 1),
    )
    client = TestClient(app)
    resp = client.post(
        "/api/admin/libraries/upload",
        headers={"X-Admin-Token": "ok"},
        files={"file": ("demo.csv", b"Name\nx\n", "text/csv")},
        data={"name": "My Library"},
    )
    assert resp.status_code == 200
    assert calls == {"price": 1, "mapping": 1, "wanding": 1, "map_matcher": 1}


def test_get_library_data_404_when_missing(monkeypatch):
    _setup_admin_auth(monkeypatch)
    monkeypatch.setattr("backend.tools.admin.repository.get_library_meta", lambda lib_id: None)
    client = TestClient(app)
    resp = client.get("/api/admin/libraries/999/data", headers={"X-Admin-Token": "ok"})
    assert resp.status_code == 404
    assert "库不存在" in resp.text


def test_update_library_display_name_success(monkeypatch):
    _setup_admin_auth(monkeypatch)
    monkeypatch.setattr(
        "backend.server.api.routes_admin.repository.update_library_display_name",
        lambda lib_id, name: True,
    )
    client = TestClient(app)
    resp = client.put(
        "/api/admin/libraries/1",
        headers={"X-Admin-Token": "ok", "Content-Type": "application/json"},
        json={"name": "新库名"},
    )
    assert resp.status_code == 200
    assert resp.json().get("ok") is True


def test_update_library_display_name_empty_400(monkeypatch):
    _setup_admin_auth(monkeypatch)
    client = TestClient(app)
    resp = client.put(
        "/api/admin/libraries/1",
        headers={"X-Admin-Token": "ok", "Content-Type": "application/json"},
        json={"name": "  "},
    )
    assert resp.status_code == 400


def test_create_library_row_invalidates_caches(monkeypatch):
    _setup_admin_auth(monkeypatch)
    monkeypatch.setattr(
        "backend.server.api.routes_admin.repository.resolve_library_meta",
        lambda lib_id: {"table_name": "dl_1_demo", "columns": [{"name": "name", "type": "TEXT"}]},
    )
    monkeypatch.setattr("backend.server.api.routes_admin.repository.insert_library_row", lambda *args, **kwargs: 7)
    calls: dict[str, int] = {"price": 0, "mapping": 0, "wanding": 0, "map_matcher": 0}
    monkeypatch.setattr(
        "backend.server.api.routes_admin.admin_cache.invalidate_price_library",
        lambda: calls.__setitem__("price", calls["price"] + 1),
    )
    monkeypatch.setattr(
        "backend.server.api.routes_admin.admin_cache.invalidate_product_mapping",
        lambda: calls.__setitem__("mapping", calls["mapping"] + 1),
    )
    monkeypatch.setattr(
        "backend.server.api.routes_admin.invalidate_wanding_cache",
        lambda: calls.__setitem__("wanding", calls["wanding"] + 1),
    )
    monkeypatch.setattr(
        "backend.server.api.routes_admin.invalidate_mapping_cache",
        lambda: calls.__setitem__("map_matcher", calls["map_matcher"] + 1),
    )
    client = TestClient(app)
    resp = client.post(
        "/api/admin/libraries/1/data",
        headers={"X-Admin-Token": "ok", "Content-Type": "application/json"},
        json={"name": "x"},
    )
    assert resp.status_code == 200
    assert resp.json().get("id") == 7
    assert calls == {"price": 1, "mapping": 1, "wanding": 1, "map_matcher": 1}


def test_drop_library_invalidates_caches(monkeypatch):
    _setup_admin_auth(monkeypatch)
    monkeypatch.setattr(
        "backend.server.api.routes_admin.repository.resolve_library_meta",
        lambda lib_id: {"table_name": "dl_1_demo", "columns": []},
    )
    monkeypatch.setattr("backend.server.api.routes_admin.repository.drop_library", lambda lib_id, table_name: True)
    calls: dict[str, int] = {"price": 0, "mapping": 0, "wanding": 0, "map_matcher": 0}
    monkeypatch.setattr(
        "backend.server.api.routes_admin.admin_cache.invalidate_price_library",
        lambda: calls.__setitem__("price", calls["price"] + 1),
    )
    monkeypatch.setattr(
        "backend.server.api.routes_admin.admin_cache.invalidate_product_mapping",
        lambda: calls.__setitem__("mapping", calls["mapping"] + 1),
    )
    monkeypatch.setattr(
        "backend.server.api.routes_admin.invalidate_wanding_cache",
        lambda: calls.__setitem__("wanding", calls["wanding"] + 1),
    )
    monkeypatch.setattr(
        "backend.server.api.routes_admin.invalidate_mapping_cache",
        lambda: calls.__setitem__("map_matcher", calls["map_matcher"] + 1),
    )
    client = TestClient(app)
    resp = client.delete("/api/admin/libraries/1", headers={"X-Admin-Token": "ok"})
    assert resp.status_code == 200
    assert resp.json().get("ok") is True
    assert calls == {"price": 1, "mapping": 1, "wanding": 1, "map_matcher": 1}


def test_schema_column_routes_error_mapping(monkeypatch):
    _setup_admin_auth(monkeypatch)
    monkeypatch.setattr(
        "backend.server.api.routes_admin.repository.resolve_library_meta",
        lambda lib_id: {"table_name": "dl_1_demo", "columns": [{"name": "material", "type": "TEXT"}]},
    )
    client = TestClient(app)

    monkeypatch.setattr(
        "backend.server.api.routes_admin.repository.add_library_column",
        lambda *args, **kwargs: (_ for _ in ()).throw(ValueError("invalid column type")),
    )
    resp = client.post(
        "/api/admin/libraries/1/columns",
        headers={"X-Admin-Token": "ok", "Content-Type": "application/json"},
        json={"name": "x", "type": "BAD"},
    )
    assert resp.status_code == 422

    monkeypatch.setattr(
        "backend.server.api.routes_admin.repository.add_library_column",
        lambda *args, **kwargs: (_ for _ in ()).throw(ValueError("invalid column name")),
    )
    resp = client.post(
        "/api/admin/libraries/1/columns",
        headers={"X-Admin-Token": "ok", "Content-Type": "application/json"},
        json={"name": "bad-name", "type": "TEXT"},
    )
    assert resp.status_code == 422

    monkeypatch.setattr(
        "backend.server.api.routes_admin.repository.drop_library_column",
        lambda *args, **kwargs: (_ for _ in ()).throw(KeyError("column not found")),
    )
    resp = client.delete("/api/admin/libraries/1/columns/missing", headers={"X-Admin-Token": "ok"})
    assert resp.status_code == 404

    monkeypatch.setattr(
        "backend.server.api.routes_admin.repository.rename_library_column",
        lambda *args, **kwargs: (_ for _ in ()).throw(RuntimeError("duplicate column")),
    )
    resp = client.patch(
        "/api/admin/libraries/1/columns/material",
        headers={"X-Admin-Token": "ok", "Content-Type": "application/json"},
        json={"new_name": "material2"},
    )
    assert resp.status_code == 500


def test_schema_mutation_routes_invalidate_caches(monkeypatch):
    _setup_admin_auth(monkeypatch)
    monkeypatch.setattr(
        "backend.server.api.routes_admin.repository.resolve_library_meta",
        lambda lib_id: {"table_name": "dl_1_demo", "columns": [{"name": "material", "type": "TEXT"}]},
    )
    monkeypatch.setattr("backend.server.api.routes_admin.repository.sync_library_schema", lambda *a, **k: ["new_col"])
    monkeypatch.setattr("backend.server.api.routes_admin.repository.add_library_column", lambda *a, **k: None)
    monkeypatch.setattr("backend.server.api.routes_admin.repository.drop_library_column", lambda *a, **k: None)
    monkeypatch.setattr("backend.server.api.routes_admin.repository.rename_library_column", lambda *a, **k: None)
    calls: dict[str, int] = {"price": 0, "mapping": 0, "wanding": 0, "map_matcher": 0}
    monkeypatch.setattr(
        "backend.server.api.routes_admin.admin_cache.invalidate_price_library",
        lambda: calls.__setitem__("price", calls["price"] + 1),
    )
    monkeypatch.setattr(
        "backend.server.api.routes_admin.admin_cache.invalidate_product_mapping",
        lambda: calls.__setitem__("mapping", calls["mapping"] + 1),
    )
    monkeypatch.setattr(
        "backend.server.api.routes_admin.invalidate_wanding_cache",
        lambda: calls.__setitem__("wanding", calls["wanding"] + 1),
    )
    monkeypatch.setattr(
        "backend.server.api.routes_admin.invalidate_mapping_cache",
        lambda: calls.__setitem__("map_matcher", calls["map_matcher"] + 1),
    )
    client = TestClient(app)
    assert client.post("/api/admin/libraries/1/sync-schema", headers={"X-Admin-Token": "ok"}).status_code == 200
    assert client.post(
        "/api/admin/libraries/1/columns",
        headers={"X-Admin-Token": "ok", "Content-Type": "application/json"},
        json={"name": "x", "type": "TEXT"},
    ).status_code == 200
    assert client.delete("/api/admin/libraries/1/columns/x", headers={"X-Admin-Token": "ok"}).status_code == 200
    assert client.patch(
        "/api/admin/libraries/1/columns/material",
        headers={"X-Admin-Token": "ok", "Content-Type": "application/json"},
        json={"new_name": "mat2"},
    ).status_code == 200
    assert calls == {"price": 4, "mapping": 4, "wanding": 4, "map_matcher": 4}


def test_schema_diff_returns_only_new_columns(monkeypatch):
    _setup_admin_auth(monkeypatch)
    monkeypatch.setattr(
        "backend.server.api.routes_admin.repository.resolve_library_meta",
        lambda lib_id: {
            "table_name": "dl_1_demo",
            "columns": [{"name": "material", "type": "TEXT", "original_name": "material"}],
        },
    )
    monkeypatch.setattr(
        "backend.server.api.routes_admin.repository.introspect_table_columns",
        lambda table_name: ["material", "price_a", "price_b"],
    )
    client = TestClient(app)
    resp = client.get("/api/admin/libraries/1/schema-diff", headers={"X-Admin-Token": "ok"})
    assert resp.status_code == 200
    payload = resp.json()
    assert payload["new_columns"] == [
        {"name": "price_a", "type": "TEXT", "original_name": "price_a"},
        {"name": "price_b", "type": "TEXT", "original_name": "price_b"},
    ]


def test_schema_diff_returns_empty_list_when_no_physical_columns(monkeypatch):
    _setup_admin_auth(monkeypatch)
    monkeypatch.setattr(
        "backend.server.api.routes_admin.repository.resolve_library_meta",
        lambda lib_id: {
            "table_name": "dl_1_demo",
            "columns": [{"name": "material", "type": "TEXT", "original_name": "material"}],
        },
    )
    monkeypatch.setattr(
        "backend.server.api.routes_admin.repository.introspect_table_columns",
        lambda table_name: [],
    )
    client = TestClient(app)
    resp = client.get("/api/admin/libraries/1/schema-diff", headers={"X-Admin-Token": "ok"})
    assert resp.status_code == 200
    assert resp.json() == {"new_columns": []}


def test_sync_schema_returns_merged_column_names(monkeypatch):
    _setup_admin_auth(monkeypatch)
    monkeypatch.setattr(
        "backend.server.api.routes_admin.repository.resolve_library_meta",
        lambda lib_id: {
            "table_name": "dl_1_demo",
            "columns": [{"name": "material", "type": "TEXT", "original_name": "material"}],
        },
    )
    monkeypatch.setattr(
        "backend.server.api.routes_admin.repository.sync_library_schema",
        lambda lib_id, table_name, columns: ["price_a", "price_b"],
    )
    client = TestClient(app)
    resp = client.post("/api/admin/libraries/1/sync-schema", headers={"X-Admin-Token": "ok"})
    assert resp.status_code == 200
    assert resp.json() == {"merged": ["price_a", "price_b"]}


def test_schema_diff_returns_404_when_library_missing(monkeypatch):
    _setup_admin_auth(monkeypatch)
    monkeypatch.setattr("backend.server.api.routes_admin.repository.resolve_library_meta", lambda lib_id: None)
    client = TestClient(app)
    resp = client.get("/api/admin/libraries/404/schema-diff", headers={"X-Admin-Token": "ok"})
    assert resp.status_code == 404
    assert "库不存在" in resp.text


def test_sync_schema_returns_404_when_library_missing(monkeypatch):
    _setup_admin_auth(monkeypatch)
    monkeypatch.setattr("backend.server.api.routes_admin.repository.resolve_library_meta", lambda lib_id: None)
    client = TestClient(app)
    resp = client.post("/api/admin/libraries/404/sync-schema", headers={"X-Admin-Token": "ok"})
    assert resp.status_code == 404
    assert "库不存在" in resp.text


def test_sync_schema_propagates_repository_failure(monkeypatch):
    _setup_admin_auth(monkeypatch)
    monkeypatch.setattr(
        "backend.server.api.routes_admin.repository.resolve_library_meta",
        lambda lib_id: {"table_name": "dl_1_demo", "columns": []},
    )
    monkeypatch.setattr(
        "backend.server.api.routes_admin.repository.sync_library_schema",
        lambda *args, **kwargs: (_ for _ in ()).throw(RuntimeError("sync failed")),
    )
    client = TestClient(app, raise_server_exceptions=False)
    resp = client.post("/api/admin/libraries/1/sync-schema", headers={"X-Admin-Token": "ok"})
    assert resp.status_code == 500
