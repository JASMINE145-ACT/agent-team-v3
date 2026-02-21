# -*- coding: utf-8 -*-
"""检查万鼎价格库是否被正确加载（管材+国标管件）及目标 code 是否在表中。在 Agent Team version3 下运行。"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

# 与 get_wanding_candidates 一致：先设路径再导 backend
def _ensure_new_table():
    v3_path = ROOT / "data" / "万鼎价格库_管材与国标管件_标准格式.xlsx"
    import os
    os.environ.setdefault("PRICE_LIBRARY_PATH", str(v3_path))
    return v3_path

v3_path = _ensure_new_table()
print("PRICE_LIBRARY_PATH (version3 默认):", v3_path)
print("文件存在:", v3_path.exists())

from backend.tools.inventory.services.wanding_fuzzy_matcher import load_wanding_df, _df_cache

# 清除缓存，强制重新加载（直接用 version3 路径，避免 config 默认路径不对）
_df_cache.clear()
df = load_wanding_df(str(v3_path), customer_level="B")
print("加载总行数:", len(df))
if not df.empty:
    materials = df["Material"].astype(str)
    for code in ["8020020643", "8020020639", "8020020205"]:
        hit = df[materials == code]
        if not hit.empty:
            print(f"  {code}: 在表中, 名称={hit.iloc[0]['Describrition'][:50]}...")
        else:
            print(f"  {code}: 未在 Material 列中找到")
    from backend.tools.inventory.services.wanding_fuzzy_matcher import search_fuzzy
    for kw in ["90度弯头带检查口 PVC 50", "110PVC堵头 PVC 110"]:
        res = search_fuzzy(df, kw)
        print(f"  search_fuzzy({kw!r}): {len(res)} 条, 前1条 code={res[0][0].get('code') if res else None}")
else:
    print("DataFrame 为空，请检查路径与文件。")
