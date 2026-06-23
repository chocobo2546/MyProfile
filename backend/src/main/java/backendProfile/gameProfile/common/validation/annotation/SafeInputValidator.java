package backendProfile.gameProfile.common.validation.annotation;

import backendProfile.gameProfile.common.validation.SecurityValidator;
import backendProfile.gameProfile.common.validation.SecurityValidator.MaliciousInputResult;
import backendProfile.gameProfile.common.validation.exception.MaliciousInputException;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class SafeInputValidator implements ConstraintValidator<SafeInput, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isEmpty()) {
            return true;
        }

        MaliciousInputResult result = SecurityValidator.analyze(value);
        if (result.malicious()) {
            throw new MaliciousInputException(result.attackType(), value.length() > 50 ? value.substring(0, 50) + "..." : value);
        }

        return true;
    }
}
