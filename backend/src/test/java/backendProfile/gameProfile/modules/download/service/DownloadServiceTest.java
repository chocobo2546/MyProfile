package backendProfile.gameProfile.modules.download.service;

import backendProfile.gameProfile.common.exception.ResourceNotFoundException;
import backendProfile.gameProfile.event.DownloadEvent;
import backendProfile.gameProfile.modules.resume.dto.response.ResumeResponse;
import backendProfile.gameProfile.modules.resume.service.ResumeService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DownloadServiceTest {

    @Mock private ResumeService resumeService;
    @Mock private ApplicationEventPublisher eventPublisher;
    @InjectMocks private DownloadService downloadService;

    @Test
    void downloadResume_shouldReturnResource() {
        ResumeResponse resumeResponse = ResumeResponse.builder().fileName("resume.pdf").build();
        Resource resource = new ByteArrayResource("test data".getBytes());

        when(resumeService.getActiveResume()).thenReturn(resumeResponse);
        when(resumeService.getActiveResumeResource()).thenReturn(resource);

        Resource result = downloadService.downloadResume(1L, "127.0.0.1");

        assertNotNull(result);
        verify(eventPublisher).publishEvent(any(DownloadEvent.class));
    }

    @Test
    void downloadResume_shouldThrow_whenNoResume() {
        when(resumeService.getActiveResume()).thenReturn(null);

        assertThrows(ResourceNotFoundException.class, () -> downloadService.downloadResume(1L, "127.0.0.1"));
    }
}