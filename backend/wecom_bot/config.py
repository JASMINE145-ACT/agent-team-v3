from __future__ import annotations

"""
WeCom 长连接 Bot 配置。

读取以下环境变量（在根 .env 或 v3 .env 中设置）：
- WECOM_BOT_ID: 企业微信 Bot ID
- WECOM_BOT_SECRET: 企业微信 Bot Secret
- WECOM_BOT_PROXY_URL: 可选，访问企业微信接口时使用的 HTTP 代理
"""

import logging
import os
from dataclasses import dataclass
from typing import Optional


logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class WeComBotConfig:
    bot_id: str
    secret: str
    proxy_url: Optional[str] = None

    @property
    def is_configured(self) -> bool:
        return bool(self.bot_id and self.secret)


def load_wecom_bot_config() -> WeComBotConfig:
    bot_id = (os.getenv("WECOM_BOT_ID") or "").strip()
    secret = (os.getenv("WECOM_BOT_SECRET") or "").strip()
    proxy_url = (os.getenv("WECOM_BOT_PROXY_URL") or "").strip() or None

    cfg = WeComBotConfig(bot_id=bot_id, secret=secret, proxy_url=proxy_url)
    if not cfg.is_configured:
        logger.warning(
            "WeCom Bot 未完全配置（缺少 WECOM_BOT_ID 或 WECOM_BOT_SECRET），"
            "当前将仅使用 DummyWeComBotClient 做本地调试。"
        )
    else:
        logger.info("WeCom Bot 配置已加载（bot_id=%s，proxy=%s）", cfg.bot_id, cfg.proxy_url or "none")
    return cfg


__all__ = ["WeComBotConfig", "load_wecom_bot_config"]

