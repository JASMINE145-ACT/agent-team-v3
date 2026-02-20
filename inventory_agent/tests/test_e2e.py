"""
库存查询 Agent - 端到端测试

测试完整的用户查询流程：自然语言输入 → 意图解析 → 数据抓取 → 结果格式化
"""

import pytest
import os
import time

from inventory_agent import InventoryAgent


@pytest.mark.integration
@pytest.mark.skipif(
    os.getenv("AOL_ACCESS_TOKEN") is None
    or os.getenv("AOL_SIGNATURE_SECRET") is None
    or os.getenv("AOL_DATABASE_ID") is None,
    reason="ACCURATE API credentials not set"
)
class TestEndToEnd:
    """端到端测试 - 完整用户场景验证"""

    def setup_method(self):
        """Setup test fixtures"""
        self.agent = InventoryAgent()

    def test_e2e_keywords_query_tee_with_cover_dn40(self):
        """
        E2E-001: 关键词模糊匹配查询

        用户输入："查一下 Tee With Cover / dn40 库存"
        期望：返回包含 #C11 的结果，库存为 0
        """
        user_input = "查一下 Tee With Cover / dn40 库存"
        response = self.agent.query(user_input)

        # 验证响应包含关键信息
        assert "#C11" in response, f"响应应包含 #C11，实际: {response}"
        assert "Tee With Cover" in response, f"响应应包含产品名称，实际: {response}"
        assert "0" in response, f"响应应包含库存 0，实际: {response}"

    def test_e2e_item_code_query(self):
        """
        E2E-002: Item Code 精确查询

        用户输入："8030020580 库存多少"
        期望：返回包含 #C11 Tee With Cover / dn40 的结果
        """
        user_input = "8030020580 库存多少"
        response = self.agent.query(user_input)

        # 验证响应包含关键信息
        assert "#C11" in response, f"响应应包含 #C11，实际: {response}"
        assert "0" in response, f"响应应包含库存，实际: {response}"

    def test_e2e_c12_dn32_query(self):
        """
        E2E-003: PRD断言 - #C12 dn32 库存查询

        用户输入："C12 dn32 库存"
        期望：返回包含 #C12 Tee With Cover / dn32，库存为 20
        """
        user_input = "C12 dn32 库存"
        response = self.agent.query(user_input)

        # 验证响应包含关键信息
        assert "#C12" in response, f"响应应包含 #C12，实际: {response}"
        assert "dn32" in response, f"响应应包含 dn32，实际: {response}"
        assert "20" in response, f"响应应包含库存 20，实际: {response}"

    def test_e2e_multiple_results_tee_with_cover(self):
        """
        E2E-004: 多条结果查询

        用户输入："Tee With Cover"
        期望：返回多个 Tee With Cover 系列产品的列表
        """
        user_input = "Tee With Cover"
        response = self.agent.query(user_input)

        # 验证响应包含列表格式
        assert "找到以下产品" in response or "库存有" in response, f"响应应为列表或单条格式，实际: {response}"

        # 验证响应包含多个产品信息
        if "找到以下产品" in response:
            # 多条结果格式
            assert "共找到" in response, f"多条响应应包含总数，实际: {response}"
            assert "总库存" in response, f"多条响应应包含汇总，实际: {response}"

    def test_e2e_empty_result_nonexistent_product(self):
        """
        E2E-005: 不存在的产品查询

        用户输入："不存在的产品XYZ"
        期望：返回友好提示"未找到匹配产品"
        """
        user_input = "不存在的产品XYZ 库存"
        response = self.agent.query(user_input)

        # 验证响应包含友好提示
        assert "未找到匹配产品" in response, f"响应应包含友好提示，实际: {response}"

    def test_e2e_natural_language_variations(self):
        """
        E2E-006: 自然语言表达变体测试

        测试不同的用户表达方式
        """
        test_inputs = [
            "Tee With Cover dn40 还有多少",
            "查一下 Tee With Cover / dn40 的库存情况",
            "8030020187 有多少库存",
            "查询 8030020580 的可用数量",
        ]

        for user_input in test_inputs:
            response = self.agent.query(user_input)
            # 验证响应不为空
            assert response, f"用户输入 '{user_input}' 应返回非空响应"
            # 验证响应不包含错误信息
            assert "出错" not in response, f"用户输入 '{user_input}' 不应返回错误"

    def test_e2e_response_time_performance(self):
        """
        E2E-007: 响应时间性能测试

        验证单次查询响应时间 < 8秒（LLM+多轮 API 链略慢）
        """
        user_input = "8030020580 库存"

        start_time = time.time()
        response = self.agent.query(user_input)
        end_time = time.time()

        elapsed_time = end_time - start_time

        # 验证响应不为空
        assert response, "查询应返回非空响应"

        # 验证响应时间 < 8秒
        assert elapsed_time < 8.0, f"响应时间 {elapsed_time:.2f}s 超过 8秒阈值"

    def test_e2e_decimal_quantity_display(self):
        """
        E2E-008: 数量显示测试（按现网数据 8030020232 为 3345.0 / 2737.0）
        """
        user_input = "8030020232 库存"
        response = self.agent.query(user_input)

        # 验证响应包含数量（现网为 3345.0）
        assert "3345" in response or "2737" in response, f"响应应包含数量，实际: {response}"

    def test_e2e_large_quantity_display(self):
        """
        E2E-009: 大数量显示测试

        用户输入："8030020052 库存"
        期望：正确显示大数量 (888)
        """
        user_input = "8030020052 库存"
        response = self.agent.query(user_input)

        # 验证响应包含大数量
        assert "888" in response, f"响应应包含大数量 888，实际: {response}"

    def test_e2e_query_items_method(self):
        """
        E2E-010: query_items 方法测试

        测试返回原始 Item 对象列表的方法
        """
        user_input = "Tee With Cover"
        items = self.agent.query_items(user_input)

        # 验证返回的是列表
        assert isinstance(items, list), "query_items 应返回列表"

        # 验证列表不为空（假设有数据）
        # 如果没有数据，测试应该跳过
        if len(items) > 0:
            # 验证第一个元素是 Item 对象
            item = items[0]
            assert hasattr(item, "item_no"), "Item 对象应包含 item_no 属性"
            assert hasattr(item, "item_name"), "Item 对象应包含 item_name 属性"
            assert hasattr(item, "qty_warehouse"), "Item 对象应包含 qty_warehouse 属性"

    def test_e2e_error_handling_api_timeout(self):
        """
        E2E-011: API 超时错误处理

        测试 API 超时时的错误处理
        注意：此测试需要模拟超时场景，实际运行时可能需要跳过
        """
        # 注意：实际测试时可能需要模拟超时
        # 这里仅测试错误处理机制是否存在
        user_input = "测试产品"
        response = self.agent.query(user_input, max_retries=1)

        # 验证返回非空响应（成功或错误提示）
        assert response, "即使出错也应返回友好的错误提示"

    def test_e2e_special_characters_in_query(self):
        """
        E2E-012: 特殊字符查询测试

        测试包含特殊字符的查询
        """
        user_input = "#C21 1 Way Terminal Box (With Cover) 库存"
        response = self.agent.query(user_input)

        # 验证响应不为空
        assert response, "特殊字符查询应返回非空响应"

    def test_e2e_chinese_language_query(self):
        """
        E2E-013: 中文查询测试

        测试纯中文的查询
        """
        user_input = "查询三通库存"
        response = self.agent.query(user_input)

        # 验证响应不为空（可能有结果，也可能提示未找到）
        assert response, "中文查询应返回非空响应"

    def test_e2e_mixed_language_query(self):
        """
        E2E-014: 中英文混合查询测试

        测试中英文混合的查询
        """
        user_input = "查一下 dn40 的库存"
        response = self.agent.query(user_input)

        # 验证响应不为空
        assert response, "中英文混合查询应返回非空响应"


@pytest.mark.integration
@pytest.mark.skipif(
    os.getenv("AOL_ACCESS_TOKEN") is None
    or os.getenv("AOL_SIGNATURE_SECRET") is None
    or os.getenv("AOL_DATABASE_ID") is None,
    reason="ACCURATE API credentials not set"
)
class TestEndToEndScenarios:
    """端到端场景测试 - 模拟真实用户使用场景"""

    def setup_method(self):
        """Setup test fixtures"""
        self.agent = InventoryAgent()

    def test_scenario_1_sales_person_quick_query(self):
        """
        场景 1：销售人员快速查询

        业务场景：销售人员在与客户沟通时，需要快速查询某产品的库存
        测试：快速响应、准确显示
        """
        user_input = "Tee With Cover dn40 库存"

        start_time = time.time()
        response = self.agent.query(user_input)
        elapsed_time = time.time() - start_time

        # 验证响应时间（放宽至 8 秒，LLM+API 链）
        assert elapsed_time < 8.0, f"销售人员快速查询应在 8 秒内完成，实际: {elapsed_time:.2f}s"

        # 验证响应简洁明了
        assert "库存有" in response, "响应应包含库存数量"
        assert "Tee With Cover" in response or "#C11" in response, "响应应包含产品信息"

    def test_scenario_2_customer_inquiry(self):
        """
        场景 2：客户询问库存

        业务场景：客户询问某产品是否有货
        测试：清晰显示可用数量
        """
        user_input = "8030020187 还有多少"
        response = self.agent.query(user_input)

        # 验证响应包含可用信息
        assert response, "响应应不为空"
        # 根据实际数据验证
        # 注意：如果可售数量与库存不同，可能需要同时显示两者

    def test_scenario_3_multiple_candidates(self):
        """
        场景 3：多候选产品查询

        业务场景：查询关键词可能匹配多个产品
        测试：列表展示，供用户选择
        """
        user_input = "Tee With Cover"
        response = self.agent.query(user_input)

        # 验证响应格式
        if "找到以下产品" in response:
            # 多条结果：应显示列表
            assert "共找到" in response, "多条结果应显示总数"
            assert "总库存" in response, "多条结果应显示汇总"
        else:
            # 单条结果：应直接显示库存
            assert "库存有" in response, "响应应包含库存信息"


if __name__ == "__main__":
    # 检查环境变量
    if not all([os.getenv("AOL_ACCESS_TOKEN"), os.getenv("AOL_SIGNATURE_SECRET"), os.getenv("AOL_DATABASE_ID")]):
        print("错误: 缺少 ACCURATE API 环境变量")
        print("请设置以下环境变量:")
        print("  - AOL_ACCESS_TOKEN")
        print("  - AOL_SIGNATURE_SECRET")
        print("  - AOL_DATABASE_ID")
        exit(1)

    # 运行端到端测试
    pytest.main([__file__, "-v", "-m", "integration"])
