# Agent Team version3 — WeCom 接收 Excel 的逻辑说明

## 一、入口与两条独立链路

当前存在 **两条互不打通** 的 WeCom 入口：

| 入口 | 文件 | 触发方式 | 文本 | Excel/文件 |
|------|------|----------|------|------------|
| **HTTP 回调** | `backend/server/api/routes_wecom.py` | 企业微信服务器 POST 到 `/api/wecom/callback` | ✅ 支持 | ❌ **不支持** |
| **长连接 Bot** | `start_wecom_bot.py` → `backend/wecom_bot/client.py` | WebSocket（需 `wecom-aibot-sdk`）或 Dummy 命令行 | ✅ 支持 | ✅ Excel + 图片（仅真实 SDK） |

- **HTTP 回调**：只解析 `MsgType=text`，其它类型（含文件）统一回复「暂时只支持文本消息」。
- **长连接 Bot**：真实 `WeComBotClient` 注册了 `message.text` 和 `message.file`。**Excel**（.xlsx/.xlsm）走 `handler.handle_wecom_file`；**图片**（.png/.jpg/.jpeg/.bmp/.webp）走 GLM-OCR 识别后拼进 user 消息再 `handle_wecom_message`，与 Chat 行为一致（依赖 `GLM_OCR_ENABLED`、`GLM_OCR_API_KEY`、`GLM_OCR_BASE_URL`）。Dummy 客户端只有 stdin 文本，**没有文件输入**。

因此：**通过企业微信「HTTP 回调」发来的 Excel/图片当前不会被处理**；只有用 **wecom-aibot-sdk 长连接** 时，Excel 与图片才会被接收并处理。

---

## 二、Excel 读取与摘要逻辑（长连接链路）

当用户通过 **长连接** 发送 Excel 时，流程如下。

### 2.1 文件消息处理（client.py）

1. **事件**：`message.file` → `_on_file_message`。
2. **类型分支**：按 `filename` 后缀区分：**Excel**（.xlsx/.xlsm）→ 下载、落盘、`handle_wecom_file`；**图片**（.png/.jpg/.jpeg/.bmp/.webp）→ 下载、GLM-OCR、拼成 user 消息后 `handle_wecom_message`；其它类型提示「当前仅支持 Excel 报价单或图片（.png/.jpg 等），请改用支持的类型或 Web 控制台上传。」。
3. **下载**：从 `body.file.url` + `aeskey` 调用 `_download_file_with_retry()`（内部 `self._ws.download_file()`），**有限次重试**（2～3 次、指数退避）且仅对 `httpx.ConnectTimeout` / `httpx.ReadTimeout` / `asyncio.TimeoutError` 重试；整体超时由 `Config.WECOM_FILE_DOWNLOAD_TIMEOUT`（默认 60 秒）控制。超时或失败时向用户回复「文件下载超时，可能是网络或地域限制，请稍后重试或改用 Web 控制台上传。」或「文件下载失败…」。
4. **Excel 落盘**：保存到 `Config.UPLOAD_DIR / "wecom" / {safe_user} / {timestamp}_{filename}`。
5. **交给 handler**：Excel → `handle_wecom_file(agent, from_user, str(local_path))`；图片 → 不落盘，OCR 后直接 `handle_wecom_message`。

### 2.2 handle_wecom_file（handler.py）

1. **session_id**：`_get_current_session_id(from_user)` → `wecom:{from_user}:{timestamp}`（同一用户复用同一 session，直到 `/new` 或新 timestamp 逻辑）。
2. **生成摘要**：`_build_excel_summary_entry(norm_path)` 内部：
   - `generate_excel_summary(file_path)`（见下）；
   - `put_excel_summary(file_path, summary)` 写入进程内缓存，得到 `ExcelSummaryEntry`（含 `file_id`）。
3. **绑定会话**：`_bind_session_file_path(agent, session_id, norm_path)` 把 `file_path` 写到当前 session 的 **内存** 中（见缺陷 3）。
4. **后台绑定上下文**：`asyncio.create_task(_bind_with_agent_background())` 用固定文案「用户刚刚在企业微信上传了一份 Excel 报价单…」调用 `agent.execute_react`，把 `file_path` / `file_id` 带入 context，不阻塞用户。
5. **立即回复**：根据 summary 的 `meta`（行数、预览行数、是否截断）拼一段确认文案，例如「已成功接收并解析 Excel 报价单…」。

### 2.3 Excel 摘要生成（excel_summary.py）

- **generate_excel_summary(file_path)**：
  - 用 `extract_inquiry_items`（报价工具）得到「询价行」列表 + `rows_count`；
  - 用 `parse_excel_smart` 生成前若干行的 Markdown 预览；
  - 返回 `ExcelSummary`：`meta`、`items`（前 max_items 条）、`raw_preview_md`、`problems`。
- **put_excel_summary**：按 `file_id`（路径 sha1 前 16 位）写入 `_SUMMARY_CACHE`，供后续按 `file_id` / `file_path` 取用。

### 2.4 后续文本消息如何带上 Excel（handler.py）

- 用户再发 **文本** 时走 `handle_wecom_message`。
- **context**：`_load_wecom_session_context(agent, session_id)` 从 session store 读出当前 session 的 `file_path`，再 `make_file_id(norm_path)` 得到 `file_id`，返回 `{ "file_path", "file_id" }`。
- 该 context 会传给 `agent.execute_react(user_input, context=context, session_id=session_id)`。

### 2.5 Agent 侧如何使用 Excel（core/agent.py）

- `execute_react` 收到 `context` 后：
  - 若 `ctx` 带 `file_id` 或 `file_path`，则 `get_excel_summary_for_context(ctx)` 从缓存取 `ExcelSummaryEntry`；
  - 若有 entry，用 `format_excel_summary_for_prompt(entry)` 生成一段摘要文本，**以 system 消息追加** 到 messages；
  - 同时在 user 消息里追加 `[Context: 已上传报价单，file_path=...]` 和 `file_id` 说明；
  - 若本轮 `context` 带 `file_path`，会写回 `session.file_path`，并参与 `build_injection`（会话历史里会带上「已上传文件」）。
- 工具（如无货登记、询价填充）通过参数 `file_path` 使用同一份 Excel；`file_id` 用于在摘要缓存中定位同一文件。

---

## 三、已发现的缺陷与注意点

1. **HTTP 回调完全不处理文件**  
   `routes_wecom.py` 只处理 `MsgType == "text"`，企业微信通过 **HTTP 回调** 发来的文件消息会被直接拒绝，不会下载、不会解析、也不会进 session。若希望 HTTP 模式也支持 Excel，需要在该路由中解析文件类消息并调用下载 + `handle_wecom_file` 的等价逻辑（或抽成共用服务）。

2. **session_id 不一致**  
   - HTTP 回调用的是 `wecom_chat_bridge.handle_wecom_text`，内部写死 `session_id = f"wecom:{from_user}"`。  
   - 长连接 handler 用 `_get_current_session_id(from_user)` → `wecom:{from_user}:{timestamp}`。  
   两套入口的会话不共用，且 HTTP 回调侧没有 `file_path`/`file_id` 的注入，也没有使用 handler 的 session 与 Excel 逻辑。

3. **仅上传 Excel 时 file_path 未持久化**  
   `_bind_session_file_path` 只做了 `session.file_path = file_path`（内存），而 `SessionStore` 没有单独的「只保存 session 元数据」的 API，`file_path` 要等到下一次 `save_turn` 才会被写入磁盘。若在上传 Excel 后、用户尚未发送下一条文本前 **进程重启**，则从磁盘重新 load 的 session 会丢失 `file_path`，后续文本消息就带不上 Excel 上下文。  
   改进方向：在 `_bind_session_file_path` 后增加一次「只持久化 session 状态」的写入，或在 SessionStore 增加 `save_session_meta(session_id, file_path=...)` 并在绑定时调用。

4. **Dummy 客户端无法模拟 Excel**  
   `DummyWeComBotClient` 仅从 stdin 读文本，构造 `msg_type="text"` 的消息，没有模拟 `message.file` 或本地文件路径的入口，本地调试 Excel 流程需用真实 SDK 或单独写脚本调用 `handle_wecom_file`。

5. **.xls 未在长连接中支持**  
   `client.py` 里只判断 `.xlsx` / `.xlsm`，与 `routes_upload.py` 的 `.xlsx/.xls/.xlsm` 不一致；若需在 WeCom 侧支持旧版 `.xls`，需在 `_on_file_message` 中扩展后缀判断并在摘要生成处兼容。

6. **文件下载 ConnectTimeout（云端部署）**  
   若日志出现「下载 WeCom 文件失败」且异常为 `httpx.ConnectTimeout`，多为服务端（如 Render 海外节点）无法直连企业微信文件 CDN 或连接建立过慢。**排查**：优先检查网络可达性；若企业微信文件服务需经代理访问，配置 `WECOM_BOT_PROXY_URL`（wecom-aibot-sdk 若支持则文件下载会走该代理）。当前实现已对下载做有限次重试与整体超时（`WECOM_FILE_DOWNLOAD_TIMEOUT`，默认 60 秒），超时后向用户返回明确提示「文件下载超时，可能是网络或地域限制…」。

---

## 四、流程简图（长连接 + Excel）

```
用户发文件(Excel) 
  → WeComBotClient._on_file_message 
  → 下载 → 落盘 UPLOAD_DIR/wecom/{user}/{ts}_{name}
  → handle_wecom_file 
      → generate_excel_summary + put_excel_summary（进程内缓存）
      → _bind_session_file_path（内存 session.file_path）
      → create_task(execute_react(固定文案))（后台带 file_path/file_id）
  → 立即返回「已成功接收并解析…」

用户再发文本 
  → handle_wecom_message 
  → _load_wecom_session_context → context = { file_path, file_id }
  → execute_react(user_text, context, session_id)
  → get_excel_summary_for_context(ctx) → format_excel_summary_for_prompt → 注入 system
  → 工具调用时可使用 context 中的 file_path / file_id
```

---

## 五、相关文件一览

| 文件 | 作用 |
|------|------|
| `backend/server/api/routes_wecom.py` | HTTP 回调，仅文本 |
| `backend/server/services/wecom_chat_bridge.py` | HTTP 文本 → Agent，无 file_path/会话复用 |
| `backend/wecom_bot/client.py` | 长连接/Dummy 客户端，文件下载与路由到 handler |
| `backend/wecom_bot/handler.py` | handle_wecom_message / handle_wecom_file，session 与 Excel 绑定 |
| `backend/tools/quotation/excel_summary.py` | 摘要生成与缓存、format_excel_summary_for_prompt |
| `backend/core/agent.py` | execute_react 中根据 context 注入 Excel 摘要与 file_path |
| `backend/agent/session.py` | Session.file_path、SessionStore 持久化 |

如需在 HTTP 回调中支持 Excel 或统一两套 session 逻辑，可以在上述入口和 handler 层做扩展与复用。
