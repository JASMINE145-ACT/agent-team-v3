# -*- coding: utf-8 -*-
"""
读取 run_skill_lookup_batch.py 输出的 JSON，对每条用「两 tool」做选型与判断，并调用 append_wanding_log 写入 log。

完全依赖两 tool：
  1. 筛选：候选来自 batch JSON（由 get_wanding_candidates / match_wanding_price_candidates 产出）。
  2. 选型：调用 llm_select_best(keywords, candidates)，即 select_wanding_match 的 LLM 选型逻辑。
选完后与期望对比得 llm_correct，不参考期望做选型。

在 Agent Team version3 目录下运行：
  python scripts/run_skill_lookup_batch.py -o logs/batch_candidates.json
  python scripts/run_skill_batch_to_log.py logs/batch_candidates.json
"""
from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def select_and_judge(row: dict) -> dict:
    """用 LLM 选型（llm_select_best），不参考 expected。返回 list_contains、选中项、llm_correct。"""
    expected_code = (row.get("expected_code") or "").strip()
    candidates = row.get("candidates") or []
    keywords = (row.get("keywords") or "").strip()
    codes = [str(c.get("code", "")).strip() for c in candidates if c.get("code")]

    list_contains = "是" if expected_code and expected_code in codes else "否"

    if not candidates:
        return {
            "list_contains": list_contains,
            "no_selection": True,
            "selected_code": "",
            "selected_name": "",
            "llm_correct": "否" if expected_code else "-",
        }

    # 与 select_wanding_match 一致：调用 llm_select_best
    if str(ROOT) not in sys.path:
        sys.path.insert(0, str(ROOT))
    from backend.tools.inventory.services.llm_selector import llm_select_best

    # 候选需含 unit_price（batch JSON 可能无，补 0）；过多时截断避免 prompt 过长导致 LLM 返回 length
    MAX_CANDIDATES_FOR_LLM = 25
    cand_with_price = [
        {
            "code": str(c.get("code", "")),
            "matched_name": str(c.get("matched_name", "")),
            "unit_price": float(c.get("unit_price", 0) or 0),
        }
        for c in candidates
    ]
    cand_with_price = cand_with_price[:MAX_CANDIDATES_FOR_LLM]
    selected = llm_select_best(keywords, cand_with_price)

    if selected is None:
        return {
            "list_contains": list_contains,
            "no_selection": True,
            "selected_code": "",
            "selected_name": "",
            "llm_correct": "否" if expected_code else "-",
        }

    selected_code = (selected.get("code") or "").strip()
    selected_name = (selected.get("matched_name") or "").strip()
    llm_correct = "是" if (expected_code and selected_code == expected_code) else ("否" if expected_code else "-")

    return {
        "list_contains": list_contains,
        "no_selection": False,
        "selected_code": selected_code,
        "selected_name": selected_name,
        "llm_correct": llm_correct,
    }


def main():
    batch_path = sys.argv[1] if len(sys.argv) > 1 else str(ROOT / "logs" / "batch_candidates.json")
    path = Path(batch_path)
    if not path.exists():
        print(f"Batch JSON 不存在: {path}", file=sys.stderr)
        sys.exit(1)
    data = json.loads(path.read_text(encoding="utf-8-sig"))
    if not isinstance(data, list):
        print("Batch JSON 应为数组", file=sys.stderr)
        sys.exit(1)

    log_dir = ROOT / "logs"
    log_dir.mkdir(parents=True, exist_ok=True)
    append_script = ROOT / "scripts" / "append_wanding_log.py"

    for i, row in enumerate(data, 1):
        res = select_and_judge(row)
        kw = (row.get("keywords") or "").strip()
        expected_code = (row.get("expected_code") or "").strip()
        expected_name = (row.get("expected_name") or "").strip()
        candidates = row.get("candidates") or []

        cand_file = log_dir / f"cand_skill_{i}.json"
        if candidates:
            cand_file.write_text(json.dumps(candidates, ensure_ascii=False, indent=2), encoding="utf-8")
        else:
            cand_file.write_text("[]", encoding="utf-8")

        args = [
            sys.executable,
            str(append_script),
            "--keywords", kw,
            "--expected-code", expected_code,
            "--expected-name", expected_name,
            "--list-contains", res["list_contains"],
        ]
        if not candidates:
            args.append("--no-candidates")
        else:
            args.extend(["--candidates-json", str(cand_file)])
        if res["no_selection"]:
            args.append("--no-selection")
        else:
            args.extend(["--selected-code", res["selected_code"], "--selected-name", res["selected_name"]])
        if res["llm_correct"] != "-":
            args.extend(["--llm-correct", res["llm_correct"]])

        subprocess.run(args, cwd=str(ROOT), check=True)
        print(f"[{i}/{len(data)}] {kw[:30]}... list_contains={res['list_contains']} llm_correct={res['llm_correct']}")

    print(f"全部 {len(data)} 条已追加到 logs/test_wanding_select.log")


if __name__ == "__main__":
    main()
