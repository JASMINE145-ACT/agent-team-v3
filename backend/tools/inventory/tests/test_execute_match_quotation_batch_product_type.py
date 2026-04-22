"""测试 match_quotation_batch 对 product_type 的透传。"""
from unittest.mock import patch


def test_batch_passes_product_type_to_single_calls():
    from backend.tools.inventory.services.inventory_agent_tools import _execute_match_quotation_batch

    def _fake_single(args, push_event=None):
        assert args.get("product_type") == "国标"
        return {"success": True, "result": "{\"unmatched\": true}"}

    with patch(
        "backend.tools.inventory.services.inventory_agent_tools._execute_match_quotation",
        side_effect=_fake_single,
    ) as mock_single:
        result = _execute_match_quotation_batch(
            {
                "keywords_list": ["PPR dn40", "PPR dn50"],
                "customer_level": "B",
                "product_type": "国标",
            }
        )

    assert result["success"] is True
    assert mock_single.call_count == 2


def test_auto_switch_batch_keeps_product_type():
    from backend.tools.inventory.services import inventory_agent_tools as iat

    with (
        patch.object(iat, "_split_batch_keywords", return_value=["A", "B", "C"]),
        patch.object(iat, "_execute_match_quotation_batch", return_value={"success": True, "result": "ok"}) as mock_batch,
    ):
        out = iat._execute_match_quotation(
            {"keywords": "A,B,C", "product_type": "日标"},
            push_event=None,
        )

    assert out["success"] is True
    called_args = mock_batch.call_args.args[0]
    assert called_args["product_type"] == "日标"


def test_batch_schema_accepts_product_type():
    from backend.tools.inventory.services.inventory_agent_tools import get_inventory_tools_openai_format

    tools = get_inventory_tools_openai_format()
    mq_batch = next(t for t in tools if t["function"]["name"] == "match_quotation_batch")
    props = mq_batch["function"]["parameters"]["properties"]
    assert "product_type" in props
