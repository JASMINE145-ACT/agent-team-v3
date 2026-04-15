"""
Tests for GLM Vision OCR path (GLM_VISION_MODEL set).

Vision path contract:
- call_zhipu_vision_ocr() uses openai chat.completions with image in content array
- Uses _VISION_OCR_SYSTEM as system prompt (contains fraction-slash rules)
- Returns None on any exception (enables silent fallback)
- run_ocr_for_attachments() uses vision when GLM_VISION_MODEL is set
- run_ocr_for_attachments() falls back to call_zhipu_ocr when vision returns None
- run_ocr_for_attachments() uses old path when GLM_VISION_MODEL is empty

Patching strategy:
  Config is a class with class-level attributes.
  Use monkeypatch.setattr(Config, "ATTR", value) — same pattern as test_vision_config.py.
"""

import base64
from unittest.mock import MagicMock, patch

from backend.config import Config
from backend.core.glm_ocr import call_zhipu_vision_ocr, run_ocr_for_attachments

# Minimal valid 1×1 PNG (68 bytes) — used across all tests
_TINY_PNG_B64 = (
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
)
_TINY_PNG = base64.b64decode(_TINY_PNG_B64)
_ATTACHMENTS = [{"type": "image", "content": _TINY_PNG_B64, "mimeType": "image/png"}]


def _make_openai_resp(content: str) -> MagicMock:
    msg = MagicMock()
    msg.content = content
    choice = MagicMock()
    choice.message = msg
    resp = MagicMock()
    resp.choices = [choice]
    return resp


# ---------------------------------------------------------------------------
# call_zhipu_vision_ocr unit tests
# ---------------------------------------------------------------------------


class TestCallZhipuVisionOcr:
    @patch("openai.OpenAI")
    def test_returns_text_on_success(self, mock_openai_cls):
        """Returns extracted text when model responds normally."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.return_value = _make_openai_resp("PPR dn20 3/4寸 直通")
        mock_openai_cls.return_value = mock_client

        result = call_zhipu_vision_ocr(
            _TINY_PNG, "image/png", "sk-test", "https://open.bigmodel.cn/api/paas/v4/", "glm-4.6v"
        )

        assert result == "PPR dn20 3/4寸 直通"

    @patch("openai.OpenAI")
    def test_passes_system_prompt_with_fraction_rules(self, mock_openai_cls):
        """The system message must contain the fraction-slash rule."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.return_value = _make_openai_resp("3/4寸")
        mock_openai_cls.return_value = mock_client

        call_zhipu_vision_ocr(
            _TINY_PNG, "image/png", "sk-test", "https://open.bigmodel.cn/api/paas/v4/", "glm-4.6v"
        )

        call_kwargs = mock_client.chat.completions.create.call_args[1]
        messages = call_kwargs["messages"]
        system_msg = next((m for m in messages if m["role"] == "system"), None)
        assert system_msg is not None, "No system message found"
        assert "3/4" in system_msg["content"], "System prompt must mention 3/4 fraction rule"
        assert "1/2" in system_msg["content"], "System prompt must mention 1/2 fraction rule"

    @patch("openai.OpenAI")
    def test_passes_image_as_data_uri_in_content_array(self, mock_openai_cls):
        """User message content must include image_url type with data URI."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.return_value = _make_openai_resp("text")
        mock_openai_cls.return_value = mock_client

        call_zhipu_vision_ocr(
            _TINY_PNG, "image/png", "sk-test", "https://open.bigmodel.cn/api/paas/v4/", "glm-4.6v"
        )

        call_kwargs = mock_client.chat.completions.create.call_args[1]
        messages = call_kwargs["messages"]
        user_msg = next((m for m in messages if m["role"] == "user"), None)
        assert user_msg is not None
        content = user_msg["content"]
        assert isinstance(content, list), "User content must be a list (multimodal)"
        image_parts = [p for p in content if isinstance(p, dict) and p.get("type") == "image_url"]
        assert len(image_parts) == 1, "Must have exactly one image_url part"
        url = image_parts[0]["image_url"]["url"]
        assert url.startswith("data:image/png;base64,"), f"Data URI wrong format: {url[:40]}"

    @patch("openai.OpenAI")
    def test_uses_temperature_zero_and_max_tokens_1500(self, mock_openai_cls):
        """Must use temperature=0 and max_tokens=1500."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.return_value = _make_openai_resp("text")
        mock_openai_cls.return_value = mock_client

        call_zhipu_vision_ocr(
            _TINY_PNG, "image/png", "sk-test", "https://open.bigmodel.cn/api/paas/v4/", "glm-4.6v"
        )

        call_kwargs = mock_client.chat.completions.create.call_args[1]
        assert call_kwargs.get("temperature") == 0
        assert call_kwargs.get("max_tokens") == 1500

    @patch("openai.OpenAI")
    def test_returns_none_on_exception(self, mock_openai_cls):
        """Any exception returns None so caller can fallback."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.side_effect = RuntimeError("network down")
        mock_openai_cls.return_value = mock_client

        result = call_zhipu_vision_ocr(
            _TINY_PNG, "image/png", "sk-test", "https://open.bigmodel.cn/api/paas/v4/", "glm-4.6v"
        )

        assert result is None

    @patch("openai.OpenAI")
    def test_returns_none_on_empty_response(self, mock_openai_cls):
        """Empty model response returns None."""
        mock_client = MagicMock()
        mock_client.chat.completions.create.return_value = _make_openai_resp("")
        mock_openai_cls.return_value = mock_client

        result = call_zhipu_vision_ocr(
            _TINY_PNG, "image/png", "sk-test", "https://open.bigmodel.cn/api/paas/v4/", "glm-4.6v"
        )

        assert result is None

    def test_returns_none_when_api_key_empty(self):
        """No API key → return None without calling OpenAI."""
        result = call_zhipu_vision_ocr(_TINY_PNG, "image/png", "", "https://base/", "glm-4.6v")
        assert result is None


# ---------------------------------------------------------------------------
# run_ocr_for_attachments integration tests (vision path)
# ---------------------------------------------------------------------------


class TestRunOcrForAttachmentsVisionPath:
    def test_uses_vision_when_model_configured(self, monkeypatch):
        """When GLM_VISION_MODEL is set, vision function is called first."""
        monkeypatch.setattr(Config, "GLM_VISION_MODEL", "glm-4.6v")
        monkeypatch.setattr(Config, "GLM_VISION_API_KEY", "sk-vision")
        monkeypatch.setattr(Config, "GLM_VISION_BASE_URL", "https://open.bigmodel.cn/api/paas/v4/")

        with (
            patch("backend.core.glm_ocr.call_zhipu_vision_ocr", return_value="3/4寸 PPR") as mock_vision,
            patch("backend.core.glm_ocr.call_zhipu_ocr", return_value="34寸 PPR") as mock_old,
        ):
            text, err = run_ocr_for_attachments(
                _ATTACHMENTS, 5 * 1024 * 1024, "sk-old", "https://old-base/"
            )

        assert err is None
        assert "3/4寸" in text, "Vision result must be used"
        mock_vision.assert_called_once()
        mock_old.assert_not_called()

    def test_fallback_to_old_ocr_when_vision_returns_none(self, monkeypatch):
        """When vision returns None, old call_zhipu_ocr is called silently."""
        monkeypatch.setattr(Config, "GLM_VISION_MODEL", "glm-4.6v")
        monkeypatch.setattr(Config, "GLM_VISION_API_KEY", "sk-vision")
        monkeypatch.setattr(Config, "GLM_VISION_BASE_URL", "https://open.bigmodel.cn/api/paas/v4/")

        with (
            patch("backend.core.glm_ocr.call_zhipu_vision_ocr", return_value=None) as mock_vision,
            patch("backend.core.glm_ocr.call_zhipu_ocr", return_value="fallback text") as mock_old,
        ):
            text, err = run_ocr_for_attachments(
                _ATTACHMENTS, 5 * 1024 * 1024, "sk-old", "https://old-base/"
            )

        assert err is None
        assert text == "fallback text"
        mock_vision.assert_called_once()
        mock_old.assert_called_once()

    def test_uses_old_path_when_vision_model_empty(self, monkeypatch):
        """When GLM_VISION_MODEL is empty, call_zhipu_vision_ocr is never called."""
        monkeypatch.setattr(Config, "GLM_VISION_MODEL", "")

        with (
            patch("backend.core.glm_ocr.call_zhipu_vision_ocr") as mock_vision,
            patch("backend.core.glm_ocr.call_zhipu_ocr", return_value="old result") as mock_old,
        ):
            text, err = run_ocr_for_attachments(
                _ATTACHMENTS, 5 * 1024 * 1024, "sk-old", "https://old-base/"
            )

        assert err is None
        assert text == "old result"
        mock_vision.assert_not_called()
        mock_old.assert_called_once()

    def test_vision_api_key_falls_back_to_ocr_api_key(self, monkeypatch):
        """When GLM_VISION_API_KEY is empty, the ocr api_key param is used for vision."""
        monkeypatch.setattr(Config, "GLM_VISION_MODEL", "glm-4.6v")
        monkeypatch.setattr(Config, "GLM_VISION_API_KEY", "")  # empty → fallback
        monkeypatch.setattr(Config, "GLM_VISION_BASE_URL", "")  # empty → fallback

        with patch("backend.core.glm_ocr.call_zhipu_vision_ocr", return_value="text") as mock_vision:
            run_ocr_for_attachments(_ATTACHMENTS, 5 * 1024 * 1024, "sk-fallback", "https://fb-base/")

        call_args = mock_vision.call_args
        assert call_args[0][2] == "sk-fallback", "Should use ocr api_key as fallback"
        assert call_args[0][3] == "https://fb-base/", "Should use ocr base_url as fallback"
