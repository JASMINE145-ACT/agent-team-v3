"""
LLM parser module.
"""
import json
import logging
import re
import time
from typing import Any, Dict, List, Optional

from openai import OpenAI
from pydantic import ValidationError

from backend.tools.oos.config import (
    LLM_API_KEY,
    LLM_MAX_TOKENS,
    LLM_MODEL,
    LLM_PARSE_MAX_RETRIES,
    LLM_TEMPERATURE,
    OPENAI_BASE_URL,
)
from backend.tools.oos.models import LLMParseResult, OutOfStockProduct

logger = logging.getLogger(__name__)


class LLMOutputSchemaError(ValueError):
    """Raised when model output fails strict schema validation."""


class LLMParser:
    """LLM parser (OpenAI-compatible API)."""

    _PLACEHOLDER_UNITS = {"", "-", "同上", "见上", "n/a", "na", "N/A", "NA"}
    _REQUIRED_ITEM_KEYS = ("product_name", "specification", "unit", "quantity")

    @staticmethod
    def _is_low_quality_markdown(markdown: str) -> bool:
        """
        检测 Markdown 质量（乱码检测），返回 True 表示低质量

        Args:
            markdown: Markdown 表格字符串

        Returns:
            True 表示低质量（乱码过多）
        """
        if not markdown or not markdown.strip():
            return True

        # 统计非 ASCII 字符中的乱码字符比例
        non_ascii_chars = [c for c in markdown if ord(c) > 127]
        if not non_ascii_chars:
            return False  # 纯 ASCII 认为正常

        garbled_chars = sum(
            1 for c in non_ascii_chars
            if c in '\ufffd\u0000' or ord(c) > 0x9FFF
        )
        return (garbled_chars / len(non_ascii_chars)) > 0.3

    @staticmethod
    def _contains_out_of_stock_keywords(text: str) -> bool:
        """
        检测文本是否包含无货关键词

        Args:
            text: 待检测文本

        Returns:
            True 表示包含无货关键词
        """
        keywords = ['无货', 'out of stock', '缺货', 'N/A', '无库存', '缺', '无']
        text_lower = text.lower()
        return any(kw.lower() in text_lower for kw in keywords)

    def __init__(self):
        if OPENAI_BASE_URL:
            self.client = OpenAI(api_key=LLM_API_KEY, base_url=OPENAI_BASE_URL)
        else:
            self.client = OpenAI(api_key=LLM_API_KEY)
        self.model = LLM_MODEL
        self.max_tokens = LLM_MAX_TOKENS
        self.temperature = LLM_TEMPERATURE

    def parse_out_of_stock_products(
        self,
        table_data: str,
        full_table: bool = True,
        max_retries: Optional[int] = None,
        base_delay: float = 1.0,
    ) -> List[OutOfStockProduct]:
        """
        Parse out-of-stock products from table markdown.

        Args:
            table_data: table markdown.
            full_table: True means table contains normal rows and out-of-stock rows.
            max_retries: retry times for model/schema failure.
            base_delay: exponential backoff base seconds.
        """
        # ===== 质量预检 =====
        # 1. 乱码检测
        if self._is_low_quality_markdown(table_data):
            logger.error("Markdown contains excessive garbled text (>30%%), aborting LLM call")
            raise LLMOutputSchemaError(
                "validation_error: input_garbled - "
                "Markdown 表格包含过多乱码，无法解析。请检查文件编码是否正确。"
            )

        # 2. 全表模式下检查无货关键词（早期退出，节省 token）
        if full_table and not self._contains_out_of_stock_keywords(table_data):
            logger.warning("Full table mode but no out-of-stock keyword found. Returning empty list.")
            return []
        # ===== 预检结束 =====

        prompt = self._build_prompt_full_table(table_data) if full_table else self._build_prompt(table_data)
        retry_limit = max(1, int(max_retries if max_retries is not None else LLM_PARSE_MAX_RETRIES))

        for attempt in range(retry_limit):
            try:
                response = self.client.chat.completions.create(
                    model=self.model,
                    messages=[{"role": "user", "content": prompt}],
                    temperature=self.temperature,
                    max_tokens=self.max_tokens,
                )
                content = (response.choices[0].message.content or "").strip()
                json_str = self._extract_json(content)
                json_str = self._repair_json(json_str)
                result_dict = json.loads(json_str)
                result_dict = self._validate_and_normalize_result(result_dict)

                parse_result = LLMParseResult(**result_dict)
                if len(parse_result.out_of_stock_products) == 0:
                    logger.info(
                        "LLM returned 0 out_of_stock_products, raw response (first 800 chars): %s",
                        (content[:800] + "..." if len(content) > 800 else content),
                    )
                return parse_result.out_of_stock_products
            except json.JSONDecodeError as exc:
                logger.warning("LLM JSON parse failed (%s/%s): %s", attempt + 1, retry_limit, exc)
                if attempt == retry_limit - 1:
                    raise LLMOutputSchemaError(f"validation_error: invalid_json: {exc}") from exc
            except (LLMOutputSchemaError, ValidationError) as exc:
                logger.warning("LLM schema validation failed (%s/%s): %s", attempt + 1, retry_limit, exc)
                if attempt == retry_limit - 1:
                    if isinstance(exc, LLMOutputSchemaError):
                        raise
                    raise LLMOutputSchemaError(
                        f"validation_error: pydantic_validation_failed: {exc}"
                    ) from exc
            except Exception as exc:  # noqa: BLE001
                logger.warning("LLM request failed (%s/%s): %s", attempt + 1, retry_limit, exc)
                if attempt == retry_limit - 1:
                    raise

            delay = base_delay * (2**attempt)
            time.sleep(delay)

        return []

    def _build_prompt_full_table(self, full_table_markdown: str) -> str:
        return f"""你是报价单解析助手。
请从下方 Markdown 表格中找出所有无货行，并提取字段。

判定无货：无货 / out of stock / 缺货 / 无库存 / N/A。逐行扫描，某行任意单元格出现即视为无货行。
重要：只要表中有上述关键词，就必须在 out_of_stock_products 中至少返回一条，不要返回空数组。

字段要求：
- product_name: 品名（必填，非空）
- specification: 规格（必须有该字段，可为 null）
- unit: 单位（必须有该字段，缺失时填空字符串 ""）
- quantity: 数量（必须有该字段，数字）

若「产品编号」列出现「无货」，该行即为无货行，请从同一行提取品名/规格/单位/数量。

输出要求（严格）：
1) 只输出一个 JSON 对象，不要任何解释或 markdown 包裹
2) 顶层键名必须为 out_of_stock_products（英文下划线），值为数组
3) 每项必须包含 product_name, specification, unit, quantity 四个键
4) 表中有无货行时不得返回 []，必须至少提取一条

表格：
{full_table_markdown}

输出示例：
{{
  "out_of_stock_products": [
    {{"product_name": "法兰", "specification": "DN125", "unit": "个", "quantity": 3}},
    {{"product_name": "盲板", "specification": "DN100", "unit": "个", "quantity": 1}}
  ]
}}
"""

    def _build_prompt(self, out_of_stock_rows_data: str) -> str:
        return f"""你是报价单解析助手。
下方表格是系统已锁定含「无货」的片段：首行为表头，其余行中至少有一行的某个单元格为「无货」/ out of stock / 缺货 / N/A。请逐行检查，把所有含上述关键词的行都提取出来。

重要：不要返回空数组。只要某行任意单元格出现「无货」或 out of stock 或 缺货，该行即为无货行，请从该行按表头列对应填 product_name、specification、unit、quantity。

字段要求：
- product_name: 品名（必填，从表头“品名/货物名称/询价货物名称”等列取）
- specification: 规格（必须有该字段，无则 null）
- unit: 单位（必须有该字段，无或占位符则 ""）
- quantity: 数量（必须有该字段，数字）

输出要求（严格）：
1) 只输出一个 JSON 对象，不要任何解释或 markdown 包裹
2) 顶层键名必须为 out_of_stock_products（英文下划线），值为数组
3) 每项必须包含 product_name, specification, unit, quantity 四个键
4) 至少提取出表格中所有明确标「无货」的行，不得返回 [] 若表中存在无货行

表格：
{out_of_stock_rows_data}

输出示例：
{{
  "out_of_stock_products": [
    {{"product_name": "三角阀", "specification": null, "unit": "个", "quantity": 750}}
  ]
}}
"""

    def _extract_json(self, content: str) -> str:
        """Extract JSON body from model output."""
        content = content.strip()
        if not content:
            return "{}"

        if "```json" in content:
            start = content.find("```json") + 7
            end = content.find("```", start)
            if end != -1:
                return content[start:end].strip()

        if "```" in content:
            start = content.find("```") + 3
            end = content.find("```", start)
            if end != -1:
                return content[start:end].strip()

        start = content.find("{")
        end = content.rfind("}") + 1
        if start != -1 and end > start:
            return content[start:end]
        if start == -1:
            return "{\"out_of_stock_products\":[]}"
        return content

    def _repair_json(self, raw: str) -> str:
        """Repair common JSON issues produced by models."""
        if not raw or not raw.strip():
            return "{\"out_of_stock_products\":[]}"
        s = raw.strip()
        s = re.sub(r",\s*([}\]])", r"\1", s)
        return s

    # 兼容模型用其他键名返回无货列表（含 GLM 等可能返回的中文键）
    _OUT_OF_STOCK_KEYS = (
        "out_of_stock_products",
        "products",
        "无货产品",
        "items",
        "out_of_stock_items",
        "无货列表",
        "list",
        "result",
    )

    def _find_products_list(self, payload: Dict[str, Any]) -> Optional[List[Any]]:
        """从 payload 中查找无货列表，支持顶层键、嵌套 result/data、以及唯一列表兜底。"""
        # 1) 顶层直接键
        for key in self._OUT_OF_STOCK_KEYS:
            cand = payload.get(key)
            if isinstance(cand, list):
                return cand
        if isinstance(payload.get("data"), list):
            return payload["data"]

        # 2) 嵌套 result / data 对象内的 out_of_stock_products 或 products
        for wrap in ("result", "data"):
            obj = payload.get(wrap)
            if not isinstance(obj, dict):
                continue
            for key in ("out_of_stock_products", "products", "items", "无货产品", "无货列表"):
                cand = obj.get(key)
                if isinstance(cand, list):
                    return cand

        # 3) 兜底：若顶层只有一个键且值为 list，且元素为 dict，则视为无货列表（常见于模型只返回一个数组键）
        keys = [k for k in payload if isinstance(payload.get(k), list)]
        if len(keys) == 1:
            cand = payload[keys[0]]
            if cand and isinstance(cand[0], dict):
                return cand
        return None

    def _validate_and_normalize_result(self, payload: Any) -> Dict[str, Any]:
        if not isinstance(payload, dict):
            raise LLMOutputSchemaError("validation_error: root_not_object")

        products = self._find_products_list(payload)
        if products is None:
            logger.warning(
                "LLM response missing out_of_stock_products. Top-level keys: %s, payload preview: %s",
                list(payload.keys()),
                str(payload)[:600],
            )
            raise LLMOutputSchemaError("validation_error: missing_out_of_stock_products")
        if not isinstance(products, list):
            raise LLMOutputSchemaError("validation_error: out_of_stock_products_not_array")

        normalized_items: List[Dict[str, Any]] = []
        for idx, item in enumerate(products):
            if not isinstance(item, dict):
                raise LLMOutputSchemaError(f"validation_error: item_{idx}_not_object")

            missing_keys = [k for k in self._REQUIRED_ITEM_KEYS if k not in item]
            if missing_keys:
                raise LLMOutputSchemaError(
                    f"validation_error: item_{idx}_missing_keys:{','.join(missing_keys)}"
                )

            name = str(item.get("product_name") or "").strip()
            if not name:
                raise LLMOutputSchemaError(f"validation_error: item_{idx}_empty_product_name")

            spec_raw = item.get("specification")
            spec = None if spec_raw is None else str(spec_raw).strip() or None

            unit_raw = item.get("unit")
            unit = "" if unit_raw is None else str(unit_raw).strip()
            if unit in self._PLACEHOLDER_UNITS:
                unit = ""

            quantity_raw = item.get("quantity")
            if quantity_raw is None or (isinstance(quantity_raw, str) and not quantity_raw.strip()):
                quantity = 0.0
            else:
                quantity_text = str(quantity_raw).replace(",", "").strip()
                try:
                    quantity = float(quantity_text)
                except (TypeError, ValueError) as exc:
                    raise LLMOutputSchemaError(
                        f"validation_error: item_{idx}_invalid_quantity:{quantity_raw}"
                    ) from exc

            normalized_items.append(
                {
                    "product_name": name,
                    "specification": spec,
                    "unit": unit,
                    "quantity": quantity,
                }
            )

        return {"out_of_stock_products": normalized_items}
