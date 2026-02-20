"""
Pydantic 数据模型
"""
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime


class OutOfStockProduct(BaseModel):
    """无货产品信息（unit/quantity 允许 LLM 返回 null，自动转为默认值）"""
    product_name: str = Field(..., description="产品名称")
    specification: Optional[str] = Field(None, description="规格型号（可为空）")
    unit: Optional[str] = Field(default="", description="单位（LLM 未识别时为空字符串）")
    quantity: Optional[float] = Field(default=0.0, description="数量（LLM 未识别时为 0）")


class LLMParseResult(BaseModel):
    """LLM 解析结果"""
    out_of_stock_products: List[OutOfStockProduct] = Field(
        default_factory=list,
        description="无货产品列表"
    )


class OutOfStockRecord(BaseModel):
    """数据库记录模型"""
    id: Optional[int] = None
    product_name: str
    specification: Optional[str] = None
    unit: str
    quantity: float
    sheet_name: Optional[str] = None
    file_name: str
    uploaded_at: datetime
    product_key: str
    count: int = 1


class ProcessingResult(BaseModel):
    """处理结果"""
    success: bool
    file_name: Optional[str] = None
    sheet_name: Optional[str] = None
    out_of_stock_count: int = 0
    records: List[OutOfStockProduct] = Field(default_factory=list)
    email_triggered: bool = False
    error: Optional[str] = None
    # 调试用：每个 Sheet 的数据段行数、是否含「无货」、LLM 返回条数
    debug_per_sheet: Optional[List[dict]] = None
