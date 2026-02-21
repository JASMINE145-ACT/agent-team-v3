"""
库存查询 Agent - 配置管理
"""

import os
from pathlib import Path
from typing import List

# 优先加载 .env，与 quotation_tracker 一致，避免 401（LLM 未拿到 API Key）
_INVENTORY_AGENT_DIR = Path(__file__).resolve().parent
_AGENT_TEAM_DIR = _INVENTORY_AGENT_DIR.parent
for _env_path in (
    _AGENT_TEAM_DIR / ".env",
    _INVENTORY_AGENT_DIR / ".env",
    _AGENT_TEAM_DIR / "oos" / ".env",
    Path(os.getcwd()) / ".env",
):
    if _env_path.exists():
        try:
            from dotenv import load_dotenv
            load_dotenv(_env_path)
            break
        except ImportError:
            break

# slim 表默认放在 inventory_agent 包内，与运行目录无关
_DEFAULT_SLIM_PATH = _INVENTORY_AGENT_DIR / "item-list-slim.xlsx"


class InventoryConfig:
    """库存查询配置"""

    # list.do 只用于按名称/code 获取 id，仅请求最小字段
    LIST_FIELDS: List[str] = ["id", "no"]

    # detail.do 返回后解析的字段（与网站 7 列一致，见 table_agent._parse_item）
    # 网站列              detail_do.sample_data 字段
    # #                   无（前端序号）
    # Item Name           name
    # Item Code           no
    # Item Type           itemType / itemTypeName
    # Unit                unit1Name / vendorUnit.name
    # Qty (User Warehouse) balance / detailWarehouseData[].balance|unit1Quantity 汇总
    # Available to sell   availableToSell
    REQUIRED_FIELDS: List[str] = [
        "id", "no", "name", "type", "unit",
        "quantityOnHand", "quantityAvailable",
    ]
    
    # API 端点
    API_LIST_ENDPOINT = "/api/item/list.do"
    API_DETAIL_ENDPOINT = "/api/item/detail.do"
    
    # 查询限制
    MAX_RESULTS = 10  # 超过此数量截断并提示
    MAX_CODES_PER_SEARCH = 10  # ReAct 单次 search_inventory 按 code 拉取时最多查几个 code，与 MAX_DETAILS_FOR_AGENT 一致
    MAX_DETAILS_FOR_AGENT = 10  # ReAct 单次 search_inventory 关键词查表时最多拉几条 detail，保证 35s 内能返回

    # 超时设置（秒）
    API_TIMEOUT = 10   # 单次 AOL 请求超时，避免一次挂住 30s 占满工具总超时
    EMBEDDING_TIMEOUT = 15  # Resolver 向量建库/查询时 OpenAI embedding 超时
    
    # 重试次数
    API_RETRY_COUNT = 1

    # --- 万鼎价格库（仅用 version3/data，不依赖 version2）---
    _v3_data_dir = _AGENT_TEAM_DIR / "data"
    _v3_standard = _v3_data_dir / "万鼎价格库_管材与国标管件_标准格式.xlsx"
    _v3_old = _v3_data_dir / "Copy of 万鼎国际集团最新价格库更新20250814.xlsx"
    PRICE_LIBRARY_PATH: str = os.environ.get(
        "PRICE_LIBRARY_PATH",
        str(_v3_standard) if _v3_standard.exists() else str(_v3_old) if _v3_old.exists() else str(_v3_standard),
    )
    # 万鼎匹配：CONTAINS + 向量 fallback（数据源仅万鼎，不用 item-list-slim）
    ENABLE_WANDING_VECTOR: bool = os.environ.get("ENABLE_WANDING_VECTOR", "1").strip().lower() in ("1", "true", "yes")
    WANDING_VECTOR_TOP_K: int = int(os.environ.get("WANDING_VECTOR_TOP_K", "3"))
    # 向量粗筛：相似度阈值（cosine），仅返回 score >= 此值的候选；默认 0.65
    WANDING_VECTOR_MIN_SCORE: float = float(os.environ.get("WANDING_VECTOR_MIN_SCORE", "0.65"))
    # 向量粗筛：最多返回候选数，默认 20
    WANDING_VECTOR_COARSE_MAX: int = int(os.environ.get("WANDING_VECTOR_COARSE_MAX", "20"))
    # 询价填充是否启用 Resolver（item-list-slim）fallback，默认 0（仅用万鼎）
    USE_RESOLVER_FALLBACK: bool = os.environ.get("USE_RESOLVER_FALLBACK", "0").strip().lower() in ("1", "true", "yes")
    # 万鼎选型/LLM selector 业务知识：单独 MD 文件路径，支持用户「你要记住」等命令追加
    # 默认 backend/tools/data/wanding_business_knowledge.md；可用 WANDING_BUSINESS_KNOWLEDGE_PATH 覆盖
    WANDING_BUSINESS_KNOWLEDGE_PATH: str = os.environ.get(
        "WANDING_BUSINESS_KNOWLEDGE_PATH",
        str(_v3_data_dir / "wanding_business_knowledge.md"),
    )

    # --- Resolver（本地 phrase → Item Code，仅 search_inventory 用；询价填充可禁用）---
    # 默认读包内 item-list-slim.xlsx；可通过 INVENTORY_ITEM_LIST_SLIM_PATH 覆盖。
    # 环境变量汇总：
    #   INVENTORY_ITEM_LIST_SLIM_PATH   slim 表路径，默认包内 item-list-slim.xlsx
    #   INVENTORY_RESOLVER_CONTAINS     CONTAINS 列 "name"|"chinese"|"both"，默认 both
    #   INVENTORY_ENABLE_RESOLVER_VECTOR  是否启用向量 fallback，默认 1（可选，需 OPENAI_API_KEY）
    #   INVENTORY_OPENAI_EMBEDDING_MODEL  嵌入模型，默认 text-embedding-3-large
    #   INVENTORY_RESOLVER_VECTOR_TOP_K  向量 top_k，默认 3
    #   INVENTORY_RESOLVER_VECTOR_TOP_K_CANDIDATES  有规格过滤时向量候选池大小，默认 20
    # 启用向量时需在环境中配置 OPENAI_API_KEY（由 OpenAI 客户端自动读取）。
    ITEM_LIST_SLIM_PATH: str = os.environ.get("INVENTORY_ITEM_LIST_SLIM_PATH", str(_DEFAULT_SLIM_PATH))
    RESOLVER_CONTAINS_COLUMNS: str = os.environ.get("INVENTORY_RESOLVER_CONTAINS", "both")
    ENABLE_RESOLVER_VECTOR: bool = os.environ.get("INVENTORY_ENABLE_RESOLVER_VECTOR", "1").strip().lower() in ("1", "true", "yes")
    OPENAI_EMBEDDING_MODEL: str = os.environ.get("INVENTORY_OPENAI_EMBEDDING_MODEL", "text-embedding-3-large")
    RESOLVER_VECTOR_TOP_K: int = int(os.environ.get("INVENTORY_RESOLVER_VECTOR_TOP_K", "3"))
    RESOLVER_VECTOR_TOP_K_CANDIDATES: int = int(os.environ.get("INVENTORY_RESOLVER_VECTOR_TOP_K_CANDIDATES", "20"))

    # ReAct Agent（思考→工具→观察）LLM 配置，与 quotation_tracker 同源：智谱优先
    LLM_API_KEY: str = os.environ.get("ZHIPU_API_KEY") or os.environ.get("OPENAI_API_KEY") or ""
    LLM_BASE_URL: str = os.environ.get("OPENAI_BASE_URL_ZHIPU") or os.environ.get("OPENAI_BASE_URL") or "https://open.bigmodel.cn/api/paas/v4"
    LLM_MODEL: str = os.environ.get("LLM_MODEL", "glm-4-flash")
    LLM_MAX_TOKENS: int = int(os.environ.get("LLM_MAX_TOKENS", "5000"))
    TOOL_RESULT_MAX_CHARS: int = int(os.environ.get("TOOL_RESULT_MAX_CHARS", "8000"))
    LLM_TIMEOUT: int = int(os.environ.get("LLM_TIMEOUT", "60"))
    TOOL_EXEC_TIMEOUT: int = int(os.environ.get("TOOL_EXEC_TIMEOUT", "90"))  # AOL 多 code 时需多次 API 调用，35s 易超时
    INVENTORY_DEMO_MODE: bool = os.environ.get("INVENTORY_DEMO_MODE", "").strip().lower() in ("1", "true", "yes")  # 演示模式：src 不可用时返回模拟库存


# 全局配置实例
config = InventoryConfig()
