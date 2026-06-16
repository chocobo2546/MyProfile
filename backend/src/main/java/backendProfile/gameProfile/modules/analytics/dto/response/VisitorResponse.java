package backendProfile.gameProfile.modules.analytics.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class VisitorResponse {
    private Long id;
    private String ip;
    private String country;
    private String device;
    private LocalDateTime createdAt;
}
