# -*- coding: utf-8 -*-
"""
本地验证：GLM_OCR_* 是否生效、能否成功调用智谱 OCR 一次。

用法（在 Agent Team version3 目录下）：
  python scripts/test_glm_ocr_trigger.py

会加载 .env，打印 Config 中的 GLM_OCR 相关配置，并优先读取 data/ 目录中的一张真实图片调用 OCR；
若未找到真实图片，回退到内置 1x1 小图（该图可能被接口判定为尺寸过小）。
"""
import sys
from pathlib import Path
import base64

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

    # 优先使用 data 目录里的一张真实图片，避免 1x1 图触发「上传图片大小错误」。
    data_dir = root / "data"
    candidate = None
    if data_dir.exists():
        for p in sorted(data_dir.iterdir()):
            if p.is_file() and p.suffix.lower() in (".png", ".jpg", ".jpeg", ".bmp"):
                candidate = p
                break

    if candidate is not None:
        raw = candidate.read_bytes()
        mime = "image/png" if candidate.suffix.lower() == ".png" else "image/jpeg"
        print(f"\n使用测试图片: {candidate} ({len(raw)} bytes)")
    else:
        tiny_b64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
        raw = base64.b64decode(tiny_b64)
        mime = "image/png"
        print("\n未找到 data 目录测试图，回退到内置 1x1 小图（可能因尺寸过小被拒绝）。")

    print("\n正在请求智谱 OCR...")
    try:
        text = call_zhipu_ocr(raw, mime, api_key, base_url)
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
