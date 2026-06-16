package backendProfile.gameProfile.common.filter;

import backendProfile.gameProfile.event.VisitorEvent;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class VisitorTrackingFilter extends OncePerRequestFilter {

    private final ApplicationEventPublisher eventPublisher;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        filterChain.doFilter(request, response);

        if (shouldTrack(request)) {
            try {
                String ip = extractIp(request);
                String device = request.getHeader("User-Agent");
                String country = extractCountry(ip);

                eventPublisher.publishEvent(new VisitorEvent(this, null, ip, country, device));
                log.debug("Tracked visitor from IP: {}", ip);
            } catch (Exception e) {
                log.warn("Failed to track visitor", e);
            }
        }
    }

    private boolean shouldTrack(HttpServletRequest request) {
        String uri = request.getRequestURI();
        if (!uri.startsWith("/api/")) return false;
        if (uri.startsWith("/api/v1/auth/")) return false;
        if (uri.startsWith("/api/v1/analytics/")) return false;
        if ("GET".equalsIgnoreCase(request.getMethod())) return true;
        return false;
    }

    private String extractIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Real-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        if (ip != null && ip.contains(",")) {
            ip = ip.split(",")[0].trim();
        }
        return ip;
    }

    private String extractCountry(String ip) {
        if (ip == null || ip.equals("0:0:0:0:0:0:0:1") || ip.equals("127.0.0.1") || ip.equals("localhost")) {
            return "Local";
        }
        return "Unknown";
    }
}