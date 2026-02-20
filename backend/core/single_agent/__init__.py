# 单 Agent：主 Agent 掌握所有技能，无子 Agent 委托
from backend.core.single_agent.agent import SingleAgent
from backend.core.single_agent.tools import get_all_tools, execute_tool

__all__ = ["SingleAgent", "get_all_tools", "execute_tool"]
