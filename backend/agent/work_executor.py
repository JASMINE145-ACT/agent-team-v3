"""
Work Mode 执行器：固定流程 + ReAct，仅使用 Work 工具集，与 Chat 完全独立。
无 Plan 阶段，流程固定为：1.识别表数据 2.查价格与库存（无货登记、缺货记录）3.填表。
支持人工介入：当 work_quotation_match 返回 needs_human_choice 时暂停，返回 awaiting_choices；resume 时注入选择后继续。
"""
from __future__ import annotations

import asyncio
import json
import logging
import uuid
from typing import Any, Callable, Dict, List, Optional

import openai

from backend.core.llm_client import get_openai_client
from backend.agent.work_tools import (
    WORK_TOOLS_OPENAI_FORMAT,
    execute_work_tool_sync,
    merge_work_pending_choices,
)
from backend.tools.inventory.services.wanding_fuzzy_matcher import get_price_level_display_name
from backend.core.context_compression import _trim_context, build_tool_call_id_to_name, make_summarizer

# 每个文件三步完成后压缩历史 tool 结果，避免多文件场景 context 线性膨胀
_WORK_CONTEXT_MAX_CHARS = 8_000

logger = logging.getLogger(__name__)

# run_id -> { messages, step, trace, file_paths, customer_level, do_register_oos, _api_key, _base_url, _model, max_tokens }
_work_run_state: Dict[str, dict] = {}


def _extract_pending_quotation_draft_from_trace(trace: List[dict]) -> Optional[dict]:
    if not isinstance(trace, list):
        return None
    for entry in reversed(trace):
        if entry.get("type") != "observation":
            continue
        content = entry.get("content")
        if not isinstance(content, str) or not content.strip():
            continue
        try:
            obj = json.loads(content)
        except Exception:
            continue
        draft = obj.get("pending_quotation_draft") if isinstance(obj, dict) else None
        if isinstance(draft, dict) and isinstance(draft.get("lines"), list):
            return draft
    return None


def _build_work_system_content(file_paths: List[str], customer_level: str, do_register_oos: bool) -> str:
    files_desc = "\n".join(f"  - {i + 1}. {p}" for i, p in enumerate(file_paths))
    return f"""你是 Work 模式下的报价批量处理执行器。流程固定，对每个文件严格按以下三步顺序执行（每步只调用一个工具）：

**固定流程（每文件重复）：**
1. **识别表数据**：调用 work_quotation_extract(file_path)，得到 items。
2. **查价格与库存（无货登记、缺货记录）**：调用 work_quotation_match(file_path, customer_level)，得到 to_fill、shortage、unmatched、fill_items_merged；再调用 work_quotation_shortage_report(shortage_items) 生成缺货报告；若需要无货登记则调用 register_oos(file_path)。
3. **填表**：调用 work_quotation_fill(file_path, fill_items)，fill_items 必须使用上一步 work_quotation_match 返回的 fill_items_merged。

**规则：**
- 对每个文件依次完成 1→2→3，再处理下一个文件。file_path 从下方文件列表中取。
- work_quotation_fill 的 fill_items 必须来自上一步 work_quotation_match 返回的 fill_items_merged（从上一轮 tool 结果中复制）。
- work_quotation_shortage_report 的 shortage_items 来自 work_quotation_match 返回的 shortage。
- 客户档位：{get_price_level_display_name(customer_level)}（代码 {customer_level}）。是否执行无货登记：{"是" if do_register_oos else "否"}。
- 所有文件处理完毕后，输出简短总结（已处理文件数、填充数、缺货项数等），不再调用工具。

**待处理文件列表：**
{files_desc}
"""


async def run_work_flow(
    file_paths: List[str],
    customer_level: str = "B_QUOTE",
    do_register_oos: bool = True,
    *,
    api_key: Optional[str] = None,
    base_url: Optional[str] = None,
    model: Optional[str] = None,
    on_step: Optional[Callable[[int, str, dict, str], None]] = None,
    max_steps: int = 80,
) -> Dict[str, Any]:
    """
    执行 Work 流程：固定三步 + ReAct，仅 Work 工具，无 Plan。

    Args:
        file_paths: 报价单路径列表
        customer_level: A/B/C/D
        do_register_oos: 是否在每文件末尾执行无货登记
        api_key, base_url, model: LLM 配置
        on_step: 回调 (step_index, tool_name, args, observation)
        max_steps: 最大 ReAct 步数

    Returns:
        {"success": bool, "answer": str, "trace": list, "error": str | None}
    """
    if not file_paths:
        return {"status": "done", "success": False, "answer": "", "trace": [], "error": "file_paths 为空"}
    try:
        from backend.config import Config

        _api_key = api_key or getattr(Config, "OPENAI_API_KEY", None)
        _base_url = getattr(Config, "OPENAI_BASE_URL", None) or base_url
        _model = model or getattr(Config, "LLM_MODEL", "gpt-4o")
        max_tokens = getattr(Config, "LLM_MAX_TOKENS", 5000)

        # 备用模型配置（例如 GLM 超时时自动切到 gpt-4o-mini）
        fb_api_key = getattr(Config, "FALLBACK_LLM_API_KEY", None)
        fb_base_url = getattr(Config, "FALLBACK_LLM_BASE_URL", None)
        fb_model = getattr(Config, "FALLBACK_LLM_MODEL", None)
    except Exception:
        _api_key = api_key
        _base_url = base_url
        _model = model or "gpt-4o"
        max_tokens = 5000
        fb_api_key = None
        fb_base_url = None
        fb_model = None
    if not _api_key:
        return {"status": "done", "success": False, "answer": "", "trace": [], "error": "缺少 OPENAI_API_KEY"}
    client = get_openai_client(api_key=_api_key, base_url=_base_url)
    fb_client = (
        get_openai_client(api_key=fb_api_key, base_url=fb_base_url)
        if fb_api_key and fb_base_url and fb_model
        else None
    )

    system_content = _build_work_system_content(file_paths, customer_level, do_register_oos)
    user_content = f"请按固定流程执行。共 {len(file_paths)} 个文件，客户档位 {customer_level}。从第一个文件的 work_quotation_extract 开始。"

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
        except (openai.APITimeoutError, openai.APIConnectionError) as e:
            if fb_client and fb_model:
                logger.warning("Work 主模型调用超时，fallback 到备用模型: %s", fb_model)
                fb_kwargs: Dict[str, Any] = {**kwargs, "model": fb_model}
                try:
                    resp = fb_client.chat.completions.create(**fb_kwargs)
                    trace.append({"step": step + 1, "type": "fallback", "model": fb_model})
                except Exception as e2:
                    logger.exception("Work LLM fallback 调用失败")
                    return {
                        "status": "done",
                        "success": False,
                        "answer": last_answer or "",
                        "trace": trace,
                        "error": str(e2),
                    }
            else:
                logger.exception("Work LLM 调用失败（无 fallback 配置）")
                return {
                    "status": "done",
                    "success": False,
                    "answer": last_answer or "",
                    "trace": trace,
                    "error": str(e),
                }
        except Exception as e:
            logger.exception("Work LLM 调用失败")
            return {"status": "done", "success": False, "answer": last_answer or "", "trace": trace, "error": str(e)}

        msg = resp.choices[0].message if resp.choices else None
        if not msg:
            break
        content = (msg.content or "").strip()
        tool_calls = list(getattr(msg, "tool_calls", None) or [])

        if content:
            trace.append({"step": step + 1, "type": "response", "content": content})

        if not tool_calls:
            last_answer = content or last_answer
            return {
                "status": "done",
                "success": True,
                "answer": last_answer or "",
                "trace": trace,
                "error": None,
                "pending_quotation_draft": _extract_pending_quotation_draft_from_trace(trace),
            }

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
            # 在开始执行工具前推送阶段，便于前端进度条实时更新
            if on_step:
                try:
                    on_step(step_count, name, args, "")
                except Exception:
                    pass
            try:
                obs = await asyncio.to_thread(execute_work_tool_sync, name, args)
            except Exception as e:
                logger.exception("Work 工具执行失败: %s", name)
                obs = json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)
            # Keep match observation intact: downstream fill and draft extraction depend on valid full JSON.
            if name != "work_quotation_match" and len(obs) > 16000:
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

            if name == "work_quotation_match":
                try:
                    parsed = json.loads(obs)
                    if parsed.get("needs_human_choice") and parsed.get("pending_choices"):
                        run_id = str(uuid.uuid4())
                        _work_run_state[run_id] = {
                            "messages": [m.copy() for m in messages],
                            "step": step,
                            "trace": list(trace),
                            "file_paths": list(file_paths),
                            "customer_level": customer_level,
                            "do_register_oos": do_register_oos,
                            "_api_key": _api_key,
                            "_base_url": _base_url,
                            "_model": _model,
                            "max_tokens": max_tokens,
                        }
                        return {
                            "status": "awaiting_choices",
                            "run_id": run_id,
                            "pending_choices": parsed["pending_choices"],
                            "trace": trace,
                        }
                except (json.JSONDecodeError, KeyError):
                    pass

            if name == "work_quotation_fill":
                # 一个文件的三步已全部完成，压缩历史 tool 结果
                # 此时 fill 已经读取并使用了 match 结果，压缩安全不影响数据流
                _id_to_name = build_tool_call_id_to_name(messages)
                _summarizer = make_summarizer(_api_key, _base_url, "gpt-4o-mini")
                _trim_context(messages, _WORK_CONTEXT_MAX_CHARS, _id_to_name, _summarizer)

    return {
        "status": "done",
        "success": True,
        "answer": last_answer or "",
        "trace": trace,
        "error": None,
        "pending_quotation_draft": _extract_pending_quotation_draft_from_trace(trace),
    }


async def run_work_flow_resume(
    run_id: str,
    selections: List[dict],
) -> Dict[str, Any]:
    """
    人工选择后继续 Work 流程。selections: [{ item_id, selected_code }]。
    返回与 run_work_flow 相同结构（status: "done" 或 "awaiting_choices"）。
    """
    state = _work_run_state.pop(run_id, None)
    if not state:
        return {"status": "done", "success": False, "answer": "", "trace": [], "error": "run_id 无效或已过期"}
    messages = state["messages"]
    step_start = state["step"] + 1
    trace = list(state["trace"])
    file_paths = state["file_paths"]
    customer_level = state["customer_level"]
    do_register_oos = state["do_register_oos"]
    _api_key = state["_api_key"]
    _base_url = state["_base_url"]
    _model = state["_model"]
    max_tokens = state["max_tokens"]

    # 重新构建主/备用 client（避免在长时间暂停后使用过期连接）
    try:
        from backend.config import Config

        fb_api_key = getattr(Config, "FALLBACK_LLM_API_KEY", None)
        fb_base_url = getattr(Config, "FALLBACK_LLM_BASE_URL", None)
        fb_model = getattr(Config, "FALLBACK_LLM_MODEL", None)
    except Exception:
        fb_api_key = None
        fb_base_url = None
        fb_model = None

    client = get_openai_client(api_key=_api_key, base_url=_base_url)
    fb_client = (
        get_openai_client(api_key=fb_api_key, base_url=fb_base_url)
        if fb_api_key and fb_base_url and fb_model
        else None
    )
    resolved_pending_draft: Optional[dict] = None

    for i in range(len(messages) - 1, -1, -1):
        if messages[i].get("role") == "tool":
            try:
                parsed = json.loads(messages[i].get("content", "{}"))
                if parsed.get("needs_human_choice") and parsed.get("pending_choices"):
                    resolved = merge_work_pending_choices(parsed, selections)
                    messages[i] = {**messages[i], "content": json.dumps(resolved, ensure_ascii=False)}
                    resolved_pending_draft = (
                        resolved.get("pending_quotation_draft")
                        if isinstance(resolved, dict) and isinstance(resolved.get("pending_quotation_draft"), dict)
                        else None
                    )
                    # 让前端能从 trace 直接解析到合并后的可编辑草稿
                    trace.append(
                        {
                            "step": step_start,
                            "type": "observation",
                            "content": json.dumps(resolved, ensure_ascii=False),
                        }
                    )
            except (json.JSONDecodeError, KeyError):
                pass
            break

    last_answer = ""
    step_count = len([t for t in trace if t.get("type") == "tool_call"])

    for step in range(step_start, 80):
        kwargs = {
            "model": _model,
            "messages": messages,
            "temperature": 0.1,
            "max_tokens": max_tokens,
            "tools": WORK_TOOLS_OPENAI_FORMAT,
            "tool_choice": "auto",
        }
        try:
            resp = client.chat.completions.create(**kwargs)
        except (openai.APITimeoutError, openai.APIConnectionError) as e:
            if fb_client and fb_model:
                logger.warning("Work resume 主模型调用超时，fallback 到备用模型: %s", fb_model)
                fb_kwargs = {**kwargs, "model": fb_model}
                try:
                    resp = fb_client.chat.completions.create(**fb_kwargs)
                    trace.append({"step": step + 1, "type": "fallback", "model": fb_model})
                except Exception as e2:
                    logger.exception("Work resume LLM fallback 调用失败")
                    return {
                        "status": "done",
                        "success": False,
                        "answer": last_answer or "",
                        "trace": trace,
                        "error": str(e2),
                    }
            else:
                logger.exception("Work resume LLM 调用失败（无 fallback 配置）")
                return {
                    "status": "done",
                    "success": False,
                    "answer": last_answer or "",
                    "trace": trace,
                    "error": str(e),
                }
        except Exception as e:
            logger.exception("Work resume LLM 调用失败")
            return {"status": "done", "success": False, "answer": last_answer or "", "trace": trace, "error": str(e)}
        msg = resp.choices[0].message if resp.choices else None
        if not msg:
            break
        content = (msg.content or "").strip()
        tool_calls = list(getattr(msg, "tool_calls", None) or [])
        if content:
            trace.append({"step": step + 1, "type": "response", "content": content})
        if not tool_calls:
            last_answer = content or last_answer
            return {
                "status": "done",
                "success": True,
                "answer": last_answer or "",
                "trace": trace,
                "error": None,
                "pending_quotation_draft": _extract_pending_quotation_draft_from_trace(trace)
                or resolved_pending_draft,
            }
        tool_calls_for_msg = []
        for j, tc in enumerate(tool_calls):
            name = getattr(tc.function, "name", "") or ""
            raw_args = getattr(tc.function, "arguments", "{}") or "{}"
            tool_calls_for_msg.append({
                "id": getattr(tc, "id", "") or f"work_resume_{step}_{j}",
                "type": "function",
                "function": {"name": name, "arguments": raw_args},
            })
        messages.append({"role": "assistant", "content": content or None, "tool_calls": tool_calls_for_msg})
        for j, tc in enumerate(tool_calls):
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
            # Keep match observation intact: downstream fill and draft extraction depend on valid full JSON.
            if name != "work_quotation_match" and len(obs) > 16000:
                obs = obs[:16000] + "\n…（已截断）"
            trace.append({"step": step + 1, "type": "tool_call", "name": name, "arguments": args})
            trace.append({"step": step + 1, "type": "observation", "content": obs})
            messages.append({"role": "tool", "tool_call_id": tool_calls_for_msg[j]["id"], "content": obs})
            if name == "work_quotation_match":
                try:
                    parsed = json.loads(obs)
                    if parsed.get("needs_human_choice") and parsed.get("pending_choices"):
                        new_run_id = str(uuid.uuid4())
                        _work_run_state[new_run_id] = {
                            "messages": [m.copy() for m in messages],
                            "step": step,
                            "trace": list(trace),
                            "file_paths": file_paths,
                            "customer_level": customer_level,
                            "do_register_oos": do_register_oos,
                            "_api_key": _api_key,
                            "_base_url": _base_url,
                            "_model": _model,
                            "max_tokens": max_tokens,
                        }
                        return {"status": "awaiting_choices", "run_id": new_run_id, "pending_choices": parsed["pending_choices"], "trace": trace}
                except (json.JSONDecodeError, KeyError):
                    pass

            if name == "work_quotation_fill":
                _id_to_name = build_tool_call_id_to_name(messages)
                _summarizer = make_summarizer(_api_key, _base_url, "gpt-4o-mini")
                _trim_context(messages, _WORK_CONTEXT_MAX_CHARS, _id_to_name, _summarizer)

    return {
        "status": "done",
        "success": True,
        "answer": last_answer or "",
        "trace": trace,
        "error": None,
        "pending_quotation_draft": _extract_pending_quotation_draft_from_trace(trace)
        or resolved_pending_draft,
    }
