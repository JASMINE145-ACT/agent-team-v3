"""
运行入口（独立于 data_platform，以本目录为根）
"""
import sys
from pathlib import Path

# 以 quotation_tracker 目录为根，便于独立运行
current_dir = Path(__file__).resolve().parent
if str(current_dir) not in sys.path:
    sys.path.insert(0, str(current_dir))

if __name__ == "__main__":
    import streamlit.web.cli as stcli
    
    # 运行 Streamlit 应用
    app_path = Path(__file__).parent / "app.py"
    sys.argv = ["streamlit", "run", str(app_path)]
    stcli.main()
