package backendProfile.gameProfile.modules.analytics.mapper;

import backendProfile.gameProfile.modules.analytics.dto.response.DownloadResponse;
import backendProfile.gameProfile.modules.download.entity.Download;
import org.springframework.stereotype.Component;

@Component("analyticsDownloadMapper")
public class DownloadMapper {
    public DownloadResponse toResponse(Download download) {
        if (download == null) return null;
        return DownloadResponse.builder()
                .id(download.getId())
                .fileName(download.getFileName())
                .createdAt(download.getCreatedAt())
                .build();
    }
}
