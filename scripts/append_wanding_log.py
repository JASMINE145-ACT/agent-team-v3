"""
将单条万鼎选型结果追加到 logs/test_wanding_select.log（与 test_wanding_select 同格式）。
供 Cursor Skill 或手工记录用。

用法（在 Agent Team version3 目录下）:
  # 有候选、有选中
  python scripts/append_wanding_log.py --keywords "32*20内丝直接" --expected-code 8010072348 --expected-name "内螺纹直接头..." --list-contains 是 --selected-code 8010072348 --selected-name "内螺纹直接头Ⅰ型(PPR 配件)..." --llm-correct 是

  # 候选从 JSON 文件读（每行一个 {"code":"...","matched_name":"..."} 或 JSON 数组）
  python scripts/append_wanding_log.py --keywords "90度弯头" --candidates-json candidates.json --list-contains 是 --selected-code 8010071402 --selected-name "90°弯头..." --llm-correct 是

  # 不在万鼎 list（无候选）
  python scripts/append_wanding_log.py --keywords "某词" --no-candidates --expected-code "" --expected-name ""

  # 有候选但无匹配
  python scripts/append_wanding_log.py --keywords "某词" --expected-code 123 --candidates-json candidates.json --list-contains 是 --no-selection --llm-correct 否
"""
from __future__ import annotations

import argparse
import json
import sys
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LOG_PATH = ROOT / "logs" / "test_wanding_select.log"


def load_candidates_from_json(s: str) -> list[dict]:
    """s 为 JSON 数组字符串或文件路径。"""
    s = (s or "").strip()
    if not s:
        return []
    path = Path(s)
    if path.exists():
        raw = path.read_text(encoding="utf-8")
    else:
        raw = s
    try:
        data = json.loads(raw)
    except json.JSONDecodeError:
        return []
    if isinstance(data, list):
        return [{"code": str(x.get("code", "")), "matched_name": str(x.get("matched_name", ""))} for x in data]
    if isinstance(data, dict) and "candidates" in data:
        return [{"code": str(x.get("code", "")), "matched_name": str(x.get("matched_name", ""))} for x in data["candidates"]]
    return []


def main():
    ap = argparse.ArgumentParser(description="追加单条结果到 test_wanding_select.log")
    ap.add_argument("--keywords", required=True, help="需求字段/关键词")
    ap.add_argument("--expected-code", default="", help="期望 code")
    ap.add_argument("--expected-name", default="", help="期望名称")
    ap.add_argument("--no-candidates", action="store_true", help="无候选（不在万鼎 list）")
    ap.add_argument("--candidates-json", default="", help="候选 JSON 数组或含 candidates 的 JSON 文件路径")
    ap.add_argument("--list-contains", choices=["是", "否"], default="是", help="候选 list 是否包含期望")
    ap.add_argument("--selected-code", default="", help="选中项的 code")
    ap.add_argument("--selected-name", default="", help="选中项的 matched_name")
    ap.add_argument("--no-selection", action="store_true", help="未选出/无匹配")
    ap.add_argument("--llm-correct", choices=["是", "否"], help="是否选对（有期望时填）")
    ap.add_argument("--log-file", default="", help="log 路径，默认 logs/test_wanding_select.log")
    args = ap.parse_args()

    log_path = Path(args.log_file) if args.log_file else LOG_PATH
    log_path.parent.mkdir(parents=True, exist_ok=True)

    candidates: list[dict] = []
    if not args.no_candidates and args.candidates_json:
        candidates = load_candidates_from_json(args.candidates_json)
    elif args.no_candidates:
        pass
    else:
        # 无 --candidates-json 且无 --no-candidates 时，候选留空（仅写选中与判断）
        candidates = []

    with open(log_path, "a", encoding="utf-8") as f:
        run_ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        f.write(f"\n\n======== 运行 {run_ts} (skill/Cursor) ========\n")
        f.write("# mode: skill\n")
        f.write("---\n")
        f.write(f"keywords: {args.keywords}\n")
        f.write(f"expected_code: {args.expected_code or '(未填)'}\n")
        f.write(f"expected_name: {args.expected_name or '(未填)'}\n")
        if args.no_candidates:
            f.write("candidates(0): 不在万鼎 list\n")
        else:
            f.write(f"candidates({len(candidates)}):\n")
            for i, c in enumerate(candidates, 1):
                f.write(f"  {i}. {c.get('code','')} | {c.get('matched_name','')}\n")
        f.write(f"list_contains: {args.list_contains}\n")
        if args.no_selection:
            f.write("llm_selection: 未选出\n")
        elif args.selected_code or args.selected_name:
            f.write(f"llm_selection: {args.selected_code} | {args.selected_name}\n")
        else:
            f.write("llm_selection: -\n")
        if args.llm_correct:
            f.write(f"llm_correct: {args.llm_correct}\n")
        else:
            f.write("llm_correct: -\n")
        f.flush()

    print(f"已追加到: {log_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
