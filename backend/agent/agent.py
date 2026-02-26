"""
向后兼容层。业务逻辑已迁移至 backend/core/agent.py + backend/plugins/jagent。
"""
from backend.core.agent import CoreAgent
from backend.config import Config
from backend.plugins.jagent.extension import JAgentExtension


# 兼容旧 import: from backend.agent.agent import SingleAgent
class SingleAgent(CoreAgent):
    def __init__(self, api_key=None, base_url=None, model=None, session_store=None):
        super().__init__(
            api_key=api_key or Config.OPENAI_API_KEY,
            base_url=base_url or Config.OPENAI_BASE_URL,
            model=model or Config.LLM_MODEL,
            extensions=[JAgentExtension()],
            session_store=session_store,
        )
