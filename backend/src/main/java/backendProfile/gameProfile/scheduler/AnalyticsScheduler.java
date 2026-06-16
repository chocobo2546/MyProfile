package backendProfile.gameProfile.scheduler;

import backendProfile.gameProfile.cache.CacheService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class AnalyticsScheduler {

    private final CacheService cacheService;

    @Scheduled(cron = "0 0 */6 * * *")
    public void warmAnalyticsCache() {
        log.info("Scheduled cache eviction for analytics");
        cacheService.evictCache("analytics:dashboard");
    }
}
