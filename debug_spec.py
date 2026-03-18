import sys
sys.path.insert(0, r"D:\Projects\agent-jk\Agent Team version3")

from backend.tools.quotation.spec_extract import extract_spec_from_quote_name

# 测试实际的报价名称
test_name = "直通(管箍)PVC-U排水配件白色 dn50"
result = extract_spec_from_quote_name(test_name)

print(f"输入: {test_name}")
print(f"输出: '{result}'")
print(f"类型: {type(result)}")
print(f"长度: {len(result)}")
print(f"是否为空: {result == ''}")
print(f"布尔值: {bool(result)}")

# 测试保存逻辑
line = {"quote_spec": result}
# 模拟原来的逻辑
old_logic = str(line.get("quote_spec", ""))[:500] if line.get("quote_spec") else None
# 新的逻辑
new_logic = (str(line.get("quote_spec") or "")[:500]) or None

print(f"\n原逻辑结果: {old_logic}")
print(f"新逻辑结果: {new_logic}")
