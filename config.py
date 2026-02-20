"""
Re-export quotation_tracker 配置，使从 Agent Team version3 根目录运行（如 cli_agent.py）时
quotation_tracker 内部的 `from config import ...` 能正确解析。
"""
from quotation_tracker.config import *  # noqa: F401, F403
