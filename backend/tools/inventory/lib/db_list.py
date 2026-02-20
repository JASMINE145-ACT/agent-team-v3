"""
API 签名：时间戳 + HMAC，供 Accurate Online API 请求头使用
"""
import hashlib
import hmac
import time
from typing import Tuple


def generate_timestamp_and_signature(secret: str) -> Tuple[str, str]:
    """生成 X-Api-Timestamp 与 X-Api-Signature。"""
    timestamp = str(int(time.time()))
    signature = hmac.new(
        secret.encode("utf-8"),
        timestamp.encode("utf-8"),
        hashlib.sha256,
    ).hexdigest()
    return timestamp, signature
