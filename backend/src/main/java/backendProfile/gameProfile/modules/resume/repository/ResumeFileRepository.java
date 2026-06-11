package backendProfile.gameProfile.modules.resume.repository;

import backendProfile.gameProfile.modules.resume.entity.ResumeFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResumeFileRepository extends JpaRepository<ResumeFile, Long> {
}