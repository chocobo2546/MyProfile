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
  const state = resolveAnimationState({
    isGrounded,
    velocityY,
    isMoving,
    isRunning,
  });

  const animation = PLAYER_ANIMATIONS[state];

  const currentFrameIndex =
    Math.floor(
      performance.now() / (1000 / animation.fps)
    ) % animation.frames.length;

  const frame = animation.frames[currentFrameIndex];

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