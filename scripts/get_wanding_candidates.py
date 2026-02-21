"""
只取万鼎候选，不调 LLM（省 token）。供 Cursor Skill 或本地测试用。
输出 JSON 或可读列表，由 Cursor 模型按业务规则做选型。

用法（在 Agent Team version3 目录下）:
  python scripts/get_wanding_candidates.py "32*20内丝三通"
  python scripts/get_wanding_candidates.py "90度弯头" --json
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))


def _ensure_new_table():
    import os
    v3_path = ROOT / "data" / "万鼎价格库_管材与国标管件_标准格式.xlsx"
    if v3_path.exists():
        os.environ.setdefault("PRICE_LIBRARY_PATH", str(v3_path))


def get_candidates(
    keywords: str,
    customer_level: str = "B",
    max_score_tiers: int = 2,
    price_library_path: str | None = None,
):
    _ensure_new_table()
    from backend.tools.inventory.services.match_and_inventory import match_wanding_price_candidates
    raw = match_wanding_price_candidates(
        (keywords or "").strip(),
        customer_level=customer_level,
        max_score_tiers=max_score_tiers,
        price_library_path=price_library_path,
    )
    return [{"code": str(c.get("code", "")).strip(), "matched_name": str(c.get("matched_name", "")).strip()} for c in raw]


def main():
    ap = argparse.ArgumentParser(description="万鼎候选查询（不调 LLM）")
    ap.add_argument("keywords", nargs="?", default="", help="需求字段/关键词")
    ap.add_argument("--customer-level", default="B", help="客户档位")
    ap.add_argument("--max-score-tiers", type=int, default=2, help="取前 N 个分数档")
    ap.add_argument("--json", action="store_true", help="输出 JSON")
    args = ap.parse_args()
    keywords = (args.keywords or "").strip()
    if not keywords:
        print("用法: python scripts/get_wanding_candidates.py <关键词> [--json]", file=sys.stderr)
        sys.exit(2)
    candidates = get_candidates(keywords, customer_level=args.customer_level, max_score_tiers=args.max_score_tiers)
    if args.json:
        print(json.dumps({"keywords": keywords, "candidates": candidates}, ensure_ascii=False, indent=2))
    else:
        print(f"关键词: {keywords}")
        print(f"候选数: {len(candidates)}")
        for i, c in enumerate(candidates, 1):
            print(f"  {i}. [{c['code']}] {c['matched_name']}")
    return 0 if candidates else 1


if __name__ == "__main__":
    sys.exit(main())
