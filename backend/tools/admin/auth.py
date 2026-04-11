"""
简单 token 认证：固定密码 → 随机 hex token，内存存储，TTL 4 小时。
ADMIN_PASSWORD 未配置时 is_enabled() 为 False。
"""

from __future__ import annotations

import os
import secrets
import time
from typing import Optional

_ADMIN_PASSWORD: str = os.getenv("ADMIN_PASSWORD", "")
_TOKEN_TTL = 4 * 3600

_tokens: dict[str, float] = {}


def is_enabled() -> bool:
    return bool(_ADMIN_PASSWORD)


def verify_password(password: str) -> Optional[str]:
    if not _ADMIN_PASSWORD:
        return None
    if password != _ADMIN_PASSWORD:
        return None
    token = secrets.token_hex(32)
    _tokens[token] = time.time() + _TOKEN_TTL
    _cleanup_expired()
    return token


def verify_token(token: str) -> bool:
    if not token:
        return False
    exp = _tokens.get(token)
    if exp is None:
        return False
    if time.time() > exp:
        del _tokens[token]
        return False
    return True


def _cleanup_expired() -> None:
    now = time.time()
    expired = [t for t, exp in _tokens.items() if now > exp]
    for t in expired:
        del _tokens[t]
