"""Work 模式 API（报价批量流程：识别表数据 → 查价格与库存 → 填表）。"""
import asyncio
import json
import logging
import uuid
from typing import Any, Dict

from fastapi import APIRouter, Body, HTTPException, Query
from fastapi.responses import JSONResponse, StreamingResponse

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
    
    注意：此接口为非流式接口,会等待整个流程完成后返回。
    推荐使用 /api/work/run-stream 获取实时进度反馈。
    """
    file_paths = body.get("file_paths") or []
    if not isinstance(file_paths, list):
        file_paths = []
    file_paths = [str(p).strip() for p in file_paths if p]
    customer_level = _normalize_work_customer_level(body.get("customer_level"))
    do_register_oos = body.get("do_register_oos", True)
    work_run_id = str(uuid.uuid4())
    try:
        from backend.agent.work_executor import run_work_flow
        from backend.server.services.activity_log import log_activity
        
        # 记录开始活动 - 这个会立即返回，前端可以通过轮询活动日志知道请求已被接收
        log_activity(
            kind="work_run",
            action="received",
            entity_type="work",
            entity_id=",".join(file_paths) if file_paths else None,
            run_id=work_run_id,
            summary="已收到报价需求，正在进行 AI 报价",
            details={
                "file_paths": file_paths,
                "customer_level": customer_level,
                "do_register_oos": bool(do_register_oos),
            },
        )
        
        log_activity(
            kind="work_run",
            action="start",
            entity_type="work",
            entity_id=",".join(file_paths) if file_paths else None,
            run_id=work_run_id,
            summary="开始执行 Work 报价流程",
            details={
                "file_paths": file_paths,
                "customer_level": customer_level,
                "do_register_oos": bool(do_register_oos),
            },
        )

        result = await run_work_flow(
            file_paths=file_paths,
            customer_level=customer_level,
            do_register_oos=do_register_oos,
            work_run_id=work_run_id,
        )
        data = {
            "status": result.get("status", "done"),
            "success": result.get("success", True),
            "answer": result.get("answer", ""),
            "trace": result.get("trace", []),
            "error": result.get("error"),
        }
        data["work_run_id"] = work_run_id
        if result.get("pending_quotation_draft") is not None:
            data["pending_quotation_draft"] = result.get("pending_quotation_draft")
        if result.get("status") == "awaiting_choices":
            data["run_id"] = result.get("run_id")
            data["pending_choices"] = result.get("pending_choices", [])
        # 记录成功/失败活动
        from backend.server.services.activity_log import log_activity as _log_activity  # 局部别名避免上面导入覆盖
        status = "success" if data.get("success") else "error"
        _log_activity(
            kind="work_run",
            action="finish" if status == "success" else "error",
            entity_type="work",
            entity_id=",".join(file_paths) if file_paths else None,
            run_id=work_run_id,
            summary="Work 报价流程完成" if status == "success" else "Work 报价流程失败",
            details={
                "status": data.get("status"),
                "success": data.get("success"),
                "error": data.get("error"),
            },
        )
        return {"success": True, "data": data}
    except Exception as e:
        logger.exception("work/run 失败")
        return {"success": False, "error": str(e)}


@router.post("/api/work/run-stream")
async def work_run_stream(body: Dict[str, Any] = Body(...)) -> StreamingResponse:
    """
    执行 Work 流程并流式返回：
    1. 首先推送确认消息 (type: "confirmation")
    2. 推送当前阶段 stage (type: "stage", stage: 0/1/2)
    3. 最后推送结果 (type: "result")
    """
    file_paths = body.get("file_paths") or []
    if not isinstance(file_paths, list):
        file_paths = []
    file_paths = [str(p).strip() for p in file_paths if p]
    customer_level = _normalize_work_customer_level(body.get("customer_level"))
    do_register_oos = body.get("do_register_oos", True)
    work_run_id = str(uuid.uuid4())

    async def generate():
        queue: asyncio.Queue = asyncio.Queue()

        # 立即推送确认消息
        confirmation_msg = {
            "type": "confirmation",
            "message": "已收到您的报价需求，正在进行 AI 报价...",
            "work_run_id": work_run_id,
            "file_count": len(file_paths),
            "customer_level": customer_level
        }
        yield f"data: {json.dumps(confirmation_msg, ensure_ascii=False)}\n\n"

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
                    work_run_id=work_run_id,
                )
                # 确保结果中也带有 work_run_id，便于前端或调用方后续查询 Run Log。
                if isinstance(result, dict):
                    result.setdefault("work_run_id", work_run_id)
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
        return {"success": False, "error": "需要 run_id 与 selections"}
    try:
        from backend.agent.work_executor import run_work_flow_resume
        result = await run_work_flow_resume(run_id=run_id, selections=selections)
        data = {
            "status": result.get("status", "done"),
            "success": result.get("success", True),
            "answer": result.get("answer", ""),
            "trace": result.get("trace", []),
            "error": result.get("error"),
        }
        if result.get("pending_quotation_draft") is not None:
            data["pending_quotation_draft"] = result.get("pending_quotation_draft")
        if result.get("status") == "awaiting_choices":
            data["run_id"] = result.get("run_id")
            data["pending_choices"] = result.get("pending_choices", [])
        return {"success": True, "data": data}
    except Exception as e:
        logger.exception("work/resume 失败")
        return {"success": False, "error": str(e)}


@router.get("/api/work/run-logs/{run_id}")
async def get_work_run_log(
    run_id: str,
    offset: int = Query(0, ge=0, description="起始行号（从 0 开始）"),
    limit: int = Query(200, ge=1, le=2000, description="最多返回的事件条数"),
) -> JSONResponse:
    """
    查询指定 Work 运行对应的 Run Log。

    - run_id: 来自 /api/work/run 或 /api/work/run-stream 返回的 work_run_id。
    - 支持基于行号的简单分页（offset/limit）。
    """
    from backend.server.run_log_store import read_run_log

    try:
        kind, events, next_offset = read_run_log(run_id, kind="work", offset=offset, limit=limit)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="run_log_not_found")
    except Exception as e:
        logger.exception("读取 Work Run Log 失败")
        raise HTTPException(status_code=500, detail=f"read_run_log_failed: {e}")

    return JSONResponse(
        {
            "success": True,
            "data": {
                "run_id": run_id,
                "kind": kind,
                "events": events,
                "nextOffset": next_offset,
            },
        }
    )
