package backendProfile.gameProfile.modules.analytics.dto.response.stats;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class DailyVisitorCount {
    private LocalDate date;
    private long count;
}