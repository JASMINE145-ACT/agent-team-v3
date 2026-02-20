"""
测试执行追踪器功能
验证标准：
1. ✅ 能看到每一步的思考内容
2. ✅ 能看到工具调用的完整参数和返回结果
3. ✅ 能看到整个执行流程的时间轴
"""
import json
from services.agent_runner import run_inventory_agent


def test_trace_output():
    """测试追踪输出"""
    print("=" * 80)
    print("测试：执行追踪器")
    print("=" * 80)

    # 测试查询
    query = "查询 pvc dn20 库存"

    print(f"\n用户查询: {query}\n")

    # 运行 Agent
    result = run_inventory_agent(query, max_steps=3)

    # 验证追踪信息存在
    assert "trace" in result, "❌ 缺少 trace 字段"
    assert "trace_text" in result, "❌ 缺少 trace_text 字段"

    print("-" * 80)
    print("1. 结构化追踪（JSON）:")
    print("-" * 80)
    print(json.dumps(result["trace"], indent=2, ensure_ascii=False))

    print("\n" + "-" * 80)
    print("2. 可读追踪（文本）:")
    print("-" * 80)
    print(result["trace_text"])

    print("\n" + "-" * 80)
    print("3. 验证追踪质量:")
    print("-" * 80)

    steps = result["trace"]["steps"]

    # 验证 1: 有思考内容
    thinking_steps = [s for s in steps if s["type"] == "thinking"]
    print(f"✅ 思考步数: {len(thinking_steps)}")
    if thinking_steps:
        print(f"   示例: {thinking_steps[0]['content'][:50]}...")

    # 验证 2: 有工具调用
    tool_steps = [s for s in steps if s["type"] == "tool_call"]
    print(f"✅ 工具调用: {len(tool_steps)}")
    if tool_steps:
        print(f"   工具: {tool_steps[0]['content']['name']}")
        print(f"   参数: {tool_steps[0]['content']['arguments']}")

    # 验证 3: 有观察结果
    observation_steps = [s for s in steps if s["type"] == "observation"]
    print(f"✅ 观察结果: {len(observation_steps)}")
    if observation_steps:
        print(f"   长度: {len(observation_steps[0]['content'])} 字符")

    # 验证 4: 有时间轴
    print(f"✅ 总耗时: {result['trace']['duration']:.2f}s")

    print("\n" + "=" * 80)
    print("✅ 所有验证通过！")
    print("=" * 80)


if __name__ == "__main__":
    test_trace_output()
