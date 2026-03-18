# 问题诊断清单

## 需要确认的信息

### 1. 数据库 quote_name 列的值

**请在 Neon 控制台执行：**

```sql
SELECT 
    id,
    product_name,
    quote_name,
    specification,
    quote_spec
FROM quotation_draft_lines 
WHERE id = 51900;  -- 使用你截图里看到的 ID
```

**关键检查：**
- `quote_name` 是否为 NULL？
  - 如果是 NULL → 问题在匹配流程，没有返回报价名称
  - 如果有值（如 "直通(管箍)PVC-U排水..."）→ 问题在规格提取或保存

### 2. 后端是否真的重启了

**Render 部署检查：**
1. 打开 Render Dashboard
2. 查看最新的 Deploy Log
3. 确认 commit `e5efe05` 是否已部署
4. 查看部署时间是否在你创建数据（2026-03-18 04:08）**之前**

**如果部署时间在数据创建之后**：
- 说明你看的是旧代码生成的数据
- 需要清空数据库并重新生成

### 3. Excel 绿色区域的文件

**请确认：**
- 这个 Excel 文件是什么时候生成的？
- 文件名是什么？
- 是在代码修复**之后**生成的吗？

**如果是旧文件**：
- 代码修复不会影响已存在的文件
- 需要重新运行"报价填充"流程生成新文件

## 最可能的原因

根据你的反馈，我判断**最可能的原因是：**

### 原因 A：quote_name 就是 NULL（80% 可能）

**症状：**
- 数据库 `quote_spec` 是 NULL
- 你的截图没有显示 `quote_name` 列

**原因：**
- 匹配流程根本没有返回 `quote_name`
- `canonical_lines.py` 第 82 行：`quote_name_str = (fi.get("quote_name") or "").strip()`
- 如果 `fill_items_merged` 里没有 `quote_name`，就无法提取规格

**验证：**
```sql
SELECT quote_name, quote_spec FROM quotation_draft_lines WHERE id = 51900;
```

**修复：**
需要检查 `work_quotation_match` 的返回值，确保包含 `quote_name`

### 原因 B：后端没有重启（15% 可能）

**症状：**
- 代码修复了，但数据还是 NULL

**原因：**
- Render 自动部署失败或延迟
- 你在旧代码运行时生成的数据

**验证：**
查看 Render Deploy Log 的时间戳

**修复：**
手动触发 Render 部署或重启服务

### 原因 C：文件是旧的（5% 可能）

**症状：**
- Excel 绿色区域还在

**原因：**
- 你打开的是修复前生成的文件

**验证：**
检查文件修改时间

**修复：**
删除旧文件，重新生成

## 下一步行动

请按以下顺序执行：

1. **立即执行 SQL 查询**（最重要）
   ```sql
   SELECT id, quote_name, quote_spec FROM quotation_draft_lines ORDER BY id DESC LIMIT 3;
   ```
   
   告诉我 `quote_name` 列的值

2. **检查 Render 部署日志**
   - 确认 `e5efe05` 是否已部署
   - 确认部署时间

3. **如果 quote_name 是 NULL**
   - 我需要修复匹配流程
   
4. **如果 quote_name 有值但 quote_spec 是 NULL**
   - 说明规格提取或保存有问题
   - 我需要进一步调试

## 临时解决方案

如果你急需使用，可以：

### 方案 1：手动更新数据库（临时）

```sql
-- 从 quote_name 中提取 DN/dn 部分作为临时规格
UPDATE quotation_draft_lines 
SET quote_spec = 
    CASE 
        WHEN quote_name LIKE '%PVC-U%' THEN 
            substring(quote_name from 'PVC-U[^空白]*')
        WHEN quote_name LIKE '%DN%' THEN 
            substring(quote_name from 'DN[0-9]+')
        WHEN quote_name LIKE '%dn%' THEN 
            substring(quote_name from 'dn[0-9]+')
        ELSE NULL
    END
WHERE quote_spec IS NULL 
  AND quote_name IS NOT NULL
  AND created_at > '2026-03-17 19:00:00';
```

### 方案 2：强制重新生成（推荐）

1. 清空数据库：
   ```sql
   DELETE FROM quotation_draft_lines;
   DELETE FROM quotation_drafts;
   ```

2. 确认后端已重启

3. 重新运行报价流程

4. 检查新数据的 `quote_spec`
