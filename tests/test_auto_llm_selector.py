#!/usr/bin/env python3
"""测试：自动 LLM 选型 + Rework 机制"""
import sys
import os
sys.path.insert(0, r"D:\Projects\agent-jk\Agent Team version3")
sys.path.insert(0, r"D:\Projects\agent-jk\Agent Team version3\backend")

# ─────────────────────────────────────────────────────────────
# 测试 1：多候选时自动调用 llm_select_best（有把握）
# ─────────────────────────────────────────────────────────────
print("=" * 70)
print("测试 1：多候选时自动调用 llm_select_best")
print("=" * 70)

from unittest.mock import patch
from backend.tools.inventory.services.inventory_agent_tools import _execute_match_quotation

with patch("backend.tools.inventory.services.llm_selector.llm_select_best") as mock_llm:
    mock_llm.return_value = {"code": "CODE001", "matched_name": "直接 DN50 PVC-U", "unit_price": 12.5}
    result = _execute_match_quotation({"keywords": "直接50", "customer_level": "B"})
    assert mock_llm.call_count == 1, f"预期调用1次，实际{mock_llm.call_count}"
    assert "single" in result.get("result", "")
    print("  PASS")

# ─────────────────────────────────────────────────────────────
# 测试 2：LLM 无把握 → needs_human_choice
# ─────────────────────────────────────────────────────────────
print("\n" + "=" * 70)
print("测试 2：LLM 无把握时返回 needs_human_choice")
print("=" * 70)

with patch("backend.tools.inventory.services.llm_selector.llm_select_best") as mock_llm:
    mock_llm.return_value = {"_suggestions": True, "options": [
        {"code": "C1", "matched_name": "PPR", "unit_price": 12.5, "reasoning": ""},
        {"code": "C2", "matched_name": "PVC-U", "unit_price": 10.0, "reasoning": ""},
    ]}
    result = _execute_match_quotation({"keywords": "直接50", "customer_level": "B"})
    assert "needs_human_choice" in result.get("result", "")
    print("  PASS")

# ─────────────────────────────────────────────────────────────
# 测试 3：LLM 无匹配 → unmatched
# ─────────────────────────────────────────────────────────────
print("\n" + "=" * 70)
print("测试 3：LLM 判定无匹配时返回 unmatched")
print("=" * 70)

with patch("backend.tools.inventory.services.llm_selector.llm_select_best") as mock_llm:
    mock_llm.return_value = None
    result = _execute_match_quotation({"keywords": "不存在", "customer_level": "B"})
    assert "unmatched" in result.get("result", "")
    print("  PASS")

# ─────────────────────────────────────────────────────────────
# 测试 4：Session.pending_human_choice 存取
# ─────────────────────────────────────────────────────────────
print("\n" + "=" * 70)
print("测试 4：Session.pending_human_choice 存取")
print("=" * 70)

from backend.agent.session import SessionStore

store = SessionStore()
sid = "test-rework-sid"
store.clear_pending_human_choice(sid)

pending = {"keywords": "直接50", "options": [{"code": "C1", "matched_name": "PPR", "source": "共同"}]}
store.set_pending_human_choice(sid, pending)
loaded = store.load(sid)
assert loaded.pending_human_choice is not None
assert loaded.pending_human_choice["keywords"] == "直接50"
print("  PASS: set/get 正确")

store.clear_pending_human_choice(sid)
loaded2 = store.load(sid)
assert loaded2.pending_human_choice is None
print("  PASS: clear 正确")

# ─────────────────────────────────────────────────────────────
# 测试 5：rework 关键词检测
# ─────────────────────────────────────────────────────────────
print("\n" + "=" * 70)
print("测试 5：rework 关键词检测")
print("=" * 70)

from backend.core.agent import _detect_rework_intent

cases = [
    ("错了", True), ("不对", True), ("不是这个", True),
    ("重新选", True), ("换一个", True), ("不对，是", True),
    ("价格是多少", False), ("查询库存", False),
]
for msg, expected in cases:
    result = _detect_rework_intent(msg)
    status = "PASS" if result == expected else "FAIL"
    print(f"  {status}: '{msg}' → {result}")
    assert result == expected
print("  全部 PASS")

# ─────────────────────────────────────────────────────────────
# 测试 6：record_correction_to_knowledge
# ─────────────────────────────────────────────────────────────
print("\n" + "=" * 70)
print("测试 6：record_correction_to_knowledge 追加知识库")
print("=" * 70)

import tempfile
from pathlib import Path
from unittest.mock import patch as mock_patch

with tempfile.NamedTemporaryFile(mode="w", suffix=".md", delete=False, encoding="utf-8") as f:
    temp_path = f.name
    f.write("原始内容\n")

try:
    from backend.agent import remember as remember_module
    orig_fn = remember_module._get_knowledge_path

    def fake_path():
        return Path(temp_path)

    remember_module._get_knowledge_path = fake_path

    from backend.agent.remember import record_correction_to_knowledge
    result = record_correction_to_knowledge(
        keywords="直接50",
        confirmed_code="CODE001",
        confirmed_name="直接 DN50 PVC-U 排水管件",
        reasoning="用户指出是排水用直通管件",
    )
    content = Path(temp_path).read_text(encoding="utf-8")
    assert "## 用户纠正案例" in content, f"内容: {content[:200]}"
    assert "CODE001" in content
    assert "直接50" in content
    print(f"  返回: {result}")
    print("  PASS")
finally:
    remember_module._get_knowledge_path = orig_fn
    os.unlink(temp_path)

# ─────────────────────────────────────────────────────────────
# 测试 7：_load_relevant_corrections few-shot
# ─────────────────────────────────────────────────────────────
print("\n" + "=" * 70)
print("测试 7：_load_relevant_corrections few-shot")
print("=" * 70)

from backend.tools.inventory.services.llm_selector import _load_relevant_corrections, invalidate_business_knowledge_cache
import backend.tools.inventory.config as inv_cfg

with tempfile.NamedTemporaryFile(mode="w", suffix=".md", delete=False, encoding="utf-8") as f:
    content = (
        "## 业务知识\n规则\n\n"
        "## 用户纠正案例\n"
        "- 询价：「直接50」\n  → 正确选择：[CODE001] 直接DN50 PVC-U\n  原因：排水用\n  时间：2026-03-27 10:00\n\n"
        "- 询价：「三通25」\n  → 正确选择：[CODE002] 等径三通 dn25\n  原因：等径优先\n  时间：2026-03-27 11:00\n"
    )
    f.write(content)
    temp_path2 = f.name

orig_path = inv_cfg.WANDING_BUSINESS_KNOWLEDGE_PATH
try:
    inv_cfg.WANDING_BUSINESS_KNOWLEDGE_PATH = temp_path2
    invalidate_business_knowledge_cache()

    r1 = _load_relevant_corrections("直接50", max_examples=2)
    assert "CODE001" in r1 and "直接50" in r1
    print("  PASS: 相似案例读取正确")

    r2 = _load_relevant_corrections("完全不相关", max_examples=2)
    assert r2 == "", f"应返回空，实际: {r2}"
    print("  PASS: 无相关时返回空")
finally:
    inv_cfg.WANDING_BUSINESS_KNOWLEDGE_PATH = orig_path
    os.unlink(temp_path2)

print("\n" + "=" * 70)
print("全部测试完成 — PASS")
print("=" * 70)
