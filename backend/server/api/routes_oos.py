"""无货/缺货看板与业务知识 API。"""
import logging
from pathlib import Path

from fastapi import APIRouter, Body, HTTPException
from typing import Any, Dict

from backend.server.api.deps import get_oos_data_service

logger = logging.getLogger(__name__)
router = APIRouter()


def _get_business_knowledge_path() -> Path:
    from backend.tools.inventory.config import config
    path = getattr(config, "WANDING_BUSINESS_KNOWLEDGE_PATH", None)
    if not path:
        raise ValueError("WANDING_BUSINESS_KNOWLEDGE_PATH 未配置")
    return Path(path)


# ---------- 无货看板 ----------

@router.get("/api/oos/stats")
async def oos_stats() -> Dict[str, Any]:
    """无货统计：总记录数、无货产品数、今日新增、被报≥2次、已发邮件数。"""
    try:
        ds = get_oos_data_service()
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
        ds = get_oos_data_service()
        records = ds.get_all_records(limit=limit * 5)
        by_key: Dict[str, dict] = {}
        for r in records:
            key = (r.get("product_key") or "").strip()
            if not key:
                key = "_id_" + str(r.get("id", ""))
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
        ds = get_oos_data_service()
        files = ds.get_files_summary()
        return {"success": True, "data": (files or [])[:limit]}
    except Exception as e:
        logger.exception("oos/by-file 失败")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/api/oos/by-time")
async def oos_by_time(days: int = 30) -> Dict[str, Any]:
    """无货按时间（按日）统计，最近 N 天。"""
    try:
        ds = get_oos_data_service()
        rows = ds.get_records_grouped_by_date(last_n_days=max(1, min(365, days)))
        return {"success": True, "data": rows or []}
    except Exception as e:
        logger.exception("oos/by-time 失败")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/api/oos/delete")
async def oos_delete(body: Dict[str, Any] = Body(...)) -> Dict[str, Any]:
    """无货看板：按 product_key 物理删除该产品的所有无货记录。Body: { "product_key": "..." }"""
    product_key = (body.get("product_key") or "").strip()
    if not product_key:
        raise HTTPException(status_code=400, detail="请提供 product_key")
    try:
        ds = get_oos_data_service()
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


# ---------- 业务知识（万鼎 wanding_business_knowledge.md）----------

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
            "data": {"mapping_table": mapping, "price_library": price_lib},
        }
    except Exception as e:
        logger.exception("business-knowledge/dependent-files 失败")
        raise HTTPException(status_code=500, detail=str(e))


# ---------- 缺货记录 ----------

@router.get("/api/shortage/stats")
async def shortage_stats() -> Dict[str, Any]:
    """缺货统计：总记录数、缺货产品数、今日新增、被报缺货≥2次。"""
    try:
        ds = get_oos_data_service()
        stats = ds.get_shortage_statistics()
        db_mode = "postgres" if getattr(ds, "using_postgres", False) else "sqlite"
        return {"success": True, "data": stats, "db": db_mode}
    except Exception as e:
        logger.exception("shortage/stats 失败")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/api/shortage/list")
async def shortage_list(limit: int = 100) -> Dict[str, Any]:
    """缺货产品列表（按 product_key 聚合）。"""
    try:
        ds = get_oos_data_service()
        product_list = ds.get_shortage_list(limit=limit)
        return {"success": True, "data": product_list}
    except Exception as e:
        logger.exception("shortage/list 失败")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/api/shortage/by-file")
async def shortage_by_file() -> Dict[str, Any]:
    """缺货按文件汇总。"""
    try:
        ds = get_oos_data_service()
        files = ds.get_shortage_files_summary()
        return {"success": True, "data": files or []}
    except Exception as e:
        logger.exception("shortage/by-file 失败")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/api/shortage/by-time")
async def shortage_by_time(days: int = 30) -> Dict[str, Any]:
    """缺货按时间（按日）统计，最近 N 天。"""
    try:
        ds = get_oos_data_service()
        rows = ds.get_shortage_by_time(last_n_days=max(1, min(365, days)))
        return {"success": True, "data": rows or []}
    except Exception as e:
        logger.exception("shortage/by-time 失败")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/api/shortage/delete")
async def shortage_delete(body: Dict[str, Any] = Body(...)) -> Dict[str, Any]:
    """缺货看板：按 product_key 物理删除该产品的所有缺货记录。Body: { "product_key": "..." }"""
    product_key = (body.get("product_key") or "").strip()
    if not product_key:
        raise HTTPException(status_code=400, detail="请提供 product_key")
    try:
        ds = get_oos_data_service()
        n = ds.delete_shortage_by_product_key_hard(product_key)
        return {"success": True, "deleted": n}
    except Exception as e:
        logger.exception("shortage/delete 失败")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/api/shortage/add")
async def shortage_add(body: Dict[str, Any] = Body(...)) -> Dict[str, Any]:
    """缺货看板：手动新增一条缺货记录。Body: { "product_name": "...", "specification?": "", "quantity?": 0, "available_qty?": 0 }"""
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
        ds = get_oos_data_service()
        n = ds.insert_shortage_records("看板手动添加", [record], max_rows=1)
        if n:
            return {"success": True, "message": "已添加"}
        raise HTTPException(status_code=400, detail="添加失败")
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("shortage/add 失败")
        raise HTTPException(status_code=500, detail=str(e))
