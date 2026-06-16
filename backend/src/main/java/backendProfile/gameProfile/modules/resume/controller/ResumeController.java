package backendProfile.gameProfile.modules.resume.controller;

import backendProfile.gameProfile.common.response.ApiResponse;
import backendProfile.gameProfile.modules.resume.dto.response.ResumeResponse;
import backendProfile.gameProfile.modules.resume.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/resume")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;

    @GetMapping
    public ApiResponse<ResumeResponse> getResumeInfo() {
        ResumeResponse resumeResponse = resumeService.getActiveResume();
        if (resumeResponse == null) {
            return ApiResponse.success("No resume found", null);
        }
        return ApiResponse.success("Resume info fetched successfully", resumeResponse);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<ResumeResponse> uploadResume(@RequestParam("file") MultipartFile file) {
        ResumeResponse resumeResponse = resumeService.uploadResume(file);
        return ApiResponse.success("Resume uploaded successfully", resumeResponse);
    }
}
