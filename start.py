"""
一键启动 PT Vansting Agent 前后端：在新窗口启动后端（API + 静态 UI），并自动打开浏览器。
双击运行或命令行：python start.py

本地开发：会清空 DATABASE_URL，强制用 SQLite（避免依赖 psycopg2）。
云端（Render 等）：若平台已设置 PORT，则保留 DATABASE_URL，保证无货/缺货数据连 Neon 不丢。
生产推荐仍用：uvicorn backend.server.api.app:app --host 0.0.0.0 --port $PORT 或 python run_backend.py。
"""
import os
import subprocess
import sys
import time
import webbrowser
from pathlib import Path

# region agent log
import json as _agent_json


def _agent_debug_log(run_id, hypothesis_id, location, message, data):
    try:
        log_path = Path(__file__).resolve().parents[1] / "debug-9e751f.log"
        payload = {
            "sessionId": "9e751f",
            "runId": run_id,
            "hypothesisId": hypothesis_id,
            "location": location,
            "message": message,
            "data": data,
            "timestamp": int(time.time() * 1000),
        }
        with open(log_path, "a", encoding="utf-8") as f:
            f.write(_agent_json.dumps(payload, ensure_ascii=False) + "\n")
    except Exception:
        # 调试日志失败时静默忽略
        pass


# endregion

def main():
    root = Path(__file__).resolve().parent
    os.chdir(root)
    if str(root) not in sys.path:
        sys.path.insert(0, str(root))

    run_id = "initial"

    from backend.config import Config
    port = Config.API_PORT
    url = f"http://127.0.0.1:{port}/"

    # 云端（Render/Heroku 等）会注入 PORT；此时保留 DATABASE_URL，否则每次部署无货数据会丢
    on_cloud = "PORT" in os.environ

    # 统一用 Python 直接起后端，避免 Windows 下 cmd 引号问题
    if on_cloud:
        env = os.environ.copy()  # 云端：保留 DATABASE_URL
    else:
        # 本地开发：清掉 DATABASE_URL，强制用 SQLite
        env = {k: v for k, v in os.environ.items() if k != "DATABASE_URL"}

    # region agent log
    _agent_debug_log(
        run_id,
        "H1",
        "start.py:main:env",
        "start main env resolved",
        {
            "root": str(root),
            "on_cloud": on_cloud,
            "platform": sys.platform,
            "port": port,
            "has_database_url": "DATABASE_URL" in env,
        },
    )
    # endregion

    cmd = [sys.executable, "run_backend.py"]

    # region agent log
    _agent_debug_log(
        run_id,
        "H2",
        "start.py:main:before_popen",
        "starting backend subprocess",
        {
            "platform": sys.platform,
            "cmd": cmd,
            "cwd": str(root),
        },
    )
    # endregion

    if sys.platform == "win32":
        # Windows 下在新控制台窗口中启动后端
        creationflags = getattr(subprocess, "CREATE_NEW_CONSOLE", 0x00000010)
        subprocess.Popen(
            cmd,
            cwd=root,
            env=env,
            creationflags=creationflags,
        )
    else:
        # 非 Windows：后台运行即可
        subprocess.Popen(
            cmd,
            cwd=root,
            env=env,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            start_new_session=True,
        )

    print("后端启动中，稍候打开浏览器…")
    time.sleep(2.5)

    # region agent log
    _agent_debug_log(
        run_id,
        "H3",
        "start.py:main:before_open_browser",
        "opening browser",
        {
            "url": url,
        },
    )
    # endregion

    webbrowser.open(url)
    print(f"已打开: {url} （后端在另一窗口运行，关闭该窗口即停止）")

if __name__ == "__main__":
    main()
