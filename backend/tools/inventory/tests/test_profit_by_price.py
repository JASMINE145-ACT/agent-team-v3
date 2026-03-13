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

