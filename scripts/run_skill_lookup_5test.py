# -*- coding: utf-8 -*-
"""用 skill 测表中 5 条：PIPA COUNDUIT 25ML、SOCKET 25ML、KLEM 25ML、TDUST 4 cabang、电气热熔器 dn63。"""
import json
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

ROWS_5 = [
    ("PIPA COUNDUIT 25ML", "", "8030050080", "PVC电线管(B管)白色dn252.9M/根联塑"),
    ("SOCKET 25ML", "", "8030020289", "管直通(套筒)PVC电工套管配件白色 Φ25 联塑"),
    ("KLEM 25ML", "", "8030020128", "管夹PVC电工套管配件白色Φ25 联塑"),
    ("TDUST 4 cabang", "", "8030020249", "管四通圆接线盒(带盖)PVC电工套管配件白色65x40/4/Φ25 联塑"),
    ("电气热熔器ppr水管热熔机熔接器 dn63", "", "8010070922", "焊接机1000W dn20-63(PPR配件)联塑"),
]

if __name__ == "__main__":
    out = []
    for name, spec, code, expected_name in ROWS_5:
        kw = f"{name} {spec}".strip() if spec else name
        cands = get_candidates(kw, price_library_path=_lib_path)
        out.append({"keywords": kw, "expected_code": code, "expected_name": expected_name, "candidates": cands})
    out_path = ROOT / "logs" / "batch_5test.json"
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"已写入 {len(out)} 条到 {out_path}", file=sys.stderr)
