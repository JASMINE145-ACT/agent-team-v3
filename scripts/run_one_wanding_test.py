"""单条万鼎测试：32弯头 -> 8010071403 / 90°弯头(PPR配件)印尼绿色dn32 (1") 联塑"""
import sys
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
sys.path.insert(0, str(ROOT / "scripts"))
from test_wanding_select import run_one

if __name__ == "__main__":
    keywords = "32弯头"
    expected_name = '90°弯头(PPR配件)印尼绿色dn32 (1") 联塑'
    expected_code = "8010071403"
    contained, llm_ok = run_one(keywords, expected_name, expected_code, no_llm=False)
    print()
    print("--- 结论 ---")
    print("候选 list 包含期望:", contained)
    print("LLM 选对:", llm_ok)
    sys.exit(0 if (contained and llm_ok) else 1)
