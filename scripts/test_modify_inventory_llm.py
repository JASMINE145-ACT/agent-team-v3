# -*- coding: utf-8 -*-
"""
通过 LLM 驱动库存 Agent 调用 modify_inventory，将指定物料的用户仓数量与可售数量改为 50。
约束：
  1. 必须走 LLM（run_inventory_agent，与库存 Chat 一致，使用同一套工具含 modify_inventory）
  2. 仅允许修改物料 8030020580，不允许任何影响其他数据或整库的操作
  3. 测试时强制不开启真实写库（INVENTORY_MODIFY_ENABLED 不设），仅占位返回
  4. 有错误或非法工具调用立即退出，不做额外修改

运行：在「Agent Team version3」目录下执行：
  占位模式（不写库）：PYTHONPATH=. python scripts/test_modify_inventory_llm.py
  真实写库模式：      TEST_MODIFY_INVENTORY_LIVE=1 INVENTORY_MODIFY_ENABLED=1 PYTHONPATH=. python scripts/test_modify_inventory_llm.py
若遇 429（LLM 限流）可稍后重试。
"""
from __future__ import annotations

import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

# 优先加载项目根 .env（含 ZHIPU_API_KEY、LLM_MODEL=glm-4.5-air），避免用到 backend/tools/oos/.env 导致 429/1113
_env_root = ROOT.parent / ".env"
if _env_root.exists():
    try:
        from dotenv import load_dotenv
        load_dotenv(_env_root)
    except ImportError:
        pass

TARGET_CODE = "8030020580"
TARGET_QUANTITY = 50
USER_PROMPT = (
    f"把物料 {TARGET_CODE} 的用户仓数量（Qty User Warehouse）和可售数量（Available to sell）都改为 {TARGET_QUANTITY}。"
    "只改这一条物料，不要动其他数据。"
)

ALLOWED_READ_ONLY_TOOLS = frozenset({
    "get_inventory_by_code",
    "search_inventory",
    "match_quotation",
    "match_by_quotation_history",
    "match_wanding_price",
    "select_wanding_match",
})


def _abort(msg: str, code: int = 1) -> None:
    print(msg, file=sys.stderr)
    sys.exit(code)


def _check_tool_call(name: str, args: dict) -> None:
    """校验单条 tool_call：只允许针对 TARGET_CODE 的 get_inventory_by_code 或 modify_inventory(supplement, 50)。"""
    if name in ALLOWED_READ_ONLY_TOOLS:
        if name == "get_inventory_by_code":
            code = (args.get("code") or "").strip()
            if code and code != TARGET_CODE:
                _abort(f"[安全] 仅允许查询目标物料 {TARGET_CODE}，禁止 get_inventory_by_code(code={code!r})。")
        return

    if name == "modify_inventory":
        code = (args.get("code") or "").strip()
        action = (args.get("action") or "").strip().lower()
        try:
            qty = float(args.get("quantity") or 0)
        except (TypeError, ValueError):
            qty = 0
        if code != TARGET_CODE:
            _abort(f"[安全] 仅允许修改目标物料 {TARGET_CODE}，禁止 modify_inventory(code={code!r})。")
        if action != "supplement":
            _abort(f"[安全] 本测试仅允许 action=supplement 将数量改为 {TARGET_QUANTITY}，禁止 action={action!r}。")
        if qty != TARGET_QUANTITY:
            _abort(f"[安全] 本测试仅允许 quantity={TARGET_QUANTITY}，禁止 quantity={qty}。")
        return

    _abort(f"[安全] 不允许的工具调用: {name!r}，本测试仅允许 get_inventory_by_code / modify_inventory（且仅针对物料 {TARGET_CODE}）。")


def main() -> int:
    live = os.environ.get("TEST_MODIFY_INVENTORY_LIVE", "").strip() in ("1", "true", "yes")
    if live:
        os.environ["INVENTORY_MODIFY_ENABLED"] = "1"
        print("=" * 60)
        print("【真实写库模式】将向 ACCURATE 发起 bulk-save 请求，仅改物料 8030020580。")
        print("=" * 60)
    else:
        print("=" * 60)
        print("测试：通过 LLM 修改库存（单条 8030020580 -> 50/50）")
        print("=" * 60)
        print("约束：走 LLM、仅改该物料、不真实写库；违规即停。")
        print()
        # 安全：非 live 时禁止真实写库
        os.environ.pop("INVENTORY_MODIFY_ENABLED", None)

    try:
        from backend.tools.inventory.services.agent_runner import run_inventory_agent
    except ImportError as e:
        _abort(f"导入失败，请从项目根目录运行并确保 PYTHONPATH 含项目根: {e}")

    if not live:
        os.environ.pop("INVENTORY_MODIFY_ENABLED", None)

    try:
        result = run_inventory_agent(USER_PROMPT, max_steps=8)
    except Exception as e:
        _abort(f"run_inventory_agent 异常，已停止: {e}")

    if result.get("error"):
        _abort(f"Agent 返回错误: {result['error']}")

    # agent_runner 返回 trace = tracer.to_dict()，steps 中 type 为 thinking | tool_call | observation | answer，tool_call 的 content 为 {"name", "arguments"}
    trace = result.get("trace") or {}
    steps = trace.get("steps") or []
    modify_calls = []
    for s in steps:
        if s.get("type") != "tool_call":
            continue
        content = s.get("content") or {}
        if not isinstance(content, dict):
            continue
        name = (content.get("name") or "").strip()
        args = content.get("arguments") or {}
        _check_tool_call(name, args)
        if name == "modify_inventory":
            modify_calls.append(args)

    if not modify_calls:
        _abort(
            "未检测到 modify_inventory 调用。"
            "请确认 LLM 在收到「改为 50」后应调用 modify_inventory(code=8030020580, action=supplement, quantity=50)。"
        )

    code_ok = all((c.get("code") or "").strip() == TARGET_CODE for c in modify_calls)
    action_ok = all((c.get("action") or "").strip().lower() == "supplement" for c in modify_calls)
    qty_ok = all(float(c.get("quantity") or 0) == TARGET_QUANTITY for c in modify_calls)
    if not (code_ok and action_ok and qty_ok):
        _abort(
            f"modify_inventory 参数不符合要求：需 code={TARGET_CODE}, action=supplement, quantity={TARGET_QUANTITY}。"
            f"实际: {modify_calls}"
        )

    print("OK: LLM 已按预期调用 modify_inventory(code=8030020580, action=supplement, quantity=50)。")
    if live:
        print("（已开启 INVENTORY_MODIFY_ENABLED，已向 ACCURATE 发起真实写请求。）")
    else:
        print("（测试未开启 INVENTORY_MODIFY_ENABLED，未向 ACCURATE 发起真实写请求。）")
    print()
    print("Agent 最终回答摘要:", (result.get("answer") or "")[:300])
    return 0


if __name__ == "__main__":
    sys.exit(main())
