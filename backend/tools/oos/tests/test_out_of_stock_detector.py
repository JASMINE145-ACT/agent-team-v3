"""
无货行检测器单元测试
"""
import pytest
import pandas as pd
from services.out_of_stock_detector import OutOfStockDetector


class TestOutOfStockDetector:
    """无货行检测器测试"""
    
    def test_identify_out_of_stock_rows(self):
        """测试识别无货行"""
        detector = OutOfStockDetector()
        
        # 创建测试数据
        df = pd.DataFrame({
            "产品名称": ["产品A", "产品B", "产品C"],
            "状态": ["有货", "无货", "有货"],
            "数量": [10, 20, 30]
        })
        
        out_of_stock_rows, header_idx, extracted_df = detector.identify_out_of_stock_rows(df)
        
        assert len(out_of_stock_rows) > 0
        assert header_idx is not None
        assert len(extracted_df) > 0
    
    def test_format_rows_for_llm(self):
        """测试格式化数据供 LLM 处理"""
        detector = OutOfStockDetector()
        
        df = pd.DataFrame({
            "产品名称": ["产品A"],
            "数量": [10]
        })
        
        markdown = detector.format_rows_for_llm(df)
        assert "|" in markdown
        assert "产品名称" in markdown
