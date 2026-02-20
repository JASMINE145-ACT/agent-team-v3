# 库存查询 Agent — 产品需求文档（PRD）

## 1. 产品概述

**库存查询 Agent** 是一款通过自然语言查询库存的产品，用户输入产品名称、规格或物料编号，系统返回库存数量与可售数量。支持两种运行模式：**ReAct**（默认）与 **Pipeline**。

---

## 2. 技术基础

| 组件 | 说明 |
|------|------|
| **LLM** | 智谱 GLM-4.7 / OpenAI 兼容接口，用于意图解析（Pipeline）、思考与工具调度（ReAct） |
| **AOL** | Accurate Online API（list.do / detail.do），提供真实库存数据；需配置 `AOL_ACCESS_TOKEN`、`AOL_SIGNATURE_SECRET`、`AOL_DATABASE_ID` |
| **Resolver** | 本地 phrase → Item Code 解析：先 CONTAINS（Item Name / Chinese name），无结果则向量 k-NN fallback（OpenAI text-embedding-3-large） |
| **数据源** | `item-list-slim.xlsx`（Item Code、Item Name、Chinese name），用于 Resolver 匹配 |

---

## 3. 已实现功能

### 3.1 两种运行模式

| 模式 | 环境变量 | 流程 | 适用 |
|------|----------|------|------|
| **ReAct**（默认） | `USE_REACT_AGENT=1` 或未设 | 思考 → 工具（search_inventory / get_inventory_by_code）→ 观察 → 继续 | 不依赖 `src` 时也能跑，仅需 LLM + AOL |
| **Pipeline** | `USE_REACT_AGENT=0` | PlanAgent 解析意图 → Resolver(phrase→code) → TableAgent 按 code 拉取 → SQLAgent 格式化 | 需 `src`（data_platform）在 PYTHONPATH |

### 3.2 ReAct 工具

- **search_inventory(keywords)**：按名称/规格查库存；优先 Resolver（CONTAINS + 向量）→ code → detail.do，Resolver 不可用时降级为 list.do 关键词查表  
- **get_inventory_by_code(code)**：按 10 位物料编号（如 8030020580）直接查库存

### 3.3 Pipeline 能力

- PlanAgent：LLM/规则解析意图，产出 keywords、keywords_list、phrase_specs  
- Resolver：phrase → Item Code（CONTAINS + 向量 fallback），规格过滤  
- TableAgent：list.do 模糊搜索 / 按 code 精确拉取，detail.do 取完整库存  
- SQLAgent：结果格式化（与网站 7 列对齐）

### 3.4 执行追踪

- ReAct 模式下输出 `trace` / `trace_text`，包含每步思考、工具调用、观察，便于调试  
- CLI 实时打印【思考】【工具调用】【观察】【回答】

---

## 4. 使用场景

### 4.1 交互式 CLI

```bash
cd "Agent Team"
python run_inventory_agent.py
```

输入示例：
- `8030020580 库存` — 按物料编号查
- `Tee With Cover dn40` — 按名称+规格查
- `查一下 pvc dn20` — 自然语言查

### 4.2 代码调用

```python
from inventory_agent import InventoryAgent

agent = InventoryAgent()
text = agent.query("查询 pvc dn20 库存")
```

ReAct 下需要追踪时：
```python
from inventory_agent.services.agent_runner import run_inventory_agent

result = run_inventory_agent("查询 pvc dn20 库存")
# result["answer"], result["trace"], result["trace_text"]
```

### 4.3 典型业务场景

| 场景 | 输入示例 | 行为 |
|------|----------|------|
| 按编号查 | `8030020580` | 使用 get_inventory_by_code，精确查单条 |
| 按名称查 | `Tee With Cover dn40` | search_inventory，Resolver 或 list.do 匹配 |
| 按规格查 | `pvc dn20`、`gang box 20/56` | 提取规格做向量候选过滤或关键词 fallback |
| 多产品 | `A 和 B`、`A、B` | Pipeline 下拆分为多条独立查表再拼接；ReAct 下由 LLM 决定多次调用 |

---

## 5. 环境与配置

### 5.1 必需

- **LLM**：`ZHIPU_API_KEY` 或 `OPENAI_API_KEY`（.env 可放 Agent Team 或 quotation_tracker）
- **AOL**：`AOL_ACCESS_TOKEN`、`AOL_SIGNATURE_SECRET`、`AOL_DATABASE_ID`（缺则工具返回提示）

### 5.2 可选

| 配置 | 默认 | 说明 |
|------|------|------|
| `INVENTORY_ITEM_LIST_SLIM_PATH` | 包内 item-list-slim.xlsx | Resolver 用表路径 |
| `INVENTORY_ENABLE_RESOLVER_VECTOR` | 1 | 是否启用向量 fallback |
| `INVENTORY_RESOLVER_CONTAINS` | both | CONTAINS 列：name \| chinese \| both |
| `TOOL_RESULT_MAX_CHARS` | 8000 | 工具返回截断 |
| `TOOL_EXEC_TIMEOUT` | 35 | 工具单次执行超时（秒） |

### 5.3 依赖

- Python 3.10+  
- openai、pydantic、pandas、openpyxl、python-dotenv  
- 向量：需 `src.cache`（data_platform）、OpenAI embedding；无 src 时 ReAct 工具内降级为 list.do 关键词查表

---

## 6. 输出示例

```
【思考】用户要查 pvc dn20，应调用 search_inventory(keywords="pvc dn20")。

【工具调用】search_inventory
  keywords: 'pvc dn20'

【观察】共 2 条：1. #C11 PVC ... dn20 - LESSO 库存 10 可售 8；2. ...

【回答】共 2 条候选。最匹配的是 #C11 PVC ... dn20 - LESSO：库存 10，可售 8。
```

---

## 7. 测试

- `test_basic.py`：基础调用  
- `test_trace.py`：ReAct 下 trace / trace_text  
- `tests/test_unit.py`、`test_integration_prd.py`、`test_e2e.py`：单元/集成/端到端
