import {
  PLAYER_ANIMATIONS,
  type AnimationState,
} from "../game/playerAnimation";

interface Props {
  x: number;
  y: number;
  cameraOffset: number;

  velocityY: number;

  isMoving: boolean;
  isRunning: boolean;

  isGrounded: boolean;

  facing: "left" | "right";
}

export const Player = ({
  x,
  y,
  cameraOffset,
  velocityY,
  isMoving,
  isRunning,
  isGrounded,
  facing,
}: Props) => {
  // =========================================
  // STATE
  // =========================================

  let state: AnimationState = "idle";

  if (!isGrounded) {
    if (velocityY > 0.15) {
      state = "jump";
    } else {
      state = "fall";
    }
  } else if (isMoving && isRunning) {
    state = "run";
  } else if (isMoving) {
    state = "walk";
  }

  // =========================================
  // ANIMATION
  // =========================================

  const animation =
    PLAYER_ANIMATIONS[state];

  const currentFrame =
    Math.floor(
      Date.now() /
        (1000 / animation.fps)
    ) % animation.frames.length;

  const frame =
    animation.frames[currentFrame];

  // =========================================
  // RENDER
  // =========================================

  return (
    <div
      style={{
        position: "absolute",

        left: x + cameraOffset,
        bottom: y,

        width: 60,
        height: 100,
      }}
    >
      <img
        src={frame.image}
        alt="player"
        draggable={false}
        style={{
          position: "absolute",

          left: `calc(50% + ${frame.offsetX}px)`,

          bottom: frame.offsetY,

          width: frame.width,
          height: frame.height,

          imageRendering:
            "pixelated",

          pointerEvents: "none",
          userSelect: "none",

          transform:
            facing === "left"
              ? "translateX(-50%) scaleX(-1)"
              : "translateX(-50%)",
        }}
      />
    </div>
  );
};