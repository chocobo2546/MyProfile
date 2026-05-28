import { useState } from "react";

import { MenuPage } from "./pages/MenuPage";
import { GamePage } from "./pages/GamePage";
import { DownloadsPage } from "./pages/DownloadsPage";

export type Scene = "menu" | "game" | "downloads";

export default function App() {
  const [scene, setScene] = useState<Scene>("menu");

  return (
    <>
      {scene === "menu" && (
        <MenuPage
          onStart={() => setScene("game")}
          onDownloads={() => setScene("downloads")}
        />
      )}

      {scene === "game" && (
        <GamePage
          onBack={() => setScene("menu")}
          onDownloads={() => setScene("downloads")}
        />
      )}

      {scene === "downloads" && (
        <DownloadsPage onBack={() => setScene("menu")} />
      )}
    </>
  );
}