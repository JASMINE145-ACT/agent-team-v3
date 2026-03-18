#!/usr/bin/env python3
"""测试规格提取的完整流程"""
import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

# 模拟环境
os.environ['QUOTATION_SPEC_LLM'] = 'true'
os.environ['OPENAI_API_KEY'] = 'test-key'

from backend.tools.quotation.canonical_lines import build_canonical_quotation_lines

# 模拟匹配结果
fill_items_merged = [
    {
        "row": 2,
        "code": "8020020755",
        "quote_name": "直通(管箍)PVC-U排水配件白色 dn50",
        "unit_price": 1519.0,
        "qty": 100,
        "specification": "50",
    },
    {
        "row": 3,
        "code": "8020022784",
        "quote_name": "短型顺水三通印尼(日标)PVC-U管件(D排水系列)灰色 DN50 (2\") 联塑",
        "unit_price": 4591.0,
        "qty": 50,
        "specification": "50",
    }
]

items = [
    {"row": 2, "product_name": "直接", "specification": "50"},
    {"row": 3, "product_name": "三通", "specification": "50"},
]

print("=== 测试规格提取 ===\n")
print("输入 fill_items_merged:")
for fi in fill_items_merged:
    print(f"  Row {fi['row']}: {fi['quote_name']}")

print("\n构建规范行...")
try:
    canonical_lines = build_canonical_quotation_lines(
        fill_items_merged,
        items,
        shortage=None,
        run_spec_llm=False,  # 先测试规则提取
    )
    
    print("\n输出规范行 (规则提取):")
    for line in canonical_lines:
        print(f"  Row {line['row']}:")
        print(f"    quote_name: {line['quote_name']}")
        print(f"    specification: {line['specification']}")
        print(f"    quote_spec: {line['quote_spec']}")
        print()
    
    # 测试 LLM 提取（如果配置了）
    print("\n尝试 LLM 提取...")
    canonical_lines_llm = build_canonical_quotation_lines(
        fill_items_merged,
        items,
        shortage=None,
        run_spec_llm=True,
    )
    
    print("\n输出规范行 (LLM 提取):")
    for line in canonical_lines_llm:
        print(f"  Row {line['row']}:")
        print(f"    quote_name: {line['quote_name']}")
        print(f"    specification: {line['specification']}")
        print(f"    quote_spec: {line['quote_spec']}")
        print()
        
except Exception as e:
    print(f"\n❌ 错误: {e}")
    import traceback
    traceback.print_exc()
