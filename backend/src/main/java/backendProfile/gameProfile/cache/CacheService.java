package backendProfile.gameProfile.cache;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class CacheService {

    private final CacheManager cacheManager;

    public void evictCache(String cacheName) {
        Cache cache = cacheManager.getCache(cacheName);
        if (cache != null) {
            cache.clear();
            log.debug("Evicted cache: {}", cacheName);
        }
    }

    public void evictCache(String cacheName, String key) {
        Cache cache = cacheManager.getCache(cacheName);
        if (cache != null) {
            cache.evictIfPresent(key);
            log.debug("Evicted cache key: {} from {}", key, cacheName);
        }
    }

    public void evictAll() {
        cacheManager.getCacheNames().forEach(this::evictCache);
        log.debug("Evicted all caches");
    }
}
