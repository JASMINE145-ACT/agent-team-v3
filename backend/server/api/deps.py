"""API 层共享依赖：DataService 单例、上传文件名安全化等，供各子 router 使用。"""
import threading
from pathlib import Path
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from backend.tools.oos.services.data_service import DataService

_oos_data_service: "DataService | None" = None
_oos_data_service_lock = threading.Lock()


def get_oos_data_service() -> "DataService":
    """单例：仅首次调用时创建 DataService，避免每次请求都尝试 Postgres。多 worker 安全。"""
    global _oos_data_service
    if _oos_data_service is None:
        with _oos_data_service_lock:
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


def reset_for_testing() -> None:
    """仅测试使用：重置所有单例，使下次调用重新初始化。"""
    global _oos_data_service
    with _oos_data_service_lock:
        _oos_data_service = None
