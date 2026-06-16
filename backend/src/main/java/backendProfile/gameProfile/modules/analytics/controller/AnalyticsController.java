package backendProfile.gameProfile.modules.analytics.controller;

import backendProfile.gameProfile.common.response.ApiResponse;
import backendProfile.gameProfile.common.response.PaginationInfo;
import backendProfile.gameProfile.modules.analytics.dto.response.DashboardResponse;
import backendProfile.gameProfile.modules.analytics.dto.response.DownloadResponse;
import backendProfile.gameProfile.modules.analytics.dto.response.VisitorResponse;
import backendProfile.gameProfile.modules.analytics.dto.response.stats.DailyDownloadCount;
import backendProfile.gameProfile.modules.analytics.dto.response.stats.DailyVisitorCount;
import backendProfile.gameProfile.modules.analytics.dto.response.stats.TopDownloadResponse;
import backendProfile.gameProfile.modules.analytics.service.AnalyticsService;
import backendProfile.gameProfile.modules.analytics.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/analytics")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AnalyticsController {

    private final AnalyticsService analyticsService;
    private final StatisticsService statisticsService;

    @GetMapping("/dashboard")
    public ApiResponse<DashboardResponse> getDashboard() {
        return ApiResponse.success("Dashboard metrics retrieved", analyticsService.getDashboardMetrics());
    }

    @GetMapping("/visitors")
    public ApiResponse<List<VisitorResponse>> getVisitors(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Page<VisitorResponse> visitorPage = analyticsService.getVisitors(page, size);
        PaginationInfo pagination = PaginationInfo.builder()
                .page(page)
                .size(size)
                .totalPages(visitorPage.getTotalPages())
                .totalItems(visitorPage.getTotalElements())
                .build();
                
        return ApiResponse.success("Visitors retrieved", visitorPage.getContent(), pagination);
    }

    @GetMapping("/visitors/trend")
    public ApiResponse<List<DailyVisitorCount>> getVisitorTrend(
            @RequestParam(defaultValue = "7") int days) {
        List<DailyVisitorCount> trend = statisticsService.getVisitorTrend(days);
        return ApiResponse.success("Visitor trend retrieved", trend);
    }

    @GetMapping("/downloads")
    public ApiResponse<List<DownloadResponse>> getDownloads(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Page<DownloadResponse> downloadPage = analyticsService.getDownloads(page, size);
        PaginationInfo pagination = PaginationInfo.builder()
                .page(page)
                .size(size)
                .totalPages(downloadPage.getTotalPages())
                .totalItems(downloadPage.getTotalElements())
                .build();
                
        return ApiResponse.success("Downloads retrieved", downloadPage.getContent(), pagination);
    }

    @GetMapping("/downloads/trend")
    public ApiResponse<List<DailyDownloadCount>> getDownloadTrend(
            @RequestParam(defaultValue = "7") int days) {
        List<DailyDownloadCount> trend = statisticsService.getDownloadTrend(days);
        return ApiResponse.success("Download trend retrieved", trend);
    }

    @GetMapping("/downloads/top")
    public ApiResponse<List<TopDownloadResponse>> getTopDownloads() {
        List<TopDownloadResponse> top = statisticsService.getTopDownloads();
        return ApiResponse.success("Top downloads retrieved", top);
    }
}
