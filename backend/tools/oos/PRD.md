# 报价单无货产品追踪系统 — 产品需求文档（PRD）

## 1. 产品概述

**报价单无货产品追踪系统** 从 Excel 报价单中识别「无货」产品行，提取品名、规格、单位、数量并落库；支持按产品维度统计缺货次数，达到阈值可触发邮件。支持两种分析方式：**管道**（Pipeline）与 **Agent**。

---

## 2. 技术基础

| 组件 | 说明 |
|------|------|
| **LLM** | 智谱 GLM-4.7 / OpenAI 兼容接口，用于无货字段抽取（管道）、思考与工具调度（Agent） |
| **Excel 解析** | openpyxl（.xlsx / .xlsm）、pandas，raw 模式保留全部行 |
| **存储** | SQLite（默认）或 PostgreSQL，表 `out_of_stock_records` |
| **邮件** | SMTP，缺货次数 ≥2 时发送通知 |

---

## 3. 已实现功能

### 3.1 两种分析方式

| 方式 | 入口 | 流程 | 适用 |
|------|------|------|------|
| **管道** | `QuotationProcessor` | 校验 → 读表 → 数据段/无货上下文 → LLM 抽取 → 落库 | 结构化表格，规则+LLM 联合 |
| **Agent** | `run_quotation_agent` | 思考 → 工具（analyze / get_out_of_stock_records / persist）→ 观察 → 继续 | 表结构多变，由 LLM 观察后决定存库 |

### 3.2 管道能力

- **FileValidator**：.xlsx/.xls，≤ 200MB  
- **ExcelReader**：raw 模式，多 Sheet  
- **OutOfStockDetector**：  
  - 无货行规则（OUT_OF_STOCK_KEYWORDS：无货、缺货、N/A 等）  
  - 表头识别（HEADER_KEYWORDS：产品名称、规格、单位、数量）  
  - `get_context_around_wuhou`：表头 + 无货行 ± N 行（`USE_WUHOU_CONTEXT_MODE=true`）  
  - `get_data_section`：结构断裂 + FOOTER_KEYWORDS + 最小行数（默认模式）  
- **LLMParser**：parse_out_of_stock_products，JSON 提取、unit/quantity 规范化  
- **DataService**：insert_record、get_all_records、get_statistics、should_trigger_email  

### 3.3 Agent 工具

- **analyze_quotation_excel(file_path, sheet_name?)**：按单元格统计无货条数及行号  
- **get_out_of_stock_records(file_path, sheet_name?)**：抓取无货行的原始行数据（cells + 表头），供 LLM 列映射  
- **persist_out_of_stock_records(file_name, records)**：LLM 映射后的记录落库，records 为 `{product_name, specification?, unit?, quantity?}` 列表  

### 3.4 邮件与统计

- 同一产品缺货次数 ≥2 时触发邮件（`EMAIL_COOLDOWN_HOURS` 控制重复间隔）  
- 统计：总记录数、无货产品数、触发通知数、今日新增  

---

## 4. 使用场景

### 4.1 Web 界面（Streamlit）

```bash
cd quotation_tracker
streamlit run app.py
# 或 python run.py
```

- **上传文件**：选择「管道」或「Agent」模式，上传 Excel，开始处理  
- **无货产品列表**：查看已落库记录  
- **统计信息**：总记录、无货产品数、触发通知数、今日新增  

### 4.2 代码调用

```python
from processor import QuotationProcessor

processor = QuotationProcessor()
result = processor.process_file(file_bytes, filename="报价单.xlsx")
# result.success, result.records, result.out_of_stock_count, result.debug_per_sheet
```

Agent 方式：
```python
from services.agent_runner import run_quotation_agent

out = run_quotation_agent(file_path="报价单.xlsx", question="抓取无货数据并持久化", file_name="报价单.xlsx")
# out["answer"], out["error"], out["thinking"]
```

### 4.3 典型业务场景

| 场景 | 适用方式 | 说明 |
|------|----------|------|
| 标准报价单、表结构稳定 | 管道 | 数据段 + 规则锁定无货，LLM 只做字段抽取 |
| 表结构多变、多语言（中/英/印尼等） | Agent | LLM 根据表头做列映射，观察后决定存库 |
| 批量处理、自动化 | 管道 | 无需人工确认，直接落库 |
| 需要人工审核再存库 | Agent | LLM 筛选有效产品后 persist |

### 4.4 召回评估

```bash
python -m evaluation.evaluate_recall --manifest evaluation/golden_samples.json --output evaluation/reports/latest.json
```

---

## 5. 环境与配置

### 5.1 必需

- **LLM**：`ZHIPU_API_KEY` 或 `OPENAI_API_KEY`（.env 放 quotation_tracker 目录）

### 5.2 可选

| 配置 | 默认 | 说明 |
|------|------|------|
| `LLM_MODEL` | glm-4.7 | 智谱模型 |
| `USE_WUHOU_CONTEXT_MODE` | false | true=送表头+无货上下 N 行；false=送整段数据表 |
| `WUHOU_CONTEXT_ROWS` | 2 | 无货行上下保留行数 |
| `MAX_TABLE_ROWS_FOR_LLM` | 500 | 全表模式最大行数 |
| `MIN_DATA_SECTION_ROWS` | 20 | 数据段最小行数 |
| `TOOL_RESULT_MAX_CHARS` | 20000 | Agent 工具返回截断 |
| `QUOTATION_DB_PATH` | data/out_of_stock.db | SQLite 路径 |
| `DATABASE_URL` | — | PostgreSQL 连接串 |
| `EMAIL_SMTP_*`、`EMAIL_RECIPIENTS` | — | 邮件配置 |

### 5.3 依赖

- Python 3.10+  
- streamlit、pandas、openpyxl、openai、pydantic、sqlalchemy、python-dotenv、chardet  

---

## 6. 数据模型

| 模型 | 字段 |
|------|------|
| **OutOfStockProduct** | product_name, specification?, unit?, quantity? |
| **ProcessingResult** | success, file_name, sheet_name, out_of_stock_count, records, email_triggered, error?, debug_per_sheet? |
| **LLMParseResult** | out_of_stock_products: List[OutOfStockProduct] |

---

## 7. 测试

- `test_glm_model.py`：LLM 配置与调用  
- `test_excel_reader.py`、`test_file_validator.py`、`test_out_of_stock_detector.py`、`test_llm_parser_schema.py`：各模块单元测试  
