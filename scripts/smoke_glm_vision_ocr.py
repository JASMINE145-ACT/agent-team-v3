"""
冒烟：验证 glm-4.6v（或 Config.GLM_VISION_MODEL）能否通过 chat.completions 正常返回。

用法（在 Agent Team version3 根目录）:
  python scripts/smoke_glm_vision_ocr.py

依赖：环境变量中已有智谱可用 Key（GLM_VISION_API_KEY 或 GLM_OCR_API_KEY 或 ZHIPU_API_KEY 等）。
"""
from __future__ import annotations

import base64
import sys
from pathlib import Path

# 保证可 import backend
_ROOT = Path(__file__).resolve().parents[1]
if str(_ROOT) not in sys.path:
    sys.path.insert(0, str(_ROOT))

# 1x1 PNG
_TINY_PNG_B64 = (
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
)


def _mask(s: str | None) -> str:
    if not s:
        return "(empty)"
    if len(s) <= 8:
        return "***"
    return s[:4] + "..." + s[-4:]


def main() -> int:
    from backend.config import Config
    from backend.core.glm_ocr import call_zhipu_vision_ocr

    model = (getattr(Config, "GLM_VISION_MODEL", "") or "").strip() or "glm-4.6v"
    api_key = (getattr(Config, "GLM_VISION_API_KEY", "") or "").strip()
    base_raw = (getattr(Config, "GLM_VISION_BASE_URL", "") or "").strip()
    if not api_key:
        api_key = getattr(Config, "GLM_OCR_API_KEY", None) or ""
    if isinstance(api_key, str):
        api_key = api_key.strip()
    if not api_key:
        api_key = (getattr(Config, "OPENAI_API_KEY", None) or "") or ""
        if isinstance(api_key, str):
            api_key = api_key.strip()
    base_url = base_raw or (getattr(Config, "GLM_OCR_BASE_URL", "") or "").strip()

    print("smoke_glm_vision_ocr")
    print("  model:", repr(model))
    print("  base_url:", base_url or "(empty)")
    print("  api_key:", _mask(api_key))

    if not api_key or not base_url:
        print("ERROR: 缺少 api_key 或 base_url，请检查 .env 中 GLM_OCR_* / GLM_VISION_* / ZHIPU*")
        return 2

    raw = base64.b64decode(_TINY_PNG_B64)
    text = call_zhipu_vision_ocr(raw, "image/png", api_key, base_url, model)

    if text is None:
        print("RESULT: None（失败或空文本）。对 1×1 空白图，部分模型会返回空，属正常。")
        print("DEBUG: 直连再打一次，仅打印响应摘要（不含 key）…")
        try:
            from openai import OpenAI

            bu = (base_url or "").rstrip("/") + "/" if (base_url or "").strip() else None
            client = OpenAI(api_key=api_key, base_url=bu)
            mime_type = "image/png"
            data_uri = f"data:{mime_type};base64,{base64.b64encode(raw).decode()}"
            from backend.core.glm_ocr import _VISION_OCR_SYSTEM

            resp = client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": _VISION_OCR_SYSTEM},
                    {
                        "role": "user",
                        "content": [
                            {"type": "image_url", "image_url": {"url": data_uri}},
                            {"type": "text", "text": "请提取图片中所有文字。"},
                        ],
                    },
                ],
                temperature=0,
                max_tokens=1500,
                timeout=60,
            )
            ch0 = resp.choices[0] if resp and resp.choices else None
            msg = ch0.message if ch0 else None
            content = (getattr(msg, "content", None) or "").strip() if msg else ""
            fr = getattr(ch0, "finish_reason", None)
            print("  finish_reason:", fr)
            print("  content_len:", len(content))
            print("  content_preview:", repr(content[:200]))
            if fr == "stop":
                print(
                    "PASS: glm-4.6v 接口可调用（智谱返回 stop）。"
                    " 空白 1×1 图无文字，content 为空属正常。"
                )
                return 0
            print("WARN: finish_reason 非 stop，请检查模型名与计费。")
        except Exception as e:
            print("  DEBUG error:", e)
        return 1

    print("RESULT OK, length=", len(text))
    print("--- preview (first 500 chars) ---")
    print(text[:500])
    print("--- end ---")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
