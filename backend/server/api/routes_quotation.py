"""报价单草稿与补货单草稿 API。"""
import logging
import os
from datetime import datetime
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Body, HTTPException

from backend.server.api.deps import get_oos_data_service

logger = logging.getLogger(__name__)
router = APIRouter()


def _is_pure_oos_line(ln: Any) -> bool:
    """
    判断该行是否属于「纯无货」：
    - Work 流程构造 pending_quotation_draft 时，未匹配到任何产品的行统一赋值 code == \"无货\"；
    - 库存不足但已有匹配 code 的行不会使用该 sentinel，而是通过 shortage/available_qty 表达。
    仅对这类行做无货登记，其它缺货行交由 shortage_records 统一管理。
    """
    if not isinstance(ln, dict):
        return False
    code = (ln.get("code") or "").strip()
    return code == "无货"


def _replenishment_confirm_use_real_tool() -> bool:
    """补货确认是否真实调用 modify_inventory 写 ACCURATE。"""
    return os.environ.get("REPLENISHMENT_CONFIRM_REAL_INVENTORY", "").strip().lower() in ("1", "true", "yes")


# ---------- 报价记录（quotation-drafts）----------

@router.post("/api/quotation-drafts")
async def quotation_drafts_create(body: Dict[str, Any] = Body(...)) -> Dict[str, Any]:
    """
    报价员在前端修改并点击「确认并保存」时调用。落库并生成编号。
    Body: name, source?('file'|'nl'), file_path?, lines: [{ product_name, specification, qty, code, ... }]
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
        ds = get_oos_data_service()
        result = ds.insert_quotation_draft(name=name, source=source, file_path=file_path, lines=lines)
        try:
            from backend.server.services.activity_log import log_activity

            log_activity(
                kind="quotation_draft",
                action="saved",
                entity_type="quotation_draft",
                entity_id=str(result.get("draft_id") or result.get("id") or ""),
                summary=f"保存报价草稿 {result.get('draft_no') or ''}".strip() or "保存报价草稿",
                details={
                    "name": name,
                    "source": source,
                    "file_path": file_path,
                    "draft_no": result.get("draft_no"),
                },
            )
        except Exception:
            # 记录活动失败不影响报价保存
            pass
        # 仅对「纯无货」行做无货登记：匹配不到任何产品、code 固定为 \"无货\"。
        # 库存不足（已有 code 但 available_qty < qty）的行只写 shortage_records，不再重复写入 out_of_stock_records。
        oos_lines = [ln for ln in lines if _is_pure_oos_line(ln)]
        if oos_lines:
            oos_records = []
            for ln in oos_lines:
                product_name = (ln.get("product_name") or "").strip()
                if not product_name:
                    continue
                try:
                    qty = float(ln.get("qty", 0) or 0)
                except (TypeError, ValueError):
                    qty = 0.0
                oos_records.append({
                    "product_name": product_name,
                    "specification": (ln.get("specification") or "").strip() or "",
                    "quantity": qty,
                })
            if oos_records:
                try:
                    from backend.tools.oos.services.quotation_agent_tool import persist_out_of_stock_records
                    persist_out_of_stock_records(
                        name or "报价单", oos_records, sheet_name="", file_path=file_path or "",
                    )
                except Exception as oos_err:
                    logger.warning("报价单保存后写入无货登记失败（不影响报价落库）: %s", oos_err)
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
        ds = get_oos_data_service()
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
    """按 draft_no 查报价记录详情（须在 /{draft_id} 之前定义）。"""
    try:
        ds = get_oos_data_service()
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
        ds = get_oos_data_service()
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
    """将报价单 status 更新为 confirmed，并执行成单闭环（转订单/写 ACCURATE/锁库存，当前占位）。"""
    try:
        ds = get_oos_data_service()
        ok = ds.confirm_quotation_draft(draft_id)
        if not ok:
            raise HTTPException(status_code=404, detail="未找到该报价单")
        draft = ds.get_quotation_draft_by_id(draft_id)
        draft_no = (draft or {}).get("draft_no") or ""
        from backend.server.services.fulfill import run_fulfill_loop
        result = run_fulfill_loop(draft_id, draft_no)
        return {"success": True, "data": result}
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("quotation-drafts PATCH confirm 失败")
        raise HTTPException(status_code=500, detail=str(e))


# ---------- 补货单（replenishment-drafts）----------

@router.post("/api/replenishment-drafts")
async def replenishment_drafts_create(body: Dict[str, Any] = Body(...)) -> Dict[str, Any]:
    """
    补货预览并落库：根据用户输入的产品/编码与数量生成补货单草稿。
    Body: { "lines": [ { "product_or_code": string, "quantity": number } ] }
    """
    raw_lines = body.get("lines")
    if not isinstance(raw_lines, list) or not raw_lines:
        raise HTTPException(status_code=400, detail="请提供非空的 lines 数组")
    try:
        from backend.tools.inventory.services.replenishment_preview import preview_replenishment_lines
    except ImportError as e:
        logger.exception("replenishment_preview 加载失败")
        raise HTTPException(status_code=500, detail=str(e))

    preview = preview_replenishment_lines(raw_lines)
    if not preview.get("lines"):
        detail = "; ".join(preview.get("errors") or []) or "补货预览失败"
        raise HTTPException(status_code=400, detail=detail)

    name = (body.get("name") or "").strip() or "补货-" + datetime.now().strftime("%Y%m%d-%H%M%S")
    try:
        ds = get_oos_data_service()
        result = ds.insert_replenishment_draft(name=name, source="replenishment", lines=preview["lines"])
        return {"success": True, "data": {**result, "lines": preview["lines"], "errors": preview.get("errors") or []}}
    except Exception as e:
        logger.exception("replenishment-drafts POST 失败")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/api/replenishment-drafts")
async def replenishment_drafts_list(
    name: Optional[str] = None,
    status: Optional[str] = None,
    limit: Optional[int] = 20,
) -> Dict[str, Any]:
    """补货单列表，支持按 name 模糊、status 筛选。"""
    try:
        ds = get_oos_data_service()
        rows = ds.get_replenishment_drafts(
            name_contains=name.strip() if name else None,
            status=status.strip() if status else None,
            limit=min(100, limit) if limit else 20,
        )
        return {"success": True, "data": rows}
    except Exception as e:
        logger.exception("replenishment-drafts GET 失败")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/api/replenishment-drafts/by-no/{draft_no}")
async def replenishment_drafts_get_by_no(draft_no: str) -> Dict[str, Any]:
    """按 draft_no 查补货单详情。"""
    try:
        ds = get_oos_data_service()
        draft = ds.get_replenishment_draft_by_no(draft_no)
        if not draft:
            raise HTTPException(status_code=404, detail="未找到该补货单")
        return {"success": True, "data": draft}
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("replenishment-drafts GET by no 失败")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/api/replenishment-drafts/{draft_id}")
async def replenishment_drafts_get(draft_id: int) -> Dict[str, Any]:
    """补货单详情（主表 + 全部 lines）。"""
    try:
        ds = get_oos_data_service()
        draft = ds.get_replenishment_draft_by_id(draft_id)
        if not draft:
            raise HTTPException(status_code=404, detail="未找到该补货单")
        return {"success": True, "data": draft}
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("replenishment-drafts GET by id 失败")
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/api/replenishment-drafts/{draft_id}")
async def replenishment_drafts_delete(draft_id: int) -> Dict[str, Any]:
    """删除补货单（草稿或已确认均可删除）。"""
    try:
        ds = get_oos_data_service()
        ok = ds.delete_replenishment_draft(draft_id)
        if not ok:
            raise HTTPException(status_code=404, detail="未找到该补货单")
        return {"success": True, "data": {"deleted": draft_id}}
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("replenishment-drafts DELETE 失败")
        raise HTTPException(status_code=500, detail=str(e))


@router.patch("/api/replenishment-drafts/{draft_id}")
async def replenishment_drafts_update(draft_id: int, body: Dict[str, Any] = Body(...)) -> Dict[str, Any]:
    """覆盖更新补货单行。Body: { "lines": [ { code, product_name, specification, quantity, ... } ] }"""
    lines = body.get("lines")
    if not isinstance(lines, list):
        lines = []
    try:
        ds = get_oos_data_service()
        ok = ds.update_replenishment_draft_lines(draft_id, lines)
        if not ok:
            raise HTTPException(status_code=404, detail="未找到该补货单")
        draft = ds.get_replenishment_draft_by_id(draft_id)
        return {"success": True, "data": draft}
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("replenishment-drafts PATCH 失败")
        raise HTTPException(status_code=500, detail=str(e))


@router.patch("/api/replenishment-drafts/{draft_id}/confirm")
async def replenishment_drafts_confirm(draft_id: int) -> Dict[str, Any]:
    """
    将补货单标记为 confirmed。若 REPLENISHMENT_CONFIRM_REAL_INVENTORY=1 则并行调用 modify_inventory 写 ACCURATE；
    否则占位：仅落库状态，不调用库存工具。
    """
    try:
        ds = get_oos_data_service()
        draft = ds.get_replenishment_draft_by_id(draft_id)
        if not draft:
            raise HTTPException(status_code=404, detail="未找到该补货单")
        lines = draft.get("lines") or []
        results: List[Dict[str, Any]] = []

        if _replenishment_confirm_use_real_tool():
            from concurrent.futures import ThreadPoolExecutor, as_completed
            from backend.tools.inventory.services.inventory_agent_tools import execute_inventory_tool

            with ThreadPoolExecutor(max_workers=min(len(lines) or 1, 8)) as ex:
                futures = []
                for ln in lines:
                    code = (ln.get("code") or "").strip()
                    qty = ln.get("quantity") or 0
                    if not code:
                        results.append({"code": None, "success": False, "error": "缺少 code"})
                        continue

                    def _run_one(payload: Dict[str, Any]) -> Dict[str, Any]:
                        out = execute_inventory_tool("modify_inventory", payload)
                        return {
                            "code": payload.get("code"),
                            "success": bool(out.get("success")),
                            "result": out.get("result"),
                            "error": out.get("error"),
                        }

                    payload = {
                        "code": code,
                        "action": "supplement",
                        "quantity": qty,
                        "memo": f"Replenishment draft #{draft.get('draft_no')}",
                    }
                    futures.append(ex.submit(_run_one, payload))

                for fut in as_completed(futures):
                    results.append(fut.result())
        else:
            for ln in lines:
                code = (ln.get("code") or "").strip()
                results.append({
                    "code": code or None,
                    "success": True,
                    "result": "[占位] 未实际调用库存工具；设置 REPLENISHMENT_CONFIRM_REAL_INVENTORY=1 后将真实写 ACCURATE。",
                    "error": None,
                })

        confirmed = ds.confirm_replenishment_draft(draft_id)
        if not confirmed:
            raise HTTPException(status_code=500, detail="补货单状态更新失败")
        executed = sum(1 for r in results if r.get("success"))
        data: Dict[str, Any] = {"executed": executed, "results": results}
        if not _replenishment_confirm_use_real_tool():
            data["message"] = "当前为占位模式，已更新补货单状态，未调用库存工具。设置 REPLENISHMENT_CONFIRM_REAL_INVENTORY=1 后将真实写 ACCURATE。"
        return {"success": True, "data": data}
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("replenishment-drafts PATCH confirm 失败")
        raise HTTPException(status_code=500, detail=str(e))
