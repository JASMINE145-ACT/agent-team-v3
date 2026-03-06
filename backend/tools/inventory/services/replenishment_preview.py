from __future__ import annotations

import json
import logging
import re
from typing import Any, Dict, List

from backend.tools.inventory.services.agent_runner import run_inventory_agent

logger = logging.getLogger(__name__)


def _extract_json_object(text: str) -> Dict[str, Any] | None:
    """
    从 LLM 输出中提取首个 JSON 对象。
    """
    if not text:
        return None
    try:
        # 先尝试整体解析
        return json.loads(text)
    except Exception:
        pass
    # 回退：用正则提取第一个 {...}
    m = re.search(r"\{.*\}", text, re.DOTALL)
    if not m:
        return None
    try:
        return json.loads(m.group(0))
    except Exception:
        return None


def preview_replenishment_lines(
    lines: List[Dict[str, Any]],
) -> Dict[str, Any]:
    """
    使用库存 Agent 对补货行做预览：解析产品/编码并尽量查出当前库存。

    入参 lines: [{ product_or_code, quantity }]
    返回: { success, lines: [{ code, product_name, specification, quantity, current_qty }], errors?: [...] }
    """
    normalized: List[Dict[str, Any]] = []
    errors: List[str] = []

    for idx, raw in enumerate(lines or []):
        product_or_code = str(raw.get("product_or_code") or "").strip()
        try:
            quantity = float(raw.get("quantity") or 0)
        except (TypeError, ValueError):
            quantity = 0.0

        if not product_or_code:
            errors.append(f"第 {idx + 1} 行缺少 product_or_code")
            continue

        # 10 位纯数字：直接视为物料编码，不走 LLM
        if product_or_code.isdigit() and len(product_or_code) == 10:
            normalized.append(
                {
                    "row_index": idx,
                    "code": product_or_code,
                    "product_name": None,
                    "specification": None,
                    "quantity": quantity,
                    "current_qty": None,
                }
            )
            continue

        # 其它情况走库存 Agent，请求只输出 JSON
        prompt = (
            "请查询以下产品的库存，只输出一行 JSON，不要输出其它文字。\n"
            "JSON 结构必须为："
            "{\"code\": \"8030020580\", \"product_name\": \"产品名\", \"specification\": \"规格\", \"available_qty\": 123}。\n"
            f"产品描述：{product_or_code}"
        )
        try:
            result = run_inventory_agent(prompt, max_steps=6)
            answer = (result.get("answer") or "").strip()
        except Exception as e:
            logger.exception("preview_replenishment_lines 调用 run_inventory_agent 失败")
            errors.append(f"第 {idx + 1} 行 LLM 调用失败: {e}")
            continue

        obj = _extract_json_object(answer)
        if not isinstance(obj, dict):
            errors.append(f"第 {idx + 1} 行未能解析为结构化结果")
            continue

        code = str(obj.get("code") or "").strip() or None
        product_name = str(obj.get("product_name") or "").strip() or None
        specification = str(obj.get("specification") or "").strip() or None
        try:
            current_qty = float(obj.get("available_qty")) if obj.get("available_qty") is not None else None
        except (TypeError, ValueError):
            current_qty = None

        normalized.append(
            {
                "row_index": idx,
                "code": code or product_or_code,
                "product_name": product_name,
                "specification": specification,
                "quantity": quantity,
                "current_qty": current_qty,
            }
        )

    success = len(normalized) > 0 and not errors
    return {
        "success": success,
        "lines": normalized,
        "errors": errors,
    }

