# 可选：用于云端或本地 Docker 部署，他人可通过镜像运行
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# 前端已提交在 dist/control-ui，无需 Node 构建
EXPOSE 8000
ENV API_HOST=0.0.0.0
ENV API_PORT=8000

# 云端平台若注入 PORT，可通过 run 时 -e API_PORT=$PORT 传入
CMD ["python", "run_backend.py"]
