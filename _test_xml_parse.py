import re, json

TEXT = '<tool_call>\n{\n  "name": "match_quotation",\n  "arguments": {\n    "keywords": "DN50 直通"\n  }\n}\n</tool_call>'

m = re.search(r"<tool_call>\s*(\{.*\})\s*</tool_call>", TEXT, re.DOTALL)
print("match:", m)
if m:
    raw = m.group(1).strip()
    print("raw:", repr(raw[:100]))
    try:
        parsed = json.loads(raw)
        print("parsed:", parsed)
        print("name:", parsed.get("name"))
        print("arguments:", parsed.get("arguments"))
    except Exception as e:
        print("JSON ERROR:", e)
