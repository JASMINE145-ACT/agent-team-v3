"""
库存 Agent 预热与校验：确保 item-list-slim.xlsx、向量缓存 .npy 存在且行数一致，
并预加载 Resolver、TableAgent，避免首次查询超时。
"""
from __future__ import annotations

import logging
from pathlib import Path
from typing import Optional, Tuple

from backend.tools.inventory.config import config

logger = logging.getLogger(__name__)

CACHE_VECTORS_SUFFIX = "_embeddings.npy"


def verify_slim_and_embeddings() -> Tuple[bool, str]:
    """
    校验 item-list-slim.xlsx 与 .npy 向量文件是否存在且行数一致。
    若启用向量但 .npy 不存在，返回失败；若未启用向量，仅校验表存在即可。
    返回 (是否通过, 说明信息)
    """
    path_str = (config.ITEM_LIST_SLIM_PATH or "").strip()
    if not path_str:
        return False, "未配置 INVENTORY_ITEM_LIST_SLIM_PATH"

    table_path = Path(path_str).resolve()
    if not table_path.is_file():
        return False, f"本地表不存在: {table_path}"

    if config.ENABLE_RESOLVER_VECTOR:
        vec_path = table_path.parent / (table_path.stem + CACHE_VECTORS_SUFFIX)
        if not vec_path.is_file():
            return False, f"向量文件不存在: {vec_path}\n请先用 CLI 跑一次查询生成向量缓存，或设置 INVENTORY_ENABLE_RESOLVER_VECTOR=0 禁用向量。"

        try:
            import pandas as pd
            import numpy as np

            df = pd.read_excel(table_path, sheet_name=0)
            n_rows = len(df)

            arr = np.load(vec_path)
            n_vec = arr.shape[0] if hasattr(arr, "shape") else len(arr)

            if n_rows != n_vec:
                return False, f"行数不一致: 表 {n_rows} 行，向量 {n_vec} 行。请重新生成向量缓存。"
        except Exception as e:
            return False, f"校验失败: {e}"

        return True, f"已就绪: {table_path.name} ({n_rows} 行), 向量 {vec_path.name}"
    else:
        try:
            import pandas as pd
            df = pd.read_excel(table_path, sheet_name=0)
            n_rows = len(df)
        except Exception as e:
            return False, f"读取表失败: {e}"
        return True, f"已就绪: {table_path.name} ({n_rows} 行), 向量已禁用"


def warmup() -> Tuple[bool, str]:
    """
    校验 + 预加载 Resolver、TableAgent。
    返回 (是否成功, 说明信息)
    """
    ok, msg = verify_slim_and_embeddings()
    if not ok:
        return False, msg

    try:
        from backend.tools.inventory.services.inventory_agent_tools import _get_table_agent, _get_resolver

        _get_table_agent()
        resolver = _get_resolver()
        if resolver is None:
            return False, "Resolver 初始化失败（可能依赖 data_platform/src）"
        if not resolver.is_available():
            return False, "Resolver 表未加载"
        if config.ENABLE_RESOLVER_VECTOR and not getattr(resolver, "_vector_ready", False):
            return False, "向量未加载（.npy 校验通过但 Resolver 内未就绪，请检查表结构或重启）"
    except Exception as e:
        logger.exception("warmup 失败")
        return False, f"预热失败: {e}"

    return True, msg + "，Resolver 与 TableAgent 已预加载"
