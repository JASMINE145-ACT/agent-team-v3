"""
SingleAgent — 单主 Agent，掌握所有技能，无子 Agent 委托。

ReAct：<think> → 工具调用或直接回答。

升级（相比初版）：
1. 无 <reflect>/Decision：终止信号依赖 API finish_reason（无 tool_calls → stop），
   无需模型写 Decision 文本，减少 token 消耗与格式错误。
2. 步数耗尽优雅降级：最后一步注入「直接回答」提示并禁用工具，避免静默截断。
3. 流式输出：execute_react(on_token=...) 时对每步 LLM 调用启用 stream=True，
   实时推送文本 token（含 <think> 内容）。
4. Context 管理：messages 总内容超 _CONTEXT_MAX_CHARS（40K）时自动压缩旧 tool 消息。
5. Tool 钩子：before_tool_call（参数归一化/权限拦截）、after_tool_call（observation 加工）。
"""

import asyncio
import json
import logging
import re
import types as _types
from typing import Any, Callable, Dict, List, Optional, Tuple

from openai import OpenAI

from backend.core.single_agent.tools import get_all_tools, execute_tool

logger = logging.getLogger(__name__)

TOOL_RESULT_MAX_CHARS = 16000
_CONTEXT_MAX_CHARS = 40_000  # messages 总内容压缩阈值（约 10K token）
_MAX_STEPS_HINT = "（已达最大步数）请根据目前已获取的信息直接给出最终回答，不再调用任何工具。"


def _extract_tag(content: str, tag: str) -> Tuple[str, str]:
    pattern = re.compile(rf"<{tag}>(.*?)</{tag}>", re.DOTALL | re.IGNORECASE)
    match = pattern.search(content)
    if not match:
        return content, ""
    extracted = match.group(1).strip()
    cleaned = pattern.sub("", content).strip()
    return cleaned, extracted


def _trim_context(messages: List[dict], max_chars: int = _CONTEXT_MAX_CHARS) -> None:
    """原地压缩：messages 总内容超限时，将最旧的 role:tool 消息替换为长度摘要。"""
    total = sum(len(str(m.get("content") or "")) for m in messages)
    if total <= max_chars:
        return
    for m in messages:
        if m.get("role") == "tool":
            orig = str(m.get("content") or "")
            if len(orig) > 200:
                m["content"] = f"[已压缩，原长 {len(orig)} 字符]"
                total -= len(orig) - len(m["content"])
                if total <= max_chars:
                    break


def _call_llm_streaming_sync(
    client: OpenAI,
    kwargs: dict,
    on_token: Callable[[str], None],
) -> Tuple[str, List]:
    """
    同步流式调用，设计在 asyncio.to_thread 中执行。
    实时调用 on_token 推送文本 token（含 <think> 内容）。
    返回 (content, tool_calls)，tool_calls 为 SimpleNamespace 列表。
    """
    stream = client.chat.completions.create(**{**kwargs, "stream": True})
    content_parts: List[str] = []
    tool_calls_raw: Dict[int, dict] = {}

    for chunk in stream:
        if not chunk.choices:
            continue
        delta = chunk.choices[0].delta
        if delta.content:
            on_token(delta.content)
            content_parts.append(delta.content)
        if delta.tool_calls:
            for tc_delta in delta.tool_calls:
                idx = tc_delta.index
                if idx not in tool_calls_raw:
                    tool_calls_raw[idx] = {
                        "id": getattr(tc_delta, "id", "") or "",
                        "name": "",
                        "arguments": "",
                    }
                fn = getattr(tc_delta, "function", None)
                if fn:
                    if fn.name:
                        tool_calls_raw[idx]["name"] += fn.name
                    if fn.arguments:
                        tool_calls_raw[idx]["arguments"] += fn.arguments

    content = "".join(content_parts)
    tool_calls = [
        _types.SimpleNamespace(
            id=tool_calls_raw[k]["id"],
            function=_types.SimpleNamespace(
                name=tool_calls_raw[k]["name"],
                arguments=tool_calls_raw[k]["arguments"],
            ),
        )
        for k in sorted(tool_calls_raw)
    ]
    return content, tool_calls


# ---------------------------------------------------------------------------
# 技能块常量（各自独立，便于按需组装）
# ---------------------------------------------------------------------------

_SKILL_INVENTORY_PRICE = """\
**1. 库存与万鼎价格**
- **目标**：查库存、查万鼎报价、查某产品各档位价格/利润率。
- **search_inventory(keywords)**：按产品名/规格关键词搜库存，返回匹配产品的库存与可售数量。
- **get_inventory_by_code(code)**：已知 10 位物料编号时直接查库存。
- **match_wanding_price(keywords, customer_level?)**：万鼎价格库匹配。返回三种情况：未匹配；single（1 条）；needs_selection（多条 candidates）。
- **select_wanding_match(keywords, candidates)**：从多条候选中**只选 1 个**，用于「需要唯一产品」的场景（见下）。
- **何时用**：仅当用户**已明确**是「库存/还有多少货/可售」或「价格/报价/万鼎/档位价格/利润率」时，才选用上述工具。若用户只说「查询XX」「查XX」而**未指明**是查库存还是查价格 → **勿直接调用** search_inventory 或 match_wanding_price，应走澄清（见下）。
- **中文优先万鼎**：用户输入为**中文**产品名/规格（如 25管卡、PVC三通、进水软管）时，**优先用 match_wanding_price** 查价格；查库存时可先 match_wanding_price 得 code 再 get_inventory_by_code，或英文关键词时才用 search_inventory。search_inventory 更适配英文关键词。
- **needs_selection 时是否选一个**：
  - 用户要 **「全部类型价格」「所有类型」「全部匹配」「全部价格」** → **不要**调 select_wanding_match；直接用 observation 里的 **candidates 整表**整理成表格回复（即「全部」= 所有 candidates）。
  - 用户要 **某一款产品的报价**、或 **询价填充/填报价单**（每行需一个产品）→ 必须再调 **select_wanding_match(keywords, candidates)** 从候选中选 1 个。
  - **用户说「帮我选一个」「你选」「选哪个」「选一个」等**（且上一轮或本会话中已出现过 **candidates 列表**）→ **必须**调用 **select_wanding_match**，**不要**在 <think> 或回复里自己推荐。该工具内嵌专业知识，选型结果必须由工具返回后再整理成回复。"""

_SKILL_OOS = """\
**2. 无货**
- **目标**：无货登记、无货列表、无货统计（含被报无货次数、邮件状态、按文件/按时间）。
- **get_oos_list(limit?)**：无货产品列表，每条含「被报无货 N 次」「邮件：已发送/未发」。用户问「无货列表」「无货有哪些」「他们被报无货几次」时用。
- **get_oos_stats()**：无货统计（总记录数、无货产品数、被报无货≥2 次产品数、已发邮件产品数、今日新增）。用户问「无货统计」「无货概况」时用。
- **get_oos_by_file(limit?)**：按文件统计，每个报价单对应的无货记录数及上传时间。用户问「按文件看无货」「每个文件多少无货」时用。
- **get_oos_by_time(last_n_days?)**：按时间（按日）统计最近 N 天新增无货记录数。用户问「按时间看无货」「无货按日/按天」「最近几天无货趋势」时用。
- **register_oos(file_path, prompt?)**：无货登记，从报价单解析无货行并落库。**仅当用户明确说「无货登记」且 context 中已有 file_path 时调用**；无 file_path 时提示先上传。"""

_SKILL_QUOTE = """\
**3. 报价单（提取/填表/普适 Excel）**
- **目标**：从报价单取数据、往报价单填数据、或任意 Excel 解析/编辑。
- **extract_quotation_data(file_path, sheet_name?)**：从报价单提取第 2 行到「Total Excluding PPN」上一行的数据，返回 Markdown 表。需 context 有 file_path。
- **fill_quotation_sheet(file_path, fill_items, ...)**：将匹配结果按行回填报价单（row, code, quote_name, unit_price, qty 等）。
- **parse_excel_smart(file_path, sheet_name?, max_rows?)**：普适解析任意 Excel，零硬编码，返回 Markdown 表。
- **edit_excel(file_path, edits, ...)**：普适编辑任意 Excel（cell+value 或 range+values）。
- **何时用**：用户要「提取报价数据」「看报价单内容」「填表」「解析/编辑这个 Excel」且 context 有 file_path 时用；**整单询价填充**用下面的 run_quotation_fill。"""

_SKILL_FILL = """\
**4. 询价填充（整单流水线）**
- **目标**：对整张报价单做「提取 → 万鼎匹配 → 库存校验 → 回填」一条龙。
- **run_quotation_fill(file_path, customer_level?)**：仅当用户明确说「询价填充」「填充报价单」「完整报价」且 context 有 file_path 时调用。customer_level 默认 B。"""

_SKILL_CLARIFY = """\
**5. 澄清**
- **ask_clarification(questions, reasoning?)**：当用户意图**不明确**时必须使用，例如：
  - 用户只说「查询XX」「查XX」「查一下25管卡」等，**未指明**是查**库存**还是查**价格/报价** → 必须 ask_clarification，例如：「您是想查该产品的库存数量，还是查万鼎报价/各档位价格？或两者都要？」
  - 用户只说「帮我查一下」等极简输入 → 必须 ask_clarification。
- 只有在用户已明确提到「库存」「还有多少货」「可售」或「价格」「报价」「万鼎」「档位」等其中之一时，才可直接选用库存类或价格类工具，勿擅自默认成库存或价格。"""

# 所有技能的默认顺序（按需过滤时维持此顺序）
_ALL_SKILLS = [
    _SKILL_INVENTORY_PRICE,
    _SKILL_OOS,
    _SKILL_QUOTE,
    _SKILL_FILL,
    _SKILL_CLARIFY,
]

_PROMPT_OUTPUT_FORMAT = """\
## 输出格式（每轮必须）

1. 先输出 <think>...</think>
   - 目标 / 已知 / 缺失 / 本步行动（调用哪类工具或直接回答）。
2. 若调用工具：紧接 tool_call；工具结果返回后，若目标已完成则直接输出最终回答（无需再调工具）；否则继续下一轮工具调用。
3. 若不调用工具（如打招呼、能力外）：在 <think> 后直接给出最终回答。

**多轮指代**：会话上下文中已有上一轮回答（如价格表、候选列表）时，用户说「选哪个」「帮我选一个」「你选」→ **必须**调用 **select_wanding_match**（keywords 用上一轮询价关键词，candidates 从上一轮 observation 或回复表格中解析），勿在 <think> 里自行推荐。用户说「那个产品」「查这个的库存」→ 用上一轮表格里的**完整产品名或编号**调用 search_inventory / get_inventory_by_code / match_wanding_price，勿用用户本句的简称或错字。"""


def _build_system_prompt() -> str:
    skills_section = "\n\n".join(_ALL_SKILLS)
    return (
        "你是统一业务助手，**一个主 Agent 掌握全部技能**，根据用户意图直接选用下方工具完成目标。无子 Agent，不委托、不转发。\n\n"
        "---\n\n"
        "## 技能与工具（按目标选用）\n\n"
        + skills_section
        + "\n\n---\n\n"
        + _PROMPT_OUTPUT_FORMAT
    )


class SingleAgent:
    def __init__(
        self,
        api_key: str,
        base_url: str,
        model: str,
        session_store=None,
    ):
        self.client = OpenAI(api_key=api_key, base_url=base_url)
        self.model = model
        if session_store is None:
            from backend.core.context_system.session_store import get_session_store
            session_store = get_session_store()
        self._store = session_store
        self._system_prompt = _build_system_prompt()

    async def execute_react(
        self,
        user_input: str,
        context: Optional[Dict] = None,
        max_steps: int = 8,
        session_id: Optional[str] = None,
        on_token: Optional[Callable[[str], None]] = None,
        on_tool_start: Optional[Callable[[str, int, int], None]] = None,
        on_tool_calls_ready: Optional[Callable[[int], None]] = None,
        on_event: Optional[Callable[[str, dict], None]] = None,
        before_tool_call: Optional[Callable[[str, dict], Optional[dict]]] = None,
        after_tool_call: Optional[Callable[[str, dict, str], str]] = None,
    ) -> Dict[str, Any]:
        """
        ReAct 主循环。

        on_token          (str) → None       每步 LLM 文本 token 实时回调（流式模式）。
        on_tool_start     (name, i, total)   工具开始执行前回调，用于 CLI 进度展示。
        on_tool_calls_ready (total)          流式结束、工具执行前回调，提示「收到 N 个工具调用」。
        on_event          (type, payload)    lifecycle 事件：loop_start / loop_end / loop_error。
                                             企业微信/IM 收到 loop_end 后再向用户发回复。

        before_tool_call  (name, args) → Optional[dict]
                          工具执行前钩子。返回修改后的 args 继续执行；返回 None 拦截，
                          模型收到「工具 {name} 已被拦截」observation。
                          典型用途：参数归一化、权限检查、危险操作前置校验。

        after_tool_call   (name, args, obs) → str
                          工具执行后钩子。对 observation 做任意加工（摘要/脱敏/截断）后返回。
                          典型用途：压缩长 JSON observation 省 token、抹掉内部路径。
        """
        def _fire(event_type: str, payload: dict) -> None:
            if on_event:
                try:
                    on_event(event_type, {"session_id": session_id or "", **payload})
                except Exception:
                    pass

        _fire("loop_start", {"query": user_input[:200]})

        user_content = user_input.strip()
        if context and context.get("file_path"):
            user_content += f"\n\n[Context: 已上传报价单，file_path={context['file_path']}]"

        if session_id and self._store:
            session = self._store.load(session_id)
            if context and context.get("file_path"):
                session.file_path = context["file_path"]
            injection = self._store.build_injection(session)
            if injection:
                user_content += f"\n\n{injection}"

        tools = get_all_tools()
        messages: List[dict] = [
            {"role": "system", "content": self._system_prompt},
            {"role": "user", "content": user_content},
        ]

        thinking_parts: List[str] = []
        trace: List[dict] = []
        last_answer = ""
        ctx = context or {}

        try:
            from backend.config import Config
            max_tokens = getattr(Config, "LLM_MAX_TOKENS", 5000)
        except Exception:
            max_tokens = 5000

        for step in range(max_steps):
            is_last_step = (step == max_steps - 1)

            # 升级 2：步数耗尽优雅降级 — 最后一步注入提示，禁用工具
            if is_last_step:
                messages.append({"role": "user", "content": _MAX_STEPS_HINT})

            kwargs: Dict[str, Any] = {
                "model": self.model,
                "messages": messages,
                "temperature": 0.1,
                "max_tokens": max_tokens,
            }
            if not is_last_step:
                kwargs["tools"] = tools
                kwargs["tool_choice"] = "auto"

            # 升级 3：流式调用（on_token 时）或阻塞调用
            if on_token is not None:
                content, tool_calls = await asyncio.to_thread(
                    _call_llm_streaming_sync, self.client, kwargs, on_token
                )
            else:
                resp = self.client.chat.completions.create(**kwargs)
                msg = resp.choices[0].message if resp.choices else None
                if not msg:
                    break
                content = (msg.content or "").strip()
                tool_calls = list(getattr(msg, "tool_calls", None) or [])

            # 提取 <think>
            content, thought = _extract_tag(content, "think")
            if thought:
                thinking_parts.append(thought)
                trace.append({"step": step + 1, "type": "thinking", "content": thought})

            # 升级 1：无 tool_calls → finish_reason=stop → 最终回答，结束
            if not tool_calls:
                if content:
                    last_answer = content
                    trace.append({"step": step + 1, "type": "response", "content": content})
                break

            # 构建 assistant 消息（含所有 tool_calls，只追加一次，修复原双追加 bug）
            tool_calls_for_msg = [
                {
                    "id": getattr(tc, "id", "") or f"call_{i}",
                    "type": "function",
                    "function": {
                        "name": getattr(tc.function, "name", "") or "",
                        "arguments": getattr(tc.function, "arguments", "{}") or "{}",
                    },
                }
                for i, tc in enumerate(tool_calls)
            ]
            messages.append({
                "role": "assistant",
                "content": content or None,
                "tool_calls": tool_calls_for_msg,
            })

            # 执行工具，每个 tool_call 追加对应 tool result
            n_tools = len(tool_calls)
            if on_tool_calls_ready and n_tools > 0:
                try:
                    on_tool_calls_ready(n_tools)
                except Exception:
                    pass
            for i, tc in enumerate(tool_calls):
                name = getattr(tc.function, "name", "") or ""
                if on_tool_start:
                    try:
                        on_tool_start(name, i + 1, n_tools)
                    except Exception:
                        pass
                try:
                    args = json.loads(getattr(tc.function, "arguments", "{}") or "{}")
                except json.JSONDecodeError:
                    args = {}
                tc_id = tool_calls_for_msg[i]["id"]

                # before_tool_call 钩子：参数归一化 / 权限拦截
                blocked = False
                if before_tool_call:
                    try:
                        modified = before_tool_call(name, args)
                        if modified is None:
                            obs = json.dumps({"error": f"工具 {name} 已被拦截", "blocked": True}, ensure_ascii=False)
                            blocked = True
                        else:
                            args = modified
                    except Exception as hook_err:
                        logger.warning("before_tool_call 异常（跳过）: %s", hook_err)

                trace.append({"step": step + 1, "type": "tool_call", "name": name, "arguments": args})

                if not blocked:
                    obs = await execute_tool(name, args, ctx)
                    if len(obs) > TOOL_RESULT_MAX_CHARS:
                        obs = obs[:TOOL_RESULT_MAX_CHARS] + "\n…（已截断）"

                # after_tool_call 钩子：observation 加工（摘要/脱敏/截断）
                if after_tool_call and not blocked:
                    try:
                        obs = after_tool_call(name, args, obs)
                    except Exception as hook_err:
                        logger.warning("after_tool_call 异常（跳过）: %s", hook_err)

                trace.append({"step": step + 1, "type": "observation", "content": obs})
                messages.append({
                    "role": "tool",
                    "tool_call_id": tc_id,
                    "content": obs,
                })

            # 升级 4：Context 压缩 — 防止 messages 超长
            _trim_context(messages)

        # 澄清处理
        needs_clarification = False
        clarification_questions: Optional[List[str]] = None
        if last_answer and "needs_clarification" in last_answer:
            try:
                d = json.loads(last_answer)
                if d.get("needs_clarification"):
                    needs_clarification = True
                    clarification_questions = d.get("questions", [])
                    last_answer = "请补充说明：" + ("；".join(clarification_questions) if clarification_questions else "您的意图不太明确。")
            except Exception:
                pass

        if session_id and self._store and last_answer:
            try:
                self._store.save_turn(
                    session_id=session_id,
                    query=user_input,
                    agent="single",
                    answer=last_answer,
                    file_path=ctx.get("file_path"),
                )
            except Exception as e:
                logger.warning("Session save_turn failed: %s", e)

        result = {
            "answer": last_answer or "",
            "thinking": "\n".join(thinking_parts) if thinking_parts else None,
            "trace": trace,
            "needs_clarification": needs_clarification,
            "clarification_questions": clarification_questions,
            "error": None,
        }
        _fire("loop_end", {k: v for k, v in result.items() if k != "error"})
        return result
