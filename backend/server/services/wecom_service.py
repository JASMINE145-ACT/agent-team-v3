"""
WeCom（企业微信）协议适配（Phase 1：非加密/兼容模式骨架）。

后续若开启安全模式，可在此文件内接入官方 WXBizMsgCrypt，补全签名校验与 AES 加解密。
"""

from __future__ import annotations

import time
import xml.etree.ElementTree as ET
from typing import Any, Dict

def _to_cdata(value: str) -> str:
    """
    将文本安全包进 CDATA。

    若内容包含 `]]>`，需拆分为多个 CDATA 节点，避免 XML 非法。
    """
    safe = (value or "").replace("]]>", "]]]]><![CDATA[>")
    return f"<![CDATA[{safe}]]>"


def verify_url(msg_signature: str, timestamp: str, nonce: str, echostr: str) -> str:
    """
    企业微信 URL 验证。

    Phase 1：直接返回 echostr，让 URL 验证先通过。
    Phase 2：可在此加入签名校验与解密逻辑：
      - 使用 Config.WECOM_TOKEN + timestamp/nonce/echostr 计算签名比对 msg_signature；
      - 若启用安全模式，通过 WXBizMsgCrypt.VerifyURL 解密后返回明文 echostr。
    """
    # 占位：当前不做签名校验/解密，只回显 echostr。
    _ = (msg_signature, timestamp, nonce)  # 防未使用告警
    return echostr


def parse_incoming_message(raw_body: bytes, query: Dict[str, Any]) -> Dict[str, Any]:
    """
    解析企业微信回调消息。

    Phase 1：假设处于明文/兼容模式，直接解析 XML：
      <xml>
        <ToUserName><![CDATA[toUser]]></ToUserName>
        <FromUserName><![CDATA[fromUser]]></FromUserName>
        <MsgType><![CDATA[text]]></MsgType>
        <Content><![CDATA[hello]]></Content>
        ...
      </xml>

    Phase 2：若启用安全模式，可在此：
      - 先从 XML 中取 Encrypt 字段；
      - 使用 WXBizMsgCrypt.DecryptMsg 解密得到明文 XML；
      - 再按同样方式解析。
    """
    _ = query  # Phase 1 暂不使用签名相关参数
    if not raw_body:
        raise ValueError("empty request body")

    text = raw_body.decode("utf-8", errors="ignore")
    try:
        root = ET.fromstring(text)
    except ET.ParseError as exc:
        raise ValueError(f"invalid wecom xml: {exc}") from exc

    if root.tag != "xml":
        raise ValueError(f"unexpected xml root: {root.tag}")

    msg: Dict[str, Any] = {}
    for child in root:
        msg[child.tag] = child.text or ""
    return msg


def build_text_reply(to_user: str, from_user: str, content: str) -> str:
    """
    构造企业微信文本回复 XML（明文）。

    Phase 2 若启用安全模式，可在此对该明文 XML 再做加密封装。
    """
    now = int(time.time())
    xml = f"""<xml>
<ToUserName>{_to_cdata(to_user)}</ToUserName>
<FromUserName>{_to_cdata(from_user)}</FromUserName>
<CreateTime>{now}</CreateTime>
<MsgType><![CDATA[text]]></MsgType>
<Content>{_to_cdata(content)}</Content>
</xml>"""
    return xml

