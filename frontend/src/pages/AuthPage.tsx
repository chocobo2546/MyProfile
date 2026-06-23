import { useState, useRef, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Button } from "../components/ui/Button";
import { isMaliciousInput } from "../utils/securityValidator";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
type AuthMode = "login" | "register";

export const AuthPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialMode = (searchParams.get("mode") as AuthMode) || "login";

  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [animating, setAnimating] = useState(false);
  const [flip, setFlip] = useState(initialMode === "register");
  const animTimeout = useRef<ReturnType<typeof setTimeout>>();

  const {
    login,
    register,
    isLoading,
    error,
    fieldErrors,
    clearError,
    clearFieldError,
  } = useAuthStore();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginTouched, setLoginTouched] = useState<Record<string, boolean>>({});

  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [regTouched, setRegTouched] = useState<Record<string, boolean>>({});

  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [securityStep, setSecurityStep] = useState(1);

  const validateLogin = (): Record<string, string> => {
    const errs: Record<string, string> = {};
    if (!loginEmail.trim()) errs.email = "Email is required";
    else if (!EMAIL_REGEX.test(loginEmail)) errs.email = "Invalid email format";
    if (!loginPassword) errs.password = "Password is required";
    return errs;
  };

  const validateRegister = (): Record<string, string> => {
    const errs: Record<string, string> = {};
    if (!regEmail.trim()) errs.email = "Email is required";
    else if (!EMAIL_REGEX.test(regEmail)) errs.email = "Invalid email format";
    if (!regPassword) errs.password = "Password is required";
    else if (regPassword.length < 6) errs.password = "Password must be at least 6 characters";
    if (!regConfirmPassword) errs.confirmPassword = "Please confirm your password";
    else if (regPassword !== regConfirmPassword) errs.confirmPassword = "Passwords do not match";
    return errs;
  };

  const loginErrors = validateLogin();
  const registerErrors = validateRegister();

  const activeErrors = mode === "login" ? loginErrors : registerErrors;
  const activeTouched = mode === "login" ? loginTouched : regTouched;
  const setActiveTouched = mode === "login" ? setLoginTouched : setRegTouched;

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: ".8rem 1rem",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.06)",
    background: "#1a1a1a",
    color: "#e0e0e0",
    fontSize: ".9rem",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.3s, box-shadow 0.3s",
  };

  const errorStyle: React.CSSProperties = {
    fontSize: ".75rem",
    color: "#ff5252",
    marginTop: ".3rem",
  };

  const showError = (field: string) =>
    activeTouched[field] && (activeErrors[field] || fieldErrors[field]);

  const handleBlur = (field: string) => {
    setActiveTouched((prev: Record<string, boolean>) => ({ ...prev, [field]: true }));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    const errs = validateLogin();
    if (Object.keys(errs).length > 0) {
      setLoginTouched({ email: true, password: true });
      return;
    }
    const emailCheck = isMaliciousInput(loginEmail);
    const passwordCheck = isMaliciousInput(loginPassword);
    if (emailCheck.malicious || passwordCheck.malicious) {
      setSecurityStep(1);
      setShowSecurityModal(true);
      return;
    }
    const success = await login(loginEmail, loginPassword);
    if (success) navigate("/");
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    const errs = validateRegister();
    if (Object.keys(errs).length > 0) {
      setRegTouched({ email: true, password: true, confirmPassword: true });
      return;
    }
    const emailCheck = isMaliciousInput(regEmail);
    const passwordCheck = isMaliciousInput(regPassword);
    const confirmCheck = isMaliciousInput(regConfirmPassword);
    if (emailCheck.malicious || passwordCheck.malicious || confirmCheck.malicious) {
      setSecurityStep(1);
      setShowSecurityModal(true);
      return;
    }
    const success = await register(regEmail, regPassword);
    if (success) navigate("/auth?mode=login", { replace: true });
  };

  const toggleMode = useCallback(
    (newMode: AuthMode) => {
      if (animating || newMode === mode) return;
      setAnimating(true);
      clearError();

      if (newMode === "login") {
        setFlip(false);
        setTimeout(() => setMode("login"), 80);
      } else {
        setFlip(true);
        setTimeout(() => setMode("register"), 80);
      }

      setSearchParams({ mode: newMode }, { replace: true });

      if (animTimeout.current) clearTimeout(animTimeout.current);
      animTimeout.current = setTimeout(() => {
        setAnimating(false);
      }, 900);
    },
    [animating, mode, clearError, setSearchParams]
  );

  const dividerStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "calc(50% - 0.5px)",
    width: 1,
    zIndex: 10,
    pointerEvents: "none",
    transition: "all 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
    ...(animating
      ? {
          background:
            "linear-gradient(to bottom, transparent, rgba(0,200,83,0.35), transparent)",
          boxShadow: "0 0 16px rgba(0,200,83,0.25)",
          transform: "scaleY(1.15)",
        }
      : {
          background:
            "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent)",
        }),
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "calc(100vh - 64px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="auth-form-col"
        style={{
          width: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          minHeight: "calc(100vh - 64px)",
          position: "relative",
          zIndex: 2,
          transition: "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
          transform: flip ? "translateX(100%)" : "translateX(0)",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 380,
            position: "relative",
          }}
        >
          <div
            style={{
              width: "100%",
              transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
              ...(mode !== "login"
                ? {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    opacity: 0,
                    transform: "translateX(-24px) scale(0.97)",
                    pointerEvents: "none" as const,
                  }
                : {}),
            }}
          >
            <h1 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: ".3rem" }}>
              Welcome back
            </h1>
            <p style={{ color: "#888", marginBottom: "2rem", fontSize: ".9rem" }}>
              Sign in to your account
            </p>
            <form onSubmit={handleLoginSubmit} noValidate>
              <div style={{ marginBottom: "1.2rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: ".8rem",
                    fontWeight: 500,
                    color: "#888",
                    marginBottom: ".4rem",
                    textTransform: "uppercase",
                    letterSpacing: ".5px",
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => {
                    setLoginEmail(e.target.value);
                    clearFieldError("email");
                  }}
                  required
                  placeholder="you@example.com"
                  style={{
                    ...inputStyle,
                    borderColor:
                      loginTouched.email &&
                      (loginErrors.email || fieldErrors.email)
                        ? "#ff5252"
                        : undefined,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#00c853";
                    e.target.style.boxShadow = "0 0 0 3px rgba(0,200,83,0.12)";
                  }}
                  onBlur={(e) => {
                    handleBlur("email");
                    if (!loginErrors.email && !fieldErrors.email) {
                      e.target.style.borderColor = "rgba(255,255,255,0.06)";
                      e.target.style.boxShadow = "none";
                    }
                  }}
                />
                {loginTouched.email &&
                  (loginErrors.email || fieldErrors.email) && (
                    <div style={errorStyle}>
                      {loginErrors.email || fieldErrors.email}
                    </div>
                  )}
              </div>
              <div style={{ marginBottom: "1.2rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: ".8rem",
                    fontWeight: 500,
                    color: "#888",
                    marginBottom: ".4rem",
                    textTransform: "uppercase",
                    letterSpacing: ".5px",
                  }}
                >
                  Password
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => {
                    setLoginPassword(e.target.value);
                    clearFieldError("password");
                  }}
                  required
                  placeholder="password"
                  style={{
                    ...inputStyle,
                    borderColor:
                      loginTouched.password &&
                      (loginErrors.password || fieldErrors.password)
                        ? "#ff5252"
                        : undefined,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#00c853";
                    e.target.style.boxShadow = "0 0 0 3px rgba(0,200,83,0.12)";
                  }}
                  onBlur={(e) => {
                    handleBlur("password");
                    if (!loginErrors.password && !fieldErrors.password) {
                      e.target.style.borderColor = "rgba(255,255,255,0.06)";
                      e.target.style.boxShadow = "none";
                    }
                  }}
                />
                {loginTouched.password &&
                  (loginErrors.password || fieldErrors.password) && (
                    <div style={errorStyle}>
                      {loginErrors.password || fieldErrors.password}
                    </div>
                  )}
                {error &&
                  !fieldErrors.email &&
                  !fieldErrors.password &&
                  mode === "login" && (
                    <div style={errorStyle}>
                      {error === "Something went wrong"
                        ? "password is not correct"
                        : error}
                    </div>
                  )}
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                width="100%"
                height={48}
                fontSize={16}
                style={{ justifyContent: "center" }}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            <div
              style={{
                fontSize: ".85rem",
                color: "#888",
                marginTop: "1rem",
                textAlign: "center",
              }}
            >
              Don&apos;t have an account?{" "}
              <span
                onClick={() => toggleMode("register")}
                style={{
                  color: "#00c853",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Register
              </span>
            </div>
          </div>

          <div
            style={{
              width: "100%",
              transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
              ...(mode !== "register"
                ? {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    opacity: 0,
                    transform: "translateX(-24px) scale(0.97)",
                    pointerEvents: "none" as const,
                  }
                : {}),
            }}
          >
            <h1 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: ".3rem" }}>
              Create account
            </h1>
            <p style={{ color: "#888", marginBottom: "2rem", fontSize: ".9rem" }}>
              Get started for free
            </p>
            <form onSubmit={handleRegisterSubmit} noValidate>
              <div style={{ marginBottom: "1.2rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: ".8rem",
                    fontWeight: 500,
                    color: "#888",
                    marginBottom: ".4rem",
                    textTransform: "uppercase",
                    letterSpacing: ".5px",
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => {
                    setRegEmail(e.target.value);
                    clearFieldError("email");
                  }}
                  required
                  placeholder="you@example.com"
                  style={{
                    ...inputStyle,
                    borderColor:
                      regTouched.email &&
                      (registerErrors.email || fieldErrors.email)
                        ? "#ff5252"
                        : undefined,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#00c853";
                    e.target.style.boxShadow = "0 0 0 3px rgba(0,200,83,0.12)";
                  }}
                  onBlur={(e) => {
                    handleBlur("email");
                    if (!registerErrors.email && !fieldErrors.email) {
                      e.target.style.borderColor = "rgba(255,255,255,0.06)";
                      e.target.style.boxShadow = "none";
                    }
                  }}
                />
                {regTouched.email &&
                  (registerErrors.email || fieldErrors.email) && (
                    <div style={errorStyle}>
                      {registerErrors.email || fieldErrors.email}
                    </div>
                  )}
              </div>
              <div style={{ marginBottom: "1.2rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: ".8rem",
                    fontWeight: 500,
                    color: "#888",
                    marginBottom: ".4rem",
                    textTransform: "uppercase",
                    letterSpacing: ".5px",
                  }}
                >
                  Password
                </label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => {
                    setRegPassword(e.target.value);
                    clearFieldError("password");
                  }}
                  required
                  placeholder="password"
                  style={{
                    ...inputStyle,
                    borderColor:
                      regTouched.password &&
                      (registerErrors.password || fieldErrors.password)
                        ? "#ff5252"
                        : undefined,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#00c853";
                    e.target.style.boxShadow = "0 0 0 3px rgba(0,200,83,0.12)";
                  }}
                  onBlur={(e) => {
                    handleBlur("password");
                    if (!registerErrors.password && !fieldErrors.password) {
                      e.target.style.borderColor = "rgba(255,255,255,0.06)";
                      e.target.style.boxShadow = "none";
                    }
                  }}
                />
                {regTouched.password &&
                  (registerErrors.password || fieldErrors.password) && (
                    <div style={errorStyle}>
                      {registerErrors.password || fieldErrors.password}
                    </div>
                  )}
              </div>
              <div style={{ marginBottom: "1.2rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: ".8rem",
                    fontWeight: 500,
                    color: "#888",
                    marginBottom: ".4rem",
                    textTransform: "uppercase",
                    letterSpacing: ".5px",
                  }}
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={regConfirmPassword}
                  onChange={(e) => {
                    setRegConfirmPassword(e.target.value);
                    clearFieldError("confirmPassword");
                  }}
                  required
                  placeholder="confirm password"
                  style={{
                    ...inputStyle,
                    borderColor:
                      regTouched.confirmPassword &&
                      (registerErrors.confirmPassword || fieldErrors.confirmPassword)
                        ? "#ff5252"
                        : undefined,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#00c853";
                    e.target.style.boxShadow = "0 0 0 3px rgba(0,200,83,0.12)";
                  }}
                  onBlur={(e) => {
                    handleBlur("confirmPassword");
                    if (!registerErrors.confirmPassword && !fieldErrors.confirmPassword) {
                      e.target.style.borderColor = "rgba(255,255,255,0.06)";
                      e.target.style.boxShadow = "none";
                    }
                  }}
                />
                {regTouched.confirmPassword &&
                  (registerErrors.confirmPassword || fieldErrors.confirmPassword) && (
                    <div style={errorStyle}>
                      {registerErrors.confirmPassword || fieldErrors.confirmPassword}
                    </div>
                  )}
                {error &&
                  !fieldErrors.email &&
                  !fieldErrors.password &&
                  !fieldErrors.confirmPassword &&
                  mode === "register" && (
                    <div style={errorStyle}>{error}</div>
                  )}
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                width="100%"
                height={48}
                fontSize={16}
                style={{ justifyContent: "center" }}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
            <div
              style={{
                fontSize: ".85rem",
                color: "#888",
                marginTop: "1rem",
                textAlign: "center",
              }}
            >
              Already have an account?{" "}
              <span
                onClick={() => toggleMode("login")}
                style={{
                  color: "#00c853",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Sign In
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-divider-col" style={dividerStyle} />

      <div
        className="auth-image-col"
        style={{
          width: "50%",
          position: "relative",
          overflow: "hidden",
          zIndex: 1,
          background: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          transition: "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
          transform: flip ? "translateX(-100%)" : "translateX(0)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
            transform: mode === "login" ? "scale(1)" : "scale(0.94)",
            opacity: mode === "login" ? 1 : 0,
          }}
        >
          <img
            src="/images/imglogin.png"
            alt="Login"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
            transform: mode === "register" ? "scale(1)" : "scale(1.08)",
            opacity: mode === "register" ? 1 : 0,
          }}
        >
          <img
            src="/images/imgregister.png"
            alt="Register"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>

      {showSecurityModal && (
        <div
          onClick={securityStep === 2 ? () => setShowSecurityModal(false) : undefined}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#1a1a1a",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: "2rem 2.5rem",
              textAlign: "center",
              maxWidth: 380,
              width: "90%",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>
              {securityStep === 1 ? "\u{1FAC9}\u{1F3FC}" : "\u2764\uFE0F"}
            </div>
            <h2
              style={{
                fontSize: "1.2rem",
                fontWeight: 600,
                color: "#e0e0e0",
                marginBottom: ".5rem",
              }}
            >
              This is what you were looking for
            </h2>
            {securityStep === 1 ? (
              <button
                onClick={() => setSecurityStep(2)}
                style={{
                  padding: ".6rem 2rem",
                  borderRadius: 8,
                  border: "none",
                  background: "#00c853",
                  color: "#0a0a0a",
                  fontWeight: 600,
                  fontSize: ".9rem",
                  cursor: "pointer",
                }}
              >
                click
              </button>
            ) : (
              <button
                onClick={() => setShowSecurityModal(false)}
                style={{
                  padding: ".6rem 2rem",
                  borderRadius: 8,
                  border: "none",
                  background: "#00c853",
                  color: "#0a0a0a",
                  fontWeight: 600,
                  fontSize: ".9rem",
                  cursor: "pointer",
                }}
              >
                close
              </button>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .auth-image-col { display: none !important; }
          .auth-form-col { width: 100% !important; transform: none !important; }
          .auth-divider-col { display: none !important; }
        }
      `}</style>
    </div>
  );
};
