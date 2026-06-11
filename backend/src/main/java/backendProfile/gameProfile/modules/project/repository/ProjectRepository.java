package backendProfile.gameProfile.modules.project.repository;

import backendProfile.gameProfile.modules.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
}