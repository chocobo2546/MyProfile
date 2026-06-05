package backendProfile.gameProfile.modules.auth;

import com.portfolio.common.response.ApiResponse;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    // POST /api/v1/auth/register
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Void>> register(
            @RequestBody Object request) {
        // Phase 5 — Auth
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    // POST /api/v1/auth/login
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Void>> login(
            @RequestBody Object request,
            HttpServletResponse response) {
        // Phase 5 — sets HttpOnly cookie with JWT
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    // POST /api/v1/auth/logout
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(
            HttpServletResponse response) {
        // Phase 5 — clears cookie
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    // GET /api/v1/auth/me
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<Void>> me() {
        // Phase 5 — returns current user from JWT
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    // POST /api/v1/auth/refresh
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<Void>> refresh(
            HttpServletResponse response) {
        // Phase 5 — rotates access token via refresh token
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
