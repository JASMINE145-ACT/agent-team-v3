"""
无货行识别模块
"""
import pandas as pd
from typing import List, Tuple, Optional
import logging
from config import OUT_OF_STOCK_KEYWORDS, HEADER_KEYWORDS, FOOTER_KEYWORDS, MIN_DATA_SECTION_ROWS

logger = logging.getLogger(__name__)


class OutOfStockDetector:
    """无货行检测器"""
    
    def __init__(self):
        self.out_of_stock_keywords = OUT_OF_STOCK_KEYWORDS
    
    def identify_out_of_stock_rows(self, df: pd.DataFrame) -> Tuple[List[int], Optional[int], pd.DataFrame]:
        """
        识别无货行，返回无货行索引列表、表头行索引、以及包含表头和无货行的 DataFrame。
        
        Args:
            df: Excel DataFrame
        
        Returns:
            (out_of_stock_row_indices, header_row_index, extracted_df)
        """
        # 1. 识别无货行
        out_of_stock_rows = []
        for idx, row in df.iterrows():
            row_values = [str(x).strip().lower() if pd.notna(x) else "" for x in row.values]
            row_text = ' '.join(row_values)
            
            # 检查是否包含无货关键词
            if any(kw.lower() in row_text for kw in self.out_of_stock_keywords):
                out_of_stock_rows.append(idx)
        
        if not out_of_stock_rows:
            return [], None, pd.DataFrame()
        
        # 2. 识别表头行（用于 LLM 理解列含义）
        header_row_idx = self._find_header_row(df)
        
        # 如果没有找到表头，使用第一行作为表头
        if header_row_idx is None:
            header_row_idx = 0
        
        # 3. 构建包含表头和无货行的 DataFrame
        rows_to_extract = [header_row_idx] + out_of_stock_rows
        # 去重并保持顺序
        rows_to_extract = sorted(list(dict.fromkeys(rows_to_extract)))
        extracted_df = df.iloc[rows_to_extract].copy()
        
        return out_of_stock_rows, header_row_idx, extracted_df

    def get_context_around_wuhou(
        self, df: pd.DataFrame, context_rows: int = 2, max_wuhou_rows: int = 30
    ) -> Tuple[pd.DataFrame, int]:
        """
        先规则锁定无货行，再取「表头 + 每个无货行上下各 context_rows 行」作为一块送给 LLM，
        既直接锁定无货，又保留上下文便于 LLM 理解列含义。

        Args:
            df: 整张 Sheet 的 DataFrame（raw）
            context_rows: 无货行上下各保留几行
            max_wuhou_rows: 最多取前 N 个无货行（避免无货行过多导致 LLM 过载）

        Returns:
            (extracted_df, 无货行数)；若无货行数为 0 则 extracted_df 为空
        """
        wuhou_indices, header_idx, _ = self.identify_out_of_stock_rows(df)
        if not wuhou_indices:
            return pd.DataFrame(), 0

        header_idx = header_idx if header_idx is not None else 0

        # 限制无货行数量（避免过多无货行导致 LLM 无法处理）
        total_wuhou = len(wuhou_indices)
        if total_wuhou > max_wuhou_rows:
            logger.warning(
                f"Too many wuhou rows ({total_wuhou}), limiting to first {max_wuhou_rows} rows"
            )
            wuhou_indices = wuhou_indices[:max_wuhou_rows]

        # 对每个无货行，分别取上下 context_rows 行
        row_indices_set = {header_idx}  # 始终包含表头
        for wuhou_idx in wuhou_indices:
            start = max(0, wuhou_idx - context_rows)
            end = min(len(df) - 1, wuhou_idx + context_rows)
            for i in range(start, end + 1):
                row_indices_set.add(i)

        # 排序并提取
        row_indices = sorted(list(row_indices_set))
        extracted = df.iloc[row_indices].copy()

        logger.info(
            f"Context mode: {total_wuhou} wuhou rows total, "
            f"using {len(wuhou_indices)} rows, "
            f"extracted {len(extracted)} rows (including header)"
        )

        return extracted, total_wuhou  # 返回总无货行数
    
    def _find_header_row(self, df: pd.DataFrame) -> Optional[int]:
        """
        查找表头行（包含产品名称/规格/单位/数量关键词的行）
        
        Returns:
            表头行索引，如果找不到返回 None
        """
        # 合并所有关键词
        all_keywords = []
        for keywords in HEADER_KEYWORDS.values():
            all_keywords.extend(keywords)
        
        # 查找包含关键词的行
        for idx, row in df.iterrows():
            row_text = ' '.join([str(x) for x in row.values if pd.notna(x)])
            if any(kw in row_text for kw in all_keywords):
                return idx
        
        return None
    
    def format_rows_for_llm(self, df: pd.DataFrame) -> str:
        """
        将 DataFrame 转换为 Markdown 表格格式，便于 LLM 理解。
        自动选择关键列，减少宽表格的列数。

        Args:
            df: 包含表头和无货行的 DataFrame

        Returns:
            Markdown 格式的字符串
        """
        if len(df) == 0:
            return ""

        # 选择关键列
        key_cols = self._select_key_columns(df)
        if not key_cols:
            key_cols = list(range(len(df.columns)))

        logger.info(f"Selected {len(key_cols)} key columns out of {len(df.columns)} total columns (format_rows_for_llm)")

        # 只保留关键列
        sub_df = df.iloc[:, key_cols]

        markdown_lines = []

        # 表头行（处理换行符）
        header_values = [str(x).replace("\n", " ") if pd.notna(x) else "" for x in sub_df.iloc[0].values]
        markdown_lines.append("| " + " | ".join(header_values) + " |")

        # 分隔符
        markdown_lines.append("|" + "---|" * len(header_values))

        # 数据行（处理换行符）
        for idx in range(1, len(sub_df)):
            row_values = [str(x).replace("\n", " ") if pd.notna(x) else "" for x in sub_df.iloc[idx].values]
            markdown_lines.append("| " + " | ".join(row_values) + " |")

        return "\n".join(markdown_lines)

    def _count_non_empty(self, row: pd.Series) -> int:
        """一行中非空单元格数量（空字符串、纯空格算空）"""
        return sum(1 for x in row.values if pd.notna(x) and str(x).strip() != "")

    def _is_row_empty(self, row: pd.Series) -> bool:
        """是否整行为空"""
        return self._count_non_empty(row) == 0

    def _detect_structure_break(self, df: pd.DataFrame, header_idx: int) -> int:
        """
        基于结构特征检测数据段结束行（不依赖关键词）。
        返回第一个「不应再视为数据行」的索引（即切片时 end 用该值，不包含该行）。
        """
        if header_idx >= len(df) - 1:
            return len(df)
        header_row = df.iloc[header_idx]
        expected_cols = max(1, self._count_non_empty(header_row))
        # 用表头后几行的非空列数做参考（更稳）
        sample_end = min(header_idx + 5, len(df))
        for i in range(header_idx + 1, sample_end):
            expected_cols = max(expected_cols, self._count_non_empty(df.iloc[i]))
        threshold = max(2, int(expected_cols * 0.35))  # 非空列数低于此视为断裂（0.35 避免截断过早）

        for i in range(header_idx + 1, len(df)):
            row = df.iloc[i]
            non_empty = self._count_non_empty(row)
            # 结构断裂：非空列数骤降
            if non_empty < threshold:
                return i
            # 连续空行：当前空且下一行也空
            if self._is_row_empty(row):
                if i + 1 >= len(df) or self._is_row_empty(df.iloc[i + 1]):
                    return i
        return len(df)

    def _detect_footer_by_keyword(self, df: pd.DataFrame, header_idx: int) -> int:
        """关键词检测：第一个出现表尾关键词的行索引（不包含该行）。"""
        for idx in range(header_idx + 1, len(df)):
            row_text = " ".join([str(x) for x in df.iloc[idx].values if pd.notna(x)])
            if any(kw in row_text for kw in FOOTER_KEYWORDS):
                return idx
        return len(df)

    def get_data_section(self, df: pd.DataFrame, max_rows: int = 0) -> pd.DataFrame:
        """
        只取「数据段」：混合策略——结构断裂 + 关键词，取更早的结束行，再按 max_rows 兜底。
        不依赖单一关键词列表，新表结构也能尽量截对。
        
        Args:
            df: 整张 Sheet 的 DataFrame（raw）
            max_rows: 数据段内最多保留行数（含表头），0 表示不限制
        
        Returns:
            仅数据段的 DataFrame
        """
        if len(df) == 0:
            return df
        header_idx = self._find_header_row(df)
        if header_idx is None:
            header_idx = 0

        # 第一层：结构断裂检测
        end_by_structure = self._detect_structure_break(df, header_idx)
        # 第二层：关键词检测（补充）
        end_by_keyword = self._detect_footer_by_keyword(df, header_idx)
        # 取更早的那个
        end_idx = min(end_by_structure, end_by_keyword)
        # 最小数据行保护：若未命中表尾关键词且当前截得太短（如只 3 行），至少保留 MIN_DATA_SECTION_ROWS 行，避免漏掉无货
        if (end_by_keyword >= len(df) and
            (end_idx - header_idx) < MIN_DATA_SECTION_ROWS):
            end_idx = min(header_idx + MIN_DATA_SECTION_ROWS, len(df))
        # 第三层：行数上限兜底
        if max_rows > 0:
            end_idx = min(end_idx, header_idx + max_rows)

        sub = df.iloc[header_idx:end_idx]
        return sub

    def _select_key_columns(self, df: pd.DataFrame) -> List[int]:
        """
        智能选择关键列（减少宽表格的列数，提高 LLM 理解能力）

        策略：
        1. 识别包含 HEADER_KEYWORDS 的列（产品名称、规格、单位、数量）
        2. 识别包含无货关键词的列（Product number、备注等）
        3. 保留第一列（通常是序号）

        Args:
            df: DataFrame

        Returns:
            关键列索引列表
        """
        if len(df) == 0:
            return []

        key_cols = set()

        # 1. 第一列（序号）
        key_cols.add(0)

        # 2. 检查表头行（第一行）是否包含关键词
        header_row = df.iloc[0]
        for col_idx, cell_value in enumerate(header_row):
            if pd.isna(cell_value):
                continue
            cell_text = str(cell_value).lower()

            # 检查是否包含 HEADER_KEYWORDS
            for field_name, keywords in HEADER_KEYWORDS.items():
                if any(kw.lower() in cell_text for kw in keywords):
                    key_cols.add(col_idx)
                    break

            # 检查是否包含"备注"、"NOTE"、"产品编号"、"Product number"等
            extra_keywords = ["备注", "note", "产品编号", "product number", "remark"]
            if any(kw.lower() in cell_text for kw in extra_keywords):
                key_cols.add(col_idx)

        # 3. 检查数据行，识别包含无货关键词的列
        for row_idx in range(1, min(len(df), 20)):  # 只检查前 20 行
            row = df.iloc[row_idx]
            for col_idx, cell_value in enumerate(row):
                if pd.isna(cell_value):
                    continue
                cell_text = str(cell_value).lower()
                # 检查是否包含无货关键词
                if any(kw.lower() in cell_text for kw in self.out_of_stock_keywords):
                    key_cols.add(col_idx)

        # 4. 如果关键列太少（< 4），则保留更多列
        if len(key_cols) < 4:
            # 保留前 8 列
            key_cols.update(range(min(8, len(df.columns))))

        # 5. 如果关键列太多（> 15），则限制数量
        key_cols_list = sorted(list(key_cols))
        if len(key_cols_list) > 15:
            # 优先保留前面的列
            key_cols_list = key_cols_list[:15]

        return key_cols_list

    def format_full_table_for_llm(self, df: pd.DataFrame, max_rows: int = 0) -> str:
        """
        将（整张表或数据段）DataFrame 转为 Markdown 表格，供 LLM 使用。
        自动选择关键列，减少宽表格的列数。

        Args:
            df: 整张 Sheet 或已切片的数据段
            max_rows: 最多取前几行，0 表示不限制

        Returns:
            Markdown 格式的字符串
        """
        if len(df) == 0:
            return ""

        # 选择关键列
        key_cols = self._select_key_columns(df)
        if not key_cols:
            key_cols = list(range(len(df.columns)))

        logger.info(f"Selected {len(key_cols)} key columns out of {len(df.columns)} total columns")

        n = len(df) if max_rows <= 0 else min(len(df), max_rows)
        sub = df.iloc[:n, key_cols]  # 只保留关键列

        markdown_lines = []
        for idx in range(len(sub)):
            row_values = [str(x).replace("\n", " ") if pd.notna(x) else "" for x in sub.iloc[idx].values]
            markdown_lines.append("| " + " | ".join(row_values) + " |")
            if idx == 0:
                markdown_lines.append("|" + "---|" * len(row_values))
        if max_rows > 0 and len(df) > max_rows:
            markdown_lines.append(f"\n（仅显示前 {max_rows} 行，共 {len(df)} 行）")
        return "\n".join(markdown_lines)
