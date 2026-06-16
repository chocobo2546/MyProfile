import { type ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

interface Props {
  children: ReactNode;
}

export const AdminRoute = ({ children }: Props) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }
    if (!isLoading && user?.role !== "ROLE_ADMIN") {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, user]);

  if (isLoading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#0f172a",
          color: "white",
          fontSize: 18,
        }}
      >
        Loading...
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "ROLE_ADMIN") {
    return null;
  }

  return <>{children}</>;
};
