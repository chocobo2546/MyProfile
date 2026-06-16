package backendProfile.gameProfile.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class JwtUtilTest {

    private JwtUtil jwtUtil;

    @BeforeEach
    void setUp() {
        jwtUtil = new JwtUtil();
        ReflectionTestUtils.setField(jwtUtil, "secret", "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970");
        ReflectionTestUtils.setField(jwtUtil, "expiration", 86400000L);
    }

    @Test
    void generateToken_shouldReturnValidJwt() {
        String token = jwtUtil.generateToken("test@test.com", 1L, List.of("ROLE_USER"));
        assertNotNull(token);
        assertTrue(token.startsWith("eyJ"));
    }

    @Test
    void extractEmail_shouldReturnCorrectEmail() {
        String token = jwtUtil.generateToken("test@test.com", 1L, List.of("ROLE_USER"));
        assertEquals("test@test.com", jwtUtil.extractEmail(token));
    }

    @Test
    void extractUserId_shouldReturnCorrectId() {
        String token = jwtUtil.generateToken("test@test.com", 42L, List.of("ROLE_USER"));
        assertEquals(42L, jwtUtil.extractUserId(token));
    }

    @Test
    void extractRoles_shouldReturnCorrectRoles() {
        String token = jwtUtil.generateToken("test@test.com", 1L, List.of("ROLE_USER"));
        List<String> roles = jwtUtil.extractRoles(token);
        assertTrue(roles.contains("ROLE_USER"));
    }

    @Test
    void validateToken_shouldReturnTrueForValidToken() {
        String token = jwtUtil.generateToken("test@test.com", 1L, List.of("ROLE_USER"));
        assertTrue(jwtUtil.validateToken(token));
    }

    @Test
    void validateToken_shouldReturnFalseForInvalidToken() {
        assertFalse(jwtUtil.validateToken("invalid.token.here"));
    }

    @Test
    void generateToken_shouldAddRolePrefixIfMissing() {
        String token = jwtUtil.generateToken("test@test.com", 1L, List.of("USER"));
        List<String> roles = jwtUtil.extractRoles(token);
        assertTrue(roles.contains("ROLE_USER"));
    }
}