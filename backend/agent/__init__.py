"""
单 Agent：主 Agent 掌握所有技能，无子 Agent 委托。

为避免 `CoreAgent` 在导入时出现循环依赖，这里对 SingleAgent 采用「延迟导入」：
- type-checker 下正常看到 class 定义；
- 运行时通过可调用别名按需导入 `backend.agent.agent.SingleAgent`。
"""

from __future__ import annotations

from typing import TYPE_CHECKING, Any

from backend.agent.tools import get_all_tools
from backend.agent.session import SessionStore, get_session_store

if TYPE_CHECKING:  # 仅供类型检查/IDE 使用，避免运行时导入循环
    from backend.agent.agent import SingleAgent as SingleAgent  # noqa: F401
else:

    class _SingleAgentAlias:
        """运行时的 SingleAgent 延迟导入包装器。"""

        def __call__(self, *args: Any, **kwargs: Any):
            from backend.agent.agent import SingleAgent as _SingleAgent

            return _SingleAgent(*args, **kwargs)

    SingleAgent = _SingleAgentAlias()


__all__ = ["SingleAgent", "get_all_tools", "SessionStore", "get_session_store"]

