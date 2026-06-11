package backendProfile.gameProfile.modules.analytics.repository;

import backendProfile.gameProfile.modules.analytics.entity.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface VisitorRepository extends JpaRepository<Visitor, Long> {
    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
    List<Visitor> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
}