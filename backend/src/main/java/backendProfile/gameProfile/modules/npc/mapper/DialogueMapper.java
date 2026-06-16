package backendProfile.gameProfile.modules.npc.mapper;

import backendProfile.gameProfile.modules.npc.dto.response.DialogueResponse;
import backendProfile.gameProfile.modules.npc.entity.NpcDialogue;
import org.springframework.stereotype.Component;

@Component
public class DialogueMapper {
    public DialogueResponse toResponse(NpcDialogue dialogue) {
        if (dialogue == null) return null;
        return DialogueResponse.builder()
                .id(dialogue.getId())
                .sequenceOrder(dialogue.getSequenceOrder())
                .message(dialogue.getMessage())
                .build();
    }
}
