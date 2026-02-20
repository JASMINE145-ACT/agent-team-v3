"""
LLM 配置模块

为 Plan Agent 等配置 LLM 实例。来源：data_platform/src/agents/llm_config.py
路径已适配 Agent Team version2 结构。
"""

import os
import logging
from typing import Optional, Dict, Any
from pathlib import Path
from dotenv import load_dotenv

try:
    from langchain_openai import ChatOpenAI
    from langchain_anthropic import ChatAnthropic
except ImportError:
    ChatOpenAI = None
    ChatAnthropic = None

# 适配 Agent Team version2：src/agents -> src -> 项目根
_current_file = Path(__file__).resolve()
_project_root = _current_file.parent.parent.parent  # src/agents -> src -> Agent Team version2

load_dotenv(_project_root / ".env")
load_dotenv(_project_root / "quotation_tracker" / ".env")

# 自动禁用 LangSmith
if not os.getenv("LANGCHAIN_TRACING_V2"):
    os.environ["LANGCHAIN_TRACING_V2"] = "false"
if not os.getenv("LANGSMITH_TRACING"):
    os.environ["LANGSMITH_TRACING"] = "false"

logger = logging.getLogger(__name__)


def create_llm(
    agent_name: str,
    model_name: Optional[str] = None,
    temperature: float = 0.0
):
    provider = os.getenv(f"{agent_name.upper()}_LLM_PROVIDER") or os.getenv("LLM_PROVIDER", "zhipu")
    default_model = "glm-4.7" if provider.lower() == "zhipu" else "gpt-4o-mini"
    model_name = model_name or os.getenv(f"{agent_name.upper()}_MODEL") or os.getenv("LLM_MODEL", default_model)

    logger.info(f"为 {agent_name} 创建 LLM: {provider}/{model_name}")

    if provider.lower() == "zhipu":
        if ChatOpenAI is None:
            raise ImportError("请安装 langchain-openai: pip install langchain-openai")
        api_key = os.getenv("ZHIPU_API_KEY")
        if not api_key:
            raise ValueError("未找到 ZHIPU_API_KEY 环境变量，请从智谱开放平台获取: https://open.bigmodel.cn")
        return ChatOpenAI(
            model=model_name,
            temperature=temperature,
            api_key=api_key,
            base_url="https://open.bigmodel.cn/api/paas/v4/",
        )

    if provider.lower() == "openai":
        if ChatOpenAI is None:
            raise ImportError("请安装 langchain-openai: pip install langchain-openai")
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("未找到 OPENAI_API_KEY 环境变量")
        return ChatOpenAI(
            model=model_name,
            temperature=temperature,
            api_key=api_key
        )

    if provider.lower() == "anthropic":
        if ChatAnthropic is None:
            raise ImportError("请安装 langchain-anthropic: pip install langchain-anthropic")
        api_key = os.getenv("ANTHROPIC_API_KEY")
        if not api_key:
            raise ValueError("未找到 ANTHROPIC_API_KEY 环境变量")
        return ChatAnthropic(
            model=model_name,
            temperature=temperature,
            api_key=api_key
        )

    raise ValueError(f"不支持的 LLM Provider: {provider}，支持: zhipu, openai, anthropic")


class LLMFactory:
    _instances: Dict[str, Any] = {}

    @classmethod
    def get_llm(cls, agent_name: str, temperature: float = 0.0):
        if agent_name in cls._instances:
            return cls._instances[agent_name]
        logger.info(f"创建新的 LLM 实例: {agent_name}")
        llm_instance = create_llm(agent_name, temperature=temperature)
        cls._instances[agent_name] = llm_instance
        return llm_instance

    @classmethod
    def reset(cls):
        cls._instances.clear()
        logger.info("已重置所有 LLM 实例")
