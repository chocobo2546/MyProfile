import { CONFIG } from "../game/config";
import { Popup } from "./Popup";

interface Props {
  cameraOffset: number;
  activeTargets: string[];
  containerWidth: number;
}

export const World = ({
  cameraOffset,
  activeTargets,
  containerWidth,
}: Props) => {
  const { worldWidth, targets, platforms } = CONFIG;

  const renderWidth = Math.max(worldWidth, containerWidth);

  return (
    <div
      style={{
        position: "absolute",
        left: cameraOffset,
        bottom: 0,
        width: renderWidth,
        height: "100%",
      }}
    >
      {/* ground */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: 50,
          backgroundColor: "green",
        }}
      />

      {/* platforms */}
      {platforms.map((p, i) => (
      <div
        key={`${p.x}-${p.y}-${i}`}
          style={{
            position: "absolute",
            left: p.x,
            bottom: p.y,
            width: p.width,
            height: p.height,
            backgroundColor: "brown",
          }}
        />
      ))}

      {/* targets */}
      {targets.map((t) => {
        const isActive = activeTargets.includes(t.id);

        return (
          <div key={t.id}>
            {/* target box */}
            <div
              style={{
                position: "absolute",
                left: t.x,
                bottom: t.y,
                width: t.width,
                height: t.height,
                backgroundColor: "red",
                opacity: 0.5,
              }}
            />

            {/* popup */}
            {isActive && (
              <Popup
                x={t.x + t.width / 2}
                y={t.y + t.height + 20}
                text={t.text}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};