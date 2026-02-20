"""
调用 Accurate Online API 获取数据库列表
API: /api/db-list.do

⚠️ 安全约束（最高优先级）：
- 本系统所有 API 调用严格限制为只读操作（GET）
- 绝对禁止任何修改操作（PUT, POST, PATCH, DELETE）
- 绝对禁止删除、更新、创建数据
- 只能抓取数据表，不能修改数据

来源：opencode_agent/external_services/data_platform/src/db_list.py
"""

import os
from typing import Optional
import hmac
import hashlib
import base64
import requests
from dotenv import load_dotenv
from datetime import datetime, timezone

# 加载 .env 文件中的环境变量
load_dotenv()

# API 配置
API_BASE_URL = "https://account.accurate.id"
API_ENDPOINT = "/api/db-list.do"
API_URL = f"{API_BASE_URL}{API_ENDPOINT}"

# 从环境变量中获取访问令牌和签名密钥
ACCESS_TOKEN = os.getenv("AOL_ACCESS_TOKEN")
SIGNATURE_SECRET = os.getenv("AOL_SIGNATURE_SECRET")


def generate_timestamp_and_signature(secret: Optional[str] = None) -> tuple[str, str]:
    """
    生成 X-Api-Timestamp 和 X-Api-Signature 请求头

    根据 Accurate Online API Token 文档：
    - X-Api-Timestamp: ISO8601 格式 (例如: 2026-01-18T14:23:11Z)
    - X-Api-Signature: HMAC-SHA256(timestamp, Signature Secret) 然后 Base64 编码

    Args:
        secret: Signature Secret 密钥（来自 Developer Application）

    Returns:
        tuple: (timestamp字符串, signature字符串)
    """
    if secret is None:
        secret = SIGNATURE_SECRET
    if not secret:
        raise ValueError("请在 .env 文件中设置 AOL_SIGNATURE_SECRET")

    # 1️⃣ 生成 ISO8601 格式的时间戳（UTC）
    timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

    # 2️⃣ 计算 HMAC-SHA256(timestamp, Signature Secret)
    raw_signature = hmac.new(
        secret.encode("utf-8"),
        timestamp.encode("utf-8"),
        hashlib.sha256
    ).digest()

    # 3️⃣ Base64 编码（不是 hex！）
    signature = base64.b64encode(raw_signature).decode("utf-8")

    return timestamp, signature
