"""
ReAct 循环用到的 LLM 调用、解析与 system prompt 构建。
从 agent.py 拆出以控制单文件行数（代码准则规则4）。
"""
import re
import types as _types
from typing import Any, Callable, Dict, List, Optional, Tuple

from backend.core.anthropic_react_llm import (
    call_anthropic_messages_sync,
    call_anthropic_messages_stream_sync,
)
from backend.core.thinking_stream_filter import RedactedThinkingStreamFilter

# 极简回退格式（与 skills.py 中 OUTPUT_FORMAT_LEGACY 同构），作 build_system_prompt 的默认回退。
_CORE_OUTPUT_FORMAT = """\
## 输出格式（极简回退用）

- **think 可省略**；有需要时用成对标签（redacted_thinking 或 think）包裹简短记录即可。
- **有工具要调**：直接写 `<tool_call>{"name":"<tool_name>","arguments":{...}}</tool_call>`，无需先写自然语言决策。
- **工具返回后**：直接展示结果，不需要额外解释或复述 reasoning。
- **reasoning 字段**：`match_quotation` / `select_wanding_match` 返回的 `selection_reasoning` / `reasoning` 是工具 JSON 中的 structured 数据（LLM 推理理由），**由 UI 直接渲染**，模型不需要在 think 里复述。
- **ONE step = ONE tool call**；`name` 必须与工具注册名完全一致；`arguments` 为 JSON 对象，不得臆造。
- **Failure Handling**：不得将未出现在 observation/用户原话中的内容当事实；无有效数据时不臆造库存/单价/编码；参数错误时修正后重试。
- **批量**：多行/多编号优先 `*_batch`。
- **多轮指代**：「选哪个」→ select_wanding_match；「那个产品」→ 用上轮完整名或 code。"""


def _extract_tag(content: str, tag: str) -> Tuple[str, str]:
    """Strip thinking tag pair; return (remaining_text, inner_content).
    Handles both well-formed <tag>...</tag> and self-closing or incomplete tags
    that may come from MiniMax internal attribute paths."""
    pattern = re.compile(rf"<{tag}>(.*?)</{tag}>", re.DOTALL | re.IGNORECASE)
    match = pattern.search(content)
    if not match:
        # Guard: if the content starts with an opening tag but has no closing tag,
        # strip everything from the opening tag onward to avoid leaking raw thinking.
        open_pat = re.compile(rf"<{tag}\s*>", re.IGNORECASE)
        om = open_pat.search(content)
        if om:
            before = content[: om.start()]
            return before.strip(), ""
        return content, ""
    return pattern.sub("", content).strip(), match.group(1).strip()


_RESULT_TITLE_RE = re.compile(
    r"^\s*(?:#{1,3}\s*)?(?:.{0,50}价格查询结果|.{0,40}(?:询价|报价)查询结果)\s*$",
    re.UNICODE,
)
# 无「…价格查询结果」标题时，从下列行起视为正式答案（前面多为 Reasoning 泄漏）
_REASONING_ANSWER_ANCHOR_RES = (
    re.compile(r"^\s*匹配来源\s*[:：]", re.UNICODE),
    re.compile(r"^\s*查询到以下", re.UNICODE),
    re.compile(r"^\s*上面\s*\d+\s*个都不是", re.UNICODE),
    re.compile(r"^\s*(?:#{1,3}\s*)?以下\s*\d+\s*个", re.UNICODE),
)


def strip_untagged_reasoning_preamble(text: str) -> str:
    """
    When the model ignores XML thinking tags and emits 'Reasoning:' / chain-of-thought
    before the real answer, drop everything before the first '…查询结果' title line or
    the first markdown table — so user-visible answers stay consistent.
    """
    if not (text or "").strip():
        return text or ""
    head = (text or "")[:2000]
    if not re.search(r"(?i)reasoning\s*[:：]", head):
        return text
    lines = text.splitlines()
    start_idx = None
    for i, line in enumerate(lines):
        s = line.strip()
        if not s or s.startswith("-"):
            continue
        if "|" in s[:3] and s.startswith("|"):
            continue
        if _RESULT_TITLE_RE.match(s):
            start_idx = i
            break
        if any(ar.match(s) for ar in _REASONING_ANSWER_ANCHOR_RES):
            start_idx = i
            break
    if start_idx is None:
        for i, line in enumerate(lines):
            st = line.strip()
            if not st.startswith("|"):
                continue
            if i + 1 < len(lines) and "|" in lines[i + 1] and "---" in lines[i + 1]:
                start_idx = max(0, i - 1)
                break
    if start_idx is None or start_idx == 0:
        return text
    return "\n".join(lines[start_idx:]).strip()


def _extract_thinking_block(content: str) -> Tuple[str, str]:
    """Strip one thinking wrapper: try redacted_thinking tag first (matches OUTPUT_FORMAT), then think tag."""
    if not (content or "").strip():
        return content or "", ""
    body, thought = _extract_tag(content, "redacted_thinking")
    if thought:
        return body, thought
    return _extract_tag(content, "think")


def build_system_prompt(skill_prompt: str, output_format: str) -> str:
    """构建 ReAct 使用的 system prompt。"""
    return (
        "你是统一业务助手，**一个主 Agent 掌握全部技能**，根据用户意图直接选用下方工具完成目标。无子 Agent，不委托、不转发。\n\n"
        "---\n\n## 技能与工具（按目标选用）\n\n"
        + skill_prompt
        + "\n\n---\n\n"
        + (output_format or _CORE_OUTPUT_FORMAT)
    )


def call_llm_streaming_sync(client, kwargs: Dict[str, Any], on_token) -> Tuple[str, List, Any, Any]:
    """同步流式调用 LLM，返回 (content, tool_calls, last_usage, finish_reason)。"""
    create_kw = {**kwargs, "stream": True, "stream_options": {"include_usage": True}}
    stream = client.chat.completions.create(**create_kw)
    content_parts: List[str] = []
    tool_calls_raw: Dict[int, dict] = {}
    last_usage = None
    last_finish_reason = None
    think_filter: Optional[RedactedThinkingStreamFilter] = (
        RedactedThinkingStreamFilter(on_token) if on_token is not None else None
    )
    for chunk in stream:
        if getattr(chunk, "usage", None):
            u = chunk.usage
            last_usage = {"prompt_tokens": u.prompt_tokens or 0, "completion_tokens": u.completion_tokens or 0}
        if not chunk.choices:
            continue
        c0 = chunk.choices[0]
        if getattr(c0, "finish_reason", None):
            last_finish_reason = c0.finish_reason
        delta = c0.delta
        if delta.content:
            content_parts.append(delta.content)
            if think_filter is not None:
                think_filter.feed(delta.content)
            elif on_token is not None:
                on_token(delta.content)
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
    if think_filter is not None:
        think_filter.flush()
    content = "".join(content_parts)
    tool_calls = [
        _types.SimpleNamespace(
            id=tool_calls_raw[k]["id"],
            function=_types.SimpleNamespace(name=tool_calls_raw[k]["name"], arguments=tool_calls_raw[k]["arguments"]),
        )
        for k in sorted(tool_calls_raw)
    ]
    return content, tool_calls, last_usage, last_finish_reason


def call_anthropic_react_streaming_sync(
    client: Any, kwargs: Dict[str, Any], on_token: Callable[[str], None]
) -> Tuple[str, List, Any, Any]:
    """Anthropic Messages 流式调用，与 call_llm_streaming_sync 同返回形状。"""
    return call_anthropic_messages_stream_sync(
        client,
        kwargs["model"],
        kwargs["messages"],
        kwargs.get("tools"),
        temperature=kwargs["temperature"],
        max_tokens=kwargs["max_tokens"],
        on_token=on_token,
    )


def call_anthropic_react_non_streaming_sync(client: Any, kwargs: Dict[str, Any]) -> Tuple[str, List, Optional[dict], Optional[str]]:
    """Anthropic Messages 非流式调用。"""
    return call_anthropic_messages_sync(
        client,
        kwargs["model"],
        kwargs["messages"],
        kwargs.get("tools"),
        temperature=kwargs["temperature"],
        max_tokens=kwargs["max_tokens"],
    )
