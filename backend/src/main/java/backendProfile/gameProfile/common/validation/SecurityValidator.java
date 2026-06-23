package backendProfile.gameProfile.common.validation;

import java.util.regex.Pattern;

public final class SecurityValidator {

    private SecurityValidator() {}

    public static MaliciousInputResult analyze(String input) {
        if (input == null || input.isEmpty()) {
            return new MaliciousInputResult(false, null, null);
        }

        for (Pattern pattern : SecurityPatterns.MALICIOUS_PATTERNS) {
            java.util.regex.Matcher matcher = pattern.matcher(input);
            if (matcher.find()) {
                String matched = matcher.group();
                String attackType = classifyAttack(matched);
                return new MaliciousInputResult(true, attackType, matched);
            }
        }

        return new MaliciousInputResult(false, null, null);
    }

    public static boolean isMalicious(String input) {
        return analyze(input).malicious();
    }

    private static String classifyAttack(String matched) {
        String lower = matched.toLowerCase();

        if (lower.contains("<script")) return "XSS: script tag injection";
        if (lower.contains("javascript:")) return "XSS: javascript: URI";
        if (lower.matches("on\\w+\\s*=\\s*")) return "XSS: event handler attribute";
        if (lower.contains("eval(") || lower.contains("alert(") || lower.contains("prompt(") || lower.contains("confirm("))
            return "XSS: dangerous function call";
        if (lower.contains("document.cookie") || lower.contains("document.write") || lower.contains("document.location"))
            return "XSS: document property access";
        if (lower.contains("window.")) return "XSS: window object access";
        if (lower.contains("fromcharcode")) return "XSS: encoded script";

        if (lower.contains("union") || lower.contains("select")) return "SQL Injection: UNION SELECT";
        if (lower.contains("drop") && lower.contains("table")) return "SQL Injection: DROP TABLE";
        if (lower.contains("insert") && lower.contains("into")) return "SQL Injection: INSERT INTO";
        if (lower.contains("delete") && lower.contains("from")) return "SQL Injection: DELETE FROM";
        if (lower.contains("update") && lower.contains("set")) return "SQL Injection: UPDATE";
        if (lower.contains("create") && lower.contains("table")) return "SQL Injection: CREATE TABLE";
        if (lower.contains("alter") && lower.contains("table")) return "SQL Injection: ALTER TABLE";
        if (lower.contains("truncate")) return "SQL Injection: TRUNCATE";
        if (lower.contains("exec") || lower.contains("execute")) return "SQL Injection: EXEC/EXECUTE";
        if (lower.contains("1=1")) return "SQL Injection: tautology";
        if (lower.contains("' or ") || lower.contains("'--") || lower.contains("' #")) return "SQL Injection: comment injection";

        if (lower.contains("$(")) return "Command Injection: $() substitution";
        if (lower.contains("`")) return "Command Injection: backtick execution";
        if (lower.matches("\\|\\s*(sh|bash|cmd|powershell)")) return "Command Injection: pipe to shell";
        if (lower.matches(";\\s*(sh|bash|cmd|powershell|rm|wget|curl)")) return "Command Injection: semicolon command";
        if (lower.contains("exec(") || lower.contains("system(")) return "Command Injection: exec/system call";
        if (lower.contains("runtime.") || lower.contains("processbuilder")) return "Command Injection: Java process execution";

        if (lower.contains("../") || lower.contains("..\\\\")) return "Path Traversal: directory escape";
        if (lower.matches("\\\\x[0-9a-f]{2}") || lower.matches("\\\\u[0-9a-f]{4}")) return "Encoded malicious payload";

        return "Unknown malicious pattern";
    }

    public record MaliciousInputResult(boolean malicious, String attackType, String matchedPattern) {}
}
