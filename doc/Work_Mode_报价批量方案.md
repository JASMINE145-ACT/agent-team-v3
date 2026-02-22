# Work Mode：报价批量处理方案（固定流程 + ReAct）

## 1. 目标与和 Chat 的差异

| 维度 | Chat 模式 | Work 模式 |
|------|-----------|-----------|
| **Plan** | 无 | **无**（流程固定，不需要显式计划） |
| **执行** | ReAct：<think> → 选工具 → observation → 循环 | **ReAct**：每步只调一个工具、看 observation 再下一步，**每个工具都经历 ReAct** |
| **流程** | 由 prompt 约定调 run_quotation_fill 一条龙 | **固定三步**：1.识别表数据 2.查价格与库存（无货登记、缺货记录）3.填表 |
| **文件** | 单文件（context.file_path） | **多文件**：一次传入多张报价单，对每个文件按固定三步依次执行 |
| **用途** | 通用对话、单单询价、无货登记、统计等 | **专门批量完成报价单流程** |

核心：Work 模式 = **固定流程 + 多文件 + ReAct 严格执行每步**，不设 Plan 阶段，顺序由 system prompt 约定。

---

## 2. 固定流程（每文件重复）

1. **识别表数据**：`work_quotation_extract(file_path)` → 得到 items。
2. **查价格与库存（无货登记、缺货记录）**：`work_quotation_match(file_path, customer_level)` → to_fill、shortage、unmatched、fill_items_merged；`work_quotation_shortage_report(shortage_items)` 生成缺货报告；可选 `register_oos(file_path)` 无货登记。
3. **填表**：`work_quotation_fill(file_path, fill_items)`，fill_items 来自上一步的 fill_items_merged。

对每个文件依次完成 1→2→3，再处理下一个文件。

---

## 3. 整体流程

```
用户进入 Work 模式，传入 file_paths[]
        ↓
【执行阶段】ReAct 循环，system prompt 中写明固定三步 + 文件列表
  每轮：模型根据「当前应执行的步骤」选工具、传 file_path（及上步结果中的 fill_items_merged 等）
        → 执行工具，得到 observation
        → 直至所有文件处理完毕，模型输出总结、不再调工具
```

- **无 Plan**：不生成 plan JSON，不维护「当前步索引」；顺序完全由 prompt 描述 + 模型按 ReAct 选工具保证。
- **每个工具都经历 ReAct**：不自动流水线，每一步都由模型决定调用哪个工具、传什么参数。

---

## 4. 工具集（仅 Work 模式注册）

| 工具名 | 说明 |
|--------|------|
| work_quotation_extract | 从报价单提取询价行 |
| work_quotation_match | 匹配+库存，返回 to_fill/shortage/unmatched/fill_items_merged |
| work_quotation_fill | 用 fill_items_merged 回填 Excel |
| work_quotation_shortage_report | 根据 shortage 生成缺货报告 |
| register_oos | 无货登记 |

---

## 5. API

- **POST /api/work/run**  
  Body: `{ "file_paths": string[], "customer_level"?: "A"|"B"|"C"|"D", "do_register_oos"?: boolean }`  
  执行固定流程 + ReAct，返回 `{ success, answer, trace, error? }`。  
  无 `/api/work/plan`。

---

## 6. 实现位置（Agent Team version3）

- **工具与执行**：`backend/agent/work_tools.py`（工具定义 + `execute_work_tool_sync`）、`backend/agent/work_executor.py`（`run_work_flow`：固定流程 prompt + ReAct 循环）。
- **路由**：`backend/server/api/routes.py` 中 `POST /api/work/run`。
- **前端**：Control UI 的 Work 页（多文件上传、档位与无货登记开关、执行按钮、结果与步骤记录），无「生成计划」入口。

---

## 7. 小结

- **无 Plan**：流程固定（识别表数据 → 查价格与库存/无货缺货 → 填表），无需显式计划。
- **ReAct**：每步由模型选工具、看 observation，严格按 ReAct 范式。
- **多文件**：对每个文件按固定三步依次执行，由 prompt 约定顺序。
