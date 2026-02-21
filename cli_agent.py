# -*- coding: utf-8 -*-
"""
Single Agent CLI (v3) — 交互式对话 + ReAct 完整展示

用法：
  python cli_agent.py

从 Agent Team version3 目录运行，或从仓库根目录：
  python "Agent Team version3/cli_agent.py"

内置命令：
  /help              显示帮助
  /file <路径>       设置报价单文件路径（询价填充/无货登记用）
  /clear             清除当前 file_path
  /exit              退出
"""

import asyncio
import json
import os
import sys
import uuid
from pathlib import Path
from typing import Optional

# ── 路径设置 ──────────────────────────────────────────────────────────────────
v3_root = Path(__file__).resolve().parent
if str(v3_root) not in sys.path:
    sys.path.insert(0, str(v3_root))
os.chdir(v3_root)

# ── Windows VT100 颜色支持 ────────────────────────────────────────────────────
if sys.platform == "win32":
    os.system("")

# ── ANSI 颜色 ─────────────────────────────────────────────────────────────────
class C:
    RESET   = "\033[0m"
    BOLD   = "\033[1m"
    DIM    = "\033[2m"
    WHITE  = "\033[97m"
    CYAN   = "\033[96m"
    YELLOW = "\033[93m"
    GREEN  = "\033[92m"
    RED    = "\033[91m"
    BLUE   = "\033[94m"
    MAGENTA = "\033[95m"
    GRAY   = "\033[90m"

W = 72

def _line(char="─"):
    print(C.GRAY + char * W + C.RESET)

def _header(title: str, char="━"):
    pad = max(0, W - len(title) - 2)
    left = pad // 2
    right = pad - left
    print(C.CYAN + C.BOLD + char * left + f" {title} " + char * right + C.RESET)

def _section(label: str, color: str = C.YELLOW):
    print(f"\n{color}{C.BOLD} ▸ {label}{C.RESET}")

def _indent(text: str, prefix: str = "   ", max_chars: int = 600, max_line: int = 120):
    if not text:
        return
    text = str(text)
    if len(text) > max_chars:
        text = text[:max_chars] + C.GRAY + "…（已截断）" + C.RESET
    for line in text.splitlines():
        if max_line and len(line) > max_line:
            line = line[:max_line] + C.GRAY + "…" + C.RESET
        print(prefix + line)

def _kv(key: str, value, max_val: int = 300):
    v = str(value)
    if len(v) > max_val:
        v = v[:max_val] + C.GRAY + "…" + C.RESET
    print(f"   {C.DIM}{key:<12}{C.RESET} {v}")

def _print_trace(trace: list):
    if not trace:
        print(C.GRAY + "   (无 trace)" + C.RESET)
        return
    current_step = None
    for entry in trace:
        step = entry.get("step", "?")
        etype = entry.get("type", "")
        if step != current_step:
            current_step = step
            _line()
            print(f"{C.GRAY} Step {step}{C.RESET}")
        if etype == "thinking":
            _section("THOUGHT", C.BLUE)
            _indent(entry.get("content", ""), max_chars=800)
        elif etype == "tool_call":
            name = entry.get("name", "")
            args = entry.get("arguments", {})
            _section(f"TOOL CALL  →  {C.CYAN}{name}{C.RESET}", C.YELLOW)
            for k, v in (args or {}).items():
                _kv(k, v)
        elif etype == "observation":
            _section("OBSERVATION", C.MAGENTA)
            raw = entry.get("content", "")
            try:
                obj = json.loads(raw.rstrip("..."))
                pretty = json.dumps(obj, ensure_ascii=False, indent=2)
                _indent(pretty, max_chars=700)
            except Exception:
                _indent(raw, max_chars=700)
        elif etype == "response":
            _section("RESPONSE（直接回复，未调用工具）", C.CYAN)
            _indent(entry.get("content", ""), max_chars=12000, max_line=200)

def _print_answer(answer: str, needs_clarification: bool, questions: Optional[list]):
    _line("═")
    if needs_clarification and questions:
        _section("CLARIFICATION NEEDED", C.RED)
        for q in questions:
            print(f"   {C.RED}?{C.RESET} {q}")
    else:
        _section("ANSWER", C.GREEN)
        if answer:
            for line in answer.splitlines():
                print(f"   {line}")
        else:
            print(C.GRAY + "   (无回答)" + C.RESET)
    _line("═")

def _print_error(msg: str):
    print(f"\n{C.RED} ERROR: {msg}{C.RESET}\n")

def _show_help():
    print(f"""
{C.CYAN}{C.BOLD}Single Agent CLI (v3) 帮助{C.RESET}

  单主 Agent 掌握全部技能（库存、万鼎价格、无货、报价单、询价填充），直接选用工具完成意图。

{C.YELLOW}内置命令：{C.RESET}
  /help              显示本帮助
  /file <路径>       设置报价单 Excel 路径（用于询价填充 / 无货登记）
  /clear             清除已设置的 file_path
  /exit  /quit       退出

{C.YELLOW}示例查询：{C.RESET}
  pvc dn20 万鼎所有价格
  25管卡 库存
  无货列表
  /file D:\\报价单.xlsx → 然后输入: 询价填充
""")


def main():
    print()
    _header("Single Agent CLI (v3) — ReAct 完整展示", "═")
    print(f"{C.DIM}  输入 /help 查看命令  |  Ctrl+C 退出{C.RESET}\n")

    try:
        from backend.config import Config
        from backend.agent import SingleAgent
    except Exception as e:
        _print_error(f"导入失败: {e}")
        sys.exit(1)

    try:
        agent = SingleAgent(
            api_key=Config.OPENAI_API_KEY,
            base_url=Config.OPENAI_BASE_URL,
            model=Config.LLM_MODEL,
        )
    except Exception as e:
        _print_error(f"初始化失败: {e}")
        sys.exit(1)

    print(C.DIM + f"初始化 Single Agent（模型: {Config.LLM_MODEL}）..." + C.RESET)
    print(C.GREEN + "  Agent 就绪。\n" + C.RESET)

    SESSION_ID = str(uuid.uuid4())
    file_path: Optional[str] = None
    session_dir = getattr(Config, "SESSION_STORE_DIR", v3_root / "data" / "sessions")
    print(C.DIM + f"  会话 ID: {SESSION_ID[:8]}…  (历史: {session_dir}/)" + C.RESET + "\n")

    while True:
        try:
            prefix = ""
            if file_path:
                prefix = f"{C.CYAN}[{Path(file_path).name}]{C.RESET} "
            user_input = input(f"{prefix}{C.GREEN}>{C.RESET} ").strip()
        except (KeyboardInterrupt, EOFError):
            print(f"\n{C.DIM}再见。{C.RESET}")
            break

        if not user_input:
            continue

        if user_input.lower() in ("/exit", "/quit"):
            print(C.DIM + "再见。" + C.RESET)
            break

        if user_input.lower() == "/help":
            _show_help()
            continue

        if user_input.lower().startswith("/file") or user_input.lower().startswith("/upload"):
            parts = user_input.split(maxsplit=1)
            if len(parts) < 2 or not parts[1].strip():
                print(C.RED + "  用法: /file <文件路径>" + C.RESET)
            else:
                p = parts[1].strip().strip('"').strip("'")
                if Path(p).exists():
                    file_path = str(Path(p).resolve())
                    print(C.GREEN + f"  已设置 file_path: {file_path}" + C.RESET)
                else:
                    print(C.RED + f"  文件不存在: {p}" + C.RESET)
            continue

        if user_input.lower() == "/clear":
            file_path = None
            print(C.DIM + "  已清除 file_path。" + C.RESET)
            continue

        # 业务知识「记住」命令：你要记住 / 请记住 等 → 追加到 MD，直接回复
        try:
            from backend.agent.remember import try_handle_remember
            remember_reply = try_handle_remember(user_input)
        except Exception:
            remember_reply = None
        if remember_reply is not None:
            _header("记住", "─")
            _section("ANSWER", C.GREEN)
            _indent(remember_reply)
            print()
            continue

        context = {}
        if file_path:
            context["file_path"] = file_path
            context["file_name"] = Path(file_path).name

        print()
        _header(f"ReAct  —  {user_input[:50]}", "─")

        try:
            _section("ANSWER（流式）", C.GREEN)
            print("   ", end="", flush=True)

            def _on_token(tok: str):
                print(tok, end="", flush=True)

            def _on_tool_calls_ready(total: int):
                if total > 1:
                    print(f"\n   {C.DIM}(收到 {total} 个工具调用，正在执行…){C.RESET}", flush=True)

            def _on_tool_start(name: str, index: int, total: int):
                if total > 1:
                    print(f"   {C.DIM}[{index}/{total}] 执行 {name}…{C.RESET}", flush=True)

            def _on_event(event_type: str, payload: dict):
                if event_type == "loop_start":
                    print(f"   {C.DIM}[轮次开始]{C.RESET}\n   ", end="", flush=True)
                elif event_type == "loop_end":
                    print(f"\n   {C.DIM}[轮次结束]{C.RESET}", flush=True)
                elif event_type == "loop_error":
                    print(f"\n   {C.RED}[轮次错误] {payload.get('error', '')}{C.RESET}", flush=True)

            result = asyncio.run(
                agent.execute_react(
                    user_input,
                    context=context,
                    session_id=SESSION_ID,
                    on_token=_on_token,
                    on_tool_start=_on_tool_start,
                    on_tool_calls_ready=_on_tool_calls_ready,
                    on_event=_on_event,
                )
            )
            print()
        except KeyboardInterrupt:
            print(f"\n{C.YELLOW}  已中断。{C.RESET}\n")
            continue
        except Exception as e:
            _print_error(str(e))
            continue

        trace = result.get("trace") or []
        if trace:
            _print_trace(trace)
        else:
            _line()
            print(C.GRAY + "  (无 ReAct trace)" + C.RESET)

        if result.get("needs_clarification"):
            _print_answer(
                result.get("answer", ""),
                True,
                result.get("clarification_questions"),
            )
        if result.get("error"):
            _print_error(result["error"])
        print()

if __name__ == "__main__":
    main()
