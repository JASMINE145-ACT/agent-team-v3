"""
配置文件
"""
import os
from pathlib import Path
from typing import Optional

# 加载 .env（若存在）
_env_path = Path(__file__).parent / ".env"
if _env_path.exists():
    try:
        from dotenv import load_dotenv
        load_dotenv(_env_path)
    except ImportError:
        pass

# 数据库配置
DB_PATH = os.getenv("QUOTATION_DB_PATH", "data/out_of_stock.db")
# 确保 data 目录存在
data_dir = Path(DB_PATH).parent
data_dir.mkdir(parents=True, exist_ok=True)

DB_URL = os.getenv("DATABASE_URL")  # PostgreSQL 连接串（生产环境）

# 文件上传配置
MAX_FILE_SIZE = 200 * 1024 * 1024  # 200MB
UPLOAD_DIR = Path(os.getenv("UPLOAD_DIR", "uploads"))
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# LLM 配置（支持 OpenAI 或智谱等兼容接口）
OPENAI_BASE_URL = os.getenv("OPENAI_BASE_URL") or os.getenv("OPENAI_BASE_URL_ZHIPU")  # 智谱填 OPENAI_BASE_URL_ZHIPU
LLM_API_KEY = os.getenv("ZHIPU_API_KEY") or os.getenv("OPENAI_API_KEY")  # 用智谱时填 ZHIPU_API_KEY
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")  # 兼容旧代码

LLM_MODEL = os.getenv("LLM_MODEL", "glm-4.7")
LLM_MAX_TOKENS = int(os.getenv("LLM_MAX_TOKENS", "5000"))
# Agent 工具返回给模型的最大字符数；过小会导致 get_out_of_stock_records 只看到前 N 条无货行从而少落库（原 4000 约 36 条）
TOOL_RESULT_MAX_CHARS = int(os.getenv("TOOL_RESULT_MAX_CHARS", "20000"))
# 单次工具执行超时（秒），与 inventory_agent 对齐，避免 Excel/DB 卡死
TOOL_EXEC_TIMEOUT = int(os.getenv("TOOL_EXEC_TIMEOUT", "35"))
LLM_TEMPERATURE = float(os.getenv("LLM_TEMPERATURE", "0.0"))
LLM_PARSE_MAX_RETRIES = int(os.getenv("LLM_PARSE_MAX_RETRIES", "2"))
# 全表送 LLM 时最大行数（避免 token 超限，0 表示不限制；无货在表格靠后时需调大或设为 0）
MAX_TABLE_ROWS_FOR_LLM = int(os.getenv("MAX_TABLE_ROWS_FOR_LLM", "500"))
# 数据段至少保留行数（含表头），避免结构断裂把前几行就截断导致只送 3 行；仅当未命中表尾关键词时生效
MIN_DATA_SECTION_ROWS = int(os.getenv("MIN_DATA_SECTION_ROWS", "20"))

# True=先规则锁定无货行，再送「表头+无货行上下各N行」给 LLM；False=送整段数据表让 LLM 全量读并自己找无货（默认）
USE_WUHOU_CONTEXT_MODE = os.getenv("USE_WUHOU_CONTEXT_MODE", "false").lower() in ("1", "true", "yes")
# 无货行上下各保留几行作为上下文（仅 USE_WUHOU_CONTEXT_MODE 时生效）
WUHOU_CONTEXT_ROWS = int(os.getenv("WUHOU_CONTEXT_ROWS", "2"))

# Email 配置（无货/缺货共用；未配置则不发信、不报错）
# 方式一（推荐）：Gmail API，用你的 Google 账号发信，发件人即该账号，只需配置一次 OAuth
GMAIL_REFRESH_TOKEN = os.getenv("GMAIL_REFRESH_TOKEN", "").strip() or None
GMAIL_CLIENT_ID = os.getenv("GMAIL_CLIENT_ID", "").strip() or None
GMAIL_CLIENT_SECRET = os.getenv("GMAIL_CLIENT_SECRET", "").strip() or None
# 方式二：SMTP（任意邮箱，含 Gmail 需用应用专用密码）
EMAIL_RECIPIENTS = os.getenv("EMAIL_RECIPIENTS", "").split(",") if os.getenv("EMAIL_RECIPIENTS") else []
EMAIL_SMTP_HOST = os.getenv("EMAIL_SMTP_HOST")
EMAIL_SMTP_PORT = os.getenv("EMAIL_SMTP_PORT", "587")
EMAIL_FROM = os.getenv("EMAIL_FROM")
EMAIL_USERNAME = os.getenv("EMAIL_USERNAME")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")
# 同一产品两次无货/缺货发邮件后，间隔多少小时可再次发（0=仅首次 count>=2 发一次）
EMAIL_COOLDOWN_HOURS = int(os.getenv("EMAIL_COOLDOWN_HOURS", "24"))

# 无货标识关键词
OUT_OF_STOCK_KEYWORDS = [
    "无货",
    "out of stock",
    "缺货",
    "无库存",
    "N/A",
    "缺",
    "无"
]

# 表尾/非数据区关键词（出现则视为数据段结束，该行及之后不送 LLM）
FOOTER_KEYWORDS = [
    "账号", "银行", "Branch", "Account No", "Account No.",
    "含税总价", "运费支付", "Freight Payment", "发货地址", "Shipping Address",
    "TERMS", "条款", "条件", "CONDITION",
    "报价公司", "报价日期", "审查人员", "振华人员", "Purchase Order",
    "Payment term", "Delivery Time", "Packaging", "Guarantee", "Payment Methode",
    "Penawaran", "Franco", "Pengiriman", "交货日期",
    # ===== 新增关键词 =====
    "合计", "小计", "总计", "备注", "Remark", "注意事项", "Note",
    "签字", "签名", "审批", "Approved By", "Signature",
    "有效期", "Validity", "报价有效期至", "Valid Until",
    "联系人", "Contact", "电话", "Tel", "Email", "Fax",
    "说明", "Description", "附件", "Attachment"
]

# 表头关键词（用于识别列）
HEADER_KEYWORDS = {
    "product_name": [
        "产品名称", "询价货物名称", "Nama Permintaan Barang", "Item Name",
        "产品", "货物名称", "名称"
    ],
    "specification": [
        "规格型号", "Spesifikasi", "Specification", "Model",
        "规格", "型号", "规格型号"
    ],
    "unit": [
        "单位", "Satuan", "Unit",
        "计量单位"
    ],
    "quantity": [
        "数量", "Jumlah", "Quantity",
        "询价数量", "数量"
    ]
}
