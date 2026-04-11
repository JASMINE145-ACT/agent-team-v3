"""
内存缓存：从 Neon 加载全量行供 Matcher 使用。
None = 未加载；[] = 已加载但表为空（仍走本地 xlsx fallback）。
"""

from __future__ import annotations

import logging
import threading
from typing import Optional

from backend.tools.admin import repository

logger = logging.getLogger(__name__)

_price_rows: Optional[list[dict]] = None
_mapping_rows: Optional[list[dict]] = None
_price_lock = threading.Lock()
_mapping_lock = threading.Lock()


def get_price_library_rows() -> list[dict]:
    global _price_rows
    if _price_rows is not None:
        return _price_rows
    with _price_lock:
        if _price_rows is None:
            _price_rows = repository.fetch_all_price_library()
            logger.info("admin cache: loaded %d price_library rows from DB", len(_price_rows))
    return _price_rows


def get_product_mapping_rows() -> list[dict]:
    global _mapping_rows
    if _mapping_rows is not None:
        return _mapping_rows
    with _mapping_lock:
        if _mapping_rows is None:
            _mapping_rows = repository.fetch_all_product_mapping()
            logger.info("admin cache: loaded %d product_mapping rows from DB", len(_mapping_rows))
    return _mapping_rows


def invalidate_price_library() -> None:
    global _price_rows
    with _price_lock:
        _price_rows = None
    try:
        from backend.tools.inventory.services.wanding_fuzzy_matcher import invalidate_wanding_cache

        invalidate_wanding_cache()
    except Exception as e:
        logger.warning("invalidate wanding cache 失败: %s", e)
    logger.info("admin cache: price_library invalidated")


def invalidate_product_mapping() -> None:
    global _mapping_rows
    with _mapping_lock:
        _mapping_rows = None
    try:
        from backend.tools.inventory.services.mapping_table_matcher import invalidate_mapping_cache

        invalidate_mapping_cache()
    except Exception as e:
        logger.warning("invalidate mapping cache 失败: %s", e)
    logger.info("admin cache: product_mapping invalidated")
