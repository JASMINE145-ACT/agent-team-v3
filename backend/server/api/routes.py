"""
API 路由 — version3 单 Agent
"""
import asyncio
import json
import logging
import uuid
from pathlib import Path

from fastapi import APIRouter, Body, File, HTTPException, UploadFile
from fastapi.responses import StreamingResponse
from typing import Any, Dict

from backend.config import Config
from backend.agent import SingleAgent
from backend.agent.remember import try_handle_remember

logger = logging.getLogger(__name__)
router = APIRouter()

single_agent = SingleAgent(
    api_key=Config.OPENAI_API_KEY,
    base_url=Config.OPENAI_BASE_URL,
    model=Config.LLM_MODEL,
)


@router.get("/health")
async def health_check():
    return {"status": "ok", "service": "agent-jk-backend-v3", "mode": "single_agent"}


@router.post("/api/quotation/upload")
async def quotation_upload(file: UploadFile = File(...)) -> Dict[str, Any]:
    """上传报价单或文档（Excel/PDF），返回 file_path、file_name，供无货登记/询价填充或解析时放入 context。"""
    try:
        Config.UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
        content = await file.read()
        if len(content) > Config.MAX_UPLOAD_MB * 1024 * 1024:
            raise HTTPException(status_code=413, detail=f"文件超过 {Config.MAX_UPLOAD_MB}MB 限制")
        suffix = Path(file.filename or "upload.xlsx").suffix or ".xlsx"
        if suffix.lower() not in (".xlsx", ".xls", ".xlsm", ".pdf"):
            raise HTTPException(status_code=400, detail="仅支持 .xlsx / .xls / .xlsm / .pdf")
        safe_name = f"{uuid.uuid4().hex[:12]}_{(file.filename or 'upload')[:80]}"
        out_path = Config.UPLOAD_DIR / safe_name
        out_path.write_bytes(content)
        return {"file_path": str(out_path.resolve()), "file_name": file.filename or "upload.xlsx"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error("上传失败: %s", e)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/api/query")
@router.post("/api/master/query")
async def query(
    body: Dict[str, Any] = Body(..., description="query: 用户输入; session_id?: 会话ID; context?: { file_path?, ... }"),
) -> Dict[str, Any]:
    """
    统一查询入口。单 Agent 直接选用工具完成意图。
    Body: { "query": "用户输入", "session_id": "可选", "context": { "file_path": "可选" } }
    """
    query_text = (body.get("query") or body.get("message") or "").strip()
    if not query_text:
        return {"status": "error", "answer": "", "message": "请提供 query 或 message。"}
    # 业务知识「记住」命令：你要记住 / 请记住 等 → 追加到 MD，直接返回
    remember_reply = try_handle_remember(query_text)
    if remember_reply is not None:
        session_id = (body.get("session_id") or "").strip() or str(uuid.uuid4())
        return {"status": "success", "answer": remember_reply, "thinking": None, "trace": [], "session_id": session_id}
    session_id = (body.get("session_id") or "").strip() or str(uuid.uuid4())
    context = body.get("context") or {}
    try:
        result = await single_agent.execute_react(query_text, context=context, session_id=session_id)
    except Exception as e:
        logger.exception("query 执行失败")
        return {"status": "error", "answer": "", "message": str(e)}
    if result.get("needs_clarification"):
        return {
            "status": "needs_clarification",
            "answer": result.get("answer", ""),
            "questions": result.get("clarification_questions") or [],
            "session_id": session_id,
        }
    return {
        "status": "success",
        "answer": result.get("answer", ""),
        "thinking": result.get("thinking"),
        "trace": result.get("trace"),
        "session_id": session_id,
    }


@router.post("/api/query/stream")
async def query_stream(
    body: Dict[str, Any] = Body(...),
) -> StreamingResponse:
    """
    流式查询（SSE）。事件格式：
      data: {"type": "token",  "content": "..."}      — LLM 文本 token 实时推送
      data: {"type": "done",   "answer": "...", "thinking": "...", "session_id": "..."}
      data: {"type": "error",  "message": "..."}
    """
    query_text = (body.get("query") or body.get("message") or "").strip()
    if not query_text:
        async def _empty():
            yield f'data: {json.dumps({"type": "error", "message": "请提供 query"}, ensure_ascii=False)}\n\n'
        return StreamingResponse(_empty(), media_type="text/event-stream")

    # 业务知识「记住」命令 → 直接返回一条 done，不跑 ReAct
    remember_reply = try_handle_remember(query_text)
    if remember_reply is not None:
        async def _remember_stream():
            yield f'data: {json.dumps({"type": "done", "answer": remember_reply, "thinking": None, "session_id": (body.get("session_id") or "").strip() or str(uuid.uuid4())}, ensure_ascii=False)}\n\n'
        return StreamingResponse(_remember_stream(), media_type="text/event-stream")

    session_id = (body.get("session_id") or "").strip() or str(uuid.uuid4())
    context = body.get("context") or {}

    async def _gen():
        queue: asyncio.Queue = asyncio.Queue()
        loop = asyncio.get_running_loop()

        def _push(item: dict) -> None:
            loop.call_soon_threadsafe(queue.put_nowait, item)

        def on_token(token: str):
            _push({"type": "token", "content": token})

        def on_event(event_type: str, payload: dict):
            # lifecycle 事件直接透传到 SSE 流
            # loop_start / loop_end / loop_error 由客户端作为「起止信号」
            _push({"type": event_type, **payload})

        async def _run():
            try:
                await single_agent.execute_react(
                    query_text,
                    context=context,
                    session_id=session_id,
                    on_token=on_token,
                    on_event=on_event,
                )
            except Exception as e:
                logger.exception("query_stream 执行失败")
                # execute_react 内部未捕获的异常：补发 loop_error 保证流能关闭
                _push({"type": "loop_error", "session_id": session_id, "error": str(e)})

        task = asyncio.create_task(_run())
        while True:
            item = await queue.get()
            yield f"data: {json.dumps(item, ensure_ascii=False)}\n\n"
            # loop_end / loop_error 是权威的「本轮结束」信号，关闭 SSE 流
            if item["type"] in ("loop_end", "loop_error"):
                break
        await task

    return StreamingResponse(_gen(), media_type="text/event-stream")


# ---------- 无货看板 API（供 control-ui 使用） ----------


def _get_oos_data_service():
    from backend.tools.oos.services.data_service import DataService
    return DataService()


@router.get("/api/oos/stats")
async def oos_stats() -> Dict[str, Any]:
    """无货统计：总记录数、无货产品数、今日新增、被报≥2次、已发邮件数。"""
    try:
        ds = _get_oos_data_service()
        stats = ds.get_statistics()
        return {"success": True, "data": stats}
    except Exception as e:
        logger.exception("oos/stats 失败")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/api/oos/list")
async def oos_list(limit: int = 100) -> Dict[str, Any]:
    """无货产品列表（按 product_key 聚合，每产品取被报无货次数最大的一条）。"""
    try:
        ds = _get_oos_data_service()
        records = ds.get_all_records(limit=limit * 5)
        by_key: Dict[str, dict] = {}
        for r in records:
            key = r.get("product_key") or ""
            if not key:
                continue
            cnt = r.get("count") or 1
            if key not in by_key or (by_key[key].get("count") or 0) < cnt:
                by_key[key] = r
        product_list = list(by_key.values())[:limit]
        return {"success": True, "data": product_list}
    except Exception as e:
        logger.exception("oos/list 失败")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/api/oos/by-file")
async def oos_by_file(limit: int = 50) -> Dict[str, Any]:
    """无货按文件汇总。"""
    try:
        ds = _get_oos_data_service()
        files = ds.get_files_summary()
        return {"success": True, "data": (files or [])[:limit]}
    except Exception as e:
        logger.exception("oos/by-file 失败")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/api/oos/by-time")
async def oos_by_time(days: int = 30) -> Dict[str, Any]:
    """无货按时间（按日）统计，最近 N 天。"""
    try:
        ds = _get_oos_data_service()
        rows = ds.get_records_grouped_by_date(last_n_days=max(1, min(365, days)))
        return {"success": True, "data": rows or []}
    except Exception as e:
        logger.exception("oos/by-time 失败")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/api/oos/delete")
async def oos_delete(body: Dict[str, Any] = Body(...)) -> Dict[str, Any]:
    """无货看板：按 product_key 软删除该产品的所有无货记录。Body: { "product_key": "..." }"""
    product_key = (body.get("product_key") or "").strip()
    if not product_key:
        raise HTTPException(status_code=400, detail="请提供 product_key")
    try:
        ds = _get_oos_data_service()
        n = ds.delete_by_product_key(product_key)
        return {"success": True, "deleted": n}
    except Exception as e:
        logger.exception("oos/delete 失败")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/api/oos/add")
async def oos_add(body: Dict[str, Any] = Body(...)) -> Dict[str, Any]:
    """无货看板：手动新增一条无货记录。Body: { "product_name": "...", "specification?": "", "quantity?": 0, "unit?": "" }"""
    product_name = (body.get("product_name") or "").strip()
    if not product_name:
        raise HTTPException(status_code=400, detail="请提供 product_name")
    try:
        qty = body.get("quantity")
        if qty is None:
            qty = 0
        try:
            qty = float(qty)
        except (TypeError, ValueError):
            qty = 0.0
        record = {
            "product_name": product_name,
            "specification": (body.get("specification") or "").strip(),
            "unit": (body.get("unit") or "").strip(),
            "quantity": qty,
        }
        from backend.tools.oos.services.quotation_agent_tool import persist_out_of_stock_records
        out = persist_out_of_stock_records("看板手动添加", [record], "")
        if out.get("success"):
            return {"success": True, "message": out.get("result", "已添加")}
        raise HTTPException(status_code=400, detail=out.get("error", "添加失败"))
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("oos/add 失败")
        raise HTTPException(status_code=500, detail=str(e))


# ---------- 业务知识（万鼎 wanding_business_knowledge.md，Control UI 可编辑）----------

def _get_business_knowledge_path() -> Path:
    from backend.tools.inventory.config import config
    path = getattr(config, "WANDING_BUSINESS_KNOWLEDGE_PATH", None)
    if not path:
        raise ValueError("WANDING_BUSINESS_KNOWLEDGE_PATH 未配置")
    p = Path(path)
    return p


@router.get("/api/business-knowledge")
async def get_business_knowledge() -> Dict[str, Any]:
    """读取 wanding_business_knowledge.md 内容，供 Control UI 业务知识页展示与编辑。"""
    try:
        p = _get_business_knowledge_path()
        if not p.exists():
            from backend.tools.inventory.services.llm_selector import _BUSINESS_KNOWLEDGE
            p.parent.mkdir(parents=True, exist_ok=True)
            p.write_text(_BUSINESS_KNOWLEDGE.strip(), encoding="utf-8")
        content = p.read_text(encoding="utf-8")
        return {"success": True, "data": {"content": content}}
    except Exception as e:
        logger.exception("business-knowledge GET 失败")
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/api/business-knowledge")
async def put_business_knowledge(body: Dict[str, Any] = Body(...)) -> Dict[str, Any]:
    """保存 wanding_business_knowledge.md 内容；保存后会使 LLM selector 缓存失效。"""
    try:
        content = body.get("content")
        if content is None:
            raise HTTPException(status_code=400, detail="请提供 content 字段")
        p = _get_business_knowledge_path()
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(content if isinstance(content, str) else str(content), encoding="utf-8")
        from backend.tools.inventory.services.llm_selector import invalidate_business_knowledge_cache
        invalidate_business_knowledge_cache()
        return {"success": True}
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("business-knowledge PUT 失败")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/api/business-knowledge/dependent-files")
async def get_business_knowledge_dependent_files() -> Dict[str, Any]:
    """返回选型与历史报价依赖的 Excel 路径，供业务知识页「相关数据文件」指引使用。"""
    try:
        from backend.tools.inventory.config import config
        mapping = getattr(config, "MAPPING_TABLE_PATH", "") or ""
        price_lib = getattr(config, "PRICE_LIBRARY_PATH", "") or ""
        return {
            "success": True,
            "data": {
                "mapping_table": mapping,
                "price_library": price_lib,
            },
        }
    except Exception as e:
        logger.exception("business-knowledge/dependent-files 失败")
        raise HTTPException(status_code=500, detail=str(e))


# ---------- Work Mode（报价批量，固定流程 + ReAct，与 Chat 独立）----------

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
    customer_level = (body.get("customer_level") or "B").strip().upper() or "B"
    if customer_level not in ("A", "B", "C", "D"):
        customer_level = "B"
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
        if result.get("status") == "awaiting_choices":
            out["run_id"] = result.get("run_id")
            out["pending_choices"] = result.get("pending_choices", [])
        return out
    except Exception as e:
        logger.exception("work/run 失败")
        raise HTTPException(status_code=500, detail=str(e))


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
        if result.get("status") == "awaiting_choices":
            out["run_id"] = result.get("run_id")
            out["pending_choices"] = result.get("pending_choices", [])
        return out
    except Exception as e:
        logger.exception("work/resume 失败")
        raise HTTPException(status_code=500, detail=str(e))
