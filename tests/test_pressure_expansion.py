"""
Tests for _apply_pressure_expansion and _format_pressure_value.
Covers PN↔MPa bidirectional expansion, formatting, dedup, and boundary protection.
"""

from __future__ import annotations

import pytest

from backend.tools.inventory.services.wanding_fuzzy_matcher import (
    _apply_pressure_expansion,
    _format_pressure_value,
    _PN_RE,
    _MPA_RE,
)


class TestFormatPressureValue:
    def test_integer(self):
        assert _format_pressure_value(1.0) == "1"

    def test_one_decimal(self):
        assert _format_pressure_value(1.6) == "1.6"

    def test_two_decimals(self):
        assert _format_pressure_value(1.25) == "1.25"

    def test_no_float_tail(self):
        # Critical: no 1.2500000001 issue
        assert _format_pressure_value(0.1 * 12.5) == "1.25"


class TestPNToMPa:
    def test_pn16(self):
        result = _apply_pressure_expansion("PN16 热水管")
        assert "1.6MPa" in result
        assert "PN16" in result

    def test_pn12_5(self):
        result = _apply_pressure_expansion("PN12.5")
        assert "1.25MPa" in result
        assert "PN12.5" in result

    def test_pn10(self):
        result = _apply_pressure_expansion("PN10")
        assert "1MPa" in result
        assert "PN10" in result

    def test_case_insensitive(self):
        result = _apply_pressure_expansion("pn16")
        assert "1.6MPa" in result

    def test_with_space(self):
        result = _apply_pressure_expansion("PN 16")
        assert "1.6MPa" in result

    def test_pn_attached_to_chinese(self):
        result = _apply_pressure_expansion("PN16热水管")
        assert "1.6MPa" in result

    def test_pn_alnum_suffix_not_match(self):
        result = _apply_pressure_expansion("PN16A 热水管")
        assert "1.6MPa" not in result


class TestMPaToPN:
    def test_1_6mpa(self):
        result = _apply_pressure_expansion("1.6MPa")
        assert "PN16" in result
        assert "1.6MPa" in result

    def test_1_25mpa(self):
        result = _apply_pressure_expansion("1.25MPa")
        assert "PN12.5" in result

    def test_1_0mpa(self):
        result = _apply_pressure_expansion("1.0MPa")
        assert "PN10" in result

    def test_uppercase_mpa(self):
        result = _apply_pressure_expansion("1.6MPA")
        assert "PN16" in result

    def test_no_space(self):
        result = _apply_pressure_expansion("1.6MPa热水管")
        assert "PN16" in result


class TestDedup:
    def test_no_double_expansion_pn(self):
        # PN12.5 should not become PN12.5 PN12.5 PN12.5
        result = _apply_pressure_expansion("PN12.5 1.25MPa")
        # Should have exactly one PN12.5 and one 1.25MPa
        assert result.count("PN12.5") == 1
        assert result.count("1.25MPa") == 1

    def test_redundant_pn_mpa_combination(self):
        # If both PN16 and 1.6MPa are already present, no explosion
        result = _apply_pressure_expansion("PN16 1.6MPa")
        # Should not create PN16 PN16 or 1.6MPa 1.6MPa
        assert result.count("PN16") == 1

    def test_no_double_expansion_with_float_edge(self):
        result = _apply_pressure_expansion("PN3 0.3MPa")
        assert result.count("0.3MPa") == 1


class TestBoundaryProtection:
    def test_unrelated_pn_context(self):
        # "PN" as part of a name should not trigger
        result = _apply_pressure_expansion("PN材质 热水管")
        # Should not expand "PN" alone (no number after it)
        assert "PN材质" in result

    def test_empty_string(self):
        result = _apply_pressure_expansion("")
        assert result == ""

    def test_none_input(self):
        result = _apply_pressure_expansion(None)
        assert result == ""


class TestCombined:
    def test_pn_and_mpa_together(self):
        result = _apply_pressure_expansion("PPR热水管 PN16 1.6MPa")
        assert "PN16" in result
        assert "1.6MPa" in result

    def test_format_统一(self):
        # Various formats should all normalize to same
        r1 = _apply_pressure_expansion("PN16")
        r2 = _apply_pressure_expansion("pn 16")
        r3 = _apply_pressure_expansion("1.6MPa")
        # All should contain 1.6MPa (normalized)
        assert "1.6MPa" in r1
        assert "1.6MPa" in r2
        assert "PN16" in r3
