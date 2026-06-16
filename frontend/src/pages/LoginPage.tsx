import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Button } from "../components/ui/Button";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    const success = await login(email, password);
    if (success) {
      navigate("/");
    }
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

          {error && (
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
              {error}
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
          <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#e0e0e0", textAlign: "center" }}>
            Ready to Play?
          </h2>
          <p style={{ color: "#888", textAlign: "center", maxWidth: 320, lineHeight: 1.6 }}>
            Sign in and pick up where you left off. Your adventures await.
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
