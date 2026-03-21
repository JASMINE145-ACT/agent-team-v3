from backend.tools.inventory.services import wanding_fuzzy_matcher as matcher
import pandas as pd
import re


def test_split_tokens_keeps_fraction_inch_token():
    tokens = matcher._split_tokens('PVC-U AW 3/4" 一级报价价格')
    assert '3/4"' in tokens
    assert "3" not in tokens
    assert "4" not in tokens


def test_expand_unit_tokens_fraction_inch_maps_to_dn20():
    expanded = matcher._expand_unit_tokens('3/4"')
    assert "20" in expanded
    assert "dn20" in expanded


def test_search_fuzzy_prefers_exact_inch_over_dn_equivalent():
    df = pd.DataFrame(
        [
            {
                "Material": "A001",
                "Describrition": '印尼(日标)PVC-U给水扩直口管(AW给水系列)白色 DN20(1/2") 4M/根 联塑',
                "unit_price": 100.0,
            },
            {
                "Material": "A002",
                "Describrition": '印尼(日标)PVC-U给水扩直口管(AW给水系列)白色 DN20(3/4") 4M/根 联塑',
                "unit_price": 120.0,
            },
        ]
    )
    df["norm_text"] = df["Describrition"].apply(matcher._normalize)
    df["spec_tokens"] = df["Describrition"].apply(
        lambda t: frozenset(tok for tok in matcher._split_tokens(t) if re.search(r"\d", tok))
    )
    results = matcher.search_fuzzy(df, 'PVC-U AW 3/4"')
    assert len(results) >= 1
    matched_names = [r[0]["matched_name"] for r in results]
    assert any('3/4"' in n for n in matched_names)
    assert all('1/2"' not in n for n in matched_names)
