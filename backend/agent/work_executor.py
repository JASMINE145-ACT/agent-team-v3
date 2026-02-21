"""
Work Mode 执行器：Plan + ReAct，仅使用 Work 工具集，与 Chat 完全独立。
"""
from __future__ import annotations

import asyncio
import json
import logging
from typing import Any, Callable, Dict, List, Optional

from openai import OpenAI

from backend.agent.work_tools import (
    WORK_TOOLS_OPENAI_FORMAT,
    build_work_plan,
    execute_work_tool_sync,
)

logger = logging.getLogger(__name__)

WORK_SYSTEM_PROMPT = """你是 Work 模式下的报价批量处理执行器。当前任务：按计划依次执行每个步骤，每步只调用一个工具。

规则：
1. 严格按照 plan.steps 的顺序执行：对每个文件依次执行 extract → match_and_inventory → fill → shortage_report → register_oos。
2. 每步调用时，file_path 必须使用 plan.files[file_index].path（即当前步骤对应文件的路径）。
3. work_quotation_fill 的 fill_items 参数必须使用上一步 work_quotation_match 返回的 fill_items_merged（从上一轮 tool 结果中复制）。
4. work_quotation_shortage_report 的 shortage_items 使用上一步 work_quotation_match 返回的 shortage。
5. 每执行完一个文件的全部步骤后，再处理下一个文件；或按 steps 顺序逐条执行即可。
6. 当所有步骤执行完毕后，输出一段简短总结（已处理文件数、每文件填充数、缺货项数等），不要继续调用工具。
"""


def _build_work_system_content(plan: dict) -> str:
    return WORK_SYSTEM_PROMPT + "\n\n当前计划（请严格按此顺序执行）：\n```json\n" + json.dumps(plan, ensure_ascii=False, indent=2) + "\n```"


async def run_work_flow(
    file_paths: List[str],
    customer_level: str = "B",
    do_register_oos: bool = True,
    plan: Optional[dict] = None,
    *,
    api_key: Optional[str] = None,
    base_url: Optional[str] = None,
    model: Optional[str] = None,
    on_step: Optional[Callable[[int, str, dict, str], None]] = None,
    max_steps: int = 80,
) -> Dict[str, Any]:
    """
    执行 Work 流程：Plan + ReAct，仅 Work 工具。

    Args:
        file_paths: 报价单路径列表
        customer_level: A/B/C/D
        do_register_oos: 是否在每文件末尾执行无货登记
        plan: 若提供则直接用，否则根据 file_paths 生成
        api_key, base_url, model: LLM 配置，默认从 Config 读
        on_step: 回调 (step_index, tool_name, args, observation)
        max_steps: 最大 ReAct 步数

    Returns:
        {"success": bool, "answer": str, "trace": list, "error": str | None, "plan": dict}
    """
    if not file_paths:
        return {"success": False, "answer": "", "trace": [], "error": "file_paths 为空", "plan": {}}
    plan = plan or build_work_plan(file_paths, do_register_oos=do_register_oos)
    try:
        from backend.config import Config
        _api_key = api_key or getattr(Config, "OPENAI_API_KEY", None)
        _base_url = getattr(Config, "OPENAI_BASE_URL", None) or base_url
        _model = model or getattr(Config, "LLM_MODEL", "gpt-4o")
        max_tokens = getattr(Config, "LLM_MAX_TOKENS", 5000)
    except Exception:
        _api_key = api_key
        _base_url = base_url
        _model = model or "gpt-4o"
        max_tokens = 5000
    if not _api_key:
        return {"success": False, "answer": "", "trace": [], "error": "缺少 OPENAI_API_KEY", "plan": plan}
    client = OpenAI(api_key=_api_key, base_url=_base_url)

    system_content = _build_work_system_content(plan)
    user_content = f"请按计划执行。共 {len(plan.get('steps', []))} 步。客户档位：{customer_level}。开始执行第一步。"

    messages: List[dict] = [
        {"role": "system", "content": system_content},
        {"role": "user", "content": user_content},
    ]
    trace: List[dict] = []
    last_answer = ""
    step_count = 0

    for step in range(max_steps):
        kwargs: Dict[str, Any] = {
            "model": _model,
            "messages": messages,
            "temperature": 0.1,
            "max_tokens": max_tokens,
        }
        kwargs["tools"] = WORK_TOOLS_OPENAI_FORMAT
        kwargs["tool_choice"] = "auto"

        try:
            resp = client.chat.completions.create(**kwargs)
        except Exception as e:
            logger.exception("Work LLM 调用失败")
            return {"success": False, "answer": last_answer or "", "trace": trace, "error": str(e), "plan": plan}

        msg = resp.choices[0].message if resp.choices else None
        if not msg:
            break
        content = (msg.content or "").strip()
        tool_calls = list(getattr(msg, "tool_calls", None) or [])

        if content:
            trace.append({"step": step + 1, "type": "response", "content": content})

        if not tool_calls:
            last_answer = content or last_answer
            break

        tool_calls_for_msg = []
        for i, tc in enumerate(tool_calls):
            name = getattr(tc.function, "name", "") or ""
            raw_args = getattr(tc.function, "arguments", "{}") or "{}"
            tool_calls_for_msg.append({
                "id": getattr(tc, "id", "") or f"work_call_{step}_{i}",
                "type": "function",
                "function": {"name": name, "arguments": raw_args},
            })

        messages.append({
            "role": "assistant",
            "content": content or None,
            "tool_calls": tool_calls_for_msg,
        })

        for i, tc in enumerate(tool_calls):
            name = getattr(tc.function, "name", "") or ""
            raw_args = getattr(tc.function, "arguments", "{}") or "{}"
            try:
                args = json.loads(raw_args)
            except json.JSONDecodeError:
                args = {}
            if name == "work_quotation_match" and "customer_level" not in args:
                args["customer_level"] = customer_level
            step_count += 1
            try:
                obs = await asyncio.to_thread(execute_work_tool_sync, name, args)
            except Exception as e:
                logger.exception("Work 工具执行失败: %s", name)
                obs = json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)
            if len(obs) > 16000:
                obs = obs[:16000] + "\n…（已截断）"
            trace.append({"step": step + 1, "type": "tool_call", "name": name, "arguments": args})
            trace.append({"step": step + 1, "type": "observation", "content": obs})
            if on_step:
                try:
                    on_step(step_count, name, args, obs)
                except Exception:
                    pass
            messages.append({
                "role": "tool",
                "tool_call_id": tool_calls_for_msg[i]["id"],
                "content": obs,
            })

    return {
        "success": True,
        "answer": last_answer or "",
        "trace": trace,
        "error": None,
        "plan": plan,
    }
