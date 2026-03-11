"""
报价链路近期修改的简单测试：Match 接收 items、缺货不阻塞、fill 日期/规格回退、上传 with_summary 快路径。
运行（在 Agent Team version3 根目录）：
  python -m pytest tests/test_quotation_pipeline.py -v
"""
import json
import sys
import tempfile
import time
from pathlib import Path

_root = Path(__file__).resolve().parent.parent
if str(_root) not in sys.path:
    sys.path.insert(0, str(_root))

import pytest


# ----- 1) Match 接收已提取的 items（去重 extract） -----


def test_match_uses_items_when_provided_no_extract_call():
    """传入合法 items 时，直接使用 items、不再次调用 extract_inquiry_items。"""
    from unittest.mock import patch, MagicMock
    from backend.agent.work_tools import _run_work_quotation_match

    items = [
        {"row": 2, "keywords": "PVC管 dn20", "qty": 100, "product_name": "PVC管", "specification": "dn20"},
        {"row": 3, "keywords": "阀门", "qty": 50, "product_name": "阀门", "specification": ""},
    ]
    # 模拟 match_price_and_get_inventory：第一条有库存，第二条缺货
    def fake_match(keywords, customer_level=None, price_library_path=None, allow_suggestions_for_work=None):
        if "PVC" in (keywords or ""):
            return {"code": "P001", "matched_name": "PVC管", "unit_price": 10.0, "available_qty": 200.0}
        return {"code": "V001", "matched_name": "阀门", "unit_price": 20.0, "available_qty": 10.0}

    with patch("backend.tools.quotation.quote_tools.extract_inquiry_items") as mock_extract:
        with patch("backend.tools.inventory.services.match_and_inventory.match_price_and_get_inventory", side_effect=fake_match):
            out = _run_work_quotation_match("/any/file.xlsx", items=items)

    mock_extract.assert_not_called()
    assert out.get("success") is True
    assert "to_fill" in out and "shortage" in out and "unmatched" in out
    assert len(out.get("items", [])) == 2
    assert len(out.get("to_fill", [])) == 1
    assert len(out.get("shortage", [])) == 1
    assert out["to_fill"][0].get("row") == 2 and out["shortage"][0].get("row") == 3


def test_match_items_structure_to_fill_shortage_unmatched():
    """传入 items 时返回的 to_fill/shortage/unmatched/fill_items_merged 结构正确。"""
    from unittest.mock import patch
    from backend.agent.work_tools import _run_work_quotation_match

    items = [{"row": 2, "keywords": "A", "qty": 1, "product_name": "A", "specification": ""}]
    with patch("backend.tools.inventory.services.match_and_inventory.match_price_and_get_inventory") as m:
        m.return_value = {"code": "C1", "matched_name": "A", "unit_price": 1.0, "available_qty": 10.0}
        out = _run_work_quotation_match("/f.xlsx", items=items)

    assert out["success"] is True
    assert len(out["to_fill"]) == 1
    assert out["to_fill"][0]["code"] == "C1"
    assert len(out["shortage"]) == 0
    assert len(out["unmatched"]) == 0
    assert "fill_items_merged" in out
    assert len(out["fill_items_merged"]) >= 1


# ----- 2) 缺货落库/邮件不阻塞主流程 -----


def test_execute_work_tool_sync_returns_quickly_with_shortage():
    """execute_work_tool_sync 在返回含 shortage 的 result 时立即返回，不等待落库。"""
    from unittest.mock import patch
    from backend.agent.work_tools import execute_work_tool_sync

    block_called = []

    def blocking_persist(*args, **kwargs):
        block_called.append(1)
        time.sleep(2.0)

    # 模拟 match 返回缺货，避免真实请求耗时；落库在后台线程中若未 mock 会阻塞 2s，主线程不应等它
    def fake_match_shortage(*args, **kwargs):
        return {"code": "C1", "matched_name": "X", "unit_price": 1.0, "available_qty": 5.0}

    with patch("backend.agent.work_tools._persist_shortage_records_and_alerts", side_effect=blocking_persist):
        with patch("backend.tools.inventory.services.match_and_inventory.match_price_and_get_inventory", side_effect=fake_match_shortage):
            t0 = time.perf_counter()
            raw = execute_work_tool_sync(
                "work_quotation_match",
                {
                    "file_path": "/f.xlsx",
                    "items": [{"row": 2, "keywords": "X", "qty": 100, "product_name": "X", "specification": ""}],
                },
            )
            elapsed = time.perf_counter() - t0

    # 主线程应在 1.5 秒内返回（match 已 mock，落库在后台 daemon 线程不阻塞主线程）
    assert elapsed < 1.5, "主流程不应等待落库，应在 1.5 秒内返回"
    data = json.loads(raw)
    assert data.get("success") is True
    assert "shortage" in data
    # 后台线程可能已启动，但不影响主线程已返回
    assert "to_fill" in data and "fill_items_merged" in data


# ----- 3) fill_quotation 填写日期与规格回退 -----


@pytest.fixture
def temp_quotation_xlsx():
    """生成带「交货日期」「报价日期」表头和 Total 行的临时 xlsx。"""
    try:
        import openpyxl
    except ImportError:
        pytest.skip("openpyxl not installed")
    wb = openpyxl.Workbook()
    ws = wb.active
    if ws is None:
        ws = wb.create_sheet("Sheet1")
    # 表头：第1行 含 交货日期；合计行下方含 报价日期
    ws.cell(row=1, column=1, value="序号")
    ws.cell(row=1, column=7, value="产品编号")
    ws.cell(row=1, column=8, value="报价名称")
    ws.cell(row=1, column=10, value="规格")
    ws.cell(row=1, column=12, value="数量")
    ws.cell(row=1, column=14, value="单价")
    ws.cell(row=1, column=15, value="总价")
    delivery_col = 16
    ws.cell(row=1, column=delivery_col, value="交货日期")
    # 数据行
    ws.cell(row=2, column=1, value=1)
    ws.cell(row=3, column=1, value=2)
    # Total Excluding PPN 行（用于 quote_tools 定位）
    total_row = 5
    ws.cell(row=total_row, column=1, value="Total Excluding PPN不含税总价")
    ws.cell(row=total_row + 4, column=1, value="报价日期")
    fd, path = tempfile.mkstemp(suffix=".xlsx")
    import os
    os.close(fd)
    wb.save(path)
    yield path
    try:
        Path(path).unlink(missing_ok=True)
    except Exception:
        pass


def test_fill_quotation_writes_dates_and_spec_fallback(temp_quotation_xlsx):
    """fill_quotation 写入报价日期/交货日期；无 specification 时规格列用 quote_name。"""
    from backend.tools.quotation.quote_tools import fill_quotation
    import openpyxl

    fill_items = [
        {"row": 2, "code": "C1", "quote_name": "产品A", "unit_price": 10.0, "qty": 2, "specification": ""},
        {"row": 3, "code": "C2", "quote_name": "产品B", "unit_price": 5.0, "qty": 4, "specification": "型号X"},
    ]
    out_path = temp_quotation_xlsx + ".filled.xlsx"
    out = fill_quotation(
        file_path=temp_quotation_xlsx,
        fill_items=fill_items,
        output_path=out_path,
        quotation_date="2026/03/10",
        delivery_date="2026/03/20",
    )
    assert out.get("success") is True
    assert Path(out_path).exists()

    wb = openpyxl.load_workbook(out_path, data_only=True)
    ws = wb.active
    # 规格列 J=10：第2行无 specification 应写 quote_name「产品A」；第3行有 specification 写「型号X」
    spec_2 = ws.cell(row=2, column=10).value
    spec_3 = ws.cell(row=3, column=10).value
    assert (spec_2 or "").strip() == "产品A"
    assert (spec_3 or "").strip() == "型号X"
    # 交货日期列：表头在 16，数据行应写入 2026/03/20（需确认 _find_delivery_date_column 找到的是第几列）
    # 本 fixture 把「交货日期」写在 column 16，所以 delivery_col=16，第2、3行该列应有 2026/03/20
    delivery_val = ws.cell(row=2, column=16).value
    assert delivery_val == "2026/03/20" or "2026" in str(delivery_val)
    wb.close()
    try:
        Path(out_path).unlink(missing_ok=True)
    except Exception:
        pass


# ----- 4) 上传 with_summary 快路径 -----


def test_upload_with_summary_zero_returns_no_summary_meta():
    """POST /api/quotation/upload?with_summary=0 时响应不含 summary_meta 且 200。"""
    from fastapi.testclient import TestClient
    from backend.server.api.app import app
    import io

    client = TestClient(app)
    # 最小 xlsx：openpyxl 新建空工作簿
    try:
        import openpyxl
        buf = io.BytesIO()
        openpyxl.Workbook().save(buf)
        buf.seek(0)
        content = buf.getvalue()
    except ImportError:
        pytest.skip("openpyxl not installed")

    resp = client.post(
        "/api/quotation/upload",
        params={"with_summary": 0},
        files={"file": ("small.xlsx", content, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")},
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data.get("success") is True
    assert "data" in data
    # with_summary=0 时不应包含 summary_meta（或 summary_meta 为空）
    inner = data.get("data") or {}
    assert "summary_meta" not in inner or inner.get("summary_meta") is None
