package backendProfile.gameProfile.listener;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class ApplicationReadyListener {

    @Autowired(required = false)
    private RedisConnectionFactory redisConnectionFactory;

    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationReady() {
        log.info("Application started successfully");
        checkRedisConnection();
    }

    private void checkRedisConnection() {
        if (redisConnectionFactory != null) {
            try {
                String pong = redisConnectionFactory.getConnection().ping();
                log.info("Redis connection OK: {}", pong);
            } catch (Exception e) {
                log.warn("Redis connection failed: {}", e.getMessage());
            }
        } else {
            log.info("Redis not configured, skipping connection check");
        }
    }
}
