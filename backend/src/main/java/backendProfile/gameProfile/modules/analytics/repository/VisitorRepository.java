package backendProfile.gameProfile.modules.analytics.repository;

import backendProfile.gameProfile.modules.analytics.entity.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface VisitorRepository extends JpaRepository<Visitor, Long> {
    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
    List<Visitor> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
    Optional<Visitor> findTopByIpOrderByCreatedAtDesc(String ip);

    @Query(value = "SELECT DATE(v.created_at) as date, COUNT(*) as cnt FROM visitors v WHERE v.created_at >= :since GROUP BY DATE(v.created_at) ORDER BY date ASC", nativeQuery = true)
    List<Object[]> countVisitorsPerDaySince(@Param("since") LocalDateTime since);
}