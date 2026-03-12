"""
Activity Log 服务层：封装 DataService 提供的活动日志能力，供 API 层调用。
"""

from __future__ import annotations

from typing import Any, Dict, List, Optional

from backend.server.api.deps import get_oos_data_service


def log_activity(
    kind: str,
    action: str,
    *,
    actor_type: str = "system",
    actor_id: Optional[str] = None,
    entity_type: Optional[str] = None,
    entity_id: Optional[str] = None,
    run_id: Optional[str] = None,
    summary: Optional[str] = None,
    details: Optional[Dict[str, Any]] = None,
) -> None:
    """
    记录一条活动日志。

    - kind: 业务类别（如 work_run / quotation_draft / oos / shortage / procurement 等）
    - action: 操作类型（start / finish / saved / created / deleted / error 等）
    """
    ds = get_oos_data_service()
    # DataService.log_activity 内部会处理异常并写入 warning，避免影响主流程。
    ds.log_activity(
        kind=kind,
        action=action,
        actor_type=actor_type,
        actor_id=actor_id,
        entity_type=entity_type,
        entity_id=entity_id,
        run_id=run_id,
        summary=summary,
        details=details,
    )


def list_activity(limit: int = 50, *, kind: Optional[str] = None) -> List[Dict[str, Any]]:
    """
    获取最近的活动日志列表。
    """
    ds = get_oos_data_service()
    return ds.list_activity(limit=limit, kind=kind)


__all__ = ["log_activity", "list_activity"]

