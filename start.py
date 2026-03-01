"""
一键启动 Jagent 前后端：在新窗口启动后端（API + 静态 UI），并自动打开浏览器。
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

def main():
    root = Path(__file__).resolve().parent
    os.chdir(root)
    if str(root) not in sys.path:
        sys.path.insert(0, str(root))

    from backend.config import Config
    port = Config.API_PORT
    url = f"http://127.0.0.1:{port}/"

    # 云端（Render/Heroku 等）会注入 PORT；此时保留 DATABASE_URL，否则每次部署无货数据会丢
    on_cloud = "PORT" in os.environ

    if sys.platform == "win32":
        # 新开一个 cmd 窗口跑后端
        if on_cloud:
            cmd_str = f'start "Jagent Backend" cmd /k "cd /d \"{root}\" && python run_backend.py"'
        else:
            cmd_str = f'start "Jagent Backend" cmd /k "cd /d \"{root}\" && set DATABASE_URL= && python run_backend.py"'
        subprocess.Popen(cmd_str, cwd=root, shell=True)
    else:
        if on_cloud:
            env = os.environ.copy()  # 云端：保留 DATABASE_URL
        else:
            env = {k: v for k, v in os.environ.items() if k != "DATABASE_URL"}
        subprocess.Popen(
            [sys.executable, "run_backend.py"],
            cwd=root,
            env=env,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            start_new_session=True,
        )

    print("后端启动中，稍候打开浏览器…")
    time.sleep(2.5)
    webbrowser.open(url)
    print(f"已打开: {url} （后端在另一窗口运行，关闭该窗口即停止）")

if __name__ == "__main__":
    main()
