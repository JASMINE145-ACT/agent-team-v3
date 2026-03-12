"""Activity Log API：返回最近的关键业务活动，用于控制台或调试。"""

from __future__ import annotations

import logging
from typing import Any, Dict, Optional

from fastapi import APIRouter, HTTPException, Query

from backend.server.services.activity_log import list_activity

logger = logging.getLogger(__name__)
router = APIRouter()


@router.get("/api/activity")
async def activity_list(
    limit: int = Query(50, ge=1, le=200),
    kind: Optional[str] = Query(None, description="可选：按 kind 过滤，例如 work_run/quotation_draft/oos/shortage"),
) -> Dict[str, Any]:
    """
    查询最近的 Activity Log。

    - limit: 返回的最大条数（默认 50，最多 200）
    - kind: 可选业务类别过滤
    """
    try:
        rows = list_activity(limit=limit, kind=kind)
        return {"success": True, "data": rows}
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("activity_list 失败")
        raise HTTPException(status_code=500, detail=str(e))

