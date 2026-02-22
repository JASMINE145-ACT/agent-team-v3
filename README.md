# Agent Team version3

单主 Agent（询价/库存/无货/万鼎选型等），带 Control UI 控制台。

## 环境要求

- Python 3.10+
- Node.js 18+（用于构建前端）

## 首次克隆后必做三步

### 1. 安装 Python 依赖

在项目根目录执行：

```bash
pip install -r requirements.txt
```

建议使用虚拟环境：`python -m venv .venv` 后激活，再执行上述命令。

### 2. 配置环境变量

在**项目根目录**（与 `start.py` 同级）创建 `.env` 文件：

```bash
# Windows
copy .env.example .env

# Linux / macOS
cp .env.example .env
```

然后编辑 `.env`，填入必填项（至少）：

- **LLM**：`OPENAI_API_KEY` 或 `ZHIPU_API_KEY`，以及 `OPENAI_BASE_URL`（若用智谱等）
- **库存/ Accurate**：`AOL_ACCESS_TOKEN`、`AOL_SIGNATURE_SECRET`、`AOL_DATABASE_ID`

详见 `.env.example` 中的注释。

### 3. 前端（一般可跳过）

仓库内已包含构建好的前端（`dist/control-ui/`），克隆后**无需安装 Node 或执行构建**即可打开页面。  
仅当您修改了 `control-ui` 源码并希望生效时，再执行：

```bash
cd control-ui
npm install
npm run build
cd ..
```

## 启动

```bash
python start.py
```

会启动后端并自动打开浏览器访问 `http://127.0.0.1:8000/`（端口可在 `.env` 用 `API_PORT` 修改）。

或仅启动后端：

```bash
python run_backend.py
```

## 业务文件与会话（部署必看）

- **会话目录**：`data/sessions/` 用于存放会话记录。**首次启动时会自动创建**，无需手动建目录。若提示「缺少 session」，请确认从项目根目录启动（保证 `data/sessions` 在项目下），并重启后端。
- **业务文件**（询价/万鼎/报价单功能依赖）：
  - `data/万鼎价格库_管材与国标管件_标准格式.xlsx` 或同目录下替代价格库（可通过 `.env` 的 `PRICE_LIBRARY_PATH` 指定）。
  - `data/整理产品(2).xlsx`（询价名称→产品编号映射表，可通过 `MAPPING_TABLE_PATH` 指定）。
  - `backend/tools/data/wanding_business_knowledge.md`（万鼎选型业务知识）。仓库内已包含该文件；若缺失，首次使用选型功能时会自动用内置内容生成。
- **上传目录**：`uploads/` 会在首次启动时自动创建，用于聊天内上传的 Excel/PDF。

## 常见问题

- **页面空白或 404**：若为刚克隆的仓库，应已包含 `dist/control-ui/`，重启后端或强制刷新浏览器（Ctrl+Shift+R）。若曾删除过 `dist/`，请到「3. 前端」执行构建。
- **启动报错缺少 xxx 环境变量**：检查项目根目录下的 `.env` 是否从 `.env.example` 复制并已填写。
- **缺少业务文件**：见上方「业务文件与会话」，将对应 Excel 放到 `data/` 下或配置好 `PRICE_LIBRARY_PATH`、`MAPPING_TABLE_PATH`。
- **缺少 session / 会话列表为空**：会话目录会在首次启动时自动创建；若仍报错，请从项目根目录运行、确认 `data/sessions` 已存在后重启。
- **工具参数不合法**：多为以下情况：① 使用询价填充/无货登记时**未先上传文件**，工具需要 `file_path`，请先在聊天中上传 Excel 再操作；② LLM 返回的参数格式异常，可检查 `.env` 中 API Key、BASE_URL 是否正确及网络是否正常；③ 智谱等模型偶发少传必填参数，可重试或换一句描述。
- **端口被占用**：设置 `API_PORT=8001`（或其它未占用端口）后重启。
