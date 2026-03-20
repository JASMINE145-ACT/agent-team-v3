from backend.tools.inventory.services import wanding_fuzzy_matcher as matcher


def test_split_tokens_keeps_fraction_inch_token():
    tokens = matcher._split_tokens('PVC-U AW 3/4" 一级报价价格')
    assert '3/4"' in tokens
    assert "3" not in tokens
    assert "4" not in tokens


def test_expand_unit_tokens_fraction_inch_maps_to_dn20():
    expanded = matcher._expand_unit_tokens('3/4"')
    assert "20" in expanded
    assert "dn20" in expanded
