"""UI 启动时会调用的方法，返回最小合法结构避免报错"""

STUB_RESPONSES = {
    "config.get": {
        "path": "",
        "exists": False,
        "raw": "",
        "valid": True,
        "config": {},
        "issues": [],
    },
    "skills.status": {
        "workspaceDir": "",
        "managedSkillsDir": "",
        "skills": [],
    },
    "cron.status": {"enabled": False, "jobs": 0},
    "node.list": {"nodes": {}},
    "models.list": {"models": []},
    "health": {"ok": True},
    "status": {"ok": True},
    "last-heartbeat": {},
    "system-presence": [],
    "device.pair.list": {"pending": [], "paired": []},
    "exec.approvals.get": {"path": "", "exists": False, "hash": "", "file": {}},
    "agents.list": {
        "defaultId": "version3",
        "mainKey": "main",
        "scope": "global",
        "agents": [
            {
                "id": "version3",
                "name": "PT Vansting Agent",
                "identity": {"emoji": "🤖", "name": "PT Vansting Agent"},
            }
        ],
    },
}


def handle_stub(method: str):
    return STUB_RESPONSES.get(method, {})
