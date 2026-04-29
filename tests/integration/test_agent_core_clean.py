"""骨架层干净性：agent.py 无业务硬编码；StubExtension 可驱动 CoreAgent。"""
from __future__ import annotations

import sys
from pathlib import Path
from unittest.mock import MagicMock, patch

import pytest

_root = Path(__file__).resolve().parent.parent.parent
if str(_root) not in sys.path:
    sys.path.insert(0, str(_root))

AGENT_PY = _root / "backend" / "core" / "agent.py"

_BUSINESS_TOOL_NAMES = [
    "match_quotation",
    "match_quotation_batch",
    "get_inventory_by_code",
    "get_inventory_by_code_batch",
    "get_profit_by_price_batch",
    "parse_excel_smart",
    "fill_quotation_sheet",
    "run_quotation_fill",
]


def test_agent_py_has_no_hardcoded_tool_names():
    source = AGENT_PY.read_text(encoding="utf-8")
    violations = []
    for tool_name in _BUSINESS_TOOL_NAMES:
        if f'"{tool_name}"' in source or f"'{tool_name}'" in source:
            violations.append(tool_name)
    assert violations == [], (
        f"agent.py contains hardcoded tool names: {violations}\n"
        "These must be moved to AgentExtension hooks."
    )


def test_agent_py_has_no_business_imports():
    source = AGENT_PY.read_text(encoding="utf-8")
    assert "plugins.jagent" not in source, (
        "agent.py imports from plugins.jagent — business logic is leaking into the core layer."
    )
    assert "from backend.tools" not in source, (
        "agent.py imports from backend.tools — business logic is leaking into the core layer."
    )


from backend.core.extension import AgentExtension, ExtensionContext  # noqa: E402


class StubExtension(AgentExtension):
    """纯骨架扩展：无任何业务知识。"""

    def register(self, ctx: ExtensionContext) -> None:
        ctx.register_tool(
            {
                "type": "function",
                "function": {
                    "name": "echo",
                    "description": "Echo the input",
                    "parameters": {
                        "type": "object",
                        "properties": {"text": {"type": "string"}},
                        "required": ["text"],
                    },
                },
            },
            lambda args, c: f'{{"result": "{args.get("text", "")}"}}',
        )

    def get_skill_prompt(self) -> str:
        return "You are a helpful assistant."


@pytest.mark.asyncio
async def test_stub_extension_drives_core_agent_to_completion():
    from backend.core.agent import CoreAgent

    with patch("backend.core.agent.get_openai_client") as mock_client_factory:
        mock_client_factory.return_value = MagicMock()
        with patch("backend.core.agent.call_llm_streaming_sync") as mock_stream:
            mock_stream.return_value = ("Hello, world!", [], None, "stop")

            agent = CoreAgent(
                api_key="test",
                base_url="https://api.example.com",
                model="test-model",
                extensions=[StubExtension()],
                session_store=None,
            )

            result = await agent.execute_react(
                "Say hello",
                on_token=lambda t: None,
            )

    assert result["answer"] == "Hello, world!"
    assert result["error"] is None
