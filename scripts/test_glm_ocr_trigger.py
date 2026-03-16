# -*- coding: utf-8 -*-
"""
本地验证：GLM_OCR_* 是否生效、能否成功调用智谱 OCR 一次。

用法（在 Agent Team version3 目录下）：
  python scripts/test_glm_ocr_trigger.py

会加载 .env，打印 Config 中的 GLM_OCR 相关配置，并对一张 1x1 小图调用 OCR；
成功则打印识别结果或 "GLM-OCR 触发成功"。
"""
import sys
from pathlib import Path

root = Path(__file__).resolve().parent.parent
if str(root) not in sys.path:
    sys.path.insert(0, str(root))


def main():
    from backend.config import Config
    from backend.core.glm_ocr import call_zhipu_ocr

    enabled = getattr(Config, "GLM_OCR_ENABLED", False)
    api_key = getattr(Config, "GLM_OCR_API_KEY", None) or getattr(Config, "OPENAI_API_KEY", None)
    base_url = getattr(Config, "GLM_OCR_BASE_URL", "") or ""

    print("[Config] GLM_OCR_ENABLED:", enabled)
    print("[Config] GLM_OCR_API_KEY:", "***" if api_key else "(not set, 使用 OPENAI_API_KEY)")
    print("[Config] GLM_OCR_BASE_URL:", base_url or "(not set)")

    if not enabled:
        print("\nGLM_OCR_ENABLED 未启用，请在 .env 中设置 GLM_OCR_ENABLED=true 或移除此项。")
        sys.exit(1)
    if not api_key:
        print("\n未配置 GLM_OCR_API_KEY 或 OPENAI_API_KEY，无法调用智谱 OCR。")
        sys.exit(1)
    if not base_url:
        print("\n未配置 GLM_OCR_BASE_URL，将使用默认智谱 OCR 地址。")
        base_url = "https://open.bigmodel.cn/api/paas/v4/"

    # 1x1 红色像素 PNG
    tiny_b64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
    import base64
    raw = base64.b64decode(tiny_b64)

    print("\n正在请求智谱 OCR（单张 1x1 小图）...")
    try:
        text = call_zhipu_ocr(raw, "image/png", api_key, base_url)
        if text:
            print("GLM-OCR 触发成功。识别结果:", text[:200] if len(text) > 200 else text)
        else:
            print("请求已返回但未得到有效文本（可能图片过小或 API 返回非 succeeded）。")
            sys.exit(2)
    except Exception as e:
        print("请求失败:", e)
        sys.exit(1)


if __name__ == "__main__":
    main()
