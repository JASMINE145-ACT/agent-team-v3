# Vercel 部署清单

部署前按此清单检查，确保仓库可安全推送且 Vercel 能正常构建。

## 1. 切勿提交的内容（已由 .gitignore 排除）

- `.env` 及任何 `.env.*`、`.env.local`、`.env.production`
- `*.pem`、`*.key`、`.secrets`
- `uploads/`、`data/sessions/`、`*.db`、`*.sqlite3`
- `node_modules/`、`.venv/`、`__pycache__/`、`logs/`

提交前请执行：`git status`，确认列表中**没有**上述文件或目录。

## 2. 需要提交的内容（完整 Git 以便部署）

- 所有源码：`backend/`、`control-ui/`、`index.py`、`run_backend.py`、`start.py`
- 配置与入口：`vercel.json`、`requirements.txt`、`.env.example`、`.gitignore`、`.vercelignore`
- 业务数据（二选一）：
  - **推荐**：将 `data/万鼎价格库_管材与国标管件_标准格式.xlsx`、`data/整理产品(2).xlsx` 等放入 `data/` 并提交，部署时自带；
  - 或：不提交大文件，通过构建脚本/环境变量在部署时注入路径或 URL。
- 前端构建产物（二选一）：
  - **推荐**：提交 `dist/control-ui/`，克隆即可打开页面；Vercel 会按 `vercel.json` 重新执行 `npm run build` 覆盖；
  - 或：在 `.gitignore` 中取消注释 `dist/`，仅依赖 Vercel 构建（需保证 `installCommand`/`buildCommand` 正确）。

## 3. 提交与推送示例

```bash
cd "Agent Team version3"

# 确认无敏感文件
git status

# 添加除 .gitignore 已排除外的所有变更
git add -A
git status   # 再次确认没有 .env、uploads、data/sessions 等

# 提交并推送
git commit -m "chore: 完整代码与配置，准备 Vercel 部署"
git push origin main
```

## 4. Vercel 控制台配置

- **Root Directory**：若从 monorepo 导入，设为 `Agent Team version3`；若仓库即 version3 根，留空。
- **Environment Variables**：在 Settings → Environment Variables 中配置与 `.env.example` 一致项，例如：
  - `OPENAI_BASE_URL`、`ZHIPU_API_KEY`（或 `OPENAI_API_KEY`）
  - `AOL_ACCESS_TOKEN`、`AOL_SIGNATURE_SECRET`、`AOL_DATABASE_ID`
- 不填的密钥会导致运行时报错（如库存查询、LLM 调用失败）。

## 5. 部署后注意

- 会话与上传在 Serverless 下为临时，重启/冷启动后丢失；持久化需接 Vercel Blob 或 S3。
- WebSocket `/ws` 受平台限制，若有断连可重连或改用 HTTP 轮询。
- 详见 `README.md` 中「部署到 Vercel」一节。
