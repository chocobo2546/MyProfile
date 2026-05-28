import { Button } from "../shared/Button";

interface Props {
  onBack: () => void;
}

const DOWNLOADS = [
  {
    title: "Profile PDF",
    description: "Clean professional profile file.",
    filePath: "/downloads/profile.pdf",
  },
  // {
  //   title: "Portfolio PDF",
  //   description: "Full portfolio presentation export.",
  //   filePath: "/downloads/portfolio.pdf",
  // },
];

export const DownloadsPage = ({ onBack }: Props) => {
  const openFile = (path: string) => {
    window.open(path, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, rgba(37,99,235,0.15), transparent 40%), #0f172a",
        color: "white",
        padding: 32,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 28 }}>
          <Button onClick={onBack} variant="secondary" height={44}>
            ← Back
          </Button>
        </div>

        <h1
          style={{
            fontSize: "clamp(34px, 4vw, 48px)",
            marginBottom: 12,
            fontWeight: 900,
          }}
        >
          Downloads
        </h1>

        <p
          style={{
            opacity: 0.72,
            lineHeight: 1.7,
            marginBottom: 28,
            maxWidth: 720,
          }}
        >
          Download the files you need from this page. The topbar
          dropdown points here too, so the game and the downloads page
          stay connected.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          {DOWNLOADS.map((item) => (
            <div
              key={item.title}
              style={{
                padding: 24,
                borderRadius: 20,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 18px 40px rgba(0,0,0,0.22)",
                transition: "transform 0.18s ease",
              }}
            >
              <h2 style={{ marginBottom: 10, fontSize: 22 }}>
                {item.title}
              </h2>

              <p
                style={{
                  opacity: 0.72,
                  lineHeight: 1.7,
                  marginBottom: 18,
                }}
              >
                {item.description}
              </p>

              <Button
                onClick={() => openFile(item.filePath)}
                width="100%"
                height={46}
              >
                Download
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};