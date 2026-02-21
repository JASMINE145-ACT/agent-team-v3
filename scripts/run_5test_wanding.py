# -*- coding: utf-8 -*-
"""跑 5 条万鼎测试：110检修口、50PVC管、50弯头、50三通、50,45度弯头。先取候选再 LLM 选型写 log。"""
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
    ("110检修口", "8020020223", "立管检查口PVC-U排水配件白色 dn110"),
    ("50PVC管", "8020012379", "印尼(日标)PVC-U排水扩直口管(D排水系列)白色 DN50 (2\") 4M/根联塑"),
    ("50弯头", "8020022822", "90°弯头印尼(日标)PVC-U管件(D排水系列)灰色 DN50 (2\") 联塑"),
    ("50三通", "8020022784", "短型顺水三通印尼(日标)PVC-U管件(D排水系列)灰色DN50 (2\")联塑"),
    ("50,45度弯头", "8020022742", "45°弯头印尼(日标)PVC-U管件(D排水系列)灰色DN50 (2\") 联塑"),
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
    batch_path = ROOT / "logs" / "batch_5test_new.json"
    batch_path.parent.mkdir(parents=True, exist_ok=True)
    batch_path.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"已写入 5 条候选到 {batch_path}", file=sys.stderr)
    subprocess.run(
        [sys.executable, str(ROOT / "scripts" / "run_skill_batch_to_log.py"), str(batch_path)],
        cwd=str(ROOT),
        check=True,
    )


if __name__ == "__main__":
    main()
