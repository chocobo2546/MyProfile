import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Button } from "../components/ui/Button";
import { isMaliciousInput } from "../utils/securityValidator";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LoginPage = () => {
  const navigate = useNavigate();
  const {
    login,
    isLoading,
    error,
    fieldErrors,
    clearError,
    clearFieldError,
  } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [securityStep, setSecurityStep] = useState(1);

  const validate = (): Record<string, string> => {
    const errs: Record<string, string> = {};
    if (!email.trim()) {
      errs.email = "Email is required";
    } else if (!EMAIL_REGEX.test(email)) {
      errs.email = "Invalid email format";
    }
    if (!password) {
      errs.password = "Password is required";
    }
    return errs;
  };

  const clientErrors = validate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setTouched({ email: true, password: true });
      return;
    }
    const emailCheck = isMaliciousInput(email);
    const passwordCheck = isMaliciousInput(password);
    if (emailCheck.malicious || passwordCheck.malicious) {
      setSecurityStep(1);
      setShowSecurityModal(true);
      return;
    }
    const success = await login(email, password);
    if (success) {
      navigate("/");
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

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
    touched[field] && (clientErrors[field] || fieldErrors[field]);

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
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          position: "relative",
        }}
      >
        <form
          onSubmit={handleSubmit}
          noValidate
          style={{
            width: "100%",
            maxWidth: 380,
          }}
        >
          <h1 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: ".3rem" }}>
            Welcome back
          </h1>
          <p style={{ color: "#888", marginBottom: "2rem", fontSize: ".9rem" }}>
            Sign in to your account
          </p>

          <div className="form-group" style={{ marginBottom: "1.2rem" }}>
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
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearFieldError("email");
              }}
              required
              placeholder="you@example.com"
              style={{
                ...inputStyle,
                borderColor: showError("email") ? "#ff5252" : undefined,
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#00c853";
                e.target.style.boxShadow = "0 0 0 3px rgba(0,200,83,0.12)";
              }}
              onBlur={(e) => {
                handleBlur("email");
                if (!clientErrors.email && !fieldErrors.email) {
                  e.target.style.borderColor = "rgba(255,255,255,0.06)";
                  e.target.style.boxShadow = "none";
                }
              }}
            />
            {showError("email") && (
              <div style={errorStyle}>
                {clientErrors.email || fieldErrors.email}
              </div>
            )}
          </div>

          <div className="form-group" style={{ marginBottom: "1.2rem" }}>
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
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearFieldError("password");
              }}
              required
              placeholder="password"
              style={{
                ...inputStyle,
                borderColor: showError("password") ? "#ff5252" : undefined,
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#00c853";
                e.target.style.boxShadow = "0 0 0 3px rgba(0,200,83,0.12)";
              }}
              onBlur={(e) => {
                handleBlur("password");
                if (!clientErrors.password && !fieldErrors.password) {
                  e.target.style.borderColor = "rgba(255,255,255,0.06)";
                  e.target.style.boxShadow = "none";
                }
              }}
            />
            {showError("password") && (
              <div style={errorStyle}>
                {clientErrors.password || fieldErrors.password}
              </div>
            )}
            {error && !fieldErrors.email && !fieldErrors.password && (
              <div style={errorStyle}>{error === "Something went wrong" ? "password is not correct" : error}</div>
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

          <div
            style={{
              fontSize: ".85rem",
              color: "#888",
              marginTop: "1rem",
              textAlign: "center",
            }}
          >
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              style={{ color: "#00c853", fontWeight: 600, cursor: "pointer" }}
            >
              Register
            </Link>
          </div>
        </form>
      </div>

      <div
        className="auth-image-col"
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          position: "relative",
          background: "#1a1a1a",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
            position: "relative",
            width: "100%",
            maxWidth: 480,
          }}
        >
          <svg
            width="128"
            height="128"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#00c853"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: 0.3 }}
          >
            <line x1="6" y1="11" x2="10" y2="11" />
            <line x1="8" y1="9" x2="8" y2="13" />
            <line x1="15" y1="12" x2="15.01" y2="12" />
            <line x1="18" y1="10" x2="18.01" y2="10" />
            <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" />
          </svg>
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
              {securityStep === 1 ? "🫵🏼" : "❤️"}
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
        }
      `}</style>
    </div>
  );
};
