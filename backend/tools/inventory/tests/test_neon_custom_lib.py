"""
自定义库 Neon 集成：_find_col + wanding/mapping matcher 扩展的单元测试。
不依赖真实 DB 连接——全部 mock repository 函数。
"""

from __future__ import annotations

from unittest.mock import patch


def _find_col(columns: list[dict], *keywords: str) -> str | None:
    for col in columns:
        name = (col.get("name") or "").lower()
        if all(kw.lower() in name for kw in keywords):
            return col["name"]
    return None


WANDING_COLS = [
    {"name": "NO", "type": "TEXT"},
    {"name": "Material", "type": "TEXT"},
    {"name": "Describrition", "type": "TEXT"},
    {"name": "（二级代理）A级别_报单价格", "type": "NUMERIC"},
    {"name": "（一级代理）B级别_报单价格", "type": "NUMERIC"},
    {"name": "（聚万大客户）C级别报单价格", "type": "NUMERIC"},
    {"name": "（青山大客户）D级别_报单价格", "type": "NUMERIC"},
]

MAPPING_COLS = [
    {"name": "Nama_Permintaan_Barang_询价货物名称", "type": "TEXT"},
    {"name": "Spesifikasi_dan_Model_Permintaan_Barang_询价规格型号", "type": "TEXT"},
    {"name": "Product_number_产品编号", "type": "TEXT"},
    {"name": "Nama_Penawaran_Barang_报价名称", "type": "TEXT"},
]


def test_find_col_material() -> None:
    assert _find_col(WANDING_COLS, "Material") == "Material"


def test_find_col_description() -> None:
    assert _find_col(WANDING_COLS, "Describrition") == "Describrition"


def test_find_col_price_a() -> None:
    assert _find_col(WANDING_COLS, "A级别", "报单价格") == "（二级代理）A级别_报单价格"


def test_find_col_price_b() -> None:
    assert _find_col(WANDING_COLS, "B级别", "报单价格") == "（一级代理）B级别_报单价格"


def test_find_col_price_c() -> None:
    assert _find_col(WANDING_COLS, "C级别", "报单价格") == "（聚万大客户）C级别报单价格"


def test_find_col_price_d() -> None:
    assert _find_col(WANDING_COLS, "D级别", "报单价格") == "（青山大客户）D级别_报单价格"


def test_find_col_not_found() -> None:
    assert _find_col(WANDING_COLS, "不存在的列") is None


def test_find_col_inquiry_name() -> None:
    assert _find_col(MAPPING_COLS, "询价货物名称") == "Nama_Permintaan_Barang_询价货物名称"


def test_find_col_spec() -> None:
    assert _find_col(MAPPING_COLS, "询价规格型号") == "Spesifikasi_dan_Model_Permintaan_Barang_询价规格型号"


def test_find_col_product_code() -> None:
    assert _find_col(MAPPING_COLS, "产品编号") == "Product_number_产品编号"


def test_find_col_quotation_name() -> None:
    assert _find_col(MAPPING_COLS, "报价名称") == "Nama_Penawaran_Barang_报价名称"


def test_wanding_loads_from_custom_library_when_fixed_table_empty() -> None:
    from backend.tools.inventory.services.wanding_fuzzy_matcher import _try_load_from_custom_library

    fake_libs = [
        {
            "id": 3,
            "name": "万鼎价格库_管材与国标管件_标准格式",
            "table_name": "dl_3_wanding",
            "columns": WANDING_COLS,
            "row_count": 2,
        }
    ]
    fake_rows = [
        {
            "NO": "001",
            "Material": "M001",
            "Describrition": "DN25 弯头",
            "（二级代理）A级别_报单价格": 10.0,
            "（一级代理）B级别_报单价格": 12.0,
            "（聚万大客户）C级别报单价格": 14.0,
            "（青山大客户）D级别_报单价格": 16.0,
        },
        {
            "NO": "002",
            "Material": "M002",
            "Describrition": "DN20 管卡",
            "（二级代理）A级别_报单价格": 5.0,
            "（一级代理）B级别_报单价格": 6.0,
            "（聚万大客户）C级别报单价格": 7.0,
            "（青山大客户）D级别_报单价格": 8.0,
        },
    ]

    with (
        patch("backend.tools.admin.repository.list_libraries", return_value=fake_libs),
        patch("backend.tools.admin.repository.fetch_all_library_rows", return_value=fake_rows),
    ):
        df = _try_load_from_custom_library("B")

    assert df is not None
    assert len(df) == 2
    assert list(df.columns) >= ["Material", "Describrition", "unit_price"]
    assert df.iloc[0]["unit_price"] == 12.0
    assert df.iloc[0]["Describrition"] == "DN25 弯头"


def test_wanding_custom_library_returns_none_when_no_match() -> None:
    from backend.tools.inventory.services.wanding_fuzzy_matcher import _try_load_from_custom_library

    with patch(
        "backend.tools.admin.repository.list_libraries",
        return_value=[{"id": 1, "name": "其他库", "table_name": "dl_1_other", "columns": [], "row_count": 0}],
    ):
        result = _try_load_from_custom_library("B")
    assert result is None


def test_wanding_custom_library_supports_quote_level_input() -> None:
    from backend.tools.inventory.services.wanding_fuzzy_matcher import _try_load_from_custom_library

    fake_libs = [
        {"id": 3, "name": "万鼎价格库", "table_name": "dl_3_wanding", "columns": WANDING_COLS, "row_count": 1}
    ]
    fake_rows = [
        {
            "Material": "M003",
            "Describrition": "DN32 三通",
            "（一级代理）B级别_报单价格": 18.0,
        }
    ]
    with (
        patch("backend.tools.admin.repository.list_libraries", return_value=fake_libs),
        patch("backend.tools.admin.repository.fetch_all_library_rows", return_value=fake_rows),
    ):
        df = _try_load_from_custom_library("B_QUOTE")
    assert df is not None
    assert float(df.iloc[0]["unit_price"]) == 18.0


def test_mapping_loads_from_custom_library_when_fixed_table_empty() -> None:
    from backend.tools.inventory.services.mapping_table_matcher import _try_load_from_mapping_custom_library

    fake_libs = [
        {
            "id": 5,
            "name": "整理产品(2)",
            "table_name": "dl_5_mapping",
            "columns": MAPPING_COLS,
            "row_count": 2,
        }
    ]
    fake_rows = [
        {
            "Nama_Permintaan_Barang_询价货物名称": "弯头",
            "Spesifikasi_dan_Model_Permintaan_Barang_询价规格型号": "DN25",
            "Product_number_产品编号": "P001",
            "Nama_Penawaran_Barang_报价名称": "90度弯头DN25",
        },
        {
            "Nama_Permintaan_Barang_询价货物名称": "管卡",
            "Spesifikasi_dan_Model_Permintaan_Barang_询价规格型号": "DN20",
            "Product_number_产品编号": "P002",
            "Nama_Penawaran_Barang_报价名称": "管卡DN20",
        },
    ]

    with (
        patch("backend.tools.admin.repository.list_libraries", return_value=fake_libs),
        patch("backend.tools.admin.repository.fetch_all_library_rows", return_value=fake_rows),
    ):
        df = _try_load_from_mapping_custom_library()

    assert df is not None
    assert len(df) == 2
    assert "search_text" in df.columns
    assert df.iloc[0]["code"] == "P001"
    assert "弯头" in df.iloc[0]["search_text"]


def test_mapping_custom_library_returns_none_when_no_match() -> None:
    from backend.tools.inventory.services.mapping_table_matcher import _try_load_from_mapping_custom_library

    with patch(
        "backend.tools.admin.repository.list_libraries",
        return_value=[{"id": 1, "name": "其他库", "table_name": "dl_1_other", "columns": [], "row_count": 0}],
    ):
        result = _try_load_from_mapping_custom_library()
    assert result is None
