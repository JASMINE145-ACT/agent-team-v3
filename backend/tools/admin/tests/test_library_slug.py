"""_make_table_slug edge cases (library physical table name fragment)."""

from __future__ import annotations

from backend.tools.admin.repository import _make_table_slug


def test_slug_empty_after_sanitization_is_lib_not_lib_underscore() -> None:
    """Previously empty slug became 'lib_' + '' → dl_{id}_lib_."""
    assert _make_table_slug("---") == "lib"
    assert _make_table_slug("___") == "lib"


def test_slug_chinese_name_produces_non_empty_slug() -> None:
    s = _make_table_slug("整理产品(2)")
    assert s
    assert not s.endswith("_")
    assert s[0].isalpha() or s.startswith("lib_")


def test_slug_leading_digit_gets_lib_prefix() -> None:
    assert _make_table_slug("2abc").startswith("lib_")

