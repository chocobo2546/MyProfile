import { Popup } from "./Popup";
import { Portal } from "./Portal";

import type {
  WorldData,
  BackgroundLayer,
} from "../../game/types/gameTypes";

import lavaTexture from "../../assets/platform/groundLava.png"; 
import grassTexture from "../../assets/platform/groundGrass.png"; 
import rockTexture from "../../assets/platform/groundRock.png"; 
import signTexture from "../../assets/sign/woodenSign.png";

interface Props {
  world: WorldData;
  cameraOffset: number;
  activeTargets: string[];
  containerWidth: number;
}

const renderBackgroundLayer = (
  layer: BackgroundLayer,
  cameraOffset: number,
  renderWidth: number,
  index: number
) => {
  return (
    <div
      key={`bg-layer-${index}`}
      style={{
        position: "absolute",

        left: layer.x ?? 0,
        bottom: layer.y ?? 0,

        width: renderWidth,
        height: layer.height ?? "100%",

        backgroundImage: `url(${layer.image})`,

        backgroundRepeat: layer.repeatX
          ? "repeat-x"
          : "no-repeat",

        backgroundSize:
          layer.size ?? "cover",

        backgroundPosition: "bottom left",

        opacity: layer.opacity ?? 1,

        transform: `translate3d(${
          cameraOffset * (layer.speed ?? 1)
        }px, 0, 0)`,

        zIndex: layer.zIndex ?? 0,

        pointerEvents: "none",
      }}
    />
  );
};

export const World = ({
  world,
  cameraOffset,
  activeTargets,
  containerWidth,
}: Props) => {
  const renderWidth = Math.max(
    world.worldWidth,
    containerWidth
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        background: "#000",
      }}
    >
      {/* ========================================= */}
      {/* BACKGROUND LAYERS */}
      {/* ========================================= */}

      {world.backgroundLayers?.map((layer, index) =>
        renderBackgroundLayer(
          layer,
          cameraOffset,
          renderWidth,
          index
        )
      )}

      {/* ========================================= */}
      {/* WORLD CONTENT */}
      {/* ========================================= */}

      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,

          width: renderWidth,
          height: "100%",

          transform: `translate3d(${cameraOffset}px,0,0)`,

          willChange: "transform",

          zIndex: 100,
        }}
      >

        {/* ========================================= */}
        {/* DECORATIONS */}
        {/* ========================================= */}

        {world.decorations.map((d) => (
          <img
            key={d.id}
            src={d.image}
            alt=""
            draggable={false}
            
            style={{
              position: "absolute",

              left: d.x,
              bottom: d.y,

              width: d.width,
              height: d.height,

              objectFit: "contain",

              pointerEvents: "none",
              userSelect: "none",

              opacity: d.opacity ?? 1,

              zIndex: d.zIndex ?? 1,

              imageRendering: "auto",

              transform: `translateX(${
                cameraOffset * (d.parallax ?? 1)
              }px)`,
            }}
          />
        ))}

        {/* GROUND */}

        <div
          style={{
            position: "absolute",
            bottom: 0,

            width: "100%",
            height: 40,

            backgroundImage: `url(${lavaTexture})`,
            backgroundRepeat: "repeat-x",
            backgroundSize: "128px 128px",

            boxShadow:
              "0 0 20px rgba(255,100,0,0.6)",
            zIndex: 50,
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
              backgroundSize: "256px 72px",

              borderRadius:
                "15px 15px 20px 20px",

              boxShadow:
                "-10px 10px 5px rgba(0,0,0,0.3)",
              zIndex: 51,
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

              backgroundImage: `url(${rockTexture})`,
              backgroundRepeat: "repeat",
              backgroundSize: "256px 256px",

              borderRadius:
                "15px 15px 20px 20px",

              boxShadow:
                "-10px 10px 5px rgba(0,0,0,0.3)",
              zIndex: 49,
            }}
          />
        ))}

        {/* TARGETS */}

        {world.targets.map((t) => {
          const isActive =
            activeTargets.includes(t.id);

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
                  backgroundSize: "76px 76px",
                  zIndex: 52,
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
            label={
              portal.label ??
              portal.targetWorld
            }
          />
        ))}
      </div>
    </div>
  );
};