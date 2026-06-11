package backendProfile.gameProfile.modules.auth.mapper;

import backendProfile.gameProfile.modules.auth.dto.response.UserResponse;
import backendProfile.gameProfile.modules.auth.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserResponse toResponse(User user) {
        if (user == null) {
            return null;
        }
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .role(user.getRole() != null ? user.getRole().getName() : null)
                .build();
    }
}