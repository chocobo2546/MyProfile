import { useState } from "react";
import { GameCanvas } from "./components/GameCanvas";
import { Menu } from "./components/Home";

type Scene = "menu" | "game";

export default function App() {
  const [scene, setScene] = useState<Scene>("menu");

  const startGame = () => {
    setScene("game");
  };

  return (
    <>
      {scene === "menu" && (
        <Menu onStart={startGame} />
      )}

      {scene === "game" && (
        <GameCanvas onBack={() => setScene("menu")} />
      )}
    </>
  );
}