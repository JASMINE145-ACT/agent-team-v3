"""采购批准 API。"""
import logging

from fastapi import APIRouter, Body, HTTPException
from typing import Any, Dict

from backend.server.api.deps import get_oos_data_service

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/api/procurement/approve")
async def procurement_approve(body: Dict[str, Any] = Body(...)) -> Dict[str, Any]:
    """
    采购批准：将选中的缺货项写入 procurement_approvals，并发送邮件给采购员。
    Body: { "items": [ { "product_key", "product_name", "specification", "shortfall", "code" } ] }
    """
    items = body.get("items")
    if not isinstance(items, list):
        raise HTTPException(status_code=400, detail="请提供 items 数组")
    normalized = []
    for it in items:
        if not isinstance(it, dict):
            continue
        normalized.append({
            "product_key": (it.get("product_key") or "").strip() or None,
            "product_name": (it.get("product_name") or "").strip() or "",
            "specification": (it.get("specification") or "").strip() or None,
            "shortfall": it.get("shortfall") if it.get("shortfall") is not None else it.get("suggested_qty"),
            "code": (it.get("code") or "").strip() or None,
        })
    normalized = [x for x in normalized if x.get("product_name") or x.get("product_key")]
    if not normalized:
        raise HTTPException(status_code=400, detail="items 中至少需包含 product_name 或 product_key")
    try:
        ds = get_oos_data_service()
        inserted, inserted_ids = ds.insert_procurement_approvals(normalized)
        if inserted == 0:
            return {"success": True, "approved_count": 0, "message": "未写入任何记录"}
        try:
            from backend.tools.oos.services.email_service import send_procurement_approval_email
            if send_procurement_approval_email(items=normalized):
                ds.mark_procurement_email_sent(inserted_ids)
        except Exception as mail_err:
            logger.warning("采购批准邮件发送失败（不影响落库）: %s", mail_err)
        return {
            "success": True,
            "approved_count": inserted,
            "message": f"已批准 {inserted} 条并落库，已通知采购员。",
        }
    except Exception as e:
        logger.exception("procurement/approve 失败")
        raise HTTPException(status_code=500, detail=str(e))
