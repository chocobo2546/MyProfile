import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Dropdown } from "../../components/ui/Dropdown";

interface Props {
  worldLabel: string;
  onBack?: () => void;
  onOpenDownloads?: () => void;
}

export const Navbar = ({ worldLabel, onBack, onOpenDownloads }: Props) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) onBack();
    else navigate("/");
  };

  const handleDownloads = () => {
    if (onOpenDownloads) onOpenDownloads();
    else navigate("/downloads");
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: 72,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        padding: "0 24px",
        background: "rgba(10,10,10,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        zIndex: 1000,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
        <Button variant="secondary" onClick={handleBack} height={40} fontSize={13}>
          ← Back
        </Button>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#e0e0e0", fontWeight: 700, fontSize: 18, lineHeight: 1.1 }}>
            Interactive <span style={{ color: "#00c853" }}>Portfolio</span>
          </div>
          <div style={{ color: "#888", fontSize: 12, marginTop: 2 }}>
            {worldLabel}
          </div>
        </div>
      </div>

      <Dropdown
        openOnHover
        align="right"
        width={240}
        trigger={
          <Button variant="secondary" height={40} fontSize={13}>
            Downloads
          </Button>
        }
        items={[
          { label: "Full Resume",    onClick: handleDownloads },
          { label: "Full Portfolio", onClick: handleDownloads },
        ]}
      />
    </div>
  );
};
