# -*- coding: utf-8 -*-
"""
无货/缺货提醒邮件：当某产品第二次被报无货或缺货时发邮件，发完后打时间戳，同一产品在 EMAIL_COOLDOWN_HOURS 内不重复发。
支持两种发信方式（二选一或同时配置时优先 Gmail API）：
1. Gmail API：用你的 Google 账号发信，发件人即该账号，配置 GMAIL_REFRESH_TOKEN + GMAIL_CLIENT_ID/SECRET 即可。
2. SMTP：传统 SMTP，需填发件人/收件人/SMTP。
未配置时跳过发信，不抛错。
"""
import base64
import logging
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import List, Optional

from backend.tools.oos.config import (
    EMAIL_RECIPIENTS,
    EMAIL_SMTP_HOST,
    EMAIL_SMTP_PORT,
    EMAIL_FROM,
    EMAIL_USERNAME,
    EMAIL_PASSWORD,
    GMAIL_REFRESH_TOKEN,
    GMAIL_CLIENT_ID,
    GMAIL_CLIENT_SECRET,
)

logger = logging.getLogger(__name__)


def _is_gmail_configured() -> bool:
    """是否已配置 Gmail API（有收件人且 refresh_token + client_id/secret 齐全）"""
    if not EMAIL_RECIPIENTS or not any(r and r.strip() for r in EMAIL_RECIPIENTS):
        return False
    return bool(GMAIL_REFRESH_TOKEN and GMAIL_CLIENT_ID and GMAIL_CLIENT_SECRET)


def _is_smtp_configured() -> bool:
    """是否已配置 SMTP"""
    if not EMAIL_RECIPIENTS or not any(r and r.strip() for r in EMAIL_RECIPIENTS):
        return False
    return bool(EMAIL_SMTP_HOST and EMAIL_USERNAME and EMAIL_PASSWORD)


def is_email_configured() -> bool:
    """是否已配置发信（Gmail API 或 SMTP 任一种 + 收件人）"""
    return _is_gmail_configured() or _is_smtp_configured()


def _send_via_gmail_api(subject: str, body_plain: str, to_emails: List[str]) -> bool:
    """用 Gmail API 发信，发件人为当前 Google 账号。"""
    try:
        from google.oauth2.credentials import Credentials
        from google.auth.transport.requests import Request
        from googleapiclient.discovery import build
    except ImportError as e:
        logger.warning("Gmail API 依赖未安装，请 pip install google-auth google-api-python-client: %s", e)
        return False

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["To"] = ", ".join(to_emails)
    msg.attach(MIMEText(body_plain, "plain", "utf-8"))

    raw = base64.urlsafe_b64encode(msg.as_bytes()).decode("ascii")
    creds = Credentials(
        token=None,
        refresh_token=GMAIL_REFRESH_TOKEN,
        token_uri="https://oauth2.googleapis.com/token",
        client_id=GMAIL_CLIENT_ID,
        client_secret=GMAIL_CLIENT_SECRET,
        scopes=["https://www.googleapis.com/auth/gmail.send"],
    )
    creds.refresh(Request())
    service = build("gmail", "v1", credentials=creds)
    service.users().messages().send(userId="me", body={"raw": raw}).execute()
    return True


def _send_mail(subject: str, body_plain: str, to_emails: List[str]) -> bool:
    """统一发信入口：优先 Gmail API，否则 SMTP。to_emails 为收件人列表。"""
    to_list = [e.strip() for e in to_emails if e and e.strip()]
    if not to_list:
        return False
    if _is_gmail_configured():
        try:
            ok = _send_via_gmail_api(subject, body_plain, to_list)
            if ok:
                return True
        except Exception as e:
            logger.warning("Gmail API 发信失败，将不回退 SMTP: %s", e)
        return False
    if _is_smtp_configured():
        try:
            port = int(EMAIL_SMTP_PORT) if isinstance(EMAIL_SMTP_PORT, str) else EMAIL_SMTP_PORT
        except (TypeError, ValueError):
            port = 587
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = EMAIL_FROM or EMAIL_USERNAME
        msg["To"] = ", ".join(to_list)
        msg.attach(MIMEText(body_plain, "plain", "utf-8"))
        try:
            with smtplib.SMTP(EMAIL_SMTP_HOST, port) as server:
                server.starttls()
                server.login(EMAIL_USERNAME, EMAIL_PASSWORD)
                server.sendmail(EMAIL_FROM or EMAIL_USERNAME, to_list, msg.as_string())
            return True
        except Exception as e:
            logger.exception("SMTP 发信失败: %s", e)
            return False
    return False


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

    ok = _send_mail(subject, body, EMAIL_RECIPIENTS)
    if ok:
        logger.info("Out-of-stock alert email sent: product_key=%s count=%s", product_key, count)
    return ok


def send_shortage_alert(
    product_name: str,
    specification: Optional[str],
    product_key: str,
    count: int,
    file_name: str = "",
) -> bool:
    """
    发送「某产品第 N 次缺货」提醒邮件。与无货逻辑对齐：count>=2 时由调用方触发。
    未配置邮箱时直接返回 False，不抛错。
    """
    if not is_email_configured():
        logger.debug("Email not configured, skip sending shortage alert.")
        return False

    spec_display = (specification or "").strip() or "—"
    subject = f"【缺货提醒】{product_name} 第 {count} 次报价缺货"
    body = f"""您好，

以下产品在报价匹配中再次出现缺货（库存不足），请关注：

  产品名称：{product_name}
  规格型号：{spec_display}
  缺货次数：{count} 次
  来源文件：{file_name or '—'}

请及时跟进补货或调配。

本邮件由报价单缺货产品追踪系统自动发送。"""

    ok = _send_mail(subject, body, EMAIL_RECIPIENTS)
    if ok:
        logger.info("Shortage alert email sent: product_key=%s count=%s", product_key, count)
    return ok
