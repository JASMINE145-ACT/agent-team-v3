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

### 3. 构建前端（否则页面空白）

前端未提交到 Git，需要本地构建一次：

```bash
cd control-ui
npm install
npm run build
cd ..
```

构建完成后会生成 `dist/control-ui/`，后端才会提供页面。

## 启动

```bash
python start.py
```

会启动后端并自动打开浏览器访问 `http://127.0.0.1:8000/`（端口可在 `.env` 用 `API_PORT` 修改）。

或仅启动后端：

```bash
python run_backend.py
```

## 常见问题

- **页面空白或 404**：说明未构建前端，请执行上面「构建前端」两步。
- **启动报错缺少 xxx 环境变量**：检查项目根目录下的 `.env` 是否从 `.env.example` 复制并已填写。
- **端口被占用**：设置 `API_PORT=8001`（或其它未占用端口）后重启。
