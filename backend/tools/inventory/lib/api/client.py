"""
Accurate Online API 客户端封装层

严格限制为只读操作（GET 方法），实现方法白名单验证

来源：opencode_agent/external_services/data_platform/src/api/client.py
"""

import os
import logging
import requests
from typing import Dict, Any, Optional, List
from dotenv import load_dotenv
from datetime import datetime, timezone
import hmac
import hashlib
import base64

from backend.tools.inventory.lib.db_list import generate_timestamp_and_signature

load_dotenv()
logger = logging.getLogger(__name__)


class AccurateOnlineAPIClient:
    """
    Accurate Online API 客户端
    严格限制为只读操作
    """

    ALLOWED_METHODS = ["GET"]  # 只允许 GET 方法

    def __init__(self):
        self.base_url = "https://account.accurate.id"
        self.database_id = os.getenv("AOL_DATABASE_ID")
        self.access_token = os.getenv("AOL_ACCESS_TOKEN")
        self.signature_secret = os.getenv("AOL_SIGNATURE_SECRET")

        if not self.access_token:
            raise ValueError("AOL_ACCESS_TOKEN 环境变量未设置")
        if not self.signature_secret:
            raise ValueError("AOL_SIGNATURE_SECRET 环境变量未设置")

    def _validate_method(self, method: str):
        if method.upper() not in self.ALLOWED_METHODS:
            logger.critical(f"🚨 安全违规：检测到非 GET 请求 - {method}")
            raise ValueError(
                f"🚨 安全约束：禁止使用 {method} 方法。"
                f"本系统只允许 GET 方法（只读操作）。"
            )

    def _get_headers(self) -> Dict[str, str]:
        """生成请求头（包含签名）"""
        timestamp, signature = generate_timestamp_and_signature(self.signature_secret)
        return {
            "Authorization": f"Bearer {self.access_token}",
            "X-Api-Timestamp": timestamp,
            "X-Api-Signature": signature
        }

    def get(self, endpoint: str, params: Optional[Dict[str, Any]] = None, timeout: int = 30, use_database_url: bool = False) -> Dict[str, Any]:
        self._validate_method("GET")

        if use_database_url:
            if not self.database_id:
                raise ValueError("AOL_DATABASE_ID 环境变量未设置，无法使用数据库特定 URL")
            url = f"https://{self.database_id}.accurate.id/accurate{endpoint}"
        else:
            url = f"{self.base_url}{endpoint}"

        headers = self._get_headers()
        logger.info(f"发送 GET 请求: {endpoint} (URL: {url})")

        try:
            response = requests.get(url, headers=headers, params=params, timeout=timeout)
            response.raise_for_status()
            result = response.json()

            if result.get("s", False):
                logger.info(f"✓ GET 请求成功: {endpoint}")
                return result
            else:
                logger.warning(f"API 返回错误: {result}")
                return result

        except requests.exceptions.Timeout:
            logger.error(f"GET 请求超时: {endpoint}")
            raise
        except requests.exceptions.RequestException as e:
            logger.error(f"GET 请求失败: {endpoint}, 错误: {e}")
            raise

    def post(self, endpoint: str, **kwargs):
        logger.critical(f"🚨 安全违规：尝试使用 POST 方法 - {endpoint}")
        raise ValueError("🚨 安全约束：禁止使用 POST 方法。本系统只允许只读操作。")

    def put(self, endpoint: str, **kwargs):
        logger.critical(f"🚨 安全违规：尝试使用 PUT 方法 - {endpoint}")
        raise ValueError("🚨 安全约束：禁止使用 PUT 方法。本系统只允许只读操作。")

    def patch(self, endpoint: str, **kwargs):
        logger.critical(f"🚨 安全违规：尝试使用 PATCH 方法 - {endpoint}")
        raise ValueError("🚨 安全约束：禁止使用 PATCH 方法。本系统只允许只读操作。")

    def delete(self, endpoint: str, **kwargs):
        logger.critical(f"🚨 安全违规：尝试使用 DELETE 方法 - {endpoint}")
        raise ValueError("🚨 安全约束：禁止使用 DELETE 方法。本系统只允许只读操作。")

    def get_db_list(self) -> Dict[str, Any]:
        endpoint = "/api/db-list.do"
        return self.get(endpoint, use_database_url=False)

    def get_table_data(self, table_name: str, date_range: Optional[List[str]] = None,
                       params: Optional[Dict[str, Any]] = None, timeout: int = 30) -> Dict[str, Any]:
        endpoint = f"/api/{table_name}/list.do"
        request_params = params or {}
        if date_range:
            request_params["start_date"] = date_range[0]
            if len(date_range) > 1:
                request_params["end_date"] = date_range[-1]
            else:
                request_params["end_date"] = date_range[0]

        return self.get(endpoint, params=request_params, timeout=timeout, use_database_url=True)
