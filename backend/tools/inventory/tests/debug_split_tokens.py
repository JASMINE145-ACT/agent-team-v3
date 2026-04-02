# -*- coding: utf-8 -*-
"""Debug test for _split_tokens"""
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

sys.path.insert(0, '.')
from backend.tools.inventory.services.wanding_fuzzy_matcher import _split_tokens

# Test cases
cases = [
    "2寸三通",
    "1寸弯头",
    "6英寸管",
    "PVC管 6英寸",
    "3/4寸弯头",
    # Unicode fraction case
    "1\xbd寸接头",  # 1½寸接头
]

for text in cases:
    tokens = _split_tokens(text)
    print(f"Input: {text}")
    print(f"Tokens: {tokens}")
    print()
