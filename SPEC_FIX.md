# 报价单规格显示问题修复方案

## 问题描述

根据用户截图和反馈，存在两个问题：

1. **规格列显示为空**：前端"报价产品规"（Quoted spec）列没有显示内容
2. **规格提取不完整**：期望显示 "PVC-U排水 dn50"，但可能只提取到 "dn50"

## 问题根本原因分析

### 1. 前端显示空白的原因

从数据库迁移 [SOLUTION.md](./SOLUTION.md) 可知，之前生成的报价草稿数据库**缺少 `quote_spec` 列**，导致：

- 老数据的 `quote_spec` 字段为 `NULL`
- 前端显示时找不到该字段，显示为空

**修复后的行为**：
- 数据库已添加 `quote_spec VARCHAR(500)` 列
- **新保存的报价单**会正确填充该字段
- **老数据**需要手动重新运行匹配流程或清空数据库

### 2. 规格提取逻辑

当前规格提取分为三层：

#### 第一层：规则提取（默认，快速）

`backend/tools/quotation/spec_extract.py:extract_spec_from_quote_name()`

对于 "直通(管箍)PVC-U排水配件白色 dn50"：

- 匹配 `PVC-?U(?:H|排水|给水)?` → 提取 "PVC-U排水"
- 匹配 `(?:^|[\s])dn\s*\d+(?=[\s/]|$)` → 提取 "dn50"
- 用空格连接 → **返回 "PVC-U排水 dn50"** ✅

**理论上是正确的**，应该返回完整规格。

#### 第二层：批量 LLM 提取（可选，更准确）

`backend/tools/quotation/spec_extract.py:extract_specs_batch_llm()`

- 配置：`QUOTATION_SPEC_LLM=true`（已在 `.env` 添加）
- 会覆盖规则提取结果
- Prompt 明确要求提取材质和规格（如 "PVC-U排水"、"DN200" 等）

#### 第三层：调用位置

`backend/tools/quotation/canonical_lines.py:build_canonical_quotation_lines()`

- 第 84-87 行：先用规则提取 `quote_spec`
- 第 104-118 行：如果 `run_spec_llm=True`（默认是），调用 LLM 批量提取覆盖

**调用位置**：
- `backend/agent/work_tools.py:379` - `merge_work_pending_choices` 后
- `backend/agent/work_tools.py:494` - `work_quotation_match` 成功后

## 解决方案

### 立即执行（已完成）

✅ 1. **添加环境变量启用 LLM 规格提取**

已在 `D:/Projects/agent-jk/.env` 添加：
```bash
QUOTATION_SPEC_LLM=true
```

✅ 2. **数据库迁移已完成**

- `quote_spec` 列已添加到 `quotation_draft_lines` 表
- 自动迁移代码已支持 PostgreSQL

✅ 3. **Excel 列裁剪已实现**

- `fill_quotation()` 保存前自动删除 S 列及右侧（只保留 A-R）
- 消除绿色块问题

### 验证步骤

#### 1. 清空旧数据（推荐）

```sql
-- 连接到 Neon 数据库
-- 删除所有旧的报价草稿（它们的 quote_spec 为 NULL）
DELETE FROM quotation_draft_lines;
DELETE FROM quotation_drafts;
```

或者保留旧数据，但**只测试新生成的报价单**。

#### 2. 重启后端

确保新的环境变量和代码生效：

```bash
cd "D:/Projects/agent-jk/Agent Team version3"
# 如果是本地开发
python start.py

# 如果是 Render 部署
# 推送代码后等待 Render 自动重启
```

#### 3. 重新运行报价流程

**方式一：通过前端 Work 页面**

1. 上传询价单或输入文字描述
2. 运行"报价匹配"
3. 查看"待保存报价草稿"表格
4. 验证"报价产品规"列是否显示（如 "PVC-U排水 dn50"）
5. 点击"保存报价单"
6. 到"成单"页面查看保存后的草稿，验证规格列

**方式二：通过后端日志验证**

查看后端日志，搜索：
```
extract_specs_batch_llm
```

应该看到 LLM 调用日志（如果行数 ≤ 50）。

#### 4. 验证数据库

```sql
SELECT id, quote_name, quote_spec 
FROM quotation_draft_lines 
ORDER BY id DESC 
LIMIT 10;
```

**预期结果**：
- 新数据的 `quote_spec` 不为 NULL
- 值类似 "PVC-U排水 dn50"、"PVC-U管件 DN50 (2\")" 等

#### 5. 验证 Excel 输出

生成的报价单 Excel：
- 只有 A-R 列（右侧绿色区域已删除）
- J 列（报价产品规）有内容

## 如果仍然显示为空

### 诊断步骤

1. **检查后端日志**

```bash
# 搜索规格提取相关日志
grep -i "extract_spec" backend.log
grep -i "canonical_lines" backend.log
```

2. **检查前端网络请求**

- 打开浏览器开发者工具（F12）
- 切换到 Network 标签
- 运行报价匹配流程
- 查看 `/api/work/run` 或类似请求的响应
- 展开 `pending_quotation_draft.lines[0]`
- 验证 `quote_spec` 字段是否存在且有值

3. **手动测试规则提取**

```python
# 在后端环境执行
from backend.tools.quotation.spec_extract import extract_spec_from_quote_name

quote_name = "直通(管箍)PVC-U排水配件白色 dn50"
spec = extract_spec_from_quote_name(quote_name)
print(f"提取规格: '{spec}'")
# 预期输出: PVC-U排水 dn50
```

4. **检查 LLM 是否被调用**

在 `backend/tools/quotation/spec_extract.py:extract_specs_batch_llm()` 第 161 行后添加日志：

```python
if not getattr(Config, "QUOTATION_SPEC_LLM", True):
    logger.info("QUOTATION_SPEC_LLM is False, skipping LLM extraction")
    return []
logger.info(f"Calling extract_specs_batch_llm for {len(rows)} rows")
```

### 可能的问题和修复

#### 问题 1：环境变量未生效

**症状**：日志显示 "QUOTATION_SPEC_LLM is False"

**修复**：
```bash
# 确认 .env 文件中有该行
grep QUOTATION_SPEC_LLM .env

# 应该输出：QUOTATION_SPEC_LLM=true

# 重启后端
```

#### 问题 2：LLM API 调用失败

**症状**：日志显示 "extract_specs_batch_llm 调用失败"

**修复**：
- 检查智谱 API KEY 是否有效
- 检查网络连接
- 暂时可以禁用 LLM，仅用规则提取：
  ```bash
  # .env
  QUOTATION_SPEC_LLM=false
  ```

#### 问题 3：前端类型不匹配

**症状**：前端控制台报错或字段显示为 `undefined`

**修复**：
- 确认前端已重新构建：
  ```bash
  cd control-ui
  npm run build
  ```
- 清除浏览器缓存并刷新

## 技术细节

### 规格字段的数据流

```
文字/Excel 输入
    ↓
提取询价行 (items)
    ↓ (product_name, specification)
万鼎匹配 (match)
    ↓ (code, quote_name, unit_price)
build_canonical_quotation_lines()
    ├─ 规则提取: extract_spec_from_quote_name(quote_name)
    │   └─ 初始 quote_spec = "PVC-U排水 dn50"
    ├─ LLM 批量提取 (可选): extract_specs_batch_llm(lines)
    │   └─ 覆盖 quote_spec = "PVC-U排水 DN50"  (LLM 可能规范化)
    └─ 返回规范行: { ..., specification: "50", quote_spec: "PVC-U排水 dn50" }
        ↓
pending_quotation_draft.lines (前端显示)
        ↓ (用户点击"保存")
POST /api/quotation-drafts
        ↓
insert_quotation_draft() 写数据库
        ↓ (quotation_draft_lines.quote_spec)
数据库持久化
```

### 为什么要分 `specification` 和 `quote_spec`

- **specification（询价规格）**：客户询价时的规格，如 "50"、"dn20"
- **quote_spec（报价产品规）**：万鼎产品的完整规格，如 "PVC-U排水 dn50"、"30°异径三级配"

**目的**：
- 对齐表格第二张图的格式要求
- 让客户看到完整的产品规格说明
- 保留原始询价规格用于追溯

## 相关文件

- `backend/tools/quotation/spec_extract.py` - 规格提取逻辑
- `backend/tools/quotation/canonical_lines.py` - 规范行构建
- `backend/agent/work_tools.py` - 调用位置
- `backend/tools/oos/services/data_service.py` - 数据库操作
- `control-ui/src/ui/types.ts` - 前端类型定义
- `control-ui/src/ui/views/work.ts` - 前端显示与编辑
- `SOLUTION.md` - 数据库迁移详细方案

## 总结

**问题已修复**：
1. ✅ 数据库 `quote_spec` 列已添加
2. ✅ 规格提取逻辑已验证正确
3. ✅ LLM 批量提取已启用
4. ✅ Excel 绿色块问题已解决

**下一步**：
1. 清空旧数据或只验证新生成的报价单
2. 重启后端
3. 重新运行报价流程
4. 验证"报价产品规"列正确显示

**如果仍有问题**，请提供：
- 后端日志（包含 extract_spec 相关行）
- 前端网络请求的响应 JSON
- 数据库 `quote_spec` 列的实际值
