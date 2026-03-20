"""
无货（OOS）工具执行函数（agent 层兼容壳）。

实现已迁移至 `backend.tools.oos.services.oos_agent_adapter`，此模块仅作向后兼容的转发。
"""
from backend.tools.oos.services.oos_agent_adapter import (  # noqa: F401
    _run_oos_by_file,
    _run_oos_by_time,
    _run_oos_list,
    _run_oos_stats,
    _run_register_oos,
)

__all__ = [
    "_run_oos_list",
    "_run_oos_stats",
    "_run_oos_by_file",
    "_run_oos_by_time",
    "_run_register_oos",
]
