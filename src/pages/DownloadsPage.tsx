import { DownloadsPage as DownloadsView } from "../components/menu/Downloads";

interface Props {
  onBack: () => void;
}

export const DownloadsPage = ({ onBack }: Props) => {
  return <DownloadsView onBack={onBack} />;
};