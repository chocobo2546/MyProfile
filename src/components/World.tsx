import { CONFIG } from "../game/config";
import { Popup } from "./Popup";

import skyBg from "../assets/background/sky.jpg";
import lavaTexture from "../assets/ground/lava.png";
import grassTexture from "../assets/platform/grass.png";
import signTexture from "../assets/sign/woodenSign.png";

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
  const { worldWidth, targets, platforms, partitions  } = CONFIG;

  const renderWidth = Math.max(worldWidth, containerWidth);

  return (
    <div
      style={{
        position: "absolute",
        left: cameraOffset,
        bottom: 0,
        width: renderWidth,
        height: "100%",

        // ✅ background
        backgroundImage: `url(${skyBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}
    >
      {/* ground */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: 40,

          // ✅ lava texture
          backgroundImage: `url(${lavaTexture})`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",

          boxShadow: "0 0 20px rgba(255,100,0,0.6)",
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

            // ✅ grass texture
            backgroundImage: `url(${grassTexture})`,
            backgroundRepeat: "repeat",
            backgroundSize: "64px 64px",

            borderRadius: "15px 15px 20px 20px",

            boxShadow: "-10px 10px 5px rgba(0,0,0,0.3)",
          }}
        />
      ))}

      {/* partitions */}
      {partitions.map((p, i) => (
        <div
          key={`partition-${i}`}
          style={{
            position: "absolute",
            left: p.x,
            bottom: p.y,
            width: p.width,
            height: p.height,

            backgroundColor: "#444",

            border: "2px solid #222",

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
                backgroundImage: `url(${signTexture})`,
                backgroundRepeat: "repeat",
                backgroundSize: "64px 64px",
                backgroundPosition: "center",
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