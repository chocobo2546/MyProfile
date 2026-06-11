import { useEffect, useRef } from "react";
import { GAME_CONFIG } from "../../../config/gameConfig";
import { CONTROLS } from "../engine/InputManager";
import { updatePlayer } from "../systems/MovementSystem";
import { smoothCamera, updateCameraTarget } from "../engine/CameraManager";
import { checkPortalCollision, checkTargetCollision } from "../systems/CollisionSystem";
import { type WorldData } from "../types/gameTypes";
import { type WorldId, useWorldStore } from "../../../store/worldStore";

interface UseGameLoopParams {
  containerRef: React.RefObject<HTMLDivElement>;
  keysRef: React.MutableRefObject<Set<string>>;
  currentWorld: WorldData;
  playerRef: React.MutableRefObject<{
    x: number;
    y: number;
    velocityY: number;
    isGrounded: boolean;
  }>;
  cameraOffsetRef: React.MutableRefObject<number>;
  facingRef: React.MutableRefObject<"left" | "right">;
  setCameraOffset: (offset: number) => void;
  setActiveTargets: (targets: string[]) => void;
  setRenderState: (state: { x: number; y: number }) => void;
}

export const useGameLoop = ({
  containerRef,
  keysRef,
  currentWorld,
  playerRef,
  cameraOffsetRef,
  facingRef,
  setCameraOffset,
  setActiveTargets,
  setRenderState,
}: UseGameLoopParams): void => {
  const { setWorldId } = useWorldStore();
  const lastTimeRef = useRef<number>(0);
  const animationIdRef = useRef<number>(0);

  useEffect(() => {
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
        const nextWorldId = portalHit.targetWorld as WorldId;
        if (nextWorldId !== currentWorld.id) {
          setWorldId(nextWorldId);
          animationIdRef.current = requestAnimationFrame(loop);
          return;
        }
      }

      const containerWidth = containerRef.current?.offsetWidth ?? 0;
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
      setRenderState({ x: newState.x, y: newState.y });

      animationIdRef.current = requestAnimationFrame(loop);
    };

    animationIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [currentWorld.id, setWorldId, containerRef, keysRef, playerRef, cameraOffsetRef, facingRef, setCameraOffset, setActiveTargets, setRenderState]);
};