import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Downloads", path: "/downloads" },
  { label: "Dashboard", path: "/dashboard", requireAuth: true },
  { label: "About", path: "/about" },
  { label: "Edit", path: "/admin", requireAdmin: true },
];

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const filteredItems = navItems.filter((item) => {
    if (item.requireAdmin && (!isAuthenticated || user?.role !== "ROLE_ADMIN")) return false;
    if (item.requireAuth && !isAuthenticated) return false;
    return true;
  });

  const linkStyle = (active: boolean): React.CSSProperties => ({
    fontSize: ".85rem",
    fontWeight: 500,
    color: active ? "#e0e0e0" : "#888",
    padding: ".4rem 0",
    position: "relative",
    cursor: "pointer",
    background: "none",
    border: "none",
    fontFamily: "inherit",
    transition: "color .3s",
  });

  const underlineStyle = (active: boolean): React.CSSProperties => ({
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    background: "#00c853",
    transform: active ? "scaleX(1)" : "scaleX(0)",
    transition: "transform .3s",
    borderRadius: 1,
  });

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2rem",
        height: 64,
        background: "rgba(10,10,10,.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,.04)",
        zIndex: 100,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-20px)",
        transition: "all .5s cubic-bezier(.16,1,.3,1)",
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: "1.3rem",
          letterSpacing: "-.5px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        Some <span style={{ color: "#00c853" }}>Logo</span>
      </div>

      <button
        className="hamburger"
        aria-label="Menu"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: "none",
          flexDirection: "column",
          cursor: "pointer",
          gap: 5,
          background: "none",
          border: "none",
          padding: 0,
        }}
      >
        <span
          style={{
            display: "block",
            width: 22,
            height: 2,
            background: "#e0e0e0",
            borderRadius: 2,
            transition: "all .3s",
            transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none",
          }}
        />
        <span
          style={{
            display: "block",
            width: 22,
            height: 2,
            background: "#e0e0e0",
            borderRadius: 2,
            transition: "all .3s",
            opacity: menuOpen ? 0 : 1,
          }}
        />
        <span
          style={{
            display: "block",
            width: 22,
            height: 2,
            background: "#e0e0e0",
            borderRadius: 2,
            transition: "all .3s",
            transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none",
          }}
        />
      </button>

      <ul
        style={{
          display: "flex",
          listStyle: "none",
          gap: "1.5rem",
          alignItems: "center",
          margin: 0,
          padding: 0,
          transition: "transform .4s cubic-bezier(.16,1,.3,1)",
        }}
        className={menuOpen ? "nav-links open" : "nav-links"}
      >
        {filteredItems.map((item) => (
          <li key={item.path}>
            <button
              onClick={() => navigate(item.path)}
              style={linkStyle(isActive(item.path))}
              onMouseEnter={(e) => {
                if (!isActive(item.path)) e.currentTarget.style.color = "#e0e0e0";
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.path)) e.currentTarget.style.color = "#888";
              }}
            >
              {item.label}
              <span style={underlineStyle(isActive(item.path))} />
            </button>
          </li>
        ))}
        {isAuthenticated ? (
          <li>
            <button
              onClick={handleLogout}
              style={linkStyle(false)}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#ff5252"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#888"; }}
            >
              Logout
              <span style={underlineStyle(false)} />
            </button>
          </li>
        ) : (
          <li>
            <button
              onClick={() => navigate("/login")}
              style={linkStyle(isActive("/login"))}
              onMouseEnter={(e) => {
                if (!isActive("/login")) e.currentTarget.style.color = "#e0e0e0";
              }}
              onMouseLeave={(e) => {
                if (!isActive("/login")) e.currentTarget.style.color = "#888";
              }}
            >
              Login
              <span style={underlineStyle(isActive("/login"))} />
            </button>
          </li>
        )}
      </ul>

      <style>{`
        @media (max-width: 768px) {
          .hamburger { display: flex !important; }
          .nav-links {
            position: fixed;
            top: 64px;
            left: 0;
            right: 0;
            background: rgba(10,10,10,.97);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            flex-direction: column;
            padding: 1rem 0;
            transform: translateY(-120%);
            border-bottom: 1px solid rgba(255,255,255,.04);
          }
          .nav-links.open {
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
};
