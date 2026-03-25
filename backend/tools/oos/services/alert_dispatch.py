# -*- coding: utf-8 -*-
"""
无货/缺货提醒统一调度：按 OOS_ALERT_MODE 选择 email、企业微信群或两者。
"""
from __future__ import annotations

import logging
from typing import Optional

from backend.tools.oos.config import (
    OOS_ALERT_MODE,
    WECOM_APP_NOTIFY_USERS,
)

from .email_service import send_out_of_stock_alert, send_shortage_alert
from .wecom_group_service import (
    is_wecom_group_configured,
    send_wecom_out_of_stock_alert,
    send_wecom_shortage_alert,
)

logger = logging.getLogger(__name__)


def _send_via_app_api(product_name: str, specification: Optional[str], product_key: str, count: int, file_name: str, kind: str) -> bool:
    """
    通过 /agent/notify 应用消息 API 发送告警到 WECOM_APP_NOTIFY_USERS。
    kind: "无货" 或 "缺货"
    """
    users = WECOM_APP_NOTIFY_USERS
    if not users:
        return False

    spec_display = (specification or "").strip() or "—"
    if kind == "无货":
        content = f"【无货提醒】\n产品：{product_name}\n规格：{spec_display}\n无货次数：{count}\n来源文件：{file_name or '—'}\n\n请及时跟进采购或替代方案。（报价单无货追踪）"
    else:
        content = f"【缺货提醒】\n产品：{product_name}\n规格：{spec_display}\n缺货次数：{count}\n来源文件：{file_name or '—'}\n\n请及时跟进补货或调配。（库存不足追踪）"

    try:
        import asyncio
        from backend.wecom_bot.notification_service import get_wecom_application_client
        loop = asyncio.get_event_loop()
    except RuntimeError:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)

        # 异步发送，在同步上下文中用 run_until_complete
    async def _send():
        client = await get_wecom_application_client()
        await client.send_text(content=content, to_users=users)

    try:
        loop.run_until_complete(_send())
        logger.info("应用消息 API 发送%s成功: %s", kind, users)
        return True
    except Exception as e:  # noqa: BLE001
        logger.warning("应用消息 API 发送%s失败: %s", kind, e)
        return False


def _normalize_mode() -> str:
    m = (OOS_ALERT_MODE or "email_only").strip().lower()
    if m in ("email_only", "wecom_only", "both"):
        return m
    logger.warning("Invalid OOS_ALERT_MODE=%r, fallback to email_only", OOS_ALERT_MODE)
    return "email_only"


def dispatch_out_of_stock_alert(
    product_name: str,
    specification: Optional[str],
    product_key: str,
    count: int,
    file_name: str = "",
) -> bool:
    """
    无货提醒：按模式发邮件和/或企业微信。
    wecom_only 时优先走应用消息 API（WECOM_APP_NOTIFY_USERS），无配置则回退 Webhook 群机器人。
    both 模式：任一路成功即返回 True（与打冷却标记一致）。
    """
    mode = _normalize_mode()
    email_ok = False
    wecom_ok = False

    if mode in ("email_only", "both"):
        email_ok = bool(
            send_out_of_stock_alert(
                product_name=product_name,
                specification=specification,
                product_key=product_key,
                count=count,
                file_name=file_name,
            )
        )
    if mode in ("wecom_only", "both"):
        # 优先：应用消息 API（发给指定 userid）
        if WECOM_APP_NOTIFY_USERS:
            wecom_ok = _send_via_app_api(
                product_name=product_name,
                specification=specification,
                product_key=product_key,
                count=count,
                file_name=file_name,
                kind="无货",
            )
        elif is_wecom_group_configured():
            # 回退：Webhook 群机器人
            wecom_ok = bool(
                send_wecom_out_of_stock_alert(
                    product_name=product_name,
                    specification=specification,
                    count=count,
                    file_name=file_name,
                )
            )

    if mode == "email_only":
        return email_ok
    if mode == "wecom_only":
        return wecom_ok
    return email_ok or wecom_ok


def dispatch_shortage_alert(
    product_name: str,
    specification: Optional[str],
    product_key: str,
    count: int,
    file_name: str = "",
) -> bool:
    """缺货提醒：按模式发邮件和/或企业微信。wecom_only 时优先应用消息 API，回退 Webhook 群机器人。"""
    mode = _normalize_mode()
    email_ok = False
    wecom_ok = False

    if mode in ("email_only", "both"):
        email_ok = bool(
            send_shortage_alert(
                product_name=product_name,
                specification=specification,
                product_key=product_key,
                count=count,
                file_name=file_name,
            )
        )
    if mode in ("wecom_only", "both"):
        if WECOM_APP_NOTIFY_USERS:
            wecom_ok = _send_via_app_api(
                product_name=product_name,
                specification=specification,
                product_key=product_key,
                count=count,
                file_name=file_name,
                kind="缺货",
            )
        elif is_wecom_group_configured():
            wecom_ok = bool(
                send_wecom_shortage_alert(
                    product_name=product_name,
                    specification=specification,
                    count=count,
                    file_name=file_name,
                )
            )

    if mode == "email_only":
        return email_ok
    if mode == "wecom_only":
        return wecom_ok
    return email_ok or wecom_ok
