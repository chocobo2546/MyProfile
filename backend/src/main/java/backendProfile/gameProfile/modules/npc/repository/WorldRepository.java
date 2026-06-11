package backendProfile.gameProfile.modules.npc.repository;

import backendProfile.gameProfile.modules.npc.entity.World;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WorldRepository extends JpaRepository<World, Long> {
    Optional<World> findByName(String name);
}