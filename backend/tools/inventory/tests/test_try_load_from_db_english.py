"""测试 _try_load_from_db 构建的 DataFrame 包含 Describrition_English 列。"""
from unittest.mock import patch


def test_db_df_includes_english_column():
    from backend.tools.inventory.services import wanding_fuzzy_matcher as wfm

    fake_rows = [
        {
            "material": "8010036482",
            "description": "给水用聚乙烯HDPE管",
            "description_english": "HDPE pipe for water supply",
            "product_type": "日标",
            "price_b": 90.0,
        }
    ]

    with patch("backend.tools.admin.cache.get_price_library_rows", return_value=fake_rows):
        df = wfm._try_load_from_db("B_QUOTE")

    assert df is not None
    assert "Describrition_English" in df.columns, "DataFrame 缺少 Describrition_English 列"
    assert df["Describrition_English"].iloc[0] == "HDPE pipe for water supply"
    assert df["Product_Type"].iloc[0] == "日标"


def test_db_df_english_empty_when_null():
    from backend.tools.inventory.services import wanding_fuzzy_matcher as wfm

    fake_rows = [
        {
            "material": "8010036482",
            "description": "给水用聚乙烯HDPE管",
            "description_english": None,
            "product_type": None,
            "price_b": 90.0,
        }
    ]

    with patch("backend.tools.admin.cache.get_price_library_rows", return_value=fake_rows):
        df = wfm._try_load_from_db("B_QUOTE")

    assert df["Describrition_English"].iloc[0] == ""
    assert df["Product_Type"].iloc[0] == ""
