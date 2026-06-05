import { useEffect, useRef, useState } from "react";

import { useKeyboard } from "../../hooks/useKeyboard";
import { GAME_CONFIG } from "../../config/gameConfig";
import { CONTROLS } from "./engine/InputManager";

import { updatePlayer } from "./systems/MovementSystem";
import { smoothCamera, updateCameraTarget } from "./engine/CameraManager";
import { checkPortalCollision, checkTargetCollision } from "./systems/CollisionSystem";

import { lavaWorld } from "./data/worlds/lavaWorld";
import { iceWorld } from "./data/worlds/iceWorld";
import type { WorldData } from "./types/gameTypes";

import { PlayerRenderer } from "./rendering/PlayerRenderer";
import { Renderer } from "./rendering/Renderer";
import { Navbar } from "./Navbar";
import { ControlsHint } from "./ControlsHint";

interface Props {
  onBack: () => void;
  onOpenDownloads: () => void;
}

type WorldId = "lava-world" | "ice-world";

const WORLDS: Record<WorldId, WorldData> = {
  "lava-world": lavaWorld,
  "ice-world": iceWorld,
};

const formatWorldLabel = (id: string) =>
  id
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

export const GameCanvas = ({
  onBack,
  onOpenDownloads,
}: Props) => {
  const keys = useKeyboard();

  const containerRef = useRef<HTMLDivElement>(null);
  const lastTimeRef = useRef<number>(0);
  const keysRef = useRef(keys);
  const previousKeysRef = useRef<Set<string>>(new Set());

  const cameraOffsetRef = useRef(0);

  const facingRef = useRef<"left" | "right">("right");

  const [worldId, setWorldId] = useState<WorldId>("lava-world");

  const currentWorld = WORLDS[worldId] ?? lavaWorld;

  const playerRef = useRef({
    x: currentWorld.spawnX,
    y: currentWorld.spawnY,
    velocityY: 0,
    isGrounded: true,
  });

  const [cameraOffset, setCameraOffset] = useState(0);

  const [activeTargets, setActiveTargets] = useState<string[]>([]);

  const [renderState, setRenderState] = useState({
    x: currentWorld.spawnX,
    y: currentWorld.spawnY,
  });

  const [hideUI, setHideUI] = useState(false);

  // =========================================
  // KEYBOARD
  // =========================================

  useEffect(() => {
    keysRef.current = keys;

    if (keys.has(CONTROLS.moveLeft)) {
      facingRef.current = "left";
    }

    if (keys.has(CONTROLS.moveRight)) {
      facingRef.current = "right";
    }

    const wasHidePressed = previousKeysRef.current.has(CONTROLS.hideUI);
    const isHidePressed = keys.has(CONTROLS.hideUI);

    if (isHidePressed && !wasHidePressed) {
      setHideUI((prev) => !prev);
    }

    previousKeysRef.current = keys;
  }, [keys]);

  // =========================================
  // GAME LOOP
  // =========================================

  useEffect(() => {
    let animationId = 0;

    const loop = (time: number) => {
      const delta = !lastTimeRef.current
        ? 1
        : Math.min((time - lastTimeRef.current) / 16, 2);

      lastTimeRef.current = time;

      const isSprinting =
        keysRef.current.has(CONTROLS.run) ||
        keysRef.current.has("ShiftRight");

      const speed =
        GAME_CONFIG.speed *
        (isSprinting ? GAME_CONFIG.sprintMultiplier : 1) *
        delta;

      const current = playerRef.current;

      const newState = updatePlayer({
        player: current,
        keys: keysRef.current,
        speed,
        worldWidth: currentWorld.worldWidth,
        gravity: GAME_CONFIG.gravity,
        jumpForce: GAME_CONFIG.jumpForce,
        deathY: GAME_CONFIG.deathY,
        spawnX: currentWorld.spawnX,
        spawnY: currentWorld.spawnY,
        playerWidth: GAME_CONFIG.playerWidth,
        playerHeight: GAME_CONFIG.playerHeight,
        platforms: currentWorld.platforms,
        partitions: currentWorld.partitions,
        _delta: delta,
      });

      playerRef.current = newState;

      const targetHits = checkTargetCollision(
        newState.x,
        newState.y,
        GAME_CONFIG.playerWidth,
        GAME_CONFIG.playerHeight,
        currentWorld.targets
      );

      setActiveTargets(targetHits);

      const portalHit = checkPortalCollision(
        newState.x,
        newState.y,
        GAME_CONFIG.playerWidth,
        GAME_CONFIG.playerHeight,
        currentWorld.portals
      );

      if (portalHit) {
        const nextWorld = WORLDS[portalHit.targetWorld as WorldId];

        if (nextWorld && nextWorld.id !== currentWorld.id) {
          setWorldId(nextWorld.id as WorldId);

          cameraOffsetRef.current = 0;
          setCameraOffset(0);

          const nextSpawn = {
            x: nextWorld.spawnX,
            y: nextWorld.spawnY,
            velocityY: 0,
            isGrounded: true,
          };

          playerRef.current = nextSpawn;
          setRenderState({
            x: nextSpawn.x,
            y: nextSpawn.y,
          });
          setActiveTargets([]);

          animationId = requestAnimationFrame(loop);
          return;
        }
      }

      const containerWidth =
        containerRef.current?.offsetWidth || 0;

      const targetOffset = updateCameraTarget(
        newState.x,
        cameraOffsetRef.current,
        containerWidth,
        currentWorld.worldWidth,
        GAME_CONFIG.deadZoneLeft,
        GAME_CONFIG.deadZoneRight
      );

      const nextCamera = smoothCamera(
        cameraOffsetRef.current,
        targetOffset,
        GAME_CONFIG.cameraLerp
      );

      cameraOffsetRef.current = nextCamera;
      setCameraOffset(nextCamera);

      setRenderState({
        x: newState.x,
        y: newState.y,
      });

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animationId);
  }, [currentWorld.id]);

  const containerWidth = containerRef.current?.offsetWidth || 0;

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      {!hideUI && (
        <Navbar
          onBack={onBack}
          onOpenDownloads={onOpenDownloads}
          worldLabel={formatWorldLabel(currentWorld.id)}
        />
      )}

      <Renderer
        world={currentWorld}
        cameraOffset={cameraOffset}
        activeTargets={activeTargets}
        containerWidth={containerWidth}
      />

      <PlayerRenderer
        x={renderState.x}
        y={renderState.y}
        cameraOffset={cameraOffset}
        velocityY={playerRef.current.velocityY}
        isGrounded={playerRef.current.isGrounded}
        isMoving={
          keys.has(CONTROLS.moveLeft) ||
          keys.has(CONTROLS.moveRight)
        }
        isRunning={
          keys.has(CONTROLS.run) ||
          keys.has("ShiftRight")
        }
        facing={facingRef.current}
      />

      {!hideUI && <ControlsHint />}
    </div>
  );
};