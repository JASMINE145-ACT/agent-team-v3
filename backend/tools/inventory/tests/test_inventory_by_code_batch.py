from backend.tools.inventory.models import Item
from backend.tools.inventory.services import inventory_agent_tools


class _FakeSqlAgent:
    def format_response(self, items):
        return "mocked_sql_rows"


def test_get_inventory_by_code_batch_includes_per_input_rows_and_item_summary(monkeypatch):
    class _FakeTable:
        def get_items_by_codes(self, codes):
            return [
                Item(
                    item_no="8010072359",
                    item_name="#J9 Female Thread Elbow",
                    item_type="Inventory",
                    unit="PCS",
                    qty_warehouse=-167.0,
                    qty_available=0.0,
                ),
                Item(
                    item_no="8010071401",
                    item_name="#G1 PPR 90 Elbow",
                    item_type="Inventory",
                    unit="PCS",
                    qty_warehouse=114.0,
                    qty_available=0.0,
                ),
            ]

    monkeypatch.setattr(inventory_agent_tools, "_get_table_agent", lambda: _FakeTable())
    monkeypatch.setattr(inventory_agent_tools, "_get_sql_agent", lambda: _FakeSqlAgent())

    out = inventory_agent_tools._execute_get_inventory_by_code_batch(
        {"codes": ["8010072359", "8010071401", "8010062266"]}
    )
    assert out.get("success") is True

    data_items = ((out.get("data") or {}).get("items") or [])
    assert len(data_items) == 3
    assert data_items[0]["item_status"] == "found"
    assert data_items[0]["item_summary"]["item_no"] == "8010072359"
    assert data_items[1]["item_status"] == "found"
    assert data_items[1]["item_summary"]["qty_warehouse"] == 114.0
    assert data_items[2]["item_status"] == "not_found"

    result = out.get("result") or ""
    assert "| 1 | 8010072359 | found |" in result
    assert "| 2 | 8010071401 | found |" in result
    assert "| 3 | 8010062266 | not_found |" in result


def test_get_inventory_by_code_batch_accepts_dict_items_for_code_mapping(monkeypatch):
    class _FakeTable:
        def get_items_by_codes(self, codes):
            return [
                {
                    "code": "8020012382",
                    "name": "PVC Drain Pipe",
                    "qty_warehouse": 300.0,
                    "qty_available": 280.0,
                    "unit": "PCS",
                    "type": "Inventory",
                }
            ]

    monkeypatch.setattr(inventory_agent_tools, "_get_table_agent", lambda: _FakeTable())
    monkeypatch.setattr(inventory_agent_tools, "_get_sql_agent", lambda: _FakeSqlAgent())

    out = inventory_agent_tools._execute_get_inventory_by_code_batch(
        {"codes": ["8020012382", "8020022823"]}
    )
    assert out.get("success") is True
    data_items = ((out.get("data") or {}).get("items") or [])
    assert data_items[0]["item_status"] == "found"
    assert data_items[0]["item_summary"]["item_name"] == "PVC Drain Pipe"
    assert data_items[1]["item_status"] == "not_found"
