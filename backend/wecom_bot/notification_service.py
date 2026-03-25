from __future__ import annotations

import asyncio
import logging
import os
import time
from dataclasses import dataclass
from typing import Dict, List, Optional, Tuple

import httpx


logger = logging.getLogger(__name__)


def _safe_split_csv(value: str) -> List[str]:
    return [item.strip() for item in (value or "").split(",") if item and item.strip()]


def _safe_split_pipe(value: str) -> List[str]:
    return [item.strip() for item in (value or "").split("|") if item and item.strip()]


@dataclass(frozen=True)
class WeComApplicationConfig:
    corp_id: str
    app_secret: str
    agent_id: str
    timeout_sec: int = 10
    group_alias_mapping: str = ""

    @property
    def is_configured(self) -> bool:
        return bool(self.corp_id and self.app_secret and self.agent_id)

    @classmethod
    def from_env(cls) -> "WeComApplicationConfig":
        timeout_raw = (os.getenv("WECOM_APP_TIMEOUT_SEC") or "10").strip()
        try:
            timeout_sec = max(3, int(timeout_raw))
        except (TypeError, ValueError):
            timeout_sec = 10
        return cls(
            corp_id=(os.getenv("WECOM_CORP_ID") or "").strip(),
            app_secret=(os.getenv("WECOM_APP_SECRET") or "").strip(),
            agent_id=(os.getenv("WECOM_APP_AGENT_ID") or os.getenv("WECOM_AGENT_ID") or "").strip(),
            timeout_sec=timeout_sec,
            group_alias_mapping=(os.getenv("WECOM_GROUP_ALIAS_MAPPING") or "").strip(),
        )


class WeComApplicationClient:
    """
    企业微信应用消息 API 客户端。

    - 通过 token cache 避免每次请求都调用 gettoken。
    - 支持 text/markdown，目标支持 touser/toparty/totag。
    """

    def __init__(self, cfg: WeComApplicationConfig) -> None:
        self._cfg = cfg
        self._token_cache: Dict[str, object] = {"access_token": "", "expires_at": 0.0}
        self._token_lock = asyncio.Lock()
        self._alias_map = self._parse_group_alias_mapping(cfg.group_alias_mapping)

    @staticmethod
    def _parse_group_alias_mapping(raw: str) -> Dict[str, List[str]]:
        mapping: Dict[str, List[str]] = {}
        for item in _safe_split_csv(raw):
            if ":" not in item:
                continue
            alias, users_text = item.split(":", 1)
            alias_key = alias.strip()
            users = _safe_split_pipe(users_text)
            if alias_key and users:
                mapping[alias_key] = users
        return mapping

    def _build_targets(
        self,
        to_users: Optional[List[str]],
        to_parties: Optional[List[str]],
        to_tags: Optional[List[str]],
    ) -> Tuple[str, str, str]:
        users: List[str] = []
        parties: List[str] = []
        tags: List[str] = []

        for user in (to_users or []):
            val = (user or "").strip()
            if val:
                users.append(val)

        for party in (to_parties or []):
            key = (party or "").strip()
            if not key:
                continue
            # 允许 to_parties 传 group alias，并映射为 touser 广播
            alias_users = self._alias_map.get(key)
            if alias_users:
                users.extend(alias_users)
            else:
                parties.append(key)

        for tag in (to_tags or []):
            val = (tag or "").strip()
            if val:
                tags.append(val)

        # 去重并保持顺序
        users = list(dict.fromkeys(users))
        parties = list(dict.fromkeys(parties))
        tags = list(dict.fromkeys(tags))
        return "|".join(users), "|".join(parties), "|".join(tags)

    async def _get_access_token(self) -> str:
        now = time.time()
        token = str(self._token_cache.get("access_token") or "")
        expires_at = float(self._token_cache.get("expires_at") or 0.0)
        if token and now < expires_at:
            return token

        async with self._token_lock:
            now = time.time()
            token = str(self._token_cache.get("access_token") or "")
            expires_at = float(self._token_cache.get("expires_at") or 0.0)
            if token and now < expires_at:
                return token

            url = "https://qyapi.weixin.qq.com/cgi-bin/gettoken"
            params = {"corpid": self._cfg.corp_id, "corpsecret": self._cfg.app_secret}
            async with httpx.AsyncClient(timeout=self._cfg.timeout_sec) as client:
                resp = await client.get(url, params=params)
                resp.raise_for_status()
                payload = resp.json()

            if int(payload.get("errcode", 0)) != 0:
                raise RuntimeError(f"获取企业微信 access_token 失败: {payload}")

            access_token = str(payload.get("access_token") or "").strip()
            if not access_token:
                raise RuntimeError("企业微信返回空 access_token")

            expires_in = int(payload.get("expires_in") or 7200)
            # 提前 5 分钟过期，避免临界时刻请求失败
            self._token_cache["access_token"] = access_token
            self._token_cache["expires_at"] = time.time() + max(60, expires_in - 300)
            return access_token

    async def _send(self, payload: Dict[str, object]) -> Dict[str, object]:
        if not self._cfg.is_configured:
            raise RuntimeError("企业微信应用消息未配置完整，请检查 WECOM_CORP_ID/WECOM_APP_SECRET/WECOM_APP_AGENT_ID")
        token = await self._get_access_token()
        url = "https://qyapi.weixin.qq.com/cgi-bin/message/send"
        async with httpx.AsyncClient(timeout=self._cfg.timeout_sec) as client:
            resp = await client.post(url, params={"access_token": token}, json=payload)
            resp.raise_for_status()
            body = resp.json()
        if int(body.get("errcode", 0)) != 0:
            raise RuntimeError(f"企业微信发送失败: {body}")
        return body

    async def send_text(
        self,
        *,
        content: str,
        to_users: Optional[List[str]] = None,
        to_parties: Optional[List[str]] = None,
        to_tags: Optional[List[str]] = None,
    ) -> Dict[str, object]:
        touser, toparty, totag = self._build_targets(to_users, to_parties, to_tags)
        if not (touser or toparty or totag):
            raise ValueError("至少提供一个目标：to_users/to_parties/to_tags")
        payload: Dict[str, object] = {
            "touser": touser,
            "toparty": toparty,
            "totag": totag,
            "msgtype": "text",
            "agentid": self._cfg.agent_id,
            "text": {"content": content},
            "safe": 0,
        }
        return await self._send(payload)

    async def send_markdown(
        self,
        *,
        content: str,
        to_users: Optional[List[str]] = None,
        to_parties: Optional[List[str]] = None,
        to_tags: Optional[List[str]] = None,
    ) -> Dict[str, object]:
        touser, toparty, totag = self._build_targets(to_users, to_parties, to_tags)
        if not (touser or toparty or totag):
            raise ValueError("至少提供一个目标：to_users/to_parties/to_tags")
        payload: Dict[str, object] = {
            "touser": touser,
            "toparty": toparty,
            "totag": totag,
            "msgtype": "markdown",
            "agentid": self._cfg.agent_id,
            "markdown": {"content": content},
            "safe": 0,
        }
        return await self._send(payload)


_client_singleton: Optional[WeComApplicationClient] = None
_client_lock = asyncio.Lock()


async def get_wecom_application_client() -> WeComApplicationClient:
    global _client_singleton
    if _client_singleton is not None:
        return _client_singleton
    async with _client_lock:
        if _client_singleton is None:
            _client_singleton = WeComApplicationClient(WeComApplicationConfig.from_env())
            logger.info("WeComApplicationClient 初始化完成（agent_id=%s）", _client_singleton._cfg.agent_id)
    return _client_singleton

