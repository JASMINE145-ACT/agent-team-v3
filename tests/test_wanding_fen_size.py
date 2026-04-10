"""口语「N分」与 DN 对齐：避免「水龙头 4分」拆成孤立「4」导致无法匹配 DN15。"""

import sys
from pathlib import Path

_root = Path(__file__).resolve().parent.parent
if str(_root) not in sys.path:
    sys.path.insert(0, str(_root))


def test_split_tokens_keeps_4fen_whole():
    from backend.tools.inventory.services.wanding_fuzzy_matcher import _split_tokens

    toks = _split_tokens("水龙头 4分")
    assert "4分" in toks
    assert "4" not in toks


def test_expand_4fen_maps_to_dn15():
    from backend.tools.inventory.services.wanding_fuzzy_matcher import _expand_unit_tokens

    eq = _expand_unit_tokens("4分")
    assert "dn15" in eq
    assert "15" in eq


def test_search_fuzzy_faucet_4fen_hits_dn15_row():
    import pandas as pd
    from backend.tools.inventory.services.wanding_fuzzy_matcher import _normalize, _split_tokens, search_fuzzy
    import re

    df = pd.DataFrame(
        [
            {
                "Material": "8110010127",
                "Describrition": "塑胶(PVC-U) 多用快接水龙头 W83105 DN15 联塑",
                "unit_price": 100.0,
            },
            {
                "Material": "8020020999",
                "Describrition": "异径套印尼PVC-U管件 DN100x50",
                "unit_price": 50.0,
            },
        ]
    )
    df["norm_text"] = df["Describrition"].apply(_normalize)
    df["spec_tokens"] = df["Describrition"].apply(
        lambda t: frozenset(tok for tok in _split_tokens(t) if re.search(r"\d", tok))
    )
    out = search_fuzzy(df, "水龙头 4分")
    assert out, "应有候选"
    best = out[0][0]
    assert best.get("code") == "8110010127"
