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
          maxWidth: 900,
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

        <h1 style={{ fontSize: "1.6rem", marginBottom: ".5rem", fontWeight: 700 }}>
          Hello, my name is Make
        </h1>

        <p
          style={{
            color: "#888",
            lineHeight: 1.8,
            fontSize: ".88rem",
            marginBottom: "1.5rem",
            textAlign: "left",
          }}
        >
          I graduated from Rajamangala University of Technology Thanyaburi with a Bachelor's degree in Applied Mathematics from the Faculty of Science and Technology. I am passionate about software development and currently seeking opportunities as a Full Stack Developer or Backend Developer.
        </p>
        <p
          style={{
            color: "#888",
            lineHeight: 1.8,
            fontSize: ".88rem",
            marginBottom: "1.5rem",
            textAlign: "left",
          }}
        >
          I have experience developing web applications and backend systems using a variety of technologies, including Spring Boot, ASP.NET, Node.js, Express.js, FastAPI, Django, React, Next.js, Angular, and modern development tools such as PostgreSQL, MySQL, Redis, Docker, Git, GitHub, GitLab, Vercel, Render, and Railway.
        </p>
        <p
          style={{
            color: "#888",
            lineHeight: 1.8,
            fontSize: ".88rem",
            marginBottom: "1.5rem",
            textAlign: "left",
          }}
        >
          Throughout my academic and professional projects, I have contributed to the development of diverse systems ranging from hotel reservation and queue management platforms to real-time vehicle price prediction systems and government-sector applications. These experiences have strengthened my ability to design scalable, maintainable, and user-focused solutions.
        </p>
        <p
          style={{
            color: "#888",
            lineHeight: 1.8,
            fontSize: ".88rem",
            marginBottom: "1.5rem",
            textAlign: "left",
          }}
        >
          I have also designed and implemented various types of APIs, including RESTful APIs, Webhooks, and WebSockets, with a strong focus on performance, security, and seamless user experiences.
        </p>
        <p
          style={{
            color: "#888",
            lineHeight: 1.8,
            fontSize: ".88rem",
            marginBottom: "2rem",
            textAlign: "left",
          }}
        >
          Currently, I am expanding my knowledge in SOAP-based integrations, software architecture, and scalable system design to build applications capable of supporting long-term business growth and increasing user demands.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
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
                  fontSize: ".7rem",
                  color: "#888",
                  textTransform: "uppercase",
                  letterSpacing: ".5px",
                }}
              >
                Gmail
              </div>
              <div style={{ fontWeight: 600, fontSize: ".9rem" }}>
                pattrawut.make@gmail.com
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
                  fontSize: ".7rem",
                  color: "#888",
                  textTransform: "uppercase",
                  letterSpacing: ".5px",
                }}
              >
                Phone
              </div>
              <div style={{ fontWeight: 600, fontSize: ".9rem" }}>
                098-264-7413
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
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="#00c853"
              >
                <path d="M12 2C6.48 2 2 5.92 2 10.73c0 2.81 1.65 5.33 4.2 6.99-.17.73-.62 2.63-.64 2.75-.02.22.08.44.26.55.18.11.4.11.58.01.21-.12 2.49-1.66 3.46-2.3.69.13 1.41.2 2.14.2 5.52 0 10-3.92 10-8.74S17.52 2 12 2zm3.33 8.66h-1.33v1.33c0 .29-.24.53-.53.53s-.53-.24-.53-.53v-1.33h-1.33c-.29 0-.53-.24-.53-.53s.24-.53.53-.53h1.33V8.27c0-.29.24-.53.53-.53s.53.24.53.53v1.33h1.33c.29 0 .53.24.53.53s-.24.53-.53.53zm-4.46 2.13H8.8c-.29 0-.53-.24-.53-.53s.24-.53.53-.53h2.07c.29 0 .53.24.53.53s-.24.53-.53.53zm.2-1.86H8.8c-.29 0-.53-.24-.53-.53s.24-.53.53-.53h2.27c.29 0 .53.24.53.53s-.24.53-.53.53zm-.2-1.87H8.8c-.29 0-.53-.24-.53-.53s.24-.53.53-.53h2.07c.29 0 .53.24.53.53s-.24.53-.53.53z" />
              </svg>
            </div>
            <div>
              <div
                style={{
                  fontSize: ".7rem",
                  color: "#888",
                  textTransform: "uppercase",
                  letterSpacing: ".5px",
                }}
              >
                Line ID
              </div>
              <div style={{ fontWeight: 600, fontSize: ".9rem" }}>
                makepattrawut
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
