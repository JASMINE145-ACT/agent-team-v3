"""进行中的 runId → asyncio.Event（取消用）"""
import asyncio
from typing import Dict

_run_store: Dict[str, asyncio.Event] = {}


def register(run_id: str) -> asyncio.Event:
    ev = asyncio.Event()
    _run_store[run_id] = ev
    return ev


def unregister(run_id: str) -> None:
    _run_store.pop(run_id, None)


def get(run_id: str) -> asyncio.Event | None:
    return _run_store.get(run_id)


def cancel(run_id: str) -> bool:
    ev = _run_store.get(run_id)
    if ev is not None:
        ev.set()
        return True
    return False
