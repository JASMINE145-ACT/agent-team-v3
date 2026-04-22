"""测试 _load_one_sheet 读出 Describrition_English 列。"""
from unittest.mock import MagicMock


def _make_ws_row(no, material, desc_cn, desc_en, product_type, *prices):
    """构造模拟 worksheet 行（每格有 .value 属性）。"""
    values = [no, material, desc_cn, desc_en, product_type] + list(prices)
    cells = []
    for v in values:
        c = MagicMock()
        c.value = v
        cells.append(c)
    return cells


def test_load_one_sheet_includes_english():
    from backend.tools.inventory.services.wanding_fuzzy_matcher import _load_one_sheet

    ws = MagicMock()
    ws.iter_rows.return_value = [
        _make_ws_row(1, "8010036482", "给水用聚乙烯HDPE管", "HDPE pipe for water supply", "日标",
                     *([None] * 6), 90.0),  # price_col=10 → index 10
    ]
    rows = _load_one_sheet(ws, price_col=10)
    assert len(rows) == 1
    assert "Describrition_English" in rows[0], "缺少 Describrition_English"
    assert rows[0]["Describrition_English"] == "HDPE pipe for water supply"
    assert rows[0]["Product_Type"] == "日标"


def test_load_one_sheet_english_empty_when_missing():
    """cells[3] 为 None 时 Describrition_English 为空字符串，不报错。"""
    from backend.tools.inventory.services.wanding_fuzzy_matcher import _load_one_sheet

    ws = MagicMock()
    ws.iter_rows.return_value = [
        _make_ws_row(1, "8010036482", "给水用聚乙烯HDPE管", None, None,
                     *([None] * 6), 90.0),
    ]
    rows = _load_one_sheet(ws, price_col=10)
    assert rows[0]["Describrition_English"] == ""
    assert rows[0]["Product_Type"] == ""
