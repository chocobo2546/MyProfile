package backendProfile.gameProfile.modules.npc.repository;

import backendProfile.gameProfile.modules.npc.entity.NpcDialogue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NpcDialogueRepository extends JpaRepository<NpcDialogue, Long> {
    List<NpcDialogue> findByNpcIdOrderBySequenceOrderAsc(Long npcId);
}