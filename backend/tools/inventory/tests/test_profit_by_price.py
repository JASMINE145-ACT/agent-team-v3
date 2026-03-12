import json

from backend.tools.inventory.services import inventory_agent_tools


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

