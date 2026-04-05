"""Unit tests for correction learning prompt rules in skills.py."""
from backend.plugins.jagent.skills import SKILL_KNOWLEDGE_DOC, SKILL_KNOWLEDGE_RULES


def test_doc_mentions_correction_trigger():
    """DOC variant must tell LLM to detect correction intent."""
    assert "选错了" in SKILL_KNOWLEDGE_DOC or "纠正" in SKILL_KNOWLEDGE_DOC


def test_doc_mentions_ask_reason():
    """DOC variant must instruct LLM to ask for reason when missing."""
    assert "原因" in SKILL_KNOWLEDGE_DOC


def test_doc_mentions_confirmation():
    """DOC variant must require user confirmation before writing."""
    assert "确认" in SKILL_KNOWLEDGE_DOC


def test_doc_mentions_ifthen_format():
    """DOC variant must specify IF/THEN output format."""
    assert "IF" in SKILL_KNOWLEDGE_DOC and "THEN" in SKILL_KNOWLEDGE_DOC


def test_rules_correction_routing():
    """RULES variant must have a routing rule for correction intent."""
    assert "选错了" in SKILL_KNOWLEDGE_RULES or "纠正" in SKILL_KNOWLEDGE_RULES


def test_rules_no_write_without_confirmation():
    """RULES variant must prohibit calling the tool before confirmation."""
    assert "确认" in SKILL_KNOWLEDGE_RULES


def test_rules_ifthen_format_required():
    """RULES variant must specify IF/THEN format for content."""
    assert "IF 用户询价" in SKILL_KNOWLEDGE_RULES
