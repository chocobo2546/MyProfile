package backendProfile.gameProfile.modules.auth.service;

import backendProfile.gameProfile.common.exception.DuplicateEmailException;
import backendProfile.gameProfile.common.exception.InvalidCredentialsException;
import backendProfile.gameProfile.modules.auth.dto.request.LoginRequest;
import backendProfile.gameProfile.modules.auth.dto.request.RegisterRequest;
import backendProfile.gameProfile.modules.auth.dto.response.UserResponse;
import backendProfile.gameProfile.modules.auth.entity.Role;
import backendProfile.gameProfile.modules.auth.entity.User;
import backendProfile.gameProfile.modules.auth.mapper.UserMapper;
import backendProfile.gameProfile.modules.auth.repository.RoleRepository;
import backendProfile.gameProfile.modules.auth.repository.UserRepository;
import backendProfile.gameProfile.security.JwtUtil;
import backendProfile.gameProfile.security.UserDetailsImpl;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock private UserRepository userRepository;
    @Mock private RoleRepository roleRepository;
    @Mock private PasswordEncoder passwordEncoder;
    @Mock private AuthenticationManager authenticationManager;
    @Mock private JwtUtil jwtUtil;
    @Mock private HttpServletResponse response;

    private AuthService authService;
    private UserMapper userMapper;

    @BeforeEach
    void setUp() {
        userMapper = new UserMapper();
        authService = new AuthService(userRepository, roleRepository, passwordEncoder,
                authenticationManager, jwtUtil, userMapper);
        ReflectionTestUtils.setField(authService, "jwtExpiration", 86400000L);
        ReflectionTestUtils.setField(authService, "cookieSecure", false);
    }

    @Test
    void register_shouldSaveUser_whenEmailIsUnique() {
        RegisterRequest request = new RegisterRequest("new@test.com", "password123");
        Role userRole = Role.builder().id(1L).name("ROLE_USER").build();

        when(userRepository.existsByEmail("new@test.com")).thenReturn(false);
        when(roleRepository.findByName("ROLE_USER")).thenReturn(Optional.of(userRole));
        when(passwordEncoder.encode("password123")).thenReturn("encoded");

        authService.register(request);

        verify(userRepository).save(any(User.class));
    }

    @Test
    void register_shouldThrow_whenEmailExists() {
        RegisterRequest request = new RegisterRequest("existing@test.com", "password123");
        when(userRepository.existsByEmail("existing@test.com")).thenReturn(true);

        assertThrows(DuplicateEmailException.class, () -> authService.register(request));
        verify(userRepository, never()).save(any());
    }

    @Test
    void login_shouldReturnUserResponse_whenValidCredentials() {
        LoginRequest request = new LoginRequest("admin@test.com", "password123");
        User user = User.builder().id(1L).email("admin@test.com").build();
        user.setRole(Role.builder().id(1L).name("ROLE_ADMIN").build());
        UserDetailsImpl userDetails = new UserDetailsImpl(user);
        Authentication auth = new UsernamePasswordAuthenticationToken(userDetails, null,
                List.of(new SimpleGrantedAuthority("ROLE_ADMIN")));

        when(authenticationManager.authenticate(any())).thenReturn(auth);
        when(jwtUtil.generateToken("admin@test.com", 1L, List.of("ROLE_ADMIN"))).thenReturn("jwt.token.here");

        UserResponse result = authService.login(request, response);

        assertEquals(1L, result.getId());
        assertEquals("admin@test.com", result.getEmail());
        assertEquals("ROLE_ADMIN", result.getRole());
        verify(response).addCookie(any());
    }

    @Test
    void login_shouldThrow_whenInvalidCredentials() {
        LoginRequest request = new LoginRequest("wrong@test.com", "wrongpass");
        when(authenticationManager.authenticate(any())).thenThrow(BadCredentialsException.class);

        assertThrows(InvalidCredentialsException.class, () -> authService.login(request, response));
    }

    @Test
    void logout_shouldClearCookie() {
        authService.logout(response);
        ArgumentCaptor<jakarta.servlet.http.Cookie> captor = ArgumentCaptor.forClass(jakarta.servlet.http.Cookie.class);
        verify(response).addCookie(captor.capture());
        assertEquals(0, captor.getValue().getMaxAge());
    }

    @Test
    void getCurrentUser_shouldReturnUser_whenAuthenticated() {
        User user = User.builder().id(1L).email("user@test.com").build();
        user.setRole(Role.builder().id(1L).name("ROLE_USER").build());
        UserDetailsImpl userDetails = new UserDetailsImpl(user);

        org.springframework.security.core.Authentication auth = mock(org.springframework.security.core.Authentication.class);
        when(auth.isAuthenticated()).thenReturn(true);
        when(auth.getPrincipal()).thenReturn(userDetails);
        org.springframework.security.core.context.SecurityContextHolder.getContext().setAuthentication(auth);

        when(userRepository.findByEmail("user@test.com")).thenReturn(Optional.of(user));

        UserResponse result = authService.getCurrentUser();
        assertEquals("user@test.com", result.getEmail());
    }
}