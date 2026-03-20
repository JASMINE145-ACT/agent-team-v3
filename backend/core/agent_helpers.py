"""
ReAct 循环用到的 LLM 调用、解析与 system prompt 构建。
从 agent.py 拆出以控制单文件行数（代码准则规则4）。
"""
import re
import types as _types
from typing import Any, Dict, List, Tuple

_CORE_OUTPUT_FORMAT = """\
## 输出格式（Claude Agent Loop）

每轮推理按四段式在 <think> 中输出 Plan / Gather / Act / Verify：

<think>
1. Plan
   - 用 2～4 行概括本轮要完成的「具体目标」（尽量贴近用户措辞，例如「查直径50的价格并给出报价建议」）
   - 说明本轮打算使用哪些技能簇/工具链（只点名，不在此处输出 JSON），例如：库存与价格、Excel、无货登记、业务知识
   - 简要列出可能的子任务或步骤（如：先确认意图 → 再查历史报价/万鼎 → 再查库存 → 再汇总结论）

2. Gather Context
   - 分析用户输入的意图、关键约束（如客户等级、是否只查库存/只看价格、是否需要登记无货）
   - 概括会话上下文中**已知的关键信息**（最近几轮的问答、工具返回的结论或统计）
   - 明确当前还缺少哪些关键信息，以及这些信息可能来自哪里（继续向用户提问 / 调用哪个工具）

3. Act
   - 决定本轮是：
     - 直接回答用户问题，还是
     - 先向用户澄清关键信息，还是
     - 调用一个工具（库存/价格/Excel/无货/业务知识等）
   - 如果要调用工具：
     - 用自然语言解释「为什么选这个工具、参数从哪里来」
     - 再输出一个 `<tool_call>...</tool_call>` 包裹的 JSON，结构为：
       - `{ "name": "<tool_name>", "arguments": { ... } }`
     - **每轮最多一个 `<tool_call>`**；本轮不需要调工具时可以完全省略 `<tool_call>`

4. Verify Results
   - 若上一轮有工具返回结果，检查：
     - 是否已经得到完成本轮目标所需的关键信息
     - 是否还需要继续调用工具或向用户澄清
     - 是否可以直接给出最终回答
   - 如果信息不足，明确说明还缺什么，并在下一轮 Plan 中补充；不要臆测或捏造库存/价格/Excel 行内容
</think>

允许模型在上述结构下灵活组织内容，不要求逐条照搬示例。
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
