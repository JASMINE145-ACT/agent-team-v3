"""
Backend 配置（version3 单 Agent）
"""
import os
from pathlib import Path
from dotenv import load_dotenv

base_dir = Path(__file__).parent.parent
for env_path in [base_dir / ".env", base_dir / "backend" / "tools" / "oos" / ".env"]:
    if env_path.exists():
        load_dotenv(env_path)
        print(f"[Config] Loaded from: {env_path}")
        break

class Config:
    _OPENAI_BASE_URL_RAW = os.getenv("OPENAI_BASE_URL") or os.getenv("OPENAI_BASE_URL_ZHIPU") or "https://open.bigmodel.cn/api/paas/v4"
    OPENAI_BASE_URL = (_OPENAI_BASE_URL_RAW or "").rstrip("/") + "/"
    _IS_ZHIPU = "bigmodel.cn" in (OPENAI_BASE_URL or "")
    OPENAI_API_KEY = (
        os.getenv("ZHIPU_API_KEY") or os.getenv("OPENAI_API_KEY")
        if _IS_ZHIPU
        else (os.getenv("OPENAI_API_KEY") or os.getenv("ZHIPU_API_KEY"))
    )
    # 主 LLM（默认智谱 GLM，可通过 .env 中的 LLM_MODEL 覆盖）
    LLM_MODEL = os.getenv("LLM_MODEL", "glm-4-flash")
    LLM_MAX_TOKENS = int(os.getenv("LLM_MAX_TOKENS", "5000"))
    # 上下文压缩：用轻量模型对历史 tool 结果做摘要，默认 gpt-4o-mini；未设则用主模型同 endpoint
    SUMMARY_LLM_MODEL = os.getenv("SUMMARY_LLM_MODEL", "gpt-4o-mini")
    SUMMARY_LLM_BASE_URL = (os.getenv("SUMMARY_LLM_BASE_URL") or "").strip() or None  # None 则用 OPENAI_BASE_URL
    SUMMARY_LLM_API_KEY = os.getenv("SUMMARY_LLM_API_KEY") or None  # None 则用 OPENAI_API_KEY
    AOL_ACCESS_TOKEN = os.getenv("AOL_ACCESS_TOKEN")
    AOL_SIGNATURE_SECRET = os.getenv("AOL_SIGNATURE_SECRET")
    AOL_DATABASE_ID = os.getenv("AOL_DATABASE_ID")
    API_HOST = os.getenv("API_HOST", "0.0.0.0")
    # 云端平台常注入 PORT，本地默认 8000
    API_PORT = int(os.getenv("API_PORT") or os.getenv("PORT", "8000"))
    DEBUG = os.getenv("DEBUG", "false").lower() == "true"
    # Vercel/Serverless 仅 /tmp 可写；Render 默认无持久盘，base_dir 为临时目录，重启/部署后丢失
    # 本地：base_dir/uploads；Render 持久化请挂载 Disk 并设置 UPLOAD_DIR 指向挂载路径（如 /data/uploads）
    _is_vercel = os.getenv("VERCEL") in ("1", "true")
    UPLOAD_DIR = Path(os.getenv("UPLOAD_DIR", "/tmp/uploads" if _is_vercel else str(base_dir / "uploads")))
    MAX_UPLOAD_MB = int(os.getenv("MAX_UPLOAD_MB", "200"))
    _v3_data_dir = base_dir / "data"
    _v3_standard = _v3_data_dir / "万鼎价格库_管材与国标管件_标准格式.xlsx"
    _v3_old = _v3_data_dir / "Copy of 万鼎国际集团最新价格库更新20250814.xlsx"
    PRICE_LIBRARY_PATH = Path(
        os.getenv("PRICE_LIBRARY_PATH")
        or (str(_v3_standard) if _v3_standard.exists() else str(_v3_old) if _v3_old.exists() else str(_v3_standard))
    )
    SESSION_STORE_DIR = Path(os.getenv("SESSION_STORE_DIR", "/tmp/sessions" if _is_vercel else str(base_dir / "data" / "sessions")))

    # LangSmith：Work/Chat 模式下 LLM 调用与 token 消耗追踪（可选）
    LANGSMITH_TRACING = os.getenv("LANGSMITH_TRACING", "").lower() in ("1", "true", "yes")
    LANGSMITH_API_KEY = (os.getenv("LANGSMITH_API_KEY") or "").strip() or None
    LANGSMITH_PROJECT = (os.getenv("LANGSMITH_PROJECT") or "agent-jk-v3").strip() or None

    # 可选：主模型失败时自动 fallback 到备用模型（例如 GLM 超时时切到 gpt-4o-mini）
    FALLBACK_LLM_BASE_URL = (os.getenv("FALLBACK_BASE_URL") or "").strip() or None
    FALLBACK_LLM_API_KEY = (os.getenv("FALLBACK_API_KEY") or "").strip() or None
    FALLBACK_LLM_MODEL = (os.getenv("FALLBACK_MODEL") or "").strip() or None

    @classmethod
    def validate(cls):
        errors = []
        if not cls.OPENAI_API_KEY:
            errors.append("缺少 OPENAI_API_KEY 或 ZHIPU_API_KEY")
        if not cls.AOL_ACCESS_TOKEN:
            errors.append("缺少 AOL_ACCESS_TOKEN（库存查询需要）")
        if errors:
            print("[Config] Warnings:", *[f"  - {e}" for e in errors])
        return len(errors) == 0

if __name__ != "__main__":
    Config.validate()

__all__ = ["Config"]
