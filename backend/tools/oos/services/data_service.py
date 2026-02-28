"""
数据服务模块（数据库操作）
"""
import re
import logging
from datetime import datetime
from typing import List, Optional, Dict
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, func, select, text
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from sqlalchemy.exc import IntegrityError, OperationalError
from sqlalchemy.pool import QueuePool, StaticPool
import time

from backend.tools.oos.config import DB_PATH, DB_URL, EMAIL_COOLDOWN_HOURS
from backend.tools.oos.models import OutOfStockProduct, OutOfStockRecord
from backend.tools.oos.services.oos_repository import insert_oos_record

logger = logging.getLogger(__name__)

Base = declarative_base()


class OutOfStockRecordDB(Base):
    """数据库表模型"""
    __tablename__ = "out_of_stock_records"

    id = Column(Integer, primary_key=True, autoincrement=True)
    product_name = Column(String(500), nullable=False)
    specification = Column(String(500), nullable=True)
    unit = Column(String(50), nullable=True)
    quantity = Column(Float, nullable=False)
    sheet_name = Column(String(200), nullable=True)
    file_name = Column(String(500), nullable=False, index=True)  # 添加索引便于按文件查询
    uploaded_at = Column(DateTime, nullable=False, default=datetime.now, index=True)  # 添加索引便于按时间查询
    product_key = Column(String(1000), nullable=False, index=True)
    count = Column(Integer, nullable=False, default=1)

    # 邮件相关字段（向后兼容，都是可选）
    last_email_sent_at = Column(DateTime, nullable=True)
    email_status = Column(String(20), nullable=True, default='pending')  # 'pending'/'sent'/'failed'
    email_sent_by = Column(String(100), nullable=True)  # 发送人
    email_sent_count = Column(Integer, nullable=False, default=0)  # 发送次数

    # 文件批次与删除标记（向后兼容）
    upload_batch_id = Column(String(50), nullable=True, index=True)  # 上传批次 ID
    is_deleted = Column(Integer, nullable=False, default=0)  # 软删除：0=正常，1=已删除


class ShortageRecordDB(Base):
    """缺货记录表（与无货记录同一逻辑：Work 匹配后库存不足写入，看板展示统计/按文件/按时间；两次缺货发邮件与无货对齐）"""
    __tablename__ = "shortage_records"

    id = Column(Integer, primary_key=True, autoincrement=True)
    product_name = Column(String(500), nullable=False)
    specification = Column(String(500), nullable=True)
    quantity = Column(Float, nullable=False)  # 需求数量
    available_qty = Column(Float, nullable=False, default=0)  # 可用库存
    shortfall = Column(Float, nullable=False, default=0)  # 缺口
    code = Column(String(100), nullable=True)  # 物料编号
    quote_name = Column(String(500), nullable=True)
    unit_price = Column(Float, nullable=True)
    file_name = Column(String(500), nullable=False, index=True)
    uploaded_at = Column(DateTime, nullable=False, default=datetime.now, index=True)
    product_key = Column(String(1000), nullable=False, index=True)
    count = Column(Integer, nullable=False, default=1)  # 该产品被报缺货次数
    is_deleted = Column(Integer, nullable=False, default=0)

    # 邮件相关（与无货对齐：count>=2 触发、冷却、已发标记）
    last_email_sent_at = Column(DateTime, nullable=True)
    email_status = Column(String(20), nullable=True, default='pending')
    email_sent_by = Column(String(100), nullable=True)
    email_sent_count = Column(Integer, nullable=False, default=0)


class UploadSession(Base):
    """上传会话记录表（可选，用于溯源）"""
    __tablename__ = "upload_sessions"

    batch_id = Column(String(50), primary_key=True)
    file_name = Column(String(500), nullable=False)
    uploaded_by = Column(String(100), nullable=True)  # 上传人
    uploaded_at = Column(DateTime, nullable=False, default=datetime.now)
    analysis_mode = Column(String(20), nullable=True)  # 'pipeline' or 'agent'
    total_records = Column(Integer, nullable=False, default=0)
    status = Column(String(20), nullable=False, default='success')  # 'success'/'failed'
    error_message = Column(String(2000), nullable=True)


class DataService:
    """数据服务"""

    def _create_sqlite_engine(self):
        from sqlalchemy.pool import StaticPool
        return create_engine(
            f"sqlite:///{DB_PATH}",
            poolclass=StaticPool,
            connect_args={"check_same_thread": False}
        )

    def __init__(self):
        # 仅在启动/首次使用时执行一次；不可达时回退 SQLite，避免每次请求都重试 Postgres。
        if DB_URL:
            try:
                self.engine = create_engine(
                    DB_URL,
                    poolclass=QueuePool,
                    pool_size=10,
                    max_overflow=20,
                    pool_pre_ping=True,
                    connect_args={"sslmode": "require"},
                )
                Base.metadata.create_all(self.engine)
                self.using_postgres = True
                logger.info("Connected to Postgres successfully (OOS/Shortage)")
            except OperationalError as e:
                logger.error(
                    "Postgres unreachable, falling back to SQLite: %s",
                    e,
                    exc_info=False,
                )
                self.engine = self._create_sqlite_engine()
                Base.metadata.create_all(self.engine)
                self.using_postgres = False
        else:
            self.engine = self._create_sqlite_engine()
            Base.metadata.create_all(self.engine)
            self.using_postgres = False

        # 迁移：为已有表补充新列（仅 SQLite；Postgres 由 create_all 处理）
        self._migrate_add_columns_if_needed()

        # 创建 Session
        self.SessionLocal = sessionmaker(bind=self.engine)

    def _migrate_add_columns_if_needed(self) -> None:
        """为已有 out_of_stock_records 表补充新列，兼容旧数据库"""
        if self.engine.dialect.name != "sqlite":
            return  # PostgreSQL 等由 create_all 或独立迁移处理
        with self.engine.connect() as conn:
            try:
                r = conn.execute(text("PRAGMA table_info(out_of_stock_records)"))
                existing = {row[1] for row in r.fetchall()}
            except Exception:
                existing = set()
            # 需补充的列（含 last_email_sent_at，与无货登记系统一致）
            alters = [
                ("last_email_sent_at", "ALTER TABLE out_of_stock_records ADD COLUMN last_email_sent_at DATETIME"),
                ("email_status", "ALTER TABLE out_of_stock_records ADD COLUMN email_status VARCHAR(20) DEFAULT 'pending'"),
                ("email_sent_by", "ALTER TABLE out_of_stock_records ADD COLUMN email_sent_by VARCHAR(100)"),
                ("email_sent_count", "ALTER TABLE out_of_stock_records ADD COLUMN email_sent_count INTEGER NOT NULL DEFAULT 0"),
                ("upload_batch_id", "ALTER TABLE out_of_stock_records ADD COLUMN upload_batch_id VARCHAR(50)"),
                ("is_deleted", "ALTER TABLE out_of_stock_records ADD COLUMN is_deleted INTEGER NOT NULL DEFAULT 0"),
            ]
            for col, sql in alters:
                if col not in existing:
                    try:
                        conn.execute(text(sql))
                        conn.commit()
                        logger.info("迁移: 已添加列 out_of_stock_records.%s", col)
                    except Exception as e:
                        logger.warning("迁移添加列 %s 失败（可能已存在）: %s", col, e)
            # 补充 upload_batch_id 索引（若列为新加）
            if "upload_batch_id" not in existing:
                try:
                    conn.execute(text(
                        "CREATE INDEX IF NOT EXISTS ix_out_of_stock_records_upload_batch_id "
                        "ON out_of_stock_records (upload_batch_id)"
                    ))
                    conn.commit()
                except Exception as e:
                    logger.debug("创建 upload_batch_id 索引: %s", e)

    def _generate_product_key(self, product_name: str, specification: Optional[str]) -> str:
        """生成 product_key（规格标准化：统一小写、去除规格内部空格，使 DN40/DN 40 视为同一产品）"""
        name = product_name.strip().lower()
        spec = (specification.strip().lower() if specification else "")
        spec = re.sub(r"\s+", "", spec)
        return f"{name}|{spec}"
    
    def insert_record(
        self,
        product: OutOfStockProduct,
        sheet_name: str,
        file_name: str,
        max_retries: int = 3,
        upload_batch_id: Optional[str] = None
    ) -> int:
        """
        插入记录（线程安全，含并发控制）

        Args:
            product: 无货产品信息
            sheet_name: Sheet 名称
            file_name: 文件名
            max_retries: 最大重试次数
            upload_batch_id: 上传批次 ID（可选，用于文件溯源）

        Returns:
            新的 count 值
        """
        product_key = self._generate_product_key(product.product_name, product.specification)

        session = self.SessionLocal()
        try:
            for attempt in range(max_retries):
                try:
                    # 查询当前最大 count（使用事务保证一致性）
                    stmt = select(func.max(OutOfStockRecordDB.count)).where(
                        OutOfStockRecordDB.product_key == product_key
                    )
                    max_count = session.execute(stmt).scalar() or 0
                    new_count = max_count + 1

                    # 插入新记录
                    record = OutOfStockRecordDB(
                        product_name=product.product_name,
                        specification=product.specification,
                        unit=product.unit or "",
                        quantity=product.quantity if product.quantity is not None else 0.0,
                        sheet_name=sheet_name,
                        file_name=file_name,
                        uploaded_at=datetime.now(),
                        product_key=product_key,
                        count=new_count,
                        upload_batch_id=upload_batch_id  # 新增：批次 ID
                    )
                    session.add(record)
                    session.commit()

                    return new_count
                
                except IntegrityError:
                    session.rollback()
                    if attempt == max_retries - 1:
                        raise
                    time.sleep(0.1 * (attempt + 1))  # 短暂延迟后重试
            
        finally:
            session.close()
        
        raise Exception("插入失败，已重试多次")
    
    def should_trigger_email(self, product_key: str, current_count: int) -> bool:
        """
        判断是否应该触发邮件

        改进逻辑：
        1. count 首次等于 2 时，检查是否已发送过邮件
        2. 如果从未发送过，返回 True
        3. 如果已发送过，根据 cooldown 时间判断是否再次发送

        Args:
            product_key: 产品 key
            current_count: 当前 count

        Returns:
            是否应该发送邮件
        """
        # count < 2 不发送
        if current_count < 2:
            return False

        session = self.SessionLocal()
        try:
            # 查询该产品是否已发送过邮件
            stmt = select(
                func.max(OutOfStockRecordDB.last_email_sent_at),
                func.max(OutOfStockRecordDB.email_sent_count)
            ).where(
                OutOfStockRecordDB.product_key == product_key
            )
            result = session.execute(stmt).first()
            last_sent = result[0] if result else None
            sent_count = result[1] if result and result[1] else 0

            # 从未发送过，且 count >= 2，触发
            if sent_count == 0:
                return True

            # 已发送过，检查 cooldown
            if last_sent is None:
                return True  # 数据不一致，触发

            cooldown_seconds = max(0, EMAIL_COOLDOWN_HOURS) * 3600
            if cooldown_seconds == 0:
                return False  # 0 表示仅首次发

            # 距离上次发送超过 cooldown 时间，再次触发
            if (datetime.now() - last_sent).total_seconds() > cooldown_seconds:
                return True

            return False

        finally:
            session.close()
    
    def mark_email_sent(self, product_key: str, sent_by: Optional[str] = None, status: str = 'sent'):
        """
        标记邮件已发送

        Args:
            product_key: 产品 key
            sent_by: 发送人（可选，如 'system' 或用户名）
            status: 邮件状态（'sent' 或 'failed'）
        """
        session = self.SessionLocal()
        try:
            now = datetime.now()

            # 更新该产品的所有记录（确保 count 一致性）
            records = session.query(OutOfStockRecordDB).filter_by(
                product_key=product_key
            ).all()

            for record in records:
                record.last_email_sent_at = now
                record.email_status = status
                if sent_by:
                    record.email_sent_by = sent_by
                # 只在成功发送时增加计数
                if status == 'sent':
                    record.email_sent_count = (record.email_sent_count or 0) + 1

            session.commit()
        finally:
            session.close()

    def should_trigger_email_shortage(self, product_key: str, current_count: int) -> bool:
        """缺货：与无货同一逻辑，count>=2 且未发过或已过冷却则触发发信。"""
        if current_count < 2:
            return False
        session = self.SessionLocal()
        try:
            stmt = select(
                func.max(ShortageRecordDB.last_email_sent_at),
                func.max(ShortageRecordDB.email_sent_count)
            ).where(ShortageRecordDB.product_key == product_key)
            result = session.execute(stmt).first()
            last_sent = result[0] if result else None
            sent_count = result[1] if result and result[1] else 0
            if sent_count == 0:
                return True
            if last_sent is None:
                return True
            cooldown_seconds = max(0, EMAIL_COOLDOWN_HOURS) * 3600
            if cooldown_seconds == 0:
                return False
            if (datetime.now() - last_sent).total_seconds() > cooldown_seconds:
                return True
            return False
        finally:
            session.close()

    def mark_email_sent_shortage(self, product_key: str, sent_by: Optional[str] = None, status: str = 'sent'):
        """缺货：标记该 product_key 已发邮件（与无货 mark_email_sent 对齐）。"""
        session = self.SessionLocal()
        try:
            now = datetime.now()
            records = session.query(ShortageRecordDB).filter_by(product_key=product_key).all()
            for record in records:
                record.last_email_sent_at = now
                record.email_status = status
                if sent_by:
                    record.email_sent_by = sent_by
                if status == 'sent':
                    record.email_sent_count = (record.email_sent_count or 0) + 1
            session.commit()
        finally:
            session.close()

    def delete_record(self, record_id: int) -> bool:
        """
        软删除单条记录

        Args:
            record_id: 记录 ID

        Returns:
            是否删除成功
        """
        session = self.SessionLocal()
        try:
            record = session.query(OutOfStockRecordDB).filter_by(id=record_id).first()
            if record:
                record.is_deleted = 1
                session.commit()
                return True
            return False
        except Exception as e:
            logger.error("Delete record failed: %s", e)
            session.rollback()
            return False
        finally:
            session.close()

    def batch_delete_records(self, record_ids: List[int]) -> int:
        """
        批量软删除记录

        Args:
            record_ids: 记录 ID 列表

        Returns:
            删除成功的数量
        """
        session = self.SessionLocal()
        try:
            count = session.query(OutOfStockRecordDB).filter(
                OutOfStockRecordDB.id.in_(record_ids)
            ).update(
                {"is_deleted": 1},
                synchronize_session=False
            )
            session.commit()
            return count
        except Exception as e:
            logger.error("Batch delete records failed: %s", e)
            session.rollback()
            return 0
        finally:
            session.close()

    def delete_by_product_key(self, product_key: str) -> int:
        """
        按 product_key 软删除该产品的所有无货记录（仅设 is_deleted=1，列表不展示，Neon 中行仍存在）。
        """
        if not (product_key or "").strip():
            return 0
        session = self.SessionLocal()
        try:
            count = session.query(OutOfStockRecordDB).filter(
                OutOfStockRecordDB.product_key == product_key.strip()
            ).update({"is_deleted": 1}, synchronize_session=False)
            session.commit()
            return count
        except Exception as e:
            logger.error("delete_by_product_key failed: %s", e)
            session.rollback()
            return 0
        finally:
            session.close()

    def delete_by_product_key_hard(self, product_key: str) -> int:
        """
        按 product_key 物理删除该产品的所有无货记录（真正从库中移除，Neon 中也会消失）。
        看板「删除」使用此方法，与添加数据到 Neon 的行为一致。
        """
        if not (product_key or "").strip():
            return 0
        session = self.SessionLocal()
        try:
            count = session.query(OutOfStockRecordDB).filter(
                OutOfStockRecordDB.product_key == product_key.strip()
            ).delete(synchronize_session=False)
            session.commit()
            return count
        except Exception as e:
            logger.error("delete_by_product_key_hard failed: %s", e)
            session.rollback()
            return 0
        finally:
            session.close()

    def restore_record(self, record_id: int) -> bool:
        """
        恢复已删除的记录

        Args:
            record_id: 记录 ID

        Returns:
            是否恢复成功
        """
        session = self.SessionLocal()
        try:
            record = session.query(OutOfStockRecordDB).filter_by(id=record_id).first()
            if record:
                record.is_deleted = 0
                session.commit()
                return True
            return False
        except Exception as e:
            logger.error("Restore record failed: %s", e)
            session.rollback()
            return False
        finally:
            session.close()

    def get_all_records(self, limit: Optional[int] = None, include_deleted: bool = False) -> List[Dict]:
        """
        获取所有记录

        Args:
            limit: 限制返回数量
            include_deleted: 是否包含已删除的记录（默认 False）
        """
        session = self.SessionLocal()
        try:
            query = session.query(OutOfStockRecordDB)

            # 默认过滤已删除记录
            if not include_deleted:
                query = query.filter(OutOfStockRecordDB.is_deleted == 0)

            query = query.order_by(OutOfStockRecordDB.uploaded_at.desc())

            if limit:
                query = query.limit(limit)

            records = query.all()
            return [self._record_to_dict(r) for r in records]
        finally:
            session.close()
    
    def get_statistics(self) -> Dict:
        """获取统计信息"""
        session = self.SessionLocal()
        try:
            # 总记录数（不含已删除）
            total_records = session.query(func.count(OutOfStockRecordDB.id)).filter(
                OutOfStockRecordDB.is_deleted == 0
            ).scalar()

            # 唯一无货产品数
            unique_products = session.query(
                func.count(func.distinct(OutOfStockRecordDB.product_key))
            ).filter(
                OutOfStockRecordDB.is_deleted == 0
            ).scalar()

            # 触发通知数（count >= 2）
            notified_count = session.query(func.count(OutOfStockRecordDB.id)).filter(
                OutOfStockRecordDB.count >= 2,
                OutOfStockRecordDB.is_deleted == 0
            ).scalar()

            # 今日新增（从今天 00:00:00 开始）
            from datetime import datetime
            today_start = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
            today_count = session.query(func.count(OutOfStockRecordDB.id)).filter(
                OutOfStockRecordDB.uploaded_at >= today_start,
                OutOfStockRecordDB.is_deleted == 0
            ).scalar()

            # 已发邮件产品数（至少发过一封提醒的 product_key 数）
            email_sent_product_count = session.query(
                func.count(func.distinct(OutOfStockRecordDB.product_key))
            ).filter(
                OutOfStockRecordDB.is_deleted == 0,
                (OutOfStockRecordDB.email_sent_count > 0) | (OutOfStockRecordDB.email_status == "sent")
            ).scalar()

            return {
                "total_records": total_records or 0,
                "out_of_stock_count": unique_products or 0,
                "notified_count": notified_count or 0,
                "today_count": today_count or 0,
                "email_sent_product_count": email_sent_product_count or 0,
            }
        finally:
            session.close()

    def get_files_summary(self, include_deleted: bool = False) -> List[Dict]:
        """
        获取所有文件的汇总信息

        Returns:
            文件列表，每个文件包含：file_name, upload_batch_id, uploaded_at, total_records
        """
        session = self.SessionLocal()
        try:
            query = session.query(
                OutOfStockRecordDB.file_name,
                OutOfStockRecordDB.upload_batch_id,
                func.min(OutOfStockRecordDB.uploaded_at).label('uploaded_at'),
                func.count(OutOfStockRecordDB.id).label('total_records')
            )

            if not include_deleted:
                query = query.filter(OutOfStockRecordDB.is_deleted == 0)

            files = query.group_by(
                OutOfStockRecordDB.file_name,
                OutOfStockRecordDB.upload_batch_id
            ).order_by(
                func.min(OutOfStockRecordDB.uploaded_at).desc()
            ).all()

            return [
                {
                    "file_name": f.file_name,
                    "upload_batch_id": f.upload_batch_id,
                    "uploaded_at": f.uploaded_at.isoformat() if f.uploaded_at else None,
                    "total_records": f.total_records
                }
                for f in files
            ]
        finally:
            session.close()

    def get_records_grouped_by_date(self, last_n_days: int = 30, include_deleted: bool = False) -> List[Dict]:
        """
        按日统计新增无货记录数（按上传日期聚合）

        Args:
            last_n_days: 统计最近 N 天，默认 30
            include_deleted: 是否包含已删除记录

        Returns:
            [{"date": "2025-02-19", "count": 5}, ...]，按日期倒序
        """
        from datetime import datetime, timedelta
        cutoff = datetime.now() - timedelta(days=max(1, last_n_days))
        session = self.SessionLocal()
        try:
            # SQLite: date(uploaded_at); 其他库可后续适配
            q = session.query(
                func.date(OutOfStockRecordDB.uploaded_at).label("d"),
                func.count(OutOfStockRecordDB.id).label("cnt"),
            ).filter(OutOfStockRecordDB.uploaded_at >= cutoff)
            if not include_deleted:
                q = q.filter(OutOfStockRecordDB.is_deleted == 0)
            rows = q.group_by(func.date(OutOfStockRecordDB.uploaded_at)).order_by(
                func.date(OutOfStockRecordDB.uploaded_at).desc()
            ).all()
            return [{"date": (r.d if isinstance(r.d, str) else (r.d.isoformat() if r.d else "")), "count": r.cnt} for r in rows]
        except Exception as e:
            logger.warning("get_records_grouped_by_date 使用 date() 失败，改用 Python 聚合: %s", e)
            records = self.get_all_records(limit=5000, include_deleted=include_deleted)
            by_date: Dict[str, int] = {}
            for r in records:
                ut = r.get("uploaded_at")
                if not ut:
                    continue
                try:
                    if isinstance(ut, str):
                        d = ut[:10]
                    else:
                        d = ut.strftime("%Y-%m-%d") if hasattr(ut, "strftime") else str(ut)[:10]
                except Exception:
                    continue
                if d not in by_date:
                    by_date[d] = 0
                by_date[d] += 1
            cutoff_str = cutoff.strftime("%Y-%m-%d")
            return [{"date": d, "count": c} for d, c in sorted(by_date.items(), reverse=True) if d >= cutoff_str]
        finally:
            session.close()

    def get_records_by_file(
        self,
        file_name: Optional[str] = None,
        batch_id: Optional[str] = None,
        include_deleted: bool = False
    ) -> List[Dict]:
        """
        按文件名或批次 ID 查询记录

        Args:
            file_name: 文件名（可选）
            batch_id: 上传批次 ID（可选，优先级更高）
            include_deleted: 是否包含已删除记录

        Returns:
            记录列表
        """
        if not file_name and not batch_id:
            return []

        session = self.SessionLocal()
        try:
            query = session.query(OutOfStockRecordDB)

            # 优先使用 batch_id（更精确）
            if batch_id:
                query = query.filter(OutOfStockRecordDB.upload_batch_id == batch_id)
            elif file_name:
                query = query.filter(OutOfStockRecordDB.file_name == file_name)

            if not include_deleted:
                query = query.filter(OutOfStockRecordDB.is_deleted == 0)

            records = query.order_by(OutOfStockRecordDB.uploaded_at.desc()).all()
            return [self._record_to_dict(r) for r in records]
        finally:
            session.close()

    def _record_to_dict(self, record: OutOfStockRecordDB) -> Dict:
        """将数据库记录转换为字典"""
        return {
            "id": record.id,
            "product_name": record.product_name,
            "specification": record.specification,
            "unit": record.unit,
            "quantity": record.quantity,
            "sheet_name": record.sheet_name,
            "file_name": record.file_name,
            "uploaded_at": record.uploaded_at.isoformat() if record.uploaded_at else None,
            "product_key": record.product_key,
            "count": record.count,
            # 新字段（向后兼容，可能为 None）
            "upload_batch_id": getattr(record, 'upload_batch_id', None),
            "email_status": getattr(record, 'email_status', 'pending'),
            "email_sent_by": getattr(record, 'email_sent_by', None),
            "email_sent_count": getattr(record, 'email_sent_count', 0),
            "last_email_sent_at": record.last_email_sent_at.isoformat() if getattr(record, 'last_email_sent_at', None) else None,
            "is_deleted": getattr(record, 'is_deleted', 0)
        }

    # ---------- 缺货记录（与无货记录同一逻辑：按产品聚合、按文件/按时间） ----------

    def insert_shortage_records(self, file_name: str, shortage_items: List[Dict], max_rows: int = 5000) -> tuple:
        """
        批量写入缺货记录。shortage_items 每项含 product_name, specification, quantity, available_qty, shortfall, code, quote_name, unit_price。
        返回 (inserted_count, email_alerts)，email_alerts 为需发「缺货两次」提醒的列表，每项含 product_name, specification, product_key, count, file_name。
        """
        from pathlib import Path
        name = (Path(file_name).name if file_name else "unknown").strip() or "unknown"
        session = self.SessionLocal()
        inserted = 0
        candidates: List[Dict] = []  # 待检查是否触发邮件的 (product_key, count, product_name, specification, file_name)
        try:
            for item in shortage_items[:max_rows]:
                product_name = (item.get("product_name") or "").strip()
                specification = (item.get("specification") or "").strip()
                if not product_name:
                    continue
                product_key = self._generate_product_key(product_name, specification)
                stmt = select(func.max(ShortageRecordDB.count)).where(ShortageRecordDB.product_key == product_key)
                max_count = session.execute(stmt).scalar() or 0
                new_count = max_count + 1
                quantity = float(item.get("quantity") or 0)
                available_qty = float(item.get("available_qty") or 0)
                shortfall = float(item.get("shortfall") or 0)
                code = (item.get("code") or "").strip()
                quote_name = (item.get("quote_name") or "")[:500]
                unit_price = float(item.get("unit_price")) if item.get("unit_price") is not None else None
                record = ShortageRecordDB(
                    product_name=product_name,
                    specification=specification,
                    quantity=quantity,
                    available_qty=available_qty,
                    shortfall=shortfall,
                    code=code,
                    quote_name=quote_name,
                    unit_price=unit_price,
                    file_name=name,
                    product_key=product_key,
                    count=new_count,
                )
                session.add(record)
                inserted += 1
                candidates.append({
                    "product_key": product_key,
                    "count": new_count,
                    "product_name": product_name,
                    "specification": specification,
                    "file_name": name,
                })

                # 同步缺货记录到 Supabase（best effort，不影响本地 DB）
                try:
                    note_parts = [name]
                    if quote_name:
                        note_parts.append(f"quote={quote_name}")
                    note_parts.append(f"need={quantity}, avail={available_qty}, shortfall={shortfall}")
                    insert_oos_record(
                        issue_type="shortage",
                        product_name=product_name,
                        product_code=code or product_key,
                        customer_name=None,
                        need_qty=quantity,
                        avail_qty=available_qty,
                        shortfall_qty=shortfall,
                        note=" | ".join(note_parts),
                    )
                except Exception as e:
                    logger.warning("同步缺货记录到 Supabase 失败（忽略）: %s", e)
            session.commit()
        except Exception as e:
            logger.exception("insert_shortage_records 失败: %s", e)
            session.rollback()
            return (0, [])
        finally:
            session.close()

        # 与无货对齐：count>=2 且满足冷却时触发发信
        email_alerts: List[Dict] = []
        for c in candidates:
            if self.should_trigger_email_shortage(c["product_key"], c["count"]):
                email_alerts.append(c)
        return (inserted, email_alerts)

    def get_shortage_statistics(self) -> Dict:
        """缺货统计：总记录数、缺货产品数、今日新增、被报缺货≥2次。"""
        session = self.SessionLocal()
        try:
            total = session.query(func.count(ShortageRecordDB.id)).filter(ShortageRecordDB.is_deleted == 0).scalar() or 0
            unique_products = session.query(func.count(func.distinct(ShortageRecordDB.product_key))).filter(
                ShortageRecordDB.is_deleted == 0
            ).scalar() or 0
            today_start = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
            today_count = session.query(func.count(ShortageRecordDB.id)).filter(
                ShortageRecordDB.uploaded_at >= today_start,
                ShortageRecordDB.is_deleted == 0
            ).scalar() or 0
            reported_ge2 = session.query(func.count(ShortageRecordDB.id)).filter(
                ShortageRecordDB.count >= 2,
                ShortageRecordDB.is_deleted == 0
            ).scalar() or 0
            return {
                "total_records": total,
                "shortage_product_count": unique_products,
                "today_count": today_count,
                "reported_ge2_count": reported_ge2,
            }
        finally:
            session.close()

    def get_shortage_list(self, limit: Optional[int] = None) -> List[Dict]:
        """缺货产品列表（按 product_key 聚合，每产品取被报缺货次数最大的一条，与无货列表逻辑一致）。"""
        session = self.SessionLocal()
        try:
            records = session.query(ShortageRecordDB).filter(ShortageRecordDB.is_deleted == 0).order_by(
                ShortageRecordDB.uploaded_at.desc()
            ).limit((limit or 500) * 5).all()
            by_key: Dict[str, ShortageRecordDB] = {}
            for r in records:
                key = r.product_key or ""
                if not key:
                    continue
                if key not in by_key or (by_key[key].count or 0) < (r.count or 0):
                    by_key[key] = r
            out = [self._shortage_record_to_dict(by_key[k]) for k in sorted(by_key.keys(), key=lambda x: (by_key[x].uploaded_at or datetime.min), reverse=True)]
            if limit:
                out = out[:limit]
            return out
        finally:
            session.close()

    def get_shortage_files_summary(self) -> List[Dict]:
        """按文件汇总缺货记录。"""
        session = self.SessionLocal()
        try:
            rows = session.query(
                ShortageRecordDB.file_name,
                func.min(ShortageRecordDB.uploaded_at).label("uploaded_at"),
                func.count(ShortageRecordDB.id).label("total_records"),
            ).filter(ShortageRecordDB.is_deleted == 0).group_by(ShortageRecordDB.file_name).order_by(
                func.min(ShortageRecordDB.uploaded_at).desc()
            ).all()
            return [
                {"file_name": r.file_name, "uploaded_at": r.uploaded_at.isoformat() if r.uploaded_at else None, "total_records": r.total_records}
                for r in rows
            ]
        finally:
            session.close()

    def get_shortage_by_time(self, last_n_days: int = 30) -> List[Dict]:
        """按日统计新增缺货记录数。"""
        from datetime import timedelta
        cutoff = datetime.now() - timedelta(days=max(1, last_n_days))
        session = self.SessionLocal()
        try:
            rows = session.query(
                func.date(ShortageRecordDB.uploaded_at).label("d"),
                func.count(ShortageRecordDB.id).label("cnt"),
            ).filter(ShortageRecordDB.uploaded_at >= cutoff, ShortageRecordDB.is_deleted == 0).group_by(
                func.date(ShortageRecordDB.uploaded_at)
            ).order_by(func.date(ShortageRecordDB.uploaded_at).desc()).all()
            return [{"date": (r.d.isoformat() if hasattr(r.d, "isoformat") else str(r.d)), "count": r.cnt} for r in rows]
        except Exception as e:
            logger.warning("get_shortage_by_time date() 失败: %s", e)
            records = session.query(ShortageRecordDB).filter(
                ShortageRecordDB.uploaded_at >= cutoff,
                ShortageRecordDB.is_deleted == 0
            ).all()
            by_date: Dict[str, int] = {}
            for r in records:
                d = (r.uploaded_at.strftime("%Y-%m-%d") if r.uploaded_at else "")[:10]
                if d:
                    by_date[d] = by_date.get(d, 0) + 1
            return [{"date": d, "count": c} for d, c in sorted(by_date.items(), reverse=True)]
        finally:
            session.close()

    def delete_shortage_by_product_key(self, product_key: str) -> int:
        """按 product_key 软删除该产品的所有缺货记录（仅设 is_deleted=1）。"""
        if not (product_key or "").strip():
            return 0
        session = self.SessionLocal()
        try:
            count = session.query(ShortageRecordDB).filter(ShortageRecordDB.product_key == product_key.strip()).update(
                {"is_deleted": 1}, synchronize_session=False
            )
            session.commit()
            return count
        except Exception as e:
            logger.exception("delete_shortage_by_product_key 失败: %s", e)
            session.rollback()
            return 0
        finally:
            session.close()

    def delete_shortage_by_product_key_hard(self, product_key: str) -> int:
        """按 product_key 物理删除该产品的所有缺货记录（真正从库中移除，Neon 中也会消失）。"""
        if not (product_key or "").strip():
            return 0
        session = self.SessionLocal()
        try:
            count = session.query(ShortageRecordDB).filter(
                ShortageRecordDB.product_key == product_key.strip()
            ).delete(synchronize_session=False)
            session.commit()
            return count
        except Exception as e:
            logger.exception("delete_shortage_by_product_key_hard 失败: %s", e)
            session.rollback()
            return 0
        finally:
            session.close()

    def _shortage_record_to_dict(self, record: ShortageRecordDB) -> Dict:
        return {
            "id": record.id,
            "product_name": record.product_name,
            "specification": record.specification,
            "quantity": record.quantity,
            "available_qty": record.available_qty,
            "shortfall": record.shortfall,
            "code": record.code,
            "quote_name": record.quote_name,
            "unit_price": record.unit_price,
            "file_name": record.file_name,
            "uploaded_at": record.uploaded_at.isoformat() if record.uploaded_at else None,
            "product_key": record.product_key,
            "count": record.count,
            "last_email_sent_at": record.last_email_sent_at.isoformat() if getattr(record, "last_email_sent_at", None) else None,
            "email_status": getattr(record, "email_status", "pending"),
            "email_sent_count": getattr(record, "email_sent_count", 0),
        }
