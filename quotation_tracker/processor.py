"""
Main processing flow.
"""
import logging
import uuid
from typing import Optional

from config import MAX_TABLE_ROWS_FOR_LLM, USE_WUHOU_CONTEXT_MODE, WUHOU_CONTEXT_ROWS
from models.models import ProcessingResult
from services import DataService, ExcelReader, FileValidator, LLMParser, OutOfStockDetector
from services.llm_parser import LLMOutputSchemaError

logger = logging.getLogger(__name__)


class QuotationProcessor:
    """Quotation processing pipeline."""

    def __init__(self):
        self.excel_reader = ExcelReader()
        self.detector = OutOfStockDetector()
        self.llm_parser = LLMParser()
        self.data_service = DataService()
        self.file_validator = FileValidator()

    def process_file(
        self,
        file_bytes: bytes,
        filename: str,
        sheet_name: Optional[str] = None,
        persist_records: bool = True,
    ) -> ProcessingResult:
        """
        Process an Excel file.

        Args:
            file_bytes: file bytes.
            filename: original file name.
            sheet_name: optional single sheet to process.
            persist_records: when False, skip DB insert and email checks.
        """
        requested_sheet_name = sheet_name
        try:
            is_valid, error = self.file_validator.validate(file_bytes, filename)
            if not is_valid:
                return ProcessingResult(success=False, error=error)

            sheets_data = self.excel_reader.read_excel(file_bytes, requested_sheet_name, raw=True)
            if not sheets_data:
                return ProcessingResult(success=False, error="Excel 文件为空或无法读取")

            # 生成上传批次 ID（用于文件溯源）
            batch_id = str(uuid.uuid4())[:8]  # 使用短 UUID

            all_products = []
            email_triggered = False
            debug_per_sheet = []

            for current_sheet_name, df in sheets_data:
                total_rows = len(df)

                if USE_WUHOU_CONTEXT_MODE:
                    context_df, wuhou_count = self.detector.get_context_around_wuhou(
                        df, context_rows=WUHOU_CONTEXT_ROWS
                    )
                    if wuhou_count == 0:
                        logger.info("Sheet '%s' no out-of-stock keyword found, skip", current_sheet_name)
                        debug_per_sheet.append(
                            {
                                "sheet": current_sheet_name,
                                "total_rows": total_rows,
                                "data_section_rows": 0,
                                "has_wu_huo": False,
                                "llm_count": 0,
                                "error": None,
                            }
                        )
                        continue
                    markdown_data = self.detector.format_rows_for_llm(context_df)
                    rows_sent = len(context_df)
                    has_wu_huo = True
                    full_table = False
                else:
                    max_rows = MAX_TABLE_ROWS_FOR_LLM or 0
                    data_section = self.detector.get_data_section(df, max_rows=max_rows)
                    markdown_data = self.detector.format_full_table_for_llm(data_section, max_rows=0)
                    rows_sent = len(data_section)
                    has_wu_huo = "无货" in markdown_data or "out of stock" in markdown_data.lower()
                    full_table = True
                    if not has_wu_huo and total_rows > rows_sent:
                        logger.warning(
                            "Sheet '%s': %s rows truncated by data sectioning",
                            current_sheet_name,
                            total_rows - rows_sent,
                        )

                if not markdown_data.strip():
                    logger.info("Sheet '%s' markdown content is empty, skip", current_sheet_name)
                    debug_per_sheet.append(
                        {
                            "sheet": current_sheet_name,
                            "total_rows": total_rows,
                            "data_section_rows": 0,
                            "has_wu_huo": has_wu_huo,
                            "llm_count": 0,
                            "error": "content_empty",
                        }
                    )
                    continue

                logger.info(
                    "Sheet '%s': total_rows=%s, rows_sent=%s, has_wu_huo=%s, mode=%s",
                    current_sheet_name,
                    total_rows,
                    rows_sent,
                    has_wu_huo,
                    "wuhuo_context" if USE_WUHOU_CONTEXT_MODE else "full_table",
                )

                try:
                    products = self.llm_parser.parse_out_of_stock_products(
                        markdown_data, full_table=full_table
                    )
                    all_products.extend(products)
                    debug_per_sheet.append(
                        {
                            "sheet": current_sheet_name,
                            "total_rows": total_rows,
                            "data_section_rows": rows_sent,
                            "has_wu_huo": has_wu_huo,
                            "llm_count": len(products),
                            "error": None,
                        }
                    )
                except Exception as exc:  # noqa: BLE001
                    logger.error("Sheet '%s' LLM parsing failed: %s", current_sheet_name, exc)
                    sheet_debug = {
                        "sheet": current_sheet_name,
                        "total_rows": total_rows,
                        "data_section_rows": rows_sent,
                        "has_wu_huo": has_wu_huo,
                        "llm_count": 0,
                        "error": str(exc),
                    }
                    if isinstance(exc, LLMOutputSchemaError) or str(exc).startswith("validation_error:"):
                        sheet_debug["validation_error"] = str(exc)
                    debug_per_sheet.append(sheet_debug)
                    continue

                if not persist_records:
                    continue

                for product in products:
                    try:
                        count = self.data_service.insert_record(
                            product=product,
                            sheet_name=current_sheet_name,
                            file_name=filename,
                            upload_batch_id=batch_id  # 新增：传递批次 ID
                        )
                        product_key = self.data_service._generate_product_key(
                            product.product_name, product.specification
                        )
                        if self.data_service.should_trigger_email(product_key, count):
                            email_triggered = True
                            from services.email_service import send_out_of_stock_alert

                            # 发送邮件
                            email_sent = send_out_of_stock_alert(
                                product_name=product.product_name,
                                specification=product.specification,
                                product_key=product_key,
                                count=count,
                                file_name=filename,
                            )

                            # 标记邮件发送状态（成功或失败）
                            if email_sent:
                                self.data_service.mark_email_sent(
                                    product_key, sent_by='system', status='sent'
                                )
                                logger.info(
                                    "Product %s email sent successfully (count=%s)",
                                    product_key, count
                                )
                            else:
                                self.data_service.mark_email_sent(
                                    product_key, sent_by='system', status='failed'
                                )
                                logger.warning(
                                    "Product %s email failed to send (count=%s)",
                                    product_key, count
                                )
                    except Exception as exc:  # noqa: BLE001
                        logger.error("Persist record failed: %s", exc)
                        continue

            return ProcessingResult(
                success=True,
                file_name=filename,
                sheet_name=requested_sheet_name if requested_sheet_name else sheets_data[0][0],
                out_of_stock_count=len(all_products),
                records=all_products,
                email_triggered=email_triggered,
                debug_per_sheet=debug_per_sheet if debug_per_sheet else None,
            )
        except Exception as exc:  # noqa: BLE001
            logger.exception("Process file failed")
            return ProcessingResult(success=False, error=f"处理失败: {exc}")
