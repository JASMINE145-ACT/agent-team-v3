"""
GLM-OCR 配置与图片→文本注入：Config 读取、get_image_payloads_for_ocr / run_ocr_for_attachments、Agent 无 vision client。
"""
from unittest.mock import MagicMock, patch

import pytest

from backend.config import Config
from backend.core.agent import CoreAgent
from backend.core.glm_ocr import call_zhipu_ocr, get_image_payloads_for_ocr, run_ocr_for_attachments


def test_glm_ocr_config_read(monkeypatch):
    """GLM_OCR_ENABLED / GLM_OCR_API_KEY / GLM_OCR_BASE_URL 可从 Config 读取。"""
    monkeypatch.setattr(Config, "GLM_OCR_ENABLED", True)
    monkeypatch.setattr(Config, "GLM_OCR_API_KEY", "sk-ocr-key")
    monkeypatch.setattr(Config, "GLM_OCR_BASE_URL", "https://open.bigmodel.cn/api/paas/v4/")
    assert Config.GLM_OCR_ENABLED is True
    assert Config.GLM_OCR_API_KEY == "sk-ocr-key"
    assert Config.GLM_OCR_BASE_URL == "https://open.bigmodel.cn/api/paas/v4/"


def test_agent_has_no_vision_client(monkeypatch):
    """CoreAgent 不再有 _vision_client / _vision_model。"""
    monkeypatch.setattr(Config, "GLM_OCR_ENABLED", True)
    agent = CoreAgent(
        api_key="test",
        base_url="https://test",
        model="glm-4-flash",
        extensions=[],
    )
    assert not hasattr(agent, "_vision_client") or getattr(agent, "_vision_client", None) is None
    assert not hasattr(agent, "_vision_model") or getattr(agent, "_vision_model", None) is None


def test_get_image_payloads_for_ocr_base64():
    """从 base64 content 附件解析出 (bytes, mime)。"""
    tiny_b64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
    attachments = [{"type": "image", "content": tiny_b64, "mimeType": "image/png"}]
    payloads, err = get_image_payloads_for_ocr(attachments, 5 * 1024 * 1024)
    assert err is None
    assert len(payloads) == 1
    raw, mime = payloads[0]
    assert isinstance(raw, bytes) and len(raw) > 0
    assert "image" in mime


def test_get_image_payloads_for_ocr_size_limit():
    """超过 max_size 时返回错误。"""
    tiny_b64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
    attachments = [{"type": "image", "content": tiny_b64, "mimeType": "image/png"}]
    # 解码后约 68 字节，max_size=50 会触发超限
    payloads, err = get_image_payloads_for_ocr(attachments, 50)
    assert err is not None
    assert "大小" in err or "限制" in err


def test_run_ocr_for_attachments_injects_text(monkeypatch):
    """run_ocr_for_attachments 在 mock OCR 成功时返回拼接文本。"""
    tiny_b64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
    attachments = [{"type": "image", "content": tiny_b64, "mimeType": "image/png"}]

    def fake_ocr(_bytes, _mime, _key, _url, **kwargs):
        return "识别结果第一行\n第二行"

    with patch("backend.core.glm_ocr.call_zhipu_ocr", side_effect=fake_ocr):
        text, err = run_ocr_for_attachments(
            attachments, 5 * 1024 * 1024, "sk-test", "https://open.bigmodel.cn/api/paas/v4/"
        )
    assert err is None
    assert "识别结果第一行" in text and "第二行" in text


def test_call_zhipu_ocr_returns_none_on_bad_response():
    """call_zhipu_ocr 在 API 返回非 succeeded 时返回 None。"""
    with patch("backend.core.glm_ocr.requests.post") as mock_post:
        mock_post.return_value.status_code = 200
        mock_post.return_value.json.return_value = {"status": "failed", "message": "invalid"}
        mock_post.return_value.raise_for_status = MagicMock()
        result = call_zhipu_ocr(b"\x89PNG", "image/png", "sk-x", "https://open.bigmodel.cn/api/paas/v4/")
    assert result is None
