"""
Pre-commit Trellis check.

Checks whether .trellis journal has been updated when backend/tests code is staged.
Exit 0 = OK (or nothing code-like staged).
Exit 1 = code staged but journal NOT touched → print warning and block.
Exit 2 = soft warning only (non-blocking, informational).

Usage (called by pre-commit hook):
  python scripts/check_trellis.py

Options:
  --warn-only   Print warning but exit 0 (non-blocking mode).
"""
from __future__ import annotations

import subprocess
import sys
from pathlib import Path

# ── tunables ──────────────────────────────────────────────────────────────────
# Globs (relative to repo root) that count as "code changes"
_CODE_PATTERNS: tuple[str, ...] = (
    "backend/",
    "tests/",
    "scripts/",
    "config.py",
)

# Paths whose modification means "trellis was updated this commit"
_TRELLIS_PATTERNS: tuple[str, ...] = (
    ".trellis/workspace/",
)

# Maximum age (commits) to look back for a trellis update.
# If the last N commits all lack a trellis touch, still warn.
_LOOKBACK_COMMITS = 3

WARN_ONLY = "--warn-only" in sys.argv
# ──────────────────────────────────────────────────────────────────────────────


def _run(cmd: list[str]) -> list[str]:
    result = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8")
    return [ln for ln in result.stdout.splitlines() if ln.strip()]


def staged_files() -> list[str]:
    """Files staged for this commit (added / modified / renamed)."""
    return _run(["git", "diff", "--cached", "--name-only"])


def has_trellis_in_staged(files: list[str]) -> bool:
    return any(any(f.startswith(p) for p in _TRELLIS_PATTERNS) for f in files)


def has_code_in_staged(files: list[str]) -> bool:
    return any(any(f.startswith(p) for p in _CODE_PATTERNS) for f in files)


def trellis_touched_recently() -> bool:
    """Check last N commits for any trellis file change."""
    recent = _run(["git", "log", f"--max-count={_LOOKBACK_COMMITS}", "--name-only", "--format="])
    return any(any(f.startswith(p) for p in _TRELLIS_PATTERNS) for f in recent)


def main() -> int:
    staged = staged_files()
    if not staged:
        return 0

    code_staged = has_code_in_staged(staged)
    if not code_staged:
        return 0  # only non-code files (e.g. docs, assets) — skip check

    trellis_in_this_commit = has_trellis_in_staged(staged)
    trellis_in_recent = trellis_touched_recently()

    if trellis_in_this_commit:
        print("[trellis-check] OK — trellis updated in this commit.")
        return 0

    staged_code = [f for f in staged if any(f.startswith(p) for p in _CODE_PATTERNS)]
    SEP = "=" * 64
    print()
    print(f"[trellis-check] {SEP}")
    print("[trellis-check] WARN: code staged but trellis journal NOT updated")
    print(f"[trellis-check] {SEP}")
    print("[trellis-check] Code files in this commit:")
    for f in staged_code[:8]:
        print(f"[trellis-check]   - {f}")
    if len(staged_code) > 8:
        print(f"[trellis-check]   ... and {len(staged_code)-8} more")
    print(f"[trellis-check] {SEP}")
    if trellis_in_recent:
        print("[trellis-check] Trellis was updated in a recent commit — OK.")
        print("[trellis-check] If this session is complete, update the journal.")
        print(f"[trellis-check] {SEP}")
        print()
        return 0  # soft warn — don't block if recent
    else:
        print("[trellis-check] No trellis update in this or the last 3 commits.")
        print("[trellis-check] Action: update .trellis/workspace/cursor-agent/journal-N.md")
        print("[trellis-check] To skip: git commit --no-verify")
        print(f"[trellis-check] {SEP}")
        print()
        if WARN_ONLY:
            return 0
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
