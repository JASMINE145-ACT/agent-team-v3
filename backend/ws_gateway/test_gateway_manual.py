"""
手动测试 Gateway 适配层：连接 /ws，收 challenge → 发 connect → 收 hello-ok → 发 sessions.list。
运行前请先启动后端：python run_backend.py
依赖：pip install websockets
"""
import asyncio
import json
import sys
from pathlib import Path

# 保证项目根在 path 里
v3_root = Path(__file__).resolve().parent.parent.parent
if str(v3_root) not in sys.path:
    sys.path.insert(0, str(v3_root))

try:
    import websockets
except ImportError:
    print("请先安装: pip install websockets")
    sys.exit(1)


async def run():
    uri = "ws://127.0.0.1:8000/ws"
    print(f"连接 {uri} ...")
    async with websockets.connect(uri) as ws:
        # 1. 应收到 connect.challenge
        raw = await ws.recv()
        msg = json.loads(raw)
        assert msg.get("type") == "event" and msg.get("event") == "connect.challenge", msg
        print("  [OK] 收到 connect.challenge")

        # 2. 发 connect
        req = {
            "type": "req",
            "id": "test-connect-1",
            "method": "connect",
            "params": {
                "minProtocol": 3,
                "maxProtocol": 3,
                "client": {"id": "test-client", "version": "1", "platform": "test", "mode": "webchat"},
                "role": "operator",
                "scopes": ["operator.admin"],
                "caps": [],
                "userAgent": "test",
                "locale": "zh-CN",
            },
        }
        await ws.send(json.dumps(req))
        raw = await ws.recv()
        res = json.loads(raw)
        assert res.get("type") == "res" and res.get("id") == "test-connect-1", res
        assert res.get("ok") is True, res
        payload = res.get("payload") or {}
        assert payload.get("type") == "hello-ok", payload
        print("  [OK] connect → hello-ok")

        # 3. 发 sessions.list
        req2 = {
            "type": "req",
            "id": "test-sessions-1",
            "method": "sessions.list",
            "params": {"includeGlobal": True, "includeUnknown": False, "limit": 10},
        }
        await ws.send(json.dumps(req2))
        raw2 = await ws.recv()
        res2 = json.loads(raw2)
        assert res2.get("type") == "res" and res2.get("ok") is True, res2
        sessions = (res2.get("payload") or {}).get("sessions", [])
        print(f"  [OK] sessions.list → count={len(sessions)}")

        # 4. 发 agent.identity.get
        req3 = {
            "type": "req",
            "id": "test-identity-1",
            "method": "agent.identity.get",
            "params": {"agentId": "version3"},
        }
        await ws.send(json.dumps(req3))
        raw3 = await ws.recv()
        res3 = json.loads(raw3)
        assert res3.get("type") == "res" and res3.get("ok") is True, res3
        identity = res3.get("payload") or {}
        assert identity.get("agentId") == "version3" and "name" in identity, identity
        print(f"  [OK] agent.identity.get → name={identity.get('name')}")

    print("\nGateway 适配层测试通过。")


if __name__ == "__main__":
    asyncio.run(run())
