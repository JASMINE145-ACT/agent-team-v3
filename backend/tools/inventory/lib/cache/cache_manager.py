"""
统一缓存管理器

支持：内存、文件、Redis；供 inventory_agent Resolver 向量元数据缓存使用。

来源：opencode_agent/external_services/data_platform/src/cache/cache_manager.py
"""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timedelta
from enum import Enum
from pathlib import Path
from typing import Any, Dict, List, Optional, Protocol

import hashlib
import json


class CacheBackend(str, Enum):
    MEMORY = "memory"
    FILE = "file"
    REDIS = "redis"


@dataclass
class CacheStats:
    hits: int = 0
    misses: int = 0
    total_requests: int = 0
    size_bytes: int = 0
    evictions: int = 0

    @property
    def hit_rate(self) -> float:
        if self.total_requests == 0:
            return 0.0
        return self.hits / self.total_requests

    def to_dict(self) -> Dict[str, Any]:
        return {
            "hits": self.hits,
            "misses": self.misses,
            "total_requests": self.total_requests,
            "hit_rate": f"{self.hit_rate:.2%}",
            "size_bytes": self.size_bytes,
            "evictions": self.evictions,
        }


class CacheProtocol(Protocol):
    def get(self, key: str) -> Optional[Any]: ...
    def set(self, key: str, value: Any, ttl: Optional[int] = None) -> None: ...
    def delete(self, key: str) -> bool: ...
    def clear(self) -> None: ...
    def get_stats(self) -> CacheStats: ...


class MemoryCache:
    def __init__(self, max_size: int = 1000, ttl_seconds: int = 3600):
        self._cache: Dict[str, tuple[Any, datetime]] = {}
        self._access_order: List[str] = []
        self.max_size = max_size
        self.ttl = timedelta(seconds=ttl_seconds)
        self.stats = CacheStats()

    def get(self, key: str) -> Optional[Any]:
        self.stats.total_requests += 1
        if key not in self._cache:
            self.stats.misses += 1
            return None

        value, ts = self._cache[key]
        if datetime.now() - ts > self.ttl:
            self.delete(key)
            self.stats.misses += 1
            return None

        if key in self._access_order:
            self._access_order.remove(key)
        self._access_order.append(key)
        self.stats.hits += 1
        return value

    def set(self, key: str, value: Any, ttl: Optional[int] = None) -> None:
        if len(self._cache) >= self.max_size and key not in self._cache:
            self._evict_lru()

        self._cache[key] = (value, datetime.now())
        if key in self._access_order:
            self._access_order.remove(key)
        self._access_order.append(key)
        self._update_size_stats()

    def delete(self, key: str) -> bool:
        if key in self._cache:
            del self._cache[key]
            if key in self._access_order:
                self._access_order.remove(key)
            self._update_size_stats()
            return True
        return False

    def clear(self) -> None:
        self._cache.clear()
        self._access_order.clear()
        self.stats.size_bytes = 0

    def get_stats(self) -> CacheStats:
        return self.stats

    def _evict_lru(self) -> None:
        if self._access_order:
            oldest = self._access_order.pop(0)
            if oldest in self._cache:
                del self._cache[oldest]
            self.stats.evictions += 1
            self._update_size_stats()

    def _update_size_stats(self) -> None:
        import sys
        total = sum(sys.getsizeof(k) + sys.getsizeof(v) for k, (v, _) in self._cache.items())
        self.stats.size_bytes = total


class FileCache:
    def __init__(self, cache_dir: Path, ttl_seconds: int = 86400):
        self.cache_dir = Path(cache_dir)
        self.cache_dir.mkdir(parents=True, exist_ok=True)
        self.ttl = timedelta(seconds=ttl_seconds)
        self.stats = CacheStats()

    def get(self, key: str) -> Optional[Any]:
        self.stats.total_requests += 1
        cache_file = self._get_cache_file(key)
        if not cache_file.exists():
            self.stats.misses += 1
            return None
        try:
            with open(cache_file, "r", encoding="utf-8") as f:
                data = json.load(f)
            cached_at = datetime.fromisoformat(data["cached_at"])
            if datetime.now() - cached_at > self.ttl:
                cache_file.unlink(missing_ok=True)
                self.stats.misses += 1
                return None
            self.stats.hits += 1
            return data["value"]
        except Exception:
            self.stats.misses += 1
            return None

    def set(self, key: str, value: Any, ttl: Optional[int] = None) -> None:
        cache_file = self._get_cache_file(key)
        data = {"value": value, "cached_at": datetime.now().isoformat()}
        with open(cache_file, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        self._update_size_stats()

    def delete(self, key: str) -> bool:
        cache_file = self._get_cache_file(key)
        if cache_file.exists():
            cache_file.unlink()
            self._update_size_stats()
            return True
        return False

    def clear(self) -> None:
        for f in self.cache_dir.glob("*.json"):
            f.unlink(missing_ok=True)
        self.stats.size_bytes = 0

    def get_stats(self) -> CacheStats:
        self._update_size_stats()
        return self.stats

    def _get_cache_file(self, key: str) -> Path:
        key_hash = hashlib.md5(key.encode("utf-8")).hexdigest()
        return self.cache_dir / f"{key_hash}.json"

    def _update_size_stats(self) -> None:
        total = sum(f.stat().st_size for f in self.cache_dir.glob("*.json"))
        self.stats.size_bytes = total


class RedisCache:
    def __init__(self, redis_url: str, ttl_seconds: int = 3600):
        import redis
        self.client = redis.from_url(redis_url)
        self.ttl = ttl_seconds
        self.stats = CacheStats()

    def get(self, key: str) -> Optional[Any]:
        self.stats.total_requests += 1
        try:
            value = self.client.get(key)
            if value is None:
                self.stats.misses += 1
                return None
            self.stats.hits += 1
            return json.loads(value)
        except Exception:
            self.stats.misses += 1
            return None

    def set(self, key: str, value: Any, ttl: Optional[int] = None) -> None:
        ttl = ttl or self.ttl
        self.client.setex(key, ttl, json.dumps(value, ensure_ascii=False))

    def delete(self, key: str) -> bool:
        return bool(self.client.delete(key) > 0)

    def clear(self) -> None:
        self.client.flushdb()

    def get_stats(self) -> CacheStats:
        try:
            info = self.client.info("stats")
            self.stats.hits = int(info.get("keyspace_hits", 0))
            self.stats.misses = int(info.get("keyspace_misses", 0))
            self.stats.total_requests = self.stats.hits + self.stats.misses
        except Exception:
            pass
        return self.stats


class UnifiedCacheManager:
    def __init__(
        self,
        *,
        l1_cache: Optional[CacheProtocol] = None,
        l2_cache: Optional[CacheProtocol] = None,
        namespace: str = "default",
    ):
        self.l1_cache = l1_cache or MemoryCache()
        self.l2_cache = l2_cache
        self.namespace = namespace

    def get(self, key: str, use_l2: bool = True) -> Optional[Any]:
        namespaced_key = self._add_namespace(key)
        v = self.l1_cache.get(namespaced_key)
        if v is not None:
            return v
        if use_l2 and self.l2_cache:
            v = self.l2_cache.get(namespaced_key)
            if v is not None:
                self.l1_cache.set(namespaced_key, v)
                return v
        return None

    def set(self, key: str, value: Any, ttl: Optional[int] = None, write_through: bool = True) -> None:
        namespaced_key = self._add_namespace(key)
        self.l1_cache.set(namespaced_key, value, ttl)
        if write_through and self.l2_cache:
            self.l2_cache.set(namespaced_key, value, ttl)

    def delete(self, key: str) -> None:
        namespaced_key = self._add_namespace(key)
        self.l1_cache.delete(namespaced_key)
        if self.l2_cache:
            self.l2_cache.delete(namespaced_key)

    def clear(self, clear_l2: bool = False) -> None:
        self.l1_cache.clear()
        if clear_l2 and self.l2_cache:
            self.l2_cache.clear()

    def get_stats(self) -> Dict[str, CacheStats]:
        stats: Dict[str, CacheStats] = {"l1_memory": self.l1_cache.get_stats()}
        if self.l2_cache:
            stats["l2_persistent"] = self.l2_cache.get_stats()
        return stats

    def _add_namespace(self, key: str) -> str:
        return f"{self.namespace}:{key}"


def create_cache_manager(backend: CacheBackend = CacheBackend.MEMORY, namespace: str = "inventory_agent") -> UnifiedCacheManager:
    if backend == CacheBackend.MEMORY:
        return UnifiedCacheManager(l1_cache=MemoryCache(max_size=1000, ttl_seconds=3600), namespace=namespace)
    if backend == CacheBackend.FILE:
        _root = Path(__file__).resolve().parent.parent.parent
        cache_dir = _root / "data" / "cache"
        return UnifiedCacheManager(
            l1_cache=MemoryCache(max_size=500, ttl_seconds=3600),
            l2_cache=FileCache(cache_dir, ttl_seconds=86400),
            namespace=namespace,
        )
    if backend == CacheBackend.REDIS:
        import os
        redis_url = os.getenv("REDIS_URL", "redis://localhost:6379/0")
        return UnifiedCacheManager(
            l1_cache=MemoryCache(max_size=500, ttl_seconds=3600),
            l2_cache=RedisCache(redis_url, ttl_seconds=86400),
            namespace=namespace,
        )
    return UnifiedCacheManager(namespace=namespace)


_global_cache_manager: Optional[UnifiedCacheManager] = None


def get_cache_manager() -> UnifiedCacheManager:
    """获取全局缓存管理器（单例）"""
    global _global_cache_manager
    if _global_cache_manager is None:
        import os
        backend = os.getenv("CACHE_BACKEND", "memory").lower()
        try:
            backend_enum = CacheBackend(backend)
        except Exception:
            backend_enum = CacheBackend.MEMORY
        _global_cache_manager = create_cache_manager(backend=backend_enum, namespace="inventory_agent")
    return _global_cache_manager
