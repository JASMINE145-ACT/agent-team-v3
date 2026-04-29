# Agent Team version3 — Claude 速查

本文件是**引导层**：告诉 Claude 会话如何开始、最高优先级约束是什么、以及去哪里查细节。
细节全部在 `.trellis/spec/`，不在此处重复。

---

## 会话开始（必须执行）

```bash
python3 ./.trellis/scripts/get_context.py
```

然后按任务类型读对应文档：

| 任务类型 | 必读文档 |
|---------|---------|
| 后端开发 | `.trellis/spec/backend/index.md` |
| 前端开发 | `.trellis/spec/frontend/index.md` |
| 跨层功能 | `.trellis/spec/guides/cross-layer-thinking-guide.md` |
| 概念不清楚 | `.trellis/knowledge-graph.md` |

---

## 启动命令

| 方式 | 命令 |
|------|------|
| 一键启动 | `python start.py` 或 `启动 Jagent.bat` |
| 仅 API | `python run_backend.py`（localhost:8000） |
| 企业微信长连接 | `python start_wecom_bot.py` |
| 前端构建 | `cd control-ui && npm run build` |

---

## 硬约束（永远有效，不得违反）

1. **禁止捏造**产品编号、价格、库存数量
2. Excel 的 Qty/数量列 ≠ 库存；库存只能来自 inventory 工具
3. 产品编号不得输出为「—」（JSON 有值必须如实填入）
4. **修改 `skills.py` 后必须重启后端**（不热加载）
5. `get_openai_client()` 调用**不得**传 `anthropic_messages=True`，仅 CoreAgent 在走 Anthropic 路径时可用
6. **AI 不得执行 `git commit`**，由人工在测试通过后提交

---

## 关键路由规则（快速参考）

```
中文产品名 + 查库存  →  match_quotation → get_inventory_by_code（3步链）
英文产品名 + 查库存  →  search_inventory（直接）
已知 10位 code       →  get_inventory_by_code（直接）
查价格（任意语言）   →  match_quotation（直接）
≥2 产品同时询问      →  *_batch（禁止循环调单次）
```

批量上限：`match_quotation_batch` ≤20 / `get_inventory_by_code_batch` ≤50 / `get_profit_by_price_batch` ≤50

中文管件关键词（直接、弯头、三通、法兰等）必须**原样保留**在 `keywords`，禁止简化。

---

## Agent Harness 工作流

完整流程见 `.trellis/workflow.md`（session 记录、task 管理、finish-work checklist）。

```bash
python3 ./.trellis/scripts/task.py list       # 查看当前任务
python3 ./.trellis/scripts/add_session.py     # 记录本次 session
```

会话结束前运行 `/trellis:finish-work` checklist。

---

## 深度文档索引

| 需要了解 | 读哪里 |
|---------|--------|
| 技能系统 / skills.py 完整说明 | `.trellis/spec/backend/skills-system.md` |
| 所有工具 schema 与返回结构 | `.trellis/spec/backend/tools-catalog.md` |
| 环境变量全集 | `.trellis/spec/backend/config-reference.md` |
| LLM 路由 / PRIMARY_LLM_PROTOCOL | `.trellis/spec/backend/index.md`（架构章节） |
| API 路由 + WebSocket gateway | `.trellis/spec/backend/api-routes.md` |
| 数据库 / Neon schema | `.trellis/spec/backend/database-guidelines.md` |
| 周报系统 | `.trellis/spec/backend/reports-system.md` |
| 前端页面与组件规范 | `.trellis/spec/frontend/index.md` |
| 错误处理模式 | `.trellis/spec/backend/error-handling.md` |
