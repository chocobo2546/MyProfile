interface Props {
  x: number;
  y: number;
  text: string;
}

export const Popup = ({
  x,
  y,
  text,
}: Props) => {
  return (
    <div
      style={{
        position: "absolute",

        left: x,
        bottom: y,

        transform:
          "translateX(-50%)",

        padding: "12px 18px",

        maxWidth: 500,

        borderRadius: 12,

        background:
          "rgba(0,0,0,0.8)",

        color: "white",

        backdropFilter:
          "blur(8px)",

        lineHeight: 1.5,

        whiteSpace: "pre-line",

        border:
          "1px solid rgba(255,255,255,0.1)",

        animation:
          "fadeIn 0.2s ease",
        zIndex: 5000,
      }}
    >
      {text}
    </div>
  );
};