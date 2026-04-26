# Plan: 移除 channels tab 并入 admin-data 业务知识子模块

> **日期**: 2026-04-26
> **状态**: 已完成
> **执行者**: Claude Code

---

## 背景

`channels` tab 目前承载两个独立功能：
1. **业务知识编辑**（`wanding_business_knowledge.md` → 实际走 Neon `business_knowledge` 表）
2. **消息通道状态**（WhatsApp/Telegram/Discord 等，用于 Overview 面板）

用户决策：
- 删除 channels tab（业务知识独立模块）
- 业务知识迁移至 `admin-data` 作为子 tab
- Agent 读取业务知识切换为纯 Neon 读取（`key='wanding_selector'`）
- **消息通道模块一并删除**（`controllers/channels.ts` 也删除，Overview 不再轮询通道状态）

---

## 目标

1. 移除 `channels` tab 及相关代码
2. 在 `admin-data` 新增「业务知识」子 tab（读写 Neon `business_knowledge` 表）
3. Agent 侧已支持 Neon（`llm_selector.py` Tier-1 即为 Neon），无需改动

---

## 当前数据模型

```sql
business_knowledge (
    id          SERIAL PRIMARY KEY,
    key         TEXT NOT NULL UNIQUE,
    content     TEXT NOT NULL,
    updated_at  TIMESTAMPTZ DEFAULT now()
)
-- 现有数据: key='wanding_selector'
```

Agent 读取路径（Tier-1 已是 Neon）：
```
llm_selector._load_business_knowledge()
  → Tier-1: KnowledgeBackend.get('wanding_selector')
  → Tier-2: 本地 .md 文件（不再使用）
  → Tier-3: embedded default
```

---

## 实现步骤

### Phase 1: 后端 — 新增 admin BK API

**文件**: `backend/tools/admin/repository.py`

添加 2 个函数：
```python
def list_business_knowledge():
    """返回所有 business_knowledge 记录，按 updated_at desc"""

def upsert_business_knowledge(key: str, content: str) -> bool:
    """Upsert，ON CONFLICT (key) DO UPDATE"""
```

**文件**: `backend/server/api/routes_admin.py`

添加 2 个端点：
```
GET  /api/admin/business-knowledge      → list_business_knowledge()
PUT  /api/admin/business-knowledge/{key} → upsert_business_knowledge(key, content)
```
均需 `X-Admin-Token`（`get_admin_dep`）。

---

### Phase 2: 前端类型 & 状态扩展

**文件**: `control-ui/src/ui/controllers/admin-data.types.ts`

```typescript
// 新增类型
export type BkItem = { id: number; key: string; content: string; updated_at: string };

// AdminDataState 扩展
activeSubTab: "library" | "business-knowledge"
bkItems: BkItem[]
bkLoading: boolean
bkError: string | null
bkSaving: boolean
bkSaveKey: string | null      // 当前保存中的 key
bkEditingKey: string | null   // 正在编辑的 key
bkEditingContent: string     // 正在编辑的 content
```

---

### Phase 3: 前端 Controller 函数

**文件**: `control-ui/src/ui/controllers/admin-data.ts`

新增 3 个函数：
```typescript
export async function loadBkItems(host: AdminDataHost)
export async function saveBkItem(host: AdminDataHost, key: string, content: string): Promise<boolean>
export function setBkEditingKey(host: AdminDataHost, key: string | null, content?: string)
```

更新 `initialAdminDataState()` 初始化所有 `bk*` 字段。

---

### Phase 4: 前端 View — 子 Tab 切换 + BK 列表/编辑

**文件**: `control-ui/src/ui/views/admin-data.ts`

**子 Tab 切换器**（toolbar 下方）：
```
[数据库] [业务知识]
```

**renderBkList(props)** 新增渲染逻辑：
- 表格：Key | 最后更新 | 操作
- 点击「编辑」→ 行下方展开 `<textarea>` + 保存/取消按钮
- 行内编辑状态通过 `bkEditingKey === item.key` 控制显示

---

### Phase 5: 移除 channels tab

**删除文件**（共 14 个）：
```
control-ui/src/ui/controllers/business-knowledge.ts
control-ui/src/ui/views/business-knowledge.ts
control-ui/src/ui/app-channels.ts
control-ui/src/ui/controllers/channels.ts
control-ui/src/ui/controllers/channels.types.ts
control-ui/src/ui/views/channels.ts
control-ui/src/ui/views/channels.config.ts
control-ui/src/ui/views/channels.shared.ts
control-ui/src/ui/views/channels.types.ts
control-ui/src/ui/views/channels.whatsapp.ts
control-ui/src/ui/views/channels.telegram.ts
control-ui/src/ui/views/channels.discord.ts
control-ui/src/ui/views/channels.slack.ts
control-ui/src/ui/views/channels.signal.ts
control-ui/src/ui/views/channels.imessage.ts
control-ui/src/ui/views/channels.nostr.ts
control-ui/src/ui/views/channels.nostr-profile-form.ts
control-ui/src/ui/views/channels.googlechat.ts
```

**修改文件**（5 个）：
```
navigation.ts         — 移除 "channels"
app-render.ts        — 移除 tab === "channels" 渲染分支 + 移除相关 imports
app-settings.ts      — 移除 loadChannels import 和调用
app.ts               — 移除 bk* @state 字段 + channels* @state 字段 + 相关 imports
                        具体字段：
                          bkContent, bkLoading, bkError, bkSaving, bkLastSuccess, bkDependentFiles
                          channelsLoading, channelsSnapshot, channelsError, channelsLastSuccess
                        具体 imports（行号仅供参考）：
                          line 16: import ... from "./app-channels.ts"
                          line 108: import type { NostrProfileFormState } from "./views/channels.nostr-profile-form.ts"
pages.md             — 更新 tab 描述
```

---

### Phase 6: 文档更新

**文件**: `D:\Projects\agent-jk\Agent Team version3\.trellis\spec\frontend\pages.md`

- Tab 总表：移除 `channels` 行
- nav.control 组：更新为 `overview | instances | sessions | work | cron`
- 业务知识描述：替换为 `admin-data` 子 tab 说明

---

## 文件变更清单

| 文件 | 操作 |
|------|------|
| `backend/tools/admin/repository.py` | 修改 |
| `backend/server/api/routes_admin.py` | 修改 |
| `control-ui/src/ui/controllers/admin-data.types.ts` | 修改 |
| `control-ui/src/ui/controllers/admin-data.ts` | 修改 |
| `control-ui/src/ui/views/admin-data.ts` | 修改 |
| `control-ui/src/ui/navigation.ts` | 修改 |
| `control-ui/src/ui/app-render.ts` | 修改 |
| `control-ui/src/ui/app-settings.ts` | 修改 |
| `control-ui/src/ui/app.ts` | 修改 |
| `.trellis/spec/frontend/pages.md` | 修改 |
| 上述删除文件列表（14 个） | 删除 |

---

## 风险

- **LOW**: Agent 侧已是 Neon Tier-1，无须改动
- **LOW**: `business_knowledge` 表 schema 已存在，数据已在 Neon
- **LOW**: 路由 `/api/admin/business-knowledge` 无冲突
- **MEDIUM**: 删除 `controllers/channels.ts` 后，Overview 不再显示消息通道轮询状态（如需保留需另处理）

---

## 验收条件

1. `channels` tab 不再出现在导航中
2. `admin-data` 内有 `[数据库] [业务知识]` 两个子 tab
3. 业务知识子 tab 能列出所有 key，点击编辑可修改 content，点保存后数据落 Neon
4. Agent 端 `_load_business_knowledge()` 仍返回正确内容（已确认 Tier-1 为 Neon）
5. 前端 build 无错误 (`npm run build`)

---

## 执行与验证记录（2026-04-26）

- Code-Review Agent: **PASS**
  - 结论：channels tab 移除、admin-data 子 tab 业务知识链路（view/controller/api/repository）一致，且补充修复了 admin-data 激活时按子 tab 刷新数据的问题。
- Test Agent: **PASS**
  - `npm run build`（`control-ui`）通过，Vite 构建成功。
  - `python -m py_compile backend/server/api/routes_admin.py backend/tools/admin/repository.py` 通过。

### Ralph iteration 3 增强

- 前端测试增强：`control-ui/src/ui/controllers/admin-data.test.ts`
  - 新增 `loadBkItems` 成功路径测试。
  - 新增 `saveBkItem` 成功路径测试（含请求头/请求体与调用顺序断言）。
  - 新增 BK 在 `401` 场景下状态回收测试（`bkLoading`、`bkSaving`、`bkSaveKey`）。
- 修复：`control-ui/src/ui/controllers/admin-data.ts`
  - `loadBkItems` 在 `401` 时明确回收 `bkLoading`。
  - `saveBkItem` 在 `401` 时明确回收 `bkSaving` 与 `bkSaveKey`。
- 验证结果（门禁顺序完成）：
  - Code-Review Agent：PASS（复核 iteration 3 改动）
  - Test Agent：PASS
    - `npm run build`（control-ui）exit code `0`
    - `npx tsc -p tsconfig.json --noEmit`（control-ui）exit code `0`
    - `python -m py_compile backend/server/api/routes_admin.py backend/tools/admin/repository.py` exit code `0`

### Ralph iteration 4 增强

- 前端测试增强：`control-ui/src/ui/controllers/admin-data.test.ts`
  - 新增 `saveBkItem` 非 2xx 返回时的行为测试：验证错误信息写入 `bkError`，且编辑态不被清空。
  - 新增 `saveBkItem` key URL 编码测试：验证 `encodeURIComponent(key)` 路径拼接正确。
- 验证结果（门禁顺序完成）：
  - Code-Review Agent：PASS（新增测试覆盖符合 BK 控制器语义）
  - Test Agent：PASS
    - `npm run build`（control-ui）exit code `0`
    - `npx tsc -p tsconfig.json --noEmit`（control-ui）exit code `0`
    - `python -m py_compile backend/server/api/routes_admin.py backend/tools/admin/repository.py` exit code `0`

### Ralph iteration 5 增强

- 前端 UI 测试补全：`control-ui/src/ui/navigation.browser.test.ts`
  - 新增 `admin-data` 子 tab 切换测试：验证 `library -> business-knowledge -> library` 状态与渲染内容切换。
  - 增加测试稳定性保护：`fetch` stub 使用 `try/finally` 清理，避免跨测试污染。
- 验证结果（门禁顺序完成）：
  - Code-Review Agent：PASS（确认测试稳定性和断言完整性）
  - Test Agent：PASS
    - `npm run build`（control-ui）exit code `0`
    - `npx tsc -p tsconfig.json --noEmit`（control-ui）exit code `0`
    - `python -m py_compile backend/server/api/routes_admin.py backend/tools/admin/repository.py` exit code `0`
