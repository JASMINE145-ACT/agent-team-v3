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

## 本地部署（供他人访问的几种方式）

| 方式 | 做法 | 适用场景 |
|------|------|----------|
| **本机 + 局域网** | 用上面方式启动后，默认已监听 `0.0.0.0`，同局域网其他人浏览器访问 `http://<你本机IP>:8000`（如 `http://192.168.1.100:8000`）。本机 IP：Windows `ipconfig`，Mac/Linux `ip addr` 或 `ifconfig`。 | 办公室/家里多人用，无需公网。 |
| **本机 + 内网穿透** | 用 [ngrok](https://ngrok.com)、[frp](https://github.com/fatedier/frp)、花生壳等把本机 8000 端口暴露为公网 URL，外地同事通过该链接访问。 | 临时让外网访问，不想买服务器。 |
| **本地服务器/NAS 常驻** | 在办公室服务器或 NAS 上克隆仓库、配好 `.env`，用 `python run_backend.py` 或下面方式运行；其他人通过 `http://服务器IP:8000` 访问。需开机自启时：Linux 可写 systemd 服务，Windows 可用任务计划程序或 NSSM 把 `python run_backend.py` 设为服务。 | 固定给团队用、数据留在本地。 |
| **本地 Docker** | 在项目根目录执行 `docker build -t agent-v3 .`，再 `docker run -d -p 8000:8000 --env-file .env agent-v3`（或把环境变量逐个 `-e` 传入）。其他人访问 `http://<本机或服务器IP>:8000`。 | 环境隔离、方便迁移或与其它服务一起用 docker-compose。 |

- 若本机有防火墙，需放行 8000 端口（或你设置的 `API_PORT`）。
- 仅 HTTP，无 HTTPS；若需 HTTPS，可在本机前加 nginx 反代并配证书。

## 业务文件与会话（部署必看）

- **会话目录**：`data/sessions/` 用于存放会话记录。**首次启动时会自动创建**，无需手动建目录。若提示「缺少 session」，请确认从项目根目录启动（保证 `data/sessions` 在项目下），并重启后端。
- **业务文件**（询价/万鼎/报价单功能依赖，**仅保留以下两个 Excel**）：
  - `data/万鼎价格库_管材与国标管件_标准格式.xlsx` 或同目录下替代价格库（可通过 `.env` 的 `PRICE_LIBRARY_PATH` 指定）。
  - `data/整理产品(2).xlsx`（询价名称→产品编号映射表，可通过 `MAPPING_TABLE_PATH` 指定）。
  - `backend/tools/inventory/item-list-slim.xlsx`（库存解析用产品 slim 表，可通过 `INVENTORY_ITEM_LIST_SLIM_PATH` 指定）。
  - `backend/tools/data/wanding_business_knowledge.md`（万鼎选型业务知识）。仓库内已包含该文件；若缺失，首次使用选型功能时会自动用内置内容生成。
- **上传目录**：`uploads/` 会在首次启动时自动创建，用于聊天内上传的 Excel/PDF。

## 常见问题

- **页面空白或 404**：若为刚克隆的仓库，应已包含 `dist/control-ui/`，重启后端或强制刷新浏览器（Ctrl+Shift+R）。若曾删除过 `dist/`，请到「3. 前端」执行构建。
- **启动报错缺少 xxx 环境变量**：检查项目根目录下的 `.env` 是否从 `.env.example` 复制并已填写。
- **缺少业务文件**：见上方「业务文件与会话」，将对应 Excel 放到 `data/` 下或配置好 `PRICE_LIBRARY_PATH`、`MAPPING_TABLE_PATH`。
- **缺少 session / 会话列表为空**：会话目录会在首次启动时自动创建；若仍报错，请从项目根目录运行、确认 `data/sessions` 已存在后重启。
- **工具参数不合法**：多为以下情况：① 使用询价填充/无货登记时**未先上传文件**，工具需要 `file_path`，请先在聊天中上传 Excel 再操作；② LLM 返回的参数格式异常，可检查 `.env` 中 API Key、BASE_URL 是否正确及网络是否正常；③ 智谱等模型偶发少传必填参数，可重试或换一句描述。
- **端口被占用**：设置 `API_PORT=8001`（或其它未占用端口）后重启。

---

## 部署到云端（供他人访问）

若要把服务部署到云上让别人用，需要做以下几件事。

### 1. 环境变量（必配）

在云平台的「环境变量 / Environment Variables」里配置，**不要**把 `.env` 文件提交到仓库：

| 变量 | 必填 | 说明 |
|------|------|------|
| `OPENAI_BASE_URL` | 是（智谱） | 如 `https://open.bigmodel.cn/api/paas/v4` |
| `ZHIPU_API_KEY` | 是（智谱） | 智谱 API Key |
| `AOL_ACCESS_TOKEN` | 是 | 库存查询（Accurate） |
| `AOL_SIGNATURE_SECRET` | 是 | |
| `AOL_DATABASE_ID` | 是 | |
| `API_HOST` | 否 | 默认 `0.0.0.0`（对外监听） |
| `API_PORT` / `PORT` | 否 | 默认 8000；多数平台会注入 `PORT`，本应用已兼容 |
| `PRICE_LIBRARY_PATH` | 否 | 未设置则用 `data/` 下默认文件名 |
| `MAPPING_TABLE_PATH` | 否 | 未设置则用 `data/整理产品(2).xlsx` |
| `SESSION_STORE_DIR` | 否 | 会话目录，默认 `data/sessions` |
| `UPLOAD_DIR` | 否 | 上传目录，默认 `uploads` |
| `QUOTATION_DB_PATH` | 否 | 无货登记 SQLite，默认 `data/out_of_stock.db` |

### 2. 业务文件与持久化

- **业务文件**：`data/万鼎价格库_管材与国标管件_标准格式.xlsx`、`data/整理产品(2).xlsx` 若已提交到 Git，部署时会自带；否则需通过对象存储/挂载卷提供，并用环境变量指向路径。
- **持久化目录**（会话、上传、无货库）：云实例重启后通常清空本地盘。若需保留：
  - **容器/虚拟机**：把 `data/`、`uploads/` 挂载到持久卷（如 Docker volume、云盘）。
  - **Serverless/无持久盘**：会话和上传会丢；无货库可考虑后续改为外接数据库（如云 MySQL）。

### 3. 启动命令

在云平台填「启动命令」时，用项目根目录为工作目录，例如：

```bash
pip install -r requirements.txt && python run_backend.py
```

或先建虚拟环境再启动（按平台要求）。前端已包含在仓库的 `dist/control-ui/`，无需再执行 `npm run build`。

### 4. 端口与 HTTPS

- 应用默认监听 `0.0.0.0:API_PORT`，云平台若分配了 `PORT`，本应用会读取 `API_PORT` 或 `PORT`。
- 对外需用 **HTTPS**：由云平台提供（反向代理、负载均衡）即可，应用本身只跑 HTTP。

### 5. 可选：Docker 部署

若使用 Docker，可在项目根目录建 `Dockerfile`，例如：

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
ENV API_HOST=0.0.0.0 API_PORT=8000
CMD ["python", "run_backend.py"]
```

构建并运行（映射端口、按需挂载 `data` 和 `uploads`）：

```bash
docker build -t agent-team-v3 .
docker run -p 8000:8000 -e ZHIPU_API_KEY=xxx -e AOL_ACCESS_TOKEN=xxx ... agent-team-v3
```

密钥建议用 `-e` 或 env 文件传入，不要写进镜像。

### 6. 安全建议

- 仅在内网或可信环境使用时，可不做登录；若对公网开放，建议在反向代理层做认证（如 Basic Auth、OAuth）或加一层统一登录。
- 不要将 `.env` 或含密钥的文件提交到 Git；云端只用环境变量或密钥管理服务。

### 7. 平台推荐（有免费或低成本）

| 平台 | 免费/低成本情况 | 适合场景 | 注意 |
|------|------------------|----------|------|
| **Render** | 免费档：每月约 750 小时，可选 Free 实例 | 演示、小团队试用 | 约 15 分钟无访问会休眠，下次请求冷启动约 1 分钟；本地磁盘不持久，重启/重新部署后 `data/`、`uploads/` 会清空。 |
| **Railway** | 试用约 $5 额度，之后约 $1/月 起（按用量） | 需要常驻、不想被休眠 | 用量小时代价低；需绑卡，按实际使用计费。**区域**：仅美西/美东/欧洲/新加坡，无中国、印尼机房；可选 **新加坡 (Southeast Asia)**，印尼访问延迟低；中国内地访问或注册可能受网络限制。 |
| **Fly.io** | 有小额免费额度（小 VM/体积限制） | 需要多区域、低延迟或 WebSocket 友好 | 配置稍多，适合愿意折腾的。 |
| **国内**（阿里云 / 腾讯云 等） | 新用户常有免费试用（如 1 个月 ECS） | 国内访问、要备案域名 | 需备案才能用域名访问；试用期后按量或包月。 |

- **只想零成本演示**：用 **Render** 免费档，连 GitHub 仓库 → 选 Python / 或 Docker → 填环境变量 → 部署。接受「冷启动」和「会话/上传不持久」即可。
- **希望常驻、少冷启动**：用 **Railway** 或 **Fly.io**，或国内云试用机；会话/无货库要持久可挂卷（Railway/Fly 支持 Volume）。
- 具体步骤以各平台当前文档为准（如 [Render 文档](https://render.com/docs)、[Railway 文档](https://docs.railway.app)）。

### 8. 部署到 Vercel（Serverless）

项目已包含 Vercel 所需配置（`index.py` 入口、`vercel.json` 构建/安装命令）。

**步骤简述**：在 [Vercel](https://vercel.com) 新建项目 → 导入本仓库 → **Root Directory** 设为 `Agent Team version3` → 在项目 Settings → Environment Variables 中配置与「1. 环境变量」相同的变量（如 `ZHIPU_API_KEY`、`AOL_ACCESS_TOKEN` 等）→ 部署。

**当前仍缺 / 需注意**：

| 项目 | 说明 |
|------|------|
| **环境变量** | 在 Vercel 项目 Settings → Environment Variables 中配置 `.env.example` 中的必填项，不要提交 `.env`。 |
| **业务文件** | `data/` 下价格库、映射表等需在仓库中提交，或通过构建时下载/挂载提供，并用 `PRICE_LIBRARY_PATH`、`MAPPING_TABLE_PATH` 指向。 |
| **会话与上传** | Serverless 无持久盘，`SESSION_STORE_DIR`、`UPLOAD_DIR` 在实例内为临时；重启/冷启动后丢失。若需持久化，需后续改为外存（如 Vercel Blob、S3）。 |
| **WebSocket** | 控制台使用 `/ws`；Vercel 对 WebSocket 有支持但存在时长等限制，若遇断连可重连或改用 HTTP 轮询。 |
| **冷启动与体积** | 首次请求会加载 Resolver/价格库等，冷启动可能较慢；部署包需在 500MB 以内（见 Vercel 限制）。 |

本地可用 `vercel dev` 调试（需先 `pip install -r requirements.txt` 且 `cd control-ui && npm ci && npm run build`）。
