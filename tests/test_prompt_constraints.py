"""
Prompt-content assertions: verify that skills.py and llm_selector.py
contain the required constraint patterns. These tests fail before the
prompt changes and pass after.
"""
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))


class TestSkillsOutputRules:
    def test_has_markdown_table_template(self):
        """Output rules must contain the fixed Markdown table header."""
        from backend.plugins.jagent.skills import SKILL_INVENTORY_PRICE_RULES
        assert "| 产品编号(code) | 产品名称 | 来源 |" in SKILL_INVENTORY_PRICE_RULES

    def test_prohibits_plain_text_list(self):
        """Output rules must explicitly prohibit plain-text field-per-line format."""
        from backend.plugins.jagent.skills import SKILL_INVENTORY_PRICE_RULES
        assert "DO NOT use plain-text field-per-line" in SKILL_INVENTORY_PRICE_RULES

    def test_pins_reasoning_location(self):
        """Reasoning line must be pinned to immediately after the last table row."""
        from backend.plugins.jagent.skills import SKILL_INVENTORY_PRICE_RULES
        assert "immediately after the last table row" in SKILL_INVENTORY_PRICE_RULES

    def test_prohibits_reasoning_when_empty(self):
        """Must not add 匹配理由 when field is absent/empty."""
        from backend.plugins.jagent.skills import SKILL_INVENTORY_PRICE_RULES
        assert "DO NOT add" in SKILL_INVENTORY_PRICE_RULES and "empty or absent" in SKILL_INVENTORY_PRICE_RULES

    def test_candidates_table_shown_before_result(self):
        """Output rules must require candidates table before the selected result."""
        from backend.plugins.jagent.skills import SKILL_INVENTORY_PRICE_RULES
        assert "候选产品" in SKILL_INVENTORY_PRICE_RULES
        assert "DO NOT skip the candidates table" in SKILL_INVENTORY_PRICE_RULES


class TestSelectorSystemPrompt:
    def test_leads_with_output_only(self):
        """System selector must lead with 'Output ONLY' negative constraint."""
        from backend.tools.inventory.services.llm_selector import _SYSTEM_SELECTOR as _system_selector
        assert _system_selector.startswith("Output ONLY")

    def test_has_quantified_reasoning_constraint(self):
        """System selector must specify ≥10 Chinese characters for reasoning."""
        from backend.tools.inventory.services.llm_selector import _SYSTEM_SELECTOR as _system_selector
        assert "≥10 Chinese characters" in _system_selector

    def test_reasoning_invalid_is_stated(self):
        """System selector must state that empty reasoning is INVALID."""
        from backend.tools.inventory.services.llm_selector import _SYSTEM_SELECTOR as _system_selector
        assert "INVALID" in _system_selector

    def test_prohibits_force_select(self):
        """System selector must prohibit force-selecting when no candidate fits."""
        from backend.tools.inventory.services.llm_selector import _SYSTEM_SELECTOR as _system_selector
        assert "DO NOT force-select" in _system_selector
