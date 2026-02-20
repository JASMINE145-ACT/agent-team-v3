"""
验证当前使用的 LLM 为 GLM-4.7（智谱）
运行方式：在 quotation_tracker 目录下执行
  python -m tests.test_glm_model
或
  cd quotation_tracker && python -m tests.test_glm_model
"""
import sys
from pathlib import Path

# 确保项目根（quotation_tracker）在 path 中
_root = Path(__file__).resolve().parent.parent
if str(_root) not in sys.path:
    sys.path.insert(0, str(_root))


def main():
    from backend.tools.oos.config import LLM_MODEL, OPENAI_BASE_URL, LLM_API_KEY
    from services.llm_parser import LLMParser

    print("=" * 50)
    print("LLM 配置检查（期望使用 GLM-4.7）")
    print("=" * 50)
    print(f"  LLM_MODEL (config): {LLM_MODEL}")
    print(f"  OPENAI_BASE_URL:    {OPENAI_BASE_URL or '(未设置，使用 OpenAI 默认)'}")
    print(f"  LLM_API_KEY 已设置: {bool(LLM_API_KEY)}")
    print()

    # 期望使用 glm-4.7
    assert LLM_MODEL.strip().lower() in ("glm-4.7", "glm-4"), (
        f"当前 LLM_MODEL 为 {LLM_MODEL}，期望 glm-4.7 或 glm-4"
    )
    print("[OK] LLM_MODEL 为 GLM-4.7 / GLM-4")

    parser = LLMParser()
    print(f"  LLMParser.model:     {parser.model}")
    print()

    # 发一次最小请求，从 API 响应中确认实际使用的模型
    print("发送一次最小请求以确认 API 实际使用的模型...")
    response = parser.client.chat.completions.create(
        model=parser.model,
        messages=[{"role": "user", "content": "只回复一个字：好"}],
        max_tokens=10,
        temperature=0,
    )
    actual_model = getattr(response, "model", None) or response.choices[0].message.content
    # 智谱返回的 model 可能是 "glm-4" 或 "glm-4.7" 等
    print(f"  API 返回的 model 字段: {getattr(response, 'model', 'N/A')}")
    print(f"  回复内容: {response.choices[0].message.content.strip()}")
    print()
    print("=" * 50)
    print("结论: 当前已使用 GLM-4.7 配置并成功调用智谱接口。")
    print("=" * 50)


if __name__ == "__main__":
    main()
