"""
万鼎价格库匹配 - DataBase-style 模糊逻辑

仅此一种查询逻辑：token + 同义词扩展 + 规格等价 + score 排序。
借鉴 DataBase- 项目 search_with_keywords(strict=False, return_score=True)。
"""

from __future__ import annotations

import logging
import re
from pathlib import Path
from typing import Any, List, Optional

import pandas as pd

logger = logging.getLogger(__name__)

PRICE_COLS = {"A": 8, "B": 10, "C": 12, "D": 14}

SYNONYM_GROUPS = [
    {"直接", "直接头", "直通", "直通接头"},
    {"变径", "异径"},
    {"大小头", "异径直通", "异径套", "变径直接", "异径直接"},
    {"内丝", "内螺纹"}, {"外丝", "外螺纹"},
    {"锁母", "锁扣", "管接头"},
    {"止回阀", "截止阀"},
    {"穿线管", "电线管"},
    {"半弯", "弯头"},
    {"承插", "承插式"},
]

MM_TO_INCH = {
    "16": '1/2"', "20": '3/4"', "25": '1"', "32": '1-1/4"', "40": '1-1/2"',
    "50": '2"', "65": '2-1/2"', "75": '3"', "100": '4"', "125": '5"',
    "150": '6"', "200": '8"', "250": '10"', "300": '12"',
}
INCH_TO_MM = {v: k for k, v in MM_TO_INCH.items()}


def _normalize(s: str) -> str:
    s = (s or "").lower().strip()
    s = s.replace("－", "-").replace("—", "-").replace("（", "(").replace("）", ")")
    s = re.sub(r"[_\t]", " ", s)
    s = re.sub(r"\s+", " ", s)
    return s.strip()


def _get_synonym_words(word: str) -> set:
    for group in SYNONYM_GROUPS:
        if word in group:
            return group
    return {word}


def _expand_unit_tokens(token: str, material: Optional[str] = None) -> set:
    eqs = {token}
    if token.startswith("dn"):
        num = token[2:]
        if num in MM_TO_INCH:
            eqs.add(MM_TO_INCH[num])
        eqs.add(num)
        return eqs
    if token.isdigit() and token in MM_TO_INCH:
        eqs.add("dn" + token)
        eqs.add(MM_TO_INCH[token])
        return eqs
    if token in INCH_TO_MM:
        eqs.add(INCH_TO_MM[token])
        eqs.add("dn" + INCH_TO_MM[token])
        return eqs
    return eqs


def _expand_token_with_synonyms_and_units(token: str, material: Optional[str] = None) -> set:
    synonyms = _get_synonym_words(token)
    expanded: set = set()
    for syn in synonyms:
        expanded |= _expand_unit_tokens(syn, material=material)
    return expanded


def _split_tokens(text: str) -> List[str]:
    text = _normalize(text)
    tokens: List[str] = []
    for m in re.finditer(r"dn\s*(\d+)", text, re.I):
        tokens.append("dn" + m.group(1))
        tokens.append(m.group(1))
    text = re.sub(r"dn\s*\d+", " ", text, flags=re.I)
    for m in re.finditer(r"\d+(?:\.\d+)?", text):
        tokens.append(m.group())
    text = re.sub(r"\d+(?:\.\d+)?", " ", text)
    for m in re.finditer(r"[\u4e00-\u9fff]+", text):
        tokens.append(m.group())
    return list(dict.fromkeys(tokens))


def _expand_keyword_with_synonyms(keyword: str) -> List[str]:
    synonym_to_group = {syn: group for group in SYNONYM_GROUPS for syn in group}
    sorted_synonyms = sorted(synonym_to_group.keys(), key=len, reverse=True)
    queries: set = {keyword}
    for syn in sorted_synonyms:
        new_queries: set = set()
        for q in queries:
            if syn in q:
                for replacement in synonym_to_group[syn]:
                    new_queries.add(q.replace(syn, replacement))
        if new_queries:
            queries.update(new_queries)
    return list(queries)


def search_fuzzy(
    df: pd.DataFrame,
    keyword: str,
    field: str = "Describrition",
) -> List[tuple[dict[str, Any], float]]:
    """
    DataBase-style fuzzy search.
    Returns [(row_dict, score), ...] sorted by score desc.
    row_dict: {code, matched_name, unit_price}
    """
    results: dict = {}
    for kw in _expand_keyword_with_synonyms(keyword.strip()):
        norm_kw = _normalize(kw)
        chinese_tokens = _split_tokens(norm_kw)
        material_tokens = re.findall(r"pvc|ppr|pe|hdpe", norm_kw)
        query_size_tokens = {t for t in chinese_tokens if re.search(r"\d", t) and not t.endswith("°")}
        query_text_tokens = {
            t for t in chinese_tokens if not (re.search(r"\d", t) and not t.endswith("°"))
        }
        query_material = material_tokens[0] if material_tokens else None

        for row in df.itertuples(index=False):
            raw_text = str(getattr(row, field, ""))
            normalized_text = _normalize(raw_text)
            row_id = getattr(row, "Material", getattr(row, "Describrition", str(row)))

            if material_tokens and not all(m.lower() in normalized_text for m in material_tokens):
                continue

            product_tokens = _split_tokens(raw_text)
            product_specs = {t for t in product_tokens if re.search(r"\d", t)}

            size_hits = 0
            for q_spec in query_size_tokens:
                q_eq = _expand_token_with_synonyms_and_units(q_spec, material=query_material)
                if any(eq in product_specs for eq in q_eq):
                    size_hits += 1
            if query_size_tokens and size_hits == 0:
                continue

            text_hits = 0
            for token in query_text_tokens:
                if token.lower() in normalized_text:
                    text_hits += 1
            if query_text_tokens and text_hits == 0:
                continue

            hit_count = size_hits + text_hits
            total = len(query_size_tokens) + len(query_text_tokens)
            score = hit_count / total if total > 0 else 0.0

            if score > 0 and (row_id not in results or score > results[row_id][1]):
                row_dict: dict[str, Any] = {
                    "code": str(getattr(row, "Material", "")),
                    "matched_name": raw_text,
                }
                if hasattr(row, "unit_price"):
                    row_dict["unit_price"] = getattr(row, "unit_price", 0.0)
                results[row_id] = (row_dict, score)

    out = list(results.values())
    out.sort(key=lambda x: x[1], reverse=True)
    return out


def load_wanding_df(
    path: str | Path,
    sheet_name: str = "管材",
    customer_level: str = "B",
) -> pd.DataFrame:
    """Load 万鼎 price library as DataFrame."""
    try:
        import openpyxl
    except ImportError:
        logger.warning("openpyxl 未安装，万鼎模糊匹配不可用")
        return pd.DataFrame()

    p = Path(path)
    if p.is_absolute() and p.exists():
        pass
    elif not p.is_absolute():
        root = Path(__file__).resolve().parent.parent.parent
        p = root / p
    if not p.exists():
        logger.warning("万鼎价格库不存在: %s", p)
        return pd.DataFrame()

    level = (customer_level or "B").strip().upper()
    price_col = PRICE_COLS.get(level, PRICE_COLS["B"])

    try:
        wb = openpyxl.load_workbook(p, read_only=True, data_only=True)
        ws = wb[sheet_name] if sheet_name in wb.sheetnames else (wb.active or wb[wb.sheetnames[0]])
        rows = []
        for row in ws.iter_rows(max_col=16):
            cells = [getattr(c, "value", None) for c in row]
            if len(cells) > 2 and cells[2]:
                up = 0.0
                if len(cells) > price_col and cells[price_col] is not None:
                    try:
                        up = float(cells[price_col])
                    except (ValueError, TypeError):
                        pass
                rows.append({
                    "Material": str(cells[1] or "").strip(),
                    "Describrition": str(cells[2] or "").strip(),
                    "unit_price": up,
                })
        wb.close()
        return pd.DataFrame(rows)
    except Exception as e:
        logger.warning("加载万鼎价格库失败: %s", e)
        return pd.DataFrame()


# 缓存 DataFrame，按 path:level 隔离
_df_cache: dict[str, pd.DataFrame] = {}


def match_fuzzy(
    keywords: str,
    customer_level: str = "B",
    price_library_path: Optional[str | Path] = None,
) -> Optional[dict[str, Any]]:
    """
    DataBase-style 模糊匹配，返回最佳单结果。
    返回 {code, matched_name, unit_price} 或 None。
    """
    keywords = (keywords or "").strip()
    if not keywords:
        return None

    from backend.tools.inventory.config import config
    path = price_library_path or config.PRICE_LIBRARY_PATH
    level = (customer_level or "B").strip().upper()
    cache_key = f"{path}:{level}"

    global _df_cache
    if cache_key not in _df_cache:
        df = load_wanding_df(path, sheet_name="管材", customer_level=level)
        _df_cache[cache_key] = df

    df = _df_cache[cache_key]
    if df.empty:
        return None

    results = search_fuzzy(df, keywords)
    if not results:
        return None

    row_dict, _ = results[0]
    return {
        "code": (row_dict.get("code") or "").strip(),
        "matched_name": (row_dict.get("matched_name") or "")[:200],
        "unit_price": float(row_dict.get("unit_price", 0) or 0),
    }


def match_fuzzy_candidates(
    keywords: str,
    customer_level: str = "B",
    price_library_path: Optional[str | Path] = None,
    max_candidates: int = 20,
    max_score_tiers: Optional[int] = None,
) -> List[dict[str, Any]]:
    """
    返回候选列表，每项含 code, matched_name, unit_price, score。
    - max_score_tiers 为 None：按分数排序取前 max_candidates 条。
    - max_score_tiers 为 N（如 2）：取分数前 N 档，每档全部返回（如 top1 有 3 条、top2 有 2 条则共 5 条）。
    """
    keywords = (keywords or "").strip()
    if not keywords:
        return []

    from backend.tools.inventory.config import config
    path = price_library_path or config.PRICE_LIBRARY_PATH
    level = (customer_level or "B").strip().upper()
    cache_key = f"{path}:{level}"

    global _df_cache
    if cache_key not in _df_cache:
        _df_cache[cache_key] = load_wanding_df(path, sheet_name="管材", customer_level=level)

    df = _df_cache[cache_key]
    if df.empty:
        return []

    results = search_fuzzy(df, keywords)
    if max_score_tiers is not None and max_score_tiers > 0:
        # 取前 max_score_tiers 个分数档，每档全部返回
        tiers: List[float] = []
        for _rd, score in results:
            if score not in tiers:
                tiers.append(score)
                if len(tiers) >= max_score_tiers:
                    break
        results = [(rd, s) for rd, s in results if s in tiers]
    else:
        results = results[:max_candidates]
    out = []
    for row_dict, score in results:
        out.append({
            "code": (row_dict.get("code") or "").strip(),
            "matched_name": (row_dict.get("matched_name") or "")[:200],
            "unit_price": float(row_dict.get("unit_price", 0) or 0),
            "score": round(score, 4),
        })
    return out
