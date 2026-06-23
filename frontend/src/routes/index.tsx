import { createBrowserRouter, Navigate } from "react-router-dom";

import { AppLayout } from "../components/layouts/AppLayout";
import { MenuPage } from "../pages/MenuPage";
import { GamePage } from "../pages/GamePage";
import { DownloadsPage } from "../pages/DownloadsPage";
import { AuthPage } from "../pages/AuthPage";
import { AboutPage } from "../pages/AboutPage";
import { ProjectPage } from "../pages/ProjectPage";
import { CertificatesPage } from "../pages/CertificatesPage";
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
      { path: "/project", element: <ProjectPage /> },
      { path: "/certificates", element: <CertificatesPage /> },
      { path: "/dashboard", element: wrapProtected(<DashboardPage />) },
      { path: "/auth", element: <AuthPage /> },
      { path: "/login", element: <Navigate to="/auth?mode=login" replace /> },
      { path: "/register", element: <Navigate to="/auth?mode=register" replace /> },
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
