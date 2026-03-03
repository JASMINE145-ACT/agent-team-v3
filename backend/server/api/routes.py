"""
API 路由 — version3 单 Agent
"""
import asyncio
import json
import logging
import uuid
from pathlib import Path

from fastapi import APIRouter, Body, File, HTTPException, Request, UploadFile
from fastapi.responses import FileResponse, StreamingResponse
from typing import Any, Dict, List, Optional

from backend.config import Config
from backend.agent.remember import try_handle_remember

logger = logging.getLogger(__name__)
router = APIRouter()


@router.get("/health")
async def health_check():
    out = {
        "status": "ok",
        "service": "agent-jk-backend-v3",
        "mode": "single_agent",
        "llm_model": getattr(Config, "LLM_MODEL", None),
    }
    try:
        ds = _get_oos_data_service()
        out["oos_db"] = "postgres" if getattr(ds, "using_postgres", False) else "sqlite"
        out["oos_using_postgres"] = getattr(ds, "using_postgres", False)
    except Exception as e:
        logger.debug("health: oos DataService 未就绪: %s", e)
        out["oos_db"] = None
        out["oos_using_postgres"] = False
    return out


@router.get("/api/config/price-levels")
async def get_price_levels() -> Dict[str, Any]:
    """返回价格档位列表（value + 全名 label），供 Work/Chat 下拉与展示用。顺序与价格库表头一致。"""
    try:
        from backend.tools.inventory.services.wanding_fuzzy_matcher import (
            PRICE_LEVEL_DISPLAY_NAMES,
            PRICE_COLS,
        )
        # 顺序与价格库表头一致：出厂价 → 采购 → A/B/C/D/E 各级别（利润率、报单价格、D 降低利润率）
        order = [
            "FACTORY_INC_TAX", "FACTORY_EXC_TAX", "PURCHASE_EXC_TAX",
            "A_MARGIN", "A_QUOTE", "B_MARGIN", "B_QUOTE",
            "C_MARGIN", "C_QUOTE",
            "D_MARGIN", "D_QUOTE", "D_LOW",
            "E_MARGIN", "E_QUOTE",
        ]
        options = [
            {"value": k, "label": PRICE_LEVEL_DISPLAY_NAMES.get(k, k)}
            for k in order
            if k in PRICE_COLS
        ]
        return {"success": True, "data": options}
    except Exception as e:
        logger.debug("price-levels: %s", e)
        return {"success": False, "data": []}


def _sanitize_upload_filename(name: str, max_len: int = 80) -> str:
    """只保留文件名（去掉路径成分），去掉 .. 与非法字符，防止路径穿越。"""
    if not name or not name.strip():
        return "upload"
    # 只取 basename，去掉 \ 和 /
    base = Path(name.replace("\\", "/")).name.strip()
    if not base:
        return "upload"
    # 去掉 . 开头的隐藏文件名中的 ..
    if base in (".", ".."):
        return "upload"
    # 只保留安全字符：字母数字、中文、下划线、点、短横线
    safe = "".join(c for c in base if c.isalnum() or c in "._- " or "\u4e00" <= c <= "\u9fff")
    safe = (safe or "upload").strip()[:max_len]
    return safe or "upload"


@router.post("/api/quotation/upload")
async def quotation_upload(file: UploadFile = File(...)) -> Dict[str, Any]:
    """上传报价单或文档（Excel/PDF），返回 file_path、file_name，供无货登记/询价填充或解析时放入 context。"""
    try:
        Config.UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
        content = await file.read()
        if len(content) > Config.MAX_UPLOAD_MB * 1024 * 1024:
            raise HTTPException(status_code=413, detail=f"文件超过 {Config.MAX_UPLOAD_MB}MB 限制")
        raw_name = file.filename or "upload.xlsx"
        suffix = Path(raw_name.replace("\\", "/")).suffix or ".xlsx"
        if suffix.lower() not in (".xlsx", ".xls", ".xlsm", ".pdf"):
            raise HTTPException(status_code=400, detail="仅支持 .xlsx / .xls / .xlsm / .pdf")
        safe_basename = _sanitize_upload_filename(raw_name, max_len=60)
        if not safe_basename.endswith(suffix):
            safe_basename = (safe_basename.rsplit(".", 1)[0] if "." in safe_basename else safe_basename) + suffix
        safe_name = f"{uuid.uuid4().hex[:12]}_{safe_basename}"
        out_path = (Config.UPLOAD_DIR / safe_name).resolve()
        upload_root = Config.UPLOAD_DIR.resolve()
        try:
            out_path.relative_to(upload_root)
        except ValueError:
            raise HTTPException(status_code=400, detail="非法文件名")
        out_path.write_bytes(content)
        return {"file_path": str(out_path), "file_name": raw_name}
    except HTTPException:
        raise
    except Exception as e:
        logger.error("上传失败: %s", e)
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/api/quotation/download")
async def quotation_download(path: str = "") -> FileResponse:
    """
    下载云端上传/Work 产出的文件到本地。path 为文件名（basename），必须在 UPLOAD_DIR 下，禁止路径穿越。
    用于 Render 等云端部署：文件在服务器临时盘，用户通过本接口下载到本地保存。
    """
    path = (path or "").strip()
    if not path:
        raise HTTPException(status_code=400, detail="请提供 path（文件名）")
    # 只允许单层文件名，禁止 .. 与路径分隔符
    if ".." in path or "/" in path or "\\" in path:
        raise HTTPException(status_code=400, detail="path 仅允许文件名")
    safe = _sanitize_upload_filename(path, max_len=200)
    if safe != path:
        raise HTTPException(status_code=400, detail="文件名含非法字符")
    full = (Config.UPLOAD_DIR / path).resolve()
    try:
        full.relative_to(Config.UPLOAD_DIR.resolve())
    except ValueError:
        raise HTTPException(status_code=403, detail="禁止访问该路径")
    if not full.is_file():
        raise HTTPException(status_code=404, detail="文件不存在或已过期")
    return FileResponse(
        path=str(full),
        filename=path,
        media_type="application/octet-stream",
    )


@router.post("/api/query")
@router.post("/api/master/query")
async def query(
    request: Request,
    body: Dict[str, Any] = Body(..., description="query: 用户输入; session_id?: 会话ID; context?: { file_path?, ... }"),
) -> Dict[str, Any]:
    """
    统一查询入口。单 Agent 直接选用工具完成意图。
    Body: { "query": "用户输入", "session_id": "可选", "context": { "file_path": "可选" } }
    """
    query_text = (body.get("query") or body.get("message") or "").strip()
    if not query_text:
        return {"status": "error", "answer": "", "message": "请提供 query 或 message。"}
    remember_reply = try_handle_remember(query_text)
    if remember_reply is not None:
        session_id = (body.get("session_id") or "").strip() or str(uuid.uuid4())
        return {"status": "success", "answer": remember_reply, "thinking": None, "trace": [], "session_id": session_id}
    session_id = (body.get("session_id") or "").strip() or str(uuid.uuid4())
    context = body.get("context") or {}
    agent = request.app.state.agent
    try:
        result = await agent.execute_react(query_text, context=context, session_id=session_id)
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
    request: Request,
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

    remember_reply = try_handle_remember(query_text)
    if remember_reply is not None:
        async def _remember_stream():
            yield f'data: {json.dumps({"type": "done", "answer": remember_reply, "thinking": None, "session_id": (body.get("session_id") or "").strip() or str(uuid.uuid4())}, ensure_ascii=False)}\n\n'
        return StreamingResponse(_remember_stream(), media_type="text/event-stream")

    session_id = (body.get("session_id") or "").strip() or str(uuid.uuid4())
    context = body.get("context") or {}
    agent = request.app.state.agent

    async def _gen():
        queue: asyncio.Queue = asyncio.Queue()
        loop = asyncio.get_running_loop()

        def _push(item: dict) -> None:
            loop.call_soon_threadsafe(queue.put_nowait, item)

        def on_token(token: str):
            _push({"type": "token", "content": token})

        def on_event(event_type: str, payload: dict):
            _push({"type": event_type, **payload})

        async def _run():
            try:
                await agent.execute_react(
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

_oos_data_service = None


def _get_oos_data_service():
    """单例：仅首次调用时创建 DataService，避免每次请求都尝试 Postgres。"""
    global _oos_data_service
    if _oos_data_service is None:
        from backend.tools.oos.services.data_service import DataService
        _oos_data_service = DataService()
    return _oos_data_service


@router.get("/api/oos/stats")
async def oos_stats() -> Dict[str, Any]:
    """无货统计：总记录数、无货产品数、今日新增、被报≥2次、已发邮件数。"""
    try:
        ds = _get_oos_data_service()
        stats = ds.get_statistics()
        db_mode = "postgres" if getattr(ds, "using_postgres", False) else "sqlite"
        return {"success": True, "data": stats, "db": db_mode}
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
            key = (r.get("product_key") or "").strip()
            if not key:
                key = "_id_" + str(r.get("id", ""))  # Neon 控制台手动添加的行可能无 product_key，用 id 兜底展示
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
    """无货看板：按 product_key 物理删除该产品的所有无货记录（Neon 中也会移除）。Body: { "product_key": "..." }"""
    product_key = (body.get("product_key") or "").strip()
    if not product_key:
        raise HTTPException(status_code=400, detail="请提供 product_key")
    try:
        ds = _get_oos_data_service()
        n = ds.delete_by_product_key_hard(product_key)
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


# ---------- 缺货记录 API（与无货记录同一逻辑：统计/列表/按文件/按时间/删除）----------

@router.get("/api/shortage/stats")
async def shortage_stats() -> Dict[str, Any]:
    """缺货统计：总记录数、缺货产品数、今日新增、被报缺货≥2次。"""
    try:
        ds = _get_oos_data_service()
        stats = ds.get_shortage_statistics()
        db_mode = "postgres" if getattr(ds, "using_postgres", False) else "sqlite"
        return {"success": True, "data": stats, "db": db_mode}
    except Exception as e:
        logger.exception("shortage/stats 失败")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/api/shortage/list")
async def shortage_list(limit: int = 100) -> Dict[str, Any]:
    """缺货产品列表（按 product_key 聚合，每产品取被报缺货次数最大的一条）。"""
    try:
        ds = _get_oos_data_service()
        product_list = ds.get_shortage_list(limit=limit)
        return {"success": True, "data": product_list}
    except Exception as e:
        logger.exception("shortage/list 失败")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/api/shortage/by-file")
async def shortage_by_file() -> Dict[str, Any]:
    """缺货按文件汇总。"""
    try:
        ds = _get_oos_data_service()
        files = ds.get_shortage_files_summary()
        return {"success": True, "data": files or []}
    except Exception as e:
        logger.exception("shortage/by-file 失败")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/api/shortage/by-time")
async def shortage_by_time(days: int = 30) -> Dict[str, Any]:
    """缺货按时间（按日）统计，最近 N 天。"""
    try:
        ds = _get_oos_data_service()
        rows = ds.get_shortage_by_time(last_n_days=max(1, min(365, days)))
        return {"success": True, "data": rows or []}
    except Exception as e:
        logger.exception("shortage/by-time 失败")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/api/shortage/delete")
async def shortage_delete(body: Dict[str, Any] = Body(...)) -> Dict[str, Any]:
    """缺货看板：按 product_key 物理删除该产品的所有缺货记录（Neon 中也会移除）。Body: { "product_key": "..." }"""
    product_key = (body.get("product_key") or "").strip()
    if not product_key:
        raise HTTPException(status_code=400, detail="请提供 product_key")
    try:
        ds = _get_oos_data_service()
        n = ds.delete_shortage_by_product_key_hard(product_key)
        return {"success": True, "deleted": n}
    except Exception as e:
        logger.exception("shortage/delete 失败")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/api/shortage/add")
async def shortage_add(body: Dict[str, Any] = Body(...)) -> Dict[str, Any]:
    """缺货看板：手动新增一条缺货记录。Body: { "product_name": "...", "specification?": "", "quantity?": 0, "available_qty?": 0 }；差异 shortfall 自动计算为 max(0, quantity - available_qty)。"""
    product_name = (body.get("product_name") or "").strip()
    if not product_name:
        raise HTTPException(status_code=400, detail="请提供 product_name")
    try:
        qty = float(body.get("quantity") or 0)
        avail = float(body.get("available_qty") or 0)
        shortfall = max(0.0, qty - avail)
        record = {
            "product_name": product_name,
            "specification": (body.get("specification") or "").strip(),
            "quantity": qty,
            "available_qty": avail,
            "shortfall": shortfall,
        }
        ds = _get_oos_data_service()
        n = ds.insert_shortage_records("看板手动添加", [record], max_rows=1)
        if n:
            return {"success": True, "message": "已添加"}
        raise HTTPException(status_code=400, detail="添加失败")
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("shortage/add 失败")
        raise HTTPException(status_code=500, detail=str(e))


# ---------- 报价记录（待确认报价单落库，报价员确认后写入 Neon）----------

@router.post("/api/quotation-drafts")
async def quotation_drafts_create(body: Dict[str, Any] = Body(...)) -> Dict[str, Any]:
    """
    报价员在前端修改并点击「确认并保存」时调用。落库并生成编号。
    Body: name, source?('file'|'nl'), file_path?, lines: [{ product_name, specification, qty, code, quote_name, unit_price, amount?, available_qty, shortfall, is_shortage?, match_source? }]
    """
    name = (body.get("name") or "").strip() or None
    if not name:
        raise HTTPException(status_code=400, detail="请提供 name（Excel 文件名或自然语言标识）")
    source = (body.get("source") or "file").strip() or "file"
    file_path = body.get("file_path")
    if file_path is not None:
        file_path = str(file_path).strip() or None
    lines = body.get("lines")
    if not isinstance(lines, list):
        lines = []
    try:
        ds = _get_oos_data_service()
        result = ds.insert_quotation_draft(name=name, source=source, file_path=file_path, lines=lines)
        return {"success": True, "data": result}
    except Exception as e:
        logger.exception("quotation-drafts POST 失败")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/api/quotation-drafts")
async def quotation_drafts_list(
    name: Optional[str] = None,
    status: Optional[str] = None,
    limit: Optional[int] = 20,
) -> Dict[str, Any]:
    """报价记录列表，支持按 name 模糊、status 筛选。"""
    try:
        ds = _get_oos_data_service()
        rows = ds.get_quotation_drafts(
            name_contains=name.strip() if name else None,
            status=status.strip() if status else None,
            limit=min(100, limit) if limit else 20,
        )
        return {"success": True, "data": rows}
    except Exception as e:
        logger.exception("quotation-drafts GET 失败")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/api/quotation-drafts/by-no/{draft_no}")
async def quotation_drafts_get_by_no(draft_no: str) -> Dict[str, Any]:
    """按 draft_no 查报价记录详情（须在 /{draft_id} 之前定义以免 by-no 被当作 id）。"""
    try:
        ds = _get_oos_data_service()
        draft = ds.get_quotation_draft_by_no(draft_no)
        if not draft:
            raise HTTPException(status_code=404, detail="未找到该报价单")
        return {"success": True, "data": draft}
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("quotation-drafts GET by no 失败")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/api/quotation-drafts/{draft_id}")
async def quotation_drafts_get(draft_id: int) -> Dict[str, Any]:
    """报价记录详情（主表 + 全部 lines）。"""
    try:
        ds = _get_oos_data_service()
        draft = ds.get_quotation_draft_by_id(draft_id)
        if not draft:
            raise HTTPException(status_code=404, detail="未找到该报价单")
        return {"success": True, "data": draft}
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("quotation-drafts GET by id 失败")
        raise HTTPException(status_code=500, detail=str(e))


@router.patch("/api/quotation-drafts/{draft_id}/confirm")
async def quotation_drafts_confirm(draft_id: int) -> Dict[str, Any]:
    """将报价单 status 更新为 confirmed（若落库时已视为确认可不用此接口）。"""
    try:
        ds = _get_oos_data_service()
        ok = ds.confirm_quotation_draft(draft_id)
        if not ok:
            raise HTTPException(status_code=404, detail="未找到该报价单")
        return {"success": True}
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("quotation-drafts PATCH confirm 失败")
        raise HTTPException(status_code=500, detail=str(e))


# ---------- Work Mode（报价批量，固定流程 + ReAct，与 Chat 独立）----------

_WORK_ALLOWED_LEVELS = {
    "A",
    "B",
    "C",
    "D",
    "E",
    "FACTORY_INC_TAX",
    "FACTORY_EXC_TAX",
    "PURCHASE_EXC_TAX",
    "A_MARGIN",
    "A_QUOTE",
    "B_MARGIN",
    "B_QUOTE",
    "C_MARGIN",
    "C_QUOTE",
    "D_MARGIN",
    "D_QUOTE",
    "D_LOW",
    "E_MARGIN",
    "E_QUOTE",
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
async def work_run_stream(body: Dict[str, Any] = Body(...)):
    """
    执行 Work 流程并流式返回：先推送当前阶段 stage (0/1/2)，最后推送 result。
    前端可据此显示真实进度（识别表数据 / 查价格与库存 / 填表）。
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
