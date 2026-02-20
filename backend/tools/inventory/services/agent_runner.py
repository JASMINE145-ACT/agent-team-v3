# 库存 Agent 运行器：ReAct 范式（思考 → 工具 → 观察 → 继续），与 quotation_tracker 一致
from __future__ import annotations

import json
import logging
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import Any, Callable

from backend.tools.inventory.config import config
from backend.tools.inventory.services.inventory_agent_tools import (
    get_inventory_tools_openai_format,
    execute_inventory_tool,
)
from backend.tools.inventory.services.execution_tracer import ExecutionTracer

logger = logging.getLogger(__name__)

ZHIPU_BASE = "https://open.bigmodel.cn/api/paas/v4"


def _client_and_model():
    try:
        from openai import OpenAI
    except ImportError:
        raise ImportError("pip install openai")
    api_key = config.LLM_API_KEY or ""
    base_url = config.LLM_BASE_URL or ZHIPU_BASE
    model = config.LLM_MODEL or "glm-4-flash"
    if (not base_url or base_url == "https://api.openai.com/v1") and "glm" in (model or "").lower():
        base_url = ZHIPU_BASE
    return OpenAI(api_key=api_key, base_url=base_url), model


def _system_prompt() -> str:
    return """你是库存查询助手，流程如下。

**1. 用户输入**
例如：「我要查询 pvc dn20」→ 先输出：
<think>
目标: 查询 pvc dn20 库存
已知: 用户提供了产品规格 pvc dn20，无 Item Code
行动: 调用 search_inventory(keywords="pvc dn20")
</think>

**2. 调用工具**  
- **有 code**（如 10 位物料编号 8030020580）：一律用 get_inventory_by_code(code)，直接按 code 查表，不走关键词/Resolver。
- **按名称/规格查**：用 search_inventory(keywords)，keywords 填用户要查的产品或规格（如 pvc dn20、Tee With Cover dn40）。
- **仅查价格/客户价（用户未提库存）**：只调用 match_wanding_price(keywords, customer_level?)。若返回 needs_selection，同样调用 select_wanding_match 确定产品后再给出价格，但**不要**调用 get_inventory_by_code，回答里**不要**包含库存/可售。
- **用户要「所有客户价 / 各档价格 / A B C D 档」**：对同一 keywords 分别调用 match_wanding_price(keywords, customer_level="A")、customer_level="B"、"C"、"D" 共四次（或同轮多 tool_call），汇总成表格列出 客户级别 | 客户价，不要只返回一档。
- **询价填充**（需物料编号+单价+库存）：① 先用 match_wanding_price(keywords) 在万鼎价格库匹配。若 observation 为 single 或未匹配，按结果继续；② 若 observation 为 needs_selection（含 candidates 数组），必须再调用 select_wanding_match(keywords, candidates) 由 LLM 选 1 个；③ 得到 code 后用 get_inventory_by_code(code) 查库存。

**3. 观察 (observation)**  
工具会返回 1 条或多条候选（库存与可售数量）。你不要在侧做筛选或提取 codes，只根据 observation 内容理解候选即可。

**3a. match_wanding_price 返回 needs_selection 时**  
若 observation 为 JSON 且含 needs_selection: true 和 candidates 数组，必须立即调用 select_wanding_match(keywords=<原关键词>, candidates=<observation 中的 candidates>) 进行选择，拿到 code 后再查库存。

**4. 最终回答**  
- **用户只问了价格/客户价**：回答中只给价格信息，不要写库存/可售。若用户要「所有客户价」，必须列出 A/B/C/D 四档价格表。
- **用户问了库存或询价填充**：拿到 observation 后在最后一轮**全部列出**所有候选：若只有 1 条则说明该产品与库存/可售；若有多条则「共 N 条候选」并逐条列出品名、库存、可售。

**5. 多产品并行查询**
若用户一次问多个产品（如「查 dn20、dn25、dn32、dn40 的库存」）：对每个分别调用 search_inventory 或 get_inventory_by_code，同一轮发出多个 tool_call 会并行执行，最后汇总全部结果列出。

**格式要求（重要）**
每一轮回复都必须先输出 <think>...</think> 思考块，再输出 tool call 或最终回答。思考块固定三行：
<think>
目标: [要查什么 / 当前子任务是什么]
已知: [observation 给了什么，或用户提供了什么]
行动: [准备调用哪个工具 / 或直接回答原因]
</think>
标签外是给用户看的最终回答或下一轮行动。"""


def run_inventory_agent(
    user_query: str,
    max_steps: int = 6,
    on_step: Callable[[str, Any], None] | None = None,
) -> dict[str, Any]:
    """
    ReAct 流程：思考 → 工具 → 观察 → 继续，直到模型不再调用工具。
    on_step: 可选回调 (step_type, data)，用于 CLI 实时展示。step_type 为 "llm_start"|"thinking"|"tool_call"|"observation"|"answer"。
    返回契约（与 quotation run_quotation_agent 对齐）：answer, thinking, steps, trace, trace_text, error。
    """
    messages = [
        {"role": "system", "content": _system_prompt()},
        {"role": "user", "content": user_query.strip()},
    ]
    tools = get_inventory_tools_openai_format()
    thinking_parts: list[str] = []
    steps: list[dict[str, Any]] = []
    last_answer = ""
    max_chars = getattr(config, "TOOL_RESULT_MAX_CHARS", 8000)
    timeout = getattr(config, "LLM_TIMEOUT", 60)

    # 执行追踪（调试用）
    tracer = ExecutionTracer()

    def emit(step_type: str, data: Any = None) -> None:
        if on_step:
            on_step(step_type, data)
        steps.append({"type": step_type, "data": data})

    try:
        client, model = _client_and_model()
    except Exception as e:
        return {"answer": "", "thinking": None, "steps": steps, "error": str(e)}

    max_tokens = getattr(config, "LLM_MAX_TOKENS", 5000)
    for step in range(max_steps):
        kwargs: dict[str, Any] = {"model": model, "messages": messages, "timeout": timeout, "max_tokens": max_tokens, "tools": tools, "tool_choice": "auto"}

        emit("llm_start", {"step": step + 1})
        try:
            resp = client.chat.completions.create(**kwargs)
        except Exception as e:
            return {"answer": last_answer or "", "thinking": "\n".join(thinking_parts) or None, "steps": steps, "error": str(e)}

        msg = resp.choices[0].message if resp.choices else None
        if not msg:
            break

        content = (msg.content or "").strip()
        thinking_emitted = False
        for start, end in [("<think>", "</think>"), ("<reasoning>", "</reasoning>")]:
            if start in content and end in content:
                try:
                    i = content.index(start) + len(start)
                    j = content.index(end)
                    part = content[i:j].strip()
                    thinking_parts.append(part)
                    emit("thinking", part)
                    tracer.add(step, "thinking", part)
                    thinking_emitted = True
                    content = (content[: content.index(start)] + content[j + len(end) :]).strip()
                except ValueError:
                    pass
        if content:
            last_answer = content

        tool_calls = getattr(msg, "tool_calls", None) or []
        if tool_calls and not thinking_emitted:
            names = [getattr(getattr(tc, "function", None), "name", "") or "" for tc in tool_calls]
            inferred = "（根据工具调用推断）准备调用 " + "、".join(n for n in names if n)
            if inferred:
                emit("thinking", inferred)
                tracer.add(step, "thinking", inferred)
        if tool_calls:
            tc_list = []
            for tc in tool_calls:
                tid = getattr(tc, "id", None) or "call_1"
                fn = getattr(tc, "function", None)
                name = getattr(fn, "name", None) if fn else None
                args_str = getattr(fn, "arguments", None) or "{}"
                try:
                    args = json.loads(args_str) if args_str else {}
                except json.JSONDecodeError:
                    args = {}
                emit("tool_call", {"name": name, "arguments": args})
                tracer.add(step, "tool_call", {"name": name, "arguments": args})
                tc_list.append((tid, name, args_str, args))

            # 并行执行多个 tool_call（多个产品时可显著缩短总耗时）
            def run_one(tid: str, name: str, args: dict) -> tuple[str, str]:
                out = execute_inventory_tool(name or "search_inventory", args)
                result_str = out.get("result", out.get("error", ""))
                if isinstance(result_str, dict):
                    result_str = json.dumps(result_str, ensure_ascii=False)
                return tid, str(result_str)[:max_chars]

            with ThreadPoolExecutor(max_workers=min(len(tc_list), 4)) as ex:
                futures = [ex.submit(run_one, tid, name, args) for tid, name, args_str, args in tc_list]
                tool_results = []
                for future in as_completed(futures):
                    tid, result_str = future.result()
                    emit("observation", result_str)
                    tracer.add(step, "observation", result_str)
                    tool_results.append((tid, result_str))

            assistant_tc = [{"id": tid, "type": "function", "function": {"name": name, "arguments": args_str}} for tid, name, args_str, _ in tc_list]
            messages.append({"role": "assistant", "content": content or None, "tool_calls": assistant_tc})
            tid_order = {tid: i for i, (tid, _, _, _) in enumerate(tc_list)}
            for tid, result_str in sorted(tool_results, key=lambda x: tid_order.get(x[0], 0)):
                messages.append({"role": "tool", "tool_call_id": tid, "content": result_str})
            continue

        last_answer = content or last_answer
        if content and not thinking_emitted:
            emit("thinking", "（推断）准备给出最终回答")
            tracer.add(step, "thinking", "（推断）准备给出最终回答")
        emit("answer", last_answer)
        tracer.add(step, "answer", last_answer)
        break

    return {
        "answer": last_answer or "",
        "thinking": "\n".join(thinking_parts) if thinking_parts else None,
        "steps": steps,
        "trace": tracer.to_dict(),
        "trace_text": tracer.format_text(),
        "error": None
    }
