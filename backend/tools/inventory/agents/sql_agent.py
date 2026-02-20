"""
库存查询 Agent - SQL Agent

职责：格式化查询结果为可读文本
"""

import logging
from typing import List

from backend.tools.inventory.models import Item
from backend.tools.inventory.config import config

logger = logging.getLogger(__name__)


class InventorySQLAgent:
    """
    库存结果格式化 Agent
    
    职责：
    - 将 Item 列表格式化为可读文本
    - 处理多条结果的汇总展示
    - 处理异常情况（空结果、超限等）
    
    注意：此 Agent 不生成 SQL，只做结果呈现
    """
    
    def __init__(self):
        logger.info("InventorySQLAgent 初始化完成")
    
    def format_response(self, items: List[Item]) -> str:
        """
        格式化查询结果为响应文本
        
        Args:
            items: 查询到的产品列表
        
        Returns:
            str: 格式化后的响应文本
            
        示例:
            - 单条: "#C11 Tee With Cover / dn40 - LESSO 库存有 0"
            - 多条: 列表形式展示
            - 空结果: "未找到匹配产品..."
        """
        # 1. 处理空结果
        if not items:
            return self._format_empty()
        
        # 2. 处理单条结果
        if len(items) == 1:
            return self._format_single(items[0])
        
        # 3. 处理多条结果
        return self._format_multiple(items)
    
    def _format_empty(self) -> str:
        """格式化空结果"""
        return "未找到匹配产品，请尝试：1) 使用完整编号 2) 减少关键词"
    
    def _format_single(self, item: Item) -> str:
        """
        格式化单条结果，返回 PRD §2.2 全部预设字段：品名、编号、类型、单位、库存、可售。
        """
        return (
            f"{item.item_name}\n"
            f"编号: {item.item_no} | 类型: {item.item_type} | 单位: {item.unit} | "
            f"库存: {item.qty_warehouse} | 可售: {item.qty_available}"
        )
    
    def _format_multiple(self, items: List[Item]) -> str:
        """
        格式化多条结果
        
        Args:
            items: 产品列表
        
        Returns:
            str: 格式化后的文本
        """
        lines = []
        
        # 标题行
        lines.append("找到以下产品：")
        lines.append("-" * 60)
        
        # 产品列表：PRD §2.2 全部字段 品名、编号、类型、单位、库存、可售
        for i, item in enumerate(items, 1):
            lines.append(
                f"{i}. {item.item_name}"
                f"\n   编号: {item.item_no} | 类型: {item.item_type} | 单位: {item.unit} | "
                f"库存: {item.qty_warehouse} | 可售: {item.qty_available}"
            )
        
        lines.append("-" * 60)
        lines.append(f"共找到 {len(items)} 条记录")
        
        # 添加总计
        total_qty = sum(item.qty_warehouse for item in items)
        lines.append(f"总库存: {total_qty}")
        
        return "\n".join(lines)
    
    def format_response_with_warning(self, items: List[Item], total_count: int) -> str:
        """
        格式化查询结果（带超限警告）
        
        当结果数量超过 MAX_RESULTS 时使用此方法
        
        Args:
            items: 已截断的产品列表
            total_count: 实际总匹配数量
        
        Returns:
            str: 格式化后的响应文本（含警告）
        """
        # 基础格式化
        response = self.format_response(items)
        
        # 添加超限警告
        warning = f"\n\n⚠️ 找到 {total_count} 条记录，仅展示前 {len(items)} 条，请细化查询条件"
        return response + warning
