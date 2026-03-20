"""
统一工具层：无货登记封装。
委托 _run_register_oos / persist_out_of_stock_records，统一返回 ToolResult。
"""
from __future__ import annotations

import asyncio
import logging
from pathlib import Path
from typing import Any, Dict, Optional

from backend.tools.base import BaseTool, ToolResult

logger = logging.getLogger(__name__)

DEFAULT_TIMEOUT = 120  # 含 LLM 解析时较长


class OosRegisterTool(BaseTool):
    name = "oos_register"

    async def run(
        self,
        *,
        file_path: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None,
        prompt: Optional[str] = None,
        product_name: Optional[str] = None,
        specification: Optional[str] = None,
        quantity: int = 0,
        unit: Optional[str] = None,
        **kwargs: Any,
    ) -> ToolResult:
        """无货登记：按文件（file_path）或按文字（product_name + specification + quantity + unit）。"""
        context = context or {}
        if file_path:
            return await self._run_from_file(file_path, context, prompt)
        if product_name:
            return await self._run_from_text(
                product_name=product_name,
                specification=specification or "",
                quantity=quantity,
                unit=unit or "",
            )
        return ToolResult(ok=False, error="请提供 file_path 或 product_name", error_code="missing_args")

    async def _run_from_file(
        self,
        file_path: str,
        context: Dict[str, Any],
        prompt: Optional[str],
    ) -> ToolResult:
        file_path = (file_path or "").strip() or (context.get("file_path") or "").strip()
        if not file_path:
            return ToolResult(ok=False, error="无货登记需要 file_path，请先上传报价单。", error_code="missing_file_path")
        if not Path(file_path).exists():
            return ToolResult(ok=False, error=f"文件不存在: {file_path}", error_code="file_not_found")

        try:
            from backend.tools.oos.services.oos_agent_adapter import _run_register_oos

            out = await asyncio.wait_for(
                asyncio.to_thread(_run_register_oos, file_path, context, prompt),
                timeout=DEFAULT_TIMEOUT,
            )
        except asyncio.TimeoutError:
            logger.warning("oos_register from file 超时")
            return ToolResult(ok=False, error="无货登记超时", error_code="timeout")
        except Exception as e:
            logger.exception("oos_register from file 失败")
            return ToolResult(ok=False, error=str(e), error_code="internal_error")

        success = out.get("success", False)
        result = out.get("result", "")
        return ToolResult(ok=success, data=result, error=None if success else result)

    async def _run_from_text(
        self,
        product_name: str,
        specification: str,
        quantity: int,
        unit: str,
    ) -> ToolResult:
        try:
            from backend.tools.oos.services.quotation_agent_tool import persist_out_of_stock_records

            record = {
                "product_name": product_name,
                "specification": specification,
                "unit": unit,
                "quantity": quantity,
            }
            out = await asyncio.wait_for(
                asyncio.to_thread(persist_out_of_stock_records, "用户直接登记", [record], sheet_name=""),
                timeout=30,
            )
        except asyncio.TimeoutError:
            return ToolResult(ok=False, error="无货登记超时", error_code="timeout")
        except Exception as e:
            logger.exception("oos_register from text 失败")
            return ToolResult(ok=False, error=str(e), error_code="internal_error")

        success = out.get("success", False)
        result = out.get("result", "")
        return ToolResult(ok=success, data=result, error=None if success else result)
