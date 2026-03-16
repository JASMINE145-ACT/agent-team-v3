"""
ReAct 循环用到的 LLM 调用、解析与 system prompt 构建。
从 agent.py 拆出以控制单文件行数（代码准则规则4）。
"""
import re
import types as _types
from typing import Any, Dict, List, Tuple

_CORE_OUTPUT_FORMAT = """\
## 输出格式（Claude Agent Loop）

每轮推理按三段式输出 <think>:

<think>
1. Gather Context: 分析用户意图、已知信息、会话上下文、缺失项
2. Take Action: 决定行动(直接回答/调用工具/澄清)，说明工具选择理由与参数来源
3. Verify Results: 如有工具返回结果，检查是否得到信息、是否继续、是否可回答
</think>

允许模型灵活组织，首轮可跳过 Verify。
**多轮指代**：用户说「选哪个」→ 必须调用 select_wanding_match；用户说「那个产品」→ 用上轮完整名称。"""


def _extract_tag(content: str, tag: str) -> Tuple[str, str]:
    pattern = re.compile(rf"<{tag}>(.*?)</{tag}>", re.DOTALL | re.IGNORECASE)
    match = pattern.search(content)
    if not match:
        return content, ""
    return pattern.sub("", content).strip(), match.group(1).strip()


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
    return content, tool_calls, last_usage, last_finish_reason
