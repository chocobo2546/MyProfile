import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const sidebarItems = [
  { label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", path: "/admin" },
  { label: "Projects", icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z", path: "/admin/projects" },
  { label: "NPCs", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", path: "/admin/npcs" },
  { label: "Analytics", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", path: "/admin/analytics" },
  { label: "Resume", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", path: "/admin/resume" },
];

const METRICS = [
  { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", label: "Total Visitors", value: "2,847" },
  { icon: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10", label: "Total Downloads", value: "1,253" },
  { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", label: "Today Visitors", value: "142" },
  { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "Today Downloads", value: "38" },
];

export const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();

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
      <div style={{ flex: 1, padding: "3rem 2rem", overflow: "auto" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h1 style={{ fontSize: "1.6rem", marginBottom: ".3rem", fontWeight: 700 }}>
            Dashboard
          </h1>
          <p style={{ color: "#888", marginBottom: "2.5rem" }}>
            Overview
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.2rem",
            }}
          >
            {METRICS.map((m) => (
              <div
                key={m.label}
                style={{
                  background: "#1a1a1a",
                  borderRadius: 12,
                  padding: "1.5rem",
                  border: "1px solid rgba(255,255,255,.04)",
                  transition: "all .3s cubic-bezier(.16,1,.3,1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "rgba(0,200,83,.15)";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,.04)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "rgba(0,200,83,.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#00c853"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={m.icon} />
                  </svg>
                </div>
                <div
                  style={{
                    color: "#888",
                    fontSize: ".8rem",
                    textTransform: "uppercase",
                    letterSpacing: ".5px",
                    marginBottom: ".3rem",
                  }}
                >
                  {m.label}
                </div>
                <div style={{ fontSize: "2rem", fontWeight: 700 }}>
                  {m.value}
                </div>
              </div>
            ))}
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
