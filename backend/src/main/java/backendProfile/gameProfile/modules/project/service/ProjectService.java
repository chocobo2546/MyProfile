package backendProfile.gameProfile.modules.project.service;

import backendProfile.gameProfile.common.exception.ResourceNotFoundException;
import backendProfile.gameProfile.modules.project.dto.request.CreateProjectRequest;
import backendProfile.gameProfile.modules.project.dto.request.UpdateProjectRequest;
import backendProfile.gameProfile.modules.project.dto.response.ProjectResponse;
import backendProfile.gameProfile.modules.project.entity.Project;
import backendProfile.gameProfile.modules.project.mapper.ProjectMapper;
import backendProfile.gameProfile.modules.project.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;

    @Transactional(readOnly = true)
    public List<ProjectResponse> getAllProjects() {
        return projectRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"))
                .stream()
                .map(projectMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProjectResponse getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));
        return projectMapper.toResponse(project);
    }

    @Transactional
    public ProjectResponse createProject(CreateProjectRequest request) {
        Project project = projectMapper.toEntity(request);
        Project saved = projectRepository.save(project);
        log.info("Created project: id={}, title={}", saved.getId(), saved.getTitle());
        return projectMapper.toResponse(saved);
    }

    @Transactional
    public ProjectResponse updateProject(Long id, UpdateProjectRequest request) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));
        projectMapper.updateEntity(project, request);
        Project updated = projectRepository.save(project);
        log.info("Updated project: id={}, title={}", updated.getId(), updated.getTitle());
        return projectMapper.toResponse(updated);
    }

    @Transactional
    public void deleteProject(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));
        projectRepository.delete(project);
        log.info("Deleted project: id={}, title={}", project.getId(), project.getTitle());
    }
}