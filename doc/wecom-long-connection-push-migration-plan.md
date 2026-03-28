# 企业微信群推送：Webhook → 企业微信应用消息 API 改造计划

> **前提**：本方案**不是**用"长连接机器人（WSClient）"做主动推送。WSClient 是被动对话机器人，**不能**用于系统后台告警推送。本改造使用**企业微信应用消息 API**（HTTP API）替代群机器人 Webhook。

## 凭证体系说明（关键纠正）

企业微信有三套完全不同的身份凭证，**不可混用**：

| 类型 | 凭证 | 用途 |
|------|------|------|
| 智能机器人（长连接） | `bot_id` + `secret` | WSClient 被动对话，`reply_stream` 回复 |
| 应用消息 API | `corpid` + `agentid` + `corpsecret` | 主动推送文本/ markdown / 文件等到用户或群 |
| 群机器人 Webhook | `webhook_url` | HTTP POST 推送文本到群（现有实现） |

**本改造**：`wecom_group_service.py`（Webhook）→ `wecom_app_push_service.py`（应用消息 API），后者使用 `corpid` + `corpsecret` + `agentid`，与 WSClient 的 `bot_id`/`secret` **完全独立**。

---

## 目标架构

```
CoreAgent
   ↓
alert_dispatch
   ↓
wecom_app_push_service      ← 新增：企业微信应用消息 API
   ↓
企业微信应用消息 API（HTTP）
   ↓
指定群（chat_id）/ 指定成员（userid）
```

---

## 改造计划（Phase 1 调研 + Phase 2 实现）

### Phase 1 — 调研确认（约 1h，无需改代码）

**Step 1.1** 确认应用消息 API 的凭证

你需要向企业微信管理员获取以下四个信息：

| 变量 | 获取位置 |
|------|----------|
| `WECOM_CORPID` | "我的企业"页面 → 企业 ID |
| `WECOM_CORP_SECRET` | "应用管理" → 你的应用 → Secret（若未创建应用，见 Step 1.2） |
| `WECOM_AGENT_ID` | "应用管理" → 你的应用 → AgentId |
| `WECOM_PUSH_CHAT_ID` | 群聊 → 群详情 → 群 ID（有时需要通过 API 拉取） |

> **注意**：`bot_id` + `secret`（WSClient 长连接用）和 `corpsecret` + `agentid`（应用消息 API 用）是**两套不同的应用**，需要从企业微信管理后台"应用管理"中分别获取，不能共用。

**Step 1.2** 在企业微信后台创建推送专用应用（若尚未有独立应用）

1. 登录 [企业微信管理后台](https://work.weixin.qq.com/) → "应用管理"
2. 创建应用（类型不限，"自建"即可），记下 `AgentId` 和 `Secret`
3. 在"应用详情 → 可见范围"中配置哪些成员/部门可见
4. 若要推送到群聊，需要先获取群的 `chat_id`：在目标群中发送一条消息，然后通过 [获取群聊会话](https://developer.work.weixin.qq.com/document/path/90245) 接口拉取

---

### Phase 2 — 实现（约 2h）

#### Step 2.1 新建 `backend/services/wecom_app_push_service.py`

```python
# -*- coding: utf-8 -*-
"""
企业微信应用消息 API 推送服务（HTTP，非长连接机器人）。
文档：https://developer.work.weixin.qq.com/document/path/90236
"""
from __future__ import annotations

import logging
import time
from typing import List, Optional

import requests

logger = logging.getLogger(__name__)


class WecomAppPushService:
    """
    企业微信应用消息 API 主动推送封装。
    access_token 由实例管理，带缓存，过期前 60 秒主动刷新。
    """

    def __init__(self, corpid: str, corpsecret: str, agentid: str):
        self.corpid = corpid
        self.corpsecret = corpsecret
        self.agentid = agentid
        self._access_token: Optional[str] = None
        self._expire_at: float = 0.0

    # ------------------------------------------------------------------
    # access_token 管理
    # ------------------------------------------------------------------
    def get_access_token(self) -> Optional[str]:
        """获取 access_token，带缓存（有效期 7200 秒，提前 60s 刷新）。失败返回 None。"""
        if self._access_token and time.time() < self._expire_at:
            return self._access_token

        url = (
            "https://qyapi.weixin.qq.com/cgi-bin/gettoken"
            f"?corpid={self.corpid}&corpsecret={self.corpsecret}"
        )
        try:
            r = requests.get(url, timeout=10)
            r.raise_for_status()
            body = r.json()
            if body.get("errcode", 0) != 0:
                logger.error("gettoken failed: %s", body)
                return None
            self._access_token = body["access_token"]
            # 提前 60 秒刷新，留 buffer
            self._expire_at = time.time() + int(body.get("expires_in", 7200)) - 60
            return self._access_token
        except Exception as e:
            logger.exception("gettoken request failed: %s", e)
            return None

    # ------------------------------------------------------------------
    # 推送接口
    # ------------------------------------------------------------------
    def _do_send(self, payload: dict) -> bool:
        """通用 POST 发送接口。返回 True 表示调用成功（errcode==0）。"""
        token = self.get_access_token()
        if not token:
            return False
        url = f"https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token={token}"
        try:
            r = requests.post(url, json=payload, timeout=15)
            r.raise_for_status()
            body = r.json()
            if isinstance(body, dict) and body.get("errcode", -1) != 0:
                logger.warning("message/send failed: %s", body)
                return False
            return True
        except Exception as e:
            logger.exception("message/send request failed: %s", e)
            return False

    def send_text_to_user(self, userid: str, content: str, safe: int = 0) -> bool:
        """推送文本消息给指定成员。"""
        payload = {
            "msgtype": "text",
            "agentid": self.agentid,
            "touser": userid,
            "text": {"content": content},
            "safe": safe,
        }
        return self._do_send(payload)

    def send_text_to_group(self, chatid: str, content: str, mentioned_list: Optional[List[str]] = None) -> bool:
        """
        推送文本消息到指定群聊。
        chatid: 群的 chat_id。
        mentioned_list: 被 @ 的成员 userid 列表；填 "@all" 可 @所有人。
        """
        payload = {
            "msgtype": "text",
            "agentid": self.agentid,
            "chatid": chatid,
            "text": {
                "content": content,
                "mentioned_list": mentioned_list or [],
            },
        }
        return self._do_send(payload)

    def send_markdown_to_user(self, userid: str, content: str, safe: int = 0) -> bool:
        """推送 Markdown 消息给指定成员（企业微信 4.0+ 支持）。"""
        payload = {
            "msgtype": "markdown",
            "agentid": self.agentid,
            "touser": userid,
            "markdown": {"content": content},
            "safe": safe,
        }
        return self._do_send(payload)

    def send_markdown_to_group(self, chatid: str, content: str, mentioned_list: Optional[List[str]] = None) -> bool:
        """推送 Markdown 消息到指定群。"""
        payload = {
            "msgtype": "markdown",
            "agentid": self.agentid,
            "chatid": chatid,
            "markdown": {"content": content},
            "text": {"mentioned_list": mentioned_list or []},
        }
        return self._do_send(payload)


# ------------------------------------------------------------------
# 全局单例（进程内共享，延迟初始化）
# ------------------------------------------------------------------
_push_service: Optional[WecomAppPushService] = None


def get_push_service(
    corpid: Optional[str] = None,
    corpsecret: Optional[str] = None,
    agentid: Optional[str] = None,
) -> Optional[WecomAppPushService]:
    """
    获取全局推送服务单例。
    若尚未初始化且提供了完整凭证，则立即初始化。
    """
    global _push_service
    if _push_service is not None:
        return _push_service
    if corpid and corpsecret and agentid:
        _push_service = WecomAppPushService(corpid, corpsecret, agentid)
        return _push_service
    return None


def is_wecom_app_configured() -> bool:
    """是否已配置企业微信应用消息 API。"""
    return get_push_service() is not None
```

#### Step 2.2 更新 `backend/tools/oos/config.py`

新增环境变量：

```python
# 企业微信应用消息 API（用于主动推送告警到群/用户，与 WSClient 长连接机器人 bot_id/secret 完全独立）
WECOM_CORPID = os.getenv("WECOM_CORPID", "").strip() or None
WECOM_CORP_SECRET = os.getenv("WECOM_CORP_SECRET", "").strip() or None
WECOM_AGENT_ID = os.getenv("WECOM_AGENT_ID", "").strip() or None
# 推送到群时的 chat_id（通过企业微信管理后台或 API 获取）
WECOM_PUSH_CHAT_ID = os.getenv("WECOM_PUSH_CHAT_ID", "").strip() or None
# 推送时默认 @ 的成员 userid 列表，填 "@all" 可 @所有人
WECOM_PUSH_MENTIONED_USERS = [
    u.strip() for u in (os.getenv("WECOM_PUSH_MENTIONED_USERS") or "").split(",")
    if u and u.strip()
]
```

#### Step 2.3 更新 `alert_dispatch.py`

将 `wecom_app` 纳入调度通道：

```python
# OOS_ALERT_MODE 新增 "wecom_app" 选项：
#   email_only  — 仅邮件（默认）
#   wecom_webhook — 仅群机器人 Webhook（现有实现）
#   wecom_app     — 仅应用消息 API（本次改造）
#   both          — 邮件 + wecom_app（替代原来的 wecom_only）
```

改造后的调度逻辑：

```python
def dispatch_out_of_stock_alert(...):
    mode = _normalize_mode()
    email_ok = wecom_webhook_ok = wecom_app_ok = False

    if mode in ("email_only", "both"):
        email_ok = send_out_of_stock_alert(...)

    if mode in ("wecom_app",):
        if is_wecom_app_configured():
            wecom_app_ok = send_wecom_app_out_of_stock_alert(...)

    if mode == "email_only":
        return email_ok
    if mode == "wecom_app":
        return wecom_app_ok
    # "both": 任一成功即返回 True
    return email_ok or wecom_webhook_ok or wecom_app_ok
```

新增 `send_wecom_app_out_of_stock_alert` / `send_wecom_app_shortage_alert`，内部调用 `get_push_service().send_text_to_group(...)`。

#### Step 2.4 更新 `.env.example`

```bash
# -----------------------------------------------------------------------------
# 企业微信应用消息 API（主动推送告警，与 WSClient 长连接 bot_id/secret 完全独立）
# -----------------------------------------------------------------------------
# WECOM_CORPID=your_corpid
# WECOM_CORP_SECRET=your_corp_secret
# WECOM_AGENT_ID=your_agentid
# WECOM_PUSH_CHAT_ID=the_group_chatid
# WECOM_PUSH_MENTIONED_USERS=userid1,userid2,@all
```

---

## 完整改造文件清单

| 阶段 | 文件 | 操作 |
|------|------|------|
| Phase 1 | — | 确认凭证（无需改代码） |
| Phase 2 | `backend/services/wecom_app_push_service.py` | **新建** |
| Phase 2 | `backend/tools/oos/services/alert_dispatch.py` | 修改：新增 `wecom_app` 通道 |
| Phase 2 | `backend/tools/oos/config.py` | 新增 `WECOM_CORPID` 等环境变量 |
| Phase 2 | `backend/tools/oos/.env.example` | 补充新变量说明 |
| Phase 2 | `doc/oos-email-wecom-alerts.md` | 更新推送路径说明 |
| Phase 2 | `tests/test_wecom_app_push_service.py` | 新增单元测试 |

---

## 你需要提供什么（向企业微信管理员获取）

| 变量 | 说明 |
|------|------|
| `WECOM_CORPID` | 企业 ID，"我的企业"页面可见 |
| `WECOM_CORP_SECRET` | 应用 Secret，"应用管理 → 自建应用 → Secret" |
| `WECOM_AGENT_ID` | AgentId，同上应用页面 |
| `WECOM_PUSH_CHAT_ID` | 目标群的 chat_id（在群详情查看，或通过 API 拉取） |
| `WECOM_PUSH_MENTIONED_USERS` | 可选，要 @ 的成员 userid，多个用逗号分隔；填 `@all` 则 @所有人 |

> 注：在以上信息获取前，当前的**群机器人 Webhook**（`WECOM_GROUP_WEBHOOK_URL`）可继续使用，不影响告警流程。应用消息 API 改造完成后，将 `OOS_ALERT_MODE` 切换为 `wecom_app` 即可。
