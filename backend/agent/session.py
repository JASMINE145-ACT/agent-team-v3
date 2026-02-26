"""SessionStore — 多轮会话上下文（version3 单 Agent 使用）"""
from __future__ import annotations

import json
import logging
import re
import time
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Optional

logger = logging.getLogger(__name__)


@dataclass
class Turn:
    query: str
    agent: str
    answer: str
    ts: float

    @classmethod
    def from_dict(cls, d: dict) -> "Turn":
        return cls(query=d.get("query", ""), agent=d.get("agent", ""), answer=d.get("answer", ""), ts=float(d.get("ts", 0.0)))

    def to_dict(self) -> dict:
        return asdict(self)


@dataclass
class Session:
    session_id: str
    turns: list
    file_path: Optional[str] = None

    @classmethod
    def empty(cls, session_id: str) -> "Session":
        return cls(session_id=session_id, turns=[], file_path=None)


class SessionStore:
    MAX_TURNS = 8
    ANSWER_TRIM = 4000
    # 注入到下一轮 user 消息的「最近几轮」及每轮答的长度，减小可降 token
    INJECT_TURNS = 2
    INJECT_ANSWER_TRIM = 500

    def __init__(self, persist_dir: Optional[Path] = None):
        self._mem = {}
        self._persist_dir = Path(persist_dir) if persist_dir else None
        if self._persist_dir:
            self._persist_dir.mkdir(parents=True, exist_ok=True)

    @staticmethod
    def _safe_id(session_id: str) -> str:
        return re.sub(r"[^\w\-]", "_", session_id)[:64]

    def _file(self, session_id: str) -> Optional[Path]:
        return (self._persist_dir / f"{self._safe_id(session_id)}.json") if self._persist_dir else None

    def load(self, session_id: str) -> Session:
        if session_id in self._mem:
            return self._mem[session_id]
        f = self._file(session_id)
        if f and f.exists():
            try:
                raw = json.loads(f.read_text(encoding="utf-8"))
                turns = [Turn.from_dict(t) for t in raw.get("turns", [])]
                s = Session(session_id=session_id, turns=turns, file_path=raw.get("file_path"))
                self._mem[session_id] = s
                return s
            except Exception as e:
                logger.warning("Session 加载失败 %s: %s", session_id, e)
        s = Session.empty(session_id)
        self._mem[session_id] = s
        return s

    def save_turn(
        self,
        session_id: str,
        query: str,
        agent: str,
        answer: str,
        file_path: Optional[str] = None,
        input_tokens: Optional[int] = None,
        output_tokens: Optional[int] = None,
    ):
        session = self.load(session_id)
        session.turns.append(Turn(query=query[:200], agent=agent or "", answer=(answer or "")[:self.ANSWER_TRIM], ts=time.time()))
        if len(session.turns) > self.MAX_TURNS:
            session.turns = session.turns[-self.MAX_TURNS:]
        if file_path:
            session.file_path = file_path
        f = self._file(session_id)
        if f:
            try:
                existing_label = None
                if f.exists():
                    try:
                        existing_label = json.loads(f.read_text(encoding="utf-8")).get("label")
                    except Exception:
                        pass
                payload = {
                    "session_id": session_id,
                    "turns": [t.to_dict() for t in session.turns],
                    "file_path": session.file_path,
                    "label": existing_label,
                }
                if input_tokens is not None:
                    payload["last_input_tokens"] = input_tokens
                if output_tokens is not None:
                    payload["last_output_tokens"] = output_tokens
                f.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
            except Exception as e:
                logger.warning("Session 持久化失败: %s", e)

    def build_injection(self, session: Session) -> str:
        if not session.turns:
            return ""
        recent = session.turns[-self.INJECT_TURNS:]
        lines = [f"[会话上下文 — 最近 {len(recent)} 轮]"]
        for i, turn in enumerate(recent, 1):
            ts_str = time.strftime("%H:%M", time.localtime(turn.ts)) if turn.ts else "??"
            ans = turn.answer[:self.INJECT_ANSWER_TRIM] + ("…（已截断）" if len(turn.answer) > self.INJECT_ANSWER_TRIM else "")
            lines.append(f"\n轮次 {i} [{ts_str}] agent={turn.agent or '?'}\n  问: {turn.query}\n  答: {ans}")
        if session.file_path:
            lines.append(f"\n[已上传文件]: {Path(session.file_path).name} → {session.file_path}")
        lines.append("\n【说明】当前用户下一条消息是对上述「最近一轮」的回复，理解用户意图时请以最近一轮的「问」为主题，勿与更早轮次混淆。")
        return "\n".join(lines)

    def list_sessions(self) -> list:
        """扫描持久化目录，返回 [(session_id, updated_at_ts, label, input_tokens, output_tokens)]。"""
        out = []
        if not self._persist_dir or not self._persist_dir.exists():
            return out
        for f in self._persist_dir.glob("*.json"):
            try:
                raw = json.loads(f.read_text(encoding="utf-8"))
                sid = raw.get("session_id", "")
                turns = raw.get("turns", [])
                updated_at = turns[-1].get("ts", 0.0) if turns else 0.0
                label = (turns[0].get("query", "")[:20]) if turns else ""
                in_tok = raw.get("last_input_tokens")
                out_tok = raw.get("last_output_tokens")
                out.append((sid, updated_at, label, in_tok, out_tok))
            except Exception as e:
                logger.debug("list_sessions 跳过 %s: %s", f.name, e)
        return out

    def set_label(self, session_id: str, label: str) -> None:
        """更新会话标题（LLM 生成或用户编辑）。"""
        f = self._file(session_id)
        if not f or not f.exists():
            return
        try:
            raw = json.loads(f.read_text(encoding="utf-8"))
            raw["label"] = (label or "").strip()[:80]
            f.write_text(json.dumps(raw, ensure_ascii=False, indent=2), encoding="utf-8")
        except Exception as e:
            logger.warning("set_label 失败 %s: %s", session_id, e)

    def delete_session(self, session_id: str) -> bool:
        """删除会话：从内存移除并删除持久化文件。"""
        if session_id in self._mem:
            del self._mem[session_id]
        f = self._file(session_id)
        if f and f.exists():
            try:
                f.unlink()
                return True
            except Exception as e:
                logger.warning("delete_session 删文件失败 %s: %s", session_id, e)
        return True


_store: Optional[SessionStore] = None


def get_session_store() -> SessionStore:
    global _store
    if _store is None:
        try:
            from backend.config import Config
            persist_dir = getattr(Config, "SESSION_STORE_DIR", None)
            persist_dir = Path(persist_dir) if persist_dir else Path("data/sessions")
        except Exception:
            persist_dir = Path("data/sessions")
        _store = SessionStore(persist_dir=persist_dir)
    return _store


__all__ = ["Turn", "Session", "SessionStore", "get_session_store"]
