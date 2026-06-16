import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Button } from "../components/ui/Button";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setLocalError(null);

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    const success = await register(email, password);
    if (success) {
      navigate("/login");
    }
  };

  const displayError = localError || error;

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

          {displayError && (
            <div
              style={{
                fontSize: ".8rem",
                marginTop: ".5rem",
                marginBottom: "1rem",
                color: "#ff5252",
                padding: "8px 12px",
                borderRadius: 8,
                background: "rgba(255,82,82,0.12)",
                border: "1px solid rgba(255,82,82,0.25)",
              }}
            >
              {displayError}
            </div>
          )}

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
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = "#00c853";
                e.target.style.boxShadow = "0 0 0 3px rgba(0,200,83,0.12)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.06)";
                e.target.style.boxShadow = "none";
              }}
            />
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
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = "#00c853";
                e.target.style.boxShadow = "0 0 0 3px rgba(0,200,83,0.12)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.06)";
                e.target.style.boxShadow = "none";
              }}
            />
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
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = "#00c853";
                e.target.style.boxShadow = "0 0 0 3px rgba(0,200,83,0.12)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.06)";
                e.target.style.boxShadow = "none";
              }}
            />
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

      <style>{`
        @media (max-width: 768px) {
          .auth-image-col { display: none !important; }
        }
      `}</style>
    </div>
  );
};
