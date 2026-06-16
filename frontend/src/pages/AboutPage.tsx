export const AboutPage = () => {
  return (
    <div
      className="about-wrap"
      style={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 2rem",
      }}
    >
      <div
        className="about-card"
        style={{
          background: "#1a1a1a",
          borderRadius: 16,
          padding: "3rem",
          maxWidth: 540,
          width: "100%",
          border: "1px solid rgba(255,255,255,.04)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(0,200,83,.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
            border: "2px solid rgba(0,200,83,.15)",
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#00c853"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="8" r="5" />
            <path d="M20 21a8 8 0 10-16 0" />
          </svg>
        </div>

        <h1 style={{ fontSize: "1.6rem", marginBottom: "1rem", fontWeight: 700 }}>
          About Me
        </h1>

        <p
          style={{
            color: "#888",
            lineHeight: 1.7,
            fontSize: ".92rem",
            marginBottom: "2rem",
          }}
        >
          I'm a passionate game developer and creative technologist who loves building
          immersive digital experiences. From pixel art to physics engines, I enjoy every
          layer of the game development pipeline. This platform is my personal hub for
          sharing projects, assets, and tools with the community.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              background: "rgba(255,255,255,.02)",
              borderRadius: 10,
              padding: "1rem 1.2rem",
              textAlign: "left",
              border: "1px solid rgba(255,255,255,.04)",
              transition: "border-color .3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,200,83,.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,.04)";
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                background: "rgba(0,200,83,.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#00c853"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 7L2 7" />
              </svg>
            </div>
            <div>
              <div
                style={{
                  fontSize: ".75rem",
                  color: "#888",
                  textTransform: "uppercase",
                  letterSpacing: ".5px",
                }}
              >
                Email
              </div>
              <div style={{ fontWeight: 600, fontSize: ".95rem" }}>
                hello@gamehub.dev
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              background: "rgba(255,255,255,.02)",
              borderRadius: 10,
              padding: "1rem 1.2rem",
              textAlign: "left",
              border: "1px solid rgba(255,255,255,.04)",
              transition: "border-color .3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,200,83,.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,.04)";
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                background: "rgba(0,200,83,.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#00c853"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
            </div>
            <div>
              <div
                style={{
                  fontSize: ".75rem",
                  color: "#888",
                  textTransform: "uppercase",
                  letterSpacing: ".5px",
                }}
              >
                Phone
              </div>
              <div style={{ fontWeight: 600, fontSize: ".95rem" }}>
                +1 (555) 123-4567
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-wrap { padding: 2rem 1rem !important; }
          .about-card { padding: 2rem 1.5rem !important; }
        }
      `}</style>
    </div>
  );
};
