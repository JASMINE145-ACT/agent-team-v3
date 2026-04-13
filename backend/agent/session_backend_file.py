"""FileBackend — SessionBackend implementation using local JSON files."""
from __future__ import annotations

import json
import logging
import re
import time
from pathlib import Path
from typing import Any, Dict, List, Optional

from backend.agent.session import Session, Turn
from backend.agent.session_backend import SessionMeta

logger = logging.getLogger(__name__)

_AUX_KEYS = (
    "file_path",
    "file_id",
    "excel_meta",
    "summary",
    "tool_memory",
    "user_facts",
    "pending_human_choice",
    "last_input_tokens",
    "last_output_tokens",
)


class FileBackend:
    def __init__(self, persist_dir: Path) -> None:
        self._dir = Path(persist_dir)
        self._dir.mkdir(parents=True, exist_ok=True)

    @staticmethod
    def _safe_id(session_id: str) -> str:
        return re.sub(r"[^\w\-]", "_", session_id)[:64]

    def _file(self, session_id: str) -> Path:
        return self._dir / f"{self._safe_id(session_id)}.json"

    def _read_raw(self, session_id: str) -> dict:
        f = self._file(session_id)
        if not f.exists():
            return {}
        try:
            return json.loads(f.read_text(encoding="utf-8"))
        except Exception as e:
            logger.warning("FileBackend 读取失败 %s: %s", session_id, e)
            return {}

    def _write_raw(self, session_id: str, data: dict) -> None:
        try:
            self._file(session_id).write_text(
                json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8"
            )
        except Exception as e:
            logger.warning("FileBackend 写入失败 %s: %s", session_id, e)

    def read_session_sidecar(self, session_id: str) -> Dict[str, Any]:
        raw = self._read_raw(session_id)
        out: Dict[str, Any] = {}
        for k in _AUX_KEYS:
            if k in raw:
                out[k] = raw[k]
        return out

    def persist_session_sidecar(self, session_id: str, session: Session) -> None:
        raw = self._read_raw(session_id)
        if not raw.get("session_id"):
            raw["session_id"] = session_id
        if "turns" not in raw:
            raw["turns"] = [t.to_dict() for t in session.turns]
        raw["file_path"] = session.file_path
        raw["file_id"] = session.file_id
        raw["excel_meta"] = session.excel_meta
        raw["summary"] = session.summary
        raw["tool_memory"] = session.tool_memory
        raw["user_facts"] = session.user_facts
        raw["pending_human_choice"] = session.pending_human_choice
        raw["last_input_tokens"] = session.last_input_tokens
        raw["last_output_tokens"] = session.last_output_tokens
        raw["updated_at"] = time.time()
        self._write_raw(session_id, raw)

    def load_turns(self, session_id: str, limit: int) -> List[Turn]:
        raw = self._read_raw(session_id)
        turns = [Turn.from_dict(t) for t in raw.get("turns", [])]
        return turns[-limit:] if limit else turns

    def save_turn(self, session_id: str, turn: Turn, from_user: Optional[str] = None) -> None:
        raw = self._read_raw(session_id)
        if not raw.get("session_id"):
            raw["session_id"] = session_id
        turns = raw.get("turns", [])
        d = turn.to_dict()
        if from_user:
            d["from_user"] = from_user
        turns.append(d)
        raw["turns"] = turns
        raw["updated_at"] = time.time()
        if not raw.get("label"):
            raw["label"] = None
        self._write_raw(session_id, raw)

    def list_sessions(self) -> List[SessionMeta]:
        out = []
        for f in self._dir.glob("*.json"):
            try:
                raw = json.loads(f.read_text(encoding="utf-8"))
                sid = raw.get("session_id", "")
                if not sid:
                    continue
                updated_at = raw.get("updated_at") or 0.0
                label = raw.get("label")
                out.append(SessionMeta(session_id=sid, label=label, updated_at=float(updated_at)))
            except Exception as e:
                logger.debug("list_sessions 跳过 %s: %s", f.name, e)
        return sorted(out, key=lambda m: m.updated_at, reverse=True)

    def delete_session(self, session_id: str) -> None:
        f = self._file(session_id)
        if f.exists():
            try:
                f.unlink()
            except Exception as e:
                logger.warning("FileBackend delete_session 失败 %s: %s", session_id, e)

    def ensure_session(self, session_id: str, label: Optional[str] = None) -> None:
        f = self._file(session_id)
        if f.exists():
            return
        self._write_raw(
            session_id,
            {
                "session_id": session_id,
                "label": label,
                "turns": [],
                "updated_at": time.time(),
            },
        )

    def clear_turns(self, session_id: str) -> None:
        raw = self._read_raw(session_id)
        raw["turns"] = []
        raw["updated_at"] = time.time()
        self._write_raw(session_id, raw)

    def set_label(self, session_id: str, label: str) -> None:
        raw = self._read_raw(session_id)
        if not raw:
            raw = {"session_id": session_id, "turns": [], "updated_at": time.time()}
        raw["label"] = (label or "").strip()[:80]
        self._write_raw(session_id, raw)
