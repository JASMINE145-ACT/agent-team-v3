"""DN + 英寸混写时是否启用「英寸精确优先」剪切。"""

import pytest

from backend.tools.inventory.services.wanding_fuzzy_matcher import (
    _should_apply_inch_exact_priority,
)


def test_dn20_with_half_inch_conflicts_no_strict_inch_filter():
    assert (
        _should_apply_inch_exact_priority({"dn20", '1/2"', "波纹管"}, {'1/2"'})
        is False
    )


def test_dn20_with_three_quarter_ok():
    assert (
        _should_apply_inch_exact_priority({"dn20", '3/4"', "波纹管"}, {'3/4"'})
        is True
    )


def test_inch_only_still_allows_strict():
    assert _should_apply_inch_exact_priority({'1/2"', "波纹管"}, {'1/2"'}) is True


def test_no_inch_never_applies():
    assert _should_apply_inch_exact_priority({"dn20", "波纹管"}, set()) is False
