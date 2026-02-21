# -*- coding: utf-8 -*-
"""跑 3 条万鼎测试：110止水节、90°弯头110、50直接。先取候选再 llm 选型写 log。"""
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

_v3_lib = ROOT / "data" / "万鼎价格库_管材与国标管件_标准格式.xlsx"
if _v3_lib.exists():
    import os
    os.environ.setdefault("PRICE_LIBRARY_PATH", str(_v3_lib))
_lib_path = str(_v3_lib) if _v3_lib.exists() else None

from scripts.get_wanding_candidates import get_candidates

ROWS = [
    ("110止水节", "8020022039", "穿楼板预埋接头(止水节)PVC-U排水配件白色 dn110"),
    ("90度弯头 110", "8020020588", "90°直角弯头PVC-U排水配件白色 dn110"),
    ("50直接", "8020020755", "直通(管箍)PVC-U排水配件白色 dn50"),
]

def main():
    out = []
    for kw, code, expected_name in ROWS:
        cands = get_candidates(kw, price_library_path=_lib_path)
        out.append({
            "keywords": kw,
            "expected_code": code,
            "expected_name": expected_name,
            "candidates": cands,
        })
    batch_path = ROOT / "logs" / "batch_3test.json"
    batch_path.parent.mkdir(parents=True, exist_ok=True)
    batch_path.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"已写入 3 条候选到 {batch_path}", file=sys.stderr)
    subprocess.run(
        [sys.executable, str(ROOT / "scripts" / "run_skill_batch_to_log.py"), str(batch_path)],
        cwd=str(ROOT),
        check=True,
    )

if __name__ == "__main__":
    main()
