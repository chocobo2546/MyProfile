package backendProfile.gameProfile.modules.analytics.service;

import backendProfile.gameProfile.modules.analytics.dto.response.stats.DailyDownloadCount;
import backendProfile.gameProfile.modules.analytics.dto.response.stats.DailyVisitorCount;
import backendProfile.gameProfile.modules.analytics.dto.response.stats.TopDownloadResponse;
import backendProfile.gameProfile.modules.analytics.repository.VisitorRepository;
import backendProfile.gameProfile.modules.download.repository.DownloadRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class StatisticsServiceTest {

    @Mock private VisitorRepository visitorRepository;
    @Mock private DownloadRepository downloadRepository;
    @InjectMocks private StatisticsService statisticsService;

    @Test
    void getVisitorTrend_shouldReturnDailyCounts() {
        Date today = Date.valueOf(LocalDate.now());
        when(visitorRepository.countVisitorsPerDaySince(any())).thenReturn(
                Collections.singletonList(new Object[]{today, 5L})
        );

        List<DailyVisitorCount> result = statisticsService.getVisitorTrend(7);

        assertEquals(1, result.size());
        assertEquals(5L, result.get(0).getCount());
    }

    @Test
    void getDownloadTrend_shouldReturnDailyCounts() {
        Date today = Date.valueOf(LocalDate.now());
        when(downloadRepository.countDownloadsPerDaySince(any())).thenReturn(
                Collections.singletonList(new Object[]{today, 3L})
        );

        List<DailyDownloadCount> result = statisticsService.getDownloadTrend(7);

        assertEquals(1, result.size());
        assertEquals(3L, result.get(0).getCount());
    }

    @Test
    void getTopDownloads_shouldReturnOrderedList() {
        when(downloadRepository.findTopDownloadedFiles()).thenReturn(
                List.of(new Object[]{"resume.pdf", 10L}, new Object[]{"doc.pdf", 5L})
        );

        List<TopDownloadResponse> result = statisticsService.getTopDownloads();

        assertEquals(2, result.size());
        assertEquals("resume.pdf", result.get(0).getFileName());
        assertEquals(10L, result.get(0).getCount());
    }
}