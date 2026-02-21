"""
业务知识「记住」命令：借鉴 OpenClaw 的 memory/学习机制，将用户说的「你要记住 xxx」写入业务知识 MD，
供万鼎 LLM selector 与主 Agent 使用。

触发句式：你要记住、请记住、记住：、/记住 等；仅当能解析出非空内容时写入并返回回复，否则返回 None 走正常 ReAct。
"""

from __future__ import annotations

import re
from datetime import datetime
from pathlib import Path
from typing import Optional

# 触发前缀（顺序无关，取第一个匹配到的并截断前缀得到「要记的内容」）
_REMEMBER_PATTERNS = [
    r"你要记住[：:\s]+",
    r"请记住[：:\s]+",
    r"记住[：:\s]+",
    r"[/／]记住[：:\s]*",
    r"帮我记住[：:\s]+",
    r"记一下[：:\s]+",
]


def _get_knowledge_path() -> Optional[Path]:
    try:
        from backend.tools.inventory.config import config
        path = getattr(config, "WANDING_BUSINESS_KNOWLEDGE_PATH", None)
        if path:
            return Path(path)
    except Exception:
        pass
    return None


def _extract_remember_content(user_input: str) -> Optional[str]:
    """若 user_input 是「记住」类指令，返回要记的内容（已 strip）；否则返回 None。"""
    text = (user_input or "").strip()
    if not text:
        return None
    for pat in _REMEMBER_PATTERNS:
        m = re.match(pat, text, re.IGNORECASE)
        if m:
            content = text[m.end() :].strip()
            return content if content else None
    return None


def try_handle_remember(user_input: str) -> Optional[str]:
    """
    若用户输入为「你要记住 xxx」等，则追加到业务知识 MD 并返回回复文案；
    否则返回 None，调用方应继续走正常 execute_react。
    """
    content = _extract_remember_content(user_input)
    if not content:
        return None

    path = _get_knowledge_path()
    if not path:
        return "当前未配置业务知识文件路径，无法保存。请设置 WANDING_BUSINESS_KNOWLEDGE_PATH。"

    try:
        path.parent.mkdir(parents=True, exist_ok=True)
        # 若文件不存在，先确保有内容（与 llm_selector 首次加载时行为一致，此处只做追加）
        if not path.exists():
            from backend.tools.inventory.services.llm_selector import _BUSINESS_KNOWLEDGE
            path.write_text(_BUSINESS_KNOWLEDGE.strip(), encoding="utf-8")

        date_str = datetime.now().strftime("%Y-%m-%d %H:%M")
        line = f"\n\n- [用户添加 {date_str}] {content}\n"
        with path.open("a", encoding="utf-8") as f:
            f.write(line)
        # 使 llm_selector 下次加载时重新读 MD，避免重复读取到旧内容
        try:
            from backend.tools.inventory.services.llm_selector import invalidate_business_knowledge_cache
            invalidate_business_knowledge_cache()
        except Exception:
            pass
        return f"已记住：{content[:80]}{'…' if len(content) > 80 else ''}\n（已追加到业务知识文件，后续万鼎选型与匹配会参考。）"
    except Exception as e:
        return f"写入业务知识文件失败：{e}"
