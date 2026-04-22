"""测试 _execute_match_quotation 在 lang=en 时路由到英文匹配路径。"""
import json
from unittest.mock import patch


_ENGLISH_CANDIDATES = [
    {"code": "AAA", "matched_name": "聚乙烯管", "description_english": "HDPE pipe AW", "unit_price": 90.0, "source": "英文字段匹配"},
]

_LLM_BEST = {
    "code": "AAA",
    "matched_name": "聚乙烯管",
    "unit_price": 90.0,
    "_selection_meta": {"index": 0, "confidence": "high"},
}


def test_lang_en_routes_to_english_match():
    from backend.tools.inventory.services.inventory_agent_tools import _execute_match_quotation

    with (
        patch("backend.tools.inventory.services.match_and_inventory.match_quotation_english",
              return_value=_ENGLISH_CANDIDATES) as mock_en,
        patch("backend.tools.inventory.services.match_and_inventory.match_quotation_union",
              return_value=[]) as mock_zh,
        patch("backend.tools.inventory.services.llm_selector.llm_select_best",
              return_value=_LLM_BEST),
    ):
        result = _execute_match_quotation({"keywords": "HDPE pipe AW", "lang": "en", "product_type": "日标"})

    mock_en.assert_called_once_with("HDPE pipe AW", customer_level="B", product_type="日标")
    mock_zh.assert_not_called()
    payload = json.loads(result["result"])
    assert payload.get("chosen", {}).get("code") == "AAA"
    assert payload.get("single") is True


def test_lang_zh_routes_to_chinese_match():
    """lang 未传或为 zh 时走原有 match_quotation_union。"""
    from backend.tools.inventory.services.inventory_agent_tools import _execute_match_quotation

    with (
        patch("backend.tools.inventory.services.match_and_inventory.match_quotation_union",
              return_value=[]) as mock_zh,
        patch("backend.tools.inventory.services.match_and_inventory.match_quotation_english",
              return_value=[]) as mock_en,
    ):
        _execute_match_quotation({"keywords": "三通50"})

    mock_zh.assert_called_once()
    mock_en.assert_not_called()


def test_lang_en_schema_accepts_lang_field():
    """工具 schema 应包含 lang 与 product_type 字段定义。"""
    from backend.tools.inventory.services.inventory_agent_tools import get_inventory_tools_openai_format

    tools = get_inventory_tools_openai_format()
    mq_tool = next(t for t in tools if t["function"]["name"] == "match_quotation")
    props = mq_tool["function"]["parameters"]["properties"]
    assert "lang" in props, "工具 schema 缺少 lang 字段"
    assert "product_type" in props, "工具 schema 缺少 product_type 字段"
