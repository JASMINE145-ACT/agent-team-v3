"""
Unit tests for quotation spec extraction: extract_spec_from_quote_name (rule-based)
and extract_specs_batch_llm (batch LLM with mock).
Run from Agent Team version3 root: py -m pytest tests/test_spec_extract.py -v
"""
import sys
from pathlib import Path

_root = Path(__file__).resolve().parent.parent
if str(_root) not in sys.path:
    sys.path.insert(0, str(_root))

import pytest

from backend.tools.quotation.spec_extract import (
    extract_spec_from_quote_name,
    extract_specs_batch_llm,
)


# ----- extract_spec_from_quote_name (rule-based) -----


@pytest.mark.parametrize(
    "quote_name,expect_non_empty,description",
    [
        ("直通(管径)PVC-UH", True, "parenthesis (管径) and PVC-UH"),
        ("直通(管酒)PVC-U排水", True, "parenthesis (管酒) and PVC-U排水"),
        ("罩(PVC-H)", True, "parenthesis (PVC-H)"),
        ("30°异径三级配", False, "30° not in current patterns; may be empty"),
        (
            '直通 管件 DN200 (8") 4M/根 标准型',
            True,
            "DN200, (8\"), 4M/根 in long name",
        ),
        ("", False, "empty string"),
        ("   ", False, "whitespace only"),
        ("无规格产品名", False, "no spec patterns"),
    ],
)
def test_extract_spec_from_quote_name(quote_name, expect_non_empty, description):
    """Rule-based extraction returns non-empty when patterns match (管径), PVC-U, PVC-H, DN200, 4M/根, etc.)."""
    result = extract_spec_from_quote_name(quote_name)
    assert isinstance(result, str)
    if expect_non_empty:
        assert result.strip() != "", f"expected non-empty for: {description!r}"
    if quote_name == "直通(管径)PVC-UH" and result:
        assert "管径" in result or "PVC" in result
    if quote_name == "直通(管酒)PVC-U排水" and result:
        assert "PVC" in result or "管酒" in result
    if quote_name == "罩(PVC-H)" and result:
        assert "PVC" in result or "H" in result
    if '直通 管件 DN200 (8") 4M/根 标准型' in quote_name and result:
        assert "DN200" in result or "4M" in result or "8" in result


def test_extract_spec_from_quote_name_long_with_dn200_and_4m_per_gen():
    """Long quote name containing DN200 (8\") 4M/根 returns non-empty extracted spec."""
    long_name = '某产品 直通 管件 DN200 (8") 4M/根 标准型 其他描述'
    result = extract_spec_from_quote_name(long_name)
    assert result.strip() != ""
    assert "DN200" in result
    assert "4M" in result or "根" in result


# ----- extract_specs_batch_llm (mock LLM) -----


def test_extract_specs_batch_llm_returns_empty_when_config_disabled():
    """When QUOTATION_SPEC_LLM is False, returns empty list without calling API."""
    from unittest.mock import patch

    rows = [{"product_name": "A", "specification": "50", "quote_name": "直通(管径)PVC-UH"}]
    mock_config = type("Config", (), {"QUOTATION_SPEC_LLM": False, "OPENAI_API_KEY": None})()
    with patch("backend.config.Config", mock_config):
        result = extract_specs_batch_llm(rows)
    assert result == []


def test_extract_specs_batch_llm_valid_json_returns_requested_and_quoted_spec():
    """When mock LLM returns valid JSON array with requested_spec and quoted_spec, returns list of dicts."""
    from types import SimpleNamespace
    from unittest.mock import patch, MagicMock

    rows = [
        {"product_name": "PVC管", "specification": "50", "quote_name": "直通(管径)PVC-U排水"},
        {"product_name": "阀门", "specification": "", "quote_name": "30°异径三级配"},
    ]
    mock_content = '[{"requested_spec":"50","quoted_spec":"PVC-U排水"},{"requested_spec":"dn20","quoted_spec":"30°异径三级配"}]'
    mock_resp = SimpleNamespace(
        choices=[SimpleNamespace(message=SimpleNamespace(content=mock_content))]
    )

    mock_config = type("Config", (), {
        "QUOTATION_SPEC_LLM": True,
        "OPENAI_API_KEY": "sk-fake",
        "OPENAI_BASE_URL": "",
        "LLM_MODEL": "gpt-4o",
    })()
    with patch("backend.config.Config", mock_config):
        with patch("backend.core.llm_client.get_openai_client") as mock_get_client:
            mock_chat = MagicMock()
            mock_chat.chat.completions.create = MagicMock(return_value=mock_resp)
            mock_get_client.return_value = mock_chat
            result = extract_specs_batch_llm(rows)

    assert len(result) == 2
    assert result[0]["requested_spec"] == "50"
    assert result[0]["quoted_spec"] == "PVC-U排水"
    assert result[1]["requested_spec"] == "dn20"
    assert result[1]["quoted_spec"] == "30°异径三级配"


def test_extract_specs_batch_llm_invalid_json_returns_empty_list():
    """When API returns invalid JSON, returns empty list."""
    from unittest.mock import patch, MagicMock

    rows = [{"product_name": "A", "specification": "", "quote_name": "B"}]
    mock_resp = MagicMock()
    mock_resp.choices = [MagicMock()]
    mock_resp.choices[0].message.content = "not valid json at all"

    mock_config = type("Config", (), {
        "QUOTATION_SPEC_LLM": True,
        "OPENAI_API_KEY": "sk-fake",
        "OPENAI_BASE_URL": "",
        "LLM_MODEL": "gpt-4o",
    })()
    with patch("backend.config.Config", mock_config):
        with patch("backend.core.llm_client.get_openai_client") as mock_get_client:
            mock_chat = MagicMock()
            mock_chat.completions.create.return_value = mock_resp
            mock_get_client.return_value = mock_chat
            result = extract_specs_batch_llm(rows)

    assert result == []


def test_extract_specs_batch_llm_empty_rows_or_over_limit_returns_empty():
    """Empty rows or rows over EXTRACT_SPECS_BATCH_MAX_ROWS returns empty list."""
    assert extract_specs_batch_llm([]) == []
    over = [{"product_name": "x", "specification": "", "quote_name": "y"}] * 51
    assert extract_specs_batch_llm(over) == []
