"""
Excel 读取模块
"""
import pandas as pd
import io
import os
from typing import List, Tuple, Optional
from pathlib import Path
import logging

import chardet

logger = logging.getLogger(__name__)


class ExcelReader:
    """Excel 读取器"""

    def __init__(self):
        self.supported_formats = [".xlsx", ".xls"]
        # 乱码检测阈值（可通过环境变量覆盖）
        self.garbled_threshold = float(os.getenv("EXCEL_GARBLED_THRESHOLD", "0.3"))

    @staticmethod
    def _is_garbled(text: str) -> bool:
        """
        检测文本是否为乱码（� 替换字符、超出 BMP 字符）

        Args:
            text: 待检测文本

        Returns:
            True 表示乱码
        """
        if not text or not isinstance(text, str):
            return False
        garbled_chars = sum(1 for c in text if c in '\ufffd\u0000' or ord(c) > 0xFFFF)
        return len(text) > 0 and (garbled_chars / len(text)) > 0.2

    def _detect_encoding(self, file_bytes: bytes) -> Tuple[str, float]:
        """
        检测文件编码，返回 (encoding, confidence)

        Args:
            file_bytes: 文件字节流

        Returns:
            (encoding, confidence): 编码名称和置信度
        """
        result = chardet.detect(file_bytes[:10000])
        return result.get('encoding', 'unknown'), result.get('confidence', 0.0)

    def _check_dataframe_quality(self, df: pd.DataFrame, sheet_name: str) -> None:
        """
        检查 DataFrame 内容质量（乱码检测），超过阈值抛出 ValueError

        Args:
            df: DataFrame 数据
            sheet_name: Sheet 名称

        Raises:
            ValueError: 如果乱码比例超过阈值
        """
        # 1. 检测 Sheet 名乱码
        if self._is_garbled(sheet_name):
            logger.warning(f"Sheet name '{sheet_name}' contains garbled text")

        # 2. 检测单元格乱码
        total_cells = df.size
        if total_cells == 0:
            return

        garbled_cells = sum(
            1 for val in df.values.flatten()
            if isinstance(val, str) and self._is_garbled(val)
        )
        garbled_ratio = garbled_cells / total_cells

        if garbled_ratio > self.garbled_threshold:
            logger.error(f"Sheet '{sheet_name}': {garbled_ratio:.1%} cells contain garbled text")
            raise ValueError(
                f"Sheet '{sheet_name}' 包含过多乱码（{garbled_ratio:.1%}），文件可能损坏或使用不支持的编码。\n"
                f"修复建议：\n"
                f"1. 在 Excel 中打开文件，另存为 → 选择「Excel 工作簿 (.xlsx)」→ 工具 → Web 选项 → 编码 → UTF-8\n"
                f"2. 或将所有数据复制到新 Excel 文件"
            )

    def read_excel(
        self,
        file_bytes: bytes,
        sheet_name: Optional[str] = None,
        raw: bool = False,
    ) -> List[Tuple[str, pd.DataFrame]]:
        """
        读取 Excel 文件

        Args:
            file_bytes: Excel 文件字节流
            sheet_name: 指定 Sheet 名称，None 则读取所有 Sheet
            raw: 若 True 则 header=None，不把首行当表头，保留所有行（用于无货检测，避免标题行导致漏检）

        Returns:
            List of (sheet_name, DataFrame) tuples
        """
        try:
            # 1. 编码预检（仅记录警告）
            encoding, confidence = self._detect_encoding(file_bytes)
            if confidence < 0.7:
                logger.warning(f"Low encoding confidence ({confidence:.2%}), detected as {encoding}")

            # 2. 读取 Excel
            excel_file = io.BytesIO(file_bytes)
            read_kw = dict(engine="openpyxl")
            if raw:
                read_kw["header"] = None  # 保留所有行，便于无货行检测

            if sheet_name:
                df = pd.read_excel(excel_file, sheet_name=sheet_name, **read_kw)
                self._check_dataframe_quality(df, sheet_name)  # 新增：质量检测
                return [(sheet_name, df)]
            else:
                excel_file.seek(0)
                excel_dict = pd.read_excel(excel_file, sheet_name=None, **read_kw)
                results = []
                for name, df in excel_dict.items():
                    self._check_dataframe_quality(df, name)  # 新增：质量检测
                    results.append((name, df))
                return results
        except ValueError as e:
            # 质量检测抛出的 ValueError 直接传递（包含用户友好提示）
            raise
        except Exception as e:
            logger.error(f"Excel 读取失败: {e}")
            raise ValueError(f"Excel 文件读取失败：{str(e)}，请检查文件是否损坏")
    
    def read_excel_from_path(self, file_path: Path, sheet_name: Optional[str] = None) -> List[Tuple[str, pd.DataFrame]]:
        """
        从文件路径读取 Excel
        
        Args:
            file_path: Excel 文件路径
            sheet_name: 指定 Sheet 名称
        
        Returns:
            List of (sheet_name, DataFrame) tuples
        """
        with open(file_path, 'rb') as f:
            file_bytes = f.read()
        return self.read_excel(file_bytes, sheet_name)
