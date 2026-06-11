package backendProfile.gameProfile.modules.auth.controller;

import backendProfile.gameProfile.common.response.ApiResponse;
import backendProfile.gameProfile.modules.auth.dto.request.LoginRequest;
import backendProfile.gameProfile.modules.auth.dto.request.RegisterRequest;
import backendProfile.gameProfile.modules.auth.dto.response.UserResponse;
import backendProfile.gameProfile.modules.auth.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Void>> register(@Valid @RequestBody RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Register Success"));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<UserResponse>> login(@Valid @RequestBody LoginRequest request,
                                                           HttpServletResponse response) {
        UserResponse userResponse = authService.login(request, response);
        return ResponseEntity.ok(ApiResponse.success("Login Success", userResponse));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(HttpServletResponse response) {
        authService.logout(response);
        return ResponseEntity.ok(ApiResponse.success("Logout Success"));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> getMe() {
        UserResponse userResponse = authService.getCurrentUser();
        return ResponseEntity.ok(ApiResponse.success("Operation Success", userResponse));
    }
}