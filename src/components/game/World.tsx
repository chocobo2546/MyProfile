import { Popup } from "./Popup";
import { Portal } from "./Portal";

import type { WorldData } from "../../game/types/gameTypes";

import skyBg from "../../assets/background/sky.jpg";
import lavaTexture from "../../assets/platform/lava.png";
import grassTexture from "../../assets/platform/grass.png";
import signTexture from "../../assets/sign/woodenSign.png";

interface Props {
  world: WorldData;
  cameraOffset: number;
  activeTargets: string[];
  containerWidth: number;
}

export const World = ({
  world,
  cameraOffset,
  activeTargets,
  containerWidth,
}: Props) => {
  const renderWidth = Math.max(world.worldWidth, containerWidth);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        background: "#06101f",
      }}
    >
      {/* BACKGROUND */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${world.background || skyBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* FAR PARALLAX */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translate3d(${cameraOffset * 0.16}px, 0, 0)`,
          background:
            world.farBackground
              ? `url(${world.farBackground}) center/cover no-repeat`
              : "linear-gradient(to top, rgba(17,24,39,0.9), rgba(17,24,39,0.0) 70%)",
          opacity: 0.55,
          filter: "blur(1px)",
        }}
      />

      {/* NEAR PARALLAX */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translate3d(${cameraOffset * 0.32}px, 0, 0)`,
          background:
            world.nearBackground
              ? `url(${world.nearBackground}) center/cover no-repeat`
              : "linear-gradient(to top, rgba(15,23,42,0.95), rgba(15,23,42,0.0) 60%)",
          opacity: 0.8,
        }}
      />

      {/* WORLD CONTENT */}
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: renderWidth,
          height: "100%",
          transform: `translate3d(${cameraOffset}px, 0, 0)`,
          willChange: "transform",
          zIndex: 2,
        }}
      >
        {/* GROUND */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: 40,

            backgroundImage: `url(${lavaTexture})`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
            boxShadow: "0 0 20px rgba(255,100,0,0.6)",
          }}
        />

        {/* PLATFORMS */}
        {world.platforms.map((p, i) => (
          <div
            key={`${p.x}-${p.y}-${i}`}
            style={{
              position: "absolute",
              left: p.x,
              bottom: p.y,
              width: p.width,
              height: p.height,

              backgroundImage: `url(${grassTexture})`,
              backgroundRepeat: "repeat",
              backgroundSize: "64px 64px",

              borderRadius: "15px 15px 20px 20px",
              boxShadow: "-10px 10px 5px rgba(0,0,0,0.3)",
            }}
          />
        ))}

        {/* PARTITIONS */}
        {world.partitions.map((p, i) => (
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

        {/* TARGETS */}
        {world.targets.map((t) => {
          const isActive = activeTargets.includes(t.id);

          return (
            <div key={t.id}>
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

        {/* PORTALS */}
        {world.portals.map((portal) => (
          <Portal
            key={portal.id}
            x={portal.x}
            y={portal.y}
            label={portal.label ?? portal.targetWorld}
          />
        ))}
      </div>
    </div>
  );
};