"""
统一工具层：BaseTool 抽象与 ToolResult 结构。
所有封装 HTTP/SQL/外部 API 的工具均实现 BaseTool，内部负责超时、重试与业务错误转换。
"""
from __future__ import annotations

import json
import time
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Any, Optional


@dataclass
class ToolResult:
    """标准化工具返回：供 agent 与 registry 统一处理、日志与 metrics 使用。"""
    ok: bool
    data: Any = None
    error: Optional[str] = None
    error_code: Optional[str] = None
    latency_ms: int = 0

    def to_llm_string(self) -> str:
        """转为当前 LLM 工具链期望的 JSON 字符串（success + result / error）。"""
        if self.ok:
            payload = {"success": True, "result": self.data}
        else:
            payload = {"success": False, "result": self.error or "未知错误"}
            if self.error_code:
                payload["error_code"] = self.error_code
        return json.dumps(payload, ensure_ascii=False)


class BaseTool(ABC):
    """统一工具抽象：name + async run(**kwargs) -> ToolResult。"""

    name: str = ""

    @abstractmethod
    async def run(self, **kwargs: Any) -> ToolResult:
        """执行工具逻辑；内部负责超时、重试，业务错误通过 ToolResult(ok=False) 返回。"""
        ...
