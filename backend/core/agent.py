"""
CoreAgent — 纯 ReAct 引擎，不含任何业务逻辑。
业务通过 AgentExtension 注入。
"""
import asyncio
import json
import logging
import re
import types as _types
from typing import Any, Callable, Dict, List, Optional, Tuple

from openai import OpenAI

from backend.core.registry import ToolRegistry
from backend.core.extension import AgentExtension, ExtensionContext
from backend.config import Config
from backend.core.context_compression import build_tool_call_id_to_name, make_summarizer
from backend.agent.session import SessionStore, get_session_store

logger = logging.getLogger(__name__)

# 单次工具结果最大字符数（过大会导致多轮 ReAct 时 prompt 迅速膨胀）
TOOL_RESULT_MAX_CHARS = 8_000
# 多轮对话总上下文上限，超出时压缩历史 tool 结果（越小越早压缩、越省 token）
_CONTEXT_MAX_CHARS = 8_000
_MAX_STEPS_HINT = "（已达最大步数）请根据目前已获取的信息直接给出最终回答，不再调用任何工具。"
_CORE_OUTPUT_FORMAT = """\
## 输出格式（每轮必须）
1. 先输出 <think>...</think>：目标 / 已知 / 缺失 / 本步行动。
2. 若调用工具：紧接 tool_call；结果返回后目标已完成则直接输出最终回答；否则继续下一轮。
3. 若不调用工具：在 <think> 后直接给出最终回答。
**多轮指代**：用户说「选哪个」→ 必须调用 select_wanding_match；用户说「那个产品」→ 用上轮完整名称。"""


def _extract_tag(content: str, tag: str) -> Tuple[str, str]:
    pattern = re.compile(rf"<{tag}>(.*?)</{tag}>", re.DOTALL | re.IGNORECASE)
    match = pattern.search(content)
    if not match:
        return content, ""
    return pattern.sub("", content).strip(), match.group(1).strip()


def _trim_context(
    messages: List[dict],
    max_chars: int = _CONTEXT_MAX_CHARS,
    tool_call_id_to_name: Optional[Dict[str, str]] = None,
    summarizer: Optional[Callable[[str, str], str]] = None,
) -> None:
    total = sum(len(str(m.get("content") or "")) for m in messages)
    if total <= max_chars:
        return
    id_to_name = tool_call_id_to_name or {}
    for m in messages:
        if m.get("role") == "tool":
            orig = str(m.get("content") or "")
            if len(orig) <= 200:
                continue
            if summarizer is not None:
                tool_name = id_to_name.get(m.get("tool_call_id") or "", "")
                m["content"] = summarizer(tool_name, orig)
            else:
                m["content"] = f"[已压缩，原长 {len(orig)} 字符]"
            total -= len(orig) - len(m["content"])
            if total <= max_chars:
                break


def _call_llm_streaming_sync(client, kwargs, on_token) -> Tuple[str, List, Optional[Dict]]:
    create_kw = {**kwargs, "stream": True, "stream_options": {"include_usage": True}}
    stream = client.chat.completions.create(**create_kw)
    content_parts: List[str] = []
    tool_calls_raw: Dict[int, dict] = {}
    last_usage = None
    for chunk in stream:
        if getattr(chunk, "usage", None):
            u = chunk.usage
            last_usage = {"prompt_tokens": u.prompt_tokens or 0, "completion_tokens": u.completion_tokens or 0}
        if not chunk.choices:
            continue
        delta = chunk.choices[0].delta
        if delta.content:
            on_token(delta.content)
            content_parts.append(delta.content)
        if delta.tool_calls:
            for tc in delta.tool_calls:
                idx = tc.index
                if idx not in tool_calls_raw:
                    tool_calls_raw[idx] = {"id": getattr(tc, "id", "") or "", "name": "", "arguments": ""}
                fn = getattr(tc, "function", None)
                if fn:
                    if fn.name:
                        tool_calls_raw[idx]["name"] += fn.name
                    if fn.arguments:
                        tool_calls_raw[idx]["arguments"] += fn.arguments
    content = "".join(content_parts)
    tool_calls = [
        _types.SimpleNamespace(
            id=tool_calls_raw[k]["id"],
            function=_types.SimpleNamespace(name=tool_calls_raw[k]["name"], arguments=tool_calls_raw[k]["arguments"]),
        )
        for k in sorted(tool_calls_raw)
    ]
    return content, tool_calls, last_usage


def _build_system_prompt(skill_prompt: str, output_format: str) -> str:
    return (
        "你是统一业务助手，**一个主 Agent 掌握全部技能**，根据用户意图直接选用下方工具完成目标。无子 Agent，不委托、不转发。\n\n"
        "---\n\n## 技能与工具（按目标选用）\n\n"
        + skill_prompt
        + "\n\n---\n\n"
        + (output_format or _CORE_OUTPUT_FORMAT)
    )


class CoreAgent:
    def __init__(
        self,
        api_key: str,
        base_url: str,
        model: str,
        extensions: List[AgentExtension],
        session_store: Optional[SessionStore] = None,
    ):
        self.client = OpenAI(api_key=api_key, base_url=base_url)
        self.model = model
        self._extensions = extensions

        if session_store is None:
            session_store = get_session_store()
        self._store = session_store

        self._registry = ToolRegistry()
        ctx = ExtensionContext(registry=self._registry, session_store=self._store)
        skill_parts: List[str] = []
        output_fmt = ""
        for ext in extensions:
            ext.register(ctx)
            sp = ext.get_skill_prompt()
            if sp:
                skill_parts.append(sp)
            of = ext.get_output_format_prompt()
            if of:
                output_fmt = of
        self._system_prompt = _build_system_prompt("\n\n".join(skill_parts), output_fmt)

    async def execute_react(
        self,
        user_input: str,
        context: Optional[Dict] = None,
        max_steps: int = 8,
        session_id: Optional[str] = None,
        on_token: Optional[Callable] = None,
        on_tool_start: Optional[Callable] = None,
        on_tool_calls_ready: Optional[Callable] = None,
        on_event: Optional[Callable] = None,
    ) -> Dict[str, Any]:
        def _fire(event_type, payload):
            if on_event:
                try:
                    on_event(event_type, {"session_id": session_id or "", **payload})
                except Exception:
                    pass

        _fire("loop_start", {"query": user_input[:200]})

        user_content = user_input.strip()
        ctx = context or {}
        for ext in self._extensions:
            try:
                user_content = ext.on_before_prompt(user_content, ctx)
            except Exception:
                pass

        if context and context.get("file_path"):
            user_content += f"\n\n[Context: 已上传报价单，file_path={context['file_path']}]"

        if session_id and self._store:
            session = self._store.load(session_id)
            if context and context.get("file_path"):
                session.file_path = context["file_path"]
            injection = self._store.build_injection(session)
            if injection:
                # 用户本句很短（如「价格」「库存」）时，显式绑定到上一轮主题，避免被更早轮次干扰
                if session.turns and len(user_input.strip()) <= 15:
                    last_q = (session.turns[-1].query or "").strip()[:80]
                    user_content += f"\n\n【当前意图】用户本句是对上一轮「问：{last_q}」的回复，请按该主题理解，勿与更早轮次混淆。"
                user_content += f"\n\n{injection}"
            # U 型注意力：把「本对话当前主题」放在 user 消息绝对末尾，便于模型绑定上一轮与本句
            if session.turns:
                last_q = (session.turns[-1].query or "").strip()[:80]
                current_input = user_input.strip()[:50]
                user_content += f"\n\n【当前主题】上一轮问：{last_q}。用户本句：{current_input}。请据此理解意图与所指产品。"

        tools = self._registry.get_definitions()
        messages: List[dict] = [
            {"role": "system", "content": self._system_prompt},
            {"role": "user", "content": user_content},
        ]
        thinking_parts: List[str] = []
        trace: List[dict] = []
        last_answer = ""
        last_usage = None

        try:
            from backend.config import Config
            max_tokens = getattr(Config, "LLM_MAX_TOKENS", 5000)
        except Exception:
            max_tokens = 5000

        for step in range(max_steps):
            is_last = step == max_steps - 1
            if is_last:
                messages.append({"role": "user", "content": _MAX_STEPS_HINT})

            kwargs: Dict[str, Any] = {"model": self.model, "messages": messages, "temperature": 0.1, "max_tokens": max_tokens}
            if not is_last:
                kwargs["tools"] = tools
                kwargs["tool_choice"] = "auto"

            step_usage = None
            if on_token is not None:
                content, tool_calls, step_usage = await asyncio.to_thread(
                    _call_llm_streaming_sync, self.client, kwargs, on_token
                )
            else:
                resp = self.client.chat.completions.create(**kwargs)
                msg = resp.choices[0].message if resp.choices else None
                if not msg:
                    break
                content = (msg.content or "").strip()
                tool_calls = list(getattr(msg, "tool_calls", None) or [])
                u = getattr(resp, "usage", None)
                if u:
                    step_usage = {"prompt_tokens": u.prompt_tokens or 0, "completion_tokens": u.completion_tokens or 0}
            if step_usage:
                last_usage = step_usage

            content, thought = _extract_tag(content, "think")
            if thought:
                thinking_parts.append(thought)
                trace.append({"step": step + 1, "type": "thinking", "content": thought})

            if not tool_calls:
                if content:
                    last_answer = content
                    trace.append({"step": step + 1, "type": "response", "content": content})
                break

            tool_calls_for_msg = [
                {
                    "id": getattr(tc, "id", "") or f"call_{i}",
                    "type": "function",
                    "function": {"name": getattr(tc.function, "name", ""), "arguments": getattr(tc.function, "arguments", "{}") or "{}"},
                }
                for i, tc in enumerate(tool_calls)
            ]
            messages.append({"role": "assistant", "content": content or None, "tool_calls": tool_calls_for_msg})

            n = len(tool_calls)
            if on_tool_calls_ready and n > 0:
                try:
                    on_tool_calls_ready(n)
                except Exception:
                    pass

            for i, tc in enumerate(tool_calls):
                name = getattr(tc.function, "name", "") or ""
                if on_tool_start:
                    try:
                        on_tool_start(name, i + 1, n)
                    except Exception:
                        pass
                try:
                    args = json.loads(getattr(tc.function, "arguments", "{}") or "{}")
                except json.JSONDecodeError:
                    args = {}

                trace.append({"step": step + 1, "type": "tool_call", "name": name, "arguments": args})
                obs = await self._registry.execute(name, args, ctx)
                if len(obs) > TOOL_RESULT_MAX_CHARS:
                    obs = obs[:TOOL_RESULT_MAX_CHARS] + "\n…（已截断）"

                for ext in self._extensions:
                    try:
                        obs = ext.on_after_tool(name, args, obs)
                    except Exception:
                        pass

                trace.append({"step": step + 1, "type": "observation", "content": obs})
                messages.append({"role": "tool", "tool_call_id": tool_calls_for_msg[i]["id"], "content": obs})

            id_to_name = build_tool_call_id_to_name(messages)
            summarizer = make_summarizer(
                Config.SUMMARY_LLM_API_KEY or Config.OPENAI_API_KEY,
                (Config.SUMMARY_LLM_BASE_URL or Config.OPENAI_BASE_URL or "").strip() or None,
                getattr(Config, "SUMMARY_LLM_MODEL", "gpt-4o-mini"),
                timeout=3.0,
            )
            _trim_context(messages, _CONTEXT_MAX_CHARS, id_to_name, summarizer)

        needs_clarification = False
        clarification_questions = None
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
                    input_tokens=last_usage.get("prompt_tokens") if last_usage else None,
                    output_tokens=last_usage.get("completion_tokens") if last_usage else None,
                )
            except Exception as e:
                logger.warning("Session save_turn failed: %s", e)

        result = {
            "answer": last_answer or "",
            "thinking": "\n".join(thinking_parts) or None,
            "trace": trace,
            "needs_clarification": needs_clarification,
            "clarification_questions": clarification_questions,
            "error": None,
        }
        _fire("loop_end", {k: v for k, v in result.items() if k != "error"})
        return result
