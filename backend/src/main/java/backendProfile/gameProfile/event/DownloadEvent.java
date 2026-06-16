package backendProfile.gameProfile.event;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class DownloadEvent extends ApplicationEvent {
    private final Long userId;
    private final String fileName;
    private final String ip;

    public DownloadEvent(Object source, Long userId, String fileName, String ip) {
        super(source);
        this.userId = userId;
        this.fileName = fileName;
        this.ip = ip;
    }
}
