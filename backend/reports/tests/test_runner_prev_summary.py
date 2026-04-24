from backend.reports.runner import _fetch_prev_summary


def test_fetch_prev_summary_returns_none_when_no_conn_data():
    """验证无数据时返回 None（通过 mock conn）。"""

    class FakeCursor:
        def __enter__(self):
            return self

        def __exit__(self, *args):
            return None

        def execute(self, *args):
            return None

        def fetchone(self):
            return None

    class FakeConn:
        def cursor(self):
            return FakeCursor()

    result = _fetch_prev_summary(FakeConn(), "sales_weekly_basic", "2026-04-14")
    assert result is None


def test_fetch_prev_summary_returns_dict_payload():
    class FakeCursor:
        def __enter__(self):
            return self

        def __exit__(self, *args):
            return None

        def execute(self, *args):
            return None

        def fetchone(self):
            return ({"total_sales_amount": 1000, "total_order_count": 10},)

    class FakeConn:
        def cursor(self):
            return FakeCursor()

    result = _fetch_prev_summary(FakeConn(), "sales_weekly_basic", "2026-04-14")
    assert isinstance(result, dict)
    assert result["total_sales_amount"] == 1000
    assert result["total_order_count"] == 10


def test_fetch_prev_summary_returns_none_for_non_dict_payload():
    class FakeCursor:
        def __enter__(self):
            return self

        def __exit__(self, *args):
            return None

        def execute(self, *args):
            return None

        def fetchone(self):
            return ('{"total_sales_amount": 1000}',)

    class FakeConn:
        def cursor(self):
            return FakeCursor()

    result = _fetch_prev_summary(FakeConn(), "sales_weekly_basic", "2026-04-14")
    assert result is None


def test_fetch_prev_summary_returns_none_for_empty_dict_payload():
    class FakeCursor:
        def __enter__(self):
            return self

        def __exit__(self, *args):
            return None

        def execute(self, *args):
            return None

        def fetchone(self):
            return ({},)

    class FakeConn:
        def cursor(self):
            return FakeCursor()

    result = _fetch_prev_summary(FakeConn(), "sales_weekly_basic", "2026-04-14")
    assert result is None
