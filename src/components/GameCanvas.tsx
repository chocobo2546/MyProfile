import { useEffect, useRef, useState } from "react";
import { useKeyboard } from "../hooks/useKeyboard";
import { CONFIG } from "../game/config";
import { updatePlayer } from "../game/player";
import { updateCamera } from "../game/camera";
import { checkTargetCollision } from "../game/collision";
import { calculateDelta } from "../game/gameLoop";
import { Player } from "./Player";
import { World } from "./World";

import { Navbar } from "./Navbar";

interface Props {
  onBack: () => void;
}

export const GameCanvas = ({ onBack }: Props) => {
  const keys = useKeyboard();

  const containerRef = useRef<HTMLDivElement>(null);
  const lastTimeRef = useRef<number>(0);
  const keysRef = useRef(keys);

  // ✅ spawn position from config
  const playerRef = useRef({
    x: CONFIG.spawnX,
    y: CONFIG.spawnY,
    velocityY: 0,
    dropTimer: 0,
  });

  useEffect(() => {
    keysRef.current = keys;
  }, [keys]);

  const [renderState, setRenderState] = useState({
    x: CONFIG.spawnX,
    y: CONFIG.spawnY,
  });

  const [cameraOffset, setCameraOffset] = useState(0);
  const [activeTargets, setActiveTargets] = useState<string[]>([]);

  const worldWidth = CONFIG.worldWidth;

  useEffect(() => {
    let animationId: number;

    const loop = (time: number) => {
      const delta = calculateDelta(time, lastTimeRef.current);
      lastTimeRef.current = time;

      const isSprinting =
        keysRef.current.has("ShiftLeft") ||
        keysRef.current.has("ShiftRight");

      const isDropping =
        keysRef.current.has("KeyS") ||
        keysRef.current.has("ArrowDown");

      const speed =
        CONFIG.speed *
        (isSprinting ? CONFIG.sprintMultiplier : 1) *
        delta;

      const current = playerRef.current;

      const newState = updatePlayer(
        current.x,
        current.y,
        current.velocityY,
        current.dropTimer,
        keysRef.current,
        speed,
        worldWidth,
        CONFIG.gravity,
        CONFIG.jumpForce,
        CONFIG.groundY,
        CONFIG.playerWidth,
        CONFIG.playerHeight,
        CONFIG.platforms,
        isDropping,
        delta
      );

      playerRef.current = newState;

      const targetsHit = checkTargetCollision(
        newState.x,
        newState.y,
        CONFIG.playerWidth,
        CONFIG.playerHeight,
        CONFIG.targets
      );

      setActiveTargets(targetsHit);

      const containerWidth =
        containerRef.current?.offsetWidth || 0;

      setCameraOffset((prev) =>
        updateCamera(
          newState.x,
          prev,
          containerWidth,
          worldWidth,
          CONFIG.deadZoneLeft,
          CONFIG.deadZoneRight
        )
      );

      setRenderState({
        x: newState.x,
        y: newState.y,
      });

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animationId);
  }, []);

  const containerWidth =
    containerRef.current?.offsetWidth || 0;

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Navbar onBack={onBack} />

      <World
        cameraOffset={cameraOffset}
        activeTargets={activeTargets}
        containerWidth={containerWidth}
      />

      <Player
        x={renderState.x}
        y={renderState.y}
        cameraOffset={cameraOffset}
      />
    </div>
  );
};