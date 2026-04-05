from __future__ import annotations

"""
WeCom 长连接 Bot 客户端。

包含两种实现：
- WeComBotClient：基于官方 `wecom-aibot-sdk` 的长连接客户端（需要安装 `wecom-aibot-sdk`）；
- DummyWeComBotClient：命令行 stdin 模拟 WeCom 文本消息，便于本地验证 Agent 行为。

`run_wecom_bot(agent)` 会根据配置与 SDK 是否可用自动选择真实客户端或 Dummy 模式。
"""

import asyncio
import base64
import logging
import os
import re
import sys
import time
import uuid
from pathlib import Path
from typing import Any, Awaitable, Callable, Dict, List, Optional

import httpx

from backend.config import Config
from backend.wecom_bot.config import WeComBotConfig, load_wecom_bot_config
from backend.wecom_bot.handler import (
    StandardWeComMessage,
    handle_wecom_message,
    handle_wecom_file,
)


logger = logging.getLogger(__name__)

# 图片后缀（WeCom 文件消息按 filename 区分类型）
_WECOM_IMAGE_EXTENSIONS = (".png", ".jpg", ".jpeg", ".bmp", ".webp")


def _is_wecom_image_filename(filename: str) -> bool:
    lower = (filename or "").strip().lower()
    return any(lower.endswith(ext) for ext in _WECOM_IMAGE_EXTENSIONS)


def _wecom_filename_to_mime(filename: str) -> str:
    lower = (filename or "").strip().lower()
    if lower.endswith(".png"):
        return "image/png"
    if lower.endswith(".jpg") or lower.endswith(".jpeg"):
        return "image/jpeg"
    if lower.endswith(".bmp"):
        return "image/bmp"
    if lower.endswith(".webp"):
        return "image/webp"
    return "image/png"


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
        on_message: Callable[[StandardWeComMessage], Awaitable[List[str]]],
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
                replies = await self._on_message(msg)
            except Exception as e:  # noqa: BLE001
                logger.exception("处理 Dummy WeCom 消息失败: %s", e)
                print("\n[Agent 回复] 系统处理消息时出错，请稍后再试。\n", flush=True)
                continue

            for reply in replies:
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

        # 文本消息 → 先发确认消息,再交给 CoreAgent 处理
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

            # 🎯 立即发送确认消息
            stream_id_confirmation = generate_req_id("confirm")
            confirmation_text = "已收到您的请求,正在处理中..."
            await self._ws.reply_stream(frame, stream_id_confirmation, confirmation_text, True)

            # 然后处理实际请求
            try:
                messages = await handle_wecom_message(self._agent, msg)
            except Exception as e:  # noqa: BLE001
                logger.exception("处理 WeCom 文本消息失败: %s", e)
                messages = ["系统处理消息时出错，请稍后再试。"]

            # 每条卡片或回复独立发送
            for msg_text in messages:
                await self._ws.reply_stream(frame, generate_req_id("stream"), msg_text, True)

        self._ws.on("message.text", _on_text_message)

        # 文件下载：有限次重试 + 整体超时，仅对超时类异常重试
        async def _download_file_with_retry(url: str, aes_key: Any) -> Dict[str, Any]:
            timeout_sec = getattr(Config, "WECOM_FILE_DOWNLOAD_TIMEOUT", 60) or 60
            max_retries = 3
            last_exc: Optional[Exception] = None
            for attempt in range(max_retries):
                try:
                    return await asyncio.wait_for(
                        self._ws.download_file(url, aes_key),
                        timeout=timeout_sec,
                    )
                except (httpx.ConnectTimeout, httpx.ReadTimeout, asyncio.TimeoutError) as e:
                    last_exc = e
                    if attempt < max_retries - 1:
                        delay = 2**attempt
                        logger.warning("WeCom 文件下载超时或失败，%s 秒后重试（%s/%s）: %s", delay, attempt + 1, max_retries, e)
                        await asyncio.sleep(delay)
                    else:
                        raise
            assert last_exc is not None
            raise last_exc

        def _is_download_timeout(exc: Exception) -> bool:
            return isinstance(
                exc,
                (httpx.ConnectTimeout, httpx.ReadTimeout, asyncio.TimeoutError),
            )

        # 文件消息：Excel → 落盘 + handle_wecom_file；图片 → OCR → handle_wecom_message；其他 → 提示
        async def _on_file_message(frame):
            body = frame.get("body", {}) or {}
            file_info = (body.get("file") or {}) or {}
            url = file_info.get("url") or ""
            aes_key = file_info.get("aeskey")
            filename = (file_info.get("filename") or "").strip() or "wecom_upload.xlsx"

            frm = body.get("from", {}) or {}
            from_user = (
                frm.get("userid")
                or frm.get("user_id")
                or frm.get("external_userid")
                or frm.get("open_userid")
                or "wecom-user"
            )

            logger.info("WeCom 文件消息来自 %s: %s", from_user, filename)

            if not url:
                stream_id = generate_req_id("stream")
                msg = "收到文件消息，但未能获取下载地址，请稍后重试或改用 Web 控制台上传。"
                await self._ws.reply_stream(frame, stream_id, msg, True)
                return

            lower_name = filename.lower()
            is_excel = lower_name.endswith(".xlsx") or lower_name.endswith(".xlsm")
            is_image = _is_wecom_image_filename(filename)

            if not is_excel and not is_image:
                stream_id = generate_req_id("stream")
                msg = "当前仅支持 Excel 报价单或图片（.png/.jpg 等），请改用支持的类型或 Web 控制台上传。"
                await self._ws.reply_stream(frame, stream_id, msg, True)
                return

            # ---------- 图片分支：OCR 后进 Agent ----------
            if is_image:
                if not getattr(Config, "GLM_OCR_ENABLED", False):
                    await self._ws.reply_stream(
                        frame, generate_req_id("stream"),
                        "当前未启用图片识别，请使用文字或 Excel。",
                        True,
                    )
                    return
                api_key = getattr(Config, "GLM_OCR_API_KEY", None) or Config.OPENAI_API_KEY
                base_url = getattr(Config, "GLM_OCR_BASE_URL", "") or ""
                ocr_model = getattr(Config, "GLM_OCR_MODEL", "glm-ocr") or "glm-ocr"
                if not api_key or not base_url:
                    await self._ws.reply_stream(
                        frame, generate_req_id("stream"),
                        "未配置视觉识图 API Key 或 Base URL。",
                        True,
                    )
                    return
                try:
                    result = await _download_file_with_retry(url, aes_key)
                except Exception as e:  # noqa: BLE001
                    logger.exception("下载 WeCom 文件失败: %s", e)
                    stream_id = generate_req_id("stream")
                    msg = (
                        "文件下载超时，可能是网络或地域限制，请稍后重试或改用 Web 控制台上传。"
                        if _is_download_timeout(e)
                        else "文件下载失败，请稍后重试或改用 Web 控制台上传。"
                    )
                    await self._ws.reply_stream(frame, stream_id, msg, True)
                    return
                buffer = result.get("buffer") or b""
                if not buffer:
                    stream_id = generate_req_id("stream")
                    await self._ws.reply_stream(
                        frame, stream_id,
                        "未获取到图片内容，请重试或改用 Web 控制台上传。",
                        True,
                    )
                    return
                dl_name = (result.get("filename") or "").strip()
                filename_local = dl_name if dl_name else filename
                max_size = getattr(Config, "MAX_IMAGE_SIZE", 5 * 1024 * 1024)
                if len(buffer) > max_size:
                    stream_id = generate_req_id("stream")
                    await self._ws.reply_stream(
                        frame, stream_id,
                        f"图片超过大小限制（单张不超过 {max_size // (1024 * 1024)}MB），请压缩后重试或改用 Web 控制台。",
                        True,
                    )
                    return
                mime = _wecom_filename_to_mime(filename_local)
                image_attachments = [
                    {"content": base64.b64encode(buffer).decode(), "mimeType": mime},
                ]
                from backend.core.glm_ocr import run_ocr_for_attachments
                ocr_text, ocr_err = await asyncio.to_thread(
                    run_ocr_for_attachments,
                    image_attachments,
                    max_size,
                    api_key,
                    base_url,
                    ocr_model,
                )
                if ocr_err or not ocr_text:
                    stream_id = generate_req_id("stream")
                    await self._ws.reply_stream(
                        frame, stream_id,
                        ocr_err or "图片识别失败，请重试或改为文字/Excel。",
                        True,
                    )
                    return
                user_input = "【以下为上传图片的识别结果】\n" + ocr_text
                ocr_msg: StandardWeComMessage = {
                    "msg_id": frame.get("header", {}).get("msg_id") or str(uuid.uuid4()),
                    "from_user": from_user,
                    "to_user": frm.get("chatid") or "wecom-bot",
                    "msg_type": "text",
                    "content": user_input,
                    "raw": frame,
                }
                try:
                    ocr_messages = await handle_wecom_message(self._agent, ocr_msg)
                except Exception as e:  # noqa: BLE001
                    logger.exception("处理 WeCom 图片 OCR 后续消息失败: %s", e)
                    ocr_messages = ["系统处理消息时出错，请稍后再试。"]
                for msg_text in ocr_messages:
                    await self._ws.reply_stream(frame, generate_req_id("stream"), msg_text, True)
                return

            # ---------- Excel 分支：落盘 + 摘要绑定 ----------
            try:
                result = await _download_file_with_retry(url, aes_key)
            except Exception as e:  # noqa: BLE001
                logger.exception("下载 WeCom 文件失败: %s", e)
                stream_id = generate_req_id("stream")
                msg = (
                    "文件下载超时，可能是网络或地域限制，请稍后重试或改用 Web 控制台上传。"
                    if _is_download_timeout(e)
                    else "文件下载失败，请稍后重试或在 Web 控制台上传 Excel 报价单。"
                )
                await self._ws.reply_stream(frame, stream_id, msg, True)
                return

            buffer = result.get("buffer")
            if buffer is None or not isinstance(buffer, bytes):
                logger.warning("WeCom 文件下载返回无有效 buffer: result keys=%s", list(result.keys()))
                stream_id = generate_req_id("stream")
                await self._ws.reply_stream(
                    frame, stream_id,
                    "文件下载后未获取到内容，请稍后重试或改用 Web 控制台上传。",
                    True,
                )
                return
            dl_name = (result.get("filename") or "").strip()
            filename_local = dl_name if dl_name else filename

            safe_user = re.sub(r"[^\w\-]", "_", from_user)[:64] or "wecom"
            upload_root = Path(Config.UPLOAD_DIR)
            save_dir = upload_root / "wecom" / safe_user
            try:
                save_dir.mkdir(parents=True, exist_ok=True)
            except OSError as e:  # noqa: BLE001
                logger.exception("创建 WeCom 上传目录失败: %s", e)
                stream_id = generate_req_id("stream")
                msg = "服务端目录创建失败，暂时无法保存文件，请联系管理员或改用 Web 控制台上传。"
                await self._ws.reply_stream(frame, stream_id, msg, True)
                return

            base_name = os.path.basename(filename_local)
            if not (base_name.lower().endswith(".xlsx") or base_name.lower().endswith(".xlsm")):
                base_name = "wecom_upload.xlsx"
            ts = int(time.time())
            local_path = save_dir / f"{ts}_{base_name}"

            try:
                local_path.write_bytes(buffer)
            except OSError as e:  # noqa: BLE001
                logger.exception("保存 WeCom 文件到本地失败: %s", e)
                stream_id = generate_req_id("stream")
                msg = "文件保存失败，请稍后重试或改用 Web 控制台上传报价单。"
                await self._ws.reply_stream(frame, stream_id, msg, True)
                return

            logger.info("WeCom 文件已保存: %s", local_path)

            try:
                confirm_text = await handle_wecom_file(self._agent, from_user, str(local_path))
            except Exception as e:  # noqa: BLE001
                logger.exception("处理 WeCom 文件消息失败: %s", e)
                confirm_text = "文件已接收，但在解析或绑定上下文时出错，请稍后重试或改用 Web 控制台。"

            stream_id = generate_req_id("stream")
            await self._ws.reply_stream(frame, stream_id, confirm_text, True)

        self._ws.on("message.file", _on_file_message)

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


