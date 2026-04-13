"""SessionStore — 多轮会话上下文（version3 单 Agent 使用）"""
from __future__ import annotations

import logging
import os
import time
from dataclasses import asdict, dataclass
import json
from pathlib import Path
from typing import Any, Dict, List, Optional

logger = logging.getLogger(__name__)


@dataclass
class Turn:
    query: str
    agent: str
    answer: str
    ts: float
    thinking: Optional[str] = None
    extra: Optional[Dict[str, Any]] = None
    from_user: Optional[str] = None

    @classmethod
    def from_dict(cls, d: dict) -> "Turn":
        return cls(
            query=d.get("query", ""),
            agent=d.get("agent", ""),
            answer=d.get("answer", ""),
            ts=float(d.get("ts", 0.0)),
            thinking=d.get("thinking"),
            extra=d.get("extra") or None,
            from_user=d.get("from_user") or None,
        )

    def to_dict(self) -> dict:
        return asdict(self)


@dataclass
class Snapshot:
    """ReAct 单步指标（供测试与可观测性；非持久化会话字段）。"""

    step: int
    ts: float
    tool_calls: List[str]
    input_tokens: int
    output_tokens: int
    cost: float
    duration_ms: float
    model: str

    def to_dict(self) -> dict:
        return asdict(self)

    @classmethod
    def from_dict(cls, d: dict) -> "Snapshot":
        return cls(
            step=int(d.get("step", 0)),
            ts=float(d.get("ts", 0.0)),
            tool_calls=list(d.get("tool_calls") or []),
            input_tokens=int(d.get("input_tokens", 0)),
            output_tokens=int(d.get("output_tokens", 0)),
            cost=float(d.get("cost", 0.0)),
            duration_ms=float(d.get("duration_ms", 0.0)),
            model=str(d.get("model", "")),
        )


@dataclass
class Session:
    session_id: str
    turns: List[Turn]
    file_path: Optional[str] = None
    file_id: Optional[str] = None
    excel_meta: Optional[Dict[str, Any]] = None
    summary: Optional[str] = None
    tool_memory: Optional[Dict[str, Any]] = None
    user_facts: Optional[Dict[str, Any]] = None
    pending_human_choice: Optional[Dict[str, Any]] = None
    last_input_tokens: Optional[int] = None
    last_output_tokens: Optional[int] = None

    @classmethod
    def empty(cls, session_id: str) -> "Session":
        return cls(
            session_id=session_id,
            turns=[],
            file_path=None,
            file_id=None,
            excel_meta=None,
            summary=None,
            tool_memory=None,
            user_facts=None,
            pending_human_choice=None,
            last_input_tokens=None,
            last_output_tokens=None,
        )


class SessionStore:
    MAX_TURNS = 20
    ANSWER_TRIM = 2000
    INJECT_TURNS = 4
    INJECT_ANSWER_TRIM = 2000

    def __init__(self, backend) -> None:
        self._backend = backend
        self._mem: Dict[str, Session] = {}

    def _persist_sidecar(self, session: Session) -> None:
        fn = getattr(self._backend, "persist_session_sidecar", None)
        if callable(fn):
            try:
                fn(session.session_id, session)
            except Exception as e:
                logger.warning("persist_session_sidecar 失败: %s", e)

    def load(self, session_id: str) -> Session:
        turns = self._backend.load_turns(session_id, self.MAX_TURNS)
        if session_id in self._mem:
            self._mem[session_id].turns = turns
            return self._mem[session_id]
        rb = getattr(self._backend, "read_session_sidecar", None)
        aux: Dict[str, Any] = rb(session_id) if callable(rb) else {}
        s = Session(
            session_id=session_id,
            turns=turns,
            file_path=aux.get("file_path"),
            file_id=aux.get("file_id"),
            excel_meta=aux.get("excel_meta"),
            summary=aux.get("summary"),
            tool_memory=aux.get("tool_memory"),
            user_facts=aux.get("user_facts"),
            pending_human_choice=aux.get("pending_human_choice"),
            last_input_tokens=aux.get("last_input_tokens"),
            last_output_tokens=aux.get("last_output_tokens"),
        )
        self._mem[session_id] = s
        return s

    def save_turn(
        self,
        session_id: str,
        query: str,
        agent: str,
        answer: str,
        thinking: Optional[str] = None,
        file_path: Optional[str] = None,
        input_tokens: Optional[int] = None,
        output_tokens: Optional[int] = None,
        extra: Optional[Dict[str, Any]] = None,
        from_user: Optional[str] = None,
    ) -> None:
        session = self.load(session_id)
        turn = Turn(
            query=query[:200],
            agent=agent or "",
            answer=(answer or ""),
            ts=time.time(),
            thinking=(thinking or None),
            extra=extra or None,
            from_user=from_user or None,
        )
        session.turns.append(turn)
        if len(session.turns) > self.MAX_TURNS:
            session.turns = session.turns[-self.MAX_TURNS :]
        if file_path:
            session.file_path = file_path
        try:
            self._backend.save_turn(session_id, turn, from_user=from_user)
        except Exception as e:
            logger.warning("backend.save_turn 失败: %s", e)
        try:
            if len(session.turns) > 12:
                now_ts = time.time()
                last_ts = 0.0
                uf = session.user_facts or {}
                ts_val = uf.get("_last_summary_ts")
                if isinstance(ts_val, (int, float)):
                    last_ts = float(ts_val)
                if now_ts - last_ts > 300:
                    from backend.agent.conversation_summary import summarize_session_turns

                    new_summary = summarize_session_turns(session.turns, existing_summary=session.summary)
                    if new_summary:
                        session.summary = new_summary
                        uf["_last_summary_ts"] = now_ts
                        session.user_facts = uf
        except Exception as e:
            logger.debug("生成会话摘要失败，已忽略: %s", e, exc_info=True)

        if input_tokens is not None:
            session.last_input_tokens = input_tokens
        if output_tokens is not None:
            session.last_output_tokens = output_tokens
        self._persist_sidecar(session)

    def build_injection(self, session: Session) -> str:
        if not session.turns:
            return ""
        recent = session.turns[-self.INJECT_TURNS :]
        lines: List[str] = []

        if session.summary:
            lines.append("[会话摘要]\n" + session.summary.strip())

        lines.append(f"[会话上下文 — 最近 {len(recent)} 轮]")
        for i, turn in enumerate(recent, 1):
            ts_str = time.strftime("%H:%M", time.localtime(turn.ts)) if turn.ts else "??"
            if turn.from_user:
                sender = f"[{turn.from_user} {ts_str}]"
            else:
                sender = f"[{ts_str}]"
            lines.append(
                f"\n轮次 {i} {sender} agent={turn.agent or '?'}\n  问: {turn.query}\n  答: {turn.answer}"
            )
        if session.file_path:
            lines.append(f"\n[已上传文件]: {Path(session.file_path).name} → {session.file_path}")

        if session.user_facts:
            visible_items = {k: v for k, v in session.user_facts.items() if not str(k).startswith("_")}
            if visible_items:
                try:
                    parts = [f"{k}={v}" for k, v in visible_items.items()]
                    lines.append("\n[用户偏好] " + "；".join(parts))
                except Exception:
                    logger.debug("格式化 user_facts 失败，已忽略", exc_info=True)

        lines.append("\n【说明】当前用户下一条消息是对上述「最近一轮」的回复，理解用户意图时请以最近一轮的「问」为主题，勿与更早轮次混淆。")
        return "\n".join(lines)

    def build_tool_memory_injection(self, session: Session, max_items: int = 3) -> str:
        tm = session.tool_memory or {}
        recent = tm.get("recent_tools") or []
        if not isinstance(recent, list) or not recent:
            return ""
        tail = recent[-max_items:]
        lines: List[str] = ["[最近工具调用]"]
        for idx, rec in enumerate(tail, 1):
            try:
                tool = str(rec.get("tool") or "").strip()
                summary = str(rec.get("summary") or "").strip()
                if not tool and not summary:
                    continue
                line = f"{idx}. {tool}" if tool else f"{idx}."
                if summary:
                    if len(summary) > 160:
                        summary = summary[:157] + "…"
                    line += f" — {summary}"
                lines.append(line)
            except Exception:
                logger.debug("构造 tool_memory 注入行失败，已忽略一条记录", exc_info=True)
        if len(lines) == 1:
            return ""
        return "\n".join(lines)

    def get_or_create_session(self, session_id: str) -> Session:
        return self.load(session_id)

    def update_summary(self, session_id: str, new_summary: str) -> None:
        session = self.load(session_id)
        session.summary = (new_summary or "").strip() or None
        self._persist_sidecar(session)

    def append_tool_memory(self, session_id: str, record: Dict[str, Any], limit: int = 50) -> None:
        session = self.load(session_id)
        if session.tool_memory is None:
            session.tool_memory = {"recent_tools": []}
        recent = session.tool_memory.setdefault("recent_tools", [])
        recent.append(record)
        if len(recent) > limit:
            session.tool_memory["recent_tools"] = recent[-limit:]
        self._persist_sidecar(session)

    def append_card_refs(self, session_id: str, refs: List[Dict[str, Any]], limit: int = 30) -> None:
        """
        Persist structured card references for follow-up pronoun queries.
        De-duplicate by (keywords, code); refresh timestamp and latest fields.
        """
        if not refs:
            return
        session = self.load(session_id)
        if session.tool_memory is None:
            session.tool_memory = {"recent_tools": [], "card_refs": []}
        card_refs = session.tool_memory.setdefault("card_refs", [])
        if not isinstance(card_refs, list):
            card_refs = []
            session.tool_memory["card_refs"] = card_refs

        def _norm_text(v: Any) -> str:
            return str(v or "").strip()

        for raw in refs:
            if not isinstance(raw, dict):
                continue
            ref = {
                "keywords": _norm_text(raw.get("keywords")),
                "code": _norm_text(raw.get("code")),
                "matched_name": _norm_text(raw.get("matched_name")),
                "unit_price": raw.get("unit_price"),
                "match_source": _norm_text(raw.get("match_source")),
                "chosen_index": raw.get("chosen_index"),
                "source_tool": _norm_text(raw.get("source_tool")),
                "ts": int(raw.get("ts") or int(time.time() * 1000)),
            }
            if not (ref["keywords"] or ref["code"]):
                continue

            dedup_idx = None
            for i, old in enumerate(card_refs):
                if not isinstance(old, dict):
                    continue
                if (
                    _norm_text(old.get("keywords")) == ref["keywords"]
                    and _norm_text(old.get("code")) == ref["code"]
                ):
                    dedup_idx = i
                    break
            if dedup_idx is not None:
                card_refs[dedup_idx] = ref
            else:
                card_refs.append(ref)

        card_refs.sort(key=lambda x: int((x or {}).get("ts") or 0))
        if len(card_refs) > limit:
            session.tool_memory["card_refs"] = card_refs[-limit:]
        self._persist_sidecar(session)

    def build_card_memory_injection(self, session: Session, max_items: int = 3) -> str:
        tm = session.tool_memory or {}
        refs = tm.get("card_refs") or []
        if not isinstance(refs, list) or not refs:
            return ""
        tail = refs[-max_items:]
        tail = sorted(tail, key=lambda x: int((x or {}).get("ts") or 0), reverse=True)
        lines: List[str] = ["[最近卡片摘要]"]

        def _safe_text(v: Any, cap: int = 80) -> str:
            s = str(v or "")
            # Neutralize control/new lines and prompt-like formatting markers.
            s = s.replace("\r", " ").replace("\n", " ").replace("\t", " ").strip()
            s = s.replace("```", "").replace("[", "(").replace("]", ")")
            s = json.dumps(s, ensure_ascii=False)[1:-1]
            if len(s) > cap:
                s = s[: cap - 1] + "…"
            return s

        for idx, ref in enumerate(tail, 1):
            if not isinstance(ref, dict):
                continue
            keywords = _safe_text(ref.get("keywords"), cap=80)
            code = _safe_text(ref.get("code"), cap=32)
            name = _safe_text(ref.get("matched_name"), cap=100)
            price = ref.get("unit_price")
            source = _safe_text(ref.get("match_source"), cap=40)
            if not (keywords or code or name):
                continue
            line = (
                f"{idx}. keywords={keywords} | code={code} | "
                f"name={name} | price={price} | source={source}"
            )
            if len(line) > 220:
                line = line[:217] + "..."
            lines.append(line)
        if len(lines) == 1:
            return ""
        return "\n".join(lines)

    def update_user_facts(self, session_id: str, patch: Dict[str, Any]) -> None:
        if not patch:
            return
        session = self.load(session_id)
        base = session.user_facts or {}
        for k, v in patch.items():
            base[k] = v
        session.user_facts = base
        self._persist_sidecar(session)

    def list_sessions(self) -> list:
        metas = self._backend.list_sessions()
        out = []
        rb = getattr(self._backend, "read_session_sidecar", None)
        for m in metas:
            in_tok: Optional[int] = None
            out_tok: Optional[int] = None
            thinking_level = verbose_level = reasoning_level = None
            if callable(rb):
                try:
                    aux = rb(m.session_id)
                    v1 = aux.get("last_input_tokens")
                    v2 = aux.get("last_output_tokens")
                    if isinstance(v1, int):
                        in_tok = v1
                    if isinstance(v2, int):
                        out_tok = v2
                    uf = aux.get("user_facts") or {}
                    if isinstance(uf, dict):
                        thinking_level = uf.get("_thinking_level")
                        verbose_level = uf.get("_verbose_level")
                        reasoning_level = uf.get("_reasoning_level")
                except Exception:
                    pass
            out.append(
                (m.session_id, m.updated_at, m.label, in_tok, out_tok, thinking_level, verbose_level, reasoning_level)
            )
        return out

    def set_label(self, session_id: str, label: str) -> None:
        self._backend.set_label(session_id, label)

    def delete_session(self, session_id: str) -> bool:
        if session_id in self._mem:
            del self._mem[session_id]
        self._backend.delete_session(session_id)
        return True

    def clear_turns(self, session_id: str) -> None:
        if session_id in self._mem:
            self._mem[session_id].turns = []
        self._backend.clear_turns(session_id)

    def ensure_session(self, session_id: str, label: Optional[str] = None) -> None:
        self._backend.ensure_session(session_id, label=label)

    def flush_session_aux(self, session_id: str) -> None:
        session = self.load(session_id)
        self._persist_sidecar(session)

    def set_pending_human_choice(self, session_id: str, data: Dict[str, Any]) -> None:
        session = self.load(session_id)
        session.pending_human_choice = data
        self._persist_sidecar(session)

    def clear_pending_human_choice(self, session_id: str) -> None:
        session = self.load(session_id)
        session.pending_human_choice = None
        self._persist_sidecar(session)


_store: Optional[SessionStore] = None


def get_session_store() -> SessionStore:
    global _store
    if _store is None:
        try:
            from backend.config import Config

            SessionStore.MAX_TURNS = int(getattr(Config, "SESSION_MAX_TURNS", SessionStore.MAX_TURNS))
            SessionStore.INJECT_TURNS = int(getattr(Config, "SESSION_INJECT_TURNS", SessionStore.INJECT_TURNS))
            SessionStore.INJECT_ANSWER_TRIM = int(
                getattr(Config, "SESSION_INJECT_ANSWER_TRIM", SessionStore.INJECT_ANSWER_TRIM)
            )
            SessionStore.ANSWER_TRIM = int(getattr(Config, "SESSION_ANSWER_TRIM", SessionStore.ANSWER_TRIM))
        except Exception:
            pass

        database_url = os.getenv("DATABASE_URL")
        backend = None
        if database_url:
            try:
                from backend.agent.session_backend_neon import NeonBackend

                backend = NeonBackend(database_url)
                logger.info("SessionStore using NeonBackend")
            except Exception as e:
                logger.error("NeonBackend 初始化失败，回退到 FileBackend: %s", e)
                database_url = None

        if backend is None:
            from backend.agent.session_backend_file import FileBackend

            try:
                from backend.config import Config

                persist_dir = Path(getattr(Config, "SESSION_STORE_DIR", "data/sessions"))
            except Exception:
                persist_dir = Path("data/sessions")
            backend = FileBackend(persist_dir=persist_dir)
            logger.info("SessionStore using FileBackend at %s", persist_dir)

        _store = SessionStore(backend=backend)
    return _store


__all__ = ["Turn", "Session", "Snapshot", "SessionStore", "get_session_store"]
