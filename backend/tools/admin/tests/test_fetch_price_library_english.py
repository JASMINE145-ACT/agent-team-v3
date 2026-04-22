"""测试 fetch_all_price_library 返回 description_english 字段。"""
from unittest.mock import MagicMock, patch


def _make_row(**kw):
    """构造 mapping 行（模拟 sqlalchemy Row）。"""
    return dict(
        material="8010036482",
        description="给水用聚乙烯HDPE管",
        description_english="HDPE pipe for water supply",
        product_type="日标",
        price_a=100.0,
        price_b=90.0,
        price_c=80.0,
        price_d=70.0,
        **kw,
    )


def test_fetch_price_library_returns_description_english():
    """fetch_all_price_library 返回的每行必须含 description_english 字段。"""
    from backend.tools.admin import repository

    fake_rows = [_make_row()]
    mock_mappings = MagicMock()
    mock_mappings.all.return_value = [fake_rows[0]]
    mock_conn = MagicMock()
    mock_conn.execute.return_value.mappings.return_value = mock_mappings
    mock_engine = MagicMock()
    mock_engine.connect.return_value.__enter__ = lambda s: mock_conn
    mock_engine.connect.return_value.__exit__ = MagicMock(return_value=False)

    with patch.object(repository, "_get_engine", return_value=mock_engine):
        rows = repository.fetch_all_price_library()

    assert len(rows) == 1
    assert "description_english" in rows[0], "缺少 description_english 字段"
    assert rows[0]["product_type"] == "日标"


def test_fetch_price_library_invalid_product_type_ignored():
    """非法 product_type 不报错，忽略过滤并记录告警。"""
    from backend.tools.admin import repository

    mock_conn = MagicMock()
    mock_conn.execute.side_effect = [
        MagicMock(scalar=MagicMock(return_value=1)),
        MagicMock(mappings=MagicMock(return_value=MagicMock(all=MagicMock(return_value=[_make_row()])))),
    ]
    mock_engine = MagicMock()
    mock_engine.connect.return_value.__enter__ = lambda s: mock_conn
    mock_engine.connect.return_value.__exit__ = MagicMock(return_value=False)

    with (
        patch.object(repository, "_get_engine", return_value=mock_engine),
        patch.object(repository.logger, "warning") as mock_warning,
    ):
        result = repository.fetch_price_library(product_type="abc")

    assert result["total"] == 1
    assert mock_warning.called
