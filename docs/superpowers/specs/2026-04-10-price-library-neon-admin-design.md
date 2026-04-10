# 设计文档：价格库云端管理 (Neon Admin Panel)

**日期：** 2026-04-10  
**状态：** 待实现  
**背景：** match_quotation 依赖两个本地 Excel 文件，每次更新需后端人员手动替换文件。目标是将数据迁移到 Neon PostgreSQL，并在前端 control-ui 新增受密码保护的管理页，让业务人员可自行更新。

---

## 1. 目标

1. 将 `万鼎价格库_管材与国标管件_标准格式.xlsx` 和 `整理产品(2).xlsx` 的数据迁移至 Neon PostgreSQL
2. 在前端 control-ui 新增"数据管理"Tab，凭固定管理员密码进入
3. 支持两种更新方式：上传 Excel（全表替换）和网页逐行增删改
4. Match 逻辑改造为从数据库读取（内存缓存，性能不降）
5. 本地开发无 DATABASE_URL 时降级回读本地 xlsx，保持向下兼容

---

## 2. 数据库表结构

```sql
-- 万鼎价格库
CREATE TABLE price_library (
    id          SERIAL PRIMARY KEY,
    material    TEXT NOT NULL,        -- 料号/货号（Excel COL_MATERIAL）
    description TEXT NOT NULL,        -- 完整中文名（Excel COL_DESCRIBRITION）
    price_a     NUMERIC,              -- A 档价格
    price_b     NUMERIC,              -- B 档价格
    price_c     NUMERIC,              -- C 档价格
    price_d     NUMERIC,              -- D 档价格
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX ON price_library USING gin(to_tsvector('simple', description));

-- 产品映射表
CREATE TABLE product_mapping (
    id              SERIAL PRIMARY KEY,
    inquiry_name    TEXT NOT NULL,    -- 询价货物名称（列A）
    spec            TEXT,             -- 规格（列B）
    product_code    TEXT NOT NULL,    -- 产品编号（列C）
    quotation_name  TEXT,             -- 报价名称（列D）
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);
```

初始化：`backend/tools/admin/migrations/001_create_price_tables.sql`，服务启动时自动执行（与 OOS 模块一致的模式）。

---

## 3. 后端架构

### 3.1 新增文件结构

```
backend/
  server/api/
    routes_admin.py          # 所有 /api/admin/* 路由
  tools/admin/
    __init__.py
    auth.py                  # token 管理（内存 dict + TTL）
    repository.py            # price_library / product_mapping CRUD（SQLAlchemy）
    excel_parser.py          # openpyxl 解析两种 Excel 格式 → 行列表
    cache.py                 # 内存缓存（模块级 list，加锁）
    migrations/
      001_create_price_tables.sql
```

### 3.2 认证机制

- 密码来自 `.env` 的 `ADMIN_PASSWORD`（必须设置，否则管理功能禁用）
- `POST /api/admin/login`：验证密码 → 生成随机 UUID token → 存服务端内存 dict，TTL 4 小时
- 所有其他 `/api/admin/*` 路由：检查请求头 `X-Admin-Token`，无效/过期返回 401
- 前端将 token 存 `sessionStorage`，刷新页面后需重新登录

### 3.3 API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/admin/login` | 密码验证，返回 `{"token": "..."}` |
| GET | `/api/admin/price-library` | 分页查询，支持 `?q=` 关键词过滤，`?page=&page_size=` |
| POST | `/api/admin/price-library` | 新增一行 |
| PUT | `/api/admin/price-library/{id}` | 修改一行 |
| DELETE | `/api/admin/price-library/{id}` | 删除一行 |
| POST | `/api/admin/price-library/upload` | 上传 Excel（multipart），全表替换 + 清空缓存 |
| GET | `/api/admin/product-mapping` | 同上 |
| POST | `/api/admin/product-mapping` | 新增 |
| PUT | `/api/admin/product-mapping/{id}` | 修改 |
| DELETE | `/api/admin/product-mapping/{id}` | 删除 |
| POST | `/api/admin/product-mapping/upload` | 上传 Excel，全表替换 + 清空缓存 |

### 3.4 内存缓存层（cache.py）

```python
# 模块级缓存，线程安全
_price_library_cache: list[dict] | None = None
_product_mapping_cache: list[dict] | None = None
_lock = threading.Lock()

def get_price_library() -> list[dict]:
    """优先缓存 → Neon → 本地 xlsx fallback"""

def get_product_mapping() -> list[dict]:
    """同上"""

def invalidate_price_library():
    """上传/修改后清空，触发下次重新加载"""

def invalidate_product_mapping():
    """同上"""
```

### 3.5 Match 逻辑改造（最小侵入）

**`price_library_matcher.py`**：现在读 xlsx 的地方替换为 `cache.get_price_library()`  
**`mapping_table_matcher.py`**：同上，改为 `cache.get_product_mapping()`

原有 CONTAINS / 向量 fallback / LLM selector 逻辑**完全不动**，只改数据读取入口。

---

## 4. 前端 UI

### 4.1 新增 Tab：数据管理

在 control-ui 导航中新增 Tab（图标：数据库图标），仅在 `ADMIN_PASSWORD` 已配置时后端才启用相关路由（否则页面显示"功能未启用"）。

### 4.2 页面结构

```
[数据管理] Tab
│
├─ 未登录状态
│   └─ 密码输入框 + [登录] 按钮
│       (密码错误 → 显示提示；正确 → token 存 sessionStorage)
│
└─ 已登录状态
    ├─ 子页切换：[万鼎价格库] | [产品映射表]
    ├─ [退出登录] 按钮
    │
    ├─ 万鼎价格库页
    │   ├─ [上传 Excel] 按钮（选文件 → 确认弹窗"将全表替换，确认？" → 上传）
    │   ├─ 搜索框（前端过滤 material/description）
    │   ├─ 可编辑表格
    │   │   列：#  |  料号  |  描述  |  A价  |  B价  |  C价  |  D价  |  操作
    │   │   行内编辑：点击单元格 → 变为 input → 失焦自动保存（PUT 请求）
    │   │   操作列：[删除] 按钮（确认弹窗）
    │   └─ 底部：[+ 新增一行] 按钮（展开空白行填写 → 回车/点击保存）
    │
    └─ 产品映射表页（结构同上）
        列：#  |  询价名称  |  规格  |  产品编号  |  报价名称  |  操作
```

### 4.3 新增前端文件

```
control-ui/src/ui/views/
  admin-data.ts          # 主页面组件（登录 + 数据管理）
  admin-data.types.ts    # 类型定义
control-ui/src/ui/
  controllers/
    admin-data.ts        # 状态管理 + API 调用
```

---

## 5. 环境变量

```env
# .env 新增（必须设置才启用管理功能）
ADMIN_PASSWORD=your_secure_password_here
```

---

## 6. 兼容性与降级

| 场景 | 行为 |
|------|------|
| `DATABASE_URL` 已设置 | 从 Neon 加载数据 |
| `DATABASE_URL` 未设置（本地开发）| 降级读本地 xlsx 文件，match 正常工作 |
| `ADMIN_PASSWORD` 未设置 | `/api/admin/*` 路由返回 503，前端显示"功能未启用" |
| Neon 连接失败 | 降级读本地 xlsx，记录 warning 日志 |
| 数据库表为空（未导入） | 降级读本地 xlsx |

---

## 7. 数据初始化（首次部署）

1. 部署新代码，服务启动时自动建表
2. 进入前端"数据管理"Tab，登录
3. 上传现有 xlsx 文件（一键导入），系统解析并写入 Neon
4. 验证数据行数一致后，正常使用

---

## 8. 不在本次范围内

- 多用户账号体系（仅固定密码）
- 操作日志 / 审计（谁改了什么）
- 字段级别权限
- 向量索引自动重建（上传 Excel 后缓存清空，向量索引在下次匹配时按需重建）
