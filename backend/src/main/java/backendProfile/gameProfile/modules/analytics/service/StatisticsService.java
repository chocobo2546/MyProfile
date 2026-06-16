package backendProfile.gameProfile.modules.analytics.service;

import backendProfile.gameProfile.modules.analytics.dto.response.stats.DailyDownloadCount;
import backendProfile.gameProfile.modules.analytics.dto.response.stats.DailyVisitorCount;
import backendProfile.gameProfile.modules.analytics.dto.response.stats.TopDownloadResponse;
import backendProfile.gameProfile.modules.analytics.repository.VisitorRepository;
import backendProfile.gameProfile.modules.download.repository.DownloadRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class StatisticsService {

    private final VisitorRepository visitorRepository;
    private final DownloadRepository downloadRepository;

    @Transactional(readOnly = true)
    @Cacheable(value = "analytics:stats", key = "'visitors:trend:' + #days", unless = "#result == null")
    public List<DailyVisitorCount> getVisitorTrend(int days) {
        LocalDateTime since = LocalDate.now().minusDays(days).atStartOfDay();
        List<Object[]> results = visitorRepository.countVisitorsPerDaySince(since);
        return results.stream()
                .map(row -> DailyVisitorCount.builder()
                        .date(((java.sql.Date) row[0]).toLocalDate())
                        .count(((Number) row[1]).longValue())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "analytics:stats", key = "'downloads:trend:' + #days", unless = "#result == null")
    public List<DailyDownloadCount> getDownloadTrend(int days) {
        LocalDateTime since = LocalDate.now().minusDays(days).atStartOfDay();
        List<Object[]> results = downloadRepository.countDownloadsPerDaySince(since);
        return results.stream()
                .map(row -> DailyDownloadCount.builder()
                        .date(((java.sql.Date) row[0]).toLocalDate())
                        .count(((Number) row[1]).longValue())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "analytics:stats", key = "'downloads:top'", unless = "#result == null")
    public List<TopDownloadResponse> getTopDownloads() {
        List<Object[]> results = downloadRepository.findTopDownloadedFiles();
        return results.stream()
                .map(row -> TopDownloadResponse.builder()
                        .fileName((String) row[0])
                        .count(((Number) row[1]).longValue())
                        .build())
                .collect(Collectors.toList());
    }
}