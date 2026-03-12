"""报价单/文件上传与下载 API。"""
import logging
import uuid
from pathlib import Path
from typing import Any, Dict

from fastapi import APIRouter, Body, File, HTTPException, Query, UploadFile
from fastapi.responses import FileResponse

from backend.config import Config
from backend.server.api.deps import sanitize_upload_filename
from backend.tools.quotation.excel_summary import (
    ExcelSummary,
    generate_excel_summary,
    make_file_id,
    put_excel_summary,
)
from backend.tools.quotation.quote_tools import (
    fill_template_with_inquiry_items,
    get_template_inquiry_capacity,
)
from backend.tools.quotation.text_to_inquiry import text_to_inquiry_items

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/api/quotation/upload")
async def quotation_upload(
    file: UploadFile = File(...),
    with_summary: bool = Query(True, description="Whether to generate excel summary metadata"),
) -> Dict[str, Any]:
    """上传报价单或文档（Excel/PDF），返回 file_path、file_name 及解析摘要元信息。"""
    try:
        Config.UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
        content = await file.read()
        if len(content) > Config.MAX_UPLOAD_MB * 1024 * 1024:
            raise HTTPException(status_code=413, detail=f"文件超过 {Config.MAX_UPLOAD_MB}MB 限制")
        raw_name = file.filename or "upload.xlsx"
        suffix = Path(raw_name.replace("\\", "/")).suffix or ".xlsx"
        if suffix.lower() not in (".xlsx", ".xls", ".xlsm", ".pdf"):
            raise HTTPException(status_code=400, detail="仅支持 .xlsx / .xls / .xlsm / .pdf")
        safe_basename = sanitize_upload_filename(raw_name, max_len=60)
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
        file_path_str = str(out_path)

        # 仅对 Excel 文件尝试生成摘要；PDF 暂不解析。
        summary: ExcelSummary | None = None
        summary_meta: Dict[str, Any] | None = None
        file_id = make_file_id(file_path_str)
        if with_summary and suffix.lower() in (".xlsx", ".xlsm"):
            try:
                summary = generate_excel_summary(file_path_str)
            except Exception:
                logger.exception("generate_excel_summary 失败（已忽略）")
                summary = None
            if summary is not None:
                entry = put_excel_summary(file_path_str, summary)
                # 以缓存中的 file_id 为准（与 make_file_id 一致）
                file_id = entry.file_id
                meta = summary.get("meta") or {}
                summary_meta = {
                    "rows_count": meta.get("rows_count"),
                    "preview_count": meta.get("preview_count"),
                    "truncated": bool(meta.get("truncated")),
                    "items_success": bool(meta.get("items_success")),
                }

        data: Dict[str, Any] = {"file_path": file_path_str, "file_name": raw_name, "file_id": file_id}
        if summary_meta is not None:
            data["summary_meta"] = summary_meta
        return {"success": True, "data": data}
    except HTTPException:
        raise
    except Exception as e:
        logger.error("上传失败: %s", e)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/api/quotation/from-text")
async def quotation_from_text(body: Dict[str, Any] = Body(...)) -> Dict[str, Any]:
    """从文字生成报价单 Excel。容量不足时自动按模板容量拆分为多份文件。"""
    text = (body.get("text") or "").strip()
    if not text:
        raise HTTPException(status_code=400, detail="请提供 text（产品描述文字）")
    template_path = (body.get("template_path") or "").strip() or str(Config.QUOTATION_TEMPLATE_PATH)
    if not Path(template_path).exists():
        raise HTTPException(status_code=500, detail=f"报价单模板不存在: {template_path}")
    Config.UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    items = text_to_inquiry_items(text)
    if not items:
        raise HTTPException(status_code=400, detail="未能从文字中解析出任何产品行")

    cap_out = get_template_inquiry_capacity(template_path=template_path, sheet_name="询价单")
    if not cap_out.get("success"):
        raise HTTPException(status_code=500, detail=cap_out.get("error", "读取模板容量失败"))
    capacity = int(cap_out.get("capacity") or 0)
    if capacity <= 0:
        raise HTTPException(status_code=500, detail="模板无可用询价行，请检查模板结构")

    file_paths: list[str] = []
    file_names: list[str] = []
    total_chunks = (len(items) + capacity - 1) // capacity
    for idx in range(total_chunks):
        chunk = items[idx * capacity : (idx + 1) * capacity]
        suffix = "" if total_chunks == 1 else f"_part{idx + 1}"
        safe_name = f"{uuid.uuid4().hex[:12]}_文字报价{suffix}.xlsx"
        output_path = (Config.UPLOAD_DIR / safe_name).resolve()
        try:
            output_path.relative_to(Config.UPLOAD_DIR.resolve())
        except ValueError:
            raise HTTPException(status_code=400, detail="非法输出路径")
        out = fill_template_with_inquiry_items(
            template_path=template_path,
            items=chunk,
            output_path=str(output_path),
            sheet_name="询价单",
            allow_insert_rows=False,
        )
        if not out.get("success"):
            raise HTTPException(status_code=500, detail=out.get("error", "填写模板失败"))
        file_paths.append(str(output_path))
        file_names.append(f"文字报价{suffix}.xlsx")

    if len(file_paths) == 1:
        return {"success": True, "data": {"file_path": file_paths[0], "file_name": file_names[0]}}

    return {
        "success": True,
        "data": {
            # Backward compatibility for clients expecting single-file keys.
            "file_path": file_paths[0],
            "file_name": file_names[0],
            "file_paths": file_paths,
            "file_names": file_names,
            "chunk_count": len(file_paths),
            "chunk_size": capacity,
            "message": f"文本行数超过单模板容量，已拆分为 {len(file_paths)} 份报价文件",
        },
    }


@router.get("/api/quotation/download")
async def quotation_download(path: str = "") -> FileResponse:
    """下载 uploads 下的文件；path 为文件名（basename）。"""
    path = (path or "").strip()
    if not path:
        raise HTTPException(status_code=400, detail="请提供 path（文件名）")
    if ".." in path or "/" in path or "\\" in path:
        raise HTTPException(status_code=400, detail="path 仅允许文件名")
    safe = sanitize_upload_filename(path, max_len=200)
    if safe != path:
        raise HTTPException(status_code=400, detail="文件名含非法字符")
    full = (Config.UPLOAD_DIR / path).resolve()
    try:
        full.relative_to(Config.UPLOAD_DIR.resolve())
    except ValueError:
        raise HTTPException(status_code=403, detail="禁止访问该路径")
    if not full.is_file():
        raise HTTPException(status_code=404, detail="文件不存在或已过期")
    return FileResponse(path=str(full), filename=path, media_type="application/octet-stream")
