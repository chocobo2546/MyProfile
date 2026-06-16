package backendProfile.gameProfile.modules.npc.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DialogueResponse {
    private Long id;
    private Integer sequenceOrder;
    private String message;
}
