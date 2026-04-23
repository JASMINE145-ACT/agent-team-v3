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


class TestPvcAmbiguityClarify:
    """SKILL_INVENTORY_PRICE_RULES 必须包含 PVC 品类歧义强制澄清规则。"""

    def test_rules_has_pvc_clarification_trigger(self):
        """RULES 必须包含 pvc/pvc管 触发判断。"""
        from backend.plugins.jagent.skills import SKILL_INVENTORY_PRICE_RULES
        assert "pvc" in SKILL_INVENTORY_PRICE_RULES.lower()
        assert "ask_clarification" in SKILL_INVENTORY_PRICE_RULES

    def test_rules_has_all_six_pvc_types(self):
        """RULES 必须包含全部 6 项 PVC 品类选项关键词。"""
        from backend.plugins.jagent.skills import SKILL_INVENTORY_PRICE_RULES
        rules_lower = SKILL_INVENTORY_PRICE_RULES.lower()
        for keyword in ["排水管", "排水管件", "给水管", "电线管", "阀门", "胶水"]:
            assert keyword in rules_lower, f"缺少 PVC 选项关键词: {keyword}"

    def test_rules_has_stop_constraint(self):
        """RULES 必须在 PVC 澄清规则中明确 STOP / 不得继续匹配。"""
        from backend.plugins.jagent.skills import SKILL_INVENTORY_PRICE_RULES
        assert any(
            kw in SKILL_INVENTORY_PRICE_RULES
            for kw in ["STOP", "DO NOT call match_quotation", "禁止", "不得继续"]
        )

    def test_rules_pvc_block_is_in_inventory_price_section(self):
        """PVC 澄清规则必须在 SKILL_INVENTORY_PRICE_RULES 中，而非 SKILL_CLARIFY_RULES。"""
        from backend.plugins.jagent import skills
        assert "pvc" in skills.SKILL_INVENTORY_PRICE_RULES.lower()
        clarify = getattr(skills, "SKILL_CLARIFY_RULES", "") or ""
        assert "排水管件" not in clarify, "PVC 品类规则不应写入 SKILL_CLARIFY_RULES"

    def test_doc_has_pvc_clarification_mention(self):
        """SKILL_INVENTORY_PRICE_DOC 也必须包含 PVC 品类澄清说明。"""
        from backend.plugins.jagent.skills import SKILL_INVENTORY_PRICE_DOC
        assert "pvc" in SKILL_INVENTORY_PRICE_DOC.lower()
        assert "ask_clarification" in SKILL_INVENTORY_PRICE_DOC or "澄清" in SKILL_INVENTORY_PRICE_DOC
