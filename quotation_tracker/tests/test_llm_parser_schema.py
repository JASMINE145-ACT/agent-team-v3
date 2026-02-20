"""
Unit tests for strict LLM output schema validation.
"""
import sys
from pathlib import Path

import pytest

# Ensure quotation_tracker root is importable for `services.*`.
_ROOT = Path(__file__).resolve().parent.parent
if str(_ROOT) not in sys.path:
    sys.path.insert(0, str(_ROOT))

from services.llm_parser import LLMOutputSchemaError, LLMParser


def _parser_without_init() -> LLMParser:
    # Avoid network/client setup in __init__ for pure unit tests.
    return LLMParser.__new__(LLMParser)


def test_validate_and_normalize_success():
    parser = _parser_without_init()
    payload = {
        "out_of_stock_products": [
            {
                "product_name": "法兰",
                "specification": "DN125",
                "unit": "个",
                "quantity": "3",
            }
        ]
    }

    normalized = parser._validate_and_normalize_result(payload)
    item = normalized["out_of_stock_products"][0]
    assert item["product_name"] == "法兰"
    assert item["specification"] == "DN125"
    assert item["unit"] == "个"
    assert item["quantity"] == 3.0


def test_validate_and_normalize_missing_required_key():
    parser = _parser_without_init()
    payload = {
        "out_of_stock_products": [
            {
                "product_name": "法兰",
                "specification": "DN125",
                "unit": "个",
            }
        ]
    }

    with pytest.raises(LLMOutputSchemaError):
        parser._validate_and_normalize_result(payload)


def test_validate_and_normalize_invalid_quantity():
    parser = _parser_without_init()
    payload = {
        "out_of_stock_products": [
            {
                "product_name": "法兰",
                "specification": "DN125",
                "unit": "个",
                "quantity": "abc",
            }
        ]
    }

    with pytest.raises(LLMOutputSchemaError):
        parser._validate_and_normalize_result(payload)
