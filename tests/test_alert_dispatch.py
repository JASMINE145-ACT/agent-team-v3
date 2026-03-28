# -*- coding: utf-8 -*-
"""alert_dispatch 与 wecom_group_service 行为（mock 网络）。"""
from unittest import mock

import pytest


def test_dispatch_out_of_stock_email_only(monkeypatch):
    from backend.tools.oos.services import alert_dispatch as ad

    monkeypatch.setattr(ad, "OOS_ALERT_MODE", "email_only")
    calls = {"email": 0, "wecom": 0}

    def fake_email(**kwargs):
        calls["email"] += 1
        return True

    def fake_wecom(**kwargs):
        calls["wecom"] += 1
        return True

    monkeypatch.setattr(ad, "send_out_of_stock_alert", fake_email)
    monkeypatch.setattr(ad, "is_wecom_group_configured", lambda: True)
    monkeypatch.setattr(ad, "send_wecom_out_of_stock_alert", fake_wecom)

    ok = ad.dispatch_out_of_stock_alert("A", "S", "k", 2, "f.xlsx")
    assert ok is True
    assert calls["email"] == 1
    assert calls["wecom"] == 0


def test_dispatch_out_of_stock_both_any_success(monkeypatch):
    from backend.tools.oos.services import alert_dispatch as ad

    monkeypatch.setattr(ad, "OOS_ALERT_MODE", "both")

    monkeypatch.setattr(ad, "send_out_of_stock_alert", lambda **kw: False)
    monkeypatch.setattr(ad, "is_wecom_group_configured", lambda: True)
    monkeypatch.setattr(ad, "send_wecom_out_of_stock_alert", lambda **kw: True)

    ok = ad.dispatch_out_of_stock_alert("A", "S", "k", 2, "f.xlsx")
    assert ok is True


def test_wecom_group_skips_when_not_configured(monkeypatch):
    from backend.tools.oos.services import wecom_group_service as wg

    monkeypatch.setattr(wg, "WECOM_GROUP_ALERT_ENABLED", False)
    monkeypatch.setattr(wg, "WECOM_GROUP_WEBHOOK_URL", None)
    assert wg.send_group_text_alert("hi") is False
