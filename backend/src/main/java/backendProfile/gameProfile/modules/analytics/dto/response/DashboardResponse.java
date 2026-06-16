package backendProfile.gameProfile.modules.analytics.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DashboardResponse {
    private long totalVisitors;
    private long totalDownloads;
    private long todayVisitors;
    private long todayDownloads;
    private long weeklyVisitors;
    private long weeklyDownloads;
    private long monthlyVisitors;
    private long monthlyDownloads;
}
