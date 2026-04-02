"""
Ralph Loop Step B/C — 深度验证脚本：打印完整 ReAct trace，含 tool_calls / thinking / step 数。
输出至 stdout，供每轮审查。

用法（在 version3 根目录）：
  py -3 debug_anthropic_trace.py
"""
import asyncio
import json
import sys
from pathlib import Path

_root = Path(__file__).resolve().parent
sys.path.insert(0, str(_root))


def _main():
    import sys
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

    from backend.agent.session import SessionStore
    from backend.config import Config
    from backend.core.agent import CoreAgent
    from backend.plugins.jagent.extension import JAgentExtension

    proto = getattr(Config, "PRIMARY_LLM_PROTOCOL", "")
    print(f"\n=== Config 链路诊断 ===")
    print(f"  PRIMARY_LLM_PROTOCOL = {proto!r}")
    print(f"  ANTHROPIC_BASE_URL = {getattr(Config, 'ANTHROPIC_BASE_URL', None)!r}")
    print(f"  ANTHROPIC_API_KEY  = {(str(getattr(Config, 'ANTHROPIC_API_KEY', '') or '')[:12] + '...')!r}")
    print(f"  LLM_MODEL         = {Config.LLM_MODEL!r}")
    print(f"  FALLBACK_MODEL    = {getattr(Config, 'FALLBACK_LLM_MODEL', None)!r}")
    print()

    exts = [JAgentExtension()]
    store = SessionStore(persist_dir=None)
    agent = CoreAgent(
        api_key=Config.OPENAI_API_KEY or "dummy",
        base_url=Config.OPENAI_BASE_URL or "",
        model=Config.LLM_MODEL,
        extensions=exts,
        session_store=store,
    )

    print(f"=== CoreAgent 主链路诊断 ===")
    print(f"  agent._llm_protocol = {getattr(agent, '_llm_protocol', None)!r}")
    print(f"  agent._anthropic    = {agent._anthropic!r}")
    print(f"  agent.client        = {agent.client!r}")
    print(f"  agent.model         = {agent.model!r}")
    print()

    # system prompt
    sp = agent._system_prompt
    print(f"=== System Prompt（前 800 字）===")
    print(sp[:800])
    print()

    # 工具定义
    defs = agent._registry.get_definitions()
    tool_names = [d["function"]["name"] for d in defs if isinstance(d, dict)]
    print(f"=== 已注册工具（共 {len(tool_names)} 个）===")
    for n in sorted(tool_names):
        print(f"  - {n}")
    print()

    # ReAct 场景
    SCENARIOS = [
        ("DN50直通价格", "查一下 DN50 直通的价格，只要有货的，只回复简要结果"),
        ("无货登记", "登记一个无货：PVC球阀 DN80，请尽快备货"),
        ("模糊匹配", "有没有 25口径的三通？报价"),
    ]

    for label, query in SCENARIOS:
        print(f"\n{'='*60}")
        print(f"场景：{label}")
        print(f"Query: {query}")
        print()
        sid = f"test:ralph-{label[:8]}"
        out = asyncio.get_event_loop().run_until_complete(
            agent.execute_react(user_input=query, context={}, max_steps=8, session_id=sid)
        )
        # 手动 patch _blocks_to_content_and_tool_calls 来打印每次调用
        import backend.core.anthropic_react_llm as arllm
        _orig = arllm._blocks_to_content_and_tool_calls
        def _patched(content):
            result = _orig(content)
            import sys
            print(f"    [_blocks_to_content] type={type(content).__name__} content={str(content)[:100]!r} => tool_calls={len(result[1])}", file=sys.stderr)
            return result
        arllm._blocks_to_content_and_tool_calls = _patched
        out2 = asyncio.get_event_loop().run_until_complete(
            agent.execute_react(user_input=query, context={}, max_steps=8, session_id=sid)
        )
        arllm._blocks_to_content_and_tool_calls = _orig
        out = out2
        print(f"  error       : {out.get('error')!r}")
        print(f"  answer(前200): {(out.get('answer') or '')[:200]!r}")
        trace = out.get("trace") or []
        print(f"  trace 共    : {len(trace)} 步")
        thinking_count = sum(1 for t in trace if isinstance(t, dict) and t.get("type") == "thinking")
        response_count = sum(1 for t in trace if isinstance(t, dict) and t.get("type") == "response")
        tool_call_count = sum(1 for t in trace if isinstance(t, dict) and t.get("type") == "tool_call")
        fallback_count  = sum(1 for t in trace if isinstance(t, dict) and t.get("type") == "fallback")
        print(f"    thinking  : {thinking_count}")
        print(f"    response   : {response_count}")
        print(f"    tool_call : {tool_call_count}")
        print(f"    fallback  : {fallback_count}")
        for t in trace:
            if isinstance(t, dict):
                tt = t.get("type")
                if tt == "tool_call":
                    print(f"      → {t.get('name')} args={str(t.get('arguments', {}))[:80]}")
                elif tt in ("response", "thinking"):
                    content = str(t.get("content", ""))[:100]
                    print(f"      [{tt}] {content!r}")
        print()


if __name__ == "__main__":
    _main()
