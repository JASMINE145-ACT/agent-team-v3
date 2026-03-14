"""SessionStore — 多轮会话上下文（version3 单 Agent 使用）"""
from __future__ import annotations

import json
import logging
import re
import time
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Any, Dict, List, Optional

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
    turns: List[Turn]
    file_path: Optional[str] = None
    # 关联的文件与 Excel 元信息（用于 File Memory）
    file_id: Optional[str] = None
    excel_meta: Optional[Dict[str, Any]] = None
    # 会话级摘要（Conversation Summary）
    summary: Optional[str] = None
    # 工具调用记忆（Tool Memory），例如 {"recent_tools": [...], "last_pipeline": {...}}
    tool_memory: Optional[Dict[str, Any]] = None
    # 用户偏好等长期事实（User Facts）
    user_facts: Optional[Dict[str, Any]] = None

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
        )


class SessionStore:
    # 默认配置（可被 Config 中的 SESSION_* 覆盖）
    MAX_TURNS = 20
    ANSWER_TRIM = 2000
    INJECT_TURNS = 4
    INJECT_ANSWER_TRIM = 2000

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
                s = Session(
                    session_id=session_id,
                    turns=turns,
                    file_path=raw.get("file_path"),
                    file_id=raw.get("file_id"),
                    excel_meta=raw.get("excel_meta") or None,
                    summary=raw.get("summary"),
                    tool_memory=raw.get("tool_memory") or None,
                    user_facts=raw.get("user_facts") or None,
                )
                self._mem[session_id] = s
                return s
            except Exception as e:
                logger.warning("Session 加载失败 %s: %s", session_id, e)
        s = Session.empty(session_id)
        self._mem[session_id] = s
        return s

    def _persist_session(
        self,
        session: Session,
        input_tokens: Optional[int] = None,
        output_tokens: Optional[int] = None,
    ) -> None:
        """将 Session 当前状态持久化到磁盘（若配置了目录）。"""
        f = self._file(session.session_id)
        if not f:
            return
        try:
            existing_label = None
            if f.exists():
                try:
                    existing_label = json.loads(f.read_text(encoding="utf-8")).get("label")
                except Exception:
                    pass
            payload: Dict[str, Any] = {
                "session_id": session.session_id,
                "turns": [t.to_dict() for t in session.turns],
                "file_path": session.file_path,
                "file_id": session.file_id,
                "excel_meta": session.excel_meta,
                "summary": session.summary,
                "tool_memory": session.tool_memory,
                "user_facts": session.user_facts,
                "label": existing_label,
            }
            if input_tokens is not None:
                payload["last_input_tokens"] = input_tokens
            if output_tokens is not None:
                payload["last_output_tokens"] = output_tokens
            f.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
        except Exception as e:
            logger.warning("Session 持久化失败: %s", e)

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
        # 存盘保留完整 answer，不截断；build_injection 也注入完整回答，保证模型能看到上一轮完整表格/明细
        session.turns.append(Turn(query=query[:200], agent=agent or "", answer=(answer or ""), ts=time.time()))
        if len(session.turns) > self.MAX_TURNS:
            session.turns = session.turns[-self.MAX_TURNS:]
        if file_path:
            session.file_path = file_path
        # 条件触发会话摘要生成/更新：对长对话进行中期压缩
        try:
            if len(session.turns) > 12:
                now_ts = time.time()
                last_ts = 0.0
                uf = session.user_facts or {}
                ts_val = uf.get("_last_summary_ts")
                if isinstance(ts_val, (int, float)):
                    last_ts = float(ts_val)
                # 至少间隔 5 分钟再尝试生成一次摘要，避免频繁调用
                if now_ts - last_ts > 300:
                    from backend.agent.conversation_summary import summarize_session_turns

                    new_summary = summarize_session_turns(session.turns, existing_summary=session.summary)
                    if new_summary:
                        session.summary = new_summary
                        uf["_last_summary_ts"] = now_ts
                        session.user_facts = uf
        except Exception as e:  # noqa: BLE001
            logger.debug("生成会话摘要失败，已忽略: %s", e, exc_info=True)

        self._persist_session(session, input_tokens=input_tokens, output_tokens=output_tokens)

    def build_injection(self, session: Session) -> str:
        if not session.turns:
            return ""
        recent = session.turns[-self.INJECT_TURNS:]
        lines: List[str] = []

        # 会话摘要：概括更早轮次，避免长对话“断层”
        if session.summary:
            lines.append("[会话摘要]\n" + session.summary.strip())

        lines.append(f"[会话上下文 — 最近 {len(recent)} 轮]")
        for i, turn in enumerate(recent, 1):
            ts_str = time.strftime("%H:%M", time.localtime(turn.ts)) if turn.ts else "??"
            # 注入完整回答，不截断，保证模型能看到上一轮完整表格/明细
            lines.append(f"\n轮次 {i} [{ts_str}] agent={turn.agent or '?'}\n  问: {turn.query}\n  答: {turn.answer}")
        if session.file_path:
            lines.append(f"\n[已上传文件]: {Path(session.file_path).name} → {session.file_path}")

        # 用户偏好等长期事实（不展示内部字段，以 '_' 开头的 key 视为内部使用）
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
        """
        基于 Session.tool_memory 生成一段精简的「最近工具调用」提示。

        仅展示最近若干条记录的 tool 名与 summary，避免铺开完整 JSON。
        """
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
        """显式别名，便于在 Memory 相关逻辑中使用。"""
        return self.load(session_id)

    def update_summary(self, session_id: str, new_summary: str) -> None:
        """更新会话级摘要（Conversation Summary）。"""
        session = self.load(session_id)
        session.summary = (new_summary or "").strip() or None
        self._persist_session(session)

    def append_tool_memory(self, session_id: str, record: Dict[str, Any], limit: int = 50) -> None:
        """追加一条 Tool Memory 记录，并限制最近记录数量。"""
        session = self.load(session_id)
        if session.tool_memory is None:
            session.tool_memory = {"recent_tools": []}
        recent = session.tool_memory.setdefault("recent_tools", [])
        recent.append(record)
        if len(recent) > limit:
            session.tool_memory["recent_tools"] = recent[-limit:]
        self._persist_session(session)

    def update_user_facts(self, session_id: str, patch: Dict[str, Any]) -> None:
        """浅合并用户偏好等长期事实（User Facts）。"""
        if not patch:
            return
        session = self.load(session_id)
        base = session.user_facts or {}
        for k, v in patch.items():
            base[k] = v
        session.user_facts = base
        self._persist_session(session)

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
            # 覆盖 SessionStore 级别的 Memory 相关参数
            SessionStore.MAX_TURNS = int(getattr(Config, "SESSION_MAX_TURNS", SessionStore.MAX_TURNS))
            SessionStore.INJECT_TURNS = int(
                getattr(Config, "SESSION_INJECT_TURNS", SessionStore.INJECT_TURNS)
            )
            SessionStore.INJECT_ANSWER_TRIM = int(
                getattr(Config, "SESSION_INJECT_ANSWER_TRIM", SessionStore.INJECT_ANSWER_TRIM)
            )
            SessionStore.ANSWER_TRIM = int(
                getattr(Config, "SESSION_ANSWER_TRIM", SessionStore.ANSWER_TRIM)
            )
        except Exception:
            persist_dir = Path("data/sessions")
        _store = SessionStore(persist_dir=persist_dir)
    return _store


__all__ = ["Turn", "Session", "SessionStore", "get_session_store"]
