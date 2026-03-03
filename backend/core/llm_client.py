"""
统一创建 OpenAI 客户端；可选挂载 LangSmith 追踪（含 Work 模式与 Chat 的 token 消耗）。
启用时设置环境变量：LANGSMITH_TRACING=true、LANGSMITH_API_KEY、LANGSMITH_PROJECT（可选）。
"""
import os
import logging
from typing import Optional

from openai import OpenAI

logger = logging.getLogger(__name__)


def get_openai_client(
    api_key: Optional[str] = None,
    base_url: Optional[str] = None,
) -> OpenAI:
    """
    创建 OpenAI 客户端。若配置了 LangSmith（LANGSMITH_TRACING=true 且 LANGSMITH_API_KEY），
    则返回经 wrap_openai 包装的 client，所有 chat.completions 调用会自动上报到 LangSmith，
    便于在 LangSmith 控制台查看 token 消耗、延迟、多轮 ReAct 历程等。
    """
    client = OpenAI(api_key=api_key or os.getenv("OPENAI_API_KEY"), base_url=base_url or "")
    try:
        from backend.config import Config
        if getattr(Config, "LANGSMITH_TRACING", False) and getattr(Config, "LANGSMITH_API_KEY", None):
            from langsmith.wrappers import wrap_openai
            os.environ["LANGSMITH_TRACING"] = "true"
            if Config.LANGSMITH_API_KEY:
                os.environ["LANGSMITH_API_KEY"] = os.environ.get("LANGSMITH_API_KEY") or Config.LANGSMITH_API_KEY
            if getattr(Config, "LANGSMITH_PROJECT", None):
                os.environ["LANGSMITH_PROJECT"] = os.environ.get("LANGSMITH_PROJECT") or Config.LANGSMITH_PROJECT
            client = wrap_openai(client)
            logger.info("LangSmith 追踪已启用（OpenAI 调用将上报至 LangSmith）")
    except ImportError:
        logger.debug("未安装 langsmith，跳过 LangSmith 包装")
    except Exception as e:
        logger.debug("LangSmith 包装跳过: %s", e)
    return client
