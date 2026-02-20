# inventory_agent — 库存查询 Agent

自然语言查库存：输入产品名/规格/物料编号，返回库存与可售数量。支持两种运行模式，默认 ReAct。

---

## 运行模式

| 模式 | 环境变量 | 流程 |
|------|----------|------|
| **ReAct**（默认） | `USE_REACT_AGENT=1` 或未设 | 思考 → 工具(search_inventory / get_inventory_by_code) → 观察 → 继续，与 quotation_tracker 一致 |
| **Pipeline** | `USE_REACT_AGENT=0` | PlanAgent 解析意图 → Resolver(phrase→code) → TableAgent 按 code 拉取 → SQLAgent 格式化 |

ReAct 下不依赖 `src`（data_platform），仅需 LLM + AOL 环境即可运行。

---

## 目录与模块

```
inventory_agent/
├── __init__.py          # InventoryAgent，query() / query_react() / query_items()
├── cli.py                # 交互式 CLI，ReAct 下输出 trace_text
├── config.py             # InventoryConfig，.env 加载（Agent Team / quotation_tracker/.env）
├── models.py             # Item, QueryIntent
├── agents/
│   ├── plan_agent.py     # 意图解析（LLM/规则），产出 keywords / keywords_list / phrase_specs
│   ├── table_agent.py    # 调 AOL list.do / detail.do，按 code 取库存
│   └── sql_agent.py      # 结果格式化
└── services/
    ├── resolver.py           # 本地 phrase→code：CONTAINS + 向量 fallback，读 item-list-slim.xlsx
    ├── inventory_agent_tools.py  # ReAct 工具：search_inventory(keywords), get_inventory_by_code(code)
    ├── agent_runner.py      # run_inventory_agent()，ReAct 循环 + 执行追踪
    └── execution_tracer.py  # ExecutionTracer，trace / trace_text 输出
```

---

## 如何运行

- **CLI**（推荐从 Agent Team 根目录）：
  ```bash
  cd "Agent Team"
  set USE_REACT_AGENT=1
  python run_inventory_agent.py
  ```
  或：`python -m inventory_agent.cli`（需 PYTHONPATH 含 Agent Team）。  
  ReAct 下会先实时打印【思考】【工具调用】【观察】，再打印【回答】和完整执行追踪（trace_text）。

- **代码调用**：
  ```python
  from inventory_agent import InventoryAgent
  agent = InventoryAgent()
  text = agent.query("查询 pvc dn20 库存")
  ```
  ReAct 下若要拿追踪：
  ```python
  from inventory_agent.services.agent_runner import run_inventory_agent
  result = run_inventory_agent("查询 pvc dn20 库存")
  # result["answer"], result["trace"], result["trace_text"]
  ```

---

## 环境与配置

- **LLM**：`ZHIPU_API_KEY` 或 `OPENAI_API_KEY`，可选 `OPENAI_BASE_URL` / `OPENAI_BASE_URL_ZHIPU`、`LLM_MODEL`（默认 glm-4-flash）。  
  .env 可放在 Agent Team 或 quotation_tracker 目录。
- **库存 API（AOL）**：ReAct 工具依赖 `AOL_ACCESS_TOKEN`、`AOL_SIGNATURE_SECRET`、`AOL_DATABASE_ID`，缺则工具返回提示。
- **Pipeline / Resolver**：需能 import `src`（通常把含 data_platform 的目录加入 PYTHONPATH）。Resolver 可选：
  - `INVENTORY_ITEM_LIST_SLIM_PATH`：slim 表路径
  - `INVENTORY_ENABLE_RESOLVER_VECTOR`：是否启用向量 fallback（默认 1）
  - `INVENTORY_RESOLVER_CONTAINS`、`INVENTORY_OPENAI_EMBEDDING_MODEL` 等见 config.py

---

## 测试

- `python test_trace.py`：校验 ReAct 下 `run_inventory_agent` 返回的 trace / trace_text（需在 inventory_agent 目录或 PYTHONPATH 正确）。
- `test_basic.py`：基础调用。
- `tests/`：单元/集成/端到端（含 test_search_latency、test_unit、test_integration_prd、test_e2e 等）。

---

## 修改时注意

- 默认 ReAct；改默认或加开关请动 `__init__.py` 中 `USE_REACT_AGENT`。
- 工具超时、结果长度：`config.TOOL_EXEC_TIMEOUT`、`config.TOOL_RESULT_MAX_CHARS`。
- 执行追踪逻辑在 `agent_runner.py` 与 `execution_tracer.py`，CLI 在 ReAct 下直接调 `run_inventory_agent` 并打印 `trace_text`。
