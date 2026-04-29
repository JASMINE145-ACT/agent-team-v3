# Memory 上下文机制

> 最后更新：2026-04-28  
> 描述对象：`Agent Team version3`（Python FastAPI + CoreAgent）

---

## 1. 数据结构

### Session（`backend/agent/session.py`）

```python
@dataclass
class Session:
    session_id: str
    turns: List[Turn]            # 对话历史，最多保留 MAX_TURNS=20 轮
    file_path: Optional[str]     # 当前上传文件路径
    file_id: Optional[str]       # 当前 Excel file_id
    excel_meta: Optional[dict]   # Excel 元数据
    summary: Optional[str]       # LLM 自动摘要（超过 12 轮后生成）
    tool_memory: Optional[dict]  # 工具调用记忆：{recent_tools, card_refs}
    user_facts: Optional[dict]   # 用户偏好（含内部 _开头的系统标记）
    pending_human_choice: Optional[dict]  # 待用户确认的重选状态
    last_input_tokens: Optional[int]
    last_output_tokens: Optional[int]
```

### Turn

```python
@dataclass
class Turn:
    query: str       # 用户原始输入（最多 32,000 字）
    agent: str       # 处理该轮的 agent 标识
    answer: str      # 助手回答
    ts: float        # Unix 时间戳
    thinking: Optional[str]
    extra: Optional[dict]
    from_user: Optional[str]  # 多用户场景下的发送者标识
```

### tool_memory 内部结构

```python
{
    "recent_tools": [          # 最近工具调用记录，上限 50 条
        {
            "tool": "get_inventory_by_code",
            "ts": 1714300000000,
            "args": {...},
            "summary": "查询结果摘要（前 180 字）",
            "data": {...}      # 可选，JSON 对象
        }
    ],
    "card_refs": [             # 询价卡片引用，上限 30 条，按 (keywords, code) 去重
        {
            "keywords": "直接dn50",
            "code": "A001",
            "matched_name": "直接DN50",
            "unit_price": 5.0,
            "match_source": "万鼎",
            "chosen_index": 0,
            "source_tool": "match_quotation",
            "ts": 1714300000000
        }
    ]
}
```

---

## 2. 存储后端

`SessionStore` 在初始化时根据环境变量自动选择后端：

| 条件 | 后端 | 位置 |
|------|------|------|
| `DATABASE_URL` 存在 | `NeonBackend`（PostgreSQL） | `backend/agent/session_backend_neon.py` |
| 无 `DATABASE_URL` | `FileBackend`（本地 JSON） | `backend/agent/session_backend_file.py`，默认目录 `data/sessions/` |

会话附加字段（`file_path`、`tool_memory`、`summary` 等）通过 `persist_session_sidecar()` 持久化，与轮次数据分开存储。

---

## 3. 上下文注入流程

每次 `execute_react()` 调用，按以下顺序组装 `user_content`：

```
用户原始输入
  ↓
[1] file_id 注入
    有 ctx.file_id 时追加文件定位说明

  ↓
[2] 短消息主题绑定（≤15 字）
    明确绑定到上一轮的 query，防止模型混淆更早轮次

  ↓
[3] build_injection()  — 核心历史注入
    ├── session.summary（LLM 摘要，如已生成）
    ├── 最近 INJECT_TURNS=4 轮对话（含时间戳、发送者）
    ├── session.file_path（已上传文件名）
    └── user_facts（可见 key，即不以 _ 开头的偏好项）

  ↓
[4] build_tool_memory_injection()  — 短消息 + 无文件上下文时注入
    条件：len(user_input) ≤ 20 且无 ctx.file_path/file_id
    内容：recent_tools 最近 3 条的工具名 + summary

  ↓
[5] ext.augment_user_content()  — 扩展钩子（JAgentExtension）
    ├── 写入 ctx._inventory_intent（库存意图检测）
    ├── 写入 ctx._card_followup（卡片代词追问检测）
    └── Rework 注入（检测到重选意图 + pending_human_choice 时追加候选列表）

  ↓
[6] build_card_memory_injection()  — 卡片追问时注入
    条件：ctx._card_followup == True
    内容：card_refs 最近 3 条（keywords / code / name / price / source）

  ↓
[7] U 型注意力锚点（有历史轮次时始终追加在末尾）
    "【当前主题】上一轮问：{last_q}。用户本句：{current_input}。"
```

---

## 4. 自动摘要机制

**触发条件**（在 `save_turn()` 中判断）：

```python
len(session.turns) > 12
AND
now - user_facts["_last_summary_ts"] > 300  # 5 分钟去抖
```

**生成流程**（`backend/agent/conversation_summary.py`）：

```
全部 turns 格式化为文本（上限 6,000 字）
  ↓
若已有 summary → 拼接「已有摘要 + 新增对话」
  ↓
调用 SUMMARY_LLM_MODEL（默认 gpt-4o-mini），max_tokens=512，temperature=0.2
  生成 300–600 字摘要，保留：用户核心目标、关键操作、已完成步骤与结论
  ↓
失败时回退：已有摘要 + 最近 6 轮规则截断
  ↓
结果写入 session.summary，上限 1,200 字
user_facts["_last_summary_ts"] = now
```

---

## 5. 工具记忆写入（on_tool_complete 钩子）

每次工具执行完毕，`JAgentExtension.on_tool_complete()` 执行三类副作用：

| 操作 | 触发条件 | 目标字段 |
|------|---------|---------|
| 保存 `pending_human_choice` | `match_quotation` 返回 `needs_human_choice=True` | `session.pending_human_choice` |
| 清除 `pending_human_choice` | `match_quotation` 返回 `single=True` | `session.pending_human_choice = None` |
| 追加 `tool_memory.recent_tools` | 任意工具执行后 | 上限 50 条，FIFO |
| 追加 `tool_memory.card_refs` | `match_quotation` / `match_quotation_batch` 返回已选结果 | 上限 30 条，按 (keywords, code) 去重刷新 |

---

## 6. SessionStore 关键参数

| 参数 | 默认值 | 环境变量覆盖 | 说明 |
|------|--------|------------|------|
| `MAX_TURNS` | 20 | `SESSION_MAX_TURNS` | 内存中保留的最大轮次 |
| `INJECT_TURNS` | 4 | `SESSION_INJECT_TURNS` | 每次注入的最近轮次数 |
| `INJECT_ANSWER_TRIM` | 2000 | `SESSION_INJECT_ANSWER_TRIM` | 注入时回答的字符截断上限 |
| `ANSWER_TRIM` | 2000 | `SESSION_ANSWER_TRIM` | 存储时回答的字符截断上限 |

---

## 7. 关键文件索引

```
backend/agent/
├── session.py                    # Session / Turn / SessionStore 核心
├── session_backend_file.py       # FileBackend（本地 JSON）
├── session_backend_neon.py       # NeonBackend（PostgreSQL）
└── conversation_summary.py       # LLM 自动摘要 + 规则回退

backend/core/
└── agent.py                      # execute_react() 注入编排（步骤 1–7）

backend/plugins/jagent/
└── extension.py                  # augment_user_content / on_tool_complete 钩子

backend/core/
└── extension.py                  # AgentExtension 基类（钩子接口定义）
```
