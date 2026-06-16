package backendProfile.gameProfile.modules.npc.mapper;

import backendProfile.gameProfile.modules.npc.dto.response.NpcResponse;
import backendProfile.gameProfile.modules.npc.entity.Npc;
import org.springframework.stereotype.Component;

@Component
public class NpcMapper {
    public NpcResponse toResponse(Npc npc) {
        if (npc == null) return null;
        return NpcResponse.builder()
                .id(npc.getId())
                .name(npc.getName())
                .worldId(npc.getWorld() != null ? npc.getWorld().getId() : null)
                .worldName(npc.getWorld() != null ? npc.getWorld().getName() : null)
                .build();
    }
}
