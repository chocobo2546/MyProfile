import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Certificate {
  title: string;
  description: string;
  image: string;
}

const certificates: Certificate[] = [
  {
    title: "Data Science Foundations-Level 1",
    description: "",
    image: "/certificates/c1.jpg",
  },
  {
    title: "Machine Learning with Python-Level 1",
    description: "",
    image: "/certificates/c2.jpg",
  },
  {
    title: "Data Science Methodologies",
    description: "",
    image: "/certificates/c3.jpg",
  },
  {
    title: "Data Science Tools",
    description: "",
    image: "/certificates/c4.jpg",
  },
  {
    title: "Participate in Listening to the Data Science and Machine Learning Presentation.",
    description: "",
    image: "/certificates/c5.jpg",
  },
  {
    title: "Join the Training on using LaTeX and Tools.",
    description: "",
    image: "/certificates/c6.jpg",
  },
];

export const CertificatesPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const isOpen = selectedImage !== null;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const openModal = (src: string) => setSelectedImage(src);
  const closeModal = () => setSelectedImage(null);

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
      <h1 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "5rem" }}>
        Certificates
      </h1>

      <div
        className="cert-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          width: "100%",
          maxWidth: 820,
        }}
      >
        {certificates.map((cert, index) => (
          <div
            key={index}
            onClick={() => openModal(cert.image)}
            style={{
              background: "#1a1a1a",
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.04)",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              cursor: "pointer",
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
            <div
              style={{
                width: "100%",
                height: 220,
                overflow: "hidden",
                background: "#222",
              }}
            >
              <img
                src={cert.image}
                alt={cert.title}
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
            </div>
            <div style={{ padding: "1.2rem 1.4rem 1.4rem" }}>
              <h2
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  marginBottom: ".5rem",
                  color: "#e0e0e0",
                }}
              >
                {cert.title}
              </h2>
              <p
                style={{
                  fontSize: ".85rem",
                  color: "#888",
                  lineHeight: 1.6,
                }}
              >
                {cert.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {isOpen &&
        createPortal(
          <div
            onClick={closeModal}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              zIndex: 9999,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <img
              src={selectedImage}
              alt="Full size certificate"
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                objectFit: "contain",
                borderRadius: 8,
                boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
                animation: "popIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                cursor: "default",
              }}
            />
          </div>,
          document.body
        )}

      <style>{`
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 640px) {
          .cert-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};