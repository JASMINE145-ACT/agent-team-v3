# match_quotation 三项修复 — 设计文档

**日期**: 2026-04-03  
**状态**: 已批准  
**文件范围**: 2 个文件

---

## 问题描述

切换主链路至 `PRIMARY_LLM_PROTOCOL=anthropic`（MiniMax M2.7）后观察到三个问题：

1. **选型理由不展示** — `match_quotation` 在 `single` 结果中返回 `selection_reasoning`，但前端用户看不到。
2. **💡 库存消息缺少选型理由** — 「💡 该产品当前库存信息暂无数据」消息未附带选型理由。
3. **`match_quotation` 变慢** — 切到 anthropic 主链路后，`llm_select_best` 内部随之改用 MiniMax M2.7 调用（max_tokens=8192），导致每次询价多一次重型 LLM 调用。

---

## 根因分析

### 问题 1 & 2：展示缺失

`backend/plugins/jagent/skills.py` 第 137 行写道：

```
`match_quotation` / `select_wanding_match` 返回的 `selection_reasoning` / `reasoning`
是工具 JSON 中的 structured 数据（LLM 推理理由），**由 UI 直接渲染**，模型不需要在 think 里复述。
```

这条指令错误地假设前端会从工具 JSON 中提取并渲染 `selection_reasoning`。实际上前端不做特殊处理，该字段只存在于 trace，用户不可见。LLM 遵照指令不复述，前端又不渲染，结果两端都没有。

### 问题 3：性能退化

`backend/tools/inventory/services/llm_selector.py` 中 `llm_select_best` 的 `use_anthropic` 分支：

```python
use_anthropic = (
    AppConfig.PRIMARY_LLM_PROTOCOL == "anthropic"
    and AppConfig.ANTHROPIC_API_KEY
    and AppConfig.ANTHROPIC_BASE_URL
)
if use_anthropic:
    # 使用 MiniMax M2.7，max_tokens=8192
    ...
else:
    # 使用 inventory config 的 GLM（glm-4.5-air）
    ...
```

切换主协议到 anthropic 后，选型 LLM 也随之换为 MiniMax M2.7，而 max_tokens 仍为 8192，但选型输出只是几十 token 的 JSON。

---

## 解决方案

### Change 1 — 修复选型理由展示（`skills.py`）

**位置**: `backend/plugins/jagent/skills.py` `[Output & Formatting Rules]` 段

**改动**：将「由 UI 直接渲染，模型不需要复述」改为「在回复中直接包含理由」，并对库存暂无场景补充具体指令。

**改后逻辑**：
- `match_quotation` 返回 `single` 且 `selection_reasoning` 非空时，回复中必须包含该理由（可嵌入表格备注或 💡 消息中）
- 库存查询结果为 0 或无数据时，若有 `selection_reasoning`，💡 消息格式变为：「💡 该产品当前库存信息暂无数据（匹配理由：{selection_reasoning}），如需确认库存请告知。」
- `select_wanding_match` 返回的 `reasoning` 同样包含在回复中

**不改动**：工具实现、返回格式、其他 Output Rules。

---

### Change 2 — 选型 LLM 固定回 GLM（`llm_selector.py`）

**位置**: `backend/tools/inventory/services/llm_selector.py` `llm_select_best` 函数

**改动**：删除 `use_anthropic` 分支，始终使用 `backend/tools/inventory/config.py` 中的 OpenAI 兼容 LLM（GLM）。同时将 `max_tokens` 上限从 8192 压缩到 512。

**改前**:
```python
use_anthropic = (PRIMARY_LLM_PROTOCOL == "anthropic" and ANTHROPIC_API_KEY and ...)
if use_anthropic:
    # Anthropic SDK → MiniMax M2.7，max_tokens=8192
else:
    # OpenAI SDK → GLM，max_tokens=8192
```

**改后**:
```python
# 始终使用 inventory config 的 OpenAI 兼容 LLM（GLM）
# 选型是结构化 JSON 任务，不需要主对话模型
mt = min(int(max_tokens or 512), 512)
# OpenAI SDK → GLM，max_tokens=512
```

**效果**：
- 恢复切换 anthropic 主链路之前的行为（选型始终走 GLM）
- 输出 token 上限 8192 → 512（选型 JSON 实际 30–80 token）
- 删除约 30 行 anthropic 分支代码

**不改动**：候选生成逻辑、规则兜底、业务知识加载、`_rule_based_fallback`。

---

## 文件清单

| 文件 | 变更类型 | 内容 |
|------|----------|------|
| `backend/plugins/jagent/skills.py` | 修改 | 修正 `selection_reasoning` 展示指令（DOC + RULES 两版） |
| `backend/tools/inventory/services/llm_selector.py` | 修改 | 删除 anthropic 分支；max_tokens 512 |

---

## 边界情况

| 场景 | 行为 |
|------|------|
| `selection_reasoning` 为空字符串 | 不展示理由行，💡 消息保持原样 |
| GLM 调用失败 | `_rule_based_fallback` 兜底，行为与现在相同 |
| `PRIMARY_LLM_PROTOCOL` 将来改回 openai | 无影响，选型始终用 GLM |
| `select_wanding_match` 的 `reasoning` | 同样在回复中展示（skills.py 同步修改） |
| max_tokens=512 对长 reasoning 的影响 | reasoning 字段被 `[:300]` 截断（`_candidate_to_result`），不超 512 |

---

## 测试要点

- [ ] `match_quotation` 返回 `single` 后，回复中包含 `selection_reasoning`
- [ ] 库存为 0 时，💡 消息含选型理由
- [ ] `selection_reasoning` 为空时，💡 消息不变
- [ ] `llm_select_best` 日志显示 `OpenAI-compatible model=glm-*`，不再出现 `Anthropic SDK model=MiniMax*`
- [ ] 选型耗时明显下降（GLM + 512 token）
- [ ] `_rule_based_fallback` 在 GLM 失败时仍正常触发
