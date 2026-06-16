package backendProfile.gameProfile.modules.npc.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateNpcRequest {
    @NotBlank(message = "Name is required")
    private String name;

    @NotNull(message = "World ID is required")
    private Long worldId;
}
