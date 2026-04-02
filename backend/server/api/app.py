"""
FastAPI 主应用 — version3 单 Agent
"""
import asyncio
import logging
import warnings
from pathlib import Path

# 抑制 openpyxl 读取含 WMF 图片的 Excel 时的告警（图片会被忽略，不影响表格数据）
warnings.filterwarnings(
    "ignore",
    message=".*wmf image format is not supported.*",
    category=UserWarning,
)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from starlette.responses import FileResponse

from backend.config import Config, get_primary_react_llm_credentials
from backend.server.api.routes import router
from backend.server.api.routes_wecom import router as wecom_router
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
app.include_router(wecom_router)


@app.get("/health")
async def health_get():
    """健康检查：供浏览器与 UptimeRobot 等监控使用。"""
    return {"status": "ok"}


@app.get("/WW_verify_dEJpsEmvXuoZ2UZG.txt")
async def wecom_verify():
    """企业微信域名验证文件，指向项目根目录的同名 txt。"""
    from pathlib import Path
    _root = Path(__file__).resolve().parent.parent.parent
    return FileResponse(_root / "WW_verify_dEJpsEmvXuoZ2UZG.txt")


@app.get("/ip")
async def show_ip():
    """返回服务器出口公网 IP，用于企业微信 IP 白名单配置。"""
    import httpx
    async with httpx.AsyncClient(timeout=10) as client:
        r = await client.get("https://api.ipify.org")
        ip = r.text.strip()
    return {"ip": ip, "service": "bot.vantsing.net"}


@app.head("/health")
async def health_head():
    """健康检查（HEAD 版本）：返回 200，用于只关心存活性的探针。"""
    from fastapi import Response

    return Response(status_code=200)

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
        except OSError as e:
            logger.debug("SPA fallback 读取文件失败: %s", e, exc_info=True)
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


def _warmup_sync(agent=None) -> None:
    """
    同步预热（后台线程）：
    - 工具列表
    - 库存：Resolver（slim 表 + 向量缓存）、TableAgent
    - 业务数据：无货/缺货云端数据库连接（DataService）
    - 询价数据：映射表 Excel、万鼎价格库 Excel、业务知识缓存
    """
    try:
        if agent is not None:
            agent._registry.get_definitions()
        else:
            from backend.agent.tools import get_all_tools
            get_all_tools()
    except Exception as e:
        logger.debug("预热工具列表失败: %s", e, exc_info=True)
    try:
        from backend.tools.inventory.services.inventory_agent_tools import _get_resolver, _get_table_agent
        _get_resolver()   # 加载 slim 表 + .npy 向量（主要耗时）
        _get_table_agent()  # 初始化 ACCURATE API 客户端
    except Exception as e:
        logger.debug("预热库存组件失败: %s", e, exc_info=True)
    try:
        # 预热无货/缺货数据库连接（Postgres 不可达会回退 SQLite；只做一次，避免首次点击时卡顿）
        from backend.server.api.deps import get_oos_data_service
        get_oos_data_service()
    except Exception as e:
        logger.debug("预热无货/缺货数据库失败: %s", e, exc_info=True)
    try:
        from backend.tools.inventory.services.llm_selector import _load_business_knowledge
        _load_business_knowledge()
    except Exception as e:
        logger.debug("预热万鼎业务知识失败: %s", e, exc_info=True)
    try:
        from backend.tools.inventory.config import config as inv_config
        from backend.tools.inventory.services.mapping_table_matcher import load_mapping_df
        mapping_path = getattr(inv_config, "MAPPING_TABLE_PATH", None)
        if mapping_path:
            load_mapping_df(mapping_path)
    except Exception as e:
        logger.debug("预热历史报价映射表失败: %s", e, exc_info=True)
    try:
        from backend.tools.inventory.config import config as inv_config
        from backend.tools.inventory.services.wanding_fuzzy_matcher import (
            _get_cached_df,
            _load_field_matching_rules_from_knowledge,
        )
        _load_field_matching_rules_from_knowledge()
        price_path = getattr(inv_config, "PRICE_LIBRARY_PATH", None)
        if price_path:
            _get_cached_df(price_path, "B_QUOTE")
    except Exception as e:
        logger.debug("预热万鼎价格库失败: %s", e, exc_info=True)


async def _warmup(agent=None) -> None:
    try:
        await asyncio.to_thread(_warmup_sync, agent)
        logger.info("启动预热完成（库存/报价/无货数据库已开始加载）")
    except Exception as e:
        logger.warning("启动预热失败（不影响启动）: %s", e)


@app.on_event("startup")
async def startup_event():
    Config.validate()
    # 注册统一工具层中的后端工具（库存 / 无货登记 / 行情告警）
    try:
        from backend.tools.tool_registry import register_builtin_tools
        register_builtin_tools()
    except Exception as e:
        logger.warning("注册内建工具失败（不影响启动）: %s", e)
    from backend.core.agent import CoreAgent
    from backend.plugins.jagent.extension import JAgentExtension
    from backend.wecom_bot.client import run_wecom_bot
    _pk, _pb = get_primary_react_llm_credentials()
    agent = CoreAgent(
        api_key=_pk,
        base_url=_pb,
        model=Config.LLM_MODEL,
        extensions=[JAgentExtension()],
    )
    app.state.agent = agent
    for d in (getattr(Config, "SESSION_STORE_DIR", None), getattr(Config, "UPLOAD_DIR", None)):
        if d is not None:
            p = Path(d)
            try:
                p.mkdir(parents=True, exist_ok=True)
                logger.debug("目录就绪: %s", p)
            except Exception as e:
                logger.warning("创建目录失败 %s: %s", p, e)
    logger.info("Agent-JK v3 单 Agent 后端启动完成 — %s:%s", Config.API_HOST, Config.API_PORT)
    # 后台预热库存/报价/无货数据库
    asyncio.create_task(_warmup(agent))
    # 启动企业微信长连接 Bot（wecom-aibot-sdk 或 Dummy 模式，取决于环境配置）
    try:
        asyncio.create_task(run_wecom_bot(agent))
        logger.info("WeCom Bot 长连接协程已启动。")
    except Exception as e:
        logger.warning("启动 WeCom Bot 长连接失败（不影响 HTTP API）: %s", e)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.server.api.app:app", host=Config.API_HOST, port=Config.API_PORT, reload=Config.DEBUG)
