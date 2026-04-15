"""
智谱 OCR：图片 -> 文本，供入口层注入用户消息。

当前实现使用官方 OCR 端点 `{base_url}/files/ocr`（multipart/form-data 上传文件）。
响应中优先从 `words_result` 聚合文本，整体长度受 `MAX_OCR_TEXT_CHARS` 控制，
避免注入后撑爆 LLM 上下文。
"""
import base64
import logging
import os
import time
from typing import Any, Dict, List, Optional, Tuple

import requests
from io import BytesIO

try:
    from PIL import Image  # type: ignore[import]
except Exception:  # Pillow 未安装时仅做 MIME 回退，不做格式转换
    Image = None  # type: ignore[assignment]

logger = logging.getLogger(__name__)

# 智谱 OCR 单张 8MB
ZHIPU_OCR_MAX_BYTES = 8 * 1024 * 1024

# 单次 OCR 结果长度上限（字符数），防止注入到 user_input 后导致上下文爆炸
try:
    MAX_OCR_TEXT_CHARS = int(os.getenv("MAX_OCR_TEXT_CHARS", "6000"))
except (TypeError, ValueError):
    MAX_OCR_TEXT_CHARS = 6000

# 单次 OCR 请求超时时间（秒）
try:
    GLM_OCR_TIMEOUT_SECONDS = int(os.getenv("GLM_OCR_TIMEOUT_SECONDS", "20"))
except (TypeError, ValueError):
    GLM_OCR_TIMEOUT_SECONDS = 20

_VISION_OCR_SYSTEM = (
    "你是专业文字提取助手。从图片中提取所有文字，严格遵守：\n"
    "1. 分数寸必须写成分数形式：3/4、1/2、1/4、3/8（禁止写成 34、12、14、38）\n"
    "2. 管径保留原始写法：DN50、dn50、Φ50\n"
    "3. 按原始布局输出，表格内容用 | 分隔列\n"
    "4. 只输出图片中的文字，不添加任何解释或总结"
)


def _mime_to_extension(mime: str) -> str:
    m = (mime or "").strip().lower()
    if "png" in m:
        return "png"
    if "jpeg" in m or "jpg" in m:
        return "jpg"
    if "bmp" in m:
        return "bmp"
    return "png"


def call_zhipu_vision_ocr(
    image_bytes: bytes,
    mime: str,
    api_key: str,
    base_url: str,
    model: str,
    timeout: Optional[int] = None,
) -> Optional[str]:
    """
    调用 glm-4.6v（或任意视觉模型）chat.completions，从截图提取文字。

    使用领域 system prompt，明确要求保留分数写法（3/4、1/2），避免斜杠被吞。

    失败返回 None，由调用方回退到 call_zhipu_ocr。
    """
    if not image_bytes or not api_key or not model or not (base_url or "").strip():
        return None
    if timeout is None:
        timeout = GLM_OCR_TIMEOUT_SECONDS

    mime_type = (mime or "image/png").strip() or "image/png"
    b64 = base64.b64encode(image_bytes).decode()
    data_uri = f"data:{mime_type};base64,{b64}"

    try:
        from openai import OpenAI

        bu = (base_url or "").rstrip("/") + "/" if (base_url or "").strip() else None
        client = OpenAI(api_key=api_key, base_url=bu)
        logger.info(
            "GLM Vision OCR: model=%s size=%d bytes mime=%s",
            model,
            len(image_bytes),
            mime_type,
        )
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
            timeout=timeout,
        )
        text = (
            resp.choices[0].message.content if resp and resp.choices else ""
        ).strip()
        if not text:
            logger.warning("GLM Vision OCR: empty response from model")
            return None
        return text
    except Exception as e:
        logger.warning("GLM Vision OCR failed, will fallback to glm-ocr: %s", e)
        return None


def call_zhipu_ocr(
    image_bytes: bytes,
    mime: str,
    api_key: str,
    base_url: str,
    language_type: str = "CHN_ENG",  # 兼容旧参数，目前未直接使用
    timeout: Optional[int] = None,
    model: Optional[str] = None,
) -> Optional[str]:
    """
    调用智谱 OCR 接口识别图片文字（`/files/ocr`）。

    - base_url: 形如 `https://open.bigmodel.cn/api/paas/v4/` 或无末尾斜杠版本。
    - 以 multipart/form-data 上传文件。
    - 返回识别出的纯文本；失败返回 None。
    """
    if not image_bytes or not api_key or not (base_url or "").strip():
        return None
    if timeout is None:
        timeout = GLM_OCR_TIMEOUT_SECONDS
    if not model:
        model = os.getenv("GLM_OCR_MODEL", "glm-ocr")

    mime_type = (mime or "image/png").strip() or "image/png"
    # 诊断日志：记录传入的 MIME 和图片前 16 字节，帮助排查 1214
    magic_hex = image_bytes[:16].hex() if len(image_bytes) >= 16 else image_bytes.hex()
    logger.info(
        "GLM-OCR 收到图片: mime=%r, size=%d bytes, magic=%s",
        mime_type,
        len(image_bytes),
        magic_hex,
    )
    if len(image_bytes) > ZHIPU_OCR_MAX_BYTES:
        logger.warning("GLM-OCR 图片超出接口上限: size=%d > %d", len(image_bytes), ZHIPU_OCR_MAX_BYTES)
        return None

    # 智谱 OCR 仅明确支持 PDF/JPG/PNG/JPEG/BMP。
    # 当前端给出 webp 等格式时，优先尝试将图片真实转为 PNG；失败则仅修改 MIME。
    allowed_mimes = {"image/png", "image/jpeg", "image/jpg", "image/bmp", "application/pdf"}
    lower_mime = mime_type.lower()
    if lower_mime not in allowed_mimes:
        logger.debug("GLM-OCR 非支持 MIME %r，尝试转换为 PNG 再发送", mime_type)
        if Image is not None:
            try:
                img = Image.open(BytesIO(image_bytes))
                # 部分截图带 alpha，统一转为 RGBA 再由 Pillow 处理
                if img.mode not in ("RGB", "RGBA"):
                    img = img.convert("RGBA")
                buf = BytesIO()
                img.save(buf, format="PNG")
                image_bytes = buf.getvalue()
                logger.debug("GLM-OCR 已将输入图片转换为 PNG，大小=%d 字节", len(image_bytes))
            except Exception as e:
                logger.warning("GLM-OCR PNG 转换失败，将仅修改 MIME 继续发送: %s", e)
        mime_type = "image/png"
    url = f"{(base_url or '').rstrip('/')}/files/ocr"
    headers = {"Authorization": f"Bearer {api_key}"}
    ext = _mime_to_extension(mime_type)
    filename = "ocr_input.pdf" if mime_type.lower() == "application/pdf" else f"ocr_input.{ext}"
    files = {"file": (filename, image_bytes, mime_type)}
    data: Dict[str, Any] = {
        "tool_type": "hand_write",
        "language_type": language_type or "CHN_ENG",
    }
    if model:
        data["model"] = model

    last_exc: Optional[Exception] = None
    body: Dict[str, Any] = {}
    for attempt in range(2):
        try:
            resp = requests.post(url, headers=headers, files=files, data=data, timeout=timeout)
            if resp.status_code != 200:
                logger.warning("GLM-OCR HTTP %s: %s", resp.status_code, resp.text[:500])
                return None
            body = resp.json()
            # HTTP 200 但 body 里可能带错误或非成功状态
            if isinstance(body, dict):
                if body.get("error"):
                    logger.warning("GLM-OCR 接口错误: %s", body["error"])
                    return None
                status = (body.get("status") or "").strip().lower()
                if status and status not in ("succeeded", "success", "ok"):
                    logger.warning("GLM-OCR 接口状态非成功: %s", status)
                    return None
            break
        except (requests.Timeout, requests.ConnectionError) as e:
            last_exc = e
            logger.warning("GLM-OCR 网络异常（第 %s 次尝试）: %s", attempt + 1, e)
            if attempt == 0:
                time.sleep(0.5)
                continue
            return None
        except requests.RequestException as e:
            logger.warning("GLM-OCR 请求失败: %s", e)
            return None
        except Exception as e:
            logger.warning("GLM-OCR 解析响应失败: %s", e)
            return None
    else:
        if last_exc is not None:
            logger.warning("GLM-OCR 最终失败: %s", last_exc)
        return None

    # files/ocr 响应：优先从 words_result 聚合文本
    try:
        if not isinstance(body, dict):
            logger.warning("GLM-OCR 响应体非 dict，无法解析: %s", str(body)[:300])
            return None
        words_result = body.get("words_result")
        if isinstance(words_result, list):
            lines: List[str] = []
            for item in words_result:
                if isinstance(item, dict):
                    w = item.get("words") or item.get("word") or item.get("text")
                    if isinstance(w, str) and w.strip():
                        lines.append(w.strip())
                    continue
                if isinstance(item, str) and item.strip():
                    lines.append(item.strip())
            joined = "\n".join(lines).strip()
            if joined:
                return joined
        # 兼容少数实现返回为字符串
        if isinstance(words_result, str) and words_result.strip():
            return words_result.strip()
        # 有些返回把识别文本放到 result 字段
        result = body.get("result")
        if isinstance(result, str) and result.strip():
            return result.strip()
    except Exception as e:
        logger.warning("GLM-OCR 解析 words_result 失败: %s, body=%s", e, str(body)[:300])

    logger.warning("GLM-OCR 响应中未找到可用文本: %s", str(body)[:300])
    return None


def _extract_image_url(att: Dict[str, Any]) -> str:
    direct = (att.get("url") or att.get("imageUrl") or "").strip()
    if direct:
        return direct
    image_url_field = att.get("image_url")
    if isinstance(image_url_field, str):
        return image_url_field.strip()
    if isinstance(image_url_field, dict):
        return (image_url_field.get("url") or "").strip()
    return ""


def get_image_payloads_for_ocr(
    image_attachments: List[Dict[str, Any]],
    max_size: int,
) -> Tuple[List[Tuple[bytes, str]], Optional[str]]:
    """
    从附件列表中解析出可发给 OCR 的 (bytes, mime) 列表。
    失败时返回 ([], error_message)。
    支持 content (base64)、data: URL、以及 http(s) URL（同步拉取）。
    """
    payloads: List[Tuple[bytes, str]] = []
    for a in image_attachments:
        content = (a.get("content") or "").strip()
        if content:
            try:
                raw = base64.b64decode(content, validate=True)
            except Exception:
                return [], "图片 base64 格式无效。"
            if len(raw) > max_size:
                return [], f"图片超过大小限制（单张不超过 {max_size // (1024*1024)}MB）。"
            mime = (a.get("mimeType") or "image/png").strip()
            payloads.append((raw, mime))
            continue

        image_url = _extract_image_url(a)
        if image_url.startswith("data:") and "," in image_url:
            head, data_part = image_url.split(",", 1)
            data_part = data_part.strip()
            if len(data_part) * 3 // 4 > max_size:
                return [], f"图片超过大小限制（单张不超过 {max_size // (1024*1024)}MB）。"
            try:
                raw = base64.b64decode(data_part, validate=True)
            except Exception:
                return [], "图片 data URL 格式无效。"
            mime = "image/png"
            if ";" in head:
                for part in head.split(";"):
                    if part.strip().lower().startswith("image/"):
                        mime = part.strip().split("/", 1)[-1].strip()
                        if mime:
                            mime = f"image/{mime}"
                        break
            if not mime.startswith("image/"):
                mime = "image/png"
            payloads.append((raw, mime))
            continue

        if image_url.startswith("http://") or image_url.startswith("https://"):
            from urllib.parse import urlparse
            import ipaddress

            parsed = urlparse(image_url)
            if parsed.scheme != "https":
                return [], "仅支持 https 图片地址。"
            host = parsed.hostname or ""
            # 明确禁止常见内网/环回地址，避免 SSRF
            try:
                ip = ipaddress.ip_address(host)
                if ip.is_private or ip.is_loopback or ip.is_link_local:
                    return [], "不允许访问内网图片地址。"
            except ValueError:
                # 非字面量 IP，暂不做 DNS 解析，直接通过
                pass
            try:
                r = requests.get(image_url, timeout=GLM_OCR_TIMEOUT_SECONDS)
                r.raise_for_status()
                raw = r.content
            except requests.RequestException as e:
                logger.warning("拉取图片 URL 失败: %s", e)
                return [], "无法拉取图片地址，请改为上传 base64 或 data URL。"
            if len(raw) > max_size:
                return [], f"图片超过大小限制（单张不超过 {max_size // (1024*1024)}MB）。"
            mime = r.headers.get("Content-Type") or "image/png"
            if ";" in mime:
                mime = mime.split(";")[0].strip()
            if not mime.startswith("image/"):
                mime = "image/png"
            payloads.append((raw, mime))
            continue

        file_id = (a.get("file_id") or a.get("fileId") or "").strip()
        if file_id:
            return [], "当前暂不支持仅 file_id 传图，请改为 image_url 或 base64 content。"
    return payloads, None


def run_ocr_for_attachments(
    image_attachments: List[Dict[str, Any]],
    max_size: int,
    api_key: str,
    base_url: str,
    model: Optional[str] = None,
) -> Tuple[Optional[str], Optional[str]]:
    """
    对附件列表做尺寸校验、调用视觉识图，返回 (拼接后的文本, 错误信息)。
    若全部失败或无有效附件，返回 (None, error_message)。
    """
    payloads, err = get_image_payloads_for_ocr(image_attachments, max_size)
    if err:
        return None, err
    if not payloads:
        return None, "未读取到有效图片内容，请检查图片数据后重试。"
    try:
        from backend.config import Config as _Cfg

        _vision_model = (getattr(_Cfg, "GLM_VISION_MODEL", "") or "").strip()
        _vision_api_key = (getattr(_Cfg, "GLM_VISION_API_KEY", "") or "").strip() or api_key
        _vision_base_raw = (getattr(_Cfg, "GLM_VISION_BASE_URL", "") or "").strip()
        _vision_base_url = _vision_base_raw or base_url
    except Exception:
        _vision_model = ""
        _vision_api_key = api_key
        _vision_base_url = base_url

    texts: List[str] = []
    for raw, mime in payloads:
        t: Optional[str] = None
        if _vision_model:
            t = call_zhipu_vision_ocr(
                raw, mime, _vision_api_key, _vision_base_url, _vision_model
            )
        if t is None:
            t = call_zhipu_ocr(raw, mime, api_key, base_url, model=model)
        if t:
            texts.append(t)
    if not texts:
        return None, "图片识别失败，请重试或改为粘贴文字。"
    full_text = "\n\n".join(texts)
    if len(full_text) > MAX_OCR_TEXT_CHARS:
        suffix = "\n[已截断 OCR 结果]"
        full_text = full_text[: max(0, MAX_OCR_TEXT_CHARS - len(suffix))] + suffix
    return full_text, None
