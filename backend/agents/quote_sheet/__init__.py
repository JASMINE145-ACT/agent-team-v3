"""
QuoteSheet Agent - 报价单询价填充流程

流程：extract_inquiry_items → Inventory.match_price_and_get_inventory（万鼎 + Resolver fallback + 库存）→ fill / shortage_report
"""

from backend.agents.quote_sheet.flow_orchestrator import run_quotation_fill_flow
from backend.agents.quote_sheet.shortage_report import generate_shortage_report

# 向后兼容：PriceLibraryMatcher 已迁至 inventory_agent
from inventory_agent.services.price_library_matcher import PriceLibraryMatcher

__all__ = [
    "PriceLibraryMatcher",
    "run_quotation_fill_flow",
    "generate_shortage_report",
]
