package backendProfile.gameProfile.modules.auth.dto.request;

import backendProfile.gameProfile.common.validation.annotation.SafeInput;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    @SafeInput
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @SafeInput
    @NotBlank(message = "Password is required")
    private String password;
}