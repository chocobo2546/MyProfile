package backendProfile.gameProfile.event;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class VisitorEvent extends ApplicationEvent {
    private final Long userId;
    private final String ip;
    private final String country;
    private final String device;

    public VisitorEvent(Object source, Long userId, String ip, String country, String device) {
        super(source);
        this.userId = userId;
        this.ip = ip;
        this.country = country;
        this.device = device;
    }
}
