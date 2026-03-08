"""
烟雾测试：验证工程化重构后后端可加载、路由挂载正确、/health 可调。
运行方式（在 Agent Team version3 根目录）：
  python -m pytest tests/test_smoke.py -v
  或
  python tests/test_smoke.py
"""
import sys
from pathlib import Path

# 保证以 version3 根目录为 sys.path[0]
_root = Path(__file__).resolve().parent.parent
if str(_root) not in sys.path:
    sys.path.insert(0, str(_root))


def test_app_import():
    """后端入口与路由可导入，无循环依赖或缺失模块。"""
    from backend.server.api.app import app
    assert app is not None
    assert app.title == "Agent-JK v3 (Single Agent)"


def test_router_included():
    """主 router 已挂载，至少包含若干路由。"""
    from backend.server.api.app import app
    paths = [getattr(r, "path", None) for r in app.routes]
    paths = [p for p in paths if p]
    assert len(paths) >= 1
    # /health 由 routes_health 提供，挂载在根
    assert "/health" in paths or any(p == "/health" or p.endswith("/health") for p in paths)


def test_health_endpoint():
    """GET /health 返回 200 且包含 status。"""
    from fastapi.testclient import TestClient
    from backend.server.api.app import app
    client = TestClient(app)
    resp = client.get("/health")
    assert resp.status_code == 200
    data = resp.json()
    assert data.get("status") == "ok"
    assert "service" in data


def test_config_loads():
    """Config 可加载，API_PORT 为整数。"""
    from backend.config import Config
    assert isinstance(Config.API_PORT, int)
    assert Config.API_PORT >= 1 and Config.API_PORT <= 65535


if __name__ == "__main__":
    import unittest
    loader = unittest.TestLoader()
    suite = loader.loadTestsFromModule(sys.modules[__name__])
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    sys.exit(0 if result.wasSuccessful() else 1)
