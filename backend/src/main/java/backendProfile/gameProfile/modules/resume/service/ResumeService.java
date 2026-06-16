package backendProfile.gameProfile.modules.resume.service;

import backendProfile.gameProfile.common.exception.BusinessException;
import backendProfile.gameProfile.modules.resume.dto.response.ResumeResponse;
import backendProfile.gameProfile.modules.resume.entity.ResumeFile;
import backendProfile.gameProfile.modules.resume.mapper.ResumeFileMapper;
import backendProfile.gameProfile.modules.resume.repository.ResumeFileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ResumeService {

    private final ResumeFileRepository resumeFileRepository;
    private final ResumeFileMapper resumeFileMapper;

    @Value("${app.resume.upload-dir:uploads/resumes}")
    private String uploadDir;

    @Transactional(readOnly = true)
    public ResumeResponse getActiveResume() {
        ResumeFile latestResume = getLatestResumeEntity();

        if (latestResume == null) {
            return null;
        }

        String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
        return resumeFileMapper.toResponse(latestResume, baseUrl);
    }

    @Transactional(readOnly = true)
    public org.springframework.core.io.Resource getActiveResumeResource() {
        ResumeFile latestResume = getLatestResumeEntity();
        if (latestResume == null) {
            return null;
        }
        
        try {
            Path file = Paths.get(latestResume.getFilePath());
            org.springframework.core.io.Resource resource = new org.springframework.core.io.UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new BusinessException("Could not read the file!");
            }
        } catch (java.net.MalformedURLException e) {
            throw new BusinessException("Error reading file: " + e.getMessage());
        }
    }
    
    private ResumeFile getLatestResumeEntity() {
        return resumeFileRepository.findAll().stream()
                .max((r1, r2) -> r1.getUploadedAt().compareTo(r2.getUploadedAt()))
                .orElse(null);
    }

    @Transactional
    public ResumeResponse uploadResume(MultipartFile file) {
        if (file.isEmpty()) {
            throw new BusinessException("Failed to store empty file.");
        }

        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename() != null ? file.getOriginalFilename() : "resume.pdf");
        String extension = "";
        int i = originalFilename.lastIndexOf('.');
        if (i > 0) {
            extension = originalFilename.substring(i);
        }
        
        String storedFileName = UUID.randomUUID().toString() + extension;
        
        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            
            Path destination = uploadPath.resolve(storedFileName).normalize().toAbsolutePath();
            if (!destination.getParent().equals(uploadPath.toAbsolutePath())) {
                throw new BusinessException("Cannot store file outside current directory.");
            }
            
            Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
            
            ResumeFile resumeFile = ResumeFile.builder()
                    .fileName(originalFilename)
                    .filePath(destination.toString())
                    .uploadedAt(LocalDateTime.now())
                    .build();
            
            ResumeFile savedResume = resumeFileRepository.save(resumeFile);
            
            String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
            return resumeFileMapper.toResponse(savedResume, baseUrl);
            
        } catch (IOException e) {
            log.error("Failed to store file", e);
            throw new BusinessException("Failed to store file: " + e.getMessage());
        }
    }
}
