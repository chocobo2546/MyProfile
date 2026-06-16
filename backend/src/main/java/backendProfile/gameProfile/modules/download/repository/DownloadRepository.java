package backendProfile.gameProfile.modules.download.repository;

import backendProfile.gameProfile.modules.download.entity.Download;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface DownloadRepository extends JpaRepository<Download, Long> {
    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
    long countByFileName(String fileName);

    @Query(value = "SELECT DATE(d.created_at) as date, COUNT(*) as cnt FROM downloads d WHERE d.created_at >= :since GROUP BY DATE(d.created_at) ORDER BY date ASC", nativeQuery = true)
    List<Object[]> countDownloadsPerDaySince(@Param("since") LocalDateTime since);

    @Query(value = "SELECT d.file_name, COUNT(*) as cnt FROM downloads d GROUP BY d.file_name ORDER BY cnt DESC", nativeQuery = true)
    List<Object[]> findTopDownloadedFiles();
}
