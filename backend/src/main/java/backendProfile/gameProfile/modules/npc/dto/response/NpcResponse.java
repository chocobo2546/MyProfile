package backendProfile.gameProfile.modules.npc.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NpcResponse {
    private Long id;
    private String name;
    private Long worldId;
    private String worldName;
}
