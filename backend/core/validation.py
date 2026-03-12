"""统一工具参数解析与 JSON Schema 校验."""

from __future__ import annotations

import json
import logging
from typing import Any, Dict, Optional, Tuple, Union

try:
    import jsonschema  # type: ignore
except Exception:  # pragma: no cover - 如果未安装则在运行时优雅降级
    jsonschema = None  # type: ignore

logger = logging.getLogger(__name__)

# STRICT_REQUIRED:
# - Phase 1：False（宽松模式，仅校验类型/enum）
# - Phase 2：True（严格模式，同时校验 required）
STRICT_REQUIRED = True


def _build_validation_error(message: str, details: Optional[Dict[str, Any]] = None) -> str:
    """构造统一的参数校验错误 JSON 字符串."""
    payload: Dict[str, Any] = {
        "error": {
            "type": "validation_error",
            "message": message,
        }
    }
    if details:
        payload["error"]["details"] = details  # type: ignore[assignment]
    return json.dumps(payload, ensure_ascii=False)


def _normalize_schema(raw_schema: Any) -> Optional[Dict[str, Any]]:
    """将工具 definition 中的 parameters 规范化为可用于校验的 JSON Schema.

    - 非 dict / 为空时返回 None（跳过校验以保持兼容）
    - 自动补充缺失的 `type: object` 与 `properties` 空 dict
    - Phase 1 中若 STRICT_REQUIRED=False，会移除 required 字段，避免对旧 schema 产生破坏性影响
    """
    if not isinstance(raw_schema, dict):
        return None

    schema = dict(raw_schema)  # 浅拷贝，避免修改原 definition

    if "type" not in schema:
        schema["type"] = "object"

    if schema.get("type") != "object":
        # 目前仅支持 object 作为工具参数容器，其余类型直接跳过校验
        return None

    if "properties" not in schema or not isinstance(schema["properties"], dict):
        schema["properties"] = {}

    if not schema["properties"]:
        # 无字段可校验，直接跳过
        return None

    if not STRICT_REQUIRED and "required" in schema:
        # 宽松模式下不检查 required，避免老工具 schema 立刻报错
        schema = dict(schema)
        schema.pop("required", None)

    return schema


def parse_and_validate_args(
    definition: Dict[str, Any],
    raw_args: Union[str, Dict[str, Any]],
    context: Optional[Dict[str, Any]] = None,
) -> Tuple[Optional[Dict[str, Any]], Optional[str]]:
    """统一参数解析与 JSON Schema 校验.

    返回 (args_dict, error_json_str):
    - 成功： (args_dict, None)
    - 失败： (None, error_json_str)
    """
    del context  # 当前未使用，预留扩展

    # 1. 解析 raw_args 为 dict
    if isinstance(raw_args, str):
        raw = raw_args.strip()
        if not raw:
            args: Dict[str, Any] = {}
        else:
            try:
                args = json.loads(raw)
            except json.JSONDecodeError as e:
                msg = f"工具参数 JSON 解析失败: {e}"
                return None, _build_validation_error(
                    msg,
                    {
                        "raw": raw,
                        "error": str(e),
                    },
                )
    elif isinstance(raw_args, dict):
        args = dict(raw_args)
    else:
        msg = f"工具参数类型必须是 str 或 dict，实际为 {type(raw_args).__name__}"
        return None, _build_validation_error(msg, {"received_type": type(raw_args).__name__})

    # 2. 规范化并校验 JSON Schema
    if jsonschema is None:
        # 未安装 jsonschema 时直接跳过校验，保持向后兼容
        return args, None

    func = definition.get("function") if isinstance(definition, dict) else None
    parameters = func.get("parameters") if isinstance(func, dict) else None
    schema = _normalize_schema(parameters)
    if not schema:
        # 无可用 schema，视为无需校验
        return args, None

    try:
        jsonschema.validate(instance=args, schema=schema)  # type: ignore[arg-type]
    except jsonschema.ValidationError as e:  # type: ignore[union-attr]
        field = ".".join(str(p) for p in e.path) if getattr(e, "path", None) else None
        details: Dict[str, Any] = {
            "schema": schema,
            "message": str(e.message),
        }
        if field:
            details["field"] = field
        return None, _build_validation_error("工具参数校验失败", details)
    except jsonschema.SchemaError as e:  # type: ignore[union-attr]
        # schema 本身不合法时，为避免影响运行，记录日志并跳过校验
        logger.warning("工具参数 schema 不合法，已跳过校验: %s", e, exc_info=True)
        return args, None

    return args, None

