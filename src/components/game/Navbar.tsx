import { Button } from "../shared/Button";
import { Dropdown } from "../shared/Dropdown";

interface Props {
  onBack: () => void;
  onOpenDownloads: () => void;
  worldLabel: string;
}

export const Navbar = ({
  onBack,
  onOpenDownloads,
  worldLabel,
}: Props) => {
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

        background: "rgba(0,0,0,0.58)",
        backdropFilter: "blur(12px)",

        borderBottom: "1px solid rgba(255,255,255,0.08)",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          minWidth: 0,
        }}
      >
        <Button variant="secondary" onClick={onBack} height={40}>
          Back
        </Button>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "white",
              fontWeight: 800,
              fontSize: 18,
              lineHeight: 1.1,
            }}
          >
            Interactive Portfolio
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.72)",
              fontSize: 12,
              marginTop: 3,
            }}
          >
            {worldLabel}
          </div>
        </div>
      </div>

      <Dropdown
        openOnHover
        align="right"
        width={240}
        trigger={
          <Button variant="secondary" height={40}>
            Downloads
          </Button>
        }
        items={[
          {
            label: "Full Resume",
            onClick: onOpenDownloads,
          },
          {
            label: "Full Portfolio",
            onClick: onOpenDownloads,
          },
        ]}
      />
    </div>
  );
};