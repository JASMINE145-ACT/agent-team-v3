"""
简单测试脚本，验证 Claude Loop prompt 格式是否正确加载。
运行: python test_claude_loop.py
"""
import sys
from pathlib import Path

# 添加 backend 到路径
sys.path.insert(0, str(Path(__file__).parent))

def test_prompt_loading():
    """测试 prompt 格式加载"""
    print("=" * 60)
    print("测试 Claude Loop Prompt 格式")
    print("=" * 60)
    
    # 测试 1: 检查新旧格式是否都存在
    print("\n[测试 1] 检查 OUTPUT_FORMAT 和 OUTPUT_FORMAT_LEGACY...")
    from backend.plugins.jagent.skills import OUTPUT_FORMAT, OUTPUT_FORMAT_LEGACY
    
    assert "Gather Context" in OUTPUT_FORMAT, "新格式应包含 Gather Context"
    assert "Take Action" in OUTPUT_FORMAT, "新格式应包含 Take Action"
    assert "Verify Results" in OUTPUT_FORMAT, "新格式应包含 Verify Results"
    print("[OK] OUTPUT_FORMAT 包含三段式结构")
    
    assert "目标 / 已知" in OUTPUT_FORMAT_LEGACY, "旧格式应包含「目标 / 已知」"
    print("[OK] OUTPUT_FORMAT_LEGACY 保留旧格式")
    
    # 测试 2: 检查配置开关
    print("\n[测试 2] 检查 USE_CLAUDE_LOOP_PROMPT 配置...")
    from backend.config import Config
    
    use_claude_loop = getattr(Config, "USE_CLAUDE_LOOP_PROMPT", True)
    print(f"[OK] USE_CLAUDE_LOOP_PROMPT = {use_claude_loop}")
    
    # 测试 3: 检查 Extension 是否根据开关返回正确格式
    print("\n[测试 3] 检查 JAgentExtension.get_output_format_prompt()...")
    from backend.plugins.jagent.extension import JAgentExtension
    
    ext = JAgentExtension()
    output_format = ext.get_output_format_prompt()
    
    if use_claude_loop:
        assert "Gather Context" in output_format, "开启时应返回新格式"
        print("[OK] 开启 Claude Loop 时返回新格式")
    else:
        assert "目标 / 已知" in output_format, "关闭时应返回旧格式"
        print("[OK] 关闭 Claude Loop 时返回旧格式")
    
    # 测试 4: 检查 _CORE_OUTPUT_FORMAT 更新
    print("\n[测试 4] 检查 _CORE_OUTPUT_FORMAT 更新...")
    from backend.core.agent_helpers import _CORE_OUTPUT_FORMAT
    
    assert "Gather Context" in _CORE_OUTPUT_FORMAT or "分析用户意图" in _CORE_OUTPUT_FORMAT, \
        "核心格式应包含 Gather Context 或简化描述"
    print("[OK] _CORE_OUTPUT_FORMAT 已更新为 Claude Loop 格式")
    
    # 测试 5: 验证 prompt 关键点
    print("\n[测试 5] 验证 prompt 关键设计点...")
    
    # 检查 Verify 是否简化
    assert "是否得到需要的信息" in OUTPUT_FORMAT, "Verify 应包含实用检查点"
    assert "是否需要继续调用工具" in OUTPUT_FORMAT, "Verify 应包含继续判断"
    assert "是否可以给出最终回答" in OUTPUT_FORMAT, "Verify 应包含结束判断"
    print("[OK] Verify Results 简化为实用检查点")
    
    # 检查格式灵活性提示
    assert "例如" in OUTPUT_FORMAT or "灵活" in OUTPUT_FORMAT, "应提示模型可灵活组织"
    print("[OK] 提示模型灵活组织思考内容")
    
    # 检查 observation 判断说明
    assert "上一轮有工具返回结果" in OUTPUT_FORMAT or "如有工具返回结果" in OUTPUT_FORMAT, \
        "应明确说明 observation 判断条件"
    print("[OK] 明确 observation 判断条件")
    
    print("\n" + "=" * 60)
    print("所有测试通过！")
    print("=" * 60)
    
    # 打印新格式预览
    print("\n[新 OUTPUT_FORMAT 预览]:")
    print("-" * 60)
    print(OUTPUT_FORMAT[:500] + "...")
    print("-" * 60)

if __name__ == "__main__":
    try:
        test_prompt_loading()
        print("\n[OK] Claude Loop 改造验证完成！")
    except AssertionError as e:
        print(f"\n[FAIL] 测试失败: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"\n[ERROR] 运行错误: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
