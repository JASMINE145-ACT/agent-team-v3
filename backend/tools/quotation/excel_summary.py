from __future__ import annotations

"""
Excel 摘要服务：为 Chat / Work 提供可控体量的 Excel 关键信息视图。

设计要点：
- 复用现有报价工具（extract_inquiry_items / parse_excel_smart），不重造轮子；
- 只解析前若干行，生成「items 列表 + meta + 可选预览文本」；
- 结果缓存在进程内，按 file_id 访问，避免多次重复解析同一上传文件。
"""

import hashlib
import json
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

from backend.tools.quotation.quote_tools import (
    extract_inquiry_items,
    parse_excel_smart,
)


ExcelSummary = Dict[str, Any]


@dataclass(frozen=True)
class ExcelSummaryEntry:
  """缓存条目：按 file_id 存储摘要与物理路径。"""

  file_id: str
  file_path: str
  summary: ExcelSummary


_SUMMARY_CACHE: Dict[str, ExcelSummaryEntry] = {}


def _normalize_path(file_path: str) -> Path:
  p = Path(file_path)
  if not p.is_absolute():
    p = Path.cwd() / p
  return p.resolve()


def make_file_id(file_path: str) -> str:
  """
  根据规范化后的绝对路径生成稳定的 file_id。
  - 进程重启后仍稳定（路径不变时 sha1 一致）；
  - 不额外持久化，便于在 upload API 中直接返回。
  """
  norm = str(_normalize_path(file_path)).encode("utf-8", errors="ignore")
  return hashlib.sha1(norm).hexdigest()[:16]


def generate_excel_summary(file_path: str, max_items: int = 100, max_preview_rows: int = 80) -> ExcelSummary:
  """
  基于现有报价工具为 Excel 生成关键信息摘要。

  优先使用 extract_inquiry_items 输出「询价行」列表，再辅以 parse_excel_smart
  生成前若干行的 Markdown 预览文本。
  """
  path = _normalize_path(file_path)

  items_result = extract_inquiry_items(file_path=str(path), sheet_name=None, col_mapping=None)
  items_success = bool(items_result.get("success"))
  items: List[Dict[str, Any]] = list(items_result.get("items") or [])
  rows_count = int(items_result.get("rows_count") or len(items))

  # 预览 items：只保留前 max_items 条，避免注入过大
  preview_items = items[: max_items or 100]
  truncated = rows_count > len(preview_items)

  # 补充一个通用预览文本，供 LLM 需要表结构时参考（裁剪到较小行数）
  preview_text = ""
  preview_error: Optional[str] = None
  try:
    # parse_excel_smart 自身有行数与字符数控制，这里进一步限制 max_rows
    smart = parse_excel_smart(file_path=str(path), sheet_name=None, max_rows=max_preview_rows or 80)
    if smart.get("success"):
      preview_text = str(smart.get("result") or "")
    else:
      preview_error = str(smart.get("error") or "") or None
  except Exception as e:  # pragma: no cover - 守护性兜底
    preview_error = str(e)

  summary: ExcelSummary = {
    "meta": {
      "rows_count": rows_count,
      "preview_count": len(preview_items),
      "truncated": truncated,
      "items_success": items_success,
      "preview_error": preview_error,
      "source": "extract_inquiry_items+parse_excel_smart",
    },
    "items": preview_items,
    # raw 预览文本保留原样，由调用方决定是否注入到 prompt
    "raw_preview_md": preview_text,
    # 若 extract_inquiry_items 返回 error，也记录在 problems 中
    "problems": [items_result.get("error")]
    if items_result.get("error")
    else [],
  }

  return summary


def put_excel_summary(file_path: str, summary: ExcelSummary) -> ExcelSummaryEntry:
  """
  将摘要写入进程内缓存，并返回带 file_id 的条目。
  - 若同一 file_path 重复写入，将覆盖之前的条目。
  """
  norm_path = str(_normalize_path(file_path))
  file_id = make_file_id(norm_path)
  entry = ExcelSummaryEntry(file_id=file_id, file_path=norm_path, summary=summary)
  _SUMMARY_CACHE[file_id] = entry
  return entry


def get_excel_summary_by_id(file_id: str) -> Optional[ExcelSummaryEntry]:
  """按 file_id 读取缓存摘要。"""
  return _SUMMARY_CACHE.get(file_id)


def get_excel_summary_for_context(context: Dict[str, Any]) -> Optional[ExcelSummaryEntry]:
  """
  从 agent 上下文中解析出与 Excel 相关的信息并返回摘要：
  - 优先使用 context.file_id；
  - 若无 file_id 但有 file_path，则尝试按路径生成 file_id 并查找缓存。
  """
  if not context:
    return None
  file_id = (context.get("file_id") or "").strip()
  if isinstance(file_id, str) and file_id:
    entry = _SUMMARY_CACHE.get(file_id)
    if entry:
      return entry
  fp = (context.get("file_path") or "").strip()
  if isinstance(fp, str) and fp:
    derived_id = make_file_id(fp)
    return _SUMMARY_CACHE.get(derived_id)
  return None


def format_excel_summary_for_prompt(entry: ExcelSummaryEntry, max_items: int = 20, max_chars: int = 2000) -> str:
  """
  将摘要格式化为供 LLM 使用的紧凑文本。
  - 只展示前 max_items 条 items；
  - 整体长度控制在 max_chars 以内。
  """
  summary = entry.summary or {}
  meta = summary.get("meta") or {}
  items: List[Dict[str, Any]] = list(summary.get("items") or [])
  preview_items = items[: max_items or 20]

  header = {
    "file_id": entry.file_id,
    "file_path": entry.file_path,
    "rows_count": meta.get("rows_count"),
    "preview_count": len(preview_items),
    "truncated": bool(meta.get("truncated")),
  }

  lines: List[str] = []
  lines.append("[ExcelSummary]")
  lines.append(json.dumps(header, ensure_ascii=False))
  if preview_items:
    lines.append("关键信息条目预览（最多前 N 条，用于报价/缺货分析）：")
    for it in preview_items:
      row = it.get("row")
      name = (it.get("product_name") or it.get("name") or "").strip()
      spec = (it.get("specification") or it.get("spec") or "").strip()
      qty = it.get("qty")
      parts = []
      if row is not None:
        parts.append(f"行 {row}")
      if name:
        parts.append(name)
      if spec:
        parts.append(spec)
      if qty not in (None, 0):
        parts.append(f"数量={qty}")
      if not parts:
        continue
      line = "- " + " | ".join(str(p) for p in parts)
      lines.append(line)
      if sum(len(x) for x in lines) > max_chars:
        break

  text = "\n".join(lines)
  if len(text) > max_chars:
    text = text[: max_chars] + "\n…（Excel 摘要已截断，若需更多行级信息可按需调用 Excel 工具查看原表）"
  return text


__all__ = [
  "ExcelSummary",
  "ExcelSummaryEntry",
  "generate_excel_summary",
  "put_excel_summary",
  "get_excel_summary_by_id",
  "get_excel_summary_for_context",
  "format_excel_summary_for_prompt",
  "make_file_id",
]

