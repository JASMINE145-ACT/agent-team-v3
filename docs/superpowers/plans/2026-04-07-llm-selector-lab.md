# LLM Selector Lab Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Streamlit dev tool that runs `match_quotation_union → llm_select_best` for 1–5 product queries, shows all candidates + chosen row + reason, and lets the tester live-edit business knowledge to observe its effect.

**Architecture:** Main backend gets two debug endpoints (`POST /api/debug/match-select`, `GET /api/debug/knowledge`) active only when `DEBUG=true`. A standalone `selector-lab/` folder (separate deployable Streamlit project) calls these endpoints — zero business logic in the UI.

**Tech Stack:** Python 3.11, FastAPI (existing), Streamlit, httpx, pydantic.

---

## File Map

### Modified (main backend)
| File | Change |
|------|--------|
| `backend/tools/inventory/services/llm_selector.py` | Add `knowledge_override` param; extract `_build_selector_prompt` helper |
| `backend/server/api/app.py` | Register debug router when `Config.DEBUG` |

### Created (main backend)
| File | Purpose |
|------|---------|
| `backend/server/api/routes_debug.py` | `POST /api/debug/match-select` + `GET /api/debug/knowledge` |
| `tests/test_debug_routes.py` | FastAPI TestClient tests for both endpoints |

### Created (standalone Streamlit project)
| File | Purpose |
|------|---------|
| `selector-lab/app.py` | Streamlit UI — single + batch tabs, knowledge editor |
| `selector-lab/requirements.txt` | `streamlit`, `httpx`, `pandas` |
| `selector-lab/.streamlit/secrets.toml.example` | Template for `BACKEND_URL` |

---

## Task 1: Extract `_build_selector_prompt` + add `knowledge_override`

**Files:**
- Modify: `backend/tools/inventory/services/llm_selector.py:229–291`

The goal is to extract the prompt-building logic into a reusable helper so the debug endpoint can reconstruct the exact prompt, and add `knowledge_override` so testers can inject custom knowledge.

- [ ] **Step 1: Write the failing test**

Create `tests/test_llm_selector_knowledge_override.py`:

```python
"""Tests for knowledge_override parameter in llm_select_best."""
from unittest.mock import MagicMock, patch
from backend.tools.inventory.services.llm_selector import (
    _build_selector_prompt,
    llm_select_best,
)

_CANDIDATES = [
    {"code": "C001", "matched_name": "PVC直通DN50", "unit_price": 10.0, "source": "共同"},
    {"code": "C002", "matched_name": "PPR直通DN50", "unit_price": 12.0, "source": "字段匹配"},
]


def test_build_selector_prompt_uses_override():
    prompt = _build_selector_prompt(
        keywords="直通50",
        llm_candidates=_CANDIDATES,
        knowledge_hint="自定义知识：直通等于直接头",
    )
    assert "直通50" in prompt
    assert "自定义知识" in prompt
    assert "PVC直通DN50" in prompt


def test_build_selector_prompt_default_knowledge():
    prompt = _build_selector_prompt(
        keywords="直通50",
        llm_candidates=_CANDIDATES,
        knowledge_hint="内嵌默认知识",
    )
    assert "内嵌默认知识" in prompt


def test_llm_select_best_knowledge_override_reaches_prompt():
    """knowledge_override string must appear in the prompt sent to the LLM."""
    captured_prompts = []

    def fake_create(**kwargs):
        msgs = kwargs.get("messages", [])
        for m in msgs:
            if m.get("role") == "user":
                captured_prompts.append(m["content"])
        mock_resp = MagicMock()
        mock_resp.choices = [MagicMock()]
        mock_resp.choices[0].message.content = '{"index": 1, "reason": "测试原因OK"}'
        mock_resp.choices[0].finish_reason = "stop"
        mock_resp.choices[0].message.reasoning_content = None
        return mock_resp

    with patch("backend.tools.inventory.services.llm_selector.OpenAI") as mock_openai:
        mock_client = MagicMock()
        mock_client.chat.completions.create.side_effect = fake_create
        mock_openai.return_value = mock_client

        llm_select_best(
            keywords="直通50",
            candidates=_CANDIDATES,
            knowledge_override="UNIQUE_OVERRIDE_STRING_XYZ",
        )

    assert any("UNIQUE_OVERRIDE_STRING_XYZ" in p for p in captured_prompts), \
        "knowledge_override was not passed to the LLM prompt"
```

- [ ] **Step 2: Run test to confirm it fails**

```
py -m pytest tests/test_llm_selector_knowledge_override.py -v
```

Expected: `ImportError` or `TypeError` — `_build_selector_prompt` doesn't exist yet.

- [ ] **Step 3: Add `_build_selector_prompt` helper and `knowledge_override` param**

In `backend/tools/inventory/services/llm_selector.py`, find the block starting at `prompt = (` inside `llm_select_best` (around line 282). Replace with a call to the new helper.

**Add this function just before `llm_select_best`:**

```python
def _build_selector_prompt(
    keywords: str,
    llm_candidates: list[dict],
    knowledge_hint: str,
) -> str:
    """Build the user-message prompt for the LLM selector. Extracted for testability."""
    lines: list[str] = []
    for i, c in enumerate(llm_candidates, 1):
        code = (c.get("code") or "").strip()
        name = (c.get("matched_name") or "")[:120]
        price = c.get("unit_price", 0)
        source = (c.get("source") or "")[:30]
        lines.append(
            f"{i}. [{code}] {name} | price={price} | src={source} | src_rank={_source_rank(source)}"
        )
    candidates_text = "\n".join(lines)
    return (
        f"keywords: {keywords}\n"
        f"N={len(llm_candidates)}\n"
        f"candidates:\n{candidates_text}\n\n"
        f"business_knowledge(mandatory):\n{knowledge_hint}\n\n"
        f"task: choose exactly one index in 1..{len(llm_candidates)}, or 0 if none matches.\n"
        'output JSON only: {"index": number, "reason": "short text"}'
    )
```

**Modify `llm_select_best` signature:**

```python
def llm_select_best(
    keywords: str,
    candidates: list[dict[str, Any]],
    max_tokens: int | None = None,
    knowledge_override: str | None = None,   # NEW
) -> Optional[dict[str, Any]]:
```

**Replace the two lines that build `knowledge` and `knowledge_hint`:**

```python
    # Was:
    #   knowledge = _load_business_knowledge()
    #   knowledge_hint = _build_knowledge_hint(keywords, knowledge, knowledge_limit)
    # Now:
    knowledge = (
        knowledge_override.strip()
        if knowledge_override and knowledge_override.strip()
        else _load_business_knowledge()
    )
    knowledge_hint = _build_knowledge_hint(keywords, knowledge, knowledge_limit)
```

**Replace the `prompt = (...)` block (and the identical block in the retry path) with calls to the helper:**

```python
    prompt = _build_selector_prompt(keywords, llm_candidates, knowledge_hint)
```

For the retry path, replace its `retry_prompt = (...)` block with:

```python
    retry_prompt = _build_selector_prompt(keywords, llm_candidates, retry_knowledge_hint)
```

Also remove the now-redundant per-candidate `lines` loop from `llm_select_best` (it's now inside `_build_selector_prompt`). Delete the block:

```python
    lines: list[str] = []
    for i, c in enumerate(llm_candidates, 1):
        code = (c.get("code") or "").strip()
        name = (c.get("matched_name") or "")[:120]
        price = c.get("unit_price", 0)
        source = (c.get("source") or "")[:30]
        lines.append(
            f"{i}. [{code}] {name} | price={price} | src={source} | src_rank={_source_rank(source)}"
        )
    candidates_text = "\n".join(lines)
```

- [ ] **Step 4: Run tests**

```
py -m pytest tests/test_llm_selector_knowledge_override.py -v
```

Expected: 3 PASSED.

- [ ] **Step 5: Commit**

```bash
git add backend/tools/inventory/services/llm_selector.py tests/test_llm_selector_knowledge_override.py
git commit -m "feat: add knowledge_override to llm_select_best; extract _build_selector_prompt"
```

---

## Task 2: Create `routes_debug.py`

**Files:**
- Create: `backend/server/api/routes_debug.py`
- Test: `tests/test_debug_routes.py`

- [ ] **Step 1: Write the failing tests**

Create `tests/test_debug_routes.py`:

```python
"""Tests for /api/debug/* endpoints."""
import pytest
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient


def _make_candidates():
    return [
        {"code": "C001", "matched_name": "PVC直通DN50", "unit_price": 10.0, "source": "共同"},
        {"code": "C002", "matched_name": "PPR直通DN50", "unit_price": 12.0, "source": "字段匹配"},
    ]


def _make_app():
    from fastapi import FastAPI
    from backend.server.api.routes_debug import router
    app = FastAPI()
    app.include_router(router)
    return TestClient(app)


def test_match_select_returns_expected_fields():
    client = _make_app()
    with patch(
        "backend.server.api.routes_debug.match_quotation_union",
        return_value=_make_candidates(),
    ), patch(
        "backend.server.api.routes_debug.llm_select_best",
        return_value={
            "code": "C001", "matched_name": "PVC直通DN50",
            "unit_price": 10.0, "reasoning": "规格吻合",
        },
    ):
        resp = client.post(
            "/api/debug/match-select",
            json={"keywords": "直通50", "customer_level": "B"},
        )
    assert resp.status_code == 200
    data = resp.json()
    assert data["keywords"] == "直通50"
    assert data["status"] == "single"
    assert len(data["candidates"]) == 2
    assert data["candidates"][0]["index"] == 1
    assert data["chosen_index"] == 1
    assert data["chosen"]["code"] == "C001"
    assert "reason" in data
    assert "llm_prompt" in data


def test_match_select_unmatched_when_no_candidates():
    client = _make_app()
    with patch(
        "backend.server.api.routes_debug.match_quotation_union",
        return_value=[],
    ):
        resp = client.post(
            "/api/debug/match-select",
            json={"keywords": "不存在的产品XYZ"},
        )
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "unmatched"
    assert data["candidates"] == []
    assert data["chosen_index"] == 0


def test_match_select_llm_error_status():
    client = _make_app()
    with patch(
        "backend.server.api.routes_debug.match_quotation_union",
        return_value=_make_candidates(),
    ), patch(
        "backend.server.api.routes_debug.llm_select_best",
        side_effect=RuntimeError("LLM timeout"),
    ):
        resp = client.post(
            "/api/debug/match-select",
            json={"keywords": "直通50"},
        )
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "llm_error"
    assert "LLM timeout" in data["reason"]


def test_match_select_needs_selection_when_llm_returns_none():
    """llm_select_best returning None means index=0 (no confident match)."""
    client = _make_app()
    with patch(
        "backend.server.api.routes_debug.match_quotation_union",
        return_value=_make_candidates(),
    ), patch(
        "backend.server.api.routes_debug.llm_select_best",
        return_value=None,
    ):
        resp = client.post(
            "/api/debug/match-select",
            json={"keywords": "直通50"},
        )
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "unmatched"
    assert data["chosen_index"] == 0


def test_get_knowledge_returns_content():
    client = _make_app()
    with patch(
        "backend.server.api.routes_debug._read_knowledge_file",
        return_value="知识库内容测试",
    ):
        resp = client.get("/api/debug/knowledge")
    assert resp.status_code == 200
    assert resp.json()["content"] == "知识库内容测试"
```

- [ ] **Step 2: Run to confirm all fail**

```
py -m pytest tests/test_debug_routes.py -v
```

Expected: `ImportError` — `routes_debug` doesn't exist yet.

- [ ] **Step 3: Create `routes_debug.py`**

```python
"""Debug-only endpoints for testing the match-quotation + LLM-selector pipeline.

Only register this router when Config.DEBUG is True (see app.py).
"""
from __future__ import annotations

import logging
from pathlib import Path
from typing import Any, Optional

from fastapi import APIRouter
from pydantic import BaseModel

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/debug", tags=["debug"])

# ── imports from existing code ────────────────────────────────────────────────
from backend.tools.inventory.services.match_and_inventory import match_quotation_union
from backend.tools.inventory.services.llm_selector import (
    llm_select_best,
    _build_knowledge_hint,
    _build_selector_prompt,
    _sort_candidates_by_source,
    _load_business_knowledge,
)

_SOURCE_PRIORITY = {"共同": 0, "历史报价": 1, "字段匹配": 2}


# ── helpers ───────────────────────────────────────────────────────────────────

def _read_knowledge_file() -> str:
    """Read business knowledge file; return embedded default if missing."""
    return _load_business_knowledge()


def _norm_candidates(raw: list[dict]) -> list[dict]:
    """Normalize + sort + add 1-based index field."""
    norm = [
        {
            "code": str(c.get("code", "")),
            "matched_name": str(c.get("matched_name", "")),
            "unit_price": float(c.get("unit_price") or 0),
            "source": c.get("source", "未知"),
        }
        for c in raw
    ]
    norm = sorted(norm, key=lambda c: _SOURCE_PRIORITY.get((c.get("source") or "").strip(), 99))
    norm = norm[:15]
    for i, c in enumerate(norm, 1):
        c["index"] = i
    return norm


def _match_source_str(candidates: list[dict]) -> str:
    sources = [
        src for src in ("共同", "历史报价", "字段匹配")
        if any((c.get("source") or "").strip() == src for c in candidates)
    ]
    return "、".join(sources) if sources else "未知"


def _build_llm_prompt(
    keywords: str,
    candidates: list[dict],
    knowledge_override: str | None,
) -> str:
    """Reconstruct the exact prompt that would be sent to the LLM."""
    knowledge = (
        knowledge_override.strip()
        if knowledge_override and knowledge_override.strip()
        else _load_business_knowledge()
    )
    sorted_cands = _sort_candidates_by_source(candidates)[:8]
    knowledge_hint = _build_knowledge_hint(keywords, knowledge, 1500)
    return _build_selector_prompt(keywords, sorted_cands, knowledge_hint)


# ── request / response models ─────────────────────────────────────────────────

class MatchSelectRequest(BaseModel):
    keywords: str
    customer_level: str = "B"
    knowledge_override: Optional[str] = None


# ── endpoints ─────────────────────────────────────────────────────────────────

@router.post("/match-select")
async def match_and_select(req: MatchSelectRequest) -> dict[str, Any]:
    keywords = req.keywords.strip()
    if not keywords:
        return {"status": "unmatched", "keywords": "", "candidates": [],
                "chosen_index": 0, "chosen": None, "reason": "", "llm_prompt": ""}

    # Step 1: fetch candidates
    try:
        raw = match_quotation_union(keywords, customer_level=req.customer_level)
    except Exception as e:
        logger.exception("match_quotation_union failed")
        return {
            "status": "llm_error", "keywords": keywords, "candidates": [],
            "chosen_index": 0, "chosen": None,
            "reason": str(e), "llm_prompt": "",
        }

    if not raw:
        return {
            "status": "unmatched", "keywords": keywords, "candidates": [],
            "chosen_index": 0, "chosen": None,
            "reason": "no candidates found", "llm_prompt": "",
        }

    candidates = _norm_candidates(raw)
    match_source = _match_source_str(candidates)
    llm_prompt = _build_llm_prompt(keywords, candidates, req.knowledge_override)

    # Step 2: LLM selection
    try:
        result = llm_select_best(
            keywords,
            candidates,
            knowledge_override=req.knowledge_override,
        )
    except Exception as e:
        logger.exception("llm_select_best failed")
        return {
            "status": "llm_error", "keywords": keywords,
            "candidates": candidates, "match_source": match_source,
            "chosen_index": 0, "chosen": None,
            "reason": str(e), "llm_prompt": llm_prompt,
        }

    if result is None:
        return {
            "status": "unmatched", "keywords": keywords,
            "candidates": candidates, "match_source": match_source,
            "chosen_index": 0, "chosen": None,
            "reason": "LLM returned index=0 (no confident match)",
            "llm_prompt": llm_prompt,
        }

    # Find chosen_index by matching code
    chosen_code = (result.get("code") or "").strip()
    chosen_index = next(
        (c["index"] for c in candidates if c["code"] == chosen_code), 0
    )

    return {
        "status": "single",
        "keywords": keywords,
        "match_source": match_source,
        "candidates": candidates,
        "chosen_index": chosen_index,
        "chosen": {
            "code": result.get("code", ""),
            "matched_name": result.get("matched_name", ""),
            "unit_price": result.get("unit_price", 0),
            "source": next(
                (c["source"] for c in candidates if c["code"] == chosen_code), ""
            ),
        },
        "reason": result.get("reasoning", ""),
        "llm_prompt": llm_prompt,
    }


@router.get("/knowledge")
async def get_knowledge() -> dict[str, str]:
    return {"content": _read_knowledge_file()}
```

- [ ] **Step 4: Run tests**

```
py -m pytest tests/test_debug_routes.py -v
```

Expected: 5 PASSED.

- [ ] **Step 5: Commit**

```bash
git add backend/server/api/routes_debug.py tests/test_debug_routes.py
git commit -m "feat: add /api/debug/match-select and /api/debug/knowledge endpoints"
```

---

## Task 3: Register debug router in `app.py`

**Files:**
- Modify: `backend/server/api/app.py`

- [ ] **Step 1: Add conditional router registration**

In `backend/server/api/app.py`, after the existing `app.include_router(wecom_router)` line (line ~36), add:

```python
if Config.DEBUG:
    from backend.server.api.routes_debug import router as debug_router
    app.include_router(debug_router)
    logger.info("Debug routes enabled at /api/debug/*")
```

The import must be inside the `if` block so the module is never loaded in production.

- [ ] **Step 2: Verify it loads without error**

```bash
DEBUG=true py -c "from backend.server.api.app import app; print('OK')"
```

Expected output: `OK` (plus config load messages).

- [ ] **Step 3: Smoke-test with curl (requires running server)**

```bash
# In one terminal:
DEBUG=true py -m uvicorn backend.server.api.app:app --port 8000

# In another:
curl -s http://localhost:8000/api/debug/knowledge | python -m json.tool
```

Expected: JSON with `{"content": "...knowledge text..."}`.

- [ ] **Step 4: Commit**

```bash
git add backend/server/api/app.py
git commit -m "feat: register debug router when DEBUG=true"
```

---

## Task 4: Create standalone Streamlit project `selector-lab/`

**Files:**
- Create: `selector-lab/requirements.txt`
- Create: `selector-lab/.streamlit/secrets.toml.example`
- Create: `selector-lab/app.py`

This is a **separate deployable project**. It has no imports from `backend/`. It only calls the two debug HTTP endpoints.

- [ ] **Step 1: Create `requirements.txt`**

```
streamlit>=1.32.0
httpx>=0.27.0
pandas>=2.0.0
```

- [ ] **Step 2: Create `.streamlit/secrets.toml.example`**

```toml
# Copy this to .streamlit/secrets.toml and fill in your values.
# On Streamlit Cloud, set these under App Settings → Secrets.
BACKEND_URL = "https://your-backend.onrender.com"
```

- [ ] **Step 3: Create `selector-lab/app.py`**

```python
"""LLM Selector Lab — Streamlit dev tool for testing match_quotation + llm_select_best."""
import httpx
import pandas as pd
import streamlit as st

# ── config ────────────────────────────────────────────────────────────────────
BACKEND_URL = st.secrets.get("BACKEND_URL", "http://localhost:8000").rstrip("/")
MATCH_URL = f"{BACKEND_URL}/api/debug/match-select"
KNOWLEDGE_URL = f"{BACKEND_URL}/api/debug/knowledge"
MAX_BATCH = 5
STATUS_ICON = {
    "single": "✅",
    "needs_selection": "🔶",
    "unmatched": "⚠️",
    "llm_error": "❌",
}


# ── helpers ───────────────────────────────────────────────────────────────────

def fetch_knowledge() -> str:
    try:
        r = httpx.get(KNOWLEDGE_URL, timeout=10)
        r.raise_for_status()
        return r.json().get("content", "")
    except Exception as e:
        st.warning(f"无法加载 knowledge 文件：{e}")
        return ""


def run_query(keywords: str, customer_level: str, knowledge_override: str) -> dict:
    try:
        r = httpx.post(
            MATCH_URL,
            json={
                "keywords": keywords,
                "customer_level": customer_level,
                "knowledge_override": knowledge_override or None,
            },
            timeout=30,
        )
        r.raise_for_status()
        return r.json()
    except httpx.ConnectError:
        return {"status": "llm_error", "keywords": keywords, "candidates": [],
                "chosen_index": 0, "chosen": None,
                "reason": f"无法连接后端 {BACKEND_URL}（是否已启动且 DEBUG=true？）",
                "llm_prompt": ""}
    except Exception as e:
        return {"status": "llm_error", "keywords": keywords, "candidates": [],
                "chosen_index": 0, "chosen": None,
                "reason": str(e), "llm_prompt": ""}


def render_result(data: dict) -> None:
    """Render candidates table + chosen row + reason inside current container."""
    status = data.get("status", "llm_error")
    icon = STATUS_ICON.get(status, "❓")
    chosen_index = data.get("chosen_index", 0)  # 1-based; 0 = no choice
    reason = data.get("reason", "")
    match_source = data.get("match_source", "")
    candidates = data.get("candidates", [])

    st.caption(f"{icon} 状态: **{status}**  |  来源: {match_source}")

    if candidates:
        df = pd.DataFrame(candidates)[["index", "code", "matched_name", "unit_price", "source"]]
        df.columns = ["#", "编号", "名称", "单价(B)", "来源"]

        def _highlight(row):
            if row["#"] == chosen_index:
                return ["background-color: #d4edda"] * len(row)
            return [""] * len(row)

        st.dataframe(
            df.style.apply(_highlight, axis=1),
            use_container_width=True,
            hide_index=True,
        )
    else:
        st.info("无候选产品")

    if reason:
        st.markdown(f"**选择理由：** {reason}")

    llm_prompt = data.get("llm_prompt", "")
    if llm_prompt:
        with st.expander("查看 LLM Prompt"):
            st.code(llm_prompt, language="text")


# ── page setup ────────────────────────────────────────────────────────────────
st.set_page_config(page_title="LLM Selector Lab", layout="wide")
st.title("🔬 LLM Selector Lab")

# ── layout: left (knowledge editor) | right (query tabs) ─────────────────────
left_col, right_col = st.columns([1, 2])

with left_col:
    st.subheader("Business Knowledge")

    if "knowledge_text" not in st.session_state:
        st.session_state["knowledge_text"] = fetch_knowledge()

    knowledge_text = st.text_area(
        "内容（可直接编辑，不会写回文件）",
        value=st.session_state["knowledge_text"],
        height=500,
        key="knowledge_editor",
    )

    if st.button("🔄 重置为当前文件"):
        st.session_state["knowledge_text"] = fetch_knowledge()
        st.rerun()

with right_col:
    tab_single, tab_batch = st.tabs(["Single", "Batch"])

    # ── single tab ────────────────────────────────────────────────────────────
    with tab_single:
        s_col1, s_col2 = st.columns([3, 1])
        with s_col1:
            single_query = st.text_input("产品 Query", placeholder="例：pvc水管dn50")
        with s_col2:
            customer_level_s = st.selectbox("客户级别", ["A", "B", "C", "D"], index=1, key="lvl_s")

        if st.button("Run", key="run_single") and single_query.strip():
            with st.spinner("查询中…"):
                result = run_query(single_query.strip(), customer_level_s, knowledge_text)
            render_result(result)

    # ── batch tab ─────────────────────────────────────────────────────────────
    with tab_batch:
        b_col1, b_col2 = st.columns([3, 1])
        with b_col1:
            batch_input = st.text_area(
                f"产品 Query（每行一个，最多 {MAX_BATCH} 个）",
                height=120,
                placeholder="pvc水管dn50\n直通50\n三通DN50",
                key="batch_input",
            )
        with b_col2:
            customer_level_b = st.selectbox("客户级别", ["A", "B", "C", "D"], index=1, key="lvl_b")

        if st.button("Run All", key="run_batch"):
            lines = [l.strip() for l in batch_input.strip().splitlines() if l.strip()]
            if len(lines) > MAX_BATCH:
                st.warning(f"最多 {MAX_BATCH} 条，已截断（忽略后 {len(lines) - MAX_BATCH} 条）")
                lines = lines[:MAX_BATCH]

            if not lines:
                st.info("请输入至少一个 query")
            else:
                results = []
                progress = st.progress(0)
                for i, kw in enumerate(lines):
                    with st.spinner(f"查询 {i+1}/{len(lines)}: {kw}"):
                        results.append((kw, run_query(kw, customer_level_b, knowledge_text)))
                    progress.progress((i + 1) / len(lines))
                progress.empty()

                for kw, data in results:
                    status = data.get("status", "llm_error")
                    icon = STATUS_ICON.get(status, "❓")
                    chosen_index = data.get("chosen_index", 0)
                    chosen = data.get("chosen") or {}
                    reason = (data.get("reason") or "")[:30]
                    chosen_name = (chosen.get("matched_name") or "")[:25]

                    title = (
                        f"{icon} {kw}  →  "
                        + (f"第{chosen_index}条: {chosen_name} | {reason}…" if chosen_index else "无匹配")
                    )
                    with st.expander(title):
                        render_result(data)
```

- [ ] **Step 4: Verify the app starts locally**

```bash
# From selector-lab/ directory:
# First create .streamlit/secrets.toml with:
#   BACKEND_URL = "http://localhost:8000"
cd selector-lab
streamlit run app.py
```

Expected: browser opens, left column shows knowledge editor, tabs show Single/Batch.

- [ ] **Step 5: Commit**

```bash
git add selector-lab/
git commit -m "feat: add selector-lab Streamlit dev tool for LLM selector testing"
```

---

## Task 5: End-to-end smoke test

- [ ] **Step 1: Start the main backend with DEBUG=true**

```bash
# In Agent Team version3/:
DEBUG=true py run_backend.py
```

- [ ] **Step 2: Start selector-lab**

```bash
# In selector-lab/:
streamlit run app.py
```

- [ ] **Step 3: Smoke test Single tab**

Enter `直通50` → click Run.

Expected:
- Candidates table appears with ≥1 row.
- Chosen row highlighted green.
- Reason text shown below.
- "查看 LLM Prompt" expander contains `keywords: 直通50`.

- [ ] **Step 4: Smoke test Batch tab**

Enter:
```
直通50
三通DN50
球阀DN25
```

Click Run All. Expected: 3 expanders appear with ✅/⚠️/❌ prefix and summary titles.

- [ ] **Step 5: Smoke test knowledge override**

Edit the left panel — add the line `直通 = 直接 直通头（测试覆盖）` at the top.

Re-run `直通50` in Single tab. In the LLM Prompt expander, confirm the added line appears in `business_knowledge(mandatory):` section.

- [ ] **Step 6: Run full test suite**

```bash
py -m pytest tests/test_llm_selector_knowledge_override.py tests/test_debug_routes.py -v
```

Expected: 8 PASSED.

- [ ] **Step 7: Final commit**

```bash
git add .
git commit -m "test: end-to-end smoke verified for selector-lab"
git push origin main
```

---

## Streamlit Cloud Deployment

To deploy `selector-lab/` to Streamlit Cloud:

1. Push `selector-lab/` to its own GitHub repo (or point Streamlit Cloud at a subdirectory).
2. Set **Main file path**: `app.py`
3. Under **Secrets**, add:
   ```toml
   BACKEND_URL = "https://your-backend.onrender.com"
   ```
4. Ensure main backend is deployed with `DEBUG=true` in its environment variables.
