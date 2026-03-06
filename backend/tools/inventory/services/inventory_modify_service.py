# 修改库存服务：锁定可售、增补库存；对接 ACCURATE bulk-save/save 或占位返回
"""
modify_inventory 执行逻辑论述
============================

一、入口与参数校验
  - 必填：code（物料编号）、action（lock | supplement）、quantity（≥0）。
  - code 为空 → 返回失败「请提供物料编号」。
  - action 非 lock/supplement → 返回失败「action 必须为 lock 或 supplement」。
  - quantity 解析为浮点数，小于 0 → 返回失败「quantity 不能为负数」；=0 仅对 supplement 有效（表示归零）。

二、action = lock（锁定可售）
  - 当前不调用 ACCURATE。bulk-save 接口无「预留/占用量」字段，锁定需后续对接销售单或预留接口。
  - 仅打日志并返回占位成功文案，请求参数（code/quantity/memo）被记录，便于后续对接。

三、action = supplement（增补或归零）
  1. 开关校验
     - 若环境变量 INVENTORY_MODIFY_ENABLED 未设置：不发起写请求，返回占位成功并记录请求。
     - 若客户端无 post_item_save：同上占位返回。
  2. 拉取物料主数据（_get_item_detail_for_save）
     - 调用 list.do：params 含 filter.no=code、fields=id,no，得到该物料的 id。
     - 调用 detail.do：params 含 id，得到完整物料详情 d。
     - 从 d 中抽取 bulk-save 必填：name、itemType（或 type.name）、unit1Name（或 vendorUnit.name）、itemCategoryName（或 category.name）；以及 data[0].id（用于更新已有物料，否则 ACCURATE 会视为新建并报「已存在该编码」）。
     - 从 d 中抽取 detailOpenBalance（或 openBalance）列表，收集每条记录的 id，供归零时 _status=delete 使用。
     - 任一步失败（list 无记录、detail 失败、d 无效）→ 返回「无法获取物料详情」。
  3. quantity = 0（归零）
     - 若 detail 未返回任何 detailOpenBalance 的 id → 返回失败「该物料无 opening balance 记录可删，请在 ACCURATE 中手动归零」。
     - 否则构造 bulk-save 请求体：data[0].id、data[0].no、name/itemType/unit1Name/itemCategoryName（必填），以及对每条 opening balance 记录：
       data[0].detailOpenBalance[i].id = 该条 id，data[0].detailOpenBalance[i]._status = "delete"。
     - POST bulk-save.do；成功则返回「已将物料 xxx 的用户仓/可售归零（已删除 opening balance 记录）」。
  4. quantity > 0（增补）
     - 构造 bulk-save 请求体：data[0].id、data[0].no、name/itemType/unit1Name/itemCategoryName，以及
       data[0].detailOpenBalance[0].quantity = quantity，itemUnitName、asOf（当前日期）、可选 warehouseName、可选 notes（memo）。
     - POST bulk-save.do；成功则返回「已增补库存：物料 xxx 数量 qty 单位」。

四、与界面对应关系
  - 本 tool 修改的 ACCURATE 数据对应界面「Qty (User Warehouse)」「Available to sell」。
  - 增补通过 detailOpenBalance 增加期初/数量；归零通过删除已有 detailOpenBalance 记录实现。
"""
from __future__ import annotations

import logging
import math
import os
from datetime import date
from typing import Any, Optional

logger = logging.getLogger(__name__)

ALLOWED_ACTIONS = ("lock", "supplement")


def _get_item_detail_for_save(client: Any, code: str) -> Optional[dict]:
    """
    按 code 拉取物料详情（list.do -> detail.do），返回 bulk-save 所需的必填字段。
    返回 dict 含 name, itemType, unit1Name, itemCategoryName（若 API 有返回）。
    """
    try:
        from backend.tools.inventory.config import config
        list_params = {"fields": "id,no", "filter.no": code}
        list_res = client.get("/api/item/list.do", params=list_params, use_database_url=True, timeout=config.API_TIMEOUT)
        if not list_res.get("s", False):
            logger.warning("list.do 未返回成功: %s", list_res)
            return None
        data_list = list_res.get("d", [])
        if isinstance(data_list, dict):
            data_list = data_list.get("r", [])
        if not isinstance(data_list, list) or not data_list:
            logger.warning("list.do 无记录: code=%s", code)
            return None
        first = data_list[0]
        item_id = first.get("id")
        if item_id is None:
            return None
        detail_res = client.get("/api/item/detail.do", params={"id": str(item_id)}, use_database_url=True, timeout=config.API_TIMEOUT)
        if not detail_res.get("s", False):
            logger.warning("detail.do 未返回成功: id=%s", item_id)
            return None
        d = detail_res.get("d")
        if not isinstance(d, dict):
            return None
        # 更新已有物料时 bulk-save 要求传 data[0].id，否则视为新建会报「已存在该编码」；id 可能是 int 或 str，原样保留
        raw_id = d.get("id")
        if raw_id is not None and isinstance(raw_id, str):
            try:
                raw_id = int(raw_id)
            except (TypeError, ValueError):
                pass  # 保留字符串，body 仍可提交
        # 抽取 bulk-save 必填：name, itemType, unit1Name, itemCategoryName
        name = (d.get("name") or "").strip()
        unit1 = (d.get("unit1Name") or "").strip()
        if not unit1 and isinstance(d.get("vendorUnit"), dict):
            unit1 = (d.get("vendorUnit", {}).get("name") or "").strip()
        if not unit1:
            unit1 = (d.get("unit") or "").strip() if isinstance(d.get("unit"), str) else ""
        if not unit1 and isinstance(d.get("unit"), dict):
            unit1 = (d.get("unit", {}).get("name") or "").strip()
        type_val = d.get("type")
        if isinstance(type_val, dict):
            item_type = (type_val.get("name") or "").strip() or (d.get("itemType") or d.get("itemTypeName") or "").strip()
        else:
            item_type = (d.get("itemType") or d.get("itemTypeName") or (type_val or "")).strip()
        if isinstance(item_type, str):
            item_type = item_type.strip()
        else:
            item_type = ""
        category = ""
        if isinstance(d.get("category"), dict):
            category = (d.get("category", {}).get("name") or "").strip()
        if not category:
            raw = d.get("itemCategoryName") or d.get("itemCategory")
            if isinstance(raw, dict):
                category = (raw.get("name") or "").strip()
            elif isinstance(raw, str):
                category = raw.strip()
        out: dict[str, Any] = {
            "id": raw_id,
            "name": name or f"Item {code}",
            "itemType": item_type or "Inventory",
            "unit1Name": unit1 or "PCS",
            "itemCategoryName": category or "General",
        }
        # 归零时需删除已有 opening balance 记录，detail 可能返回 detailOpenBalance 列表
        open_balance_list = d.get("detailOpenBalance") or d.get("openBalance") or []
        if isinstance(open_balance_list, list):
            out["detailOpenBalanceIds"] = [
                ob.get("id") for ob in open_balance_list
                if isinstance(ob, dict) and ob.get("id") is not None
            ]
        else:
            out["detailOpenBalanceIds"] = []
        return out
    except Exception as e:
        logger.exception("_get_item_detail_for_save 失败: %s", e)
        return None


def modify_inventory(
    code: str,
    action: str,
    quantity: float,
    memo: str = "",
    warehouse_name: str = "",
    unit_name: str = "",
) -> dict[str, Any]:
    """
    修改库存：锁定可售（lock）或增补（supplement）。
    目标字段对应界面：Qty (User Warehouse)、Available to sell。
    """
    # 参数校验：code 必填
    code = (code or "").strip()
    if not code:
        return {
            "success": False,
            "error": "缺少 code",
            "result": "请提供物料编号（code）。",
        }

    action = (action or "").strip().lower()
    if action not in ALLOWED_ACTIONS:
        return {
            "success": False,
            "error": f"非法 action: {action!r}",
            "result": f"action 必须为 lock 或 supplement，当前为 {action!r}。",
        }

    try:
        q = float(quantity) if quantity is not None else 0.0
    except (TypeError, ValueError):
        return {
            "success": False,
            "error": "quantity 解析失败",
            "result": "quantity 必须为有效数字，无法解析。",
        }
    if not math.isfinite(q):
        return {
            "success": False,
            "error": "quantity 非法",
            "result": "quantity 不能为 NaN 或无穷。",
        }
    if q < 0:
        return {
            "success": False,
            "error": "quantity 不能为负数",
            "result": "quantity 不能为负数。",
        }
    quantity = q

    # lock：bulk-save 无预留字段，始终占位
    if action == "lock":
        msg = (
            f"[占位] 锁定可售库存接口待对接（ACCURATE 可能为 sales-order 或预留接口），"
            f"请求已记录：code={code} quantity={quantity} memo={memo or '-'}"
        )
        logger.info("modify_inventory lock 占位: %s", msg)
        return {"success": True, "result": msg}

    # supplement：若未开启写白名单则占位；否则调用 client 白名单 POST
    if not os.getenv("INVENTORY_MODIFY_ENABLED", "").strip():
        msg = (
            f"[占位] 修改库存接口未对接或未开启（INVENTORY_MODIFY_ENABLED），"
            f"请求已记录：code={code} action=supplement quantity={quantity} memo={memo or '-'}"
        )
        logger.info("modify_inventory supplement 占位: %s", msg)
        return {"success": True, "result": msg}

    try:
        from backend.tools.inventory.lib.api.client import AccurateOnlineAPIClient

        client = AccurateOnlineAPIClient()
        if not hasattr(client, "post_item_save"):
            msg = (
                f"[占位] 客户端尚未支持 post_item_save，"
                f"请求已记录：code={code} action=supplement quantity={quantity}"
            )
            return {"success": True, "result": msg}

        # bulk-save 必填：data[n].itemCategoryName, itemType, name, unit1Name；先拉 detail 补全
        detail_fields = _get_item_detail_for_save(client, code)
        if not detail_fields:
            return {
                "success": False,
                "error": "无法获取物料详情（list/detail.do）",
                "result": "无法获取该物料详情，请确认物料编号有效且 API 可访问。",
            }

        warehouse_name = (warehouse_name or "").strip() or os.getenv("INVENTORY_DEFAULT_WAREHOUSE", "").strip()
        unit_name = (unit_name or "").strip() or os.getenv("INVENTORY_DEFAULT_UNIT", "") or detail_fields.get("unit1Name", "PCS")
        as_of = date.today().strftime("%d/%m/%Y")
        open_balance_ids: list = detail_fields.get("detailOpenBalanceIds") or []

        # quantity=0：归零需删除已有 opening balance 记录（_status=delete）
        if quantity == 0:
            if not open_balance_ids:
                return {
                    "success": False,
                    "error": "detail 未返回 opening balance 记录 id，无法通过 API 归零",
                    "result": "该物料无 opening balance 记录可删，或 detail 接口未返回。请在 ACCURATE 中手动将用户仓/可售改为 0。",
                }
            body = {
                "data[0].no": code,
                "data[0].name": detail_fields["name"],
                "data[0].itemType": detail_fields["itemType"],
                "data[0].unit1Name": detail_fields["unit1Name"],
                "data[0].itemCategoryName": detail_fields["itemCategoryName"],
            }
            if detail_fields.get("id") is not None:
                body["data[0].id"] = detail_fields["id"]
            if memo:
                body["data[0].notes"] = memo
            for i, ob_id in enumerate(open_balance_ids):
                body[f"data[0].detailOpenBalance[{i}].id"] = ob_id
                body[f"data[0].detailOpenBalance[{i}]._status"] = "delete"
            result = client.post_item_save(body, bulk=True)
            if result.get("s"):
                return {"success": True, "result": f"已将物料 {code} 的用户仓/可售归零（已删除 opening balance 记录）。"}
            err_msg = result.get("errmsg") or result.get("message") or str(result)
            return {"success": False, "error": err_msg, "result": f"ACCURATE 归零失败：{err_msg}"}

        body = {
            "data[0].no": code,
            "data[0].name": detail_fields["name"],
            "data[0].itemType": detail_fields["itemType"],
            "data[0].unit1Name": detail_fields["unit1Name"],
            "data[0].itemCategoryName": detail_fields["itemCategoryName"],
            "data[0].detailOpenBalance[0].quantity": quantity,
            "data[0].detailOpenBalance[0].itemUnitName": unit_name,
            "data[0].detailOpenBalance[0].asOf": as_of,
        }
        if detail_fields.get("id") is not None:
            body["data[0].id"] = detail_fields["id"]
        if warehouse_name:
            body["data[0].detailOpenBalance[0].warehouseName"] = warehouse_name
        if memo:
            body["data[0].notes"] = memo

        result = client.post_item_save(body, bulk=True)
        if result.get("s"):
            return {
                "success": True,
                "result": f"已增补库存：物料 {code} 数量 {quantity} {unit_name}。",
            }
        err_msg = result.get("errmsg") or result.get("message") or str(result)
        return {
            "success": False,
            "error": err_msg,
            "result": f"ACCURATE 返回错误：{err_msg}",
        }
    except Exception as e:
        logger.exception("modify_inventory supplement 调用失败")
        return {
            "success": False,
            "error": str(e),
            "result": f"增补库存失败: {e}",
        }
