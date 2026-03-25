# 无货 / 缺货提醒：Email 与企业微信群机器人

本文说明 **第二次** 被报无货或缺货时的提醒机制、环境变量与触发路径。

## 触发条件（与代码一致）

1. **无货（OOS）/ 缺货（Shortage）**：同一 `product_key`（品名 + 规格）被第**二次**报告时（即 `count = 2`），触发首次提醒；之后每超过冷却间隔再次触发。
   - `count` 语义：该产品被第 N 次报告无货/缺货
   - `count = 1` → 首次出现，不发提醒
   - `count = 2` → 第二次出现，触发首次提醒
2. **冷却**：成功发送一次后，在 `EMAIL_COOLDOWN_HOURS` 小时内不重复发（`0` 表示仅首次 `count=2` 发一次，之后不再发）。

> 字段仍名为 `last_email_sent_at` / `email_sent_*`，但语义为「**该轮提醒已发送**」，在 `wecom_only` 或 `both` 模式下同样会更新这些字段。

## 提醒通道：`OOS_ALERT_MODE`

| 值 | 行为 |
|----|------|
| `email_only`（默认） | 仅发邮件（需配置 SMTP 或 Gmail API） |
| `wecom_only` | 仅推送到企业微信群机器人（需 Webhook） |
| `both` | 邮件与群消息各发一次；**任一路成功**即视为本轮成功并打冷却标记 |

## Email：你需要提供什么

### 通用

- **`EMAIL_RECIPIENTS`**：逗号分隔的收件人邮箱（**必填**，否则 `is_email_configured()` 为 false，邮件路径不工作）。
- **`EMAIL_COOLDOWN_HOURS`**：冷却小时数，默认 `24`。

### 方式 A：SMTP（任意支持 SMTP 的邮箱）

- **`EMAIL_SMTP_HOST`**、**`EMAIL_SMTP_PORT`**（默认 587）
- **`EMAIL_USERNAME`**、**`EMAIL_PASSWORD`**（Gmail/企业邮箱多为「应用专用密码 / 授权码」）
- **`EMAIL_FROM`**：发件人显示地址（可等于 `EMAIL_USERNAME`）

### 方式 B：Gmail API（OAuth2，优先于 SMTP）

若同时配置了 Gmail 与 SMTP，**优先走 Gmail API**；Gmail 失败时**不会**自动回退 SMTP（见 `email_service._send_mail`）。

- **`GMAIL_REFRESH_TOKEN`**
- **`GMAIL_CLIENT_ID`**
- **`GMAIL_CLIENT_SECRET`**
- 仍需 **`EMAIL_RECIPIENTS`**
- Python 依赖：`google-auth`、`google-api-python-client`

### 采购批准邮件

- **`PROCUREMENT_EMAIL_RECIPIENTS`**：可选；不填则回退到 `EMAIL_RECIPIENTS`。仍要求邮件整体已配置（`is_email_configured()`）。

配置加载：`backend/tools/oos/config.py` 会读取同目录下的 `.env`（若存在）。可复制 [`backend/tools/oos/.env.example`](../backend/tools/oos/.env.example) 为 `.env`。

## 企业微信群机器人：你需要提供什么

1. 在企业微信 **客户群 / 内部群** 中添加 **群机器人**，复制 **Webhook 地址**。
2. 设置环境变量：
   - **`WECOM_GROUP_WEBHOOK_URL`**：完整 Webhook URL（**勿提交到仓库**）。
   - **`WECOM_GROUP_ALERT_ENABLED`**：设为 `true` 开启群推送（**默认关闭**）。
3. **@成员**（可选）：
   - **`WECOM_GROUP_MENTIONED_MOBILE_LIST`**：逗号分隔的手机号，对应文档中的 `mentioned_mobile_list`（需群内成员手机号可见）。
   - **`WECOM_GROUP_MENTIONED_USERIDS`**：逗号分隔的企业微信 `userid`，对应 `mentioned_list`。
   - 若需 **@所有人**，在 `WECOM_GROUP_MENTIONED_USERIDS` 中填 `@all`（企业微信机器人文档约定）。

实现：`backend/tools/oos/services/wecom_group_service.py`（`msgtype: text`，POST JSON）。

## 长连接机器人 vs 群告警：与当前代码是否一致

项目里企业微信有 **两条独立能力**，不要混成一条：

| 能力 | 代码入口 | 行为 | 适用场景 |
|------|----------|------|----------|
| **长连接智能机器人** | `backend/wecom_bot/client.py` 的 `WeComBotClient`，底层 `wecom-aibot-sdk` 的 `WSClient` | 收到文本/文件等事件后，对**当前这条消息**调用 `reply_stream` 把结果回给用户（可加一条「已收到…」确认流） | 用户主动在企业微信里找机器人说话、传 Excel：走 `handle_wecom_message` / `handle_wecom_file` → `CoreAgent.execute_react` |
| **群机器人 Webhook** | `backend/tools/oos/services/wecom_group_service.py` | 服务端 **HTTP POST** 到群机器人的 Webhook URL，**不依赖**是否有人刚发过消息 | 无货/缺货在报价流水线、工具落库等**后台路径**触发：`alert_dispatch` → 群通知 |

### 判断：「全部改成长连接推群」是否切合当前实现？

**当前仓库里不切合**：长连接侧只实现了 **「有入站 frame → 再 reply」**；`alert_dispatch` 在 Worker/管道/工具里是 **同步触发**，没有对应的 WeCom `frame`，代码里也 **没有** 暴露 `send_text_to_group(chat_id)` 或全局 client 供告警线程直接调用。若强行「只走长连接」，需要另行集成企业微信**主动发消息**能力（视 SDK/开放平台是否支持对指定群/用户主动推送）、进程内 client 生命周期、以及同步告警与 async 发送的桥接——那是**另一套改造**，不是把现有 Webhook 换个名字即可。

**与现状一致的做法**：

- **对话 / 报价 Agent**：继续用 **长连接 + `CoreAgent`**（你描述的 chat 处理方式是 **对的**，与 `wecom_bot/handler.py` 一致）。
- **无货/缺货/类运营告警到群**：继续用 **`wecom_only` → 群机器人 Webhook**（或将来再接应用消息 API），与长连接**解耦**，也不依赖 WS 进程是否存活。

### 若以后要做「统一事件总线 + 长连接推送」

可作为演进方向单独设计（例如：`alert_bus`、统一 `dispatch_alert(event)`、采购/价差等扩展），但需先明确 **主动推送** 的官方接口与运行形态，再新增模块；**不会自动替代**当前 Webhook 路径，除非明确迁移并做兼容测试。

## 新增：应用消息 API 中转（`/agent/notify`）

为支持 Agent/监控系统主动告警，v3 新增了基于企业微信「应用消息 API」的中转能力：

- 路由：`POST /agent/notify`
- 实现：`backend/server/api/routes_notify.py` + `backend/wecom_bot/notification_service.py`
- 能力：`text` / `markdown`，目标支持 `to_users` / `to_parties` / `to_tags`

请求示例：

```json
{
  "msg_type": "markdown",
  "content": "**告警通知**\n> 价格跌破90",
  "to_users": ["zhangsan", "lisi"],
  "to_parties": ["inventory_team"],
  "to_tags": ["alerts"],
  "priority": "high"
}
```

### 群消息限制（重要）

企业微信应用消息 API 默认不支持「直接按内部群 ID 发送」。

当前策略：

- 对内部群告警，使用 `touser` 对群成员进行广播（例如 `zhangsan|lisi|wangwu`）。
- `to_parties` 字段支持别名映射：如 `inventory_team` 可映射为用户列表再并入 `touser`。
- 若 `to_parties` 无别名映射，则按部门 ID 发送（`toparty`）。

别名配置（可选）：

- `WECOM_GROUP_ALIAS_MAPPING=inventory_team:zhangsan|lisi,alerts_group:wangwu|zhao`

### Token 缓存

`notification_service.py` 内置 access token 缓存（默认 7200 秒，提前 5 分钟刷新），避免每次发送都调用 `gettoken`，降低延迟与 API 压力。

## 代码触发路径

| 场景 | 入口 | 调用 |
|------|------|------|
| Agent 工具落库无货 | `persist_out_of_stock_records` | `alert_dispatch.dispatch_out_of_stock_alert` |
| 管道处理 Excel 落库 | `QuotationProcessor.process_file` | `dispatch_out_of_stock_alert` |
| Work 报价匹配缺货 | `work_quotation_match` → `_persist_shortage_records_and_alerts` | `dispatch_shortage_alert` |

采购批准仍仅走 **邮件**：`send_procurement_approval_email`（未接群机器人）。
