# -*- coding: utf-8 -*-
"""
企业微信群机器人 Webhook：无货/缺货提醒（与 email_service 并行，由 alert_dispatch 按 OOS_ALERT_MODE 调度）。

文档：https://developer.work.weixin.qq.com/document/path/91770
- msgtype=text，content 最长 2048 字节；支持 mentioned_list / mentioned_mobile_list。
"""
from __future__ import annotations

import json
import logging
from typing import List, Optional

import requests

from backend.tools.oos.config import (
    WECOM_GROUP_ALERT_ENABLED,
    WECOM_GROUP_MENTIONED_MOBILE_LIST,
    WECOM_GROUP_MENTIONED_USERIDS,
    WECOM_GROUP_WEBHOOK_URL,
)

logger = logging.getLogger(__name__)


def is_wecom_group_configured() -> bool:
    """已配置 Webhook 且开关为开。"""
    return bool(WECOM_GROUP_ALERT_ENABLED and (WECOM_GROUP_WEBHOOK_URL or "").strip())


def send_group_text_alert(
    content: str,
    mentioned_list: Optional[List[str]] = None,
    mentioned_mobile_list: Optional[List[str]] = None,
) -> bool:
    """
    发送 text 消息到群机器人。
    mentioned_list: 企业成员 userid，可用 '@all' 表示 @所有人。
    mentioned_mobile_list: 手机号列表。
    """
    if not is_wecom_group_configured():
        logger.debug("WeCom group alert skipped: not configured.")
        return False
    url = (WECOM_GROUP_WEBHOOK_URL or "").strip()
    if not url:
        return False

    # 企业微信限制 content 2048 字节；UTF-8 下保守截断
    raw = content.encode("utf-8")
    if len(raw) > 2000:
        content = raw[:1997].decode("utf-8", errors="ignore") + "..."

    payload: dict = {
        "msgtype": "text",
        "text": {"content": content},
    }
    ml = [x.strip() for x in (mentioned_list or []) if x and x.strip()]
    mm = [x.strip() for x in (mentioned_mobile_list or []) if x and x.strip()]
    if ml:
        payload["text"]["mentioned_list"] = ml
    if mm:
        payload["text"]["mentioned_mobile_list"] = mm

    try:
        r = requests.post(url, json=payload, timeout=15)
        r.raise_for_status()
        body = r.json() if r.text else {}
        if isinstance(body, dict) and body.get("errcode") not in (None, 0):
            logger.warning("WeCom webhook returned err: %s", body)
            return False
        return True
    except Exception as e:
        logger.exception("WeCom group alert POST failed: %s", e)
        return False


def _default_mentions() -> tuple[List[str], List[str]]:
    uids = list(WECOM_GROUP_MENTIONED_USERIDS or [])
    mobiles = list(WECOM_GROUP_MENTIONED_MOBILE_LIST or [])
    return uids, mobiles


def send_wecom_out_of_stock_alert(
    product_name: str,
    specification: Optional[str],
    count: int,
    file_name: str = "",
) -> bool:
    spec_display = (specification or "").strip() or "—"
    lines = [
        "【无货提醒】",
        f"产品：{product_name}",
        f"规格：{spec_display}",
        f"无货次数：{count}",
        f"来源文件：{file_name or '—'}",
        "",
        "请及时跟进采购或替代方案。（报价单无货追踪）",
    ]
    content = "\n".join(lines)
    uids, mobiles = _default_mentions()
    return send_group_text_alert(content, mentioned_list=uids, mentioned_mobile_list=mobiles)


def send_wecom_shortage_alert(
    product_name: str,
    specification: Optional[str],
    count: int,
    file_name: str = "",
) -> bool:
    spec_display = (specification or "").strip() or "—"
    lines = [
        "【缺货提醒】",
        f"产品：{product_name}",
        f"规格：{spec_display}",
        f"缺货次数：{count}",
        f"来源文件：{file_name or '—'}",
        "",
        "请及时跟进补货或调配。（库存不足追踪）",
    ]
    content = "\n".join(lines)
    uids, mobiles = _default_mentions()
    return send_group_text_alert(content, mentioned_list=uids, mentioned_mobile_list=mobiles)
