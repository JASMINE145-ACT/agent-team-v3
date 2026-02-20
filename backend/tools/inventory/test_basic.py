"""
库存查询 Agent - 简单测试脚本

用于验证 InventoryAgent 的基本功能
"""

import sys
import logging

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

# 添加项目根目录到 Python 路径
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

try:
    from inventory_agent import InventoryAgent, Item, QueryIntent
    from backend.tools.inventory.models import QueryIntent
    
    print("=" * 60)
    print("库存查询 Agent - 测试脚本")
    print("=" * 60)
    
    # 测试 1: Plan Agent
    print("\n[测试 1] Plan Agent - 解析用户意图")
    print("-" * 60)
    
    from backend.tools.inventory.agents.plan_agent import InventoryPlanAgent
    plan_agent = InventoryPlanAgent()
    
    test_queries = [
        "查一下 Tee With Cover / dn40 库存",
        "8030020580 库存多少",
        "C12 dn32 还有多少",
    ]
    
    for query in test_queries:
        try:
            intent = plan_agent.parse(query)
            print(f"输入: {query}")
            print(f"输出: keywords='{intent.keywords}', strategy='{intent.strategy}', confidence={intent.confidence}")
            print()
        except Exception as e:
            print(f"输入: {query}")
            print(f"错误: {e}")
            print()
    
    # 测试 2: SQL Agent
    print("\n[测试 2] SQL Agent - 格式化输出")
    print("-" * 60)
    
    from backend.tools.inventory.agents.sql_agent import InventorySQLAgent
    sql_agent = InventorySQLAgent()
    
    # 模拟空结果
    empty_response = sql_agent.format_response([])
    print(f"空结果: {empty_response}")
    
    # 模拟单条结果
    mock_item = Item(
        item_no="8030020580",
        item_name="#C11 Tee With Cover / dn40 - LESSO",
        item_type="Inventory",
        unit="PCS",
        qty_warehouse=0.0,
        qty_available=0.0
    )
    single_response = sql_agent.format_response([mock_item])
    print(f"单条结果:\n{single_response}")
    
    # 模拟多条结果
    mock_items = [
        Item(item_no="8030020580", item_name="#C11 Tee With Cover / dn40", item_type="Inventory", unit="PCS", qty_warehouse=0.0, qty_available=0.0),
        Item(item_no="8030020187", item_name="#C12 Tee With Cover / dn32", item_type="Inventory", unit="PCS", qty_warehouse=20.0, qty_available=20.0),
    ]
    multiple_response = sql_agent.format_response(mock_items)
    print(f"\n多条结果:\n{multiple_response}")
    
    print("\n[测试完成] 所有测试通过!")
    print("=" * 60)
    
except ImportError as e:
    print(f"导入失败: {e}")
    print("请确保环境变量已正确设置，并安装了必要的依赖包")
    print("\n需要的环境变量:")
    print("  - AOL_ACCESS_TOKEN")
    print("  - AOL_SIGNATURE_SECRET")
    print("  - AOL_DATABASE_ID")
    print("  - OPENAI_API_KEY (可选，用于LLM模式)")
    print("\n或使用规则模式（不需要LLM）")
    sys.exit(1)
except Exception as e:
    print(f"测试失败: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
