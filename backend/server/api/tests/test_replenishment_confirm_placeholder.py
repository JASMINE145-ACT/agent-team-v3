"""
补货确认占位开关：确保未设置 REPLENISHMENT_CONFIRM_REAL_INVENTORY 时不会调用库存工具。
与 routes.replenishment_drafts_confirm 的 if/else 分支一致：仅当 env 为 1/true/yes 时走真实调用分支。
"""
import os
import pytest


def test_replenishment_confirm_use_real_tool_default_is_false(monkeypatch):
    """默认（未设置环境变量）时 _replenishment_confirm_use_real_tool() 为 False，确认接口走占位分支，不调用 execute_inventory_tool。"""
    monkeypatch.delenv("REPLENISHMENT_CONFIRM_REAL_INVENTORY", raising=False)
    from backend.server.api.routes import _replenishment_confirm_use_real_tool
    assert _replenishment_confirm_use_real_tool() is False


def test_replenishment_confirm_use_real_tool_empty_string_is_false(monkeypatch):
    """空字符串视为未开启。"""
    monkeypatch.setenv("REPLENISHMENT_CONFIRM_REAL_INVENTORY", "")
    from backend.server.api.routes import _replenishment_confirm_use_real_tool
    assert _replenishment_confirm_use_real_tool() is False


def test_replenishment_confirm_use_real_tool_1_is_true(monkeypatch):
    """REPLENISHMENT_CONFIRM_REAL_INVENTORY=1 时为 True，走真实调用分支。"""
    monkeypatch.setenv("REPLENISHMENT_CONFIRM_REAL_INVENTORY", "1")
    from backend.server.api.routes import _replenishment_confirm_use_real_tool
    assert _replenishment_confirm_use_real_tool() is True


@pytest.mark.parametrize("val", ("true", "TRUE", "yes", "YES"))
def test_replenishment_confirm_use_real_tool_true_yes(monkeypatch, val):
    """true / yes（不区分大小写）均为 True。"""
    monkeypatch.setenv("REPLENISHMENT_CONFIRM_REAL_INVENTORY", val)
    from backend.server.api.routes import _replenishment_confirm_use_real_tool
    assert _replenishment_confirm_use_real_tool() is True
