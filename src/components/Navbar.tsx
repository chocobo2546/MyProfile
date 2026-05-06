interface Props {
  onBack: () => void;
}

export const Navbar = ({ onBack }: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: 60,
        backgroundColor: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        zIndex: 1000,
      }}
    >
      <button
        onClick={onBack}
        style={{
          padding: "8px 16px",
          cursor: "pointer",
        }}
      >
        ⬅ Back
      </button>

      <div style={{ color: "white", marginLeft: 20 }}>
        My Game
      </div>
    </div>
  );
};