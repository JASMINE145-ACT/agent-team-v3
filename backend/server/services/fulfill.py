"""
成单闭环服务：报价单确认成单后，转正式订单、写 ACCURATE/本地、锁库存。
当前为占位实现，仅打日志并返回占位结果；待对接真实接口后替换。
"""
import logging
from typing import Any, Dict

logger = logging.getLogger(__name__)


def run_fulfill_loop(draft_id: int, draft_no: str = "") -> Dict[str, Any]:
    """
    执行成单闭环：转正式订单、写 ACCURATE/本地、锁库存。
    输入：draft_id（及可选 draft_no 用于日志）。
    输出：{ "order_id": str?, "message": str }，成功时可有 order_id，失败时 message 为错误信息。
    当前占位：仅打日志并返回占位结果。
    """
    logger.info("成单闭环 placeholder: draft_id=%s draft_no=%s（转订单/写 ACCURATE/锁库存接口待对接）", draft_id, draft_no or "")
    return {
        "order_id": "placeholder",
        "message": "成单闭环接口待对接",
    }
