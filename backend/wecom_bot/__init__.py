"""
WeCom Bot 子包。

当前仅包含：
- config: 读取长连接 Bot 的环境配置；
- handler: 将 WeCom 消息转发给 CoreAgent.execute_react；
- client: DummyWeComBotClient（命令行模拟 WeCom 长连接），便于本地验证 Agent 逻辑。

真正接入企业微信长连接协议时，可在 client.py 中替换 Dummy 客户端为官方/自实现的 WeComBotClient。
"""

