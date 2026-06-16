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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AnalyticsServiceTest {

    @Mock private VisitorRepository visitorRepository;
    @Mock private DownloadRepository downloadRepository;
    private VisitorMapper visitorMapper;
    private DownloadMapper downloadMapper;
    private AnalyticsService analyticsService;

    @BeforeEach
    void setUp() {
        visitorMapper = new VisitorMapper();
        downloadMapper = new DownloadMapper();
        analyticsService = new AnalyticsService(visitorRepository, downloadRepository, visitorMapper, downloadMapper);
    }

    @Test
    void getDashboardMetrics_shouldReturnAllCounts() {
        when(visitorRepository.count()).thenReturn(100L);
        when(downloadRepository.count()).thenReturn(50L);
        when(visitorRepository.countByCreatedAtBetween(any(), any())).thenReturn(5L);
        when(downloadRepository.countByCreatedAtBetween(any(), any())).thenReturn(2L);

        DashboardResponse result = analyticsService.getDashboardMetrics();

        assertEquals(100L, result.getTotalVisitors());
        assertEquals(50L, result.getTotalDownloads());
        assertEquals(5L, result.getTodayVisitors());
        assertEquals(2L, result.getTodayDownloads());
    }

    @Test
    void getVisitors_shouldReturnPagedResults() {
        Visitor visitor = Visitor.builder().id(1L).ip("127.0.0.1").createdAt(LocalDateTime.now()).build();
        Page<Visitor> page = new PageImpl<>(List.of(visitor));
        when(visitorRepository.findAll(any(PageRequest.class))).thenReturn(page);

        Page<VisitorResponse> result = analyticsService.getVisitors(1, 10);

        assertEquals(1, result.getTotalElements());
        assertEquals("127.0.0.1", result.getContent().get(0).getIp());
    }

    @Test
    void getDownloads_shouldReturnPagedResults() {
        Download download = Download.builder().id(1L).fileName("resume.pdf").createdAt(LocalDateTime.now()).build();
        Page<Download> page = new PageImpl<>(List.of(download));
        when(downloadRepository.findAll(any(PageRequest.class))).thenReturn(page);

        Page<DownloadResponse> result = analyticsService.getDownloads(1, 10);

        assertEquals(1, result.getTotalElements());
        assertEquals("resume.pdf", result.getContent().get(0).getFileName());
    }
}