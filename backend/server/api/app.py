"""
FastAPI 主应用 — version3 单 Agent
"""
import logging
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from starlette.responses import FileResponse

from backend.config import Config
from backend.server.api.routes import router
from backend.server.gateway.gateway import router as ws_router

logging.basicConfig(
    level=logging.INFO if not Config.DEBUG else logging.DEBUG,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

app = FastAPI(title="Agent-JK v3 (Single Agent)", description="单主 Agent 掌握全部技能", version="0.3.0", debug=Config.DEBUG)
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
app.include_router(router)
app.include_router(ws_router)

# 项目根目录 = backend/server/api -> backend/server -> backend -> 根
_root = Path(__file__).resolve().parent.parent.parent.parent
_ui_dir = _root / "dist" / "control-ui"

if _ui_dir.is_dir():
    @app.get("/")
    def _serve_index():
        r = FileResponse(_ui_dir / "index.html")
        r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
        return r

    app.mount("/assets", StaticFiles(directory=str(_ui_dir / "assets")), name="ui-assets")

    @app.get("/{path:path}")
    def _spa_fallback(path: str):
        """SPA 回退：无对应静态文件时返回 index.html，支持 /chat?session=xxx、/sessions 等前端路由直接访问或刷新。"""
        if path.startswith("api/") or path.startswith("ws"):
            from fastapi import HTTPException
            raise HTTPException(status_code=404, detail="Not Found")
        safe_path = (_ui_dir / path).resolve()
        try:
            if safe_path.is_file() and str(safe_path).startswith(str(_ui_dir.resolve())):
                return FileResponse(safe_path)
        except OSError:
            pass
        r = FileResponse(_ui_dir / "index.html")
        r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
        return r

    logger.info("UI 已挂载: %s", _ui_dir)
else:
    logger.warning("UI 目录不存在，未挂载静态: %s", _ui_dir)


@app.on_event("startup")
async def startup_event():
    Config.validate()
    logger.info("Agent-JK v3 单 Agent 后端启动完成 — %s:%s", Config.API_HOST, Config.API_PORT)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.server.api.app:app", host=Config.API_HOST, port=Config.API_PORT, reload=Config.DEBUG)
