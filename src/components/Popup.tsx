interface Props {
  x: number;
  y: number;
  text?: string;
}

export const Popup = ({
  x,
  y,
  text = "Hello World",
}: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        bottom: y,
        transform: "translateX(-50%)",

        padding: "10px 20px",
        backgroundColor: "black",
        color: "white",
        borderRadius: "8px",

        whiteSpace: "pre-line",

        maxWidth: 500,
        lineHeight: 1.5,
      }}
    >
      {text}
    </div>
  );
};