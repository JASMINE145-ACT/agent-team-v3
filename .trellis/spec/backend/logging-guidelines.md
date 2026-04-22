# Logging Guidelines

> How logging is done in Agent Team version3 backend.

---

## Overview

| Item | Value |
|------|-------|
| Library | Python standard `logging` |
| Pattern | `logging.getLogger(__name__)` — one logger per module |
| No `print()` | All output via logger calls |
| Format | Default `logging.basicConfig()` (timestamp + level + logger + message) |

---

## Log Levels

| Level | When to Use | Example |
|-------|-------------|---------|
| `DEBUG` | Tool input args, detailed execution flow, cache hits | `logger.debug("缓存命中: key=%s", key)` |
| `INFO` | Business events, successful operations, initialization | `logger.info("InventoryAgent 初始化完成")` |
| `WARNING` | Recoverable errors (network retry, missing optional dep, malformed input) | `logger.warning("API 返回错误: %s", result)` |
| `ERROR` | Unrecoverable failures, final attempt failures after retries | `logger.error("调用 list.do API 失败: %s", e)` |

---

## What to Log

### ✅ Must log

- **Tool entry/exit**: `"_execute_match_quotation called with keywords=%s"`, `"_execute_match_quotation returned %d candidates"`
- **LLM calls**: model name, provider, token usage (at INFO level)
- **DB operations**: query success/failure, row counts (at INFO/WARNING)
- **Retry attempts**: `"查询失败（尝试 %d/%d）: %s"` before retry
- **Final failures**: `"查询最终失败: %s"` (ERROR)
- **Startup initialization**: each agent/tools initialized, which mode
- **Business events**: `"按 Code 拉取: %d 个 code -> %d 条"`, `"多词条分层结果: %d 组"`

### ✅ Should log

- Slow queries (> 1s): WARNING with duration
- Cache invalidation/clearing events
- Rework corrections recorded
- Table name auto-repair

---

## What NOT to Log

### ❌ Never log

- **API keys / tokens** (`OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, etc.)
- **`DATABASE_URL`** (contains credentials)
- **Full request bodies** with user input beyond what's needed for debugging
- **PII**: customer names, phone numbers, addresses in plain text
- **LLM raw responses** in production (too large, may contain sensitive context)

### ⚠️ Sanitize before logging

If you must log something that might contain secrets:

```python
# ❌ Wrong
logger.info("API key: %s", api_key)

# ✅ Correct — only log that it exists or the last 4 chars
logger.info("API key set: %s", f"...{api_key[-4:]}")
```

---

## Real-World Examples from Codebase

### Tool handler (entry/exit + args):

```python
logger.info("wanding_fuzzy_matcher: loaded %d rows from DB (level=%s)", len(df), level)
logger.warning("_try_load_from_db 失败，将 fallback 读 xlsx: %s", e)
logger.info("wanding_fuzzy_matcher: DataFrame caches cleared")
```

### API client (request/response):

```python
logger.info(f"发送 GET 请求: {endpoint} (URL: {url})")
logger.info(f"✓ GET 请求成功: {endpoint}")
logger.warning(f"API 返回错误: {result}")
logger.error(f"GET 请求超时: {endpoint}")
```

### Retry patterns:

```python
logger.warning(f"查询失败（尝试 {attempt + 1}/{max_retries + 1}）: {e}")
# ... retry ...
logger.error(f"查询最终失败: {e}")
```

---

## Anti-Patterns

| ❌ Wrong | ✅ Correct |
|----------|-----------|
| `print(f"Result: {data}")` | `logger.debug("Result: %s", data)` |
| `logger.info(f"User {user_id} with key {api_key}")` | `logger.info("User %s API key set", user_id)` |
| `logger.error("Failed", exc_info=True)` without context | `logger.error("fetch_all_price_library 失败: %s", e)` |
| `logger.debug("Entering function")` with no exit log | Paired entry/exit at same level |
