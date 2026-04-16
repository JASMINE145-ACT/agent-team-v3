"""parse_generic() unit tests."""

from __future__ import annotations

import csv as csv_mod
import io

from backend.tools.admin.excel_parser import parse_generic


def _make_xlsx(rows: list[list]) -> bytes:
    import openpyxl

    wb = openpyxl.Workbook()
    ws = wb.active
    for row in rows:
        ws.append(row)
    buf = io.BytesIO()
    wb.save(buf)
    return buf.getvalue()


def _make_csv(rows: list[list], delimiter: str = ",") -> bytes:
    buf = io.StringIO()
    writer = csv_mod.writer(buf, delimiter=delimiter)
    for row in rows:
        writer.writerow(row)
    return buf.getvalue().encode("utf-8")


def test_basic_xlsx_numeric_detection() -> None:
    content = _make_xlsx(
        [
            ["名称", "价格", "库存"],
            ["产品A", 10.5, 100],
            ["产品B", 20.0, 200],
            ["产品C", 30.0, 300],
        ]
    )
    result = parse_generic(content, "test.xlsx")
    assert result["errors"] == []
    assert len(result["columns"]) == 3
    assert result["columns"][0]["type"] == "TEXT"
    assert result["columns"][1]["type"] == "NUMERIC"
    assert result["columns"][2]["type"] == "NUMERIC"
    assert len(result["rows"]) == 3


def test_empty_header_gets_renamed() -> None:
    content = _make_xlsx([["名称", "", "价格"], ["A", "x", 10]])
    result = parse_generic(content, "test.xlsx")
    assert result["errors"] == []
    col_names = [c["name"] for c in result["columns"]]
    assert "col_2" in col_names
    assert any("空列头" in w for w in result["warnings"])


def test_duplicate_header_gets_suffix() -> None:
    content = _make_xlsx([["名称", "名称", "价格"], ["A", "B", 10]])
    result = parse_generic(content, "test.xlsx")
    assert result["errors"] == []
    col_names = [c["name"] for c in result["columns"]]
    assert "名称" in col_names
    assert "名称_2" in col_names
    assert any("重复" in w for w in result["warnings"])


def test_duplicate_header_collision_gets_unique_suffix() -> None:
    content = _make_xlsx([["A", "A_2", "A"], [1, 2, 3]])
    result = parse_generic(content, "test.xlsx")
    assert result["errors"] == []
    col_names = [c["name"] for c in result["columns"]]
    assert col_names == ["A", "A_2", "A_3"]


def test_sanitized_empty_or_conflicting_headers_get_safe_unique_names() -> None:
    content = _make_xlsx([["...", "///", "A-A", "A A"], ["x", "y", "1", "2"]])
    result = parse_generic(content, "test.xlsx")
    assert result["errors"] == []
    col_names = [c["name"] for c in result["columns"]]
    assert col_names[0] == "col"
    assert col_names[1] == "col_2"
    assert col_names[2] == "A_A"
    assert col_names[3] == "A_A_2"


def test_no_data_rows_is_error() -> None:
    content = _make_xlsx([["名称", "价格"]])
    result = parse_generic(content, "test.xlsx")
    assert result["errors"]


def test_too_many_columns_is_error() -> None:
    headers = [f"col{i}" for i in range(101)]
    content = _make_xlsx([headers, ["v"] * 101])
    result = parse_generic(content, "test.xlsx")
    assert result["errors"]


def test_csv_comma_delimiter() -> None:
    content = _make_csv([["名称", "价格"], ["A", "10"]])
    result = parse_generic(content, "test.csv")
    assert result["errors"] == []
    assert len(result["columns"]) == 2
    assert len(result["rows"]) == 1


def test_csv_semicolon_delimiter() -> None:
    content = _make_csv([["名称", "价格"], ["A", "10"]], delimiter=";")
    result = parse_generic(content, "test.csv")
    assert result["errors"] == []
    assert len(result["columns"]) == 2


def test_xls_extension_is_rejected_with_clear_error() -> None:
    content = _make_csv([["名称", "价格"], ["A", "10"]])
    result = parse_generic(content, "test.xls")
    assert result["errors"]
    assert "不支持 .xls 格式" in result["errors"][0]


def test_mostly_empty_column_warning() -> None:
    rows = [["名称", "备注"]] + [["A", ""] for _ in range(10)]
    content = _make_xlsx(rows)
    result = parse_generic(content, "test.xlsx")
    assert result["errors"] == []
    assert any("空值" in w for w in result["warnings"])


def test_mixed_type_column_becomes_text() -> None:
    content = _make_xlsx([["价格"], [10.0], [20.0], ["N/A"], [30.0], [40.0], [50.0]])
    result = parse_generic(content, "test.xlsx")
    assert result["errors"] == []
    assert result["columns"][0]["type"] == "TEXT"
    merged_warnings = result["columns"][0]["warnings"] + result["warnings"]
    assert any("类型混乱" in w for w in merged_warnings)
