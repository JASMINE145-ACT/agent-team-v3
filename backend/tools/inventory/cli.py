"""
库存查询 CLI：启动后输入自然语言，得到查询结果。

运行方式（在 Agent Team 目录下，或 PYTHONPATH 含 Agent Team）：
  python -m inventory_agent.cli
  或：cd "Agent Team" && python run_inventory_agent.py

ReAct 模式（思考→工具→观察，与 quotation_tracker 一致）：
  设置环境变量 USE_REACT_AGENT=1 后启动，则 query() 走 run_inventory_agent。
  同时输出执行追踪（trace_text），便于调试。
"""

import os
import sys


def _check_env():
    from backend.tools.inventory.config import config
    # ReAct 首轮即调 LLM，缺 Key 会 401
    llm_key = (getattr(config, "LLM_API_KEY", None) or os.getenv("OPENAI_API_KEY") or os.getenv("ZHIPU_API_KEY") or "").strip()
    if not llm_key:
        print("警告: 未设置 LLM API Key（OPENAI_API_KEY 或 ZHIPU_API_KEY），ReAct 调用会 401。", file=sys.stderr)
        print("可在 Agent Team 或 quotation_tracker 目录下 .env 中配置，或复制 quotation_tracker/.env.example。", file=sys.stderr)
    # 工具 search_inventory / get_inventory_by_code 需要 AOL
    aol_required = ("AOL_ACCESS_TOKEN", "AOL_SIGNATURE_SECRET", "AOL_DATABASE_ID")
    aol_missing = [k for k in aol_required if not os.getenv(k)]
    if aol_missing:
        print("提示: 以下环境变量未设置，调用库存表 API 时会失败:", ", ".join(aol_missing), file=sys.stderr)
        print("  .env 中配置 AOL_* 后，search_inventory / get_inventory_by_code 才能返回真实库存。", file=sys.stderr)


def main():
    # 独立运行：以 Agent Team 为根（inventory_agent 的父目录）；src 已复制到项目根
    root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    if root not in sys.path:
        sys.path.insert(0, root)

    _check_env()

    from inventory_agent import InventoryAgent, USE_REACT_AGENT

    agent = InventoryAgent()
    mode = "ReAct（思考→工具→观察）" if USE_REACT_AGENT else "Pipeline（Plan→Table→SQL）"
    print("库存查询 CLI 已启动。输入自然语言查询（如：8030020580 库存、Tee With Cover dn40），空行或 exit 退出。")
    print("当前模式:", mode, "\n")

    # ReAct 下首次 search_inventory 会初始化 Resolver（含向量）和 TableAgent，合计可能 60s+，易触发 35s 工具超时；启动时预热
    if USE_REACT_AGENT:
        try:
            from backend.tools.inventory.services.inventory_agent_tools import _get_table_agent, _get_resolver
            print("正在预热 Resolver 与库存 API（首次约 1 分钟）…", flush=True)
            _get_table_agent()
            _get_resolver()
            print("预热完成。\n", flush=True)
        except Exception as e:
            print("预热失败（首次查询可能较慢或超时）:", e, flush=True)
            print()

    def _on_step(step_type: str, data):
        if step_type == "llm_start":
            info = data or {}
            step_num = info.get("step", 1)
            print(f"\n  [步骤 {step_num}] 正在调用 LLM…", flush=True)
        elif step_type == "thinking":
            text = (data or "").strip()
            if text:
                print("  【思考】", flush=True)
                for line in text.splitlines():
                    print("    ", line, flush=True)
        elif step_type == "tool_call":
            info = data or {}
            name = info.get("name", "")
            args = info.get("arguments", {})
            print("  【工具调用】", name, flush=True)
            if args:
                for k, v in args.items():
                    print(f"    {k}: {v!r}", flush=True)
        elif step_type == "observation":
            text = (data or "").strip()
            if text:
                print("  【观察】", flush=True)
                for line in text.splitlines():
                    print("    ", line, flush=True)
        elif step_type == "answer":
            pass  # 最后统一打印

    while True:
        try:
            line = input("> ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\n再见。")
            break
        if not line or line.lower() in ("exit", "quit", "q"):
            print("再见。")
            break
        try:
            if USE_REACT_AGENT:
                from backend.tools.inventory.services.agent_runner import run_inventory_agent
                result = run_inventory_agent(line, on_step=_on_step)
                if result.get("error"):
                    print("\n【回答】", result.get("answer", "") or f"查询出错: {result['error']}", flush=True)
                else:
                    print("\n【回答】", (result.get("answer") or "").strip() or "未返回结果。", flush=True)
                if result.get("trace_text"):
                    print("\n" + result["trace_text"], flush=True)
            else:
                result = agent.query(line, on_step=None)
                print("\n【回答】", result, flush=True)
        except Exception as e:
            print(f"查询出错: {e}", file=sys.stderr)
        print()


if __name__ == "__main__":
    main()
