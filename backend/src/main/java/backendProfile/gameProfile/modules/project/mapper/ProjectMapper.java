package backendProfile.gameProfile.modules.project.mapper;

import backendProfile.gameProfile.modules.project.dto.request.CreateProjectRequest;
import backendProfile.gameProfile.modules.project.dto.request.UpdateProjectRequest;
import backendProfile.gameProfile.modules.project.dto.response.ProjectResponse;
import backendProfile.gameProfile.modules.project.entity.Project;
import org.springframework.stereotype.Component;

@Component
public class ProjectMapper {

    public Project toEntity(CreateProjectRequest request) {
        if (request == null) return null;
        return Project.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .imageUrl(request.getImageUrl())
                .build();
    }

    public void updateEntity(Project project, UpdateProjectRequest request) {
        if (request == null) return;
        if (request.getTitle() != null) project.setTitle(request.getTitle());
        if (request.getDescription() != null) project.setDescription(request.getDescription());
        if (request.getImageUrl() != null) project.setImageUrl(request.getImageUrl());
    }

    public ProjectResponse toResponse(Project project) {
        if (project == null) return null;
        return ProjectResponse.builder()
                .id(project.getId())
                .title(project.getTitle())
                .description(project.getDescription())
                .imageUrl(project.getImageUrl())
                .createdAt(project.getCreatedAt())
                .updatedAt(project.getUpdatedAt())
                .build();
    }
}