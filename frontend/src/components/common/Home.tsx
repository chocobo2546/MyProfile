interface Props {
  onStart: () => void;
}

export const Home = ({ onStart }: Props) => {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(0,200,83,.08), transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(0,200,83,.04), transparent 60%)",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: "1rem",
          }}
        >
          <span style={{ color: "#00c853" }}>Welcome</span>
          <br />
          This is My Profile
        </h1>

        <button
          onClick={onStart}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: ".5rem",
            padding: "1rem 2.5rem",
            borderRadius: 8,
            border: "none",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: "pointer",
            background: "#00c853",
            color: "#000",
            transition: "all .3s cubic-bezier(.16,1,.3,1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#00a844";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,200,83,.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#00c853";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          Experiences & Skills
        </button>
      </div>
    </div>
  );
};
