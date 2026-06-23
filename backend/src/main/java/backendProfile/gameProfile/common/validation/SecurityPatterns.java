package backendProfile.gameProfile.common.validation;

import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;

public final class SecurityPatterns {

    private SecurityPatterns() {}

    public static final List<Pattern> MALICIOUS_PATTERNS = Arrays.asList(
        Pattern.compile("<script", Pattern.CASE_INSENSITIVE),
        Pattern.compile("javascript\\s*:", Pattern.CASE_INSENSITIVE),
        Pattern.compile("on\\w+\\s*=", Pattern.CASE_INSENSITIVE),
        Pattern.compile("eval\\s*\\(", Pattern.CASE_INSENSITIVE),
        Pattern.compile("alert\\s*\\(", Pattern.CASE_INSENSITIVE),
        Pattern.compile("prompt\\s*\\(", Pattern.CASE_INSENSITIVE),
        Pattern.compile("confirm\\s*\\(", Pattern.CASE_INSENSITIVE),
        Pattern.compile("document\\.(cookie|write|location)", Pattern.CASE_INSENSITIVE),
        Pattern.compile("window\\.", Pattern.CASE_INSENSITIVE),
        Pattern.compile("fromCharCode", Pattern.CASE_INSENSITIVE),
        Pattern.compile("\\bUNION\\b.*\\bSELECT\\b", Pattern.CASE_INSENSITIVE),
        Pattern.compile("\\bDROP\\b.*\\bTABLE\\b", Pattern.CASE_INSENSITIVE),
        Pattern.compile("\\bINSERT\\b.*\\bINTO\\b", Pattern.CASE_INSENSITIVE),
        Pattern.compile("\\bDELETE\\b.*\\bFROM\\b", Pattern.CASE_INSENSITIVE),
        Pattern.compile("\\bUPDATE\\b.*\\bSET\\b", Pattern.CASE_INSENSITIVE),
        Pattern.compile("\\bCREATE\\b.*\\bTABLE\\b", Pattern.CASE_INSENSITIVE),
        Pattern.compile("\\bALTER\\b.*\\bTABLE\\b", Pattern.CASE_INSENSITIVE),
        Pattern.compile("\\bTRUNCATE\\b", Pattern.CASE_INSENSITIVE),
        Pattern.compile("\\bEXEC\\b", Pattern.CASE_INSENSITIVE),
        Pattern.compile("\\bEXECUTE\\b", Pattern.CASE_INSENSITIVE),
        Pattern.compile("'.*\\bOR\\b.*'", Pattern.CASE_INSENSITIVE),
        Pattern.compile("'.*--", Pattern.CASE_INSENSITIVE),
        Pattern.compile("'.*\\#", Pattern.CASE_INSENSITIVE),
        Pattern.compile("\\b1=1\\b"),
        Pattern.compile("'.*'\\s*="),
        Pattern.compile("`[^`]*`"),
        Pattern.compile("\\$\\("),
        Pattern.compile("\\|\\s*(sh|bash|cmd|powershell)", Pattern.CASE_INSENSITIVE),
        Pattern.compile(";\\s*(sh|bash|cmd|powershell|rm|wget|curl)", Pattern.CASE_INSENSITIVE),
        Pattern.compile("\\$\\(.*\\)"),
        Pattern.compile("\\bexec\\s*\\(", Pattern.CASE_INSENSITIVE),
        Pattern.compile("\\bsystem\\s*\\(", Pattern.CASE_INSENSITIVE),
        Pattern.compile("\\bRuntime\\.", Pattern.CASE_INSENSITIVE),
        Pattern.compile("\\bProcessBuilder\\b"),
        Pattern.compile("\\.\\.\\/"),
        Pattern.compile("\\.\\.\\\\"),
        Pattern.compile("\\\\x[0-9a-fA-F]{2}"),
        Pattern.compile("\\\\u[0-9a-fA-F]{4}")
    );

    public static final List<Pattern> SUSPICIOUS_HEADER_PATTERNS = Arrays.asList(
        Pattern.compile("\\b(bot|crawler|spider|scraper|curl|wget|python-requests|java/|libwww)", Pattern.CASE_INSENSITIVE)
    );
}
