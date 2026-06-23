const MALICIOUS_PATTERNS: RegExp[] = [
  /<script/i,
  /javascript\s*:/i,
  /on\w+\s*=/i,
  /eval\s*\(/i,
  /alert\s*\(/i,
  /prompt\s*\(/i,
  /confirm\s*\(/i,
  /document\.(cookie|write|location)/i,
  /window\./i,
  /fromCharCode/i,
  /\bUNION\b.*\bSELECT\b/i,
  /\bDROP\b.*\bTABLE\b/i,
  /\bINSERT\b.*\bINTO\b/i,
  /\bDELETE\b.*\bFROM\b/i,
  /\bUPDATE\b.*\bSET\b/i,
  /\bCREATE\b.*\bTABLE\b/i,
  /\bALTER\b.*\bTABLE\b/i,
  /\bTRUNCATE\b/i,
  /\bEXEC\b/i,
  /\bEXECUTE\b/i,
  /'.*\bOR\b.*'/i,
  /'.*--/i,
  /'.*#/i,
  /\b1=1\b/,
  /`/,
  /\$\(/,
  /\|\s*(sh|bash|cmd|powershell)/i,
  /;\s*(sh|bash|cmd|powershell|rm|wget|curl)/i,
  /\bexec\s*\(/i,
  /\bsystem\s*\(/i,
  /\.\.\//,
  /\.\.\\/,
];

export interface SecurityCheckResult {
  malicious: boolean;
  attackType?: string;
  matchedPattern?: string;
}

export const isMaliciousInput = (value: string): SecurityCheckResult => {
  if (!value || typeof value !== "string") {
    return { malicious: false };
  }

  for (const pattern of MALICIOUS_PATTERNS) {
    const match = value.match(pattern);
    if (match) {
      const matched = match[0];
      const attackType = classifyAttack(matched);
      return { malicious: true, attackType, matchedPattern: matched };
    }
  }

  return { malicious: false };
};

const classifyAttack = (matched: string): string => {
  const lower = matched.toLowerCase();

  if (lower.includes("<script")) return "XSS: script tag injection";
  if (lower.includes("javascript:")) return "XSS: javascript: URI";
  if (/^on\w+\s*=\s*$/.test(lower)) return "XSS: event handler attribute";
  if (lower.includes("eval(") || lower.includes("alert(") || lower.includes("prompt(") || lower.includes("confirm("))
    return "XSS: dangerous function call";
  if (lower.includes("document.cookie") || lower.includes("document.write") || lower.includes("document.location"))
    return "XSS: document property access";
  if (lower.includes("window.")) return "XSS: window object access";
  if (lower.includes("fromcharcode")) return "XSS: encoded script";

  if (lower.includes("union") || lower.includes("select")) return "SQL Injection: UNION SELECT";
  if (lower.includes("drop") && lower.includes("table")) return "SQL Injection: DROP TABLE";
  if (lower.includes("insert") && lower.includes("into")) return "SQL Injection: INSERT INTO";
  if (lower.includes("delete") && lower.includes("from")) return "SQL Injection: DELETE FROM";
  if (lower.includes("update") && lower.includes("set")) return "SQL Injection: UPDATE";
  if (lower.includes("create") && lower.includes("table")) return "SQL Injection: CREATE TABLE";
  if (lower.includes("alter") && lower.includes("table")) return "SQL Injection: ALTER TABLE";
  if (lower.includes("truncate")) return "SQL Injection: TRUNCATE";
  if (lower.includes("exec") || lower.includes("execute")) return "SQL Injection: EXEC/EXECUTE";
  if (lower.includes("1=1")) return "SQL Injection: tautology";
  if (lower.includes("' or ") || lower.includes("'--") || lower.includes("' #")) return "SQL Injection: comment injection";

  if (lower.includes("$(")) return "Command Injection: $() substitution";
  if (lower.includes("`")) return "Command Injection: backtick execution";
  if (/^\|\s*(sh|bash|cmd|powershell)$/.test(lower)) return "Command Injection: pipe to shell";
  if (/^;\s*(sh|bash|cmd|powershell|rm|wget|curl)$/.test(lower)) return "Command Injection: semicolon command";
  if (lower.includes("exec(") || lower.includes("system(")) return "Command Injection: exec/system call";

  if (lower.includes("../") || lower.includes("..\\")) return "Path Traversal: directory escape";

  return "Unknown malicious pattern";
};
