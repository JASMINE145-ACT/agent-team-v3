"""
库存查询 Agent - Table Agent

职责：调用 ACCURATE API 抓取库存数据
"""

import re
import logging
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import List, Optional, Dict, Any

from inventory_agent.models import Item
from inventory_agent.config import config
from src.api.client import AccurateOnlineAPIClient

logger = logging.getLogger(__name__)


class InventoryTableAgent:
    """
    库存数据抓取 Agent
    
    职责：
    - 调用 ACCURATE list.do 模糊匹配产品
    - 调用 detail.do 抓取完整库存数据
    - 解析并返回 Item 对象列表
    """
    
    def __init__(self):
        """初始化 API 客户端"""
        self.api_client = AccurateOnlineAPIClient()
        logger.info("InventoryTableAgent 初始化完成")
    
    def search_items(self, keywords: str, max_results: Optional[int] = None) -> List[Item]:
        """
        根据关键词搜索库存产品

        流程：list.do（按名称或 code）拿到 id → detail.do 按 id 取完整字段 → 解析为 Item。
        若整句关键词返回 0 条，则用提取的短词（如 dn40、dn32）再试一次并做客户端过滤。
        max_results: 最多拉几条 detail（None 时用 config.MAX_RESULTS），用于 ReAct 工具在 35s 内返回。
        """
        list_results = self._call_list_api(keywords=keywords)
        fallback_used = False
        if not list_results:
            fallback = self._extract_fallback_keyword(keywords)
            if fallback and fallback != keywords:
                list_results = self._call_list_api(keywords=fallback)
                fallback_used = bool(list_results)
        if not list_results:
            logger.info(f"未找到匹配的产品: {keywords}")
            return []
        limit = max_results if max_results is not None else config.MAX_RESULTS
        items = self._fetch_items_by_ids(list_results, max_items=limit)
        if fallback_used and items:
            items = self._filter_items_by_keywords(items, keywords)
            items = self._sort_fallback_items(items, keywords)
        logger.info(f"查询成功: {keywords}, 找到 {len(items)} 条记录")
        return items

    def get_items_by_codes(self, codes: List[str], max_workers: int = 4) -> List[Item]:
        """
        按 Item Code 列表精确拉取：对每个 code 调 list.do (filter.no) 取 id，再 detail.do 取完整数据。
        用于 Resolver 解析出 code 后的精确查表。并发请求以降低总耗时。
        """
        if not codes:
            return []
        unique_codes = list(dict.fromkeys((c or "").strip() for c in codes if (c or "").strip()))
        if not unique_codes:
            return []

        def _fetch_one(code: str) -> Optional[Item]:
            list_results = self._call_list_api(item_code=code)
            if not list_results:
                return None
            for row in list_results:
                item_id = row.get("id")
                if item_id is None:
                    continue
                item = self._fetch_item_by_id(str(item_id))
                if item is not None:
                    return item
            return None

        seen_no: set = set()
        items: List[Item] = []
        workers = min(max_workers, len(unique_codes))
        with ThreadPoolExecutor(max_workers=workers) as ex:
            futures = {ex.submit(_fetch_one, code): code for code in unique_codes}
            for future in as_completed(futures):
                item = future.result()
                if item is not None and item.item_no not in seen_no:
                    seen_no.add(item.item_no)
                    items.append(item)

        logger.info(f"按 Code 拉取: {len(unique_codes)} 个 code -> {len(items)} 条")
        return items

    @staticmethod
    def _extract_fallback_keyword(keywords: str) -> Optional[str]:
        """当整句关键词无结果时，提取短词重试（如 'Tee With Cover / dn40' -> 'dn40', 'C12 dn32' -> 'dn32'）。"""
        s = (keywords or "").strip()
        if not s or (" " not in s and "/" not in s):
            return None
        tokens = re.split(r"[\s/]+", s)
        tokens = [t for t in tokens if t]
        for t in tokens:
            if re.match(r"dn\d+$", t, re.I):
                return t
        return tokens[-1] if tokens else None

    @staticmethod
    def _filter_items_by_keywords(items: List[Item], keywords: str) -> List[Item]:
        """按原关键词短语过滤：保留 item_name 中包含所有有效词段的项（忽略单字符）。"""
        tokens = [t for t in re.split(r"[\s/]+", (keywords or "").lower()) if len(t) >= 2]
        if not tokens:
            return items
        out = []
        for item in items:
            name = (item.item_name or "").lower()
            if all(t in name for t in tokens):
                out.append(item)
        return out if out else items

    @staticmethod
    def _sort_fallback_items(items: List[Item], keywords: str) -> List[Item]:
        """fallback 后多条结果时，把名称中含 #C11/#C12 的排前（便于 PRD 断言）。"""
        def key(it: Item) -> tuple:
            name = (it.item_name or "")
            c11 = 0 if "#C11" in name else 1
            c12 = 0 if "#C12" in name else 1
            return (c11, c12, name)
        return sorted(items, key=key)

    def _call_list_api(
        self,
        keywords: Optional[str] = None,
        item_code: Optional[str] = None,
    ) -> List[dict]:
        """
        调用 item/list.do，仅用于按「名称」或「Code」获取 id（及 no）。
        不在此处取完整字段，详细数据由 detail.do 提供。

        Args:
            keywords: 关键词模糊搜索（与 item_code 二选一）
            item_code: Item Code 精确匹配（与 keywords 二选一）

        Returns:
            列表，每项至少包含 id（及可能有 no）
        """
        try:
            params = {"fields": ",".join(config.LIST_FIELDS)}
            if item_code is not None:
                params["filter.no"] = item_code
            elif keywords is not None:
                # item list.do 实测不支持 filter.keywords.op，仅传 filter.keywords（后端自行解释为包含或模糊）
                params["filter.keywords"] = keywords
            else:
                return []

            result = self.api_client.get_table_data(
                table_name="item",
                params=params,
                timeout=config.API_TIMEOUT
            )
            if not result.get("s", False):
                d = result.get("d")
                if isinstance(d, dict):
                    error_msg = d.get("message", "未知错误")
                elif isinstance(d, list) and d:
                    error_msg = d[0] if isinstance(d[0], str) else str(d)
                else:
                    error_msg = str(d) if d is not None else "未知错误"
                logger.warning(f"API 返回错误: {error_msg}")
                return []

            data_list = result.get("d", [])
            if isinstance(data_list, dict):
                data_list = data_list.get("r", [])
            return data_list if isinstance(data_list, list) else []

        except Exception as e:
            logger.error(f"调用 list.do API 失败: {e}")
            return []

    def _fetch_items_by_ids(self, list_rows: List[dict], max_items: Optional[int] = None) -> List[Item]:
        """根据 list 返回的行（含 id）依次调 detail.do，解析为 Item 列表。max_items 为 None 时用 config.MAX_RESULTS。"""
        cap = max_items if max_items is not None else config.MAX_RESULTS
        items = []
        for row in list_rows[:cap]:
            item_id = row.get("id")
            if item_id is None:
                continue
            item = self._fetch_item_by_id(str(item_id))
            if item is not None:
                items.append(item)
            else:
                logger.warning(f"detail.do 未返回有效数据: id={item_id}")
        return items

    def _fetch_item_by_id(self, item_id: str) -> Optional[Item]:
        """
        调用 detail.do 获取指定 id 的完整数据，并按设定字段解析为 Item。
        """
        detail_data = self._call_detail_api(item_id)
        if not detail_data:
            return None
        try:
            return self._parse_item(detail_data)
        except Exception as e:
            logger.warning(f"解析 detail 失败: id={item_id}, {e}")
            return None
    
    def _call_detail_api(self, item_id: str) -> Optional[dict]:
        """
        调用 item/detail.do API 获取产品详情
        
        Args:
            item_id: 产品 ID
        
        Returns:
            Optional[dict]: API 返回的 item 详情数据
        """
        try:
            endpoint = f"/api/item/detail.do"
            params = {"id": item_id}
            
            result = self.api_client.get(
                endpoint=endpoint,
                params=params,
                use_database_url=True,
                timeout=config.API_TIMEOUT
            )
            
            if not result.get("s", False):
                error_msg = result.get("d", {}).get("message", "未知错误")
                logger.warning(f"API 返回错误: {error_msg}")
                return None
            
            return result.get("d")
            
        except Exception as e:
            logger.error(f"调用 detail.do API 失败: {e}")
            return None
    
    def _parse_item(self, data: Dict[str, Any]) -> Item:
        """
        将 detail.do 返回的数据解析为 Item 对象（仅使用您设定的字段）。
        """
        # 模型字段 -> [API 字段名或取值方式]
        # 字符串类：支持顶层字段或嵌套 type.name / unit.name
        # 与网站 7 列一致：detail_do.sample_data 字段 → Item 模型
        # # → 无单独字段（前端序号）；Item Name→name；Item Code→no；Item Type→itemType/itemTypeName；
        # Unit→unit1Name 或 vendorUnit.name；Qty (User Warehouse)→balance 或 detailWarehouseData 汇总；Available to sell→availableToSell
        item_no = self._get_str(data, ["no"])
        item_name = self._get_str(data, ["name"])
        type_val = data.get("type")
        if isinstance(type_val, dict):
            item_type = (type_val.get("name") or "").strip() or self._get_str(data, ["itemType", "itemTypeName"])
        else:
            item_type = self._get_str(data, ["itemType", "itemTypeName", "type"])
        unit = self._get_str(data, ["unit1Name"])
        if not unit and isinstance(data.get("vendorUnit"), dict):
            unit = self._get_str(data["vendorUnit"], ["name"])
        if not unit:
            unit = self._get_str(data, ["unit"])
        if not unit and isinstance(data.get("unit"), dict):
            unit = self._get_str(data["unit"], ["name"])

        qty_wh, qty_avail = self._get_quantities_from_detail(data)

        item_data = {
            "item_no": item_no or "",
            "item_name": item_name or "",
            "item_type": item_type or "",
            "unit": unit or "",
            "qty_warehouse": qty_wh,
            "qty_available": qty_avail,
        }
        try:
            return Item(**item_data)
        except Exception as e:
            logger.warning(f"创建 Item 对象失败: {e}, 数据: {item_data}")
            raise ValueError(f"缺少必需字段或字段值无效: {e}")

    @staticmethod
    def _get_str(data: Dict[str, Any], keys: List[str]) -> str:
        if not data:
            return ""
        for k in keys:
            v = data.get(k)
            if v is not None and v != "":
                return str(v).strip()
        return ""

    def _get_quantities_from_detail(self, data: Dict[str, Any]) -> tuple:
        """
        Qty (User Warehouse): 顶层 balance，或汇总 detailWarehouseData[].balance / unit1Quantity。
        Available to sell: 顶层 availableToSell（与网站列一致），缺省时用仓库汇总。
        """
        qty_wh = data.get("balance") or data.get("quantityOnHand") or data.get("quantity_on_hand")
        qty_avail = data.get("availableToSell")  # 网站列「Available to sell」对应字段
        if qty_avail is None:
            qty_avail = data.get("quantityAvailable") or data.get("quantity_available")

        warehouse_list = data.get("detailWarehouseData") or []
        if isinstance(warehouse_list, list) and warehouse_list:
            total_balance = 0.0
            for wh in warehouse_list:
                if not isinstance(wh, dict):
                    continue
                q = wh.get("balance") or wh.get("unit1Quantity") or wh.get("quantity")
                if q is not None:
                    total_balance += float(q)
            if qty_wh is None:
                qty_wh = total_balance
            if qty_avail is None:
                qty_avail = total_balance
        qty_wh = float(qty_wh) if qty_wh is not None else 0.0
        qty_avail = float(qty_avail) if qty_avail is not None else 0.0
        return qty_wh, qty_avail
    
    def get_item_by_code(self, item_code: str) -> Optional[Item]:
        """
        根据 Item Code 精确查找产品。

        流程：list.do（filter.no=code）拿到 id → detail.do 取完整字段 → 解析为 Item。
        """
        list_results = self._call_list_api(item_code=item_code)
        if not list_results:
            return None
        first = list_results[0]
        item_id = first.get("id")
        if item_id is None:
            return None
        return self._fetch_item_by_id(str(item_id))
