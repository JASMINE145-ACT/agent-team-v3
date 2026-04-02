# 库存 Agent 运行器：统一路径，内部调用 SingleAgent（共享 skills.py）
# 与 quotation run_quotation_agent 返回契约对齐
from __future__ import annotations

import asyncio
import json
import logging
from typing import Any, Callable

from backend.tools.inventory.services.execution_tracer import ExecutionTracer

logger = logging.getLogger(__name__)


def _adapt_steps_from_trace(trace: list[dict]) -> list[dict]:
    """将 SingleAgent 的 trace 格式适配为旧版 run_inventory_agent 的 steps 格式。

    旧 ExecutionTracer 格式（与 test_trace.py、test_modify_inventory_llm.py 兼容）：
      thinking:   {"type": "thinking",   "content": "..."}
      tool_call:  {"type": "tool_call",  "content": {"name": "...", "arguments": {...}}}
      observation:{"type": "observation","content": "..."}
      answer:     {"type": "answer",     "content": "..."}

    CoreAgent trace 格式（需要适配）：
      thinking:   {"type": "thinking",   "content": "..."}              → 直接映射
      tool_call:  {"type": "tool_call",  "name": "...", "arguments": {...}} → content = {name, arguments}
      observation:{"type": "observation","content": "..."}              → 直接映射
      response:   {"type": "response",   "content": "..."}              → 映射为 answer
    """
    steps = []
    for entry in trace:
        etype = entry.get("type", "")
        if etype == "thinking":
            steps.append({"type": "thinking", "content": entry.get("content", "")})
        elif etype == "tool_call":
            steps.append({
                "type": "tool_call",
                "content": {
                    "name": entry.get("name", ""),
                    "arguments": entry.get("arguments", {}),
                },
            })
        elif etype == "observation":
            steps.append({"type": "observation", "content": entry.get("content", "")})
        elif etype == "response":
            steps.append({"type": "answer", "content": entry.get("content", "")})
        elif etype == "fallback":
            # 非关键事件，跳过
            pass
    return steps


def _adapt_on_event(on_step: Callable | None, tracer: ExecutionTracer):
    """将 SingleAgent 的 on_event 回调适配为旧版 run_inventory_agent 的 on_step 回调。

    SingleAgent on_event 格式:
      event_type = "agent", payload = {"stream": "tool"|"token", "ts": ..., "data": {...}}
      event_type = "loop_start"|"loop_end", payload = {...}

    on_step 格式:
      "llm_start"|"thinking"|"tool_call"|"observation"|"answer", data = ...
    """
    if on_step is None:
        return None

    def adapt(event_type: str, payload: dict | None = None) -> None:
        if event_type == "agent":
            stream = (payload or {}).get("stream", "")
            data = (payload or {}).get("data", {})
            if stream == "tool":
                phase = data.get("phase", "")
                name = data.get("name", "")
                if phase == "start":
                    on_step("llm_start", {"step": 1})  # step 信息在 trace 中
                    on_step("tool_call", {"name": name, "arguments": data.get("args", {})})
                    tracer.add(1, "tool_call", {"name": name, "arguments": data.get("args", {})})
                elif phase == "result":
                    result = data.get("result", "")
                    on_step("observation", result)
                    tracer.add(1, "observation", result)
        elif event_type in ("loop_start", "loop_end"):
            # 非关键事件，不转发
            pass

    return adapt


def run_inventory_agent(
    user_query: str,
    max_steps: int = 6,
    on_step: Callable[[str, Any], None] | None = None,
) -> dict[str, Any]:
    """
    ReAct 流程（统一路径）：内部调用 SingleAgent，共享 skills.py 作为唯一 prompt 来源。
    on_step: 可选回调 (step_type, data)，用于 CLI 实时展示。
    step_type 为 "llm_start"|"thinking"|"tool_call"|"observation"|"answer"。
    返回契约（与 quotation run_quotation_agent 对齐）：answer, thinking, steps, trace, trace_text, error。
    """
    # 创建 tracer（用于 trace_text 生成）
    tracer = ExecutionTracer()

    # 适配 on_step 回调
    adapt_event = _adapt_on_event(on_step, tracer)

    # 创建 SingleAgent（使用 LocalPromptProvider → skills.py）
    from backend.agent.agent import SingleAgent
    agent = SingleAgent()

    # 同步调用 async execute_react
    try:
        loop = asyncio.get_event_loop_policy().get_event_loop()
        if loop.is_closed():
            raise RuntimeError("event loop is closed")
    except RuntimeError:
        loop = asyncio.new_event_loop()
        asyncio.get_event_loop_policy().set_event_loop(loop)

    try:
        core_result = loop.run_until_complete(
            agent.execute_react(
                user_input=user_query.strip(),
                max_steps=max_steps,
                on_event=adapt_event,
            )
        )
    except Exception as e:
        logger.exception("SingleAgent.execute_react 失败")
        return {
            "answer": "",
            "thinking": None,
            "steps": [],
            "trace": tracer.to_dict(),
            "trace_text": tracer.format_text(),
            "error": str(e),
        }

    trace_list = core_result.get("trace", [])
    adapted_steps = _adapt_steps_from_trace(trace_list)
    # 适配返回契约 → 与原 caller 兼容
    return {
        "answer": core_result.get("answer", ""),
        "thinking": core_result.get("thinking"),
        "steps": adapted_steps,
        # test_trace.py 等依赖 result["trace"]["steps"] 和 result["trace"]["duration"]
        "trace": {"steps": adapted_steps, "duration": core_result.get("duration", 0.0)},
        "trace_text": _format_trace_text(trace_list),
        "error": core_result.get("error"),
    }


def _format_trace_text(trace: list[dict]) -> str:
    """将 trace 格式化为可读文本，与旧版 tracer.format_text() 对齐。"""
    lines = []
    current_step = None
    for entry in trace:
        step = entry.get("step", "?")
        if step != current_step:
            current_step = step
            lines.append(f"--- Step {step} ---")
        etype = entry.get("type", "")
        if etype == "thinking":
            lines.append(f"  [think] {entry.get('content', '')}")
        elif etype == "tool_call":
            args = entry.get("arguments", {})
            args_str = json.dumps(args, ensure_ascii=False)[:200]
            lines.append(f"  [call] {entry.get('name', '')}({args_str})")
        elif etype == "observation":
            obs = str(entry.get("content", ""))[:300]
            lines.append(f"  [obs]  {obs}")
        elif etype == "response":
            lines.append(f"  [ans]  {entry.get('content', '')}")
        elif etype == "fallback":
            lines.append(f"  [fallback] {entry.get('model', '')}")
    return "\n".join(lines)
