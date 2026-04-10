"""
API 路由 — version3 单 Agent（按领域拆分为子 router，此处聚合挂载）
"""
from fastapi import APIRouter

from backend.server.api.routes_health import router as router_health
from backend.server.api.routes_upload import router as router_upload
from backend.server.api.routes_chat import router as router_chat
from backend.server.api.routes_oos import router as router_oos
from backend.server.api.routes_procurement import router as router_procurement
from backend.server.api.routes_quotation import router as router_quotation
from backend.server.api.routes_work import router as router_work
from backend.server.api.routes_activity import router as router_activity
from backend.server.api.routes_tools import router as router_tools
from backend.server.api.routes_notify import router as router_notify
from backend.server.api.routes_reports import router as router_reports

router = APIRouter()
router.include_router(router_health, tags=["health"])
router.include_router(router_upload, tags=["upload"])
router.include_router(router_chat, tags=["chat"])
router.include_router(router_oos, tags=["oos"])
router.include_router(router_procurement, tags=["procurement"])
router.include_router(router_quotation, tags=["quotation"])
router.include_router(router_work, tags=["work"])
router.include_router(router_activity, tags=["activity"])
router.include_router(router_tools, tags=["tools"])
router.include_router(router_notify, tags=["notify"])
router.include_router(router_reports, tags=["reports"])
