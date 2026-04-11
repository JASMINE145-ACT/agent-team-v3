"""
上传 Excel → dict 列表（与现有万鼎/映射表列布局一致）。
"""

from __future__ import annotations

import io
import logging
from typing import Any

logger = logging.getLogger(__name__)

_COL_MATERIAL = 1
_COL_DESC = 2
_COL_PRICE_A = 8
_COL_PRICE_B = 10
_COL_PRICE_C = 12
_COL_PRICE_D = 14


def _safe_float(v: Any) -> Any:
    if v is None:
        return None
    try:
        return float(v)
    except (ValueError, TypeError):
        return None


def _val(v: Any) -> str:
    if v is None:
        return ""
    return str(v).strip()


def parse_price_library(content: bytes) -> list[dict]:
    try:
        import openpyxl
    except ImportError as e:
        raise RuntimeError("openpyxl 未安装") from e

    wb = openpyxl.load_workbook(io.BytesIO(content), read_only=True, data_only=True)
    rows: list[dict] = []

    def _load_sheet(ws):
        for i, row in enumerate(ws.iter_rows(max_col=16)):
            if i == 0:
                continue
            cells = [None] * 16
            for col_idx, c in enumerate(row):
                if col_idx < 16:
                    cells[col_idx] = getattr(c, "value", None)
            material = _val(cells[_COL_MATERIAL]) if len(cells) > _COL_MATERIAL else ""
            desc = _val(cells[_COL_DESC]) if len(cells) > _COL_DESC else ""
            if not material and not desc:
                continue
            rows.append(
                {
                    "material": material,
                    "description": desc,
                    "price_a": _safe_float(cells[_COL_PRICE_A]) if len(cells) > _COL_PRICE_A else None,
                    "price_b": _safe_float(cells[_COL_PRICE_B]) if len(cells) > _COL_PRICE_B else None,
                    "price_c": _safe_float(cells[_COL_PRICE_C]) if len(cells) > _COL_PRICE_C else None,
                    "price_d": _safe_float(cells[_COL_PRICE_D]) if len(cells) > _COL_PRICE_D else None,
                }
            )

    ws_main = wb["管材"] if "管材" in wb.sheetnames else (wb.active or wb[wb.sheetnames[0]])
    _load_sheet(ws_main)
    if "国标管件" in wb.sheetnames:
        _load_sheet(wb["国标管件"])
    wb.close()
    logger.info("parse_price_library: %d rows", len(rows))
    return rows


def parse_product_mapping(content: bytes) -> list[dict]:
    try:
        import openpyxl
    except ImportError as e:
        raise RuntimeError("openpyxl 未安装") from e

    wb = openpyxl.load_workbook(io.BytesIO(content), read_only=True, data_only=True)
    ws = wb.active or wb[wb.sheetnames[0]]
    rows: list[dict] = []
    for i, row in enumerate(ws.iter_rows(max_col=4, min_row=2)):
        cells = [getattr(c, "value", None) for c in row]
        if len(cells) < 3:
            continue
        product_code = _val(cells[2]) if len(cells) > 2 else ""
        if not product_code:
            continue
        rows.append(
            {
                "inquiry_name": _val(cells[0]),
                "spec": _val(cells[1]) if len(cells) > 1 else "",
                "product_code": product_code,
                "quotation_name": _val(cells[3]) if len(cells) > 3 else "",
            }
        )
    wb.close()
    logger.info("parse_product_mapping: %d rows", len(rows))
    return rows
