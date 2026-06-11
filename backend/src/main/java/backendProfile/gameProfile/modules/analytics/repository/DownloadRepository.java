package backendProfile.gameProfile.modules.analytics.repository;

import backendProfile.gameProfile.modules.analytics.entity.Download;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface DownloadRepository extends JpaRepository<Download, Long> {
    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
    long countByFileName(String fileName);
}