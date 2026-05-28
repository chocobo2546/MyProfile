import { Home } from "../components/menu/Home";

interface Props {
  onStart: () => void;
  onDownloads: () => void;
}

export const MenuPage = ({ onStart, onDownloads }: Props) => {
  return <Home onStart={onStart} onDownloads={onDownloads} />;
};