"""
轻量测试：基于新表（version3/data/万鼎价格库_管材与国标管件_标准格式.xlsx）做万鼎匹配。
只做「名称→候选 list」匹配，不返回、不校验价格（新表开发中价格可能不规范）。
校验：① 候选 list 是否包含期望（真实匹配名称 + code）② LLM 是否选对。

用法:
  cd "Agent Team version3"
  # 单条：需求字段 + 真实匹配名称 + code
  python scripts/test_wanding_select.py --keywords "32弯头" --expected-name "某产品全称" --expected-code "8010071403"
  # 从 Excel 批量（列：需求字段/关键词, 真实匹配名称, code）
  python scripts/test_wanding_select.py --excel path.xlsx --keywords-col 0 --expected-col 2 --expected-code-col 1
  python scripts/test_wanding_select.py --rows 5 --no-llm
  # 批量并行加速（默认 --workers 3，可改为 1 串行或 5）
  python scripts/test_wanding_select.py --excel data/test_three.xlsx --workers 3
"""
from __future__ import annotations

import argparse
import json
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime
from pathlib import Path
from typing import Any, TextIO

ROOT = Path(__file__).resolve().parent.parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))


def _ensure_new_table():
    """确保使用 version3 新表（不依赖 v2）。"""
    import os
    v3_path = ROOT / "data" / "万鼎价格库_管材与国标管件_标准格式.xlsx"
    if v3_path.exists():
        os.environ.setdefault("PRICE_LIBRARY_PATH", str(v3_path))


def _read_excel(path: Path, sheet: str | int = 0, max_rows: int | None = None):
    import pandas as pd
    df = pd.read_excel(path, sheet_name=sheet, header=0)
    if max_rows is not None:
        df = df.head(max_rows)
    return df


def _get_candidates(keywords: str, customer_level: str = "B", max_score_tiers: int = 2):
    """只做名称匹配，返回候选 list（仅用 code + matched_name，不关心价格）。默认取前 2 个分数档的全部候选。"""
    _ensure_new_table()
    from backend.tools.inventory.services.match_and_inventory import match_wanding_price_candidates
    keywords = (keywords or "").strip()
    if not keywords:
        return []
    raw = match_wanding_price_candidates(keywords, customer_level=customer_level, max_score_tiers=max_score_tiers)
    return [{"code": str(c.get("code", "")).strip(), "matched_name": str(c.get("matched_name", "")).strip()} for c in raw]


def _llm_select_one(keywords: str, candidates: list, max_tokens: int = 4096):
    """从候选中选 1 个（传参只含 code+matched_name，不传价格）。"""
    from backend.tools.inventory.services.llm_selector import llm_select_best
    # LLM 接口仍接受 unit_price，传 0 即可
    with_price = [{"code": c["code"], "matched_name": c["matched_name"], "unit_price": 0} for c in candidates]
    out = llm_select_best(keywords, with_price, max_tokens=max_tokens)
    if not out:
        return None
    return {"code": str(out.get("code", "")).strip(), "matched_name": str(out.get("matched_name", "")).strip()}


def _list_contains(candidates: list, expected_code: str, expected_name: str) -> bool:
    """候选 list 是否包含期望（code 或 真实匹配名称 一致即算包含）。"""
    if not expected_code and not expected_name:
        return True
    for c in candidates:
        if expected_code and (c.get("code") or "").strip() == expected_code.strip():
            return True
        if expected_name and _name_match((c.get("matched_name") or "").strip(), expected_name.strip()):
            return True
    return False


def _name_match(a: str, b: str) -> bool:
    """名称是否视为一致（相等或互相包含）。"""
    if not a or not b:
        return not a and not b
    a, b = a.lower(), b.lower()
    if a == b:
        return True
    for sep in [" ", " ", "　", "-", "_", "/", "(", ")", "（", "）"]:
        a, b = a.replace(sep, ""), b.replace(sep, "")
    return a in b or b in a or any(w in b for w in a.split() if len(w) > 1)


def _is_correct(selected: dict, expected_code: str, expected_name: str) -> bool:
    """选中的是否等于期望（优先 code，否则名称）。"""
    if expected_code:
        return (selected.get("code") or "").strip() == expected_code.strip()
    if expected_name:
        return _name_match(selected.get("matched_name", ""), expected_name)
    return True


def _write_log_case(
    log_file: TextIO,
    keywords: str,
    expected_code: str,
    expected_name: str,
    candidates: list,
    contained: bool,
    llm_selection: dict | None,
    llm_correct: bool | None,
    no_llm: bool = False,
):
    """往 log 文件写一条用例：候选、是否包含、LLM选择、是否选对。"""
    log_file.write("---\n")
    log_file.write(f"keywords: {keywords}\n")
    log_file.write(f"expected_code: {expected_code or '(未填)'}\n")
    log_file.write(f"expected_name: {expected_name or '(未填)'}\n")
    log_file.write(f"candidates({len(candidates)}):\n")
    for i, c in enumerate(candidates, 1):
        log_file.write(f"  {i}. {c.get('code','')} | {c.get('matched_name','')}\n")
    log_file.write(f"list_contains: {'是' if contained else '否'}\n")
    if no_llm or len(candidates) != 1:
        if no_llm:
            log_file.write("llm_selection: 未调LLM\n")
        elif llm_selection:
            log_file.write(f"llm_selection: {llm_selection.get('code','')} | {llm_selection.get('matched_name','')}\n")
        else:
            log_file.write("llm_selection: 未选出\n")
    else:
        log_file.write("llm_selection: 唯一候选即选中\n")
    if llm_correct is not None:
        log_file.write(f"llm_correct: {'是' if llm_correct else '否'}\n")
    log_file.flush()


def run_one(keywords: str, expected_name: str, expected_code: str, customer_level: str = "B", no_llm: bool = False, max_tokens: int = 4096, max_score_tiers: int = 2, log_file: TextIO | None = None):
    """单条测试：只匹配名字，不返回价格；只判断 list 是否包含期望 + LLM 是否选对。默认取前 2 个分数档。"""
    _ensure_new_table()
    candidates = _get_candidates(keywords, customer_level=customer_level, max_score_tiers=max_score_tiers)
    contained = _list_contains(candidates, expected_code, expected_name)
    print(f"需求字段: 「{keywords}」")
    print(f"期望: code={expected_code or '(未填)'}  真实匹配名称={expected_name or '(未填)'}")
    print(f"候选数: {len(candidates)}  (仅名称+code，不显示价格)")
    if not candidates:
        print("结果: 不在万鼎 list")
        if log_file:
            log_file.write("---\n")
            log_file.write(f"keywords: {keywords}\n")
            log_file.write(f"expected_code: {expected_code or '(未填)'}\n")
            log_file.write(f"expected_name: {expected_name or '(未填)'}\n")
            log_file.write("candidates(0): 不在万鼎 list\n")
            log_file.write("list_contains: 否\n")
            log_file.write("llm_selection: -\n")
            log_file.write("llm_correct: -\n")
            log_file.flush()
        return False, False
    print("候选 list:")
    for i, c in enumerate(candidates[:15], 1):
        print(f"  {i}. {c['code']}  {c['matched_name'][:60]}")
    if len(candidates) > 15:
        print(f"  ... 共 {len(candidates)} 条")
    print(f"候选 list 包含期望: {'是' if contained else '否'}")
    if no_llm or len(candidates) == 1:
        if len(candidates) == 1:
            sel = candidates[0]
            llm_ok = _is_correct(sel, expected_code, expected_name)
            print(f"唯一候选即选中; 与期望一致: {'是' if llm_ok else '否'}")
            if log_file:
                _write_log_case(log_file, keywords, expected_code, expected_name, candidates, contained, sel, llm_ok, no_llm=False)
        else:
            print("未调 LLM，不判选对")
            if log_file:
                _write_log_case(log_file, keywords, expected_code, expected_name, candidates, contained, None, None, no_llm=True)
        return contained, len(candidates) == 1 and _is_correct(candidates[0], expected_code, expected_name)
    selected = _llm_select_one(keywords, candidates, max_tokens=max_tokens)
    if not selected:
        print("LLM 未选出")
        if log_file:
            _write_log_case(log_file, keywords, expected_code, expected_name, candidates, contained, None, False, no_llm=False)
        return contained, False
    llm_ok = _is_correct(selected, expected_code, expected_name)
    print(f"LLM 选中: {selected['code']}  {selected['matched_name'][:60]}")
    print(f"LLM 选对: {'是' if llm_ok else '否'}")
    if log_file:
        _write_log_case(log_file, keywords, expected_code, expected_name, candidates, contained, selected, llm_ok, no_llm=False)
    return contained, llm_ok


def _process_one_row(
    i: int,
    keywords: str,
    expected_code: str,
    expected_name: str,
    opts: dict[str, Any],
) -> tuple[int, dict[str, int], dict[str, Any] | None, str]:
    """
    处理单行（可被并行调用）。返回 (row_index, stats_delta, log_data, print_msg)。
    log_data 为 None 表示「不在万鼎 list」；否则为 _write_log_case 所需字段。
    """
    customer_level = opts.get("customer_level", "B")
    max_score_tiers = opts.get("max_score_tiers", 2)
    no_llm = opts.get("no_llm", False)
    max_tokens = opts.get("max_tokens", 4096)
    stats = {"not_in_list": 0, "in_list": 0, "list_contains": 0, "list_not_contains": 0, "llm_ok": 0, "llm_wrong": 0, "multi_skip": 0}
    log_data: dict[str, Any] | None = None
    msg = ""

    candidates = _get_candidates(keywords, customer_level=customer_level, max_score_tiers=max_score_tiers)
    if not candidates:
        stats["not_in_list"] = 1
        log_data = {"not_in_list": True, "keywords": keywords, "expected_code": expected_code, "expected_name": expected_name}
        msg = f"[{i+1}] 不在万鼎 list: 「{keywords[:50]}」"
        return i, stats, log_data, msg

    stats["in_list"] = 1
    contained = _list_contains(candidates, expected_code, expected_name)
    if contained:
        stats["list_contains"] = 1
    else:
        stats["list_not_contains"] = 1

    if len(candidates) == 1:
        ok = _is_correct(candidates[0], expected_code, expected_name)
        if ok:
            stats["llm_ok"] = 1
            msg = f"[{i+1}] list 包含期望={'是' if contained else '否'} 唯一候选即选中 ✓: 「{keywords[:40]}」 -> {candidates[0]['code']} {candidates[0]['matched_name'][:40]}"
        else:
            stats["llm_wrong"] = 1
            msg = f"[{i+1}] list 包含期望={'是' if contained else '否'} 唯一候选 ✗ 与期望不符: 「{keywords[:40]}」 期望 code={expected_code} name={expected_name[:30]}"
        log_data = {"keywords": keywords, "expected_code": expected_code, "expected_name": expected_name, "candidates": candidates, "contained": contained, "llm_selection": candidates[0], "llm_correct": ok, "no_llm": False}
        return i, stats, log_data, msg

    if no_llm:
        stats["multi_skip"] = 1
        msg = f"[{i+1}] list 包含期望={'是' if contained else '否'} 多候选 {len(candidates)} 个（未调 LLM）: 「{keywords[:40]}」"
        log_data = {"keywords": keywords, "expected_code": expected_code, "expected_name": expected_name, "candidates": candidates, "contained": contained, "llm_selection": None, "llm_correct": None, "no_llm": True}
        return i, stats, log_data, msg

    selected = _llm_select_one(keywords, candidates, max_tokens=max_tokens)
    if not selected:
        stats["llm_wrong"] = 1
        msg = f"[{i+1}] list 包含期望={'是' if contained else '否'} LLM 未选出: 「{keywords[:40]}」"
        log_data = {"keywords": keywords, "expected_code": expected_code, "expected_name": expected_name, "candidates": candidates, "contained": contained, "llm_selection": None, "llm_correct": False, "no_llm": False}
        return i, stats, log_data, msg

    ok = _is_correct(selected, expected_code, expected_name)
    if ok:
        stats["llm_ok"] = 1
        msg = f"[{i+1}] list 包含期望={'是' if contained else '否'} LLM 选对 ✓: 「{keywords[:30]}」 -> {selected['code']} {selected['matched_name'][:40]}"
    else:
        stats["llm_wrong"] = 1
        msg = f"[{i+1}] list 包含期望={'是' if contained else '否'} LLM 选错 ✗ 期望 code={expected_code} name={expected_name[:25]} 实际 {selected['code']} {selected['matched_name'][:40]}"
    log_data = {"keywords": keywords, "expected_code": expected_code, "expected_name": expected_name, "candidates": candidates, "contained": contained, "llm_selection": selected, "llm_correct": ok, "no_llm": False}
    return i, stats, log_data, msg


def main():
    ap = argparse.ArgumentParser(description="万鼎匹配测试（新表、仅名称+code，不校验价格）")
    ap.add_argument("--keywords", default=None, help="需求字段/关键词（单条模式必填）")
    ap.add_argument("--expected-name", default="", help="真实匹配名称，用于判 list 包含 + LLM 选对")
    ap.add_argument("--expected-code", default="", help="期望 code，用于判 list 包含 + LLM 选对")
    ap.add_argument("--excel", default=None, help="Excel 路径，批量模式")
    ap.add_argument("--sheet", default=0, help="sheet 名或索引")
    ap.add_argument("--rows", type=int, default=10, help="批量时只测前 N 行")
    ap.add_argument("--keywords-col", default="0", help="需求字段列：列名或索引 0/1/2")
    ap.add_argument("--expected-code-col", default="1", help="期望 code 列")
    ap.add_argument("--expected-col", default="2", help="期望产品名/真实匹配名称列")
    ap.add_argument("--customer-level", default="B", help="客户档位 A/B/C/D")
    ap.add_argument("--max-tokens", type=int, default=4096, help="LLM 选型 max_tokens，默认 4096")
    ap.add_argument("--max-score-tiers", type=int, default=2, help="万鼎匹配取前 N 个分数档（每档全部返回），默认 2")
    ap.add_argument("--no-llm", action="store_true", help="只测 list 是否包含期望，不调 LLM")
    ap.add_argument("--log-file", default=None, help="log 路径；不指定则追加到 logs/test_wanding_select.log")
    ap.add_argument("--workers", type=int, default=3, help="批量时并行数（1=串行；3~5 可加速且不易触发 API 限流），默认 3")
    args = ap.parse_args()

    if args.log_file:
        log_path = Path(args.log_file)
    else:
        (ROOT / "logs").mkdir(parents=True, exist_ok=True)
        log_path = ROOT / "logs" / "test_wanding_select.log"
    log_file: TextIO | None = open(log_path, "a", encoding="utf-8")
    run_ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_file.write(f"\n\n======== 运行 {run_ts} ========\n")
    log_file.write(f"# mode: {'single' if args.keywords else 'batch'}\n")
    log_file.flush()

    # 单条模式
    if args.keywords is not None:
        contained, llm_ok = run_one(
            args.keywords,
            args.expected_name or "",
            args.expected_code or "",
            customer_level=args.customer_level,
            no_llm=args.no_llm,
            max_tokens=args.max_tokens,
            max_score_tiers=args.max_score_tiers,
            log_file=log_file,
        )
        log_file.close()
        print(f"Log 已追加到: {log_path}")
        return 0 if (contained and (args.no_llm or llm_ok)) else 1

    # 批量模式：从 Excel
    excel_path = Path(args.excel) if args.excel else ROOT / "报价单" / "Copy of 整理产品.xlsx"
    if not excel_path.is_absolute():
        excel_path = ROOT / excel_path
    if not excel_path.exists():
        print(f"文件不存在: {excel_path}")
        return 2

    df = _read_excel(excel_path, sheet=args.sheet, max_rows=args.rows)

    def _col(name: str):
        if not name or not name.strip():
            return None
        if name.strip().isdigit():
            idx = int(name.strip())
            if 0 <= idx < len(df.columns):
                return df.columns[idx]
        return name if name in df.columns else None

    keywords_col = _col(args.keywords_col)
    if keywords_col is None:
        print(f"列「{args.keywords_col}」无效。当前列: {list(df.columns)}")
        return 2
    expected_code_col = _col(args.expected_code_col)
    expected_name_col = _col(args.expected_col)

    stats = {"in_list": 0, "not_in_list": 0, "list_contains": 0, "list_not_contains": 0, "llm_ok": 0, "llm_wrong": 0, "multi_skip": 0}
    opts = {"customer_level": args.customer_level, "max_score_tiers": args.max_score_tiers, "no_llm": args.no_llm, "max_tokens": args.max_tokens}
    rows_to_run = []
    for i, row in df.iterrows():
        keywords = str(row.get(keywords_col, "")).strip()
        if not keywords:
            continue
        expected_name = str(row.get(expected_name_col, "")).strip() if expected_name_col else ""
        expected_code = str(row.get(expected_code_col, "")).strip() if expected_code_col else ""
        rows_to_run.append((i, keywords, expected_code, expected_name))

    if args.workers <= 1:
        # 串行
        for i, keywords, expected_code, expected_name in rows_to_run:
            _i, delta, log_data, msg = _process_one_row(i, keywords, expected_code, expected_name, opts)
            for k in stats:
                stats[k] += delta.get(k, 0)
            print(msg)
            if log_file and log_data:
                if log_data.get("not_in_list"):
                    log_file.write("---\n")
                    log_file.write(f"keywords: {log_data.get('keywords', '')}\n")
                    log_file.write(f"expected_code: {log_data.get('expected_code') or '(未填)'}\n")
                    log_file.write(f"expected_name: {log_data.get('expected_name') or '(未填)'}\n")
                    log_file.write("candidates(0): 不在万鼎 list\n")
                    log_file.write("list_contains: 否\n")
                    log_file.write("llm_selection: -\n")
                    log_file.write("llm_correct: -\n")
                    log_file.flush()
                else:
                    _write_log_case(log_file, log_data["keywords"], log_data["expected_code"], log_data["expected_name"], log_data["candidates"], log_data["contained"], log_data["llm_selection"], log_data["llm_correct"], log_data["no_llm"])
    else:
        # 并行：提交任务，按行号排序后统一写 log、汇总统计
        results_by_i: dict[int, tuple[dict[str, int], dict[str, Any] | None, str]] = {}
        with ThreadPoolExecutor(max_workers=args.workers) as executor:
            futures = {executor.submit(_process_one_row, i, kw, ec, en, opts): i for i, kw, ec, en in rows_to_run}
            for fut in as_completed(futures):
                i = futures[fut]
                try:
                    _i, delta, log_data, msg = fut.result()
                    results_by_i[_i] = (delta, log_data, msg)
                except Exception as e:
                    results_by_i[i] = ({"not_in_list": 1}, {"not_in_list": True, "keywords": "", "expected_code": "", "expected_name": ""}, f"[{i+1}] 异常: {e}")
        for i in sorted(results_by_i.keys()):
            delta, log_data, msg = results_by_i[i]
            for k in stats:
                stats[k] += delta.get(k, 0)
            print(msg)
            if log_file and log_data:
                if log_data.get("not_in_list"):
                    log_file.write("---\n")
                    log_file.write(f"keywords: {log_data.get('keywords', '')}\n")
                    log_file.write(f"expected_code: {log_data.get('expected_code') or '(未填)'}\n")
                    log_file.write(f"expected_name: {log_data.get('expected_name') or '(未填)'}\n")
                    log_file.write("candidates(0): 不在万鼎 list\n")
                    log_file.write("list_contains: 否\n")
                    log_file.write("llm_selection: -\n")
                    log_file.write("llm_correct: -\n")
                    log_file.flush()
                else:
                    _write_log_case(log_file, log_data["keywords"], log_data["expected_code"], log_data["expected_name"], log_data["candidates"], log_data["contained"], log_data["llm_selection"], log_data["llm_correct"], log_data["no_llm"])

    print("\n--- 统计（仅名称+code，不校验价格）---")
    print(json.dumps(stats, ensure_ascii=False, indent=2))
    # 估算 token：仅「多候选且调了 LLM」的行计一次（llm_ok + llm_wrong）
    n_llm_calls = stats["llm_ok"] + stats["llm_wrong"]
    if n_llm_calls > 0:
        est_input = n_llm_calls * 1100   # 每轮约 system+prompt(业务知识+候选列表) 1100 token
        est_output = n_llm_calls * 80    # 每轮约 JSON 回复 80 token
        print(f"# 预估 token：LLM 调用 {n_llm_calls} 次，约 {est_input} 输入 + {est_output} 输出 ≈ {est_input + est_output} total")
    log_file.close()
    print(f"Log 已追加到: {log_path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
