import { useEffect, useState } from "react";
import { GAME_CONFIG } from "../../../config/gameConfig";
import {
  PLAYER_ANIMATIONS,
  resolveAnimationState,
} from "../engine/PhysicsManager";

interface Props {
  x: number;
  y: number;
  cameraOffset: number;
  velocityY: number;
  isGrounded: boolean;
  isMoving: boolean;
  isRunning: boolean;
  facing: "left" | "right";
}

export const PlayerRenderer = ({
  x,
  y,
  cameraOffset,
  velocityY,
  isGrounded,
  isMoving,
  isRunning,
  facing,
}: Props) => {
  const [frameIndex, setFrameIndex] = useState(0);

  const state = resolveAnimationState({
    isGrounded,
    velocityY,
    isMoving,
    isRunning,
  });

  const animation = PLAYER_ANIMATIONS[state];

  useEffect(() => {
    const interval = 1000 / animation.fps;
    const id = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % animation.frames.length);
    }, interval);
    return () => clearInterval(id);
  }, [animation.fps, animation.frames.length]);

  const frame = animation.frames[frameIndex % animation.frames.length];

  return (
    <div
      style={{
        position: "absolute",
        left: x + cameraOffset,
        bottom: y,
        width: GAME_CONFIG.playerWidth,
        height: GAME_CONFIG.playerHeight,
        zIndex: 999,
      }}
    >
      <img
        src={frame.image}
        alt=""
        draggable={false}
        aria-hidden="true"
        style={{
          position: "absolute",
          left: `calc(50% + ${frame.offsetX}px)`,
          bottom: frame.offsetY,
          width: frame.width,
          height: frame.height,
          imageRendering: "pixelated",
          pointerEvents: "none",
          userSelect: "none",
          transform:
            facing === "left"
              ? "translateX(-50%) scaleX(-1)"
              : "translateX(-50%)",
          transformOrigin: "center center",
          zIndex: 0,
        }}
      />
    </div>
  );
};