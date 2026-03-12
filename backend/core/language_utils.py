"""Language detection and helpers for bilingual Chat behavior.

轻量级语言检测工具，用于在 Chat 入口判定用户输入主要是中文还是英文，
以及在工具 observation 中判断是否包含大量中文内容。

不依赖第三方库，只用 Unicode 范围与简单比例阈值。
"""

from __future__ import annotations

import re
from typing import Literal

LangCode = Literal["zh", "en", "auto"]

_CJK_REGEX = re.compile(r"[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]")
_ASCII_LETTER_REGEX = re.compile(r"[A-Za-z]")


def detect_language(text: str) -> LangCode:
    """Detect input language from user text.

    返回:
        - "zh": 主要为中文（含中文字符占比较高）
        - "en": 主要为英文（ASCII 字母占比较高，且几乎无中文）
        - "auto": 模糊/混合，留给上层决定（建议默认按中文处理以保持兼容）
    """
    if not text:
        return "auto"

    # 粗略统计：非空白字符总数、其中 CJK 数量与 ASCII 字母数量
    stripped = "".join(ch for ch in text if not ch.isspace())
    if not stripped:
        return "auto"

    total = len(stripped)
    cjk_count = len(_CJK_REGEX.findall(stripped))
    ascii_letters = len(_ASCII_LETTER_REGEX.findall(stripped))

    # 明显中文：CJK 占比超过 30%
    if total > 0 and cjk_count / total >= 0.3:
        return "zh"

    # 明显英文：ASCII 字母很多且几乎没有中文
    if ascii_letters >= 3 and cjk_count == 0 and ascii_letters / total >= 0.5:
        return "en"

    # 其他情况（例如代码片段、符号混合等）标记为 auto
    return "auto"


def contains_chinese(text: str, *, threshold: int = 10) -> bool:
    """Return True if the text contains 'enough' Chinese characters.

    threshold: 触发为 True 所需的最少中文字符数，默认 10。
    """
    if not text:
        return False
    return len(_CJK_REGEX.findall(text)) >= threshold

