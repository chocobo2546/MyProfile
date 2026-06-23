import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";

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

// const formatWorldLabel = (id: string): string =>
//   id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export const GameCanvas = ({ onBack }: Props) => {
  const keys = useKeyboard();
  const { hideUI, toggleHideUI } = useGameUIStore();
  const { worldId } = useWorldStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const cameraOffsetRef = useRef<number>(0);

  const currentWorld = WORLDS[worldId] ?? lavaWorld;

  const playerRef = useRef({
    x: currentWorld.spawnX,
    y: currentWorld.spawnY,
    velocityY: 0,
    isGrounded: true,
  });

  const [cameraOffset, setCameraOffset] = useState<number>(0);
  const [activeTargets, setActiveTargets] = useState<string[]>([]);
  const [activeNpcs, setActiveNpcs] = useState<string[]>([]);
  const [npcDialogueIndex, setNpcDialogueIndex] = useState<Record<string, number>>({});
  const [renderState, setRenderState] = useState({
    x: currentWorld.spawnX,
    y: currentWorld.spawnY,
    velocityY: 0,
    isGrounded: true,
    facing: "right" as "left" | "right",
  });
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const handleInteract = useCallback(() => {
    if (activeNpcs.length === 0) return;
    const npcId = activeNpcs[0];
    const currentNpc = currentWorld.npcs?.find((n) => n.id === npcId);
    if (!currentNpc?.dialogues?.length) return;
    const maxIndex = currentNpc.dialogues.length - 1;
    setNpcDialogueIndex((prev) => ({
      ...prev,
      [npcId]: ((prev[npcId] ?? 0) + 1) % (maxIndex + 1),
    }));
  }, [activeNpcs, currentWorld.npcs]);

  const { keysRef, facingRef } = usePlayerControls({ keys, toggleHideUI, onInteract: handleInteract });

  // Reset world state when worldId changes (portal transition)
  useLayoutEffect(() => {
    const newWorld = WORLDS[worldId];
    if (!newWorld) return;

    cameraOffsetRef.current = 0;

    playerRef.current = {
      x: newWorld.spawnX,
      y: newWorld.spawnY,
      velocityY: 0,
      isGrounded: true,
    };

    setCameraOffset(0);
    setRenderState({
      x: newWorld.spawnX,
      y: newWorld.spawnY,
      velocityY: 0,
      isGrounded: true,
      facing: "right",
    });
    setActiveTargets([]);
    setActiveNpcs([]);
    setNpcDialogueIndex({});
  }, [worldId]);

  // Track container width via ResizeObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setContainerWidth(el.offsetWidth);
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Reset dialogue index when nearby NPCs change
  useEffect(() => {
    setNpcDialogueIndex((prev) => {
      const next = { ...prev };
      for (const id of Object.keys(next)) {
        if (!activeNpcs.includes(id)) {
          delete next[id];
        }
      }
      for (const id of activeNpcs) {
        if (!(id in next)) {
          next[id] = 0;
        }
      }
      return next;
    });
  }, [activeNpcs]);

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
    setActiveNpcs,
    setRenderState,
  });

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
        />
      )}

      <Renderer
        world={currentWorld}
        cameraOffset={cameraOffset}
        activeTargets={activeTargets}
        activeNpcs={activeNpcs}
        npcDialogueIndex={npcDialogueIndex}
        containerWidth={containerWidth}
      />

      <PlayerRenderer
        x={renderState.x}
        y={renderState.y}
        cameraOffset={cameraOffset}
        velocityY={renderState.velocityY}
        isGrounded={renderState.isGrounded}
        isMoving={keys.has(CONTROLS.moveLeft) || keys.has(CONTROLS.moveRight)}
        isRunning={keys.has(CONTROLS.run) || keys.has("ShiftRight")}
        facing={renderState.facing}
      />

      {!hideUI && <ControlsHint />}
    </div>
  );
};