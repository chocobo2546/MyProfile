package backendProfile.gameProfile.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info().title("Game Portfolio CMS API")
                        .version("1.0")
                        .description(
                                """
                                API documentation for Game Portfolio CMS Backend.

                                ## Authentication
                                This API uses HttpOnly cookie-based JWT authentication.
                                After a successful login at `POST /api/v1/auth/login`,
                                the server sets an `access_token` cookie automatically.
                                All subsequent requests include this cookie.

                                To test authenticated endpoints:
                                1. Call `POST /api/v1/auth/login` with email and password
                                2. The cookie is set automatically by your browser/client
                                3. Subsequent requests include the cookie

                                Note: Swagger UI does not support cookie-based auth testing.
                                Use curl, Postman, or the frontend application instead.
                                """))
                .addSecurityItem(new SecurityRequirement().addList("cookieAuth"))
                .components(new Components().addSecuritySchemes("cookieAuth",
                        new SecurityScheme()
                                .type(SecurityScheme.Type.APIKEY)
                                .in(SecurityScheme.In.COOKIE)
                                .name("access_token")
                                .description("JWT access token stored in HttpOnly cookie")));
    }
}
