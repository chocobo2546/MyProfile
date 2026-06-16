import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
        color: "#e0e0e0",
        gap: 24,
        textAlign: "center",
        padding: 24,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          zIndex: 0,
        }}
      />
      <div style={{ position: "relative", zIndex: 1, animation: "fadeSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}>
        <h1
          style={{
            fontSize: "clamp(80px, 15vw, 140px)",
            fontWeight: 800,
            margin: 0,
            color: "#00c853",
            opacity: 0.15,
            lineHeight: 1,
          }}
        >
          404
        </h1>
        <h2 style={{ fontSize: 24, fontWeight: 700, margin: "12px 0 8px" }}>
          Page Not Found
        </h2>
        <p
          style={{
            color: "#888",
            maxWidth: 400,
            lineHeight: 1.7,
            marginBottom: 8,
            fontSize: 15,
          }}
        >
          This area of the map hasn't been discovered yet. Head back to the main world.
        </p>
        <Button onClick={() => navigate("/")} width={180} height={48}>
          Back to Home
        </Button>
      </div>
    </div>
  );
};
