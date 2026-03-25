"""告警中转 API：将通知发送到企业微信应用消息通道。"""
from __future__ import annotations

import logging
from typing import List, Literal, Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from backend.wecom_bot.notification_service import get_wecom_application_client


logger = logging.getLogger(__name__)
router = APIRouter()


class NotifyRequest(BaseModel):
    msg_type: Literal["text", "markdown"] = "text"
    content: str = Field(..., min_length=1, description="消息内容")
    to_users: List[str] = Field(default_factory=list)
    to_parties: List[str] = Field(default_factory=list)
    to_tags: List[str] = Field(default_factory=list)
    priority: Optional[Literal["high", "normal"]] = "normal"


@router.post("/agent/notify")
async def agent_notify(body: NotifyRequest):
    if not body.to_users and not body.to_parties and not body.to_tags:
        raise HTTPException(status_code=400, detail="至少提供一个目标：to_users/to_parties/to_tags")

    try:
        client = await get_wecom_application_client()
        if body.msg_type == "markdown":
            result = await client.send_markdown(
                content=body.content,
                to_users=body.to_users,
                to_parties=body.to_parties,
                to_tags=body.to_tags,
            )
        else:
            result = await client.send_text(
                content=body.content,
                to_users=body.to_users,
                to_parties=body.to_parties,
                to_tags=body.to_tags,
            )

        return {
            "success": True,
            "data": {
                "msg_type": body.msg_type,
                "priority": body.priority,
                "wecom_result": result,
            },
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:  # noqa: BLE001
        logger.exception("agent/notify 发送失败")
        raise HTTPException(status_code=500, detail=f"发送失败: {e}")

