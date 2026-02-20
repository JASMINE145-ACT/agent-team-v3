"""
演示 get_data_section 的截断逻辑
运行：python examples/demo_data_section.py
"""
import sys
import io
from pathlib import Path

# Windows 控制台编码修复
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

# 添加项目根目录到 path
ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

import pandas as pd
from services.out_of_stock_detector import OutOfStockDetector


def print_section(title: str):
    print("\n" + "=" * 60)
    print(f"  {title}")
    print("=" * 60)


def demo_example_1():
    """示例 1：关键词截断（含税总价）"""
    print_section("示例 1：关键词截断（含税总价）")
    
    data = [
        ["国际集团报价单", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["产品名称", "规格", "单位", "数量", "产品编号", "单价"],
        ["盲板", "DN100", "个", "1", "无货", "100"],
        ["法兰", "DN125", "个", "3", "801007", "200"],
        ["大小头", "DN80", "个", "2", "无货", "150"],
        ["", "", "", "", "", ""],
        ["含税总价：5000元", "", "", "", "", ""],
        ["银行：中国银行", "", "", "", "", ""],
        ["账号：123456789", "", "", "", "", ""],
    ]
    df = pd.DataFrame(data)
    
    detector = OutOfStockDetector()
    result = detector.get_data_section(df, max_rows=0)
    
    print(f"原始表：{len(df)} 行")
    print(f"截取后：{len(result)} 行（行索引 {result.index[0]} 到 {result.index[-1]}）")
    print("\n截取结果：")
    print(result.to_string(index=True))
    
    print("\n[说明]：")
    print("  - 表头行：行 2（含'产品名称/单位/数量'）")
    print("  - 关键词：行 7 含'含税总价' → 在行 7 截断")
    print("  - 结果：行 2-6（表头 + 3 行数据 + 1 空行）")


def demo_example_2():
    """示例 2：结构断裂（连续空行）"""
    print_section("示例 2：结构断裂（连续空行）")
    
    data = [
        ["报价单", "", "", "", ""],
        ["产品名称", "规格", "单位", "数量", "产品编号"],
        ["盲板", "DN100", "个", "1", "无货"],
        ["法兰", "DN125", "个", "3", "801007"],
        ["大小头", "DN80", "个", "2", "无货"],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["发货地址：北京市", "", "", "", ""],
        ["银行：中国银行", "", "", "", ""],
    ]
    df = pd.DataFrame(data)
    
    detector = OutOfStockDetector()
    result = detector.get_data_section(df, max_rows=0)
    
    print(f"原始表：{len(df)} 行")
    print(f"截取后：{len(result)} 行（行索引 {result.index[0]} 到 {result.index[-1]}）")
    print("\n截取结果：")
    print(result.to_string(index=True))
    
    print("\n[说明]：")
    print("  - 表头行：行 1")
    print("  - 结构断裂：行 5-6 连续空行 → 在行 5 截断")
    print("  - 关键词：行 7 含'发货地址'，但结构断裂更早（行 5）")
    print("  - 最小行数保护：未命中关键词，且 5-1=4 < 20 → 触发保护，至少保留 20 行")
    print("  - 结果：行 1-8（保护后包含后续行）")


def demo_example_3():
    """示例 3：最小行数保护（避免只送 3 行）"""
    print_section("示例 3：最小行数保护（避免只送 3 行）")
    
    # 模拟一个 28 行的表，前几行有结构断裂
    data = []
    data.append(["报价单", "", "", "", ""])
    data.append(["产品名称", "规格", "单位", "数量", "产品编号"])
    data.append(["盲板", "DN100", "个", "1", ""])
    data.append(["法兰", "DN125", "个", "3", ""])
    data.append(["", "", "", "", ""])
    data.append(["", "", "", "", ""])
    # 后面还有很多行，包含无货
    for i in range(6, 28):
        if i == 10:
            data.append([f"产品{i}", f"DN{i}", "个", str(i), "无货"])
        elif i == 15:
            data.append([f"产品{i}", f"DN{i}", "个", str(i), "无货"])
        else:
            data.append([f"产品{i}", f"DN{i}", "个", str(i), ""])
    
    df = pd.DataFrame(data)
    
    detector = OutOfStockDetector()
    result = detector.get_data_section(df, max_rows=0)
    
    print(f"原始表：{len(df)} 行")
    print(f"截取后：{len(result)} 行（行索引 {result.index[0]} 到 {result.index[-1]}）")
    print("\n截取结果（前 10 行）：")
    print(result.head(10).to_string(index=True))
    print(f"\n...（共 {len(result)} 行）")
    
    print("\n[说明]：")
    print("  - 表头行：行 1")
    print("  - 结构断裂：行 4-5 连续空行 → 想在行 4 截断")
    print("  - 最小行数保护：未命中关键词，且 4-1=3 < 20 → 触发保护")
    print("  - 结果：至少保留 20 行（行 1-20），包含后面的无货行 10、15")


def demo_example_4():
    """示例 4：行数上限生效（大表截断）"""
    print_section("示例 4：行数上限生效（MAX_TABLE_ROWS=10）")
    
    # 创建一个 20 行的表
    data = []
    data.append(["产品名称", "规格", "单位", "数量", "产品编号"])
    for i in range(1, 21):
        if i == 5:
            data.append([f"产品{i}", f"DN{i}", "个", str(i), "无货"])
        elif i == 15:
            data.append([f"产品{i}", f"DN{i}", "个", str(i), "无货"])
        else:
            data.append([f"产品{i}", f"DN{i}", "个", str(i), ""])
    
    df = pd.DataFrame(data)
    
    detector = OutOfStockDetector()
    # 模拟 MAX_TABLE_ROWS_FOR_LLM = 10
    result = detector.get_data_section(df, max_rows=10)
    
    print(f"原始表：{len(df)} 行")
    print(f"截取后：{len(result)} 行（行索引 {result.index[0]} 到 {result.index[-1]}）")
    print("\n截取结果：")
    print(result.to_string(index=True))
    
    print("\n[说明]：")
    print("  - 表头行：行 0")
    print("  - 无结构断裂、无关键词 → 想保留全部 20 行")
    print("  - 行数上限：max_rows=10 → 只保留前 10 行（行 0-9）")
    print("  - [警告] 结果：无货行 15 被截断（需要调大 MAX_TABLE_ROWS_FOR_LLM）")


if __name__ == "__main__":
    print("\n" + "=" * 60)
    print("  get_data_section 截断逻辑演示")
    print("=" * 60)
    
    demo_example_1()
    demo_example_2()
    demo_example_3()
    demo_example_4()
    
    print("\n" + "=" * 60)
    print("  演示完成")
    print("=" * 60)
