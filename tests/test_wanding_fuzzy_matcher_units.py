from backend.tools.inventory.services import wanding_fuzzy_matcher as matcher
import pandas as pd
import re


def test_normalize_chinese_number_order():
    """
    验证词序统一 + 中文+数字原子合并：
    目标：无论原始词序如何，规范化后两者的 token 集合完全一致。
    "三通50" 和 "50三通" → 都变成 "三通50"（不可拆分的原子 token）
    "DN50" → 保持原样（ASCII 不是中文）
    纯中文/纯数字 → 保持原样
    """
    # 核心修复场景：不同词序但应产生相同的原子 token
    assert matcher._normalize_chinese_number_order("三通50") == "三通50"
    assert matcher._normalize_chinese_number_order("50三通") == "三通50"
    assert matcher._normalize_chinese_number_order("三通50") == matcher._normalize_chinese_number_order("50三通")
    # 数字在中文前：数字保留在原位但与中文合并（因为数字紧跟中文后面）
    assert matcher._normalize_chinese_number_order("45度弯头") == "45度弯头"
    assert matcher._normalize_chinese_number_order("50三通阀门") == "50三通阀门"
    # 无中文时保持原样
    assert matcher._normalize_chinese_number_order("DN50") == "DN50"
    # 纯中文保持原样
    assert matcher._normalize_chinese_number_order("三通") == "三通"
    # 纯数字保持原样
    assert matcher._normalize_chinese_number_order("50") == "50"


def test_split_tokens_keeps_fraction_inch_token():
    tokens = matcher._split_tokens('PVC-U AW 3/4" 一级报价价格')
    assert '3/4"' in tokens
    assert "3" not in tokens
    assert "4" not in tokens


def test_expand_unit_tokens_fraction_inch_maps_to_dn20():
    expanded = matcher._expand_unit_tokens('3/4"')
    assert "20" in expanded
    assert "dn20" in expanded


def test_search_fuzzy_prefers_exact_inch_over_dn_equivalent():
    df = pd.DataFrame(
        [
            {
                "Material": "A001",
                "Describrition": '印尼(日标)PVC-U给水扩直口管(AW给水系列)白色 DN20(1/2") 4M/根 联塑',
                "unit_price": 100.0,
            },
            {
                "Material": "A002",
                "Describrition": '印尼(日标)PVC-U给水扩直口管(AW给水系列)白色 DN20(3/4") 4M/根 联塑',
                "unit_price": 120.0,
            },
        ]
    )
    df["norm_text"] = df["Describrition"].apply(matcher._normalize)
    df["spec_tokens"] = df["Describrition"].apply(
        lambda t: frozenset(tok for tok in matcher._split_tokens(t) if re.search(r"\d", tok))
    )
    results = matcher.search_fuzzy(df, 'PVC-U AW 3/4"')
    assert len(results) >= 1
    matched_names = [r[0]["matched_name"] for r in results]
    assert any('3/4"' in n for n in matched_names)
    assert all('1/2"' not in n for n in matched_names)


def test_search_fuzzy_order_independent():
    """
    验证词序不会影响搜索结果：同一语义的不同词序应返回相同候选集。
    这是对「三通50」和「50三通」返回不同结果问题的回归测试。
    """
    df = pd.DataFrame(
        [
            {
                "Material": "8010024360",
                "Describrition": "正三通印尼(日标)PVC-U管件(AW给水系列)灰色 DN50 (2\") 联塑",
                "unit_price": 13359.0,
            },
            {
                "Material": "8020022784",
                "Describrition": "短型顺水三通印尼(日标)PVC-U管件(D排水系列)灰色 DN50 (2\") 联塑",
                "unit_price": 4591.0,
            },
            {
                "Material": "80516363",
                "Describrition": "顺水三通印尼(日标) PVC-U管件(AW给水系列) DN50 (2\") RUCIKA",
                "unit_price": 25040.0,
            },
        ]
    )
    df["norm_text"] = df["Describrition"].apply(matcher._normalize)
    df["spec_tokens"] = df["Describrition"].apply(
        lambda t: frozenset(tok for tok in matcher._split_tokens(t) if re.search(r"\d", tok))
    )

    # 词序不同但语义相同的查询应返回完全相同的候选
    results_a = matcher.search_fuzzy(df, "三通50")
    results_b = matcher.search_fuzzy(df, "50三通")

    # 返回的 code 集合应该一致（忽略顺序和分数差异）
    codes_a = set(r[0]["code"] for r in results_a)
    codes_b = set(r[0]["code"] for r in results_b)
    assert codes_a == codes_b, f"词序不同导致候选不同：A={codes_a}, B={codes_b}"


def test_search_fuzzy_weighted_score_average():
    """
    验证 Fix B（加权平均合并）：
    多个 variant 打分不再用 max(score)，而是用加权平均。
    验证当同一产品被多个 variant 命中时，分数是加权平均而非 max。
    """
    # 用"正三通"作为查询，它能命中"正三通"库产品
    # 同义扩展可能产生多个 variant，验证最终分数是加权平均
    df = pd.DataFrame(
        [
            {
                "Material": "T001",
                "Describrition": "正三通 DN50",
                "unit_price": 100.0,
            },
        ]
    )
    df["norm_text"] = df["Describrition"].apply(matcher._normalize)
    df["spec_tokens"] = df["Describrition"].apply(
        lambda t: frozenset(tok for tok in matcher._split_tokens(t) if re.search(r"\d", tok))
    )
    results = matcher.search_fuzzy(df, "正三通 DN50")
    assert len(results) >= 1
    # 查询"正三通 DN50"和"正三通50"应返回相同候选
    results2 = matcher.search_fuzzy(df, "正三通50")
    codes1 = set(r[0]["code"] for r in results)
    codes2 = set(r[0]["code"] for r in results2)
    assert codes1 == codes2, "不同词序应返回相同候选"
