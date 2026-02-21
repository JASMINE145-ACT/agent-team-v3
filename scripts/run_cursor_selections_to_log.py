"""
用「Cursor 选型结果」写 log，不偷看期望。
从 batch_5test.json 读 5 条，用预定的 Cursor 选型（按业务规则选，非「期望在 list 就选期望」）
逐条调用 append_wanding_log 写入 test_wanding_select.log。
"""
from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BATCH = ROOT / "logs" / "batch_5test.json"
LOG_PATH = ROOT / "logs" / "test_wanding_select.log"


# Cursor 按业务规则选的 5 条（不看 expected_code 选型，选完再对比期望）
CURSOR_SELECTIONS = [
    # 1. PIPA COUNDUIT 25ML → 电线管/B管 dn25 管材
    ("8030050080", "PVC电线管(B管)白色 dn25 2.9M/根 联塑"),
    # 2. SOCKET 25ML → 管直通(套筒) Φ25
    ("8030020289", "管直通(套筒)PVC电工套管配件白色 Φ25 联塑"),
    # 3. KLEM 25ML → 管夹 Φ25
    ("8030020128", "管夹PVC电工套管配件白色 Φ25 联塑"),
    # 4. TDUST 4 cabang → 四通接线盒
    ("8030020249", "管四通圆接线盒(带盖)PVC电工套管配件白色 65x40/4/Φ25 联塑"),
    # 5. 电气热熔器ppr水管热熔机熔接器 dn63 → 焊接机 dn20-63
    ("8010070922", "焊接机1000W dn20-63(PPR 配件) 联塑"),
]


def main():
    data = json.loads(BATCH.read_text(encoding="utf-8"))
    if len(data) != 5 or len(CURSOR_SELECTIONS) != 5:
        print("batch_5test 条数或 CURSOR_SELECTIONS 条数不是 5", file=sys.stderr)
        sys.exit(1)

    for i, row in enumerate(data):
        keywords = row.get("keywords", "")
        expected_code = row.get("expected_code", "")
        expected_name = row.get("expected_name", "")
        candidates = row.get("candidates", [])
        sel_code, sel_name = CURSOR_SELECTIONS[i]

        list_contains = "是" if any(c.get("code") == expected_code for c in candidates) else "否"
        llm_correct = "是" if sel_code == expected_code else "否"

        cand_file = ROOT / "logs" / f"_cursor_cand_{i}.json"
        cand_file.write_text(json.dumps(candidates, ensure_ascii=False, indent=2), encoding="utf-8")

        cmd = [
            sys.executable,
            str(ROOT / "scripts" / "append_wanding_log.py"),
            "--keywords", keywords,
            "--expected-code", expected_code,
            "--expected-name", expected_name,
            "--candidates-json", str(cand_file),
            "--list-contains", list_contains,
            "--selected-code", sel_code,
            "--selected-name", sel_name,
            "--llm-correct", llm_correct,
            "--log-file", str(LOG_PATH),
        ]
        subprocess.run(cmd, cwd=str(ROOT), check=True)
        cand_file.unlink(missing_ok=True)
        print(f"[{i+1}/5] keywords={keywords[:40]}... selected={sel_code} llm_correct={llm_correct}")

    print("Done. Cursor 选型 5 条已追加到", LOG_PATH)


if __name__ == "__main__":
    main()
