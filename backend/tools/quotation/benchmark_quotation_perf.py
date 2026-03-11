from __future__ import annotations

import argparse
import json
import time
from pathlib import Path
from typing import Any, Dict

from backend.tools.quotation.quote_tools import extract_inquiry_items, fill_quotation
from backend.tools.inventory.services.match_and_inventory import (
    match_price_and_get_inventory,
)


def _time_block(label: str, fn, *args, **kwargs) -> tuple[float, Any]:
    start = time.perf_counter()
    result = fn(*args, **kwargs)
    end = time.perf_counter()
    return end - start, result


def run_benchmark(
    file_path: str,
    customer_level: str = "B",
    sheet_name: str | None = None,
) -> Dict[str, Any]:
    """
    针对单个报价 Excel 做端到端与分阶段耗时统计：

    - Excel 解析：extract_inquiry_items
    - 价格+库存匹配：对每个 item 调用 match_price_and_get_inventory
    - Excel 写回：fill_quotation（写入 _perf_filled.xlsx 副本）
    """
    path = Path(file_path)
    if not path.is_absolute():
        path = Path.cwd() / path
    if not path.exists():
        raise FileNotFoundError(path)

    summary: Dict[str, Any] = {
        "file_path": str(path),
        "customer_level": customer_level,
        "sheet_name": sheet_name,
        "steps": {},
    }

    # 1. 解析询价行
    t_extract, extract_result = _time_block(
        "extract_inquiry_items",
        extract_inquiry_items,
        str(path),
        sheet_name=sheet_name,
    )
    items = (extract_result or {}).get("items") or []
    summary["steps"]["extract_inquiry_items"] = {
        "elapsed_sec": t_extract,
        "rows_count": len(items),
        "error": extract_result.get("error"),
        "fallback_used": bool(extract_result.get("_fallback_used")),
    }

    # 2. 价格+库存匹配（逐行）
    fill_items = []
    shortage = []
    unmatched = []

    t_match_start = time.perf_counter()
    for it in items:
        keywords = it.get("keywords") or ""
        match = match_price_and_get_inventory(
            keywords,
            customer_level=customer_level,
            allow_suggestions_for_work=False,
        )
        if not match:
            unmatched.append({"row": it.get("row"), "keywords": keywords})
            continue
        if match.get("_needs_human_choice"):
            # 这里视为 unmatched，由前端人工选择处理
            unmatched.append(
                {
                    "row": it.get("row"),
                    "keywords": keywords,
                    "reason": "needs_human_choice",
                }
            )
            continue

        available_qty = float(match.get("available_qty") or 0.0)
        req_qty = int(it.get("qty") or 0)
        row_info = {
            "row": it.get("row"),
            "code": match.get("code") or "",
            "quote_name": match.get("matched_name") or "",
            "specification": match.get("matched_name") or "",
            "unit_price": match.get("unit_price"),
            "qty": req_qty,
            "available_qty": available_qty,
            "match_source": match.get("match_source"),
        }
        if req_qty > 0 and available_qty < req_qty:
            shortage.append(row_info)
        else:
            fill_items.append(row_info)

    t_match_end = time.perf_counter()
    summary["steps"]["match_price_and_get_inventory"] = {
        "elapsed_sec": t_match_end - t_match_start,
        "items_total": len(items),
        "items_fill": len(fill_items),
        "items_shortage": len(shortage),
        "items_unmatched": len(unmatched),
    }

    # 3. Excel 写回（写入副本）
    output_path = str(path.with_name(path.stem + "_perf_filled.xlsx"))
    t_fill, fill_result = _time_block(
        "fill_quotation",
        fill_quotation,
        file_path=str(path),
        fill_items=fill_items,
        sheet_name=sheet_name,
        output_path=output_path,
    )
    summary["steps"]["fill_quotation"] = {
        "elapsed_sec": t_fill,
        "filled_count": fill_result.get("filled_count"),
        "output_path": fill_result.get("output_path"),
        "error": fill_result.get("error"),
    }

    summary["total_elapsed_sec"] = (
        t_extract
        + summary["steps"]["match_price_and_get_inventory"]["elapsed_sec"]
        + t_fill
    )
    return summary


def main() -> None:
    parser = argparse.ArgumentParser(
        description="报价流程性能基准：解析 -> 匹配+库存 -> Excel 写回"
    )
    parser.add_argument(
        "file_path",
        help="报价单 Excel 路径（例如 Agent Team version3/报价单/案例报价单.xlsx）",
    )
    parser.add_argument(
        "--customer-level",
        "-c",
        default="B",
        help="客户档位（默认 B）",
    )
    parser.add_argument(
        "--sheet-name",
        "-s",
        default=None,
        help="工作表名称（默认使用第一个）",
    )
    args = parser.parse_args()

    result = run_benchmark(
        file_path=args.file_path,
        customer_level=args.customer_level,
        sheet_name=args.sheet_name,
    )
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()

