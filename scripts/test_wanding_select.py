"""
轻量测试：万鼎 list 是否命中 + LLM 是否选对。
不跑完整 Agent，只调 match_wanding_price_candidates + llm_select_best，省 token。

用法:
  cd "Agent Team version3"
  python scripts/test_wanding_select.py
  python scripts/test_wanding_select.py --rows 5 --keywords-col 报价名字
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

# 项目根 = scripts 的上一级
ROOT = Path(__file__).resolve().parent.parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))


def _read_excel(path: Path, sheet: str | int = 0, max_rows: int | None = None):
    import pandas as pd
    df = pd.read_excel(path, sheet_name=sheet, header=0)
    if max_rows is not None:
        df = df.head(max_rows)
    return df


def _in_wanding_list(keywords: str, customer_level: str = "B") -> tuple[bool, list]:
    """返回 (是否在万鼎候选内, 候选列表)。"""
    from backend.tools.inventory.services.match_and_inventory import match_wanding_price_candidates
    keywords = (keywords or "").strip()
    if not keywords:
        return False, []
    candidates = match_wanding_price_candidates(keywords, customer_level=customer_level)
    norm = [
        {"code": str(c.get("code", "")), "matched_name": str(c.get("matched_name", "")), "unit_price": float(c.get("unit_price", 0) or 0)}
        for c in candidates
    ]
    return len(norm) > 0, norm


def _llm_select(keywords: str, candidates: list, max_tokens: int = 1024):
    """从候选中选 1 个。"""
    from backend.tools.inventory.services.llm_selector import llm_select_best
    return llm_select_best(keywords, candidates, max_tokens=max_tokens)


def _loose_match(selected_name: str, expected_name: str) -> bool:
    """简单判是否「选对」：关键词有交集或包含。"""
    if not (selected_name and expected_name):
        return False
    a, b = selected_name.strip().lower(), expected_name.strip().lower()
    if a == b:
        return True
    # 去掉常见空格/标点后看是否互相包含
    for sep in [" ", " ", "　", "-", "_", "/", "(", ")", "（", "）"]:
        a, b = a.replace(sep, ""), b.replace(sep, "")
    return a in b or b in a or any(w in b for w in a.split() if len(w) > 1)


def main():
    ap = argparse.ArgumentParser(description="测试万鼎 list + LLM 选择")
    ap.add_argument("--excel", default=None, help="报价单路径，默认 报价单/Copy of 整理产品.xlsx")
    ap.add_argument("--sheet", default=0, help="sheet 名或索引，默认 0")
    ap.add_argument("--rows", type=int, default=10, help="只测前 N 行，默认 10")
    ap.add_argument("--keywords-col", default="0", help="关键词列：列名或列索引 0/1/2（0=第1列如32弯头）")
    ap.add_argument("--expected-code-col", default="1", help="期望万鼎 code 列：列名或索引（1=第2列如8010071403），用于严格判选对")
    ap.add_argument("--expected-col", default="2", help="期望产品名列：列名或索引（2=第3列），无 code 列时用名称判选对")
    ap.add_argument("--customer-level", default="B", help="客户档位 A/B/C/D")
    ap.add_argument("--max-tokens", type=int, default=1024, help="LLM 选型 max_tokens")
    ap.add_argument("--no-llm", action="store_true", help="只测是否在 list，不调 LLM 选型")
    args = ap.parse_args()

    excel_path = Path(args.excel) if args.excel else ROOT / "报价单" / "Copy of 整理产品.xlsx"
    if not excel_path.is_absolute():
        excel_path = ROOT / excel_path
    if not excel_path.exists():
        print(f"文件不存在: {excel_path}")
        return 2

    df = _read_excel(excel_path, sheet=args.sheet, max_rows=args.rows)

    def _col(name: str | None):
        if not name:
            return None
        if name.strip().isdigit():
            idx = int(name.strip())
            if 0 <= idx < len(df.columns):
                return df.columns[idx]
        return name if name in df.columns else None

    keywords_col = _col(args.keywords_col)
    if keywords_col is None:
        print(f"列「{args.keywords_col}」无效。当前列数: {len(df.columns)}，可用 0/1/2 或列名")
        return 2
    expected_code_col = _col(args.expected_code_col)
    expected_col = _col(args.expected_col)
    if expected_code_col:
        print(f"选对判定：code 与第 2 列一致\n")

    stats = {"in_list": 0, "not_in_list": 0, "single_ok": 0, "single_wrong": 0, "multi_llm_ok": 0, "multi_llm_wrong": 0, "multi_skip": 0}
    for i, row in df.iterrows():
        keywords = str(row.get(keywords_col, "")).strip()
        expected_name = str(row.get(expected_col, "")).strip() if expected_col else ""
        expected_code = str(row.get(expected_code_col, "")).strip() if expected_code_col else ""
        if not keywords:
            continue
        in_list, candidates = _in_wanding_list(keywords, customer_level=args.customer_level)
        if not in_list:
            stats["not_in_list"] += 1
            print(f"[{i+1}] 不在万鼎 list: 「{keywords[:50]}」")
            continue
        stats["in_list"] += 1

        def _is_correct(selected: dict) -> bool:
            if expected_code:
                return (selected.get("code") or "").strip() == expected_code
            return _loose_match(selected.get("matched_name", ""), expected_name) if expected_name else True

        if len(candidates) == 1:
            c = candidates[0]
            ok = _is_correct(c)
            if ok:
                stats["single_ok"] += 1
                print(f"[{i+1}] 在 list（唯一）✓: 「{keywords[:40]}」 -> {c.get('code')} {c.get('matched_name', '')[:45]}")
            else:
                stats["single_wrong"] += 1
                exp = f" 期望 code={expected_code}" if expected_code else f" 期望含「{expected_name[:25]}」"
                print(f"[{i+1}] 在 list（唯一）✗{exp}: 「{keywords[:40]}」 -> {c.get('code')} {c.get('matched_name', '')[:45]}")
            continue
        if args.no_llm:
            stats["multi_skip"] += 1
            print(f"[{i+1}] 在 list（多候选 {len(candidates)} 个，未调 LLM）: 「{keywords[:40]}」")
            continue
        selected = _llm_select(keywords, candidates, max_tokens=args.max_tokens)
        if not selected:
            stats["multi_llm_wrong"] += 1
            print(f"[{i+1}] 在 list，LLM 判无匹配: 「{keywords[:40]}」")
            continue
        sel_code = (selected.get("code") or "").strip()
        sel_name = selected.get("matched_name", "")
        ok = _is_correct(selected)
        if ok:
            stats["multi_llm_ok"] += 1
            print(f"[{i+1}] 在 list，LLM 选对 ✓: 「{keywords[:30]}」 -> {sel_code} {sel_name[:45]}")
        else:
            stats["multi_llm_wrong"] += 1
            exp = f" 期望 code={expected_code}" if expected_code else f" 期望含「{expected_name[:25]}」"
            print(f"[{i+1}] 在 list，LLM 选错 ✗{exp}: 「{keywords[:30]}」 -> {sel_code} {sel_name[:50]}")

    print("\n--- 统计 ---")
    print(json.dumps(stats, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
