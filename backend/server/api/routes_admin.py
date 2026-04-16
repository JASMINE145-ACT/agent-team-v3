"""价格库 / 产品映射表管理 API（需 ADMIN_PASSWORD）。"""

from __future__ import annotations

from typing import Optional

from fastapi import APIRouter, Depends, File, Form, HTTPException, Query, UploadFile
from pydantic import BaseModel

from backend.tools.admin import auth, repository
from backend.tools.admin import cache as admin_cache
from backend.tools.admin.excel_parser import (
    parse_generic as _parse_generic,
    parse_price_library,
    parse_product_mapping,
)
from backend.config import Config

router = APIRouter(prefix="/api/admin", tags=["admin"])

_MAX_UPLOAD_BYTES = max(1, int(Config.MAX_UPLOAD_MB)) * 1024 * 1024
_READ_CHUNK = 64 * 1024


async def _read_upload_limited(file: UploadFile) -> bytes:
    chunks: list[bytes] = []
    total = 0
    while True:
        chunk = await file.read(_READ_CHUNK)
        if not chunk:
            break
        total += len(chunk)
        if total > _MAX_UPLOAD_BYTES:
            raise HTTPException(
                status_code=413,
                detail=f"文件过大，最大 {Config.MAX_UPLOAD_MB} MB",
            )
        chunks.append(chunk)
    return b"".join(chunks)


def _require_enabled() -> None:
    if not auth.is_enabled():
        raise HTTPException(status_code=503, detail="管理功能未启用（ADMIN_PASSWORD 未配置）")


def require_admin_token(x_admin_token: Optional[str] = None) -> None:
    """从 Header X-Admin-Token 校验（FastAPI 注入见各路由）。"""
    _require_enabled()
    if not auth.verify_token(x_admin_token or ""):
        raise HTTPException(status_code=401, detail="无效或已过期的 token，请重新登录")


# FastAPI 3: use Header in dependency - we'll use a small wrapper
from fastapi import Header


def get_admin_dep(x_admin_token: Optional[str] = Header(None, alias="X-Admin-Token")):
    require_admin_token(x_admin_token)


class LoginRequest(BaseModel):
    password: str


@router.post("/login")
async def admin_login(body: LoginRequest):
    _require_enabled()
    token = auth.verify_password(body.password)
    if token is None:
        raise HTTPException(status_code=401, detail="密码错误")
    return {"token": token}


class PriceRow(BaseModel):
    material: str = ""
    description: str = ""
    price_a: Optional[float] = None
    price_b: Optional[float] = None
    price_c: Optional[float] = None
    price_d: Optional[float] = None


@router.get("/price-library")
async def list_price_library(
    q: str = "",
    page: int = 1,
    page_size: int = 100,
    _: None = Depends(get_admin_dep),
):
    return repository.fetch_price_library(q=q, page=page, page_size=page_size)


@router.post("/price-library")
async def create_price_row(body: PriceRow, _: None = Depends(get_admin_dep)):
    row_id = repository.insert_price_row(
        body.material, body.description, body.price_a, body.price_b, body.price_c, body.price_d
    )
    if row_id is None:
        raise HTTPException(status_code=503, detail="DB 不可用")
    admin_cache.invalidate_price_library()
    return {"id": row_id}


@router.put("/price-library/{row_id}")
async def update_price_row(row_id: int, body: PriceRow, _: None = Depends(get_admin_dep)):
    ok = repository.update_price_row(
        row_id, body.material, body.description, body.price_a, body.price_b, body.price_c, body.price_d
    )
    if ok is None:
        raise HTTPException(status_code=503, detail="数据库不可用或操作失败")
    if not ok:
        raise HTTPException(status_code=404, detail="记录不存在")
    admin_cache.invalidate_price_library()
    return {"ok": True}


@router.delete("/price-library/{row_id}")
async def delete_price_row(row_id: int, _: None = Depends(get_admin_dep)):
    ok = repository.delete_price_row(row_id)
    if ok is None:
        raise HTTPException(status_code=503, detail="数据库不可用或操作失败")
    if not ok:
        raise HTTPException(status_code=404, detail="记录不存在")
    admin_cache.invalidate_price_library()
    return {"ok": True}


@router.post("/price-library/upload")
async def upload_price_library(
    file: UploadFile = File(...),
    _: None = Depends(get_admin_dep),
):
    content = await _read_upload_limited(file)
    try:
        rows = parse_price_library(content)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Excel 解析失败: {e}") from e
    count = repository.replace_all_price_library(rows)
    admin_cache.invalidate_price_library()
    return {"imported": count}


class MappingRow(BaseModel):
    inquiry_name: str = ""
    spec: str = ""
    product_code: str = ""
    quotation_name: str = ""


@router.get("/product-mapping")
async def list_product_mapping(
    q: str = "",
    page: int = 1,
    page_size: int = 100,
    _: None = Depends(get_admin_dep),
):
    return repository.fetch_product_mapping(q=q, page=page, page_size=page_size)


@router.post("/product-mapping")
async def create_mapping_row(body: MappingRow, _: None = Depends(get_admin_dep)):
    row_id = repository.insert_mapping_row(
        body.inquiry_name, body.spec, body.product_code, body.quotation_name
    )
    if row_id is None:
        raise HTTPException(status_code=503, detail="DB 不可用")
    admin_cache.invalidate_product_mapping()
    return {"id": row_id}


@router.put("/product-mapping/{row_id}")
async def update_mapping_row(row_id: int, body: MappingRow, _: None = Depends(get_admin_dep)):
    ok = repository.update_mapping_row(
        row_id, body.inquiry_name, body.spec, body.product_code, body.quotation_name
    )
    if ok is None:
        raise HTTPException(status_code=503, detail="数据库不可用或操作失败")
    if not ok:
        raise HTTPException(status_code=404, detail="记录不存在")
    admin_cache.invalidate_product_mapping()
    return {"ok": True}


@router.delete("/product-mapping/{row_id}")
async def delete_mapping_row(row_id: int, _: None = Depends(get_admin_dep)):
    ok = repository.delete_mapping_row(row_id)
    if ok is None:
        raise HTTPException(status_code=503, detail="数据库不可用或操作失败")
    if not ok:
        raise HTTPException(status_code=404, detail="记录不存在")
    admin_cache.invalidate_product_mapping()
    return {"ok": True}


@router.post("/product-mapping/upload")
async def upload_product_mapping(
    file: UploadFile = File(...),
    _: None = Depends(get_admin_dep),
):
    content = await _read_upload_limited(file)
    try:
        rows = parse_product_mapping(content)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Excel 解析失败: {e}") from e
    count = repository.replace_all_product_mapping(rows)
    admin_cache.invalidate_product_mapping()
    return {"imported": count}


@router.post("/libraries/upload")
async def upload_library(
    file: UploadFile = File(...),
    name: str = Form(""),
    _: None = Depends(get_admin_dep),
):
    """上传 Excel/CSV -> 检测 schema -> 动态建表 -> 注册。"""
    lib_name = (name or "").strip() or (file.filename or "未命名库").rsplit(".", 1)[0]
    content = await _read_upload_limited(file)
    filename = file.filename or ""
    parsed = _parse_generic(content, filename)
    if parsed["errors"]:
        raise HTTPException(status_code=400, detail="; ".join(parsed["errors"]))
    lib_id = repository.create_library_and_insert(
        name=lib_name,
        columns=parsed["columns"],
        rows=parsed["rows"],
    )
    if lib_id is None:
        raise HTTPException(status_code=503, detail="数据库不可用或建表失败")
    return {
        "id": lib_id,
        "name": lib_name,
        "columns": parsed["columns"],
        "warnings": parsed["warnings"],
        "imported": len(parsed["rows"]),
    }


@router.get("/libraries")
async def list_libraries(_: None = Depends(get_admin_dep)):
    return {"items": repository.list_libraries()}


@router.get("/libraries/{lib_id}/data")
async def get_library_data(
    lib_id: int,
    q: str = "",
    page: int = 1,
    page_size: int = Query(default=100, ge=1, le=1000),
    _: None = Depends(get_admin_dep),
):
    meta = repository.get_library_meta(lib_id)
    if meta is None:
        raise HTTPException(status_code=404, detail="库不存在")
    return repository.fetch_library_data(
        meta["table_name"], meta["columns"], q=q, page=page, page_size=page_size
    )


@router.post("/libraries/{lib_id}/data")
async def create_library_row(
    lib_id: int,
    body: dict,
    _: None = Depends(get_admin_dep),
):
    if not isinstance(body, dict):
        raise HTTPException(status_code=400, detail="请求体必须为 JSON 对象")
    meta = repository.get_library_meta(lib_id)
    if meta is None:
        raise HTTPException(status_code=404, detail="库不存在")
    row_id = repository.insert_library_row(meta["table_name"], meta["columns"], body)
    if row_id is None:
        raise HTTPException(status_code=503, detail="数据库不可用")
    return {"id": row_id}


@router.put("/libraries/{lib_id}/data/{row_id}")
async def update_library_data_row(
    lib_id: int,
    row_id: int,
    body: dict,
    _: None = Depends(get_admin_dep),
):
    if not isinstance(body, dict):
        raise HTTPException(status_code=400, detail="请求体必须为 JSON 对象")
    meta = repository.get_library_meta(lib_id)
    if meta is None:
        raise HTTPException(status_code=404, detail="库不存在")
    ok = repository.update_library_row(meta["table_name"], meta["columns"], row_id, body)
    if ok is None:
        raise HTTPException(status_code=503, detail="数据库不可用")
    if not ok:
        raise HTTPException(status_code=404, detail="行不存在")
    return {"ok": True}


@router.delete("/libraries/{lib_id}/data/{row_id}")
async def delete_library_data_row(
    lib_id: int,
    row_id: int,
    _: None = Depends(get_admin_dep),
):
    meta = repository.get_library_meta(lib_id)
    if meta is None:
        raise HTTPException(status_code=404, detail="库不存在")
    ok = repository.delete_library_row(meta["table_name"], row_id)
    if ok is None:
        raise HTTPException(status_code=503, detail="数据库不可用")
    if not ok:
        raise HTTPException(status_code=404, detail="行不存在")
    return {"ok": True}


@router.delete("/libraries/{lib_id}")
async def drop_library(lib_id: int, _: None = Depends(get_admin_dep)):
    meta = repository.get_library_meta(lib_id)
    if meta is None:
        raise HTTPException(status_code=404, detail="库不存在")
    ok = repository.drop_library(lib_id, meta["table_name"])
    if ok is None:
        raise HTTPException(status_code=503, detail="数据库不可用")
    return {"ok": True}
