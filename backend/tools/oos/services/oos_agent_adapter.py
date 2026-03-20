"""
无货（OOS）工具执行函数适配层。

原先位于 `backend/agent/tools_oos.py`，现迁至 tools 层，agent 层仅作为薄封装调用。
"""
import logging
from pathlib import Path
from typing import Dict, Optional

from backend.server.api.deps import get_oos_data_service

logger = logging.getLogger(__name__)


def _run_oos_list(limit: int = 100) -> dict:
    try:
        ds = get_oos_data_service()
        records = ds.get_all_records(limit=limit * 5)
        if not records:
            return {"success": True, "result": "暂无无货产品记录。"}
        by_key: Dict[str, dict] = {}
        for r in records:
            key = r.get("product_key") or ""
            if not key:
                continue
            cnt = r.get("count") or 1
            if key not in by_key or (by_key[key].get("count") or 0) < cnt:
                by_key[key] = r
        product_list = list(by_key.values())[:limit]
        lines = ["## 无货产品列表\n"]
        for i, r in enumerate(product_list[:50]):
            name = r.get("product_name", "")
            spec = r.get("specification", "") or ""
            unit = r.get("unit", "") or ""
            qty = r.get("quantity", "")
            count = r.get("count") or 1
            email_status = r.get("email_status") or "pending"
            email_label = "已发送" if (email_status == "sent" or (r.get("email_sent_count") or 0) > 0) else "未发"
            lines.append(
                f"  {i+1}. {name} {spec} | 数量: {qty} {unit} | **被报无货 {count} 次** | 邮件: {email_label}"
            )
        if len(product_list) > 50:
            lines.append(f"\n... 共 {len(product_list)} 个无货产品，仅展示前 50 个")
        return {"success": True, "result": "\n".join(lines)}
    except Exception as e:  # noqa: BLE001
        logger.exception("get_oos_list 失败")
        return {"success": False, "result": f"查询失败: {e}"}


def _run_oos_stats() -> dict:
    try:
        ds = get_oos_data_service()
        stats = ds.get_statistics()
        result = (
            f"## 无货产品统计\n"
            f"- 总记录数: {stats.get('total_records', 0)}\n"
            f"- 无货产品数: {stats.get('out_of_stock_count', 0)}\n"
            f"- 被报无货≥2 次的产品数: {stats.get('notified_count', 0)}\n"
            f"- 已发邮件产品数: {stats.get('email_sent_product_count', 0)}\n"
            f"- 今日新增: {stats.get('today_count', 0)}\n"
        )
        return {"success": True, "result": result}
    except Exception as e:  # noqa: BLE001
        logger.exception("get_oos_stats 失败")
        return {"success": False, "result": str(e)}


def _run_oos_by_file(limit: int = 50) -> dict:
    try:
        ds = get_oos_data_service()
        files = ds.get_files_summary()
        if not files:
            return {"success": True, "result": "## 无货按文件统计\n暂无按文件的记录。"}
        lines = ["## 无货按文件统计\n"]
        for i, f in enumerate(files[:limit]):
            name = f.get("file_name", "")
            total = f.get("total_records", 0)
            at = f.get("uploaded_at", "") or ""
            if at and len(at) > 19:
                at = at[:10] + " " + at[11:19]
            lines.append(f"  {i+1}. {name} | 记录数: {total} | 上传: {at}")
        if len(files) > limit:
            lines.append(f"\n... 共 {len(files)} 个文件，仅展示前 {limit} 个")
        return {"success": True, "result": "\n".join(lines)}
    except Exception as e:  # noqa: BLE001
        logger.exception("get_oos_by_file 失败")
        return {"success": False, "result": str(e)}


def _run_oos_by_time(last_n_days: int = 30) -> dict:
    try:
        ds = get_oos_data_service()
        rows = ds.get_records_grouped_by_date(last_n_days=last_n_days)
        if not rows:
            return {"success": True, "result": f"## 无货按时间统计（最近 {last_n_days} 天）\n暂无记录。"}
        lines = [f"## 无货按时间统计（最近 {last_n_days} 天）\n"]
        for r in rows[:60]:
            lines.append(f"  {r.get('date', '')} | 新增记录: {r.get('count', 0)}")
        if len(rows) > 60:
            lines.append(f"\n... 共 {len(rows)} 天有数据，仅展示前 60 天")
        return {"success": True, "result": "\n".join(lines)}
    except Exception as e:  # noqa: BLE001
        logger.exception("get_oos_by_time 失败")
        return {"success": False, "result": str(e)}


def _run_register_oos(file_path: str, context: Optional[Dict] = None, prompt: Optional[str] = None) -> dict:
    try:
        from backend.tools.oos.services.agent_runner import run_quotation_agent

        file_path = (file_path or "").strip()
        if not file_path and context:
            file_path = (context.get("file_path") or "").strip()
        if not file_path:
            return {
                "success": False,
                "result": "无货登记需要 file_path，请先上传报价单并在 context 中提供 file_path。",
            }
        if not Path(file_path).exists():
            return {"success": False, "result": f"文件不存在: {file_path}"}
        file_name = (context or {}).get("file_name") or Path(file_path).name
        prompt = prompt or (context or {}).get("prompt") or "抓取这份报价单的无货数据，把选中的持久化到数据库。"
        out = run_quotation_agent(file_path=file_path, question=prompt, file_name=file_name)
        if out.get("error"):
            return {"success": False, "result": out.get("answer", "") or out["error"]}
        return {"success": True, "result": out.get("answer", "无货登记完成。")}
    except Exception as e:  # noqa: BLE001
        logger.exception("register_oos 失败")
        return {"success": False, "result": str(e)}


__all__ = [
    "_run_oos_list",
    "_run_oos_stats",
    "_run_oos_by_file",
    "_run_oos_by_time",
    "_run_register_oos",
]

