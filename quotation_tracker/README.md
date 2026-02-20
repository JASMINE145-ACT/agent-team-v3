# 报价单无货产品追踪系统

## 项目简介

基于 Streamlit 的 Web 应用，用于上传 Excel 报价单，自动提取「无货产品」的4个关键信息，持久化存储，并统计缺货次数；当某个产品缺货次数 ≥ 2 次时，触发 Email 通知。

## 功能特性

- ✅ Excel 文件上传（支持 .xlsx、.xls）
- ✅ 无货行自动识别（规则匹配）
- ✅ LLM 智能字段匹配（支持多语言表头）
- ✅ 数据持久化存储（SQLite/PostgreSQL）
- ✅ 缺货次数统计
- ✅ 文件上传安全验证
- ✅ 并发安全（数据库事务）

## 快速开始

### 1. 安装依赖

```bash
cd quotation_tracker
pip install -r requirements.txt
```

### 2. 配置环境变量

创建 `.env` 文件或设置环境变量：

```bash
export OPENAI_API_KEY="your-openai-api-key"
export QUOTATION_DB_PATH="data/out_of_stock.db"  # 可选，默认值
```

### 3. 运行应用

```bash
# 方式1：直接运行
streamlit run app.py

# 方式2：使用 run.py
python run.py
```

应用将在 `http://localhost:8501` 启动。

## 项目结构

```
quotation_tracker/
├── app.py                    # Streamlit 主应用
├── processor.py              # 主处理流程
├── config.py                 # 配置文件
├── requirements.txt           # 依赖列表
├── run.py                    # 运行入口
├── models/
│   ├── __init__.py
│   └── models.py            # Pydantic 数据模型
└── services/
    ├── __init__.py
    ├── excel_reader.py      # Excel 读取模块
    ├── out_of_stock_detector.py  # 无货行识别
    ├── llm_parser.py        # LLM 解析模块
    ├── data_service.py      # 数据服务模块
    └── file_validator.py    # 文件验证模块
```

## 使用说明

1. **上传文件**：在"上传文件"页面选择 Excel 报价单
2. **查看结果**：处理完成后查看提取的无货产品列表
3. **查看统计**：在"统计信息"页面查看总体统计
4. **查看列表**：在"无货产品列表"页面查看所有记录

## 开发状态

### Phase 1：基础功能 ✅
- [x] 项目结构搭建
- [x] Excel Reader
- [x] 无货行识别
- [x] LLM 字段匹配
- [x] Data Service
- [x] Streamlit 界面
- [x] 文件上传安全

### Phase 2：统计与通知（待开发）
- [ ] Email Service
- [ ] 统计页面优化
- [ ] 监控和日志

### Phase 3：优化与部署（待开发）
- [ ] 单元测试
- [ ] 集成测试
- [ ] 性能优化
- [ ] 部署配置

## 注意事项

1. **环境变量**：必须设置 `OPENAI_API_KEY`
2. **数据库**：默认使用 SQLite，生产环境建议使用 PostgreSQL
3. **文件大小**：默认最大支持 200MB
4. **LLM 成本**：每次处理约 $0.0001-0.0003（使用 gpt-4o-mini）

## 许可证

MIT License
