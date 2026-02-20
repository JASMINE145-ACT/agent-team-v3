"""
库存查询 Agent - 数据模型

使用 Pydantic 定义数据结构
"""

from typing import List, Optional, Literal
from pydantic import BaseModel, Field


class Item(BaseModel):
    """
    库存商品数据模型
    
    对应 PRD §2.2 固定抓取字段
    """
    item_no: str = Field(..., description="物料编码 (Item Code)")
    item_name: str = Field(..., description="产品全称 (Item Name)")
    item_type: str = Field(..., description="物料类型 (Item Type)")
    unit: str = Field(..., description="单位 (Unit)")
    qty_warehouse: float = Field(0.0, description="用户仓数量 (Qty in User Warehouse)")
    qty_available: float = Field(0.0, description="可售数量 (Available to sell)")
    
    class Config:
        json_schema_extra = {
            "example": {
                "item_no": "8030020580",
                "item_name": "#C11 Tee With Cover / dn40 - LESSO",
                "item_type": "Inventory",
                "unit": "PCS",
                "qty_warehouse": 0.0,
                "qty_available": 0.0
            }
        }


class QueryIntent(BaseModel):
    """
    用户查询意图
    
    Plan Agent 的输出，用于指导 Table Agent 查询。
    单条查询用 keywords；多条时由 LLM 填 keywords_list，每个元素独立调 table 再拼接。
    phrase_specs：每个词条对应的规格/关键标识（如 dn25、20/56），用于向量候选过滤，与 phrases 一一对应。
    """
    keywords: str = Field(..., description="提取的查询关键词（单条时使用；多条时可为首条或拼接描述）")
    strategy: Literal["keywords", "code"] = Field(
        "keywords",
        description="匹配策略: keywords(模糊匹配) | code(精确匹配Item Code)"
    )
    confidence: float = Field(1.0, description="匹配置信度 (0-1)")
    keywords_list: Optional[List[str]] = Field(
        None,
        description="多个产品/词条时使用，每项独立查询后合并。若为空或未提供则用 keywords 作为单条"
    )
    phrase_specs: Optional[List[List[str]]] = Field(
        None,
        description="每个词条对应的规格/关键标识数组，用于过滤向量候选。与 keywords_list 或单条 keywords 一一对应，如 [[\"20/56\"], [\"dn25\"]]，无规格则该位 []"
    )

    class Config:
        json_schema_extra = {
            "example": {
                "keywords": "Tee With Cover / dn40",
                "strategy": "keywords",
                "confidence": 0.95,
                "keywords_list": None,
                "phrase_specs": [["dn40"]]
            }
        }


class InventoryQueryResult(BaseModel):
    """
    库存查询结果
    
    Table Agent 的输出
    """
    items: list[Item] = Field(default_factory=list, description="查询到的商品列表")
    total_count: int = Field(0, description="总匹配数量")
    has_more: bool = Field(False, description="是否有更多结果")
    query_time_ms: Optional[int] = Field(None, description="查询耗时(毫秒)")


__all__ = ["Item", "QueryIntent", "InventoryQueryResult"]
