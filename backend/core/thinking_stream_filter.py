"""
Strip <redacted_thinking>...</redacted_thinking> from streaming text chunks.

Tag names match backend.core.agent_helpers _extract_tag("redacted_thinking").
"""
from __future__ import annotations

from typing import Callable, Iterable, Optional

# Match skills / _extract_thinking_block (literal tag name redacted_thinking)
_OPEN = "<" + "redacted_thinking" + ">"
_CLOSE = "</" + "redacted_thinking" + ">"


def filter_redacted_thinking_stream(chunks: Iterable[str], on_token: Callable[[str], None]) -> None:
    """Iterate string chunks; call on_token only for text outside redacted_thinking tags."""
    buf = ""
    in_think = False
    for chunk in chunks:
        if not chunk:
            continue
        buf += chunk
        while True:
            if not in_think:
                idx = buf.find(_OPEN)
                if idx == -1:
                    safe = max(0, len(buf) - (len(_OPEN) - 1))
                    if safe > 0:
                        on_token(buf[:safe])
                        buf = buf[safe:]
                    break
                if idx > 0:
                    on_token(buf[:idx])
                buf = buf[idx:]
                in_think = True
            else:
                idx = buf.find(_CLOSE)
                if idx == -1:
                    break
                buf = buf[idx + len(_CLOSE) :]
                in_think = False

    if not in_think and buf:
        on_token(buf)


class RedactedThinkingStreamFilter:
    """Incremental filter for OpenAI chat.completion stream deltas."""

    __slots__ = ("_buf", "_in_think", "_on_token")

    def __init__(self, on_token: Callable[[str], None]) -> None:
        self._on_token = on_token
        self._buf = ""
        self._in_think = False

    def feed(self, chunk: Optional[str]) -> None:
        if not chunk:
            return
        self._buf += chunk
        while True:
            if not self._in_think:
                idx = self._buf.find(_OPEN)
                if idx == -1:
                    safe = max(0, len(self._buf) - (len(_OPEN) - 1))
                    if safe > 0:
                        self._on_token(self._buf[:safe])
                        self._buf = self._buf[safe:]
                    break
                if idx > 0:
                    self._on_token(self._buf[:idx])
                self._buf = self._buf[idx:]
                self._in_think = True
            else:
                idx = self._buf.find(_CLOSE)
                if idx == -1:
                    break
                self._buf = self._buf[idx + len(_CLOSE) :]
                self._in_think = False

    def flush(self) -> None:
        if not self._in_think and self._buf:
            self._on_token(self._buf)
            self._buf = ""
