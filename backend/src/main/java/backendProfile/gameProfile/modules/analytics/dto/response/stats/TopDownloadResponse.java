package backendProfile.gameProfile.modules.analytics.dto.response.stats;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TopDownloadResponse {
    private String fileName;
    private long count;
}