import { Button } from "../shared/Button";

interface Props {
  onStart: () => void;
  onDownloads: () => void;
}

export const Home = ({ onStart, onDownloads }: Props) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background:
          "radial-gradient(circle at top, rgba(37,99,235,0.25), transparent 45%), linear-gradient(to bottom, #020617, #111827)",
        color: "white",
        padding: 24,
      }}
    >
      <div
        style={{
          maxWidth: 860,
          textAlign: "center",
          animation: "fadeIn 0.35s ease",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(44px, 7vw, 68px)",
            marginBottom: 18,
            lineHeight: 1.02,
            fontWeight: 900,
          }}
        >
          Interactive Portfolio
        </h1>

        <p
          style={{
            fontSize: 18,
            opacity: 0.78,
            lineHeight: 1.7,
            maxWidth: 720,
            margin: "0 auto 34px",
          }}
        >
          Explore my projects like a game, open the downloads page,
          and move through the world to see experience, skills, and
          work samples.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 14,
          }}
        >
          <Button onClick={onStart} width={180} height={52}>
            Start Journey
          </Button>

          <Button
            onClick={onDownloads}
            variant="secondary"
            width={180}
            height={52}
          >
            Downloads
          </Button>
        </div>
      </div>
    </div>
  );
};