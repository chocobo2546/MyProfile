interface Props {
  x: number;
  y: number;
  label: string;
}

export const Portal = ({ x, y, label }: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        bottom: y,
        width: 100,
        height: 140,
        borderRadius: 22,

        background:
          "linear-gradient(to bottom, rgba(96,165,250,0.95), rgba(37,99,235,0.95))",
        boxShadow: "0 0 36px rgba(96,165,250,0.85)",
        border: "1px solid rgba(255,255,255,0.2)",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        color: "white",
        fontWeight: 800,
        textAlign: "center",
        textShadow: "0 2px 8px rgba(0,0,0,0.35)",
        userSelect: "none",

        animation: "portalFloat 2.2s ease-in-out infinite",
      }}
    >
      <div>
        <div style={{ fontSize: 13, opacity: 0.9 }}>Portal</div>
        <div style={{ fontSize: 15 }}>{label}</div>
      </div>
    </div>
  );
};