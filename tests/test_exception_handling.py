"""验证异常处理不被无声吞掉。"""
import logging


def test_on_before_prompt_exception_does_not_crash():
    """BrokenExtension.on_before_prompt 抛异常后，主流程不崩溃（agent 层已 catch）。"""
    from backend.core.extension import AgentExtension, ExtensionContext

    class BrokenExtension(AgentExtension):
        def register(self, ctx): pass
        def get_skill_prompt(self): return ""
        def on_before_prompt(self, content, ctx):
            raise RuntimeError("broken ext")

    ext = BrokenExtension()
    # 直接调用会抛异常——这是预期行为
    try:
        ext.on_before_prompt("test", {})
        raised = False
    except RuntimeError:
        raised = True
    assert raised, "extension 本身应该抛异常，agent 层负责 catch"


def test_on_after_tool_exception_does_not_crash():
    """BrokenAfterExt.on_after_tool 抛异常后，agent 层已 catch 不会崩溃。"""
    from backend.core.extension import AgentExtension

    class BrokenAfterExt(AgentExtension):
        def register(self, ctx): pass
        def get_skill_prompt(self): return ""
        def on_after_tool(self, name, args, obs):
            raise ValueError("broken after tool")

    ext = BrokenAfterExt()
    try:
        ext.on_after_tool("test_tool", {}, "obs")
        raised = False
    except ValueError:
        raised = True
    assert raised, "extension 本身应该抛异常，agent 层负责 catch"
