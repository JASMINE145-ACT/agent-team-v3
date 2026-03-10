from __future__ import annotations

"""
WeCom 长连接 Bot 客户端。

包含两种实现：
- WeComBotClient：基于官方 `wecom-aibot-sdk` 的长连接客户端（需要安装 `wecom-aibot-sdk`）；
- DummyWeComBotClient：命令行 stdin 模拟 WeCom 文本消息，便于本地验证 Agent 行为。

`run_wecom_bot(agent)` 会根据配置与 SDK 是否可用自动选择真实客户端或 Dummy 模式。
"""

import asyncio
import logging
import sys
import uuid
from typing import Awaitable, Callable, Optional

from backend.wecom_bot.config import WeComBotConfig, load_wecom_bot_config
from backend.wecom_bot.handler import StandardWeComMessage, handle_wecom_message


logger = logging.getLogger(__name__)

try:  # 尝试导入官方 SDK，失败时回退到 Dummy 模式
    from wecom_aibot_sdk import WSClient, generate_req_id

    _HAS_AIBOT_SDK = True
except Exception:  # noqa: BLE001
    WSClient = None  # type: ignore[assignment]
    generate_req_id = None  # type: ignore[assignment]
    _HAS_AIBOT_SDK = False


class DummyWeComBotClient:
    """
    命令行模拟版 WeCom Bot 客户端。

    用途：
    - 本地快速验证 CoreAgent.execute_react 在 “wecom:xxx” session_id 下的行为；
    - 验证 handler/配置/依赖是否正常；
    - 在未安装 wecom-aibot-sdk 或未配置 WECOM_BOT_ID/SECRET 时作为兜底。
    """

    def __init__(
        self,
        on_message: Callable[[StandardWeComMessage], Awaitable[str]],
        from_user: str = "debug-user",
        to_user: str = "wecom-bot",
    ) -> None:
        self._on_message = on_message
        self._from_user = from_user
        self._to_user = to_user

    async def run_forever(self) -> None:
        loop = asyncio.get_running_loop()
        logger.info("DummyWeComBotClient 已启动。输入文本并回车发送，输入 '/exit' 退出。")

        while True:
            # 在后台线程中阻塞读取 stdin，避免阻塞事件循环
            line: Optional[str] = await loop.run_in_executor(None, sys.stdin.readline)
            if line is None:
                logger.info("检测到 stdin EOF，DummyWeComBotClient 即将退出。")
                break

            content = line.strip()
            if not content:
                continue
            if content in {"/exit", "exit", "quit"}:
                logger.info("收到退出指令，DummyWeComBotClient 结束运行。")
                break

            msg: StandardWeComMessage = {
                "msg_id": str(uuid.uuid4()),
                "from_user": self._from_user,
                "to_user": self._to_user,
                "msg_type": "text",
                "content": content,
                "raw": {"source": "stdin"},
            }

            try:
                reply = await self._on_message(msg)
            except Exception as e:  # noqa: BLE001
                logger.exception("处理 Dummy WeCom 消息失败: %s", e)
                reply = "系统处理消息时出错，请稍后再试。"

            print(f"\n[Agent 回复] {reply}\n", flush=True)


class WeComBotClient:
    """
    基于 wecom-aibot-sdk 的真实企业微信智能机器人客户端。

    前置条件：
    - 已安装 `wecom-aibot-sdk`（pip install wecom-aibot-sdk）
    - `.env` 中配置 WECOM_BOT_ID / WECOM_BOT_SECRET
    """

    def __init__(self, cfg: WeComBotConfig, agent) -> None:
        if not _HAS_AIBOT_SDK:
            raise RuntimeError("未安装 wecom-aibot-sdk，无法使用真实 WeComBotClient。请先 `pip install wecom-aibot-sdk`。")
        if not cfg.is_configured:
            raise ValueError("WeComBotClient 需要 bot_id 与 secret，当前配置不完整。")

        from backend.core.agent import CoreAgent  # 局部导入避免类型检查时的循环引用

        if not isinstance(agent, CoreAgent):
            logger.warning("WeComBotClient 收到的 agent 非 CoreAgent 实例：%r", agent)

        self._agent = agent
        self._cfg = cfg
        self._ws = WSClient(bot_id=cfg.bot_id, secret=cfg.secret)

        # 基础事件
        self._ws.on("connected", lambda: logger.info("WeCom WS 已连接"))
        self._ws.on("authenticated", lambda: logger.info("WeCom WS 认证成功"))
        self._ws.on("disconnected", lambda reason: logger.warning("WeCom WS 连接断开: %s", reason))
        self._ws.on("reconnecting", lambda attempt: logger.info("WeCom WS 正在进行第 %s 次重连…", attempt))
        self._ws.on("error", lambda error: logger.error("WeCom WS 发生错误: %s", error))

        # 文本消息 → 交给 CoreAgent 处理，并以流式最后一段回复
        async def _on_text_message(frame):
            body = frame.get("body", {}) or {}
            text = (body.get("text", {}) or {}).get("content", "") or ""

            # 尽量从 frame 中提取一个稳定的用户标识，用于 session_id
            frm = body.get("from", {}) or {}
            from_user = (
                frm.get("userid")
                or frm.get("user_id")
                or frm.get("external_userid")
                or frm.get("open_userid")
                or "wecom-user"
            )

            msg: StandardWeComMessage = {
                "msg_id": frame.get("header", {}).get("msg_id") or str(uuid.uuid4()),
                "from_user": from_user,
                "to_user": frm.get("chatid") or "wecom-bot",
                "msg_type": "text",
                "content": text,
                "raw": frame,
            }

            logger.info("WeCom 文本消息来自 %s: %s", from_user, text[:200])

            try:
                answer = await handle_wecom_message(self._agent, msg)
            except Exception as e:  # noqa: BLE001
                logger.exception("处理 WeCom 文本消息失败: %s", e)
                answer = "系统处理消息时出错，请稍后再试。"

            stream_id = generate_req_id("stream")
            await self._ws.reply_stream(frame, stream_id, answer, True)

        self._ws.on("message.text", _on_text_message)

    async def run_forever(self) -> None:
        """
        建立 WebSocket 长连接，并保持运行。
        `wecom-aibot-sdk` 内部负责重连与心跳。
        """
        logger.info("WeComBotClient 启动中，bot_id=%s", self._cfg.bot_id)
        await self._ws.connect()
        logger.info("WeComBotClient 已连接，进入事件循环。")

        stop_event = asyncio.Event()

        try:
            await stop_event.wait()
        except asyncio.CancelledError:
            logger.info("WeComBotClient 收到取消信号，正在断开连接…")
            await self._ws.disconnect()
            raise


async def run_wecom_bot(agent) -> None:
    """
    启动 WeCom Bot。

    策略：
    - 若安装了 wecom-aibot-sdk 且配置了 WECOM_BOT_ID/WECOM_BOT_SECRET，则使用真实 WeComBotClient；
    - 否则回退到 DummyWeComBotClient（命令行模拟 WeCom 文本消息）。
    """
    cfg = load_wecom_bot_config()

    use_real = _HAS_AIBOT_SDK and cfg.is_configured
    if use_real:
        logger.info(
            "WeCom Bot 将以 **真实长连接模式** 运行（wecom-aibot-sdk，bot_id=%s）。",
            cfg.bot_id,
        )
        client = WeComBotClient(cfg, agent)
    else:
        if not _HAS_AIBOT_SDK:
            logger.warning("未安装 wecom-aibot-sdk，将以 Dummy 模式运行（命令行模拟 WeCom 消息）。")
        elif not cfg.is_configured:
            logger.warning(
                "WeCom Bot 配置不完整（缺少 WECOM_BOT_ID 或 WECOM_BOT_SECRET），将以 Dummy 模式运行。"
            )
        client = DummyWeComBotClient(
            on_message=lambda msg: handle_wecom_message(agent, msg),  # type: ignore[arg-type]
        )

    await client.run_forever()


__all__ = ["DummyWeComBotClient", "WeComBotClient", "run_wecom_bot"]


