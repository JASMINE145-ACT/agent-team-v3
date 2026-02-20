# 报价单无货产品追踪系统 - 项目架构

## 1. 项目目标

从 Excel 报价单中识别「无货」产品行，提取品名、规格、单位、数量并落库；支持按产品维度统计缺货次数，达到阈值可触发邮件（Phase 2）。

---

## 2. 两种分析方式

| 方式 | 入口 | 说明 |
|------|------|------|
| **管道** | `QuotationProcessor` | 数据段/无货上下文 + LLM 结构化提取；ExcelReader → OutOfStockDetector → LLMParser → DataService |
| **Agent** | `run_quotation_agent` | ReAct 范式（思考→工具→观察）；按格解析、工具调用、LLM 观察后选择存库 |

---

## 3. 目录与模块

```
quotation_tracker/
├── app.py                 # Streamlit 入口：上传、无货列表、统计；支持管道/Agent 切换
├── run.py                 # 启动 Streamlit
├── processor.py           # 管道流程：校验 → 读表 → 检测/抽取 → 落库
├── config.py              # 环境变量与常量
├── .env / .env.example
├── requirements.txt
├── models/
│   └── models.py          # OutOfStockProduct, ProcessingResult, LLMParseResult
├── services/
│   ├── excel_reader.py    # Excel 读取（raw 模式，多 Sheet）
│   ├── file_validator.py  # 文件类型、大小校验
│   ├── out_of_stock_detector.py  # 无货行识别、数据段/上下文切片、表格转 Markdown
│   ├── llm_parser.py      # LLM 字段抽取（OpenAI 兼容 / 智谱）
│   ├── data_service.py    # SQLite/PostgreSQL 落库、统计、邮件触发判断
│   ├── email_service.py   # 缺货邮件发送
│   ├── quotation_agent_tool.py   # Agent 工具：analyze_quotation_excel、get_out_of_stock_records、persist_out_of_stock_records
│   ├── agent_runner.py    # ReAct Agent 运行器
│   └── execution_tracer.py      # 执行追踪（调试用）
├── tests/
│   ├── test_glm_model.py
│   ├── test_excel_reader.py
│   ├── test_file_validator.py
│   ├── test_out_of_stock_detector.py
│   └── test_llm_parser_schema.py
├── examples/
│   ├── demo_data_section.py
│   └── data_section_examples.md
└── evaluation/
    ├── build_golden_template.py
    ├── evaluate_recall.py
    ├── golden_samples.json / golden_samples.template.json
    └── reports/
```

---

## 4. 管道数据流

```
上传 Excel
  → FileValidator 校验
  → ExcelReader.read_excel(raw=True) → [(sheet_name, DataFrame), ...]
  → 每个 Sheet：
       [USE_WUHOU_CONTEXT_MODE=true]
       → OutOfStockDetector.get_context_around_wuhou() → 表头 + 无货行 ± N 行
       → format_rows_for_llm() → Markdown
       → LLMParser.parse_out_of_stock_products(markdown, full_table=False)
       [USE_WUHOU_CONTEXT_MODE=false 默认]
       → get_data_section() 混合策略截取数据段
       → format_full_table_for_llm() → Markdown
       → LLMParser.parse_out_of_stock_products(markdown, full_table=True)
  → DataService.insert_record() 落库，判断是否触发邮件
  → ProcessingResult(success, records, out_of_stock_count, debug_per_sheet)
```

---

## 5. Agent 数据流

```
用户上传文件 + 提问
  → 落盘临时文件
  → run_quotation_agent(file_path, question, file_name?)
  → ReAct 循环：<think> 思考 → tool_calls → 工具结果作为 observation → 下一轮
  → 工具：analyze_quotation_excel（统计无货）、get_out_of_stock_records（原始行+表头）、persist_out_of_stock_records（LLM 映射后落库）
  → ExecutionTracer 记录每步（调试）
```

---

## 6. 核心模块职责

| 模块 | 职责 |
|------|------|
| **processor** | 管道串联：校验 → 读表 → 按配置选「无货+上下文」或「全数据段」→ 调 LLM → 落库 |
| **ExcelReader** | `read_excel(bytes, sheet_name=None, raw=True)`，返回 `List[(sheet_name, DataFrame)]` |
| **FileValidator** | 扩展名 .xlsx/.xls、大小 ≤ 200MB |
| **OutOfStockDetector** | 无货行规则、表头识别、get_context_around_wuhou、get_data_section、format_*_for_llm |
| **LLMParser** | parse_out_of_stock_products(table_data, full_table)，JSON 提取、字段规范化 |
| **DataService** | SQLite/PostgreSQL，insert_record、get_all_records、get_statistics、should_trigger_email |
| **email_service** | send_out_of_stock_alert（缺货 ≥2 次触发） |
| **quotation_agent_tool** | analyze_quotation_excel、get_out_of_stock_records、persist_out_of_stock_records（OpenAI function 格式） |
| **agent_runner** | ReAct 循环，调用智谱/OpenAI，执行工具、写回观察 |
| **execution_tracer** | 调试用，记录每步 thinking/tool_call/observation |

---

## 7. 配置要点（config.py / .env）

- **LLM**：`ZHIPU_API_KEY` / `OPENAI_API_KEY`、`OPENAI_BASE_URL`、`LLM_MODEL`（默认 glm-4.7）、`TOOL_RESULT_MAX_CHARS`（Agent 工具返回上限）
- **无货识别模式**：`USE_WUHOU_CONTEXT_MODE`（默认 false）= 送整段数据表；true = 先规则锁定无货，再送表头+无货上下 N 行。`WUHOU_CONTEXT_ROWS` 默认 2。
- **全表模式**：`MAX_TABLE_ROWS_FOR_LLM`、`MIN_DATA_SECTION_ROWS`、`FOOTER_KEYWORDS`
- **DB**：`QUOTATION_DB_PATH`（SQLite）、`DATABASE_URL`（可选 PostgreSQL）
- **Email**：`EMAIL_SMTP_*`、`EMAIL_RECIPIENTS`、`EMAIL_COOLDOWN_HOURS`

---

## 8. 入口与运行

- **Web**：`cd quotation_tracker` → `streamlit run app.py` 或 `python run.py`
- **依赖**：`requirements.txt`（streamlit, pandas, openpyxl, openai, pydantic, sqlalchemy, python-dotenv, chardet）

评估：`python -m evaluation.evaluate_recall --manifest evaluation/golden_samples.json`
