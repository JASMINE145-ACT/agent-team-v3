#!/usr/bin/env python3
"""测试规格提取逻辑"""
import sys
sys.path.insert(0, "D:/Projects/agent-jk/Agent Team version3")

from backend.tools.quotation.spec_extract import extract_spec_from_quote_name

# 测试用例
test_cases = [
    "直通(管箍)PVC-U排水配件白色 dn50",
    "短型顺水三通印尼(日标)PVC-U管件(D排水系列)灰色 DN50 (2\") 联塑",
]

print("=== 规格提取测试 ===\n")
for quote_name in test_cases:
    spec = extract_spec_from_quote_name(quote_name)
    print(f"报价名称: {quote_name}")
    print(f"提取规格: '{spec}'")
    print()
