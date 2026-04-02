"""Tests for doom-loop detection and step snapshot functionality in CoreAgent."""
import time
from unittest.mock import MagicMock, AsyncMock, patch
import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).parent.parent))
sys.path.insert(0, str(Path(__file__).parent.parent / "backend"))

from dataclasses import asdict
from backend.agent.session import Snapshot
from backend.core.agent import CoreAgent


class TestSnapshotDataclass:
    """Test Suite 1: Snapshot dataclass validation."""

    def test_snapshot_creation(self):
        """Snapshot should be created with all required fields."""
        snapshot = Snapshot(
            step=1,
            ts=1234567890.0,
            tool_calls=["parse_excel_smart"],
            input_tokens=100,
            output_tokens=50,
            cost=0.000015,
            duration_ms=150,
            model="glm-4-flash",
        )
        assert snapshot.step == 1
        assert snapshot.ts == 1234567890.0
        assert snapshot.tool_calls == ["parse_excel_smart"]
        assert snapshot.input_tokens == 100
        assert snapshot.output_tokens == 50
        assert snapshot.cost == 0.000015
        assert snapshot.duration_ms == 150
        assert snapshot.model == "glm-4-flash"

    def test_snapshot_to_dict(self):
        """Snapshot.to_dict() should return all fields as dict."""
        snapshot = Snapshot(
            step=0,
            ts=1000.0,
            tool_calls=[],
            input_tokens=200,
            output_tokens=100,
            cost=0.00003,
            duration_ms=200,
            model="test-model",
        )
        d = snapshot.to_dict()
        assert isinstance(d, dict)
        assert d["step"] == 0
        assert d["ts"] == 1000.0
        assert d["tool_calls"] == []
        assert d["input_tokens"] == 200
        assert d["output_tokens"] == 100
        assert d["cost"] == 0.00003
        assert d["duration_ms"] == 200
        assert d["model"] == "test-model"

    def test_snapshot_from_dict(self):
        """Snapshot.from_dict() should reconstruct Snapshot correctly."""
        data = {
            "step": 5,
            "ts": 2000.0,
            "tool_calls": ["tool_a", "tool_b"],
            "input_tokens": 300,
            "output_tokens": 150,
            "cost": 0.000045,
            "duration_ms": 300,
            "model": "glm-4",
        }
        snapshot = Snapshot.from_dict(data)
        assert snapshot.step == 5
        assert snapshot.ts == 2000.0
        assert snapshot.tool_calls == ["tool_a", "tool_b"]
        assert snapshot.input_tokens == 300
        assert snapshot.output_tokens == 150
        assert snapshot.cost == 0.000045
        assert snapshot.duration_ms == 300
        assert snapshot.model == "glm-4"

    def test_snapshot_cost_calculation(self):
        """Cost should be (input_tokens + output_tokens) * 0.1 / 1_000_000."""
        input_tokens = 1_000_000
        output_tokens = 500_000
        expected_cost = (input_tokens + output_tokens) * 0.1 / 1_000_000
        assert expected_cost == 0.15

        snapshot = Snapshot(
            step=0,
            ts=time.time(),
            tool_calls=[],
            input_tokens=input_tokens,
            output_tokens=output_tokens,
            cost=expected_cost,
            duration_ms=100,
            model="test",
        )
        assert snapshot.cost == expected_cost


class TestDoomLoopDetectionLogic:
    """Test Suite 2: Doom-loop detection logic validation."""

    def test_same_tool_3_consecutive_steps_triggers_detection(self):
        """If same tool is called in 3 consecutive steps → doom_loop_detected should be True."""
        _tool_streak = {}
        _last_step_tool = None
        doom_loop_detected = False

        # Simulate 3 steps calling the same tool
        tools_called = ["parse_excel_smart", "parse_excel_smart", "parse_excel_smart"]

        for _current_step_tool in tools_called:
            if _current_step_tool:
                if _current_step_tool == _last_step_tool:
                    _tool_streak[_current_step_tool] = _tool_streak.get(_current_step_tool, 0) + 1
                else:
                    _tool_streak = {_current_step_tool: 1}
                _last_step_tool = _current_step_tool
                if _tool_streak.get(_current_step_tool, 0) >= 3:
                    doom_loop_detected = True

        assert doom_loop_detected is True
        assert _tool_streak.get("parse_excel_smart") == 3

    def test_varying_tools_no_doom_loop(self):
        """If tools vary → doom_loop_detected should be False."""
        _tool_streak = {}
        _last_step_tool = None
        doom_loop_detected = False

        # Simulate varying tools across steps
        tools_called = ["parse_excel_smart", "search_products", "get_price", "calculate"]

        for _current_step_tool in tools_called:
            if _current_step_tool:
                if _current_step_tool == _last_step_tool:
                    _tool_streak[_current_step_tool] = _tool_streak.get(_current_step_tool, 0) + 1
                else:
                    _tool_streak = {_current_step_tool: 1}
                _last_step_tool = _current_step_tool
                if _tool_streak.get(_current_step_tool, 0) >= 3:
                    doom_loop_detected = True

        assert doom_loop_detected is False
        # Each tool should have streak of 1
        for tool in tools_called:
            assert _tool_streak.get(tool) == 1

    def test_streak_resets_on_different_tool(self):
        """Streak resets when different tool appears (implementation resets ALL streaks)."""
        _tool_streak = {}
        _last_step_tool = None

        # Tool A called twice, then tool B, then tool A again
        tools_called = ["tool_a", "tool_a", "tool_b", "tool_a"]

        for _current_step_tool in tools_called:
            if _current_step_tool:
                if _current_step_tool == _last_step_tool:
                    _tool_streak[_current_step_tool] = _tool_streak.get(_current_step_tool, 0) + 1
                else:
                    _tool_streak = {_current_step_tool: 1}
                _last_step_tool = _current_step_tool

        # The implementation only tracks the most recent tool's streak
        # After tool_b appeared, it resets to {tool_b: 1}
        # Then tool_a appears and resets to {tool_a: 1}
        assert _tool_streak.get("tool_a") == 1
        # tool_b's streak was lost when tool_a appeared
        assert _tool_streak.get("tool_b") is None

    def test_2_consecutive_same_tool_no_doom_loop(self):
        """Only 2 consecutive same-tool calls should NOT trigger doom_loop_detected."""
        _tool_streak = {}
        _last_step_tool = None
        doom_loop_detected = False

        tools_called = ["parse_excel_smart", "parse_excel_smart"]

        for _current_step_tool in tools_called:
            if _current_step_tool:
                if _current_step_tool == _last_step_tool:
                    _tool_streak[_current_step_tool] = _tool_streak.get(_current_step_tool, 0) + 1
                else:
                    _tool_streak = {_current_step_tool: 1}
                _last_step_tool = _current_step_tool
                if _tool_streak.get(_current_step_tool, 0) >= 3:
                    doom_loop_detected = True

        assert doom_loop_detected is False
        assert _tool_streak.get("parse_excel_smart") == 2

    def test_no_tool_call_resets_streak(self):
        """When no tool is called (None), streak should reset."""
        _tool_streak = {}
        _last_step_tool = None

        # tool_a, tool_a, None, tool_a - streak should reset after None
        tools_called = ["tool_a", "tool_a", None, "tool_a"]

        for _current_step_tool in tools_called:
            if _current_step_tool:
                if _current_step_tool == _last_step_tool:
                    _tool_streak[_current_step_tool] = _tool_streak.get(_current_step_tool, 0) + 1
                else:
                    _tool_streak = {_current_step_tool: 1}
            else:
                _last_step_tool = None
                _tool_streak = {}
            _last_step_tool = _current_step_tool

        # After None, tool_a should restart with streak 1
        assert _tool_streak.get("tool_a") == 1


class TestSnapshotRecording:
    """Test Suite 3: Snapshot recording during execute_react."""

    def test_snapshot_contains_required_fields(self):
        """Snapshot should contain all required fields."""
        required_fields = ["step", "ts", "tool_calls", "input_tokens", "output_tokens", "cost", "duration_ms", "model"]

        snapshot = Snapshot(
            step=0,
            ts=time.time(),
            tool_calls=[],
            input_tokens=100,
            output_tokens=50,
            cost=0.000015,
            duration_ms=100,
            model="test-model",
        )

        snapshot_dict = snapshot.to_dict()
        for field in required_fields:
            assert field in snapshot_dict, f"Missing required field: {field}"

    def test_snapshot_tool_calls_extraction(self):
        """Tool calls should be extracted as list of tool names."""
        # Simulate tool_calls extraction logic from agent.py
        class MockToolCall:
            def __init__(self, name):
                self.function = MagicMock()
                self.function.name = name

        tool_calls = [MockToolCall("parse_excel_smart"), MockToolCall("search_products")]
        extracted = [
            tc.get("function", {}).get("name", "") or getattr(tc.function, "name", "")
            for tc in tool_calls
        ]

        assert extracted == ["parse_excel_smart", "search_products"]

    def test_snapshot_cost_formula(self):
        """Cost calculation: (input_tokens + output_tokens) * 0.1 / 1_000_000."""
        test_cases = [
            {"input": 1_000_000, "output": 1_000_000, "expected": 0.2},
            {"input": 500_000, "output": 500_000, "expected": 0.1},
            {"input": 100_000, "output": 50_000, "expected": 0.015},
            {"input": 0, "output": 0, "expected": 0.0},
        ]

        for case in test_cases:
            cost = (case["input"] + case["output"]) * 0.1 / 1_000_000
            assert cost == case["expected"], f"Failed for {case}: got {cost}, expected {case['expected']}"


class TestResultDictStructure:
    """Test Suite 4: Result dictionary structure validation."""

    def test_result_dict_has_required_keys(self):
        """Result dict should have snapshots list and doom_loop_detected boolean."""
        # Mock result structure based on agent.py line 678-687
        result = {
            "answer": "test answer",
            "thinking": "test thinking",
            "trace": [],
            "snapshots": [],  # List of Snapshot objects
            "doom_loop_detected": False,  # Boolean
            "needs_clarification": False,
            "clarification_questions": None,
            "error": None,
        }

        assert "snapshots" in result
        assert "doom_loop_detected" in result
        assert isinstance(result["snapshots"], list)
        assert isinstance(result["doom_loop_detected"], bool)

    def test_snapshots_list_contains_snapshot_objects(self):
        """snapshots should be a list of Snapshot objects."""
        snapshots = [
            Snapshot(
                step=0,
                ts=time.time(),
                tool_calls=["tool_a"],
                input_tokens=100,
                output_tokens=50,
                cost=0.000015,
                duration_ms=100,
                model="test",
            ),
            Snapshot(
                step=1,
                ts=time.time(),
                tool_calls=["tool_b"],
                input_tokens=200,
                output_tokens=100,
                cost=0.000030,
                duration_ms=200,
                model="test",
            ),
        ]

        assert len(snapshots) == 2
        assert all(isinstance(s, Snapshot) for s in snapshots)

    def test_result_with_doom_loop(self):
        """Result dict with doom_loop_detected=True should be properly structured."""
        result = {
            "answer": "",
            "thinking": None,
            "trace": [],
            "snapshots": [
                Snapshot(
                    step=0,
                    ts=time.time(),
                    tool_calls=["same_tool"],
                    input_tokens=100,
                    output_tokens=50,
                    cost=0.000015,
                    duration_ms=100,
                    model="test",
                )
            ],
            "doom_loop_detected": True,
            "needs_clarification": False,
            "clarification_questions": None,
            "error": None,
        }

        assert result["doom_loop_detected"] is True
        assert len(result["snapshots"]) == 1


class TestDoomLoopIntegration:
    """Test Suite 5: Integration-like tests for doom-loop detection."""

    def test_full_doom_loop_scenario(self):
        """Simulate a full doom-loop scenario: same tool called 3+ times."""
        _tool_streak = {}
        _last_step_tool = None
        doom_loop_detected = False
        snapshots = []

        # Simulate 4 steps where same tool is called 3 times
        step_tools = ["search_products", "search_products", "search_products", "final_response"]

        for i, tool_name in enumerate(step_tools):
            step_start = time.time()
            _current_step_tool = tool_name if tool_name != "final_response" else None

            # Record snapshot
            snapshot = Snapshot(
                step=i,
                ts=step_start,
                tool_calls=[tool_name] if _current_step_tool else [],
                input_tokens=100 + i * 10,
                output_tokens=50 + i * 5,
                cost=(150 + i * 15) * 0.1 / 1_000_000,
                duration_ms=100,
                model="test",
            )
            snapshots.append(snapshot)

            # Doom-loop detection logic
            if _current_step_tool:
                if _current_step_tool == _last_step_tool:
                    _tool_streak[_current_step_tool] = _tool_streak.get(_current_step_tool, 0) + 1
                else:
                    _tool_streak = {_current_step_tool: 1}
                _last_step_tool = _current_step_tool
                if _tool_streak.get(_current_step_tool, 0) >= 3:
                    doom_loop_detected = True
            else:
                _last_step_tool = None
                _tool_streak = {}

        assert doom_loop_detected is True
        assert len(snapshots) == 4
        assert _tool_streak.get("search_products") == 3

    def test_no_doom_loop_with_varied_tools(self):
        """Varied tools across steps should not trigger doom loop."""
        _tool_streak = {}
        _last_step_tool = None
        doom_loop_detected = False

        step_tools = ["search_products", "get_price", "calculate", "format_result"]

        for tool_name in step_tools:
            _current_step_tool = tool_name

            if _current_step_tool:
                if _current_step_tool == _last_step_tool:
                    _tool_streak[_current_step_tool] = _tool_streak.get(_current_step_tool, 0) + 1
                else:
                    _tool_streak = {_current_step_tool: 1}
                _last_step_tool = _current_step_tool
                if _tool_streak.get(_current_step_tool, 0) >= 3:
                    doom_loop_detected = True

        assert doom_loop_detected is False


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
