"""LLM Selector Lab - Streamlit dev tool for testing match_quotation + llm_select_best."""
import httpx
import pandas as pd
import streamlit as st
from streamlit.errors import StreamlitSecretNotFoundError

# -- config --------------------------------------------------------------------
try:
    _backend_url = st.secrets.get("BACKEND_URL", "http://localhost:8000")
except StreamlitSecretNotFoundError:
    _backend_url = "http://localhost:8000"
BACKEND_URL = str(_backend_url).rstrip("/")
MATCH_URL = f"{BACKEND_URL}/api/debug/match-select"
KNOWLEDGE_URL = f"{BACKEND_URL}/api/debug/knowledge"
MAX_BATCH = 5
STATUS_ICON = {
    "single": "✅",
    "needs_selection": "🔶",
    "unmatched": "⚠️",
    "llm_error": "❌",
}


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
            timeout=120,
        )
        r.raise_for_status()
        return r.json()
    except httpx.ConnectError:
        return {
            "status": "llm_error",
            "keywords": keywords,
            "candidates": [],
            "chosen_index": 0,
            "chosen": None,
            "reason": f"无法连接后端 {BACKEND_URL}（是否已启动且 DEBUG=true？）",
            "llm_prompt": "",
        }
    except Exception as e:
        return {
            "status": "llm_error",
            "keywords": keywords,
            "candidates": [],
            "chosen_index": 0,
            "chosen": None,
            "reason": str(e),
            "llm_prompt": "",
        }


def render_result(data: dict) -> None:
    """Render candidates table + chosen row + reason inside current container."""
    status = data.get("status", "llm_error")
    icon = STATUS_ICON.get(status, "❓")
    chosen_index = data.get("chosen_index", 0)
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


st.set_page_config(page_title="LLM Selector Lab", layout="wide")
st.title("🔬 LLM Selector Lab")

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

    with tab_single:
        s_col1, s_col2 = st.columns([3, 1])
        with s_col1:
            single_query = st.text_input("产品 Query", placeholder="例：pvc水管dn50")
        with s_col2:
            customer_level_s = st.selectbox("客户级别", ["A", "B", "C", "D"], index=1, key="lvl_s")

        if "single_result" not in st.session_state:
            st.session_state["single_result"] = None

        if st.button("Run", key="run_single"):
            if single_query.strip():
                with st.spinner("查询中…"):
                    st.session_state["single_result"] = run_query(
                        single_query.strip(), customer_level_s, knowledge_text
                    )
            else:
                st.info("请输入产品 Query")

        if st.session_state["single_result"]:
            render_result(st.session_state["single_result"])

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

        if "batch_results" not in st.session_state:
            st.session_state["batch_results"] = []

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
                    with st.spinner(f"查询 {i + 1}/{len(lines)}: {kw}"):
                        results.append((kw, run_query(kw, customer_level_b, knowledge_text)))
                    progress.progress((i + 1) / len(lines))
                progress.empty()
                st.session_state["batch_results"] = results

        for kw, data in st.session_state["batch_results"]:
            status = data.get("status", "llm_error")
            icon = STATUS_ICON.get(status, "❓")
            chosen_index = data.get("chosen_index", 0)
            chosen = data.get("chosen") or {}
            reason = (data.get("reason") or "")[:30]
            chosen_name = (chosen.get("matched_name") or "")[:25]

            title = (
                f"{icon} {kw}  →  "
                + (f"第{chosen_index}条: {chosen_name} | {reason}..." if chosen_index else "无匹配")
            )
            with st.expander(title):
                render_result(data)
