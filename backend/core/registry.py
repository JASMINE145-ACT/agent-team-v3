"""ToolRegistry — 工具注册表，替代 if/elif 分发链。"""
import json
import logging
import time
from dataclasses import dataclass
from typing import Any, Awaitable, Callable, Dict, Optional

from backend.core.tool_utils import tool_error
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

    def get_p0_definitions(self) -> list[dict]:
        """返回非 deferred 工具的完整 schema（P0 常驻组）。"""
        return [
            e.definition for e in self._tools.values()
            if not e.definition["function"].get("x_tool_meta", {}).get("deferred")
        ]

    def get_deferred_stubs(self) -> list[dict]:
        """返回 deferred 工具的精简 stub（只含名字+一行描述，parameters 为空）。"""
        stubs = []
        for e in self._tools.values():
            d = e.definition
            if d["function"].get("x_tool_meta", {}).get("deferred"):
                stubs.append({
                    "type": "function",
                    "function": {
                        "name": d["function"]["name"],
                        "description": (
                            f"【延迟加载】{d['function']['description'][:60]}… "
                            "需要时调用 tool_search 展开。"
                        ),
                        "parameters": {"type": "object", "properties": {}, "required": []},
                    },
                })
        return stubs

    def get_all_deferred_definitions(self) -> list[dict]:
        """返回所有 deferred 工具的完整 schema（供 tool_search 处理器使用）。"""
        return [
            e.definition for e in self._tools.values()
            if e.definition["function"].get("x_tool_meta", {}).get("deferred")
        ]

    async def execute(self, name: str, args: dict[str, Any], ctx: dict) -> str:
        start = time.perf_counter()
        success = True
        error_type: Optional[str] = None
        result: str

        entry = self._tools.get(name)
        if not entry:
            success = False
            error_type = "not_found"
            result = tool_error(f"未知工具: {name}", error_type=error_type)
        else:
            # 统一参数解析与 JSON Schema 校验
            validated_args, error_json = parse_and_validate_args(entry.definition, args, ctx)
            if error_json is not None:
                logger.warning("工具 %s 参数校验失败: %s", name, error_json)
                success = False
                result = error_json
            else:
                try:
                    result = await entry.handler(validated_args or {}, ctx)
                except Exception as e:
                    logger.exception("ToolRegistry 执行 %s 失败", name)
                    success = False
                    error_type = "internal_error"
                    result = tool_error(str(e), error_type=error_type)

        # 从结果中尽量提取 error.type，覆盖上面的默认推断
        try:
            parsed = json.loads(result)
            if isinstance(parsed, dict):
                err = parsed.get("error")
                if isinstance(err, dict):
                    et = err.get("type")
                    if isinstance(et, str) and et:
                        error_type = et
        except json.JSONDecodeError:
            # 文本结果或非 JSON，不影响正常返回
            pass

        if error_type:
            success = False

        latency_ms = int((time.perf_counter() - start) * 1000)

        # 附带工具元信息（读/写 & 风险级别），仅用于日志与观测
        tool_meta: Dict[str, Any] = {}
        fn_def = entry.definition.get("function") if entry else None  # type: ignore[union-attr]
        if isinstance(fn_def, dict):
            meta = fn_def.get("x_tool_meta") or {}
            if isinstance(meta, dict):
                access_mode = meta.get("access_mode")
                risk_level = meta.get("risk_level")
                if access_mode:
                    tool_meta["access_mode"] = access_mode
                if risk_level:
                    tool_meta["risk_level"] = risk_level

        log_payload: Dict[str, Any] = {
            "tool": name,
            "success": success,
            "latency_ms": latency_ms,
            "error_type": error_type,
            "ts": int(time.time() * 1000),
        }
        if tool_meta:
            log_payload["meta"] = tool_meta

        try:
            logger.info("tool_call %s", json.dumps(log_payload, ensure_ascii=False))
        except Exception:
            logger.debug("tool_call 日志输出失败", exc_info=True)

        return result

    def has(self, name: str) -> bool:
        return name in self._tools

    def names(self) -> list[str]:
        return list(self._tools.keys())
