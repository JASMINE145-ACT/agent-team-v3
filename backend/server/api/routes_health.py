"""健康检查与全局配置类 API。"""
import logging
from typing import Any, Dict

from fastapi import APIRouter

from backend.config import Config
from backend.server.api.deps import get_oos_data_service
from backend.tools.inventory.services.wanding_fuzzy_matcher import (
    PRICE_COLS,
    PRICE_LEVEL_DISPLAY_NAMES,
)

logger = logging.getLogger(__name__)
router = APIRouter()


@router.get("/health")
async def health_check() -> Dict[str, Any]:
    out = {
        "status": "ok",
        "service": "agent-jk-backend-v3",
        "mode": "single_agent",
        "llm_model": getattr(Config, "LLM_MODEL", None),
    }
    try:
        ds = get_oos_data_service()
        out["oos_db"] = "postgres" if getattr(ds, "using_postgres", False) else "sqlite"
        out["oos_using_postgres"] = getattr(ds, "using_postgres", False)
    except Exception as e:
        logger.warning("health: oos DataService 未就绪: %s", e, exc_info=True)
        out["oos_db"] = None
        out["oos_using_postgres"] = False
    return {"success": True, "data": out}


@router.get("/api/config/price-levels")
async def get_price_levels() -> Dict[str, Any]:
    """返回价格档位列表（value + 全名 label），供 Work/Chat 下拉与展示用。"""
    try:
        order = [
            "FACTORY_INC_TAX", "FACTORY_EXC_TAX", "PURCHASE_EXC_TAX",
            "A_MARGIN", "A_QUOTE", "B_MARGIN", "B_QUOTE",
            "C_MARGIN", "C_QUOTE", "D_MARGIN", "D_QUOTE", "D_LOW",
            "E_MARGIN", "E_QUOTE",
        ]
        options = [
            {"value": k, "label": PRICE_LEVEL_DISPLAY_NAMES.get(k, k)}
            for k in order
            if k in PRICE_COLS
        ]
        return {"success": True, "data": options}
    except Exception as e:
        logger.warning("price-levels 加载失败: %s", e, exc_info=True)
        return {"success": False, "error": str(e)}
