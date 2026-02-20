"""
文件验证器单元测试
"""
import pytest
from services.file_validator import FileValidator


class TestFileValidator:
    """文件验证器测试"""
    
    def test_validate_file_type_xlsx(self):
        """测试验证 .xlsx 文件"""
        # Excel xlsx 文件头：50 4B 03 04
        xlsx_header = b'\x50\x4B\x03\x04' + b'\x00' * 100
        is_valid, error = FileValidator.validate_file_type(xlsx_header, "test.xlsx")
        assert is_valid is True
    
    def test_validate_file_type_xls(self):
        """测试验证 .xls 文件"""
        # Excel xls 文件头：D0 CF 11 E0
        xls_header = b'\xD0\xCF\x11\xE0' + b'\x00' * 100
        is_valid, error = FileValidator.validate_file_type(xls_header, "test.xls")
        assert is_valid is True
    
    def test_validate_file_type_invalid(self):
        """测试验证无效文件类型"""
        invalid_file = b'\x00' * 100
        is_valid, error = FileValidator.validate_file_type(invalid_file, "test.txt")
        assert is_valid is False
        assert "不支持" in error or "格式" in error
    
    def test_validate_file_size(self):
        """测试验证文件大小"""
        # 正常大小
        is_valid, error = FileValidator.validate_file_size(1024 * 1024)  # 1MB
        assert is_valid is True
        
        # 文件过大
        is_valid, error = FileValidator.validate_file_size(300 * 1024 * 1024)  # 300MB
        assert is_valid is False
        
        # 文件过小
        is_valid, error = FileValidator.validate_file_size(50)
        assert is_valid is False
