# backend/server — API 与 WebSocket 网关

## Purpose

对外暴露 HTTP REST 与 WebSocket：健康检查、配置、Work 流程、Chat、报价单上传/下载、无货/缺货、采购、补货等。依赖 CoreAgent 实例、SessionStore 与 backend/tools 中的服务。

## Public API

- **app** (`api/app.py`): FastAPI 应用，挂载 REST router 与 WebSocket router，以及静态前端（若存在 dist/control-ui）.
- **router** (`api/routes.py`): 所有 REST 路由（health、config、work、chat、quotation、oos、procurement、replenishment、upload 等）.
- **ws_router** (`gateway/gateway.py`): WebSocket 网关，处理 chat 与 work 流式请求，调用 CoreAgent.execute_react.

## Dependencies

- `backend.config`, `backend.agent.agent.SingleAgent`, `backend.agent.session`, `backend.tools.oos`, `backend.tools.quotation`, `backend.agent.work_executor` 等.
- FastAPI、Starlette.

## Example usage

- 启动: `uvicorn backend.server.api.app:app --host 0.0.0.0 --port 8000`.
- 前端通过 `/api/*` 调用 REST，通过 WebSocket 连接进行 Chat/Work 流式对话.

## How it interacts with the agent system

- Chat: WebSocket 或 HTTP 请求携带 user message 与 session_id，网关调用 `SingleAgent.execute_react()`，流式或一次性返回 answer 与 trace.
- Work: 多步流程（识别→匹配→填表）通过 `/api/work/run`、`/api/work/resume` 等与 work_executor 协作，内部同样调用 Agent 与 tools 层.
