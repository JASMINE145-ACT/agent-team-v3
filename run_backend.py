"""
启动 version3 单 Agent 后端。version3 独立运行，不依赖 version2。
"""
import sys
from pathlib import Path

v3_root = Path(__file__).resolve().parent
if str(v3_root) not in sys.path:
    sys.path.insert(0, str(v3_root))

if __name__ == "__main__":
    import uvicorn
    from backend.config import Config
    uvicorn.run(
        "backend.api.app:app",
        host=Config.API_HOST,
        port=Config.API_PORT,
        reload=Config.DEBUG,
    )
