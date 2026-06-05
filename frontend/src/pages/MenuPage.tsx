import { useNavigate } from "react-router-dom";
import { Home } from "../components/common/Home";

export const MenuPage = () => {
  const navigate = useNavigate();

  return (
    <Home
      onStart={() => navigate("/game")}
      onDownloads={() => navigate("/downloads")}
    />
  );
};