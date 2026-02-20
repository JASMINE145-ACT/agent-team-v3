"""
Excel Reader 单元测试
"""
import pytest
import pandas as pd
import io
from services.excel_reader import ExcelReader


class TestExcelReader:
    """Excel Reader 测试"""
    
    def test_read_excel_from_bytes(self):
        """测试从字节流读取 Excel"""
        reader = ExcelReader()
        
        # 创建测试 Excel 数据
        df = pd.DataFrame({
            "产品名称": ["产品A", "产品B"],
            "数量": [10, 20]
        })
        
        # 转换为字节流
        excel_bytes = io.BytesIO()
        df.to_excel(excel_bytes, index=False, engine='openpyxl')
        excel_bytes.seek(0)
        
        # 读取
        result = reader.read_excel(excel_bytes.getvalue())
        assert len(result) > 0
        assert isinstance(result[0][1], pd.DataFrame)
    
    def test_read_specific_sheet(self):
        """测试读取指定 Sheet"""
        reader = ExcelReader()
        # TODO: 实现测试
        pass
    
    def test_read_multiple_sheets(self):
        """测试读取多个 Sheet"""
        reader = ExcelReader()
        # TODO: 实现测试
        pass
