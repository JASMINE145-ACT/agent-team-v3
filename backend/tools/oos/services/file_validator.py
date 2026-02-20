"""
文件上传安全验证
"""
import io
from typing import Tuple, Optional
from backend.tools.oos.config import MAX_FILE_SIZE, OUT_OF_STOCK_KEYWORDS


class FileValidator:
    """文件验证器"""
    
    @staticmethod
    def validate_file_type(file_bytes: bytes, filename: str) -> Tuple[bool, Optional[str]]:
        """
        验证文件类型（检查文件头 Magic Number）
        
        Returns:
            (is_valid, error_message)
        """
        # 1. 检查扩展名
        allowed_extensions = [".xlsx", ".xls"]
        if not any(filename.lower().endswith(ext) for ext in allowed_extensions):
            return False, f"文件类型不正确，只支持 .xlsx 和 .xls 格式"
        
        # 2. 检查文件头（Magic Number）
        # Excel 文件头：50 4B 03 04 (ZIP 格式，xlsx) 或 D0 CF 11 E0 (OLE2，xls)
        if len(file_bytes) < 4:
            return False, "文件过小，可能已损坏"
        
        file_header = file_bytes[:4]
        xlsx_header = b'\x50\x4B\x03\x04'  # ZIP
        xls_header = b'\xD0\xCF\x11\xE0'   # OLE2
        
        if not (file_header.startswith(xlsx_header) or file_header.startswith(xls_header)):
            return False, "文件格式不正确，请确认是有效的 Excel 文件"
        
        return True, None
    
    @staticmethod
    def validate_file_size(file_size: int) -> Tuple[bool, Optional[str]]:
        """
        验证文件大小
        
        Returns:
            (is_valid, error_message)
        """
        if file_size > MAX_FILE_SIZE:
            size_mb = file_size / (1024 * 1024)
            max_mb = MAX_FILE_SIZE / (1024 * 1024)
            return False, f"文件过大（{size_mb:.2f}MB），最大支持 {max_mb}MB"
        
        if file_size < 100:  # 最小文件大小
            return False, "文件为空或格式错误"
        
        return True, None
    
    @staticmethod
    def validate(file_bytes: bytes, filename: str) -> Tuple[bool, Optional[str]]:
        """
        综合验证文件
        
        Returns:
            (is_valid, error_message)
        """
        # 验证文件大小
        is_valid, error = FileValidator.validate_file_size(len(file_bytes))
        if not is_valid:
            return False, error
        
        # 验证文件类型
        is_valid, error = FileValidator.validate_file_type(file_bytes, filename)
        if not is_valid:
            return False, error
        
        return True, None
