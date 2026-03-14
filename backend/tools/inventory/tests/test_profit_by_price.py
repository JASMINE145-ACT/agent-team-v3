import json

from backend.tools.inventory.services import inventory_agent_tools
from backend.tools.inventory.services.wanding_fuzzy_matcher import (
    _compute_profit_for_price,
    normalize_price,
)


def test_get_profit_by_price_by_code_single_row_exact_match(monkeypatch):
    """给出 code+price 时，工具能返回包含 rows 的结果结构。内部查库逻辑通过 monkeypatch 隔离。"""

    def fake_get_profit_rows_by_code(code, price, path):
        return [
            {
                "code": code,
                "name": "直通(管箍)PVC-U排水配件白色 dn50",
                "matched_price_level": "B_QUOTE",
                "matched_price": price,
                "matched_profit": 0.23,
                "all_levels": [
                    {"level": "A_QUOTE", "price": 9500.0, "profit": 0.3, "level_display": "（二级代理）A级别 报单价格"},
                    {"level": "B_QUOTE", "price": price, "profit": 0.23, "level_display": "（一级代理）B级别 报单价格"},
                ],
            }
        ]

    monkeypatch.setattr(
        "backend.tools.inventory.services.wanding_fuzzy_matcher.get_profit_rows_by_code",
        fake_get_profit_rows_by_code,
    )

    out = inventory_agent_tools._execute_get_profit_by_price({"code": "8020020755", "price": 10001})
    assert out.get("success") is True
    data = out.get("data") or {}
    rows = data.get("rows") or []
    assert len(rows) == 1
    assert rows[0]["matched_price_level"] == "B_QUOTE"
    assert rows[0]["matched_profit"] == 0.23


def test_get_profit_by_price_requires_price():
    out = inventory_agent_tools._execute_get_profit_by_price({"code": "8020020755"})
    assert out.get("success") is True
    assert "price" in (out.get("result") or "")


def test_normalize_price_basic_and_thousand_separators():
    assert normalize_price("7858") == 7858.0
    assert normalize_price("7858.0") == 7858.0
    assert normalize_price("7,858.00") == 7858.0
    assert normalize_price("7，858.00") == 7858.0
    assert normalize_price("  7 858.00 元") == 7858.0


def test_normalize_price_auto_fix_multiple_dots():
    # auto_fix：保留最后一个点作为小数点，其余视作分隔符
    assert normalize_price("7.858.0") == 7858.0


def test_normalize_price_invalid_formats_raise():
    import pytest

    with pytest.raises(ValueError):
        normalize_price("abc")


def test_compute_profit_for_price_exact_match_only(monkeypatch):
    import pandas as pd

    # 构造一行虚拟数据：仅 B_QUOTE 与价格 7858.0 精确匹配
    row_values = [None] * 19
    # Material 在真实表中的列索引为 1，Describrition 为 2，这里仅用到价格列
    row_values[8] = 9000.0  # A_QUOTE
    row_values[10] = 7858.0  # B_QUOTE
    row_values[12] = 7000.0  # C_QUOTE
    row_values[14] = 6500.0  # D_QUOTE
    row_values[16] = 6400.0  # D_LOW
    row_values[18] = 6000.0  # E_QUOTE
    row = pd.Series(row_values)

    out_exact = _compute_profit_for_price(row, 7858.0)
    assert out_exact["matched_price_level"] == "B_QUOTE"
    assert out_exact["matched_price"] == 7858.0

    # 不存在精确匹配价格时，不再返回最近档位，matched_* 应为 None
    out_no_match = _compute_profit_for_price(row, 7800.0)
    assert out_no_match["matched_price_level"] is None
    assert out_no_match["matched_price"] is None


def test_get_profit_by_price_no_match(monkeypatch):
    def fake_get_profit_rows_by_code(code, price, path):
        return []

    monkeypatch.setattr(
        "backend.tools.inventory.services.wanding_fuzzy_matcher.get_profit_rows_by_code",
        fake_get_profit_rows_by_code,
    )
    out = inventory_agent_tools._execute_get_profit_by_price({"code": "NONEXIST", "price": 1000})
    assert out.get("success") is True
    assert "未在万鼎价格库中找到" in (out.get("result") or "")


# --- data.items + input_index 批量逐条结构化（1:1）---

VALID_SKIP_REASONS = {"missing_code", "missing_price", "invalid_price"}


def test_batch_data_items_len_equals_input_len(monkeypatch):
    """data.items 与输入严格 1:1：len(data.items) == len(input items)。"""
    def fake_get_profit_rows_by_code(code, price, path):
        if code == "MATCH":
            return [{"code": code, "name": "Matched Product", "matched_price_level": "B_QUOTE", "matched_price": price, "matched_profit": 0.1, "all_levels": []}]
        if code == "NOTFOUND":
            return []
        return [{"code": code, "name": "", "matched_price_level": None, "matched_price": None, "matched_profit": None, "all_levels": []}]

    monkeypatch.setattr(
        "backend.tools.inventory.services.wanding_fuzzy_matcher.get_profit_rows_by_code",
        fake_get_profit_rows_by_code,
    )
    items = [
        {"code": "MATCH", "price": 100},
        {"code": "NOTFOUND", "price": 200},
        {"code": "MISS"},  # missing price -> skipped
        {"code": "", "price": 300},  # missing code -> skipped
    ]
    out = inventory_agent_tools._execute_get_profit_by_price_batch({"items": items})
    assert out.get("success") is True
    data = out.get("data") or {}
    data_items = data.get("items") or []
    assert len(data_items) == len(items), "data.items 必须与输入 1:1"


def test_batch_data_items_input_index_and_status(monkeypatch):
    """data.items 每项含 input_index（连续、与输入下标一致）与 item_status；skip_reason 仅三种枚举。"""
    def fake_get_profit_rows_by_code(code, price, path):
        if code == "MATCH":
            return [{"code": code, "name": "Product", "matched_price_level": "B_QUOTE", "matched_price": price, "matched_profit": 0.1, "all_levels": []}]
        if code == "NOTFOUND":
            return []
        return [{"code": code, "name": "", "matched_price_level": None, "matched_price": None, "matched_profit": None, "all_levels": []}]

    monkeypatch.setattr(
        "backend.tools.inventory.services.wanding_fuzzy_matcher.get_profit_rows_by_code",
        fake_get_profit_rows_by_code,
    )
    items = [
        {"code": "MATCH", "price": 100},
        {"code": "NOTFOUND", "price": 200},
        {"code": "NOPRICE"},  # missing price
        {"code": "", "price": 1},  # missing code
    ]
    out = inventory_agent_tools._execute_get_profit_by_price_batch({"items": items})
    data_items = (out.get("data") or {}).get("items") or []
    assert len(data_items) == 4
    assert data_items[0]["input_index"] == 0 and data_items[0]["item_status"] == "matched"
    assert data_items[1]["input_index"] == 1 and data_items[1]["item_status"] == "code_not_found"
    assert data_items[2]["input_index"] == 2 and data_items[2]["item_status"] == "skipped"
    assert data_items[3]["input_index"] == 3 and data_items[3]["item_status"] == "skipped"
    for it in data_items:
        if it.get("item_status") == "skipped":
            assert it.get("skip_reason") in VALID_SKIP_REASONS
    assert data_items[2].get("skip_reason") == "missing_price"
    assert data_items[3].get("skip_reason") == "missing_code"


def test_batch_data_items_matched_has_name_and_level(monkeypatch):
    """matched 项含 name（必填）、matched_price、matched_profit、matched_price_level。"""
    def fake_get_profit_rows_by_code(code, price, path):
        return [{"code": code, "name": "外螺纹管接头", "matched_price_level": "B_QUOTE", "matched_price": price, "matched_profit": 0.1, "all_levels": []}]

    monkeypatch.setattr(
        "backend.tools.inventory.services.wanding_fuzzy_matcher.get_profit_rows_by_code",
        fake_get_profit_rows_by_code,
    )
    out = inventory_agent_tools._execute_get_profit_by_price_batch({"items": [{"code": "A001", "price": 85001}]})
    data_items = (out.get("data") or {}).get("items") or []
    assert len(data_items) == 1
    it = data_items[0]
    assert it["item_status"] == "matched"
    assert "name" in it
    assert it["name"] == "外螺纹管接头"
    assert it.get("matched_price_level") == "B_QUOTE"
    assert it.get("matched_price") == 85001
    assert it.get("matched_profit") == 0.1
    assert "matched_price_level_display" not in it

