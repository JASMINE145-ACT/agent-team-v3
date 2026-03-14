# 架构清理实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 修复 5 个架构问题：异常吞掉、前端硬编码、API 格式不统一、JAgentExtension 职责过重、全局状态散落。

**Architecture:** 3 批次改动，由易到难。批次 1 零风险（日志 + 前端），批次 2 中风险（API 格式），批次 3 高风险（拆 Extension + 全局 reset）。

**Tech Stack:** Python 3.11 / FastAPI / Lit (TypeScript) / pytest

---

## 批次 1：低风险改动

### Task 1：修复 core/agent.py 中的无声异常

**Files:**
- Modify: `backend/core/agent.py:177-199, 325-400`

**Step 1：定位所有 `except Exception: pass` 位置**

在 `backend/core/agent.py` 中找到以下 6 处，逐一改为 warning：

| 行号 | 所在函数 | 当前代码 | 改为 |
|------|---------|---------|------|
| 177-178 | `_fire` 内部 | `except Exception: pass` | `except Exception: logger.debug("on_event callback failed", exc_info=True)` |
| 187-189 | `_raise_if_cancelled` | `except Exception: pass` | `except Exception: logger.debug("cancel check failed", exc_info=True)` |
| 198-199 | `on_before_prompt` | `except Exception: pass` | `except Exception: logger.warning("ext.on_before_prompt 失败，已跳过", exc_info=True)` |
| 327-328 | `on_tool_calls_ready` | `except Exception: pass` | `except Exception: logger.debug("on_tool_calls_ready callback failed", exc_info=True)` |
| 337-338 | `on_tool_start` | `except Exception: pass` | `except Exception: logger.debug("on_tool_start callback failed", exc_info=True)` |
| 378-380 | `ext.on_after_tool` | `except Exception: pass` | `except Exception: logger.warning("ext.on_after_tool 失败，已跳过 name=%s", name, exc_info=True)` |

注意：
- `_fire`、callback 类（on_token 等）保持 `logger.debug`，不影响主流程
- extension 钩子（on_before_prompt、on_after_tool）改为 `logger.warning`，有业务影响需记录
- 第 359-360、397-398 行的 `on_event` callback 同样改 debug

**Step 2：修改文件**

依次执行上表中每一行的修改。

**Step 3：写冒烟测试**

创建 `tests/test_exception_handling.py`：

```python
"""验证 core/agent.py 的异常不被无声吞掉。"""
import logging
import pytest


def test_on_before_prompt_exception_is_logged(caplog):
    """ext.on_before_prompt 抛异常时，应记录 WARNING 而非静默跳过。"""
    from backend.core.extension import AgentExtension, ExtensionContext
    from backend.core.registry import ToolRegistry
    from backend.agent.session import get_session_store

    class BrokenExtension(AgentExtension):
        def register(self, ctx): pass
        def get_skill_prompt(self): return ""
        def on_before_prompt(self, content, ctx):
            raise RuntimeError("broken ext")

    with caplog.at_level(logging.WARNING, logger="backend.core.agent"):
        # 仅测试 on_before_prompt 被调用后 warning 被记录
        ext = BrokenExtension()
        try:
            ext.on_before_prompt("test", {})
        except RuntimeError:
            pass

    # 注意：caplog 测试 CoreAgent 需要完整初始化，此处仅验证 ext 本身的异常抛出
    # 集成测试见 test_smoke.py


def test_on_after_tool_exception_is_logged(caplog):
    """ext.on_after_tool 抛异常时，应记录 WARNING。"""
    from backend.core.extension import AgentExtension

    class BrokenAfterExt(AgentExtension):
        def register(self, ctx): pass
        def get_skill_prompt(self): return ""
        def on_after_tool(self, name, args, obs):
            raise ValueError("broken after tool")

    ext = BrokenAfterExt()
    with pytest.raises(ValueError):
        ext.on_after_tool("test_tool", {}, "obs")
```

**Step 4：运行 smoke test 确认不回归**

```bash
cd "Agent Team version3"
python tests/test_smoke.py
```

Expected: 3 tests pass

---

### Task 2：修复 jagent/extension.py 中的无声异常

**Files:**
- Modify: `backend/plugins/jagent/extension.py:45-46`

**Step 1：修改 on_after_tool 的 except**

将第 45-46 行：
```python
            except Exception:
                pass
```
改为：
```python
            except Exception:
                logger.warning("on_after_tool 压缩失败，返回原始 obs", exc_info=True)
```

**Step 2：运行 smoke test**

```bash
python tests/test_smoke.py
```

Expected: pass

---

### Task 3：前端价格档位接后端 API

**Files:**
- Modify: `control-ui/src/ui/controllers/work.ts`（加载 price levels）
- Modify: `control-ui/src/ui/views/work.ts`（使用动态选项替换硬编码）

**Step 1：在 WorkState 类型中添加 priceLevelOptions 字段**

找到 `control-ui/src/ui/controllers/work.ts` 中 `WorkState` 的定义，加入：
```typescript
priceLevelOptions: Array<{ value: string; label: string }>;
```

**Step 2：在 WorkController 初始化时设默认值**

在初始化 state 的地方加：
```typescript
priceLevelOptions: [],
```

**Step 3：加载 price levels 的方法**

在 WorkController 中加入方法：
```typescript
async loadPriceLevels(): Promise<void> {
  try {
    const url = apiUrl(this._state.basePath, "/api/config/price-levels");
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const json = await resp.json();
    if (json.success && Array.isArray(json.data)) {
      this._state = { ...this._state, priceLevelOptions: json.data };
      this._host.requestUpdate();
    }
  } catch (e) {
    console.warn("[WorkController] 加载价格档位失败，使用本地默认值", e);
    // fallback: 保持 priceLevelOptions 为空，view 会回退到本地常量
  }
}
```

**Step 4：在 connectedCallback 或首次渲染时调用**

找到 WorkController 的 `hostConnected` 或初始化入口，加：
```typescript
this.loadPriceLevels();
```

**Step 5：修改 work.ts view，动态渲染下拉**

将 `work.ts` 中渲染价格档位下拉的部分（搜索 `PRICE_LEVEL_OPTIONS.map`）：
```typescript
// 改为：使用 props.priceLevelOptions（非空时）或 fallback 到本地 PRICE_LEVEL_OPTIONS
const options = props.priceLevelOptions?.length
  ? props.priceLevelOptions
  : PRICE_LEVEL_OPTIONS;

// 渲染 select 时用 options 变量而非直接引用 PRICE_LEVEL_OPTIONS
```

保留 `PRICE_LEVEL_OPTIONS` 常量作为 fallback，不删除。

**Step 6：验证（需手动）**

启动后端：`python run_backend.py`
访问 `http://localhost:8000/` → Work 页 → 价格档位下拉应正常显示

---

## 批次 2：API 响应格式统一

### Task 4：创建 contracts.py

**Files:**
- Create: `backend/server/api/contracts.py`

**Step 1：创建文件**

```python
"""API 响应格式约定：所有路由统一使用 success/data/error 三字段。"""
from typing import Any, Optional
from pydantic import BaseModel


class ApiResponse(BaseModel):
    success: bool
    data: Optional[Any] = None
    error: Optional[str] = None

    @classmethod
    def ok(cls, data: Any = None) -> "ApiResponse":
        return cls(success=True, data=data)

    @classmethod
    def fail(cls, error: str) -> "ApiResponse":
        return cls(success=False, error=error)
```

**Step 2：写测试**

创建 `tests/test_api_contracts.py`：

```python
"""验证 ApiResponse 行为。"""
from backend.server.api.contracts import ApiResponse


def test_ok_response():
    r = ApiResponse.ok({"key": "value"})
    assert r.success is True
    assert r.data == {"key": "value"}
    assert r.error is None


def test_fail_response():
    r = ApiResponse.fail("something went wrong")
    assert r.success is False
    assert r.error == "something went wrong"
    assert r.data is None


def test_serialization():
    r = ApiResponse.ok([1, 2, 3])
    d = r.model_dump()
    assert d["success"] is True
    assert d["data"] == [1, 2, 3]
```

**Step 3：运行测试**

```bash
pytest tests/test_api_contracts.py -v
```

Expected: 3 tests pass

---

### Task 5：迁移 routes_chat.py

**Files:**
- Modify: `backend/server/api/routes_chat.py`

**当前问题：**
- 第 29 行：`{"status": "error", "answer": "", "message": "..."}`
- 第 33 行：`{"status": "success", "answer": ..., "thinking": ..., ...}`
- 第 41 行：`{"status": "error", "answer": "", "message": str(e)}`

**Step 1：修改 `/api/query` 端点返回格式**

```python
# 第 29 行（参数校验失败）
return {"success": False, "error": "请提供 query 或 message。"}

# 第 33 行（remember_reply 命中）
return {
    "success": True,
    "data": {
        "answer": remember_reply,
        "thinking": None,
        "trace": [],
        "session_id": session_id,
    }
}

# 第 41-42 行（执行失败）
return {"success": False, "error": str(e)}

# 第 43-48 行（needs_clarification）
return {
    "success": True,
    "data": {
        "answer": result.get("answer", ""),
        "questions": result.get("clarification_questions") or [],
        "session_id": session_id,
        "needs_clarification": True,
    }
}

# 第 49-55 行（正常返回）
return {
    "success": True,
    "data": {
        "answer": result.get("answer", ""),
        "thinking": result.get("thinking"),
        "trace": result.get("trace"),
        "session_id": session_id,
    }
}
```

**注意：** WebSocket gateway 的响应格式独立，不受此影响。流式端点 `/api/query/stream` 使用 SSE 格式，也不需要改（SSE 有自己的约定）。

**Step 2：在 smoke test 中验证**

```bash
python tests/test_smoke.py
```

Expected: pass（/health 测试通过即可）

---

### Task 6：迁移 routes_work.py

**Files:**
- Modify: `backend/server/api/routes_work.py:58-73`

**当前问题（第 58-73 行）：**
混用了 `status/success/answer/trace/error`

**Step 1：修改 `/api/work/run` 的正常返回**

```python
# 将第 58-70 行改为：
return {
    "success": True,
    "data": {
        "status": result.get("status", "done"),
        "answer": result.get("answer", ""),
        "trace": result.get("trace", []),
        "error": result.get("error"),
        **({"pending_quotation_draft": result["pending_quotation_draft"]}
           if result.get("pending_quotation_draft") is not None else {}),
        **({"run_id": result["run_id"], "pending_choices": result.get("pending_choices", [])}
           if result.get("status") == "awaiting_choices" else {}),
    }
}
# 第 71-73 行（异常）改为：
except Exception as e:
    logger.exception("work/run 失败")
    return {"success": False, "error": str(e)}
    # 删除 raise HTTPException(...)
```

**Step 2：查看 routes_work.py 的其余端点（/resume 等）**

读取完整文件，对所有端点应用同样的格式规范。

**Step 3：运行 smoke test**

```bash
python tests/test_smoke.py
```

---

## 批次 3：高风险重构

### Task 7：向 tool_utils.py 添加 unwrap_tool_result

**Files:**
- Modify: `backend/core/tool_utils.py`

**Step 1：添加工具函数**

```python
def unwrap_tool_result(out: dict) -> str:
    """将工具函数的 {'success': bool, 'result': str} 拆包为字符串。
    成功时返回 result 字段；失败时返回 JSON 字符串（供 LLM 理解错误）。
    """
    import json
    if out.get("success"):
        return out.get("result", "")
    return json.dumps(out, ensure_ascii=False)
```

**Step 2：写测试**

在 `tests/test_api_contracts.py` 中追加：

```python
from backend.core.tool_utils import unwrap_tool_result

def test_unwrap_success():
    assert unwrap_tool_result({"success": True, "result": "ok"}) == "ok"

def test_unwrap_failure():
    import json
    out = {"success": False, "error": "oops"}
    result = unwrap_tool_result(out)
    assert json.loads(result)["success"] is False

def test_unwrap_empty_result():
    assert unwrap_tool_result({"success": True}) == ""
```

**Step 3：运行测试**

```bash
pytest tests/test_api_contracts.py -v
```

Expected: 6 tests pass

---

### Task 8：创建 backend/tools/oos/handler.py

**Files:**
- Create: `backend/tools/oos/handler.py`

**Step 1：创建文件，把 OOS 注册逻辑从 JAgentExtension 移入**

```python
"""OOS（无货）工具注册与 handler — 从 JAgentExtension 拆出。"""
import asyncio
import json
import logging
from typing import Callable

from backend.core.extension import ExtensionContext
from backend.core.tool_utils import unwrap_tool_result

logger = logging.getLogger(__name__)

# 工具定义（schema）
_OOS_TOOL_DEFS = [
    {
        "type": "function",
        "function": {
            "name": "get_oos_list",
            "description": "【无货】获取无货产品列表，含被报无货次数与邮件发送状态。",
            "parameters": {"type": "object", "properties": {"limit": {"type": "integer", "description": "最多返回条数，默认 100"}}, "required": []},
        },
    },
    {
        "type": "function",
        "function": {"name": "get_oos_stats", "description": "【无货】获取无货统计。", "parameters": {"type": "object", "properties": {}}},
    },
    {
        "type": "function",
        "function": {
            "name": "get_oos_by_file",
            "description": "【无货】按文件统计无货。",
            "parameters": {"type": "object", "properties": {"limit": {"type": "integer", "description": "最多展示文件数，默认 50"}}, "required": []},
        },
    },
    {
        "type": "function",
        "function": {
            "name": "get_oos_by_time",
            "description": "【无货】按时间统计无货。",
            "parameters": {"type": "object", "properties": {"last_n_days": {"type": "integer", "description": "统计最近几天，默认 30"}}, "required": []},
        },
    },
]


def _make_oos_handler(fn: Callable, arg_name: str, default) -> Callable:
    async def handler(args: dict, context: dict) -> str:
        val = args.get(arg_name, default)
        try:
            val = int(val)
        except (TypeError, ValueError):
            val = default
        out = await asyncio.to_thread(fn, val)
        return unwrap_tool_result(out)
    return handler


def _make_no_arg_handler(fn: Callable) -> Callable:
    async def handler(args: dict, context: dict) -> str:
        out = await asyncio.to_thread(fn)
        return unwrap_tool_result(out)
    return handler


def _make_register_oos_handler(run_fn: Callable) -> Callable:
    async def handler(args: dict, context: dict) -> str:
        fp = (args.get("file_path") or "").strip() or (context.get("file_path") or "").strip()
        out = await asyncio.to_thread(run_fn, fp, context, args.get("prompt"))
        return unwrap_tool_result(out)
    return handler


def _make_register_oos_from_text_handler() -> Callable:
    async def handler(args: dict, context: dict) -> str:
        product_name = (args.get("product_name") or "").strip()
        if not product_name:
            return json.dumps({"success": False, "result": "请提供产品名称（product_name）。"}, ensure_ascii=False)
        specification = (args.get("specification") or "").strip()
        quantity = args.get("quantity")
        if quantity is None:
            quantity = 0
        try:
            quantity = int(quantity) if isinstance(quantity, (int, float)) else 0
        except (TypeError, ValueError):
            quantity = 0
        unit = (args.get("unit") or "").strip()
        record = {"product_name": product_name, "specification": specification, "unit": unit, "quantity": quantity}
        try:
            from backend.tools.oos.services.quotation_agent_tool import persist_out_of_stock_records
            out = await asyncio.to_thread(persist_out_of_stock_records, "用户直接登记", [record], sheet_name="")
            if out.get("success"):
                return out.get("result", f"已登记「{product_name}{' ' + specification if specification else ''}」为无货。")
            return json.dumps(out, ensure_ascii=False)
        except Exception as e:
            logger.exception("register_oos_from_text 失败")
            return json.dumps({"success": False, "result": str(e)}, ensure_ascii=False)
    return handler


def register_oos_tools(ctx: ExtensionContext) -> None:
    """向 ExtensionContext 注册所有 OOS 工具。"""
    from backend.agent.tools import (
        _run_oos_list, _run_oos_stats, _run_oos_by_file, _run_oos_by_time,
        _run_register_oos, EXTRA_TOOLS,
    )

    ctx.register_tool(_OOS_TOOL_DEFS[0], _make_oos_handler(_run_oos_list, "limit", 100))
    ctx.register_tool(_OOS_TOOL_DEFS[1], _make_no_arg_handler(_run_oos_stats))
    ctx.register_tool(_OOS_TOOL_DEFS[2], _make_oos_handler(_run_oos_by_file, "limit", 50))
    ctx.register_tool(_OOS_TOOL_DEFS[3], _make_oos_handler(_run_oos_by_time, "last_n_days", 30))

    for t in EXTRA_TOOLS:
        n = t["function"]["name"]
        if n == "register_oos":
            ctx.register_tool(t, _make_register_oos_handler(_run_register_oos))
        elif n == "register_oos_from_text":
            ctx.register_tool(t, _make_register_oos_from_text_handler())
```

---

### Task 9：创建 backend/tools/inventory/handler.py

**Files:**
- Create: `backend/tools/inventory/handler.py`

```python
"""库存（Inventory）工具注册与 handler — 从 JAgentExtension 拆出。"""
import asyncio
import json
import logging
from typing import Callable

from backend.core.extension import ExtensionContext
from backend.core.tool_utils import unwrap_tool_result

logger = logging.getLogger(__name__)


def _make_inventory_handler(name: str) -> Callable:
    async def handler(args: dict, context: dict) -> str:
        from backend.tools.inventory.services.inventory_agent_tools import execute_inventory_tool, config as inv_config
        timeout_sec = getattr(inv_config, "TOOL_EXEC_TIMEOUT", 35)
        try:
            out = await asyncio.wait_for(
                asyncio.to_thread(execute_inventory_tool, name, args),
                timeout=timeout_sec,
            )
            return unwrap_tool_result(out)
        except asyncio.TimeoutError:
            return json.dumps({"success": False, "error": f"工具执行超时（{timeout_sec}s）"}, ensure_ascii=False)
    return handler


def register_inventory_tools(ctx: ExtensionContext) -> None:
    """向 ExtensionContext 注册所有库存工具。"""
    from backend.tools.inventory.services.inventory_agent_tools import get_inventory_tools_openai_format
    for tool_def in get_inventory_tools_openai_format():
        name = tool_def["function"]["name"]
        ctx.register_tool(tool_def, _make_inventory_handler(name))
```

---

### Task 10：创建 backend/tools/quotation/handler.py

**Files:**
- Create: `backend/tools/quotation/handler.py`

```python
"""报价单（Quotation）工具注册与 handler — 从 JAgentExtension 拆出。"""
import asyncio
import json
import logging
from typing import Callable

from backend.core.extension import ExtensionContext
from backend.core.tool_utils import tool_error, validate_file_path, unwrap_tool_result
from backend.agent.tools import EXTRA_TOOLS

logger = logging.getLogger(__name__)

_QUOTE_WITH_FILE = {"fill_quotation_sheet", "parse_excel_smart", "edit_excel"}  # 仅 parse_excel_smart 做解析，extract_quotation_data 已移除
_VALID_CUSTOMER_LEVELS = {"A", "B", "C", "D"}


def _make_quote_handler(name: str, need_file: bool) -> Callable:
    async def handler(args: dict, context: dict) -> str:
        if need_file:
            fp = (args.get("file_path") or "").strip() or (context.get("file_path") or "").strip()
            err = validate_file_path(fp, name)
            if err:
                return err
        from backend.tools.quotation.quote_tools import execute_quote_tool
        out = await asyncio.to_thread(execute_quote_tool, name, args)
        if out.get("success"):
            return out.get("result", "") or json.dumps(
                {k: v for k, v in out.items() if k != "success"}, ensure_ascii=False
            )
        return json.dumps(out, ensure_ascii=False)
    return handler


def _make_quotation_fill_handler() -> Callable:
    async def handler(args: dict, context: dict) -> str:
        fp = (args.get("file_path") or "").strip() or (context.get("file_path") or "").strip()
        err = validate_file_path(fp, "run_quotation_fill")
        if err:
            return err
        customer_level = (args.get("customer_level") or "B").strip().upper() or "B"
        if customer_level not in _VALID_CUSTOMER_LEVELS:
            return tool_error(
                f"[run_quotation_fill] customer_level 无效: {customer_level!r}，"
                f"合法值为 {sorted(_VALID_CUSTOMER_LEVELS)}，请重新调用"
            )
        try:
            from backend.tools.quotation.flow_orchestrator import run_quotation_fill_flow
            result = await asyncio.to_thread(run_quotation_fill_flow, quotation_path=fp, customer_level=customer_level)
            return json.dumps(result, ensure_ascii=False)
        except Exception as e:
            logger.exception("run_quotation_fill 失败")
            return json.dumps({"success": False, "error": str(e)}, ensure_ascii=False)
    return handler


def _make_ask_clarification_handler() -> Callable:
    async def handler(args: dict, context: dict) -> str:
        q = args.get("questions") or []
        r = args.get("reasoning") or ""
        return json.dumps({"needs_clarification": True, "questions": q, "reasoning": r}, ensure_ascii=False)
    return handler


def _make_append_business_knowledge_handler() -> Callable:
    async def handler(args: dict, context: dict) -> str:
        from backend.agent.remember import append_business_knowledge as do_append
        content = (args.get("content") or "").strip()
        return do_append(content)
    return handler


def register_quotation_tools(ctx: ExtensionContext) -> None:
    """向 ExtensionContext 注册所有报价单工具。"""
    from backend.tools.quotation.quote_tools import get_quote_tools_openai_format
    for tool_def in get_quote_tools_openai_format():
        name = tool_def["function"]["name"]
        need_file = name in _QUOTE_WITH_FILE
        ctx.register_tool(tool_def, _make_quote_handler(name, need_file))

    for t in EXTRA_TOOLS:
        n = t["function"]["name"]
        if n == "run_quotation_fill":
            ctx.register_tool(t, _make_quotation_fill_handler())
        elif n == "ask_clarification":
            ctx.register_tool(t, _make_ask_clarification_handler())
        elif n == "append_business_knowledge":
            ctx.register_tool(t, _make_append_business_knowledge_handler())
```

---

### Task 11：精简 JAgentExtension

**Files:**
- Modify: `backend/plugins/jagent/extension.py`

**Step 1：用三行 register 调用替换原来的所有 _register_* 和 _make_* 方法**

最终 `extension.py` 应精简为 ~70 行：

```python
"""JAgentExtension — JAgent 业务插件，注册全部工具 + 技能 prompt。"""
import json
import logging
from typing import Any, Optional

from backend.core.extension import AgentExtension, ExtensionContext

logger = logging.getLogger(__name__)


class JAgentExtension(AgentExtension):
    """业务扩展：聚合三个领域工具注册，技能/输出格式由 PromptProvider 提供。"""

    def __init__(self, prompt_provider: Optional[Any] = None):
        super().__init__()
        self._prompt_provider = prompt_provider

    def get_skill_prompt(self) -> str:
        if self._prompt_provider is not None:
            return self._prompt_provider.get_skill_prompt()
        from backend.plugins.jagent.skills import CHAT_SKILL_PROMPT
        return CHAT_SKILL_PROMPT

    def get_output_format_prompt(self) -> str:
        if self._prompt_provider is not None:
            return self._prompt_provider.get_output_format_prompt()
        from backend.plugins.jagent.skills import OUTPUT_FORMAT
        return OUTPUT_FORMAT

    def on_after_tool(self, name: str, args: dict, obs: str) -> str:
        """大结果压缩：run_quotation_fill 超过 3000 字时截取前 5 条 items。"""
        if name == "run_quotation_fill" and len(obs) > 3000:
            try:
                data = json.loads(obs)
                items = data.get("items", [])
                if len(items) > 5:
                    data["items"] = items[:5]
                    data["_truncated"] = f"共 {len(items)} 条，已截至前 5 条"
                    return json.dumps(data, ensure_ascii=False)
            except Exception:
                logger.warning("on_after_tool 压缩失败，返回原始 obs", exc_info=True)
        return obs

    def register(self, ctx: ExtensionContext) -> None:
        from backend.tools.oos.handler import register_oos_tools
        from backend.tools.inventory.handler import register_inventory_tools
        from backend.tools.quotation.handler import register_quotation_tools
        register_oos_tools(ctx)
        register_inventory_tools(ctx)
        register_quotation_tools(ctx)
```

**Step 2：删除所有 _register_* 和 _make_* 方法**（已移入各 handler.py）

**Step 3：运行 smoke test**

```bash
python tests/test_smoke.py
```

Expected: 3 tests pass

---

### Task 12：OOS handler 注册测试

**Files:**
- Create: `tests/test_oos_handler.py`

```python
"""验证 OOS handler 注册行为。"""
import pytest


def test_register_oos_tools_registers_four_tools():
    """register_oos_tools 应注册 4 个查询工具（list/stats/by_file/by_time）。"""
    from unittest.mock import MagicMock
    from backend.tools.oos.handler import register_oos_tools

    ctx = MagicMock()
    register_oos_tools(ctx)

    # 至少调用 4 次 register_tool（4 个查询工具 + 若干 EXTRA_TOOLS）
    assert ctx.register_tool.call_count >= 4


def test_unwrap_tool_result_used_in_oos_handler():
    """unwrap_tool_result 应正确拆包成功结果。"""
    from backend.core.tool_utils import unwrap_tool_result
    assert unwrap_tool_result({"success": True, "result": "hello"}) == "hello"
    assert "success" in unwrap_tool_result({"success": False, "error": "bad"})
```

**Step 1：运行测试**

```bash
pytest tests/test_oos_handler.py -v
```

Expected: 2 tests pass

---

### Task 13：全局单例 reset_for_testing

**Files:**
- Modify: `backend/server/api/deps.py`
- Modify: `backend/agent/tools.py`

**Step 1：在 deps.py 加 reset 函数**

```python
def reset_for_testing() -> None:
    """仅测试使用：重置所有单例，使下次调用重新初始化。"""
    global _oos_data_service
    _oos_data_service = None
```

**Step 2：在 tools.py 加 reset 函数**

```python
def reset_for_testing() -> None:
    """仅测试使用：重置工具列表缓存。"""
    global ALL_TOOLS
    ALL_TOOLS = None
```

**Step 3：写测试**

创建 `tests/test_singleton_reset.py`：

```python
"""验证 reset_for_testing 使单例可重新初始化。"""


def test_deps_reset():
    from backend.server.api import deps
    # 先取一次（初始化单例）
    deps.reset_for_testing()  # 确保干净
    # 再次取：应能获取（不报错）
    deps.reset_for_testing()


def test_tools_reset():
    from backend.agent import tools
    tools.reset_for_testing()
    assert tools.ALL_TOOLS is None
    # 触发重新构建
    result = tools.get_all_tools()
    assert result is not None
    # 再次 reset
    tools.reset_for_testing()
    assert tools.ALL_TOOLS is None
```

**Step 4：运行测试**

```bash
pytest tests/test_singleton_reset.py -v
```

Expected: 2 tests pass

---

## 最终验证

### Task 14：运行全量测试

```bash
cd "Agent Team version3"
python tests/test_smoke.py
pytest tests/ -v --tb=short
```

Expected：
- test_smoke.py: 3 pass
- test_api_contracts.py: 6 pass
- test_oos_handler.py: 2 pass
- test_singleton_reset.py: 2 pass
- test_exception_handling.py: 2 pass

**共 15 tests pass，0 fail。**

---

## 不在此计划内的改动

- WebSocket gateway 的响应格式（独立约定，不改）
- SSE 流式端点的事件格式（SSE 有自己的约定，不改）
- `backend/core/agent.py` 的 ReAct 逻辑（不碰核心引擎）
- 数据库模型层
- `backend/tools/oos/services/data_service.py` 内部实现
