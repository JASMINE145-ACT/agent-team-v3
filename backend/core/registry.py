"""ToolRegistry — 工具注册表，替代 if/elif 分发链。"""
import json
import logging
from dataclasses import dataclass
from typing import Any, Callable

logger = logging.getLogger(__name__)


@dataclass
class ToolEntry:
    definition: dict
    handler: Callable


class ToolRegistry:
    def __init__(self):
        self._tools: dict[str, ToolEntry] = {}

    def register(self, definition: dict, handler: Callable) -> None:
        name = definition["function"]["name"]
        self._tools[name] = ToolEntry(definition, handler)

    def get_definitions(self) -> list[dict]:
        return [e.definition for e in self._tools.values()]

    async def execute(self, name: str, args: dict[str, Any], ctx: dict) -> str:
        entry = self._tools.get(name)
        if not entry:
            return json.dumps({"error": f"未知工具: {name}"}, ensure_ascii=False)
        try:
            return await entry.handler(args, ctx)
        except Exception as e:
            logger.exception("ToolRegistry 执行 %s 失败", name)
            return json.dumps({"error": str(e)}, ensure_ascii=False)

    def has(self, name: str) -> bool:
        return name in self._tools

    def names(self) -> list[str]:
        return list(self._tools.keys())
