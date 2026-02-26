"""
Vercel 入口：导出 FastAPI app，供 Vercel Serverless 使用。
部署时 Vercel 会在此目录查找 app 实例（index.py / app.py / server.py 等）。
"""
from backend.server.api.app import app

__all__ = ["app"]
