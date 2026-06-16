package backendProfile.gameProfile.modules.analytics.mapper;

import backendProfile.gameProfile.modules.analytics.dto.response.VisitorResponse;
import backendProfile.gameProfile.modules.analytics.entity.Visitor;
import org.springframework.stereotype.Component;

@Component("analyticsVisitorMapper")
public class VisitorMapper {
    public VisitorResponse toResponse(Visitor visitor) {
        if (visitor == null) return null;
        return VisitorResponse.builder()
                .id(visitor.getId())
                .ip(visitor.getIp())
                .country(visitor.getCountry())
                .device(visitor.getDevice())
                .createdAt(visitor.getCreatedAt())
                .build();
    }
}
