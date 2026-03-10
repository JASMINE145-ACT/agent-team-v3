"""
CoreAgent — 纯 ReAct 引擎，不含任何业务逻辑。
业务通过 AgentExtension 注入。
"""
import asyncio
import json
import logging
import time
from typing import Any, Callable, Dict, List, Optional

import openai

from backend.agent.session import SessionStore, get_session_store
from backend.config import Config
from backend.core.agent_helpers import _extract_tag, build_system_prompt, call_llm_streaming_sync
from backend.core.context_compression import (
    _trim_context,
    build_tool_call_id_to_name,
    make_summarizer,
)
from backend.core.extension import AgentExtension, ExtensionContext
from backend.core.llm_client import get_openai_client
from backend.core.registry import ToolRegistry
from backend.tools.quotation.excel_summary import (
    ExcelSummaryEntry,
    format_excel_summary_for_prompt,
    get_excel_summary_for_context,
)

logger = logging.getLogger(__name__)

# 单次工具结果最大字符数（过大会导致多轮 ReAct 时 prompt 迅速膨胀）
TOOL_RESULT_MAX_CHARS = 8_000
# 多轮对话总上下文上限，超出时压缩历史 tool 结果
_CONTEXT_MAX_CHARS = 8_000
_MAX_STEPS_HINT = "（已达最大步数）请根据目前已获取的信息直接给出最终回答，不再调用任何工具。"


class CoreAgent:
    def __init__(
        self,
        api_key: str,
        base_url: str,
        model: str,
        extensions: List[AgentExtension],
        session_store: Optional[SessionStore] = None,
    ):
        # 主模型 client
        self.client = get_openai_client(api_key=api_key, base_url=base_url)
        self.model = model

        # 备用模型（可选）：例如 GLM 超时时 fallback 到 gpt-4o-mini
        fb_api_key = getattr(Config, "FALLBACK_LLM_API_KEY", None)
        fb_base_url = getattr(Config, "FALLBACK_LLM_BASE_URL", None)
        self._fallback_model = getattr(Config, "FALLBACK_LLM_MODEL", None)
        self._fallback_client = (
            get_openai_client(api_key=fb_api_key, base_url=fb_base_url)
            if fb_api_key and fb_base_url and self._fallback_model
            else None
        )

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
        self._system_prompt = build_system_prompt("\n\n".join(skill_parts), output_fmt)

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
        should_cancel: Optional[Callable[[], bool]] = None,
    ) -> Dict[str, Any]:
        def _fire(event_type, payload):
            if on_event:
                try:
                    on_event(event_type, {"session_id": session_id or "", **payload})
                except Exception:
                    logger.debug("on_event callback failed", exc_info=True)

        def _raise_if_cancelled() -> None:
            if should_cancel:
                try:
                    if should_cancel():
                        raise asyncio.CancelledError()
                except asyncio.CancelledError:
                    raise
                except Exception:
                    # Cancellation callback must never break the agent loop.
                    logger.debug("cancel check failed", exc_info=True)

        _fire("loop_start", {"query": user_input[:200]})

        user_content = user_input.strip()
        ctx = context or {}
        for ext in self._extensions:
            try:
                user_content = ext.on_before_prompt(user_content, ctx)
            except Exception:
                logger.warning("ext.on_before_prompt 失败，已跳过", exc_info=True)

        excel_summary_entry: Optional[ExcelSummaryEntry] = None
        if ctx and (ctx.get("file_id") or ctx.get("file_path")):
            try:
                excel_summary_entry = get_excel_summary_for_context(ctx)
            except Exception:
                logger.debug("get_excel_summary_for_context 失败，已忽略", exc_info=True)

        if context and context.get("file_path"):
            user_content += f"\n\n[Context: 已上传报价单，file_path={context['file_path']}]"
        if context and context.get("file_id"):
            user_content += f"\n\n[Context] file_id={context['file_id']}（用于在工具中定位同一 Excel 摘要）"

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
        ]
        if excel_summary_entry is not None:
            try:
                summary_text = format_excel_summary_for_prompt(excel_summary_entry)
                messages.append({"role": "system", "content": summary_text})
            except Exception:
                logger.debug("format_excel_summary_for_prompt 失败，已忽略", exc_info=True)
        messages.append({"role": "user", "content": user_content})
        thinking_parts: List[str] = []
        trace: List[dict] = []
        last_answer = ""
        last_usage = None

        try:
            from backend.config import Config
            max_tokens = getattr(Config, "LLM_MAX_TOKENS", 5000)
        except Exception:
            logger.warning("读取 LLM_MAX_TOKENS 失败，使用默认 5000", exc_info=True)
            max_tokens = 5000

        for step in range(max_steps):
            _raise_if_cancelled()
            is_last = step == max_steps - 1
            if is_last:
                messages.append({"role": "user", "content": _MAX_STEPS_HINT})

            kwargs: Dict[str, Any] = {"model": self.model, "messages": messages, "temperature": 0.1, "max_tokens": max_tokens}
            if not is_last:
                kwargs["tools"] = tools
                kwargs["tool_choice"] = "auto"

            step_usage = None
            if on_token is not None:
                # 流式调用：先用主模型，若因网络/超时失败且配置了 fallback，则自动切到 fallback 模型重试一次
                llm_task = asyncio.create_task(
                    asyncio.to_thread(call_llm_streaming_sync, self.client, kwargs, on_token)
                )
                try:
                    while not llm_task.done():
                        _raise_if_cancelled()
                        await asyncio.sleep(0.05)
                    content, tool_calls, step_usage = await llm_task
                except asyncio.CancelledError:
                    if not llm_task.done():
                        llm_task.cancel()
                    raise
                except (openai.APITimeoutError, openai.APIConnectionError):
                    if self._fallback_client and self._fallback_model:
                        logger.warning("主模型调用超时，fallback 到备用模型: %s", self._fallback_model)
                        fb_kwargs: Dict[str, Any] = {**kwargs, "model": self._fallback_model}
                        fb_task = asyncio.create_task(
                            asyncio.to_thread(call_llm_streaming_sync, self._fallback_client, fb_kwargs, on_token)
                        )
                        while not fb_task.done():
                            _raise_if_cancelled()
                            await asyncio.sleep(0.05)
                        content, tool_calls, step_usage = await fb_task
                        trace.append({"step": step + 1, "type": "fallback", "model": self._fallback_model})
                    else:
                        logger.exception("主模型调用失败（无 fallback 配置）")
                        raise
            else:
                _raise_if_cancelled()
                try:
                    resp = self.client.chat.completions.create(**kwargs)
                except (openai.APITimeoutError, openai.APIConnectionError):
                    if self._fallback_client and self._fallback_model:
                        logger.warning("主模型调用超时，fallback 到备用模型: %s", self._fallback_model)
                        fb_kwargs: Dict[str, Any] = {**kwargs, "model": self._fallback_model}
                        resp = self._fallback_client.chat.completions.create(**fb_kwargs)
                        trace.append({"step": step + 1, "type": "fallback", "model": self._fallback_model})
                    else:
                        logger.exception("主模型调用失败（无 fallback 配置）")
                        raise
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
                    logger.debug("on_tool_calls_ready callback failed", exc_info=True)

            for i, tc in enumerate(tool_calls):
                _raise_if_cancelled()
                name = getattr(tc.function, "name", "") or ""
                tool_call_id = tool_calls_for_msg[i]["id"]
                if on_tool_start:
                    try:
                        on_tool_start(name, i + 1, n)
                    except Exception:
                        logger.debug("on_tool_start callback failed", exc_info=True)
                try:
                    args = json.loads(getattr(tc.function, "arguments", "{}") or "{}")
                except json.JSONDecodeError:
                    logger.debug("工具参数 JSON 解析失败，使用空 dict", exc_info=True)
                    args = {}

                if on_event:
                    try:
                        on_event(
                            "agent",
                            {
                                "stream": "tool",
                                "ts": int(time.time() * 1000),
                                "data": {
                                    "phase": "start",
                                    "name": name,
                                    "toolCallId": tool_call_id,
                                    "args": args,
                                },
                            },
                        )
                    except Exception:
                        logger.debug("on_event callback failed", exc_info=True)

                trace.append({"step": step + 1, "type": "tool_call", "name": name, "arguments": args})
                tool_task = asyncio.create_task(self._registry.execute(name, args, ctx))
                try:
                    while not tool_task.done():
                        _raise_if_cancelled()
                        await asyncio.sleep(0.05)
                    obs = await tool_task
                except asyncio.CancelledError:
                    if not tool_task.done():
                        tool_task.cancel()
                    raise
                if len(obs) > TOOL_RESULT_MAX_CHARS:
                    obs = obs[:TOOL_RESULT_MAX_CHARS] + "\n…（已截断）"

                for ext in self._extensions:
                    try:
                        obs = ext.on_after_tool(name, args, obs)
                    except Exception:
                        logger.warning("ext.on_after_tool 失败，已跳过 name=%s", name, exc_info=True)

                if on_event:
                    try:
                        on_event(
                            "agent",
                            {
                                "stream": "tool",
                                "ts": int(time.time() * 1000),
                                "data": {
                                    "phase": "result",
                                    "name": name,
                                    "toolCallId": tool_call_id,
                                    "result": obs,
                                },
                            },
                        )
                    except Exception:
                        logger.debug("on_event callback failed", exc_info=True)

                trace.append({"step": step + 1, "type": "observation", "content": obs})
                messages.append({"role": "tool", "tool_call_id": tool_call_id, "content": obs})
                _raise_if_cancelled()

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
                logger.debug("clarification JSON parse failed", exc_info=True)

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
