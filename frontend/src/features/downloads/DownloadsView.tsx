import { Button } from "../../components/ui/Button";
import { useDownload } from "../../hooks/useDownload";

interface Props {
  onBack: () => void;
}

const DOWNLOADS = [
  {
    title: "Profile PDF",
    description: "Clean professional profile file.",
    filePath: "/resume/forTest.pdf",
  },
];

export const DownloadsView = ({ onBack }: Props) => {
  const { view, download } = useDownload();

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
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
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
              }}
            >
              <h2 style={{ marginBottom: 10, fontSize: 22 }}>
                {item.title}
              </h2>

              <p
                style={{
                  opacity: 0.72,
                  lineHeight: 1.7,
                  marginBottom: 20,
                }}
              >
                {item.description}
              </p>

              <div style={{ display: "flex", gap: 10 }}>
                <Button
                  onClick={() => view(item.filePath)}
                  variant="secondary"
                  width="50%"
                  height={44}
                >
                  View
                </Button>

                <Button
                  onClick={() => download(item.filePath, item.title)}
                  variant="primary"
                  width="50%"
                  height={44}
                >
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};