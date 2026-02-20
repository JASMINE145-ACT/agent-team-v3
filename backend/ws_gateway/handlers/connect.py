"""握手：connect → hello-ok"""

IMPLEMENTED_METHODS = [
    "connect",
    "agent.identity.get",
    "agents.list",
    "sessions.list",
    "sessions.patch",
    "sessions.delete",
    "chat.history",
    "chat.send",
    "chat.abort",
    "config.get",
    "skills.status",
    "cron.status",
    "node.list",
    "models.list",
    "health",
    "status",
    "last-heartbeat",
    "system-presence",
    "device.pair.list",
    "exec.approvals.get",
]


def handle_connect(params: dict) -> dict:
    """返回 hello-ok 结构，供 res.payload 使用。"""
    return {
        "type": "hello-ok",
        "protocol": 3,
        "features": {"methods": IMPLEMENTED_METHODS},
        "snapshot": {
            "sessionDefaults": {
                "defaultAgentId": "version3",
                "mainKey": "main",
                "mainSessionKey": "main",
            }
        },
    }
