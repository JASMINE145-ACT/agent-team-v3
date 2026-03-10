"""通用工具校验辅助，从 backend/agent/tools.py 提取。"""
import json
from pathlib import Path


def tool_error(msg: str) -> str:
    """返回标准错误 observation，模型可读并自行纠错。"""
    return json.dumps({"success": False, "error": msg}, ensure_ascii=False)


def validate_file_path(path: str, tool_name: str) -> str | None:
    """文件不存在返回错误字符串，否则返回 None。"""
    if not path:
        return tool_error(f"[{tool_name}] 缺少 file_path，请先上传文件或在 context 中提供")
    if not Path(path).exists():
        return tool_error(f"[{tool_name}] 文件不存在: {path}，请确认路径是否正确")
    return None


def unwrap_tool_result(out: dict) -> str:
    """将工具函数的 {'success': bool, 'result': str} 拆包为字符串。
    成功时返回 result 字段；失败时返回 JSON 字符串（供 LLM 理解错误）。
    """
    if out.get("success"):
        return out.get("result", "")
    return json.dumps(out, ensure_ascii=False)
