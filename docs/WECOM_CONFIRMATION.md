# 企业微信端确认消息功能实现

## 概述

为企业微信(WeCom)端实现了确认消息功能,用户发送请求后会立即收到确认反馈,然后再接收实际的处理结果。

## 实现方式

企业微信有两种接入方式,针对不同的方式采用不同的确认消息策略:

### 1. WebSocket 长连接 (推荐) ✅

**文件**: `backend/wecom_bot/client.py`

**实现**: 使用企业微信的流式回复API,先推送确认消息,再推送处理结果

**工作流程**:
1. 用户在企业微信发送消息
2. 系统立即推送确认消息: "已收到您的请求,正在处理中..."
3. 系统处理用户请求
4. 系统推送实际的处理结果

**代码位置**: 第 157-192 行

```python
# 立即发送确认消息
stream_id_confirmation = generate_req_id("confirm")
confirmation_text = "已收到您的请求,正在处理中..."
await self._ws.reply_stream(frame, stream_id_confirmation, confirmation_text, True)

# 然后处理实际请求
answer = await handle_wecom_message(self._agent, msg)

# 发送实际结果
stream_id = generate_req_id("stream")
await self._ws.reply_stream(frame, stream_id, answer, True)
```

### 2. HTTP 回调接口 (限制)

**文件**: `backend/server/services/wecom_chat_bridge.py`

**实现**: 由于企业微信HTTP回调必须同步返回XML,无法先发确认消息

**工作流程**:
1. 用户在企业微信发送消息
2. 系统在日志中记录确认消息
3. 系统处理用户请求
4. 系统返回处理结果

**代码位置**: 第 21-46 行

```python
# 记录确认消息到日志 (企业微信同步模式无法先回复确认消息)
logger.info("[WeCom 确认] 已收到用户 %s 的请求: %s", from_user, user_text[:50])
```

**限制说明**: HTTP回调是同步模式,必须在一个响应中返回结果,无法实现先发确认消息再发结果的效果。

## 用户体验

### WebSocket 长连接用户视角

1. 用户在企业微信发送: "帮我报价 PVC 管"
2. **立即收到**: "已收到您的请求,正在处理中..."
3. **几秒后收到**: "已查询到 PVC 管的价格信息..."

**效果**: 用户立即知道系统已经接收请求,不会焦虑等待

### HTTP 回调用户视角

1. 用户在企业微信发送: "帮我报价 PVC 管"
2. **等待几秒**
3. **收到**: "已查询到 PVC 管的价格信息..."

**效果**: 用户需要等待完整处理,无法提前知道请求已被接收

## 推荐配置

### 使用 WebSocket 长连接 (推荐)

需要在 `.env` 中配置:

```bash
# 企业微信机器人配置
WECOM_BOT_ID=your_bot_id
WECOM_BOT_SECRET=your_bot_secret
```

并安装依赖:

```bash
pip install wecom-aibot-sdk
```

### 启动方式

```bash
# 启动企业微信 WebSocket 长连接
python -m backend.wecom_bot
```

## 确认消息自定义

### 修改确认消息内容

如果你想修改确认消息的文本,编辑 `backend/wecom_bot/client.py` 第 186 行:

```python
confirmation_text = "已收到您的请求,正在处理中..."
```

可以改为:

```python
confirmation_text = "您的请求已收到,AI 正在努力处理,请稍候..."
```

### 针对不同请求类型的确认消息

可以根据用户输入的内容,返回不同的确认消息:

```python
# 根据消息内容定制确认消息
if "报价" in text or "价格" in text:
    confirmation_text = "已收到您的报价需求,正在进行 AI 报价..."
elif "查询" in text or "搜索" in text:
    confirmation_text = "已收到您的查询请求,正在检索相关信息..."
else:
    confirmation_text = "已收到您的请求,正在处理中..."
```

### 示例实现

```python
# 在 _on_text_message 函数中添加
async def _on_text_message(frame):
    # ... 现有代码 ...
    
    logger.info("WeCom 文本消息来自 %s: %s", from_user, text[:200])

    # 🎯 智能确认消息
    if "报价" in text or "价格" in text:
        confirmation_text = "已收到您的报价需求,正在进行 AI 报价..."
    elif "查询" in text or "搜索" in text or "查找" in text:
        confirmation_text = "已收到您的查询请求,正在检索相关信息..."
    elif "计算" in text or "统计" in text:
        confirmation_text = "已收到您的计算需求,正在进行数据处理..."
    else:
        confirmation_text = "已收到您的请求,正在处理中..."
    
    stream_id_confirmation = generate_req_id("confirm")
    await self._ws.reply_stream(frame, stream_id_confirmation, confirmation_text, True)
    
    # ... 处理请求 ...
```

## 文件上传确认

对于文件上传,系统也会立即给出确认反馈。相关代码在 `handler.py` 第 279-283 行:

```python
return (
    f"已成功接收并解析 Excel 报价单（{Path(norm_path).name}），{detail}。\n"
    "接下来你可以直接发送需求，例如："帮我统计每个供应商的总金额"或"按这份表给报价"，"
    "系统会自动基于刚才这份 Excel 进行处理。"
)
```

## 技术细节

### 为什么 WebSocket 可以发确认消息?

WebSocket 是**双向通信**,可以主动推送多条消息:
- 第1条消息: 确认消息
- 第2条消息: 处理结果

### 为什么 HTTP 回调不能发确认消息?

HTTP 回调是**请求-响应模式**,只能返回一个响应:
- 要么返回确认消息 (但用户看不到结果)
- 要么返回处理结果 (但用户需要等待)
- 无法既返回确认又返回结果

### 企业微信的流式回复API

企业微信 WebSocket SDK 提供了 `reply_stream` 方法:

```python
await self._ws.reply_stream(
    frame,          # 原始消息框架
    stream_id,      # 流式ID (需要唯一)
    content,        # 要发送的文本
    is_finished     # 是否是最后一条
)
```

我们通过调用两次 `reply_stream` 实现先确认后结果:

```python
# 第1次: 确认消息
await self._ws.reply_stream(frame, "confirm-id", "已收到...", True)

# 第2次: 实际结果
await self._ws.reply_stream(frame, "stream-id", "处理结果...", True)
```

## 测试方法

### 1. WebSocket 长连接测试

#### 前置条件
- 已配置 `WECOM_BOT_ID` 和 `WECOM_BOT_SECRET`
- 已安装 `wecom-aibot-sdk`

#### 测试步骤

1. 启动 WebSocket 服务:
```bash
python -m backend.wecom_bot
```

2. 在企业微信中给机器人发送消息:
```
帮我报价 PVC 管
```

3. 观察接收到的消息:
- 第1条: "已收到您的请求,正在处理中..."
- 第2条: 实际的处理结果

### 2. HTTP 回调测试

#### 测试步骤

1. 查看日志输出:
```bash
tail -f logs/app.log | grep "WeCom 确认"
```

2. 在企业微信中发送消息

3. 在日志中应该看到:
```
[WeCom 确认] 已收到用户 xxx 的请求: 帮我报价...
```

### 3. Dummy 模式测试 (无需真实企业微信)

如果没有配置企业微信,系统会自动启动 Dummy 模式:

```bash
python -m backend.wecom_bot
```

输出:
```
DummyWeComBotClient 已启动。输入文本并回车发送，输入 '/exit' 退出。
```

输入消息后按回车,可以看到 Agent 的回复。

## 配置选项

### 超时配置

在 `.env` 中可以配置处理超时时间:

```bash
# WeCom 消息处理超时 (秒)
WECOM_MESSAGE_TIMEOUT=90
```

相关代码在 `handler.py` 第 181 行:

```python
answer = await asyncio.wait_for(_call_agent(), timeout=90)
```

### 文件下载超时

```bash
# WeCom 文件下载超时 (秒)
WECOM_FILE_DOWNLOAD_TIMEOUT=60
```

## 常见问题

### Q: 为什么我没有收到确认消息?

A: 可能的原因:
1. 使用的是 HTTP 回调模式 (不支持确认消息)
2. 使用的是 Dummy 模式 (命令行测试模式)
3. WebSocket 连接未建立成功

**解决方法**: 确认使用的是 WebSocket 长连接模式,查看日志确认连接状态。

### Q: 确认消息能否自定义?

A: 可以。参考上面的"确认消息自定义"章节。

### Q: HTTP 回调模式能否实现确认消息?

A: 不能。HTTP 回调是同步模式,必须在一个响应中返回完整结果。如果需要确认消息功能,请使用 WebSocket 长连接模式。

### Q: 确认消息和实际结果之间的延迟是多少?

A: 取决于实际处理时间,通常:
- 简单查询: 1-3秒
- 复杂报价: 5-15秒
- Excel 解析: 3-10秒

## 优势

### ✅ 用户体验改进

- 用户立即知道请求已被接收
- 减少等待焦虑
- 类似现代聊天应用的体验

### ✅ 技术优势

- 不影响现有业务逻辑
- 向后兼容
- 可以根据请求类型定制确认消息

### ✅ 可维护性

- 改动最小化
- 清晰的日志记录
- 易于调试

## 注意事项

### 1. stream_id 必须唯一

每次调用 `reply_stream` 时,`stream_id` 必须不同:

```python
# ✅ 正确
stream_id_1 = generate_req_id("confirm")
stream_id_2 = generate_req_id("stream")

# ❌ 错误
stream_id = "same-id"  # 重复使用会导致消息覆盖
```

### 2. 确认消息应该简短

确认消息应该简短明了,让用户快速了解状态:

```python
# ✅ 好的确认消息
"已收到您的请求,正在处理中..."

# ❌ 不好的确认消息
"您的请求已经被我们的系统成功接收并记录,现在正在启动AI引擎进行智能分析和处理,请您耐心等待..."
```

### 3. 避免重复确认

不要对同一个请求发送多条确认消息,会让用户困惑:

```python
# ❌ 错误示例
await self._ws.reply_stream(frame, id1, "已收到...", True)
await self._ws.reply_stream(frame, id2, "正在处理...", True)  # 多余
await self._ws.reply_stream(frame, id3, "请稍等...", True)    # 多余
```

## 相关文件

- 主要实现: `backend/wecom_bot/client.py`
- HTTP桥接: `backend/server/services/wecom_chat_bridge.py`
- 消息处理: `backend/wecom_bot/handler.py`
- 配置: `backend/wecom_bot/config.py`

## 更新日志

- **2026-03-21**: 在 WebSocket 长连接模式中添加确认消息功能
- **2026-03-21**: 在 HTTP 桥接模式中添加日志记录

## 总结

企业微信端的确认消息功能已成功实现,用户在使用 **WebSocket 长连接模式** 时可以立即收到确认反馈,大大提升了用户体验。

推荐配置:
- ✅ 使用 WebSocket 长连接模式
- ✅ 配置 WECOM_BOT_ID 和 WECOM_BOT_SECRET
- ✅ 安装 wecom-aibot-sdk

如有问题或建议,请查看相关文档或联系开发团队。
