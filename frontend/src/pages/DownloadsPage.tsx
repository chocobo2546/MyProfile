import { useNavigate } from "react-router-dom";
import { DownloadsView } from "../features/downloads/DownloadsView";

export const DownloadsPage = () => {
  const navigate = useNavigate();

  return <DownloadsView onBack={() => navigate(-1)} />;
};