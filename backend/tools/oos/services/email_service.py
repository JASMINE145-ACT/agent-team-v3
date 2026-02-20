# -*- coding: utf-8 -*-
"""
无货提醒邮件：当某产品第二次被报价无货时发邮件，发完后仅打时间戳不删记录，同一产品 24 小时内不重复发。
"""
import logging
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Optional

from backend.tools.oos.config import (
    EMAIL_RECIPIENTS,
    EMAIL_SMTP_HOST,
    EMAIL_SMTP_PORT,
    EMAIL_FROM,
    EMAIL_USERNAME,
    EMAIL_PASSWORD,
)

logger = logging.getLogger(__name__)


def is_email_configured() -> bool:
    """是否已配置发信（有收件人且 SMTP 必填项齐全）"""
    if not EMAIL_RECIPIENTS or not any(r and r.strip() for r in EMAIL_RECIPIENTS):
        return False
    if not EMAIL_SMTP_HOST or not EMAIL_USERNAME or not EMAIL_PASSWORD:
        return False
    return True


def send_out_of_stock_alert(
    product_name: str,
    specification: Optional[str],
    product_key: str,
    count: int,
    file_name: str = "",
) -> bool:
    """
    发送「某产品第 N 次无货」提醒邮件。
    未配置邮箱时直接返回 False，不抛错。
    """
    if not is_email_configured():
        logger.debug("Email not configured, skip sending.")
        return False

    spec_display = (specification or "").strip() or "—"
    subject = f"【无货提醒】{product_name} 第 {count} 次报价无货"
    body = f"""您好，

以下产品在报价单中再次出现无货，请关注：

  产品名称：{product_name}
  规格型号：{spec_display}
  无货次数：{count} 次
  来源文件：{file_name or '—'}

请及时跟进采购或替代方案。

本邮件由报价单无货产品追踪系统自动发送。"""

    try:
        port = int(EMAIL_SMTP_PORT) if isinstance(EMAIL_SMTP_PORT, str) else EMAIL_SMTP_PORT
    except (TypeError, ValueError):
        port = 587

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = EMAIL_FROM or EMAIL_USERNAME
    msg["To"] = ", ".join(r.strip() for r in EMAIL_RECIPIENTS if r and r.strip())
    msg.attach(MIMEText(body, "plain", "utf-8"))

    try:
        with smtplib.SMTP(EMAIL_SMTP_HOST, port) as server:
            server.starttls()
            server.login(EMAIL_USERNAME, EMAIL_PASSWORD)
            server.sendmail(
                EMAIL_FROM or EMAIL_USERNAME,
                [r.strip() for r in EMAIL_RECIPIENTS if r and r.strip()],
                msg.as_string(),
            )
        logger.info("Out-of-stock alert email sent: product_key=%s count=%s", product_key, count)
        return True
    except Exception as e:
        logger.exception("Failed to send out-of-stock email: %s", e)
        return False
