"""
Unit tests: skills.py must instruct the model to include selection_reasoning
in the reply, NOT claim it is rendered by UI.
"""
import unittest


class TestSkillsReasoningDisplay(unittest.TestCase):
    def _get_rules_text(self) -> str:
        from backend.plugins.jagent.skills import SKILL_INVENTORY_PRICE_RULES
        return SKILL_INVENTORY_PRICE_RULES

    def test_old_ui_render_instruction_removed(self):
        """The incorrect 'by UI directly rendered' instruction must be gone."""
        text = self._get_rules_text()
        self.assertNotIn(
            "由 UI 直接渲染",
            text,
            "Old 'UI renders reasoning' instruction should be removed",
        )

    def test_reasoning_include_in_reply_instruction_present(self):
        """New instruction: include selection_reasoning in the reply must be present."""
        text = self._get_rules_text()
        self.assertIn(
            "selection_reasoning",
            text,
            "skills.py must still reference selection_reasoning",
        )
        # Must say something about including it in the reply
        self.assertTrue(
            "回复" in text or "reply" in text.lower(),
            "New instruction must mention including reasoning in the reply",
        )

    def test_inventory_zero_reasoning_instruction_present(self):
        """When inventory is zero and reasoning exists, 💡 message must include it."""
        text = self._get_rules_text()
        self.assertIn("selection_reasoning", text)
        self.assertIn("💡", text)


if __name__ == "__main__":
    unittest.main(verbosity=2)
