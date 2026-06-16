package backendProfile.gameProfile.modules.analytics.service;

import backendProfile.gameProfile.modules.analytics.dto.response.DashboardResponse;
import backendProfile.gameProfile.modules.analytics.dto.response.DownloadResponse;
import backendProfile.gameProfile.modules.analytics.dto.response.VisitorResponse;
import backendProfile.gameProfile.modules.analytics.entity.Visitor;
import backendProfile.gameProfile.modules.analytics.mapper.DownloadMapper;
import backendProfile.gameProfile.modules.analytics.mapper.VisitorMapper;
import backendProfile.gameProfile.modules.analytics.repository.VisitorRepository;
import backendProfile.gameProfile.modules.download.entity.Download;
import backendProfile.gameProfile.modules.download.repository.DownloadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final VisitorRepository visitorRepository;
    private final DownloadRepository downloadRepository;
    private final VisitorMapper visitorMapper;
    private final DownloadMapper downloadMapper;

    @Transactional(readOnly = true)
    @Cacheable(value = "analytics:dashboard", key = "'metrics'", unless = "#result == null")
    public DashboardResponse getDashboardMetrics() {
        long totalVisitors = visitorRepository.count();
        long totalDownloads = downloadRepository.count();

        LocalDate now = LocalDate.now();
        LocalDateTime startOfDay = now.atStartOfDay();
        LocalDateTime endOfDay = startOfDay.plusDays(1).minusNanos(1);
        long todayVisitors = visitorRepository.countByCreatedAtBetween(startOfDay, endOfDay);
        long todayDownloads = downloadRepository.countByCreatedAtBetween(startOfDay, endOfDay);

        LocalDateTime startOfWeek = now.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY)).atStartOfDay();
        long weeklyVisitors = visitorRepository.countByCreatedAtBetween(startOfWeek, endOfDay);
        long weeklyDownloads = downloadRepository.countByCreatedAtBetween(startOfWeek, endOfDay);

        LocalDateTime startOfMonth = now.withDayOfMonth(1).atStartOfDay();
        long monthlyVisitors = visitorRepository.countByCreatedAtBetween(startOfMonth, endOfDay);
        long monthlyDownloads = downloadRepository.countByCreatedAtBetween(startOfMonth, endOfDay);

        return DashboardResponse.builder()
                .totalVisitors(totalVisitors)
                .totalDownloads(totalDownloads)
                .todayVisitors(todayVisitors)
                .todayDownloads(todayDownloads)
                .weeklyVisitors(weeklyVisitors)
                .weeklyDownloads(weeklyDownloads)
                .monthlyVisitors(monthlyVisitors)
                .monthlyDownloads(monthlyDownloads)
                .build();
    }

    @CacheEvict(value = {"analytics:dashboard", "analytics:stats"}, allEntries = true)
    public void evictDashboardCache() {
    }

    @Transactional(readOnly = true)
    public Page<VisitorResponse> getVisitors(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("createdAt").descending());
        Page<Visitor> visitors = visitorRepository.findAll(pageable);
        return visitors.map(visitorMapper::toResponse);
    }

    @Transactional(readOnly = true)
    public Page<DownloadResponse> getDownloads(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("createdAt").descending());
        Page<Download> downloads = downloadRepository.findAll(pageable);
        return downloads.map(downloadMapper::toResponse);
    }
}
