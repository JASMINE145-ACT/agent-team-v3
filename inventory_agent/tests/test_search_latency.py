"""
分步计时测试：定位 search_inventory 超时的具体环节（抓取表数据 / Resolver / AOL list&detail）。

运行方式（在 Agent Team 目录下，保证能 import src）：
  cd "Agent Team"
  python -m inventory_agent.tests.test_search_latency

或：
  python run_inventory_agent.py   # 先确保能跑
  python -m inventory_agent.tests.test_search_latency
"""

import sys
import time
from pathlib import Path

# 与 run_inventory_agent 一致，确保能 import inventory_agent 和 src
_agent_team = Path(__file__).resolve().parent.parent.parent
if str(_agent_team) not in sys.path:
    sys.path.insert(0, str(_agent_team))
_data_platform = _agent_team.parent / "opencode_agent" / "external_services" / "data_platform"
if _data_platform.exists() and str(_data_platform) not in sys.path:
    sys.path.insert(0, str(_data_platform))

def _sec(t0: float) -> float:
    return round(time.perf_counter() - t0, 2)

def run():
    keywords = "Tee With Cover dn40"
    print("=" * 60)
    print("search_inventory 各环节耗时测试")
    print(f"关键词: {keywords}")
    print("=" * 60)

    # --- 1. 仅加载本地 Excel（Resolver 的「表」）---
    print("\n[1] 加载本地 item-list-slim 表（Excel）")
    t0 = time.perf_counter()
    try:
        from inventory_agent.config import config
        path = (config.ITEM_LIST_SLIM_PATH or "").strip()
        if path and Path(path).is_file():
            import pandas as pd
            df = pd.read_excel(path, sheet_name=0)
            elapsed = _sec(t0)
            print(f"    耗时: {elapsed}s, 行数: {len(df)}")
        else:
            print(f"    跳过: 表不存在或未配置 path={path!r}")
    except Exception as e:
        print(f"    失败: {e}")
        import traceback
        traceback.print_exc()

    # --- 2. Resolver 完整初始化（表 + 向量缓存/建库）---
    print("\n[2] Resolver 初始化（表 + 向量缓存或建库）")
    t0 = time.perf_counter()
    resolver = None
    try:
        from inventory_agent.services.resolver import ItemResolver
        resolver = ItemResolver()
        elapsed = _sec(t0)
        print(f"    耗时: {elapsed}s, 可用: {resolver.is_available() if resolver else False}")
    except Exception as e:
        print(f"    失败: {e}")
        import traceback
        traceback.print_exc()

    # --- 3. Resolver 解析关键词 -> Item Code---
    print("\n[3] Resolver 解析关键词 -> Item Code（resolve_phrases）")
    t0 = time.perf_counter()
    all_codes = []
    if resolver and resolver.is_available():
        try:
            phrase_to_codes = resolver.resolve_phrases([keywords], phrase_specs=None)
            all_codes = list(dict.fromkeys(c for _, codes in phrase_to_codes for c in codes))
            elapsed = _sec(t0)
            print(f"    耗时: {elapsed}s, 解析到 codes: {all_codes[:5]}{'...' if len(all_codes) > 5 else ''}")
        except Exception as e:
            print(f"    失败: {e}")
    else:
        print("    跳过: Resolver 不可用")

    # --- 4. TableAgent 初始化（含 AOL 客户端）---
    print("\n[4] TableAgent 初始化（AOL 客户端）")
    t0 = time.perf_counter()
    table = None
    try:
        from inventory_agent.agents.table_agent import InventoryTableAgent
        table = InventoryTableAgent()
        elapsed = _sec(t0)
        print(f"    耗时: {elapsed}s")
    except Exception as e:
        print(f"    失败: {e}")
        import traceback
        traceback.print_exc()
        print("\n后续 AOL 抓表步骤将跳过（需配置 AOL_* 与 src）")
        return

    # --- 5. 抓取表数据：list.do（按关键词）---
    print("\n[5] 抓取表数据 - list.do（按关键词）")
    t0 = time.perf_counter()
    list_rows = []
    try:
        list_rows = table._call_list_api(keywords=keywords)
        elapsed = _sec(t0)
        print(f"    耗时: {elapsed}s, 返回行数: {len(list_rows)}")
        if list_rows:
            print(f"    首行 id: {list_rows[0].get('id')}, no: {list_rows[0].get('no')}")
    except Exception as e:
        print(f"    失败: {e}")
        import traceback
        traceback.print_exc()

    # --- 6. 抓取表数据：detail.do（单条）---
    if list_rows:
        print("\n[6] 抓取表数据 - detail.do（单条）")
        t0 = time.perf_counter()
        try:
            first_id = list_rows[0].get("id")
            if first_id is not None:
                detail = table._call_detail_api(str(first_id))
                elapsed = _sec(t0)
                print(f"    耗时: {elapsed}s, 有数据: {bool(detail)}")
            else:
                print("    跳过: 首行无 id")
        except Exception as e:
            print(f"    失败: {e}")
            import traceback
            traceback.print_exc()

        # --- 6b. 再拉 1 条 detail（模拟 2 条）---
        if len(list_rows) >= 2:
            print("\n[6b] 抓取表数据 - detail.do（第二条）")
            t0 = time.perf_counter()
            try:
                second_id = list_rows[1].get("id")
                if second_id is not None:
                    table._call_detail_api(str(second_id))
                    elapsed = _sec(t0)
                    print(f"    耗时: {elapsed}s")
            except Exception as e:
                print(f"    失败: {e}")

    # --- 7. 按 code 抓取：list.do + detail.do（若 Resolver 有 code）---
    if all_codes and table:
        code = all_codes[0]
        print(f"\n[7] 按 Code 抓取 - list.do(filter.no={code})")
        t0 = time.perf_counter()
        try:
            by_code_rows = table._call_list_api(item_code=code)
            elapsed = _sec(t0)
            print(f"    耗时: {elapsed}s, 行数: {len(by_code_rows)}")
            if by_code_rows:
                print("\n[7b] 按 Code 抓取 - detail.do（该 code 第一条）")
                t0 = time.perf_counter()
                table._fetch_item_by_id(str(by_code_rows[0].get("id")))
                print(f"    耗时: {_sec(t0)}s")
        except Exception as e:
            print(f"    失败: {e}")

    # --- 8. 整条 search_inventory 流程（带总耗时）---
    print("\n[8] 整条 search_inventory 流程（工具内逻辑，无 35s 外壳）")
    t0 = time.perf_counter()
    try:
        from inventory_agent.services import inventory_agent_tools
        # 直接调 impl，不包 35s 超时
        out = inventory_agent_tools._execute_inventory_tool_impl("search_inventory", {"keywords": keywords})
        elapsed = _sec(t0)
        ok = out.get("success", False)
        err = out.get("error", "")
        print(f"    总耗时: {elapsed}s, success: {ok}" + (f", error: {err}" if err else ""))
        if ok and out.get("result"):
            preview = (out["result"] or "")[:200]
            print(f"    结果预览: {preview}...")
    except Exception as e:
        print(f"    失败: {e}")
        import traceback
        traceback.print_exc()

    print("\n" + "=" * 60)
    print("结论: 若 [5]/[6]/[7] 单步接近 10s 或更高，说明「抓取表数据」AOL 接口慢或超时；")
    print("      若 [2] 或 [3] 很长，说明 Resolver 表/向量 是瓶颈。")
    print("=" * 60)


if __name__ == "__main__":
    run()
