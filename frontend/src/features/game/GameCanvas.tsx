import { useEffect, useRef, useState } from "react";

import { useKeyboard } from "../../hooks/useKeyboard";
import { CONTROLS } from "./engine/InputManager";
import { lavaWorld } from "./data/worlds/lavaWorld";
import { iceWorld } from "./data/worlds/iceWorld";
import type { WorldData } from "./types/gameTypes";
import { PlayerRenderer } from "./rendering/PlayerRenderer";
import { Renderer } from "./rendering/Renderer";
import { Navbar } from "./Navbar";
import { ControlsHint } from "./ControlsHint";
import { useGameUIStore } from "../../store/gameUIStore";
import { useWorldStore, type WorldId } from "../../store/worldStore";
import { useGameLoop } from "./hooks/useGameLoop";
import { usePlayerControls } from "./hooks/usePlayerControls";

interface Props {
  onBack: () => void;
  onOpenDownloads: () => void;
}

const WORLDS: Record<WorldId, WorldData> = {
  "lava-world": lavaWorld,
  "ice-world": iceWorld,
};

const formatWorldLabel = (id: string): string =>
  id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export const GameCanvas = ({ onBack, onOpenDownloads }: Props) => {
  const keys = useKeyboard();
  const { hideUI, toggleHideUI } = useGameUIStore();
  const { worldId, setWorldId } = useWorldStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const cameraOffsetRef = useRef<number>(0);

  const { keysRef, facingRef } = usePlayerControls({ keys, toggleHideUI });

  const currentWorld = WORLDS[worldId] ?? lavaWorld;

  const playerRef = useRef({
    x: currentWorld.spawnX,
    y: currentWorld.spawnY,
    velocityY: 0,
    isGrounded: true,
  });

  const [cameraOffset, setCameraOffset] = useState<number>(0);
  const [activeTargets, setActiveTargets] = useState<string[]>([]);
  const [renderState, setRenderState] = useState({
    x: currentWorld.spawnX,
    y: currentWorld.spawnY,
  });

  // Reset world state when worldId changes (portal transition)
  useEffect(() => {
    const newWorld = WORLDS[worldId];
    if (!newWorld) return;

    cameraOffsetRef.current = 0;
    setCameraOffset(0);

    playerRef.current = {
      x: newWorld.spawnX,
      y: newWorld.spawnY,
      velocityY: 0,
      isGrounded: true,
    };

    setRenderState({
      x: newWorld.spawnX,
      y: newWorld.spawnY,
    });
    setActiveTargets([]);
  }, [worldId]);

  // Game loop
  useGameLoop({
    containerRef,
    keysRef,
    currentWorld,
    playerRef,
    cameraOffsetRef,
    facingRef,
    setCameraOffset,
    setActiveTargets,
    setRenderState,
  });

  const containerWidth = containerRef.current?.offsetWidth ?? 0;

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
        isMoving={keys.has(CONTROLS.moveLeft) || keys.has(CONTROLS.moveRight)}
        isRunning={keys.has(CONTROLS.run) || keys.has("ShiftRight")}
        facing={facingRef.current}
      />

      {!hideUI && <ControlsHint />}
    </div>
  );
};