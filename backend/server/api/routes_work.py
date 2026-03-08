"""Work 模式 API（报价批量流程：识别表数据 → 查价格与库存 → 填表）。"""
import asyncio
import json
import logging
from typing import Any, Dict

from fastapi import APIRouter, Body, HTTPException
from fastapi.responses import StreamingResponse

logger = logging.getLogger(__name__)
router = APIRouter()

_WORK_ALLOWED_LEVELS = {
    "A", "B", "C", "D", "E",
    "FACTORY_INC_TAX", "FACTORY_EXC_TAX", "PURCHASE_EXC_TAX",
    "A_MARGIN", "A_QUOTE", "B_MARGIN", "B_QUOTE", "C_MARGIN", "C_QUOTE",
    "D_MARGIN", "D_QUOTE", "D_LOW", "E_MARGIN", "E_QUOTE",
}


def _normalize_work_customer_level(raw_value: Any) -> str:
    value = str(raw_value or "").strip().upper() or "B_QUOTE"
    if value not in _WORK_ALLOWED_LEVELS:
        return "B_QUOTE"
    return value


def _work_tool_name_to_stage(tool_name: str) -> int:
    """工具名 → 前端阶段索引：0=识别表数据 1=查价格与库存 2=填表"""
    if tool_name == "work_quotation_extract":
        return 0
    if tool_name in ("work_quotation_match", "work_quotation_shortage_report", "register_oos"):
        return 1
    if tool_name == "work_quotation_fill":
        return 2
    return 1


@router.post("/api/work/run")
async def work_run(body: Dict[str, Any] = Body(...)) -> Dict[str, Any]:
    """
    执行 Work 流程：固定三步（识别表数据→查价格与库存/无货缺货→填表）+ ReAct，仅 Work 工具。
    Body: { "file_paths": string[], "customer_level": "A"|"B"|"C"|"D"?, "do_register_oos": bool? }
    """
    file_paths = body.get("file_paths") or []
    if not isinstance(file_paths, list):
        file_paths = []
    file_paths = [str(p).strip() for p in file_paths if p]
    customer_level = _normalize_work_customer_level(body.get("customer_level"))
    do_register_oos = body.get("do_register_oos", True)
    try:
        from backend.agent.work_executor import run_work_flow
        result = await run_work_flow(
            file_paths=file_paths,
            customer_level=customer_level,
            do_register_oos=do_register_oos,
        )
        out = {
            "status": result.get("status", "done"),
            "success": result.get("success", True),
            "answer": result.get("answer", ""),
            "trace": result.get("trace", []),
            "error": result.get("error"),
        }
        if result.get("pending_quotation_draft") is not None:
            out["pending_quotation_draft"] = result.get("pending_quotation_draft")
        if result.get("status") == "awaiting_choices":
            out["run_id"] = result.get("run_id")
            out["pending_choices"] = result.get("pending_choices", [])
        return out
    except Exception as e:
        logger.exception("work/run 失败")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/api/work/run-stream")
async def work_run_stream(body: Dict[str, Any] = Body(...)) -> StreamingResponse:
    """
    执行 Work 流程并流式返回：先推送当前阶段 stage (0/1/2)，最后推送 result。
    """
    file_paths = body.get("file_paths") or []
    if not isinstance(file_paths, list):
        file_paths = []
    file_paths = [str(p).strip() for p in file_paths if p]
    customer_level = _normalize_work_customer_level(body.get("customer_level"))
    do_register_oos = body.get("do_register_oos", True)

    async def generate():
        queue: asyncio.Queue = asyncio.Queue()

        def on_step(_step_count: int, tool_name: str, _args: dict, _obs: str) -> None:
            stage = _work_tool_name_to_stage(tool_name)
            try:
                queue.put_nowait({"type": "stage", "stage": stage})
            except asyncio.QueueFull:
                pass

        async def run_and_feed() -> None:
            try:
                from backend.agent.work_executor import run_work_flow
                result = await run_work_flow(
                    file_paths=file_paths,
                    customer_level=customer_level,
                    do_register_oos=do_register_oos,
                    on_step=on_step,
                )
                await queue.put({"type": "result", "payload": result})
            except Exception as e:
                logger.exception("work/run-stream 执行失败")
                await queue.put({"type": "result", "payload": {"status": "done", "success": False, "answer": "", "trace": [], "error": str(e)}})

        asyncio.create_task(run_and_feed())

        while True:
            item = await queue.get()
            line = json.dumps(item, ensure_ascii=False) + "\n"
            yield f"data: {line}\n"
            if item.get("type") == "result":
                break

    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


@router.post("/api/work/resume")
async def work_resume(body: Dict[str, Any] = Body(...)) -> Dict[str, Any]:
    """
    人工选择后继续 Work 流程。
    Body: { "run_id": string, "selections": [{ "item_id": string, "selected_code": string }] }
    """
    run_id = body.get("run_id")
    selections = body.get("selections")
    if not run_id or not isinstance(selections, list):
        raise HTTPException(status_code=400, detail="需要 run_id 与 selections")
    try:
        from backend.agent.work_executor import run_work_flow_resume
        result = await run_work_flow_resume(run_id=run_id, selections=selections)
        out = {
            "status": result.get("status", "done"),
            "success": result.get("success", True),
            "answer": result.get("answer", ""),
            "trace": result.get("trace", []),
            "error": result.get("error"),
        }
        if result.get("pending_quotation_draft") is not None:
            out["pending_quotation_draft"] = result.get("pending_quotation_draft")
        if result.get("status") == "awaiting_choices":
            out["run_id"] = result.get("run_id")
            out["pending_choices"] = result.get("pending_choices", [])
        return out
    except Exception as e:
        logger.exception("work/resume 失败")
        raise HTTPException(status_code=500, detail=str(e))
