"""
启动 version3 单 Agent 后端。version3 独立运行，不依赖 version2。
"""
import sys
from pathlib import Path

v3_root = Path(__file__).resolve().parent
if str(v3_root) not in sys.path:
    sys.path.insert(0, str(v3_root))


def _pause_on_error():
    """错误时保持窗口打开，便于查看报错（尤其通过 start.py 新开控制台时）。"""
    if sys.platform == "win32":
        try:
            input("\n按回车键关闭此窗口…")
        except (EOFError, KeyboardInterrupt):
            pass


if __name__ == "__main__":
    try:
        import uvicorn
        from backend.config import Config
        uvicorn.run(
            "backend.server.api.app:app",
            host=Config.API_HOST,
            port=Config.API_PORT,
            reload=Config.DEBUG,
        )
    except Exception as e:
        import traceback
        print("后端启动失败:", e, file=sys.stderr)
        traceback.print_exc()
        _pause_on_error()
        sys.exit(1)
