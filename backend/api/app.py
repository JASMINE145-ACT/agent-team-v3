"""
FastAPI 主应用 — version3 单 Agent
"""
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.config import Config
from backend.api.routes import router

logging.basicConfig(
    level=logging.INFO if not Config.DEBUG else logging.DEBUG,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

app = FastAPI(title="Agent-JK v3 (Single Agent)", description="单主 Agent 掌握全部技能", version="0.3.0", debug=Config.DEBUG)
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
app.include_router(router)


@app.on_event("startup")
async def startup_event():
    Config.validate()
    logger.info("Agent-JK v3 单 Agent 后端启动完成 — %s:%s", Config.API_HOST, Config.API_PORT)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.api.app:app", host=Config.API_HOST, port=Config.API_PORT, reload=Config.DEBUG)
