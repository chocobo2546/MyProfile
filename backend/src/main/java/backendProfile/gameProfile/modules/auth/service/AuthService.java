package backendProfile.gameProfile.modules.auth.service;

import backendProfile.gameProfile.common.exception.DuplicateEmailException;
import backendProfile.gameProfile.common.exception.InvalidCredentialsException;
import backendProfile.gameProfile.common.util.CookieUtil;
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
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserMapper userMapper;

    @Value("${jwt.expiration}")
    private Long jwtExpiration;

    @Value("${cookie.secure:false}")
    private boolean cookieSecure;

    @Transactional
    public void register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateEmailException("Email already in use: " + request.getEmail());
        }

        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new IllegalStateException("ROLE_USER not found in database"));

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(userRole)
                .build();

        userRepository.save(user);
        log.info("Registered new user: {}", request.getEmail());
    }

    public UserResponse login(LoginRequest request, HttpServletResponse response) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            String token = jwtUtil.generateToken(
                    userDetails.getUsername(),
                    userDetails.getId(),
                    userDetails.getAuthorities().stream()
                            .map(authority -> authority.getAuthority())
                            .toList()
            );

            CookieUtil.addCookie(response, "access_token", token, jwtExpiration / 1000, cookieSecure);

            return UserResponse.builder()
                    .id(userDetails.getId())
                    .email(userDetails.getUsername())
                    .role(userDetails.getAuthorities().iterator().next().getAuthority())
                    .build();

        } catch (BadCredentialsException e) {
            throw new InvalidCredentialsException("Invalid email or password");
        }
    }

    public void logout(HttpServletResponse response) {
        CookieUtil.clearCookie(response, "access_token");
        log.debug("User logged out, cookie cleared");
    }

    @Transactional(readOnly = true)
    public UserResponse getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new InvalidCredentialsException("User not authenticated");
        }

        Object principal = authentication.getPrincipal();
        if (principal instanceof UserDetailsImpl userDetails) {
            // Fetch fresh user from database to get latest role/email
            User user = userRepository.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new InvalidCredentialsException("User not found"));
            return userMapper.toResponse(user);
        } else {
            throw new InvalidCredentialsException("Invalid principal type");
        }
    }
}