"""
测试中文/英制尺寸规格识别
验证修复: "2寸"→DN50, "1寸"→DN25, "6英寸"→DN150, "1½寸"→DN40
"""

import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.path.insert(0, '.')

from backend.tools.inventory.services.wanding_fuzzy_matcher import (
    _split_tokens,
    _expand_unit_tokens,
    _expand_token_with_synonyms_and_units,
    _is_inch_token,
    CUN_TO_MM,
)


def test_split_tokens_chinese_size():
    """测试 _split_tokens 能识别中文尺寸"""
    # 测试用例: (输入, 期望包含的token)
    # 注意: _split_tokens 返回原始token，DN扩展在 _expand_unit_with_synonyms_and_units 中进行
    cases = [
        ("2寸三通", ["2寸", "2", "三通"]),
        ("1寸弯头", ["1寸", "1", "弯头"]),
        ("6英寸管", ["6英寸", "6", "管"]),
        ("PVC管 6英寸", ["6英寸", "6", "管"]),
        ("1½寸接头", ["1½寸", "1", "接头"]),  # Unicode fraction ½
        ("3/4寸弯头", ["3/4寸", "3/4", "弯头"]),
    ]

    print("=" * 60)
    print("测试 _split_tokens 中文尺寸识别")
    print("=" * 60)

    for text, expected in cases:
        tokens = _split_tokens(text)
        print(f"\n输入: {text}")
        print(f"分词: {tokens}")
        # 检查期望的 token 是否存在
        missing = [e for e in expected if e not in tokens]
        if missing:
            print(f"  ❌ 缺少: {missing}")
        else:
            print(f"  ✅ OK")


def test_expand_unit_tokens_chinese():
    """测试 _expand_unit_tokens 能扩展中文尺寸"""
    print("\n" + "=" * 60)
    print("测试 _expand_unit_tokens 中文尺寸扩展")
    print("=" * 60)

    cases = [
        ("2寸", {"50", "dn50", '2"', "2寸"}),
        ("1寸", {"25", "dn25", '1"', "1寸"}),
        ("6英寸", {"150", "dn150", '6"', "6英寸"}),
        ("1½寸", {"40", "dn40", '1-1/2"', "1½寸"}),
        ("3/4寸", {"20", "dn20", '3/4"', "3/4寸"}),
    ]

    for token, expected in cases:
        expanded = _expand_unit_tokens(token)
        print(f"\n输入: {token}")
        print(f"扩展: {expanded}")
        missing = expected - expanded
        if missing:
            print(f"  ❌ 缺少: {missing}")
        else:
            print(f"  ✅ OK")


def test_expand_token_with_synonyms_and_units():
    """测试完整的 token 扩展"""
    print("\n" + "=" * 60)
    print("测试 _expand_token_with_synonyms_and_units")
    print("=" * 60)

    cases = [
        "2寸",
        "1寸弯头",
        "6英寸管",
        "1½寸",
    ]

    for token in cases:
        expanded = _expand_token_with_synonyms_and_units(token)
        print(f"\n输入: {token}")
        print(f"扩展: {expanded}")


def test_is_inch_token():
    """测试 _is_inch_token 识别中文尺寸"""
    print("\n" + "=" * 60)
    print("测试 _is_inch_token")
    print("=" * 60)

    cases = [
        ('3/4"', True),
        ('1-1/2"', True),
        ('4"', True),
        ("2寸", True),
        ("1寸", True),
        ("6英寸", True),
        ("1½寸", True),
        ("dn40", False),
        ("50", False),
        ("弯头", False),
    ]

    for token, expected in cases:
        result = _is_inch_token(token)
        status = "✅" if result == expected else "❌"
        print(f"  {status} '{token}': {result} (期望 {expected})")


def test_cun_to_mm_mapping():
    """测试 CUN_TO_MM 映射表"""
    print("\n" + "=" * 60)
    print("测试 CUN_TO_MM 映射表")
    print("=" * 60)

    print("\n中文尺寸 → DN(mm) 映射:")
    for k, v in CUN_TO_MM.items():
        print(f"  {k} → {v}")


if __name__ == "__main__":
    test_cun_to_mm_mapping()
    test_split_tokens_chinese_size()
    test_expand_unit_tokens_chinese()
    test_expand_token_with_synonyms_and_units()
    test_is_inch_token()

    print("\n" + "=" * 60)
    print("测试完成")
    print("=" * 60)
