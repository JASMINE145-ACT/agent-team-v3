"""
一键启动 Jagent 前后端：在新窗口启动后端（API + 静态 UI），并自动打开浏览器。
双击运行或命令行：python start.py

注意：本脚本会清空 DATABASE_URL，强制使用本地 SQLite，适合本地开发。
生产/云端（如 Render、Neon）请勿用 start.py，应直接运行：
  uvicorn backend.server.api.app:app --host 0.0.0.0 --port $PORT
或 python run_backend.py，并设置环境变量 DATABASE_URL=postgresql://...（无空格）。
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

    if sys.platform == "win32":
        # 新开一个 cmd 窗口跑后端，便于看日志（路径含空格时用引号）
        # 本地启动时取消 DATABASE_URL，强制用 SQLite，避免依赖 psycopg2/云端
        cmd_str = f'start "Jagent Backend" cmd /k "cd /d \"{root}\" && set DATABASE_URL= && python run_backend.py"'
        subprocess.Popen(cmd_str, cwd=root, shell=True)
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
