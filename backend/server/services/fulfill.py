"""
成单闭环服务：报价单确认成单后，转正式订单、写 ACCURATE/本地、锁库存。

当前实现：
- 在本地数据库中，将报价单 draft_id 转成一条 orders + order_lines 记录（类似 quotation_drafts / quotation_draft_lines）。
- 仍未对接 ACCURATE 写单与锁库存，仅返回本地订单号，方便前端展示与后续对接。
"""
import logging
from typing import Any, Dict

from backend.tools.oos.services.data_service import DataService

logger = logging.getLogger(__name__)


def run_fulfill_loop(draft_id: int, draft_no: str = "") -> Dict[str, Any]:
    """
    执行成单闭环：转正式订单、写 ACCURATE/本地、锁库存。

    当前版本：
    - 使用 DataService.create_order_from_draft 在本地表 orders / order_lines 中生成成单记录。
    - 尚未调用 ACCURATE API 或实际锁库存，后续可在此基础上扩展。
    """
    logger.info("成单闭环开始：draft_id=%s draft_no=%s", draft_id, draft_no or "")
    ds = DataService()
    result = ds.create_order_from_draft(draft_id)
    if not result:
        msg = "未找到该报价单或创建订单失败"
        logger.warning("成单闭环失败：%s draft_id=%s draft_no=%s", msg, draft_id, draft_no or "")
        return {
            "order_id": None,
            "message": msg,
        }
    logger.info(
        "成单闭环完成：draft_id=%s draft_no=%s -> order_id=%s order_no=%s",
        draft_id,
        draft_no or "",
        result.get("order_id"),
        result.get("order_no"),
    )
    return {
        "order_id": result.get("order_id"),
        "order_no": result.get("order_no"),
        "total_amount": result.get("total_amount"),
        "message": "已生成本地订单（orders/order_lines）。ACCUTATE 写单与锁库存后续可在此基础上对接。",
    }
