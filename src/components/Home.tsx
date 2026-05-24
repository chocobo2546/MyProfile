interface Props {
  onStart: () => void;
}

export const Menu = ({ onStart }: Props) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#111",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: 48, marginBottom: 20 }}>
        My Profile Game
      </h1>

      <button
        onClick={onStart}
        style={{
          padding: "12px 24px",
          fontSize: 18,
          cursor: "pointer",
        }}
      >
        Start Game
      </button>
    </div>
  );
};