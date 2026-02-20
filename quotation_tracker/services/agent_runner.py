# 报价单 Agent 运行器：ReAct 范式（思考 → 行动 → 观察 → 继续）
# 与 inventory_agent/services/agent_runner 规范对齐：同轮多 tool_call 并行、返回含 steps、工具层超时在 quotation_agent_tool 内
from __future__ import annotations

import json
import logging
import re
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from typing import Any

from config import (
    OPENAI_BASE_URL,
    LLM_API_KEY,
    LLM_MODEL,
    LLM_MAX_TOKENS,
    OPENAI_API_KEY,
    TOOL_RESULT_MAX_CHARS,
)
from .quotation_agent_tool import (
    get_quotation_tools_openai_format,
    execute_quotation_tool,
)
from .execution_tracer import ExecutionTracer

logger = logging.getLogger(__name__)

# 智谱兼容
ZHIPU_BASE = "https://open.bigmodel.cn/api/paas/v4"


def _client_and_model():
    try:
        from openai import OpenAI
    except ImportError:
        raise ImportError("pip install openai")
    api_key = LLM_API_KEY or OPENAI_API_KEY or ""
    base_url = OPENAI_BASE_URL or ZHIPU_BASE
    model = LLM_MODEL or "glm-4-flash"
    if (not base_url or base_url == "https://api.openai.com/v1") and "glm" in (model or "").lower():
        base_url = ZHIPU_BASE
    return OpenAI(api_key=api_key, base_url=base_url), model


def _system_prompt() -> str:
    return """你是报价单无货登记助手，负责解析报价单 Excel 并将无货产品落库。

**工具调用顺序（三步流程）**：

第一步 — analyze_quotation_excel(file_path)
  统计报价单中的无货行数及行号，了解大概情况。
  → 若结果显示无货行数为 0，直接告知用户「未发现无货产品」，**结束，不执行第二步和第三步**。

第二步 — get_out_of_stock_records(file_path)
  抓取所有无货行的原始数据（含表头）。由你观察列含义，识别 product_name、specification、unit、quantity 对应哪列。

第三步 — persist_out_of_stock_records(file_name, records)
  将你映射好的无货产品记录落库。records 每条含 {product_name, specification?, unit?, quantity?}，只传入有效产品行（跳过表头、合计、空行等）。file_name 取用户消息中的文件名。

**格式要求**
每轮回复都必须先输出 <think>，再输出工具调用或最终回答：
<think>
目标: [当前要完成什么]
已知: [observation 给了什么，或用户提供了什么]
行动: [准备调用哪个工具 / 或直接回答原因]
</think>"""


def _path_from_user_message(user_text: str) -> str | None:
    m = re.search(r"文件路径[：:]\s*(.+?)(?=\n\n|\n用户|\n$|$)", user_text, re.DOTALL)
    if m:
        return m.group(1).strip()
    return None


def _try_parse_file_path_from_assistant(content: str) -> str | None:
    if not content or ".xlsx" not in content:
        return None
    for pattern in [
        r'\{\s*"file_path"\s*:\s*"([^"]+)"',
        r'"file_path"\s*:\s*"((?:[^"\\]|\\.)+)"',
    ]:
        m = re.search(pattern, content)
        if m:
            path = m.group(1).replace("\\\\", "\\").strip()
            if ".xlsx" in path or path.endswith(".xlsm"):
                return path
    return None


def _try_parse_persist_from_content(content: str, default_file_name: str) -> dict[str, Any] | None:
    """
    从助理文本中解析 persist_out_of_stock_records 的 file_name、sheet_name、records，
    使「只输出文本版 tool_call、未走 API tool_calls」时也能落库。
    支持 <tool_call>persist_out_of_stock_records<arg_key>file_name</arg_key><arg_value>...</arg_value>...
    以及 JSON 片段 "file_name": "xxx", "sheet_name": "询价单", "records": [...]
    """
    if not content or "persist_out_of_stock_records" not in content:
        return None
    file_name = default_file_name
    sheet_name = ""
    records: list[dict] = []

    # 1) XML 式 <arg_key>file_name</arg_key><arg_value>xxx</arg_value> 等
    m_fn = re.search(r"<arg_key>\s*file_name\s*</arg_key>\s*<arg_value>\s*([^<]+?)\s*</arg_value>", content, re.IGNORECASE | re.DOTALL)
    if m_fn:
        file_name = m_fn.group(1).strip()
    m_sh = re.search(r"<arg_key>\s*sheet_name\s*</arg_key>\s*<arg_value>\s*([^<]*?)\s*</arg_value>", content, re.IGNORECASE | re.DOTALL)
    if m_sh:
        sheet_name = m_sh.group(1).strip()
    m_rec = re.search(r"<arg_key>\s*records\s*</arg_key>\s*<arg_value>([\s\S]*?)</arg_value>", content, re.IGNORECASE)
    if m_rec:
        try:
            raw = m_rec.group(1).strip()
            records = json.loads(raw)
        except json.JSONDecodeError:
            pass

    # 2) JSON 片段 "file_name": "xxx", "sheet_name": "询价单", "records": [...]
    if not records and '"records"' in content:
        idx = content.find('"records"')
        if idx >= 0:
            br = content.find("[", idx)
            if br >= 0:
                depth = 0
                for i in range(br, len(content)):
                    if content[i] == "[":
                        depth += 1
                    elif content[i] == "]":
                        depth -= 1
                        if depth == 0:
                            try:
                                records = json.loads(content[br : i + 1])
                            except json.JSONDecodeError:
                                pass
                            break
        m2 = re.search(r'"file_name"\s*:\s*"([^"]+)"', content)
        if m2:
            file_name = m2.group(1).strip()
        if not sheet_name:
            m3 = re.search(r'"sheet_name"\s*:\s*"([^"]*)"', content)
            if m3:
                sheet_name = m3.group(1).strip()

    if not records or not isinstance(records, list):
        return None
    return {"file_name": file_name, "sheet_name": sheet_name, "records": records}


def run_quotation_agent(file_path: str, question: str, file_name: str | None = None, max_steps: int = 8) -> dict[str, Any]:
    """
    在前端传入的 file_path 上跑 Agent：LLM 可统计无货、抓取无货记录、观察后选择并持久化到 DB。
    返回契约（与 inventory run_inventory_agent 对齐）：answer, thinking, steps, trace, trace_text, error。
    """
    fname = file_name or Path(file_path).name
    user_content = f"请根据用户问题处理这份报价单。\n\n文件路径：{file_path}\n文件名：{fname}\n\n用户问题：{question}"
    tools = get_quotation_tools_openai_format()
    messages = [
        {"role": "system", "content": _system_prompt()},
        {"role": "user", "content": user_content},
    ]
    thinking_parts = []
    steps: list[dict[str, Any]] = []
    last_answer = ""

    tracer = ExecutionTracer()

    def emit(step_type: str, data: Any = None) -> None:
        steps.append({"type": step_type, "data": data})

    try:
        client, model = _client_and_model()
    except Exception as e:
        return {"answer": "", "thinking": None, "steps": steps, "trace": {}, "trace_text": "", "error": str(e)}

    for step in range(max_steps):
        # P0 修复：所有步骤都传 tools，不再限制只有 step 0
        kwargs = {"model": model, "messages": messages, "max_tokens": LLM_MAX_TOKENS, "tools": tools, "tool_choice": "auto"}

        emit("llm_start", {"step": step + 1})
        try:
            resp = client.chat.completions.create(**kwargs)
        except Exception as e:
            return {"answer": last_answer or "", "thinking": "\n".join(thinking_parts) or None, "steps": steps, "trace": tracer.to_dict(), "trace_text": tracer.format_text(), "error": str(e)}

        msg = resp.choices[0].message if resp.choices else None
        if not msg:
            break

        content = (msg.content or "").strip()
        # 抽取思考与回答
        for start, end in [("<think>", "</think>"), ("<reasoning>", "</reasoning>")]:
            if start in content and end in content:
                try:
                    i, j = content.index(start) + len(start), content.index(end)
                    thinking_text = content[i:j].strip()
                    thinking_parts.append(thinking_text)
                    emit("thinking", thinking_text)
                    tracer.add(step, "thinking", thinking_text)
                    content = (content[: content.index(start)] + content[j + len(end) :]).strip()
                except ValueError:
                    pass
        if content:
            last_answer = content

        tool_calls = getattr(msg, "tool_calls", None) or []
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

            def run_one(tid: str, name: str, args: dict) -> tuple[str, str]:
                result = execute_quotation_tool(name or "analyze_quotation_excel", args)
                result_str = result.get("result", result)
                if isinstance(result_str, dict):
                    result_str = result_str.get("message", json.dumps(result_str, ensure_ascii=False))
                else:
                    result_str = str(result_str)
                return tid, result_str[:TOOL_RESULT_MAX_CHARS]

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

        # 无 tool_calls：若像「要统计无货」且还没执行过工具，做兜底
        if step == 0 and ("无货" in content or "报价" in content or "analyze" in content.lower() or "file_path" in content or "Excel" in content):
            path_to_use = _path_from_user_message(user_content) or _try_parse_file_path_from_assistant(content) or file_path
            logger.info("agent fallback: run analyze_quotation_excel path=%s", path_to_use[:80] if len(path_to_use) > 80 else path_to_use)
            result = execute_quotation_tool("analyze_quotation_excel", {"file_path": path_to_use})
            result_str = result.get("result", result)
            if isinstance(result_str, dict):
                result_str = result_str.get("message", json.dumps(result_str, ensure_ascii=False))
            else:
                result_str = str(result_str)
            messages.append({"role": "assistant", "content": content or ""})
            messages.append({"role": "user", "content": f"工具 analyze_quotation_excel 执行结果：{result_str}\n请根据上述结果用一句话回答用户。"})
            continue

        # 兜底：content 里写了 persist_out_of_stock_records 但未走 API tool_calls 时，解析并落库
        persist_payload = _try_parse_persist_from_content(content, fname or "")
        if persist_payload:
            try:
                out = execute_quotation_tool(
                    "persist_out_of_stock_records",
                    {
                        "file_name": persist_payload["file_name"],
                        "sheet_name": persist_payload.get("sheet_name", ""),
                        "records": persist_payload["records"],
                    },
                )
                last_answer = (content or last_answer or "").rstrip()
                if out.get("success"):
                    res = out.get("result") or {}
                    n = res.get("inserted", len(persist_payload["records"]))
                    last_answer += f"\n\n已落库：{int(n)} 条无货记录。"
                else:
                    last_answer += f"\n\n落库失败：{out.get('error', 'unknown')}"
            except Exception as e:
                last_answer = (content or last_answer or "").rstrip() + f"\n\n落库失败：{e}"
            emit("answer", last_answer)
            tracer.add(step, "answer", last_answer)
            break

        last_answer = content or last_answer
        emit("answer", last_answer)
        tracer.add(step, "answer", last_answer)
        break

    return {
        "answer": last_answer or "",
        "thinking": "\n".join(thinking_parts) if thinking_parts else None,
        "steps": steps,
        "trace": tracer.to_dict(),
        "trace_text": tracer.format_text(),
        "error": None,
    }
