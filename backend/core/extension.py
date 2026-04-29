"""AgentExtension - 业务扩展接口（对标 pi-mono 的 Extension）。"""
from __future__ import annotations
from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from backend.core.registry import ToolRegistry, ToolHandler
    from backend.agent.session import SessionStore


@dataclass
class ExtensionContext:
    """受控访问句柄，Extension 通过它注册工具。"""
    registry: "ToolRegistry"
    session_store: "SessionStore"

    def register_tool(self, definition: dict, handler: ToolHandler) -> None:
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

    def on_after_tool(self, name: str, args: dict, obs: str, context: dict | None = None) -> str:
        return obs

    def on_before_tool(self, name: str, args: dict, context: dict) -> dict:
        """工具执行前调用。返回归一化后的 args（可修改参数）。"""
        return args

    def should_stop_loop(
        self, name: str, obs: str, context: dict
    ) -> tuple[bool, str | None]:
        """on_after_tool 之后调用。返回 (True, final_answer) 可提前终止 ReAct 循环。"""
        return False, None

    def on_tool_complete(
        self,
        name: str,
        args: dict,
        raw_obs: str,
        obs: str,
        context: dict,
    ) -> None:
        """工具执行完毕后的副作用钩子（写 session、memory 等）。返回值忽略。"""
        pass

    def augment_user_content(
        self,
        user_input: str,
        user_content: str,
        session: object | None,
        context: dict,
    ) -> str:
        """session 注入完成后调用。返回追加业务注入文本后的 user_content。"""
        return user_content

    def tool_result_char_limit(
        self, name: str, default_limit: int, excel_limit: int
    ) -> int:
        """按工具名选择结果截断上限（避免在 core 硬编码业务工具名）。"""
        return default_limit

    def record_tool_cycle_metrics(
        self, name: str, args: dict, obs: str, context: dict
    ) -> None:
        """每步工具后记录跨步指标（如批量利润计数）。"""
        pass

    def get_tool_cache_short_circuit_obs(
        self, name: str, args: dict, context: dict
    ) -> str | None:
        """在工具执行前命中「伪缓存」时返回合成 observation（如禁止重复解析 Excel）。"""
        return None
