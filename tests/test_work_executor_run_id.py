"""
Test run_id fix: when match result has needs_human_choice and pending_choices,
the returned dict contains a valid run_id and pipeline state is stored
(in _work_pipeline_state) so no NameError occurs and resume can use it.
Run from Agent Team version3 root: python -m pytest tests/test_work_executor_run_id.py -v
"""
import asyncio
import sys
from pathlib import Path

_root = Path(__file__).resolve().parent.parent
if str(_root) not in sys.path:
    sys.path.insert(0, str(_root))

import pytest


@pytest.mark.asyncio
async def test_process_files_pipeline_needs_human_choice_returns_run_id_and_stores_state():
    """When precomputed match has needs_human_choice and pending_choices, return has run_id and state is in _work_pipeline_state."""
    from backend.agent import work_executor

    file_paths = ["dummy.xlsx"]
    trace = []
    precomputed = {
        "success": True,
        "needs_human_choice": True,
        "pending_choices": [
            {"item_id": "1", "options": [{"code": "A", "name": "Option A"}]},
        ],
    }

    result = await work_executor._process_files_pipeline(
        file_paths=file_paths,
        start_index=0,
        customer_level="B_QUOTE",
        do_register_oos=False,
        trace=trace,
        on_step=None,
        precomputed_match_result=precomputed,
    )

    assert result.get("status") == "awaiting_choices"
    run_id = result.get("run_id")
    assert run_id is not None, "returned dict must contain run_id"
    assert isinstance(run_id, str) and len(run_id) > 0, "run_id must be non-empty string"
    # run_id is UUID string (no spaces, 36 chars with hyphens)
    assert run_id.replace("-", "").isalnum() and len(run_id) >= 32

    # Pipeline state must be stored so resume can use it (no NameError)
    assert run_id in work_executor._work_pipeline_state
    state = work_executor._work_pipeline_state[run_id]
    assert state.get("file_paths") == file_paths
    assert state.get("match_result") == precomputed
    assert "pending_choices" in result
    assert result["pending_choices"] == precomputed["pending_choices"]

    # Clean up so other tests or resume don't see this run_id
    work_executor._work_pipeline_state.pop(run_id, None)
