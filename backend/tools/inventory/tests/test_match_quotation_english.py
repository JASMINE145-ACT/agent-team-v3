"""测试 match_quotation_english 调用 match_english_candidates 并透传结果。"""
from unittest.mock import patch


def test_delegates_to_match_english_candidates():
    from backend.tools.inventory.services.match_and_inventory import match_quotation_english

    fake_candidates = [
        {"code": "AAA", "matched_name": "聚乙烯管", "description_english": "HDPE pipe AW", "unit_price": 90.0, "source": "英文字段匹配"},
    ]

    with patch(
        "backend.tools.inventory.services.wanding_fuzzy_matcher.match_english_candidates",
        return_value=fake_candidates,
    ) as mock_fn:
        result = match_quotation_english("HDPE pipe AW", customer_level="B")

    mock_fn.assert_called_once_with(
        "HDPE pipe AW",
        customer_level="B",
        price_library_path=None,
        product_type=None,
    )
    assert result == fake_candidates


def test_returns_empty_when_no_candidates():
    from backend.tools.inventory.services.match_and_inventory import match_quotation_english

    with patch(
        "backend.tools.inventory.services.wanding_fuzzy_matcher.match_english_candidates",
        return_value=[],
    ):
        result = match_quotation_english("no match query")

    assert result == []
