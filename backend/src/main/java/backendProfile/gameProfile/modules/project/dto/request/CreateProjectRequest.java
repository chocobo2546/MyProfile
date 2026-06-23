package backendProfile.gameProfile.modules.project.dto.request;

import backendProfile.gameProfile.common.validation.annotation.SafeInput;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateProjectRequest {
    @SafeInput
    @NotBlank(message = "Title is required")
    @Size(max = 255, message = "Title must not exceed 255 characters")
    private String title;

    @SafeInput
    private String description;

    @SafeInput
    @Size(max = 500, message = "Image URL must not exceed 500 characters")
    private String imageUrl;
}