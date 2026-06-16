package backendProfile.gameProfile.modules.analytics.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class DownloadResponse {
    private Long id;
    private String fileName;
    private LocalDateTime createdAt;
}
