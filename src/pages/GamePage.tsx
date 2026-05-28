import { GameCanvas } from "../components/game/GameCanvas";

interface Props {
  onBack: () => void;
  onDownloads: () => void;
}

export const GamePage = ({ onBack, onDownloads }: Props) => {
  return <GameCanvas onBack={onBack} onOpenDownloads={onDownloads} />;
};