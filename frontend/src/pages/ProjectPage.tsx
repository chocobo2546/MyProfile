interface Project {
  title: string;
  description: string;
  url: string;
  image: string;
}

const projects: Project[] = [
  {
    title: "Secound Hand Car Price Prediction",
    description: "..........................",
    url: "https://final-project-iota-blush.vercel.app",
    image: "/projects/carPredict.png",
  },
  {
    title: "Multi-Agent",
    description: ".........................",
    url: "https://example.com/project-2",
    image: "/projects/meme.jpg",
  },
  {
    title: "Project 3",
    description: "An open-source game engine written in TypeScript, with a focus on 2D rendering, physics simulation, and modding support.",
    url: "https://example.com/project-3",
    image: "/projects/meme.jpg",
  },
  {
    title: "Project 4",
    description: "A data visualization dashboard that transforms complex datasets into beautiful, interactive charts and graphs.",
    url: "https://example.com/project-4",
    image: "/projects/meme.jpg",
  },
];

export const ProjectPage = () => {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "3rem 2rem 5rem",
      }}
    >
      <h1
        style={{
          fontSize: "1.8rem",
          fontWeight: 700,
          marginBottom: "5rem",
        }}
      >
        My Projects
      </h1>
      {/* <p
        style={{
          color: "#888",
          fontSize: ".95rem",
          marginBottom: "2.5rem",
          textAlign: "center",
          maxWidth: 500,
        }}
      >
        Here are some of the projects I've been working on. Each one reflects my
        passion for building great software.
      </p> */}

      <div
        className="project-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          width: "100%",
          maxWidth: 820,
        }}
      >
        {projects.map((project, index) => (
          <div
            key={index}
            style={{
              background: "#1a1a1a",
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.04)",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.borderColor = "rgba(0,200,83,0.15)";
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: "100%",
                height: 200,
                overflow: "hidden",
                background: "#222",
                display: "block",
                textDecoration: "none",
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
            </a>

            <div style={{ padding: "1.2rem 1.4rem 1.4rem" }}>
              <h2
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  marginBottom: ".5rem",
                  color: "#e0e0e0",
                }}
              >
                {project.title}
              </h2>
              <p
                style={{
                  fontSize: ".85rem",
                  color: "#888",
                  lineHeight: 1.6,
                }}
              >
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .project-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
