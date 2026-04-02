"""
Work Mode 閹笛?閸?绱伴崶鍝勭暰濞翠胶鈻?+ ReAct閿涘奔绮庢担璺ㄦ暏 Work 瀹搞儱鍙块梿鍡礉娑?Chat 鐎瑰苯鍙忛悪?鐝涢妴?閺?Plan 闂冭埖?閿涘本绁︾粙瀣祼鐎规矮璐熼敍?.鐠囧棗鍩嗙悰銊︽殶閹?2.閺屻儰鐜弽闂寸瑢鎼存挸鐡ㄩ敍鍫熸￥鐠愌呮鐠佽埇鈧胶宸辩拹褑?瑜版洩绱?.婵?銆冮妴?閺€?瀵旀禍鍝勪紣娴犲鍙嗛敍姘秼 work_quotation_match 鏉╂柨娲?needs_human_choice 閺冭埖娈忛崑婊愮礉鏉╂柨娲?awaiting_choices閿涙硜esume 閺冭埖鏁為崗銉┾偓澶嬪閸氬海鎴风紒?鈧?"""
from __future__ import annotations

import asyncio
import json
import logging
import time
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

# 濮ｅ繋閲滈弬鍥︽娑撳?鐎瑰本鍨氶崥搴″竾缂傗晛宸婚崣?tool 缂佹挻鐏夐敍宀勪缉閸忓秴?閺傚洣娆㈤崷鐑樻珯 context 缁炬寧鈧嗗暙閼斥偓
_WORK_CONTEXT_MAX_CHARS = 8_000

logger = logging.getLogger(__name__)


def _work_context_summarizer():
    """Tool 结果压缩：与 Chat CoreAgent 一致，使用 SUMMARY_LLM_*（gpt-4o-mini）。"""
    from backend.config import Config

    return make_summarizer(
        Config.SUMMARY_LLM_API_KEY or Config.OPENAI_API_KEY,
        (Config.SUMMARY_LLM_BASE_URL or Config.OPENAI_BASE_URL or "").strip() or None,
        getattr(Config, "SUMMARY_LLM_MODEL", "gpt-4o-mini"),
    )

# run_id -> { messages, step, trace, file_paths, customer_level, do_register_oos, _api_key, _base_url, _model, max_tokens, created_at }
_work_run_state: Dict[str, dict] = {}

_work_pipeline_state: Dict[str, dict] = {}

# pipeline 濡€崇础娑撳娈?run_id 閻樿埖鈧緤绱欐稉宥呭晙娓氭繆绂?ReAct 濞戝牊浼呮稉濠佺瑓閺傚浄绱?_work_pipeline_state: Dict[str, dict] = {}

_WORK_RUN_ID_TTL_SECONDS_DEFAULT = 60 * 60  # 1 鐏忓繑妞?

def _get_run_id_ttl_seconds() -> int:
    """Read run_id TTL from config with bounds protection."""
    try:
        from backend.config import Config

        raw = int(getattr(Config, "WORK_RUN_ID_TTL_SECONDS", _WORK_RUN_ID_TTL_SECONDS_DEFAULT))
        # At least 1 minute, at most 24 hours.
        return max(60, min(raw, 24 * 60 * 60))
    except Exception:
        return _WORK_RUN_ID_TTL_SECONDS_DEFAULT


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
    do_register_oos_text = "yes" if do_register_oos else "no"
    return (
        "You are the Work-mode quotation executor.\n"
        "For each file, run in order: extract -> match -> fill.\n"
        "After match, call shortage_report for shortage items.\n"
        "If enabled, call register_oos(file_path).\n"
        "fill_items must come from match.fill_items_merged.\n"
        f"Customer level: {get_price_level_display_name(customer_level)} ({customer_level}).\n"
        f"Register OOS: {do_register_oos_text}.\n"
        "File list:\n"
        f"{files_desc}\n"
    )


async def _run_work_flow_react(
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
    閹笛? Work 濞翠胶鈻奸敍姘祼鐎规矮绗佸?+ ReAct閿涘奔绮?Work 瀹搞儱鍙块敍灞炬￥ Plan閵?
    Args:
        file_paths: 閹躲儰鐜崡鏇＄熅瀵板嫬鍨悰?        customer_level: A/B/C/D
        do_register_oos: 閺?鎯侀崷銊︾槨閺傚洣娆㈤張?鐔幍褑?閺冪姾鎻ｉ惂鏄?
        api_key, base_url, model: LLM 闁板秶鐤?        on_step: 閸ョ偠鐨?(step_index, tool_name, args, observation)
        max_steps: 閺堚偓婢?ReAct 濮濄儲鏆?
    Returns:
        {"success": bool, "answer": str, "trace": list, "error": str | None}
    """
    if not file_paths:
        return {"status": "done", "success": False, "answer": "", "trace": [], "error": "file_paths ??"}
    try:
        from backend.config import Config

        _api_key = api_key or getattr(Config, "OPENAI_API_KEY", None)
        _base_url = getattr(Config, "OPENAI_BASE_URL", None) or base_url
        _model = model or getattr(Config, "LLM_MODEL", "glm-4.5-air")
        max_tokens = getattr(Config, "LLM_MAX_TOKENS", 5000)

        # 婢跺洨鏁ゅΟ鈥崇€烽柊宥囩枂閿涘牅绶ユ俊?GLM 鐡掑懏妞傞弮鎯板殰閸斻劌鍨忛崚?gpt-4o-mini閿?        fb_api_key = getattr(Config, "FALLBACK_LLM_API_KEY", None)
        fb_base_url = getattr(Config, "FALLBACK_LLM_BASE_URL", None)
        fb_model = getattr(Config, "FALLBACK_LLM_MODEL", None)
    except Exception:
        _api_key = api_key
        _base_url = base_url
        _model = model or "glm-4.5-air"
        max_tokens = 5000
        fb_api_key = None
        fb_base_url = None
        fb_model = None
    if not _api_key:
        return {"status": "done", "success": False, "answer": "", "trace": [], "error": "缂傚搫鐨?OPENAI_API_KEY"}
    client = get_openai_client(api_key=_api_key, base_url=_base_url)
    fb_client = (
        get_openai_client(api_key=fb_api_key, base_url=fb_base_url)
        if fb_api_key and fb_base_url and fb_model
        else None
    )

    system_content = _build_work_system_content(file_paths, customer_level, do_register_oos)
    user_content = f"?????????? {len(file_paths)} ???????? {customer_level}???????? work_quotation_extract ???"

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
                logger.warning("Work 娑撶粯膩閸ㄥ鐨熼悽銊ㄧТ閺冭绱漟allback 閸掓澘?閻劍膩閸? %s", fb_model)
                fb_kwargs: Dict[str, Any] = {**kwargs, "model": fb_model}
                try:
                    resp = fb_client.chat.completions.create(**fb_kwargs)
                    trace.append({"step": step + 1, "type": "fallback", "model": fb_model})
                except Exception as e2:
                    logger.exception("Work LLM ?????fallback ????")
                    return {
                        "status": "done",
                        "success": False,
                        "answer": last_answer or "",
                        "trace": trace,
                        "error": str(e2),
                    }
            else:
                logger.exception("Work LLM ?????fallback ????")
                return {
                    "status": "done",
                    "success": False,
                    "answer": last_answer or "",
                    "trace": trace,
                    "error": str(e),
                }
        except Exception as e:
            logger.exception("Work LLM ?????fallback ????")
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
            # Push stage progress before each tool execution.
            if on_step:
                try:
                    on_step(step_count, name, args, "")
                except Exception:
                    pass
            try:
                obs = await asyncio.to_thread(execute_work_tool_sync, name, args)
            except Exception as e:
                logger.exception("Work 瀹搞儱鍙块幍褑?婢惰精瑙? %s", name)
                obs = json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)
            # Keep match observation intact: downstream fill and draft extraction depend on valid full JSON.
            if name != "work_quotation_match" and len(obs) > 16000:
                obs = obs[:16000] + "\n...(truncated)"
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
                            "created_at": time.time(),
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
                # 娑撯偓娑?鏋冩禒鍓佹畱娑撳?瀹告彃鍙忛柈銊ョ暚閹存劧绱濋崢瀣級閸樺棗褰?tool 缂佹挻鐏?                # 濮濄倖妞?fill 瀹歌尙绮＄拠璇插絿楠炴湹濞囬悽銊ょ啊 match 缂佹挻鐏夐敍灞藉竾缂傗晛鐣ㄩ崗銊ょ瑝瑜板崬鎼烽弫鐗堝祦濞?                _id_to_name = build_tool_call_id_to_name(messages)
                _summarizer = _work_context_summarizer()
                _trim_context(messages, _WORK_CONTEXT_MAX_CHARS, _id_to_name, _summarizer)

    return {
        "status": "done",
        "success": True,
        "answer": last_answer or "",
        "trace": trace,
        "error": None,
        "pending_quotation_draft": _extract_pending_quotation_draft_from_trace(trace),
    }


async def _run_work_flow_resume_react(
    run_id: str,
    selections: List[dict],
) -> Dict[str, Any]:
    """
    娴滃搫浼愰柅澶嬪閸氬海鎴风紒?Work 濞翠胶鈻奸敍鍦Act 閻楀牊婀伴敍澶堚偓淇縠lections: [{ item_id, selected_code }]閵?    鏉╂柨娲栨稉?run_work_flow 閻╃鎮撶紒鎾寸€敍鍧皌atus: "done" 閹?"awaiting_choices"閿涘鈧?    """
    state = _work_run_state.pop(run_id, None)
    if not state:
        return {"status": "done", "success": False, "answer": "", "trace": [], "error": "run_id ??????"}
    created_at = state.get("created_at")
    ttl = _get_run_id_ttl_seconds()
    if created_at and (time.time() - float(created_at)) > ttl:
        return {
            "status": "done",
            "success": False,
            "answer": "",
            "trace": list(state.get("trace") or []),
            "error": "run_id 瀹歌尪绻冮張鐕傜礉鐠囩兘鍣搁弬鐗堝⒔鐞?Work",
        }
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

    # 闁插秵鏌婇弸鍕紦娑?婢跺洨鏁?client閿涘牓浼╅崗宥呮躬闂€鎸庢闂傚瓨娈忛崑婊冩倵娴ｈ法鏁ゆ潻鍥ㄦ埂鏉╃偞甯撮敍?
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
    applied_human_choices = False

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
                    # 鐠佲晛澧犵粩?鍏樻禒?trace 閻╁瓨甯寸憴锝嗙€介崚鏉挎値楠炶泛鎮楅惃鍕讲缂傛牞绶懡澶?
                    trace.append(
                        {
                            "step": step_start,
                            "type": "observation",
                            "content": json.dumps(resolved, ensure_ascii=False),
                        }
                    )
                    applied_human_choices = True
            except (json.JSONDecodeError, KeyError):
                pass
            break

    if applied_human_choices:
        # 閺勫海鈥樼憰浣圭湴閸氬海鐢婚崺杞扮艾娴滃搫浼愰柅澶嬪缂佈呯敾閿涘矂浼╅崗宥喣侀崹瀣晙濞嗭繝鍣哥捄?match 鐟曞棛娲婇悽銊﹀煕閸愬磭鐡ラ妴?
        messages.append(
            {
                "role": "user",
                "content": (
                    "Human choices have been merged. Continue from this state and do not re-run work_quotation_match for the same file."
                ),
            }
        )

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
                logger.warning("Work resume 娑撶粯膩閸ㄥ鐨熼悽銊ㄧТ閺冭绱漟allback 閸掓澘?閻劍膩閸? %s", fb_model)
                fb_kwargs = {**kwargs, "model": fb_model}
                try:
                    resp = fb_client.chat.completions.create(**fb_kwargs)
                    trace.append({"step": step + 1, "type": "fallback", "model": fb_model})
                except Exception as e2:
                    logger.exception("Work resume LLM ?????fallback ????")
                    return {
                        "status": "done",
                        "success": False,
                        "answer": last_answer or "",
                        "trace": trace,
                        "error": str(e2),
                    }
            else:
                logger.exception("Work resume LLM ?????fallback ????")
                return {
                    "status": "done",
                    "success": False,
                    "answer": last_answer or "",
                    "trace": trace,
                    "error": str(e),
                }
        except Exception as e:
            logger.exception("Work resume LLM ?????fallback ????")
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
                logger.exception("Work 瀹搞儱鍙块幍褑?婢惰精瑙? %s", name)
                obs = json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)
            # Keep match observation intact: downstream fill and draft extraction depend on valid full JSON.
            if name != "work_quotation_match" and len(obs) > 16000:
                obs = obs[:16000] + "\n...(truncated)"
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
                            "created_at": time.time(),
                        }
                        return {
                            "status": "awaiting_choices",
                            "run_id": new_run_id,
                            "pending_choices": parsed["pending_choices"],
                            "trace": trace,
                        }
                except (json.JSONDecodeError, KeyError):
                    pass

            if name == "work_quotation_fill":
                _id_to_name = build_tool_call_id_to_name(messages)
                _summarizer = _work_context_summarizer()
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


# ---------- 缁狅繝浜惧?Work 濞翠胶鈻奸敍鍫ョ帛鐠併倕鐤勯悳甯礆 ----------


async def _run_pipeline_fill_and_oos(
    file_path: str,
    match_result: Dict[str, Any],
    do_register_oos: bool,
    trace: List[dict],
    on_step: Optional[Callable[[int, str, dict, str], None]] = None,
) -> None:
    """
    閸︺劌鍑￠張?match_result 閻ㄥ嫬澧犻幓鎰瑓閿涘奔璐熼崡鏇氶嚋閺傚洣娆㈤幍褑?婵?銆?+ 缂傞缚鎻ｉ幎銉ユ啞 + 閺冪姾鎻ｉ惂鏄?閵?    娣?鏁?trace閿涘n_step 婢跺秶鏁ら崢鐔告箒鐠?绠熼敍鍫滅返 /run-stream 閹恒劏绻橀梼鑸?閿涘鈧?    """
    step_count = len([t for t in trace if t.get("type") == "tool_call"])

    fill_items = match_result.get("fill_items_for_excel") or match_result.get("fill_items_merged") or []
    if fill_items:
        fill_args: Dict[str, Any] = {
            "file_path": file_path,
            "fill_items": fill_items,
        }
        step_count += 1
        if on_step:
            try:
                on_step(step_count, "work_quotation_fill", fill_args, "")
            except Exception:
                pass
        try:
            fill_obs = await asyncio.to_thread(
                execute_work_tool_sync,
                "work_quotation_fill",
                fill_args,
            )
        except Exception as e:
            logger.exception("Work pipeline execution failed")
            fill_obs = json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)
        trace.append({"type": "tool_call", "name": "work_quotation_fill", "arguments": fill_args})
        trace.append({"type": "observation", "content": fill_obs})

    shortage_items = match_result.get("shortage") or []
    if shortage_items:
        shortage_args: Dict[str, Any] = {"shortage_items": shortage_items}
        step_count += 1
        if on_step:
            try:
                on_step(step_count, "work_quotation_shortage_report", shortage_args, "")
            except Exception:
                pass
        try:
            shortage_obs = await asyncio.to_thread(
                execute_work_tool_sync,
                "work_quotation_shortage_report",
                shortage_args,
            )
        except Exception as e:
            logger.exception("Work pipeline execution failed")
            shortage_obs = json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)
        trace.append({"type": "tool_call", "name": "work_quotation_shortage_report", "arguments": shortage_args})
        trace.append({"type": "observation", "content": shortage_obs})

    # 閺冪姾鎻ｉ惂鏄?閿涘牆褰查柅澶涚礆
    if do_register_oos:
        oos_args: Dict[str, Any] = {"file_path": file_path}
        step_count += 1
        if on_step:
            try:
                on_step(step_count, "register_oos", oos_args, "")
            except Exception:
                pass
        try:
            oos_obs = await asyncio.to_thread(
                execute_work_tool_sync,
                "register_oos",
                oos_args,
            )
        except Exception as e:
            logger.exception("Work pipeline execution failed")
            oos_obs = json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)
        trace.append({"type": "tool_call", "name": "register_oos", "arguments": oos_args})
        trace.append({"type": "observation", "content": oos_obs})


async def _process_files_pipeline(
    file_paths: List[str],
    start_index: int,
    customer_level: str,
    do_register_oos: bool,
    trace: List[dict],
    *,
    on_step: Optional[Callable[[int, str, dict, str], None]] = None,
    precomputed_match_result: Optional[Dict[str, Any]] = None,
) -> Dict[str, Any]:
    """
    娴犲孩瀵氱€规氨鍌ㄥ鏇炵磻婵瀵滄い鍝勭碍婢跺嫮鎮婃径姘嚋閺傚洣娆㈤妴?    - 濮濓絽鐖剁€瑰本鍨氶敍姘崇箲閸?status=done
    - 闂団偓鐟曚椒姹夊銉┾偓澶嬪閿涙俺绻戦崶?status=awaiting_choices閿涘苯鑻熺亸鍡欏Ц閹礁鍟撻崗?_work_pipeline_state[run_id]
    """
    if not file_paths:
        return {"status": "done", "success": False, "answer": "", "trace": trace, "error": "file_paths ??"}

    pending_quotation_draft: Optional[dict] = None
    step_count = len([t for t in trace if t.get("type") == "tool_call"])

    for idx in range(start_index, len(file_paths)):
        file_path = file_paths[idx]
        extracted_items: Optional[List[dict]] = None

        # 闂冭埖? 1閿涙俺鐦戦崚?銆冮弫鐗堝祦閿涘牅瀵岀憰浣烘暏娴?trace 娑撳骸褰茬憴鍌涚ゴ閹嶇礉閻喐? match 閸愬懘鍎存稊鐔剁窗鐠嬪啰鏁?extract閿?
        if precomputed_match_result is None or idx != start_index:
            extract_args: Dict[str, Any] = {"file_path": file_path}
            step_count += 1
            if on_step:
                try:
                    on_step(step_count, "work_quotation_extract", extract_args, "")
                except Exception:
                    pass
            t0 = time.time()
            try:
                extract_obs = await asyncio.to_thread(
                    execute_work_tool_sync,
                    "work_quotation_extract",
                    extract_args,
                )
            except Exception as e:
                logger.exception("Work pipeline execution failed")
                extract_obs = json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)
            elapsed_ms = int((time.time() - t0) * 1000)
            trace.append({"type": "tool_call", "name": "work_quotation_extract", "arguments": extract_args})
            trace.append({"type": "observation", "content": extract_obs})
            trace.append(
                {
                    "type": "metrics",
                    "stage": "extract",
                    "file_path": file_path,
                    "duration_ms": elapsed_ms,
                }
            )
            try:
                parsed_extract = json.loads(extract_obs)
                items = parsed_extract.get("items") if isinstance(parsed_extract, dict) else None
                if isinstance(items, list):
                    extracted_items = [it for it in items if isinstance(it, dict)]
            except Exception:
                extracted_items = None

        # 闂冭埖? 2+3閿涙艾灏柊?+ 闁鐎?
        if precomputed_match_result is not None and idx == start_index:
            parsed = precomputed_match_result
            match_obs = json.dumps(parsed, ensure_ascii=False)
        else:
            match_args: Dict[str, Any] = {
                "file_path": file_path,
                "customer_level": customer_level,
            }
            match_exec_args: Dict[str, Any] = dict(match_args)
            if extracted_items is not None:
                match_exec_args["items"] = extracted_items
            step_count += 1
            if on_step:
                try:
                    on_step(step_count, "work_quotation_match", match_args, "")
                except Exception:
                    pass
            t1 = time.time()
            match_exec_error: Optional[str] = None
            try:
                match_obs = await asyncio.to_thread(
                    execute_work_tool_sync,
                    "work_quotation_match",
                    match_exec_args,
                )
            except Exception as e:
                logger.exception("Work pipeline execution failed")
                match_obs = json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)
                match_exec_error = str(e)
            elapsed_ms = int((time.time() - t1) * 1000)
            trace.append({"type": "tool_call", "name": "work_quotation_match", "arguments": match_args})
            trace.append({"type": "observation", "content": match_obs})
            if match_exec_error is not None:
                return {
                    "status": "done",
                    "success": False,
                    "answer": "",
                    "trace": trace,
                    "error": f"work_quotation_match failed (file={file_path})",
                    "pending_quotation_draft": pending_quotation_draft,
                }

            try:
                parsed = json.loads(match_obs)
            except Exception:
                parsed = {"success": False, "error": "work_quotation_match returned non-JSON"}

            # 閸??濞村鈧嶇窗鐠佹澘缍嶉崠褰掑帳鐠愩劑鍣?
            try:
                items = parsed.get("items") or []
                n_items = len(items)
                n_to_fill = len(parsed.get("to_fill") or [])
                n_shortage = len(parsed.get("shortage") or [])
                n_unmatched = len(parsed.get("unmatched") or [])
                n_pending = len(parsed.get("pending_choices") or [])
                trace.append(
                    {
                        "type": "metrics",
                        "stage": "match",
                        "file_path": file_path,
                        "duration_ms": elapsed_ms,
                        "items": n_items,
                        "to_fill": n_to_fill,
                        "shortage": n_shortage,
                        "unmatched": n_unmatched,
                        "pending_choices": n_pending,
                    }
                )
            except Exception:
                pass

        if not isinstance(parsed, dict):
            return {
                "status": "done",
                "success": False,
                "answer": "",
                "trace": trace,
                "error": f"work_quotation_match failed (file={file_path})",
            }

        if parsed.get("success") is False:
            return {
                "status": "done",
                "success": False,
                "answer": "",
                "trace": trace,
                "error": f"work_quotation_match failed (file={file_path})",
                "pending_quotation_draft": pending_quotation_draft,
            }
        if parsed.get("pending_quotation_draft") is not None:
            pending_quotation_draft = parsed.get("pending_quotation_draft")

        if parsed.get("needs_human_choice") and parsed.get("pending_choices"):
            run_id = str(uuid.uuid4())
            _work_pipeline_state[run_id] = {
                "file_paths": list(file_paths),
                "customer_level": customer_level,
                "do_register_oos": do_register_oos,
                "current_file_index": idx,
                "match_result": parsed,
                "trace": list(trace),
                "created_at": time.time(),
            }
            return {
                "status": "awaiting_choices",
                "run_id": run_id,
                "pending_choices": parsed["pending_choices"],
                "trace": trace,
                "pending_quotation_draft": pending_quotation_draft,
            }

        # 閺冪娀娓舵禍鍝勪紣闁瀚ㄩ敍姘辨纯閹恒儴绻橀崗銉ユ倵缂?妯佸▓?
        await _run_pipeline_fill_and_oos(
            file_path=file_path,
            match_result=parsed,
            do_register_oos=do_register_oos,
            trace=trace,
            on_step=on_step,
        )

        # 娑撯偓鏉?resume 閸?濞囬悽銊ょ濞嗭繝?鐠侊紕鐣婚惃?match_result
        precomputed_match_result = None
    answer = f"??? {len(file_paths)} ???"
    return {
        "status": "done",
        "success": True,
        "answer": answer,
        "trace": trace,
        "error": None,
        "pending_quotation_draft": pending_quotation_draft,
    }


async def _run_work_flow_pipeline(
    file_paths: List[str],
    customer_level: str = "B_QUOTE",
    do_register_oos: bool = True,
    *,
    api_key: Optional[str] = None,  # ?????????????
    base_url: Optional[str] = None,  # ?????????????
    model: Optional[str] = None,  # ?????????????
    on_step: Optional[Callable[[int, str, dict, str], None]] = None,
    max_steps: int = 80,  # ?????????????
) -> Dict[str, Any]:
    """
    閺傛壆澧楃粻锟犱壕瀵?Work 閹笛?閸?绱版稉宥呭晙閻?LLM 闁瀚ㄥ銉ュ徔閿涘苯褰ч崷銊ュ爱闁板秴鍞撮柈銊ф暏 LLM 閸嬫岸鈧鐎烽妴?    """
    del api_key, base_url, model, max_steps  # ?????????
    if not file_paths:
        return {"status": "done", "success": False, "answer": "", "trace": [], "error": "file_paths ??"}

    trace: List[dict] = []
    try:
        result = await _process_files_pipeline(
            file_paths=file_paths,
            start_index=0,
            customer_level=customer_level,
            do_register_oos=do_register_oos,
            trace=trace,
            on_step=on_step,
        )
    except Exception as e:
        logger.exception("Work pipeline execution failed")
        return {"status": "done", "success": False, "answer": "", "trace": trace, "error": str(e)}
    return result


async def _run_work_flow_pipeline_resume(
    run_id: str,
    selections: List[dict],
) -> Dict[str, Any]:
    """
    缁狅繝浜惧Ο鈥崇础娑撳绱濇禍鍝勪紣闁瀚ㄩ崥搴ｆ埛缂?Work 濞翠胶鈻奸妴?    """
    state = _work_pipeline_state.pop(run_id, None)
    if not state:
        return {"status": "done", "success": False, "answer": "", "trace": [], "error": "run_id ??????"}
    created_at = state.get("created_at")
    ttl = _get_run_id_ttl_seconds()
    if created_at and (time.time() - float(created_at)) > ttl:
        return {
            "status": "done",
            "success": False,
            "answer": "",
            "trace": list(state.get("trace") or []),
            "error": "run_id 瀹歌尪绻冮張鐕傜礉鐠囩兘鍣搁弬鐗堝⒔鐞?Work",
        }

    file_paths: List[str] = state.get("file_paths") or []
    customer_level: str = state.get("customer_level") or "B_QUOTE"
    do_register_oos: bool = bool(state.get("do_register_oos", True))
    current_index: int = int(state.get("current_file_index", 0) or 0)
    match_result: Dict[str, Any] = state.get("match_result") or {}
    trace: List[dict] = list(state.get("trace") or [])

    # 閸氬牆鑻熸禍鍝勪紣闁瀚?
    try:
        merged = merge_work_pending_choices(match_result, selections)
    except Exception as e:
        logger.exception("Work flow execution failed")
        return {
            "status": "done",
            "success": False,
            "answer": "",
            "trace": trace,
            "error": f"merge_work_pending_choices 婢惰精瑙? {e}",
        }

    trace.append(
        {
            "type": "observation",
            "content": json.dumps(merged, ensure_ascii=False),
        }
    )

    # 瑜版挸澧犻弬鍥︽鐠ф澘鐣繅?銆?+ 缂傞缚鎻?+ 閺冪姾鎻ｉ惂鏄?閿涘苯鍟€娴犲簼绗呮稉鈧稉?鏋冩禒鍓佹埛缂?鐣弫瀵?闁?
    try:
        await _run_pipeline_fill_and_oos(
            file_path=file_paths[current_index],
            match_result=merged,
            do_register_oos=do_register_oos,
            trace=trace,
            on_step=None,
        )
        result = await _process_files_pipeline(
            file_paths=file_paths,
            start_index=current_index + 1,
            customer_level=customer_level,
            do_register_oos=do_register_oos,
            trace=trace,
            on_step=None,
        )
    except Exception as e:
        logger.exception("Work pipeline execution failed")
        return {"status": "done", "success": False, "answer": "", "trace": trace, "error": str(e)}

    # _process_files_pipeline 瀹歌尙绮＄拹鐔荤煑 pending_quotation_draft 娑?awaiting_choices 闁槒绶?    return result


# ---------- 鐎电懓?鐎电厧鍤敍姘壌閹?鍘ょ純?婀粻锟犱壕/ReAct 闂傛潙鍨忛幑?----------


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
    work_run_id: Optional[str] = None,
) -> Dict[str, Any]:
    """
    缂佺喍绔撮崗銉ュ經閿涙岸绮拋銈堣泲缁狅繝浜惧蹇斿⒔鐞涘苯娅掗敍娑樼秼闁板秶鐤?WORK_USE_PIPELINE=false 閺冭泛娲栭柅鈧崚鐗堟＋ ReAct 濞翠胶鈻奸妴?    """
    use_pipeline = True
    try:
        from backend.config import Config

        use_pipeline = bool(getattr(Config, "WORK_USE_PIPELINE", True))
    except Exception:
        use_pipeline = True

    from backend.server.run_log_store import RunLogHandle, append_log, begin_run_log, finalize_log

    log_handle: Optional[RunLogHandle] = None
    if work_run_id:
        try:
            context = {
                "file_paths": list(file_paths),
                "customer_level": customer_level,
                "do_register_oos": do_register_oos,
                "mode": "pipeline" if use_pipeline else "react",
            }
            log_handle = begin_run_log("work", work_run_id, context)
        except Exception:
            # Run Log 失败不能影响主流程
            log_handle = None

    result: Dict[str, Any]
    try:
        if use_pipeline:
            result = await _run_work_flow_pipeline(
                file_paths=file_paths,
                customer_level=customer_level,
                do_register_oos=do_register_oos,
                api_key=api_key,
                base_url=base_url,
                model=model,
                on_step=on_step,
                max_steps=max_steps,
            )
        else:
            result = await _run_work_flow_react(
                file_paths=file_paths,
                customer_level=customer_level,
                do_register_oos=do_register_oos,
                api_key=api_key,
                base_url=base_url,
                model=model,
                on_step=on_step,
                max_steps=max_steps,
            )

        # 将 metrics 摘要写入 Run Log，避免重复解析整段 trace。
        if log_handle is not None:
            try:
                trace_entries = result.get("trace") or []
                if isinstance(trace_entries, list):
                    for entry in trace_entries:
                        if not isinstance(entry, dict):
                            continue
                        if entry.get("type") != "metrics":
                            continue
                        stage = str(entry.get("stage") or "")
                        details = {k: v for k, v in entry.items() if k not in ("type", "stage")}
                        append_log(
                            log_handle,
                            stream="info",
                            message=f"stage_metrics:{stage or 'unknown'}",
                            stage=stage or None,
                            details=details,
                        )
            except Exception:
                # metrics 日志失败不影响主流程
                pass

        return result
    except Exception as e:
        if log_handle is not None:
            try:
                append_log(
                    log_handle,
                    stream="error",
                    message="work_run_failed",
                    details={"error": str(e)},
                )
                finalize_log(log_handle, status="error", error=str(e))
            except Exception:
                pass
        raise
    finally:
        if log_handle is not None:
            # 如果前面已经在异常分支 finalize 过，这里再次调用也只是多写一行 summary，不影响流程。
            try:
                status = "success"
                error_text: Optional[str] = None
                try:
                    ok = bool(result.get("success", True))  # type: ignore[name-defined]
                    if not ok:
                        status = "error"
                        error_text = str(result.get("error") or "")  # type: ignore[name-defined]
                except Exception:
                    # result 可能在异常分支未定义
                    status = "error"
                finalize_log(log_handle, status=status, error=error_text)
            except Exception:
                pass


async def run_work_flow_resume(
    run_id: str,
    selections: List[dict],
) -> Dict[str, Any]:
    """
    缂佺喍绔撮崗銉ュ經閿涙岸绮拋銈堣泲缁狅繝浜惧Ο鈥崇础 resume閿涙稑缍嬮柊宥囩枂 WORK_USE_PIPELINE=false 閺冭泛娲栭柅鈧崚鐗堟＋ ReAct resume閵?    """
    use_pipeline = True
    try:
        from backend.config import Config

        use_pipeline = bool(getattr(Config, "WORK_USE_PIPELINE", True))
    except Exception:
        use_pipeline = True

    if use_pipeline:
        return await _run_work_flow_pipeline_resume(run_id=run_id, selections=selections)
    return await _run_work_flow_resume_react(run_id=run_id, selections=selections)

