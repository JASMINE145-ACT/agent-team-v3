"""pytest 配置：markers 等。"""


def pytest_configure(config):
    config.addinivalue_line("markers", "live: 真实 LLM / 网络调用（可单独排除）")
