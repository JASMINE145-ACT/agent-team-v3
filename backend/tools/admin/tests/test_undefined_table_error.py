"""_is_undefined_table_error classification."""

from __future__ import annotations

from backend.tools.admin.repository import _is_undefined_table_error


def test_pgcode_42p01_on_chain() -> None:
    class Inner(Exception):
        pgcode = "42P01"

    class Outer(Exception):
        def __init__(self) -> None:
            super().__init__("wrap")
            self.orig = Inner()

    assert _is_undefined_table_error(Outer())


def test_pgcode_on_cause_chain() -> None:
    class Inner(Exception):
        pgcode = "42P01"

    outer = Exception("sqlalchemy")
    outer.__cause__ = Inner()
    assert _is_undefined_table_error(outer)


def test_fallback_substring() -> None:
    assert _is_undefined_table_error(
        RuntimeError('relation "foo" does not exist')
    )


def test_other_error_false() -> None:
    assert not _is_undefined_table_error(ValueError("syntax error"))
