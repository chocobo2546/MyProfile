package backendProfile.gameProfile.common.validation.exception;

import lombok.Getter;

@Getter
public class MaliciousInputException extends RuntimeException {

    private final String attackType;
    private final String inputPreview;

    public MaliciousInputException(String attackType, String inputPreview) {
        super("Malicious input detected: " + attackType);
        this.attackType = attackType;
        this.inputPreview = inputPreview;
    }
}
