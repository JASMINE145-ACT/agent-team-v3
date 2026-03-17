# 快速修复指南 - quote_spec 字段缺失

## 立即执行（必须按顺序）

### 步骤 1：手动添加数据库列（Neon PostgreSQL）

登录 Neon Dashboard → SQL Editor，执行以下 SQL：

```sql
ALTER TABLE quotation_draft_lines ADD COLUMN quote_spec VARCHAR(500);
```

或者使用 psql：
```bash
psql $DATABASE_URL -c "ALTER TABLE quotation_draft_lines ADD COLUMN quote_spec VARCHAR(500);"
```

**验证：**
```sql
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'quotation_draft_lines' AND column_name = 'quote_spec';
```
应该返回一行：`quote_spec`

### 步骤 2：部署代码更新

```bash
cd "D:/Projects/agent-jk/Agent Team version3"

# 如果使用 git
git add .
git commit -m "fix: add quote_spec column migration and frontend editing support"
git push

# 重新构建前端
cd control-ui
npm run build  # 或 pnpm build

# 重启后端
# （根据你的部署方式，可能是重启 Render 服务、重启 Docker 容器等）
```

### 步骤 3：验证修复

1. **后端验证**：查看启动日志
   ```
   应该看到：
   INFO:backend.tools.oos.services.data_service:迁移: 已添加列 quotation_draft_lines.quote_spec
   或者（如果步骤1已手动添加）：
   WARNING:backend.tools.oos.services.data_service:迁移添加列 quote_spec 失败（可能已存在）
   ```

2. **前端验证**：
   - 访问 Work 页面
   - 上传询价单并运行匹配流程
   - 在"待保存报价草稿"表格中：
     - ✅ "报价产品规"列应该可见
     - ✅ 该列的值可以编辑（输入框）
   - 点击"保存报价单"：
     - ✅ 不再报错 `column "quote_spec" does not exist`
     - ✅ 成功保存并显示草稿编号

3. **数据验证**：
   ```sql
   SELECT id, quote_name, quote_spec 
   FROM quotation_draft_lines 
   ORDER BY id DESC 
   LIMIT 5;
   ```
   新保存的行应该有 `quote_spec` 值（可能为 NULL 或解析出的规格）

## 回滚（如果出现问题）

```sql
-- 警告：这会删除所有 quote_spec 数据
ALTER TABLE quotation_draft_lines DROP COLUMN quote_spec;
```

然后回退代码到修复前版本。

## 已修改的文件

### 后端（必须部署）：
- ✅ `backend/tools/oos/services/data_service.py` - PostgreSQL 迁移支持
- ✅ `migrations/add_quote_spec_column.sql` - 手动迁移脚本

### 前端（必须重新构建）：
- ✅ `control-ui/src/ui/types.ts` - 类型定义添加 quote_spec
- ✅ `control-ui/src/ui/views/work.ts` - 改为可编辑输入框
- ✅ `control-ui/src/ui/views/fulfill.ts` - 移除类型断言

### 文档（可选）：
- ✅ `migrations/README.md` - 迁移文档
- ✅ `SOLUTION.md` - 详细解决方案
- ✅ `claude.md` - 项目文档更新

## 常见问题

### Q1: 执行 SQL 后仍然报错
A: 确认连接到正确的数据库。检查环境变量 `DATABASE_URL` 是否指向生产数据库。

### Q2: 前端没有显示"报价产品规"列
A: 确认前端已重新构建。检查浏览器控制台是否有 TypeScript 错误。

### Q3: 字段显示为空
A: 正常。首次添加列时，已有数据的 quote_spec 为 NULL。新保存的报价单会自动解析规格。

### Q4: 需要启用 LLM 提升解析准确率吗？
A: 可选。在 `.env` 中添加 `QUOTATION_SPEC_LLM=true` 即可启用批量 LLM 解析。

## 联系支持

如果问题仍未解决，请提供以下信息：
1. 后端启动日志（特别是包含 "迁移" 关键词的行）
2. 数据库类型和版本（SQLite / PostgreSQL / Neon）
3. 错误堆栈完整信息
4. 浏览器控制台错误（如有）
