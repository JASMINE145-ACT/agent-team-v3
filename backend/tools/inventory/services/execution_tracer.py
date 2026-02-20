"""
执行追踪器 - 最小化实现
目标：让 React 执行过程可调试
"""
from dataclasses import dataclass, field
from datetime import datetime
from typing import Any, Dict, List


@dataclass
class TraceStep:
    """单步追踪"""
    step: int
    timestamp: datetime
    type: str  # "thinking" | "tool_call" | "observation" | "answer"
    content: Any

    def to_dict(self) -> Dict[str, Any]:
        return {
            "step": self.step,
            "timestamp": self.timestamp.isoformat(),
            "type": self.type,
            "content": self.content
        }


class ExecutionTracer:
    """执行追踪器（调试用）"""

    def __init__(self):
        self.steps: List[TraceStep] = []
        self.start_time = datetime.now()

    def add(self, step: int, type: str, content: Any):
        """添加一步追踪"""
        self.steps.append(TraceStep(
            step=step,
            timestamp=datetime.now(),
            type=type,
            content=content
        ))

    def to_dict(self) -> Dict[str, Any]:
        """导出为字典（用于 JSON）"""
        return {
            "start_time": self.start_time.isoformat(),
            "duration": (datetime.now() - self.start_time).total_seconds(),
            "total_steps": len(self.steps),
            "steps": [s.to_dict() for s in self.steps]
        }

    def format_text(self) -> str:
        """格式化为可读文本（便于调试）"""
        lines = [
            f"=== 执行追踪 ===",
            f"开始时间: {self.start_time.strftime('%Y-%m-%d %H:%M:%S')}",
            f"总步数: {len(self.steps)}",
            f"总耗时: {(datetime.now() - self.start_time).total_seconds():.2f}s",
            ""
        ]

        for s in self.steps:
            elapsed = (s.timestamp - self.start_time).total_seconds()
            lines.append(f"[{elapsed:5.2f}s] Step {s.step} - {s.type}")

            if s.type == "thinking":
                lines.append(f"  思考: {s.content[:100]}...")
            elif s.type == "tool_call":
                lines.append(f"  工具: {s.content.get('name')}")
                lines.append(f"  参数: {s.content.get('arguments')}")
            elif s.type == "observation":
                result = s.content[:200] if isinstance(s.content, str) else str(s.content)[:200]
                lines.append(f"  结果: {result}...")
            elif s.type == "answer":
                lines.append(f"  回答: {s.content[:100]}...")

            lines.append("")

        return "\n".join(lines)
