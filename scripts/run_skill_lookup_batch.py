# -*- coding: utf-8 -*-
"""一次性取 8 条关键词的候选（供 skill 查表用），输出 JSON。在 Agent Team version3 下运行。

用法:
  python scripts/run_skill_lookup_batch.py                    # 打印到 stdout
  python scripts/run_skill_lookup_batch.py -o logs/batch_candidates.json   # 直接写文件（推荐，避免 PowerShell 编码）
"""
import argparse
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

# 先设置价格库路径并显式传参，避免 config 默认路径或缓存导致未加载国标管件
_v3_lib = ROOT / "data" / "万鼎价格库_管材与国标管件_标准格式.xlsx"
if _v3_lib.exists():
    import os
    os.environ.setdefault("PRICE_LIBRARY_PATH", str(_v3_lib))
_lib_path = str(_v3_lib) if _v3_lib.exists() else None

from scripts.get_wanding_candidates import get_candidates

ROWS = [
    ("90度弯头带检查口", "PVC 50", "8020020643", "90°弯头(带检查口)PVC-U排水配件白色 dn50"),
    ("90度弯头带检查口", "PVC 110", "8020020639", "90°弯头(带检查口)PVC-U排水配件白色 dn110"),
    ("110PVC堵头", "PVC 110", "8020020205", "管帽PVC-U排水配件白色 dn110"),
    ("Pipa COUNDUIT 20m", "", "8030050068", "PVC电线管(B管)白色dn202.9M/根联塑"),
    ("Socket 20m", "", "8030020288", "管直通(套筒)PVC电工套管配件白色 Φ20 联塑"),
    ("PVC160斜三通", "160", "8020022636", "45°斜三通印尼(日标)PVC-U管件(D排水系列)灰色 DN150 (6\") 联塑"),
    ("PVC16045°弯头", "160", "8020022757", "45°弯头印尼(日标)PVC-U管件(D排水系列)灰色 DN150 (6\") 联塑"),
    ("PVC160 管子", "", "8020012383", "印尼(日标)PVC-U排水扩直口管(D排水系列)白色DN150 (6\") 4M/根联塑"),
]

if __name__ == "__main__":
    ap = argparse.ArgumentParser(description="批量取万鼎候选")
    ap.add_argument("-o", "--output", default="", help="输出 JSON 文件路径，不传则打印到 stdout")
    args = ap.parse_args()
    out = []
    for name, spec, code, expected_name in ROWS:
        kw = f"{name} {spec}".strip() if spec else name
        cands = get_candidates(kw, price_library_path=_lib_path)
        out.append({
            "keywords": kw,
            "expected_code": code,
            "expected_name": expected_name,
            "candidates": cands,
        })
    text = json.dumps(out, ensure_ascii=False, indent=2)
    if args.output:
        out_path = Path(args.output)
        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.write_text(text, encoding="utf-8")
        print(f"已写入 {len(out)} 条到 {out_path}", file=sys.stderr)
    else:
        print(text)
