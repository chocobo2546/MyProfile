package backendProfile.gameProfile.modules.download.service;

import backendProfile.gameProfile.common.exception.ResourceNotFoundException;
import backendProfile.gameProfile.event.DownloadEvent;
import backendProfile.gameProfile.modules.resume.dto.response.ResumeResponse;
import backendProfile.gameProfile.modules.resume.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DownloadService {

    private final ResumeService resumeService;
    private final ApplicationEventPublisher eventPublisher;

    public Resource downloadResume(Long userId, String ip) {
        ResumeResponse resumeResponse = resumeService.getActiveResume();
        if (resumeResponse == null) {
            throw new ResourceNotFoundException("No active resume found");
        }

        try {
            Resource resource = resumeService.getActiveResumeResource();
            if (resource == null) {
                throw new ResourceNotFoundException("No active resume found");
            }
            eventPublisher.publishEvent(new DownloadEvent(this, userId, resumeResponse.getFileName(), ip));
            return resource;
        } catch (Exception ex) {
            throw new RuntimeException("Could not read file", ex);
        }
    }
}
