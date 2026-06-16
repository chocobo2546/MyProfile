import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { useDownload } from "../../hooks/useDownload";

interface Props {
  onBack: () => void;
}

const DOWNLOADS = [
  {
    icon: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z",
    title: "Resume",
    desc: "PDF \u2022 240 KB",
  },
  {
    icon: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5l-1-1H6z",
    title: "Curriculum Vitae",
    desc: "PDF \u2022 320 KB",
  },
  {
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    title: "Project Source",
    desc: "Repository \u2022 main branch",
  },
];

export const DownloadsView = (_props: Props) => {
  const { view, download } = useDownload();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleView = async () => {
    setLoading("view");
    setError(null);
    try {
      await view();
    } catch {
      setError("Failed to load file. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  const handleDownload = async (title: string) => {
    setLoading("download");
    setError(null);
    try {
      await download(title);
    } catch {
      setError("Failed to download file. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "0 auto",
        padding: "3rem 2rem",
      }}
    >
      <h1 style={{ fontSize: "1.6rem", marginBottom: ".3rem", fontWeight: 700 }}>
        Downloads
      </h1>

      {error && (
        <div
          style={{
            padding: "12px 16px",
            borderRadius: 8,
            background: "rgba(255,82,82,0.12)",
            border: "1px solid rgba(255,82,82,0.25)",
            color: "#ff5252",
            fontSize: 14,
            marginBottom: 20,
          }}
        >
          {error}
        </div>
      )}

      <div style={{ display: "grid", gap: "1rem" }}>
        {DOWNLOADS.map((item) => (
          <div
            key={item.title}
            className="download-item"
            style={{
              background: "#1a1a1a",
              borderRadius: 12,
              padding: "1.5rem 2rem",
              border: "1px solid rgba(255,255,255,.04)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: "all .3s cubic-bezier(.16,1,.3,1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,200,83,.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,.04)";
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#888"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={item.icon} />
              </svg>
              <div>
                <div style={{ fontWeight: 600 }}>{item.title}</div>
                <div style={{ fontSize: ".8rem", color: "#888" }}>
                  {item.desc}
                </div>
              </div>
            </div>

            <div className="actions" style={{ display: "flex", gap: ".5rem" }}>
              {item.title === "Project Source" ? (
                <a
                  href="https://github.com/chocobo2546?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: ".5rem",
                    padding: ".7rem 1.6rem",
                    borderRadius: 8,
                    fontSize: ".9rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    background: "transparent",
                    color: "#e0e0e0",
                    border: "1px solid rgba(255,255,255,.12)",
                    textDecoration: "none",
                    transition: "all .3s cubic-bezier(.16,1,.3,1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#00c853";
                    e.currentTarget.style.color = "#00c853";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,.12)";
                    e.currentTarget.style.color = "#e0e0e0";
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  View on GitHub
                </a>
              ) : (
                <>
                  <Button
                    onClick={handleView}
                    variant="secondary"
                    height={40}
                    fontSize={13}
                    disabled={loading !== null}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    View
                  </Button>
                  <Button
                    onClick={() => handleDownload(item.title)}
                    height={40}
                    fontSize={13}
                    disabled={loading !== null}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    {loading === "download" ? "Downloading..." : "Download"}
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .download-item { flex-direction: column !important; align-items: flex-start !important; gap: 1rem !important; }
          .download-item .actions { width: 100% !important; }
          .download-item .actions .btn, .download-item .actions a { flex: 1 !important; justify-content: center !important; }
        }
      `}</style>
    </div>
  );
};
