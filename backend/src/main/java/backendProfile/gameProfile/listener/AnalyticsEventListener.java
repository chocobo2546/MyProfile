package backendProfile.gameProfile.listener;

import backendProfile.gameProfile.event.DownloadEvent;
import backendProfile.gameProfile.event.VisitorEvent;
import backendProfile.gameProfile.modules.analytics.entity.Visitor;
import backendProfile.gameProfile.modules.analytics.repository.VisitorRepository;
import backendProfile.gameProfile.modules.analytics.service.AnalyticsService;
import backendProfile.gameProfile.modules.download.entity.Download;
import backendProfile.gameProfile.modules.download.repository.DownloadRepository;
import backendProfile.gameProfile.modules.auth.entity.User;
import backendProfile.gameProfile.modules.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
@Slf4j
public class AnalyticsEventListener {

    private final VisitorRepository visitorRepository;
    private final DownloadRepository downloadRepository;
    private final UserRepository userRepository;
    private final AnalyticsService analyticsService;

    @Async
    @EventListener
    public void handleVisitorEvent(VisitorEvent event) {
        log.info("Processing visitor event for IP: {}", event.getIp());
        try {
            User user = null;
            if (event.getUserId() != null) {
                user = userRepository.findById(event.getUserId()).orElse(null);
            }

            Visitor visitor = Visitor.builder()
                    .user(user)
                    .ip(event.getIp())
                    .country(event.getCountry())
                    .device(event.getDevice())
                    .createdAt(LocalDateTime.now())
                    .build();

            visitorRepository.save(visitor);
            analyticsService.evictDashboardCache();
        } catch (Exception e) {
            log.error("Failed to process visitor event", e);
        }
    }

    @Async
    @EventListener
    public void handleDownloadEvent(DownloadEvent event) {
        log.info("Processing download event for file: {}", event.getFileName());
        try {
            User user = null;
            if (event.getUserId() != null) {
                user = userRepository.findById(event.getUserId()).orElse(null);
            }

            Visitor visitor = null;
            if (event.getIp() != null) {
                visitor = visitorRepository.findTopByIpOrderByCreatedAtDesc(event.getIp()).orElse(null);
            }

            Download download = Download.builder()
                    .user(user)
                    .visitor(visitor)
                    .fileName(event.getFileName())
                    .createdAt(LocalDateTime.now())
                    .build();

            downloadRepository.save(download);
            analyticsService.evictDashboardCache();
        } catch (Exception e) {
            log.error("Failed to process download event", e);
        }
    }
}
