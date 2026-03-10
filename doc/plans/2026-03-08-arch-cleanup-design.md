# 架构清理设计文档

**日期**：2026-03-08
**范围**：Agent Team version3 后端 + 前端
**方案**：方案 A — 由易到难，3 批次改动

---

## 目标

修复架构审查（2026-03）发现的 5 个问题：

| 优先级 | 问题 |
|--------|------|
| 🔴 高 | JAgentExtension 240+ 行，职责过重 |
| 🔴 高 | 12+ 个 module-level 全局变量无统一管理 |
| 🟡 中 | API 响应格式三套并存 |
| 🟡 中 | 多处 `except Exception: pass` 吞掉异常 |
| 🟡 中 | 前端价格档位硬编码，后端 API 已有但未对接 |

---

## 批次 1 — 低风险

### 1a. 异常处理修复

**目标文件**：`backend/core/agent.py`、`backend/plugins/jagent/extension.py`

所有 `except Exception: pass` 或 `except Exception: logger.debug(...)` 改为：
```python
except Exception:
    logger.warning("xxx 失败，已跳过", exc_info=True)
```
关键路径（工具调用失败）改为 `logger.exception()`。

### 1b. 前端价格档位接 API

**目标文件**：`control-ui/src/ui/views/work.ts`

- mount 时调 `GET /api/config/price-levels`
- 返回结果格式：`{ success: true, data: [{ value, label }] }`
- 加载失败时 fallback 到现有硬编码，并 console.warn

---

## 批次 2 — 中风险

### 统一 API 响应格式

新建 `backend/server/api/contracts.py`：
```python
class ApiResponse(BaseModel):
    success: bool
    data: Optional[Any] = None
    error: Optional[str] = None
```

**迁移规则**：
- `routes_chat.py`：`{"status": "error", "message": ...}` → `{"success": False, "error": ...}`
- `routes_work.py`：混合格式 → 统一
- `routes_oos.py`：已对齐，不动
- 其余路由：检查并对齐

**向后兼容**：前端同步更新检查字段，保证不破坏现有功能。

---

## 批次 3 — 高风险

### 3a. JAgentExtension 拆分

**新建文件**：
- `backend/tools/oos/handler.py`：OOS 工具注册 + 4 个 handler
- `backend/tools/inventory/handler.py`：库存工具注册 + handler
- `backend/tools/quotation/handler.py`：报价工具注册 + handler

**精简**：`backend/plugins/jagent/extension.py` 变为薄聚合层（~60 行），只做三个 handler 模块的组合。

**公共工具**：提取 `unwrap_tool_result(out: dict) -> str` 到 `backend/core/tool_utils.py`，消除重复的 `out.get("result", "") if out.get("success") else ...` 模式。

### 3b. 全局状态规范

**策略**：不搬家（避免过度重构），统一写法 + 加测试重置接口：

```python
# 每个有全局单例的模块，统一提供：
def reset_for_testing():
    global _service
    _service = None
```

供测试隔离使用，不影响生产代码路径。

---

## 测试计划

| 测试文件 | 验证内容 |
|---------|---------|
| `tests/test_api_contracts.py` | 各路由返回 `success` 字段，格式符合约定 |
| `tests/test_oos_handler.py` | OOS handler 注册后可调用，返回正确格式 |
| `tests/test_singleton_reset.py` | `reset_for_testing()` 后单例重新初始化 |
| `tests/test_smoke.py`（已有） | 整体启动与 /health 不受影响 |

---

## 不改动的内容

- `backend/core/agent.py` 的 ReAct 逻辑（不碰核心引擎）
- 数据库模型与 ORM 层
- `backend/tools/oos/services/data_service.py` 内部实现
- 前端除 work.ts 之外的其他视图
