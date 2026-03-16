"""
Tests for WeComBotClient file message handling.

Focus:
- Only .xlsx/.xlsm are accepted, others get a polite error.
- Happy path Excel file saves to Config.UPLOAD_DIR/wecom/<user>/...,
  calls handle_wecom_file, and replies with its confirmation text.
"""

import asyncio
from pathlib import Path
from typing import Any, Awaitable, Callable, Dict, List


# Ensure version3 root is on sys.path, same pattern as test_smoke.
import sys

_root = Path(__file__).resolve().parent.parent
if str(_root) not in sys.path:
    sys.path.insert(0, str(_root))


from backend.config import Config  # noqa: E402
from backend.wecom_bot.config import WeComBotConfig  # noqa: E402
from backend.wecom_bot import client as wecom_client  # noqa: E402


class FakeWSClient:
    """Minimal fake WSClient capturing handlers and reply_stream calls."""

    def __init__(self, bot_id: str, secret: str) -> None:  # noqa: ARG002
        self.bot_id = bot_id
        self.secret = secret
        self.handlers: Dict[str, Callable[[Dict[str, Any]], Awaitable[None]]] = {}
        self.replies: List[Dict[str, Any]] = []
        self.download_calls: List[Dict[str, Any]] = []

    def on(self, event: str, handler: Callable[[Dict[str, Any]], Awaitable[None]]) -> None:
        self.handlers[event] = handler

    async def reply_stream(self, frame: Dict[str, Any], stream_id: str, text: str, is_end: bool) -> None:
        self.replies.append(
            {
                "frame": frame,
                "stream_id": stream_id,
                "text": text,
                "is_end": is_end,
            }
        )

    async def download_file(self, url: str, aeskey: str | None) -> Dict[str, Any]:  # noqa: ARG002
        self.download_calls.append({"url": url, "aeskey": aeskey})
        return {
            "buffer": b"dummy-bytes",
            "filename": "server_uploaded.xlsx",
        }


class DummyAgent:
    """Placeholder agent; WeComBotClient only checks type for logging."""


def _make_client(monkeypatch, tmp_path: Path) -> wecom_client.WeComBotClient:
    # Force SDK branch + fake generate_req_id / WSClient.
    monkeypatch.setattr(wecom_client, "_HAS_AIBOT_SDK", True)
    monkeypatch.setattr(wecom_client, "generate_req_id", lambda kind: f"{kind}-stream-id", raising=False)
    monkeypatch.setattr(wecom_client, "WSClient", FakeWSClient, raising=False)

    # Use a temporary upload directory so tests don't touch real filesystem locations.
    monkeypatch.setattr(Config, "UPLOAD_DIR", str(tmp_path), raising=False)

    cfg = WeComBotConfig(bot_id="test-bot", secret="test-secret")
    agent = DummyAgent()
    return wecom_client.WeComBotClient(cfg, agent)


def test_on_file_message_rejects_non_excel(monkeypatch, tmp_path):
    client = _make_client(monkeypatch, tmp_path)
    ws: FakeWSClient = client._ws  # type: ignore[assignment]
    assert "message.file" in ws.handlers
    handler = ws.handlers["message.file"]

    frame = {
        "body": {
            "file": {
                "url": "https://example.com/file.txt",
                "aeskey": "dummy-aes",
                "filename": "not_excel.txt",
            },
            "from": {
                "userid": "user1",
            },
        }
    }

    asyncio.run(handler(frame))

    # Should reply once with a polite "Excel or image only" message.
    assert len(ws.replies) == 1
    reply_text = ws.replies[0]["text"]
    assert "Excel" in reply_text and "图片" in reply_text
    # Non-Excel/non-image branch must not attempt to download the file.
    assert ws.download_calls == []


def test_on_file_message_happy_path_excel(monkeypatch, tmp_path):
    client = _make_client(monkeypatch, tmp_path)
    ws: FakeWSClient = client._ws  # type: ignore[assignment]
    assert "message.file" in ws.handlers
    handler = ws.handlers["message.file"]

    captured = {}

    async def fake_handle_wecom_file(agent, from_user: str, file_path: str) -> str:  # noqa: ARG001
        captured["from_user"] = from_user
        captured["file_path"] = file_path
        return "HANDLE_CONFIRM_TEXT"

    monkeypatch.setattr(wecom_client, "handle_wecom_file", fake_handle_wecom_file, raising=False)

    frame = {
        "body": {
            "file": {
                "url": "https://example.com/file.xlsx",
                "aeskey": "dummy-aes",
                "filename": "user_uploaded.xlsx",
            },
            "from": {
                "userid": "user1",
            },
        }
    }

    asyncio.run(handler(frame))

    # File should be downloaded and saved under UPLOAD_DIR/wecom/<user>/...
    assert len(ws.download_calls) == 1
    assert captured["from_user"] == "user1"

    saved_path = Path(captured["file_path"])
    assert saved_path.parent == tmp_path / "wecom" / "user1"
    # Name pattern: <timestamp>_server_uploaded.xlsx (from FakeWSClient.download_file)
    assert saved_path.name.endswith("server_uploaded.xlsx")
    assert "_" in saved_path.stem
    assert saved_path.is_file()

    # reply_stream must use the confirmation text returned by handle_wecom_file.
    assert len(ws.replies) == 1
    reply_text = ws.replies[0]["text"]
    assert reply_text == "HANDLE_CONFIRM_TEXT"

