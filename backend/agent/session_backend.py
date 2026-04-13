"""SessionBackend 协议 — FileBackend / NeonBackend 共同实现的接口。"""
from __future__ import annotations

from dataclasses import dataclass
from typing import List, Optional, Protocol, runtime_checkable


@dataclass
class SessionMeta:
    session_id: str
    label: Optional[str]
    updated_at: float


@runtime_checkable
class SessionBackend(Protocol):
    def load_turns(self, session_id: str, limit: int) -> List["Turn"]: ...

    def save_turn(self, session_id: str, turn: "Turn", from_user: Optional[str] = None) -> None: ...

    def list_sessions(self) -> List[SessionMeta]: ...

    def delete_session(self, session_id: str) -> None: ...

    def ensure_session(self, session_id: str, label: Optional[str] = None) -> None: ...

    def clear_turns(self, session_id: str) -> None: ...

    def set_label(self, session_id: str, label: str) -> None: ...
