import { CONTROLS } from "../../game/config/controls";

const toLabel = (code: string) => {
  if (code.startsWith("Key")) return code.replace("Key", "");
  if (code.startsWith("Shift")) return "Shift";
  if (code === "Space") return "Space";
  return code;
};

export const ControlsHint = () => {
  return (
    <div
      style={{
        position: "absolute",
        right: 20,
        bottom: 20,
        minWidth: 210,
        padding: "14px 18px",
        borderRadius: 14,

        background: "rgba(0,0,0,0.75)",
        color: "white",
        fontSize: 14,
        lineHeight: 1.8,
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 14px 28px rgba(0,0,0,0.25)",
        zIndex: 999,
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div style={{ fontWeight: 800, marginBottom: 6 }}>
        Controls
      </div>

      <div>
        <strong>{toLabel(CONTROLS.moveLeft)} / {toLabel(CONTROLS.moveRight)}</strong>
        {" = Move"}
      </div>
      <div>
        <strong>{toLabel(CONTROLS.run)}</strong>
        {" = Run"}
      </div>
      <div>
        <strong>{toLabel(CONTROLS.jump)}</strong>
        {" = Jump"}
      </div>
      {/* <div>
        <strong>{toLabel(CONTROLS.drop)}</strong>
        {" = Drop"}
      </div> */}
      <div>
        <strong>{toLabel(CONTROLS.hideUI)}</strong>
        {" = Hide UI"}
      </div>
    </div>
  );
};