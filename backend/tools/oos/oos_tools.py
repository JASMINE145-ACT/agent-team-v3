from __future__ import annotations

from typing import List, Dict


def get_oos_tools_openai_format() -> List[Dict]:
    """Return OOS-related tools in OpenAI tools (function calling) format.

    Kept 1:1 with the previous EXTRA_TOOLS OOS entries in backend.agent.tools.
    """
    return [
        {
            "type": "function",
            "function": {
                "name": "get_oos_list",
                "description": "【无货】获取无货产品列表，含被报无货次数与邮件发送状态。",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "limit": {
                            "type": "integer",
                            "description": "最多返回条数，默认 100，展示前 50 条",
                        }
                    },
                    "required": [],
                },
                "x_tool_meta": {"access_mode": "read", "risk_level": "low"},
            },
        },
        {
            "type": "function",
            "function": {
                "name": "get_oos_stats",
                "description": "【无货】获取无货统计：总记录数、无货产品数、被报无货≥2次产品数、已发邮件产品数、今日新增。",
                "parameters": {"type": "object", "properties": {}},
                "x_tool_meta": {"access_mode": "read", "risk_level": "low"},
            },
        },
        {
            "type": "function",
            "function": {
                "name": "get_oos_by_file",
                "description": "【无货】按文件统计无货：每个报价单的记录数及上传时间。",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "limit": {
                            "type": "integer",
                            "description": "最多展示文件数，默认 50",
                        }
                    },
                    "required": [],
                },
                "x_tool_meta": {"access_mode": "read", "risk_level": "low"},
            },
        },
        {
            "type": "function",
            "function": {
                "name": "get_oos_by_time",
                "description": "【无货】按时间统计无货：按日汇总最近 N 天新增记录数。",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "last_n_days": {
                            "type": "integer",
                            "description": "统计最近几天，默认 30",
                        }
                    },
                    "required": [],
                },
                "x_tool_meta": {"access_mode": "read", "risk_level": "low"},
            },
        },
        {
            "type": "function",
            "function": {
                "name": "register_oos",
                "description": "【无货】无货登记（从报价单）：从已上传的报价单中解析无货行并落库。仅当用户明确说「无货登记」且 context 中已有 file_path 时调用；无 file_path 时勿用。",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "file_path": {
                            "type": "string",
                            "description": "报价单路径，须与 context.file_path 一致",
                        },
                        "prompt": {
                            "type": "string",
                            "description": "可选，解析/落库说明",
                        },
                    },
                    "required": ["file_path"],
                },
                "x_tool_meta": {"access_mode": "write", "risk_level": "high"},
            },
        },
        {
            "type": "function",
            "function": {
                "name": "register_oos_from_text",
                "description": "【无货】无货登记（直接登记）：用户用文字说出某产品无货时调用，无需上传文件。例如用户说「外螺纹堵头 50 无货」「报一下 XX 无货」「登记 XX 无货」时，从用户句中解析出 product_name、规格、数量后调用本工具直接落库。与 register_oos 二选一：有 file_path 用 register_oos；无文件、用户直接说产品名+无货则用本工具。",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "product_name": {
                            "type": "string",
                            "description": "产品名称（必填），如 外螺纹堵头、三角阀",
                        },
                        "specification": {
                            "type": "string",
                            "description": "规格，如 50、50cm、DN25；可选",
                        },
                        "quantity": {
                            "type": "number",
                            "description": "数量，默认 0",
                        },
                        "unit": {
                            "type": "string",
                            "description": "单位，如 个、根；可选",
                        },
                    },
                    "required": ["product_name"],
                },
                "x_tool_meta": {"access_mode": "write", "risk_level": "high"},
            },
        },
    ]

