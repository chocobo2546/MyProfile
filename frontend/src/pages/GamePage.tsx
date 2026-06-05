import { useNavigate } from "react-router-dom";
import { GameCanvas } from "../features/game/GameCanvas";

export const GamePage = () => {
  const navigate = useNavigate();

  return (
    <GameCanvas
      onBack={() => navigate("/")}
      onOpenDownloads={() => navigate("/downloads")}
    />
  );
};