# CEO 审批模式：全局 LLM 替代人工确认

> 目标：成单批准、缺货需求（采购批准）、补货需求（补货确认）等**报价之后的环节**，由**一个全局 LLM（CEO）**统一做「通过/驳回」决策，前端可切换「人工确认」与「CEO 模式」，**尽量少动现有工程**。

**设计取舍**：**报价环节不纳入 CEO 自动化**。报价高度依赖业务知识（客户档位、折扣、无货处理、万鼎/历史匹配等），易变且出错成本高，保留人工「确认并保存」更稳妥。CEO 只负责**报价已落库之后的**成单/缺货批准/补货确认——此时待决数据明确，通过/驳回的决策更适合用 LLM 统一处理。

---

## 1. 当前需要人工确认的环节（CEO 模式仅覆盖其中部分）

| 环节         | 触发点                     | 现有 API / 行为                          | CEO 模式 |
|--------------|----------------------------|------------------------------------------|----------|
| 报价单保存   | 用户点击「确认并保存」     | 前端 → `POST /api/quotation-drafts` 已落库 | **不纳入**（保留人工，业务知识重、易变） |
| 成单批准     | 成单页勾选报价单后确认     | `PATCH /api/quotation-drafts/{id}/confirm` | 纳入     |
| 缺货需求     | 采购页勾选缺货项后批准     | `POST /api/procurement/approve`           | 纳入     |
| 补货需求     | 补货卡片确认执行补货       | `PATCH /api/replenishment-drafts/{id}/confirm` | 纳入     |

共性：**都是「有一份待决数据 → 用户点一下 → 后端执行」**。对**纳入 CEO 模式**的环节：在「用户点一下」时改为**先问 CEO LLM，再根据 LLM 的通过/驳回决定是否调原 API**。报价单保存不经过 CEO，始终由人工确认后落库。

---

## 2. 设计原则（不搞复杂）

- **一个决策体**：所有审批类型共用一个「CEO」LLM 调用，通过 **审批类型 + 上下文摘要** 区分。
- **一种调用方式**：后端提供一个统一入口，例如 `POST /api/ceo/decide`，入参为 `{ "type", "summary", "payload" }`，出参为 `{ "action": "approve" | "reject", "reason?: string" }`。
- **前端模式开关**：全局或 per-page 配置「人工 / CEO」；CEO 模式下，前端在用户点击「确认」时改为调 `ceo/decide`，若 `action=approve` 再调原有 API（如 procurement/approve、confirm 等）。
- **不拆多个 Agent**：不引入 paperclip 的 Issue/Heartbeat/多 Agent 队列，仅借鉴其「单一决策点」思路：**所有要确认的事都汇总到一个地方做决定**。

---

## 3. 可借鉴 paperclip 的点（仅概念）

- **单一决策点**：paperclip 里任务分配给谁由 `assignee`/checkout 决定，执行权在「被指派的 Agent」；这里可类比为「是否执行」的决策权统一交给 CEO。
- **不引入**：不引入 Issue 表、Wakeup 队列、多 Agent 心跳、reportsTo 权限链；只保留「一个 API 调一次 LLM 返回 approve/reject」。

---

## 4. 实现思路（极简）

### 4.1 后端：一个 CEO 决策服务

- **位置**：例如 `backend/server/services/ceo_decision.py` 或 `backend/core/ceo_decision.py`。
- **输入**：
  - `type`：`quotation_confirm`（成单）| `procurement_approve`（缺货批准）| `replenishment_confirm`（补货确认）；报价单保存不调用 CEO。
  - `summary`：一段短文本，描述「当前要批准的是什么」（由调用方从 payload 生成，例如报价单名称+行数、缺货项数量、补货单编号等）。
  - `payload`：可选，原始请求体或关键字段，供 prompt 里引用。
- **输出**：`{ "action": "approve" | "reject", "reason": "..." }`。
- **实现**：一次 LLM 调用（与现有 `llm_client` 复用），system prompt 固定为「你是 CEO，根据业务摘要决定 approve 或 reject，并简短说明理由」；few-shot 可给 1～2 条示例即可。

### 4.2 统一 API

- **路由**：`POST /api/ceo/decide`，body 即上述 `{ type, summary, payload? }`。
- **逻辑**：调用 `ceo_decision.decide(type, summary, payload)`，返回 JSON。**不在此 API 内直接写库或调 procurement/confirm**，保持「只做决策」。

### 4.3 前端

- **模式**：例如 `AppViewState` 或 URL/环境变量增加 `approval_mode: "human" | "ceo"`。
- **流程**：
  - 用户点击「确认/批准」时，若为 CEO 模式：先 `POST /api/ceo/decide`，若返回 `action === "approve"` 再发原有 API（如 `POST /api/procurement/approve`、`PATCH .../confirm`）；若 `reject` 则弹窗展示 `reason`，不调原 API。
  - 人工模式：保持现状，直接调原 API。

### 4.4 摘要生成（避免重复造轮子）

- 各调用方在调 `ceo/decide` 前，用现有数据结构拼一段 `summary` 即可，例如：
  - 报价单确认：`"报价单 draft_no=%s，共 %d 行"`；
  - 采购批准：`"采购批准，共 %d 项"` + 可选 product_key 列表前几条；
  - 补货确认：`"补货单 draft_no=%s，共 %d 行"`。
- 不必再单独做一个「摘要 Agent」，保持简单。

---

## 5. 配置与开关

- **环境变量**：例如 `CEO_APPROVAL_ENABLED=1` 时后端才注册 `/api/ceo/decide`；前端可读 `GET /api/config` 或固定规则决定是否展示「CEO 模式」开关。
- **默认**：建议默认仍为人工，CEO 模式显式开启，便于灰度。

---

## 6. 小结

| 项目       | 做法 |
|------------|------|
| 决策体     | 一个 LLM（CEO），四种 type 共用一个 prompt 模板 |
| 接口       | 单一 `POST /api/ceo/decide`，只返回 approve/reject + reason |
| 前端       | 模式开关 + 先 decide 再调原 API |
| 借鉴       | paperclip 的「单一决策点」思想，不引入其任务队列与多 Agent |
| 复杂度     | 一个服务文件 + 一条路由 + 前端分支，尽量少改现有 API |

这样可以在不加重工程复杂度的前提下，把「人工确认」统一收口到全局 LLM，后续若要加审计日志或策略规则，只需在 `ceo_decision` 内扩展即可。

---

## 7. 实现情景举例

以 **采购批准（缺货需求）** 为例，走一遍 CEO 模式下的完整流程。

### 情景：用户在采购页勾选 3 条缺货项，点击「批准」

**1）前端（CEO 模式）**  
用户点击「批准」后，前端不直接调 `POST /api/procurement/approve`，而是先拼摘要并请求 CEO 决策：

```http
POST /api/ceo/decide
Content-Type: application/json

{
  "type": "procurement_approve",
  "summary": "采购批准：共 3 项。产品：PVC-U Pipe dn25、HDPE Elbow 90° dn40、Conduit 20mm；缺货量分别为 100、50、200。",
  "payload": {
    "items": [
      { "product_key": "101001...", "product_name": "PVC-U Pipe dn25", "shortfall": 100 },
      { "product_key": "102002...", "product_name": "HDPE Elbow 90° dn40", "shortfall": 50 },
      { "product_key": "103003...", "product_name": "Conduit 20mm", "shortfall": 200 }
    ]
  }
}
```

**2）后端**  
`ceo_decision.decide()` 用上述 `type + summary + payload` 调一次 LLM，system 为「你是 CEO，根据摘要决定 approve 或 reject，并简短说明理由」。

**3）CEO 返回（通过时）**

```json
{
  "action": "approve",
  "reason": "三项均为常规管材补货，数量合理，同意采购。"
}
```

**4）前端收到后**  
因 `action === "approve"`，再发原有 API：

```http
POST /api/procurement/approve
Content-Type: application/json

{ "items": [ ... 同上 payload.items ... ] }
```

后续照旧：落库、发邮件、刷新列表。

---

**若 CEO 返回驳回**，例如：

```json
{
  "action": "reject",
  "reason": "Conduit 20mm 单笔 200 件超出常规补货量，建议先确认需求再批准。"
}
```

前端只弹窗展示 `reason`，**不调用** `POST /api/procurement/approve`，列表不变，用户可修改勾选后重试或切回人工模式处理。

---

其他环节（成单确认、补货确认）同理：前端在「确认」前先带 `type` 与对应 `summary/payload` 调 `POST /api/ceo/decide`，仅当 `action === "approve"` 时再调 `PATCH .../confirm` 等原 API。
