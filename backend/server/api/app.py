"""
FastAPI 主应用 — version3 单 Agent
"""
import asyncio
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
    _UI_MISSING_HTML = """
<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>请先构建前端</title></head>
<body style="font-family:sans-serif;max-width:560px;margin:2em auto;padding:1em;">
  <h2>前端未构建</h2>
  <p>当前未检测到 <code>dist/control-ui</code> 目录，请先构建前端后再访问页面。</p>
  <p>在项目根目录执行：</p>
  <pre style="background:#f5f5f5;padding:1em;border-radius:6px;">cd control-ui
npm install
npm run build
cd ..</pre>
  <p>然后刷新本页或重新打开 <a href="/">/</a> 。</p>
  <p>详见项目根目录 <code>README.md</code>。</p>
</body></html>
"""

    @app.get("/")
    def _fallback_index():
        from starlette.responses import HTMLResponse
        return HTMLResponse(_UI_MISSING_HTML)

    logger.warning("UI 目录不存在，未挂载静态: %s — 根路径返回构建说明页", _ui_dir)


def _warmup_sync() -> None:
    """同步预热：加载工具列表、Resolver（slim 表 + 向量缓存）、TableAgent。在后台线程中执行。"""
    try:
        from backend.agent.tools import get_all_tools
        get_all_tools()
    except Exception as e:
        logger.debug("预热工具列表失败: %s", e)
    try:
        from backend.tools.inventory.services.inventory_agent_tools import _get_resolver, _get_table_agent
        _get_resolver()   # 加载 slim 表 + .npy 向量（主要耗时）
        _get_table_agent()  # 初始化 ACCURATE API 客户端
    except Exception as e:
        logger.debug("预热库存组件失败: %s", e)


async def _warmup() -> None:
    try:
        await asyncio.to_thread(_warmup_sync)
        logger.info("库存组件预热完成（Resolver + TableAgent 已就绪）")
    except Exception as e:
        logger.warning("库存组件预热失败（不影响启动）: %s", e)


@app.on_event("startup")
async def startup_event():
    Config.validate()
    # 保证会话与上传目录存在，避免新部署报「缺少 session」或上传失败
    for d in (getattr(Config, "SESSION_STORE_DIR", None), getattr(Config, "UPLOAD_DIR", None)):
        if d is not None:
            p = Path(d)
            try:
                p.mkdir(parents=True, exist_ok=True)
                logger.debug("目录就绪: %s", p)
            except Exception as e:
                logger.warning("创建目录失败 %s: %s", p, e)
    logger.info("Agent-JK v3 单 Agent 后端启动完成 — %s:%s", Config.API_HOST, Config.API_PORT)
    asyncio.create_task(_warmup())  # 后台预热，不阻塞启动响应


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.server.api.app:app", host=Config.API_HOST, port=Config.API_PORT, reload=Config.DEBUG)
