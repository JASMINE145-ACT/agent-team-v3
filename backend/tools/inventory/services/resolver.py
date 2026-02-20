"""
本地解析服务：CONTAINS + 向量 fallback，将 phrase 解析为 Item Code 列表。

数据源：item-list-slim.xlsx（Item Code, Item Name, Chinese name）
流程：先 CONTAINS(Item Name / Chinese name)，无结果再用预计算向量 + OpenAI query embedding 做精确 k-NN 取 top_k。
若 phrase 中含规格（如 20/56），则向量取更大候选池后按「名称包含该规格」过滤，保证结果带正确规格。
向量持久化：.npy 与 slim 表同目录；meta 由 cache_manager 管理。
"""

import hashlib
import logging
import re
from pathlib import Path
from typing import List, Optional, Tuple

from backend.tools.inventory.lib.cache.cache_manager import get_cache_manager
from backend.tools.inventory.config import config

logger = logging.getLogger(__name__)

# 列名（与 item-list-slim 一致）
COL_CODE = "Item Code"
COL_NAME = "Item Name"
COL_CHINESE = "Chinese name"

CACHE_VECTORS_SUFFIX = "_embeddings.npy"

RESOLVER_META_KEY_PREFIX = "inventory_resolver_meta:"


def _extract_spec_substrings(phrase: str) -> List[str]:
    """规则兜底：从 phrase 抽取规格，与 spec_extractor 一致。"""
    from backend.tools.inventory.services.spec_extractor import extract_specs_by_rules
    return extract_specs_by_rules(phrase)


class ItemResolver:
    """
    将用户输入的 phrase 解析为 Item Code 列表。
    先本地 CONTAINS，无结果则向量 top_k。
    向量优先从同目录缓存加载，未命中再调 OpenAI 预计算并落盘。
    """

    def __init__(self) -> None:
        self._df = None
        self._vectors = None  # numpy (N, dim)，与 _df 行序一致
        self._codes: List[str] = []
        self._vector_ready = False
        self._table_path: Optional[str] = None
        path = (config.ITEM_LIST_SLIM_PATH or "").strip()
        if path and Path(path).is_file():
            self._load_table(path)
            if config.ENABLE_RESOLVER_VECTOR and self._df is not None and len(self._df) > 0:
                if not self._try_load_vectors_from_cache(path):
                    self._build_vectors(path)
        else:
            if path:
                logger.warning(f"本地表不存在或不可读: {path}，Resolver 仅作占位，主流程将降级为关键词查表")
            else:
                logger.info("未配置 ITEM_LIST_SLIM_PATH，主流程将使用关键词查表")

    def _load_table(self, path: str) -> None:
        try:
            import pandas as pd
            df = pd.read_excel(path, sheet_name=0)
            for col in (COL_CODE, COL_NAME, COL_CHINESE):
                if col not in df.columns:
                    logger.warning(f"本地表缺少列 {col}，跳过加载")
                    return
            df[COL_CODE] = df[COL_CODE].astype(str).str.strip()
            df[COL_NAME] = df[COL_NAME].fillna("").astype(str)
            df[COL_CHINESE] = df[COL_CHINESE].fillna("").astype(str)
            self._df = df
            self._codes = df[COL_CODE].tolist()
            self._table_path = path
            logger.info(f"Resolver 已加载本地表: {path}, {len(df)} 行")
        except Exception as e:
            logger.warning(f"加载本地表失败: {path}, {e}")

    def _vector_cache_path(self, table_path: str) -> Path:
        """与 slim 表同目录的 .npy 路径。"""
        p = Path(table_path).resolve()
        return p.parent / (p.stem + CACHE_VECTORS_SUFFIX)

    def _resolver_meta_key(self, table_path: str) -> str:
        """cache_manager 用 key：按表路径唯一。"""
        path_str = Path(table_path).resolve().as_posix()
        h = hashlib.md5(path_str.encode("utf-8")).hexdigest()
        return RESOLVER_META_KEY_PREFIX + h

    def _try_load_vectors_from_cache(self, table_path: str) -> bool:
        """
        优先从 .npy 文件加载向量。若 cache_manager 有 meta 则校验后再加载；
        否则只要 .npy 存在且行数与表一致，直接加载（避免 Web 等新进程下 cache 为空时重复预计算）。
        """
        vec_path = self._vector_cache_path(table_path)
        if not vec_path.is_file():
            return False
        n_rows_expected = len(self._df) if self._df is not None else 0
        if n_rows_expected == 0:
            return False

        try:
            import numpy as np

            # 1) 若 cache_manager 有 meta，按原逻辑校验
            try:
                cache = get_cache_manager()
                key = self._resolver_meta_key(table_path)
                meta = cache.get(key)
                if meta and isinstance(meta, dict):
                    model = (config.OPENAI_EMBEDDING_MODEL or "").strip()
                    if meta.get("model") != model or meta.get("n_rows") != n_rows_expected:
                        return False
                    table_mtime = Path(table_path).stat().st_mtime
                    if meta.get("source_mtime") is not None and meta["source_mtime"] != table_mtime:
                        return False
            except Exception:
                pass  # cache 不可用或 meta 缺失时，走下面的 fallback

            # 2) 直接加载 .npy，校验行数一致即可
            arr = np.load(vec_path)
            if len(arr) != n_rows_expected:
                logger.warning(f"向量文件 {vec_path} 行数 {len(arr)} 与表 {n_rows_expected} 不一致，将重新预计算")
                return False
            self._vectors = arr
            self._vector_ready = True
            logger.info(f"Resolver 向量已从缓存加载: {vec_path}, {len(self._vectors)} 条")
            return True
        except Exception as e:
            logger.warning(f"加载向量缓存失败: {e}，将重新预计算")
            return False

    def _save_vectors_to_cache(self, table_path: str) -> None:
        """_vectors 写入同目录 .npy；meta 写入 cache_manager。"""
        if self._vectors is None or not self._vector_ready:
            return
        vec_path = self._vector_cache_path(table_path)
        try:
            import numpy as np
            np.save(vec_path, self._vectors)
            table_mtime = Path(table_path).stat().st_mtime
            meta = {
                "model": (config.OPENAI_EMBEDDING_MODEL or "").strip(),
                "n_rows": len(self._vectors),
                "source_mtime": table_mtime,
            }
            cache = get_cache_manager()
            cache.set(self._resolver_meta_key(table_path), meta)
            logger.info(f"Resolver 向量已写入缓存: {vec_path}，meta 已写入 cache_manager")
        except Exception as e:
            logger.warning(f"写入向量缓存失败: {e}")

    def _build_vectors(self, table_path: str) -> None:
        """使用 OpenAI 对每行（Item Name + Chinese name）做 embedding，存为 numpy 并落盘缓存。"""
        if self._df is None or len(self._df) == 0:
            return
        try:
            import numpy as np
            from openai import OpenAI
            timeout = getattr(config, "EMBEDDING_TIMEOUT", 15)
            client = OpenAI(timeout=timeout)
            model = config.OPENAI_EMBEDDING_MODEL
            texts = (
                (self._df[COL_NAME] + " " + self._df[COL_CHINESE])
                .str.strip()
                .tolist()
            )
            batch_size = 100
            all_embeds = []
            for i in range(0, len(texts), batch_size):
                chunk = texts[i : i + batch_size]
                r = client.embeddings.create(model=model, input=chunk)
                all_embeds.extend([e.embedding for e in r.data])
            self._vectors = np.array(all_embeds, dtype="float32")
            self._vector_ready = True
            logger.info(f"Resolver 向量已预计算: {len(self._vectors)} 条, model={model}")
            self._save_vectors_to_cache(table_path)
        except Exception as e:
            logger.warning(f"Resolver 向量预计算失败: {e}，将仅使用 CONTAINS")

    def is_available(self) -> bool:
        return self._df is not None and len(self._df) > 0

    def resolve_contains(self, phrase: str) -> List[str]:
        """
        在 Item Code / Item Name / Chinese name 中做匹配，返回全部命中的 Item Code。
        若 phrase 是纯数字（特别是 10 位），优先在 Item Code 列做精确匹配。
        对于中文组合词（如"进水软管"），若完整词匹配不到，尝试分词匹配（如"进水"+"软管"）。
        """
        if self._df is None or not phrase or not phrase.strip():
            return []
        phrase_orig = phrase.strip()
        phrase_lower = phrase_orig.lower()
        
        # 若 phrase 是纯数字（特别是 10 位 Item Code），优先在 Item Code 列精确匹配
        phrase_no_spaces = re.sub(r'\s+', '', phrase_orig)
        if phrase_no_spaces.isdigit() and len(phrase_no_spaces) == 10:
            code_mask = self._df[COL_CODE].astype(str).str.strip() == phrase_no_spaces
            if code_mask.any():
                codes = self._df.loc[code_mask, COL_CODE].unique().tolist()
                return [str(c) for c in codes]
        
        # 在 Item Name / Chinese name 中做包含匹配（不区分大小写）
        # 注意：中文无大小写，.lower() 对中文无效但不影响匹配
        which = (config.RESOLVER_CONTAINS_COLUMNS or "both").strip().lower()
        mask = None
        if which in ("name", "both"):
            mask = self._df[COL_NAME].astype(str).str.lower().str.contains(phrase_lower, na=False, regex=False)
        if which in ("chinese", "both"):
            m2 = self._df[COL_CHINESE].astype(str).str.lower().str.contains(phrase_lower, na=False, regex=False)
            mask = m2 if mask is None else mask | m2
        
        # 若完整词匹配不到且 phrase 包含中文字符，尝试分词匹配
        if mask is None or not mask.any():
            # 检查是否包含中文字符
            if re.search(r'[\u4e00-\u9fff]', phrase_orig):
                chinese_chars = re.findall(r'[\u4e00-\u9fff]+', phrase_orig)
                if chinese_chars:
                    longest = max(chinese_chars, key=len)
                    # 对于4字以上的中文短语，提取2-3字的关键词（优先取首尾）
                    # 例如"进水软管" -> ["进水", "软管"]（首2字+尾2字）
                    if len(longest) >= 4:
                        keywords = [longest[:2], longest[-2:]]  # 首2字 + 尾2字
                        # 如果首尾有重叠，去重
                        keywords = list(dict.fromkeys(keywords))
                    elif len(longest) >= 2:
                        keywords = [longest]
                    else:
                        keywords = []
                    
                    # 优先匹配同时包含多个关键词的结果（交集），若无则取并集
                    if len(keywords) >= 2:
                        masks_list = []
                        for kw in keywords:
                            m_kw = None
                            if which in ("name", "both"):
                                m_kw = self._df[COL_NAME].astype(str).str.lower().str.contains(kw.lower(), na=False, regex=False)
                            if which in ("chinese", "both"):
                                m_chinese_kw = self._df[COL_CHINESE].astype(str).str.lower().str.contains(kw.lower(), na=False, regex=False)
                                m_kw = m_chinese_kw if m_kw is None else m_kw | m_chinese_kw
                            if m_kw is not None:
                                masks_list.append(m_kw)
                        
                        # 优先取交集（同时包含所有关键词）
                        if masks_list:
                            mask_intersect = masks_list[0]
                            for m in masks_list[1:]:
                                mask_intersect = mask_intersect & m
                            if mask_intersect.any():
                                mask = mask_intersect
                            else:
                                # 若无交集，取并集
                                mask = masks_list[0]
                                for m in masks_list[1:]:
                                    mask = mask | m
                    else:
                        # 单个关键词，直接匹配
                        for kw in keywords:
                            if which in ("name", "both"):
                                m_name = self._df[COL_NAME].astype(str).str.lower().str.contains(kw.lower(), na=False, regex=False)
                                mask = m_name if mask is None else mask | m_name
                            if which in ("chinese", "both"):
                                m_chinese = self._df[COL_CHINESE].astype(str).str.lower().str.contains(kw.lower(), na=False, regex=False)
                                mask = m_chinese if mask is None else mask | m_chinese
        
        if mask is None:
            return []
        codes = self._df.loc[mask, COL_CODE].unique().tolist()
        return [str(c) for c in codes]

    def resolve_vector(self, phrase: str, top_k: int = 3) -> List[str]:
        """
        用预计算向量 + query embedding 做余弦相似度，返回 top_k 个 Item Code。
        若未预计算或 OpenAI 调用失败则返回 []。
        """
        if not self._vector_ready or self._vectors is None or not phrase or not phrase.strip():
            return []
        top_k = min(top_k, len(self._codes))
        try:
            import numpy as np
            from openai import OpenAI
            timeout = getattr(config, "EMBEDDING_TIMEOUT", 15)
            client = OpenAI(timeout=timeout)
            r = client.embeddings.create(
                model=config.OPENAI_EMBEDDING_MODEL,
                input=phrase.strip(),
            )
            q = np.array(r.data[0].embedding, dtype="float32")
            # 余弦相似度
            q = q / (np.linalg.norm(q) + 1e-9)
            sim = self._vectors @ q
            idx = np.argsort(sim)[::-1][:top_k]
            return [self._codes[i] for i in idx]
        except Exception as e:
            logger.warning(f"Resolver 向量检索失败: {e}")
            return []

    def _filter_codes_by_substrings(self, codes: List[str], substrings: List[str]) -> List[str]:
        """只保留 Item Name / Chinese name 中包含任一 substring 的 code（不区分大小写）。"""
        if self._df is None or not codes or not substrings:
            return codes
        # 展平并确保为字符串（LLM 可能返回嵌套结构）
        flat = []
        for x in substrings:
            if isinstance(x, str):
                flat.append(x)
            elif isinstance(x, (list, tuple)):
                flat.extend(str(t) for t in x if isinstance(t, str))
        substrings = flat or substrings
        which = (config.RESOLVER_CONTAINS_COLUMNS or "both").strip().lower()
        code_set = set(codes)
        out = []
        for _, row in self._df[self._df[COL_CODE].isin(code_set)].iterrows():
            name = (row.get(COL_NAME) or "").lower()
            chinese = (row.get(COL_CHINESE) or "").lower()
            text = name + " " + chinese if which == "both" else (name if which == "name" else chinese)
            if any(str(s).lower() in text for s in substrings):
                out.append(str(row[COL_CODE]))
        return out

    def resolve(self, phrase: str, specs: Optional[List[str]] = None) -> List[str]:
        """
        先 CONTAINS，有结果返回全部；无结果或结果过多（可能是并集匹配不够精确）且启用向量则返回 vector 候选。
        specs：规格/关键标识（来自 LLM）；None 时用正则从 phrase 抽取，用于过滤候选。
        """
        if specs is None:
            specs = _extract_spec_substrings(phrase)

        codes = self.resolve_contains(phrase)
        
        # 决定是否使用向量检索：
        # 1. CONTAINS 无结果 → 走向量检索
        # 2. CONTAINS 结果较多（> 10 条）且是中文查询 → 优先向量检索（分词并集匹配不够精确）
        # 3. CONTAINS 结果较少（≤ 3 条）→ 也走向量检索（可能遗漏语义相关产品）
        use_vector = False
        if codes:
            if len(codes) > 10:
                # 结果较多且是中文查询，可能是分词并集匹配，不够精确
                if re.search(r'[\u4e00-\u9fff]', phrase):
                    use_vector = True
                    logger.info(f"CONTAINS 匹配到 {len(codes)} 条（可能不够精确），优先使用向量检索")
            elif len(codes) <= 3:
                # 结果较少，可能遗漏语义相关产品，走向量检索以找到更多相关结果
                use_vector = True
                logger.info(f"CONTAINS 匹配到 {len(codes)} 条（可能遗漏相关产品），使用向量检索补充")
        
        if codes and not use_vector:
            # CONTAINS 有结果且数量合理（4-10 条），直接返回
            if specs:
                codes = self._filter_codes_by_substrings(codes, specs)
            return codes or []

        # CONTAINS 无结果或结果过多，走向量检索
        if not (config.ENABLE_RESOLVER_VECTOR and self._vector_ready):
            # 如果向量未启用，返回 CONTAINS 的结果（即使较多）
            return codes or []

        top_k = config.RESOLVER_VECTOR_TOP_K_CANDIDATES if specs else config.RESOLVER_VECTOR_TOP_K
        vector_codes = self.resolve_vector(phrase, top_k=top_k)
        if specs and vector_codes:
            filtered = self._filter_codes_by_substrings(vector_codes, specs)
            if filtered:
                logger.info(f"向量候选 {len(vector_codes)} 条，按规格 {specs} 过滤后保留 {len(filtered)} 条")
            vector_codes = filtered
        
        # 如果向量检索有结果，优先返回向量结果（更相关）；否则返回 CONTAINS 结果
        return vector_codes or codes or []

    def resolve_phrases(self, phrases: List[str], phrase_specs: Optional[List[List[str]]] = None) -> List[Tuple[str, List[str]]]:
        """对每条 phrase 解析出 Item Code 列表，返回 (phrase, [code, ...])。phrase_specs 与 phrases 一一对应时用 LLM 规格过滤，否则用正则从 phrase 抽规格。"""
        out: List[Tuple[str, List[str]]] = []
        for i, p in enumerate(phrases):
            specs = None
            if phrase_specs is not None and i < len(phrase_specs):
                specs = phrase_specs[i] if phrase_specs[i] else None
            out.append((p, self.resolve(p, specs=specs)))
        return out
