import { createBrowserRouter } from "react-router-dom";

import { MenuPage }      from "../pages/MenuPage";
import { GamePage }      from "../pages/GamePage";
import { DownloadsPage } from "../pages/DownloadsPage";
import { NotFoundPage }  from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MenuPage />,
  },
  {
    path: "/game",
    element: <GamePage />,
  },
  {
    path: "/downloads",
    element: <DownloadsPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);