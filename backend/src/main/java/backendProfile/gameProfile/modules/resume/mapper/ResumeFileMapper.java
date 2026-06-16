package backendProfile.gameProfile.modules.resume.mapper;

import backendProfile.gameProfile.modules.resume.dto.response.ResumeResponse;
import backendProfile.gameProfile.modules.resume.entity.ResumeFile;
import org.springframework.stereotype.Component;

@Component
public class ResumeFileMapper {

    public ResumeResponse toResponse(ResumeFile resumeFile, String baseUrl) {
        if (resumeFile == null) {
            return null;
        }
        return ResumeResponse.builder()
                .fileName(resumeFile.getFileName())
                .downloadUrl(baseUrl + "/downloads/resume")
                .build();
    }
}
