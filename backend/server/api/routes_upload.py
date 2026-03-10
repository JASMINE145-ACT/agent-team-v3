"""报价单/文件上传与下载 API。"""
import logging
import uuid
from pathlib import Path
from typing import Any, Dict

from fastapi import APIRouter, Body, File, HTTPException, UploadFile
from fastapi.responses import FileResponse

from backend.config import Config
from backend.server.api.deps import sanitize_upload_filename
from backend.tools.quotation.quote_tools import fill_template_with_inquiry_items
from backend.tools.quotation.text_to_inquiry import text_to_inquiry_items

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/api/quotation/upload")
async def quotation_upload(file: UploadFile = File(...)) -> Dict[str, Any]:
    """上传报价单或文档（Excel/PDF），返回 file_path、file_name。"""
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
        return {"success": True, "data": {"file_path": str(out_path), "file_name": raw_name}}
    except HTTPException:
        raise
    except Exception as e:
        logger.error("上传失败: %s", e)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/api/quotation/from-text")
async def quotation_from_text(body: Dict[str, Any] = Body(...)) -> Dict[str, Any]:
    """从文字生成报价单 Excel；返回 file_path、file_name。"""
    text = (body.get("text") or "").strip()
    if not text:
        raise HTTPException(status_code=400, detail="请提供 text（产品描述文字）")
    template_path = (body.get("template_path") or "").strip() or str(Config.QUOTATION_TEMPLATE_PATH)
    if not Path(template_path).exists():
        raise HTTPException(status_code=500, detail=f"报价单模板不存在: {template_path}")
    Config.UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    safe_name = f"{uuid.uuid4().hex[:12]}_文字报价.xlsx"
    output_path = (Config.UPLOAD_DIR / safe_name).resolve()
    try:
        output_path.relative_to(Config.UPLOAD_DIR.resolve())
    except ValueError:
        raise HTTPException(status_code=400, detail="非法输出路径")
    items = text_to_inquiry_items(text)
    if not items:
        raise HTTPException(status_code=400, detail="未能从文字中解析出任何产品行")
    out = fill_template_with_inquiry_items(
        template_path=template_path,
        items=items,
        output_path=str(output_path),
        sheet_name="询价单",
    )
    if not out.get("success"):
        raise HTTPException(status_code=500, detail=out.get("error", "填写模板失败"))
    return {"success": True, "data": {"file_path": str(output_path), "file_name": "文字报价.xlsx"}}


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
