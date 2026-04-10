from __future__ import annotations

from datetime import date
from typing import Any, Dict, List

from backend.tools.inventory.lib.api.client import AccurateOnlineAPIClient

INVOICE_FIELDS = "id,number,transDate,customer,description,statusName,age,totalAmount"


def ping_accurate() -> Dict[str, Any]:
    client = AccurateOnlineAPIClient()
    return client.get_db_list()


def fetch_sales_invoices(week_start: date, week_end: date, page_size: int = 100) -> List[Dict[str, Any]]:
    client = AccurateOnlineAPIClient()
    page = 1
    max_pages = 500
    items: List[Dict[str, Any]] = []
    last_page_ids: set[Any] | None = None

    while page <= max_pages:
        # sales-invoice/list.do ignores startDate/endDate; use BETWEEN + val[] like sales-order/list.do
        start_date = week_start.strftime("%d/%m/%Y")
        end_date = week_end.strftime("%d/%m/%Y")
        params = {
            "sp.page": page,
            "sp.pageSize": page_size,
            "fields": INVOICE_FIELDS,
            "filter.transDate.op": "BETWEEN",
            "filter.transDate.val[0]": start_date,
            "filter.transDate.val[1]": end_date,
        }
        payload = client.get("/api/sales-invoice/list.do", params=params, use_database_url=True)
        rows = payload.get("d", []) if isinstance(payload, dict) else []
        if not isinstance(rows, list):
            rows = []
        if not rows:
            break
        current_ids = {row.get("id") for row in rows if isinstance(row, dict)}
        if last_page_ids is not None and current_ids and current_ids == last_page_ids:
            break
        items.extend(rows)
        if len(rows) < page_size:
            break
        last_page_ids = current_ids
        page += 1

    return items

