"""
测试上下文压缩：验证超 _CONTEXT_MAX_CHARS 时历史 tool 结果被摘要压缩，并展示压缩效果。
运行方式（在 Agent Team version3 项目根目录）：
  python tests/test_context_compression.py
  或
  python -m pytest tests/test_context_compression.py -v -s
"""
import sys
from pathlib import Path

# Windows 控制台 UTF-8，避免打印摘要时 GBK 编码错误
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
from typing import Callable, Dict, List, Optional

_root = Path(__file__).resolve().parent.parent
if str(_root) not in sys.path:
    sys.path.insert(0, str(_root))

from backend.core.context_compression import (
    build_tool_call_id_to_name,
    make_summarizer,
    _summarize_by_rules,
)

# 与 core/agent.py 保持一致，避免循环导入
CONTEXT_MAX_CHARS = 8_000


def _trim_context(
    messages: List[dict],
    max_chars: int = CONTEXT_MAX_CHARS,
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


def _make_mock_messages(total_chars_target: int = 15_000):
    """构造超过 max_chars 的 messages：含 system、user、多轮 assistant+tool。"""
    system_content = "你是业务助手。"
    user_content = "查一下外螺纹堵头 dn25 的价格。"

    # 模拟 match_wanding_price 的长返回（表格 + 多行）
    tool1_id = "call_abc1"
    tool1_name = "match_wanding_price"
    tool1_content = """匹配来源：字段匹配

| 物料编号 | 报价名称 | 客户级别 | 单价 |
|----------|----------|----------|------|
| 8010071399 | 外螺纹堵头(PPR配件)印尼绿色 dn25 (3/4") 联塑 | B | ¥1,289.00 |
| 8010071400 | 外螺纹堵头(PPR配件)印尼绿色 dn32 (1") 联塑 | B | ¥1,389.00 |

已选：第 1 条 — 8010071399，¥1,289.00（B 档）。
""" + ("（其余省略）\n" * 200)  # 撑到约 3000+ 字符

    # 模拟 search_inventory 的长返回
    tool2_id = "call_abc2"
    tool2_name = "search_inventory"
    tool2_content = """找到 5 条库存记录。

| Item Code | Item Name | Qty (User Warehouse) | Available to sell |
|-----------|-----------|----------------------|-------------------|
| 8010071399 | 外螺纹堵头 PPR dn25 联塑 | 120 | 80 |
| 8010071400 | 外螺纹堵头 PPR dn32 联塑 | 95 | 60 |

物料编号 8010071399 库存充足。
""" + ("（其余省略）\n" * 200)

    # 再一段长 tool 保证总长超限
    tool3_id = "call_abc3"
    tool3_name = "select_wanding_match"
    tool3_content = """选中：8010071399 — 外螺纹堵头(PPR配件)印尼绿色 dn25 (3/4") 联塑，B 档价格 ¥1,289.00。
""" + ("（确认选型）\n" * 150)

    # 保证每段 > 200 且总长超 8000
    def pad(s: str, min_len: int) -> str:
        if len(s) >= min_len:
            return s
        return s + "x" * (min_len - len(s))

    tool1_content = pad(tool1_content, 3500)
    tool2_content = pad(tool2_content, 3500)
    tool3_content = pad(tool3_content, 2500)

    messages = [
        {"role": "system", "content": system_content},
        {"role": "user", "content": user_content},
        {
            "role": "assistant",
            "content": "<think>查价格</think>",
            "tool_calls": [
                {"id": tool1_id, "type": "function", "function": {"name": tool1_name, "arguments": "{}"}},
            ],
        },
        {"role": "tool", "tool_call_id": tool1_id, "content": tool1_content},
        {
            "role": "assistant",
            "content": "<think>查库存</think>",
            "tool_calls": [
                {"id": tool2_id, "type": "function", "function": {"name": tool2_name, "arguments": "{}"}},
            ],
        },
        {"role": "tool", "tool_call_id": tool2_id, "content": tool2_content},
        {
            "role": "assistant",
            "content": "<think>选型</think>",
            "tool_calls": [
                {"id": tool3_id, "type": "function", "function": {"name": tool3_name, "arguments": "{}"}},
            ],
        },
        {"role": "tool", "tool_call_id": tool3_id, "content": tool3_content},
    ]
    return messages


def _total_content_chars(messages):
    return sum(len(str(m.get("content") or "")) for m in messages)


def test_compression_effect():
    """压缩是否生效、压缩效果如何：打印前后总长与示例摘要。"""
    max_chars = CONTEXT_MAX_CHARS
    messages = _make_mock_messages()

    total_before = _total_content_chars(messages)
    tool_msgs_before = [(m.get("tool_call_id"), len(str(m.get("content") or ""))) for m in messages if m.get("role") == "tool"]

    assert total_before > max_chars, f"测试数据总长 {total_before} 应大于 {max_chars}"

    # 使用规则摘要（不调 API），可重复
    id_to_name = build_tool_call_id_to_name(messages)
    summarizer = make_summarizer(None, None, "gpt-4o-mini", max_chars=400, timeout=3.0)
    _trim_context(messages, max_chars, id_to_name, summarizer)

    total_after = _total_content_chars(messages)
    tool_msgs_after = []
    for m in messages:
        if m.get("role") == "tool":
            c = str(m.get("content") or "")
            tool_msgs_after.append((m.get("tool_call_id"), len(c), c[:200] + ("…" if len(c) > 200 else "")))

    # ---------- 展示结果 ----------
    print("\n" + "=" * 60)
    print("上下文压缩测试结果")
    print("=" * 60)
    print(f"  _CONTEXT_MAX_CHARS = {max_chars}")
    print(f"  压缩前总字符数: {total_before}")
    print(f"  压缩后总字符数: {total_after}")
    print(f"  是否 ≤ 上限: {total_after <= max_chars} {'✓' if total_after <= max_chars else '✗'}")
    print(f"  节省字符数: {total_before - total_after}")
    print()
    print("  各 tool 消息压缩前长度:")
    for tid, L in tool_msgs_before:
        print(f"    - {tid}: {L} 字符")
    print("  压缩后各 tool 消息长度与摘要预览:")
    for tid, L, preview in tool_msgs_after:
        print(f"    - {tid}: {L} 字符")
        print(f"      预览: {preview[:120]!r}..." if len(preview) > 120 else f"      预览: {preview!r}")
    print("=" * 60 + "\n")

    assert total_after <= max_chars, f"压缩后总长 {total_after} 应 ≤ {max_chars}"
    # 至少有一条被压成短摘要（不是原来的几千字）
    assert any(L < 500 for _, L, _ in tool_msgs_after), "至少应有一条 tool 消息被压成短摘要"


def test_rule_fallback_per_tool_type():
    """单独测规则 fallback 对各工具类型的抽取效果（展示摘要质量）。"""
    samples = [
        ("match_wanding_price", """匹配来源：字段匹配
| 物料编号 | 报价名称 | 客户级别 | 单价 |
| 8010071399 | 外螺纹堵头 PPR dn25 联塑 | B | ¥1,289.00 |
已选：第 1 条 — 8010071399，¥1,289.00（B 档）。"""),
        ("search_inventory", """找到 5 条库存记录。
| Item Code | Item Name | Qty | Available |
| 8010071399 | 外螺纹堵头 PPR dn25 | 120 | 80 |
物料编号 8010071399 库存充足。"""),
        ("select_wanding_match", """选中：8010071399 — 外螺纹堵头 PPR dn25 联塑，B 档价格 ¥1,289.00。"""),
    ]
    print("\n" + "-" * 60)
    print("规则 fallback 各工具类型摘要预览")
    print("-" * 60)
    for tool_name, content in samples:
        summary = _summarize_by_rules(tool_name, content, max_chars=400)
        print(f"  工具: {tool_name}")
        print(f"    原文长度: {len(content)} 字符")
        print(f"    摘要长度: {len(summary)} 字符")
        preview = summary[:180] + "…" if len(summary) > 180 else summary
        print(f"    摘要内容: {preview!r}")
        print()
    print("-" * 60 + "\n")


def test_without_summarizer_fallback():
    """未传 summarizer 时，应退化为「已压缩，原长 N 字符」旧逻辑。"""
    max_chars = CONTEXT_MAX_CHARS
    messages = _make_mock_messages()  # 重新构造，避免被前一个测试改过
    _trim_context(messages, max_chars, None, None)

    total_after = _total_content_chars(messages)
    tool_contents = [str(m.get("content") or "") for m in messages if m.get("role") == "tool"]
    has_legacy_placeholder = any("[已压缩，原长" in c for c in tool_contents)

    print("\n  未传 summarizer 时：使用旧占位符")
    print(f"    压缩后总长: {total_after}，占位符示例: {tool_contents[0][:60] if tool_contents else 'N/A'}…")
    assert total_after <= max_chars
    assert has_legacy_placeholder


if __name__ == "__main__":
    test_rule_fallback_per_tool_type()
    test_compression_effect()
    test_without_summarizer_fallback()
    print("全部测试通过。")
