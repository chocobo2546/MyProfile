import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "../components/layouts/AppLayout";
import { MenuPage } from "../pages/MenuPage";
import { GamePage } from "../pages/GamePage";
import { DownloadsPage } from "../pages/DownloadsPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { AboutPage } from "../pages/AboutPage";
import { DashboardPage } from "../pages/DashboardPage";
import { AdminDashboardPage } from "../pages/AdminDashboardPage";
import { AdminProjectsPage } from "../pages/AdminProjectsPage";
import { AdminNPCsPage } from "../pages/AdminNPCsPage";
import { AdminAnalyticsPage } from "../pages/AdminAnalyticsPage";
import { AdminResumePage } from "../pages/AdminResumePage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { AdminRoute } from "../components/common/AdminRoute";
import { ProtectedRoute } from "../components/common/ProtectedRoute";

const wrapAdmin = (element: React.ReactNode) => (
  <AdminRoute>{element}</AdminRoute>
);

const wrapProtected = (element: React.ReactNode) => (
  <ProtectedRoute>{element}</ProtectedRoute>
);

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <MenuPage /> },
      { path: "/downloads", element: <DownloadsPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/dashboard", element: wrapProtected(<DashboardPage />) },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/admin", element: wrapAdmin(<AdminDashboardPage />) },
      { path: "/admin/projects", element: wrapAdmin(<AdminProjectsPage />) },
      { path: "/admin/npcs", element: wrapAdmin(<AdminNPCsPage />) },
      { path: "/admin/analytics", element: wrapAdmin(<AdminAnalyticsPage />) },
      { path: "/admin/resume", element: wrapAdmin(<AdminResumePage />) },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    path: "/game",
    element: <GamePage />,
  },
]);
