"""
库存查询 Agent - 单元测试

测试各个 Agent 的核心功能
"""

import pytest
from unittest.mock import Mock, patch
from pydantic import ValidationError

from inventory_agent.agents.plan_agent import InventoryPlanAgent
from inventory_agent.agents.table_agent import InventoryTableAgent
from inventory_agent.agents.sql_agent import InventorySQLAgent
from inventory_agent.models import Item, QueryIntent


class TestPlanAgent:
    """Test Plan Agent - 意图解析"""
    
    def setup_method(self):
        """Setup test fixtures"""
        self.agent = InventoryPlanAgent()
    
    def test_parse_keywords_query(self):
        """Test parsing keywords query (模糊匹配)"""
        intent = self.agent._parse_with_rules("查一下 Tee With Cover / dn40 库存")
        
        assert intent.keywords == "Tee With Cover / dn40"
        assert intent.strategy == "keywords"
        assert intent.confidence >= 0.8
    
    def test_parse_code_query(self):
        """Test parsing Item Code query (精确匹配)"""
        intent = self.agent._parse_with_rules("8030020580 库存多少")
        
        assert intent.keywords == "8030020580"
        assert intent.strategy == "code"
        assert intent.confidence >= 0.9
    
    def test_is_item_code_with_10_digits(self):
        """Test Item Code recognition with 10 digits"""
        assert self.agent._is_item_code("8030020580") is True
        assert self.agent._is_item_code("1234567890") is True
    
    def test_is_item_code_with_mixed_content(self):
        """Test Item Code recognition with mixed content"""
        assert self.agent._is_item_code("8030020580 库存") is True
        assert self.agent._is_item_code("编号 8030020580") is True
    
    def test_is_item_code_with_less_than_10_digits(self):
        """Test Item Code recognition with less than 10 digits"""
        assert self.agent._is_item_code("123456789") is False
        assert self.agent._is_item_code("123") is False
    
    def test_is_item_code_with_non_digit(self):
        """Test Item Code recognition with non-digit content"""
        assert self.agent._is_item_code("Tee With Cover") is False
        assert self.agent._is_item_code("803002058a") is False
    
    def test_extract_keywords_with_stop_words(self):
        """Test keyword extraction with stop words"""
        result = self.agent._extract_keywords("查一下 Tee With Cover / dn40 库存")
        assert result == "Tee With Cover / dn40"
    
    def test_parse_with_rules_code(self):
        """Test parse with rules for Item Code"""
        intent = self.agent.parse("8030020580")
        assert intent.keywords == "8030020580"
        assert intent.strategy == "code"
    
    def test_parse_with_rules_keywords(self):
        """Test parse with rules for keywords"""
        intent = self.agent.parse("Tee With Cover")
        assert "Tee With Cover" in intent.keywords
        assert intent.strategy == "keywords"
    
    def test_query_intent_validation(self):
        """Test QueryIntent Pydantic model validation"""
        # Valid intent
        intent = QueryIntent(
            keywords="Tee With Cover / dn40",
            strategy="keywords",
            confidence=0.95
        )
        assert intent.keywords == "Tee With Cover / dn40"
        assert intent.strategy == "keywords"
        assert intent.confidence == 0.95
    
    def test_query_intent_invalid_strategy(self):
        """Test QueryIntent with invalid strategy"""
        with pytest.raises(ValidationError):
            QueryIntent(
                keywords="test",
                strategy="invalid",
                confidence=0.5
            )
    
    def test_query_intent_default_values(self):
        """Test QueryIntent with default values"""
        intent = QueryIntent(keywords="test")
        assert intent.strategy == "keywords"  # Default value
        assert intent.confidence == 1.0  # Default value


class TestSQLAgent:
    """Test SQL Agent - 结果格式化"""
    
    def setup_method(self):
        """Setup test fixtures"""
        self.agent = InventorySQLAgent()
    
    def test_format_empty_results(self):
        """Test formatting empty results"""
        response = self.agent.format_response([])
        assert "未找到匹配产品" in response
    
    def test_format_single_result(self):
        """Test formatting single result"""
        item = Item(
            item_no="8030020580",
            item_name="#C11 Tee With Cover / dn40 - LESSO",
            item_type="Inventory",
            unit="PCS",
            qty_warehouse=0.0,
            qty_available=0.0
        )
        response = self.agent.format_response([item])
        assert "#C11 Tee With Cover / dn40 - LESSO" in response
        assert "库存有 0.0" in response
    
    def test_format_multiple_results(self):
        """Test formatting multiple results"""
        items = [
            Item(
                item_no="8030020580",
                item_name="#C11 Tee With Cover / dn40",
                item_type="Inventory",
                unit="PCS",
                qty_warehouse=0.0,
                qty_available=0.0
            ),
            Item(
                item_no="8030020187",
                item_name="#C12 Tee With Cover / dn32",
                item_type="Inventory",
                unit="PCS",
                qty_warehouse=20.0,
                qty_available=20.0
            ),
        ]
        response = self.agent.format_response(items)
        assert "找到以下产品" in response
        assert "共找到 2 条记录" in response
        assert "总库存" in response
    
    def test_format_multiple_results_with_warning(self):
        """Test formatting multiple results with warning"""
        items = [
            Item(item_no="001", item_name="Product 1", item_type="Inventory", unit="PCS", qty_warehouse=10.0, qty_available=10.0),
            Item(item_no="002", item_name="Product 2", item_type="Inventory", unit="PCS", qty_warehouse=20.0, qty_available=20.0),
        ]
        response = self.agent.format_response_with_warning(items, total_count=15)
        assert "找到 15 条记录" in response
        assert "仅展示前 2 条" in response
    
    def test_format_single_with_large_quantity(self):
        """Test formatting with large quantity values"""
        item = Item(
            item_no="8030020052",
            item_name="#C13 GANG BOX",
            item_type="Inventory",
            unit="PCS",
            qty_warehouse=888.0,
            qty_available=0.0
        )
        response = self.agent.format_response([item])
        assert "#C13 GANG BOX" in response
        assert "库存有 888.0" in response
    
    def test_format_single_with_decimal_quantity(self):
        """Test formatting with decimal quantity values"""
        item = Item(
            item_no="8030020232",
            item_name="#C21 1 Way Terminal Box",
            item_type="Inventory",
            unit="PCS",
            qty_warehouse=3.345,
            qty_available=2.737
        )
        response = self.agent.format_response([item])
        assert "#C21 1 Way Terminal Box" in response
        assert "库存有 3.345" in response


class TestTableAgent:
    """Test Table Agent - 数据抓取"""
    
    def setup_method(self):
        """Setup test fixtures"""
        self.agent = InventoryTableAgent()
    
    def test_parse_item_with_all_fields(self):
        """Test parsing item with all required fields"""
        api_data = {
            "no": "8030020580",
            "name": "#C11 Tee With Cover / dn40 - LESSO",
            "type": "Inventory",
            "unit": "PCS",
            "quantityOnHand": 0,
            "quantityAvailable": 0
        }
        item = self.agent._parse_item(api_data)
        assert item.item_no == "8030020580"
        assert item.item_name == "#C11 Tee With Cover / dn40 - LESSO"
        assert item.item_type == "Inventory"
        assert item.unit == "PCS"
        assert item.qty_warehouse == 0.0
        assert item.qty_available == 0.0
    
    def test_parse_item_with_detail_warehouse_data(self):
        """Test parsing item with nested detailWarehouseData"""
        api_data = {
            "no": "8030020580",
            "name": "#C11 Tee With Cover / dn40",
            "type": "Inventory",
            "unit": "PCS",
            "quantityOnHand": None,  # Not in main fields
            "quantityAvailable": None,
            "detailWarehouseData": [
                {"warehouseNo": "WH1", "quantity": 20}
            ]
        }
        item = self.agent._parse_item(api_data)
        assert item.qty_warehouse == 20.0
    
    def test_parse_item_with_missing_required_field(self):
        """Test parsing item with missing required field"""
        api_data = {
            "no": "8030020580",
            "name": "#C11 Tee With Cover / dn40",
            "type": "Inventory",
            # Missing 'unit' - will be converted to empty string
            "quantityOnHand": 0,
            "quantityAvailable": 0
        }
        # 当前实现会将缺失字段转换为空字符串，不会抛出错误
        item = self.agent._parse_item(api_data)
        assert item.unit == ""  # Missing field becomes empty string
        assert item.item_no == "8030020580"

    def test_parse_item_with_decimal_quantity(self):
        """Test parsing item with decimal quantity"""
        api_data = {
            "no": "8030020232",
            "name": "#C21 1 Way Terminal Box",
            "type": "Inventory",
            "unit": "PCS",
            "quantityOnHand": 3.345,
            "quantityAvailable": 2.737
        }
        item = self.agent._parse_item(api_data)
        # Note: 当前实现中，如果API返回的字段名与预期不完全一致，可能会失败
        # 这里测试验证 float() 转换是否正常工作
        assert item.qty_warehouse == 3.345
        assert item.qty_available == 2.737

    def test_parse_item_with_string_quantity(self):
        """Test parsing item with string quantity (conversion to float)"""
        api_data = {
            "no": "8030020580",
            "name": "#C11 Tee With Cover / dn40",
            "type": "Inventory",
            "unit": "PCS",
            "quantityOnHand": "20",
            "quantityAvailable": "20"
        }
        item = self.agent._parse_item(api_data)
        assert item.qty_warehouse == 20.0
        assert item.qty_available == 20.0
    
    @patch('inventory_agent.agents.table_agent.AccurateOnlineAPIClient')
    def test_call_list_api_empty_result(self, mock_client):
        """Test calling list.do API with empty result"""
        mock_instance = Mock()
        mock_instance.get_table_data.return_value = {"s": True, "d": []}
        mock_client.return_value = mock_instance
        
        agent = InventoryTableAgent()
        result = agent._call_list_api("nonexistent")
        assert result == []
    
    @patch('inventory_agent.agents.table_agent.AccurateOnlineAPIClient')
    def test_call_list_api_with_data(self, mock_client):
        """Test calling list.do API with data"""
        mock_instance = Mock()
        mock_instance.get_table_data.return_value = {
            "s": True,
            "d": [
                {"id": 1001, "no": "001", "name": "Product 1", "type": "Inventory", "unit": "PCS", "quantityOnHand": 10, "quantityAvailable": 10}
            ]
        }
        mock_client.return_value = mock_instance
        
        agent = InventoryTableAgent()
        result = agent._call_list_api("test")
        assert len(result) == 1
        assert result[0]["no"] == "001"
    
    @patch('inventory_agent.agents.table_agent.AccurateOnlineAPIClient')
    def test_call_list_api_error_response(self, mock_client):
        """Test calling list.do API with error response"""
        mock_instance = Mock()
        mock_instance.get_table_data.return_value = {"s": False, "d": {"message": "Invalid request"}}
        mock_client.return_value = mock_instance
        
        agent = InventoryTableAgent()
        result = agent._call_list_api("test")
        assert result == []


class TestItemModel:
    """Test Item Pydantic model"""
    
    def test_item_creation(self):
        """Test creating Item model"""
        item = Item(
            item_no="8030020580",
            item_name="#C11 Tee With Cover / dn40 - LESSO",
            item_type="Inventory",
            unit="PCS",
            qty_warehouse=0.0,
            qty_available=0.0
        )
        assert item.item_no == "8030020580"
        assert item.item_name == "#C11 Tee With Cover / dn40 - LESSO"
    
    def test_item_default_quantity_values(self):
        """Test Item model with default quantity values"""
        item = Item(
            item_no="8030020580",
            item_name="#C11 Tee With Cover / dn40",
            item_type="Inventory",
            unit="PCS"
        )
        assert item.qty_warehouse == 0.0
        assert item.qty_available == 0.0
    
    def test_item_missing_required_field(self):
        """Test Item model with missing required field"""
        with pytest.raises(ValidationError):
            Item(
                item_no="8030020580",
                # Missing item_name
                item_type="Inventory",
                unit="PCS"
            )


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
