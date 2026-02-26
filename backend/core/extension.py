"""AgentExtension - 业务扩展接口（对标 pi-mono 的 Extension）。"""
from __future__ import annotations
from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import TYPE_CHECKING, Callable

if TYPE_CHECKING:
    from backend.core.registry import ToolRegistry
    from backend.agent.session import SessionStore


@dataclass
class ExtensionContext:
    """受控访问句柄，Extension 通过它注册工具。"""
    registry: "ToolRegistry"
    session_store: "SessionStore"

    def register_tool(self, definition: dict, handler: Callable) -> None:
        self.registry.register(definition, handler)


class AgentExtension(ABC):
    """业务扩展基类。子类实现 register()，可选覆盖钩子方法。"""

    @abstractmethod
    def register(self, ctx: ExtensionContext) -> None:
        """服务启动时调用：向 registry 注册工具。"""

    def get_skill_prompt(self) -> str:
        return ""

    def get_output_format_prompt(self) -> str:
        return ""

    def on_before_prompt(self, user_input: str, context: dict) -> str:
        return user_input

    def on_after_tool(self, name: str, args: dict, obs: str) -> str:
        return obs
