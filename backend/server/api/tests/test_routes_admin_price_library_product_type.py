"""测试 admin price-library 路由对 product_type 参数透传。"""
from unittest.mock import patch

import pytest


@pytest.mark.asyncio
async def test_list_price_library_passes_product_type():
    from backend.server.api import routes_admin

    fake = {"items": [], "total": 0}
    with patch.object(routes_admin.repository, "fetch_price_library", return_value=fake) as mock_fetch:
        result = await routes_admin.list_price_library(
            q="ppr",
            page=2,
            page_size=20,
            product_type="国标",
            _=None,
        )

    assert result == fake
    mock_fetch.assert_called_once_with(q="ppr", page=2, page_size=20, product_type="国标")
