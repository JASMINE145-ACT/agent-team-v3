"""
独立启动企业微信长连接 Bot 的入口脚本。

用法（本地开发）：
    cd "Agent Team version3"
    python start_wecom_bot.py

当前版本使用 DummyWeComBotClient：
- 不直接连接企业微信；
- 通过命令行 stdin 模拟 WeCom 文本消息；
- 每条输入都会转成 session_id="wecom:debug-user" 的对话，发送给 CoreAgent.execute_react。

后续接入真实企业微信长连接时，可在 backend.wecom_bot.client 中替换为官方/自实现客户端，
此脚本无需改变调用方式。
"""

from __future__ import annotations

import asyncio
import logging

from backend.config import Config
from backend.core.agent import CoreAgent
from backend.plugins.jagent.extension import JAgentExtension
from backend.wecom_bot.client import run_wecom_bot


logging.basicConfig(
    level=logging.INFO if not Config.DEBUG else logging.DEBUG,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


def create_agent() -> CoreAgent:
    Config.validate()
    agent = CoreAgent(
        api_key=Config.OPENAI_API_KEY,
        base_url=Config.OPENAI_BASE_URL,
        model=Config.LLM_MODEL,
        extensions=[JAgentExtension()],
    )
    logger.info("CoreAgent 初始化完成，模型: %s", Config.LLM_MODEL)
    return agent


async def _main() -> None:
    agent = create_agent()
    logger.info("即将启动 WeCom Bot（当前为 Dummy 模式，使用命令行模拟 WeCom 消息）。")
    await run_wecom_bot(agent)


if __name__ == "__main__":
    try:
        asyncio.run(_main())
    except KeyboardInterrupt:
        logger.info("接收到 Ctrl+C，WeCom Bot 已优雅退出。")

