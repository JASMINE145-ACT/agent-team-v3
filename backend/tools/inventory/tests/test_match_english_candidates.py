"""测试 match_english_candidates 对 Describrition_English 做 token CONTAINS 匹配。"""
import pandas as pd
from unittest.mock import patch


def _make_df(rows: list[dict]) -> pd.DataFrame:
    return pd.DataFrame(rows)


def _patch_df(df):
    """patch _get_cached_df 返回指定 DataFrame。"""
    return patch(
        "backend.tools.inventory.services.wanding_fuzzy_matcher._get_cached_df",
        return_value=df,
    )


def test_all_tokens_must_match():
    """query tokens 全部出现在 Describrition_English 才收录。"""
    from backend.tools.inventory.services.wanding_fuzzy_matcher import match_english_candidates

    df = _make_df([
        {"Material": "AAA", "Describrition": "中文A", "Describrition_English": "HDPE pipe 3 inch AW", "unit_price": 100.0},
        {"Material": "BBB", "Describrition": "中文B", "Describrition_English": "PVC pipe 2 inch", "unit_price": 50.0},
    ])
    with _patch_df(df):
        result = match_english_candidates('3" AW pipe')

    assert len(result) == 1
    assert result[0]["code"] == "AAA"


def test_returns_chinese_matched_name():
    """matched_name 应为中文 Describrition，description_english 单独透传。"""
    from backend.tools.inventory.services.wanding_fuzzy_matcher import match_english_candidates

    df = _make_df([
        {"Material": "AAA", "Describrition": "聚乙烯管", "Describrition_English": "HDPE pipe AW", "unit_price": 90.0},
    ])
    with _patch_df(df):
        result = match_english_candidates("HDPE pipe AW")

    assert result[0]["matched_name"] == "聚乙烯管"
    assert result[0]["description_english"] == "HDPE pipe AW"
    assert result[0]["source"] == "英文字段匹配"


def test_empty_english_column_skipped():
    """Describrition_English 为空的行不进入候选。"""
    from backend.tools.inventory.services.wanding_fuzzy_matcher import match_english_candidates

    df = _make_df([
        {"Material": "AAA", "Describrition": "中文A", "Describrition_English": "", "unit_price": 100.0},
    ])
    with _patch_df(df):
        result = match_english_candidates("pipe")

    assert result == []


def test_no_english_column_returns_empty():
    """DataFrame 无 Describrition_English 列时返回空列表，不报错。"""
    from backend.tools.inventory.services.wanding_fuzzy_matcher import match_english_candidates

    df = _make_df([
        {"Material": "AAA", "Describrition": "中文A", "unit_price": 100.0},
    ])
    with _patch_df(df):
        result = match_english_candidates("pipe")

    assert result == []


def test_single_char_tokens_ignored():
    """非数字单字符（如孤立字母）被过滤；纯数字规格（如 3）参与 CONTAINS。"""
    from backend.tools.inventory.services.wanding_fuzzy_matcher import match_english_candidates

    df = _make_df([
        {"Material": "AAA", "Describrition": "中文A", "Describrition_English": "3 AW pipe", "unit_price": 100.0},
    ])
    with _patch_df(df):
        # `3"` → tokens: 3（数字保留）, aw, pipe — 须全部出现在英文描述中
        result = match_english_candidates('3" AW pipe')

    assert len(result) == 1


def test_max_candidates_respected():
    """超过 max_candidates 的行不进入结果。"""
    from backend.tools.inventory.services.wanding_fuzzy_matcher import match_english_candidates

    rows = [
        {"Material": str(i), "Describrition": f"中{i}", "Describrition_English": "pipe AW", "unit_price": float(i)}
        for i in range(30)
    ]
    df = _make_df(rows)
    with _patch_df(df):
        result = match_english_candidates("pipe AW", max_candidates=5)

    assert len(result) == 5
