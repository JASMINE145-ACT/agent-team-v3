"""ToolRegistry — 工具注册表，替代 if/elif 分发链。"""
import json
import logging
from dataclasses import dataclass
from typing import Any, Awaitable, Callable

from backend.core.validation import parse_and_validate_args

logger = logging.getLogger(__name__)

# 工具 handler: (args: dict, ctx: dict) -> Awaitable[str]
ToolHandler = Callable[..., Awaitable[str]]


@dataclass
class ToolEntry:
    definition: dict
    handler: ToolHandler


class ToolRegistry:
    def __init__(self):
        self._tools: dict[str, ToolEntry] = {}

    def register(self, definition: dict, handler: ToolHandler) -> None:
        name = definition["function"]["name"]
        self._tools[name] = ToolEntry(definition, handler)

    def get_definitions(self) -> list[dict]:
        return [e.definition for e in self._tools.values()]

    async def execute(self, name: str, args: dict[str, Any], ctx: dict) -> str:
        entry = self._tools.get(name)
        if not entry:
            return json.dumps({"error": f"未知工具: {name}"}, ensure_ascii=False)

        # 统一参数解析与 JSON Schema 校验（宽松模式）
        validated_args, error_json = parse_and_validate_args(entry.definition, args, ctx)
        if error_json is not None:
            logger.warning("工具 %s 参数校验失败: %s", name, error_json)
            return error_json

        try:
            return await entry.handler(validated_args or {}, ctx)
        except Exception as e:
            logger.exception("ToolRegistry 执行 %s 失败", name)
            return json.dumps({"error": str(e)}, ensure_ascii=False)

    def has(self, name: str) -> bool:
        return name in self._tools

    def names(self) -> list[str]:
        return list(self._tools.keys())
