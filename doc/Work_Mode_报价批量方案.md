# Work Mode：报价批量处理方案（思路与设计）

## 1. 目标与和 Chat 的差异

| 维度 | Chat 模式 | Work 模式 |
|------|-----------|-----------|
| **Plan** | 无显式计划，ReAct 直接选工具 | **先产出 Plan，再按计划执行** |
| **执行** | ReAct：<think> → 选工具 → observation → 循环 | **仍为 ReAct**，但每步与计划对应，**每个工具都经历 ReAct**（模型决定调用、观察结果、再下一步） |
| **文件** | 单文件（context.file_path） | **多文件**：一次可传入多张报价单，计划中按文件编排步骤 |
| **用途** | 通用对话、单单询价、无货登记、统计等 | **专门批量完成报价单流程**：读取 → 匹配/库存 → 回填 → 缺货报告 → 无货登记等 |

核心：Work 模式 = **Plan 阶段 + 多文件 + 计划驱动的 ReAct 执行**，执行时仍是「每一步都由模型选工具、看结果」，而不是固定流水线自动跑完。

---

## 2. 报价单「完整流程」包含的能力

当前 Chat 下是一条龙工具 `run_quotation_fill` 内部写死。拆成可被 Plan 调度的步骤，大致包括：

1. **提取询价项**：从报价单 Excel 解析出每行（产品名、规格、数量等）→ 对应现有 `extract_inquiry_items`
2. **匹配与库存**：对每行做历史匹配 → 万鼎 → 库存，得到 to_fill / shortage / unmatched → 对应 `match_price_and_get_inventory`（可批量调用或保留现有并发逻辑）
3. **回填报价单**：将 to_fill + shortage（标库存不足）+ unmatched（写无货）写回 Excel → `fill_quotation`
4. **缺货报告**：根据 shortage 生成报告 → `generate_shortage_report`
5. **无货登记**：从报价单解析无货行并落库 → 现有 `register_oos`

Work 模式下希望：**这些步骤在 Plan 里显式出现**，执行时**每一步对应一次或多次 ReAct 工具调用**。

---

## 3. 整体流程设计

```
用户进入 Work 模式，传入多个 file_path（或一个列表）
        ↓
【Plan 阶段】一次 LLM 调用（或模板 + 轻量推理）
  输入：file_paths[], 用户意图（默认：完整报价流程 + 无货登记）
  输出：结构化计划 Plan
        ↓
【执行阶段】ReAct 循环，带「当前计划」上下文
  每轮：模型看到「当前计划 + 已完成步骤 + 上轮 observation」
        → 选择下一个要执行的工具（与计划对齐）
        → 执行工具，得到 observation
        → 直至计划完成或失败/用户中断
```

- **多文件**：Plan 中按文件编排，例如「文件 A：步骤 1→2→3→4→5；文件 B：1→2→3→4→5」或「先所有文件的 1，再所有文件的 2…」。
- **每个工具都经历 ReAct**：不自动执行整条流水线，而是每一步都由 ReAct 选工具、传参、看返回，再决定下一步（可重试、跳过、或根据结果改顺序，由 prompt 约束）。

---

## 4. Plan 的形态建议

**方案 A：结构化 JSON（推荐）**

便于程序解析、标注「当前执行到第几步」、支持多文件。

```json
{
  "mode": "quotation_batch",
  "files": [
    { "path": "/path/to/a.xlsx", "name": "报价单A" },
    { "path": "/path/to/b.xlsx", "name": "报价单B" }
  ],
  "steps": [
    { "file_index": 0, "op": "extract" },
    { "file_index": 0, "op": "match_and_inventory" },
    { "file_index": 0, "op": "fill" },
    { "file_index": 0, "op": "shortage_report" },
    { "file_index": 0, "op": "register_oos" },
    { "file_index": 1, "op": "extract" },
    { "file_index": 1, "op": "match_and_inventory" },
    { "file_index": 1, "op": "fill" },
    { "file_index": 1, "op": "shortage_report" },
    { "file_index": 1, "op": "register_oos" }
  ]
}
```

- `op` 与工具对应关系（见下节）。
- 执行时：系统或 prompt 告知「当前执行到 step K/N」，模型按 step[K] 选工具、传对应 file_path，完成后再推进到 K+1。

**方案 B：自然语言计划**

LLM 直接输出「先对文件 A 做提取、匹配、回填、缺货报告、无货登记，再对文件 B 同样步骤」。执行阶段 ReAct 的 system prompt 里带上这段描述，由模型自己「按计划」选工具。实现简单，但解析进度、多文件严格对齐稍弱。

**建议**：先实现方案 A，Plan 可由模板生成（固定顺序 per file），再扩展为 LLM 根据文件数/用户意图生成同样结构。

---

## 5. 工具层：子步骤暴露方式

要让「每个工具都经历 ReAct」且计划可细化到步骤，需要把当前 `run_quotation_fill_flow` 内的步骤拆成**可单独调用的工具**（仅 Work 模式注册或仅在 Work 模式下使用）：

| 计划 op | 工具名（建议） | 说明 | 对应现有实现 |
|--------|----------------|------|--------------|
| extract | `work_quotation_extract` | 从报价单提取询价行 | `extract_inquiry_items` |
| match_and_inventory | `work_quotation_match` | 对已提取的 items 做匹配+库存，返回 to_fill/shortage/unmatched | `flow_orchestrator` 中并发 `match_price_and_get_inventory` 一段 |
| fill | `work_quotation_fill` | 将 to_fill/shortage/unmatched 回填到 Excel | `fill_quotation` |
| shortage_report | `work_quotation_shortage_report` | 根据 shortage 生成报告 | `generate_shortage_report` |
| register_oos | `register_oos` | 无货登记 | 已有，复用 |

- **work_quotation_match**：输入可以是 file_path + 上一步 extract 的 items（或由工具内部再调一次 extract，避免状态在会话里传一大段）。输出与现有 flow 一致：to_fill、shortage、unmatched，供后续 fill 与 shortage_report 使用。
- **状态在 ReAct 中的传递**：extract 的 items、match 的 to_fill/shortage/unmatched 可通过 observation 自然传给下一轮，模型在调用 fill 时从上一轮结果里取参数，或由执行层把「上一步结构化结果」注入到下一轮 context，减少模型拼参数错误。

**多文件**：每个 step 带 file_index，执行时把 `files[file_index].path` 传入对应工具即可；同一文件的多步之间，上一步输出作为下一步输入（由 ReAct 的 history 或执行层缓存）。

---

## 6. 执行层（ReAct + Plan）

- **入口**：Work 模式专属 API 或 ws 消息，例如 `work.run`，入参：`file_paths: string[]`，可选 `customer_level`、`do_register_oos: boolean`。
- **Plan 阶段**：根据 file_paths 生成上述结构化 Plan（模板或 LLM）；若 LLM 生成，需约束输出为同一 JSON schema。
- **执行阶段**：
  - System prompt 增加：当前为 Work 模式、当前计划（全文或当前 step 列表）、已完成步骤列表、当前应执行的 step 索引（或「由你根据计划决定下一步」）。
  - ReAct 循环：每轮模型输出「调用工具 X，参数 Y」；分发器只允许 Work 模式工具集（work_quotation_* + register_oos 等）；执行后把 observation 返回，并更新「已完成步骤」。
  - 多文件并行：若希望「多文件同时处理」，可在 Plan 中把同一 op 的多文件拆成多步，执行时允许模型连续调多次同一工具（不同 file_path），或由执行层对「同一 op 多 file」做并行调用（仍算作多步 ReAct，每步一个 batch 的 observation）。简单实现是先**顺序按文件**执行（如上例 steps 顺序）。
- **结束条件**：计划中所有 step 已完成，或模型输出「完成」/「失败」，或用户中断。

---

## 7. 与 Chat 的隔离

- **路由**：前端或网关根据「模式」把请求派发到 Chat 执行器 vs Work 执行器。
- **工具集**：Chat 保留现有工具（含一条龙 `run_quotation_fill`）；Work 使用「子步骤工具集」+ `register_oos`，不暴露或弱化 `run_quotation_fill`，避免在 Work 中又回到一条龙。
- **上下文**：Chat 的 context 为单 file_path；Work 的 context 为 file_paths[] + 当前 Plan + 已完成步骤。

---

## 8. 实现顺序建议

1. **子步骤工具**：在 `backend/tools/quotation/` 或 `backend/agent/tools.py` 中新增 work_quotation_extract / work_quotation_match / work_quotation_fill / work_quotation_shortage_report，内部复用现有 quote_tools、flow_orchestrator、shortage_report 的逻辑；保持 `run_quotation_fill` 不变，供 Chat 继续用。
2. **Plan 生成**：先做「模板 Plan」：给定 file_paths，生成固定顺序的 steps（每文件 5 步：extract→match→fill→shortage_report→register_oos）。
3. **Work 执行器**：单独 ReAct 循环，system prompt 带 Plan + 当前步骤；只注册 Work 工具集；每步执行后更新进度。
4. **前端/网关**：增加 Work 模式入口（如「批量报价」），支持多文件上传，调用 work.run；展示计划与执行进度（可选）。
5. **扩展**：Plan 由 LLM 生成、或支持「仅部分步骤」（如只做 extract+match 不填表）、多文件并行策略等。

---

## 9. 小结

- **Work 模式** = 专门做**报价单批量完整流程**（读取 → 匹配 → 回填 → 缺货报告 → 无货登记），与 Chat 的「单文件、无计划」区分开。
- **核心区别**：先有 **Plan**（结构化、按文件按步骤），再 **ReAct 执行**，且**每个工具都经历 ReAct**；支持**多文件**，计划中显式编排每文件的各步骤。
- **实现关键**：把报价流程拆成可单独调用的子步骤工具，用结构化 Plan 驱动 ReAct，执行层只认 Work 工具集并维护「当前计划 + 已完成步骤」。

以上方案可直接作为开发与评审依据；具体接口命名、API 路径、前端交互可再按项目规范微调。
