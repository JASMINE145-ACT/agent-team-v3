from __future__ import annotations

import asyncio

from backend.tools.base import BaseTool, ToolResult
from backend.tools.tool_registry import ToolRegistry


class _EchoTool(BaseTool):
    name = "echo"

    async def run(self, *, value: str = "") -> ToolResult:
        return ToolResult(ok=True, data=value)


async def _run_call() -> ToolResult:
    reg = ToolRegistry()
    reg.register(_EchoTool())
    return await reg.call("echo", value="ok")


def test_tool_registry_call_and_metrics():
    result = asyncio.run(_run_call())
    assert result.ok
    assert result.data == "ok"

