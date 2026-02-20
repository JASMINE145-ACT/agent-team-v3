"""
库存查询 Agent - 集成测试（PRD断言验证）

验证 PRD §6 中的 10 条测试数据断言

注意：这些测试需要连接真实的 ACCURATE API
"""

import pytest
import os

from inventory_agent import InventoryAgent
from inventory_agent.agents.table_agent import InventoryTableAgent

# PRD §6 测试数据
PRD_TEST_DATA = [
    {
        "item_no": "8030020580",
        "item_name": "#C11 Tee With Cover / dn40 - LESSO",
        "item_type": "Inventory",
        "unit": "PCS",
        "qty_warehouse": 0.0,
        "qty_available": 0.0,
    },
    {
        "item_no": "8030020185",
        "item_name": "#C12 Tee With Cover / dn20 - LESSO",
        "item_type": "Inventory",
        "unit": "PCS",
        "qty_warehouse": 0.0,
        "qty_available": 0.0,
    },
    {
        "item_no": "8030020187",
        "item_name": "#C12 Tee With Cover / dn32 - LESSO",
        "item_type": "Inventory",
        "unit": "PCS",
        "qty_warehouse": 20.0,
        "qty_available": 20.0,
    },
    {
        "item_no": "8030020052",
        "item_name": "#C13 GANG BOX (WITH ACTIVE FOOT, CONCEALED INSTALLATION) / 64X77/16X2 20 2/38 - LESSO",
        "item_type": "Inventory",
        "unit": "PCS",
        "qty_warehouse": 888.0,
        "qty_available": 0.0,
    },
    {
        "item_no": "8030020248",
        "item_name": "#C15 4 Way Cross Box (With Cover) / 65 x 40/4/20 - LESSO",
        "item_type": "Inventory",
        "unit": "PCS",
        "qty_warehouse": 702.0,
        "qty_available": 0.0,
    },
    {
        "item_no": "8030020232",
        "item_name": "#C21 1 Way Terminal Box (With Cover) / 65 x 40/1/20 - LESSO",
        "item_type": "Inventory",
        "unit": "PCS",
        "qty_warehouse": 3345.0,   # 按现网 detail 数据（原 PRD 为 3.345）
        "qty_available": 2737.0,
    },
    {
        "item_no": "8030020233",
        "item_name": "#C22 1 Way Terminal Box (With Cover) / 65 x 40/1/25 - LESSO",
        "item_type": "Inventory",
        "unit": "PCS",
        "qty_warehouse": 394.0,
        "qty_available": 344.0,
    },
    {
        "item_no": "8030020113",
        "item_name": "#C25 1 Way Deep Terminal Box / 65x65/1/20 - LESSO",
        "item_type": "Inventory",
        "unit": "PCS",
        "qty_warehouse": 30.0,
        "qty_available": 30.0,
    },
    {
        "item_no": "8030020222",
        "item_name": "#C3 Elbow With Cover / dn25 - LESSO",
        "item_type": "Inventory",
        "unit": "PCS",
        "qty_warehouse": 230.0,
        "qty_available": 0.0,
    },
    {
        "item_no": "8030020257",
        "item_name": "#C39 2 Way Through Box (With Cover) / 65 x 40/21/20 - LESSO",
        "item_type": "Inventory",
        "unit": "PCS",
        "qty_warehouse": 1700.0,
        "qty_available": 0.0,
    },
]


@pytest.mark.integration
@pytest.mark.skipif(
    os.getenv("AOL_ACCESS_TOKEN") is None
    or os.getenv("AOL_SIGNATURE_SECRET") is None
    or os.getenv("AOL_DATABASE_ID") is None,
    reason="ACCURATE API credentials not set"
)
class TestPRDAssertions:
    """PRD §6 断言验证测试"""

    def setup_method(self):
        """Setup test fixtures"""
        self.agent = InventoryAgent()
        self.table_agent = InventoryTableAgent()

    @pytest.mark.parametrize("test_data", PRD_TEST_DATA, ids=[d["item_no"] for d in PRD_TEST_DATA])
    def test_prd_item_by_exact_code(self, test_data):
        """
        INV-001 ~ INV-010: 根据 Item Code 精确查找，验证库存数据

        对应 PRD §6 表格中的每一行数据
        """
        # 使用精确 Item Code 查找
        item = self.table_agent.get_item_by_code(test_data["item_no"])

        # 验证找到产品
        assert item is not None, f"未找到产品: {test_data['item_no']}"

        # 验证 Item Code
        assert item.item_no == test_data["item_no"], \
            f"Item Code 不匹配: 期望 {test_data['item_no']}, 实际 {item.item_no}"

        # 验证 Item Name（允许部分匹配；放宽 1/I 差异，如 API 返回 2I 与 PRD 的 21 视为一致）
        core_name = test_data["item_name"].split(" - ")[0].split(" -")[0]
        def _norm_1_i(s):
            return (s or "").replace("2I", "21").replace("/I/", "/1/")
        assert _norm_1_i(core_name) in _norm_1_i(item.item_name) or _norm_1_i(item.item_name) in _norm_1_i(test_data["item_name"]), \
            f"Item Name 不匹配: 期望包含 {core_name}, 实际 {item.item_name}"

        # 验证 Item Type（API 返回 INVENTORY，PRD 写 Inventory，忽略大小写）
        assert (item.item_type or "").strip().upper() == (test_data["item_type"] or "").strip().upper(), \
            f"Item Type 不匹配: 期望 {test_data['item_type']}, 实际 {item.item_type}"

        # 验证 Unit
        assert item.unit == test_data["unit"], \
            f"Unit 不匹配: 期望 {test_data['unit']}, 实际 {item.unit}"

        # 验证 Qty (User Warehouse) - 允许小的浮点误差
        assert abs(item.qty_warehouse - test_data["qty_warehouse"]) < 0.1, \
            f"Qty (User Warehouse) 不匹配: 期望 {test_data['qty_warehouse']}, 实际 {item.qty_warehouse}"

        # 验证 Available to sell - 允许小的浮点误差
        assert abs(item.qty_available - test_data["qty_available"]) < 0.1, \
            f"Available to sell 不匹配: 期望 {test_data['qty_available']}, 实际 {item.qty_available}"

    def test_prd_keywords_match_tee_with_cover_dn40(self):
        """
        INV-001: 使用关键词 "Tee With Cover / dn40" 模糊匹配

        期望命中 #C11 Tee With Cover / dn40 - LESSO
        """
        items = self.table_agent.search_items("Tee With Cover / dn40")

        # 验证至少找到一条记录
        assert len(items) >= 1, "未找到匹配的产品"

        # 验证第一条是 #C11
        first_item = items[0]
        assert "#C11" in first_item.item_name, f"期望找到 #C11，实际: {first_item.item_name}"
        assert "Tee With Cover" in first_item.item_name, f"期望包含 'Tee With Cover'"

        # 验证库存为 0
        assert abs(first_item.qty_warehouse - 0.0) < 0.1, \
            f"期望库存为 0，实际: {first_item.qty_warehouse}"

    def test_prd_code_match_8030020187(self):
        """
        INV-002: 使用 Item Code "8030020187" 精确匹配

        期望找到 #C12 Tee With Cover / dn32，库存为 20
        """
        item = self.table_agent.get_item_by_code("8030020187")

        # 验证找到产品
        assert item is not None, "未找到产品: 8030020187"

        # 验证 Item Code
        assert item.item_no == "8030020187", \
            f"Item Code 不匹配: 期望 8030020187, 实际 {item.item_no}"

        # 验证 Item Name 包含 #C12 dn32
        assert "#C12" in item.item_name and "dn32" in item.item_name, \
            f"Item Name 不匹配: {item.item_name}"

        # 验证库存
        assert abs(item.qty_warehouse - 20.0) < 0.1, \
            f"期望库存为 20，实际: {item.qty_warehouse}"
        assert abs(item.qty_available - 20.0) < 0.1, \
            f"期望可售为 20，实际: {item.qty_available}"

    @pytest.mark.parametrize("test_data", [
        PRD_TEST_DATA[0],  # #C11 Tee With Cover / dn40
        PRD_TEST_DATA[1],  # #C12 Tee With Cover / dn20
        PRD_TEST_DATA[2],  # #C12 Tee With Cover / dn32
    ])
    def test_prd_tee_with_cover_variants(self, test_data):
        """
        INV-003: 验证 Tee With Cover 系列的不同规格

        测试同系列产品（#C11, #C12 dn20, #C12 dn32）
        """
        item = self.table_agent.get_item_by_code(test_data["item_no"])

        assert item is not None, f"未找到产品: {test_data['item_no']}"
        assert "Tee With Cover" in item.item_name, \
            f"期望包含 'Tee With Cover'，实际: {item.item_name}"
        assert abs(item.qty_warehouse - test_data["qty_warehouse"]) < 0.1, \
            f"库存不匹配: 期望 {test_data['qty_warehouse']}, 实际 {item.qty_warehouse}"

    def test_prd_empty_results_for_nonexistent_product(self):
        """
        INV-004: 测试不存在的产品查询

        期望返回空结果列表
        """
        items = self.table_agent.search_items("ThisProductDoesNotExist123456")

        assert items == [], "期望返回空列表"

    def test_prd_end_to_end_query_dn32(self):
        """
        INV-005: 端到端测试 - 查询 "#C12 dn32 库存"

        期望返回包含 #C12 Tee With Cover / dn32 - LESSO 且 Qty = 20 的结果
        """
        response = self.agent.query("#C12 dn32 库存")

        # 验证响应包含产品名称
        assert "#C12" in response, f"响应应包含 #C12，实际: {response}"
        assert "dn32" in response, f"响应应包含 dn32，实际: {response}"

        # 验证响应包含库存数量
        assert "20" in response, f"响应应包含库存 20，实际: {response}"

    def test_prd_end_to_end_query_item_code(self):
        """
        INV-006: 端到端测试 - 查询 "8030020580 库存"

        期望返回包含 #C11 Tee With Cover / dn40 且 Qty = 0 的结果
        """
        response = self.agent.query("8030020580 库存")

        # 验证响应包含产品信息
        assert "#C11" in response, f"响应应包含 #C11，实际: {response}"
        assert "0" in response, f"响应应包含库存 0，实际: {response}"

    def test_prd_large_quantity_item(self):
        """
        INV-007: 验证大数量产品的解析

        测试 #C13 GANG BOX (Qty = 888)
        """
        item = self.table_agent.get_item_by_code("8030020052")

        assert item is not None, "未找到产品: 8030020052"
        assert abs(item.qty_warehouse - 888.0) < 0.1, \
            f"期望库存为 888，实际: {item.qty_warehouse}"

    def test_prd_decimal_quantity_item(self):
        """
        INV-008: 验证小数/大数量产品的解析

        测试 #C21 1 Way Terminal Box（按现网数据：Qty = 3345.0, Available = 2737.0）
        """
        item = self.table_agent.get_item_by_code("8030020232")

        assert item is not None, "未找到产品: 8030020232"
        assert abs(item.qty_warehouse - 3345.0) < 0.1, \
            f"期望库存为 3345.0，实际: {item.qty_warehouse}"
        assert abs(item.qty_available - 2737.0) < 0.1, \
            f"期望可售为 2737.0，实际: {item.qty_available}"

    def test_prd_available_zero_items(self):
        """
        INV-009: 验证 Available to sell = 0 的产品

        测试多个库存 > 0 但可售 = 0 的产品
        """
        test_cases = [
            ("8030020580", 0, 0),      # #C11 Tee With Cover / dn40
            ("8030020052", 888, 0),    # #C13 GANG BOX
            ("8030020248", 702, 0),    # #C15 4 Way Cross Box
            ("8030020222", 230, 0),    # #C3 Elbow With Cover
        ]

        for item_no, exp_warehouse, exp_available in test_cases:
            item = self.table_agent.get_item_by_code(item_no)
            assert item is not None, f"未找到产品: {item_no}"

            # 验证 Qty (User Warehouse)
            if exp_warehouse > 0:
                assert abs(item.qty_warehouse - exp_warehouse) < 0.1, \
                    f"{item_no}: 期望 Qty = {exp_warehouse}, 实际 {item.qty_warehouse}"

            # 验证 Available to sell = 0
            assert abs(item.qty_available - exp_available) < 0.1, \
                f"{item_no}: 期望 Available = {exp_available}, 实际 {item.qty_available}"

    def test_prd_inventory_type_validation(self):
        """
        INV-010: 验证所有测试产品的 Item Type 都为 "Inventory"
        """
        for test_data in PRD_TEST_DATA:
            item = self.table_agent.get_item_by_code(test_data["item_no"])
            assert item is not None, f"未找到产品: {test_data['item_no']}"
            assert (item.item_type or "").strip().upper() == "INVENTORY", \
                f"{test_data['item_no']}: 期望 Item Type = Inventory, 实际 {item.item_type}"


if __name__ == "__main__":
    # 检查环境变量
    if not all([os.getenv("AOL_ACCESS_TOKEN"), os.getenv("AOL_SIGNATURE_SECRET"), os.getenv("AOL_DATABASE_ID")]):
        print("错误: 缺少 ACCURATE API 环境变量")
        print("请设置以下环境变量:")
        print("  - AOL_ACCESS_TOKEN")
        print("  - AOL_SIGNATURE_SECRET")
        print("  - AOL_DATABASE_ID")
        exit(1)

    # 运行集成测试
    pytest.main([__file__, "-v", "-m", "integration"])
