"""API 层共享依赖：DataService 单例、上传文件名安全化等，供各子 router 使用。"""
from pathlib import Path

_oos_data_service = None


def get_oos_data_service():
    """单例：仅首次调用时创建 DataService，避免每次请求都尝试 Postgres。"""
    global _oos_data_service
    if _oos_data_service is None:
        from backend.tools.oos.services.data_service import DataService
        _oos_data_service = DataService()
    return _oos_data_service


def sanitize_upload_filename(name: str, max_len: int = 80) -> str:
    """只保留文件名（去掉路径成分），去掉 .. 与非法字符，防止路径穿越。"""
    if not name or not name.strip():
        return "upload"
    base = Path(name.replace("\\", "/")).name.strip()
    if not base or base in (".", ".."):
        return "upload"
    safe = "".join(c for c in base if c.isalnum() or c in "._- " or "\u4e00" <= c <= "\u9fff")
    return (safe or "upload").strip()[:max_len] or "upload"
