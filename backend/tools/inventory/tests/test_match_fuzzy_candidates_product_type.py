"""测试 match_fuzzy_candidates 的 Product_Type 严格过滤。"""
import pandas as pd
from unittest.mock import patch


def test_match_fuzzy_candidates_filters_by_product_type():
    from backend.tools.inventory.services.wanding_fuzzy_matcher import match_fuzzy_candidates

    df = pd.DataFrame(
        [
            {
                "Material": "A",
                "Describrition": "PPR冷热水直管S5(1.0MPa)印尼绿色 dn40 (1-1/4\") 4M/根 联塑",
                "Describrition_English": "",
                "Product_Type": "日标",
                "unit_price": 100.0,
                "norm_text": "ppr冷热水直管s5(1.0mpa)印尼绿色 dn40 (1-1/4\") 4m/根 联塑".lower(),
                "spec_tokens": frozenset({"40", "1-1/4", "1.0mpa"}),
            },
            {
                "Material": "B",
                "Describrition": "PPR冷热水直管S5(1.0MPa)印尼绿色 dn40 (1-1/4\") 4M/根 联塑",
                "Describrition_English": "",
                "Product_Type": "国标",
                "unit_price": 200.0,
                "norm_text": "ppr冷热水直管s5(1.0mpa)印尼绿色 dn40 (1-1/4\") 4m/根 联塑".lower(),
                "spec_tokens": frozenset({"40", "1-1/4", "1.0mpa"}),
            },
        ]
    )
    with patch(
        "backend.tools.inventory.services.wanding_fuzzy_matcher._get_cached_df",
        return_value=df,
    ):
        result = match_fuzzy_candidates("PPR dn40", product_type="国标", min_score=0)

    assert len(result) == 1
    assert result[0]["code"] == "B"
    assert result[0]["Product_Type"] == "国标"


def test_match_fuzzy_candidates_empty_after_product_type_filter_logs_warning():
    from backend.tools.inventory.services import wanding_fuzzy_matcher as wfm

    df = pd.DataFrame(
        [
            {
                "Material": "A",
                "Describrition": "PPR冷热水直管S5(1.0MPa)印尼绿色 dn40 (1-1/4\") 4M/根 联塑",
                "Describrition_English": "",
                "Product_Type": "日标",
                "unit_price": 100.0,
                "norm_text": "ppr冷热水直管s5(1.0mpa)印尼绿色 dn40 (1-1/4\") 4m/根 联塑".lower(),
                "spec_tokens": frozenset({"40", "1-1/4", "1.0mpa"}),
            },
        ]
    )
    with (
        patch("backend.tools.inventory.services.wanding_fuzzy_matcher._get_cached_df", return_value=df),
        patch.object(wfm.logger, "warning") as mock_warning,
    ):
        result = wfm.match_fuzzy_candidates("PPR dn40", product_type="国标")

    assert result == []
    mock_warning.assert_called()


def test_match_fuzzy_candidates_strict_when_product_type_column_missing():
    from backend.tools.inventory.services.wanding_fuzzy_matcher import match_fuzzy_candidates

    df = pd.DataFrame(
        [
            {
                "Material": "A",
                "Describrition": "PPR冷热水直管S5(1.0MPa)印尼绿色 dn40 (1-1/4\") 4M/根 联塑",
                "Describrition_English": "",
                "unit_price": 100.0,
                "norm_text": "ppr冷热水直管s5(1.0mpa)印尼绿色 dn40 (1-1/4\") 4m/根 联塑".lower(),
                "spec_tokens": frozenset({"40", "1-1/4", "1.0mpa"}),
            },
        ]
    )
    with patch(
        "backend.tools.inventory.services.wanding_fuzzy_matcher._get_cached_df",
        return_value=df,
    ):
        result = match_fuzzy_candidates("PPR dn40", product_type="国标")

    assert result == []
