"""
单 Agent 工具：合并库存、报价单、无货、询价填充、澄清，由主 Agent 直接调用。
version3 独立运行，不依赖 version2；inventory_agent、quotation_tracker、src、backend.agents.quote/quote_sheet 均已复制到本仓库。
无货（OOS）执行函数在 tools_oos.py，此处仅聚合 schema 与 get_all_tools。
"""
import asyncio
import json
import logging
from pathlib import Path
from typing import Any, Dict, List, Optional

logger = logging.getLogger(__name__)


def _get_inventory_tools() -> List[dict]:
    from backend.tools.inventory.services.inventory_agent_tools import get_inventory_tools_openai_format
    return get_inventory_tools_openai_format()


def _get_quote_tools() -> List[dict]:
    from backend.tools.quotation.quote_tools import get_quote_tools_openai_format
    return get_quote_tools_openai_format()


def _get_oos_tools() -> List[dict]:
    from backend.tools.oos.oos_tools import get_oos_tools_openai_format
    return get_oos_tools_openai_format()


# 无货以外的工具（询价填充、澄清等）：在本模块定义
EXTRA_TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "run_quotation_fill",
            "description": "【询价填充】整单流水线：提取询价项 → 万鼎匹配 → 库存校验 → 回填 Excel。仅当用户明确要求「询价填充/填充报价单/完整报价」且 context 中已有 file_path 时调用。customer_level 可选报单档位 A/B/C/D/D_low/E 或 出厂价_含税/出厂价_不含税/采购不含税，默认 B。",
            "parameters": {
                "type": "object",
                "properties": {
                    "file_path": {"type": "string", "description": "报价单绝对路径"},
                    "customer_level": {"type": "string", "enum": ["A", "B", "C", "D", "D_low", "E", "出厂价_含税", "出厂价_不含税", "采购不含税"], "description": "价格档位：A 二级代理/B 一级代理/C 聚万大客户/D 青山大客户/D_low 青山(降低)/E 大唐(包运费)；或 出厂价_含税/出厂价_不含税/采购不含税。默认 B"},
                },
                "required": ["file_path"],
            },
            "x_tool_meta": {"access_mode": "write", "risk_level": "high"},
        },
    },
    {
        "type": "function",
        "function": {
            "name": "ask_clarification",
            "description": "【澄清】意图不明确时调用（如「查XX」「帮我查」，无法判断是库存还是价格）。已明确含「库存/可售/价格/报价/万鼎/档位」等词时可跳过。",
            "parameters": {
                "type": "object",
                "properties": {
                    "questions": {"type": "array", "items": {"type": "string"}, "description": "向用户提出的问题"},
                    "reasoning": {"type": "string", "description": "为何需要澄清"},
                },
                "required": ["questions"],
            },
            "x_tool_meta": {"access_mode": "write", "risk_level": "medium"},
        },
    },
    {
        "type": "function",
        "function": {
            "name": "append_business_knowledge",
            "description": "【业务知识】将一条知识追加到业务知识库（wanding_business_knowledge.md），后续万鼎选型与匹配会参考。当用户要求「记录到知识库」「记在 knowledge」「润色后记录」「把这个记下来」等时调用；content 为润色后的完整一条知识（可多句），如规格纠正、选型规则等。",
            "parameters": {
                "type": "object",
                "properties": {
                    "content": {"type": "string", "description": "要追加的一条业务知识，已润色为完整句子或条目"},
                },
                "required": ["content"],
            },
            "x_tool_meta": {"access_mode": "write", "risk_level": "medium"},
        },
    },
    {
        "type": "function",
        "function": {
            "name": "record_correction_to_knowledge",
            "description": "【Rework 记录】当用户在 rework 流程中确认了正确的报价选项后，将此次纠正记录到业务知识库。Agent 应在用户确认正确选项后自动调用（无需用户明确要求「记录」）。参数 keywords=询价关键词，confirmed_code=用户确认的产品编号，confirmed_name=产品名称，reasoning=用户给出的选型原因（如有）。",
            "parameters": {
                "type": "object",
                "properties": {
                    "keywords": {"type": "string", "description": "询价时的原始关键词"},
                    "confirmed_code": {"type": "string", "description": "用户确认的正确产品编号"},
                    "confirmed_name": {"type": "string", "description": "用户确认的产品名称"},
                    "reasoning": {"type": "string", "description": "用户给出的选择原因（可选，如「这是排水用的」等）"},
                },
                "required": ["keywords", "confirmed_code", "confirmed_name"],
            },
            "x_tool_meta": {"access_mode": "write", "risk_level": "medium"},
        },
    },
    {
        "type": "function",
        "function": {
            "name": "batch_quick_quote",
            "description": "【批量快速询价】纯文字输入多个产品+数量，一次性返回价格+库存的 Markdown 表格。适用企业微信快速报价场景。支持格式如「50三通 100个，25弯头 50个」或「DN50三通×100、DN25弯头×50」。限 100 项。",
            "parameters": {
                "type": "object",
                "properties": {
                    "inquiry_text": {
                        "type": "string",
                        "description": "询价文字，如「50三通 100个，25弯头 50个」或「DN50三通×100、DN25弯头×50」"
                    },
                    "customer_level": {
                        "type": "string",
                        "enum": ["A", "B", "C", "D", "D_low", "E", "出厂价_含税", "出厂价_不含税", "采购不含税"],
                        "description": "价格档位：A 二级代理/B 一级代理/C 聚万大客户/D 青山大客户/D_low 青山(降低)/E 大唐(包运费)；或 出厂价_含税/出厂价_不含税/采购不含税。默认 B"
                    }
                },
                "required": ["inquiry_text"]
            },
            "x_tool_meta": {"access_mode": "read", "risk_level": "low"}
        }
    },
]


def _build_all_tools() -> List[dict]:
    try:
        return _get_inventory_tools() + _get_quote_tools() + _get_oos_tools() + EXTRA_TOOLS
    except Exception as e:
        logger.warning("加载工具失败，仅使用 EXTRA_TOOLS: %s", e)
        return EXTRA_TOOLS


# 延迟单例，见代码准则规则3；多 worker 或需重置时建议迁至 app.state 或由 Extension 注入
ALL_TOOLS: Optional[List[dict]] = None


def get_all_tools() -> List[dict]:
    global ALL_TOOLS
    if ALL_TOOLS is None:
        ALL_TOOLS = _build_all_tools()
    return ALL_TOOLS


def reset_for_testing() -> None:
    """仅测试使用：重置工具列表缓存。"""
    global ALL_TOOLS
    ALL_TOOLS = None

