package backendProfile.gameProfile.modules.npc.repository;

import backendProfile.gameProfile.modules.npc.entity.Npc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NpcRepository extends JpaRepository<Npc, Long> {
    List<Npc> findByWorldId(Long worldId);
}