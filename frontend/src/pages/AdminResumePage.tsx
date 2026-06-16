import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useResume, useUploadResume } from "../hooks/useResume";
import { Button } from "../components/ui/Button";

const sidebarItems = [
  { label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", path: "/admin" },
  { label: "Projects", icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z", path: "/admin/projects" },
  { label: "NPCs", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", path: "/admin/npcs" },
  { label: "Analytics", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", path: "/admin/analytics" },
  { label: "Resume", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", path: "/admin/resume" },
];

export const AdminResumePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { data: resume, isLoading } = useResume();
  const uploadMutation = useUploadResume();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;
    setError(null);
    try {
      await uploadMutation.mutateAsync(file);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch {
      setError("Failed to upload resume");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#e0e0e0",
        display: "flex",
      }}
    >
      <Sidebar items={sidebarItems} currentPath={location.pathname} navigate={navigate} user={user?.email} onLogout={handleLogout} />
      <div style={{ flex: 1, padding: 32, overflow: "auto" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 32 }}>Manage Resume</h1>

          {error && (
            <div style={{ padding: "12px 16px", borderRadius: 8, background: "rgba(255,82,82,0.12)", border: "1px solid rgba(255,82,82,0.25)", color: "#ff5252", fontSize: 14, marginBottom: 20 }}>
              {error}
            </div>
          )}

          <div style={{ padding: 24, borderRadius: 12, background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.04)", marginBottom: 24 }}>
            <h2 style={{ marginBottom: 16, fontSize: 18, fontWeight: 600 }}>Current Resume</h2>
            {isLoading && (
              <div style={{ textAlign: "center", padding: 20, color: "#888" }}>
                <div style={{ marginBottom: 8 }}>Loading...</div>
              </div>
            )}
            {resume ? (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00c853" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                  <div>
                    <p style={{ margin: 0, fontWeight: 600 }}>{resume.fileName}</p>
                    <p style={{ margin: 0, color: "#888", fontSize: 13, wordBreak: "break-all" }}>{resume.downloadUrl}</p>
                  </div>
                </div>
              </div>
            ) : (
              !isLoading && (
                <div style={{ textAlign: "center", padding: 20, color: "#888" }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 12, opacity: 0.3 }}>
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <p style={{ margin: 0 }}>No resume uploaded yet.</p>
                </div>
              )
            )}
          </div>

          <div style={{ padding: 24, borderRadius: 12, background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.04)" }}>
            <h2 style={{ marginBottom: 16, fontSize: 18, fontWeight: 600 }}>Upload New Resume</h2>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 16px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#e0e0e0",
                  fontSize: 14,
                  cursor: "pointer",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#00c853"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Choose PDF
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  style={{ display: "none" }}
                />
              </label>
              <Button onClick={handleUpload} disabled={uploadMutation.isPending} height={44}>
                {uploadMutation.isPending ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SidebarProps {
  items: { label: string; icon: string; path: string }[];
  currentPath: string;
  navigate: (path: string) => void;
  user?: string;
  onLogout: () => void;
}

const Sidebar = ({ items, currentPath, navigate, user, onLogout }: SidebarProps) => (
  <div
    className="admin-sidebar"
    style={{
      width: 240,
      minHeight: "100vh",
      background: "#1a1a1a",
      borderRight: "1px solid rgba(255,255,255,0.04)",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
    }}
  >
    <div
      style={{
        padding: "24px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 18, color: "#e0e0e0" }}>
        Admin <span style={{ color: "#00c853" }}>Panel</span>
      </div>
      {user && (
        <div style={{ fontSize: 12, color: "#888", marginTop: 6 }}>
          {user}
        </div>
      )}
    </div>
    <nav style={{ flex: 1, padding: "12px 0" }}>
      {items.map((item) => {
        const active = currentPath === item.path;
        return (
          <div
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 20px",
              cursor: "pointer",
              color: active ? "#00c853" : "#888",
              background: active ? "rgba(0,200,83,0.06)" : "transparent",
              borderLeft: `3px solid ${active ? "#00c853" : "transparent"}`,
              transition: "all 0.18s ease",
              fontSize: 14,
              fontWeight: active ? 600 : 400,
            }}
            onMouseEnter={(e) => {
              if (!active) {
                e.currentTarget.style.color = "#e0e0e0";
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              }
            }}
            onMouseLeave={(e) => {
              if (!active) {
                e.currentTarget.style.color = "#888";
                e.currentTarget.style.background = "transparent";
              }
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d={item.icon} />
            </svg>
            {item.label}
          </div>
        );
      })}
    </nav>
    <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div
        onClick={onLogout}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          color: "#888",
          fontSize: 13,
          cursor: "pointer",
          transition: "color 0.18s ease",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = "#ff5252"; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = "#888"; }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        Sign Out
      </div>
    </div>
    <style>{`
      @media (max-width: 768px) {
        .admin-sidebar {
          width: 100% !important;
          min-height: auto !important;
          flex-direction: row !important;
          overflow-x: auto !important;
          border-right: none !important;
          border-bottom: 1px solid rgba(255,255,255,0.04) !important;
        }
        .admin-sidebar > div:first-child { display: none !important; }
        .admin-sidebar nav {
          display: flex !important;
          padding: 0 !important;
        }
        .admin-sidebar nav > div {
          border-left: none !important;
          border-bottom: 3px solid transparent !important;
          white-space: nowrap !important;
          padding: 12px 16px !important;
        }
        .admin-sidebar nav > div[style*="color: rgb(0, 200, 83)"] {
          border-bottom-color: #00c853 !important;
        }
        .admin-sidebar > div:last-child { display: none !important; }
      }
    `}</style>
  </div>
);
