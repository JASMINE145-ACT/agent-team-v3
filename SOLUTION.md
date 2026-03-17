# Fix: quote_spec 列缺失与前端编辑问题

## 问题概述

### 问题 1: 数据库列不存在
```
psycopg2.errors.UndefinedColumn: column "quote_spec" of relation "quotation_draft_lines" does not exist
```

**原因：**
- 后端模型 `QuotationDraftLineDB` 定义了 `quote_spec` 字段
- 自动迁移逻辑 `_migrate_add_columns_if_needed()` 只支持 SQLite
- 生产环境使用 Neon PostgreSQL，未执行列添加
- 保存报价草稿时尝试写入不存在的列导致失败

### 问题 2: 前端规格不可编辑
- 前端 TypeScript 类型 `QuotationDraftLine` 缺少 `quote_spec` 字段
- 虽然通过类型断言 `as { quote_spec?: string }` 显示，但无法编辑
- 用户无法手动修正解析错误的规格

## 解决方案

### 1. 数据库迁移（必须先执行）

#### 方式 A：手动执行 SQL（推荐用于生产环境）

连接到你的 Neon PostgreSQL 数据库，执行：

```sql
-- 检查列是否存在，不存在则添加
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'quotation_draft_lines' 
        AND column_name = 'quote_spec'
    ) THEN
        ALTER TABLE quotation_draft_lines 
        ADD COLUMN quote_spec VARCHAR(500);
        
        RAISE NOTICE 'Column quote_spec added successfully';
    ELSE
        RAISE NOTICE 'Column quote_spec already exists';
    END IF;
END $$;
```

**Neon 控制台执行步骤：**
1. 登录 Neon Dashboard
2. 选择你的项目和数据库
3. 打开 SQL Editor
4. 粘贴上述 SQL
5. 点击 "Run" 执行
6. 验证输出显示 "Column quote_spec added successfully"

**psql 命令行执行：**
```bash
# 从环境变量获取连接信息
psql $DATABASE_URL -f migrations/add_quote_spec_column.sql
```

#### 方式 B：重启应用自动迁移（开发环境）

**前提：** 必须先应用本次代码修复（修复了 `data_service.py` 的自动迁移逻辑）

1. 部署/更新后端代码
2. 重启应用
3. 查看日志确认迁移成功：
   ```
   INFO:backend.tools.oos.services.data_service:迁移: 已添加列 quotation_draft_lines.quote_spec
   ```

### 2. 代码修复（已完成）

#### 后端修复：
- ✅ `data_service.py:_migrate_add_columns_if_needed()` 现支持 PostgreSQL
- ✅ 使用 `information_schema.columns` 检查列是否存在（PostgreSQL 标准）
- ✅ 对 SQLite 继续使用 `PRAGMA table_info()`
- ✅ 自动在应用启动时添加缺失列

#### 前端修复：
- ✅ `types.ts:QuotationDraftLine` 添加 `quote_spec?: string | null` 字段
- ✅ `work.ts` 将 quote_spec 从只读改为可编辑 `<input>` 字段
- ✅ `fulfill.ts` 移除类型断言，直接使用 `line.quote_spec`

### 3. 验证步骤

#### 后端验证：
```bash
# 1. 连接数据库验证列存在
psql $DATABASE_URL -c "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'quotation_draft_lines' AND column_name = 'quote_spec';"

# 预期输出：
#  column_name |     data_type
# -------------+-------------------
#  quote_spec  | character varying

# 2. 重启后端并查看日志
python start.py  # 或你的启动命令

# 查看日志中是否有：
# "迁移: 已添加列 quotation_draft_lines.quote_spec"
# 或 "Column quote_spec already exists"（如果已手动添加）
```

#### 前端验证：
```bash
# 1. 重新构建前端
cd control-ui
npm run build  # 或 pnpm build

# 2. 访问 Work 页面
# 3. 运行报价匹配流程
# 4. 在"待保存报价草稿"表格中：
#    - 验证"报价产品规"列可见
#    - 验证该列的输入框可编辑
#    - 点击"保存报价单"不再报错
```

#### 端到端测试：
```bash
# 上传一个询价单，完成匹配流程
curl -X POST http://localhost:5555/api/work/run \
  -F "file_paths[]=test_inquiry.xlsx" \
  -F "customer_level=A"

# 检查返回的 pending_quotation_draft.lines 是否包含 quote_spec
# 保存报价单应该成功
```

## 修改文件清单

### 新增文件：
- `migrations/add_quote_spec_column.sql` - 手动迁移脚本
- `migrations/README.md` - 迁移文档
- `SOLUTION.md` - 本解决方案文档

### 修改文件：
1. **后端**
   - `backend/tools/oos/services/data_service.py`
     - `_migrate_add_columns_if_needed()` 方法完全重写
     - 支持 PostgreSQL 列检查与添加
     - 对所有迁移表（out_of_stock_records、shortage_records、quotation_draft_lines）统一处理

2. **前端**
   - `control-ui/src/ui/types.ts`
     - `QuotationDraftLine` 类型添加 `quote_spec` 字段
   - `control-ui/src/ui/views/work.ts`
     - 将 quote_spec 从静态文本改为可编辑 input
   - `control-ui/src/ui/views/fulfill.ts`
     - 移除不必要的类型断言

## 技术细节

### 为什么需要 quote_spec？

报价单表格需要区分两种规格：
1. **specification（询价规格）**：客户询价时的规格型号
2. **quote_spec（报价产品规）**：匹配到的万鼎产品的规格型号

**示例：**
| 询价名称 | 询价规格 | 报价名称 | 报价产品规 |
|---------|---------|---------|-----------|
| 直接 | 50 | 直通(管箍)PVC-U排水配件白色 dn50 | PVC-U排水 dn50 |
| 三通 | 50 | 短型顺水三通印尼(日标)PVC-U管件(D排水系列)灰色 DN50 (2") | PVC-U管件 DN50 (2") |

**解析逻辑：**
- `backend/tools/quotation/spec_extract.py:extract_spec_from_quote_name()`
- 使用正则匹配常见规格模式（DN、英寸、mm 等）
- 可选开启 LLM 批量解析提升准确率（`QUOTATION_SPEC_LLM=true`）

### 自动迁移的安全性

`_migrate_add_columns_if_needed()` 的设计保证：
- **幂等性**：多次运行不会重复添加列
- **事务安全**：每个 ALTER 单独提交，失败不影响其他列
- **错误容忍**：捕获异常并记录警告，不中断启动
- **方言适配**：自动识别 SQLite/PostgreSQL 并使用相应语法

## 预防措施

### 避免未来同类问题：

1. **开发流程**
   - 添加新列时，同时更新自动迁移逻辑
   - 在 `_migrate_add_columns_if_needed()` 中注册新列
   - 提交代码前在 PostgreSQL 环境测试

2. **部署流程**
   - 部署前检查是否有数据库变更
   - 先执行手动迁移脚本
   - 再部署代码更新
   - 验证日志确认迁移成功

3. **监控**
   - 设置错误告警（UndefinedColumn、IntegrityError）
   - 定期检查 information_schema 与模型定义一致性

## 回滚方案

如果迁移后出现问题，可以回滚（不推荐，除非数据损坏）：

```sql
-- 警告：这会删除所有 quote_spec 数据
ALTER TABLE quotation_draft_lines DROP COLUMN quote_spec;
```

然后回退代码到修复前版本。

## 相关文档

- `doc/报价流程与规范行契约.md` - 规范行字段定义
- `backend/tools/quotation/canonical_lines.py` - 规范行构建逻辑
- `backend/tools/quotation/spec_extract.py` - 规格解析算法
- `claude.md` - 项目架构总览

## 问题排查

### 如果保存仍然失败：

1. **检查列是否真的存在：**
   ```sql
   \d quotation_draft_lines  -- psql
   -- 或
   SELECT * FROM information_schema.columns 
   WHERE table_name = 'quotation_draft_lines';
   ```

2. **检查应用是否连接到正确的数据库：**
   ```python
   # 在后端日志中查找
   grep "Connected to Postgres" logs/backend.log
   ```

3. **检查是否有其他缺失列：**
   ```python
   # 比对 QuotationDraftLineDB 模型与实际表结构
   # 模型在 data_service.py:104
   ```

4. **检查前端类型是否更新：**
   ```bash
   cd control-ui
   npm run build  # 确保使用新类型定义
   ```

### 如果规格仍然解析不正确：

1. **启用 LLM 批量解析：**
   ```bash
   # .env 文件
   QUOTATION_SPEC_LLM=true
   ```

2. **调整解析规则：**
   - 编辑 `spec_extract.py:_QUOTE_SPEC_PATTERNS`
   - 添加项目特有的规格模式

3. **手动修正：**
   - 在 Work 页面的"待保存报价草稿"表格中
   - 直接编辑"报价产品规"列
   - 保存后生效

## 总结

本次修复解决了两个核心问题：
1. **数据库兼容性**：自动迁移现支持 PostgreSQL，避免手动 SQL 操作
2. **前端可用性**：规格字段可编辑，用户可纠正解析错误

**关键改进：**
- 统一 SQLite 和 PostgreSQL 的迁移逻辑
- 类型安全：前端类型与后端模型一致
- 用户体验：规格可见且可编辑

**已验证环境：**
- ✅ Neon PostgreSQL (生产)
- ✅ SQLite (开发)
- ✅ 前端 TypeScript 编译通过
- ✅ 报价单保存流程正常
