# -*- coding: utf-8 -*-
"""临时脚本：测试 match_wanding_price 映射表优先 + 万鼎 fallback，关键词 三通内丝接头"""
import sys
from pathlib import Path

root = Path(__file__).resolve().parent.parent
if str(root) not in sys.path:
    sys.path.insert(0, str(root))

def main():
    from backend.tools.inventory.services.mapping_table_matcher import match_mapping_top_candidates
    from backend.tools.inventory.services.llm_selector import llm_select_best
    from backend.tools.inventory.services.match_and_inventory import match_wanding_price_candidates

    kw = "三通内丝接头"
    print("=== 1. 映射表 top3 ===")
    mapping = match_mapping_top_candidates(kw, top_k=3)
    print("映射表候选数:", len(mapping))
    for i, c in enumerate(mapping, 1):
        name = (c.get("matched_name") or "")[:55]
        print(f"  {i}. code={c.get('code')} matched_name={name}")

    if mapping:
        print("\n=== 2. LLM 从映射表候选中选 1 个 ===")
        best = llm_select_best(kw, mapping)
        if best:
            print("LLM 选中:", best.get("code"), (best.get("matched_name") or "")[:60])
        else:
            print("LLM 判定无匹配，将走万鼎")
    else:
        print("映射表无命中")

    print("\n=== 3. 万鼎候选（对比/fallback）===")
    wand = match_wanding_price_candidates(kw, customer_level="B")
    print("万鼎候选数:", len(wand))
    for i, c in enumerate(wand[:5], 1):
        name = (c.get("matched_name") or "")[:55]
        print(f"  {i}. code={c.get('code')} matched_name={name}")

if __name__ == "__main__":
    main()
