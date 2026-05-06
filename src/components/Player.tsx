interface Props {
  x: number;
  y: number;
  cameraOffset: number;
}

export const Player = ({ x, y, cameraOffset }: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x + cameraOffset,
        bottom: y,
        width: 50,
        height: 50,
        backgroundColor: "blue",
      }}
    />
  );
};