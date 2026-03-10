"""验证 reset_for_testing 使单例可重新初始化。"""


def test_deps_reset_clears_singleton():
    from backend.server.api import deps
    deps.reset_for_testing()
    # reset 后 _oos_data_service 应为 None
    assert deps._oos_data_service is None


def test_tools_reset_clears_cache():
    from backend.agent import tools
    # 先触发缓存构建
    tools.ALL_TOOLS = ["dummy"]  # 模拟已缓存
    tools.reset_for_testing()
    assert tools.ALL_TOOLS is None


def test_tools_rebuild_after_reset():
    from backend.agent import tools
    tools.reset_for_testing()
    result = tools.get_all_tools()
    assert result is not None
    assert len(result) > 0
