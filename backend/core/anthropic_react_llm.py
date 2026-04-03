"""
Anthropic Messages compatibility helpers for running OpenAI-style ReAct loops
against Anthropic-compatible endpoints (for example MiniMax Anthropic API).
"""
from __future__ import annotations

import json
import logging
import os
import re
import time
import types as _types
from typing import Any, Callable, Dict, List, Optional, Tuple

from backend.core.thinking_stream_filter import filter_redacted_thinking_stream

logger = logging.getLogger(__name__)


def openai_tools_to_anthropic(openai_tools: Optional[List[dict]]) -> List[dict]:
    out: List[dict] = []
    for t in openai_tools or []:
        if not isinstance(t, dict) or t.get("type") != "function":
            continue
        fn = t.get("function") or {}
        name = (fn.get("name") or "").strip()
        if not name:
            continue
        desc = (fn.get("description") or "")[:2560]
        schema = fn.get("parameters") if isinstance(fn.get("parameters"), dict) else None
        if not schema:
            schema = {"type": "object", "properties": {}}
        out.append({"name": name, "description": desc, "input_schema": schema})
    return out


def split_system_and_rest(openai_messages: List[dict]) -> Tuple[str, List[dict]]:
    system_parts: List[str] = []
    rest: List[dict] = []
    for m in openai_messages:
        if not isinstance(m, dict):
            continue
        if m.get("role") == "system":
            system_parts.append(str(m.get("content") or ""))
        else:
            rest.append(m)
    return "\n\n".join(system_parts).strip(), rest


def convert_openai_to_anthropic_messages(rest: List[dict]) -> List[dict]:
    """Convert OpenAI-style messages (without system) to Anthropic messages."""
    anthropic_msgs: List[dict] = []
    i = 0
    while i < len(rest):
        m = rest[i]
        role = m.get("role")
        if role == "user":
            anthropic_msgs.append({"role": "user", "content": m.get("content") or ""})
            i += 1
            continue

        if role == "assistant":
            tool_calls = m.get("tool_calls") or []
            content = m.get("content") or ""
            # Strip thinking wrappers — prevent reasoning from polluting conversation
            # history and being re-emitted by MiniMax as "what the assistant said".
            content = re.sub(r"<think>.*?</think>", "", content, flags=re.DOTALL)
            content = re.sub(r"<redacted_thinking>.*?</redacted_thinking>", "", content, flags=re.DOTALL)
            content = content.strip()
            blocks: List[dict] = []
            if isinstance(content, str) and content.strip():
                blocks.append({"type": "text", "text": content})
            elif not isinstance(content, str) and content:
                blocks.append({"type": "text", "text": str(content)})

            for tc in tool_calls:
                if isinstance(tc, dict):
                    fn = tc.get("function") or {}
                    name = (fn.get("name") or "").strip()
                    args_str = fn.get("arguments") or "{}"
                    tid = tc.get("id") or ""
                else:
                    fn = getattr(tc, "function", None)
                    name = (getattr(fn, "name", "") or "").strip() if fn else ""
                    args_str = getattr(fn, "arguments", "{}") if fn else "{}"
                    tid = getattr(tc, "id", "") or ""
                try:
                    inp = json.loads(args_str) if isinstance(args_str, str) else args_str
                    if not isinstance(inp, dict):
                        inp = {}
                except Exception:
                    inp = {}
                blocks.append({"type": "tool_use", "id": tid, "name": name, "input": inp})

            anthropic_msgs.append({"role": "assistant", "content": blocks})
            i += 1
            continue

        if role == "tool":
            tool_results: List[dict] = []
            while i < len(rest) and rest[i].get("role") == "tool":
                tm = rest[i]
                tool_results.append(
                    {
                        "type": "tool_result",
                        "tool_use_id": tm.get("tool_call_id") or "",
                        "content": str(tm.get("content") or ""),
                    }
                )
                i += 1
            anthropic_msgs.append({"role": "user", "content": tool_results})
            continue

        i += 1

    return anthropic_msgs


def _parse_xml_tool_call_payload(raw_json: str, source_block: str) -> Optional[_types.SimpleNamespace]:
    """Parse one <tool_call>{...}</tool_call> JSON payload to OpenAI-style tool call."""
    try:
        parsed = json.loads(raw_json)
    except Exception:
        return None
    if not isinstance(parsed, dict):
        return None

    tool_name = str(parsed.get("name") or "").strip()
    if not tool_name:
        return None

    args = parsed.get("arguments", {})
    if isinstance(args, str):
        try:
            args = json.loads(args)
        except Exception:
            args = {}
    if not isinstance(args, dict):
        args = {}

    args_json = json.dumps(args, ensure_ascii=False)
    tid = f"call_{(abs(hash(source_block))) % 10**8:08d}"
    return _types.SimpleNamespace(
        id=tid,
        function=_types.SimpleNamespace(name=tool_name, arguments=args_json),
    )


def _extract_xml_tool_calls(text: str) -> Tuple[str, List[_types.SimpleNamespace]]:
    """Extract XML-wrapped tool calls from plain text and return cleaned text + calls."""
    if not text:
        return "", []

    pattern = re.compile(r"<tool_call>\s*(\{[\s\S]*?\})\s*</tool_call>", re.DOTALL)
    tool_calls: List[_types.SimpleNamespace] = []
    chunks: List[str] = []
    cursor = 0
    for match in pattern.finditer(text):
        chunks.append(text[cursor:match.start()])
        source_block = match.group(0)
        raw_json = match.group(1).strip()
        tc = _parse_xml_tool_call_payload(raw_json, source_block)
        if tc is not None:
            tool_calls.append(tc)
        else:
            # Keep unparsable block as plain text for visibility.
            chunks.append(source_block)
        cursor = match.end()
    chunks.append(text[cursor:])

    return "".join(chunks).strip(), tool_calls


def _blocks_to_content_and_tool_calls(content: Any) -> Tuple[str, List[_types.SimpleNamespace]]:
    text_parts: List[str] = []
    thinking_parts: List[str] = []
    tool_calls: List[_types.SimpleNamespace] = []

    # Some Anthropic-compatible providers return a plain string content.
    raw_text = "" if content is None else (content if isinstance(content, str) else "")
    blocks = content if isinstance(content, (list, tuple)) else []

    for block in blocks:
        btype = getattr(block, "type", None)
        if btype is None and isinstance(block, dict):
            btype = block.get("type")

        if not isinstance(block, dict) and hasattr(block, "thinking"):
            thinking_parts.append(str(getattr(block, "thinking") or ""))
            continue
        if not isinstance(block, dict) and hasattr(block, "thought"):
            thinking_parts.append(str(getattr(block, "thought") or ""))
            continue

        if btype == "text":
            tx = getattr(block, "text", None) if not isinstance(block, dict) else block.get("text")
            if tx:
                text_parts.append(str(tx))
            continue

        if btype == "thinking":
            th = getattr(block, "thinking", None) if not isinstance(block, dict) else block.get("thinking")
            if th is None:
                th = getattr(block, "text", None) if not isinstance(block, dict) else block.get("text")
            if th:
                thinking_parts.append(str(th))
            continue

        if btype == "tool_use":
            tid = getattr(block, "id", "") if not isinstance(block, dict) else block.get("id", "")
            name = getattr(block, "name", "") if not isinstance(block, dict) else block.get("name", "")
            inp = getattr(block, "input", {}) if not isinstance(block, dict) else block.get("input", {})
            if not isinstance(inp, dict):
                inp = {}
            args_str = json.dumps(inp, ensure_ascii=False)
            tool_calls.append(
                _types.SimpleNamespace(
                    id=tid or "",
                    function=_types.SimpleNamespace(name=(name or ""), arguments=args_str),
                )
            )

    merged_text = "".join(text_parts)
    if not merged_text and raw_text:
        merged_text = raw_text

    # MiniMax Anthropic-compatible format: tool call may be XML in plain text content.
    if merged_text and not tool_calls:
        merged_text, xml_tool_calls = _extract_xml_tool_calls(merged_text)
        if xml_tool_calls:
            tool_calls.extend(xml_tool_calls)

    merged_text = merged_text.strip()
    if thinking_parts:
        think_content = "".join(thinking_parts)
        # NOTE: When MiniMax returns thinking via internal attributes (no text-level XML tag),
        # we wrap it here so _extract_thinking_block can correctly strip it on the agent side.
        # Without this wrap, bare thinking text lands in merged_text and gets rendered verbatim
        # in the thinking bubble — visible as "根据路由规则..." rule narrations instead of hidden.
        wrapped = "<" + "think" + ">\n" + think_content + "\n<" + "/think" + ">"
        merged_text = wrapped if not merged_text else (wrapped + "\n" + merged_text)


    return merged_text, tool_calls


def _usage_from_message(message: Any) -> Optional[dict]:
    u = getattr(message, "usage", None)
    if u is None:
        return None
    inp = getattr(u, "input_tokens", None)
    out = getattr(u, "output_tokens", None)
    if inp is None and isinstance(u, dict):
        inp = u.get("input_tokens")
        out = u.get("output_tokens")
    return {
        "prompt_tokens": int(inp or 0),
        "completion_tokens": int(out or 0),
    }


def _finish_reason_from_stop(stop_reason: Optional[str]) -> Optional[str]:
    if not stop_reason:
        return None
    if stop_reason == "tool_use":
        return "tool_calls"
    if stop_reason == "end_turn":
        return "stop"
    return stop_reason


def call_anthropic_messages_sync(
    client: Any,
    model: str,
    openai_messages: List[dict],
    openai_tools: Optional[List[dict]],
    *,
    temperature: float,
    max_tokens: int,
) -> Tuple[str, List[Any], Optional[dict], Optional[str]]:
    system, rest = split_system_and_rest(openai_messages)
    anth_msgs = convert_openai_to_anthropic_messages(rest)
    tools = openai_tools_to_anthropic(openai_tools) if openai_tools else None
    kwargs: Dict[str, Any] = {
        "model": model,
        "max_tokens": max_tokens,
        "messages": anth_msgs,
    }
    if system:
        kwargs["system"] = system
    if tools:
        kwargs["tools"] = tools
    kwargs["temperature"] = temperature

    message = client.messages.create(**kwargs)
    text, tool_calls = _blocks_to_content_and_tool_calls(message.content)
    usage = _usage_from_message(message)
    stop_reason = getattr(message, "stop_reason", None)
    return text, tool_calls, usage, _finish_reason_from_stop(stop_reason)


def call_anthropic_messages_stream_sync(
    client: Any,
    model: str,
    openai_messages: List[dict],
    openai_tools: Optional[List[dict]],
    *,
    temperature: float,
    max_tokens: int,
    on_token: Optional[Callable[[str], None]],
) -> Tuple[str, List[Any], Optional[dict], Optional[str]]:
    system, rest = split_system_and_rest(openai_messages)
    anth_msgs = convert_openai_to_anthropic_messages(rest)
    tools = openai_tools_to_anthropic(openai_tools) if openai_tools else None
    kwargs: Dict[str, Any] = {
        "model": model,
        "max_tokens": max_tokens,
        "messages": anth_msgs,
    }
    if system:
        kwargs["system"] = system
    if tools:
        kwargs["tools"] = tools
    kwargs["temperature"] = temperature

    with client.messages.stream(**kwargs) as stream:
        if on_token is not None:
            try:
                filter_redacted_thinking_stream(stream.text_stream, on_token)
            except Exception:
                logger.debug("anthropic text_stream iteration failed; fallback to final_message", exc_info=True)
        final = stream.get_final_message()

    text, tool_calls = _blocks_to_content_and_tool_calls(final.content)
    usage = _usage_from_message(final)
    stop_reason = getattr(final, "stop_reason", None)
    return text, tool_calls, usage, _finish_reason_from_stop(stop_reason)
