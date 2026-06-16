package backendProfile.gameProfile.modules.project.service;

import backendProfile.gameProfile.common.exception.ResourceNotFoundException;
import backendProfile.gameProfile.modules.project.dto.request.CreateProjectRequest;
import backendProfile.gameProfile.modules.project.dto.request.UpdateProjectRequest;
import backendProfile.gameProfile.modules.project.dto.response.ProjectResponse;
import backendProfile.gameProfile.modules.project.entity.Project;
import backendProfile.gameProfile.modules.project.mapper.ProjectMapper;
import backendProfile.gameProfile.modules.project.repository.ProjectRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Sort;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProjectServiceTest {

    @Mock private ProjectRepository projectRepository;
    private ProjectMapper projectMapper;
    private ProjectService projectService;

    @BeforeEach
    void setUp() {
        projectMapper = new ProjectMapper();
        projectService = new ProjectService(projectRepository, projectMapper);
    }

    @Test
    void getAllProjects_shouldReturnAllProjects() {
        Project project = Project.builder().id(1L).title("Test Project").createdAt(LocalDateTime.now()).updatedAt(LocalDateTime.now()).build();
        when(projectRepository.findAll(any(Sort.class))).thenReturn(List.of(project));

        List<ProjectResponse> result = projectService.getAllProjects();

        assertEquals(1, result.size());
        assertEquals("Test Project", result.get(0).getTitle());
    }

    @Test
    void getProjectById_shouldReturnProject() {
        Project project = Project.builder().id(1L).title("Test").build();
        when(projectRepository.findById(1L)).thenReturn(Optional.of(project));

        ProjectResponse result = projectService.getProjectById(1L);
        assertEquals("Test", result.getTitle());
    }

    @Test
    void getProjectById_shouldThrow_whenNotFound() {
        when(projectRepository.findById(99L)).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class, () -> projectService.getProjectById(99L));
    }

    @Test
    void createProject_shouldSaveAndReturn() {
        CreateProjectRequest request = CreateProjectRequest.builder().title("New Project").description("Desc").build();
        Project saved = Project.builder().id(1L).title("New Project").description("Desc").build();
        when(projectRepository.save(any(Project.class))).thenReturn(saved);

        ProjectResponse result = projectService.createProject(request);
        assertEquals("New Project", result.getTitle());
    }

    @Test
    void updateProject_shouldUpdateAndReturn() {
        Project existing = Project.builder().id(1L).title("Old").build();
        UpdateProjectRequest request = UpdateProjectRequest.builder().title("Updated").build();
        when(projectRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(projectRepository.save(any(Project.class))).thenAnswer(i -> i.getArgument(0));

        ProjectResponse result = projectService.updateProject(1L, request);
        assertEquals("Updated", result.getTitle());
    }

    @Test
    void deleteProject_shouldDelete_whenExists() {
        Project project = Project.builder().id(1L).title("Test").build();
        when(projectRepository.findById(1L)).thenReturn(Optional.of(project));

        projectService.deleteProject(1L);
        verify(projectRepository).delete(project);
    }

    @Test
    void deleteProject_shouldThrow_whenNotFound() {
        when(projectRepository.findById(99L)).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class, () -> projectService.deleteProject(99L));
    }
}