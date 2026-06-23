import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Button } from "../components/ui/Button";
import { isMaliciousInput } from "../utils/securityValidator";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    isLoading,
    error,
    fieldErrors,
    clearError,
    clearFieldError,
  } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    } else if (password.length < 6) {
      errs.password = "Password must be at least 6 characters";
    }
    if (!confirmPassword) {
      errs.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      errs.confirmPassword = "Passwords do not match";
    }
    return errs;
  };

  const clientErrors = validate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setTouched({ email: true, password: true, confirmPassword: true });
      return;
    }
    const emailCheck = isMaliciousInput(email);
    const passwordCheck = isMaliciousInput(password);
    const confirmCheck = isMaliciousInput(confirmPassword);
    if (emailCheck.malicious || passwordCheck.malicious || confirmCheck.malicious) {
      setSecurityStep(1);
      setShowSecurityModal(true);
      return;
    }
    const success = await register(email, password);
    if (success) {
      navigate("/login");
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
        flexDirection: "row-reverse",
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
            Create account
          </h1>
          <p style={{ color: "#888", marginBottom: "2rem", fontSize: ".9rem" }}>
            Get started for free
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
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                clearFieldError("confirmPassword");
              }}
              required
              placeholder="confirm password"
              style={{
                ...inputStyle,
                borderColor: showError("confirmPassword") ? "#ff5252" : undefined,
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#00c853";
                e.target.style.boxShadow = "0 0 0 3px rgba(0,200,83,0.12)";
              }}
              onBlur={(e) => {
                handleBlur("confirmPassword");
                if (!clientErrors.confirmPassword && !fieldErrors.confirmPassword) {
                  e.target.style.borderColor = "rgba(255,255,255,0.06)";
                  e.target.style.boxShadow = "none";
                }
              }}
            />
            {showError("confirmPassword") && (
              <div style={errorStyle}>
                {clientErrors.confirmPassword || fieldErrors.confirmPassword}
              </div>
            )}
            {error && !fieldErrors.email && !fieldErrors.password && !fieldErrors.confirmPassword && (
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

          <div
            style={{
              fontSize: ".85rem",
              color: "#888",
              marginTop: "1rem",
              textAlign: "center",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ color: "#00c853", fontWeight: 600, cursor: "pointer" }}
            >
              Sign In
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
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
          </svg>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#e0e0e0", textAlign: "center" }}>
            Join the Community
          </h2>
          <p style={{ color: "#888", textAlign: "center", maxWidth: 320, lineHeight: 1.6 }}>
            Create an account and start building your game library today.
          </p>
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
