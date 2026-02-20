"""
一键启动 Jagent 前后端：在新窗口启动后端（API + 静态 UI），并自动打开浏览器。
双击运行或命令行：python start.py
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
        cmd_str = f'start "Jagent Backend" cmd /k "cd /d \"{root}\" && python run_backend.py"'
        subprocess.Popen(cmd_str, cwd=root, shell=True)
    else:
        subprocess.Popen(
            [sys.executable, "run_backend.py"],
            cwd=root,
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
