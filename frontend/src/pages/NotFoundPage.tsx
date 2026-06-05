import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom, #020617, #111827)",
        color: "white",
        gap: 24,
        textAlign: "center",
        padding: 24,
      }}
    >
      <h1 style={{ fontSize: "clamp(60px, 12vw, 120px)", fontWeight: 900, margin: 0, opacity: 0.15 }}>
        404
      </h1>
      <h2 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>Page Not Found</h2>
      <p style={{ opacity: 0.6, maxWidth: 400, lineHeight: 1.7 }}>
        This area of the map hasn't been discovered yet. Head back to the main world.
      </p>
      <Button onClick={() => navigate("/")} width={180} height={48}>
        Back to Home
      </Button>
    </div>
  );
};