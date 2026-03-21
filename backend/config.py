"""
Backend 配置（version3 单 Agent）
"""
import os
from pathlib import Path
from dotenv import load_dotenv

# base_dir = Agent Team version3 根目录；repo_root = 上一级（如 agent-jk 根）
base_dir = Path(__file__).parent.parent
repo_root = base_dir.parent
# 先加载 version3 / oos，最后加载项目根 .env 并 override，保证项目根的 LLM_MODEL/ZHIPU 等优先生效
for env_path in [base_dir / "backend" / "tools" / "oos" / ".env", base_dir / ".env"]:
    if env_path.exists():
        load_dotenv(env_path)
        print(f"[Config] Loaded from: {env_path}")
if (repo_root / ".env").exists():
    load_dotenv(repo_root / ".env", override=True)
    print(f"[Config] Loaded from (override): {repo_root / '.env'}")

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
    # 单次回复最大 token 数；表格/利润率等长回复需 2 万+，Claude Loop 改造后提升至 4 万避免思考被截断
    LLM_MAX_TOKENS = int(os.getenv("LLM_MAX_TOKENS", "40000"))
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
    # 会话与 Memory 相关参数（可选环境变量覆盖）
    SESSION_MAX_TURNS = int(os.getenv("SESSION_MAX_TURNS", "20"))
    SESSION_INJECT_TURNS = int(os.getenv("SESSION_INJECT_TURNS", "4"))
    SESSION_INJECT_ANSWER_TRIM = int(os.getenv("SESSION_INJECT_ANSWER_TRIM", "2000"))
    SESSION_ANSWER_TRIM = int(os.getenv("SESSION_ANSWER_TRIM", "2000"))
    # 文字报价：用案例报价单模板生成 Excel 的模板路径（供 /api/quotation/from-text）
    _quotation_tpl = base_dir / "报价单" / "案例报价单.xlsx"
    QUOTATION_TEMPLATE_PATH = Path(os.getenv("QUOTATION_TEMPLATE_PATH", str(_quotation_tpl)))

    # 批量快速询价（WeCom 专用）限制
    BATCH_QUOTE_MAX_ITEMS = int(os.getenv("BATCH_QUOTE_MAX_ITEMS", "100"))
    BATCH_QUOTE_TIMEOUT_SEC = int(os.getenv("BATCH_QUOTE_TIMEOUT_SEC", "40"))

    # LangSmith：Work/Chat 模式下 LLM 调用与 token 消耗追踪（可选）
    LANGSMITH_TRACING = os.getenv("LANGSMITH_TRACING", "").lower() in ("1", "true", "yes")
    LANGSMITH_API_KEY = (os.getenv("LANGSMITH_API_KEY") or "").strip() or None
    LANGSMITH_PROJECT = (os.getenv("LANGSMITH_PROJECT") or "agent-jk-v3").strip() or None

    # 可选：主模型失败时自动 fallback 到备用模型（例如 GLM 超时时切到 gpt-4o-mini）
    FALLBACK_LLM_BASE_URL = (os.getenv("FALLBACK_BASE_URL") or "").strip() or None
    FALLBACK_LLM_API_KEY = (os.getenv("FALLBACK_API_KEY") or "").strip() or None
    FALLBACK_LLM_MODEL = (os.getenv("FALLBACK_MODEL") or "").strip() or None

    # 图片输入：使用智谱视觉模型识别后注入文本；不设则用主模型 Key/Base
    GLM_OCR_ENABLED = (os.getenv("GLM_OCR_ENABLED", "true") or "").strip().lower() in ("1", "true", "yes")
    GLM_OCR_API_KEY = (os.getenv("GLM_OCR_API_KEY") or "").strip() or None  # None 则用 OPENAI_API_KEY
    _glm_ocr_base = (os.getenv("GLM_OCR_BASE_URL") or "").strip() or "https://open.bigmodel.cn/api/paas/v4"
    GLM_OCR_BASE_URL = _glm_ocr_base.rstrip("/") + "/"
    GLM_OCR_MODEL = (os.getenv("GLM_OCR_MODEL") or "").strip() or "glm-ocr"
    # 单张图片大小上限（字节），超过拒绝；默认 5MB；智谱 OCR 单张 8MB，此处取 min
    try:
        _max_mb = int(os.getenv("MAX_IMAGE_SIZE_MB", "5"))
        MAX_IMAGE_SIZE = min(_max_mb * 1024 * 1024, 8 * 1024 * 1024)
    except (TypeError, ValueError):
        MAX_IMAGE_SIZE = min(5 * 1024 * 1024, 8 * 1024 * 1024)
    # 每次请求参与 OCR 的图片最大张数，防止一次性传入过多图片导致延迟过高
    try:
        MAX_OCR_IMAGES_PER_REQUEST = int(os.getenv("MAX_OCR_IMAGES_PER_REQUEST", "3"))
    except (TypeError, ValueError):
        MAX_OCR_IMAGES_PER_REQUEST = 3

    # Work 模式：管道/ReAct 开关与 run_id TTL（秒）
    WORK_USE_PIPELINE = (os.getenv("WORK_USE_PIPELINE", "true") or "").strip().lower() in ("1", "true", "yes")
    WORK_RUN_ID_TTL_SECONDS = int(os.getenv("WORK_RUN_ID_TTL_SECONDS", str(60 * 60)))

    # Chat/WeCom ReAct 单轮最大步数（每步一次 LLM 调用）；默认 12，可通过 REACT_MAX_STEPS 覆盖
    REACT_MAX_STEPS = int(os.getenv("REACT_MAX_STEPS", "12"))

    # Claude Loop Prompt：是否使用三段式 Claude Loop 思考结构（Gather/Act/Verify）；默认 true
    USE_CLAUDE_LOOP_PROMPT = (os.getenv("USE_CLAUDE_LOOP_PROMPT", "true") or "").strip().lower() in ("1", "true", "yes")

    # Run Log：长流程运行日志基目录（相对 base_dir 的 data/run-logs，或通过环境变量覆盖）
    RUN_LOG_BASE_DIR = Path(os.getenv("RUN_LOG_BASE_DIR", str(base_dir / "data" / "run-logs")))

    # 报价草稿规格双列：是否用一次批量 LLM 提取「询价规格」与「报价产品规」（默认 true；false 则仅用规则+回退）
    QUOTATION_SPEC_LLM = (os.getenv("QUOTATION_SPEC_LLM", "true") or "").strip().lower() in ("1", "true", "yes")

    # 行情告警服务（Go ontime-detector-alert）：/alerts CRUD 的 base URL
    ALERT_SERVICE_URL = (os.getenv("ALERT_SERVICE_URL", "https://ontime-detector-alert.onrender.com") or "").rstrip("/")

    # 企业微信（WeCom）集成相关配置：Phase 1 仅用于 URL 验证与明文回调
    WECOM_TOKEN = os.getenv("WECOM_TOKEN", "")
    WECOM_AES_KEY = os.getenv("WECOM_AES_KEY", "")
    WECOM_CORP_ID = os.getenv("WECOM_CORP_ID", "")
    WECOM_AGENT_ID = os.getenv("WECOM_AGENT_ID", "")

    # WeCom Excel：是否在长连接链路中启用完整 Excel 解析与上下文缓存
    WECHAT_EXCEL_FULL_PARSE_ENABLED = (
        os.getenv("WECHAT_EXCEL_FULL_PARSE_ENABLED", "true").strip().lower() in ("1", "true", "yes")
    )
    # WeCom 长连接：文件下载整体超时（秒），用于 asyncio.wait_for(download_file, ...)；海外部署可适当调大
    try:
        WECOM_FILE_DOWNLOAD_TIMEOUT = int(os.getenv("WECOM_FILE_DOWNLOAD_TIMEOUT", "60"))
    except (TypeError, ValueError):
        WECOM_FILE_DOWNLOAD_TIMEOUT = 60

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
    if Config.GLM_OCR_ENABLED:
        print("[Config] GLM_OCR: enabled, base_url:", Config.GLM_OCR_BASE_URL)
    else:
        print("[Config] GLM_OCR: disabled")

__all__ = ["Config"]
